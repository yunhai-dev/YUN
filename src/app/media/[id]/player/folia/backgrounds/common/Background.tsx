import React from 'react';
import type { BackgroundRenderProps } from '../definition';
import FluidBackground from './FluidBackground';
import GeometricBackground from './GeometricBackground';

// src/components/visualizer/backgrounds/common/entry.tsx (render only)
// Upstream reads the layout options from the visualizer config; this port has no settings panel,
// so it renders the upstream defaults: cover colours off, shapes and vignette on.

const CommonBackground: React.FC<BackgroundRenderProps> = (props) => {
    const {theme, coverUrl, audioPower, audioBands, seed, staticMode, paused} = props;
    // config?.common?.useCoverColorBg ?? false
    const useCoverColorBg = false;

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Shown at once: turning the cover colours on or off is a change of `song`, played by the
                background layer around it. */}
            {useCoverColorBg && (
                <div className="absolute inset-0 z-0">
                    <FluidBackground coverUrl={coverUrl} theme={theme} />
                </div>
            )}
            <div
                className="absolute inset-0 z-0 transition-all duration-1000"
                style={{
                    backgroundColor: theme.backgroundColor,
                    opacity: useCoverColorBg ? 0.75 : 1,
                }}
            />
            {!staticMode && (
                <div className="absolute inset-0 z-0">
                    <GeometricBackground
                        theme={theme}
                        audioPower={audioPower}
                        audioBands={audioBands}
                        seed={seed}
                        hideShapes={false}
                        disableVignette={false}
                        paused={paused}
                    />
                </div>
            )}
        </div>
    );
};

export default CommonBackground;
