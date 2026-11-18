import React from 'react';
import {getAllMediaItems} from '@/data/media';
import {MediaLibrary} from './MediaLibrary';

const MediaPage = () => {
    const musicItems = getAllMediaItems();

    return (
        <main className="min-h-screen bg-[#070707]">
            <MediaLibrary items={musicItems} />
        </main>
    );
};

export default MediaPage;
