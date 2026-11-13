/**
 * Equal-power crossfade math.
 *
 * Both decks are faded with a quarter-sine pair so their powers sum to one: at the midpoint
 * each deck sits at -3 dB, which keeps the perceived loudness steady while two different
 * recordings overlap. A linear pair would dip in the middle.
 */

export const CROSSFADE_MIN_SEC = 1;
export const CROSSFADE_MAX_SEC = 12;
export const CROSSFADE_DEFAULT_SEC = 5;

/** Coerces a stored preference to a whole number of seconds inside the supported range. */
export const clampCrossfadeSeconds = (value: unknown): number => {
    const numeric = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(numeric)) return CROSSFADE_DEFAULT_SEC;
    return Math.min(CROSSFADE_MAX_SEC, Math.max(CROSSFADE_MIN_SEC, Math.round(numeric)));
};

export interface EqualPowerGains {
    /** Gain for the outgoing deck, 1 → 0. */
    out: number;
    /** Gain for the incoming deck, 0 → 1. */
    in: number;
}

export const equalPowerGains = (progress: number): EqualPowerGains => {
    const clamped = Math.min(1, Math.max(0, progress));
    const angle = (clamped * Math.PI) / 2;
    return {out: Math.cos(angle), in: Math.sin(angle)};
};

/**
 * The overlap actually used for a track. Short tracks must not fade for their entire duration,
 * and a transition armed late must fit into the remaining time so it always finishes by the end.
 */
export const planOverlap = (duration: number, currentTime: number, seconds: number): number => {
    if (!Number.isFinite(duration) || duration <= 0) return 0;
    const remaining = Math.max(0, duration - currentTime);
    return Math.max(0, Math.min(clampCrossfadeSeconds(seconds), duration / 3, remaining));
};
