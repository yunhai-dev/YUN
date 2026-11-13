"use client";

import React from 'react';
import {notFound} from 'next/navigation';
import {MediaItem} from '@/types/media';
import {getAllMediaItems} from "@/data/media";
import {useAudio} from './player/hooks/useAudio';
import {useLyrics} from './player/hooks/useLyrics';
import {VisualizerPlayer} from './player/styles/VisualizerPlayer';

interface Props {
    musicItem: MediaItem | undefined;
}

const MusicDetail = ({musicItem}: Props) => {
    if (!musicItem) {
        notFound();
    }

    const {lyricsUrl, id} = musicItem;
    const musicItems = getAllMediaItems();
    const selfIndex = musicItems.findIndex((item) => item.id === id);

    const forwardId = selfIndex < musicItems.length - 1 ? musicItems[selfIndex + 1].id : musicItems[0].id;
    const backwardId = selfIndex > 0 ? musicItems[selfIndex - 1].id : musicItems[musicItems.length - 1].id;

    const { audioRef, audioState, controls } = useAudio(musicItem, forwardId, backwardId);
    const lyrics = useLyrics(lyricsUrl);

    return (
        <>
            <VisualizerPlayer
                musicItem={musicItem}
                audioRef={audioRef}
                audioState={audioState}
                controls={controls}
                forwardId={forwardId}
                backwardId={backwardId}
                lyrics={lyrics}
            />
        </>
    );
};

export default MusicDetail;

