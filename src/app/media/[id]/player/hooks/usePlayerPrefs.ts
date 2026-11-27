"use client";

import { useCallback, useSyncExternalStore } from 'react';
import type { BackgroundType } from '../folia/backgrounds/definition';
import type { PlayerFpsCap } from '../folia/fpsCap';
import type { LyricRenderScale } from '../folia/types';
import { clampCrossfadeSeconds, CROSSFADE_DEFAULT_SEC } from '../playback/crossfade';

// The player page's own preferences. Folia keeps these in its settings store with an app-wide
// schema; this static player persists the handful it actually renders to localStorage.
//
// The store is module-level so the settings panel and the playback engine adapter always observe
// the same values — including the smart-transition preferences.

export type BackgroundDisplayMode = 'both' | 'mesh' | 'dithering';
export type PlayerRenderScale = Extract<LyricRenderScale, 0.5 | 0.75 | 1>;
export type { PlayerFpsCap };

export interface PlayerPrefs {
    /** Which shell background is drawn under the lyric styles. */
    backgroundType: BackgroundType;
    /** Which latent backdrop layers to draw (Folia's background `displayMode`). */
    backgroundMode: BackgroundDisplayMode;
    /** False freezes the shell background (Folia's background static mode). */
    backgroundMotion: boolean;
    /** Global render resolution multiplier for WebGL/Canvas lyric modes. */
    renderScale: PlayerRenderScale;
    /** Global FPS cap for rAF-driven visualizers (0 = uncapped / display native). */
    fpsCap: PlayerFpsCap;
    /** The single embedded page the url background shows; empty renders nothing. */
    urlBackgroundUrl: string;
    /** Show the shared bottom subtitle. */
    subtitle: boolean;
    /** Let the chrome (and cursor) fade out while the pointer is idle. */
    autoHideChrome: boolean;
    /** Crossfade into the next track when autoplay advances. */
    smartTransition: boolean;
    /** Crossfade length in seconds (clamped to 1–12 on read). */
    crossfadeSeconds: number;
}

export const DEFAULT_PLAYER_PREFS: PlayerPrefs = {
    backgroundType: 'latent',
    backgroundMode: 'both',
    backgroundMotion: true,
    renderScale: 1,
    fpsCap: 60,
    urlBackgroundUrl: '',
    subtitle: true,
    autoHideChrome: true,
    smartTransition: true,
    crossfadeSeconds: CROSSFADE_DEFAULT_SEC,
};

const STORAGE_KEY = 'folia-player-prefs';
const BACKGROUND_MODES: readonly BackgroundDisplayMode[] = ['both', 'mesh', 'dithering'];
const BACKGROUND_TYPES: readonly BackgroundType[] = ['common', 'latent', 'monet', 'nomand', 'sora', 'url'];
const RENDER_SCALES: readonly PlayerRenderScale[] = [0.5, 0.75, 1];
const FPS_CAPS: readonly PlayerFpsCap[] = [0, 30, 60];

const sanitize = (value: Record<string, unknown>): Partial<PlayerPrefs> => {
    const patch: Partial<PlayerPrefs> = {};
    if (BACKGROUND_TYPES.includes(value.backgroundType as BackgroundType)) {
        patch.backgroundType = value.backgroundType as BackgroundType;
    }
    if (BACKGROUND_MODES.includes(value.backgroundMode as BackgroundDisplayMode)) {
        patch.backgroundMode = value.backgroundMode as BackgroundDisplayMode;
    }
    if (typeof value.backgroundMotion === 'boolean') patch.backgroundMotion = value.backgroundMotion;
    if (RENDER_SCALES.includes(value.renderScale as PlayerRenderScale)) {
        patch.renderScale = value.renderScale as PlayerRenderScale;
    }
    if (FPS_CAPS.includes(value.fpsCap as PlayerFpsCap)) {
        patch.fpsCap = value.fpsCap as PlayerFpsCap;
    }
    if (typeof value.urlBackgroundUrl === 'string') patch.urlBackgroundUrl = value.urlBackgroundUrl;
    if (typeof value.subtitle === 'boolean') patch.subtitle = value.subtitle;
    if (typeof value.autoHideChrome === 'boolean') patch.autoHideChrome = value.autoHideChrome;
    if (typeof value.smartTransition === 'boolean') patch.smartTransition = value.smartTransition;
    if (typeof value.crossfadeSeconds === 'number') {
        patch.crossfadeSeconds = clampCrossfadeSeconds(value.crossfadeSeconds);
    }
    return patch;
};

let snapshot: PlayerPrefs = DEFAULT_PLAYER_PREFS;
let hydrated = false;
const listeners = new Set<() => void>();

const emit = () => {
    for (const listener of listeners) {
        try {
            listener();
        } catch (error) {
            console.error('Player preference subscriber failed:', error);
        }
    }
};

/** Reads localStorage once, on the first client subscription (keeps prerender storage-free). */
const hydrate = () => {
    if (hydrated || typeof window === 'undefined') return;
    hydrated = true;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            const firstVisitPatch: Partial<PlayerPrefs> = {};
            // Respect OS reduced-motion preference on first visit before the user saves custom prefs.
            if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
                firstVisitPatch.backgroundMotion = false;
            }
            // Touch / low-core devices default to single-layer mesh backdrop and 0.75x render scale
            // to avoid dual full-screen WebGL + soft-light blend overhead.
            const isCoarsePointer = window.matchMedia?.('(hover: none)').matches ?? false;
            const isLowCore = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
            if (isCoarsePointer || isLowCore) {
                firstVisitPatch.backgroundMode = 'mesh';
                firstVisitPatch.renderScale = 0.75;
            }
            if (Object.keys(firstVisitPatch).length > 0) {
                snapshot = {...snapshot, ...firstVisitPatch};
                emit();
            }
            return;
        }
        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed !== 'object' || parsed === null) return;
        snapshot = {...snapshot, ...sanitize(parsed as Record<string, unknown>)};
        emit();
    } catch {
        // A broken/blocked store just keeps the defaults.
    }
};

const subscribe = (listener: () => void): (() => void) => {
    listeners.add(listener);
    hydrate();
    return () => {
        listeners.delete(listener);
    };
};

const getSnapshot = (): PlayerPrefs => snapshot;
const getServerSnapshot = (): PlayerPrefs => DEFAULT_PLAYER_PREFS;

export const usePlayerPrefs = () => {
    const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const updatePrefs = useCallback((patch: Partial<PlayerPrefs>) => {
        snapshot = {...snapshot, ...patch};
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        } catch {
            // Storage may be unavailable (private mode); the session still honours the change.
        }
        emit();
    }, []);

    return {prefs, updatePrefs};
};
