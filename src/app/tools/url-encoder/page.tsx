"use client";

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {Copy as CopyIcon} from 'lucide-react';

type EncodingMode = 'encodeURIComponent' | 'encodeURI';
type OperationType = 'encode' | 'decode';

const UrlEncoderPage = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<EncodingMode>('encodeURI');
    const [operation, setOperation] = useState<OperationType>('encode');
    const {toast} = useToast();

    const handleEncode = () => {
        setError(null);
        setOutputText('');
        if (!inputText.trim()) {
            setError("请输入需要编码的文本。");
            return;
        }
        try {
            let result: string;
            if (mode === 'encodeURIComponent') {
                result = encodeURIComponent(inputText);
            } else {
                result = encodeURI(inputText);
            }
            setOutputText(result);
        } catch (e) {
            setError(`编码失败: ${e}`);
        }
    };

    const handleDecode = () => {
        setError(null);
        setOutputText('');
        if (!inputText.trim()) {
            setError("请输入需要解码的文本。");
            return;
        }
        try {
            let result: string;
            if (mode === 'encodeURIComponent') {
                result = decodeURIComponent(inputText);
            } else {
                result = decodeURI(inputText);
            }
            setOutputText(result);
        } catch (e) {
            setError(`解码失败: ${e}`);
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setError(null);
    };

    const handleCopy = () => {
        if (outputText) {
            navigator.clipboard.writeText(outputText);
            toast({
                title: "已复制到剪贴板",
                description: "处理后的文本已成功复制。",
            });
        } else {
            toast({
                title: "没有内容可复制",
                description: "请先编码或解码文本，然后再尝试复制。",
                variant: "destructive",
            });
        }
    };

    const handleSwitch = () => {
        // 交换输入和输出
        const temp = inputText;
        setInputText(outputText);
        setOutputText(temp);
        // 切换操作类型
        setOperation(operation === 'encode' ? 'decode' : 'encode');
    };

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32">
                <h1 className="text-4xl font-bold mb-8">URL 编码解码工具</h1>
                <p className="text-muted-foreground mb-4">在线编码和解码 URL 字符串，支持 encodeURIComponent 和 encodeURI 两种模式。</p>
                <div className="text-sm text-muted-foreground mb-12 space-y-1">
                    <p><strong>encodeURIComponent:</strong> 编码所有字符，适用于参数值</p>
                    <p><strong>encodeURI:</strong> 保留URL结构字符，适用于完整URL</p>
                </div>

                {/* 错误提示 */}
                {error && (
                    <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 rounded-md text-red-400">
                        <h4 className="font-semibold mb-1">错误</h4>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* 主要内容区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 mb-6">
                    {/* 左侧输入框 */}
                    <div>
                        <label htmlFor="inputText" className="block text-sm font-medium text-muted-foreground mb-2">
                            输入文本:
                        </label>
                        <textarea
                            id="inputText"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="在此处输入需要编码或解码的文本..."
                            className="w-full h-96 p-2 border border-input rounded-md bg-background font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                        />
                    </div>

                    {/* 中间控制区域 */}
                    <div className="flex flex-col items-center justify-center gap-4 lg:px-4">
                        {/* 编码模式选择 */}
                        <div className="flex flex-col gap-2 w-full lg:w-auto">
                            <label className="text-sm font-medium text-muted-foreground text-center">编码模式:</label>
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value as EncodingMode)}
                                className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring min-w-[180px]"
                            >
                                <option value="encodeURIComponent">encodeURIComponent</option>
                                <option value="encodeURI">encodeURI</option>
                            </select>
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex flex-col gap-2 w-full lg:w-auto">
                            <Button onClick={handleEncode} className="w-full lg:w-[180px]">
                                编码
                            </Button>
                            <Button onClick={handleDecode} variant="outline" className="w-full lg:w-[180px]">
                                解码
                            </Button>
                            <Button onClick={handleSwitch} variant="secondary" className="w-full lg:w-[180px]">
                                ⇄ 交换
                            </Button>
                            <Button onClick={handleClear} variant="outline" className="w-full lg:w-[180px]">
                                清空
                            </Button>
                        </div>
                    </div>

                    {/* 右侧输出框 */}
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            输出结果:
                        </label>
                        <div className="relative w-full p-4 border border-input rounded-md bg-muted/30 font-mono text-sm overflow-auto h-96">
                            <div className="sticky top-0 z-10 flex justify-end gap-2 mb-2">
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 bg-background/80 hover:bg-background border border-input rounded-md"
                                    title="复制"
                                >
                                    <CopyIcon size={16} />
                                </button>
                            </div>
                            {outputText ? (
                                <div className="whitespace-pre-wrap break-all">{outputText}</div>
                            ) : (
                                <div className="text-muted-foreground">处理后的文本将显示在此处...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UrlEncoderPage;
