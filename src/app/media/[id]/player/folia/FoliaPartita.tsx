"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import { resolveLineIndex } from './lineIndex';
import VisualizerPartita from './partita/VisualizerPartita';
import { DEFAULT_PARTITA_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaPartitaProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
}

/** Hosts Folia's Partita staircase: measured columns of glowing words, one chunk per line. */
export const FoliaPartita = ({audioRef, lines, theme}: FoliaPartitaProps) => {
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
        <VisualizerPartita
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            partitaTuning={DEFAULT_PARTITA_TUNING}
        />
    );
};

export default FoliaPartita;
