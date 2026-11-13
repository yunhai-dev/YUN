"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import VisualizerNebbia from './nebbia/VisualizerNebbia';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_NEBBIA_TUNING } from './nebbia/types';
import type { Line, Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaNebbiaProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
}

/** Hosts Folia's Nebbia: rain on a window with lyrics fogging the glass. */
export const FoliaNebbia = ({
    audioRef,
    lines,
    theme,
    seed,
    songTitle,
    songArtist,
    isPlaying,
}: FoliaNebbiaProps) => {
    const {currentTime, audioBands} = useAudioSignals(audioRef);
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
        <VisualizerNebbia
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            audioBands={audioBands}
            paused={!isPlaying}
            seed={seed}
            songTitle={songTitle}
            songArtist={songArtist}
            nebbiaTuning={DEFAULT_NEBBIA_TUNING}
        />
    );
};

export default FoliaNebbia;
