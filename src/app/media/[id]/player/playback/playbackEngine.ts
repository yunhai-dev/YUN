import type { RefObject } from 'react';
import { clampCrossfadeSeconds, equalPowerGains, planOverlap } from './crossfade';

/**
 * Framework-free playback engine for the music player.
 *
 * The two <audio> decks live in the /media layout so they survive route changes between songs.
 * Crossfading needs Web Audio: iOS Safari exposes HTMLMediaElement.volume as read-only, so fading
 * through element.volume silently does nothing on iPhone. Both decks therefore load with
 * crossOrigin="anonymous" and are routed through a MediaElementSource → GainNode graph; the
 * element volume stays at 1 and all fades are written to the gain nodes.
 */

export interface PlaybackTrack {
    id: string;
    url: string;
    title: string;
    author: string;
    imageUrl: string;
    nextId: string | null;
    nextUrl: string | null;
    prevId: string | null;
}

export interface PlaybackSnapshot {
    trackId: string | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    autoPlay: boolean;
    transitioning: boolean;
}

export interface TransitionSettings {
    enabled: boolean;
    seconds: number;
}

type AdvanceHandler = (trackId: string) => void;
type ErrorHandler = (error: unknown) => void;

const INITIAL_SNAPSHOT: PlaybackSnapshot = {
    trackId: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    autoPlay: false,
    transitioning: false,
};

const MEDIA_SESSION_ACTIONS = ['play', 'pause', 'previoustrack', 'nexttrack'] as const;

const isNotAllowedError = (error: unknown): boolean =>
    typeof error === 'object' && error !== null && 'name' in error && (error as {name?: string}).name === 'NotAllowedError';

export class PlaybackEngine {
    private decks: [HTMLAudioElement, HTMLAudioElement] | null = null;
    private activeIndex = 0;
    private track: PlaybackTrack | null = null;
    private pendingTrack: PlaybackTrack | null = null;
    private snapshot: PlaybackSnapshot = INITIAL_SNAPSHOT;

    private readonly listeners = new Set<() => void>();
    private advanceHandler: AdvanceHandler | null = null;
    private errorHandler: ErrorHandler | null = null;
    private settings: TransitionSettings = {enabled: true, seconds: 5};

    private fading = false;
    private fadeOverlap = 0;
    private raf = 0;
    private lastEmit = 0;
    private autoPlayHydrated = false;

    private audioContext: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private readonly deckGains = new WeakMap<HTMLAudioElement, GainNode>();
    private readonly connectedDecks = new WeakSet<HTMLAudioElement>();

    /**
     * Visualizer hosts keep this ref and read `.current` every animation frame. The object identity
     * must never change, and the getter must always resolve to the deck the UI belongs to — after
     * a handoff that is the incoming deck, even while the outgoing one is still fading out.
     */
    private readonly activeRef: RefObject<HTMLAudioElement | null>;

    constructor() {
        this.activeRef = {} as RefObject<HTMLAudioElement | null>;
        Object.defineProperty(this.activeRef, 'current', {
            get: () => this.getActiveElement(),
        });
    }

    subscribe = (listener: () => void): (() => void) => {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    };

    getSnapshot = (): PlaybackSnapshot => this.snapshot;

    getActiveRefObject(): RefObject<HTMLAudioElement | null> {
        return this.activeRef;
    }

    getActiveElement(): HTMLAudioElement | null {
        return this.decks ? this.decks[this.activeIndex] : null;
    }

    setAdvanceHandler(handler: AdvanceHandler | null): void {
        this.advanceHandler = handler;
    }

    setErrorHandler(handler: ErrorHandler | null): void {
        this.errorHandler = handler;
    }

    setTransitionSettings(settings: TransitionSettings): void {
        const enabled = settings.enabled === true;
        const seconds = clampCrossfadeSeconds(settings.seconds);
        if (this.settings.enabled === enabled && this.settings.seconds === seconds) return;
        this.settings = {enabled, seconds};
        if (!enabled && this.fading) this.cancelFade();
    }

    getAutoPlay(): boolean {
        return this.snapshot.autoPlay;
    }

    /** The old "即将播放下一首" toast would compete with the fade, so suppress it. */
    shouldSuppressEndToast(): boolean {
        return this.settings.enabled && this.snapshot.autoPlay;
    }

