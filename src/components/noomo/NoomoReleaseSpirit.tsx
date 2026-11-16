'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { noomoStore, useNoomoStore } from './noomo-store';

const LABEL = 'Awaken the Tide';
const LETTERS = LABEL.split('');
const CENTER_INDEX = (() => {
  const idx = LABEL.toLowerCase().indexOf('t');
  return idx >= 0 ? idx : Math.floor(LETTERS.length / 2);
})();
const WAVE_COLORS = ['#FB5959', '#41B8FF', '#52D273', '#F7C948', '#B388FF'];

export const NoomoReleaseSpirit: React.FC = () => {
  const state = useNoomoStore();
  const circleRef = useRef<HTMLDivElement | null>(null);
  const birdRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const circleTweenRef = useRef<gsap.core.Tween | null>(null);
  const textTlRef = useRef<gsap.core.Timeline | null>(null);
  const lastColorIdxRef = useRef(-1);

  const pickColor = () => {
    let idx = Math.floor(Math.random() * WAVE_COLORS.length);
    if (idx === lastColorIdxRef.current) idx = (idx + 1) % WAVE_COLORS.length;
    lastColorIdxRef.current = idx;
    return WAVE_COLORS[idx];
  };

  const resetEffects = () => {
    if (circleRef.current) {
      gsap.set(circleRef.current, { clearProps: 'transform,opacity,borderColor,backgroundColor' });
    }
    if (birdRef.current) {
      gsap.set(birdRef.current, { clearProps: 'filter' });
    }
    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length) {
      gsap.set(letters, { clearProps: 'color,filter' });
    }
  };

  useEffect(() => {
    circleTweenRef.current?.kill();
    textTlRef.current?.kill();
    resetEffects();
    return () => {
      circleTweenRef.current?.kill();
      textTlRef.current?.kill();
    };
  }, [state.sectionColor]);

  const handleClick = () => {
    noomoStore.changeBirdColor(state.sectionColor === 'dark' ? 'fire' : 'bird');
    circleTweenRef.current?.kill();
    textTlRef.current?.kill();
    resetEffects();

    if (circleRef.current) {
      const color = pickColor();
      gsap.set(circleRef.current, {
        scale: 0.2,
        opacity: 0.99,
        borderColor: color,
        backgroundColor: `${color}1A`,
      });
      circleTweenRef.current = gsap.to(circleRef.current, {
        scale: 26,
        opacity: 0,
        duration: 3,
        ease: 'power3.out',
        onComplete: () => {
          if (circleRef.current) {
            gsap.set(circleRef.current, {
              clearProps: 'transform,opacity,borderColor,backgroundColor',
            });
          }
        },
      });
    }

    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!textRef.current || !letters.length) return;
    const origColor = getComputedStyle(textRef.current).color;
    const tl = gsap.timeline({
      onComplete: () => {
        resetEffects();
      },
    });
    textTlRef.current = tl;

    if (birdRef.current) {
      tl.to(
        birdRef.current,
        {
          filter:
            state.sectionColor !== 'dark'
              ? 'brightness(100%) saturate(100%) invert(100%) blur(3px)'
              : 'brightness(100%) saturate(100%) invert(0%) blur(3px)',
          duration: 0.2,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        },
        0
      );
    }

    tl.to(
      letters,
      {
        color: '#ffffff',
        filter: 'blur(3px)',
        duration: 0.16,
        ease: 'power2.out',
        stagger: {
          each: 0.03,
          from: CENTER_INDEX,
        },
      },
      0
    ).to(
      letters,
      {
        color: origColor,
        filter: 'blur(0px)',
        duration: 0.25,
        ease: 'power2.inOut',
        stagger: {
          each: 0.03,
          from: CENTER_INDEX,
        },
      },
      0.16
    );
  };

  const isDark = state.sectionColor === 'dark';
  const hiddenInDarkNonFire = isDark && !state.fireSection;
  const hiddenByPageOrMenu = state.currentPage !== 'home' || state.mobileMenuOpen;

  return (
    <div
      className={`fixed z-10 release-spirit xs:right-[unset] xs:left-20 lg:left-[unset] lg:right-37 bottom-25 cursor-pointer opacity-0 pointer-events-none transition-all duration-500 delay-200 ${
        state.experienceStarted ? 'opacity-100 !pointer-events-auto' : ''
      } ${isDark ? 'dark' : ''} ${hiddenInDarkNonFire ? '!opacity-0 !pointer-events-none w-182' : ''} ${
        hiddenByPageOrMenu ? '!opacity-0 !pointer-events-none' : ''
      }`}
      onMouseEnter={() => noomoStore.setCursorHover(true)}
      onMouseLeave={() => noomoStore.setCursorHover(false)}
      onClick={handleClick}
    >
      <div className="wrapper w-220 relative h-46 flex pl-22 pr-20 items-center justify-between bg-white/25 rounded-full">
        <div
          className={`gradient gradient-1 opacity-0 transition-all duration-300 delay-700 absolute w-full h-full top-0 left-0 z-1 ${
            state.experienceStarted ? 'opacity-100' : ''
          } ${hiddenInDarkNonFire ? '!opacity-0 !pointer-events-none' : ''}`}
        />
        <div
          className={`gradient gradient-2 opacity-0 transition-all duration-300 delay-700 absolute w-full h-full top-0 left-0 z-2 ${
            state.experienceStarted ? 'opacity-100' : ''
          } ${hiddenInDarkNonFire ? '!opacity-0 !pointer-events-none' : ''}`}
        />
        <div className="bb" />
        <div className="relative z-3">
          <img
            ref={birdRef}
            alt="bird"
            className={`w-24 select-none ${isDark ? 'brightness-0 invert' : ''}`}
            src="/noomo/images/text_icons/pixelBird.png"
          />
        </div>
        <div className="relative z-3">
          <p
            ref={textRef}
            className={`label text-sans-18 text-brand-black select-none ${isDark ? 'text-white' : ''}`}
          >
            {LETTERS.map((ch, idx) => (
              <span
                key={`release-spirit-${idx}`}
                ref={(el) => {
                  letterRefs.current[idx] = el;
                }}
                className="letter"
                data-space={ch === ' '}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </p>
        </div>
        <div ref={circleRef} className="circle" />
      </div>
    </div>
  );
};
