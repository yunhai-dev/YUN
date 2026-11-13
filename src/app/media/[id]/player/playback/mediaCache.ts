import extractThemeColors, { createFallbackPalette } from '@/lib/getImgColor';
import { parseLyrics, type LyricLine } from '../lyrics';

/**
 * Cross-route caches for the media player.
 *
 * The player swaps routes at the end of a crossfade, so the incoming song's page mounts from
 * scratch. Without a cache it would paint once with empty lyrics and the default palette and
 * then pop into the real ones — exactly the jump the visual handoff is meant to hide. The
 * current page preloads its next track as soon as it binds, so the incoming page can read these
 * caches synchronously on first render.
 */

const lyricsCache = new Map<string, LyricLine[]>();
const lyricsInFlight = new Map<string, Promise<LyricLine[]>>();

const fetchLyrics = async (url: string, attempt = 0): Promise<LyricLine[]> => {
    try {
        const response = await fetch(url, {
            credentials: 'omit',
            headers: {
                'Accept': 'text/plain',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch lyrics:', url);
        }

        return parseLyrics(await response.text());
    } catch (error: unknown) {
        const retryable = error instanceof Error &&
            (error.message.includes('DNS') || error.message.includes('network'));
        if (retryable && attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            return fetchLyrics(url, attempt + 1);
        }
        throw error;
    }
};

export const getCachedLyrics = (url?: string | null): LyricLine[] | undefined => (
    url ? lyricsCache.get(url) : undefined
);

export const loadLyrics = (url: string): Promise<LyricLine[]> => {
    const cached = lyricsCache.get(url);
    if (cached) return Promise.resolve(cached);

    const pending = lyricsInFlight.get(url);
    if (pending) return pending;

    const request = fetchLyrics(url)
        .then(lyrics => {
            lyricsCache.set(url, lyrics);
            return lyrics;
        })
        .finally(() => {
            lyricsInFlight.delete(url);
        });

    lyricsInFlight.set(url, request);
    return request;
};

/** Warms the cache for a track that is not on screen yet; failures stay uncached. */
export const preloadLyrics = (url?: string | null): void => {
    if (!url) return;
    void loadLyrics(url).catch(() => undefined);
};

const PALETTE_COUNT = 6;
const PALETTE_DIFFERENCE = 24;

const paletteCache = new Map<string, string[]>();
const paletteInFlight = new Map<string, Promise<string[]>>();

export const getCachedPalette = (url?: string | null): string[] | undefined => (
    url ? paletteCache.get(url) : undefined
);

/**
 * `extractThemeColors` resolves with a deterministic fallback when the image cannot be read.
 * Caching that would pin the default colors for the rest of the session, so only real
 * extractions are stored and a later mount can retry.
 */
const isFallbackPalette = (colors: string[]): boolean => {
    const fallback = createFallbackPalette(PALETTE_COUNT);
    return colors.length === fallback.length &&
        colors.every((color, index) => color === fallback[index]);
};

export const loadPalette = (url: string): Promise<string[]> => {
    const cached = paletteCache.get(url);
    if (cached) return Promise.resolve(cached);

    const pending = paletteInFlight.get(url);
    if (pending) return pending;

    const request = extractThemeColors(PALETTE_COUNT, url, PALETTE_DIFFERENCE)
        .then(colors => {
            if (colors.length > 0 && !isFallbackPalette(colors)) paletteCache.set(url, colors);
            return colors;
        })
        .finally(() => {
            paletteInFlight.delete(url);
        });

    paletteInFlight.set(url, request);
    return request;
};

export const preloadPalette = (url?: string | null): void => {
    if (!url) return;
    void loadPalette(url).catch(() => undefined);
};
