// Vendored from Folia's src/components/visualizer/colorMix.ts (AGPL-3.0 — see ../../LICENSE).
// Only parseColorChannels and the helpers it reads are copied here: the shared
// backgrounds/colorMix.ts has no channel parser, and the sora starfield needs the raw channels to
// hand the theme colours to its shader as 0..1 components.

const isFiniteChannel = (value: number) => Number.isFinite(value);

type Channels = { r: number; g: number; b: number };
/**
 * A colour string read once: its channels, `fallback` for input that is meant to be a colour but
 * does not parse (empty, a broken hex or rgb()), or `passthrough` for anything else (named
 * colours, hsl(), ...) that colorWithAlpha hands back untouched.
 */
type ParsedColor = Channels | 'fallback' | 'passthrough';

const readColor = (normalizedColor: string): ParsedColor => {
    if (!normalizedColor) return 'fallback';

    if (normalizedColor.startsWith('#')) {
        const hex = normalizedColor.slice(1);
        const parse = (value: string) => Number.parseInt(value, 16);

        if (/^[0-9a-fA-F]{3}$/.test(hex)) {
            return {
                r: parse(hex[0] + hex[0]),
                g: parse(hex[1] + hex[1]),
                b: parse(hex[2] + hex[2]),
            };
        }

        if (/^[0-9a-fA-F]{6}$/.test(hex)) {
            return {
                r: parse(hex.slice(0, 2)),
                g: parse(hex.slice(2, 4)),
                b: parse(hex.slice(4, 6)),
            };
        }

        return 'fallback';
    }

    const rgbMatch = normalizedColor.match(/^rgba?\(([^)]+)\)$/);
    if (rgbMatch) {
        const [r, g, b] = rgbMatch[1].split(',').slice(0, 3).map(part => Number.parseFloat(part.trim()));
        if ([r, g, b].every(isFiniteChannel)) {
            return { r, g, b };
        }
        return 'fallback';
    }

    return 'passthrough';
};

// Renderers ask for the same few theme colours every frame, often once per glyph; the regexes
// and parseInt calls above are the expensive part, so each distinct string is read once.
const parsedColors = new Map<string, ParsedColor>();
const PARSED_COLOR_LIMIT = 512;

/**
 * Stores `value` under `key` in an insertion-ordered Map, first evicting the oldest entry when a new
 * key would push the cache past `limit`. Returns `value` so callers can `return rememberBounded(...)`.
 */
const rememberBounded = <TKey, TValue>(
    cache: Map<TKey, TValue>,
    key: TKey,
    value: TValue,
    limit: number,
): TValue => {
    if (!cache.has(key) && cache.size >= limit) {
        const oldest = cache.keys().next();
        if (!oldest.done) cache.delete(oldest.value);
    }
    cache.set(key, value);
    return value;
};

const parseColor = (color: string): { normalized: string; parsed: ParsedColor } => {
    const normalized = typeof color === 'string' ? color.trim() : '';
    let parsed = parsedColors.get(normalized);
    if (parsed === undefined) {
        parsed = rememberBounded(parsedColors, normalized, readColor(normalized), PARSED_COLOR_LIMIT);
    }
    return { normalized, parsed };
};

/** The colour's channels, or null when it is not a hex or rgb() colour. Returns a fresh object. */
export const parseColorChannels = (color: string): Channels | null => {
    const { parsed } = parseColor(color);
    return typeof parsed === 'string' ? null : { ...parsed };
};
