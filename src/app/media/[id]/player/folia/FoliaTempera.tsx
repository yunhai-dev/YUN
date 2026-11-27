"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { resolveLineIndex } from './lineIndex';
import VisualizerTempera from './tempera/VisualizerTempera';
import { DEFAULT_TEMPERA_TUNING, type Line, type LyricRenderScale, type Theme } from './types';
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
    renderScale?: LyricRenderScale;
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
    renderScale = 1,
}: FoliaTemperaProps) => {
    const {currentTime} = useAudioSignals(audioRef);
    const [lineIndex, setLineIndex] = useState(0);
    const lineIndexRef = useRef(0);
    const temperaTuning = useMemo(
        () => ({...DEFAULT_TEMPERA_TUNING, render: {...DEFAULT_TEMPERA_TUNING.render, scale: renderScale}}),
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
            temperaTuning={temperaTuning}
        />
    );
};

export default FoliaTempera;
