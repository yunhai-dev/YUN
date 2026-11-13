import type { BeatFxEvent } from './clock';

// The beat-analysis engine is not part of this port: Folia's visualizers ask these questions
// every frame and simply draw their original (non-beat-reactive) frame when the answer is "no".
export const isBeatFxReady = (): boolean => false;
export const isBeatFxHearing = (): boolean => false;
export const getBeatFxFiredCounts = (): Readonly<{ beats: number; downbeats: number }> => ({ beats: 0, downbeats: 0 });
export const getBeatFxIntensities = (): Readonly<{ beat: number; downbeat: number }> => ({ beat: 0, downbeat: 0 });
export const getBeatFxTrackScale = (): number => 1;
export const getBeatFxLastBeat = (): BeatFxEvent | null => null;
export const getBeatFxLastDownbeat = (): BeatFxEvent | null => null;
export const getBeatFxRotationSign = (): number => 1;
export const getBeatEffectStrength = (_effectId: string): number => 0;
export const getBeatFxHeard = (): Readonly<{ key: string | null; time: number | null }> => ({ key: null, time: null });
export const getBeatFxEvents = (): readonly BeatFxEvent[] => [];
export const isBeatEffectPlaying = (_effectId: string): boolean => false;
