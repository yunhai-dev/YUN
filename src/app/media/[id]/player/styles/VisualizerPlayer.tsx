"use client";

import { Suspense, lazy, useEffect, useMemo, useRef, useState, type FocusEvent } from 'react';
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
import { usePlayerPrefs } from '../hooks/usePlayerPrefs';
import { getCachedPalette, loadPalette } from '../playback/mediaCache';
import { PlayerStyleProps } from '../types';
import { DEFAULT_PALETTE } from '../visualizers/palette';
import type { VisualizerMode } from '../visualizers/types';
import { getLyricsPlaceholder, toFoliaLines, toFoliaTheme } from '../folia/adapters';
import { DEFAULT_LATENT_BACKGROUND_TUNING } from '../folia/backgrounds/types';
import { FoliaBackdrop } from '../folia/FoliaBackdrop';
import { FoliaSubtitle } from '../folia/FoliaSubtitle';
import { LyricTimeline } from './LyricTimeline';
import { PlayerSettingsPanel } from './PlayerSettingsPanel';

const FoliaSonnet = lazy(() => import('../folia/FoliaSonnet'));
const FoliaDiorama = lazy(() => import('../folia/FoliaDiorama'));
const FoliaTilt = lazy(() => import('../folia/FoliaTilt'));
const FoliaMonet = lazy(() => import('../folia/FoliaMonet'));
const FoliaTempera = lazy(() => import('../folia/FoliaTempera'));
const FoliaPartita = lazy(() => import('../folia/FoliaPartita'));
const FoliaCadenza = lazy(() => import('../folia/FoliaCadenza'));
const FoliaCappella = lazy(() => import('../folia/FoliaCappella'));
const FoliaCladdagh = lazy(() => import('../folia/FoliaCladdagh'));
const FoliaClassic = lazy(() => import('../folia/FoliaClassic'));
const FoliaNebbia = lazy(() => import('../folia/FoliaNebbia'));
const FoliaFume = lazy(() => import('../folia/FoliaFume'));
const FoliaHanabi = lazy(() => import('../folia/FoliaHanabi'));
const FoliaLumiere = lazy(() => import('../folia/FoliaLumiere'));
const FoliaMachi = lazy(() => import('../folia/FoliaMachi'));
const FoliaStill = lazy(() => import('../folia/FoliaStill'));
const FoliaPendolo = lazy(() => import('../folia/FoliaPendolo'));

const MODE_LABELS: Record<VisualizerMode, string> = {
    sonnet: '商籁',
    diorama: '镜台',
    tilt: '倾诉',
    monet: '莫奈',
    tempera: '凝彩',
    partita: '云阶',
    cadenza: 'Mindscape',
    cappella: 'Cappella',
    claddagh: 'Claddagh',
    classic: 'Luminous',
    nebbia: '雾笺',
    fume: '浮名',
    hanabi: '花火',
    lumiere: '绘光',
    machi: '町景',
    still: '静止',
    pendolo: '时计',
};

