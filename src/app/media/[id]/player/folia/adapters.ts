import type { MediaTheme } from '@/types/media';
import type { LyricLine, LyricWord } from '../lyrics';
import { mixHex, pickAccent, stageBackground } from '../visualizers/palette';
import type { Line, Theme, Word } from './types';
import { buildTimedWords, estimateLrcLineEndTime } from './utils/lyrics/estimatedLineTiming';
import { buildLineRenderHints } from './utils/lyrics/renderHints';

// Adapters between this project's LRC model (`LyricLine`) and Folia's visualizer model
// (`Line` / `Theme`). The vendored runtimes expect every line to carry concrete word timings
// and render hints, so the conversion happens once per lyric update rather than per frame.

const PLACEHOLDER_LYRICS = new Set(['暂无歌词', '歌词加载失败，请稍后重试']);

/** The single placeholder line `useLyrics` emits when a track has no lyrics / failed to load. */
export const getLyricsPlaceholder = (lyrics: LyricLine[]): string | null => (
    lyrics.length === 1 && PLACEHOLDER_LYRICS.has(lyrics[0].text.trim())
        ? lyrics[0].text.trim()
        : null
);

const buildWordTimings = (
    sourceWords: LyricWord[],
    lineStart: number,
    lineEnd: number,
    nextLineStart: number | undefined,
): {words: Word[]; endTime: number} => {
    const sorted = sourceWords
        .filter(word => word.text.length > 0)
        .map(word => ({...word, time: Math.max(word.time, lineStart)}))
        .sort((a, b) => a.time - b.time);

    if (sorted.length === 0) {
        return {words: [], endTime: lineEnd};
    }

    // The last enhanced-LRC word has no explicit end; give it a short tail but never run into
    // the next line's own timestamps.
    const lastStart = sorted[sorted.length - 1].time;
    const wordEnd = Math.min(
        Math.max(lineEnd, lastStart + 0.5),
        nextLineStart !== undefined ? Math.max(nextLineStart, lastStart) : Number.POSITIVE_INFINITY,
    );

    const words = sorted.map((word, index) => {
        const startTime = Math.min(word.time, wordEnd);
        const nextTime = index + 1 < sorted.length ? sorted[index + 1].time : wordEnd;
        return {
            text: word.text,
            startTime,
            endTime: Math.max(startTime, Math.min(nextTime, wordEnd)),
        };
    });

    return {words, endTime: Math.max(lineEnd, wordEnd)};
};

/**
 * Convert the player's parsed LRC into Folia lines.
 *
 * Enhanced LRC lines keep their authored word timings; plain LRC lines get evenly distributed
 * word timings via Folia's own estimator. `renderHints` are precomputed because both the Sonnet
 * program compiler and the Diorama scene read them while laying out / sequencing a line.
 */
export const toFoliaLines = (lyrics: LyricLine[], duration = 0): Line[] => {
    if (getLyricsPlaceholder(lyrics)) return [];

    const lines: Line[] = [];

    for (let index = 0; index < lyrics.length; index += 1) {
        const source = lyrics[index];
        const text = source.text.trim();
        if (!text) continue;

        const startTime = Math.max(0, source.time);
        const nextLineStart = lyrics[index + 1]?.time;
        let endTime = estimateLrcLineEndTime(text, startTime, nextLineStart);
        if (duration > startTime) endTime = Math.min(endTime, duration);

        let words: Word[];
        if (source.words && source.words.length > 0) {
            const timings = buildWordTimings(source.words, startTime, endTime, nextLineStart);
            words = timings.words;
            endTime = timings.endTime;
        } else {
            words = buildTimedWords(text, startTime, endTime);
        }

        const line = {words, startTime, endTime, fullText: text};
        lines.push({...line, renderHints: buildLineRenderHints(line)});
    }

    return lines;
};

/**
 * Build the Folia theme from the track's preset (or, for a track without one, the cover-derived
 * palette used by the other player styles). `palette[4]` is the authored accent: preset colors
 * are chosen for readability on the dark end of the palette, while a cover palette still goes
 * through `pickAccent`.
 */
export const toFoliaTheme = (palette: string[], preset?: MediaTheme | null): Theme => {
    const accentColor = preset?.palette[4] ?? pickAccent(palette, '#d8b66a');

    return {
        name: preset?.name ?? 'YUN',
        description: preset?.description,
        backgroundColor: stageBackground(palette),
        primaryColor: '#f2f5fb',
        accentColor,
        secondaryColor: mixHex('#c8d3e6', accentColor, 0.35),
        fontStyle: preset?.fontStyle ?? 'sans',
        fontWeight: preset?.fontWeight,
        animationIntensity: preset?.animationIntensity ?? 'normal',
        wordColors: preset?.wordColors,
        lyricsIcons: preset?.lyricsIcons,
        provider: preset ? 'preset' : undefined,
    };
};
