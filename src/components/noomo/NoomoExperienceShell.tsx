'use client';

import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { noomoStore, useNoomoStore } from './noomo-store';
import { Sweet3Canvas } from './webgl/Sweet3Canvas';
import { NoomoHeader } from './NoomoHeader';
import { NoomoPreloader } from './NoomoPreloader';
import { NoomoLiquidCursor } from './NoomoLiquidCursor';
import { NoomoSoundButton } from './NoomoSoundButton';
import { NoomoAudioEngine } from './NoomoAudioEngine';
import { NoomoReleaseSpirit } from './NoomoReleaseSpirit';
import '@/app/noomo-storytelling.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);
}

export function isStorytellingRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === '/' ||
    pathname.startsWith('/cases/') ||
    pathname === '/cases' ||
    pathname === '/contacts' ||
    pathname.startsWith('/contacts/')
  );
}

interface NoomoNavigationContextValue {
  navigateWithTransition: (targetPath: string) => void;
}

const NoomoNavigationContext = createContext<NoomoNavigationContextValue>({
  navigateWithTransition: () => {},
});

export function useNoomoNavigation() {
  return useContext(NoomoNavigationContext);
}

export const NoomoExperienceShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const active = isStorytellingRoute(pathname);
  const state = useNoomoStore();
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const lastYRef = useRef(0);
  const speedResetTimerRef = useRef<number | null>(null);

  // Sync html/body .noomo-active and --app-vh before child effects run
  useLayoutEffect(() => {
    if (!active) {
      document.documentElement.classList.remove('noomo-active');
      document.body.classList.remove('noomo-active');
      return;
    }

    document.documentElement.classList.add('noomo-active');
    document.body.classList.add('noomo-active');

    const updateVh = () => {
      const vh = (window.visualViewport?.height ?? window.innerHeight) * 0.01;
      document.documentElement.style.setProperty('--app-vh', `${vh}px`);
      const isDesktop = window.innerWidth >= 1024;
      noomoStore.setScrollSections(isDesktop);
    };

    updateVh();
    window.addEventListener('resize', updateVh);

    return () => {
      window.removeEventListener('resize', updateVh);
      document.documentElement.classList.remove('noomo-active');
      document.body.classList.remove('noomo-active');
    };
  }, [active]);

  // Setup GSAP ScrollSmoother when active
  useEffect(() => {
    if (!active) {
      smootherRef.current?.kill();
      smootherRef.current = null;
      noomoStore.setScroll(null);
      return;
    }

    const wrapper = document.getElementById('smooth-wrapper');
    const content = document.getElementById('smooth-content');
    if (!wrapper || !content) return;

    const computeAppVhPx = () => {
      const b = getComputedStyle(document.documentElement).getPropertyValue('--app-vh').trim();
      const parsed = Number.parseFloat(b);
      return Number.isFinite(parsed) && parsed > 0
        ? parsed * 100
        : window.visualViewport?.height ?? window.innerHeight;
    };

    const computeSectionProgress = (scrollTop: number) => {
      const sections = noomoStore.getSnapshot().scrollSections;
      const isTouchOrTablet = window.innerWidth < 1024;
      const vhPx = Math.max(1, isTouchOrTablet ? computeAppVhPx() : window.innerHeight);
      const totalPx = sections.reduce((acc, s) => acc + (s.scrollLength * vhPx) / 100, 0);
      const clamped = Math.max(0, Math.min(scrollTop, totalPx));
      let cursor = 0;
      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        if (!sec) continue;
        const lenPx = (sec.scrollLength * vhPx) / 100;
        const start = cursor;
        const end = cursor + lenPx;
        if (clamped >= start && clamped <= end) {
          const localProgress = lenPx > 0 ? (clamped - start) / lenPx : 0;
          const val = i + 1 + localProgress;
          return Math.max(1, Math.min(val, sections.length + 1)) - 1;
        }
        cursor += lenPx;
      }
      return sections.length + 1;
    };

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: false,
      normalizeScroll: true,
      ignoreMobileResize: true,
      smoothTouch: true,
      onUpdate: (self) => {
        const scrollTop = self.scrollTop();
        const progress = computeSectionProgress(scrollTop);
        noomoStore.setScrollProgress(progress);
        noomoStore.setScrollSpeed(self.getVelocity());
      },
    });

    smootherRef.current = smoother;
    if (!noomoStore.getSnapshot().sceneLoaded) {
      smoother.paused(true);
    }

    noomoStore.setScroll({
      scrollTo: (target, smooth = false) => smoother.scrollTo(target, smooth),
      scrollTop: (val, smooth = false) => {
        if (typeof val === 'number') {
          smoother.scrollTo(val, smooth);
          return;
        }
        return smoother.scrollTop();
      },
      paused: (val) => {
        if (val === undefined) return smoother.paused();
        smoother.paused(val);
      },
      scrollTrigger: {
        refresh: () => ScrollTrigger.refresh(),
        update: () => ScrollTrigger.update(),
      },
    });

    return () => {
      if (speedResetTimerRef.current) window.clearTimeout(speedResetTimerRef.current);
      smoother.kill();
      smootherRef.current = null;
      noomoStore.setScroll(null);
    };
  }, [active]);

  // Refresh ScrollTrigger on route change inside Storytelling
  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => window.clearTimeout(t);
  }, [active, pathname]);

  const navigateWithTransition = useCallback(
    (targetPath: string) => {
      const normalize = (p: string | null) => {
        if (!p) return '/';
        return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
      };
      const cur = normalize(pathname);
      const next = normalize(targetPath);
      if (cur === next) return;
      const snap = noomoStore.getSnapshot();
      if (snap.transitionActive) return;

      noomoStore.setTransitionActive(true);
      noomoStore.setCursorHoverCase(false, '');
      noomoStore.setCursorTextState(false);

      const fromHome = cur === '/';
      const fromCase = cur.startsWith('/cases/');
      const fromContacts = cur === '/contacts';

      const toHome = next === '/';
      const toCase = next.startsWith('/cases/');
      const toContacts = next === '/contacts';

      const finish = () => {
        router.push(targetPath);
        noomoStore.setTransitionActive(false);
      };

      const tweenObj = {
        ice: snap.iceTransition,
        contact: snap.contactTransition,
        cursor: snap.cursorTransition,
      };

      if (fromHome && toContacts) {
        noomoStore.setCursorTransition(1);
        noomoStore.setCurrentPage('contacts');
        noomoStore.setSectionColor('dark');
        gsap.to(tweenObj, {
          contact: 1,
          duration: 1.5,
          onUpdate: () => noomoStore.setContactTransition(tweenObj.contact),
          onComplete: finish,
        });
        return;
      }

      if (fromHome && toCase) {
        noomoStore.setCursorTransition(1);
        noomoStore.setCurrentPage('cases');
        noomoStore.setSectionColor('dark');
        gsap.to(tweenObj, {
          ice: 1,
          duration: 1.5,
          ease: 'power1.inOut',
          onUpdate: () => noomoStore.setIceTransition(tweenObj.ice),
          onComplete: finish,
        });
        return;
      }

      if (fromCase && toHome) {
        snap.scroll?.paused(true);
        gsap.to(tweenObj, {
          ice: 1,
          duration: 1,
          onUpdate: () => {
            noomoStore.setIceTransition(tweenObj.ice);
            noomoStore.setCursorTransition(1 - tweenObj.ice);
          },
          onComplete: () => {
            noomoStore.setSectionColor('light');
            noomoStore.setVideoTransition(0);
            noomoStore.setScrollCrutch(true);
            noomoStore.setVideoElement(null);
            finish();
          },
        });
        return;
      }

      if (fromCase && toContacts) {
        snap.scroll?.paused(true);
        gsap.to(tweenObj, {
          ice: 1,
          contact: 1,
          duration: 1,
          onUpdate: () => {
            noomoStore.setIceTransition(tweenObj.ice);
            noomoStore.setContactTransition(tweenObj.contact);
          },
          onComplete: () => {
            noomoStore.setCurrentPage('contacts');
            snap.scroll?.paused(false);
            snap.scroll?.scrollTop(0, false);
            noomoStore.setVideoElement(null);
            finish();
          },
        });
        return;
      }

      if (fromContacts && toHome) {
        noomoStore.setSectionColor('light');
        noomoStore.setVideoTransition(0);
        noomoStore.setIceTransition(0);
        gsap.to(tweenObj, {
          contact: 0,
          duration: 1,
          onUpdate: () => {
            noomoStore.setContactTransition(tweenObj.contact);
            noomoStore.setCursorTransition(tweenObj.contact);
          },
          onComplete: finish,
        });
        return;
      }

      if (fromContacts && toCase) {
        noomoStore.setCurrentPage('cases');
        noomoStore.setSectionColor('dark');
        gsap.to(tweenObj, {
          contact: 0,
          duration: 1,
          onUpdate: () => {
            noomoStore.setContactTransition(tweenObj.contact);
            noomoStore.setIceTransition(1 - tweenObj.contact);
          },
          onComplete: finish,
        });
        return;
      }

      finish();
    },
    [pathname, router]
  );

  if (!active) {
    return <>{children}</>;
  }

  return (
    <NoomoNavigationContext.Provider value={{ navigateWithTransition }}>
      <div className="noomo-root relative min-h-screen">
        <Sweet3Canvas />
        <NoomoHeader onNavigate={navigateWithTransition} />

        <div id="smooth-wrapper">
          <div id="smooth-content">{children}</div>
        </div>

        <NoomoPreloader />
        <NoomoLiquidCursor />
        <NoomoSoundButton />
        <NoomoAudioEngine />
        <NoomoReleaseSpirit />
      </div>
    </NoomoNavigationContext.Provider>
  );
};
