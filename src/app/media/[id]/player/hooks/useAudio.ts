"use client";

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getAllMediaItems } from '@/data/media';
import { getMediaTheme } from '@/data/mediaThemes';
import type { MediaItem } from '@/types/media';
import { playbackEngine } from '../playback/playbackEngine';
import { preloadLyrics, preloadPalette } from '../playback/mediaCache';
import { usePlayerPrefs } from './usePlayerPrefs';
import { usePlaybackSelector } from './usePlaybackSelector';

/**
 * Adapter between the player UI and the shared PlaybackEngine.
 *
 * The <audio> element itself lives in the /media layout, so a crossfade can keep playing while
 * the route advances to the next song. The returned ref is a stable getter that always resolves
 * to the deck that is currently audible.
 */
export const useAudio = (
    musicItem: MediaItem,
    forwardId: string,
    backwardId: string
) => {
    const {id, title, author, imageUrl, musicUrl} = musicItem;
    const isPlaying = usePlaybackSelector(snapshot => snapshot.isPlaying);
    const duration = usePlaybackSelector(snapshot => snapshot.duration);
    const autoPlay = usePlaybackSelector(snapshot => snapshot.autoPlay);
    const {toast} = useToast();
    const {prefs} = usePlayerPrefs();
    const upcomingToast = useRef(false);
    const lastTrackId = useRef<string | null>(null);

    const audioRef = useMemo(() => playbackEngine.getActiveRefObject(), []);

    useEffect(() => {
        const nextItem = getAllMediaItems().find(item => item.id === forwardId);
        playbackEngine.bindTrack({
            id,
            url: musicUrl,
            title,
            author,
            imageUrl,
            nextId: forwardId,
            nextUrl: nextItem?.musicUrl ?? null,
            prevId: backwardId,
        });

        // The visual handoff mounts the next page from scratch; warm its lyrics now so the
        // crossfade never reveals an empty lyric sheet. Preset themes ship their palette, so
        // cover extraction is only needed for tracks without one.
        preloadLyrics(nextItem?.lyricsUrl);
        if (nextItem && !getMediaTheme(nextItem.id)) preloadPalette(nextItem.imageUrl);
    }, [id, musicUrl, title, author, imageUrl, forwardId, backwardId]);

    // The old "up next" hint only belongs to the hard-cut path; with smart transitions the fade
    // itself is the cue. Reset the guard whenever the track changes or a seek moves out of range.
    useEffect(() => {
        const checkUpcomingTrack = () => {
            const snapshot = playbackEngine.getSnapshot();
            if (lastTrackId.current !== snapshot.trackId) {
                lastTrackId.current = snapshot.trackId;
                upcomingToast.current = false;
            }
            if (!snapshot.autoPlay || prefs.smartTransition || snapshot.duration <= 0) return;

            const remaining = snapshot.duration - snapshot.currentTime;
            if (remaining > 10) {
                upcomingToast.current = false;
                return;
            }
            if (!upcomingToast.current && remaining > 0) {
                upcomingToast.current = true;
                toast({title: '即将播放下一首', duration: 3000});
            }
        };

        checkUpcomingTrack();
        return playbackEngine.subscribe(checkUpcomingTrack);
    }, [prefs.smartTransition, toast]);

    const toggleAutoPlay = useCallback(() => {
        const next = !playbackEngine.getAutoPlay();
        playbackEngine.setAutoPlay(next);
        toast({
            title: next ? '已开启自动播放' : '已关闭自动播放',
            duration: 3000,
        });
    }, [toast]);

    const controls = useMemo(() => ({
        togglePlay: () => playbackEngine.togglePlay(),
        seek: (time: number) => playbackEngine.seek(time),
        setAutoPlay: toggleAutoPlay,
        play: () => playbackEngine.play(true),
        pause: () => playbackEngine.pause(),
        clearState: () => playbackEngine.clearState(),
    }), [toggleAutoPlay]);

    return {
        audioRef,
        audioState: {isPlaying, duration, autoPlay},
        controls,
    };
};
