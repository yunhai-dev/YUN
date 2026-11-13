// Vendored from Folia's src/components/visualizer/tempera/VisualizerTempera.tsx (AGPL-3.0 — see
// ../LICENSE). Adaptations: the app-level VisualizerShell, subtitle overlay, pixi runtime host,
// song-commit handover, i18n, cover extraction and IndexedDB layer images are dropped; the host
// (FoliaTempera.tsx) supplies playback time, the song, the theme and the player's cover palette,
// and owns the runtime's create/swap/destroy lifecycle the same way FoliaSonnet does.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { resolveThemeFontStack, resolveThemeFontWeight } from '../utils/fontStacks';
import { DEFAULT_LYRIC_RENDER_QUALITY, resolveLyricAntialias, resolveLyricRenderQuality } from '../utils/lyricRenderQuality';
import { getLineRenderEndTime } from '../utils/lyrics/renderHints';
import { DEFAULT_TEMPERA_TUNING, type Line, type TemperaTuning, type Theme } from '../types';
import { useVisualizerRuntime } from '../runtime';
import type {
    TemperaPixiRuntime,
    TemperaSongContext,
    TemperaSongMetadata,
} from './createTemperaPixiRuntime';
import { compileTemperaProgram } from './temperaProgram';

// src/components/visualizer/tempera/VisualizerTempera.tsx
// Mounts the lazily loaded Pixi director while React retains fallback-text responsibilities.
const EMPTY_TEMPERA_LINES: Line[] = [];
// No IndexedDB layer-image store in this port; the renderer only reads this map.
const EMPTY_IMAGE_BLOBS: Map<string, Blob> = new Map();

interface VisualizerTemperaProps {
    currentTime: MotionValue<number>;
    currentLineIndex: number;
    lines: Line[];
    theme: Theme;
    showText?: boolean;
    lyricsFontScale?: number;
    staticMode?: boolean;
    paused?: boolean;
    seed?: string;
    coverColors?: string[];
    songTitle?: string;
    songArtist?: string;
    songAlbum?: string;
    temperaTuning?: TemperaTuning;
}

