import { useState, useEffect } from 'react';
import type { LyricLine, LyricWord } from '../lyrics';
import { getCachedLyrics, loadLyrics } from '../playback/mediaCache';

export type { LyricLine, LyricWord };

export const useLyrics = (lyricsUrl: string | undefined) => {
    // The next track is prefetched while the previous one plays, so a route handoff usually
    // mounts with the lyrics already available and never paints an empty lyric sheet.
    const [lyrics, setLyrics] = useState<LyricLine[]>(() => getCachedLyrics(lyricsUrl) ?? []);

    useEffect(() => {
        if (!lyricsUrl) {
            setLyrics([{time: 0, text: '暂无歌词'}]);
            return;
        }

        const cached = getCachedLyrics(lyricsUrl);
        if (cached) {
            setLyrics(cached);
            return;
        }

        let cancelled = false;
        loadLyrics(lyricsUrl)
            .then(parsed => {
                if (!cancelled) setLyrics(parsed);
            })
            .catch((error: unknown) => {
                console.error('Failed to load lyrics:', error);
                if (!cancelled) setLyrics([{time: 0, text: '歌词加载失败，请稍后重试'}]);
            });

        return () => {
            cancelled = true;
        };
    }, [lyricsUrl]);

    return lyrics;
};
