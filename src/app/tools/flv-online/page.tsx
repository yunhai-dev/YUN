"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    RefreshCw,
    Link2,
    Camera,
    Settings,
    AlertCircle,
    Radio
} from "lucide-react";
import type { MediaInfo, Player, StatisticsInfo } from 'flv.js';

// 动态导入 flv.js，避免 SSR 问题
let flvjs: typeof import('flv.js') | null = null;

const FlvOnlinePage = () => {
    const [flvUrl, setFlvUrl] = useState<string>('');
    const [inputUrl, setInputUrl] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [volume, setVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [videoInfo, setVideoInfo] = useState<MediaInfo | null>(null);
    const [bufferLength, setBufferLength] = useState<number>(0);
    const [flvLoaded, setFlvLoaded] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<Player | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    // 在客户端加载 flv.js
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('flv.js').then((module) => {
                flvjs = module.default;
                setFlvLoaded(true);
            }).catch((err) => {
                console.error('Failed to load flv.js:', err);
                setError('加载播放器失败');
            });
        }
    }, []);

    // 初始化 FLV 播放器
    const initializePlayer = (url: string) => {
        if (!videoRef.current || !flvjs || !flvLoaded) {
            setError('播放器尚未加载完成，请稍后再试');
            return;
        }

        // 检查是否为FLV格式
        if (!url.toLowerCase().includes('.flv')) {
            setError('请输入有效的 FLV 格式流地址（URL 应包含 .flv）');
            setIsLoading(false);
            return;
        }

        // 清理旧的播放器
        if (playerRef.current) {
            try {
                playerRef.current.pause();
                playerRef.current.unload();
                playerRef.current.detachMediaElement();
                playerRef.current.destroy();
            } catch (e) {
                console.error('Error destroying player:', e);
            }
            playerRef.current = null;
        }

        setError(null);
        setIsLoading(true);
        setIsPlaying(false);

        console.log('Initializing player with URL:', url);
        console.log('FLV.js is supported:', flvjs.isSupported());

        try {
            if (flvjs.isSupported()) {
                // 根据URL判断是否为直播流
                const isLiveStream = url.includes('live') || url.includes('rtmp');
                
                const flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: url,
                    isLive: isLiveStream,
                    hasAudio: true,
                    hasVideo: true,
                    cors: true,
                }, {
                    enableWorker: false,
                    enableStashBuffer: false, // 禁用缓存以减少延迟
                    stashInitialSize: 128,
                    autoCleanupSourceBuffer: true, // 始终启用自动清理
                    autoCleanupMaxBackwardDuration: 3,
                    autoCleanupMinBackwardDuration: 2,
                    lazyLoad: false,
                    fixAudioTimestampGap: false,
                    accurateSeek: false,
                    seekType: 'range',
                    statisticsInfoReportInterval: 1000,
                });

                console.log('Player created successfully', isLiveStream ? '(Live stream)' : '(VOD)');
                playerRef.current = flvPlayer;
                flvPlayer.attachMediaElement(videoRef.current);
                console.log('Player attached to video element');

                // 事件监听
                flvPlayer.on(flvjs.Events.ERROR, (errorType: string, errorDetail: string, errorInfo: unknown) => {
                    console.error('FLV Player Error:', errorType, errorDetail, errorInfo);
                    let errorMsg = '播放错误';
                    
                    if (errorDetail.includes('NETWORK')) {
                        errorMsg = '网络错误: 无法连接到直播流，请检查URL是否正确';
                    } else if (errorDetail.includes('MEDIA')) {
                        errorMsg = '媒体错误: 无法解码视频流';
                    } else {
                        errorMsg = `播放错误: ${errorDetail}`;
                    }
                    
                    setError(errorMsg);
                    setIsLoading(false);
                    setIsPlaying(false);
                    
                    toast({
                        title: "播放错误",
                        description: errorMsg,
                        variant: "destructive",
                    });
                });

                flvPlayer.on(flvjs.Events.LOADING_COMPLETE, () => {
                    console.log('Loading complete');
                    setIsLoading(false);
                });

                flvPlayer.on(flvjs.Events.MEDIA_INFO, (mediaInfo: MediaInfo) => {
                    console.log('Media info:', mediaInfo);
                    setVideoInfo(mediaInfo);
                });

                flvPlayer.on(flvjs.Events.STATISTICS_INFO, (stats: StatisticsInfo) => {
                    setBufferLength(stats.decodedFrames || 0);
                });

                // 监听视频元素的事件
                if (videoRef.current) {
                    const videoElement = videoRef.current;
                    
                    const onLoadedMetadata = () => {
                        console.log('Video metadata loaded');
                        setIsLoading(false);
                        
                        // 对于直播流，自动跳到最新位置
                        if (url.includes('live') || url.includes('rtmp')) {
                            // 获取缓冲区的最大时间并跳转到接近实时的位置
                            setTimeout(() => {
                                if (videoElement.buffered.length > 0) {
                                    const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
                                    // 跳到缓冲区末尾前0.5秒的位置
                                    videoElement.currentTime = Math.max(0, bufferedEnd - 0.5);
                                    console.log('Jumped to live position:', videoElement.currentTime);
                                }
                            }, 500);
                        }
                        
                        toast({
                            title: "连接成功",
                            description: "点击播放按钮开始观看",
                        });
                    };
                    
                    const onCanPlay = () => {
                        console.log('Video can play');
                        setIsLoading(false);
                    };
                    
                    // 监听时间更新，保持在直播流的最新位置
                    const onTimeUpdate = () => {
                        if (videoElement.buffered.length > 0 && isPlaying && (url.includes('live') || url.includes('rtmp'))) {
                            const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
                            const currentTime = videoElement.currentTime;
                            const delay = bufferedEnd - currentTime;
                            
                            // 如果延迟超过3秒，跳到最新位置
                            if (delay > 3) {
                                console.log('Delay detected:', delay, 'seconds. Jumping to live position...');
                                videoElement.currentTime = bufferedEnd - 0.5;
                            }
                        }
                    };
                    
                    videoElement.addEventListener('loadedmetadata', onLoadedMetadata);
                    videoElement.addEventListener('canplay', onCanPlay);
                    videoElement.addEventListener('timeupdate', onTimeUpdate);
                }

                flvPlayer.load();
                console.log('Player load initiated');
            } else {
                setError('您的浏览器不支持 FLV 播放');
                setIsLoading(false);
                console.error('FLV.js is not supported');
            }
        } catch (err: unknown) {
            console.error('Initialize error:', err);
            const errorMessage = err instanceof Error ? err.message : '未知错误';
            setError(`初始化播放器失败: ${errorMessage}`);
            setIsLoading(false);
        }
    };

    // 播放/暂停
    const togglePlay = async () => {
        if (!videoRef.current) {
            console.error('Video element not found');
            return;
        }
        
        if (!playerRef.current) {
            setError('播放器未初始化，请先连接流');
            return;
        }

        console.log('Toggle play - current state:', isPlaying);
        console.log('Video paused:', videoRef.current.paused);
        console.log('Video readyState:', videoRef.current.readyState);

        try {
            if (isPlaying) {
                console.log('Pausing video');
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                console.log('Starting video playback');
                await videoRef.current.play();
                console.log('Video playing successfully');
                setIsPlaying(true);
            }
        } catch (err: unknown) {
            console.error('Play error:', err);
            const errorMessage = err instanceof Error ? err.message : '请检查流地址是否正确';
            setError(`播放失败: ${errorMessage}`);
            toast({
                title: "播放失败",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    // 音量控制
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
        if (newVolume === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    // 静音切换
    const toggleMute = () => {
        if (videoRef.current) {
            if (isMuted) {
                videoRef.current.volume = volume;
                setIsMuted(false);
            } else {
                videoRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    // 全屏切换
    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        try {
            if (!document.fullscreenElement) {
                await containerRef.current.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    };

    // 刷新播放器
    const refreshPlayer = () => {
        if (flvUrl) {
            initializePlayer(flvUrl);
            toast({
                title: "刷新成功",
                description: "正在重新连接直播流",
            });
        }
    };

    // 跳到直播最新位置
    const jumpToLive = () => {
        if (!videoRef.current) return;
        
        const videoElement = videoRef.current;
        if (videoElement.buffered.length > 0) {
            const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
            videoElement.currentTime = Math.max(0, bufferedEnd - 0.5);
            console.log('Manually jumped to live position:', videoElement.currentTime);
            toast({
                title: "已跳到直播",
                description: "正在播放最新画面",
            });
        } else {
            toast({
                title: "无法跳转",
                description: "缓冲区为空，请等待加载",
                variant: "destructive",
            });
        }
    };

    // 连接流
    const handleConnect = () => {
        if (!inputUrl.trim()) {
            setError('请输入有效的 FLV 流地址');
            return;
        }

        if (inputUrl.startsWith('http://')) {
            setError('出于安全考虑，浏览器不允许加载非 HTTPS 的流地址，请使用 HTTPS 地址');
            return;
        }

        if (!flvLoaded) {
            setError('播放器尚未加载完成，请稍后再试');
            return;
        }

        setFlvUrl(inputUrl);
        initializePlayer(inputUrl);
    };

    // 截图功能
    const takeScreenshot = () => {
        if (!videoRef.current) return;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `screenshot_${Date.now()}.png`;
                    a.click();
                    URL.revokeObjectURL(url);
                    toast({
                        title: "截图成功",
                        description: "图片已保存到下载文件夹",
                    });
                }
            }, 'image/png');
        }
    };

    // 监听全屏变化
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    // 清理播放器
    useEffect(() => {
        return () => {
            if (playerRef.current) {
                try {
                    playerRef.current.pause();
                    playerRef.current.unload();
                    playerRef.current.detachMediaElement();
                    playerRef.current.destroy();
                    playerRef.current = null;
                } catch (e) {
                    console.error('Error cleaning up player:', e);
                }
            }
        };
    }, []);
    
    // 监听视频播放状态
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;
        
        const handlePlay = () => {
            console.log('Video play event');
            setIsPlaying(true);
            
            // 播放时跳到最新位置（针对直播流）
            if (flvUrl && (flvUrl.includes('live') || flvUrl.includes('rtmp'))) {
                setTimeout(() => {
                    if (videoElement.buffered.length > 0) {
                        const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
                        videoElement.currentTime = Math.max(0, bufferedEnd - 0.5);
                        console.log('Synced to live position on play');
                    }
                }, 100);
            }
        };
        
        const handlePause = () => {
            console.log('Video pause event');
            setIsPlaying(false);
        };
        
        const handleWaiting = () => {
            console.log('Video waiting for data');
        };
        
        const handlePlaying = () => {
            console.log('Video is playing');
            setIsPlaying(true);
        };
        
        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);
        videoElement.addEventListener('waiting', handleWaiting);
        videoElement.addEventListener('playing', handlePlaying);
        
        return () => {
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
            videoElement.removeEventListener('waiting', handleWaiting);
            videoElement.removeEventListener('playing', handlePlaying);
        };
    }, [flvUrl]);

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32">
                <h1 className="text-4xl font-bold mb-8">FLV 直播流播放器</h1>
                <p className="text-muted-foreground mb-12">
                    在线播放 FLV 格式的直播流，支持实时播放、截图和全屏功能。
                </p>


                <div className="flex h-fit">
                    {/* 视频播放器区域 */}
                    <div className="flex justify-center flex-col w-4/5">
                        <div
                            ref={containerRef}
                            className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-input mb-6"
                        >
                            {/* 视频元素 */}
                            <video
                                ref={videoRef}
                                className="w-full h-full"
                                playsInline
                            />

                            {/* 加载指示器 */}
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <div className="flex flex-col items-center gap-3">
                                        <RefreshCw className="w-8 h-8 text-white animate-spin" />
                                        <p className="text-white text-sm">正在连接直播流...</p>
                                    </div>
                                </div>
                            )}

                            {/* 播放器控制栏 */}
                            {flvUrl && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    <div className="flex items-center gap-3">
                                        {/* 播放/暂停 */}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={togglePlay}
                                            className="text-white hover:bg-white/20"
                                        >
                                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                        </Button>

                                        {/* 音量控制 */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={toggleMute}
                                                className="text-white hover:bg-white/20"
                                            >
                                                {isMuted || volume === 0 ? (
                                                    <VolumeX className="w-5 h-5" />
                                                ) : (
                                                    <Volume2 className="w-5 h-5" />
                                                )}
                                            </Button>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={isMuted ? 0 : volume}
                                                onChange={handleVolumeChange}
                                                className="w-20 accent-primary"
                                            />
                                        </div>

                                        <div className="flex-1" />

                                        {/* 截图 */}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={takeScreenshot}
                                            className="text-white hover:bg-white/20"
                                            title="截图"
                                        >
                                            <Camera className="w-5 h-5" />
                                        </Button>

                                        {/* 跳到直播 - 仅直播流显示 */}
                                        {flvUrl && (flvUrl.includes('flv') || flvUrl.includes('rtmp')) && (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={jumpToLive}
                                                className="text-white hover:bg-white/20"
                                                title="跳到直播"
                                            >
                                                <Radio className="w-5 h-5" />
                                            </Button>
                                        )}

                                        {/* 刷新 */}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={refreshPlayer}
                                            className="text-white hover:bg-white/20"
                                            title="刷新"
                                        >
                                            <RefreshCw className="w-5 h-5" />
                                        </Button>

                                        {/* 全屏 */}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={toggleFullscreen}
                                            className="text-white hover:bg-white/20"
                                            title={isFullscreen ? "退出全屏" : "全屏"}
                                        >
                                            {isFullscreen ? (
                                                <Minimize className="w-5 h-5" />
                                            ) : (
                                                <Maximize className="w-5 h-5" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* 无流提示 */}
                            {!flvUrl && !isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-muted-foreground">
                                        <Play className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                        <p className="text-lg">输入 FLV 流地址开始播放</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* URL 输入区域 */}
                        <div className="mb-8">
                            <label htmlFor="flvUrl" className="block text-sm font-medium text-muted-foreground mb-2">
                                <Link2 className="inline-block w-4 h-4 mr-1 mb-1" />
                                FLV 流地址:
                            </label>
                            <div className="flex gap-3">
                                <input
                                    id="flvUrl"
                                    type="text"
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    placeholder="输入 FLV 直播流地址，例如: http://example.com/live/stream.flv"
                                    className="flex-1 px-3 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
                                />
                                <Button
                                    onClick={handleConnect}
                                    disabled={isLoading || !flvLoaded}
                                    className="px-6"
                                >
                                    {!flvLoaded ? '加载中...' : isLoading ? '连接中...' : '连接'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/5 gap-3 flex flex-col ml-3">
                        {/* 连接状态提示 */}
                        {flvUrl && !error && (
                            <div className="p-3 border border-green-500/50 bg-green-500/10 rounded-md text-green-400 text-sm">
                                ✓ 已连接到流{!isPlaying && ' - 点击播放按钮开始观看'}
                            </div>
                        )}
                        {/* 错误提示 */}
                        {error && (
                            <div className="p-3 border border-red-500/50 bg-red-500/10 rounded-md text-red-400 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold mb-1">错误</h4>
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* 视频信息面板 */}
                        {videoInfo && (
                            <div className="p-4 border border-input rounded-md bg-muted/30">
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <Settings className="w-5 h-5" />
                                    流媒体信息
                                </h3>
                                <div className="grid grid-cols-1 gap-3 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">视频编码:</span>
                                        <span className="ml-2 font-mono">{videoInfo.videoCodec || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">音频编码:</span>
                                        <span className="ml-2 font-mono">{videoInfo.audioCodec || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">分辨率:</span>
                                        <span className="ml-2 font-mono">
                                    {videoInfo.width || 0} × {videoInfo.height || 0}
                                </span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">帧率:</span>
                                        <span className="ml-2 font-mono">{videoInfo.fps || 0} fps</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">音频采样率:</span>
                                        <span className="ml-2 font-mono">
                                    {videoInfo.audioSampleRate || 0} Hz
                                </span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">缓冲帧数:</span>
                                        <span className="ml-2 font-mono">{bufferLength}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* 使用说明 */}
                <div className="p-6 mb-9 border border-input rounded-lg bg-muted/30">
                    <h3 className="text-lg font-semibold mb-4">使用说明</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex gap-3">
                            <span className="font-semibold text-foreground min-w-[80px]">1. 输入地址</span>
                            <span>在上方输入框中输入 FLV 格式的直播流地址</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="font-semibold text-foreground min-w-[80px]">2. 连接播放</span>
                            <span>点击"连接"按钮或按 Enter 键开始播放直播流</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="font-semibold text-foreground min-w-[80px]">3. 控制功能</span>
                            <span>使用播放器控制栏进行播放/暂停、音量调节、截图和全屏操作</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="font-semibold text-foreground min-w-[80px]">4. 刷新重连</span>
                            <span>如果播放出现问题，可以点击刷新按钮重新连接直播流</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="font-semibold text-foreground min-w-[80px]">注意事项</span>
                            <span>
                                确保直播流地址正确且可访问，部分流可能需要特殊的权限或跨域配置。
                                建议使用 Chrome、Edge 或 Firefox 等现代浏览器以获得最佳体验。
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FlvOnlinePage;
