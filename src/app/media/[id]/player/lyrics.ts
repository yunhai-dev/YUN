export interface LyricWord {
    time: number;
    text: string;
}

export interface LyricLine {
    time: number;
    text: string;
    /** Word-level timings from enhanced LRC (`<mm:ss.xx>`), when present. */
    words?: LyricWord[];
}

export interface TimedToken {
    key: string;
    text: string;
    start: number;
    end: number;
    isSpace: boolean;
}

const LINE_TIME_RE = /\[(?:(\d+):)?(\d+):(\d+(?:[.,]\d+)?)\]/g;
const WORD_TIME_RE = /<(?:(\d+):)?(\d+):(\d+(?:[.,]\d+)?)>/g;
// Legacy tolerance: some plain LRC files start a line with a bare `mm:ss.xx` timestamp.
const LEADING_TIME_RE = /^\s*(?:(\d+):)?(\d+):(\d+(?:[.,]\d+)?)/;

function toSeconds(hours: string | undefined, minutes: string, seconds: string): number {
    return (hours ? parseInt(hours, 10) : 0) * 3600
        + parseInt(minutes, 10) * 60
        + parseFloat(seconds.replace(',', '.'));
}

/**
 * Parse both plain LRC (`[mm:ss.xx]text`) and enhanced LRC
 * (`[mm:ss.xx]<mm:ss.xx>word<mm:ss.xx>word`).
 * Multiple line timestamps on one raw line expand into multiple lines.
 */
export function parseLyrics(raw: string): LyricLine[] {
    const result: LyricLine[] = [];

    for (const rawLine of raw.split(/\r?\n/)) {
        if (!rawLine.trim()) continue;

        const lineTimes: number[] = [];
        for (const match of rawLine.matchAll(LINE_TIME_RE)) {
            const time = toSeconds(match[1], match[2], match[3]);
            if (Number.isFinite(time)) lineTimes.push(time);
        }

        let body = rawLine.replace(LINE_TIME_RE, '');
        if (lineTimes.length === 0) {
            const lead = body.match(LEADING_TIME_RE);
            if (lead) {
                const time = toSeconds(lead[1], lead[2], lead[3]);
                if (Number.isFinite(time)) {
                    lineTimes.push(time);
                    body = body.slice(lead[0].length);
                }
            }
        }
        if (lineTimes.length === 0) continue;

        const wordMatches = [...body.matchAll(WORD_TIME_RE)];
        let text: string;
        let words: LyricWord[] | undefined;

        if (wordMatches.length > 0) {
            const parsedWords: LyricWord[] = [];
            const prefixRaw = body.slice(0, wordMatches[0].index ?? 0);
            const prefix = prefixRaw.trim();
            if (prefix) {
                parsedWords.push({
                    time: lineTimes[0],
                    text: /\s$/.test(prefixRaw) ? `${prefix} ` : prefix,
                });
            }

            for (let i = 0; i < wordMatches.length; i++) {
                const match = wordMatches[i];
                const start = (match.index ?? 0) + match[0].length;
                const end = i + 1 < wordMatches.length ? (wordMatches[i + 1].index ?? body.length) : body.length;
                const wordText = body.slice(start, end);
                if (!wordText.trim()) continue;

                const time = toSeconds(match[1], match[2], match[3]);
                if (Number.isFinite(time)) parsedWords.push({time, text: wordText});
            }

            if (parsedWords.length > 0) {
                words = parsedWords;
                text = parsedWords.map(word => word.text).join('').replace(/\s+/g, ' ').trim();
            } else {
                text = body.replace(WORD_TIME_RE, '').trim();
            }
        } else {
            text = body.trim();
        }

        if (!text) continue;

        lineTimes.forEach((time, index) => {
            // Word timings are absolute, so only the first timestamp can own them.
            result.push({time, text, words: index === 0 ? words : undefined});
        });
    }

    result.sort((a, b) => a.time - b.time);
    return result;
}