    isCrossfading(): boolean {
        return this.fading;
    }

    attachDecks(deckA: HTMLAudioElement, deckB: HTMLAudioElement): void {
        if (this.decks && this.decks[0] === deckA && this.decks[1] === deckB) return;
        this.detachDecks();
        this.decks = [deckA, deckB];
        this.setupDeck(deckA);
        this.setupDeck(deckB);
        this.hydrateAutoPlay();
        this.installMediaSessionHandlers();
        if (this.pendingTrack) {
            const pending = this.pendingTrack;
            this.pendingTrack = null;
            this.loadTrack(pending);
        }
        this.ensureRaf();
    }

    detachDecks(): void {
        if (!this.decks) return;
        for (const deck of this.decks) {
            deck.pause();
            this.teardownDeck(deck);
        }
        this.stopRaf();
        this.decks = null;
        this.fading = false;
        this.fadeOverlap = 0;
        this.setSnapshot({isPlaying: false});
        this.clearMediaSessionHandlers();
    }

    /** Called by the page for every route mount; idempotent for the auto-advanced track. */
    bindTrack(track: PlaybackTrack): void {
        this.track = track;

        // Child effects run before the provider's, so the first bind can happen before the decks
        // are attached. Remember it and load when attachDecks runs.
        if (!this.decks) {
            this.pendingTrack = track;
            this.setSnapshot({trackId: track.id});
            return;
        }

        // Auto-advance already swapped the decks and keeps playing; a route remount must not
        // restart the audio. It only refreshes the next-track routing data.
        if (this.snapshot.trackId === track.id) {
            // During a handoff the standby deck is the outgoing song, still fading out; the
            // fade-end path preloads the next track once that deck is free.
            if (!this.fading) this.preloadStandby(track.nextUrl);
            this.updateMediaSession();
            return;
        }

        this.loadTrack(track);
    }

    async play(notify = false): Promise<void> {
        const active = this.getActiveElement();
        if (!active) return;

        this.ensureAudioGraph();
        await this.resumeAudioContext();

        try {
            const jobs: Promise<void>[] = [active.play()];
            if (this.fading) {
                const standby = this.getStandbyElement();
                if (standby) jobs.push(standby.play());
            }
            await Promise.all(jobs);
        } catch (error) {
            if (notify && !isNotAllowedError(error)) this.reportError(error);
            else console.warn('Audio playback was blocked or failed:', error);
        }

        this.syncFromActive();
        this.ensureRaf();
    }

    pause(): void {
        const active = this.getActiveElement();
        if (!active) return;
        active.pause();
        if (this.fading) this.getStandbyElement()?.pause();
        this.syncFromActive();
    }

    togglePlay(): void {
        const active = this.getActiveElement();
        if (!active) return;
        if (active.paused || active.ended) {
            if (active.ended) active.currentTime = 0;
            void this.play(true);
        } else {
            this.pause();
        }
    }

    seek(time: number): void {
        const active = this.getActiveElement();
        if (!active) return;
        if (this.fading) this.cancelFade();
        const duration = Number.isFinite(active.duration) ? active.duration : 0;
        const target = Math.max(0, duration > 0 ? Math.min(time, duration) : time);
        active.currentTime = target;
        this.syncFromActive();
    }

    /** Manual track changes: stop both decks, cancel any fade, leave routing to the caller. */
    clearState(): void {
        this.cancelFade();
        for (const deck of this.decks ?? []) {
            deck.pause();
            deck.currentTime = 0;
        }
        this.setSnapshot({
            isPlaying: false,
            currentTime: 0,
            duration: this.getActiveElement()?.duration ?? 0,
            transitioning: false,
        });
    }

    setAutoPlay(enabled: boolean): void {
        if (this.snapshot.autoPlay === enabled) return;
        this.persistAutoPlay(enabled);
        this.setSnapshot({autoPlay: enabled});
    }

