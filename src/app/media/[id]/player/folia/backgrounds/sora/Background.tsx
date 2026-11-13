import React from 'react';
import type { BackgroundRenderProps } from '../definition';
import SoraBackground from './SoraBackground';
import { DEFAULT_SORA_BACKGROUND_TUNING } from './tuning';

// Folia's "sora" shell background entry, reduced from
// components/visualizer/backgrounds/sora/entry.tsx to its render callback: this port has no
// i18n, settings card or quick controls, so the tuning is fixed at the upstream defaults.
// Blank mode never mounts the WebGL canvas: just a static black (night) / white (daylight) frame.
// Static mode intentionally freezes the starfield, matching the shared background contract.

const tuning = DEFAULT_SORA_BACKGROUND_TUNING;

const SoraBackgroundLayer: React.FC<BackgroundRenderProps> = ({
    theme,
    isDaylight,
    paused,
    staticMode,
    blendMs,
}) => (
    <div className="absolute inset-0 z-0" style={{backgroundColor: isDaylight ? '#ffffff' : '#000000'}}>
        {!tuning.blank && (
            <SoraBackground
                theme={theme}
                isDaylight={isDaylight}
                paused={paused || staticMode}
                blendMs={blendMs}
            />
        )}
    </div>
);

export default SoraBackgroundLayer;
