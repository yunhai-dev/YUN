"use client";

import { useEffect, useMemo, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LyricLine } from '../lyrics';

interface LyricTimelineProps {
    lyrics: LyricLine[];
    currentTime: number;
    accentColor: string;
    onSelect: (time: number) => void;
    onClose: () => void;
}

// Each line is placed by its real position in the song (px per second), with a minimum gap so
// dense lines never overlap. Labels alternate sides of the center rail; the active line is
// highlighted with the cover accent color and every node seeks on click.
const TOP_PAD = 96;
const BOTTOM_PAD = 160;
const PX_PER_SECOND = 8;
const MIN_GAP = 64;

const formatTime = (seconds: number) => {
    const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
    const minutes = Math.floor(safe / 60);
    const rest = Math.floor(safe % 60);
    return `${minutes.toString().padStart(2, '0')}:${rest.toString().padStart(2, '0')}`;
};

const TimelineLabel = ({text, active, align}: {text: string; active: boolean; align: 'left' | 'right'}) => (
    <span
        className={cn(
            'line-clamp-3 max-w-full rounded-xl px-3 py-2 transition-all duration-300',
            align === 'right' ? 'text-right' : 'text-left',
            active
                ? 'bg-black text-[15px] font-semibold leading-5 text-white shadow-[0_12px_30px_rgba(0,0,0,0.45)]'
                : 'bg-white/[0.06] text-[13px] leading-5 text-white/55 group-hover:bg-white/10 group-hover:text-white/80',
        )}
    >
        {text}
    </span>
);

export const LyricTimeline = ({lyrics, currentTime, accentColor, onSelect, onClose}: LyricTimelineProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLButtonElement>(null);
    const openedRef = useRef(false);
    // Once the user takes over scrolling, playback-following stops until they scroll back to the
    // active line, so the list never yanks itself away from where they are browsing.
    const userPausedRef = useRef(false);

    const lines = useMemo(() => lyrics.filter(line => line.text.trim().length > 0), [lyrics]);

    const nodes = useMemo(() => {
        let cursor = TOP_PAD;
        return lines.map((line, index) => {
            const ideal = TOP_PAD + Math.max(0, line.time) * PX_PER_SECOND;
            const top = Math.max(ideal, cursor);
            cursor = top + MIN_GAP;
            return {line, index, top};
        });
    }, [lines]);

    const contentHeight = (nodes[nodes.length - 1]?.top ?? 0) + BOTTOM_PAD;

    const activeIndex = useMemo(() => {
        let index = -1;
        for (let i = 0; i < nodes.length; i += 1) {
            if (nodes[i].line.time <= currentTime) index = i;
            else break;
        }
        return index;
    }, [nodes, currentTime]);

    useEffect(() => {
        // Jump straight to the active node on open, then glide along as playback advances —
        // unless the user has grabbed the scroll themselves.
        const isInitial = !openedRef.current;
        openedRef.current = true;
        if (!isInitial && userPausedRef.current) return;
        if (activeRef.current) {
            activeRef.current.scrollIntoView({block: 'center', behavior: isInitial ? 'auto' : 'smooth'});
        } else if (isInitial && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [activeIndex]);

    const handleScrollIntent = () => {
        userPausedRef.current = true;
    };

    const handleScroll = () => {
        if (!userPausedRef.current) return;
        const container = scrollRef.current;
        const node = activeRef.current;
        if (!container || !node) return;
        const containerRect = container.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();
        // Following resumes only once the active line is back on screen.
        if (nodeRect.top >= containerRect.top && nodeRect.bottom <= containerRect.bottom) {
            userPausedRef.current = false;
        }
    };

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-30 flex bg-black/50 p-2 md:p-4" onClick={onClose} role="presentation">
            <div
                role="dialog"
                aria-modal="true"
                aria-label="时间线"
                className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/55 backdrop-blur-2xl"
                onClick={event => event.stopPropagation()}
            >
                <header className="flex shrink-0 items-center justify-between px-5 py-4 md:px-8 md:py-6">
                    <h2 className="text-lg font-semibold tracking-wide text-white md:text-2xl">时间线</h2>
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                        title="关闭"
                        aria-label="关闭时间线"
                    >
                        <X size={22}/>
                    </button>
                </header>

                {nodes.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center text-sm tracking-[0.3em] text-white/45">
                        暂无歌词
                    </div>
                ) : (
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto overscroll-contain"
                        onScroll={handleScroll}
                        onWheel={handleScrollIntent}
                        onTouchMove={handleScrollIntent}
                        onPointerDown={handleScrollIntent}
                    >
                        <div className="relative mx-auto w-full max-w-3xl px-4" style={{height: contentHeight}}>
                            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/15"/>
                            {nodes.map(({line, index, top}) => {
                                const isActive = index === activeIndex;
                                const onLeft = index % 2 === 0;
                                return (
                                    <button
                                        key={`${index}-${line.time}`}
                                        ref={isActive ? activeRef : undefined}
                                        type="button"
                                        onClick={() => onSelect(line.time)}
                                        title={`跳转到 ${formatTime(line.time)}`}
                                        aria-label={`跳转到 ${formatTime(line.time)}：${line.text}`}
                                        className="group absolute inset-x-0 grid -translate-y-1/2 grid-cols-[1fr_2rem_1fr] items-center"
                                        style={{top}}
                                    >
                                        <span className="flex min-w-0 justify-end pr-4 md:pr-8">
                                            {onLeft && <TimelineLabel text={line.text} active={isActive} align="right"/>}
                                        </span>
                                        <span className="flex justify-center">
                                            <span
                                                className={cn(
                                                    'rounded-full transition-all duration-300',
                                                    isActive
                                                        ? 'h-4 w-4'
                                                        : 'h-2.5 w-2.5 bg-white/30 group-hover:bg-white/60',
                                                )}
                                                style={isActive
                                                    ? {backgroundColor: accentColor, boxShadow: `0 0 16px ${accentColor}`}
                                                    : undefined}
                                            />
                                        </span>
                                        <span className="flex min-w-0 justify-start pl-4 md:pl-8">
                                            {!onLeft && <TimelineLabel text={line.text} active={isActive} align="left"/>}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
