"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import Visualizer from './classic/Visualizer';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_CLASSIC_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaClassicProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
}

/** Hosts Folia's Luminous classic: per-word glow with loose, deterministic placement. */
export const FoliaClassic = ({audioRef, lines, theme}: FoliaClassicProps) => {
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
        <Visualizer
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            classicTuning={DEFAULT_CLASSIC_TUNING}
        />
    );
};

export default FoliaClassic;
