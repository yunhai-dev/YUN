"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import type { MotionValue } from 'framer-motion';
import type { PlayerFpsCap } from './fpsCap';
import { compileSonnetProgram } from './sonnet/sonnetProgram';
import { SonnetPixiRuntime, type SonnetSongContext } from './sonnet/createSonnetPixiRuntime';
import { useVisualizerPixiHost } from './pixi/pixiRuntimeHost';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_SONNET_TUNING, type Line, type LyricRenderScale, type Theme } from './types';
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
    /** The stage is covered and hidden: no frame may be drawn, not even a paused repaint. */
    concealed?: boolean;
    renderScale?: LyricRenderScale;
    fpsCap?: PlayerFpsCap;
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
    concealed = false,
    renderScale = 1,
    fpsCap = 0,
}: FoliaSonnetProps) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);
    // Like the other Pixi hosts, a runtime that cannot start falls back to plain lyric text
    // instead of leaving the stage on the loading placeholder.
    const [runtimeFailed, setRuntimeFailed] = useState(false);
    const {currentTime, audioPower, audioBands} = useAudioSignals(audioRef);

    const program = useMemo(() => compileSonnetProgram(lines, seed), [lines, seed]);
    const song = useMemo<SonnetSongContext>(
        () => ({seed, program, theme}),
        [seed, program, theme],
    );

    // Live playback/metadata props read once `create` resolves so changes during async init apply.
    const latestMetaRef = useRef({isPlaying, title, author, renderScale, fpsCap});
    latestMetaRef.current = {isPlaying, title, author, renderScale, fpsCap};

    const runtimeRef = useVisualizerPixiHost<SonnetPixiRuntime, SonnetSongContext>({
        hostRef,
        label: 'Sonnet',
        // Keep the Pixi WebGL context, texture pool and scene cache alive across track changes.
        rebuildKey: [currentTime, audioPower, audioBands],
        song,
        create: async (host, initialSong, signal) => {
            setReady(false);
            const meta = latestMetaRef.current;
            const failureTimer = window.setTimeout(() => {
                if (!signal.aborted) setRuntimeFailed(true);
            }, RUNTIME_READY_TIMEOUT_MS);
            try {
                const runtime = await SonnetPixiRuntime.create({
                    host,
                    songSeed: initialSong.seed,
                    program: initialSong.program,
                    theme: initialSong.theme,
                    tuning: TUNING,
                    renderScale: meta.renderScale,
                    fpsCap: meta.fpsCap,
                    antialias: TUNING.render.antialias === 'global'
                        ? !TUNING.postProcessEnabled
                        : TUNING.render.antialias === 'on',
                    antialiasMode: TUNING.render.antialias === 'global' ? 'auto' : TUNING.render.antialias,
                    smartBeatEnabled: false,
                    currentTime,
                    audioPower,
                    audioBands,
                    lyricsFontScale: 1,
                    staticMode: false,
                    transparentBackground: true,
                    paused: !meta.isPlaying,
                    songTitle: meta.title,
                    songArtist: meta.author,
                    songAlbum: null,
                    signal,
                });
                const current = latestMetaRef.current;
                runtime.setRenderScale(current.renderScale);
                runtime.setFpsCap(current.fpsCap);
                runtime.setPaused(!current.isPlaying);
                runtime.setSongMetadata({title: current.title, artist: current.author, album: null});
                setRuntimeFailed(false);
                setReady(true);
                return runtime;
            } finally {
                window.clearTimeout(failureTimer);
            }
        },
        swap: (runtime, nextSong) => runtime.swapSong(nextSong),
        destroy: runtime => runtime.destroy(),
        onFailedChange: setRuntimeFailed,
    });

    useEffect(() => {
        if (ready) runtimeRef.current?.setRenderScale(renderScale);
    }, [ready, renderScale, runtimeRef]);

    useEffect(() => {
        if (ready) runtimeRef.current?.setFpsCap(fpsCap);
    }, [ready, fpsCap, runtimeRef]);

    useEffect(() => {
        if (ready) runtimeRef.current?.setPaused(!isPlaying);
    }, [ready, isPlaying, runtimeRef]);

    useEffect(() => {
        if (!ready || isPlaying || concealed) return undefined;
        return currentTime.on('change', () => {
            if (!document.hidden) runtimeRef.current?.renderOnce();
        });
    }, [concealed, currentTime, isPlaying, ready, runtimeRef]);

    useEffect(() => {
        if (ready) runtimeRef.current?.setSongMetadata({title, artist: author, album: null});
    }, [ready, title, author, runtimeRef]);

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
