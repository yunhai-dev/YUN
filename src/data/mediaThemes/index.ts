import { batch01 } from './batch-01';
import { batch02 } from './batch-02';
import { batch03 } from './batch-03';
import { batch04 } from './batch-04';
import { batch05 } from './batch-05';
import { batch06 } from './batch-06';
import { batch07 } from './batch-07';
import { batch08 } from './batch-08';
import { batch09 } from './batch-09';
import { batch10 } from './batch-10';
import type { MediaThemePreset } from './types';

export type { MediaThemePreset } from './types';
export { THEME_ICON_NAMES, type ThemeIconName } from './iconNames';

/** Every built-in track's preset theme, keyed by media id. */
export const mediaThemes: Record<string, MediaThemePreset> = {
    ...batch01,
    ...batch02,
    ...batch03,
    ...batch04,
    ...batch05,
    ...batch06,
    ...batch07,
    ...batch08,
    ...batch09,
    ...batch10,
};

export const getMediaTheme = (id?: string | null): MediaThemePreset | undefined => (
    id ? mediaThemes[id] : undefined
);
