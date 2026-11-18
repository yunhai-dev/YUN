'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type PointerEvent } from 'react';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { ArrowUpRight, AudioLines, Search, X } from 'lucide-react';
import type { MediaItem } from '@/types/media';
import { playbackEngine } from './[id]/player/playback/playbackEngine';
import {
    getMediaWallItemRect,
    getMediaWallTiles,
    type MediaWallBounds,
    type MediaWallRect,
    type MediaWallTile,
} from './mediaWallGeometry';
import {
    cancelReturnFlight,
    flyCardToPage,
    landReturnFlight,
    rememberCardHandoff,
} from './mediaCoverFlight';

const FOCUS_STORAGE_KEY = 'media-library-focus';
const OVERSCAN = 420;
const CULL_MARGIN = 150;
const DRAG_THRESHOLD = 6;
// Release momentum: the camera keeps the pointer's last velocity and decays with friction.
const INERTIA_FRICTION = 0.94;      // fraction of velocity kept per 60 fps frame
const INERTIA_MIN_SPEED = 0.02;     // world px per ms; below this the glide stops
const INERTIA_MAX_SPEED = 2.2;      // clamp for very fast flicks
const INERTIA_WINDOW_MS = 100;      // pointer samples used to estimate release velocity
// Matches the tilted field wrapper; drags are mapped back through it so the wall follows the
// cursor one-to-one instead of along the rotated axes.
const FIELD_TILT_DEG = -4;
const FIELD_SCALE = 1.18;
const TILT_RADIANS = (FIELD_TILT_DEG * Math.PI) / 180;
const TILT_COS = Math.cos(TILT_RADIANS);
const TILT_SIN = Math.sin(TILT_RADIANS);

type WallPlayback = { id: string | null; playing: boolean };
const SERVER_PLAYBACK: WallPlayback = { id: null, playing: false };
// `getSnapshot` changes identity whenever the current time ticks; the wall only needs the track
// and transport state, so cache those two fields and keep their object stable between changes.
let playbackMark: WallPlayback = SERVER_PLAYBACK;
const getPlaybackMark = (): WallPlayback => {
    const { trackId, isPlaying } = playbackEngine.getSnapshot();
    if (playbackMark.id !== trackId || playbackMark.playing !== isPlaying) {
        playbackMark = { id: trackId, playing: isPlaying };
    }
    return playbackMark;
};
const getServerPlaybackMark = () => SERVER_PLAYBACK;

// Folia's wall camera zoom steps (Bravais and Lattice share them).
const getScale = (width: number) => width < 640 ? 0.52 : width < 1100 ? 0.64 : 0.76;

const rememberFocus = (id: string) => {
    try {
        sessionStorage.setItem(FOCUS_STORAGE_KEY, id);
    } catch {
        // The wall remains usable if session storage is unavailable.
    }
};

const readFocus = () => {
    try {
        return sessionStorage.getItem(FOCUS_STORAGE_KEY);
    } catch {
        return null;
    }
};

const getWorldBounds = (x: number, y: number, scale: number, width: number, height: number): MediaWallBounds => ({
    left: -x / scale,
    top: -y / scale,
    right: (width - x) / scale,
    bottom: (height - y) / scale,
});

// Folia's poster fallback: a deterministic gradient from the item id (BravaisTile).
const fallbackBackground = (id: string) => {
    const hue = [...id].reduce((sum, character) => sum + character.charCodeAt(0), 0) % 360;
    return `linear-gradient(145deg, hsl(${hue} 68% 58%), hsl(${(hue + 52) % 360} 62% 18%))`;
};

const frameOf = (rect: MediaWallRect) => ({
    centerX: rect.x + rect.width / 2,
    centerY: rect.y + rect.height / 2,
});

interface WallPosterProps {
    item: MediaItem;
    rect: MediaWallRect;
    label: string;
    current: boolean;
    playing: boolean;
    focused: boolean;
    onOpen: (source: HTMLElement) => void;
}

