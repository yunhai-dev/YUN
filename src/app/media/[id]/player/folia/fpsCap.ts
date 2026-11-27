export type PlayerFpsCap = 0 | 30 | 60;

// Shared requestAnimationFrame cap scoped to the /media player lifecycle.
// Restores the native browser functions immediately when fpsCap === 0 or when leaving /media.
let nativeRaf: typeof window.requestAnimationFrame | null = null;
let nativeCaf: typeof window.cancelAnimationFrame | null = null;
let activeCap: PlayerFpsCap = 0;
let driverRafId = 0;
let nextHandle = 1;
let lastDispatchAt = 0;
const pendingCallbacks = new Map<number, FrameRequestCallback>();

// Audio sampling and locally capped renderers always use the browser's own frame clock.
export const requestNativeFrame = (callback: FrameRequestCallback) => (
    nativeRaf ? nativeRaf(callback) : window.requestAnimationFrame(callback)
);

export const cancelNativeFrame = (handle: number) => {
    if (nativeCaf) nativeCaf(handle);
    else window.cancelAnimationFrame(handle);
};

/** Follows the target cadence without trying to draw backlogged frames after a stall. */
export const createFrameGate = (fps: number) => {
    if (fps <= 0) return () => true;
    const interval = 1000 / fps;
    let nextFrameAt: number | null = null;
    return (timestamp: number) => {
        if (nextFrameAt !== null && timestamp + 0.5 < nextFrameAt) return false;
        if (nextFrameAt === null || timestamp >= nextFrameAt + interval) nextFrameAt = timestamp;
        nextFrameAt += interval;
        return true;
    };
};

const flushDriver = (timestamp: number) => {
    driverRafId = 0;
    if (pendingCallbacks.size === 0) return;

    const minInterval = activeCap > 0 ? 1000 / activeCap - 1.5 : 0;
    if (minInterval > 0 && lastDispatchAt > 0 && timestamp - lastDispatchAt < minInterval) {
        driverRafId = nativeRaf!(flushDriver);
        return;
    }

    lastDispatchAt = timestamp;
    const batch = Array.from(pendingCallbacks.entries());
    pendingCallbacks.clear();
    for (const [, callback] of batch) {
        callback(timestamp);
    }
};

const ensureDriver = () => {
    if (driverRafId === 0 && nativeRaf) {
        driverRafId = nativeRaf(flushDriver);
    }
};

const uninstall = () => {
    if (!nativeRaf || !nativeCaf) return;

    if (driverRafId !== 0) {
        nativeCaf(driverRafId);
        driverRafId = 0;
    }

    const restoreRaf = nativeRaf;
    const restoreCaf = nativeCaf;
    window.requestAnimationFrame = restoreRaf;
    window.cancelAnimationFrame = restoreCaf;
    nativeRaf = null;
    nativeCaf = null;
    activeCap = 0;
    lastDispatchAt = 0;

    if (pendingCallbacks.size > 0) {
        const remaining = Array.from(pendingCallbacks.values());
        pendingCallbacks.clear();
        for (const callback of remaining) {
            restoreRaf(callback);
        }
    }
};

/**
 * Sets or removes the global FPS cap for rAF-driven visualizers (PixiJS, Three.js, R3F, shaders).
 * Pass `0` to disable capping and restore the native `window.requestAnimationFrame`.
 */
export const applyGlobalFpsCap = (fpsCap: PlayerFpsCap): void => {
    if (typeof window === 'undefined') return;

    if (fpsCap === 0) {
        uninstall();
        return;
    }

    activeCap = fpsCap;
    if (nativeRaf && nativeCaf) return;

    nativeRaf = window.requestAnimationFrame.bind(window);
    nativeCaf = window.cancelAnimationFrame.bind(window);
    lastDispatchAt = 0;

    window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
        const handle = nextHandle++;
        pendingCallbacks.set(handle, callback);
        ensureDriver();
        return handle;
    };

    window.cancelAnimationFrame = (handle: number): void => {
        if (pendingCallbacks.delete(handle)) {
            if (pendingCallbacks.size === 0 && driverRafId !== 0 && nativeCaf) {
                nativeCaf(driverRafId);
                driverRafId = 0;
            }
            return;
        }
        nativeCaf?.(handle);
    };
};
