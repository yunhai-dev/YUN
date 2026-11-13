import React from 'react';
import type { BackgroundRenderProps } from '../definition';
import NomandBackgroundLayer from './NomandBackgroundLayer';

// src/components/visualizer/backgrounds/nomand/entry.tsx
// Registers the roaming ("漫游") shell background.
// This port keeps only upstream's cover-derived render pass with upstream's default tuning
// (dithering): the effect picker, settings card and custom image upload stay upstream.

const NomandBackground: React.FC<BackgroundRenderProps> = (props) => (
    <NomandBackgroundLayer
        coverUrl={props.coverUrl}
        theme={props.theme}
        isDaylight={props.isDaylight}
    />
);

export default NomandBackground;
