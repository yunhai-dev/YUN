'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { noomoStore, useNoomoStore } from './noomo-store';

export const NoomoPreloader: React.FC = () => {
  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [revealing, setRevealing] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const state = useNoomoStore();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const tween = gsap.fromTo(
      stage,
      { scale: 0.8, autoAlpha: 0, rotate: -14 },
      { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.9, ease: 'power3.out' }
    );
    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!state.sceneLoaded || revealing || !visible) return;

    setRevealing(true);
    const el = preloaderRef.current;
    const wrapper = wrapperRef.current;
    if (!el) {
      setVisible(false);
      return;
    }

    gsap.set(el, { '--reveal-radius': '0vmax' } as gsap.TweenVars);
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        tlRef.current = null;
      },
    });
    tlRef.current = tl;

    if (wrapper) {
      tl.to(wrapper, { autoAlpha: 0, scale: 0.92, duration: 2, ease: 'power1.out' }, 0);
    }
    const timer = window.setTimeout(() => {
      noomoStore.getSnapshot().scroll?.paused(false);
    }, 1200);

    tl.to(el, { '--reveal-radius': '200vmax', duration: 2, ease: 'power3.inOut' } as gsap.TweenVars, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [state.sceneLoaded, revealing, visible]);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={preloaderRef}
      className={`preloader fixed z-100 w-full h-full flex justify-center items-center top-0 left-0 ${
        revealing ? 'preloader--revealing' : ''
      }`}
    >
      <div ref={wrapperRef} className="wrapper flex flex-col items-center gap-8">
        <div ref={stageRef} className="noomo-loader-stage">
          <div className="noomo-loader-aura" aria-hidden="true" />
          <div className="noomo-loader-ring-outer" aria-hidden="true" />
          <div className="noomo-loader-ring-inner" aria-hidden="true" />
          <div className="noomo-loader-disc">
            <img
              alt="Clouisle Mark"
              className="noomo-loader-mark"
              src="/noomo/images/clouisle-mark.svg"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p
            className="text-sans-16 text-brand-black/85"
            style={{ letterSpacing: '0.22em', fontWeight: 500 }}
          >
            YUNHAI · 云云亦海
          </p>
          <div className="noomo-loader-track" aria-hidden="true">
            <div
              className={`noomo-loader-bar ${state.sceneLoaded ? 'noomo-loader-bar--done' : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
