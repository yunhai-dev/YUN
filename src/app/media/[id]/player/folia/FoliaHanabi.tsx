"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import VisualizerHanabi from './hanabi/VisualizerHanabi';
import { DEFAULT_HANABI_TUNING } from './hanabi/types';
import { resolveLineIndex } from './lineIndex';
import type { Line, Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaHanabiProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
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
}: FoliaHanabiProps) => {
    const {currentTime} = useAudioSignals(audioRef);
    const [lineIndex, setLineIndex] = useState(0);
    const lineIndexRef = useRef(0);

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
            hanabiTuning={DEFAULT_HANABI_TUNING}
        />
    );
};

export default FoliaHanabi;
