"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import { useTransitionRouter } from 'next-view-transitions';
import { useToast } from '@/hooks/use-toast';
import { usePlayerPrefs } from '../hooks/usePlayerPrefs';
import { playbackEngine } from './playbackEngine';

interface Props {
    children: ReactNode;
}

/** Module-level so rapid handoffs clear the previous timer instead of racing it. */
let mediaHandoffTimer: number | undefined;

const clearMediaHandoff = () => {
    window.clearTimeout(mediaHandoffTimer);
    delete document.documentElement.dataset.mediaHandoff;
};

/**
 * Flags the route change as a track handoff. globals.css turns the flag into a slower
 * crossfade between the outgoing lyric stage and the incoming one; regular navigations keep
 * the default view-transition timing.
 */
const markMediaHandoff = () => {
    window.clearTimeout(mediaHandoffTimer);
    document.documentElement.dataset.mediaHandoff = 'true';
    mediaHandoffTimer = window.setTimeout(clearMediaHandoff, 2000);
};

/**
 * Owns the two audio decks. Mounted by app/media/layout.tsx, so the decks survive navigation
 * between songs — that is what makes a crossfade across a route change possible.
 *
 * The deck refs are attached in an effect; MusicDetail's bindTrack effect may run first on the
 * initial mount, and the engine keeps that pending track until the decks are available.
 */
export const PlaybackProvider = ({children}: Props) => {
    const deckARef = useRef<HTMLAudioElement>(null);
    const deckBRef = useRef<HTMLAudioElement>(null);
    const router = useTransitionRouter();
    const {toast} = useToast();
    const {prefs} = usePlayerPrefs();

    useEffect(() => {
        const deckA = deckARef.current;
        const deckB = deckBRef.current;
        if (deckA && deckB) playbackEngine.attachDecks(deckA, deckB);
        return () => playbackEngine.detachDecks();
    }, []);

    useEffect(() => {
        playbackEngine.setAdvanceHandler(id => {
            // Only crossfades hand the visuals over early; a hard cut or a manual skip should
            // navigate with the default (snappier) view-transition timing.
            if (playbackEngine.isCrossfading()) markMediaHandoff();
            else clearMediaHandoff();
            router.push(`/media/${id}/`);
        });
        return () => playbackEngine.setAdvanceHandler(null);
    }, [router]);

    useEffect(() => {
        playbackEngine.setErrorHandler(error => {
            const name = error instanceof Error ? error.name : '';
            toast({
                title: '播放失败',
                description: name === 'NotAllowedError'
                    ? '浏览器阻止了自动播放，请手动点击播放按钮'
                    : '请检查音频文件是否存在或浏览器支持',
                variant: 'destructive',
            });
        });
        return () => playbackEngine.setErrorHandler(null);
    }, [toast]);

    useEffect(() => {
        playbackEngine.setTransitionSettings({
            enabled: prefs.smartTransition,
            seconds: prefs.crossfadeSeconds,
        });
    }, [prefs.smartTransition, prefs.crossfadeSeconds]);

    return (
        <>
            <audio ref={deckARef} className="hidden" aria-hidden="true" preload="auto" />
            <audio ref={deckBRef} className="hidden" aria-hidden="true" preload="auto" />
            {children}
        </>
    );
};
