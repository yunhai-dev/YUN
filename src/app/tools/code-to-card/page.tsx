"use client";

import React, { useState, useEffect, useRef } from 'react';
import { codeToHtml, type BundledLanguage } from 'shiki';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Download, Trash2, Code2, Settings } from 'lucide-react';
import { WindowDecoration } from './components/WindowDecoration';

const CodeToCardPage = () => {
    // 代码内容
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState<BundledLanguage>('typescript');

    // 样式配置
    const [theme, setTheme] = useState('one-dark-pro');
    const [background, setBackground] = useState({ type: 'gradient', value: 'sunset' });
    const [windowStyle, setWindowStyle] = useState<'mac' | 'none'>('mac');
    const [padding, setPadding] = useState(64);
    const [borderRadius, setBorderRadius] = useState(16);
    const [showShadow, setShowShadow] = useState(true);
    const [cardWidth, setCardWidth] = useState(0); // 0 表示自动宽度
    const [codePadding, setCodePadding] = useState(24);

    // 显示选项
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const [showTitle, setShowTitle] = useState(false);
    const [title, setTitle] = useState('');

    // 预览和导出
    const [previewHtml, setPreviewHtml] = useState('');
    const [exportLoading, setExportLoading] = useState(false);
    const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

    // Refs
    const cardRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { toast } = useToast();

    // 示例代码
    const exampleCode = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`;

    // 常用语言列表
    const commonLanguages: { value: BundledLanguage; label: string }[] = [
        { value: 'typescript', label: 'TypeScript' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
        { value: 'cpp', label: 'C++' },
        { value: 'c', label: 'C' },
        { value: 'csharp', label: 'C#' },
        { value: 'php', label: 'PHP' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'swift', label: 'Swift' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'json', label: 'JSON' },
        { value: 'yaml', label: 'YAML' },
        { value: 'markdown', label: 'Markdown' },
        { value: 'sql', label: 'SQL' },
        { value: 'bash', label: 'Bash' },
    ];

    // 主题列表
    const themes = [
        { value: 'one-dark-pro', label: 'One Dark Pro' },
        { value: 'github-dark', label: 'GitHub Dark' },
        { value: 'dracula', label: 'Dracula' },
        { value: 'nord', label: 'Nord' },
        { value: 'tokyo-night', label: 'Tokyo Night' },
        { value: 'catppuccin-mocha', label: 'Catppuccin Mocha' },
        { value: 'github-light', label: 'GitHub Light' },
        { value: 'one-light', label: 'One Light' },
        { value: 'min-light', label: 'Min Light' },
        { value: 'vitesse-light', label: 'Vitesse Light' },
    ];

    // 渐变预设
    const gradients = {
        sunset: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        ocean: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
        forest: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
        fire: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        night: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    };

    // 获取背景样式
    const getBackgroundStyle = () => {
        if (background.type === 'gradient') {
            return gradients[background.value as keyof typeof gradients] || gradients.sunset;
        }
        return background.value;
    };

    // 渲染代码预览
    useEffect(() => {
        const renderCode = async () => {
            if (!code.trim()) {
                setPreviewHtml('');
                return;
            }

            try {
                const html = await codeToHtml(code, {
                    lang: language,
                    theme: theme,
                });
                setPreviewHtml(html);
            } catch (error) {
                console.error('代码高亮失败:', error);
                setPreviewHtml(`<pre><code>${code}</code></pre>`);
            }
        };

        const timer = setTimeout(renderCode, 300);
        return () => clearTimeout(timer);
    }, [code, language, theme]);

    // 添加全局样式来美化代码块
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .code-wrapper pre {
                margin: 0 !important;
                padding: ${codePadding}px !important;
                background: transparent !important;
                overflow-x: auto;
                font-family: 'Fira Code', 'Consolas', 'Monaco', monospace !important;
                font-size: 14px !important;
                line-height: 1.6 !important;
                tab-size: 2 !important;
                -moz-tab-size: 2 !important;
            }
            .code-wrapper code {
                font-family: 'Fira Code', 'Consolas', 'Monaco', monospace !important;
                font-size: 14px !important;
                line-height: 1.6 !important;
            }
            .code-editor-textarea {
                font-family: 'Fira Code', 'Consolas', 'Monaco', monospace !important;
                font-size: 14px !important;
                line-height: 1.6 !important;
                tab-size: 2 !important;
                -moz-tab-size: 2 !important;
                white-space: pre !important;
                word-wrap: normal !important;
                overflow-wrap: normal !important;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, [codePadding]);

    // 加载保存的配置和代码
    useEffect(() => {
        const savedConfig = localStorage.getItem('code-card-config');
        const savedCode = localStorage.getItem('code-card-code');

        if (savedConfig) {
            try {
                const config = JSON.parse(savedConfig);
                setLanguage(config.language || 'typescript');
                setTheme(config.theme || 'one-dark-pro');
                setBackground(config.background || { type: 'gradient', value: 'sunset' });
                setWindowStyle(config.windowStyle || 'mac');
                setPadding(config.padding || 64);
                setBorderRadius(config.borderRadius || 16);
                setShowShadow(config.showShadow !== undefined ? config.showShadow : true);
                setShowLineNumbers(config.showLineNumbers !== undefined ? config.showLineNumbers : true);
                setCardWidth(config.cardWidth !== undefined ? config.cardWidth : 0);
                setCodePadding(config.codePadding || 24);
            } catch (e) {
                console.error('加载配置失败:', e);
            }
        }

        setCode(savedCode || exampleCode);
    }, []);

    // 保存配置
    useEffect(() => {
        const config = {
            language,
            theme,
            background,
            windowStyle,
            padding,
            borderRadius,
            showShadow,
            showLineNumbers,
            cardWidth,
            codePadding,
        };
        const timer = setTimeout(() => {
            localStorage.setItem('code-card-config', JSON.stringify(config));
        }, 1000);
        return () => clearTimeout(timer);
    }, [language, theme, background, windowStyle, padding, borderRadius, showShadow, showLineNumbers, cardWidth, codePadding]);

    // 保存代码
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('code-card-code', code);
        }, 1000);
        return () => clearTimeout(timer);
    }, [code]);

    // 处理 Tab 键
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newText = code.substring(0, start) + '  ' + code.substring(end);
            setCode(newText);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 2;
            }, 0);
        }
    };

    // 导出图片
    const handleExport = async () => {
        const cardElement = cardRef.current;
        if (!cardElement) return;

        setExportLoading(true);

        try {
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.top = '0';

            const clonedCard = cardElement.cloneNode(true) as HTMLElement;
            clonedCard.style.width = 'auto';
            clonedCard.style.display = 'inline-block';

            tempContainer.appendChild(clonedCard);
            document.body.appendChild(tempContainer);

            const canvas = await html2canvas(clonedCard, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
                logging: false,
                onclone: (doc) => {
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
            });

            const image = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = image;
            a.download = `code-card-${Date.now()}.png`;
            a.click();

            document.body.removeChild(tempContainer);

            toast({
                title: "导出成功",
                description: "图片已保存到下载文件夹",
            });
        } catch (error) {
            console.error('导出失败:', error);
            toast({
                title: "导出失败",
                description: "请稍后重试",
                variant: "destructive",
            });
        } finally {
            setExportLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32 pb-8">
                <h1 className="text-4xl font-bold mb-8">代码卡片生成器</h1>
                <p className="text-muted-foreground mb-8">
                    将代码转换为精美的卡片图片，支持多种主题和样式定制，适合分享到社交媒体
                </p>

                {/* 工具栏 */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="language">语言</Label>
                        <Select value={language} onValueChange={(value) => setLanguage(value as BundledLanguage)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {commonLanguages.map(lang => (
                                    <SelectItem key={lang.value} value={lang.value}>
                                        {lang.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Label htmlFor="theme">主题</Label>
                        <Select value={theme} onValueChange={setTheme}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {themes.map(t => (
                                    <SelectItem key={t.value} value={t.value}>
                                        {t.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex-1"></div>

                    {/* 编辑代码按钮 */}
                    <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Code2 className="h-4 w-4 mr-2" />
                                编辑代码
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                                <DialogTitle>编辑代码</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                                <textarea
                                    ref={textareaRef}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="在此输入代码..."
                                    className="w-full h-[60vh] p-4 border border-input rounded-md bg-background font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                                    style={{
                                        fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        tabSize: 2,
                                    }}
                                    spellCheck={false}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* 样式设置按钮 */}
                    <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Settings className="h-4 w-4 mr-2" />
                                样式设置
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>样式设置</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 space-y-6">
                                {/* 背景设置 */}
                                <div>
                                    <Label className="mb-3 block text-sm font-semibold">背景</Label>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4">
                                            <Label className="text-sm w-16">类型</Label>
                                            <Select
                                                value={background.type}
                                                onValueChange={(value) => setBackground({ ...background, type: value as 'gradient' | 'solid' })}
                                            >
                                                <SelectTrigger className="w-32">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="gradient">渐变</SelectItem>
                                                    <SelectItem value="solid">纯色</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {background.type === 'gradient' ? (
                                            <div className="flex flex-wrap gap-2">
                                                {Object.keys(gradients).map(key => (
                                                    <button
                                                        key={key}
                                                        onClick={() => setBackground({ type: 'gradient', value: key })}
                                                        className={`w-16 h-16 rounded-md border-2 ${background.value === key ? 'border-primary' : 'border-transparent'}`}
                                                        style={{ background: gradients[key as keyof typeof gradients] }}
                                                        title={key}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Label className="text-sm w-16">颜色</Label>
                                                <Input
                                                    type="color"
                                                    value={background.value}
                                                    onChange={(e) => setBackground({ type: 'solid', value: e.target.value })}
                                                    className="w-20 h-10"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 窗口样式 */}
                                <div>
                                    <Label className="mb-3 block text-sm font-semibold">窗口样式</Label>
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            {(['mac', 'none'] as const).map(style => (
                                                <Button
                                                    key={style}
                                                    variant={windowStyle === style ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => setWindowStyle(style)}
                                                >
                                                    {style === 'mac' ? 'macOS' : '无'}
                                                </Button>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Checkbox
                                                id="show-title-dialog"
                                                checked={showTitle}
                                                onCheckedChange={(checked) => setShowTitle(checked as boolean)}
                                            />
                                            <Label htmlFor="show-title-dialog">显示标题</Label>
                                        </div>

                                        {showTitle && (
                                            <Input
                                                placeholder="输入标题..."
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* 尺寸调整 */}
                                <div>
                                    <Label className="mb-3 block text-sm font-semibold">尺寸</Label>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm">卡片宽度</Label>
                                                <span className="text-sm text-muted-foreground">{cardWidth === 0 ? '自动' : `${cardWidth}px`}</span>
                                            </div>
                                            <Slider
                                                value={[cardWidth]}
                                                onValueChange={(value) => setCardWidth(value[0])}
                                                min={0}
                                                max={1200}
                                                step={50}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm">外边距</Label>
                                                <span className="text-sm text-muted-foreground">{padding}px</span>
                                            </div>
                                            <Slider
                                                value={[padding]}
                                                onValueChange={(value) => setPadding(value[0])}
                                                min={16}
                                                max={128}
                                                step={1}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm">代码边距</Label>
                                                <span className="text-sm text-muted-foreground">{codePadding}px</span>
                                            </div>
                                            <Slider
                                                value={[codePadding]}
                                                onValueChange={(value) => setCodePadding(value[0])}
                                                min={8}
                                                max={64}
                                                step={1}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm">圆角</Label>
                                                <span className="text-sm text-muted-foreground">{borderRadius}px</span>
                                            </div>
                                            <Slider
                                                value={[borderRadius]}
                                                onValueChange={(value) => setBorderRadius(value[0])}
                                                min={0}
                                                max={32}
                                                step={1}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Checkbox
                                                id="show-shadow-dialog"
                                                checked={showShadow}
                                                onCheckedChange={(checked) => setShowShadow(checked as boolean)}
                                            />
                                            <Label htmlFor="show-shadow-dialog">显示阴影</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button onClick={handleExport} disabled={exportLoading || !code.trim()}>
                        <Download className="h-4 w-4 mr-2" />
                        {exportLoading ? '导出中...' : '导出图片'}
                    </Button>

                    <Button variant="outline" onClick={() => setCode('')}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        清空
                    </Button>
                </div>

                {/* 预览区域 - 全屏显示 */}
                <div className="border border-input rounded-md bg-muted/30 p-8 overflow-auto flex items-center justify-center" style={{ height: 'calc(100vh - 320px)' }}>
                    <div ref={cardRef} className="inline-block">
                        <div
                            style={{
                                background: getBackgroundStyle(),
                                padding: `${padding}px`,
                                borderRadius: `${borderRadius}px`,
                                boxShadow: showShadow ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.4)' : 'none',
                            }}
                        >
                            {/* 整体代码卡片容器 */}
                            <div
                                className="rounded-xl overflow-hidden bg-[#1e1e1e]"
                                style={cardWidth > 0 ? { width: `${cardWidth}px` } : {}}
                            >
                                {/* 窗口装饰条 */}
                                {windowStyle !== 'none' && (
                                    <WindowDecoration type={windowStyle} title={showTitle ? title : undefined} />
                                )}

                                {/* 代码块预览 */}
                                <div
                                    className="code-wrapper"
                                    dangerouslySetInnerHTML={{ __html: previewHtml || '<pre style="padding: 24px; color: #666;">点击"编辑代码"按钮开始输入代码...</pre>' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CodeToCardPage;
