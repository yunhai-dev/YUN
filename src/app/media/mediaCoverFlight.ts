/**
 * Cover flight between a wall poster and the player page, adapted from Folia's
 * `bravaisCoverFlight`: one fixed image above every layer, animated with rAF so it is not tied
 * to either route's DOM. The wall starts the outbound flight; the player page marks it finished
 * on mount. Going back starts a full-screen copy before navigation, and the wall lands it on the
 * restored tile once the camera has centred that copy.
 */

export type FlightQuad = {
    centerX: number;
    centerY: number;
    width: number;
    height: number;
    angle: number;
};

const HANDOFF_KEY = 'media-card-handoff';
const OUT_MS = 560;
const BACK_MS = 520;
const OUT_HOLD_MS = 140;
const SAFETY_MS = 1400;
const Z_INDEX = 2147483000;

type Handoff = { id: string; imageUrl: string };

export const rememberCardHandoff = (id: string, imageUrl: string) => {
    try {
        sessionStorage.setItem(HANDOFF_KEY, JSON.stringify({id, imageUrl} satisfies Handoff));
    } catch {
        // The flight is decorative; storage being unavailable must not block navigation.
    }
};

const readHandoff = (): Handoff | null => {
    try {
        const raw = sessionStorage.getItem(HANDOFF_KEY);
        if (!raw) return null;
        const value = JSON.parse(raw) as Partial<Handoff> | null;
        if (!value || typeof value.id !== 'string' || typeof value.imageUrl !== 'string' || !value.imageUrl) return null;
        return {id: value.id, imageUrl: value.imageUrl};
    } catch {
        return null;
    }
};

const consumeHandoff = () => {
    try {
        sessionStorage.removeItem(HANDOFF_KEY);
    } catch {
        // Ignore unavailable storage.
    }
};

const reducedMotion = () => (
    typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

let overlay: HTMLDivElement | null = null;
let overlayImage: HTMLImageElement | null = null;
let fading: HTMLDivElement | null = null;
let fade: Animation | null = null;
let raf = 0;
let timer = 0;
let token = 0;
let forward: { atFullscreen: boolean; finishRequested: boolean } | null = null;
let returning = false;

type FlightPhase = 'idle' | 'forward' | 'forward-ready' | 'return';
let flightPhase: FlightPhase = 'idle';
const flightListeners = new Set<() => void>();
const setFlightPhase = (next: FlightPhase) => {
    if (flightPhase === next) return;
    flightPhase = next;
    flightListeners.forEach(listener => listener());
};
export const subscribeFlightPhase = (listener: () => void) => {
    flightListeners.add(listener);
    return () => { flightListeners.delete(listener); };
};
export const getFlightPhase = (): FlightPhase => flightPhase;
export const getServerFlightPhase = (): FlightPhase => 'idle';

// The forward cover lifts only once the incoming stage has painted. The stage is built while the
// cover already covers the viewport, so the reveal lands on a ready scene instead of a loading
// label, and the stage never competes with the entrance animation for frames.
const STAGE_READY_MAX_MS = 1800;
let stageReady = false;
let stageReadyTimer = 0;
const stageReadyWaiters: Array<() => void> = [];
export const notifyStageReady = () => {
    if (stageReady) return;
    stageReady = true;
    const waiters = stageReadyWaiters.splice(0, stageReadyWaiters.length);
    waiters.forEach(waiter => waiter());
};
const whenStageReady = (onReady: () => void) => {
    if (stageReady) {
        onReady();
        return;
    }
    stageReadyWaiters.push(onReady);
};

const clearTimers = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    if (timer) window.clearTimeout(timer);
    timer = 0;
    if (stageReadyTimer) window.clearTimeout(stageReadyTimer);
    stageReadyTimer = 0;
};

const resetFlight = () => {
    token += 1;
    clearTimers();
    fade?.cancel();
    fade = null;
    fading?.remove();
    fading = null;
    forward = null;
    returning = false;
    // A dropped flight must not leave the stage waiting for a cover that never arrives.
    setFlightPhase('idle');
    stageReady = false;
    stageReadyWaiters.length = 0;
};

const dropOverlay = () => {
    resetFlight();
    overlay?.remove();
    overlay = null;
    overlayImage = null;
    delete document.documentElement.dataset.mediaFlight;
};

const fadeOut = (duration: number) => {
    const node = overlay;
    if (!node) return;
    resetFlight();
    setFlightPhase('idle');
    overlay = null;
    overlayImage = null;
    fading = node;
    const animation = node.animate([{opacity: 1}, {opacity: 0}], {duration, easing: 'ease-out', fill: 'forwards'});
    fade = animation;
    animation.onfinish = () => {
        node.remove();
        if (fading === node) fading = null;
        if (fade === animation) fade = null;
        animation.cancel();
        // A newer flight may already own the page; only clear the flag when nothing is left.
        if (!overlay && !fading) delete document.documentElement.dataset.mediaFlight;
    };
};

const ensureOverlay = (imageUrl: string) => {
    const node = document.createElement('div');
    node.setAttribute('aria-hidden', 'true');
    node.style.cssText = 'position:fixed;left:0;top:0;transform-origin:0 0;overflow:hidden;'
        + `pointer-events:none;z-index:${Z_INDEX};background:#101014;`;
    const image = document.createElement('img');
    image.alt = '';
    image.draggable = false;
    image.decoding = 'async';
    image.src = imageUrl;
    image.style.cssText = 'display:block;width:100%;height:100%;object-fit:cover;';
    node.appendChild(image);
    document.body.appendChild(node);
    overlay = node;
    overlayImage = image;
};

