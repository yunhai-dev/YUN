import {useState, useCallback, useRef} from "react";

export interface ToolPart {
  type: string; // 'tool-{toolName}'
  state: 'partial-call' | 'call' | 'result' | 'error';
  toolCallId: string;
  toolName: string;
  input?: any;
  output?: any;
  errorText?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  tool_call_id?: string;
  tool_calls?: Array<{
    id: string;
    type: string;
    function: {
      name: string;
      arguments: string;
    };
  }>;
  parts?: ToolPart[];
}

export interface Tool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
}

export interface UseChatOptions {
  apiKey: string;
  baseUrl?: string;
  model: string;
  initialMessages?: Message[];
  tools?: Tool[];
  maxToolRounds?: number;
  onError?: (error: Error) => void;
  onToolCall?: (toolName: string, args: Record<string, unknown>) => void;
}

export interface UseChatReturn {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  stop: () => void;
  append: (message: Omit<Message, "id">) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function useChat(options: UseChatOptions): UseChatReturn {
  const {
    apiKey,
    baseUrl = "https://api.openai.com",
    model,
    initialMessages = [],
    tools = [],
    maxToolRounds = 5,
    onError,
    onToolCall,
  } = options;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const streamContentRef = useRef<string>("");
  const rafIdRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const append = useCallback((message: Omit<Message, "id">) => {
    const newMessage: Message = {
      ...message,
      id: `${message.role}-${Date.now()}`,
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const executeToolCalls = useCallback(
    async (toolCalls: Message["tool_calls"], assistantMessage: Message) => {
      if (!toolCalls) return [];

      const toolResults: Message[] = [];
      const parts: ToolPart[] = [];

      for (const toolCall of toolCalls) {
        const tool = tools.find((t) => t.name === toolCall.function.name);
        
        if (!tool) {
          const errorPart: ToolPart = {
            type: `tool-${toolCall.function.name}`,
            state: 'error',
            toolCallId: toolCall.id,
            toolName: toolCall.function.name,
            errorText: `Tool ${toolCall.function.name} not found`,
          };
          parts.push(errorPart);
          
          toolResults.push({
            id: `tool-error-${Date.now()}-${toolCall.id}`,
            role: "tool",
            content: JSON.stringify({error: `Tool ${toolCall.function.name} not found`}),
            tool_call_id: toolCall.id,
          });
          continue;
        }

        try {
          const args = JSON.parse(toolCall.function.arguments);
          onToolCall?.(tool.name, args);
          
          // 添加 call 状态的 part
          const callPart: ToolPart = {
            type: `tool-${tool.name}`,
            state: 'call',
            toolCallId: toolCall.id,
            toolName: tool.name,
            input: args,
          };
          parts.push(callPart);
          
          const result = await tool.execute(args);
          
          // 更新为 result 状态
          callPart.state = 'result';
          callPart.output = result;
          
          toolResults.push({
            id: `tool-${Date.now()}-${toolCall.id}`,
            role: "tool",
            content: JSON.stringify(result),
            tool_call_id: toolCall.id,
          });
        } catch (err) {
          console.error(`Tool ${tool.name} execution error:`, err);
          
          const errorPart: ToolPart = {
            type: `tool-${tool.name}`,
            state: 'error',
            toolCallId: toolCall.id,
            toolName: tool.name,
            errorText: (err as Error).message,
          };
          parts.push(errorPart);
          
          toolResults.push({
            id: `tool-error-${Date.now()}-${toolCall.id}`,
            role: "tool",
            content: JSON.stringify({error: (err as Error).message}),
            tool_call_id: toolCall.id,
          });
        }
      }

      // 将 parts 添加到 assistant message
      assistantMessage.parts = parts;

      return toolResults;
    },
    [tools, onToolCall],
  );

  const streamChat = useCallback(
    async (conversationMessages: Message[], assistantMessageId: string, roundCount = 0) => {
      const endpoint = `${baseUrl.replace(/\/+$/, "")}/v1/chat/completions`;
      const payload: Record<string, unknown> = {
        model,
        messages: conversationMessages.map((m) => {
          const msg: Record<string, unknown> = {role: m.role, content: m.content || ""};
          if (m.tool_calls) msg.tool_calls = m.tool_calls;
          if (m.tool_call_id) msg.tool_call_id = m.tool_call_id;
          if (m.role === "tool" && !m.tool_call_id) {
            console.warn("Tool message missing tool_call_id:", m);
          }
          return msg;
        }),
        stream: true,
      };

      if (tools.length > 0) {
        payload.tools = tools.map((t) => ({
          type: "function",
          function: {
            name: t.name,
            description: t.description,
            parameters: t.parameters,
          },
        }));
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        if (!res.ok) {
          // 尝试解析错误响应
          let errorMessage = `HTTP error! status: ${res.status}`;
          try {
            const errorData = await res.json();
            if (errorData.error?.message) {
              errorMessage = errorData.error.message;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            }
          } catch (e) {
            // 如果无法解析JSON，使用默认错误消息
          }
          
          // 更新消息显示错误
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId
                ? {...m, content: `❌ 错误：${errorMessage}`}
                : m,
            ),
          );
          setIsLoading(false);
          onError?.(new Error(errorMessage));
          return;
        }

        if (!res.body) {
          throw new Error("Response body is null");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        const currentToolCalls: Message["tool_calls"] = [];
        
        // 重置流式内容
        streamContentRef.current = "";
        
        // 节流更新函数
        const scheduleUpdate = (messageId: string) => {
          if (rafIdRef.current !== null) return;
          
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            const content = streamContentRef.current;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === messageId ? {...m, content} : m,
              ),
            );
          });
        };

        while (true) {
          const {value, done} = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, {stream: true});
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              
              // 检查是否是错误响应
              if (parsed.error) {
                const errorMsg = parsed.error.message || JSON.stringify(parsed.error);
                streamContentRef.current = `❌ 错误：${errorMsg}`;
                scheduleUpdate(assistantMessageId);
                setIsLoading(false);
                onError?.(new Error(errorMsg));
                return;
              }
              
              const delta = parsed?.choices?.[0]?.delta;

              if (delta?.content) {
                streamContentRef.current += delta.content;
                scheduleUpdate(assistantMessageId);
              }

              if (delta?.tool_calls) {
                for (const toolCallDelta of delta.tool_calls) {
                  const index = toolCallDelta.index;
                  if (!currentToolCalls[index]) {
                    currentToolCalls[index] = {
                      id: toolCallDelta.id || "",
                      type: toolCallDelta.type || "function",
                      function: {name: "", arguments: ""},
                    };
                  }
                  if (toolCallDelta.function?.name) {
                    currentToolCalls[index].function.name += toolCallDelta.function.name;
                  }
                  if (toolCallDelta.function?.arguments) {
                    currentToolCalls[index].function.arguments += toolCallDelta.function.arguments;
                  }
                }
              }
            } catch (err) {
              console.error("Parse stream chunk error:", err);
            }
          }
        }
        
        // 确保最后一次更新被应用
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        if (streamContentRef.current) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId ? {...m, content: streamContentRef.current} : m,
            ),
          );
        }

        // If tool calls exist, execute them and continue conversation
        if (currentToolCalls.length > 0 && roundCount < maxToolRounds) {
          // Update assistant message with tool_calls
          const assistantWithTools: Message = {
            id: assistantMessageId,
            role: "assistant",
            content: streamContentRef.current, // 直接使用 ref 中的内容
            tool_calls: currentToolCalls,
          };

          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMessageId ? assistantWithTools : m)),
          );

          const toolResults = await executeToolCalls(currentToolCalls, assistantWithTools);
          
          // 更新消息以显示 parts
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMessageId ? assistantWithTools : m)),
          );
          
          if (toolResults.length > 0) {
            const newAssistantId = `assistant-${Date.now()}`;
            const newAssistantMessage: Message = {
              id: newAssistantId,
              role: "assistant",
              content: "",
            };

            setMessages((prev) => [...prev, ...toolResults, newAssistantMessage]);

            // Build correct message sequence: original messages + assistant with tool_calls + tool results
            await streamChat(
              [...conversationMessages, assistantWithTools, ...toolResults],
              newAssistantId,
              roundCount + 1,
            );
          }
        }

        setIsLoading(false);
      } catch (error) {
        if ((error as DOMException)?.name === "AbortError") {
          setIsLoading(false);
          return;
        }
        console.error("Stream error:", error);
        onError?.(error as Error);
        setIsLoading(false);
      }

      abortControllerRef.current = null;
    },
    [apiKey, baseUrl, model, tools, maxToolRounds, executeToolCalls, onError],
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      if (!input.trim() || !apiKey) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: input.trim(),
      };

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setInput("");
      setIsLoading(true);

      const conversationMessages = [...messages, userMessage];
      await streamChat(conversationMessages, assistantMessage.id);
    },
    [input, apiKey, messages, streamChat],
  );

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    stop,
    append,
    setMessages,
  };
}
