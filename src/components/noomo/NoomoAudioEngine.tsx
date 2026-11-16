'use client';

import React, { useEffect, useRef } from 'react';
import { noomoStore } from './noomo-store';

export const NoomoAudioEngine: React.FC = () => {
  const crystalRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const spiritRef = useRef<HTMLAudioElement | null>(null);
  const activeClonesRef = useRef<Set<HTMLAudioElement>>(new Set());
  const rateLimitMapRef = useRef<Map<string, number[]>>(new Map());

  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let gainNode: GainNode | null = null;
    let bgBuffer: AudioBuffer | null = null;
    let bgSource: AudioBufferSourceNode | null = null;
    let disposed = false;

    const initBgAudio = async () => {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtx = new AudioCtx();
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.4;
        gainNode.connect(audioCtx.destination);

        const res = await fetch('/noomo/audio/BG_music_ST.mp3');
        const arr = await res.arrayBuffer();
        if (disposed) return;
        bgBuffer = await audioCtx.decodeAudioData(arr);

        if (noomoStore.getSnapshot().soundEnabled && !bgSource) {
          startBg();
        }
      } catch (err) {
        console.warn('[NoomoAudioEngine] Failed to decode BGM:', err);
      }
    };

    const startBg = () => {
      if (!audioCtx || !gainNode || !bgBuffer || bgSource) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      const src = audioCtx.createBufferSource();
      src.buffer = bgBuffer;
      src.loop = true;
      src.connect(gainNode);
      src.addEventListener('ended', () => {
        if (bgSource === src) bgSource = null;
      }, { once: true });
      bgSource = src;
      src.start();
    };

    const stopBg = () => {
      if (!bgSource) return;
      const src = bgSource;
      bgSource = null;
      try {
        src.stop();
        src.disconnect();
      } catch {
        // ignore already stopped
      }
    };

    const canPlay = (key: string) => {
      const now = Date.now();
      const recent = (rateLimitMapRef.current.get(key) ?? []).filter((t) => now - t < 1000);
      if (recent.length >= 5) {
        rateLimitMapRef.current.set(key, recent);
        return false;
      }
      recent.push(now);
      rateLimitMapRef.current.set(key, recent);
      return true;
    };

    const playSfx = (el: HTMLAudioElement | null, key: string, volume = 0.2) => {
      if (!el || !canPlay(key)) return;
      const clone = el.cloneNode(true) as HTMLAudioElement;
      clone.currentTime = 0;
      clone.volume = volume;
      activeClonesRef.current.add(clone);
      const cleanup = () => activeClonesRef.current.delete(clone);
      clone.addEventListener('ended', cleanup, { once: true });
      clone.addEventListener('error', cleanup, { once: true });
      clone.play().catch(cleanup);
    };

    const stopAllSfx = () => {
      activeClonesRef.current.forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });
      activeClonesRef.current.clear();
    };

    const handleVisibility = () => {
      const snap = noomoStore.getSnapshot();
      if (document.hidden) {
        noomoStore.setSoundEnabledBeforeTabHidden(snap.soundEnabled);
        if (snap.soundEnabled) {
          noomoStore.setEnableSound(false);
        }
        stopAllSfx();
        return;
      }
      if (snap.soundEnabledBeforeTabHidden) {
        noomoStore.setEnableSound(true);
      }
      noomoStore.setSoundEnabledBeforeTabHidden(false);
    };

    document.addEventListener('visibilitychange', handleVisibility);
    initBgAudio();

    const unsub = noomoStore.onAction(({ name, args }) => {
      const snap = noomoStore.getSnapshot();
      if (name === 'setEnableSound') {
        if (args[0]) startBg();
        else {
          stopBg();
          stopAllSfx();
        }
      } else if (name === 'playCubeSound') {
        if (!snap.soundEnabled) return;
        const idx = Math.floor(Math.random() * 5);
        playSfx(crystalRefs.current[idx] ?? null, `crystal${idx}`, 0.5);
      } else if (name === 'changeBirdColor') {
        if (!snap.soundEnabled) return;
        playSfx(spiritRef.current, 'spirit', 0.3);
      }
    });

    return () => {
      disposed = true;
      document.removeEventListener('visibilitychange', handleVisibility);
      unsub();
      stopBg();
      stopAllSfx();
      audioCtx?.close().catch(() => {});
    };
  }, []);

  return (
    <div className="hidden" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((num, idx) => (
        <audio
          key={num}
          ref={(el) => {
            crystalRefs.current[idx] = el;
          }}
          playsInline
        >
          <source src={`/noomo/audio/hover${num}.mp3`} type="audio/mp3" />
        </audio>
      ))}
      <audio ref={spiritRef} playsInline>
        <source src="/noomo/audio/ReleaseSpirit.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
};
