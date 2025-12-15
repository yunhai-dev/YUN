import React, {useEffect, useRef, useState} from 'react';
import {PlayerStyleProps} from '../types';
import {useFullscreen} from "@/hooks/use-fullscreen";
import {useHotkeys} from "react-hotkeys-hook";
import Image from 'next/image';
import {Link} from "next-view-transitions";
import {
    FastForwardIcon,
    LayoutTemplate,
    Maximize,
    Minimize,
    PauseIcon,
    PlayIcon,
    RepeatIcon,
    RewindIcon
} from "lucide-react";
import {AudioProgressBar} from "@/components/ui/audio-progress-bar";
import extractThemeColors from "@/lib/getImgColor";
import {cn, darkenIfNearWhite} from "@/lib/utils";
import gsap from "gsap";

export const AppleMusicPlayer = ({
                                     musicItem,
                                     audioRef,
                                     audioState,
                                     controls,
                                     forwardId,
                                     backwardId,
                                     lyrics,
                                     onToggleStyle
                                 }: PlayerStyleProps) => {
    const {title, imageUrl, author, lyricsUrl} = musicItem;
    const {isPlaying, currentTime, duration, autoPlay} = audioState;
    const {togglePlay, seek, setAutoPlay: toggleAutoPlay, clearState} = controls;

    const [currentLine, setCurrentLine] = useState(0);
    const [beforeFirstLine, setBeforeFirstLine] = useState(true);
    const [bgColors, setBgColors] = useState<string[]>(['#444', '#333']);
    const mediaBgRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const lyricsContainerRef = useRef<HTMLDivElement>(null);

    const {isFullscreen, toggleFullscreen} = useFullscreen(mediaBgRef);
    useHotkeys("f11", toggleFullscreen, {preventDefault: true});
    useHotkeys("space", togglePlay, {preventDefault: true});

    // Extract colors for background
    useEffect(() => {
        const img = imgRef.current;
        if (img) {
            if (img.complete) {
                extractColors();
            } else {
                img.onload = extractColors;
            }
        }

        function extractColors() {
            if (!img) return;
            extractThemeColors(5, img, 0).then(colors => {
                const darkerColors = colors.map(c => darkenIfNearWhite(c, 0.5));
                setBgColors(darkerColors);
            });
        }
    }, [imageUrl]);

    // Update current line based on time
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || lyrics.length === 0) return;

        const updateLine = () => {
            const time = audio.currentTime;
            const firstLyricTime = lyrics[0]?.time ?? 0;
            const isBefore = time < firstLyricTime;

            let lineIndex = -1;
            for (let i = 0; i < lyrics.length; i++) {
                if (time >= lyrics[i].time &&
                    (i === lyrics.length - 1 || time < lyrics[i + 1].time)) {
                    lineIndex = i;
                    break;
                }
            }
            if (lineIndex === -1) {
                lineIndex = 0;
            }

            if (isBefore !== beforeFirstLine) {
                setBeforeFirstLine(isBefore);
            }

            if (lineIndex !== currentLine) {
                setCurrentLine(lineIndex);
            }
        };

        audio.addEventListener('timeupdate', updateLine);
        return () => audio.removeEventListener('timeupdate', updateLine);
    }, [lyrics, currentLine, audioRef]);

    // Scroll to current line with GSAP for smoother "push" effect
    const isAutoScrolling = useRef(false);
    const isUserScrolling = useRef(false);
    const userScrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const currentLineRef = useRef(currentLine);

    useEffect(() => {
        currentLineRef.current = currentLine;
    }, [currentLine]);

    const scrollToCurrentLine = () => {
        if (isUserScrolling.current) return;

        if (lyricsContainerRef.current) {
            const lineIndex = currentLineRef.current;
            const activeEl = document.getElementById(`lyric-line-${lineIndex}`);
            if (activeEl) {
                const container = lyricsContainerRef.current;
                const containerHeight = container.clientHeight;
                const elOffset = activeEl.offsetTop;
                const elHeight = activeEl.clientHeight;

                // Calculate target scroll position to center the element
                // Use dynamic offset (25% of container height) to move content up visually
                // This ensures it looks centered/slightly above center on all screen sizes
                const offset = containerHeight * (beforeFirstLine ? 0.05 : 0.2);
                const rawTarget = elOffset - containerHeight / 2 + elHeight / 2 + offset;
                const maxScroll = Math.max(0, container.scrollHeight - containerHeight);
                const targetScroll = Math.min(Math.max(0, rawTarget), maxScroll);

                isAutoScrolling.current = true;
                gsap.to(container, {
                    scrollTop: targetScroll,
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: true,
                    onComplete: () => {
                        isAutoScrolling.current = false;
                    }
                });
            }
        }
    };

    const handleScroll = () => {
        if (isAutoScrolling.current) return;

        isUserScrolling.current = true;
        if (userScrollTimeout.current) {
            clearTimeout(userScrollTimeout.current);
        }
        userScrollTimeout.current = setTimeout(() => {
            isUserScrolling.current = false;
            scrollToCurrentLine();
        }, 2000);
    };

    useEffect(() => {
        // Small delay to ensure layout is ready for initial scroll
        const timer = setTimeout(() => {
            scrollToCurrentLine();
        }, 100);
        return () => clearTimeout(timer);
    }, [currentLine]);

    // Background animation style
    const backgroundStyle = {
        backgroundImage: `
            radial-gradient(circle at 0% 0%, ${bgColors[0]} 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, ${bgColors[1]} 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, ${bgColors[2] || bgColors[0]} 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, ${bgColors[3] || bgColors[1]} 0%, transparent 50%)
        `,
        backgroundColor: bgColors[4] || '#000',
        backgroundSize: '100% 100%',
    };

    return (
        <main className="min-h-screen w-full overflow-hidden relative text-white font-sans" ref={mediaBgRef}>
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 -z-10 opacity-80 transition-colors duration-1000"
                style={backgroundStyle}
            />
            <div className="absolute inset-0 -z-10 backdrop-blur-[100px] bg-black/30"/>

            <div
                className="container mx-auto h-screen flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8 md:gap-16">

                {/* Left Column: Album Art & Controls */}
                <div
                    className="w-full md:w-5/12 flex flex-col items-center md:items-start justify-center space-y-8 max-w-md">
                    {/* Album Art */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group cursor-pointer"
                         onClick={toggleFullscreen}>
                        <div
                            className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-xl">
                            {isFullscreen ? <Minimize className="text-white w-12 h-12"/> :
                                <Maximize className="text-white w-12 h-12"/>}
                        </div>
                        <Image
                            ref={imgRef}
                            src={imageUrl}
                            alt={title}
                            fill
                            className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-cover transition-transform duration-500"
                            crossOrigin="anonymous"
                        />
                    </div>

                    {/* Song Info */}
                    <div className="w-full text-center md:text-left space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold truncate leading-tight">{title}</h1>
                        <p className="text-lg text-white/60 truncate font-medium">{author}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full">
                        <AudioProgressBar
                            currentTime={currentTime}
                            duration={duration}
                            onSeek={seek}
                            className="w-full"
                            formatTime={(t) => {
                                const mins = Math.floor(t / 60);
                                const secs = Math.floor(t % 60);
                                return `${mins}:${secs.toString().padStart(2, '0')}`;
                            }}
                        />
                        <div className="flex justify-between text-xs text-white/40 mt-1 font-medium font-mono">
                            <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
                            <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center md:justify-between w-full gap-6">
                        <button
                            onClick={() => toggleAutoPlay(!autoPlay)}
                            className={cn("transition-colors", autoPlay ? "text-green-400" : "text-white/40 hover:text-white")}
                        >
                            <RepeatIcon size={20}/>
                        </button>

                        <div className="flex items-center gap-6">
                            <Link
                                href={`/media/${backwardId}/`}
                                onClick={clearState}
                                className="text-white/80 hover:text-white transition-transform active:scale-90"
                            >
                                <RewindIcon size={32} fill="currentColor" className="border-none"/>
                            </Link>

                            <button
                                onClick={togglePlay}
                                className="text-white hover:scale-105 transition-all active:scale-95"
                            >
                                {isPlaying ? (
                                    <PauseIcon size={48} fill="currentColor"/>
                                ) : (
                                    <PlayIcon size={48} fill="currentColor"/>
                                )}
                            </button>

                            <Link
                                href={`/media/${forwardId}/`}
                                onClick={clearState}
                                className="text-white/80 hover:text-white transition-transform active:scale-90"
                            >
                                <FastForwardIcon size={32} fill="currentColor"/>
                            </Link>
                        </div>

                        {/* Style Switcher */}
                        <button
                            onClick={onToggleStyle}
                            className="text-white/40 hover:text-white transition-colors"
                            title="Switch Player Style"
                        >
                            <LayoutTemplate size={20}/>
                        </button>
                    </div>
                </div>

                {/* Right Column: Lyrics */}
                <div className="w-full md:w-7/12 h-[40vh] md:h-[70vh] relative mask-linear-fade">
                    <div
                        ref={lyricsContainerRef}
                        className="h-full overflow-y-auto no-scrollbar relative py-24 md:py-32 px-4"
                        onScroll={handleScroll}
                    >
                        {lyrics.length > 0 ? lyrics.map((line, index) => {
                            const isActive = index === currentLine;

                            return (
                                <div
                                    key={index}
                                    id={`lyric-line-${index}`}
                                    onClick={() => seek(line.time)}
                                    className={cn(
                                        "cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-center text-center",
                                        isActive
                                            ? "opacity-100 scale-100 blur-0 my-16"
                                            : "opacity-50 scale-90 blur-[0.5px] hover:opacity-80 my-8"
                                    )}
                                >
                                    <p className={cn(
                                        "font-bold leading-tight transition-all duration-700",
                                        isActive ? "text-3xl md:text-4xl lg:text-5xl" : "text-xl md:text-2xl lg:text-3xl"
                                    )}>
                                        {line.text}
                                    </p>
                                </div>
                            );
                        }) : (
                            <div className="flex items-center justify-center h-full text-white/40 text-xl">
                                {lyricsUrl ? "Loading Lyrics..." : "No Lyrics Available"}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .mask-linear-fade {
                    mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
                }
            `}</style>
        </main>
    );
};
