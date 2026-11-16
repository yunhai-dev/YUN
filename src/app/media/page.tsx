import React from 'react';
import {getAllMediaItems} from '@/data/media';
import type {MediaItem} from '@/types/media';
import {Link} from "next-view-transitions"
import {MediaScrollRestoration} from './MediaScrollRestoration';

interface MediaCardProps {
    item: MediaItem;
}

function MediaCard({item}: MediaCardProps) {
    const {title, imageUrl, author} = item;

    const cardContent = (
        <div
            className="crystal-card overflow-hidden p-2 h-full w-full group/card flex flex-col">
            <div
                className="aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-3 bg-primary/5 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageUrl}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"/>
            </div>
            <div className="px-3 pb-3 pt-1 relative z-10">
                <div className="text-xs text-muted-foreground mb-1.5">{author}</div>
                <h3 className="font-serif-sc text-lg font-medium group-hover/card:text-primary transition-colors line-clamp-1">{title}</h3>
            </div>
        </div>
    );

    return (
        <Link href={`/media/${item.id}`} className="h-full group">
            {cardContent}
        </Link>
    );
}

const MediaPage = () => {
    const musicItems = getAllMediaItems();

    return (
        <main className="min-h-screen flex flex-col crystal-page-bg">
            <MediaScrollRestoration />
            <div className="flex-1 pt-32 pb-20 px-5 md:px-8 max-w-6xl w-full mx-auto">
                <header className="mb-10">
                    <h1 className="crystal-hero-title text-4xl sm:text-5xl mb-2">音乐</h1>
                    <p className="text-muted-foreground text-base">
                        声景收藏 · 共 {musicItems.length} 首，点击封面进入全屏沉浸播放。
                    </p>
                </header>
                <div
                    className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
                    {musicItems.length > 0 ? (
                        musicItems.map((item) => (
                            <div className="h-full w-full" key={item.id}>
                                <MediaCard item={item}/>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-muted-foreground">暂无音乐内容。</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default MediaPage;