const setQuad = (quad: FlightQuad, lift: number) => {
    if (!overlay) return;
    overlay.style.width = `${quad.width}px`;
    overlay.style.height = `${quad.height}px`;
    // Centring translation comes last in the matrix chain so the lift scales around the centre.
    overlay.style.transform = `translate3d(${quad.centerX}px, ${quad.centerY}px, 0) `
        + `rotate(${quad.angle}rad) scale(${1 + lift * 0.04}) translate(-50%, -50%)`;
    overlay.style.boxShadow = lift > 0.001
        ? `0 ${lift * 14}px ${lift * 40}px rgba(0,0,0,${(lift * 0.38).toFixed(3)})`
        : 'none';
};

const mix = (from: FlightQuad, to: FlightQuad, t: number): FlightQuad => ({
    centerX: from.centerX + (to.centerX - from.centerX) * t,
    centerY: from.centerY + (to.centerY - from.centerY) * t,
    width: from.width + (to.width - from.width) * t,
    height: from.height + (to.height - from.height) * t,
    angle: from.angle + (to.angle - from.angle) * t,
});

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const animate = (from: FlightQuad, to: FlightQuad, duration: number, onDone: () => void) => {
    clearTimers();
    const startedAt = performance.now();
    const currentToken = ++token;
    const step = (now: number) => {
        if (currentToken !== token) return;
        const progress = Math.min(1, (now - startedAt) / duration);
        setQuad(mix(from, to, easeInOut(progress)), Math.sin(Math.PI * progress));
        if (progress < 1) raf = requestAnimationFrame(step);
        else onDone();
    };
    raf = requestAnimationFrame(step);
};

/** Axis-aligned bounds → the poster's own size at a known field tilt. */
const measureTileQuad = (element: HTMLElement, angle: number): FlightQuad | null => {
    const rect = element.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return null;
    const cos = Math.abs(Math.cos(angle));
    const sin = Math.abs(Math.sin(angle));
    const denominator = Math.max(0.0001, cos * cos - sin * sin);
    return {
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        width: Math.max(1, (cos * rect.width - sin * rect.height) / denominator),
        height: Math.max(1, (cos * rect.height - sin * rect.width) / denominator),
        angle,
    };
};

const fullscreenQuad = (): FlightQuad => ({
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
    width: window.innerWidth,
    height: window.innerHeight,
    angle: 0,
});

/** Wall click: grow the clicked cover over the viewport while the route changes beneath it. */
export const flyCardToPage = (source: HTMLElement, imageUrl: string, angle: number) => {
    if (reducedMotion()) return;
    const from = measureTileQuad(source, angle);
    if (!from) return;
    dropOverlay();
    ensureOverlay(imageUrl);
    document.documentElement.dataset.mediaFlight = 'true';
    setFlightPhase('forward');
    forward = {atFullscreen: false, finishRequested: false};
    setQuad(from, 0);
    animate(from, fullscreenQuad(), OUT_MS, () => {
        if (!forward) return;
        forward.atFullscreen = true;
        setFlightPhase('forward-ready');
        // If the player page has already mounted, reveal it once the stage has painted;
        // otherwise hold the cover only long enough for a slow route, never indefinitely.
        if (!forward.finishRequested) {
            timer = window.setTimeout(() => fadeOut(300), SAFETY_MS);
            return;
        }
        revealWhenStageReady();
    });
};

/** Reveals the player under the full-screen cover once the stage has painted. */
const revealWhenStageReady = () => {
    let revealed = false;
    const reveal = () => {
        if (revealed) return;
        revealed = true;
        clearTimers();
        timer = window.setTimeout(() => fadeOut(300), OUT_HOLD_MS);
    };
    whenStageReady(reveal);
    // A stage that never reports in must not hold the cover for good.
    stageReadyTimer = window.setTimeout(reveal, STAGE_READY_MAX_MS);
};

/** Player mount: once the cover is full-screen, fade it out to reveal the player. */
export const finishForwardFlight = () => {
    if (!forward) return;
    forward.finishRequested = true;
    if (!forward.atFullscreen) return;
    clearTimers();
    revealWhenStageReady();
};

/** Back link / popstate from the player: cover the page before the route swaps. */
export const beginReturnFlight = () => {
    if (reducedMotion()) return false;
    const handoff = readHandoff();
    if (!handoff) return false;
    dropOverlay();
    ensureOverlay(handoff.imageUrl);
    document.documentElement.dataset.mediaFlight = 'true';
    setFlightPhase('return');
    returning = true;
    setQuad(fullscreenQuad(), 0);
    timer = window.setTimeout(() => {
        if (returning) fadeOut(220);
    }, SAFETY_MS);
    return true;
};

/** Wall restore: collapse the full-screen cover onto the tile that is now centred. */
export const landReturnFlight = (target: FlightQuad, imageUrl?: string) => {
    if (!returning || !overlay) return;
    returning = false;
    clearTimers();
    if (imageUrl && overlayImage && overlayImage.src !== imageUrl) overlayImage.src = imageUrl;
    animate(fullscreenQuad(), target, BACK_MS, () => {
        consumeHandoff();
        timer = window.setTimeout(() => fadeOut(180), 60);
    });
};

/** No valid landing target (or a cancelled back gesture): reveal the wall again. */
export const cancelReturnFlight = () => {
    if (!returning) return;
    returning = false;
    fadeOut(220);
};
