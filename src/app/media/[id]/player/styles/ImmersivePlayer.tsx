import React, { useEffect, useRef, useState } from 'react';
import { PlayerStyleProps } from '../types';
import { useFullscreen } from "@/hooks/use-fullscreen";
import { useHotkeys } from "react-hotkeys-hook";
import Image from 'next/image';
import { Link } from "next-view-transitions";
import { FastForwardIcon, Maximize, Minimize, PauseIcon, PlayIcon, RepeatIcon, RewindIcon, LayoutTemplate } from "lucide-react";
import { AudioProgressBar } from "@/components/ui/audio-progress-bar";
import extractThemeColors from "@/lib/getImgColor";
import { darkenIfNearWhite, cn } from "@/lib/utils";
import { isEnglishText, splitWord, isColorCloserToWhite } from '../utils';
import gsap from "gsap";
import '../../index.css';

export const ImmersivePlayer = ({
    musicItem,
    audioRef,
    audioState,
    controls,
    forwardId,
    backwardId,
    lyrics,
    onToggleStyle
}: PlayerStyleProps) => {
    const { title, imageUrl, author, lyricsUrl } = musicItem;
    const { isPlaying, currentTime, duration, autoPlay } = audioState;
    const { togglePlay, seek, setAutoPlay: toggleAutoPlay, clearState } = controls;

    const [currentLine, setCurrentLine] = useState(0);
    const [bgTextFlag, setBgTextFlag] = useState(false);
    const mediaBgRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    
    const { isFullscreen, toggleFullscreen, exitFullscreen } = useFullscreen(mediaBgRef);
    useHotkeys("f11", toggleFullscreen, { preventDefault: true });
    useHotkeys("space", togglePlay, { preventDefault: true });

    useEffect(() => {
        const interval = setInterval(() => {
            const img = imgRef.current;
            if (img && img.complete) {
                extractThemeColors(10, img, 0).then(colors => {
                    const mediaBg = mediaBgRef.current;
                    if (mediaBg) {
                        const darkerColors = colors.map(c => darkenIfNearWhite(c, 0.7));
                        setBgTextFlag(isColorCloserToWhite(darkerColors[0]))
                        mediaBg.style.background = `
                          radial-gradient(circle at 30% 30%, ${darkerColors[0]} 0%, transparent 60%),
                          radial-gradient(circle at 70% 40%, ${darkerColors[1]} 0%, transparent 60%),
                          radial-gradient(circle at 50% 70%, ${darkerColors[2]} 0%, transparent 60%)
                        `;
                        mediaBg.style.backgroundRepeat = 'no-repeat';
                        mediaBg.style.backgroundSize = 'cover';
                    }
                })
                clearInterval(interval);
            }
        }, 100)
        return () => clearInterval(interval);
    }, [imageUrl]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || lyrics.length === 0) return;
        let tl: gsap.core.Timeline | null = null;

        const updateLyrics = () => {
            const currentTime = audio.currentTime;
            let lineIndex = -1;
            const element = document.getElementById('lyrics')
            const elementWord = document.getElementById('lyrics-word')

            for (let i = 0; i < lyrics.length; i++) {
                if (currentTime >= lyrics[i].time &&
                    (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)) {
                    lineIndex = i;
                    break;
                }
            }

            if (lineIndex !== -1 && lineIndex !== currentLine) {
                const rotate = lineIndex % 2 === 0 ? 8 : -8;
                if (lyrics[currentLine] && lyrics[lineIndex] && lyrics[currentLine].time - lyrics[lineIndex].time > -2) {
                    tl = gsap.timeline();
                    tl.to(element, {
                        duration: 0.05,
                        color: "#ccc",
                        ease: "power2.out"
                    });
                    tl.call(() => setCurrentLine(lineIndex));
                    tl.to(element, {
                        duration: 0.3,
                        color: "#fff",
                        ease: "power2.out"
                    });
                    tl.play()
                    return;
                }
                tl = gsap.timeline();
                tl.to(element, {
                    duration: 0.1,
                    scale: 0.6,
                    color: "#999",
                    opacity: 0,
                    ease: "power2.out"
                });
                tl.call(() => setCurrentLine(lineIndex));
                tl.set(element, {
                    opacity: 0,
                    letterSpacing: "4em",
                    y: 20,
                    rotation: rotate
                });
                tl.set(
                    elementWord,
                    {
                        opacity: 0,
                    },
                )
                tl.to(element, {
                    duration: 0.6,
                    opacity: 1,
                    letterSpacing: ".2em",
                    y: 0,
                    rotation: 0,
                    ease: "power2.out"
                });
                tl.to(
                    elementWord,
                    {
                        duration: 0.5,
                        scale: 1,
                        opacity: 1
                    }
                )

                tl.play();

            }
        };

        audio.addEventListener('timeupdate', updateLyrics);
        const interval = setInterval(updateLyrics, 100);

        return () => {
            if (tl) {
                tl.kill();
            }
            audio.removeEventListener('timeupdate', updateLyrics);
            clearInterval(interval);
        };
    }, [currentLine, lyrics, audioRef]);

    return (
        <main className="min-h-screen flex flex-col items-center overflow-hidden ">
            <div className="w-full h-screen relative" ref={mediaBgRef}>
                {isFullscreen && (
                    <button
                        onClick={exitFullscreen}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white flex items-center justify-center"
                        title="退出全屏"
                    >
                        <Minimize className="w-5 h-5" strokeWidth={2.5}/>
                    </button>
                )}

                <div
                    className="max-w-6xl mx-auto container flex-1 pt-32 flex flex-col justify-between h-full relative z-10">
                    <div className="gap-8 h-full flex items-center justify-center">

                        <div className="relative md:w-full h-auto flex justify-center items-center">

                            {lyrics.length > 0 ? (
                                <div>
                                    <div
                                        id="lyrics"
                                        className="text-center justify-center space-y-4 tracking-[.3em]"
                                    >
                                        {lyrics[currentLine] && (isEnglishText(lyrics[currentLine].text) ? (
                                            <p
                                                className='ransition-all lyric-font text-white font-bold lg:text-[8rem] text-5xl z-20 whitespace-nowrap pointer-events-none'
                                            >
                                                {lyrics[currentLine].text}
                                            </p>
                                        ) : (
                                            lyrics[currentLine].text.split(' ').map((line, index) => (
                                                <p
                                                    key={index}
                                                    className='ransition-all lyric-font text-white font-bold lg:text-[8rem] text-5xl z-20 whitespace-nowrap pointer-events-none'
                                                >
                                                    {line}
                                                </p>
                                            ))
                                        ))}
                                    </div>
                                    <div
                                        className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                                        <div
                                            id='lyrics-word'
                                            className={`lg:text-[13rem] lyric-font text-8xl font-bold text-center whitespace-nowrap pointer-events-none ${bgTextFlag ? 'text-black/20' : 'text-white/20'}`}
                                        >
                                            {lyrics[currentLine] && (currentLine == 0 ? lyrics[currentLine].text.split(' ')[0] : splitWord(lyrics[currentLine].text))}
                                        </div>
                                    </div>
                                </div>
                            ) : lyricsUrl && (
                                <div className="text-center mt-8">
                                    <a
                                        href={lyricsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-blue-500 hover:text-blue-400 transition-colors"
                                    >
                                        查看歌词
                                    </a>
                                </div>
                            )}


                        </div>
                    </div>
                    <div className="flex items-center mb-10">
                        <div className="md:w-1/2 flex flex-col items-center justify-center">
                            <div className="relative">
                                <div
                                    onClick={toggleFullscreen}
                                    className="absolute text-sky-50 cursor-pointer size-full top-0 hover:opacity-100 opacity-0 transition flex items-center justify-center"
                                    title={isFullscreen ? "退出全屏" : "全屏显示"}
                                >
                                    {isFullscreen ?
                                        <Minimize className="w-8 h-8" strokeWidth={2.5}/> :
                                        <Maximize className="w-8 h-8" strokeWidth={2.5}/>
                                    }
                                </div>
                                <Image
                                    crossOrigin={"anonymous"}
                                    ref={imgRef}
                                    src={imageUrl}
                                    alt={title}
                                    width={30}
                                    height={30}
                                    className="rounded-md shadow-lg w-36 h-36 object-cover hover:blur-sm"
                                />
                            </div>
                        </div>
                        
                        {/* Controls */}
                        <div className="p-4 w-full">
                            <h1 className="text-2xl font-bold mb-8 text-center">{title} - {author}</h1>
                            <div className="flex items-center gap-4 flex-col md:flex-row">
                                <div className="flex gap-3 items-center">
                                    <Link
                                        id="backward"
                                        onClick={() => clearState()}
                                        className="text-white hover:text-blue-300 transition-colors" href={`/media/${backwardId}/`}>
                                        <RewindIcon size="1.5rem"/>
                                    </Link>
                                    <button
                                        onClick={togglePlay}
                                        className="text-white hover:text-blue-300 transition-colors"
                                    >
                                        {isPlaying ? (
                                            <PauseIcon size="1.5rem"/>
                                        ) : (
                                            <PlayIcon size="1.5rem"/>
                                        )}
                                    </button>
                                    <Link
                                        id="forward"
                                        onClick={() => clearState()}
                                        className="text-white hover:text-blue-300 transition-colors" href={`/media/${forwardId}/`}>
                                        <FastForwardIcon size="1.5rem"/>
                                    </Link>

                                    <button
                                        onClick={() => toggleAutoPlay(!autoPlay)}
                                        className={cn("hover:text-blue-300 rounded-sm transition-colors", autoPlay ? "text-green-400" : "text-white bg-transparent")}
                                    >
                                        <RepeatIcon size="1.5rem"/>
                                    </button>

                                    <button
                                        onClick={onToggleStyle}
                                        className="text-white hover:text-blue-300 transition-colors"
                                        title="Switch Player Style"
                                    >
                                        <LayoutTemplate size="1.5rem"/>
                                    </button>

                                </div>

                                <div className="flex-1 gap-1 w-full">
                                    <div className="group w-full flex items-center justify-between">
                                        <AudioProgressBar
                                            currentTime={currentTime}
                                            duration={duration}
                                            onSeek={seek}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
