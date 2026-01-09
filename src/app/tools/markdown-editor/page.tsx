"use client";

import React, {useCallback, useEffect, useRef, useState} from 'react';
import 'highlight.js/styles/github-dark.css';

import {
    Bold,
    CheckSquare,
    ChevronDown,
    Code,
    CornerDownLeft,
    Download,
    Eraser,
    FileCode,
    FileImage,
    FileText,
    Heading1,
    Heading2,
    Heading3,
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    LoaderCircle,
    Maximize,
    Minimize,
    Minus,
    Quote,
    Sparkles,
    Square,
    Strikethrough,
    Table,
    Trash2,
    X
} from "lucide-react";

import {markdownToHtml} from "@/lib/markdown";
import {downloadMarkdownAsDocx} from "@/lib/markdown-to-docx";
import {useFullscreen} from "@/hooks/use-fullscreen";
import {useToast} from "@/hooks/use-toast";
import html2canvas from 'html2canvas'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useAIGenerate} from "@/hooks/use-ai-generate";
import {Loader} from "@/components/ai-elements/loader";
import {MessageResponse} from "@/components/ai-elements/message";

const MarkdownEditorPage = () => {
    const [markdownText, setMarkdownText] = useState<string>('');
    const [htmlPreview, setHtmlPreview] = useState<string>('');
    const [leftPaneWidth, setLeftPaneWidth] = useState<number>(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const aiInputRef = useRef<HTMLTextAreaElement>(null);
    const isDraggingRef = useRef<boolean>(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const {toast} = useToast();
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);
    const [docxLoading, setDocxLoading] = useState(false);
    const [aiMode, setAiMode] = useState(false);
    const [selectedText, setSelectedText] = useState("");
    const [aiPrompt, setAiPrompt] = useState("");

    const {generate, isLoading: isGenerating, result: aiOutput, stop} = useAIGenerate({
        systemPrompt: "你是一个 Markdown 写作助手。根据用户的要求生成或修改 Markdown 内容。重要：当用户要求修改现有文档时，你必须输出完整的修改后文档，而不是只输出修改的部分。只输出纯 Markdown 文本，不要包含任何解释或代码块包裹。",
    });

    const [globalIsDark, setGlobalIsDark] = useState(true);

    // 监听全局主题
    useEffect(() => {
        const checkTheme = () => {
            const isLight = document.documentElement.classList.contains('light');
            setGlobalIsDark(!isLight);
        };

        // 初始检查
        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    // 使用自定义的 useFullscreen hook
    const {isFullscreen, toggleFullscreen} = useFullscreen(editorContainerRef);

    // 示例Markdown文本
    const defaultMarkdown = `# Markdown 编辑器示例

## 基本语法

### 标题

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

### 强调

*斜体文本* 或 _斜体文本_

**粗体文本** 或 __粗体文本__

***粗斜体文本*** 或 ___粗斜体文本___

~~删除线文本~~

### 列表

无序列表:
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2

有序列表:
1. 第一项
2. 第二项
3. 第三项

### 链接和图片

[链接文本](https://example.com)

![图片替代文本](https://rustfs-endpoint.yhnotes.com/content/Avatar.webp)

### 引用

> 这是一段引用文本。
> 
> 引用可以有多个段落。

### 代码

行内代码: \`const example = "hello world";\`

代码块:
\`\`\`javascript
function greeting(name) {
  return \`Hello, \${name}!\`;
}
console.log(greeting("World"));
\`\`\`

### 表格

| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

### 水平线

---

### 任务列表

- [x] 已完成任务
- [ ] 未完成任务

### 自定义容器 (info | warn | tip | danger)
::: info
hello info
:::

::: tip
hello tip
:::

::: warn
hello warn
:::

::: danger
hello
:::

`;

    // 核心编辑功能
    const handleToolbarAction = (action: string, value?: number) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = markdownText;

        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        let newText = text;
        let newSelectionStart = start;
        let newSelectionEnd = end;

        // 辅助函数：获取当前行范围
        const getLineRange = (pos: number) => {
            const lastNewLine = text.lastIndexOf('\n', pos - 1);
            const nextNewLine = text.indexOf('\n', pos);
            return {
                start: lastNewLine === -1 ? 0 : lastNewLine + 1,
                end: nextNewLine === -1 ? text.length : nextNewLine
            };
        };

        switch (action) {
            case 'bold':
                newText = before + `**${selection}**` + after;
                newSelectionStart = start + 2;
                newSelectionEnd = end + 2;
                break;
            case 'italic':
                newText = before + `*${selection}*` + after;
                newSelectionStart = start + 1;
                newSelectionEnd = end + 1;
                break;
            case 'strikethrough':
                newText = before + `~~${selection}~~` + after;
                newSelectionStart = start + 2;
                newSelectionEnd = end + 2;
                break;
            case 'code':
                newText = before + `\`${selection}\`` + after;
                newSelectionStart = start + 1;
                newSelectionEnd = end + 1;
                break;
            case 'heading':
                const level = value as number;
                const prefix = '#'.repeat(level) + ' ';
                const {start: lineStart, end: lineEnd} = getLineRange(start);
                const lineContent = text.substring(lineStart, lineEnd);
                // 移除已有的标题前缀
                const cleanLine = lineContent.replace(/^#+\s/, '');

                // 如果当前已经是该级别的标题，则取消标题
                if (lineContent.startsWith(prefix)) {
                    newText = text.substring(0, lineStart) + cleanLine + text.substring(lineEnd);
                    newSelectionEnd = newSelectionStart + cleanLine.length;
                } else {
                    newText = text.substring(0, lineStart) + prefix + cleanLine + text.substring(lineEnd);
                    newSelectionEnd = newSelectionStart + prefix.length + cleanLine.length;
                }
                break;
            case 'quote':
            case 'list':
            case 'ordered-list':
            case 'task-list':
                // 处理多行块级元素
                const blockStart = text.lastIndexOf('\n', start - 1) + 1;
                let blockEnd = text.indexOf('\n', end);
                if (blockEnd === -1) blockEnd = text.length;

                const blockContent = text.substring(blockStart, blockEnd);
                const lines = blockContent.split('\n');

                const newLines = lines.map((line, index) => {
                    // 移除现有的前缀
                    let cleanLine = line;
                    if (action === 'quote') cleanLine = line.replace(/^>\s/, '');
                    else if (action === 'list') cleanLine = line.replace(/^-\s/, '');
                    else if (action === 'ordered-list') cleanLine = line.replace(/^\d+\.\s/, '');
                    else if (action === 'task-list') cleanLine = line.replace(/^-\s\[[ x]\]\s/, '');

                    // 如果之前有前缀且没变，说明是取消操作
                    if (cleanLine !== line) return cleanLine;

                    // 添加新前缀
                    if (action === 'quote') return `> ${line}`;
                    if (action === 'list') return `- ${line}`;
                    if (action === 'ordered-list') return `${index + 1}. ${line}`;
                    if (action === 'task-list') return `- [ ] ${line}`;
                    return line;
                });

                newText = text.substring(0, blockStart) + newLines.join('\n') + text.substring(blockEnd);
                newSelectionStart = blockStart;
                newSelectionEnd = blockStart + newLines.join('\n').length;
                break;
            case 'link':
                const linkText = selection || '链接文本';
                newText = before + `[${linkText}](url)` + after;
                newSelectionStart = start + 1;
                newSelectionEnd = start + 1 + linkText.length;
                break;
            case 'image':
                const imgText = selection || '图片描述';
                newText = before + `![${imgText}](url)` + after;
                newSelectionStart = start + 2;
                newSelectionEnd = start + 2 + imgText.length;
                break;
            case 'table':
                const tableTemplate = `
| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
`;
                newText = before + tableTemplate + after;
                newSelectionStart = start + tableTemplate.length;
                newSelectionEnd = start + tableTemplate.length;
                break;
            case 'codeblock':
                const codeBlock = `\`\`\`language
${selection}
\`\`\``;
                newText = before + codeBlock + after;
                newSelectionStart = start + 3;
                newSelectionEnd = start + 11; // 选中 "language"
                break;
            case 'hr':
                newText = before + '\n---\n' + after;
                newSelectionStart = start + 5;
                newSelectionEnd = start + 5;
                break;
            case 'clear':
                // 简单的清除：移除所有 Markdown 标记（简化版）
                // 实际实现比较复杂，这里仅作为占位或简单移除选区内的 ** 等
                newText = before + selection.replace(/[*_~`#]/g, '') + after;
                break;
        }

        setMarkdownText(newText);

        // 恢复焦点
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
        }, 0);
    };

    // 使用节流处理鼠标移动更新
    const updatePaneWidth = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const mouseX = e.clientX - containerRect.left;

        // 计算左侧宽度百分比
        let newLeftPaneWidth = (mouseX / containerWidth) * 100;

        // 增加吸附效果：接近边缘时自动吸附
        if (newLeftPaneWidth < 5) newLeftPaneWidth = 0;
        if (newLeftPaneWidth > 95) newLeftPaneWidth = 100;

        // 限制在0%到100%之间
        newLeftPaneWidth = Math.max(0, Math.min(100, newLeftPaneWidth));

        setLeftPaneWidth(newLeftPaneWidth);
    }, []);

    // 创建节流后的鼠标移动处理函数
    const throttledMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDraggingRef.current) {
                updatePaneWidth(e);
            }
        },
        [updatePaneWidth]
    );

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', throttledMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [throttledMouseMove]);

    // 处理分隔线拖动
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        isDraggingRef.current = true;
        document.addEventListener('mousemove', throttledMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMouseUp, throttledMouseMove]);

    // 下载Markdown文件
    function downloadMarkdown() {
        try {
            setDownloadLoading(true);
            const blob = new Blob([markdownText], {type: 'text/markdown'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'document.md';
            a.click();
            URL.revokeObjectURL(url);
        } finally {
            setDownloadLoading(false);
        }
    }

    // 导出为图片
    function exportAsImage() {
        try {
            setExportLoading(true);
            toast({
                title: "导出图片",
                description: "正在导出预览内容为图片，请稍候...",
                variant: "default",
            })
            const previewElement = document.querySelector('.prose') as HTMLElement;

            if (!previewElement) {
                toast({
                    title: "错误",
                    description: "无法获取预览内容",
                    variant: "destructive",
                });
                return;
            }

            // 创建一个临时容器，用于克隆和渲染完整内容
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.top = '0';
            tempContainer.style.width = `${previewElement.scrollWidth}px`;

            // 克隆预览内容
            const clonedContent = previewElement.cloneNode(true) as HTMLElement;
            clonedContent.style.width = `${previewElement.scrollWidth}px`;
            clonedContent.style.height = 'auto';
            clonedContent.style.overflow = 'visible';
            clonedContent.style.maxHeight = 'none';

            // 设置背景和样式
            clonedContent.classList.add('prose', 'prose-invert');
            clonedContent.style.padding = '40px'; // 增加内边距
            const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
            const backgroundColor = bgColor ? `hsl(${bgColor})` : '#121212';
            clonedContent.style.background = backgroundColor;

            // 添加到临时容器
            tempContainer.appendChild(clonedContent);
            document.body.appendChild(tempContainer);

            // 使用html2canvas将内容转为canvas
            html2canvas(clonedContent, {
                scale: 2, // 高分辨率
                useCORS: true, // 允许跨域图片
                allowTaint: true,
                backgroundColor: backgroundColor,
                windowWidth: document.documentElement.offsetWidth,
                windowHeight: document.documentElement.offsetHeight,
                logging: false,
                onclone: (doc) => {
                    // 确保所有样式都被应用
                    const styles = Array.from(document.styleSheets);
                    styles.forEach(styleSheet => {
                        try {
                            const cssRules = Array.from(styleSheet.cssRules);
                            const style = doc.createElement('style');
                            cssRules.forEach(rule => {
                                style.appendChild(doc.createTextNode(rule.cssText));
                            });
                            doc.head.appendChild(style);
                        } catch (e) {
                            console.log('无法访问样式表:', e);
                        }
                    });
                }
            }).then(canvas => {
                const image = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = image;
                a.download = 'markdown-preview.png';
                a.click();
                document.body.removeChild(tempContainer);
            }).catch(error => {
                console.error('导出图片失败:', error);
                if (document.body.contains(tempContainer)) {
                    document.body.removeChild(tempContainer);
                }
            });
        } finally {
            setExportLoading(false);
        }
    }

    // 导出为 Word
    async function exportAsDocx() {
        try {
            setDocxLoading(true);
            await downloadMarkdownAsDocx(markdownText, 'document.docx');
        } finally {
            setDocxLoading(false);
        }
    }

    // 当Markdown文本变化时更新预览
    useEffect(() => {
        try {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                localStorage.setItem('markdownText', markdownText);
            }, 1000)
            markdownToHtml(markdownText).then(({content}) => {
                setHtmlPreview(content)
            })
        } catch (error) {
            console.error('Markdown解析错误:', error);
            setHtmlPreview('<p>预览出错</p>');
        }
    }, [markdownText]);

    // 组件挂载时加载示例Markdown
    useEffect(() => {
        setMarkdownText(localStorage.getItem('markdownText') || defaultMarkdown);
    }, [defaultMarkdown]);

    // 组件卸载时移除事件监听器
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', throttledMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [throttledMouseMove, handleMouseUp]);

    // 处理Tab键
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newText = markdownText.substring(0, start) + '  ' + markdownText.substring(end);
            setMarkdownText(newText);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 2;
            }, 0);
        }
    };

    // 工具栏按钮组件
    const ToolbarBtn = ({icon: Icon, title, action, active = false}: {
        icon: React.ComponentType<{className?: string}>
        title: string,
        action: () => void,
        active?: boolean
    }) => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={action}
                    className={`h-8 w-8 p-0 hover:bg-muted ${active ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                >
                    <Icon className="h-4 w-4"/>
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
                <div ref={editorContainerRef}
                     className={`flex-1 ${isFullscreen ? 'p-0' : 'pt-32 pb-8 px-4'} main transition-all duration-300`}>
                    {!isFullscreen && (
                        <>
                            <h1 className="text-4xl font-bold mb-8">Markdown 编辑器</h1>
                            <p className="text-muted-foreground mb-8">在线编辑和预览 Markdown
                                文档，支持实时预览、语法高亮和常用格式工具栏。</p>
                        </>
                    )}

                    <div
                        className={`flex flex-col border border-input rounded-md overflow-hidden bg-background shadow-sm ${isFullscreen ? 'h-full' : ''}`}>
                        {/* Typora 风格工具栏 */}
                        <div className="flex flex-wrap items-center p-2 border-b border-input bg-card gap-1">
                            {/* 标题组 */}
                            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-1">
                                <ToolbarBtn icon={Heading1} title="一级标题"
                                            action={() => handleToolbarAction('heading', 1)}/>
                                <ToolbarBtn icon={Heading2} title="二级标题"
                                            action={() => handleToolbarAction('heading', 2)}/>
                                <ToolbarBtn icon={Heading3} title="三级标题"
                                            action={() => handleToolbarAction('heading', 3)}/>
                            </div>

                            {/* 文本样式组 */}
                            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-1">
                                <ToolbarBtn icon={Bold} title="粗体" action={() => handleToolbarAction('bold')}/>
                                <ToolbarBtn icon={Italic} title="斜体" action={() => handleToolbarAction('italic')}/>
                                <ToolbarBtn icon={Strikethrough} title="删除线"
                                            action={() => handleToolbarAction('strikethrough')}/>
                                <ToolbarBtn icon={Code} title="行内代码" action={() => handleToolbarAction('code')}/>
                                <ToolbarBtn icon={Eraser} title="清除格式" action={() => handleToolbarAction('clear')}/>
                            </div>

                            {/* 列表和引用组 */}
                            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-1">
                                <ToolbarBtn icon={Quote} title="引用" action={() => handleToolbarAction('quote')}/>
                                <ToolbarBtn icon={List} title="无序列表" action={() => handleToolbarAction('list')}/>
                                <ToolbarBtn icon={ListOrdered} title="有序列表"
                                            action={() => handleToolbarAction('ordered-list')}/>
                                <ToolbarBtn icon={CheckSquare} title="任务列表"
                                            action={() => handleToolbarAction('task-list')}/>
                            </div>

                            {/* 插入组 */}
                            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-1">
                                <ToolbarBtn icon={LinkIcon} title="链接" action={() => handleToolbarAction('link')}/>
                                <ToolbarBtn icon={ImageIcon} title="图片" action={() => handleToolbarAction('image')}/>
                                <ToolbarBtn icon={Table} title="表格" action={() => handleToolbarAction('table')}/>
                                <ToolbarBtn icon={FileCode} title="代码块"
                                            action={() => handleToolbarAction('codeblock')}/>
                                <ToolbarBtn icon={Minus} title="水平线" action={() => handleToolbarAction('hr')}/>
                            </div>

                            {/* AI 生成 */}
                            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-1">
                                <ToolbarBtn icon={Sparkles} title="AI 写作" active={aiMode} action={() => {
                                    const textarea = textareaRef.current;
                                    if (textarea) {
                                        const start = textarea.selectionStart;
                                        const end = textarea.selectionEnd;
                                        setSelectedText(markdownText.substring(start, end));
                                    }
                                    setAiMode(!aiMode);
                                    setAiPrompt("");
                                }}/>
                            </div>

                            <div className="flex-1"></div>

                            {/* 操作组 */}
                            <div className="flex items-center gap-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-8 gap-1">
                                            <Download className="h-4 w-4"/>
                                            <span>导出</span>
                                            <ChevronDown className="h-3 w-3 opacity-50"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={downloadMarkdown} className="cursor-pointer">
                                            {downloadLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/> :
                                                <FileText className="mr-2 h-4 w-4"/>}
                                            <span>导出 Markdown</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={exportAsImage} className="cursor-pointer">
                                            {exportLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/> :
                                                <FileImage className="mr-2 h-4 w-4"/>}
                                            <span>导出为图片</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={exportAsDocx} className="cursor-pointer">
                                            {docxLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/> :
                                                <FileText className="mr-2 h-4 w-4"/>}
                                            <span>导出为 Word</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="sm" onClick={() => setMarkdownText('')}
                                                className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>清空文档</p></TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="sm" onClick={toggleFullscreen}
                                                className="h-8 w-8 p-0">
                                            {isFullscreen ? <Minimize className="h-4 w-4"/> :
                                                <Maximize className="h-4 w-4"/>}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>{isFullscreen ? '退出全屏' : '全屏模式'}</p></TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                        {/* 编辑器和预览区域 */}
                        <div
                            ref={containerRef}
                            className="flex flex-row relative bg-background"
                            style={{height: isFullscreen ? 'calc(100vh - 50px)' : '600px'}}
                        >
                            {/* 编辑区 */}
                            <div
                                className="h-full overflow-hidden"
                                style={{width: `${leftPaneWidth}%`}}
                            >
                                <textarea
                                    ref={textareaRef}
                                    id="markdownEditor"
                                    value={markdownText}
                                    onChange={(e) => setMarkdownText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full h-full p-6 bg-background font-mono text-sm focus:outline-none focus:ring-0 overflow-y-auto resize-none border-0 leading-relaxed"
                                    placeholder="在此输入 Markdown 文本..."
                                    spellCheck={false}
                                />
                            </div>

                            {/* 可拖动分隔线 */}
                            <div
                                className="w-1 h-full bg-border hover:bg-primary cursor-col-resize flex items-center justify-center relative z-10 transition-colors"
                                onMouseDown={handleMouseDown}
                            >
                                <div
                                    className="absolute w-4 h-8 bg-muted border border-border rounded-full flex items-center justify-center shadow-sm">
                                    <div className="w-0.5 h-4 bg-muted-foreground/50 mx-0.5 rounded-full"></div>
                                </div>
                            </div>

                            {/* 预览区 */}
                            <div
                                className="h-full overflow-hidden bg-muted/5"
                                style={{width: `${100 - leftPaneWidth}%`}}
                            >
                                <div
                                    className={`w-full h-full p-8 overflow-y-auto prose dark:prose-invert max-w-none transition-colors duration-300 ${
                                        !globalIsDark ? 'hljs-light' : ''
                                    }`}
                                    dangerouslySetInnerHTML={{__html: htmlPreview}}
                                />
                            </div>
                        </div>

                        {/* AI 悬浮输入框 */}
                        {aiMode && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20">
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
                                            if (selectedText) {
                                                setMarkdownText(markdownText.replace(selectedText, aiOutput));
                                            } else {
                                                setMarkdownText(aiOutput);
                                            }
                                            setAiMode(false);
                                            setSelectedText("");
                                            setAiPrompt("");
                                        }}>
                                            {selectedText ? "替换选中" : "替换全部"}
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => {
                                            setMarkdownText(markdownText + "\n\n" + aiOutput);
                                            setAiMode(false);
                                            setSelectedText("");
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
                                                    if (selectedText) {
                                                        prompt = `请改写以下内容：\n\n${selectedText}\n\n改写要求：${aiPrompt}`;
                                                    } else if (markdownText.trim()) {
                                                        prompt = `以下是当前文档的完整内容：\n\n---\n${markdownText}\n---\n\n请根据以下要求修改文档，并输出修改后的完整文档：${aiPrompt}`;
                                                    }
                                                    generate(prompt);
                                                }
                                            }
                                            if (e.key === 'Escape') {
                                                setAiMode(false);
                                                setAiPrompt("");
                                                setSelectedText("");
                                            }
                                        }}
                                        placeholder={selectedText ? `改写选中的 ${selectedText.length} 字...` : "描述你想生成的内容..."}
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
                                                        if (selectedText) {
                                                            prompt = `请改写以下内容：\n\n${selectedText}\n\n改写要求：${aiPrompt}`;
                                                        } else if (markdownText.trim()) {
                                                            prompt = `以下是当前文档的完整内容：\n\n---\n${markdownText}\n---\n\n请根据以下要求修改文档，并输出修改后的完整文档：${aiPrompt}`;
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
                                                setSelectedText("");
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
                </div>
            </main>
        </TooltipProvider>
    );
};

export default MarkdownEditorPage; 