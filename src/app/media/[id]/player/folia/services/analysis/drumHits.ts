// Stub for Folia's analysis/drumHits service. The stem-separation engine (beat_this + htdemucs
// models, workers) is not part of this port, so no drum hits are ever available and the
// beat-reactive visualizer paths draw their original non-reactive frame.
export type DrumHitKind = 0 | 1 | 2;
export const DRUM_KICK: DrumHitKind = 0;
export const DRUM_SNARE: DrumHitKind = 1;
export const DRUM_HAT: DrumHitKind = 2;

export interface DrumHits {
    times: Float64Array;
    strengths: Float32Array;
    kinds: Uint8Array;
    /** While the track is still separating: the time (s) the hits reach. */
    until?: number;
}

export const getDrumHits = (_key: string | null): DrumHits | null => null;
