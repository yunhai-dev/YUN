// src/components/visualizer/sonnet/sonnetIcons.ts
// Validates theme icon names and produces cacheable SVG data URLs for Pixi.
//
// The upstream version rasterises Lucide icons through react-dom/server, which Next.js does not
// allow in a client component. Here the icon's raw `__iconNode` is serialised to SVG by hand and
// served as an encoded data URL, so the Pixi icon layer works without that dependency.

import type { IconNode } from 'lucide-react';
import {
    loadLucideIcons,
    resolveLucideIconNames,
    resolveLucideIconNode,
} from '../services/lucideIconResolver';

/**
 * Loads the theme's icons and returns the usable ones.
 */
export const loadSonnetIconNames = async (names: string[] | undefined): Promise<string[]> => {
    const resolved = resolveLucideIconNames(names);
    if (resolved.length === 0) return [];

    await loadLucideIcons(resolved);
    return resolved.filter(name => resolveLucideIconNode(name) !== null);
};

// Spreads icon particles through the scene while guaranteeing every available theme icon is used.
export const buildSonnetIconParticleIndices = (
    iconCount: number,
    particleCount: number,
    seed: number,
): Array<number | null> => {
    const safeIconCount = Math.max(0, Math.floor(iconCount));
    const safeParticleCount = Math.max(0, Math.floor(particleCount));
    if (safeIconCount === 0) {
        return Array.from({ length: safeParticleCount }, () => null);
    }

    const iconParticleCount = Math.min(
        safeParticleCount,
        Math.max(Math.ceil(safeParticleCount / 4), safeIconCount),
    );
    let emittedIconCount = 0;
    return Array.from({ length: safeParticleCount }, (_, index) => {
        const previousBand = Math.floor(index * iconParticleCount / safeParticleCount);
        const currentBand = Math.floor((index + 1) * iconParticleCount / safeParticleCount);
        if (currentBand === previousBand) {
            return null;
        }

        const iconIndex = ((seed + emittedIconCount) % safeIconCount + safeIconCount) % safeIconCount;
        emittedIconCount += 1;
        return iconIndex;
    });
};

// Distributes icon starts across most of a shot while reserving time for the final reveal.
export const resolveSonnetIconEntryPhase = (index: number, iconCount: number) => {
    const safeCount = Math.max(0, Math.floor(iconCount));
    if (safeCount <= 1) return 0.12;
    const safeIndex = Math.min(safeCount - 1, Math.max(0, Math.floor(index)));
    return 0.04 + (safeIndex / (safeCount - 1)) * 0.82;
};

export const resolveSonnetIconEntryDuration = (sceneDuration: number, preferredDuration: number) => {
    const safeSceneDuration = Math.max(0.01, sceneDuration);
    return Math.min(
        Math.max(0.01, preferredDuration),
        Math.max(0.08, safeSceneDuration * 0.18),
        safeSceneDuration,
    );
};

export const resolveSonnetIconEntryDelay = (
    entryPhase: number,
    sceneDuration: number,
    entryDuration: number,
) => Math.min(1, Math.max(0, entryPhase)) * Math.max(0, sceneDuration - entryDuration);

export const buildSonnetIconTextureKey = (
    name: string,
    color: string,
    strokeWidth: number,
    size: number,
    resolution: number,
) => `${name}|${color}|${strokeWidth}|${size}|${resolution}`;

const iconDataUrlCache = new Map<string, string>();

const serializeIconNode = (node: IconNode): string => node
    .map(([tag, attrs]) => {
        const attributes = Object.entries(attrs)
            // `key` is lucide's React reconciliation key, not an SVG attribute.
            .filter(([key]) => key !== 'key')
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        return `<${tag} ${attributes} />`;
    })
    .join('');

export const buildSonnetIconDataUrl = (
    name: string,
    color: string,
    strokeWidth: number,
    size: number,
): string | null => {
    if (!(size > 0)) return null;

    const cacheKey = `${name}|${color}|${strokeWidth}|${size}`;
    const cached = iconDataUrlCache.get(cacheKey);
    if (cached) return cached;

    const node = resolveLucideIconNode(name);
    if (!node) return null;

    // lucide's absoluteStrokeWidth keeps the visual stroke constant while the 24-unit viewBox is
    // scaled up to `size`: stroke-width = strokeWidth * 24 / size.
    const scaledStrokeWidth = strokeWidth * 24 / size;
    const svg = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"`,
        ` viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${scaledStrokeWidth}"`,
        ` stroke-linecap="round" stroke-linejoin="round">${serializeIconNode(node)}</svg>`,
    ].join('');

    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    iconDataUrlCache.set(cacheKey, dataUrl);
    return dataUrl;
};
