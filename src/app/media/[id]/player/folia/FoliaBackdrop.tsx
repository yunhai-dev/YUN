"use client";

import { Suspense, lazy, memo, useMemo, type RefObject } from 'react';
import type { Theme } from './types';
import { useAudioSignals } from './useAudioSignals';
import type { LatentBackgroundTuning } from './backgrounds/types';
import type { BackgroundRenderProps, BackgroundType } from './backgrounds/definition';

// Lazy-load each backdrop so unused shaders (e.g. twgl.js in Sora or 5 image shaders in Nomand)
// stay out of the player's initial JS bundle.
const LatentBackground = lazy(() => import('./backgrounds/LatentBackground'));
const CommonBackground = lazy(() => import('./backgrounds/common/Background'));
const MonetBackground = lazy(() => import('./backgrounds/monet/Background'));
const NomandBackground = lazy(() => import('./backgrounds/nomand/Background'));
const SoraBackground = lazy(() => import('./backgrounds/sora/Background'));
const UrlBackground = lazy(() => import('./backgrounds/url/Background'));

interface FoliaBackdropProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    theme: Theme;
    coverColors: string[];
    coverUrl: string | null;
    backgroundType: BackgroundType;
    urlBackgroundUrl?: string;
    seed?: string;
    paused: boolean;
    tuning?: LatentBackgroundTuning;
    /** Freezes the active background, like Folia's background static mode. */
    staticMode?: boolean;
}

/**
 * Folia's shell background behind the lyric styles. Six modes are vendored: the default "latent"
 * paper backdrop, the common cover-colour/geometry layer, the Monet cover treatment, Nomand's
 * paper-shader effects, Sora's starfield and an embedded webpage. Styles render transparent over
 * it, exactly as upstream.
 */
export const FoliaBackdrop = memo(({
    audioRef,
    theme,
    coverColors,
    coverUrl,
    backgroundType,
    urlBackgroundUrl = '',
    seed,
    paused,
    tuning,
    staticMode = false,
}: FoliaBackdropProps) => {
    const {audioPower, audioBands} = useAudioSignals(audioRef);
    const renderProps = useMemo<BackgroundRenderProps>(() => ({
        theme,
        coverUrl,
        coverColors,
        audioPower,
        audioBands,
        seed,
        isDaylight: false,
        staticMode,
        paused,
        blendMs: 800,
        urlBackgroundList: urlBackgroundUrl
            ? [{id: 'player-url', url: urlBackgroundUrl, note: ''}]
            : [],
        urlBackgroundSelectedId: urlBackgroundUrl ? 'player-url' : null,
    }), [audioBands, audioPower, coverColors, coverUrl, paused, seed, staticMode, theme, urlBackgroundUrl]);

    return (
        <div className="absolute inset-0 z-0" style={{backgroundColor: theme.backgroundColor}}>
            <Suspense fallback={null}>
                {backgroundType === 'common' && <CommonBackground {...renderProps} />}
                {backgroundType === 'monet' && <MonetBackground {...renderProps} />}
                {backgroundType === 'nomand' && <NomandBackground {...renderProps} />}
                {backgroundType === 'sora' && <SoraBackground {...renderProps} />}
                {backgroundType === 'url' && <UrlBackground {...renderProps} />}
                {backgroundType === 'latent' && (
                    <LatentBackground
                        theme={theme}
                        coverColors={coverColors}
                        audioPower={audioPower}
                        audioBands={audioBands}
                        staticMode={staticMode}
                        paused={paused}
                        tuning={tuning}
                        blendMs={800}
                    />
                )}
            </Suspense>
        </div>
    );
});
FoliaBackdrop.displayName = 'FoliaBackdrop';

export default FoliaBackdrop;