    private loadTrack(track: PlaybackTrack): void {
        const active = this.getActiveElement();
        if (!active) return;

        this.cancelFade();
        for (const deck of this.decks ?? []) {
            deck.pause();
            deck.currentTime = 0;
        }

        active.src = track.url;
        active.load();
        this.track = track;
        this.preloadStandby(track.nextUrl);
        this.setSnapshot({
            trackId: track.id,
            currentTime: 0,
            duration: 0,
            isPlaying: false,
            transitioning: false,
        });
        this.updateMediaSession();

        if (this.snapshot.autoPlay) void this.play(false);
    }

    private getStandbyElement(): HTMLAudioElement | null {
        if (!this.decks) return null;
        return this.decks[1 - this.activeIndex];
    }

    private preloadStandby(url: string | null): void {
        const standby = this.getStandbyElement();
        if (!standby) return;
        if (!url) {
            standby.removeAttribute('src');
            standby.load();
            return;
        }
        if (standby.src === url) return;
        standby.src = url;
        standby.load();
    }

    private setupDeck(deck: HTMLAudioElement): void {
        // Must be set before a src is assigned; a media element that is later routed through Web
        // Audio without CORS mode outputs silence.
        deck.crossOrigin = 'anonymous';
        deck.preload = 'auto';
        deck.addEventListener('timeupdate', this.handleTick);
        deck.addEventListener('loadedmetadata', this.handleTick);
        deck.addEventListener('durationchange', this.handleTick);
        deck.addEventListener('play', this.handleTick);
        deck.addEventListener('pause', this.handleTick);
        deck.addEventListener('ended', this.handleTick);
        deck.addEventListener('error', this.handleDeckError);
    }

    private teardownDeck(deck: HTMLAudioElement): void {
        deck.removeEventListener('timeupdate', this.handleTick);
        deck.removeEventListener('loadedmetadata', this.handleTick);
        deck.removeEventListener('durationchange', this.handleTick);
        deck.removeEventListener('play', this.handleTick);
        deck.removeEventListener('pause', this.handleTick);
        deck.removeEventListener('ended', this.handleTick);
        deck.removeEventListener('error', this.handleDeckError);
    }

    private readonly handleTick = (): void => {
        this.tick();
    };

    private readonly handleDeckError = (event: Event): void => {
        const deck = event.currentTarget as HTMLAudioElement | null;
        if (!deck || deck !== this.getActiveElement() || !deck.error) return;
        this.reportError(deck.error);
    };

    private tick(): void {
        const active = this.getActiveElement();
        if (!active || !this.decks) {
            this.stopRaf();
            return;
        }

        const duration = Number.isFinite(active.duration) ? active.duration : 0;

        if (active.ended && this.snapshot.autoPlay && duration > 0) {
            if (this.fading) this.completeFade();
            else this.hardAdvance();
            return;
        }

        if (this.fading) {
            this.stepFade();
        } else if (this.snapshot.autoPlay && this.settings.enabled) {
            this.maybeStartFade(active, duration);
        }

        const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
        if (now - this.lastEmit >= 90) {
            this.lastEmit = now;
            this.syncFromActive();
        }

        // A fade paused by the listener freezes both decks; without this check the
        // loop would keep scheduling frames until playback resumes.
        const standby = this.getStandbyElement();
        const playing = !active.paused || (this.fading && standby !== null && !standby.paused);
        if (playing) this.ensureRaf();
        else this.stopRaf();
    }

    private maybeStartFade(active: HTMLAudioElement, duration: number): void {
        const nextId = this.track?.nextId ?? null;
        if (!this.track?.nextUrl || !nextId || this.fading) return;
        const overlap = planOverlap(duration, active.currentTime, this.settings.seconds);
        if (overlap <= 0) return;
        if (duration - active.currentTime > overlap) return;

        const incoming = this.getStandbyElement();
        if (!incoming) return;
        // The preload is not ready yet; if the song ends first the tick falls back to a hard cut.
        if (incoming.readyState < 2) return;

        this.fading = true;
        this.fadeOverlap = overlap;
        this.setGain(this.activeIndex, 1);
        this.setGain(1 - this.activeIndex, 0);
        incoming.currentTime = 0;

        // Hand the "active" role to the incoming deck right away: the route (and with it the
        // lyrics, progress bar and now-playing info) advances as the fade begins, so the next
        // song's opening lines are on screen while its audio is still fading in. The outgoing
        // deck keeps playing as the fading-out standby until the overlap elapses.
        this.activeIndex = 1 - this.activeIndex;
        this.ensureAudioGraph();
        void this.resumeAudioContext();

        incoming.play().catch((error) => {
            console.warn('Crossfade could not start the next track; falling back to a hard cut:', error);
            this.cancelFade();
        });

        this.setSnapshot({
            trackId: nextId,
            currentTime: 0,
            duration: Number.isFinite(incoming.duration) ? incoming.duration : 0,
            isPlaying: true,
            transitioning: true,
        });
        this.advanceHandler?.(nextId);
        this.ensureRaf();
    }

