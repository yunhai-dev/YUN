"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
    Copy,
    Check,
    Upload,
    Download,
    Wifi,
    WifiOff,
    FileIcon,
    ArrowRight,
    RefreshCw,
    Info,
    Zap
} from 'lucide-react';

interface WindowWithFileSystem extends Window {
    showSaveFilePicker(options?: unknown): Promise<FileSystemFileHandle>;
}

type ConnectionRole = 'sender' | 'receiver' | null;
type ConnectionStep = 'select-role' | 'create-offer' | 'wait-answer' | 'receive-offer' | 'connected';

interface FileMetadata {
    name: string;
    size: number;
    type: string;
}

const P2PTransferPage = () => {
    const { toast } = useToast();

    // Connection state
    const [role, setRole] = useState<ConnectionRole>(null);
    const [step, setStep] = useState<ConnectionStep>('select-role');
    const [connectionState, setConnectionState] = useState<string>('未连接');
    const [localSDP, setLocalSDP] = useState<string>('');
    const [remoteSDP, setRemoteSDP] = useState<string>('');
    const [copied, setCopied] = useState(false);

    // Transfer state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [transferProgress, setTransferProgress] = useState(0);
    const [transferStatus, setTransferStatus] = useState<string>('');
    const [isTransferring, setIsTransferring] = useState(false);
    const [receivingFile, setReceivingFile] = useState<FileMetadata | null>(null);
    const [useStreamWrite] = useState(false);

    // WebRTC refs
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const dcRef = useRef<RTCDataChannel | null>(null);
    const fileWriterRef = useRef<FileSystemWritableFileStream | null>(null);
    const receivedBytesRef = useRef<number>(0);
    const receiveBuffersRef = useRef<ArrayBuffer[]>([]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (dcRef.current) {
                dcRef.current.close();
            }
            if (pcRef.current) {
                pcRef.current.close();
            }
            if (fileWriterRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                fileWriterRef.current.close();
            }
        };
    }, []);

    const createPeerConnection = () => {
        const pc = new RTCPeerConnection({ iceServers: [] });

        pc.onicecandidate = (e) => {
            if (e.candidate === null) {
                // ICE 收集完成
                const sdp = JSON.stringify(pc.localDescription);
                setLocalSDP(sdp);
            }
        };

        pc.onconnectionstatechange = () => {
            const state = pc.connectionState;
            setConnectionState(state);

            if (state === 'connected') {
                setStep('connected');
                toast({
                    title: "连接成功！",
                    description: "P2P 连接已建立，现在可以传输文件了。",
                });
            } else if (state === 'failed' || state === 'disconnected') {
                toast({
                    title: "连接失败",
                    description: "请尝试重新建立连接。",
                    variant: "destructive",
                });
            }
        };

        pc.ondatachannel = (ev) => {
            setupDataChannel(ev.channel);
        };

        pcRef.current = pc;
        return pc;
    };

    const setupDataChannel = (channel: RTCDataChannel) => {
        channel.binaryType = 'arraybuffer';
        channel.bufferedAmountLowThreshold = 64 * 1024;

        channel.onopen = () => {
            setConnectionState('已连接');
            setTransferStatus('DataChannel 已打开，可以传输文件');
        };

        channel.onclose = () => {
            setConnectionState('已断开');
            setTransferStatus('DataChannel 已关闭');
        };

        channel.onerror = (e) => {
            console.error('DataChannel error', e);
            toast({
                title: "DataChannel 错误",
                description: "数据通道出现错误",
                variant: "destructive",
            });
        };

        channel.onmessage = async (ev) => {
            if (typeof ev.data === 'string') {
                try {
                    const msg = JSON.parse(ev.data);
                    if (msg.type === 'meta') {
                        // 将 fileType 映射到 type
                        const meta: FileMetadata = {
                            name: msg.name,
                            size: msg.size,
                            type: msg.fileType || msg.type || 'application/octet-stream'
                        };
                        await handleReceiveFileMeta(meta);
                    } else if (msg.type === 'done') {
                        await handleReceiveComplete();
                    }
                } catch (err) {
                    console.error('解析消息失败', err);
                }
            } else {
                await handleReceiveChunk(ev.data);
            }
        };

        dcRef.current = channel;
    };

    const handleReceiveFileMeta = async (meta: FileMetadata) => {
        setReceivingFile(meta);
        setTransferProgress(0);
        receivedBytesRef.current = 0;
        receiveBuffersRef.current = [];
        setIsTransferring(true);
        setTransferStatus(`正在接收: ${meta.name}`);

        // 注意：不在这里创建文件句柄，因为没有用户手势
        // 文件将先保存到内存，接收完成后再保存
    };

    const handleReceiveChunk = async (data: ArrayBuffer) => {
        receivedBytesRef.current += data.byteLength;

        // 先保存到内存缓冲区
        receiveBuffersRef.current.push(data);

        if (receivingFile) {
            const progress = (receivedBytesRef.current / receivingFile.size) * 100;
            setTransferProgress(progress);
        }
    };

    const handleReceiveComplete = async () => {
        const fileName = receivingFile?.name || 'download';
        
        if (receiveBuffersRef.current.length === 0) {
            toast({
                title: "接收失败",
                description: "未接收到文件数据",
                variant: "destructive",
            });
            return;
        }

        try {
            const blob = new Blob(receiveBuffersRef.current, { type: receivingFile?.type || 'application/octet-stream' });
            
            // 尝试使用 File System Access API（需要用户交互）
            if ('showSaveFilePicker' in window && useStreamWrite) {
                try {
                    const handle = await (window as unknown as WindowWithFileSystem).showSaveFilePicker({
                        suggestedName: fileName,
                        types: [{
                            description: 'File',
                            accept: { [receivingFile?.type || '*/*']: [] }
                        }]
                    });
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                } catch (err: unknown) {
                    // 用户取消或不支持，降级为自动下载
                    const isAbortError = err instanceof Error && err.name === 'AbortError';
                    if (!isAbortError) {
                        console.warn('showSaveFilePicker 失败，使用降级方案', err);
                    }
                    triggerDownload(blob, fileName);
                }
            } else {
                // 直接触发下载
                triggerDownload(blob, fileName);
            }

            receiveBuffersRef.current = [];
            setIsTransferring(false);
            setTransferStatus('接收完成！');
            setTransferProgress(100);
            
            toast({
                title: "接收完成",
                description: `文件 ${fileName} 已保存`,
            });
        } catch (err) {
            console.error('保存文件失败', err);
            toast({
                title: "保存失败",
                description: "无法保存接收的文件",
                variant: "destructive",
            });
        }
    };

    const triggerDownload = (blob: Blob, fileName: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    };

    const waitBufferedLow = () => new Promise<void>((resolve) => {
        const dc = dcRef.current;
        if (!dc) return resolve();
        if (dc.bufferedAmount <= dc.bufferedAmountLowThreshold) return resolve();

        const handler = () => {
            dc.removeEventListener('bufferedamountlow', handler);
            resolve();
        };
        dc.addEventListener('bufferedamountlow', handler);
    });

    const handleCreateOffer = async () => {
        const pc = createPeerConnection();
        const channel = pc.createDataChannel('file');
        setupDataChannel(channel);

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        setStep('create-offer');
        setTransferStatus('等待收集 ICE 候选...');
    };

    const handleReceiveOffer = async () => {
        if (!remoteSDP.trim()) {
            toast({
                title: "请输入连接码",
                description: "请先粘贴发送方提供的连接码",
                variant: "destructive",
            });
            return;
        }

        try {
            const pc = createPeerConnection();
            const offer = JSON.parse(remoteSDP);
            await pc.setRemoteDescription(offer);

            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            setStep('receive-offer');
            setTransferStatus('已创建 Answer，等待 ICE 收集...');
        } catch (err) {
            toast({
                title: "连接失败",
                description: "连接码格式错误或无效",
                variant: "destructive",
            });
        }
    };

    const handleApplyAnswer = async () => {
        if (!remoteSDP.trim()) {
            toast({
                title: "请输入连接码",
                description: "请先粘贴接收方提供的连接码",
                variant: "destructive",
            });
            return;
        }

        if (!pcRef.current) {
            toast({
                title: "错误",
                description: "请先创建 Offer",
                variant: "destructive",
            });
            return;
        }

        try {
            const answer = JSON.parse(remoteSDP);
            await pcRef.current.setRemoteDescription(answer);
            setStep('wait-answer');
            setTransferStatus('正在建立连接...');
        } catch (err) {
            toast({
                title: "连接失败",
                description: "连接码格式错误或无效",
                variant: "destructive",
            });
        }
    };

    const handleCopyToClipboard = async () => {
        if (!localSDP) return;

        try {
            await navigator.clipboard.writeText(localSDP);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            toast({
                title: "已复制",
                description: "连接码已复制到剪贴板",
            });
        } catch (err) {
            toast({
                title: "复制失败",
                description: "请手动复制连接码",
                variant: "destructive",
            });
        }
    };

    const handleSendFile = async () => {
        if (!selectedFile) {
            toast({
                title: "请选择文件",
                description: "请先选择要发送的文件",
                variant: "destructive",
            });
            return;
        }

        const dc = dcRef.current;
        if (!dc || dc.readyState !== 'open') {
            toast({
                title: "连接未建立",
                description: "请先完成连接建立",
                variant: "destructive",
            });
            return;
        }

        setIsTransferring(true);
        setTransferProgress(0);
        setTransferStatus(`正在发送: ${selectedFile.name}`);

        // 发送文件元数据
        dc.send(JSON.stringify({
            type: 'meta',
            name: selectedFile.name,
            size: selectedFile.size,
            fileType: selectedFile.type
        }));

        const chunkSize = 64 * 1024; // 64KB
        let offset = 0;

        try {
            while (offset < selectedFile.size) {
                const slice = selectedFile.slice(offset, offset + chunkSize);
                const arrayBuffer = await slice.arrayBuffer();

                await waitBufferedLow();
                dc.send(arrayBuffer);

                offset += arrayBuffer.byteLength;
                const progress = (offset / selectedFile.size) * 100;
                setTransferProgress(progress);
            }

            // 发送完成标记
            dc.send(JSON.stringify({ type: 'done' }));
            setTransferStatus('发送完成！');
            toast({
                title: "发送完成",
                description: `文件 ${selectedFile.name} 已发送`,
            });
        } catch (err) {
            console.error('发送失败', err);
            toast({
                title: "发送失败",
                description: "文件传输过程中出现错误",
                variant: "destructive",
            });
        } finally {
            setIsTransferring(false);
        }
    };

    const handleReset = () => {
        if (dcRef.current) dcRef.current.close();
        if (pcRef.current) pcRef.current.close();
        if (fileWriterRef.current) fileWriterRef.current.close();

        setRole(null);
        setStep('select-role');
        setConnectionState('未连接');
        setLocalSDP('');
        setRemoteSDP('');
        setSelectedFile(null);
        setTransferProgress(0);
        setTransferStatus('');
        setIsTransferring(false);
        setReceivingFile(null);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    };

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">P2P 文件传输</h1>
                        <p className="text-muted-foreground">
                            点对点文件传输，无需服务器中转，数据直接传输更安全
                        </p>
                    </div>
                    {step !== 'select-role' && (
                        <Button onClick={handleReset} variant="outline" size="sm">
                            <RefreshCw size={16} className="mr-2" />
                            重新开始
                        </Button>
                    )}
                </div>

                {/* 功能特点 */}
                <Card className="mb-8 border-blue-500/20 bg-blue-500/5">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <Info size={20} className="text-blue-500 mt-0.5 shrink-0" />
                            <div className="space-y-2 text-sm">
                                <p className="font-medium">核心特性：</p>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    <li><Zap size={14} className="inline mr-1" />点对点直连：数据直接在设备间传输，无服务器中转</li>
                                    <li><Zap size={14} className="inline mr-1" />自动下载：接收完成后自动保存文件到本地</li>
                                    <li><Zap size={14} className="inline mr-1" />局域网可用：无需互联网，同一网络即可传输</li>
                                    <li><Zap size={14} className="inline mr-1" />引导式操作：清晰的步骤指引，简单易用</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 连接状态显示 */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                        {connectionState === '已连接' || connectionState === 'connected' ? (
                            <Wifi size={24} className="text-green-500" />
                        ) : (
                            <WifiOff size={24} className="text-muted-foreground" />
                        )}
                        <div>
                            <div className="font-medium">连接状态</div>
                            <div className="text-sm text-muted-foreground">
                                {connectionState === 'connected' ? '已连接' : connectionState}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 步骤 1: 选择角色 */}
                {step === 'select-role' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => {
                                setRole('sender');
                                handleCreateOffer();
                            }}
                        >
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-3 rounded-lg bg-blue-500/10">
                                        <Upload size={24} className="text-blue-500" />
                                    </div>
                                    <CardTitle>我要发送文件</CardTitle>
                                </div>
                                <CardDescription>
                                    作为发送方，创建连接并发送文件给接收方
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p>步骤：</p>
                                    <ol className="list-decimal list-inside space-y-1 ml-2">
                                        <li>点击此卡片创建连接码</li>
                                        <li>将连接码发送给接收方</li>
                                        <li>接收方粘贴后会返回连接码</li>
                                        <li>粘贴接收方的连接码完成连接</li>
                                        <li>选择文件并发送</li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>

                        <Card
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => {
                                setRole('receiver');
                                setStep('receive-offer');
                            }}
                        >
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-3 rounded-lg bg-green-500/10">
                                        <Download size={24} className="text-green-500" />
                                    </div>
                                    <CardTitle>我要接收文件</CardTitle>
                                </div>
                                <CardDescription>
                                    作为接收方，接受连接并接收文件
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p>步骤：</p>
                                    <ol className="list-decimal list-inside space-y-1 ml-2">
                                        <li>点击此卡片准备接收</li>
                                        <li>粘贴发送方的连接码</li>
                                        <li>生成并复制自己的连接码</li>
                                        <li>将连接码发送给发送方</li>
                                        <li>等待接收文件</li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* 步骤 2: 发送方 - 创建 Offer */}
                {role === 'sender' && (step === 'create-offer' || step === 'wait-answer') && (
                    <div className="space-y-6">
                        {step === 'create-offer' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold">
                                            1
                                        </div>
                                        将连接码发送给接收方
                                    </CardTitle>
                                    <CardDescription>
                                        复制下方的连接码，通过任何方式（QQ、微信、邮件等）发送给接收方
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="relative">
                                        <textarea
                                            value={localSDP}
                                            readOnly
                                            className="w-full h-32 p-3 border border-input rounded-lg bg-muted font-mono text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                                            placeholder="正在生成连接码..."
                                        />
                                        <Button
                                            onClick={handleCopyToClipboard}
                                            disabled={!localSDP}
                                            className="absolute top-2 right-2"
                                            size="sm"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check size={16} className="mr-2" />
                                                    已复制
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={16} className="mr-2" />
                                                    复制
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold">
                                        2
                                    </div>
                                    粘贴接收方返回的连接码
                                </CardTitle>
                                <CardDescription>
                                    接收方会生成一个连接码返回给你，将其粘贴到下方
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <textarea
                                    value={remoteSDP}
                                    onChange={(e) => setRemoteSDP(e.target.value)}
                                    placeholder="在此粘贴接收方的连接码..."
                                    className="w-full h-32 p-3 border border-input rounded-lg bg-background font-mono text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                <Button
                                    onClick={handleApplyAnswer}
                                    disabled={!remoteSDP.trim() || step === 'wait-answer'}
                                    className="w-full"
                                >
                                    <ArrowRight size={16} className="mr-2" />
                                    完成连接
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* 步骤 2: 接收方 - 接收 Offer */}
                {role === 'receiver' && step === 'receive-offer' && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">
                                        1
                                    </div>
                                    粘贴发送方的连接码
                                </CardTitle>
                                <CardDescription>
                                    将发送方提供的连接码粘贴到下方，然后点击"生成连接码"
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <textarea
                                    value={remoteSDP}
                                    onChange={(e) => setRemoteSDP(e.target.value)}
                                    placeholder="在此粘贴发送方的连接码..."
                                    className="w-full h-32 p-3 border border-input rounded-lg bg-background font-mono text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                <Button
                                    onClick={handleReceiveOffer}
                                    disabled={!remoteSDP.trim() || localSDP !== ''}
                                    className="w-full"
                                >
                                    <ArrowRight size={16} className="mr-2" />
                                    生成连接码
                                </Button>
                            </CardContent>
                        </Card>

                        {localSDP && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">
                                            2
                                        </div>
                                        将连接码发送给发送方
                                    </CardTitle>
                                    <CardDescription>
                                        复制下方的连接码，发送给发送方完成连接
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="relative">
                                        <textarea
                                            value={localSDP}
                                            readOnly
                                            className="w-full h-32 p-3 border border-input rounded-lg bg-muted font-mono text-xs text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                        <Button
                                            onClick={handleCopyToClipboard}
                                            className="absolute top-2 right-2"
                                            size="sm"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check size={16} className="mr-2" />
                                                    已复制
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={16} className="mr-2" />
                                                    复制
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* 步骤 3: 已连接 - 文件传输 */}
                {step === 'connected' && (
                    <div className="space-y-6">
                        {role === 'sender' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Upload size={20} />
                                        发送文件
                                    </CardTitle>
                                    <CardDescription>
                                        选择要发送的文件，点击发送按钮开始传输
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-4">
                                        <input
                                            type="file"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                            disabled={isTransferring}
                                        />
                                    </div>

                                    {selectedFile && (
                                        <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted">
                                            <FileIcon size={32} className="text-muted-foreground" />
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate">{selectedFile.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatFileSize(selectedFile.size)}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleSendFile}
                                        disabled={!selectedFile || isTransferring}
                                        className="w-full"
                                    >
                                        {isTransferring ? '发送中...' : '发送文件'}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {role === 'receiver' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Download size={20} />
                                        等待接收文件
                                    </CardTitle>
                                    <CardDescription>
                                        连接已建立，等待发送方发送文件
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Download size={48} className="mx-auto mb-4 animate-pulse" />
                                        <p>准备就绪，等待文件传输...</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* 传输进度 */}
                        {(isTransferring || transferProgress > 0) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>传输进度</CardTitle>
                                    <CardDescription>{transferStatus}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {(receivingFile || selectedFile) && (
                                        <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted">
                                            <FileIcon size={32} className="text-muted-foreground" />
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate">
                                                    {receivingFile?.name || selectedFile?.name}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatFileSize(receivingFile?.size || selectedFile?.size || 0)}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">进度</span>
                                            <span className="font-medium">{transferProgress.toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-300"
                                                style={{ width: `${transferProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
            <div className="mb-20"></div>
        </main>
    );
};

export default P2PTransferPage;
