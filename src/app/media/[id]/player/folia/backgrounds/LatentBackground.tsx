import React, { useEffect, useMemo, useRef } from 'react';
import type { PaperShaderElement } from '@paper-design/shaders';
import { Dithering, MeshGradient } from '@paper-design/shaders-react';
import type { MotionValue } from 'framer-motion';
import { createFrameGate } from '../fpsCap';
import type { AudioBands, Theme } from '../types';
import { beatImpact, downbeatImpact } from '../stores/motionSignals';
import { getBeatEffectStrength, isBeatFxReady } from '../services/beatFx/beatFxLive';
import { BEAT_EFFECT_IDS } from '../services/beatFx/beatEffects';
import { createPaperShaderReleaseRef, PAPER_SHADER_CONTEXT_ATTRIBUTES } from './paperShaderContext';
import { updatePaperShaderUniforms } from './paperShaderUniforms';
import { useBlendedColors } from './useBlendedColors';
import {
    DEFAULT_LATENT_BACKGROUND_TUNING,
    type LatentBackgroundColorSource,
    type LatentBackgroundTuning,
} from './types';

// Folia's default shell background ("latent"), copied from
// components/visualizer/backgrounds/latent/LatentBackground.tsx. It layers two cover-coloured
// Paper shaders and drives their uniforms without React frame updates.
//
// Differences from upstream: the cover colours arrive as a prop (this port already extracts the
// cover palette once for the whole player) instead of being read from the cover URL here, and the
// style-switch first-frame reporting is dropped (there is no style switch).

interface LatentBackgroundProps {
    theme: Theme;
    coverColors: string[];
    audioPower: MotionValue<number>;
    audioBands: AudioBands;
    staticMode: boolean;
    paused: boolean;
    tuning?: LatentBackgroundTuning;
    /** How long new colours take to blend in; 0 or left out, at once. */
    blendMs?: number;
}

// Soft full-screen mesh/dithering backgrounds do not need full 720p+ pixel density;
// capping at 960x540 cuts fragment shader pixel load by ~44% with no visible loss.
const MAX_SHADER_PIXELS = 960 * 540;
// The slow decorative layers share a 30 Hz clock independently of the lyric renderer.
const BACKGROUND_FPS = 30;
// How fast the speed goes from playing to paused or back, as a time constant: settled in about a second.
const PAUSE_EASE_MS = 300;
const normalizeAudio = (value: number) => Math.min(1, Math.max(0, value / 255));
const clampShaderSpeed = (value: number) => Math.min(2, Math.max(0, value));
const clampAudioAmount = (value: number) => Math.min(1, Math.max(0, value));
const easeTowards = (current: number, target: number, amount: number) => (
    current + (target - current) * amount
);
export const resolveLatentBroadbandEnergy = (
    bass: number,
    lowMid: number,
    mid: number,
    vocal: number,
    treble: number,
) => {
    const broadbandEnergy = (
        normalizeAudio(bass) * 0.22
        + normalizeAudio(lowMid) * 0.18
        + normalizeAudio(mid) * 0.22
        + normalizeAudio(vocal) * 0.28
        + normalizeAudio(treble) * 0.1
    );
    return Math.pow(broadbandEnergy, 0.55);
};
// Accents broadband energy rises so shader speed lands on musical onsets instead of following loudness alone.
export const resolveLatentOnsetPulse = (
    currentEnergy: number,
    previousEnergy: number,
    previousPulse: number,
) => Math.max(
    previousPulse * 0.84,
    clampAudioAmount((currentEnergy - previousEnergy) * 7),
);
export const resolveLatentBeatSpeedTarget = (
    broadbandEnergy: number,
    onsetPulse: number,
) => clampAudioAmount(broadbandEnergy * 0.42 + onsetPulse * 0.85);
/** The beat FX onset: the larger of the two envelopes the beat clock writes, each 0..2 once scaled. */
export const resolveLatentBeatFxPulse = (beat: number, downbeat: number) => Math.max(beat, downbeat);
export const resolveLatentAudioSpeedTarget = (
    broadbandEnergy: number,
    onsetPulse: number,
    enhancedBeatResponse: boolean,
) => enhancedBeatResponse
    ? resolveLatentBeatSpeedTarget(broadbandEnergy, onsetPulse)
    : clampAudioAmount(broadbandEnergy);