const VisualizerTempera: React.FC<VisualizerTemperaProps> = (props) => {
    const {
        currentTime,
        currentLineIndex,
        lines,
        theme,
        showText = true,
        lyricsFontScale = 1,
        staticMode = false,
        paused = false,
        seed = 'tempera',
        coverColors = [],
        songTitle,
        songArtist,
        songAlbum,
        temperaTuning = DEFAULT_TEMPERA_TUNING,
    } = props;
    const hostRef = useRef<HTMLDivElement>(null);
    const pausedRef = useRef(paused);
    pausedRef.current = paused;
    const temperaTuningRef = useRef(temperaTuning);
    temperaTuningRef.current = temperaTuning;
    // 分辨率与抗锯齿（#929）：本样式没有全局挡位可跟随，按自己的默认叠上 tuning 里的覆盖。倍数乘在
    // textureResolution 上；抗锯齿「自动」是原来的 !postProcessEnabled（开了后处理画面画进滤镜自己的
    // 多重采样目标，画布 MSAA 只剩画框边缘受益）。
    const renderQuality = useMemo(
        () => resolveLyricRenderQuality(DEFAULT_LYRIC_RENDER_QUALITY, temperaTuning.render),
        [temperaTuning.render],
    );
    const renderScale = renderQuality.scale;
    const antialias = resolveLyricAntialias(renderQuality.antialias, !temperaTuning.postProcessEnabled);
    const renderScaleRef = useRef(renderScale);
    renderScaleRef.current = renderScale;
    const latestSongMetadataRef = useRef<TemperaSongMetadata>({
        title: songTitle,
        artist: songArtist,
        album: songAlbum,
    });
    latestSongMetadataRef.current = {
        title: songTitle,
        artist: songArtist,
        album: songAlbum,
    };
    const runtimeRef = useRef<TemperaPixiRuntime | null>(null);
    const [ready, setReady] = useState(false);
    const [runtimeFailed, setRuntimeFailed] = useState(false);

    // No song-handover service here: the player hands over the current song directly, and a
    // track without lyrics shows the generated ♪ blocks so the director still has something
    // to cut between.
    const isInstrumental = lines.length === 0;

    const virtualLines = useMemo(() => {
        if (!isInstrumental) return EMPTY_TEMPERA_LINES;
        const generated: Line[] = [];
        for (let i = 0; i < 60; i++) {
            generated.push({
                id: `virtual-block-${i}`,
                startTime: i * 8,
                endTime: i * 8 + 6,
                fullText: '♪',
                words: [],
                isChorus: false,
            });
        }
        return generated;
    }, [isInstrumental]);

    const programLines = showText
        ? (lines.length > 0 ? lines : virtualLines)
        : EMPTY_TEMPERA_LINES;
    const wholeLineLyrics = temperaTuning.wholeLineLyrics;
    const program = useMemo(
        () => compileTemperaProgram(programLines, seed, { wholeLineLyrics }),
        [programLines, seed, wholeLineLyrics],
    );
    const { activeLine } = useVisualizerRuntime({
        currentTime,
        currentLineIndex,
        lines,
        getLineEndTime: getLineRenderEndTime,
    });

    // Song-scoped inputs, kept as one object so a track change is a single identity change.
    const songContext = useMemo<TemperaSongContext>(
        () => ({ seed, program, theme, coverColors }),
        [seed, program, coverColors, theme],
    );
    // The create effect runs once per song; it reads the newest song through this ref so lyrics
    // or the cover palette arriving during async init are picked up by the first swap.
    const latestSongRef = useRef(songContext);
    latestSongRef.current = songContext;
    const appliedSongRef = useRef<TemperaSongContext | null>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;

        const controller = new AbortController();
        let disposed = false;
        setReady(false);
        setRuntimeFailed(false);
        appliedSongRef.current = null;
        const initialSong = latestSongRef.current;

        void import('./createTemperaPixiRuntime')
            .then(({ TemperaPixiRuntime }) => TemperaPixiRuntime.create({
                host,
                songSeed: initialSong.seed,
                program: initialSong.program,
                theme: initialSong.theme,
                tuning: temperaTuningRef.current,
                renderScale: renderScaleRef.current,
                antialias,
                currentTime,
                lyricsFontScale,
                staticMode,
                coverColors: initialSong.coverColors,
                imageBlobs: EMPTY_IMAGE_BLOBS,
                paused: pausedRef.current,
                songTitle: latestSongMetadataRef.current.title,
                songArtist: latestSongMetadataRef.current.artist,
                songAlbum: latestSongMetadataRef.current.album,
                signal: controller.signal,
            }))
            .then(runtime => {
                if (disposed) {
                    runtime.destroy();
                    return;
                }
                runtimeRef.current = runtime;
                appliedSongRef.current = initialSong;
                // The tuning, resolution, pause state and metadata may have moved on while Pixi
                // was importing or initializing.
                runtime.setSongMetadata(latestSongMetadataRef.current);
                runtime.setTuning(temperaTuningRef.current);
                runtime.setRenderScale(renderScaleRef.current);
                runtime.setPaused(pausedRef.current);
                setReady(true);
            })
            .catch((error: unknown) => {
                if (error instanceof DOMException && error.name === 'AbortError') return;
                if (disposed) return;
                console.error('[FoliaTempera] failed to create runtime', error);
                setRuntimeFailed(true);
            });

        return () => {
            disposed = true;
            controller.abort();
            runtimeRef.current?.destroy();
            runtimeRef.current = null;
        };
        // The motion value is stable; the runtime is rebuilt only for inputs fixed when the
        // WebGL context is made (seed, antialias, font scale, static mode).
    }, [seed, currentTime, lyricsFontScale, staticMode, antialias]);

    // Lyrics load after the player mounts, and the cover palette is extracted asynchronously:
    // both arrive as a silent swap on the already-created runtime (no dissolve, same seed).
    useEffect(() => {
        const runtime = runtimeRef.current;
        if (!runtime || !ready) return;

        const applied = appliedSongRef.current;
        if (
            applied?.program === songContext.program
            && applied.theme === songContext.theme
            && applied.seed === songContext.seed
            && applied.coverColors.join('|') === songContext.coverColors.join('|')
        ) return;

        appliedSongRef.current = songContext;
        void runtime.swapSong(songContext).catch((error: unknown) => {
            console.error('[FoliaTempera] failed to swap song', error);
        });
    }, [ready, songContext]);

    // Tuning is pushed into the live renderer rather than rebuilding it. A rebuild per pointer
    // move re-initialises WebGL, re-measures every line and re-decodes placed images.
    useEffect(() => {
        runtimeRef.current?.setTuning(temperaTuning);
    }, [temperaTuning]);

    useEffect(() => {
        runtimeRef.current?.setRenderScale(renderScale);
    }, [renderScale]);

    useEffect(() => {
        runtimeRef.current?.setSongMetadata(latestSongMetadataRef.current);
    }, [songAlbum, songArtist, songTitle]);

    useEffect(() => {
        runtimeRef.current?.setPaused(paused);
    }, [paused]);

    // A paused runtime does not tick; playback scrubs (and the seek bar) still need a frame.
    useEffect(() => {
        if (!paused) return;
        return currentTime.on('change', () => runtimeRef.current?.renderOnce());
    }, [currentTime, paused]);

    const fontClassName = theme.fontStyle === 'mono'
        ? 'font-mono'
        : theme.fontStyle === 'serif'
            ? 'font-serif'
            : 'font-sans';
    const fallbackFontFamily = resolveThemeFontStack(theme);
    const fallbackFontWeight = resolveThemeFontWeight(theme, 600);

    return (
        <div className={`relative h-full w-full overflow-hidden ${fontClassName}`}>
            <div ref={hostRef} className="absolute inset-0 z-10" aria-hidden="true" />
            {(runtimeFailed || program.paragraphs.length === 0) && (
                <div
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-10 text-center transition-opacity duration-300"
                    style={{
                        color: theme.primaryColor,
                        fontFamily: fallbackFontFamily,
                        fontWeight: fallbackFontWeight,
                        fontSize: `clamp(2rem, ${5.4 * lyricsFontScale}vw, 5.6rem)`,
                    }}
                >
                    {showText && !isInstrumental ? (activeLine?.fullText || '') : null}
                </div>
            )}
        </div>
    );
};

export default VisualizerTempera;
