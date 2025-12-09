import { useState, useEffect } from 'react';

export interface LyricLine {
    time: number;
    text: string;
}

const parseLRC = (lrc: string): LyricLine[] => {
    const result: LyricLine[] = [];
    const bracketTimeRegex = /\[(?:(\d+):)?(\d+):(\d+(?:[.,]\d+)?)]/g;
    const leadingTimeRegex = /^\s*(?:(\d+):)?(\d+):(\d+(?:[.,]\d+)?)/;
    const lines = lrc.split(/\r?\n/);

    for (const line of lines) {
        if (!line.trim()) continue;

        const times: number[] = [];
        let m: RegExpExecArray | null;
        while ((m = bracketTimeRegex.exec(line)) !== null) {
            const hours = m[1] ? parseInt(m[1], 10) : 0;
            const minutes = parseInt(m[2], 10);
            const seconds = parseFloat(m[3].replace(',', '.'));
            const timeSec = hours * 3600 + minutes * 60 + seconds;
            if (Number.isFinite(timeSec)) times.push(timeSec);
        }
        bracketTimeRegex.lastIndex = 0;

        let text = line.replace(bracketTimeRegex, '').trim();

        if (times.length === 0) {
            const lead = line.match(leadingTimeRegex);
            if (lead) {
                const hours = lead[1] ? parseInt(lead[1], 10) : 0;
                const minutes = parseInt(lead[2], 10);
                const seconds = parseFloat(lead[3].replace(',', '.'));
                const timeSec = hours * 3600 + minutes * 60 + seconds;
                if (Number.isFinite(timeSec)) {
                    times.push(timeSec);
                    text = line.slice(lead[0].length).trim();
                }
            }
        }

        if (times.length === 0) continue;
        if (!text) continue;

        for (const t of times) {
            result.push({ time: t, text });
        }
    }

    result.sort((a, b) => a.time - b.time);
    return result;
};

export const useLyrics = (lyricsUrl: string | undefined) => {
    const [lyrics, setLyrics] = useState<LyricLine[]>([]);

    useEffect(() => {
        if (lyricsUrl) {
            const fetchLyrics = async (retryCount = 0) => {
                try {
                    const response = await fetch(lyricsUrl, {
                        credentials: 'omit',
                        headers: {
                            'Accept': 'text/plain',
                        },
                    });

                    if (!response.ok) {
                        console.error('Failed to fetch lyrics:', lyricsUrl);
                    }

                    const text = await response.text();
                    const parsed = parseLRC(text);
                    setLyrics(parsed);
                } catch (error: unknown) {
                    console.error('Failed to load lyrics:', error);
                    if (retryCount < 3 && error instanceof Error &&
                        (error.message.includes('DNS') || error.message.includes('network'))) {
                        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
                        return fetchLyrics(retryCount + 1);
                    }
                    setLyrics([{time: 0, text: '歌词加载失败，请稍后重试'}]);
                }
            };
            fetchLyrics();
        } else {
            setLyrics([{time: 0, text: '暂无歌词'}]);
        }
    }, [lyricsUrl]);

    return lyrics;
};
