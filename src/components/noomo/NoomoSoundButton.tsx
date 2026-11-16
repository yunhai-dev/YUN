'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { noomoStore, useNoomoStore } from './noomo-store';

const WAVE_COLORS = ['#FB5959', '#41B8FF', '#52D273', '#F7C948', '#B388FF'];

export const NoomoSoundButton: React.FC = () => {
  const state = useNoomoStore();
  const circleRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const lastColorIdxRef = useRef(-1);

  const pickColor = () => {
    let idx = Math.floor(Math.random() * WAVE_COLORS.length);
    if (idx === lastColorIdxRef.current) {
      idx = (idx + 1) % WAVE_COLORS.length;
    }
    lastColorIdxRef.current = idx;
    return WAVE_COLORS[idx];
  };

  const handleClick = () => {
    const next = !state.soundEnabled;
    noomoStore.setEnableSound(next);

    tweenRef.current?.kill();
    const circle = circleRef.current;
    if (circle) {
      const color = pickColor();
      gsap.set(circle, {
        scale: 0.2,
        opacity: 0.99,
        borderColor: color,
        backgroundColor: `${color}1A`,
      });
      tweenRef.current = gsap.to(circle, {
        scale: 26,
        opacity: 0,
        duration: 3,
        ease: 'power3.out',
        onComplete: () => {
          if (circleRef.current) {
            gsap.set(circleRef.current, { clearProps: 'transform,opacity,borderColor,backgroundColor' });
          }
        },
      });
    }
  };

  const isVisible =
    (state.experienceStarted || state.currentPage !== 'home') && !state.mobileMenuOpen;

  return (
    <div
      className={`fixed z-10 xs:right-20 lg:right-[unset] lg:left-54 bottom-25 opacity-0 pointer-events-none transition-opacity duration-500 delay-200 ${
        isVisible ? 'opacity-100 !pointer-events-auto' : ''
      }`}
    >
      <div
        className={`sound-button cursor-pointer ${state.soundEnabled ? 'active' : ''} ${
          state.sectionColor === 'dark' ? 'dark' : ''
        }`}
        onClick={handleClick}
        onMouseEnter={() => noomoStore.setCursorHover(true)}
        onMouseLeave={() => noomoStore.setCursorHover(false)}
      >
        <div className="wrapper relative h-48 w-48 xs:h-48 xs:w-48 lg:w-59 lg:h-59 rounded-full bg-white/31 overflow-hidden">
          <div
            className={`gradient gradient-1 opacity-0 transition-all duration-300 delay-700 absolute w-full h-full top-0 left-0 z-1 ${
              state.experienceStarted ? 'opacity-100' : ''
            }`}
          />
          <div
            className={`gradient gradient-2 opacity-0 transition-all duration-300 delay-700 absolute w-full h-full top-0 left-0 z-2 ${
              state.experienceStarted ? 'opacity-100' : ''
            }`}
          />
          <img
            alt="sound button"
            src="/noomo/images/svg/soundBorder.svg"
            className="border-circle relative z-3 transition-all duration-600 ease-in-out w-full h-full"
          />
          <div
            className={`flex gap-2 absolute z-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-end h-10 transition-opacity duration-300 ${
              state.soundEnabled ? 'opacity-100' : 'opacity-45'
            }`}
          >
            <div className="line transition-all duration-400 ease-in-out line-1 w-2 h-2 bg-brand-blue-500 rounded-full" />
            <div className="line transition-all duration-400 ease-in-out line-2 w-2 h-2 bg-brand-blue-500 rounded-full" />
            <div className="line transition-all duration-400 ease-in-out line-3 w-2 h-2 bg-brand-blue-500 rounded-full" />
            <div className="line transition-all duration-400 ease-in-out line-4 w-2 h-2 bg-brand-blue-500 rounded-full" />
            <div className="line transition-all duration-400 ease-in-out line-5 w-2 h-2 bg-brand-blue-500 rounded-full" />
          </div>
          <div
            className={`w-10 bottom-line transition-all duration-400 ease-in-out h-2 rounded-full bg-brand-blue-500 absolute z-4 left-1/2 -translate-x-1/2 ${
              state.soundEnabled ? 'opacity-0' : 'opacity-90'
            }`}
            style={{ bottom: state.soundEnabled ? '-1rem' : '1.3rem' }}
          />
          <div ref={circleRef} className="circle" />
        </div>
      </div>
    </div>
  );
};
