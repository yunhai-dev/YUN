"use client";

import { useEffect, useMemo, type RefObject } from 'react';
import { useMotionValue } from 'framer-motion';
import type { AudioBands } from './types';

/**
 * Mirrors the `<audio>` element's playback clock into framer-motion values.
 *
 * Folia's runtimes read `currentTime` / audio levels every animation frame and never re-render
 * React, so the bridge must be a plain rAF loop. No Web Audio graph is attached: analysing the
 * cross-origin media would require CORS on the audio host, and tainted media routed through a
 * MediaElementSource plays back silent. The level values therefore stay at zero, which is the
 * same neutral state Folia's own preview/static surfaces use.
 */
export const useAudioSignals = (audioRef: RefObject<HTMLAudioElement | null>) => {
    const currentTime = useMotionValue(0);
    const audioPower = useMotionValue(0);
    const bass = useMotionValue(0);
    const lowMid = useMotionValue(0);
    const mid = useMotionValue(0);
    const vocal = useMotionValue(0);
    const treble = useMotionValue(0);

    useEffect(() => {
        let raf = 0;
        let lastTime = -1;

        const tick = () => {
            const audio = audioRef.current;
            if (audio) {
                const time = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
                if (time !== lastTime) {
                    lastTime = time;
                    currentTime.set(time);
                }
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [audioRef, currentTime]);

    const audioBands = useMemo<AudioBands>(
        () => ({bass, lowMid, mid, vocal, treble}),
        [bass, lowMid, mid, vocal, treble],
    );

    return {currentTime, audioPower, audioBands};
};
