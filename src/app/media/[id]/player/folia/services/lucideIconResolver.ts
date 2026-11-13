import type { IconNode, LucideIcon } from 'lucide-react';
import { THEME_ICON_NAMES, type ThemeIconName } from '@/data/mediaThemes/iconNames';

// Folia's lucideIconResolver, backed by the closed vocabulary in
// src/data/mediaThemes/iconNames.ts. Each theme icon is a static deep import, so the bundler
// emits exactly the chunks preset themes can reference; lucide's `dynamicIconImports` map would
// pull in every icon (~1900 modules).

export type LucideIconStatus = 'loading' | 'ready' | 'missing';

export type { IconNode } from 'lucide-react';

interface IconModule {
    __iconNode: IconNode;
    default: LucideIcon;
}

const ICON_LOADERS: Record<ThemeIconName, () => Promise<IconModule>> = {
    Moon: () => import('lucide-react/dist/esm/icons/moon.js'),
    MoonStar: () => import('lucide-react/dist/esm/icons/moon-star.js'),
    Star: () => import('lucide-react/dist/esm/icons/star.js'),
    Sparkles: () => import('lucide-react/dist/esm/icons/sparkles.js'),
    Sun: () => import('lucide-react/dist/esm/icons/sun.js'),
    Cloud: () => import('lucide-react/dist/esm/icons/cloud.js'),
    CloudRain: () => import('lucide-react/dist/esm/icons/cloud-rain.js'),
    CloudMoon: () => import('lucide-react/dist/esm/icons/cloud-moon.js'),
    CloudSun: () => import('lucide-react/dist/esm/icons/cloud-sun.js'),
    Wind: () => import('lucide-react/dist/esm/icons/wind.js'),
    Snowflake: () => import('lucide-react/dist/esm/icons/snowflake.js'),
    Umbrella: () => import('lucide-react/dist/esm/icons/umbrella.js'),
    Flower: () => import('lucide-react/dist/esm/icons/flower.js'),
    Flower2: () => import('lucide-react/dist/esm/icons/flower-2.js'),
    Leaf: () => import('lucide-react/dist/esm/icons/leaf.js'),
    Trees: () => import('lucide-react/dist/esm/icons/trees.js'),
    Cherry: () => import('lucide-react/dist/esm/icons/cherry.js'),
    Feather: () => import('lucide-react/dist/esm/icons/feather.js'),
    Bird: () => import('lucide-react/dist/esm/icons/bird.js'),
    Fish: () => import('lucide-react/dist/esm/icons/fish.js'),
    Mountain: () => import('lucide-react/dist/esm/icons/mountain.js'),
    MountainSnow: () => import('lucide-react/dist/esm/icons/mountain-snow.js'),
    Compass: () => import('lucide-react/dist/esm/icons/compass.js'),
    Anchor: () => import('lucide-react/dist/esm/icons/anchor.js'),
    Sailboat: () => import('lucide-react/dist/esm/icons/sailboat.js'),
    Rocket: () => import('lucide-react/dist/esm/icons/rocket.js'),
    Waves: () => import('lucide-react/dist/esm/icons/waves.js'),
    Flame: () => import('lucide-react/dist/esm/icons/flame.js'),
    Clock: () => import('lucide-react/dist/esm/icons/clock.js'),
    Hourglass: () => import('lucide-react/dist/esm/icons/hourglass.js'),
    Music: () => import('lucide-react/dist/esm/icons/music.js'),
    Music2: () => import('lucide-react/dist/esm/icons/music-2.js'),
    Heart: () => import('lucide-react/dist/esm/icons/heart.js'),
    Smile: () => import('lucide-react/dist/esm/icons/smile.js'),
    Cat: () => import('lucide-react/dist/esm/icons/cat.js'),
    Rainbow: () => import('lucide-react/dist/esm/icons/rainbow.js'),
    Store: () => import('lucide-react/dist/esm/icons/store.js'),
};

const iconNames = new Set<string>(THEME_ICON_NAMES);
const modules = new Map<string, IconModule>();
const pending = new Map<string, Promise<void>>();
const listeners = new Set<() => void>();

let revision = 0;

const notify = () => {
    revision += 1;
    listeners.forEach(listener => listener());
};

const loadOne = (name: string): Promise<void> => {
    if (modules.has(name)) return Promise.resolve();

    const existing = pending.get(name);
    if (existing) return existing;

    const loader = ICON_LOADERS[name as ThemeIconName];
    if (!loader) return Promise.resolve();

    const request = loader()
        .then(module => {
            modules.set(name, module);
            notify();
        })
        .catch(() => undefined)
        .finally(() => {
            pending.delete(name);
        });

    pending.set(name, request);
    return request;
};

export const loadLucideIcons = async (names: readonly unknown[] | undefined): Promise<void> => {
    if (!names || names.length === 0) return;
    const resolved = resolveLucideIconNames(
        names.filter((name): name is string => typeof name === 'string'),
    );
    await Promise.all(resolved.map(name => loadOne(name)));
};

export const hasLucideIcon = async (name: string): Promise<boolean> => iconNames.has(name);

export const resolveLucideIcon = (name: string | null | undefined): LucideIcon | null => {
    if (!name) return null;
    return modules.get(name)?.default ?? null;
};

export const resolveLucideIconNode = (name: string | null | undefined): IconNode | null => {
    if (!name) return null;
    return modules.get(name)?.__iconNode ?? null;
};

export const getLucideIconStatus = (name: string | null | undefined): LucideIconStatus => {
    if (!name || !iconNames.has(name)) return 'missing';
    return modules.has(name) ? 'ready' : 'loading';
};

/** Filters out unknown names, de-dupes, and keeps the caller's order (stable for comparisons). */
export const resolveLucideIconNames = (names: readonly string[] | undefined): string[] => {
    if (!names || names.length === 0) return [];

    const seen = new Set<string>();
    const resolved: string[] = [];
    for (const name of names) {
        if (!iconNames.has(name) || seen.has(name)) continue;
        seen.add(name);
        resolved.push(name);
    }
    return resolved;
};

export const subscribeLucideIcons = (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

export const getLucideIconRevision = (): number => revision;
