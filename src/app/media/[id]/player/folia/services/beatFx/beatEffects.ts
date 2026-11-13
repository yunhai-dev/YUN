// The only beat-effect ids the vendored renderers reference. Folia's full catalogue lives in its
// app-level registry; this port ships none of those effects, so the table is trimmed to what the
// latent background and the Tempera director ask about (their strength is always 0, see
// beatFxLive.getBeatEffectStrength).
export const BEAT_EFFECT_IDS = {
    latentPulse: 'latent.pulse',
    temperaInkFlash: 'tempera.inkFlash',
    nebbiaDrizzleRide: 'nebbia.drizzleRide',
    nebbiaAquaBeat: 'nebbia.aquaBeat',
    hanabiBeatBursts: 'hanabi.beatBursts',
    hanabiBeatPulse: 'hanabi.beatPulse',
    machiNeonPulse: 'machi.neonPulse',
    machiDrumRipple: 'machi.drumRipple',
    machiScreenFlash: 'machi.screenFlash',
} as const;

export interface SmartBeatSettings {
    mode: 'off' | 'cached' | 'on';
}

/** The beat-analysis engine is not part of this port, so smart beat is always off. */
export const smartBeatActive = (_settings: SmartBeatSettings): boolean => false;

/** The id a part plays under in the live strengths (beatFxLive.ts `getBeatEffectStrength`). */
export const beatEffectPartId = (id: string, part: string): string => `${id}:${part}`;