export const resolveLatentShaderSpeed = (
    baseSpeed: number,
    audioSpeed: number,
    audioAmount: number,
    paused: boolean,
) => clampShaderSpeed(
    paused
        ? 0
        : easeTowards(baseSpeed, audioSpeed, audioAmount),
);
export const resolveLatentShaderColors = (
    coverColors: string[],
    theme: Theme,
    colorSource: LatentBackgroundColorSource,
) => {
    const primary = coverColors[0] ?? theme.secondaryColor;
    if (colorSource === 'cover-only') {
        const secondary = coverColors[1] ?? primary;
        const tertiary = coverColors[2] ?? secondary;
        const quaternary = coverColors[3] ?? primary;
        const quinary = coverColors[4] ?? secondary;
        const senary = coverColors[5] ?? tertiary;
        return {
            ditheringBack: tertiary,
            ditheringFront: primary,
            mesh: [primary, secondary, tertiary, quaternary, quinary, senary],
        };
    }
    const secondary = coverColors[1] ?? theme.primaryColor;
    const tertiary = coverColors[2] ?? primary;
    const quaternary = coverColors[3] ?? secondary;
    return {
        ditheringBack: theme.backgroundColor,
        ditheringFront: primary,
        mesh: [primary, secondary, tertiary, quaternary, theme.backgroundColor, theme.accentColor],
    };
};

