// Vendored from Folia's src/components/visualizer/nebbia/VisualizerNebbia.tsx (AGPL-3.0 — see
// ../LICENSE). Adaptations: the app-level shell, subtitle overlay, song hand-off, preview/first-
// frame markers and global render-quality store are dropped; the shell's font wrapper is inlined
// and the player's cover/backdrop always sits behind the transparent canvas.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import type { AudioBands, Line, Theme } from '../types';
import { resolveThemeFontStack, resolveThemeFontWeight } from '../utils/fontStacks';
import { getLineRenderEndTime } from '../utils/lyrics/renderHints';
import { DEFAULT_LYRIC_RENDER_QUALITY, resolveLyricRenderQuality } from '../utils/lyricRenderQuality';
import { useVisualizerRuntime } from '../runtime';
import { NebbiaRuntime } from './createNebbiaRuntime';
import { DEFAULT_NEBBIA_TUNING, type NebbiaTuning } from './types';

// src/components/visualizer/nebbia/VisualizerNebbia.tsx
// 雾笺的 React 外壳：运行时建一次，换歌、tuning、主题、暂停都就地推给它。
// 每帧的时间只在运行时的循环里读 currentTime，不进 React state。WebGL2 不可用或上下文丢了，就退回只显示当前这句。
// 窗外换成共用背景时画布要带透明通道，只能新建上下文；窗外在街景和水族箱之间换时着色器要按另一套编：都是运行时整个重建。
const EMPTY_LINES: Line[] = [];

interface Props {
    currentTime: MotionValue<number>;
    currentLineIndex: number;
    lines: Line[];
    theme: Theme;
    audioBands: AudioBands;
    showText?: boolean;
    lyricsFontScale?: number;
    staticMode?: boolean;
    paused?: boolean;
    seed?: string;
    songTitle?: string;
    songArtist?: string;
    isDaylight?: boolean;
    nebbiaTuning?: NebbiaTuning;
}

const VisualizerNebbia: React.FC<Props> = (props) => {
    const {
        currentTime, currentLineIndex, lines, theme, audioBands,
        showText = true, lyricsFontScale = 1, staticMode = false, paused = false, seed = 'nebbia', songTitle, songArtist,
        isDaylight = false, nebbiaTuning = DEFAULT_NEBBIA_TUNING,
    } = props;
    const hostRef = useRef<HTMLDivElement>(null);
    const runtimeRef = useRef<NebbiaRuntime | null>(null);
    const [failed, setFailed] = useState(false);
    // WebGL 上下文丢了又回来时加一，重建运行时
    const [generation, setGeneration] = useState(0);
    // 分辨率（#929）：全屏着色器没有 MSAA，只跟分辨率倍数。
    const renderQuality = useMemo(
        () => resolveLyricRenderQuality(DEFAULT_LYRIC_RENDER_QUALITY, nebbiaTuning.render),
        [nebbiaTuning.render],
    );
    const renderScale = renderQuality.scale;
    const seeThrough = nebbiaTuning.behind === 'backdrop';
    // 透出后面时（播放页透明）窗外不画，但选了水族箱时水珠里折射的还是水族箱（水母照样游，车不颠）；选了共用背景就折射街景
    const scene = nebbiaTuning.behind === 'aquarium' ? 'aquarium' : 'night';
    const glass = nebbiaTuning.glass;

    // The player hands over the current song directly; there is no lag across a track switch.
    const committedLines = lines.length === 0 ? EMPTY_LINES : lines;
    const song = useMemo(
        () => ({ lines: committedLines, seed: seed ?? 'nebbia', title: songTitle, artist: songArtist }),
        [committedLines, seed, songTitle, songArtist],
    );

    const latest = useRef({ theme, tuning: nebbiaTuning, renderScale, song, lyricsFontScale, showText, isDaylight, paused, staticMode });
    latest.current = { theme, tuning: nebbiaTuning, renderScale, song, lyricsFontScale, showText, isDaylight, paused, staticMode };

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return undefined;
        let runtime: NebbiaRuntime;
        try {
            const l = latest.current;
            runtime = new NebbiaRuntime({
                host,
                seeThrough,
                scene,
                glass,
                currentTime,
                vocal: audioBands.vocal,
                onFirstFrame: () => undefined,
                onFailed: () => setFailed(true),
                onRestored: () => setGeneration(value => value + 1),
            }, l.theme, l.tuning, l.renderScale);
            runtime.setFontScale(l.lyricsFontScale);
            runtime.setShowText(l.showText);
            runtime.setDaylight(l.isDaylight);
            runtime.setPlayback(l.paused, l.staticMode);
            runtime.setSong(l.song);
        } catch (error) {
            console.warn('[Nebbia] runtime failed to start', error);
            setFailed(true);
            return undefined;
        }
        runtimeRef.current = runtime;
        setFailed(false);
        return () => {
            runtimeRef.current = null;
            runtime.destroy();
        };
    }, [audioBands.vocal, currentTime, generation, glass, scene, seeThrough]);

    useEffect(() => { runtimeRef.current?.setSong(song); }, [song]);
    useEffect(() => { runtimeRef.current?.setTuning(nebbiaTuning); }, [nebbiaTuning]);
    useEffect(() => { runtimeRef.current?.setRenderScale(renderScale); }, [renderScale]);
    useEffect(() => { runtimeRef.current?.setTheme(theme); }, [theme]);
    useEffect(() => { runtimeRef.current?.setFontScale(lyricsFontScale); }, [lyricsFontScale]);
    useEffect(() => { runtimeRef.current?.setShowText(showText); }, [showText]);
    useEffect(() => { runtimeRef.current?.setDaylight(isDaylight); }, [isDaylight]);
    useEffect(() => { runtimeRef.current?.setPlayback(paused, staticMode); }, [paused, staticMode]);
    // 暂停时循环停着，拖动进度要手动补一帧
    useEffect(() => currentTime.on('change', () => {
        if (paused) runtimeRef.current?.requestFrame();
    }), [currentTime, paused]);

    const { activeLine } = useVisualizerRuntime({
        currentTime, currentLineIndex, lines, getLineEndTime: getLineRenderEndTime,
    });

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
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" style={{ background: seeThrough ? undefined : '#05070a' }}>
                <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />
                {failed && (
                    <div
                        className="absolute inset-0 flex items-center justify-center px-10 text-center"
                        style={{
                            color: theme.primaryColor,
                            fontFamily: resolveThemeFontStack(theme),
                            fontWeight: resolveThemeFontWeight(theme, 600),
                            fontSize: `clamp(2rem, ${5.4 * lyricsFontScale}vw, 5.6rem)`,
                        }}
                    >
                        {showText && committedLines.length > 0 ? (activeLine?.fullText || '') : null}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisualizerNebbia;
