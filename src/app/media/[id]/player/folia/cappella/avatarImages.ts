import type { CappellaAvatarSource } from '../types';
import avatar10 from './avatar/avatar10.png';
import avatar11 from './avatar/avatar11.png';
import avatar12 from './avatar/avatar12.png';
import avatar13 from './avatar/avatar13.png';
import avatar14 from './avatar/avatar14.png';
import avatar15 from './avatar/avatar15.png';
import avatar16 from './avatar/avatar16.png';
import avatar17 from './avatar/avatar17.png';
import avatar2 from './avatar/avatar2.png';
import avatar3 from './avatar/avatar3.png';
import avatar4 from './avatar/avatar4.png';
import avatar5 from './avatar/avatar5.png';
import avatar6 from './avatar/avatar6.png';
import avatar8 from './avatar/avatar8.png';
import avatar9 from './avatar/avatar9.png';

// src/components/visualizer/cappella/avatarImages.ts
// Loads built-in Cappella avatar images and resolves the active avatar source.
// Adapted for this port: Vite's `import.meta.glob` is replaced by explicit imports, kept in the
// same lexicographic order the glob produced so avatar selection stays identical.
export type CappellaAvatarSide = 'left' | 'right';

export interface CappellaAvatarImage {
    id: string;
    name: string;
    url: string;
}

interface ResolveCappellaAvatarUrlInput {
    avatarSource: CappellaAvatarSource;
    coverUrl?: string | null;
    avatarIndex: number;
    side: CappellaAvatarSide;
    seed?: string | number;
    avatars?: CappellaAvatarImage[];
    customAvatarImages?: CappellaAvatarImage[];
}

const avatarSources: Array<[string, string]> = [
    ['avatar10', avatar10.src],
    ['avatar11', avatar11.src],
    ['avatar12', avatar12.src],
    ['avatar13', avatar13.src],
    ['avatar14', avatar14.src],
    ['avatar15', avatar15.src],
    ['avatar16', avatar16.src],
    ['avatar17', avatar17.src],
    ['avatar2', avatar2.src],
    ['avatar3', avatar3.src],
    ['avatar4', avatar4.src],
    ['avatar5', avatar5.src],
    ['avatar6', avatar6.src],
    ['avatar8', avatar8.src],
    ['avatar9', avatar9.src],
];

const toStableAvatarImages = (): CappellaAvatarImage[] =>
    avatarSources.map(([name, url]) => ({
        id: `builtin-avatar-${name}`,
        name,
        url,
    }));

export const builtinAvatarImages = toStableAvatarImages();

const hashString = (input: string) => {
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
        hash ^= input.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
};

const getSeededIndex = (seed: string | number, side: CappellaAvatarSide, length: number) =>
    hashString(`${seed}|${side}|${length}`) % length;

export const pickStableBuiltinAvatarImage = (
    avatars: CappellaAvatarImage[],
    avatarIndex: number,
    side: CappellaAvatarSide,
    seed: string | number = 'cappella',
): CappellaAvatarImage | null => {
    if (avatars.length === 0) {
        return null;
    }

    const rightAvatarIndex = getSeededIndex(seed, 'right', avatars.length);
    if (side === 'right') {
        return avatars[rightAvatarIndex] ?? null;
    }

    const leftAvatarPool = avatars.filter((_, index) => index !== rightAvatarIndex);
    if (leftAvatarPool.length === 0) {
        return avatars[rightAvatarIndex] ?? null;
    }

    const leftSeedOffset = getSeededIndex(seed, 'left', leftAvatarPool.length);
    const resolvedLeftIndex = Math.abs(Math.trunc(avatarIndex + leftSeedOffset)) % leftAvatarPool.length;
    return leftAvatarPool[resolvedLeftIndex] ?? null;
};

export const resolveCappellaAvatarUrl = ({
    avatarSource,
    coverUrl,
    avatarIndex,
    side,
    seed,
    avatars = builtinAvatarImages,
    customAvatarImages,
}: ResolveCappellaAvatarUrlInput): string | null => {
    if (avatarSource === 'color') {
        return null;
    }

    if (avatarSource === 'cover' && coverUrl) {
        return coverUrl;
    }

    if (avatarSource === 'custom' && customAvatarImages && customAvatarImages.length > 0) {
        return pickStableBuiltinAvatarImage(customAvatarImages, avatarIndex, side, seed)?.url ?? null;
    }

    return pickStableBuiltinAvatarImage(avatars, avatarIndex, side, seed)?.url ?? null;
};
