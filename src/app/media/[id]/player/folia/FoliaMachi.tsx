"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import VisualizerMachi from './machi/VisualizerMachi';
import { DEFAULT_MACHI_TUNING } from './machi/types';
import { resolveLineIndex } from './lineIndex';
import type { Line, Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaMachiProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
}

/** Hosts Folia's Machi: a miniature three.js street district with lyric signage. */
export const FoliaMachi = ({
    audioRef,
    lines,
    theme,
    seed,
    songTitle,
    songArtist,
    isPlaying,
}: FoliaMachiProps) => {
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
        <VisualizerMachi
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            audioPower={audioPower}
            audioBands={audioBands}
            seed={seed}
            songTitle={songTitle}
            songArtist={songArtist}
            paused={!isPlaying}
            machiTuning={DEFAULT_MACHI_TUNING}
        />
    );
};

export default FoliaMachi;
