// Tuning model for Folia's default shell background ("latent"), copied from the upstream shared
// types so the vendored renderer keeps its original defaults and semantics.

export type LatentBackgroundDisplayMode = 'dithering' | 'mesh' | 'both';
export type LatentBackgroundColorSource = 'cover-theme' | 'cover-only';

export interface LatentBackgroundTuning {
    displayMode: LatentBackgroundDisplayMode;
    colorSource: LatentBackgroundColorSource;
    dynamicOnlyInPlayer: boolean;
    enhancedBeatResponse: boolean;
    ditheringSpeed: number;
    ditheringAudioSpeed: number;
    ditheringSize: number;
    ditheringOpacity: number;
    meshSpeed: number;
    meshAudioSpeed: number;
    meshDistortion: number;
    meshSwirl: number;
    overlayEnabled: boolean;
    overlayOpacity: number;
}

export const DEFAULT_LATENT_BACKGROUND_TUNING: LatentBackgroundTuning = {
    displayMode: 'both',
    colorSource: 'cover-theme',
    dynamicOnlyInPlayer: true,
    enhancedBeatResponse: true,
    ditheringSpeed: 0.1,
    ditheringAudioSpeed: 1.2,
    ditheringSize: 2.5,
    ditheringOpacity: 0.55,
    meshSpeed: 0.3,
    meshAudioSpeed: 2,
    meshDistortion: 0.8,
    meshSwirl: 0.1,
    overlayEnabled: true,
    overlayOpacity: 0.35,
};
