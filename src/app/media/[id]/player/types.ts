import { MediaItem } from '@/types/media';
import { RefObject } from 'react';
import { LyricLine } from './hooks/useLyrics';

export interface AudioState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    autoPlay: boolean;
}

export interface AudioControls {
    togglePlay: () => void;
    seek: (time: number) => void;
    setAutoPlay: (autoPlay: boolean) => void;
    play: () => Promise<void>;
    pause: () => void;
    clearState: () => void;
}

export interface PlayerStyleProps {
    musicItem: MediaItem;
    audioRef: RefObject<HTMLAudioElement>;
    audioState: AudioState;
    controls: AudioControls;
    forwardId: string;
    backwardId: string;
    lyrics: LyricLine[];
    onToggleStyle: () => void;
}
