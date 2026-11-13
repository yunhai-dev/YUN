import type { MediaTheme } from '@/types/media';
import type { ThemeIconName } from './iconNames';

/**
 * A `MediaTheme` whose icons are guaranteed to be in the shipped vocabulary, so a typo in a
 * batch file fails compilation instead of silently dropping the icon at runtime.
 */
export type MediaThemePreset = Omit<MediaTheme, 'lyricsIcons'> & {
    lyricsIcons: ThemeIconName[];
};
