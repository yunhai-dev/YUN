"use client";

import { useCallback, useSyncExternalStore } from 'react';
import { playbackEngine, type PlaybackSnapshot } from '../playback/playbackEngine';

/** Select a primitive or a stable reference so unrelated snapshot changes skip React updates. */
export const usePlaybackSelector = <T,>(select: (snapshot: PlaybackSnapshot) => T): T => {
    const getSelection = useCallback(() => select(playbackEngine.getSnapshot()), [select]);
    const getServerSelection = useCallback(() => select(playbackEngine.getServerSnapshot()), [select]);
    return useSyncExternalStore(playbackEngine.subscribe, getSelection, getServerSelection);
};
