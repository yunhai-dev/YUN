/**
 * Shared parsing and validation for the preset Folia themes.
 *
 * Used by `scripts/validate-media-themes.mjs` (checks every batch) and
 * `scripts/generate-media-themes.mjs` (validates model output before writing `batch-auto.ts`),
 * so both enforce exactly the same rules.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ts = require('typescript');

export const HEX = /^#[0-9a-f]{6}$/;
export const HAN_ONLY = /^\p{Script=Han}{2,6}$/u;

export const hanCount = text => (text.match(/\p{Script=Han}/gu) ?? []).length;

const srgbChannel = value => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
};

export const luminance = hex => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b);
};

export const contrast = (a, b) => {
    const la = luminance(a);
    const lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

export const toKebab = name => name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase();

/** Reads `THEME_ICON_NAMES` from iconNames.ts; null when the block cannot be located. */
export const readThemeIconNames = themeDir => {
    const source = fs.readFileSync(path.join(themeDir, 'iconNames.ts'), 'utf8');
    const block = source.match(/THEME_ICON_NAMES\s*=\s*\[([\s\S]*?)\]\s*as const/);
    return block ? [...block[1].matchAll(/'([^']+)'/g)].map(match => match[1]) : null;
};

/**
 * Transpiles and evaluates every `batch-*.ts` file (they only contain `import type` plus one
 * plain record) and merges the records.
 */
export const readBatchThemes = themeDir => {
    const files = fs.readdirSync(themeDir)
        .filter(file => /^batch-[\w-]+\.ts$/.test(file))
        .sort();

    const themes = new Map();
    const fileById = new Map();
    const errors = [];

    for (const file of files) {
        const source = fs.readFileSync(path.join(themeDir, file), 'utf8');
        let output;
        try {
            output = ts.transpileModule(source, {
                compilerOptions: {
                    module: ts.ModuleKind.CommonJS,
                    target: ts.ScriptTarget.ES2020,
                },
                fileName: file,
            }).outputText;
        } catch (error) {
            errors.push(`${file} syntax: cannot transpile: ${error.message}`);
            continue;
        }

        const mod = { exports: {} };
        try {
            new Function('exports', 'module', output)(mod.exports, mod);
        } catch (error) {
            errors.push(`${file} syntax: cannot evaluate: ${error.message}`);
            continue;
        }

        const records = Object.values(mod.exports);
        if (records.length !== 1 || !records[0] || typeof records[0] !== 'object') {
            errors.push(`${file} export: expected exactly one exported record`);
            continue;
        }

        for (const [id, theme] of Object.entries(records[0])) {
            if (themes.has(id)) {
                errors.push(`${file} [${id}] duplicate: already defined in ${fileById.get(id)}`);
                continue;
            }
            themes.set(id, theme);
            fileById.set(id, file);
        }
    }

    return { files, themes, fileById, errors };
};

const LATIN_WORD = /^[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*$/;

/**
 * The player strips line tags and per-glyph word tags before matching keywords, so this must
 * too: enriched LRC separates CJK glyphs (`古<00:20.45>筝`), which would hide `古筝` otherwise.
 */
const plainLyrics = lrc => lrc
    .replace(/<[^<>]*>/g, '')
    .replace(/\[[^\]]*\]/g, '\n');

/** Chinese keywords match as a substring; Latin keywords match as a whole word. */
export const wordAppearsInLyrics = (word, lrc) => {
    if (!word) return false;
    const text = plainLyrics(lrc);
    if (!LATIN_WORD.test(word)) return text.includes(word);
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`, 'i').test(text);
};

/**
 * Checks one theme record. Returns `{field, message}` pairs; empty when valid.
 * Pass `icons` to check the icon vocabulary and `lrc` to require keyword colors to be real
 * lyrics words (the generator does; the batch validator skips it because it never fetches LRC).
 */
export const validateTheme = (theme, { icons, lrc } = {}) => {
    const errors = [];
    const fail = (field, message) => errors.push({ field, message });

    if (!theme || typeof theme !== 'object') {
        fail('theme', 'not an object');
        return errors;
    }

    if ('provider' in theme) fail('provider', 'must not be present (the adapter sets it)');

    if (typeof theme.name !== 'string' || !HAN_ONLY.test(theme.name)) {
        fail('name', 'expected 2–6 Han characters');
    }
    if (typeof theme.description !== 'string' || hanCount(theme.description) < 12 || hanCount(theme.description) > 24) {
        fail('description', 'expected 12–24 Han characters');
    }

    const palette = theme.palette;
    if (!Array.isArray(palette) || palette.length !== 6) {
        fail('palette', 'expected exactly 6 colors');
    } else {
        palette.forEach((color, index) => {
            if (typeof color !== 'string' || !HEX.test(color)) {
                fail(`palette[${index}]`, `expected lowercase #rrggbb, got ${color}`);
            }
        });
        if (palette.every(color => typeof color === 'string' && HEX.test(color)) &&
            contrast(palette[4], palette[0]) < 3) {
            fail('palette[4]', 'accent contrast against palette[0] is below 3:1');
        }
    }

    if (!['sans', 'serif', 'mono'].includes(theme.fontStyle)) {
        fail('fontStyle', `unexpected ${theme.fontStyle}`);
    }
    if (!Number.isInteger(theme.fontWeight) || theme.fontWeight < 100 || theme.fontWeight > 900 || theme.fontWeight % 100 !== 0) {
        fail('fontWeight', `unexpected ${theme.fontWeight}`);
    }
    if (!['calm', 'normal', 'chaotic'].includes(theme.animationIntensity)) {
        fail('animationIntensity', `unexpected ${theme.animationIntensity}`);
    }

    const wordColors = theme.wordColors;
    if (!Array.isArray(wordColors) || wordColors.length < 3 || wordColors.length > 5) {
        fail('wordColors', 'expected 3–5 entries');
    } else {
        const seenWords = new Set();
        for (const entry of wordColors) {
            if (!entry || typeof entry.word !== 'string' || entry.word.length === 0) {
                fail('wordColors', 'entry without a word');
                continue;
            }
            if (seenWords.has(entry.word)) fail('wordColors', `duplicate word ${entry.word}`);
            seenWords.add(entry.word);

            if (typeof entry.color !== 'string' || !HEX.test(entry.color)) {
                fail('wordColors', `${entry.word} has invalid color ${entry.color}`);
            } else if (Array.isArray(palette) && typeof palette[0] === 'string' && HEX.test(palette[0]) &&
                contrast(entry.color, palette[0]) < 3) {
                fail('wordColors', `${entry.word} contrast against palette[0] is below 3:1`);
            }
            if (lrc && !wordAppearsInLyrics(entry.word, lrc)) {
                fail('wordColors', `${entry.word} does not appear in the lyrics`);
            }
        }
    }

    const lyricsIcons = theme.lyricsIcons;
    if (!Array.isArray(lyricsIcons) || lyricsIcons.length < 2 || lyricsIcons.length > 4) {
        fail('lyricsIcons', 'expected 2–4 entries');
    } else {
        if (icons) {
            const seenIcons = new Set();
            for (const name of lyricsIcons) {
                if (!icons.has(name)) fail('lyricsIcons', `unknown icon ${name}`);
                if (seenIcons.has(name)) fail('lyricsIcons', `duplicate icon ${name}`);
                seenIcons.add(name);
            }
        }
    }

    return errors;
};
