"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import VisualizerCappella from './cappella/VisualizerCappella';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_CAPPELLA_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaCappellaProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    songTitle?: string;
    coverUrl?: string | null;
    seed?: string;
}

/** Hosts Folia's Cappella: lyric lines as a chat-style bubble conversation. */
export const FoliaCappella = ({
    audioRef,
    lines,
    theme,
    songTitle,
    coverUrl,
    seed,
}: FoliaCappellaProps) => {
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
        <VisualizerCappella
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            songTitle={songTitle}
            coverUrl={coverUrl}
            seed={seed}
            cappellaTuning={DEFAULT_CAPPELLA_TUNING}
        />
    );
};

export default FoliaCappella;
