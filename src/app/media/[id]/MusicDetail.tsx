"use client";

import React from 'react';
import { notFound } from 'next/navigation';
import { MediaItem } from '@/types/media';
import { getAllMediaItems } from "@/data/media";
import { useAudio } from './player/hooks/useAudio';
import { useLyrics } from './player/hooks/useLyrics';
import { ImmersivePlayer } from './player/styles/ImmersivePlayer';
import { AppleMusicPlayer } from './player/styles/AppleMusicPlayer';
import { useState, useEffect } from 'react';
import { LayoutTemplate } from 'lucide-react';

interface Props {
    musicItem: MediaItem | undefined;
}

const MusicDetail = ({musicItem}: Props) => {
    if (!musicItem) {
        notFound();
    }

    const {title, imageUrl, author, musicUrl, lyricsUrl, id} = musicItem;
    const musicItems = getAllMediaItems();
    const selfIndex = musicItems.findIndex((item) => item.id === id);

    const forwardId = selfIndex < musicItems.length - 1 ? musicItems[selfIndex + 1].id : musicItems[0].id;
    const backwardId = selfIndex > 0 ? musicItems[selfIndex - 1].id : musicItems[musicItems.length - 1].id;

    const { audioRef, audioState, controls } = useAudio(musicUrl, title, author, imageUrl, forwardId, backwardId);
    const lyrics = useLyrics(lyricsUrl);
    const [playerStyle, setPlayerStyle] = useState<'immersive' | 'apple'>('immersive');

    useEffect(() => {
        const savedStyle = localStorage.getItem('player-style') as 'immersive' | 'apple';
        if (savedStyle) {
            setPlayerStyle(savedStyle);
        }
    }, []);

    const toggleStyle = () => {
        setPlayerStyle(prev => {
            const newStyle = prev === 'immersive' ? 'apple' : 'immersive';
            localStorage.setItem('player-style', newStyle);
            return newStyle;
        });
    };

    return (
        <>
            <audio
                src={musicUrl}
                ref={audioRef}
                className="hidden"
            >
                Your browser does not support the audio element.
            </audio>
            
            {playerStyle === 'immersive' ? (
                <ImmersivePlayer 
                    musicItem={musicItem}
                    audioRef={audioRef}
                    audioState={audioState}
                    controls={controls}
                    forwardId={forwardId}
                    backwardId={backwardId}
                    lyrics={lyrics}
                    onToggleStyle={toggleStyle}
                />
            ) : (
                <AppleMusicPlayer 
                    musicItem={musicItem}
                    audioRef={audioRef}
                    audioState={audioState}
                    controls={controls}
                    forwardId={forwardId}
                    backwardId={backwardId}
                    lyrics={lyrics}
                    onToggleStyle={toggleStyle}
                />
            )}
        </>
    );
};

export default MusicDetail;

