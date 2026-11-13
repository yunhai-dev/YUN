// Minimal shape of Folia's beat clock event; the analysis engine is not vendored.
export type BeatFxEventKind = 'beat' | 'downbeat';

export interface BeatFxEvent {
    /** Seconds from the start of the track. */
    t: number;
    kind: BeatFxEventKind;
    impact?: number;
    tone?: { low: number; mid: number; high: number };
    barPos?: number | null;
    rhythmic?: boolean;
}

/** No accents are analysed here, so every event contributes its neutral gain. */
export const resolveBeatFxAccentGain = (
    event: Pick<BeatFxEvent, 'impact' | 'rhythmic'> | null | undefined,
    trackScale: number,
): number => {
    if (event?.rhythmic === false) return 0;
    return trackScale;
};
