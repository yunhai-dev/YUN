"use client";

import React, {useCallback, useEffect, useRef, useState} from 'react';
import 'highlight.js/styles/github-dark.css';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import java from 'highlight.js/lib/languages/java';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';

// 注册语言
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
import {Button} from "@/components/ui/button";
import JsonTree from "@/app/tools/json-formatter/JsonTree";
import {useFullscreen} from "@/hooks/use-fullscreen";
import {useToast} from "@/hooks/use-toast";
import {
    AlignLeft,
    ArrowLeftRight,
    Check,
    ChevronDown,
    Code2,
    Copy,
    Download,
    Eraser,
    Expand,
    FileCode,
    FileJson,
    FileType,
    Maximize,
    Minimize,
    Play,
    Settings,
    Shrink,
    Trash2,
    Type,
    X
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {jsonToCode, SUPPORTED_LANGUAGES, SupportedLanguage} from "@/lib/json-to-code";

const JsonFormatterPage = () => {
    const [inputJson, setInputJson] = useState('');
    const [outputJson, setOutputJson] = useState(''); // 用于存储格式化后的 JSON 字符串，用于 TreeView 和 复制
    const [error, setError] = useState<string | null>(null);
    const [leftPaneWidth, setLeftPaneWidth] = useState<number>(50);
    const [indentSize, setIndentSize] = useState<number>(4);
    const [fontSize, setFontSize] = useState<number>(14);
    const [codeDialogOpen, setCodeDialogOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const [highlightedCode, setHighlightedCode] = useState('');
    const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('typescript');
    const [activeTab, setActiveTab] = useState<'tree' | 'code'>('tree');
    const [codeLanguage, setCodeLanguage] = useState<SupportedLanguage>('typescript');
    
    // 右侧标签页配置
    const rightPanelTabs = [
        { id: 'tree', label: '树形视图', icon: FileJson },
        { id: 'code', label: '代码生成', icon: FileCode },
    ];
    
    const containerRef = useRef<HTMLDivElement>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef<boolean>(false);
    const {isFullscreen, toggleFullscreen} = useFullscreen(editorContainerRef);
    const {toast} = useToast();
    const [isDarkMode, setIsDarkMode] = useState(true);

    // 示例 JSON
    const demoJson = {
        "project": "YUN",
        "version": "1.0.0",
        "features": [
            "Next.js 15",
            "React 18",
            "Tailwind CSS",
            "Shadcn UI"
        ],
        "author": {
            "name": "Yunhai",
            "github": "https://github.com/yunhai-dev"
        },
        "active": true,
        "stats": {
            "stars": 100,
            "forks": 20
        }
    };

    // 核心功能函数
    const formatJson = (json: string, indent: number = indentSize) => {
        try {
            const parsed = JSON.parse(json);
            return JSON.stringify(parsed, null, indent);
        } catch (e) {
            throw e;
        }
    };

    const handleFormat = () => {
        setError(null);
        if (!inputJson.trim()) return;
        try {
            const formatted = formatJson(inputJson);
            setInputJson(formatted); // 更新输入框
            setOutputJson(formatted); // 更新树形视图数据
        } catch (e) {
            setError(`无效的 JSON: ${e}`);
        }
    };

    const handleCompress = () => {
        setError(null);
        if (!inputJson.trim()) return;
        try {
            const parsed = JSON.parse(inputJson);
            const compressed = JSON.stringify(parsed);
            setInputJson(compressed);
            setOutputJson(compressed);
        } catch (e) {
            setError(`无效的 JSON: ${e}`);
        }
    };

    const handleDemo = () => {
        const demoStr = JSON.stringify(demoJson, null, indentSize);
        setInputJson(demoStr);
        setOutputJson(demoStr);
        setError(null);
    };

    const handleClear = () => {
        setInputJson('');
        setOutputJson('');
        setError(null);
    };

    const handleCopy = () => {
        if (inputJson) {
            navigator.clipboard.writeText(inputJson);
            toast({
                title: "已复制",
                description: "JSON 内容已复制到剪贴板",
            });
        }
    };

    const handleDownload = () => {
        if (!inputJson) return;
        const blob = new Blob([inputJson], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // 底部工具函数
    const handleUnicodeToChinese = () => {
        try {
            // 简单的 Unicode 转中文：JSON.parse 会自动处理 \uXXXX
            // 如果输入是纯字符串内容，可能需要包裹引号
            // 这里假设用户输入的是包含 Unicode 的 JSON 或字符串
            const converted = inputJson.replace(/\\u[\dA-F]{4}/gi, (match) => {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
            });
            setInputJson(converted);
        } catch (e) {
            setError("转换失败");
        }
    };

    const handleChineseToUnicode = () => {
        const converted = inputJson.split('').map(char => {
            const code = char.charCodeAt(0);
            return code > 127 ? '\\u' + code.toString(16).padStart(4, '0') : char;
        }).join('');
        setInputJson(converted);
    };

    const handleEscape = () => {
        // 转义：将字符串转为 JSON 字符串形式（加引号并转义内部字符）
        // 如果已经是 JSON 对象，则整体转义
        try {
             // 简单的转义逻辑：作为字符串处理
            const escaped = JSON.stringify(inputJson);
            // 去掉首尾的引号，只保留内容的转义（可选，视需求而定，这里保留标准 JSON 字符串格式）
            setInputJson(escaped.slice(1, -1)); 
        } catch (e) {
            setError("转义失败");
        }
    };

    const handleUnescape = () => {
        try {
            // 反转义：JSON.parse 字符串
            // 需要包裹引号才能 parse 字符串内容
            const unescaped = JSON.parse(`"${inputJson}"`);
            setInputJson(unescaped);
        } catch (e) {
            // 尝试直接 parse，也许用户输入的是完整的 JSON 字符串
            try {
                const unescaped = JSON.parse(inputJson);
                if (typeof unescaped === 'string') {
                    setInputJson(unescaped);
                } else {
                    setError("无法反转义非字符串内容");
                }
            } catch (e2) {
                setError("反转义失败");
            }
        }
    };

    const handleGetParams = () => {
        try {
            const obj = JSON.parse(inputJson);
            if (typeof obj !== 'object' || obj === null) {
                setError("必须是 JSON 对象才能转换为参数");
                return;
            }
            
            // 扁平化处理
            const params = new URLSearchParams();
            const addParams = (data: any, prefix = '') => {
                for (const key in data) {
                    const value = data[key];
                    const newKey = prefix ? `${prefix}[${key}]` : key;
                    if (typeof value === 'object' && value !== null) {
                        addParams(value, newKey);
                    } else {
                        params.append(newKey, String(value));
                    }
                }
            };
            
            // 简单的一层转换，或者递归？这里做简单的一层转换，复杂对象转为 string
            // 重新实现简单的 key=value&key2=value2
            const queryString = Object.keys(obj).map(key => {
                const val = obj[key];
                return `${key}=${typeof val === 'object' ? JSON.stringify(val) : val}`;
            }).join('&');
            
            setInputJson(queryString);
        } catch (e) {
            setError("转换为参数失败: 无效的 JSON");
        }
    };
    
    const handleParamsToJson = () => {
        try {
            const params = new URLSearchParams(inputJson);
            const obj: any = {};
            params.forEach((value, key) => {
                // 尝试解析 value 为 JSON，如果是数字或布尔值或对象
                try {
                    obj[key] = JSON.parse(value);
                } catch {
                    obj[key] = value;
                }
            });
            setInputJson(JSON.stringify(obj, null, indentSize));
            setOutputJson(JSON.stringify(obj, null, indentSize));
        } catch (e) {
            setError("参数转 JSON 失败");
        }
    }

    // JSON 转代码
    const handleGenerateCode = (lang: SupportedLanguage) => {
        try {
            const parsed = JSON.parse(inputJson);
            const code = jsonToCode(parsed, lang);
            setGeneratedCode(code);
            setSelectedLang(lang);
            setCodeLanguage(lang);
            
            // 高亮代码
            const highlighted = hljs.highlight(code, { language: lang }).value;
            setHighlightedCode(highlighted);
            
            setActiveTab('code');
        } catch (e) {
            setError("无法生成代码：JSON 格式无效");
        }
    };
    
    // 生成代码（用于标签页内）
    const generateCodeForTab = useCallback(() => {
        try {
            const parsed = JSON.parse(outputJson || inputJson);
            return jsonToCode(parsed, codeLanguage);
        } catch {
            return '';
        }
    }, [outputJson, inputJson, codeLanguage]);

    const copyGeneratedCode = () => {
        navigator.clipboard.writeText(generatedCode);
        toast({
            title: "已复制",
            description: "代码已复制到剪贴板",
        });
    };

    // 拖拽逻辑
    const updatePaneWidth = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const mouseX = e.clientX - containerRect.left;
        let newLeftPaneWidth = (mouseX / containerWidth) * 100;
        
        if (newLeftPaneWidth < 5) newLeftPaneWidth = 0;
        if (newLeftPaneWidth > 95) newLeftPaneWidth = 100;
        
        newLeftPaneWidth = Math.max(0, Math.min(100, newLeftPaneWidth));
        setLeftPaneWidth(newLeftPaneWidth);
    }, []);

    const throttledMouseMove = useCallback((e: MouseEvent) => {
        if (isDraggingRef.current) updatePaneWidth(e);
    }, [updatePaneWidth]);

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', throttledMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [throttledMouseMove]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        isDraggingRef.current = true;
        document.addEventListener('mousemove', throttledMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMouseUp, throttledMouseMove]);

    // 自动更新 TreeView
    useEffect(() => {
        // 监听主题变化
        const checkTheme = () => {
            setIsDarkMode(!document.documentElement.classList.contains('light'));
        };
        checkTheme();
        
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inputJson.trim()) {
            setOutputJson('');
            return;
        }
        // 简单的防抖，避免每次输入都解析
        const timer = setTimeout(() => {
            try {
                JSON.parse(inputJson);
                setOutputJson(inputJson);
                setError(null);
            } catch (e) {
                // 输入过程中不报错，只在格式化时报错，或者在 UI 上显示轻微提示
                // 这里不做处理，保持上一次合法的 outputJson 或者清空？
                // 保持不变比较好，或者不更新 TreeView
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [inputJson]);

    const ToolbarBtn = ({icon: Icon, title, action, active = false, label}: any) => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={action}
                    className={`h-8 px-2 gap-1.5 hover:bg-muted ${active ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                >
                    <Icon className="h-4 w-4"/>
                    {label && <span className="text-xs">{label}</span>}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{title}</p>
            </TooltipContent>
        </Tooltip>
    );

    return (
        <TooltipProvider>
            <main className="min-h-screen flex flex-col">
                <div ref={editorContainerRef} className={`${isFullscreen ? 'p-0 h-screen' : 'pt-32 pb-8 px-4 flex-1'} main transition-all duration-300 flex flex-col`}>
                    {!isFullscreen && (
                        <>
                            <h1 className="text-4xl font-bold mb-8">JSON 编辑器</h1>
                            <p className="text-muted-foreground mb-8">在线 JSON 编辑、格式化、压缩、转义及校验工具。</p>
                        </>
                    )}

                    <div className={`flex flex-col border border-input rounded-md overflow-hidden bg-background shadow-sm ${isFullscreen ? 'flex-1' : 'h-[80vh]'}`}>
                        {/* 顶部工具栏 */}
                        <div className="flex flex-wrap items-center p-2 border-b border-input bg-card gap-1">
                            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-1">
                                <ToolbarBtn icon={AlignLeft} title="格式化" label="格式化" action={handleFormat}/>
                                <ToolbarBtn icon={Shrink} title="压缩" label="压缩" action={handleCompress}/>
                                <ToolbarBtn icon={Play} title="加载示例" label="Demo" action={handleDemo}/>
                                
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground">
                                            <Settings className="h-3.5 w-3.5"/>
                                            <span>操作</span>
                                            <ChevronDown className="h-3 w-3 opacity-50"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem onClick={handleUnicodeToChinese}>
                                            <ArrowLeftRight className="mr-2 h-4 w-4"/> Unicode转中文
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleChineseToUnicode}>
                                            <ArrowLeftRight className="mr-2 h-4 w-4"/> 中文转Unicode
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleEscape}>
                                            <Code2 className="mr-2 h-4 w-4"/> 添加转义
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleUnescape}>
                                            <Code2 className="mr-2 h-4 w-4"/> 去除转义
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleGetParams}>
                                            <FileType className="mr-2 h-4 w-4"/> JSON转参数
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleParamsToJson}>
                                            <FileType className="mr-2 h-4 w-4"/> 参数转JSON
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground">
                                            <Settings className="h-3.5 w-3.5"/>
                                            <span>{indentSize}空格</span>
                                            <ChevronDown className="h-3 w-3 opacity-50"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setIndentSize(2)}>2 空格</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setIndentSize(4)}>4 空格</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setIndentSize(8)}>8 空格</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground">
                                            <Type className="h-3.5 w-3.5"/>
                                            <span>{fontSize}px</span>
                                            <ChevronDown className="h-3 w-3 opacity-50"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {[12, 13, 14, 15, 16, 18, 20].map(size => (
                                            <DropdownMenuItem key={size} onClick={() => setFontSize(size)}>{size}px</DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex-1"></div>

                            <div className="flex items-center gap-1">
                                <ToolbarBtn icon={Copy} title="复制内容" action={handleCopy}/>
                                <ToolbarBtn icon={Download} title="下载 JSON" action={handleDownload}/>
                                <ToolbarBtn icon={Eraser} title="清空" action={handleClear}/>
                                <ToolbarBtn icon={isFullscreen ? Minimize : Maximize} title={isFullscreen ? "退出全屏" : "全屏"} action={toggleFullscreen}/>
                            </div>
                        </div>

                        {/* 主体区域 */}
                        <div ref={containerRef} className="flex-1 flex flex-row relative overflow-hidden">
                            {/* 左侧编辑区 */}
                            <div className="h-full flex flex-col overflow-hidden min-w-0" style={{width: `${leftPaneWidth}%`}}>
                                <textarea
                                    value={inputJson}
                                    onChange={(e) => setInputJson(e.target.value)}
                                    className="w-full h-full p-4 bg-background font-mono resize-none focus:outline-none border-0 leading-relaxed whitespace-pre-wrap"
                                    style={{fontSize: `${fontSize}px`}}
                                    placeholder="在此输入 JSON 数据..."
                                    spellCheck={false}
                                />
                                {error && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-destructive/10 text-destructive text-xs p-2 border-t border-destructive/20">
                                        {error}
                                    </div>
                                )}
                            </div>

                            {/* 拖动条 */}
                            <div
                                className="w-1 h-full bg-border hover:bg-primary cursor-col-resize flex items-center justify-center relative z-10 transition-colors"
                                onMouseDown={handleMouseDown}
                            >
                                <div className="absolute w-4 h-8 bg-muted border border-border rounded-full flex items-center justify-center shadow-sm">
                                    <div className="w-0.5 h-4 bg-muted-foreground/50 mx-0.5 rounded-full"></div>
                                </div>
                            </div>

                            {/* 右侧预览区 - 标签页 */}
                            <div className="h-full overflow-hidden bg-muted/5 flex flex-col" style={{width: `${100 - leftPaneWidth}%`}}>
                                {/* 标签页头部 */}
                                <div className="border-b border-input bg-muted/30 px-2 flex items-center gap-1">
                                    {rightPanelTabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as 'tree' | 'code')}
                                            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors border-b-2 -mb-px ${
                                                activeTab === tab.id
                                                    ? 'border-primary text-primary'
                                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                                            }`}
                                        >
                                            <tab.icon className="h-3.5 w-3.5" />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* 标签页内容 */}
                                <div className="flex-1 overflow-auto">
                                    {activeTab === 'tree' && (
                                        <div className="p-4 h-full">
                                            {outputJson ? (
                                                <JsonTree 
                                                    data={(() => {
                                                        try {
                                                            return JSON.parse(outputJson);
                                                        } catch {
                                                            return null;
                                                        }
                                                    })()}
                                                    onUpdate={(newData) => {
                                                        const newJsonStr = JSON.stringify(newData, null, indentSize);
                                                        setInputJson(newJsonStr);
                                                        setOutputJson(newJsonStr);
                                                    }}
                                                />
                                            ) : (
                                                <div className="text-muted-foreground text-sm flex items-center justify-center h-full">
                                                    <FileJson className="h-12 w-12 opacity-20 mb-2"/>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'code' && (
                                        <div className="p-4 h-full flex flex-col gap-4">
                                            {/* 语言选择 */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">目标语言：</span>
                                                <div className="flex gap-1 flex-wrap">
                                                    {(['python', 'typescript', 'java', 'go', 'rust'] as const).map((lang) => (
                                                        <Button
                                                            key={lang}
                                                            variant={codeLanguage === lang ? 'default' : 'outline'}
                                                            size="sm"
                                                            className="h-7 text-xs"
                                                            onClick={() => setCodeLanguage(lang)}
                                                        >
                                                            {lang === 'python' ? 'Python' : 
                                                             lang === 'typescript' ? 'TypeScript' : 
                                                             lang === 'java' ? 'Java' : 
                                                             lang === 'go' ? 'Go' : 'Rust'}
                                                        </Button>
                                                    ))}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 text-xs ml-auto"
                                                    onClick={() => {
                                                        const code = generateCodeForTab();
                                                        if (code) {
                                                            navigator.clipboard.writeText(code);
                                                            toast({
                                                                title: "已复制",
                                                                description: "代码已复制到剪贴板",
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <Copy className="mr-1 h-3 w-3"/> 复制代码
                                                </Button>
                                            </div>

                                            {/* 代码显示区 */}
                                            <div className="flex-1 overflow-auto rounded-md bg-muted/30">
                                                {outputJson ? (
                                                    <pre 
                                                        className="px-6 py-4 text-xs h-full"
                                                        dangerouslySetInnerHTML={{
                                                            __html: (() => {
                                                                const code = generateCodeForTab();
                                                                if (!code) return '<span class="text-muted-foreground">无法生成代码</span>';
                                                                try {
                                                                    const highlighted = hljs.highlight(code, { 
                                                                        language: codeLanguage === 'typescript' ? 'typescript' : codeLanguage 
                                                                    });
                                                                    return highlighted.value;
                                                                } catch {
                                                                    return code;
                                                                }
                                                            })()
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="text-muted-foreground text-sm flex items-center justify-center h-full p-8">
                                                        <div className="text-center">
                                                            <FileCode className="h-12 w-12 opacity-20 mb-2 mx-auto"/>
                                                            <p>请先输入有效的 JSON 数据</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </TooltipProvider>
    );
};

export default JsonFormatterPage;
