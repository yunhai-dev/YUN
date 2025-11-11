"use client";

import React, {useState, useMemo} from 'react';
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {Copy as CopyIcon} from 'lucide-react';

type DiffType = 'added' | 'removed' | 'unchanged';

interface CharDiff {
    type: DiffType;
    char: string;
}

const TextDiffPage = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [showDiff, setShowDiff] = useState(false);
    const {toast} = useToast();

    // 使用 Myers Diff Algorithm 计算字符级差异
    const calculateDiff = useMemo((): CharDiff[] => {
        if (!showDiff) return [];

        // Myers Diff Algorithm 实现（字符级别）
        const myersDiff = (a: string, b: string): CharDiff[] => {
            const n = a.length;
            const m = b.length;
            const max = n + m;
            const v: Map<number, number> = new Map();
            const trace: Map<number, number>[] = [];

            v.set(1, 0);

            // 前向搜索，构建最短编辑路径
            for (let d = 0; d <= max; d++) {
                trace.push(new Map(v));

                for (let k = -d; k <= d; k += 2) {
                    let x: number;
                    if (k === -d || (k !== d && (v.get(k - 1) || 0) < (v.get(k + 1) || 0))) {
                        x = v.get(k + 1) || 0;
                    } else {
                        x = (v.get(k - 1) || 0) + 1;
                    }

                    let y = x - k;

                    while (x < n && y < m && a[x] === b[y]) {
                        x++;
                        y++;
                    }

                    v.set(k, x);

                    if (x >= n && y >= m) {
                        return backtrack(a, b, trace, d);
                    }
                }
            }

            return backtrack(a, b, trace, max);
        };

        // 回溯构建差异结果
        const backtrack = (a: string, b: string, trace: Map<number, number>[], d: number): CharDiff[] => {
            const result: CharDiff[] = [];
            let x = a.length;
            let y = b.length;

            for (let depth = d; depth >= 0; depth--) {
                const v = trace[depth];
                const k = x - y;

                let prevK: number;
                if (k === -depth || (k !== depth && (v.get(k - 1) || 0) < (v.get(k + 1) || 0))) {
                    prevK = k + 1;
                } else {
                    prevK = k - 1;
                }

                const prevX = v.get(prevK) || 0;
                const prevY = prevX - prevK;

                while (x > prevX && y > prevY) {
                    result.unshift({
                        type: 'unchanged',
                        char: a[x - 1]
                    });
                    x--;
                    y--;
                }

                if (depth > 0) {
                    if (x > prevX) {
                        result.unshift({
                            type: 'removed',
                            char: a[x - 1]
                        });
                        x--;
                    } else if (y > prevY) {
                        result.unshift({
                            type: 'added',
                            char: b[y - 1]
                        });
                        y--;
                    }
                }
            }

            return result;
        };

        return myersDiff(text1, text2);
    }, [showDiff, text1, text2]);

    const handleCompare = () => {
        if (!text1.trim() && !text2.trim()) {
            toast({
                title: "请输入文本",
                description: "请在左侧或右侧输入需要对比的文本。",
                variant: "destructive",
            });
            return;
        }
        setShowDiff(true);
    };

    const handleClear = () => {
        setText1('');
        setText2('');
        setShowDiff(false);
    };

    const handleSwap = () => {
        const temp = text1;
        setText1(text2);
        setText2(temp);
    };

    const handleCopyDiff = () => {
        const diffText = calculateDiff.map(char => {
            if (char.type === 'added') return `[+${char.char}]`;
            if (char.type === 'removed') return `[-${char.char}]`;
            return char.char;
        }).join('');

        navigator.clipboard.writeText(diffText);
        toast({
            title: "已复制到剪贴板",
            description: "差异结果已成功复制。",
        });
    };

    const stats = useMemo(() => {
        const added = calculateDiff.filter(c => c.type === 'added').length;
        const removed = calculateDiff.filter(c => c.type === 'removed').length;
        const unchanged = calculateDiff.filter(c => c.type === 'unchanged').length;
        return {added, removed, unchanged};
    }, [calculateDiff]);

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32">
                <h1 className="text-4xl font-bold mb-8">文本对比工具</h1>
                <p className="text-muted-foreground mb-4">在线对比两段文本的差异，逐字符精准显示变化。</p>
                <div className="text-sm text-muted-foreground mb-12 space-y-1">
                    <p>使用 Myers Diff Algorithm 进行逐字符对比，<span className="text-red-500 font-semibold">红色标注删除的字符</span>，<span className="text-green-500 font-semibold">绿色标注新增的字符</span>。</p>
                </div>

                {/* 输入区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 mb-6">
                    {/* 左侧文本 */}
                    <div>
                        <label htmlFor="text1" className="block text-sm font-medium text-muted-foreground mb-2">
                            原始文本:
                        </label>
                        <textarea
                            id="text1"
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            placeholder="在此处输入原始文本..."
                            className="w-full h-96 p-2 border border-input rounded-md bg-background font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                        />
                    </div>

                    {/* 中间控制区域 */}
                    <div className="flex flex-col items-center justify-center gap-4 lg:px-4">
                        <div className="flex flex-col gap-2 w-full lg:w-auto">
                            <Button onClick={handleCompare} className="w-full lg:w-[180px]">
                                对比差异
                            </Button>
                            <Button onClick={handleSwap} variant="secondary" className="w-full lg:w-[180px]">
                                ⇄ 交换
                            </Button>
                            <Button onClick={handleClear} variant="outline" className="w-full lg:w-[180px]">
                                清空
                            </Button>
                        </div>
                    </div>

                    {/* 右侧文本 */}
                    <div>
                        <label htmlFor="text2" className="block text-sm font-medium text-muted-foreground mb-2">
                            对比文本:
                        </label>
                        <textarea
                            id="text2"
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            placeholder="在此处输入对比文本..."
                            className="w-full h-96 p-2 border border-input rounded-md bg-background font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                        />
                    </div>
                </div>

                {/* 差异显示区域 */}
                {showDiff && (
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">差异对比结果</h2>
                                <div className="flex gap-4 text-sm">
                                    <span className="text-green-500">+ {stats.added} 字符新增</span>
                                    <span className="text-red-500">- {stats.removed} 字符删除</span>
                                    <span className="text-muted-foreground">{stats.unchanged} 字符未改变</span>
                                </div>
                            </div>
                            <Button onClick={handleCopyDiff} variant="outline" size="sm">
                                <CopyIcon size={16} className="mr-2" />
                                复制结果
                            </Button>
                        </div>

                        <div className="border border-input rounded-md overflow-hidden bg-background">
                            <div className="overflow-auto max-h-[600px] p-4">
                                <div className="font-mono text-sm whitespace-pre-wrap break-words leading-relaxed">
                                    {calculateDiff.map((char, index) => {
                                        if (char.type === 'removed') {
                                            return (
                                                <span
                                                    key={index}
                                                    className="bg-red-500/20 text-red-500 px-0.5 rounded"
                                                    title="删除的字符"
                                                >
                                                    {char.char === '\n' ? '↵\n' : char.char}
                                                </span>
                                            );
                                        }
                                        if (char.type === 'added') {
                                            return (
                                                <span
                                                    key={index}
                                                    className="bg-green-500/20 text-green-500 px-0.5 rounded"
                                                    title="新增的字符"
                                                >
                                                    {char.char === '\n' ? '↵\n' : char.char}
                                                </span>
                                            );
                                        }
                                        return (
                                            <span key={index}>
                                                {char.char}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mb-20"></div>
        </main>
    );
};

export default TextDiffPage;
