"use client";

import type { RefObject } from 'react';
import type { Theme } from './types';
import { useAudioSignals } from './useAudioSignals';
import LatentBackground from './backgrounds/LatentBackground';
import type { LatentBackgroundTuning } from './backgrounds/types';
import type { BackgroundRenderProps, BackgroundType } from './backgrounds/definition';
import CommonBackground from './backgrounds/common/Background';
import MonetBackground from './backgrounds/monet/Background';
import NomandBackground from './backgrounds/nomand/Background';
import SoraBackground from './backgrounds/sora/Background';
import UrlBackground from './backgrounds/url/Background';

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
export const FoliaBackdrop = ({
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
    const renderProps: BackgroundRenderProps = {
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
    };

    return (
        <div className="absolute inset-0 z-0" style={{backgroundColor: theme.backgroundColor}}>
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
        </div>
    );
};

export default FoliaBackdrop;
