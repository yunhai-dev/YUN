import type { ReactNode } from 'react';
import { PlaybackProvider } from './[id]/player/playback/PlaybackProvider';
import { VisualizerStageProvider } from './[id]/player/styles/VisualizerStageProvider';
import { MediaFlightBridge } from './MediaFlightBridge';

const MediaLayout = ({children}: {children: ReactNode}) => (
    <PlaybackProvider>
        <VisualizerStageProvider>
            <MediaFlightBridge />
            {children}
        </VisualizerStageProvider>
    </PlaybackProvider>
);

export default MediaLayout;
