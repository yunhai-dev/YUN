"use client";

import React, {useState, useMemo} from 'react';
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";
import {Copy as CopyIcon} from 'lucide-react';

const RegexTesterPage = () => {
    const [pattern, setPattern] = useState('');
    const [flagsState, setFlagsState] = useState({g: true, i: false, m: false, s: false});
    const flags = Object.entries(flagsState).filter(([, v]) => v).map(([k]) => k).join('');
    const [testText, setTestText] = useState('');
    const {toast} = useToast();

    const flagOptions = [
        {key: 'g', label: 'g', desc: '全局匹配'},
        {key: 'i', label: 'i', desc: '忽略大小写'},
        {key: 'm', label: 'm', desc: '多行模式'},
        {key: 's', label: 's', desc: '点匹配换行'},
    ];

    const result = useMemo(() => {
        if (!pattern || !testText) return null;
        try {
            const regex = new RegExp(pattern, flags);
            const matches: {match: string; index: number; groups?: string[]}[] = [];
            let match;

            if (flags.includes('g')) {
                while ((match = regex.exec(testText)) !== null) {
                    matches.push({
                        match: match[0],
                        index: match.index,
                        groups: match.slice(1).length > 0 ? match.slice(1) : undefined
                    });
                }
            } else {
                match = regex.exec(testText);
                if (match) {
                    matches.push({
                        match: match[0],
                        index: match.index,
                        groups: match.slice(1).length > 0 ? match.slice(1) : undefined
                    });
                }
            }
            return {matches, error: null};
        } catch (e) {
            return {matches: [], error: (e as Error).message};
        }
    }, [pattern, flags, testText]);

    const highlightedText = useMemo(() => {
        if (!result?.matches.length || !testText) return null;
        const parts: {text: string; highlight: boolean}[] = [];
        let lastIndex = 0;

        for (const m of result.matches) {
            if (m.index > lastIndex) {
                parts.push({text: testText.slice(lastIndex, m.index), highlight: false});
            }
            parts.push({text: m.match, highlight: true});
            lastIndex = m.index + m.match.length;
        }
        if (lastIndex < testText.length) {
            parts.push({text: testText.slice(lastIndex), highlight: false});
        }
        return parts;
    }, [result, testText]);

    const handleCopy = () => {
        navigator.clipboard.writeText(pattern);
        toast({title: "已复制正则表达式"});
    };

    const presets = [
        {name: '邮箱', pattern: '[\\w.-]+@[\\w.-]+\\.\\w+'},
        {name: '手机号', pattern: '1[3-9]\\d{9}'},
        {name: 'URL', pattern: 'https?://[\\w.-]+(?:/[\\w./-]*)?'},
        {name: 'IP地址', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}'},
    ];

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32">
                <h1 className="text-4xl font-bold mb-8">正则表达式测试器</h1>
                <p className="text-muted-foreground mb-8">实时测试正则表达式，高亮显示匹配结果。</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {presets.map(p => (
                        <Button key={p.name} variant="outline" size="sm" onClick={() => setPattern(p.pattern)}>
                            {p.name}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="text-sm font-medium text-muted-foreground">正则表达式:</label>
                                <button onClick={handleCopy} className="p-1 hover:bg-muted rounded"><CopyIcon size={14}/></button>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    value={pattern}
                                    onChange={(e) => setPattern(e.target.value)}
                                    placeholder="输入正则表达式..."
                                    className="flex-1 p-2 border border-input rounded-md bg-background font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                />
                            </div>
                            <div className="flex flex-wrap gap-4 mt-3">
                                {flagOptions.map(f => (
                                    <div key={f.key} className="flex items-center gap-2">
                                        <Checkbox
                                            id={`flag-${f.key}`}
                                            checked={flagsState[f.key as keyof typeof flagsState]}
                                            onCheckedChange={(checked) => setFlagsState({...flagsState, [f.key]: !!checked})}
                                        />
                                        <Label htmlFor={`flag-${f.key}`} className="cursor-pointer">
                                            <span className="font-mono">{f.label}</span>
                                            <span className="text-muted-foreground text-xs ml-1">({f.desc})</span>
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            {result?.error && (
                                <p className="text-red-400 text-sm mt-2">{result.error}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">测试文本:</label>
                            <textarea
                                value={testText}
                                onChange={(e) => setTestText(e.target.value)}
                                placeholder="输入要测试的文本..."
                                className="w-full h-48 p-3 border border-input rounded-md bg-background font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                匹配结果 ({result?.matches.length || 0} 个匹配)
                            </label>
                            <div className="p-3 border border-input rounded-md bg-muted/30 min-h-48 max-h-48 overflow-auto font-mono text-sm whitespace-pre-wrap">
                                {highlightedText ? (
                                    highlightedText.map((part, i) => (
                                        <span key={i} className={part.highlight ? 'bg-yellow-500/40 text-yellow-200' : ''}>
                                            {part.text}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground">匹配结果将显示在此处...</span>
                                )}
                            </div>
                        </div>

                        {result?.matches && result.matches.length > 0 && (
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">匹配详情:</label>
                                <div className="p-3 border border-input rounded-md bg-muted/30 max-h-48 overflow-auto text-sm space-y-2">
                                    {result.matches.map((m, i) => (
                                        <div key={i} className="font-mono">
                                            <span className="text-muted-foreground">[{i}]</span>{' '}
                                            <span className="text-green-400">"{m.match}"</span>
                                            <span className="text-muted-foreground"> @ {m.index}</span>
                                            {m.groups && (
                                                <div className="ml-4 text-purple-400">
                                                    捕获组: {m.groups.map((g, j) => `$${j+1}="${g}"`).join(', ')}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegexTesterPage;
