"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import type { MotionValue } from 'framer-motion';
import { compileSonnetProgram } from './sonnet/sonnetProgram';
import type { SonnetProgram } from './sonnet/types';
import { SonnetPixiRuntime } from './sonnet/createSonnetPixiRuntime';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_SONNET_TUNING, type Line, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';
import { resolveThemeFontStack, resolveThemeFontWeight } from './utils/fontStacks';

interface FoliaSonnetProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed: string;
    title: string;
    author: string;
    isPlaying: boolean;
}

const TUNING = DEFAULT_SONNET_TUNING;

/**
 * A runtime that has not come up by now is treated as failed. WebGL init is normally well under a
 * second; this only matters on devices where it never settles, where the stage must not stay on
 * the loading placeholder for the whole song.
 */
const RUNTIME_READY_TIMEOUT_MS = 15000;

/**
 * Hosts Folia's Sonnet Pixi runtime. The runtime owns its canvas, ticker and scene cache; this
 * component only feeds it the adapted song (program/theme), playback signals and lifecycle.
 */
export const FoliaSonnet = ({
    audioRef,
    lines,
    theme,
    seed,
    title,
    author,
    isPlaying,
}: FoliaSonnetProps) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const runtimeRef = useRef<SonnetPixiRuntime | null>(null);
    const [ready, setReady] = useState(false);
    // Like the other Pixi hosts, a runtime that cannot start falls back to plain lyric text
    // instead of leaving the stage on the loading placeholder.
    const [runtimeFailed, setRuntimeFailed] = useState(false);
    const {currentTime, audioPower, audioBands} = useAudioSignals(audioRef);

    const program = useMemo(() => compileSonnetProgram(lines, seed), [lines, seed]);

    // The create effect runs once per song; it reads the newest program/theme through this ref so
    // lyrics or palette arriving during the async init are picked up by the first song swap.
    const latestSongRef = useRef<{program: SonnetProgram; theme: Theme}>({program, theme});
    latestSongRef.current = {program, theme};
    const appliedSongRef = useRef<{program: SonnetProgram; theme: Theme} | null>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;

        const controller = new AbortController();
        let disposed = false;
        setReady(false);
        setRuntimeFailed(false);
        appliedSongRef.current = null;
        // The exact song handed to `create`; the swap effect must compare against this, not the
        // ref (lyrics may arrive while the runtime is still initialising).
        const initialSong = latestSongRef.current;
        const failureTimer = window.setTimeout(() => {
            if (!disposed) setRuntimeFailed(true);
        }, RUNTIME_READY_TIMEOUT_MS);

        SonnetPixiRuntime.create({
            host,
            songSeed: seed,
            program: initialSong.program,
            theme: initialSong.theme,
            tuning: TUNING,
            renderScale: 1,
            antialias: TUNING.render.antialias === 'global'
                ? !TUNING.postProcessEnabled
                : TUNING.render.antialias === 'on',
            smartBeatEnabled: false,
            currentTime,
            audioPower,
            audioBands,
            lyricsFontScale: 1,
            staticMode: false,
            transparentBackground: true,
            paused: !isPlaying,
            songTitle: title,
            songArtist: author,
            songAlbum: null,
            signal: controller.signal,
        })
            .then(runtime => {
                window.clearTimeout(failureTimer);
                if (disposed) {
                    runtime.destroy();
                    return;
                }
                runtimeRef.current = runtime;
                appliedSongRef.current = initialSong;
                setReady(true);
            })
            .catch((error: unknown) => {
                window.clearTimeout(failureTimer);
                if (error instanceof DOMException && error.name === 'AbortError') return;
                if (disposed) return;
                console.error('[FoliaSonnet] failed to create runtime', error);
                setRuntimeFailed(true);
            });

        return () => {
            disposed = true;
            window.clearTimeout(failureTimer);
            controller.abort();
            runtimeRef.current?.destroy();
            runtimeRef.current = null;
        };
        // The motion values are stable; the runtime is rebuilt only when the track changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seed, currentTime, audioPower, audioBands]);

    // Lyrics load after the player mounts, and the cover palette is extracted asynchronously:
    // both arrive as a silent swap on the already-created runtime (no dissolve, same seed).
    useEffect(() => {
        const runtime = runtimeRef.current;
        if (!runtime || !ready) return;

        const applied = appliedSongRef.current;
        if (applied?.program === program && applied.theme === theme) return;

        appliedSongRef.current = {program, theme};
        void runtime.swapSong({seed, program, theme}).catch((error: unknown) => {
            console.error('[FoliaSonnet] failed to swap song', error);
        });
    }, [ready, seed, program, theme]);

    useEffect(() => {
        if (ready) runtimeRef.current?.setPaused(!isPlaying);
    }, [ready, isPlaying]);

    useEffect(() => {
        if (ready) runtimeRef.current?.setSongMetadata({title, artist: author, album: null});
    }, [ready, title, author]);

    return (
        <div className="absolute inset-0">
            <div ref={hostRef} className="h-full w-full"/>
            {!ready ? (
                runtimeFailed ? (
                    <SonnetTextFallback lines={lines} currentTime={currentTime} theme={theme}/>
                ) : (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs tracking-[0.4em] text-white/40">
                        商籁 · 载入中
                    </div>
                )
            ) : null}
        </div>
    );
};

/**
 * The stage when the Pixi runtime cannot start: the active lyric line stays readable over the
 * shell backdrop and the player chrome keeps working. Reverts to the canvas by itself if the
 * runtime finishes initialising later.
 */
const SonnetTextFallback = ({
    lines,
    currentTime,
    theme,
}: {
    lines: Line[];
    currentTime: MotionValue<number>;
    theme: Theme;
}) => {
    const [lineIndex, setLineIndex] = useState(0);

    useEffect(() => {
        const update = (time: number) => {
            setLineIndex(resolveLineIndex(lines, time));
        };

        update(currentTime.get());
        return currentTime.on('change', update);
    }, [lines, currentTime]);

    return (
        <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center"
            style={{
                color: theme.primaryColor,
                fontFamily: resolveThemeFontStack(theme),
                fontWeight: resolveThemeFontWeight(theme, 600),
                fontSize: 'clamp(1.6rem, 5.4vw, 4rem)',
            }}
        >
            {lines[lineIndex]?.fullText ?? ''}
        </div>
    );
};

export default FoliaSonnet;
