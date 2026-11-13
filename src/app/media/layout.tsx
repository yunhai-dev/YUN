import type { ReactNode } from 'react';
import { PlaybackProvider } from './[id]/player/playback/PlaybackProvider';

const MediaLayout = ({children}: {children: ReactNode}) => (
    <PlaybackProvider>{children}</PlaybackProvider>
);

export default MediaLayout;
