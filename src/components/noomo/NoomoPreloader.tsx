'use client';

import React, { useEffect, useRef, useState } from 'react';
import { noomoStore } from './noomo-store';

const PreloaderWordmark: React.FC<{
  still?: boolean;
  lineRef?: React.Ref<SVGGElement>;
}> = ({ still = false, lineRef }) => (
  <div
    className="relative w-full h-dvh font-serif-sc text-[clamp(8rem,44vw,28rem)] leading-[0.95] tracking-[0.02em] text-white select-none"
    aria-label="YUN / HAI"
  >
    <svg
      role="img"
      aria-label="YUN / HAI"
      className="absolute inset-0 h-full w-full text-white"
      preserveAspectRatio="none"
    >
      {still ? (
        <line
          x1="70%"
          y1="0%"
          x2="30%"
          y2="100%"
          stroke="currentColor"
          strokeWidth="6"
          vectorEffect="non-scaling-stroke"
        />
      ) : (
        <g ref={lineRef} stroke="currentColor" strokeWidth="6" strokeDasharray="1 1" strokeDashoffset="1">
          <line
            x1="50%"
            y1="50%"
            x2="70%"
            y2="0%"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="50%"
            y1="50%"
            x2="30%"
            y2="100%"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      )}
      <text
        x="1.5%"
        y="25%"
        dominantBaseline="middle"
        className={`preloader-word${still ? ' preloader-word--static' : ''}`}
        aria-hidden="true"
      >
        YUN
      </text>
      <text
        x="98.5%"
        y="75%"
        textAnchor="end"
        dominantBaseline="middle"
        className={`preloader-word${still ? ' preloader-word--static' : ' preloader-word--delay'}`}
        aria-hidden="true"
      >
        HAI
      </text>
    </svg>
  </div>
);

export const NoomoPreloader: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [revealing, setRevealing] = useState(false);
  const [hold, setHold] = useState(false);
  const [lineReady, setLineReady] = useState(false);
  const [wordmarkDone, setWordmarkDone] = useState(false);
  const lineRef = useRef<SVGGElement | null>(null);

  // `?preloader=hold` keeps the loading screen mounted for visual tuning.
  useEffect(() => {
    const mode = new URLSearchParams(window.location.search).get('preloader');
    if (mode === 'hold') setHold(true);
  }, []);

  // Keep the animated layer until the stroke draw and fill have finished; swapping to the
  // static split copies mid-animation reads as a stutter.
  useEffect(() => {
    const timer = window.setTimeout(() => setWordmarkDone(true), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  // The engine only exposes a completion flag, so ease the divider toward full while it loads
  // and snap it to 100% once the scene is ready.
  useEffect(() => {
    let raf = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const loaded = noomoStore.getSnapshot().sceneLoaded;
      const elapsed = (now - startedAt) / 1000;
      const progress = loaded ? 1 : 0.97 * (1 - Math.exp(-elapsed / 3));
      if (lineRef.current) {
        lineRef.current.style.strokeDashoffset = String(1 - progress);
      }
      if (loaded) {
        setLineReady(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!lineReady || !wordmarkDone || revealing || !visible || hold) return;

    setRevealing(true);
    noomoStore.getSnapshot().scroll?.paused(false);
  }, [lineReady, wordmarkDone, revealing, visible, hold]);

  useEffect(() => {
    if (!revealing) return;
    const timer = window.setTimeout(() => setVisible(false), 1600);
    return () => window.clearTimeout(timer);
  }, [revealing]);

  if (!visible) return null;

  return (
    <div
      className="preloader fixed z-100 w-full h-full top-0 left-0"
      style={{ pointerEvents: revealing ? 'none' : 'auto' }}
    >
      {!revealing ? (
        <div className="preloader-panel">
          <PreloaderWordmark lineRef={lineRef} />
        </div>
      ) : (
        <>
          <div className="preloader-panel preloader-panel--left preloader-panel--splitting">
            <PreloaderWordmark still />
          </div>
          <div className="preloader-panel preloader-panel--right preloader-panel--splitting">
            <PreloaderWordmark still />
          </div>
        </>
      )}
    </div>
  );
};
