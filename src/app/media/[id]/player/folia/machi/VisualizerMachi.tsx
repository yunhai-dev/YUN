// Vendored from Folia's src/components/visualizer/machi/VisualizerMachi.tsx (AGPL-3.0 — see
// ../LICENSE). Adaptations: the app-level shell, subtitle overlay, camera bar and app stores are
// dropped; the shell's font wrapper is inlined; render quality is fixed to the default.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { DEFAULT_LYRIC_RENDER_QUALITY } from '../utils/lyricRenderQuality';
import type { AudioBands, Line, LyricRenderQuality, Theme } from '../types';
import { loadLucideIcons } from '../services/lucideIconResolver';
import { resolveThemeFontStack, resolveThemeFontWeight } from '../utils/fontStacks';
import { getLineRenderEndTime } from '../utils/lyrics/renderHints';
import { useVisualizerPixiHost } from '../pixi/pixiRuntimeHost';
import { useVisualizerRuntime } from '../runtime';
import { useVisualizerSongCommit } from '../songHandover';
import type { MachiRuntime, MachiSongContext } from './createMachiRuntime';
import type { MachiTuning } from './types';

// src/components/visualizer/machi/VisualizerMachi.tsx
// 町景的 React 外壳：挂共享 shell 与底部字幕层，把按需加载的 three.js 运行时建一次（useVisualizerPixiHost 托管，
// 它与渲染器无关），换歌、换主题、换设置（场景、时间、天气）、暂停、静态模式都就地推给运行时。
// WebGL 上下文丢了就换一个 epoch 重建；透明模式（播放页透明）切换时也重建（画布带不带 alpha 只能在建上下文时定）。
// 每帧的时间只在运行时的循环里读 currentTime，不进 React state。
// 播放页上（不是预览、宿主存得下改动）控制面板的摄影机按钮打开取景控制条（MachiCameraBar）：开着时底部字幕让开；
// 拖它的滑块时改动先记在这里的草稿上、只推给运行时，松手或收起时再一次存下。

const EMPTY_LINES: Line[] = [];

/** 主题没有图标时招牌上用的兜底图标。 */
export const MACHI_FALLBACK_ICONS = ['Store', 'Umbrella', 'CloudRain', 'Moon'];

/** 招牌同步画图标：建运行时与换歌 / 换主题前先把主题图标和兜底图标加载好。 */
const loadMachiIcons = (theme: Theme) => loadLucideIcons([...(theme.lyricsIcons ?? []), ...MACHI_FALLBACK_ICONS]);

interface VisualizerMachiProps {
    machiTuning: MachiTuning;
    currentTime: MotionValue<number>;
    currentLineIndex: number;
    lines: Line[];
    theme: Theme;
    audioPower: MotionValue<number>;
    audioBands: AudioBands;
    showText?: boolean;
    lyricsFontScale?: number;
    staticMode?: boolean;
    paused?: boolean;
    seed?: string | number;
    songTitle?: string;
    songArtist?: string;
}

