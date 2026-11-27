"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import VisualizerLumiere from './lumiere/VisualizerLumiere';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_LUMIERE_TUNING, type Line, type LyricRenderScale, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaLumiereProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isPlaying: boolean;
    /** The stage is covered and hidden: no frame may be drawn, not even a paused repaint. */
    concealed?: boolean;
    renderScale?: LyricRenderScale;
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
    concealed = false,
    renderScale = 1,
}: FoliaLumiereProps) => {
    const {currentTime, audioPower, audioBands} = useAudioSignals(audioRef);
    const [lineIndex, setLineIndex] = useState(0);
    const lineIndexRef = useRef(0);
    const lumiereTuning = useMemo(
        () => ({...DEFAULT_LUMIERE_TUNING, render: {...DEFAULT_LUMIERE_TUNING.render, scale: renderScale}}),
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
            concealed={concealed}
            lumiereTuning={lumiereTuning}
        />
    );
};

export default FoliaLumiere;
