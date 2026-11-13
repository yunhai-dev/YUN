export const DEFAULT_PALETTE = [
    '#070b14',
    '#0f1a30',
    '#233858',
    '#46618c',
    '#d8b66a',
    '#e9eef6',
];

export type Rgb = [number, number, number];

export function hexToRgb(hex: string): Rgb | null {
    const normalized = hex.replace('#', '').trim();
    if (normalized.length !== 6 || /[^0-9a-f]/i.test(normalized)) return null;

    return [
        parseInt(normalized.slice(0, 2), 16),
        parseInt(normalized.slice(2, 4), 16),
        parseInt(normalized.slice(4, 6), 16),
    ];
}

export function toRgba(hex: string, alpha: number): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return `rgba(255, 255, 255, ${alpha})`;
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Math.max(0, Math.min(1, alpha))})`;
}

export function mixHex(a: string, b: string, amount: number): string {
    const left = hexToRgb(a);
    const right = hexToRgb(b);
    if (!left || !right) return a;

    const t = Math.max(0, Math.min(1, amount));
    const channels = left.map((value, index) => Math.round(value + (right[index] - value) * t));
    return `#${channels.map(value => value.toString(16).padStart(2, '0')).join('')}`;
}

/** Pick a saturated, readable accent from the cover palette. */
export function pickAccent(colors: string[], fallback: string): string {
    let best = fallback;
    let bestScore = -1;

    for (const color of colors) {
        const rgb = hexToRgb(color);
        if (!rgb) continue;

        const max = Math.max(...rgb) / 255;
        const min = Math.min(...rgb) / 255;
        const luminance = (max + min) / 2;
        const saturation = max === min ? 0 : (max - min) / (1 - Math.abs(2 * luminance - 1));

        if (luminance < 0.22 || luminance > 0.9) continue;

        const score = saturation * (1 - Math.abs(luminance - 0.58));
        if (score > bestScore) {
            bestScore = score;
            best = color;
        }
    }

    return best;
}

/** A very dark background derived from the cover, guaranteed to keep white text readable. */
export function stageBackground(palette: string[]): string {
    const base = palette[0] ?? DEFAULT_PALETTE[0];
    const tint = palette[1] ?? DEFAULT_PALETTE[1];
    return mixHex('#05070d', mixHex(base, tint, 0.5), 0.45);
}
