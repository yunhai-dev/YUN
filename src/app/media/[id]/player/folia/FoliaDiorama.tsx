"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import CameraRig from './diorama/CameraRig';
import DioramaScene from './diorama/DioramaScene';
import { resolveDioramaMotionParams } from './diorama/cameraPath';
import {
    activeSegment,
    appendSegment,
    createSequencerState,
    updateActiveSegmentLines,
    type SequencerState,
} from './diorama/dioramaSequencer';
import { resolveLineIndex } from './lineIndex';
import { DEFAULT_DIORAMA_TUNING, type Line, type LyricRenderScale, type Theme } from './types';
import { useAudioSignals } from './useAudioSignals';

interface FoliaDioramaProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    lines: Line[];
    theme: Theme;
    seed: string;
    isPlaying?: boolean;
    /** The stage is covered and hidden: no frame may be drawn, not even a paused repaint. */
    concealed?: boolean;
    renderScale?: LyricRenderScale;
}

const TUNING = DEFAULT_DIORAMA_TUNING;

/** Triggers a single WebGL frame when paused and the user seeks, changes track, or changes theme. */
const DioramaDemandInvalidator = ({
    currentTime,
    globalIndex,
    seed,
    theme,
    isPlaying,
    concealed,
}: {
    currentTime: MotionValue<number>;
    globalIndex: number;
    seed: string;
    theme: Theme;
    isPlaying: boolean;
    concealed: boolean;
}) => {
    const invalidate = useThree(state => state.invalidate);

    useEffect(() => {
        if (!isPlaying) invalidate();
    }, [globalIndex, invalidate, isPlaying, seed, theme]);

    useEffect(() => {
        if (isPlaying || concealed) return undefined;
        return currentTime.on('change', () => invalidate());
    }, [concealed, currentTime, invalidate, isPlaying]);

    return null;
};

/**
 * Hosts Folia's Diorama corridor. One sequencer segment per song is enough here: the player
 * mounts one track at a time, so the cross-song transition machinery stays idle.
 */
export const FoliaDiorama = ({
    audioRef,
    lines,
    theme,
    seed,
    isPlaying = true,
    concealed = false,
    renderScale = 1,
}: FoliaDioramaProps) => {
    const {currentTime, audioPower, audioBands} = useAudioSignals(audioRef);

    // The sequencer is a mutable state machine, like upstream's host: appended once per seed and
    // rebuilt in place when a late lyric load replaces the line array.
    const seqRef = useRef<SequencerState | null>(null);
    const seqSeedRef = useRef<string | null>(null);
    const transitionEpochRef = useRef(0);

    if (!seqRef.current || seqSeedRef.current !== seed) {
        const sequencer = createSequencerState();
        appendSegment(sequencer, {
            seed,
            lines,
            round: 0,
            placementOrigin: {x: 0, y: 0, z: 0},
        });
        if (seqRef.current) transitionEpochRef.current += 1;
        seqRef.current = sequencer;
        seqSeedRef.current = seed;
    } else {
        const segment = activeSegment(seqRef.current);
        if (segment && segment.lines !== lines) {
            updateActiveSegmentLines(seqRef.current, lines);
        }
    }

    const sequencer = seqRef.current;
    const [lineIndex, setLineIndex] = useState(0);
    const lineIndexRef = useRef(0);

    useEffect(() => {
        lineIndexRef.current = 0;
        setLineIndex(0);

        const update = (time: number) => {
            const next = resolveLineIndex(lines, time);
            if (next !== lineIndexRef.current) {
                lineIndexRef.current = next;
                setLineIndex(next);
            }
        };

        update(currentTime.get());
        return currentTime.on('change', update);
    }, [lines, currentTime]);

    const motion = useMemo(
        () => resolveDioramaMotionParams(TUNING, theme.animationIntensity),
        [theme.animationIntensity],
    );

    const activeLineWidthRef = useRef(0);
    const segment = activeSegment(sequencer);
    const globalIndex = (segment?.globalStart ?? 0) + Math.min(lineIndex, Math.max(0, (segment?.span ?? 1) - 1));

    const maxDpr = Math.max(0.75, Math.min(1.5, 1.5 * renderScale));

    return (
        <div className="absolute inset-0">
            <Canvas
                camera={{position: [0, 0.6, 9], fov: 55}}
                dpr={[Math.min(1, maxDpr), maxDpr]}
                frameloop={isPlaying ? 'always' : 'demand'}
                gl={{alpha: true, antialias: true, powerPreference: 'high-performance'}}
                resize={{offsetSize: true}}
                style={{background: 'transparent'}}
            >
                <DioramaDemandInvalidator
                    currentTime={currentTime}
                    globalIndex={globalIndex}
                    seed={seed}
                    theme={theme}
                    isPlaying={isPlaying}
                    concealed={concealed}
                />
                <CameraRig
                    currentTime={currentTime}
                    sequencer={sequencer}
                    globalIndex={globalIndex}
                    activeLineWidthRef={activeLineWidthRef}
                    motion={motion}
                    transitionEpoch={transitionEpochRef.current}
                />
                <DioramaScene
                    theme={theme}
                    sequencer={sequencer}
                    globalIndex={globalIndex}
                    transitionOutgoingIndex={null}
                    currentTime={currentTime}
                    activeLineWidthRef={activeLineWidthRef}
                    audioPower={audioPower}
                    audioBands={audioBands}
                    motion={motion}
                    showLyrics
                    showParticles={TUNING.showParticles}
                    backgroundParticleCircumference={TUNING.backgroundParticleCircumference}
                    backgroundParticleRadial={TUNING.backgroundParticleRadial}
                    geometryVisibility={TUNING.geometryVisibility}
                    particleDensity={TUNING.particleDensity}
                    particleScale={TUNING.particleScale}
                    particleGlowEnabled={TUNING.particleGlowEnabled}
                    particleGlowIntensity={TUNING.particleGlowIntensity}
                    lyricsFontScale={1}
                    glowIntensity={TUNING.glowEnabled ? TUNING.glowIntensity : 0}
                    soulIntensity={TUNING.soulEnabled ? TUNING.soulIntensity : 0}
                    soulActiveEnabled={TUNING.soulEnabled && TUNING.soulActiveEnabled}
                    gradientIntensity={TUNING.gradientEnabled ? TUNING.gradientIntensity : 0}
                    keywordColoringEnabled={TUNING.keywordColoringEnabled}
                />
            </Canvas>
        </div>
    );
};

export default FoliaDiorama;
