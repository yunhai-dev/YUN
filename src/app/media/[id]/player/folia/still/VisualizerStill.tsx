// Vendored from Folia's src/components/visualizer/still/VisualizerStill.tsx (AGPL-3.0 — see
// ../LICENSE). Adaptations: the app-level shell and the subtitle-only props are dropped (the
// shell's font wrapper is inlined and translations are rendered from the lyrics theme).
import React, { useEffect, useState } from 'react';
import type { Line, Theme } from '../types';
import { resolveThemeFontStack, resolveThemeFontWeight, resolveThemeTranslationFontStack } from '../utils/fontStacks';

// src/components/visualizer/still/VisualizerStill.tsx
// Renders static lyrics inside the shared shell while leaving the background renderer unmounted.

interface VisualizerStillProps {
    currentLineIndex: number;
    lines: Line[];
    theme: Theme;
    showText?: boolean;
    lyricsFontScale?: number;
}

const VisualizerStill: React.FC<VisualizerStillProps> = ({
    currentLineIndex,
    lines,
    theme,
    showText = true,
    lyricsFontScale = 1,
}) => {
    const [effectiveIndex, setEffectiveIndex] = useState(() => Math.max(0, currentLineIndex));

    useEffect(() => {
        if (currentLineIndex !== -1) {
            setEffectiveIndex(currentLineIndex);
        } else if (effectiveIndex >= lines.length) {
            setEffectiveIndex(0);
        }
    }, [currentLineIndex, effectiveIndex, lines.length]);

    // What VisualizerShell normally provides for a style: the theme font and a full-stage box.
    const fontClassName = theme.fontStyle === 'mono'
        ? 'font-mono'
        : theme.fontStyle === 'serif'
            ? 'font-serif'
            : 'font-sans';

    return (
        <div
            className={`relative h-full w-full overflow-hidden ${fontClassName}`}
            style={{
                fontFamily: resolveThemeFontStack(theme),
                fontWeight: resolveThemeFontWeight(theme, 400),
            }}
        >
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.65] bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_100%)]"
            />

            {showText && (
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none px-12 pb-16 gap-8">
                    {[-1, 0, 1].map((offset) => {
                        const lineIndex = effectiveIndex + offset;
                        const line = lines[lineIndex];
                        if (!line) {
                            return <div key={`empty-${offset}`} className="h-20" />;
                        }

                        const isCurrent = offset === 0;
                        return (
                            <div key={lineIndex} className="flex flex-col items-center w-full max-w-4xl">
                                {line.fullText && (
                                    <div
                                        className={`drop-shadow-md text-center tracking-[0.02em] ${isCurrent ? 'text-[2.5rem] opacity-100 leading-tight' : 'text-3xl opacity-30'}`}
                                        style={{
                                            color: theme.primaryColor,
                                            fontFamily: resolveThemeFontStack(theme),
                                            scale: lyricsFontScale,
                                            fontWeight: resolveThemeFontWeight(theme, isCurrent ? 700 : 600),
                                        }}
                                    >
                                        {line.fullText}
                                    </div>
                                )}
                                {/* Still reads line.translation directly and ignores subtitleContentMode, so the 'both' option changes nothing here (phase 2). */}
                                {line.translation && (
                                    <div
                                        className={`drop-shadow-sm text-center tracking-wide ${isCurrent ? 'text-2xl opacity-80 mt-3' : 'text-xl opacity-30 mt-2'}`}
                                        style={{
                                            color: theme.secondaryColor,
                                            fontFamily: resolveThemeTranslationFontStack(theme),
                                            scale: lyricsFontScale,
                                            fontWeight: resolveThemeFontWeight(theme, isCurrent ? 500 : 400),
                                        }}
                                    >
                                        {line.translation}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default VisualizerStill;
