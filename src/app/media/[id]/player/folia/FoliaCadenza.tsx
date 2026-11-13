"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import VisualizerCadenza from './cadenza/VisualizerCadenza';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_CADENZA_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaCadenzaProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
}

/** Hosts Folia's Cadenza: pretext-measured fragments mirrored into DOM + canvas layers. */
export const FoliaCadenza = ({audioRef, lines, theme}: FoliaCadenzaProps) => {
    const {currentTime, audioPower, audioBands} = useAudioSignals(audioRef);
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
        <VisualizerCadenza
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            audioPower={audioPower}
            audioBands={audioBands}
            cadenzaTuning={DEFAULT_CADENZA_TUNING}
        />
    );
};

export default FoliaCadenza;
