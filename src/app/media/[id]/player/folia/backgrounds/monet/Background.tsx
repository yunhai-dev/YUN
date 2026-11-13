import React from 'react';
import type { BackgroundRenderProps } from '../definition';
import MonetBackgroundLayer from './MonetBackgroundLayer';
import { DEFAULT_MONET_BACKGROUND_TUNING } from './tuning';

// Folia's "monet" shell background entry, reduced from
// components/visualizer/backgrounds/monet/entry.tsx to its render callback: this port has no
// i18n, settings card or custom image upload, so the tuning is fixed at the upstream defaults
// and the picture is always made from the cover.

const MonetBackground: React.FC<BackgroundRenderProps> = (props) => (
    <MonetBackgroundLayer
        coverUrl={props.coverUrl}
        theme={props.theme}
        isDaylight={props.isDaylight}
        tuning={DEFAULT_MONET_BACKGROUND_TUNING}
        staticMode={props.staticMode}
        transparentBackground={false}
    />
);

export default MonetBackground;
