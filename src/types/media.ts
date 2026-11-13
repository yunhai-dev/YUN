export interface MediaItem {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  musicUrl: string;
  lyricsUrl?: string;
}

/**
 * A preset Folia lyric theme, one per built-in track.
 *
 * The shape mirrors Folia's `Theme` (`player/folia/types.ts`) so the adapter can map it
 * directly: 17 lyric styles and 6 backdrop layers read these fields. Colors are authored to
 * stay readable on the dark end of `palette`.
 */
export interface MediaTheme {
  /** 2–6 个汉字；商籁片尾「[ THEME ] 名称」与町景店招使用。 */
  name: string;
  /** 12–24 个汉字，一句意境。 */
  description: string;
  /** [0] 最深 … [4] 强调 … [5] 高光，6 个 6 位小写 hex。 */
  palette: [string, string, string, string, string, string];
  fontStyle: 'sans' | 'serif' | 'mono';
  /** 100–900，步进 100。 */
  fontWeight: number;
  animationIntensity: 'calm' | 'normal' | 'chaotic';
  /** 3–5 个歌词关键词 → 颜色；中文整句子串匹配，英文按整词匹配。 */
  wordColors: Array<{ word: string; color: string }>;
  /** Lucide 图标名（PascalCase，取自 `THEME_ICON_NAMES`）。 */
  lyricsIcons: string[];
}
