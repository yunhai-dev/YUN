import type { CappellaEmojiImage } from '../types';
import happy1 from './emo/happy1.png';
import love1 from './emo/love1.png';
import normal1 from './emo/normal1.png';
import sleepy1 from './emo/sleepy1.png';
import sleepy2 from './emo/sleepy2.png';
import sleepy3 from './emo/sleepy3.png';
import vibe1 from './emo/vibe1.png';
import vibe2 from './emo/vibe2.png';
import vibe3 from './emo/vibe3.png';

// src/components/visualizer/cappella/emoImages.ts
// Loads emoji images from the `emo` directory and provides a random picker with a reserved
// emotionHint interface.
// Adapted for this port: Vite's `import.meta.glob` is replaced by explicit imports, kept in the
// same lexicographic order the glob produced.

const emoSources: Array<[string, string]> = [
    ['happy1', happy1.src],
    ['love1', love1.src],
    ['normal1', normal1.src],
    ['sleepy1', sleepy1.src],
    ['sleepy2', sleepy2.src],
    ['sleepy3', sleepy3.src],
    ['vibe1', vibe1.src],
    ['vibe2', vibe2.src],
    ['vibe3', vibe3.src],
];

const builtinEmoImages: CappellaEmojiImage[] = emoSources.map(([name, url]) => ({
    id: `builtin-${name}`,
    url,
    name,
}));

/**
 * 从 emo 目录中随机挑选一张表情图片。
 *
 * @param _emotionHint - 预留接口：未来可根据情绪提示（如 "happy"、"sad"）
 *   筛选匹配的表情子集，再从中随机选取。当前版本忽略此参数，始终随机选取。
 *
 * TODO: 实现基于 emotionHint 的精细筛选逻辑，例如：
 *   - 用文件名前缀/标签匹配情绪关键词
 *   - 维护一份 emotionHint → 文件名列表的映射表
 */
export const pickRandomEmoImage = (
    _emotionHint?: string,
): CappellaEmojiImage | null => {
    if (builtinEmoImages.length === 0) {
        return null;
    }

    // TODO: 当 _emotionHint 有值时，先过滤出名称匹配的子集，
    // 如果子集非空则从中随机选取，否则 fallback 到全集。

    const index = Math.floor(Math.random() * builtinEmoImages.length);
    return builtinEmoImages[index];
};

export { builtinEmoImages };
