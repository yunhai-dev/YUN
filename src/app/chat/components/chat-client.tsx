"use client";

import {memo, useEffect, useMemo, useState} from "react";
import {SquareIcon} from "lucide-react";
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
    PromptInput,
    PromptInputBody,
    PromptInputButton,
    PromptInputFooter,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {ModelSelector, ModelSelectorContent, ModelSelectorTrigger} from "@/components/ai-elements/model-selector";
import {Suggestion, Suggestions} from "@/components/ai-elements/suggestion";
import {Input} from "@/components/ui/input";
import {useChat} from "@/hooks/use-chat";
import {chatTools} from "../tools";

const DEFAULT_MODEL = "openai-gpt-oss-20b";
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
        <div>
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

                return (
                    <Tool key={`${message.id}-tool-${idx}`} className="group">
                        <ToolHeader type={part.type as `tool-${string}`} state={toolState}/>
                        <ToolContent>
                            <ToolInput input={part.input}/>
                            <ToolOutput
                                output={
                                    part.output ? (
                                        <MessageResponse>
                                            {typeof part.output === "string"
                                                ? part.output
                                                : JSON.stringify(part.output, null, 2)}
                                        </MessageResponse>
                                    ) : undefined
                                }
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
    const [modelSelectorOpen, setModelSelectorOpen] = useState(false);
    const [customModel, setCustomModel] = useState<string>("");
    const [apiKey, setApiKey] = useState<string>("");
    const [baseUrl, setBaseUrl] = useState<string>("");

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
        baseUrl: baseUrl || "https://ai.megallm.io",
        model: resolvedModel,
        tools: chatTools,
        initialMessages: [
            {
                id: "system-identity",
                role: "system",
                content: [
                    "你是站点主人 YunHai 的 AI 助手，口号：Make technology simpler and life better。",
                    "背景：爬虫工程（WebSocket 加密、CF、人机验证）、后端 Python/Django/FastAPI（Celery 队列、OAuth 登录）、前端 Vue/React（本站为首个 React 项目）、应用开发（PyQt/PySide/Flutter）、AI（SAM/YOLO/GPT 系列、Agent）、数据处理（视觉/音频）。",
                    "价值观：探索/创新，开放，持续学习；网站希望承载灵感与探索，技术应简化生活。",
                    "家乡：云南（玉龙雪山、东巴文化等）。",
                    "联系渠道（被问到时提供）：邮箱 yunhai@yhnotes.com；GitHub https://github.com/yunhai-dev；Gitee https://gitee.com/yun2hai；微信需说明意图，二维码见联系页；一般 24h 内回复，紧急邮件标题可写 URGENT。",
                    "回答风格：友好务实，先给可执行步骤，必要时引用上述背景，中文优先。",
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
        const savedApiKey = localStorage.getItem("chat-api-key") || "sk-mega-79bcf2206ac5f638ff49d734b8d1e2532e2434658ff4bbf9584fda54172c4ad5";
        const savedBaseUrl = localStorage.getItem("chat-base-url") || "https://ai.megallm.io";
        const savedModel = localStorage.getItem("chat-model-id") || "openai-gpt-oss-20b";
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
                    <ConversationContent className="flex-1 overflow-y-auto pr-1">
                        {visibleMessages.length === 0 ? (
                            <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 py-12 text-center text-muted-foreground">
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
                <div className="w-full px-4 pb-4">
                    <PromptInput onSubmit={handleSubmit}>
                        <PromptInputBody>
                            <PromptInputTextarea
                                onChange={(event) => setInput(event.target.value)}
                                value={input}
                            />
                        </PromptInputBody>
                        <PromptInputFooter>
                            <PromptInputTools>
                                <ModelSelector
                                    onOpenChange={setModelSelectorOpen}
                                    open={modelSelectorOpen}
                                >
                                    <ModelSelectorTrigger asChild>
                                        <PromptInputButton className="w-fit max-w-52 justify-center px-2">
                                            <span
                                                className="truncate text-center">{customModel || resolvedModel || "模型设置"}</span>
                                        </PromptInputButton>
                                    </ModelSelectorTrigger>
                                    <ModelSelectorContent>
                                        <div className="space-y-3 p-3">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">自定义模型 ID</p>
                                                <Input
                                                    placeholder="例如 free:QwQ-32B（Suanli 默认）"
                                                    value={customModel}
                                                    onChange={(e) => setCustomModel(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">API Key（仅本地存储）</p>
                                                <Input
                                                    type="password"
                                                    placeholder="sk-..."
                                                    value={apiKey}
                                                    onChange={(e) => setApiKey(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">Base URL</p>
                                                <Input
                                                    placeholder="默认 https://ai.megallm.io"
                                                    value={baseUrl}
                                                    onChange={(e) => setBaseUrl(e.target.value)}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                配置保存在本地浏览器，仅当前设备生效。
                                            </p>
                                        </div>
                                    </ModelSelectorContent>
                                </ModelSelector>
                            </PromptInputTools>
                            {isLoading ? (
                                <PromptInputButton onClick={stop} variant="default">
                                    <SquareIcon size={16}/>
                                    <span>暂停</span>
                                </PromptInputButton>
                            ) : (
                                <PromptInputSubmit disabled={false} status="ready"/>
                            )}
                        </PromptInputFooter>
                    </PromptInput>
                </div>
            </div>
        </div>
    );
};

export default ChatClient;
