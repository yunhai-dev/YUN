"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import VisualizerFume from './fume/VisualizerFume';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_FUME_TUNING, type Line, type LyricRenderScale, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';
import type { PlayerFpsCap } from './fpsCap';

interface FoliaFumeProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    isPlaying: boolean;
    renderScale?: LyricRenderScale;
    fpsCap?: PlayerFpsCap;
}

/** Hosts Folia's Fume: the whole lyric set as a printed article, camera drifting through it. */
export const FoliaFume = ({audioRef, lines, theme, seed, isPlaying, renderScale = 1, fpsCap = 0}: FoliaFumeProps) => {
    const {currentTime, audioPower, audioBands} = useAudioSignals(audioRef);
    const [lineIndex, setLineIndex] = useState(0);
    const lineIndexRef = useRef(0);
    const fumeTuning = useMemo(() => ({
        ...DEFAULT_FUME_TUNING,
        render: {scale: renderScale, antialias: 'global' as const},
    }), [renderScale]);

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
        <VisualizerFume
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            audioPower={audioPower}
            audioBands={audioBands}
            paused={!isPlaying}
            fpsCap={fpsCap}
            seed={seed}
            fumeTuning={fumeTuning}
        />
    );
};

export default FoliaFume;
