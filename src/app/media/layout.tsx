import type { ReactNode } from 'react';
import { PlaybackProvider } from './[id]/player/playback/PlaybackProvider';
import { MediaFlightBridge } from './MediaFlightBridge';

const MediaLayout = ({children}: {children: ReactNode}) => (
    <PlaybackProvider>
        <MediaFlightBridge />
        {children}
    </PlaybackProvider>
);

export default MediaLayout;
