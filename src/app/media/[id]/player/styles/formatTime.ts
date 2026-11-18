// `mm:ss` for player chrome and the lyric timeline.
export const formatTime = (seconds: number) => {
    const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
    const minutes = Math.floor(safe / 60);
    const rest = Math.floor(safe % 60);
    return `${minutes.toString().padStart(2, '0')}:${rest.toString().padStart(2, '0')}`;
};