// Adapted from Folia's `components/wall/wall.css` poster: full-bleed cover, bottom shade,
// number badge and bottom-left copy.
function WallPoster({ item, rect, label, current, playing, focused, onOpen }: WallPosterProps) {
    // Track the failed URL rather than a boolean: filtering remaps tiles to different items
    // without remounting them, and the new item deserves its own cover attempt.
    const [failedUrl, setFailedUrl] = useState<string | null>(null);
    const failedImage = failedUrl === item.imageUrl;

    return (
        <Link
            href={`/media/${item.id}/`}
            prefetch={false}
            // Links are natively draggable; without this the browser starts a link drag and
            // cancels pointermove, so the wall would never pan from a poster.
            draggable={false}
            // One tab stop for the whole wall (the region); arrows and Enter move and open.
            tabIndex={-1}
            data-wall-tile={rect.key}
            onClick={event => {
                // Modified clicks open a new tab: no flight, no playback change in this tab.
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                onOpen(event.currentTarget);
            }}
            aria-label={`${item.title} · ${item.author}${current ? ` · ${playing ? '正在播放' : '已暂停'}` : ''}`}
            title={`${item.title} · ${item.author}`}
            className={
                'absolute block select-none overflow-hidden text-white '
                + 'transition-[filter,box-shadow,transform] duration-300 ease-out '
                + 'hover:brightness-[1.04] hover:saturate-[1.06] focus-visible:outline-none '
                + (focused ? 'z-10' : 'z-0 hover:z-10')
            }
            style={{
                transform: `translate3d(${rect.x}px, ${rect.y}px, 0)${focused ? ' scale(1.03)' : ''}`,
                width: rect.width,
                height: rect.height,
                backgroundImage: fallbackBackground(item.id),
                backgroundColor: '#101014',
                boxShadow: current
                    ? '0 0 0 1px rgba(255,255,255,0.04), 0 18px 50px rgba(0,0,0,0.5)'
                    : focused
                        ? '0 0 0 1px rgba(0,0,0,0.62), 0 0 0 4px rgba(255,255,255,0.92), 0 0 0 5px rgba(0,0,0,0.38), 0 12px 32px rgba(0,0,0,0.45)'
                        : '0 0 0 1px rgba(255,255,255,0.04), 0 12px 32px rgba(0,0,0,0.3)',
            }}
        >
            {!failedImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={item.imageUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onError={() => setFailedUrl(item.imageUrl)}
                    className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                />
            )}
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_34%,rgba(0,0,0,0.24)_56%,rgba(0,0,0,0.92)_100%)]" />
            {focused && (
                <span
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.1), transparent 60%)' }}
                />
            )}
            {/* Folia's playing mark is an overlay border (`wall.css` `::before`): an inset
                box-shadow on the card itself would paint beneath the full-bleed cover. */}
            {current && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 border-2 border-[#d8b66a]"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.52), inset 0 0 15px -7px rgba(216,182,106,0.46)' }}
                />
            )}
            <span className={`pointer-events-none absolute left-3.5 top-3.5 px-2 py-[5px] text-[11px] font-extrabold tabular-nums tracking-[0.12em] transition-colors duration-300 ${current ? 'bg-black/78 text-[#e8d49a]' : 'bg-black/62'}`}>
                {current ? `${playing ? '正在播放' : '已暂停'} · ${label}` : label}
            </span>
            <span className="pointer-events-none absolute inset-x-[17px] bottom-[17px] flex flex-col gap-[5px]">
                <strong className="-my-[0.14em] line-clamp-3 py-[0.14em] text-[clamp(22px,2vw,36px)] font-bold leading-[0.96] tracking-[-0.045em] text-balance text-white">
                    {item.title}
                </strong>
                <small className="truncate text-[13px] font-[650] opacity-[0.78]">
                    {item.author}
                </small>
            </span>
        </Link>
    );
}

