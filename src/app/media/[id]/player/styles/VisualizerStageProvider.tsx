"use client";

import {
    Suspense,
    createContext,
    lazy,
    memo,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
    type RefObject,
} from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { VisualizerMode } from '../visualizers/types';
import type { BackgroundType } from '../folia/backgrounds/definition';
import type { LatentBackgroundTuning } from '../folia/backgrounds/types';
import { FoliaBackdrop } from '../folia/FoliaBackdrop';
import { applyGlobalFpsCap, type PlayerFpsCap } from '../folia/fpsCap';
import type { Line, LyricRenderScale, Theme } from '../folia/types';

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
const FoliaMetaphor = lazy(() => import('../folia/FoliaMetaphor'));

export const MODE_LABELS: Record<VisualizerMode, string> = {
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
    metaphor: '隐喻',
};

export interface VisualizerStageProps {
    mode: VisualizerMode;
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    audioRef: RefObject<HTMLAudioElement | null>;
    foliaLines: Line[];
    foliaTheme: Theme;
    palette: string[];
    backgroundType: BackgroundType;
    urlBackgroundUrl: string;
    backdropTuning: LatentBackgroundTuning;
    backgroundMotion: boolean;
    renderScale: LyricRenderScale;
    fpsCap: PlayerFpsCap;
    effectiveIsPlaying: boolean;
    pageHidden: boolean;
    showBackdrop: boolean;
    chromeHidden: boolean;
    lyricsPlaceholder: string | null;
    onSeek: (time: number) => void;
}

/**
 * Memoized stage isolating FoliaBackdrop + the active visualizer from the ~11 Hz `currentTime`
 * updates that drive the progress bar and bottom subtitle.
 */
export const VisualizerStage = memo(({
    mode,
    id,
    title,
    author,
    imageUrl,
    audioRef,
    foliaLines,
    foliaTheme,
    palette,
    backgroundType,
    urlBackgroundUrl,
    backdropTuning,
    backgroundMotion,
    renderScale,
    fpsCap,
    effectiveIsPlaying,
    pageHidden,
    showBackdrop,
    lyricsPlaceholder,
    onSeek,
}: VisualizerStageProps) => (
    <div className="absolute inset-0" style={{backgroundColor: foliaTheme.backgroundColor}}>
        {showBackdrop && (
            <FoliaBackdrop
                audioRef={audioRef}
                theme={foliaTheme}
                coverColors={palette}
                coverUrl={imageUrl}
                backgroundType={backgroundType}
                urlBackgroundUrl={urlBackgroundUrl}
                seed={id}
                paused={!effectiveIsPlaying}
                tuning={backdropTuning}
                staticMode={!backgroundMotion || pageHidden}
            />
        )}
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
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
                        fpsCap={fpsCap}
                    />
                ) : mode === 'diorama' ? (
                    <FoliaDiorama
                        audioRef={audioRef}
                        lines={foliaLines}
                        theme={foliaTheme}
                        seed={id}
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
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
                        isPlaying={effectiveIsPlaying}
                        onSeek={onSeek}
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
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
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
                        isPlaying={effectiveIsPlaying}
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
                        isPlaying={effectiveIsPlaying}
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
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
                    />
                ) : mode === 'fume' ? (
                    <FoliaFume
                        audioRef={audioRef}
                        lines={foliaLines}
                        theme={foliaTheme}
                        seed={id}
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
                        fpsCap={fpsCap}
                    />
                ) : mode === 'hanabi' ? (
                    <FoliaHanabi
                        audioRef={audioRef}
                        lines={foliaLines}
                        theme={foliaTheme}
                        seed={id}
                        songTitle={title}
                        songArtist={author}
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
                    />
                ) : mode === 'lumiere' ? (
                    <FoliaLumiere
                        audioRef={audioRef}
                        lines={foliaLines}
                        theme={foliaTheme}
                        seed={id}
                        songTitle={title}
                        songArtist={author}
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
                    />
                ) : mode === 'machi' ? (
                    <FoliaMachi
                        audioRef={audioRef}
                        lines={foliaLines}
                        theme={foliaTheme}
                        seed={id}
                        songTitle={title}
                        songArtist={author}
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
                    />
                ) : mode === 'metaphor' ? (
                    <FoliaMetaphor
                        audioRef={audioRef}
                        lines={foliaLines}
                        theme={foliaTheme}
                        seed={id}
                        songTitle={title}
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
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
                        isPlaying={effectiveIsPlaying}
                        renderScale={renderScale}
                    />
                )}
            </Suspense>
        )}
    </div>
));
VisualizerStage.displayName = 'VisualizerStage';

interface VisualizerStageHostContextValue {
    setStageProps: (next: VisualizerStageProps) => void;
    fullscreenRef: RefObject<HTMLDivElement>;
}

const VisualizerStageContext = createContext<VisualizerStageHostContextValue | null>(null);

export const useVisualizerStageHost = () => useContext(VisualizerStageContext);

/**
 * Lives in `/media/layout.tsx` so the active WebGL/Pixi/Three.js visualizer stage survives
 * `/media/[id]` → `/media/[nextId]` route transitions without tearing down and rebuilding GPU
 * contexts. Leaving track routes (e.g. back to `/media`) unmounts the stage and clears FPS caps.
 */
export const VisualizerStageProvider = ({children}: {children: ReactNode}) => {
    const pathname = usePathname();
    const isTrackRoute = Boolean(pathname && pathname.startsWith('/media/') && pathname !== '/media/');
    const [stageProps, setStageProps] = useState<VisualizerStageProps | null>(null);
    const fullscreenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isTrackRoute) {
            setStageProps(null);
        }
    }, [isTrackRoute]);

    // Sonnet and Fume cap actual draws in their runtimes. Other styles still use the shared cap.
    const activeFpsCap: PlayerFpsCap = isTrackRoute && stageProps && stageProps.mode !== 'sonnet' && stageProps.mode !== 'fume'
        ? stageProps.fpsCap
        : 0;
    useEffect(() => {
        applyGlobalFpsCap(activeFpsCap);
    }, [activeFpsCap]);
    useEffect(() => () => applyGlobalFpsCap(0), []);

    const value = useMemo<VisualizerStageHostContextValue>(
        () => ({setStageProps, fullscreenRef}),
        [],
    );

    const showPersistentStage = isTrackRoute && stageProps !== null;

    return (
        <VisualizerStageContext.Provider value={value}>
            <div
                ref={fullscreenRef}
                className={cn(
                    showPersistentStage && 'relative min-h-screen w-full bg-[#05070d]',
                    showPersistentStage && stageProps.chromeHidden && 'cursor-none',
                )}
            >
                {showPersistentStage && (
                    <div className="fixed inset-0 z-0 overflow-hidden">
                        <VisualizerStage {...stageProps} />
                    </div>
                )}
                <div className={cn(showPersistentStage && 'relative z-10 pointer-events-none')}>
                    {children}
                </div>
            </div>
        </VisualizerStageContext.Provider>
    );
};
