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
import { fileURLToPath } from 'node:url';
import {
    toKebab,
    readThemeIconNames,
    readBatchThemes,
    validateTheme,
} from './lib/mediaThemes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const themeDir = path.join(root, 'src/data/mediaThemes');
const mediaPath = path.join(root, 'src/data/media.ts');

const errors = [];
const fail = (file, id, field, message) => {
    errors.push(`${file}${id ? ` [${id}]` : ''} ${field}: ${message}`);
};

// --- reference data -------------------------------------------------------------------------

const trackIds = [...fs.readFileSync(mediaPath, 'utf8')
    .matchAll(/^ {4}id: "([^"]+)"/gm)]
    .map(match => match[1]);
const trackIdSet = new Set(trackIds);

const iconNames = readThemeIconNames(themeDir);
if (!iconNames) {
    console.error('✗ cannot locate THEME_ICON_NAMES in iconNames.ts');
    process.exit(1);
}
const iconSet = new Set(iconNames);

for (const name of iconNames) {
    const modulePath = path.join(root, 'node_modules/lucide-react/dist/esm/icons', `${toKebab(name)}.js`);
    if (!fs.existsSync(modulePath)) {
        fail('iconNames.ts', '', 'lyricsIcons', `no module for ${name} (${toKebab(name)}.js)`);
    }
}

// --- collect the batch records --------------------------------------------------------------

const { themes, fileById, errors: batchErrors } = readBatchThemes(themeDir);
errors.push(...batchErrors);

// --- validate -------------------------------------------------------------------------------

for (const [id, theme] of themes) {
    const file = fileById.get(id);

    if (!trackIdSet.has(id)) fail(file, id, 'id', 'not present in src/data/media.ts');
    for (const { field, message } of validateTheme(theme, { icons: iconSet })) {
        fail(file, id, field, message);
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
