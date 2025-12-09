import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export const useAudio = (
    src: string,
    title: string,
    author: string,
    imageUrl: string,
    forwardId: string,
    backwardId: string
) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false);
    const { toast } = useToast();
    const nextToast = useRef(false);
    const router = useRouter();

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            if (!audio.paused && !audio.ended && audio.readyState > 2) {
                audio.pause();
                if (navigator.mediaSession) navigator.mediaSession.playbackState = 'paused';
                setIsPlaying(false);
            } else {
                audio.play().then(() => {
                    if (navigator.mediaSession) navigator.mediaSession.playbackState = 'playing';
                    setIsPlaying(true);
                }).catch((e) => {
                    let errorMsg = "请检查音频文件是否存在或浏览器支持";
                    if (e && e.name === "NotAllowedError") {
                        errorMsg = "浏览器阻止了自动播放，请手动点击播放按钮";
                    }
                    toast({
                        title: "播放失败",
                        description: errorMsg,
                        variant: "destructive"
                    });
                    console.error('Audio playback failed:', e);
                });
            }
        }
    }, [toast]);

    const play = useCallback(async () => {
        const audio = audioRef.current;
        if (audio) {
            try {
                await audio.play();
                setIsPlaying(true);
                if (navigator.mediaSession) navigator.mediaSession.playbackState = 'playing';
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const pause = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            setIsPlaying(false);
            if (navigator.mediaSession) navigator.mediaSession.playbackState = 'paused';
        }
    }, []);

    const seek = useCallback((time: number) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = time;
            setCurrentTime(time);
        }
    }, []);

    const clearState = useCallback(() => {
        const audio = audioRef.current;
        if (navigator.mediaSession) navigator.mediaSession.playbackState = 'paused';
        if (audio) {
            audio.currentTime = 0;
            audio.pause();
        }
    }, []);

    const nexttrackCallback = useCallback(() => {
        clearState();
        router.push(`/media/${forwardId}/`);
    }, [clearState, forwardId, router]);

    const previoustrackCallback = useCallback(() => {
        clearState();
        router.push(`/media/${backwardId}/`);
    }, [backwardId, clearState, router]);

    const handleLoadedMetadata = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            const newDuration = audio.duration;
            setDuration(newDuration);
            if (audio.currentTime > 0) {
                setCurrentTime(0);
            }
        }
    }, []);

    const handleTimeUpdate = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            const newCurrentTime = audio.currentTime;
            const newDuration = audio.duration || duration;
            if (newDuration > 0) {
                setCurrentTime(newCurrentTime);
                setDuration(newDuration);
                setIsPlaying(!audio.paused && !audio.ended && audio.readyState > 2);
            }
            if (autoPlay) {
                if (!nextToast.current && newDuration - newCurrentTime <= 10) {
                    setIsPlaying(false);
                    toast({
                        title: '即将播放下一首',
                        duration: 3000,
                    });
                    nextToast.current = true;
                } else if (newCurrentTime >= newDuration) {
                    nexttrackCallback();
                }
            }
        }
    }, [autoPlay, duration, nexttrackCallback, toast]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            
            if (navigator.mediaSession) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: title,
                    artist: author,
                    artwork: [
                        {
                            src: imageUrl,
                            sizes: '512x512',
                            type: 'image/png',
                        },
                    ],
                });

                navigator.mediaSession.setActionHandler('play', togglePlay);
                navigator.mediaSession.setActionHandler('pause', togglePlay);
                navigator.mediaSession.setActionHandler('previoustrack', previoustrackCallback);
                navigator.mediaSession.setActionHandler('nexttrack', nexttrackCallback);
            }
            
            setIsPlaying(!audio.paused && !audio.ended && audio.readyState > 2);

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, [author, handleTimeUpdate, handleLoadedMetadata, imageUrl, nexttrackCallback, previoustrackCallback, title, togglePlay]);

    useEffect(() => {
        const autoPlayConfig = window.localStorage.getItem('autoPlay');
        if (autoPlayConfig && autoPlayConfig === 'true') {
            setAutoPlay(true);
            // We don't auto-play immediately on mount to avoid policy issues, 
            // but the original code did call togglePlay() here.
            // We'll leave it to the component or user interaction, 
            // or if the original code did it, we can try.
            // The original code: togglePlay() inside useEffect.
             const audio = audioRef.current;
             if(audio && audio.paused) {
                 audio.play().catch(e => console.log("Autoplay blocked", e));
             }
        } else {
            setAutoPlay(false);
        }
    }, []);

    const toggleAutoPlay = useCallback(() => {
        setAutoPlay(prev => {
            const newState = !prev;
            setTimeout(() => {
                window.localStorage.setItem('autoPlay', newState.toString());
                toast({
                    title: newState ? '已开启自动播放' : '已关闭自动播放',
                    duration: 3000,
                });
            }, 0);
            return newState;
        });
    }, [toast]);

    return {
        audioRef,
        audioState: { isPlaying, currentTime, duration, autoPlay },
        controls: { togglePlay, seek, setAutoPlay: toggleAutoPlay, play, pause, clearState }
    };
};
