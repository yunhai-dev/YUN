'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { noomoStore, useNoomoStore } from '../noomo-store';
import { NoomoHomeHero, NoomoScrollToExploreHint } from './NoomoHomeHero';
import { NoomoAnimatedTexts } from './NoomoAnimatedTexts';
import { NoomoFooter } from './NoomoFooter';

function getAppVhPx(): number {
  if (typeof window === 'undefined') return 0;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--app-vh').trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed * 100
    : window.visualViewport?.height ?? window.innerHeight;
}

function vhToPx(vh: number): number {
  return getAppVhPx() * (vh / 100);
}

export const NoomoHomePage: React.FC = () => {
  const state = useNoomoStore();
  const [hintVisible, setHintVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalScrollLength = state.scrollSections.reduce((acc, s) => acc + s.scrollLength, 0);

  useEffect(() => {
    noomoStore.setCurrentPage('home');
    noomoStore.setCursorTransition(0);

    // If returning from contacts via browser back/forward, dissolve contact backdrop
    const snap = noomoStore.getSnapshot();
    if (!snap.transitionActive && snap.contactTransition > 0) {
      noomoStore.setSectionColor('light');
      const contactObj = { val: snap.contactTransition };
      gsap.to(contactObj, {
        val: 0,
        duration: 0.9,
        ease: 'power2.out',
        onUpdate: () => noomoStore.setContactTransition(contactObj.val),
      });
    }

    // If returning from case page with scrollCrutch, dissolve ice
    if (noomoStore.getSnapshot().scrollCrutch) {
      const obj = { iceValue: 1 };
      gsap.to(obj, {
        iceValue: 0,
        duration: 1.5,
        delay: 0.7,
        onUpdate: () => noomoStore.setIceTransition(obj.iceValue),
        onComplete: () => {
          noomoStore.setScrollCrutch(false);
          noomoStore.setVideoTransition(0);
        },
      });
    }

    // Light <-> Dark theme transition trigger at section 9
    let themeOffset = 0;
    const sections = noomoStore.getSnapshot().scrollSections;
    for (let i = 0; i <= 9; i++) {
      themeOffset += sections[i]?.scrollLength || 0;
    }

    const stTheme = ScrollTrigger.create({
      trigger: 'body',
      start: () => `top+=${vhToPx(themeOffset + 80)} top`,
      end: () => `top+=${vhToPx(themeOffset + 120)} top`,
      onEnter: () => {
        if (noomoStore.getSnapshot().currentPage === 'home') {
          noomoStore.setSectionColor('dark');
        }
      },
      onLeaveBack: () => {
        if (noomoStore.getSnapshot().currentPage === 'home') {
          noomoStore.setSectionColor('light');
        }
      },
    });

    // Fire section trigger near end of crystal gallery (section 17+)
    let fireOffset = 0;
    for (let i = 0; i <= 16; i++) {
      fireOffset += sections[i]?.scrollLength || 0;
    }
    const stFire = ScrollTrigger.create({
      trigger: 'body',
      start: () => `top+=${vhToPx(fireOffset)} top`,
      end: 'bottom bottom',
      onEnter: () => noomoStore.setFireSection(true),
      onLeaveBack: () => noomoStore.setFireSection(false),
    });

    const refreshTimers = [0, 120, 700].map((delay) =>
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
        noomoStore.getSnapshot().scroll?.paused?.(false);
      }, delay)
    );

    return () => {
      refreshTimers.forEach((t) => window.clearTimeout(t));
      stTheme.kill();
      stFire.kill();
    };
  }, []);

  // Dismiss "Scroll to explore" hint on first scroll/touch/key
  useEffect(() => {
    if (!hintVisible) return;
    const hide = () => setHintVisible(false);
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', 'Space'].includes(e.code)) {
        hide();
      }
    };
    window.addEventListener('wheel', hide, { passive: true, once: true });
    window.addEventListener('touchmove', hide, { passive: true, once: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', hide);
      window.removeEventListener('touchmove', hide);
      window.removeEventListener('keydown', onKey);
    };
  }, [hintVisible]);

  const handleContainerClick = () => {
    if (noomoStore.getSnapshot().cursorHoverCase) {
      noomoStore.toCase();
    }
  };

  const overlayContent = (
    <>
      <NoomoHomeHero onStartByClick={() => setHintVisible(true)} />
      <NoomoAnimatedTexts />
      <NoomoScrollToExploreHint visible={hintVisible} />
      <NoomoFooter />
    </>
  );

  return (
    <div
      className="home-page relative"
      style={{ height: `calc(var(--app-vh, 1vh) * ${totalScrollLength + 100})` }}
      onClick={handleContainerClick}
    >
      {mounted ? createPortal(overlayContent, document.body) : overlayContent}
    </div>
  );
};
