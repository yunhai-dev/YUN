"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import VisualizerStill from './still/VisualizerStill';
import { resolveLineIndex } from './lineIndex';
import type { Line, Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaStillProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
}

/** Hosts Folia's Still: the previous, current and next line held statically on screen. */
export const FoliaStill = ({audioRef, lines, theme}: FoliaStillProps) => {
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
        <VisualizerStill
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
        />
    );
};

export default FoliaStill;
