"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import VisualizerLumiere from './lumiere/VisualizerLumiere';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_LUMIERE_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaLumiereProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
}

/** Hosts Folia's Lumiere: line-art and light-field stage with lyrics traced in beams. */
export const FoliaLumiere = ({
    audioRef,
    lines,
    theme,
    seed,
    songTitle,
    songArtist,
    isPlaying,
}: FoliaLumiereProps) => {
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
        <VisualizerLumiere
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
            lumiereTuning={DEFAULT_LUMIERE_TUNING}
        />
    );
};

export default FoliaLumiere;