const VisualizerMachi: React.FC<VisualizerMachiProps> = (props) => {
    const {
        machiTuning,
        currentTime,
        currentLineIndex,
        lines,
        theme,
        audioPower,
        audioBands,
        showText = true,
        lyricsFontScale = 1,
        staticMode = false,
        paused = false,
        seed = 'machi',
        songTitle,
        songArtist,
    } = props;
    const hostRef = useRef<HTMLDivElement>(null);
    const [runtimeFailed, setRuntimeFailed] = useState(false);
    // 歌词画布的分辨率与抗锯齿挡位：本移植固定为默认挡位。
    const renderQuality: LyricRenderQuality = DEFAULT_LYRIC_RENDER_QUALITY;
    const [contextEpoch, setContextEpoch] = useState(0);
    const shownTuning = machiTuning;

    // 运行时创建期间这些输入可能已经变了；create 完成后按最新值补一次。
    const latestRef = useRef({ theme, paused, showText, staticMode, machiTuning, shownTuning, renderQuality });
    latestRef.current = { theme, paused, showText, staticMode, machiTuning, shownTuning, renderQuality };

    // 真正在画的歌：切歌时滞后于 props，免得对着还没到的歌词换牌面（songHandover.ts）。
    const committedSong = useVisualizerSongCommit({ seed, lines, currentTime, readyGraceMs: 3000 });
    const committedLines = committedSong.isInstrumental ? EMPTY_LINES : committedSong.lines;

    const { activeLine } = useVisualizerRuntime({
        currentTime,
        currentLineIndex,
        lines,
        getLineEndTime: getLineRenderEndTime,
    });

    const songContext = useMemo<MachiSongContext>(() => ({
        seed: committedSong.seed ?? 'machi',
        lines: committedLines,
        isInstrumental: committedSong.isInstrumental,
        title: songTitle ?? '',
        artist: songArtist ?? '',
        album: '',
    }), [committedLines, committedSong.isInstrumental, committedSong.seed, songArtist, songTitle]);

    const runtimeRef = useVisualizerPixiHost<MachiRuntime, MachiSongContext>({
        hostRef,
        label: 'Machi',
        // 只有真正需要新 WebGL 上下文的输入；歌、主题、暂停、静态模式都就地推给运行时。
        rebuildKey: [currentTime, audioPower, audioBands, contextEpoch],
        song: songContext,
        create: async (host, song, signal) => {
            const [{ MachiRuntime: Runtime }] = await Promise.all([
                import('./createMachiRuntime'),
                loadMachiIcons(latestRef.current.theme),
            ]);
            const latest = latestRef.current;
            const runtime = await Runtime.create({
                host,
                song,
                theme: latest.theme,
                tuning: latest.shownTuning,
                renderQuality: latest.renderQuality,
                currentTime,
                audioPower,
                audioBands,
                paused: latest.paused,
                staticMode: latest.staticMode,
                showText: latest.showText,
                previewMode: false,
                transparent: false,
                fallbackIcons: MACHI_FALLBACK_ICONS,
                onContextLost: () => setContextEpoch(epoch => epoch + 1),
                signal,
            });
            const current = latestRef.current;
            runtime.setTheme(current.theme);
            runtime.setTuning(current.shownTuning);
            runtime.setRenderQuality(current.renderQuality);
            runtime.setShowText(current.showText);
            runtime.setStaticMode(current.staticMode);
            runtime.setPaused(current.paused);
            return runtime;
        },
        swap: async (runtime, song) => {
            await loadMachiIcons(latestRef.current.theme);
            runtime.swapSong(song);
        },
        destroy: runtime => runtime.destroy(),
        onFailedChange: setRuntimeFailed,
    });

    useEffect(() => {
        let cancelled = false;
        void loadMachiIcons(theme).then(() => {
            if (!cancelled) runtimeRef.current?.setTheme(theme);
        });
        return () => { cancelled = true; };
    }, [theme, runtimeRef]);

    useEffect(() => {
        runtimeRef.current?.setTuning(shownTuning);
    }, [shownTuning, runtimeRef]);

    useEffect(() => {
        runtimeRef.current?.setRenderQuality(renderQuality);
    }, [renderQuality, runtimeRef]);

    useEffect(() => {
        runtimeRef.current?.setShowText(showText);
    }, [showText, runtimeRef]);

    useEffect(() => {
        runtimeRef.current?.setStaticMode(staticMode);
    }, [staticMode, runtimeRef]);

    useEffect(() => {
        runtimeRef.current?.setPaused(paused);
    }, [paused, runtimeRef]);

    // 暂停时循环停着，拖动进度要手动补一帧。
    useEffect(() => currentTime.on('change', () => {
        if (paused || staticMode) runtimeRef.current?.renderOnce();
    }), [currentTime, paused, staticMode, runtimeRef]);

    const fallbackFontFamily = resolveThemeFontStack(theme);
    const fallbackFontWeight = resolveThemeFontWeight(theme, 700);

    const fontClassName = theme.fontStyle === 'mono'
        ? 'font-mono'
        : theme.fontStyle === 'serif'
            ? 'font-serif'
            : 'font-sans';

    return (
        <div
            className={`relative h-full w-full overflow-hidden ${fontClassName}`}
            style={{
                fontFamily: resolveThemeFontStack(theme),
                fontWeight: resolveThemeFontWeight(theme, 400),
            }}
        >
            <div className="absolute inset-0 z-10 overflow-hidden">
                {/* 拖拽旋转、缩放要收到指针，所以这一层不是 pointer-events-none。 */}
                <div ref={hostRef} className="absolute inset-0 z-10" aria-hidden="true" />
                {runtimeFailed && (
                    <div
                        className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center"
                        style={{
                            color: theme.primaryColor,
                            fontFamily: fallbackFontFamily,
                            fontWeight: fallbackFontWeight,
                            fontSize: `clamp(2rem, ${5.4 * lyricsFontScale}vw, 5.6rem)`,
                        }}
                    >
                        {showText && !committedSong.isInstrumental ? (activeLine?.fullText || '') : null}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisualizerMachi;
