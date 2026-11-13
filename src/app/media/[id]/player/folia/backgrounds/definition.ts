import type { MotionValue } from 'framer-motion';
import type { AudioBands, Theme } from '../types';

// Local contract for the vendored Folia shell backgrounds. Upstream discovers background modes
// through entry modules that also carry i18n keys, settings cards, commands and style transitions;
// this player renders the same drawing layers with fixed upstream defaults, so only the render
// inputs and the picker labels survive here.

export type BackgroundType = 'common' | 'latent' | 'monet' | 'nomand' | 'sora' | 'url';

/** Labels follow upstream's zh-CN locale (`visualizerBackgroundMode*`). */
export const BACKGROUND_TYPE_OPTIONS: ReadonlyArray<{ type: BackgroundType; label: string }> = [
    {type: 'common', label: '通用'},
    {type: 'latent', label: '隐现'},
    {type: 'monet', label: '莫奈'},
    {type: 'nomand', label: '漫游'},
    {type: 'sora', label: '空'},
    {type: 'url', label: '嵌入'},
];

export interface UrlBackgroundItem {
    id: string;
    url: string;
    note: string;
}

export interface BackgroundRenderProps {
    theme: Theme;
    coverUrl: string | null;
    /** Cover palette already extracted by the player (`extractThemeColors`), used by latent. */
    coverColors: string[];
    audioPower: MotionValue<number>;
    audioBands: AudioBands;
    seed?: string | number;
    /** The player page is dark-only; kept because the vendored layers branch on it. */
    isDaylight: boolean;
    /** Folia's background static mode: freezes animated layers. */
    staticMode: boolean;
    paused: boolean;
    /** Colour cross-fade length where the layer supports it; this port has no style transitions. */
    blendMs?: number;
    urlBackgroundList?: UrlBackgroundItem[];
    urlBackgroundSelectedId?: string | null;
}
