"use client";

import { useEffect, useMemo, useRef, useState, type FocusEvent } from 'react';
import { Link } from 'next-view-transitions';
import { useHotkeys } from 'react-hotkeys-hook';
import {
    ArrowLeft,
    FastForwardIcon,
    ListMusic,
    Maximize,
    Minimize,
    PauseIcon,
    PlayIcon,
    RepeatIcon,
    RewindIcon,
    SlidersHorizontal,
} from 'lucide-react';
import { AudioProgressBar } from '@/components/ui/audio-progress-bar';
import { getAllMediaItems } from '@/data/media';
import { getMediaTheme } from '@/data/mediaThemes';
import { cn } from '@/lib/utils';
import { useFullscreen } from '@/hooks/use-fullscreen';
import { useIdleChrome } from '../hooks/useIdleChrome';
import { usePlaybackSelector } from '../hooks/usePlaybackSelector';
import { usePlayerPrefs } from '../hooks/usePlayerPrefs';
import { getCachedPalette, loadPalette } from '../playback/mediaCache';
import { PlayerStyleProps } from '../types';
import { DEFAULT_PALETTE } from '../visualizers/palette';
import type { VisualizerMode } from '../visualizers/types';
import { getLyricsPlaceholder, toFoliaLines, toFoliaTheme } from '../folia/adapters';
import { DEFAULT_LATENT_BACKGROUND_TUNING } from '../folia/backgrounds/types';
import { FoliaSubtitle } from '../folia/FoliaSubtitle';
import { LyricTimeline } from './LyricTimeline';
import { PlayerSettingsPanel } from './PlayerSettingsPanel';
import { VisualizerStage, useVisualizerStageHost, type VisualizerStageProps } from './VisualizerStageProvider';
import { formatTime } from './formatTime';

// Fullscreen opaque 3D/WebGL modes cover the entire stage with their own sky/paper canvas;
// skipping FoliaBackdrop avoids keeping 2 extra hidden WebGL shader contexts alive underneath.
const OPAQUE_STAGE_MODES = new Set<VisualizerMode>(['machi', 'metaphor']);

const ElapsedTime = ({className}: {className: string}) => {
    const seconds = usePlaybackSelector(snapshot => Math.floor(snapshot.currentTime));
    return <span className={className}>{formatTime(seconds)}</span>;
};

const PlaybackProgressBar = ({duration, onSeek}: {duration: number; onSeek: (time: number) => void}) => {
    const currentTime = usePlaybackSelector(snapshot => snapshot.currentTime);
    return (
        <AudioProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            formatTime={formatTime}
            variant="minimal"
            className="min-w-0 flex-1"
        />
    );
};

