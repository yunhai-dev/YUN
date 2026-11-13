"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import VisualizerCladdagh from './claddagh/VisualizerCladdagh';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_CLADDAGH_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaCladdaghProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    isPlaying: boolean;
}

/** Hosts Folia's Claddagh: lyric characters wrapped around a tilted ring. */
export const FoliaCladdagh = ({audioRef, lines, theme, isPlaying}: FoliaCladdaghProps) => {
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
        <VisualizerCladdagh
            currentTime={currentTime}
            currentLineIndex={lineIndex}
            lines={lines}
            theme={theme}
            audioBands={audioBands}
            paused={!isPlaying}
            claddaghTuning={DEFAULT_CLADDAGH_TUNING}
        />
    );
};

export default FoliaCladdagh;
