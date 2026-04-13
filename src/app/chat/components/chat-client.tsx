"use client";

import {memo, useEffect, useMemo, useRef, useState} from "react";
import {CornerDownLeftIcon, MicIcon, PlusIcon, SquareIcon} from "lucide-react";
import {toast} from "sonner";
import {
    Message,
    MessageBranch,
    MessageBranchContent,
    MessageContent,
    MessageResponse,
} from "@/components/ai-elements/message";
import {Loader} from "@/components/ai-elements/loader";
import {Tool, ToolContent, ToolHeader, ToolInput, ToolOutput,} from "@/components/ai-elements/tool";
import {Conversation, ConversationContent, ConversationScrollButton,} from "@/components/ai-elements/conversation";
import {
    type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import {Suggestion, Suggestions} from "@/components/ai-elements/suggestion";
import {useChat} from "@/hooks/use-chat";
import {chatTools} from "../tools";

const DEFAULT_MODEL = "deepseek-chat";
const SUGGESTIONS: string[] = [];

// 优化消息渲染组件
const ChatMessage = memo(({message, isLoading}: {
    message: {
        role: "system" | "user" | "assistant" | "tool",
        content: string,
        id: string
        parts?: {state: string, output?: string | object, errorText?: string, type: string, input?: string}[]
    };
    isLoading: boolean
}) => {
    return (
        <div className="space-y-2">
            {message.role !== "tool" && (
                <MessageBranch defaultBranch={0}>
                    <MessageBranchContent>
                        <Message from={message.role}>
                            <MessageContent>
                                {message.content ? (
                                    <MessageResponse>{message.content}</MessageResponse>
                                ) : isLoading ? (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Loader size={16}/>
                                        <span className="text-xs">等待模型响应...</span>
                                    </div>
                                ) : null}
                            </MessageContent>
                        </Message>
                    </MessageBranchContent>
                </MessageBranch>
            )}
            {message.parts?.map((part, idx: number) => {
                const toolState: 'input-streaming' | 'input-available' | 'output-available' | 'output-error' =
                    part.state === 'partial-call' ? 'input-streaming' :
                        part.state === 'call' ? 'input-available' :
                            part.state === 'result' ? 'output-available' :
                                'output-error';

                const outputContent = part.output
                    ? (typeof part.output === "string" ? part.output : JSON.stringify(part.output, null, 2))
                    : undefined;

                return (
                    <Tool key={`${message.id}-tool-${idx}`} className="group mb-0">
                        <ToolHeader type={part.type as `tool-${string}`} state={toolState}/>
                        <ToolContent>
                            <ToolInput input={part.input}/>
                            <ToolOutput
                                output={outputContent}
                                errorText={part.errorText}
                            />
                        </ToolContent>
                    </Tool>
                );
            })}
        </div>
    );
});

ChatMessage.displayName = "ChatMessage";

const ChatClient = () => {
    const [model, setModel] = useState<string>(DEFAULT_MODEL);
    const [customModel, setCustomModel] = useState<string>("");
    const [apiKey, setApiKey] = useState<string>("");
    const [baseUrl, setBaseUrl] = useState<string>("");
    const [isMultiline, setIsMultiline] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resolvedModel = useMemo(() => customModel.trim() || model, [customModel, model]);

    const {
        messages: chatMessages,
        input,
        setInput,
        handleSubmit: chatHandleSubmit,
        isLoading,
        stop,
    } = useChat({
        apiKey,
        baseUrl: baseUrl || "https://ai.yhnotes.com",
        model: resolvedModel,
        tools: chatTools,
        initialMessages: [
            {
                id: "system-identity",
                role: "system",
                content: [
                    "你是站点主人 YunHai 的 AI 助手，口号：Make technology simpler and life better。",
                    "背景：爬虫工程（WebSocket 加密、CF、人机验证）、后端 Python/Django/FastAPI（分布式系统、SSO 单点登录、Celery/Redis/RabbitMQ 消息队列、微服务架构）、前端 React/Next.js/Vue（TypeScript、Tailwind CSS、SSR/SSG）、AI 应用开发（Claude/GPT/DeepSeek LLM 集成、RAG 系统、LangChain/LangGraph Agent、MCP 协议、Dify 工作流）、数据工程（RAG pipeline、向量数据库、实时流处理）。",
                    "价值观：探索/创新，开放，持续学习；网站希望承载灵感与探索，技术应简化生活。",
                    "家乡：云南（玉龙雪山、东巴文化等）。",
                    "当前网站地址为：https://www.yhnotes.com。",
                    "联系渠道（被问到时提供）：邮箱 [yunhai@yhnotes.com](mailto:yunhai@yhnotes.com)；GitHub [yunhai-dev](https://github.com/yunhai-dev)；Gitee [yun2hai](https://gitee.com/yun2hai)；微信需说明意图，二维码见 [联系页](/contact)；一般 24h 内回复，紧急邮件标题可写 URGENT。",
                    "兼职工作：可接受远程兼职项目，包括 Web 全栈开发、AI 应用开发等，欢迎联系洽谈。",
                    "回答风格：友好务实，先给可执行步骤，必要时引用上述背景，中文优先。输出链接时使用 Markdown 格式 [文字](链接)。",
                ].join("\n"),
            },
        ],
        onError: (error) => {
            toast.error("Chat error", {description: error.message});
        },
        onToolCall: (toolName, args) => {
            console.log(`🔧 Tool called: ${toolName}`, args);
        },
    });

    // Persist credentials and custom model in localStorage
    useEffect(() => {
        if (typeof window === "undefined") return;
        const savedApiKey = localStorage.getItem("chat-api-key") || "";
        const savedBaseUrl = localStorage.getItem("chat-base-url") || "https://api.deepseek.com";
        const savedModel = localStorage.getItem("chat-model-id") || "deepseek-chat";
        const savedPreset = localStorage.getItem("chat-model-preset") || DEFAULT_MODEL;
        setApiKey(savedApiKey);
        setBaseUrl(savedBaseUrl);
        setCustomModel(savedModel);
        setModel(savedPreset || DEFAULT_MODEL);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("chat-api-key", apiKey);
    }, [apiKey]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("chat-base-url", baseUrl);
    }, [baseUrl]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("chat-model-id", customModel);
    }, [customModel]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("chat-model-preset", model);
    }, [model]);

    const handleSubmit = (message: PromptInputMessage) => {
        const hasText = Boolean(message.text?.trim());

        if (!hasText) {
            return;
        }

        if (!apiKey) {
            toast.error("请先填写 API Key");
            return;
        }

        setInput(message.text || "");
        setTimeout(() => chatHandleSubmit(), 0);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
        setTimeout(() => chatHandleSubmit(), 0);
    };

    const visibleMessages = useMemo(
        () => chatMessages.filter((message) => message.role !== "system"),
        [chatMessages],
    );

    return (
        <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
            <div className="flex-1 min-h-0 overflow-hidden">
                <Conversation className="flex h-full flex-col">
                    <ConversationContent className="flex-1 overflow-y-auto pr-1 max-w-4xl mx-auto w-full px-4 sm:px-8">
                        {visibleMessages.length === 0 ? (
                            <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 py-12 text-center text-muted-foreground">
                                <p className="text-lg font-semibold">欢迎来到 YunHai Chat</p>
                                <p className="max-w-lg text-base leading-7">
                                    输入你的问题或想法，我会结合站长背景为你提供可执行的解答。
                                </p>
                            </div>
                        ) : (
                            visibleMessages.map((message) => (
                                <ChatMessage
                                    key={message.id}
                                    message={message}
                                    isLoading={
                                        isLoading &&
                                        message.role === "assistant" &&
                                        !message.content &&
                                        !(message.parts && message.parts.length)
                                    }
                                />
                            ))
                        )}
                    </ConversationContent>
                    <ConversationScrollButton/>
                </Conversation>
            </div>
            <div className="grid shrink-0 gap-4 pt-4">
                <Suggestions className="px-4">
                    {SUGGESTIONS.map((suggestion) => (
                        <Suggestion
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            suggestion={suggestion}
                        />
                    ))}
                </Suggestions>
                <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 pb-2">
                    <div className={`flex items-start gap-2 w-full border border-border/50 bg-muted/30 hover:bg-muted/50 transition-all px-3 py-2 ${isMultiline ? 'rounded-2xl' : 'rounded-[26px]'}`}>
                        <button
                            type="button"
                            className="shrink-0 rounded-full size-10 flex items-center justify-center hover:bg-background/50 text-muted-foreground transition-colors mt-0.5"
                            aria-label="添加附件"
                        >
                            <PlusIcon className="size-5" />
                        </button>
                        <textarea
                            ref={textareaRef}
                            onChange={(event) => {
                                setInput(event.target.value);
                                // 自适应高度
                                const textarea = event.target;
                                textarea.style.height = 'auto';
                                textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
                                // 检测是否多行
                                setIsMultiline(textarea.scrollHeight > 56);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                                    e.preventDefault();
                                    if (input.trim()) {
                                        handleSubmit({ text: input, files: [] });
                                        // 重置高度
                                        if (textareaRef.current) {
                                            textareaRef.current.style.height = 'auto';
                                            setIsMultiline(false);
                                        }
                                    }
                                }
                            }}
                            value={input}
                            placeholder="询问任何问题"
                            rows={1}
                            className="flex-1 min-h-[40px] py-2 px-2 resize-none border-none focus:outline-none focus:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground leading-6"
                            style={{ maxHeight: '200px' }}
                        />
                        <div className={`flex items-center gap-1 shrink-0 ${isMultiline ? 'self-end mb-0.5' : ''}`}>
                            <button
                                type="button"
                                className="shrink-0 rounded-full size-10 flex items-center justify-center hover:bg-background/50 text-muted-foreground transition-colors"
                                aria-label="语音输入"
                            >
                                <MicIcon className="size-5" />
                            </button>
                            {isLoading ? (
                                <button
                                    type="button"
                                    onClick={stop}
                                    className="shrink-0 rounded-full size-10 flex items-center justify-center bg-foreground text-background transition-colors"
                                >
                                    <SquareIcon className="size-4"/>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    disabled={!input.trim()}
                                    onClick={() => {
                                        if (input.trim()) {
                                            handleSubmit({ text: input, files: [] });
                                            // 重置高度
                                            if (textareaRef.current) {
                                                textareaRef.current.style.height = 'auto';
                                                setIsMultiline(false);
                                            }
                                        }
                                    }}
                                    className="shrink-0 rounded-full size-10 flex items-center justify-center bg-foreground text-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <CornerDownLeftIcon className="size-4"/>
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-3">
                        AI 也可能会犯错。请核查重要信息。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatClient;