const formatTime = (seconds: number) => {
    const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
    const minutes = Math.floor(safe / 60);
    const rest = Math.floor(safe % 60);
    return `${minutes.toString().padStart(2, '0')}:${rest.toString().padStart(2, '0')}`;
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
    const {isPlaying, currentTime, duration, autoPlay} = audioState;
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
    const {prefs, updatePrefs} = usePlayerPrefs();

    const foliaLines = useMemo(() => toFoliaLines(lyrics, duration), [lyrics, duration]);
    const foliaTheme = useMemo(() => toFoliaTheme(palette, presetTheme), [palette, presetTheme]);
    const backdropTuning = useMemo(
        () => ({...DEFAULT_LATENT_BACKGROUND_TUNING, displayMode: prefs.backgroundMode}),
        [prefs.backgroundMode],
    );
    const lyricsPlaceholder = getLyricsPlaceholder(lyrics);

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

    const {isFullscreen, toggleFullscreen} = useFullscreen(stageRef);

    useHotkeys('f11', toggleFullscreen, {preventDefault: true});
    useHotkeys('space', togglePlay, {preventDefault: true});

    useEffect(() => {
        const saved = localStorage.getItem('visualizer-mode');
        if (saved === 'sonnet' || saved === 'diorama' || saved === 'tilt' || saved === 'monet' || saved === 'tempera' || saved === 'partita' || saved === 'cadenza' || saved === 'cappella' || saved === 'claddagh' || saved === 'classic' || saved === 'nebbia' || saved === 'fume' || saved === 'hanabi' || saved === 'lumiere' || saved === 'machi' || saved === 'still' || saved === 'pendolo') setMode(saved);
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

    return (
        <main className="min-h-screen w-full bg-[#05070d] text-white overflow-hidden">
            <div
                ref={stageRef}
                className={cn('relative h-screen w-full overflow-hidden', chromeHidden && 'cursor-none')}
            >
                <div className="absolute inset-0" style={{backgroundColor: foliaTheme.backgroundColor}}>
                    <FoliaBackdrop
                        audioRef={audioRef}
                        theme={foliaTheme}
                        coverColors={palette}
                        coverUrl={imageUrl}
                        backgroundType={prefs.backgroundType}
                        urlBackgroundUrl={prefs.urlBackgroundUrl}
                        seed={id}
                        paused={!isPlaying}
                        tuning={backdropTuning}
                        staticMode={!prefs.backgroundMotion}
                    />
                    {lyricsPlaceholder ? (
                        <div className="flex h-full w-full items-center justify-center px-8 text-center text-sm tracking-[0.3em] text-white/45">
                            {lyricsPlaceholder}
                        </div>
                    ) : (
                        <Suspense fallback={
                            <div className="flex h-full w-full items-center justify-center text-xs tracking-[0.4em] text-white/40">
                                {MODE_LABELS[mode]} · 载入中
                            </div>
                        }>
                            {mode === 'sonnet' ? (
                                <FoliaSonnet
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    seed={id}
                                    title={title}
                                    author={author}
                                    isPlaying={isPlaying}
                                />
                            ) : mode === 'diorama' ? (
                                <FoliaDiorama
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    seed={id}
                                />
                            ) : mode === 'tilt' ? (
                                <FoliaTilt
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                />
                            ) : mode === 'monet' ? (
                                <FoliaMonet
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    coverUrl={imageUrl}
                                    songTitle={title}
                                    songArtist={author}
                                    seed={id}
                                    onSeek={seek}
                                />
                            ) : mode === 'tempera' ? (
                                <FoliaTempera
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    seed={id}
                                    coverColors={palette}
                                    songTitle={title}
                                    songArtist={author}
                                    isPlaying={isPlaying}
                                />
                            ) : mode === 'partita' ? (
                                <FoliaPartita
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                />
                            ) : mode === 'cadenza' ? (
                                <FoliaCadenza
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                />
                            ) : mode === 'cappella' ? (
                                <FoliaCappella
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    songTitle={title}
                                    coverUrl={imageUrl}
                                    seed={id}
                                />
                            ) : mode === 'claddagh' ? (
                                <FoliaCladdagh
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    isPlaying={isPlaying}
                                />
                            ) : mode === 'classic' ? (
                                <FoliaClassic
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                />
                            ) : mode === 'nebbia' ? (
                                <FoliaNebbia
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    seed={id}
                                    songTitle={title}
                                    songArtist={author}
                                    isPlaying={isPlaying}
                                />
                            ) : mode === 'fume' ? (
                                <FoliaFume
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    seed={id}
                                    isPlaying={isPlaying}
                                />
                            ) : mode === 'hanabi' ? (
                                <FoliaHanabi
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    seed={id}
                                    songTitle={title}
                                    songArtist={author}
                                    isPlaying={isPlaying}
                                />
                            ) : mode === 'lumiere' ? (
                                <FoliaLumiere
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    seed={id}
                                    songTitle={title}
                                    songArtist={author}
                                    isPlaying={isPlaying}
                                />
                            ) : mode === 'machi' ? (
                                <FoliaMachi
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    seed={id}
                                    songTitle={title}
                                    songArtist={author}
                                    isPlaying={isPlaying}
                                />
                            ) : mode === 'still' ? (
                                <FoliaStill
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                />
                            ) : (
                                <FoliaPendolo
                                    audioRef={audioRef}
                                    lines={foliaLines}
                                    theme={foliaTheme}
                                    seed={id}
                                    songTitle={title}
                                    songArtist={author}
                                    isPlaying={isPlaying}
                                />
                            )}
                        </Suspense>
                    )}
                </div>

                {!lyricsPlaceholder && prefs.subtitle && (
                    <FoliaSubtitle
                        lines={foliaLines}
                        currentTime={currentTime}
                        theme={foliaTheme}
                        hidden={controlsExpanded || timelineOpen || chromeHidden}
                    />
                )}

                <header
                    inert={chromeHidden}
                    className={cn(
                        'absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 md:px-8 py-4 bg-gradient-to-b from-black/55 to-transparent transition-opacity duration-500',
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
                                <span className={cn(
                                    'shrink-0 text-right font-mono tracking-wide text-white/45 tabular-nums transition-all duration-300',
                                    controlsExpanded ? 'w-8 text-[10px]' : 'w-7 text-[9px]',
                                )}>
                                    {formatTime(currentTime)}
                                </span>
                                <AudioProgressBar
                                    currentTime={currentTime}
                                    duration={duration}
                                    onSeek={seek}
                                    formatTime={formatTime}
                                    variant="minimal"
                                    className="min-w-0 flex-1"
                                />
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
                    <LyricTimeline
                        lyrics={lyrics}
                        currentTime={currentTime}
                        accentColor={foliaTheme.accentColor}
                        onSelect={(time) => {
                            seek(time);
                            void play();
                            setTimelineOpen(false);
                        }}
                        onClose={() => setTimelineOpen(false)}
                    />
                )}

                {settingsOpen && (
                    <PlayerSettingsPanel
                        prefs={prefs}
                        mode={mode}
                        onChange={updatePrefs}
                        onModeChange={changeMode}
                        onClose={() => setSettingsOpen(false)}
                    />
                )}
            </div>
        </main>
    );
};