    private stepFade(): void {
        const incoming = this.getActiveElement();
        const outgoing = this.getStandbyElement();
        if (!incoming || !outgoing) {
            this.cancelFade();
            return;
        }

        // The incoming deck is the clock: pausing freezes both decks, and resuming continues the
        // fade from the same progress instead of jumping forward with the wall clock.
        const progress = this.fadeOverlap > 0 ? Math.min(1, incoming.currentTime / this.fadeOverlap) : 1;
        const gains = equalPowerGains(progress);
        this.setGain(this.activeIndex, gains.in);
        this.setGain(1 - this.activeIndex, gains.out);

        if (progress >= 1 || incoming.ended || outgoing.ended) this.completeFade();
    }

    private completeFade(): void {
        const incoming = this.getActiveElement();
        const outgoing = this.getStandbyElement();
        if (!incoming || !outgoing) {
            this.cancelFade();
            return;
        }

        outgoing.pause();
        outgoing.currentTime = 0;
        this.setGain(this.activeIndex, 1);
        this.setGain(1 - this.activeIndex, 0);
        this.fading = false;
        this.fadeOverlap = 0;

        // The route advanced when the fade began, so the standby deck is free now: warm the
        // track after this one for the next handoff.
        this.preloadStandby(this.track?.nextUrl ?? null);
        this.setSnapshot({
            // The incoming deck is already `fadeOverlap` seconds in; the snapshot follows it.
            currentTime: Number.isFinite(incoming.currentTime) ? incoming.currentTime : 0,
            duration: Number.isFinite(incoming.duration) ? incoming.duration : 0,
            isPlaying: !incoming.paused && !incoming.ended,
            transitioning: false,
        });

        this.ensureRaf();
    }

    private cancelFade(): void {
        if (!this.fading) return;
        this.fading = false;
        this.fadeOverlap = 0;

        const standby = this.getStandbyElement();
        if (standby) {
            standby.pause();
            standby.currentTime = 0;
        }
        this.setGain(this.activeIndex, 1);
        this.setSnapshot({transitioning: false});
    }

    private hardAdvance(): void {
        const nextId = this.track?.nextId ?? null;
        if (!nextId) {
            this.pause();
            return;
        }
        this.clearState();
        this.advanceHandler?.(nextId);
    }

    private syncFromActive(): void {
        const active = this.getActiveElement();
        if (!active) return;
        // During a handoff the incoming deck is already "active" while its play() promise is
        // still pending; keep reporting playing as long as the outgoing deck is audible.
        const outgoing = this.fading ? this.getStandbyElement() : null;
        this.setSnapshot({
            currentTime: Number.isFinite(active.currentTime) ? active.currentTime : 0,
            duration: Number.isFinite(active.duration) ? active.duration : 0,
            isPlaying: (!active.paused && !active.ended && active.readyState > 2) ||
                (outgoing !== null && !outgoing.paused && !outgoing.ended),
        });
    }

    private setSnapshot(patch: Partial<PlaybackSnapshot>): void {
        let changed = false;
        const next = {...this.snapshot};
        const writable = next as Record<string, unknown>;
        for (const key of Object.keys(patch) as (keyof PlaybackSnapshot)[]) {
            const value = patch[key];
            if (value === undefined || Object.is(next[key], value)) continue;
            writable[key] = value;
            changed = true;
        }
        if (!changed) return;
        this.snapshot = next;
        for (const listener of this.listeners) {
            try {
                listener();
            } catch (error) {
                console.error('Playback subscriber failed:', error);
            }
        }
    }

