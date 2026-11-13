/**
 * lucide-react ships a single bundle declaration (`dist/lucide-react.d.ts`); the per-icon ESM
 * modules under `dist/esm/icons/` have no declarations of their own. The theme icon resolver
 * imports exactly those modules to get each icon's raw `__iconNode`, so declare their shape.
 */
declare module 'lucide-react/dist/esm/icons/*.js' {
    import type { IconNode, LucideIcon } from 'lucide-react';

    export const __iconNode: IconNode;
    const Icon: LucideIcon;
    export default Icon;
}
