"use client";

import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Line, Theme } from './types';
import { colorWithAlpha } from './backgrounds/colorMix';

interface FoliaSubtitleProps {
    lines: Line[];
    currentTime: number;
    theme: Theme;
    /** True while the player chrome is expanded or a panel covers the stage: the subtitle yields to it. */
    hidden: boolean;
}

// How long a finished line stays as the bottom subtitle through an instrumental gap, as upstream's
// overlay keeps showing the line that just went by instead of a hole.
const GAP_HOLD_SECONDS = 8;
// Folia's player bottom bar sits 32px off the viewport bottom and its subtitle keeps 80px above
// it, so the subtitle line rests 112px up (utils/playerBottomBarLayout.ts).
const SUBTITLE_BOTTOM_PX = 112;

const resolveSubtitleLine = (lines: Line[], time: number): Line | null => {
    let low = 0;
    let high = lines.length - 1;
    let index = -1;

    while (low <= high) {
        const middle = (low + high) >> 1;
        if (lines[middle].startTime <= time) {
            index = middle;
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }

    if (index < 0) return null;
    const line = lines[index];
    if (time > line.endTime + GAP_HOLD_SECONDS) return null;
    return line;
};

/**
 * Folia's shared bottom subtitle: the line on screen (or the one that just finished) under the
 * stage, above the player pill. Styles that draw their own lyrics keep it too, as upstream does.
 */
export const FoliaSubtitle = ({lines, currentTime, theme, hidden}: FoliaSubtitleProps) => {
    const line = useMemo(() => resolveSubtitleLine(lines, currentTime), [lines, currentTime]);
    const text = line?.fullText.trim() ?? '';

    return (
        <div
            className="pointer-events-none absolute inset-x-0 z-10 px-4 text-center"
            style={{bottom: SUBTITLE_BOTTOM_PX}}
            aria-hidden="true"
        >
            <AnimatePresence mode="wait" initial={false}>
                {text ? (
                    <motion.p
                        key={line?.startTime ?? 0}
                        initial={{opacity: 0, y: 14}}
                        animate={{opacity: hidden ? 0 : 0.92, y: 0}}
                        exit={{opacity: 0, y: 10}}
                        transition={{duration: 0.28, ease: 'easeOut'}}
                        className="relative isolate mx-auto inline-block max-w-3xl px-2 py-1 text-[15px] font-medium leading-6 tracking-wide md:text-base"
                        style={{
                            color: theme.secondaryColor,
                            textShadow: `0 1px 2px ${colorWithAlpha(theme.backgroundColor, 0.28)}`,
                        }}
                    >
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-x-10 -inset-y-5 -z-10 blur-2xl"
                            style={{
                                background: `radial-gradient(ellipse 115% 130% at center, ${colorWithAlpha(theme.backgroundColor, 0.9)} 0%, ${colorWithAlpha(theme.backgroundColor, 0.7)} 62%, transparent 100%)`,
                            }}
                        />
                        {text}
                    </motion.p>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default FoliaSubtitle;
