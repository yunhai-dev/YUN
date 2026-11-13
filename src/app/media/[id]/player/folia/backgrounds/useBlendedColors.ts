import { useEffect, useMemo, useRef, useState } from 'react';
import { mixColors } from './colorMix';

// Copied from Folia's backgrounds/useBlendedColors.ts without the song-handoff progress input:
// this port has no style transitions, so colours blend over `durationMs` from the moment they
// change. The drawn colours are blended from what is on screen, so a second change mid-blend
// carries on from there.

const easeOut = (t: number) => 1 - (1 - t) ** 3;

const sameColors = (left: readonly string[], right: readonly string[]) => (
    left.length === right.length && left.every((color, index) => color === right[index])
);

export const useBlendedColors = (
    colors: readonly string[],
    durationMs: number,
): readonly string[] => {
    const key = colors.join('|');
    // The same array while the colours stay the same, though `colors` is a new one each render.
    const target = useMemo(() => key.split('|'), [key]);
    const [drawn, setDrawn] = useState<readonly string[]>(target);
    // What is on screen now, also partway through a blend, so a new change blends on from there.
    const drawnRef = useRef<readonly string[]>(target);

    useEffect(() => {
        const from = drawnRef.current;
        const show = (next: readonly string[]) => {
            drawnRef.current = next;
            setDrawn(next);
        };
        if (sameColors(from, target)) return undefined;
        if (durationMs <= 0 || from.length !== target.length) {
            show(target);
            return undefined;
        }
        const mixed = (t: number) => (t >= 1 ? target : target.map((to, index) => mixColors(from[index], to, t)));
        const startedAt = performance.now();
        let frame = 0;
        const step = (now: number) => {
            const t = Math.min(1, (now - startedAt) / durationMs);
            show(mixed(t >= 1 ? 1 : easeOut(t)));
            if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [target, durationMs]);

    return durationMs <= 0 ? target : drawn;
};
