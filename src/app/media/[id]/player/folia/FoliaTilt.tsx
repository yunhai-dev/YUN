"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import { resolveLineIndex } from './lineIndex';
import VisualizerTilt from './tilt/VisualizerTilt';
import { DEFAULT_TILT_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaTiltProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
}

/** Hosts Folia's Tilt typography mode: line splitting, italic emphasis, per-character pulses. */
export const FoliaTilt = ({audioRef, lines, theme}: FoliaTiltProps) => {
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
        <VisualizerTilt
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            tiltTuning={DEFAULT_TILT_TUNING}
        />
    );
};

export default FoliaTilt;
