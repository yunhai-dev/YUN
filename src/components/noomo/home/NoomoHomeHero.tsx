'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { noomoStore, useNoomoStore } from '../noomo-store';

export const NoomoScrollToExploreHint: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div
      className={`fixed left-1/2 bottom-24 z-20 -translate-x-1/2 pointer-events-none transition-opacity duration-300 ease-in-out ${
        !visible ? 'opacity-0' : ''
      }`}
    >
      <span className="text-sans-14 lg:text-sans-18 text-brand-black/70">Scroll to explore · 向下滚动</span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-5 w-full text-line half" />
    </div>
  );
};

export const NoomoHomeHero: React.FC<{ onStartByClick?: () => void }> = ({ onStartByClick }) => {
  const state = useNoomoStore();
  const heroParentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const deskRef = useRef<HTMLHeadingElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  const handleMouseMove = () => {
    if (!state.experienceStarted && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const snap = noomoStore.getSnapshot();
      if (snap.cursorText !== '点击开启') {
        noomoStore.setCursorText('点击开启');
      }
      if (!snap.cursorTextVisible) {
        noomoStore.setCursorTextState(true);
      }
    }
  };

  const handleStart = () => {
    if (state.experienceStarted) return;
    noomoStore.setExperienceStarted(true);
    noomoStore.setEnableSound(true);
    noomoStore.setCursorTextState(false);
    noomoStore.setCursorText('');
    onStartByClick?.();
  };

  useEffect(() => {
    if (state.sceneLoaded) {
      const t = window.setTimeout(() => setHidden(false), 100);
      return () => window.clearTimeout(t);
    }
  }, [state.sceneLoaded]);

  useEffect(() => {
    const titleEl = titleRef.current;
    const deskEl = deskRef.current;
    const parentEl = heroParentRef.current;
    if (!titleEl || !deskEl || !parentEl) return;

    const isDesktop = window.innerWidth >= 1024;
    const blurFrom = isDesktop ? 'blur(0px)' : 'none';
    const blurTo = isDesktop ? 'blur(8px)' : 'none';

    const splitTitle = new SplitText(titleEl, { type: 'chars', charsClass: 'char++' });
    const splitDesk = new SplitText(deskEl, { type: 'chars', charsClass: 'char++' });

    const tl1 = gsap.timeline();
    tl1.fromTo(
      splitTitle.chars,
      { opacity: 1, filter: blurFrom, scale: 1 },
      {
        opacity: 0,
        scale: 1.3,
        filter: blurTo,
        stagger: -0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: isDesktop ? 'top+=1000 top' : 'top+=500 top',
          scrub: true,
        },
      }
    );

    const tl2 = gsap.timeline();
    tl2.fromTo(
      splitDesk.chars,
      { opacity: 1, filter: blurFrom, scale: 1 },
      {
        opacity: 0,
        scale: 1.3,
        filter: blurTo,
        stagger: -0.03,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: isDesktop ? 'top+=1000 top' : 'top+=500 top',
          scrub: true,
          onLeave: () => {
            parentEl.style.display = 'none';
          },
          onEnterBack: () => {
            parentEl.style.removeProperty('display');
          },
        },
      }
    );

    const st = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'top+=500 top',
      scrub: true,
      onLeave: () => setIsVisible(false),
      onEnterBack: () => setIsVisible(true),
    });

    return () => {
      st.kill();
      tl1.kill();
      tl2.kill();
      splitTitle.revert();
      splitDesk.revert();
    };
  }, []);

  return (
    <div
      ref={heroParentRef}
      onClick={handleStart}
      onMouseMove={handleMouseMove}
      className={`parent home-hero fixed inset-0 z-1 ${!isVisible ? 'pointer-events-none' : ''} ${
        state.scrollCrutch ? 'opacity-0' : ''
      }`}
    >
      <div
        className="h-full flex items-end w-full fixed top-0 left-0 z-1 xs:pb-40 lg:pb-0 transition-opacity duration-300 ease-in-out"
        style={{ opacity: hidden ? 0 : 1 }}
      >
        <div className="container xs:pb-[30vh] lg:pb-0 relative">
          <h2 ref={deskRef} className="lg:text-sans-66 xs:text-sans-38 text-brand-black">
            从问题出发
            <br />
            <span className="xs:text-serif-26 lg:text-serif-66 font-300 xs:mt-10 lg:mt-0 lg:ml-60 xs:mr-0 lg:mr-15">
              把想法
            </span>
            写成工具
          </h2>
          <h1 ref={titleRef} className="pointer-events-none">
            云云亦海
          </h1>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleStart();
            }}
            className={`${
              state.experienceStarted ? 'opacity-0' : ''
            } z-100 lg:hidden xs:block absolute left-20 bottom-0 py-8 px-12 rounded-full h-64 border-1 w-[calc(100%-4rem)] border-white transition-opacity duration-300 ease-in-out`}
          >
            <div className="backdrop-blur-sm border-white/41 border-1 bg-white/11 w-full h-full rounded-full px-11 flex items-center justify-between">
              <img alt="star" src="/noomo/images/svg/buttonStar.svg" />
              <span className="text-sans-18 text-brand-blue-500">Tap to explore · 轻触开启</span>
              <img alt="star" src="/noomo/images/svg/buttonStar.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
