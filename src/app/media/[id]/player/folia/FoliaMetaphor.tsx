"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_METAPHOR_TUNING } from './metaphor/types';
import { MetaphorRuntime, type MetaphorSong } from './metaphor/createMetaphorRuntime';
import { useVisualizerPixiHost } from './pixi/pixiRuntimeHost';
import type { Line, LyricRenderScale, Theme } from './types';
import { useAudioSignals } from './useAudioSignals';
import { resolveThemeFontStack, resolveThemeFontWeight } from './utils/fontStacks';

interface FoliaMetaphorProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed?: string;
    songTitle?: string;
    isPlaying: boolean;
    concealed?: boolean;
    renderScale?: LyricRenderScale;
}

const TUNING = DEFAULT_METAPHOR_TUNING;

/**
 * Hosts Folia's Metaphor runtime: a three.js ink field developed into paper, halftone and
 * grain. The runtime is created once per WebGL context and receives song, theme and playback
 * changes in place; it draws straight into its own canvas.
 */
export const FoliaMetaphor = ({
    audioRef,
    lines,
    theme,
    seed,
    songTitle,
    isPlaying,
    concealed = false,
    renderScale = 1,
}: FoliaMetaphorProps) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const {currentTime, audioPower} = useAudioSignals(audioRef);
    const [lineIndex, setLineIndex] = useState(0);
    const [runtimeFailed, setRuntimeFailed] = useState(false);
    const [contextEpoch, setContextEpoch] = useState(0);
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

    const song = useMemo<MetaphorSong>(() => ({
        seed: seed ?? 'metaphor',
        lines,
        title: songTitle ?? '',
    }), [lines, seed, songTitle]);

    // Inputs the runtime reads through the create closure; a change while it is still starting
    // is applied once `create` resolves instead of waiting for the next prop effect.
    const latestRef = useRef({theme, paused: !isPlaying, tuning: TUNING, renderScale});
    latestRef.current = {theme, paused: !isPlaying, tuning: TUNING, renderScale};

    const runtimeRef = useVisualizerPixiHost<MetaphorRuntime, MetaphorSong>({
        hostRef,
        label: 'Metaphor',
        rebuildKey: [currentTime, audioPower, contextEpoch],
        song,
        create: async (host, initialSong, signal) => {
            const latest = latestRef.current;
            const runtime = await MetaphorRuntime.create({
                host,
                song: initialSong,
                theme: latest.theme,
                tuning: latest.tuning,
                renderScale: latest.renderScale,
                currentTime,
                audioPower,
                paused: latest.paused,
                staticMode: false,
                showText: true,
                seeThrough: false,
                onContextLost: () => setContextEpoch(epoch => epoch + 1),
                signal,
            });
            const current = latestRef.current;
            runtime.setTheme(current.theme);
            runtime.setTuning(current.tuning);
            runtime.setRenderScale(current.renderScale);
            runtime.setPlayback(current.paused, false);
            return runtime;
        },
        swap: (runtime, nextSong) => runtime.swapSong(nextSong),
        destroy: runtime => runtime.destroy(),
        onFailedChange: setRuntimeFailed,
    });

    useEffect(() => {
        runtimeRef.current?.setRenderScale(renderScale);
    }, [renderScale, runtimeRef]);

    useEffect(() => {
        runtimeRef.current?.setTheme(theme);
    }, [theme, runtimeRef]);

    useEffect(() => {
        runtimeRef.current?.setPlayback(!isPlaying, false);
    }, [isPlaying, runtimeRef]);

    // A paused runtime stops its loop; a seek must still repaint the new moment.
    useEffect(() => {
        if (isPlaying || concealed) return undefined;
        return currentTime.on('change', () => runtimeRef.current?.requestFrame());
    }, [concealed, currentTime, isPlaying, runtimeRef]);

    const fallbackText = lineIndex >= 0 && lineIndex < lines.length ? lines[lineIndex].fullText : '';

    return (
        <div className="absolute inset-0">
            <div ref={hostRef} className="absolute inset-0" aria-hidden="true"/>
            {runtimeFailed ? (
                <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center"
                    style={{
                        color: theme.primaryColor,
                        fontFamily: resolveThemeFontStack(theme),
                        fontWeight: resolveThemeFontWeight(theme, 300),
                        fontSize: 'clamp(1.8rem, 5.4vw, 5rem)',
                    }}
                >
                    {fallbackText}
                </div>
            ) : null}
        </div>
    );
};

export default FoliaMetaphor;
