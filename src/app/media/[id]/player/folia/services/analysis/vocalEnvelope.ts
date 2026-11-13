// Stub for Folia's analysis/vocalEnvelope service. The stem-separation engine is not part of this
// port, so no vocal envelope exists and the visualizers that read one fall back to their neutral
// (non-vocal-reactive) path.
export const VOCAL_FPS = 50;

export interface VocalEnvelope {
    fps: number;
    /** Level per frame, dB. */
    db: Float32Array;
    /** The track's loud singing, dB: the 97th percentile of `db`. */
    top: number;
    /** Frames where a sung syllable starts, ascending. */
    onsets: Uint32Array;
    /** The first frame read, for an envelope starting part way. Missing for the whole track. */
    from?: number;
}

export const getVocalEnvelope = (_key: string | null): VocalEnvelope | null => null;
