"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import VisualizerPendolo from './pendolo/VisualizerPendolo';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_PENDOLO_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaPendoloProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
}

/** Hosts Folia's Pendolo: lyrics riding a ticking clockwork escapement arc. */
export const FoliaPendolo = ({
    audioRef,
    lines,
    theme,
    seed,
    songTitle,
    songArtist,
    isPlaying,
}: FoliaPendoloProps) => {
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
        <VisualizerPendolo
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            audioBands={audioBands}
            seed={seed}
            songTitle={songTitle}
            songArtist={songArtist}
            paused={!isPlaying}
            pendoloTuning={DEFAULT_PENDOLO_TUNING}
        />
    );
};

export default FoliaPendolo;