    private ensureRaf(): void {
        if (typeof window === 'undefined' || this.raf !== 0) return;
        this.raf = window.requestAnimationFrame(() => {
            this.raf = 0;
            this.tick();
        });
    }

    private stopRaf(): void {
        if (!this.raf || typeof window === 'undefined') return;
        window.cancelAnimationFrame(this.raf);
        this.raf = 0;
    }

    private ensureAudioGraph(): void {
        if (this.audioContext || typeof window === 'undefined' || !this.decks) return;
        const ContextCtor = window.AudioContext
            ?? (window as unknown as {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
        if (!ContextCtor) return;

        try {
            const context = new ContextCtor();
            const master = context.createGain();
            master.gain.value = 1;
            master.connect(context.destination);
            this.audioContext = context;
            this.masterGain = master;
            for (const deck of this.decks) this.connectDeck(deck);
        } catch (error) {
            console.warn('Web Audio is unavailable; falling back to element volume.', error);
            this.audioContext = null;
            this.masterGain = null;
        }
    }

    private connectDeck(deck: HTMLAudioElement): void {
        if (!this.audioContext || !this.masterGain) return;
        if (this.connectedDecks.has(deck) || this.deckGains.has(deck)) return;

        try {
            const source = this.audioContext.createMediaElementSource(deck);
            const gain = this.audioContext.createGain();
            gain.gain.value = 1;
            source.connect(gain);
            gain.connect(this.masterGain);
            this.deckGains.set(deck, gain);
            this.connectedDecks.add(deck);
        } catch (error) {
            console.warn('Could not route an audio deck through Web Audio.', error);
        }
    }

    private setGain(index: number, value: number): void {
        const deck = this.decks?.[index];
        if (!deck) return;
        const gain = this.deckGains.get(deck);
        if (gain) {
            gain.gain.value = value;
            return;
        }
        try {
            deck.volume = value;
        } catch {
            // iOS Safari treats volume as read-only; the Web Audio path above is the real fix.
        }
    }

    private async resumeAudioContext(): Promise<void> {
        if (!this.audioContext || this.audioContext.state !== 'suspended') return;
        try {
            await this.audioContext.resume();
        } catch (error) {
            console.warn('AudioContext could not resume:', error);
        }
    }

    private hydrateAutoPlay(): void {
        if (this.autoPlayHydrated || typeof window === 'undefined') return;
        this.autoPlayHydrated = true;
        try {
            this.setSnapshot({autoPlay: window.localStorage.getItem('autoPlay') === 'true'});
        } catch {
            // Storage can be unavailable in private modes; keep the default.
        }
    }

    private persistAutoPlay(enabled: boolean): void {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem('autoPlay', String(enabled));
        } catch {
            // Ignore quota/security errors.
        }
    }

    private updateMediaSession(): void {
        if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
        if (typeof MediaMetadata === 'undefined' || !this.track) return;
        try {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: this.track.title,
                artist: this.track.author,
                artwork: [
                    {
                        src: this.track.imageUrl,
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            });
        } catch (error) {
            console.warn('Could not update MediaSession metadata:', error);
        }
    }

    private installMediaSessionHandlers(): void {
        if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
        try {
            navigator.mediaSession.setActionHandler('play', () => void this.play(true));
            navigator.mediaSession.setActionHandler('pause', () => this.pause());
            navigator.mediaSession.setActionHandler('previoustrack', () => this.skipTo(this.track?.prevId ?? null));
            navigator.mediaSession.setActionHandler('nexttrack', () => this.skipTo(this.track?.nextId ?? null));
        } catch (error) {
            console.warn('Could not install MediaSession handlers:', error);
        }
    }

    private clearMediaSessionHandlers(): void {
        if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
        for (const action of MEDIA_SESSION_ACTIONS) {
            try {
                navigator.mediaSession.setActionHandler(action, null);
            } catch {
                // Not every action is supported in every browser.
            }
        }
    }

    private skipTo(trackId: string | null): void {
        if (!trackId) return;
        this.clearState();
        this.advanceHandler?.(trackId);
    }

    private reportError(error: unknown): void {
        console.error('Audio playback failed:', error);
        this.errorHandler?.(error);
    }
}

export const playbackEngine = new PlaybackEngine();
