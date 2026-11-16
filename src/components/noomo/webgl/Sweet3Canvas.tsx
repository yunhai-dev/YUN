'use client';

import React, { useEffect, useRef } from 'react';
import { noomoStore, useNoomoStore } from '../noomo-store';
import type { CrystalViewportEventPayload, Sweet3Engine } from './sweet3-runtime';

interface Sweet3CanvasProps {
  errorPage?: boolean;
}

interface CachedSweet3 {
  engine: Sweet3Engine;
  engineCtor: typeof Sweet3Engine;
  hostEl: HTMLDivElement;
  loadPromise: Promise<void>;
  loaded: boolean;
}

let cachedSweet3: CachedSweet3 | null = null;

function detectTouchOrTablet(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const isIpad = /iPad/.test(ua) || (platform === 'MacIntel' && maxTouchPoints > 1);
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || window.innerWidth < 1024;
  return isMobile || isIpad;
}

export const Sweet3Canvas: React.FC<Sweet3CanvasProps> = ({ errorPage = false }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Sweet3Engine | null>(null);
  const loadedRef = useRef(false);
  const state = useNoomoStore();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let activeEngine: Sweet3Engine | null = null;
    let activeCtor: typeof Sweet3Engine | null = null;

    const handleHover = (hoveredId: string | null) => {
      if (detectTouchOrTablet()) return;
      if (hoveredId === null) {
        noomoStore.setCursorHoverCase(false, '');
      } else {
        noomoStore.setCursorHoverCase(true, hoveredId);
      }
    };

    const handleCrystalViewport = (payload: CrystalViewportEventPayload) => {
      if (noomoStore.getSnapshot().sectionColor === 'dark') {
        noomoStore.setIceCubePositionByIndex(payload.id, {
          x: payload.position.x,
          y: payload.position.y,
        });
      }
    };

    const syncEngineState = (engine: Sweet3Engine) => {
      const snap = noomoStore.getSnapshot();
      engine.setIsContact(snap.contactTransition);
      engine.setIsCaseIce(snap.iceTransition);
      engine.setCaseVideo(snap.videoElement);
      engine.setIsCaseVideo(snap.videoTransition);
      engine.setPointerTrail(snap.cursorTransition);
      if (errorPage) {
        engine.setContactImage('404');
        engine.setIsContact(1);
      } else {
        engine.setIsContact(snap.contactTransition);
      }
    };

    const init = async () => {
      let entry = cachedSweet3;
      if (!entry) {
        const { Sweet3Engine: EngineCtor } = await import('./sweet3-runtime.js');
        if (cancelled) return;

        // Guard again after async import in case a concurrent mount created it
        if (!cachedSweet3) {
          const hostEl = document.createElement('div');
          hostEl.style.width = '100%';
          hostEl.style.height = '100%';
          container.appendChild(hostEl);

          const isMobileOrTablet = detectTouchOrTablet();
          const engine = new EngineCtor({
            container: hostEl,
            settings: {
              devMode: false,
              timeAtStart: 0,
              useDevCamera: false,
              isMobile: isMobileOrTablet,
            },
          });

          cachedSweet3 = {
            engine,
            engineCtor: EngineCtor,
            hostEl,
            loadPromise: engine.load(),
            loaded: false,
          };
        }
        entry = cachedSweet3;
      }

      if (entry.hostEl.parentElement !== container) {
        container.appendChild(entry.hostEl);
        window.dispatchEvent(new Event('resize'));
      }

      activeEngine = entry.engine;
      activeCtor = entry.engineCtor;
      engineRef.current = entry.engine;

      entry.engine.on(entry.engineCtor.hoverEvent, handleHover as (payload: never) => void);
      entry.engine.on(entry.engineCtor.crystalViewportEvent, handleCrystalViewport as (payload: never) => void);

      await entry.loadPromise;
      entry.loaded = true;
      if (cancelled) return;

      loadedRef.current = true;
      noomoStore.setSceneLoaded(true);

      syncEngineState(entry.engine);

      window.setTimeout(() => {
        if (!cancelled && engineRef.current) {
          engineRef.current.seek(noomoStore.getSnapshot().scrollProgress);
        }
      }, 700);
    };

    init().catch((err) => {
      console.error('[Sweet3Canvas] failed to initialize WebGL scene:', err);
    });

    const unsubAction = noomoStore.onAction(({ name, args }) => {
      if (!engineRef.current || !loadedRef.current) return;
      if (name === 'changeBirdColor' && args[0] === 'bird') {
        engineRef.current.releaseSpiritLight();
      }
    });

    return () => {
      cancelled = true;
      unsubAction();
      if (activeEngine && activeCtor) {
        activeEngine.off(activeCtor.hoverEvent, handleHover as (payload: never) => void);
        activeEngine.off(activeCtor.crystalViewportEvent, handleCrystalViewport as (payload: never) => void);
      }
      if (cachedSweet3 && cachedSweet3.hostEl.parentElement === container) {
        container.removeChild(cachedSweet3.hostEl);
      }
      engineRef.current = null;
    };
  }, [errorPage]);

  useEffect(() => {
    if (engineRef.current && loadedRef.current) {
      engineRef.current.setPointerTrail(state.cursorTransition);
    }
  }, [state.cursorTransition]);

  useEffect(() => {
    if (engineRef.current && loadedRef.current) {
      engineRef.current.seek(state.scrollProgress);
    }
  }, [state.scrollProgress]);

  useEffect(() => {
    if (engineRef.current && loadedRef.current) {
      engineRef.current.setIsContact(state.contactTransition);
    }
  }, [state.contactTransition]);

  useEffect(() => {
    if (engineRef.current && loadedRef.current) {
      engineRef.current.setIsCaseIce(state.iceTransition);
    }
  }, [state.iceTransition]);

  useEffect(() => {
    if (engineRef.current && loadedRef.current) {
      engineRef.current.setCaseVideo(state.videoElement);
    }
  }, [state.videoElement]);

  useEffect(() => {
    if (engineRef.current && loadedRef.current) {
      engineRef.current.setIsCaseVideo(state.videoTransition);
    }
  }, [state.videoTransition]);

  useEffect(() => {
    if (engineRef.current && loadedRef.current) {
      engineRef.current.setScrollSpeed(state.scrollSpeed);
    }
  }, [state.scrollSpeed]);

  return (
    <div
      ref={containerRef}
      className="fixed w-full h-screen top-0 left-0 pointer-events-none"
      data-testid="sweet3-canvas"
    />
  );
};
