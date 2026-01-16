"use client";

import React, {useState, useEffect} from 'react';
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {Copy as CopyIcon} from 'lucide-react';

interface JWTPayload {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
}

const JwtDecoderPage = () => {
    const [inputText, setInputText] = useState('');
    const [decoded, setDecoded] = useState<JWTPayload | null>(null);
    const [error, setError] = useState<string | null>(null);
    const {toast} = useToast();

    const decodeBase64 = (str: string): string => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        return new TextDecoder('utf-8').decode(bytes);
    };

    const decodeJWT = (token: string): JWTPayload | null => {
        const parts = token.trim().split('.');
        if (parts.length !== 3) return null;

        try {
            const header = JSON.parse(decodeBase64(parts[0]));
            const payload = JSON.parse(decodeBase64(parts[1]));
            return {header, payload, signature: parts[2]};
        } catch {
            return null;
        }
    };

    useEffect(() => {
        setError(null);
        setDecoded(null);
        if (!inputText.trim()) return;

        const result = decodeJWT(inputText);
        if (result) {
            setDecoded(result);
        } else {
            setError('无效的 JWT 格式');
        }
    }, [inputText]);

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('zh-CN');
    };

    const isExpired = (exp: number) => Date.now() > exp * 1000;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({title: "已复制到剪贴板"});
    };

    const handleClear = () => {
        setInputText('');
        setDecoded(null);
        setError(null);
    };

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32">
                <h1 className="text-4xl font-bold mb-8">JWT 解析器</h1>
                <p className="text-muted-foreground mb-12">在线解析 JWT (JSON Web Token)，查看 Header、Payload 和签名信息。</p>

                {error && (
                    <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 rounded-md text-red-400">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-muted-foreground">JWT Token:</label>
                            <Button onClick={handleClear} variant="ghost" size="sm">清空</Button>
                        </div>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="粘贴 JWT Token..."
                            className="w-full h-48 p-3 border border-input rounded-md bg-background font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                        />
                    </div>

                    <div className="space-y-4">
                        {decoded && (
                            <>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-red-400">Header</span>
                                        <button onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2))} className="p-1 hover:bg-muted rounded">
                                            <CopyIcon size={14}/>
                                        </button>
                                    </div>
                                    <pre className="p-3 bg-muted/30 rounded-md text-sm overflow-auto max-h-32 font-mono">
                                        {JSON.stringify(decoded.header, null, 2)}
                                    </pre>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-purple-400">Payload</span>
                                        <button onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2))} className="p-1 hover:bg-muted rounded">
                                            <CopyIcon size={14}/>
                                        </button>
                                    </div>
                                    <pre className="p-3 bg-muted/30 rounded-md text-sm overflow-auto max-h-48 font-mono">
                                        {JSON.stringify(decoded.payload, null, 2)}
                                    </pre>
                                    {decoded.payload.exp && (
                                        <div className={`mt-2 text-sm ${isExpired(decoded.payload.exp as number) ? 'text-red-400' : 'text-green-400'}`}>
                                            过期时间: {formatTime(decoded.payload.exp as number)}
                                            {isExpired(decoded.payload.exp as number) ? ' (已过期)' : ' (有效)'}
                                        </div>
                                    )}
                                    {decoded.payload.iat && (
                                        <div className="text-sm text-muted-foreground">
                                            签发时间: {formatTime(decoded.payload.iat as number)}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-cyan-400">Signature</span>
                                        <button onClick={() => handleCopy(decoded.signature)} className="p-1 hover:bg-muted rounded">
                                            <CopyIcon size={14}/>
                                        </button>
                                    </div>
                                    <div className="p-3 bg-muted/30 rounded-md text-sm font-mono break-all text-muted-foreground">
                                        {decoded.signature}
                                    </div>
                                </div>
                            </>
                        )}

                        {!decoded && !error && (
                            <div className="h-48 flex items-center justify-center text-muted-foreground">
                                解析结果将显示在此处...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JwtDecoderPage;
