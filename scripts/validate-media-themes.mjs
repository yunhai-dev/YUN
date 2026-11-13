#!/usr/bin/env node
/**
 * Validates the preset Folia themes in src/data/mediaThemes/batch-*.ts.
 *
 * The batch files are TypeScript but contain only `import type` plus a plain object literal, so
 * transpiling them to CommonJS and evaluating them here is enough — no build and no bundler.
 * Run after a batch fan-out: `node scripts/validate-media-themes.mjs`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const themeDir = path.join(root, 'src/data/mediaThemes');
const mediaPath = path.join(root, 'src/data/media.ts');

const errors = [];
const fail = (file, id, field, message) => {
    errors.push(`${file}${id ? ` [${id}]` : ''} ${field}: ${message}`);
};

const HEX = /^#[0-9a-f]{6}$/;
const HAN_ONLY = /^\p{Script=Han}{2,6}$/u;

const hanCount = text => (text.match(/\p{Script=Han}/gu) ?? []).length;

const srgbChannel = value => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
};

const luminance = hex => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b);
};

const contrast = (a, b) => {
    const la = luminance(a);
    const lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

// --- reference data -------------------------------------------------------------------------

const trackIds = [...fs.readFileSync(mediaPath, 'utf8')
    .matchAll(/^ {4}id: "([^"]+)"/gm)]
    .map(match => match[1]);
const trackIdSet = new Set(trackIds);

const iconSource = fs.readFileSync(path.join(themeDir, 'iconNames.ts'), 'utf8');
const iconBlock = iconSource.match(/THEME_ICON_NAMES\s*=\s*\[([\s\S]*?)\]\s*as const/);
if (!iconBlock) {
    console.error('✗ cannot locate THEME_ICON_NAMES in iconNames.ts');
    process.exit(1);
}
const iconNames = [...iconBlock[1].matchAll(/'([^']+)'/g)].map(match => match[1]);
const iconSet = new Set(iconNames);

const toKebab = name => name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase();

for (const name of iconNames) {
    const modulePath = path.join(root, 'node_modules/lucide-react/dist/esm/icons', `${toKebab(name)}.js`);
    if (!fs.existsSync(modulePath)) {
        fail('iconNames.ts', '', 'lyricsIcons', `no module for ${name} (${toKebab(name)}.js)`);
    }
}

// --- collect the batch records --------------------------------------------------------------

const batchFiles = fs.readdirSync(themeDir)
    .filter(file => /^batch-\d+\.ts$/.test(file))
    .sort();

const themes = new Map();
const fileById = new Map();

for (const file of batchFiles) {
    const source = fs.readFileSync(path.join(themeDir, file), 'utf8');
    const output = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2020,
        },
        fileName: file,
    }).outputText;

    const mod = { exports: {} };
    try {
        new Function('exports', 'module', output)(mod.exports, mod);
    } catch (error) {
        fail(file, '', 'syntax', `cannot evaluate: ${error.message}`);
        continue;
    }

    const records = Object.values(mod.exports);
    if (records.length !== 1 || !records[0] || typeof records[0] !== 'object') {
        fail(file, '', 'export', 'expected exactly one exported record');
        continue;
    }

    for (const [id, theme] of Object.entries(records[0])) {
        if (themes.has(id)) {
            fail(file, id, 'duplicate', `already defined in ${fileById.get(id)}`);
            continue;
        }
        themes.set(id, theme);
        fileById.set(id, file);
    }
}

// --- validate -------------------------------------------------------------------------------

for (const [id, theme] of themes) {
    const file = fileById.get(id);

    if (!trackIdSet.has(id)) fail(file, id, 'id', 'not present in src/data/media.ts');
    if (!theme || typeof theme !== 'object') {
        fail(file, id, 'theme', 'not an object');
        continue;
    }

    if ('provider' in theme) fail(file, id, 'provider', 'must not be present (the adapter sets it)');

    if (typeof theme.name !== 'string' || !HAN_ONLY.test(theme.name)) {
        fail(file, id, 'name', 'expected 2–6 Han characters');
    }
    if (typeof theme.description !== 'string' || hanCount(theme.description) < 12 || hanCount(theme.description) > 24) {
        fail(file, id, 'description', 'expected 12–24 Han characters');
    }

    const palette = theme.palette;
    if (!Array.isArray(palette) || palette.length !== 6) {
        fail(file, id, 'palette', 'expected exactly 6 colors');
    } else {
        palette.forEach((color, index) => {
            if (typeof color !== 'string' || !HEX.test(color)) {
                fail(file, id, `palette[${index}]`, `expected lowercase #rrggbb, got ${color}`);
            }
        });
        if (palette.every(color => typeof color === 'string' && HEX.test(color)) &&
            contrast(palette[4], palette[0]) < 3) {
            fail(file, id, 'palette[4]', 'accent contrast against palette[0] is below 3:1');
        }
    }

    if (!['sans', 'serif', 'mono'].includes(theme.fontStyle)) {
        fail(file, id, 'fontStyle', `unexpected ${theme.fontStyle}`);
    }
    if (!Number.isInteger(theme.fontWeight) || theme.fontWeight < 100 || theme.fontWeight > 900 || theme.fontWeight % 100 !== 0) {
        fail(file, id, 'fontWeight', `unexpected ${theme.fontWeight}`);
    }
    if (!['calm', 'normal', 'chaotic'].includes(theme.animationIntensity)) {
        fail(file, id, 'animationIntensity', `unexpected ${theme.animationIntensity}`);
    }

    const wordColors = theme.wordColors;
    if (!Array.isArray(wordColors) || wordColors.length < 3 || wordColors.length > 5) {
        fail(file, id, 'wordColors', 'expected 3–5 entries');
    } else {
        const seenWords = new Set();
        for (const entry of wordColors) {
            if (!entry || typeof entry.word !== 'string' || entry.word.length === 0) {
                fail(file, id, 'wordColors', 'entry without a word');
                continue;
            }
            if (seenWords.has(entry.word)) fail(file, id, 'wordColors', `duplicate word ${entry.word}`);
            seenWords.add(entry.word);

            if (typeof entry.color !== 'string' || !HEX.test(entry.color)) {
                fail(file, id, 'wordColors', `${entry.word} has invalid color ${entry.color}`);
            } else if (Array.isArray(palette) && typeof palette[0] === 'string' && HEX.test(palette[0]) &&
                contrast(entry.color, palette[0]) < 3) {
                fail(file, id, 'wordColors', `${entry.word} contrast against palette[0] is below 3:1`);
            }
        }
    }

    const lyricsIcons = theme.lyricsIcons;
    if (!Array.isArray(lyricsIcons) || lyricsIcons.length < 2 || lyricsIcons.length > 4) {
        fail(file, id, 'lyricsIcons', 'expected 2–4 entries');
    } else {
        const seenIcons = new Set();
        for (const name of lyricsIcons) {
            if (!iconSet.has(name)) fail(file, id, 'lyricsIcons', `unknown icon ${name}`);
            if (seenIcons.has(name)) fail(file, id, 'lyricsIcons', `duplicate icon ${name}`);
            seenIcons.add(name);
        }
    }
}

const missing = trackIds.filter(id => !themes.has(id));
for (const id of missing) fail('mediaThemes', id, 'coverage', 'no preset theme');

const extra = [...themes.keys()].filter(id => !trackIdSet.has(id));

if (errors.length > 0) {
    console.error(`✗ ${errors.length} problem(s)`);
    for (const message of errors) console.error(`  ${message}`);
    process.exit(1);
}

console.log(`✓ ${themes.size}/${trackIds.length} themes (${extra.length} extras), ${iconNames.length} icon names, all checks passed`);
