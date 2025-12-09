export const isEnglishText = (text: string): boolean => {
    const englishChars = text.match(/[a-zA-Z]/g) || [];
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];

    if (chineseChars.length >= 3) {
        return false;
    }

    if (chineseChars.length <= 2 && englishChars.length > 5) {
        return true;
    }

    return chineseChars.length === 0 && englishChars.length > 0;


};

export const splitWord = (text: string) => {
    try {
        if (isEnglishText(text)) {
            const words = text.split(/\s+/).filter(w => w.length > 0);
            words.sort((a, b) => b.length - a.length);
            return words[0] || text;
        }

        const segmenter = new Intl.Segmenter("zh", {granularity: "word"})
        const segments = [...segmenter.segment(text)];
        segments.sort((a, b) => b.segment.length - a.segment.length);
        return segments[0].segment;
    } catch (error) {
        return text.split(/\s+/)[0] || text[0];
    }
}

export function isColorCloserToWhite(color: string): boolean {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return brightness >= 128;
}
