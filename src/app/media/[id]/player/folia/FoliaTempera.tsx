"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import { resolveLineIndex } from './lineIndex';
import VisualizerTempera from './tempera/VisualizerTempera';
import { DEFAULT_TEMPERA_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaTemperaProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed: string;
    coverColors: string[];
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
}

/** Hosts Folia's Tempera director: 15 Pixi compositions, scene cache and song cuts. */
export const FoliaTempera = ({
    audioRef,
    lines,
    theme,
    seed,
    coverColors,
    songTitle,
    songArtist,
    isPlaying,
}: FoliaTemperaProps) => {
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
        <VisualizerTempera
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            seed={seed}
            coverColors={coverColors}
            songTitle={songTitle}
            songArtist={songArtist}
            paused={!isPlaying}
            temperaTuning={DEFAULT_TEMPERA_TUNING}
        />
    );
};

export default FoliaTempera;
