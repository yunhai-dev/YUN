"use client";

import React, {useState, useEffect, useRef} from 'react';
import {Button} from "@/components/ui/button";
import type {Mermaid} from "mermaid";
import mermaid from "mermaid";
import {Expand} from "@/components/icon/expand";
import {Collapse} from "@/components/icon/collapse";
import {Reset} from "@/components/icon/reset";
import {useFullscreen} from "@/hooks/use-fullscreen";
import {useAIGenerate} from "@/hooks/use-ai-generate";
import {Loader} from "@/components/ai-elements/loader";
import {MessageResponse} from "@/components/ai-elements/message";
import {Sparkles, CornerDownLeft, Square, X} from "lucide-react";

const MermaidPage = () => {
    const [inputCode, setInputCode] = useState('');
    const [svgOutput, setSvgOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState<'default' | 'dark' | 'forest' | 'neutral'>('default');
    const [mermaidApi, setMermaidApi] = useState<Mermaid | null>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const previewRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const aiInputRef = useRef<HTMLTextAreaElement>(null);

    // AI 相关状态
    const [aiMode, setAiMode] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");

    const {generate, isLoading: isGenerating, result: aiOutput, stop} = useAIGenerate({
        systemPrompt: "你是一个 Mermaid 图表代码助手。根据用户的要求生成或修改 Mermaid 代码。重要：当用户要求修改现有代码时，你必须输出完整的修改后代码，而不是只输出修改的部分。只输出纯 Mermaid 代码，不要包含任何解释或代码块包裹（不要用 ```mermaid 包裹）。支持流程图、时序图、甘特图、类图、状态图、饼图等各种 Mermaid 图表类型。",
    });

    // 使用自定义的 useFullscreen hook
    const { isFullscreen, toggleFullscreen } = useFullscreen(previewRef);

    useEffect(() => {
        const loadMermaid = async () => {
            try {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: theme,
                    securityLevel: 'loose',
                });
                setMermaidApi(mermaid);
            } catch (e) {
                setError('加载 Mermaid 库失败：' + (e as Error).message);
            }
        };
        loadMermaid().then();
    }, [theme]);
    
    // 监听全屏状态变化，重置缩放和位置
    useEffect(() => {
        // 如果退出全屏，重置缩放和位置
        if (!isFullscreen) {
            setScale(1);
            setPosition({ x: 0, y: 0 });
        }
    }, [isFullscreen]);

    // 自适应 SVG 大小
    useEffect(() => {
        if (contentRef.current && svgOutput) {
            const svg = contentRef.current.querySelector('svg');
            if (svg) {
                if (!isFullscreen) {
                    // 非全屏模式：自适应容器大小
                    svg.style.maxWidth = '100%';
                    svg.style.maxHeight = '100%';
                    svg.style.width = 'auto';
                    svg.style.height = 'auto';
                } else {
                    // 全屏模式：移除限制，允许缩放
                    svg.style.maxWidth = 'none';
                    svg.style.maxHeight = 'none';
                }
            }
        }
    }, [svgOutput, isFullscreen]);
    
    // 处理键盘快捷键
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // 空格键重置视图 - 只在全屏模式下有效
            if (e.code === 'Space' && isFullscreen) {
                resetView();
            }
            
            // 阻止键盘缩放快捷键在预览区域聚焦时的默认行为
            if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
                if (document.activeElement === previewRef.current || 
                    previewRef.current?.contains(document.activeElement as Node)) {
                    e.preventDefault();
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFullscreen]); // 添加 isFullscreen 作为依赖项

    const handleRender = async (code?: string) => {
        const codeToRender = code ?? inputCode;

        if (!mermaidApi) {
            setError('Mermaid 库尚未加载完成，请稍候...');
            return;
        }

        setError(null);
        setSvgOutput('');

        if (!codeToRender.trim()) {
            setError("请输入 Mermaid 代码。");
            return;
        }

        try {
            const {svg} = await mermaidApi.render('mermaid', codeToRender.trim());
            setSvgOutput(svg);
        } catch (e) {
            console.error('Mermaid 渲染错误:', e);
            setError(`渲染错误: ${e}`);
        }
    };

    const handleClear = () => {
        setInputCode('');
        setSvgOutput('');
        setError(null);
    };

    const handleDownloadSVG = () => {
        if (!svgOutput) return;

        const blob = new Blob([svgOutput], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    const handleWheel = (e: React.WheelEvent) => {
        // 只有在全屏模式下才启用缩放功能
        if (!isFullscreen) return;
        
        // 阻止默认行为，防止页面滚动
        e.preventDefault();
        
        let delta: number;
        
        // 检测触控板手势缩放 (通过 ctrlKey 识别)
        if (e.ctrlKey) {
            delta = e.deltaY * -0.01;
        } else {
            // 普通鼠标滚轮缩放
            delta = e.deltaY * -0.005; // 减小灵敏度
        }
        
        const newScale = Math.min(Math.max(0.1, scale + delta), 5);
        setScale(newScale);
    };
    
    const handleMouseDown = (e: React.MouseEvent) => {
        // 只有在全屏模式下才启用拖拽功能
        if (!isFullscreen) return;
        
        if (e.button === 0) { // 左键点击
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
        // 只有在全屏模式下才启用拖拽功能
        if (!isFullscreen) return;
        
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };
    
    const handleMouseUp = () => {
        // 即使不在全屏模式，也需要重置拖拽状态
        setIsDragging(false);
    };
    
    const resetView = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32">
                <h1 className="text-4xl font-bold mb-8">Mermaid 图表转换器</h1>
                <p className="text-muted-foreground mb-12">在线将 Mermaid 代码转换为 SVG
                    图表，支持流程图、时序图、甘特图等多种图表类型。</p>

                {error && (
                    <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 rounded-md text-red-400">
                        <h4 className="font-semibold mb-1">错误</h4>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative">
                        <label htmlFor="inputCode" className="block text-sm font-medium text-muted-foreground mb-2">
                            输入 Mermaid 代码:
                        </label>
                        <textarea
                            ref={textareaRef}
                            id="inputCode"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="在此处输入您的 Mermaid 代码..."
                            className="w-full h-96 p-2 border border-input rounded-md bg-background font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            预览:
                        </label>
                        <div 
                            ref={previewRef}
                            className="relative w-full h-96 p-2 border border-input rounded-md bg-muted/30 select-none focus:outline-none focus:ring-1 focus:ring-ring overflow-hidden"
                            onWheel={handleWheel}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            tabIndex={0}
                        >
                            <div className="absolute top-2 right-2 flex gap-2 z-10">
                                {isFullscreen && (
                                    <button 
                                        onClick={resetView}
                                        className="p-1.5 bg-background/80 hover:bg-background border border-input rounded-md"
                                        title="重置视图 (空格键)"
                                    >
                                        <Reset />
                                    </button>
                                )}
                                <button 
                                    onClick={toggleFullscreen}
                                    className="p-1.5 bg-background/80 hover:bg-background border border-input rounded-md"
                                    title={isFullscreen ? "退出全屏" : "全屏显示"}
                                >
                                    {isFullscreen ? <Collapse /> : <Expand />}
                                </button>
                            </div>
                            <div className="absolute inset-2 overflow-hidden">
                                {svgOutput ? (
                                    <div 
                                        className="w-full h-full flex items-center justify-center"
                                        style={{
                                            cursor: isFullscreen ? (isDragging ? 'grabbing' : 'grab') : 'default'
                                        }}
                                    >
                                        <div
                                            ref={contentRef}
                                            className="transform-gpu transition-transform duration-75"
                                            style={{
                                                transform: isFullscreen ? `translate(${position.x}px, ${position.y}px) scale(${scale})` : 'none',
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            dangerouslySetInnerHTML={{__html: svgOutput}}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        图表预览将显示在此处...
                                    </div>
                                )}
                            </div>
                            {isFullscreen && (
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 rounded-md text-xs text-muted-foreground">
                                    {scale.toFixed(1)}x | 滚轮缩放 | 拖拽移动 | 空格重置
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button onClick={handleRender}>生成图表</Button>
                        <Button variant="outline" onClick={handleClear}>清空</Button>
                        <Button
                            variant={aiMode ? "default" : "outline"}
                            onClick={() => {
                                setAiMode(!aiMode);
                                setAiPrompt("");
                            }}
                            className="gap-2"
                        >
                            <Sparkles className="h-4 w-4" />
                            AI 助手
                        </Button>
                        {svgOutput && (
                            <Button variant="outline" onClick={handleDownloadSVG}>
                                下载 SVG
                            </Button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="themeSelect" className="text-sm text-muted-foreground">主题:</label>
                        <select
                            id="themeSelect"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value as 'default' | 'dark' | 'forest' | 'neutral')}
                            className="bg-background border border-input rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                        >
                            <option value="default">默认</option>
                            <option value="dark">暗色</option>
                            <option value="forest">森林</option>
                            <option value="neutral">中性</option>
                        </select>
                    </div>
                </div>

                {/* AI 悬浮输入框 */}
                {aiMode && (
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
                        {/* AI 输出预览 */}
                        {(aiOutput || isGenerating) && (
                            <div className="mb-2 p-3 bg-card/95 backdrop-blur border border-border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                {aiOutput ? (
                                    <div className="prose dark:prose-invert max-w-none text-sm">
                                        <MessageResponse>{aiOutput}</MessageResponse>
                                    </div>
                                ) : isGenerating ? (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Loader size={16}/>
                                        <span className="text-sm">正在生成...</span>
                                    </div>
                                ) : null}
                            </div>
                        )}

                        {/* 应用按钮 */}
                        {aiOutput && !isGenerating && (
                            <div className="mb-2 flex gap-2 justify-center">
                                <Button size="sm" onClick={() => {
                                    setInputCode(aiOutput);
                                    setAiMode(false);
                                    setAiPrompt("");
                                    // 直接传递 aiOutput 给 handleRender
                                    handleRender(aiOutput);
                                }}>
                                    替换代码
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => {
                                    setInputCode(inputCode + "\n\n" + aiOutput);
                                    setAiMode(false);
                                    setAiPrompt("");
                                }}>
                                    追加末尾
                                </Button>
                            </div>
                        )}

                        {/* 输入框 */}
                        <div className="flex items-end gap-2 bg-card/95 backdrop-blur border border-border rounded-2xl px-4 py-3 shadow-lg">
                            <textarea
                                ref={aiInputRef}
                                value={aiPrompt}
                                onChange={(e) => {
                                    setAiPrompt(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                                        e.preventDefault();
                                        if (aiPrompt.trim() && !isGenerating) {
                                            let prompt = aiPrompt;
                                            if (inputCode.trim()) {
                                                prompt = `以下是当前的 Mermaid 代码：\n\n---\n${inputCode}\n---\n\n请根据以下要求修改代码，并输出修改后的完整代码：${aiPrompt}`;
                                            }
                                            generate(prompt);
                                        }
                                    }
                                    if (e.key === 'Escape') {
                                        setAiMode(false);
                                        setAiPrompt("");
                                    }
                                }}
                                placeholder={inputCode.trim() ? "描述你想如何修改图表..." : "描述你想生成的图表..."}
                                rows={1}
                                className="flex-1 min-h-[36px] py-1 resize-none border-none focus:outline-none focus:ring-0 bg-transparent text-sm"
                                style={{maxHeight: '100px'}}
                                autoFocus
                            />
                            <div className="flex items-center gap-1">
                                {isGenerating ? (
                                    <button
                                        onClick={stop}
                                        className="shrink-0 rounded-full size-9 flex items-center justify-center bg-destructive text-destructive-foreground"
                                    >
                                        <Square className="size-4"/>
                                    </button>
                                ) : (
                                    <button
                                        disabled={!aiPrompt.trim()}
                                        onClick={() => {
                                            if (aiPrompt.trim()) {
                                                let prompt = aiPrompt;
                                                if (inputCode.trim()) {
                                                    prompt = `以下是当前的 Mermaid 代码：\n\n---\n${inputCode}\n---\n\n请根据以下要求修改代码，并输出修改后的完整代码：${aiPrompt}`;
                                                }
                                                generate(prompt);
                                            }
                                        }}
                                        className="shrink-0 rounded-full size-9 flex items-center justify-center bg-primary text-primary-foreground disabled:opacity-50"
                                    >
                                        <CornerDownLeft className="size-4"/>
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setAiMode(false);
                                        setAiPrompt("");
                                    }}
                                    className="shrink-0 rounded-full size-9 flex items-center justify-center hover:bg-muted text-muted-foreground"
                                >
                                    <X className="size-4"/>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MermaidPage; 