export const VisualizerPlayer = ({
    musicItem,
    audioRef,
    audioState,
    controls,
    forwardId,
    backwardId,
    lyrics,
}: PlayerStyleProps) => {
    const {id, title, imageUrl, author} = musicItem;
    const {isPlaying, duration, autoPlay} = audioState;
    const {togglePlay, seek, play, setAutoPlay: toggleAutoPlay, clearState} = controls;

    const stageRef = useRef<HTMLDivElement>(null);
    const [mode, setMode] = useState<VisualizerMode>('sonnet');
    // Built-in tracks ship a preset theme; the cover palette is only the fallback path.
    const presetTheme = useMemo(() => getMediaTheme(id), [id]);
    // The next track's cover is preloaded while the previous one plays, so a handoff mounts
    // with the real palette instead of flashing the default one.
    const [coverPalette, setCoverPalette] = useState<string[]>(() => getCachedPalette(imageUrl) ?? DEFAULT_PALETTE);
    const palette = presetTheme?.palette ?? coverPalette;
    const [canHover, setCanHover] = useState(true);
    const [hovered, setHovered] = useState(false);
    const [controlsFocused, setControlsFocused] = useState(false);
    const [hoveredSkip, setHoveredSkip] = useState<'backward' | 'forward' | null>(null);
    const [timelineOpen, setTimelineOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [pageHidden, setPageHidden] = useState(false);
    const {prefs, updatePrefs} = usePlayerPrefs();

    useEffect(() => {
        const syncVisibility = () => setPageHidden(document.hidden);
        syncVisibility();
        document.addEventListener('visibilitychange', syncVisibility);
        return () => document.removeEventListener('visibilitychange', syncVisibility);
    }, []);

    const effectiveIsPlaying = isPlaying && !pageHidden;

    const foliaLines = useMemo(() => toFoliaLines(lyrics, duration), [lyrics, duration]);
    const foliaTheme = useMemo(() => toFoliaTheme(palette, presetTheme), [palette, presetTheme]);
    const backdropTuning = useMemo(
        () => ({...DEFAULT_LATENT_BACKGROUND_TUNING, displayMode: prefs.backgroundMode}),
        [prefs.backgroundMode],
    );
    const lyricsPlaceholder = getLyricsPlaceholder(lyrics);
    const showBackdrop = Boolean(lyricsPlaceholder) || !OPAQUE_STAGE_MODES.has(mode);

    const skipTitles = useMemo(() => {
        const items = getAllMediaItems();
        return {
            backward: items.find(item => item.id === backwardId)?.title ?? title,
            forward: items.find(item => item.id === forwardId)?.title ?? title,
        };
    }, [backwardId, forwardId, title]);

    const displayTitle = hoveredSkip === 'backward'
        ? skipTitles.backward
        : hoveredSkip === 'forward'
            ? skipTitles.forward
            : title;

    const stageHost = useVisualizerStageHost();
    const {isFullscreen, toggleFullscreen} = useFullscreen(stageHost?.fullscreenRef ?? stageRef);

    useHotkeys('f11', toggleFullscreen, {preventDefault: true});
    useHotkeys('space', togglePlay, {preventDefault: true});

    useEffect(() => {
        const saved = localStorage.getItem('visualizer-mode');
        if (saved === 'sonnet' || saved === 'diorama' || saved === 'tilt' || saved === 'monet' || saved === 'tempera' || saved === 'partita' || saved === 'cadenza' || saved === 'cappella' || saved === 'claddagh' || saved === 'classic' || saved === 'nebbia' || saved === 'fume' || saved === 'hanabi' || saved === 'lumiere' || saved === 'machi' || saved === 'still' || saved === 'pendolo' || saved === 'metaphor') setMode(saved);
    }, []);

    useEffect(() => {
        // Preset themes own the palette; skip cover extraction entirely for them.
        if (presetTheme) return;

        let cancelled = false;

        loadPalette(imageUrl)
            .then(colors => {
                if (!cancelled && colors.length > 0) setCoverPalette(colors);
            })
            .catch(() => undefined);

        return () => {
            cancelled = true;
        };
    }, [imageUrl, presetTheme]);

    // Touch devices have no hover state, so the compact pill would hide every control.
    useEffect(() => {
        const query = window.matchMedia('(hover: hover)');
        const update = () => setCanHover(query.matches);
        update();
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);

    const changeMode = (next: VisualizerMode) => {
        setMode(next);
        localStorage.setItem('visualizer-mode', next);
    };

    const controlsExpanded = !canHover || hovered || controlsFocused;
    // Folia's playing page: the chrome (and the cursor) leaves the stage after a spell of stillness.
    const chromeHidden = useIdleChrome(
        canHover && prefs.autoHideChrome,
        controlsExpanded || timelineOpen || settingsOpen,
    );

    useEffect(() => {
        if (chromeHidden) setHovered(false);
    }, [chromeHidden]);

    const handleControlsBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setControlsFocused(false);
        }
    };

    const stageProps = useMemo<VisualizerStageProps>(() => ({
        mode,
        id,
        title,
        author,
        imageUrl,
        audioRef,
        foliaLines,
        foliaTheme,
        palette,
        backgroundType: prefs.backgroundType,
        urlBackgroundUrl: prefs.urlBackgroundUrl,
        backdropTuning,
        backgroundMotion: prefs.backgroundMotion,
        renderScale: prefs.renderScale,
        fpsCap: prefs.fpsCap,
        effectiveIsPlaying,
        pageHidden,
        showBackdrop,
        chromeHidden,
        lyricsPlaceholder,
        onSeek: seek,
    }), [
        audioRef,
        author,
        backdropTuning,
        chromeHidden,
        effectiveIsPlaying,
        foliaLines,
        foliaTheme,
        id,
        imageUrl,
        lyricsPlaceholder,
        mode,
        pageHidden,
        palette,
        prefs.backgroundMotion,
        prefs.backgroundType,
        prefs.fpsCap,
        prefs.renderScale,
        prefs.urlBackgroundUrl,
        seek,
        showBackdrop,
        title,
    ]);

    useEffect(() => {
        stageHost?.setStageProps(stageProps);
    }, [stageHost, stageProps]);

    return (
        <main className={cn(
            'min-h-screen w-full text-white overflow-hidden',
            stageHost ? 'bg-transparent pointer-events-none' : 'bg-[#05070d]',
        )}>
            <div
                ref={stageRef}
                className={cn(
                    'relative h-screen w-full overflow-hidden',
                    stageHost ? 'pointer-events-none' : chromeHidden && 'cursor-none',
                )}
            >
                {!stageHost && <VisualizerStage {...stageProps} />}

                {!lyricsPlaceholder && prefs.subtitle && (
                    <FoliaSubtitle
                        lines={foliaLines}
                        theme={foliaTheme}
                        hidden={controlsExpanded || timelineOpen || chromeHidden}
                    />
                )}

                <header
                    inert={chromeHidden}
                    className={cn(
                        'pointer-events-auto absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 md:px-8 py-4 bg-gradient-to-b from-black/55 to-transparent transition-opacity duration-500',
                        chromeHidden && 'opacity-0',
                    )}
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <Link
                            href="/media/"
                            className="shrink-0 text-white/70 hover:text-white transition-colors"
                            title="返回音乐列表"
                        >
                            <ArrowLeft className="w-5 h-5"/>
                        </Link>
                        <div className="min-w-0 hidden sm:block">
                            <p className="text-sm md:text-base font-semibold truncate">{title}</p>
                            <p className="text-[11px] text-white/50 truncate">{author}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
                        <button
                            onClick={toggleFullscreen}
                            className="text-white/70 hover:text-white transition-colors"
                            title={isFullscreen ? '退出全屏' : '全屏显示'}
                        >
                            {isFullscreen ? <Minimize className="w-5 h-5"/> : <Maximize className="w-5 h-5"/>}
                        </button>
                    </div>
                </header>

                <footer
                    inert={chromeHidden}
                    className={cn(
                        'pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-5 md:pb-7 transition-opacity duration-500',
                        chromeHidden && 'opacity-0',
                    )}
                >
                    <div
                        onPointerEnter={() => setHovered(true)}
                        onPointerLeave={() => setHovered(false)}
                        onFocusCapture={() => setControlsFocused(true)}
                        onBlurCapture={handleControlsBlur}
                        className={cn(
                            'pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[width,padding,background-color] duration-500 ease-out',
                            controlsExpanded
                                ? 'w-[min(92vw,32rem)] bg-black/45 px-3 py-2'
                                : 'w-[min(84vw,17rem)] bg-black/35 px-2.5 py-1.5',
                        )}
                    >
                        <div className={cn(
                            'flex shrink-0 items-center overflow-hidden transition-all duration-300',
                            controlsExpanded ? 'w-11 p-0.5 opacity-100' : 'w-0 p-0 opacity-0',
                        )}>
                            <button
                                onClick={togglePlay}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
                                style={{backgroundColor: foliaTheme.primaryColor, color: foliaTheme.backgroundColor}}
                                title={isPlaying ? '暂停' : '播放'}
                                aria-label={isPlaying ? '暂停' : '播放'}
                            >
                                {isPlaying
                                    ? <PauseIcon size={18} fill="currentColor"/>
                                    : <PlayIcon size={18} fill="currentColor" className="translate-x-[1px]"/>}
                            </button>
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className={cn(
                                'flex items-center justify-between gap-4 overflow-hidden transition-all duration-300',
                                controlsExpanded ? 'h-6 opacity-100' : 'h-0 opacity-0',
                            )}>
                                <div
                                    className="flex w-8 shrink-0 justify-center"
                                    onMouseEnter={() => setHoveredSkip('backward')}
                                    onMouseLeave={() => setHoveredSkip(null)}
                                    onFocus={() => setHoveredSkip('backward')}
                                    onBlur={() => setHoveredSkip(null)}
                                >
                                    <Link
                                        href={`/media/${backwardId}/`}
                                        onClick={clearState}
                                        className="flex h-6 w-6 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                                        title="上一首"
                                        aria-label="上一首"
                                    >
                                        <RewindIcon size={14}/>
                                    </Link>
                                </div>
                                <p className="min-w-0 flex-1 truncate text-center text-sm font-medium leading-5 tracking-wide text-white/90">
                                    {displayTitle}
                                </p>
                                <div
                                    className="flex w-8 shrink-0 justify-center"
                                    onMouseEnter={() => setHoveredSkip('forward')}
                                    onMouseLeave={() => setHoveredSkip(null)}
                                    onFocus={() => setHoveredSkip('forward')}
                                    onBlur={() => setHoveredSkip(null)}
                                >
                                    <Link
                                        href={`/media/${forwardId}/`}
                                        onClick={clearState}
                                        className="flex h-6 w-6 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                                        title="下一首"
                                        aria-label="下一首"
                                    >
                                        <FastForwardIcon size={14}/>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ElapsedTime className={cn(
                                    'shrink-0 text-right font-mono tracking-wide text-white/45 tabular-nums transition-all duration-300',
                                    controlsExpanded ? 'w-8 text-[10px]' : 'w-7 text-[9px]',
                                )}/>
                                <PlaybackProgressBar duration={duration} onSeek={seek}/>
                                <span className={cn(
                                    'shrink-0 font-mono tracking-wide text-white/45 tabular-nums transition-all duration-300',
                                    controlsExpanded ? 'w-8 text-[10px]' : 'w-7 text-[9px]',
                                )}>
                                    {formatTime(duration)}
                                </span>
                            </div>
                        </div>

                        <div className={cn(
                            'flex shrink-0 items-center overflow-hidden transition-all duration-300',
                            controlsExpanded ? 'w-8 opacity-100' : 'w-0 opacity-0',
                        )}>
                            <button
                                onClick={() => toggleAutoPlay(!autoPlay)}
                                className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10',
                                    autoPlay ? 'text-green-400' : 'text-white/45 hover:text-white',
                                )}
                                title={autoPlay ? '关闭自动播放' : '开启自动播放'}
                                aria-label={autoPlay ? '关闭自动播放' : '开启自动播放'}
                                aria-pressed={autoPlay}
                            >
                                <RepeatIcon size={17}/>
                            </button>
                        </div>

                        <div className={cn(
                            'flex shrink-0 items-center overflow-hidden transition-all duration-300',
                            controlsExpanded ? 'w-8 opacity-100' : 'w-0 opacity-0',
                        )}>
                            <button
                                onClick={() => setTimelineOpen(true)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
                                title="时间线"
                                aria-label="打开时间线"
                            >
                                <ListMusic size={17}/>
                            </button>
                        </div>

                        <div className={cn(
                            'flex shrink-0 items-center overflow-hidden transition-all duration-300',
                            controlsExpanded ? 'w-8 opacity-100' : 'w-0 opacity-0',
                        )}>
                            <button
                                onClick={() => setSettingsOpen(true)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
                                title="播放器设置"
                                aria-label="打开播放器设置"
                            >
                                <SlidersHorizontal size={17}/>
                            </button>
                        </div>
                    </div>
                </footer>

                {timelineOpen && (
                    <div className="pointer-events-auto">
                        <LyricTimeline
                            lyrics={lyrics}
                            accentColor={foliaTheme.accentColor}
                            onSelect={(time) => {
                                seek(time);
                                void play();
                                setTimelineOpen(false);
                            }}
                            onClose={() => setTimelineOpen(false)}
                        />
                    </div>
                )}

                {settingsOpen && (
                    <div className="pointer-events-auto">
                        <PlayerSettingsPanel
                            prefs={prefs}
                            mode={mode}
                            onChange={updatePrefs}
                            onModeChange={changeMode}
                            onClose={() => setSettingsOpen(false)}
                        />
                    </div>
                )}
            </div>
        </main>
    );
};