const LatentBackground: React.FC<LatentBackgroundProps> = ({
    theme,
    coverColors,
    audioPower,
    audioBands,
    staticMode,
    paused,
    tuning: tuningOverride,
    blendMs = 0,
}) => {
    const ditheringRef = useRef<PaperShaderElement | null>(null);
    const meshRef = useRef<PaperShaderElement | null>(null);
    // Stable callback refs: they also lose each shader's WebGL context when it unmounts.
    const ditheringShaderRef = useMemo(() => createPaperShaderReleaseRef(ditheringRef), []);
    const meshShaderRef = useMemo(() => createPaperShaderReleaseRef(meshRef), []);
    const ditheringLayerRef = useRef<HTMLDivElement | null>(null);
    const meshLayerRef = useRef<HTMLDivElement | null>(null);
    const pausedRef = useRef(paused);
    // How far the loop below has eased between paused (0) and playing (1). Outside the loop's effect,
    // so a re-run of it (a tuning changed mid-ease) goes on from there.
    const playingRef = useRef(paused ? 0 : 1);
    const tuning = tuningOverride ?? DEFAULT_LATENT_BACKGROUND_TUNING;
    const showDithering = tuning.displayMode !== 'mesh';
    const showMesh = tuning.displayMode !== 'dithering';
    pausedRef.current = paused;

    const resolvedColors = useMemo(
        () => resolveLatentShaderColors(coverColors, theme, tuning.colorSource),
        [coverColors, theme, tuning.colorSource],
    );
    const blendedColors = useBlendedColors(
        [theme.backgroundColor, resolvedColors.ditheringBack, resolvedColors.ditheringFront, ...resolvedColors.mesh],
        blendMs,
    );
    const [backgroundColor, ditheringBack, ditheringFront] = blendedColors;
    const shaderColors = useMemo(
        () => ({ditheringBack, ditheringFront, mesh: blendedColors.slice(3)}),
        [blendedColors, ditheringBack, ditheringFront],
    );

    useEffect(() => {
        if (staticMode) return;

        let animationFrame = 0;
        // The full-screen layers' last written styles: once the smoothed audio settles (paused,
        // silence) the strings stop changing, and the layers are left alone instead of being
        // handed the same filter every frame.
        const writtenStyles = new WeakMap<HTMLElement, Partial<Record<'opacity' | 'transform' | 'filter', string>>>();
        const writeLayerStyle = (element: HTMLElement, property: 'opacity' | 'transform' | 'filter', value: string) => {
            let written = writtenStyles.get(element);
            if (!written) {
                written = {};
                writtenStyles.set(element, written);
            }
            if (written[property] === value) return;
            written[property] = value;
            element.style[property] = value;
        };
        let smoothedPower = 0;
        let smoothedBass = 0;
        let smoothedMid = 0;
        let smoothedBeatSpeed = 0;
        let previousBeatEnergy = 0;
        let latentOnsetPulse = 0;
        // A pause slows the fluid over about a second and play speeds it up the same way.
        let lastFrameAt: number | null = null;
        const shouldDraw = createFrameGate(BACKGROUND_FPS);
        const speedOf = (baseSpeed: number, audioSpeed: number) => easeTowards(
            resolveLatentShaderSpeed(baseSpeed, audioSpeed, smoothedBeatSpeed, true),
            resolveLatentShaderSpeed(baseSpeed, audioSpeed, smoothedBeatSpeed, false),
            playingRef.current,
        );

        // Keep audio-rate changes inside the shader/DOM layer so React only rerenders on palette changes.
        const updateAudioResponse = (frameAt: number) => {
            if (!shouldDraw(frameAt)) {
                animationFrame = requestAnimationFrame(updateAudioResponse);
                return;
            }
            const isPaused = pausedRef.current;
            const targetPlaying = isPaused ? 0 : 1;
            // By the time since the last frame: as fast at any frame rate.
            const elapsed = lastFrameAt === null ? 0 : frameAt - lastFrameAt;
            const pauseStep = 1 - Math.exp(-elapsed / PAUSE_EASE_MS);
            lastFrameAt = frameAt;
            playingRef.current = easeTowards(playingRef.current, targetPlaying, pauseStep);
            const rawPower = audioPower.get();
            const rawBass = audioBands.bass.get();
            const rawLowMid = audioBands.lowMid.get();
            const rawMid = audioBands.mid.get();
            const rawVocal = audioBands.vocal.get();
            const rawTreble = audioBands.treble.get();
            const hasLiveAudio = !isPaused && (
                rawPower > 0 || rawBass > 0 || rawLowMid > 0 || rawMid > 0 || rawVocal > 0 || rawTreble > 0 || isBeatFxReady()
            );
            const targetPower = isPaused ? 0 : normalizeAudio(rawPower);
            const targetBass = isPaused ? 0 : normalizeAudio(rawBass);
            const targetBeatEnergy = isPaused
                ? 0
                : resolveLatentBroadbandEnergy(rawBass, rawLowMid, rawMid, rawVocal, rawTreble);
            const targetMid = isPaused
                ? 0
                : normalizeAudio(Math.max(rawMid, rawVocal));
            smoothedPower = easeTowards(smoothedPower, targetPower, 0.12);
            smoothedBass = easeTowards(smoothedBass, targetBass, 0.16);
            smoothedMid = easeTowards(
                smoothedMid,
                targetMid,
                0.13,
            );
            // The band onset keeps tracking while the beats drive the pulse, so falling back picks
            // up from the current state rather than from a stale one.
            latentOnsetPulse = tuning.enhancedBeatResponse
                ? resolveLatentOnsetPulse(
                    targetBeatEnergy,
                    previousBeatEnergy,
                    latentOnsetPulse,
                )
                : 0;
            previousBeatEnergy = targetBeatEnergy;
            // This port has no beat-analysis engine: `isBeatFxReady()` is always false, so the
            // speed always comes from the band-energy estimate above.
            const beatSpeedTarget = !isPaused && isBeatFxReady() && getBeatEffectStrength(BEAT_EFFECT_IDS.latentPulse) > 0
                ? resolveLatentBeatSpeedTarget(
                    targetBeatEnergy,
                    resolveLatentBeatFxPulse(beatImpact.get(), downbeatImpact.get()),
                )
                : resolveLatentAudioSpeedTarget(
                    targetBeatEnergy,
                    latentOnsetPulse,
                    tuning.enhancedBeatResponse,
                );
            smoothedBeatSpeed = easeTowards(
                smoothedBeatSpeed,
                beatSpeedTarget,
                beatSpeedTarget > smoothedBeatSpeed ? 0.42 : 0.14,
            );

            // When no live audio signal is present and the play/pause ease has settled, snap to
            // steady state and stop scheduling rAF frames until `paused` or `tuning` changes.
            const settled = !hasLiveAudio
                && Math.abs(playingRef.current - targetPlaying) < 0.001
                && smoothedPower < 0.0005
                && smoothedBass < 0.0005
                && smoothedMid < 0.0005
                && smoothedBeatSpeed < 0.0005
                && latentOnsetPulse < 0.0005;

            if (settled) {
                playingRef.current = targetPlaying;
                smoothedPower = 0;
                smoothedBass = 0;
                smoothedMid = 0;
                smoothedBeatSpeed = 0;
                latentOnsetPulse = 0;
            }
            if (!isPaused || !settled) {
                animationFrame = requestAnimationFrame(updateAudioResponse);
            }

            const currentDitheringMount = ditheringRef.current?.paperShaderMount;
            const currentMeshMount = meshRef.current?.paperShaderMount;

            if (currentDitheringMount) {
                const ditheringSpeed = speedOf(tuning.ditheringSpeed, tuning.ditheringAudioSpeed);
                updatePaperShaderUniforms(currentDitheringMount, {
                    u_pxSize: Math.max(0.5, tuning.ditheringSize - smoothedBass * tuning.ditheringSize * 0.34),
                }, true);
                currentDitheringMount.setFrame(currentDitheringMount.getCurrentFrame() + elapsed * ditheringSpeed);
            }
            if (currentMeshMount) {
                const meshSpeed = speedOf(tuning.meshSpeed, tuning.meshAudioSpeed);
                updatePaperShaderUniforms(currentMeshMount, {
                    u_distortion: tuning.meshDistortion + smoothedPower * 0.62,
                    u_swirl: tuning.meshSwirl + smoothedMid * 0.38,
                }, true);
                currentMeshMount.setFrame(currentMeshMount.getCurrentFrame() + elapsed * meshSpeed);
            }

            if (ditheringLayerRef.current) {
                writeLayerStyle(ditheringLayerRef.current, 'opacity', showMesh
                    ? `${Math.min(1, tuning.ditheringOpacity + smoothedBass * 0.25)}`
                    : '1');
                writeLayerStyle(ditheringLayerRef.current, 'transform', `scale(${1.015 + smoothedBass * 0.025})`);
            }
            if (meshLayerRef.current) {
                writeLayerStyle(meshLayerRef.current, 'filter', `saturate(${1.04 + smoothedMid * 0.34}) brightness(${0.94 + smoothedPower * 0.16})`);
                writeLayerStyle(meshLayerRef.current, 'transform', `scale(${1.025 + smoothedPower * 0.018})`);
            }
        };

        animationFrame = requestAnimationFrame(updateAudioResponse);
        return () => cancelAnimationFrame(animationFrame);
    }, [audioBands, audioPower, paused, showMesh, staticMode, tuning]);

    // The Paper mounts draw on demand. Keeping their internal loops stopped also leaves the
    // final frame on screen once the pause ease completes.
    return (
        <div
            className="absolute inset-0 z-0 overflow-hidden"
            style={{backgroundColor, pointerEvents: 'none'}}
        >
            {showMesh && (
                <div
                    ref={meshLayerRef}
                    className="absolute inset-0"
                    style={{transform: 'scale(1.025)', transformOrigin: 'center'}}
                >
                    <MeshGradient
                        ref={meshShaderRef}
                        width="100%"
                        height="100%"
                        colors={shaderColors.mesh}
                        distortion={tuning.meshDistortion}
                        swirl={tuning.meshSwirl}
                        grainMixer={0}
                        grainOverlay={0.01}
                        speed={0}
                        minPixelRatio={1}
                        maxPixelCount={MAX_SHADER_PIXELS}
                        webGlContextAttributes={PAPER_SHADER_CONTEXT_ATTRIBUTES}
                        style={{width: '100%', height: '100%'}}
                    />
                </div>
            )}
            {showDithering && (
                <div
                    ref={ditheringLayerRef}
                    className="absolute inset-0"
                    style={{
                        mixBlendMode: showMesh ? 'soft-light' : 'normal',
                        opacity: showMesh ? tuning.ditheringOpacity : 1,
                        transform: 'scale(1.015)',
                        transformOrigin: 'center',
                    }}
                >
                    <Dithering
                        ref={ditheringShaderRef}
                        width="100%"
                        height="100%"
                        colorBack={shaderColors.ditheringBack}
                        colorFront={shaderColors.ditheringFront}
                        shape="warp"
                        type="4x4"
                        size={tuning.ditheringSize}
                        speed={0}
                        minPixelRatio={1}
                        maxPixelCount={MAX_SHADER_PIXELS}
                        webGlContextAttributes={PAPER_SHADER_CONTEXT_ATTRIBUTES}
                        style={{width: '100%', height: '100%'}}
                    />
                </div>
            )}
            {tuning.overlayEnabled && tuning.overlayOpacity > 0 && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor,
                        opacity: tuning.overlayOpacity,
                    }}
                />
            )}
        </div>
    );
};

export default React.memo(LatentBackground);