export function MediaLibrary({ items }: { items: MediaItem[] }) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const worldRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef({ x: 34, y: 80, scale: 0.76 });
    const viewportSizeRef = useRef({ width: 1280, height: 720 });
    const dragRef = useRef<{
        id: number;
        x: number;
        y: number;
        originX: number;
        originY: number;
        moved: boolean;
        samples: { t: number; x: number; y: number }[];
    } | null>(null);
    const dragAbortRef = useRef<AbortController | null>(null);
    const suppressClickRef = useRef(false);
    const tweenRef = useRef<number | null>(null);
    const boundsRef = useRef<MediaWallBounds>(getWorldBounds(34, 80, 0.76, 1280, 720));
    const measuredRef = useRef(false);
    const centeredOnceRef = useRef(false);
    const queryRef = useRef('');
    const [bounds, setBounds] = useState<MediaWallBounds>(boundsRef.current);
    const [measured, setMeasured] = useState(false);
    const [focusedId, setFocusedId] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [keyboardActive, setKeyboardActive] = useState(false);
    const router = useTransitionRouter();
    const playbackState = useSyncExternalStore(playbackEngine.subscribe, getPlaybackMark, getServerPlaybackMark);
    const currentTrackId = playbackState.id;
    const isCurrentPlaying = playbackState.playing;

    const filteredItems = useMemo(() => {
        const term = query.trim().toLocaleLowerCase();
        if (!term) return items;
        return items.filter(item => `${item.title} ${item.author} ${item.id}`.toLocaleLowerCase().includes(term));
    }, [items, query]);
    const currentIndex = useMemo(
        () => currentTrackId ? filteredItems.findIndex(item => item.id === currentTrackId) : -1,
        [currentTrackId, filteredItems],
    );
    const catalogNumbers = useMemo(() => new Map(items.map((item, index) => [item.id, index + 1])), [items]);

    const applyCamera = useCallback((next: { x: number; y: number; scale: number }) => {
        cameraRef.current = next;
        if (worldRef.current) {
            worldRef.current.style.transform = `translate3d(${next.x}px, ${next.y}px, 0) scale(${next.scale})`;
        }
    }, []);

    const refreshBounds = useCallback(() => {
        const { width, height } = viewportSizeRef.current;
        const camera = cameraRef.current;
        const next = getWorldBounds(camera.x, camera.y, camera.scale, width, height);
        boundsRef.current = next;
        setBounds(next);
    }, []);

    const maybeRefreshBounds = useCallback(() => {
        const { width, height } = viewportSizeRef.current;
        const camera = cameraRef.current;
        const visible = getWorldBounds(camera.x, camera.y, camera.scale, width, height);
        const culled = boundsRef.current;
        if (visible.left < culled.left + CULL_MARGIN || visible.right > culled.right - CULL_MARGIN
            || visible.top < culled.top + CULL_MARGIN || visible.bottom > culled.bottom - CULL_MARGIN) {
            refreshBounds();
        }
    }, [refreshBounds]);

    const stopTween = useCallback(() => {
        if (tweenRef.current !== null) cancelAnimationFrame(tweenRef.current);
        tweenRef.current = null;
    }, []);

    const tweenCamera = useCallback((target: { x: number; y: number; scale: number }) => {
        stopTween();
        const from = cameraRef.current;
        if (Math.abs(target.x - from.x) < 1 && Math.abs(target.y - from.y) < 1) return;
        const startedAt = performance.now();
        const duration = 420;
        const step = (now: number) => {
            const progress = Math.min(1, (now - startedAt) / duration);
            const eased = 1 - (1 - progress) ** 3;
            applyCamera({
                x: from.x + (target.x - from.x) * eased,
                y: from.y + (target.y - from.y) * eased,
                scale: target.scale,
            });
            if (progress < 1) {
                tweenRef.current = requestAnimationFrame(step);
            } else {
                tweenRef.current = null;
                refreshBounds();
            }
        };
        tweenRef.current = requestAnimationFrame(step);
    }, [applyCamera, refreshBounds, stopTween]);

    // Release glide: move along the drag's last world-space velocity and damp it every frame.
    const flingCamera = useCallback((velocityX: number, velocityY: number) => {
        stopTween();
        const { scale } = cameraRef.current;
        let vx = velocityX;
        let vy = velocityY;
        let last = performance.now();
        const step = (now: number) => {
            const dt = Math.min(48, Math.max(1, now - last));
            last = now;
            const decay = Math.pow(INERTIA_FRICTION, dt / (1000 / 60));
            vx *= decay;
            vy *= decay;
            const camera = cameraRef.current;
            applyCamera({ x: camera.x + vx * dt, y: camera.y + vy * dt, scale });
            maybeRefreshBounds();
            if (Math.hypot(vx, vy) > INERTIA_MIN_SPEED) {
                tweenRef.current = requestAnimationFrame(step);
            } else {
                tweenRef.current = null;
                refreshBounds();
            }
        };
        tweenRef.current = requestAnimationFrame(step);
    }, [applyCamera, maybeRefreshBounds, refreshBounds, stopTween]);

    const viewCenter = useCallback(() => {
        const { width, height } = viewportSizeRef.current;
        const camera = cameraRef.current;
        return { x: (width / 2 - camera.x) / camera.scale, y: (height / 2 - camera.y) / camera.scale };
    }, []);

    const centerTile = useCallback((rect: MediaWallRect, smooth: boolean) => {
        const { width, height } = viewportSizeRef.current;
        const { scale } = cameraRef.current;
        const frame = frameOf(rect);
        const target = { x: width / 2 - scale * frame.centerX, y: height / 2 - scale * frame.centerY, scale };
        if (smooth) tweenCamera(target);
        else {
            applyCamera(target);
            refreshBounds();
        }
    }, [applyCamera, refreshBounds, tweenCamera]);

    // Measure the field; the first measure opens the wall at Folia's home corner (34, 80).
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const update = () => {
            const width = viewport.clientWidth;
            const height = viewport.clientHeight;
            if (width === 0 || height === 0) return;
            const scale = getScale(width);
            if (!measuredRef.current) {
                const next = { x: width < 640 ? 12 : 34, y: width < 640 ? 56 : 80, scale };
                applyCamera(next);
            } else {
                // Keep the same world point under the view centre on a resize.
                const center = viewCenter();
                applyCamera({ x: width / 2 - scale * center.x, y: height / 2 - scale * center.y, scale });
            }
            viewportSizeRef.current = { width, height };
            measuredRef.current = true;
            refreshBounds();
            setMeasured(true);
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(viewport);
        return () => {
            observer.disconnect();
            stopTween();
            dragAbortRef.current?.abort();
        };
    }, [applyCamera, refreshBounds, stopTween, viewCenter]);

    // Restore the playing song (or the last opened one) after the first measure; otherwise start
    // on the first song. When a reverse cover flight is waiting, collapse it onto that tile.
    useEffect(() => {
        if (!measured || centeredOnceRef.current || filteredItems.length === 0) return;
        centeredOnceRef.current = true;
        const stored = readFocus();
        const storedIndex = stored ? filteredItems.findIndex(item => item.id === stored) : -1;
        const index = currentIndex >= 0 ? currentIndex : storedIndex >= 0 ? storedIndex : 0;
        const item = filteredItems[index];
        setFocusedId(item.id);
        let target: MediaWallRect | null = null;
        if (currentIndex >= 0 || storedIndex >= 0) {
            target = getMediaWallItemRect(filteredItems.length, index, viewCenter());
            if (target) centerTile(target, false);
        }
        if (!target) {
            cancelReturnFlight();
            return;
        }
        const { width, height } = viewportSizeRef.current;
        const { scale } = cameraRef.current;
        landReturnFlight({
            centerX: width / 2,
            centerY: height / 2,
            width: target.width * scale * FIELD_SCALE,
            height: target.height * scale * FIELD_SCALE,
            angle: TILT_RADIANS,
        }, item.imageUrl);
    }, [measured, filteredItems, currentIndex, centerTile, viewCenter]);

    // A new search starts at its first match; clearing the search keeps the current focus.
    useEffect(() => {
        if (!measured || queryRef.current === query) return;
        queryRef.current = query;
        // Clearing the search returns to the full wall; keep the song the user was looking at.
        if (!query.trim()) return;
        if (filteredItems.length === 0) {
            setFocusedId(null);
            return;
        }
        setFocusedId(filteredItems[0].id);
        const rect = getMediaWallItemRect(filteredItems.length, 0, viewCenter());
        if (rect) centerTile(rect, true);
    }, [query, filteredItems, measured, centerTile, viewCenter]);

    const wallTiles = useMemo(
        () => getMediaWallTiles(filteredItems.length, bounds, OVERSCAN),
        [filteredItems.length, bounds],
    );

    const focusedIndex = focusedId ? filteredItems.findIndex(item => item.id === focusedId) : -1;
    const focusedTile = useMemo(() => {
        if (focusedIndex < 0 || wallTiles.length === 0) return null;
        const { x, y } = viewCenter();
        let best: MediaWallTile | null = null;
        let bestDistance = Infinity;
        for (const tile of wallTiles) {
            if (tile.itemIndex !== focusedIndex) continue;
            const frame = frameOf(tile.rect);
            const distance = (frame.centerX - x) ** 2 + (frame.centerY - y) ** 2;
            if (distance < bestDistance) {
                bestDistance = distance;
                best = tile;
            }
        }
        return best;
    }, [focusedIndex, wallTiles, viewCenter]);

    const openTrack = useCallback((item: MediaItem, source: HTMLElement | null) => {
        rememberFocus(item.id);
        rememberCardHandoff(item.id, item.imageUrl);
        if (source) flyCardToPage(source, item.imageUrl, TILT_RADIANS);
        setFocusedId(item.id);
        const currentId = playbackEngine.getSnapshot().trackId;
        if (currentId && currentId !== item.id) playbackEngine.clearState();
    }, []);

    const locateCurrent = useCallback(() => {
        if (!currentTrackId || currentIndex < 0) return;
        setFocusedId(currentTrackId);
        const rect = getMediaWallItemRect(filteredItems.length, currentIndex, viewCenter());
        if (rect) centerTile(rect, true);
    }, [centerTile, currentIndex, currentTrackId, filteredItems.length, viewCenter]);

    const moveFocus = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
        if (wallTiles.length === 0) return;
        const source = focusedTile ?? wallTiles.reduce((best, tile) => {
            const center = viewCenter();
            const frame = frameOf(tile.rect);
            const bestFrame = frameOf(best.rect);
            const distance = (frame.centerX - center.x) ** 2 + (frame.centerY - center.y) ** 2;
            const bestDistance = (bestFrame.centerX - center.x) ** 2 + (bestFrame.centerY - center.y) ** 2;
            return distance < bestDistance ? tile : best;
        }, wallTiles[0]);
        const sourceFrame = frameOf(source.rect);
        let best: MediaWallTile | null = null;
        let bestDistance = Infinity;
        for (const tile of wallTiles) {
            if (tile.rect.key === source.rect.key) continue;
            const frame = frameOf(tile.rect);
            const dx = frame.centerX - sourceFrame.centerX;
            const dy = frame.centerY - sourceFrame.centerY;
            const horizontal = direction === 'left' || direction === 'right';
            const primary = horizontal ? dx : dy;
            const secondary = horizontal ? dy : dx;
            if (primary === 0 || Math.sign(primary) !== (direction === 'left' || direction === 'up' ? -1 : 1)) continue;
            if (Math.abs(primary) < Math.abs(secondary) * 0.55) continue;
            const distance = dx * dx + dy * dy;
            if (distance < bestDistance) {
                bestDistance = distance;
                best = tile;
            }
        }
        if (!best) return;
        const item = filteredItems[best.itemIndex];
        if (!item) return;
        setFocusedId(item.id);
        centerTile(best.rect, true);
    }, [centerTile, filteredItems, focusedTile, viewCenter, wallTiles]);

    // Wheel pans the wall; the tilt stays with the field so wheel axes follow the tilted wall.
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const onWheel = (event: WheelEvent) => {
            if (event.ctrlKey) return;
            event.preventDefault();
            stopTween();
            const multiplier = event.deltaMode === 1 ? 32 : event.deltaMode === 2 ? viewportSizeRef.current.height : 1;
            const dx = event.shiftKey && Math.abs(event.deltaX) < 1 ? event.deltaY : event.deltaX;
            const dy = event.shiftKey && Math.abs(event.deltaX) < 1 ? 0 : event.deltaY;
            const camera = cameraRef.current;
            applyCamera({ x: camera.x - dx * multiplier * 1.4, y: camera.y - dy * multiplier * 1.4, scale: camera.scale });
            maybeRefreshBounds();
        };
        viewport.addEventListener('wheel', onWheel, { passive: false });
        return () => viewport.removeEventListener('wheel', onWheel);
    }, [applyCamera, maybeRefreshBounds, stopTween]);

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0 || (event.target as HTMLElement).closest('input, button')) return;
        stopTween();
        suppressClickRef.current = false;
        const drag = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            originX: cameraRef.current.x,
            originY: cameraRef.current.y,
            moved: false,
            samples: [] as { t: number; x: number; y: number }[],
        };
        dragRef.current = drag;
        setDragging(true);
        // Window listeners rather than pointer capture: capturing on the field would retarget the
        // native click and stop a poster's Link from navigating after a plain press.
        dragAbortRef.current?.abort();
        const abort = new AbortController();
        dragAbortRef.current = abort;
        const move = (moveEvent: globalThis.PointerEvent) => {
            if (moveEvent.pointerId !== drag.id) return;
            const dx = moveEvent.clientX - drag.x;
            const dy = moveEvent.clientY - drag.y;
            if (!drag.moved && Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) drag.moved = true;
            if (!drag.moved) return;
            // Undo the field's rotation and scale: screen dx/dy become world-space camera motion.
            const worldX = (dx * TILT_COS + dy * TILT_SIN) / FIELD_SCALE;
            const worldY = (-dx * TILT_SIN + dy * TILT_COS) / FIELD_SCALE;
            drag.samples.push({ t: moveEvent.timeStamp, x: worldX, y: worldY });
            if (drag.samples.length > 12) drag.samples.shift();
            applyCamera({ x: drag.originX + worldX, y: drag.originY + worldY, scale: cameraRef.current.scale });
            maybeRefreshBounds();
        };
        const end = (endEvent: globalThis.PointerEvent) => {
            if (endEvent.pointerId !== drag.id) return;
            let velocityX = 0;
            let velocityY = 0;
            const canGlide = drag.moved
                && endEvent.type === 'pointerup'
                && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (canGlide) {
                const dx = endEvent.clientX - drag.x;
                const dy = endEvent.clientY - drag.y;
                drag.samples.push({
                    t: endEvent.timeStamp,
                    x: (dx * TILT_COS + dy * TILT_SIN) / FIELD_SCALE,
                    y: (-dx * TILT_SIN + dy * TILT_COS) / FIELD_SCALE,
                });
                // Only the last 100ms count, so pausing before release does not fling.
                const newest = drag.samples[drag.samples.length - 1];
                let oldest = newest;
                for (let index = drag.samples.length - 2; index >= 0; index -= 1) {
                    if (newest.t - drag.samples[index].t > INERTIA_WINDOW_MS) break;
                    oldest = drag.samples[index];
                }
                const elapsed = newest.t - oldest.t;
                if (elapsed >= 8) {
                    velocityX = (newest.x - oldest.x) / elapsed;
                    velocityY = (newest.y - oldest.y) / elapsed;
                    const speed = Math.hypot(velocityX, velocityY);
                    if (speed > INERTIA_MAX_SPEED) {
                        velocityX *= INERTIA_MAX_SPEED / speed;
                        velocityY *= INERTIA_MAX_SPEED / speed;
                    } else if (speed < INERTIA_MIN_SPEED) {
                        velocityX = 0;
                        velocityY = 0;
                    }
                }
            }
            suppressClickRef.current = drag.moved;
            dragRef.current = null;
            setDragging(false);
            if (velocityX !== 0 || velocityY !== 0) flingCamera(velocityX, velocityY);
            else refreshBounds();
            abort.abort();
            if (dragAbortRef.current === abort) dragAbortRef.current = null;
        };
        window.addEventListener('pointermove', move, { signal: abort.signal });
        window.addEventListener('pointerup', end, { signal: abort.signal });
        window.addEventListener('pointercancel', end, { signal: abort.signal });
    };

    const openFocused = () => {
        const item = filteredItems[focusedIndex >= 0 ? focusedIndex : 0];
        if (!item) return;
        // Keyboard opens have no pointer target; fly from the tile the wall is focused on.
        const source = focusedTile
            ? document.querySelector<HTMLElement>(`[data-wall-tile="${focusedTile.rect.key}"]`)
            : null;
        openTrack(item, source);
        router.push(`/media/${item.id}/`);
    };

    return (
        <section
            className="fixed inset-0 z-0 h-[100svh] w-full overflow-hidden bg-[#070707] text-[#f7f4ee]"
            aria-label="音乐"
        >
            {/* Folia's wall atmosphere: two theme glows over paper black. */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(124,58,237,0.16),transparent_29%),radial-gradient(circle_at_86%_82%,rgba(106,72,255,0.2),transparent_32%)]" />
            {/* Folia's collection tilt (`BRAVAIS_TILT_DEG.collection`); the extra scale keeps the
                rotated field covering the section corners, and center-origin rotation keeps the
                view centre (used by focus restore and search) over the same world point. */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ transform: `rotate(${FIELD_TILT_DEG}deg) scale(${FIELD_SCALE})` }}
            >
                <div
                    ref={viewportRef}
                    className={`absolute inset-0 touch-none select-none overflow-hidden outline-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    role="region"
                    aria-label="歌曲拼贴墙"
                    aria-describedby="media-wall-help"
                    tabIndex={0}
                    onPointerDown={onPointerDown}
                    onDragStart={event => event.preventDefault()}
                    // Upstream only draws the focus ring for keyboard navigation (`is-focused`
                    // tracks the focus manager), not for whatever the wall happens to point at.
                    onFocus={() => setKeyboardActive(true)}
                    onBlur={event => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardActive(false);
                    }}
                    onClickCapture={event => {
                        if (suppressClickRef.current) {
                            event.preventDefault();
                            event.stopPropagation();
                            suppressClickRef.current = false;
                        }
                    }}
                    onKeyDown={event => {
                        if ((event.target as HTMLElement).closest('input, button')) return;
                        const directions = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' } as const;
                        const direction = directions[event.key as keyof typeof directions];
                        if (direction) {
                            event.preventDefault();
                            moveFocus(direction);
                        } else if (event.key === 'Enter') {
                            if ((event.target as HTMLElement).closest('a')) return;
                            event.preventDefault();
                            openFocused();
                        }
                    }}
                >
                    {/* Hidden until the first measure has applied the camera, so the static
                        HTML never paints the unpositioned world at the origin. */}
                    <div
                        ref={worldRef}
                        className={`absolute inset-0 origin-top-left ${measured ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {filteredItems.length > 0 && wallTiles.map(tile => {
                            const item = filteredItems[tile.itemIndex];
                            if (!item) return null;
                            return (
                                <WallPoster
                                    key={tile.rect.key}
                                    item={item}
                                    rect={tile.rect}
                                    label={String(catalogNumbers.get(item.id) ?? tile.itemIndex + 1).padStart(3, '0')}
                                    current={currentTrackId === item.id}
                                    playing={isCurrentPlaying}
                                    focused={keyboardActive && focusedTile?.rect.key === tile.rect.key}
                                    onOpen={source => openTrack(item, source)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Edge falloff and grain, matching Folia's `wall.css`. */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_78%,rgba(0,0,0,0.52)_100%)]" />
            <div
                className="pointer-events-none absolute inset-0 z-20 opacity-[0.13] mix-blend-soft-light"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Wall chrome: the site header is hidden on `/media`, so the wall carries its own. */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 p-5 md:p-8">
                <div className="pointer-events-auto">
                    <Link href="/" className="text-xs font-medium tracking-[0.14em] text-white/55 transition-colors hover:text-white">
                        YunHai · 云云亦海
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">音乐</h1>
                    <p className="mt-1 text-xs tabular-nums text-white/50" aria-live="polite">
                        声景收藏 · {filteredItems.length} / {items.length} 首
                    </p>
                </div>
                <div className="pointer-events-auto flex items-center gap-2">
                    {currentIndex >= 0 && !searchOpen && (
                        <button
                            type="button"
                            onClick={locateCurrent}
                            aria-label="定位当前歌曲"
                            title="定位当前歌曲"
                            className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/45 backdrop-blur-md transition-colors hover:bg-black/70 ${isCurrentPlaying ? 'text-[#e8d49a]' : 'text-white/55'}`}
                        >
                            <AudioLines size={16} />
                        </button>
                    )}
                    {searchOpen ? (
                        <div className="flex h-10 items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 backdrop-blur-md">
                            <Search size={15} className="shrink-0 text-white/50" aria-hidden="true" />
                            <input
                                autoFocus
                                type="search"
                                value={query}
                                onChange={event => setQuery(event.target.value)}
                                onKeyDown={event => {
                                    if (event.key === 'Escape') {
                                        setQuery('');
                                        setSearchOpen(false);
                                    }
                                }}
                                aria-label="搜索歌曲或歌手"
                                placeholder="搜索歌曲或歌手"
                                className="h-9 w-40 appearance-none bg-transparent text-sm text-white outline-none placeholder:text-white/40 sm:w-56"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery('');
                                    setSearchOpen(false);
                                }}
                                aria-label="关闭搜索"
                                className="rounded-full p-1 text-white/55 transition-colors hover:text-white"
                            >
                                <X size={15} />
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setSearchOpen(true)}
                            aria-label="搜索歌曲或歌手"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white/70 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white"
                        >
                            <Search size={16} />
                        </button>
                    )}
                </div>
            </div>

            {filteredItems.length === 0 && (
                <div className="pointer-events-none absolute inset-0 z-30 grid place-content-center justify-items-center gap-2 text-center">
                    <strong className="text-lg tracking-[0.16em]">{items.length ? '没有找到匹配的歌曲' : '暂无音乐内容'}</strong>
                    {items.length > 0 && <span className="text-xs text-white/50">换一个关键词，或清空搜索回到整面墙。</span>}
                </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 p-5 text-[11px] text-white/45 md:p-8">
                <p>拖动或滚轮浏览 · 点击封面播放</p>
                <Link
                    href="/"
                    className="pointer-events-auto inline-flex items-center gap-1 text-white/55 transition-colors hover:text-white"
                >
                    返回首页 <ArrowUpRight size={12} />
                </Link>
            </div>
            <p id="media-wall-help" className="sr-only">
                歌曲以拼贴墙排列；拖动或使用滚轮平移，方向键切换歌曲，回车打开聚焦的歌曲。
            </p>
            <span className="sr-only" aria-live="polite">
                {focusedId ? `聚焦：${filteredItems[focusedIndex]?.title ?? ''}` : ''}
            </span>
        </section>
    );
}
