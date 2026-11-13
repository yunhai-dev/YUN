import React from 'react';
import type { BackgroundRenderProps } from '../definition';
import UrlBackgroundLayer from './UrlBackgroundLayer';

// src/components/visualizer/backgrounds/url/entry.tsx
// Registers the embedded webpage shell background.
// This port keeps only upstream's render pass: the settings card, command and glyph stay upstream.

const UrlBackground: React.FC<BackgroundRenderProps> = (props) => (
    <UrlBackgroundLayer
        urlBackgroundList={props.urlBackgroundList ?? []}
        urlBackgroundSelectedId={props.urlBackgroundSelectedId ?? null}
    />
);

export default UrlBackground;
