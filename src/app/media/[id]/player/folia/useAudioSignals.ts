"use client";

import { useEffect, useMemo, type RefObject } from 'react';
import { motionValue, type MotionValue } from 'framer-motion';
import { playbackEngine } from '../playback/playbackEngine';
import { cancelNativeFrame, requestNativeFrame } from './fpsCap';
import type { AudioBands } from './types';

interface SharedAudioSignals {
    currentTime: MotionValue<number>;
    audioPower: MotionValue<number>;
    audioBands: AudioBands;
    refCount: number;
    stopClock: (() => void) | null;
}

const CLOCK_EVENTS = ['play', 'playing', 'pause', 'ended', 'seeking', 'seeked', 'loadedmetadata', 'emptied', 'error'] as const;

// Share one rAF clock and MotionValue bundle per stable audioRef so FoliaBackdrop and the active
// visualizer never run duplicate per-frame loops reading the same <audio> element.
const sharedSignalsByRef = new WeakMap<RefObject<HTMLAudioElement | null>, SharedAudioSignals>();

const getOrCreateSharedSignals = (audioRef: RefObject<HTMLAudioElement | null>): SharedAudioSignals => {
    const existing = sharedSignalsByRef.get(audioRef);
    if (existing) return existing;

    const created: SharedAudioSignals = {
        currentTime: motionValue(0),
        audioPower: motionValue(0),
        audioBands: {
            bass: motionValue(0),
            lowMid: motionValue(0),
            mid: motionValue(0),
            vocal: motionValue(0),
            treble: motionValue(0),
        },
        refCount: 0,
        stopClock: null,
    };
    sharedSignalsByRef.set(audioRef, created);
    return created;
};

const observePlaybackClock = (audioRef: RefObject<HTMLAudioElement | null>, currentTime: MotionValue<number>) => {
    let audio: HTMLAudioElement | null = null;
    let frameId = 0;

    const readTime = () => {
        const time = audio?.currentTime ?? 0;
        const safeTime = Number.isFinite(time) ? time : 0;
        if (currentTime.get() !== safeTime) currentTime.set(safeTime);
    };

    const stopFrame = () => {
        if (!frameId) return;
        cancelNativeFrame(frameId);
        frameId = 0;
    };

    const syncClock = () => {
        if (document.hidden) {
            stopFrame();
            return;
        }
        readTime();
        if (!audio || audio.paused || audio.ended || audio.error) {
            stopFrame();
            return;
        }
        if (frameId) return;
        const scheduled = requestNativeFrame(() => {
            if (frameId !== scheduled) return;
            frameId = 0;
            bindActiveElement();
        });
        frameId = scheduled;
    };

    const bindActiveElement = () => {
        const next = audioRef.current;
        if (audio !== next) {
            for (const event of CLOCK_EVENTS) audio?.removeEventListener(event, syncClock);
            audio = next;
            for (const event of CLOCK_EVENTS) audio?.addEventListener(event, syncClock);
        }
        syncClock();
    };

    // The player's getter keeps the same identity when the incoming crossfade deck takes over.
    const unsubscribe = audioRef === playbackEngine.getActiveRefObject()
        ? playbackEngine.subscribeToActiveElement(bindActiveElement)
        : undefined;
    document.addEventListener('visibilitychange', bindActiveElement);
    bindActiveElement();

    return () => {
        unsubscribe?.();
        document.removeEventListener('visibilitychange', bindActiveElement);
        for (const event of CLOCK_EVENTS) audio?.removeEventListener(event, syncClock);
        stopFrame();
    };
};

/**
 * Mirrors the `<audio>` element's playback clock into shared framer-motion values.
 *
 * Folia's runtimes read `currentTime` / audio levels every animation frame and never re-render
 * React. The clock samples every frame during playback and follows media events while paused.
 * No Web Audio graph is attached: analysing the cross-origin media would require CORS on
 * the audio host, and tainted media routed through a MediaElementSource plays back silent.
 * The level values therefore stay at zero, which is the
 * same neutral state Folia's own preview/static surfaces use.
 */
export const useAudioSignals = (audioRef: RefObject<HTMLAudioElement | null>) => {
    const shared = useMemo(() => getOrCreateSharedSignals(audioRef), [audioRef]);

    useEffect(() => {
        shared.refCount += 1;
        if (shared.refCount === 1) {
            shared.stopClock = observePlaybackClock(audioRef, shared.currentTime);
        }

        return () => {
            shared.refCount -= 1;
            if (shared.refCount === 0) {
                shared.stopClock?.();
                shared.stopClock = null;
            }
        };
    }, [audioRef, shared]);

    return {
        currentTime: shared.currentTime,
        audioPower: shared.audioPower,
        audioBands: shared.audioBands,
    };
};
