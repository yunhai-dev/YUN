import type { Line } from './types';

/** Index of the last line whose start is at or before `time`; stays on line 0 before the intro. */
export const resolveLineIndex = (lines: Line[], time: number): number => {
    let low = 0;
    let high = lines.length - 1;
    let result = 0;

    while (low <= high) {
        const middle = (low + high) >> 1;
        if (lines[middle].startTime <= time) {
            result = middle;
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }

    return result;
};
