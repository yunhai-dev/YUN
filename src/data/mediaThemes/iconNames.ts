/**
 * The closed vocabulary of Lucide icons a preset theme may use.
 *
 * Names are PascalCase on purpose: the visualizers compare and resolve icon names by exact
 * string, matching lucide-react's own exports. Every name here has a matching module at
 * `lucide-react/dist/esm/icons/<kebab>.js` (checked against the pinned 0.560.0).
 */
export const THEME_ICON_NAMES = [
    'Moon', 'MoonStar', 'Star', 'Sparkles', 'Sun', 'Cloud', 'CloudRain', 'CloudMoon',
    'CloudSun', 'Wind', 'Snowflake', 'Umbrella', 'Flower', 'Flower2', 'Leaf', 'Trees',
    'Cherry', 'Feather', 'Bird', 'Fish', 'Mountain', 'MountainSnow', 'Compass', 'Anchor',
    'Sailboat', 'Rocket', 'Waves', 'Flame', 'Clock', 'Hourglass', 'Music', 'Music2',
    'Heart', 'Smile', 'Cat', 'Rainbow', 'Store',
] as const;

export type ThemeIconName = (typeof THEME_ICON_NAMES)[number];