/** End of a lyric line: the next line's start, the track duration, or a safe fallback. */
export function getLineEndTime(lines: LyricLine[], index: number, duration = 0): number {
    const line = lines[index];
    if (!line) return 0;

    const next = lines[index + 1];
    if (next && next.time > line.time) return next.time;
    if (duration > line.time) return duration;
    return line.time + 6;
}

interface DisplayUnit {
    text: string;
    isSpace: boolean;
    weight: number;
}

const isCjk = (value: string) => /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(value);
const isPunctuation = (value: string) => /^[\p{P}\p{S}]+$/u.test(value);

/**
 * Split text into glow units: CJK becomes one token per character, Latin stays word-level.
 * Punctuation attaches to the previous token so it does not consume its own time slice.
 */
function splitDisplayUnits(text: string): DisplayUnit[] {
    const units: DisplayUnit[] = [];
    const segmenter = typeof Intl !== 'undefined' && Intl.Segmenter
        ? new Intl.Segmenter(undefined, {granularity: 'word'})
        : null;

    const segments = segmenter
        ? [...segmenter.segment(text)].map(part => part.segment)
        : text.split(/(\s+)/);

    for (const segment of segments) {
        if (!segment) continue;
        if (/^\s+$/.test(segment)) {
            units.push({text: ' ', isSpace: true, weight: 0});
            continue;
        }

        if (isCjk(segment)) {
            for (const char of Array.from(segment)) {
                units.push({text: char, isSpace: false, weight: 1});
            }
            continue;
        }

        if (isPunctuation(segment) && units.length > 0) {
            const previous = units[units.length - 1];
            if (!previous.isSpace) {
                previous.text += segment;
                previous.weight += 0.2;
                continue;
            }
        }

        units.push({
            text: segment,
            isSpace: false,
            weight: Math.max(1, Array.from(segment).length),
        });
    }

    return units;
}

/**
 * Build the per-token timeline for a line. Enhanced word timings are used when available;
 * otherwise the line's duration is distributed across its visible characters by weight.
 */
export function buildTimedTokens(line: LyricLine, lineEnd: number, lineIndex = 0): TimedToken[] {
    const tokens: TimedToken[] = [];
    const lineStart = line.time;
    const safeEnd = Math.max(lineEnd, lineStart + 0.4);
    let sequence = 0;

    const push = (text: string, start: number, end: number, isSpace: boolean) => {
        tokens.push({key: `${lineIndex}-${sequence++}`, text, start, end, isSpace});
    };

    const distribute = (units: DisplayUnit[], start: number, end: number) => {
        const duration = Math.max(0, end - start);
        const totalWeight = units.reduce((sum, unit) => sum + (unit.isSpace ? 0 : unit.weight), 0) || 1;
        let cursor = start;
        for (const unit of units) {
            if (unit.isSpace) {
                push(unit.text, cursor, cursor, true);
                continue;
            }
            const span = duration * (unit.weight / totalWeight);
            push(unit.text, cursor, cursor + span, false);
            cursor += span;
        }
    };

    if (line.words && line.words.length > 0) {
        const words = [...line.words].sort((a, b) => a.time - b.time);
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const start = Math.min(Math.max(word.time, lineStart), safeEnd);
            const nextTime = i + 1 < words.length ? words[i + 1].time : safeEnd;
            const end = Math.min(Math.max(nextTime, start), safeEnd);
            distribute(splitDisplayUnits(word.text), start, end);
        }
        return tokens;
    }

    distribute(splitDisplayUnits(line.text), lineStart, safeEnd);
    return tokens;
}

export function getTokenProgress(token: TimedToken, time: number): number {
    if (token.isSpace) return 0;
    const span = token.end - token.start;
    if (span <= 0) return time >= token.start ? 1 : 0;
    return Math.min(1, Math.max(0, (time - token.start) / span));
}
