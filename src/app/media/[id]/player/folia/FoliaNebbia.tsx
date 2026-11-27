"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import VisualizerNebbia from './nebbia/VisualizerNebbia';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_NEBBIA_TUNING } from './nebbia/types';
import type { Line, LyricRenderScale, Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaNebbiaProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
    renderScale?: LyricRenderScale;
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
    renderScale = 1,
}: FoliaNebbiaProps) => {
    const {currentTime, audioBands} = useAudioSignals(audioRef);
    const [lineIndex, setLineIndex] = useState(0);
    const lineIndexRef = useRef(0);
    const nebbiaTuning = useMemo(
        () => ({...DEFAULT_NEBBIA_TUNING, render: {...DEFAULT_NEBBIA_TUNING.render, scale: renderScale}}),
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
            nebbiaTuning={nebbiaTuning}
        />
    );
};

export default FoliaNebbia;
