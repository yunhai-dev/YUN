"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import VisualizerPendolo from './pendolo/VisualizerPendolo';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_PENDOLO_TUNING, type Line, type LyricRenderScale, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaPendoloProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
    renderScale?: LyricRenderScale;
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
    renderScale = 1,
}: FoliaPendoloProps) => {
    const {currentTime, audioBands} = useAudioSignals(audioRef);
    const [lineIndex, setLineIndex] = useState(0);
    const lineIndexRef = useRef(0);
    const pendoloTuning = useMemo(
        () => ({...DEFAULT_PENDOLO_TUNING, render: {...DEFAULT_PENDOLO_TUNING.render, scale: renderScale}}),
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
            pendoloTuning={pendoloTuning}
        />
    );
};

export default FoliaPendolo;
