"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import VisualizerHanabi from './hanabi/VisualizerHanabi';
import { DEFAULT_HANABI_TUNING } from './hanabi/types';
import { resolveLineIndex } from './lineIndex';
import type { Line, LyricRenderScale, Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaHanabiProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
    /** The stage is covered and hidden: no frame may be drawn, not even a paused repaint. */
    concealed?: boolean;
    renderScale?: LyricRenderScale;
}

/** Hosts Folia's Hanabi: fireworks and lyric blocks rising over the night sky. */
export const FoliaHanabi = ({
    audioRef,
    lines,
    theme,
    seed,
    songTitle,
    songArtist,
    isPlaying,
    concealed = false,
    renderScale = 1,
}: FoliaHanabiProps) => {
    const {currentTime} = useAudioSignals(audioRef);
    const [lineIndex, setLineIndex] = useState(0);
    const lineIndexRef = useRef(0);
    const hanabiTuning = useMemo(
        () => ({...DEFAULT_HANABI_TUNING, render: {...DEFAULT_HANABI_TUNING.render, scale: renderScale}}),
        [renderScale],
    );

    useEffect(() => {
        lineIndexRef.current = 0;
        setLineIndex(0);

        const update = (time: number) => {
            const next = resolveLineIndex(lines, time);
            if (next !== lineIndexRef.current) {
                lineIndexRef.current = next;
                setLineIndex(next);
            }
        };

        update(currentTime.get());
        return currentTime.on('change', update);
    }, [lines, currentTime]);

    return (
        <VisualizerHanabi
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            seed={seed}
            songTitle={songTitle}
            songArtist={songArtist}
            paused={!isPlaying}
            concealed={concealed}
            hanabiTuning={hanabiTuning}
        />
    );
};

export default FoliaHanabi;
