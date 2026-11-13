"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import { resolveLineIndex } from './lineIndex';
import VisualizerMonet from './monet/VisualizerMonet';
import { DEFAULT_MONET_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaMonetProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    coverUrl?: string | null;
    songTitle?: string;
    songArtist?: string;
    seed?: string;
    onSeek?: (time: number) => void;
}

/** Hosts Folia's Monet poster: cover-led layout, measured scrolling lyric rail, bottom audio rail. */
export const FoliaMonet = ({
    audioRef,
    lines,
    theme,
    coverUrl,
    songTitle,
    songArtist,
    seed,
    onSeek,
}: FoliaMonetProps) => {
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
        <VisualizerMonet
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            coverUrl={coverUrl}
            songTitle={songTitle}
            songArtist={songArtist}
            seed={seed}
            audioPower={audioPower}
            audioBands={audioBands}
            monetTuning={DEFAULT_MONET_TUNING}
            onLyricLineSeek={onSeek}
        />
    );
};

export default FoliaMonet;
