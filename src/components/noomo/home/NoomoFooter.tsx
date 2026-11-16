'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { noomoStore, useNoomoStore } from '../noomo-store';

export const NoomoFooter: React.FC = () => {
  const state = useNoomoStore();
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {});
    const timer = window.setTimeout(() => {
      const items = el.querySelectorAll('.stagger-item');
      const isDesktop = window.innerWidth >= 1024;
      ctx.add(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: 'body',
              start: 'bottom-=400 bottom',
              end: 'bottom bottom',
              scrub: true,
              onEnter: () => {
                gsap.set(el, { pointerEvents: 'all' });
              },
              onLeaveBack: () => {
                gsap.set(el, { pointerEvents: 'none' });
              },
            },
          })
          .fromTo(
            items,
            { y: 15, filter: isDesktop ? 'blur(8px)' : 'none', opacity: 0 },
            { y: 0, filter: isDesktop ? 'blur(0px)' : 'none', opacity: 1, stagger: 0.2 }
          );
      });
    }, 500);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const isHidden = state.currentPage !== 'home' || state.mobileMenuOpen;

  return (
    <footer
      ref={footerRef}
      className={`flex xs:pb-0 lg:pb-30 flex-col justify-between xs:h-full lg:h-screen py-30 xs:px-20 lg:px-38 w-full fixed z-9 top-0 left-0 pointer-events-none transition-opacity duration-300 ease-in-out ${
        isHidden ? '!opacity-0 !pointer-events-none' : ''
      }`}
    >
      <div />
      <div className="stagger-item opacity-0 flex flex-col items-center">
        <p className="xs:text-sans-16 xs:max-w-261 lg:max-w-520 lg:text-sans-26 mt-10 text-white text-center">
          用技术让生活更简单，欢迎随时聊聊你的想法
        </p>
        <div className="mb-30 mt-30 relative xs:h-100 lg:h-130 w-full flex items-center justify-center">
          <span className="absolute blur-lg xs:text-serif-66 lg:text-serif-145 text-white/70 select-none tracking-widest">
            云云亦海
          </span>
          <span className="relative xs:text-serif-66 lg:text-serif-145 text-white select-none tracking-widest">
            云云亦海
          </span>
        </div>
        <a
          onMouseEnter={() => noomoStore.setCursorHover(true)}
          onMouseLeave={() => noomoStore.setCursorHover(false)}
          className="text-white xs:text-sans-30 lg:text-sans-66"
          href="mailto:yunhai@yhnotes.com"
        >
          yunhai@yhnotes.com
        </a>
      </div>
      <div className="flex stagger-item opacity-0 xs:flex-col lg:flex-row justify-between xs:items-start lg:items-end">
        <div className="lg:order-1 xs:order-2 flex gap-50 flex-1/3" />
        <div className="lg:mb-0 xs:mb-20 lg:order-1 flex xs:gap-30 lg:gap-50 flex-1/3 justify-center">
          <a
            onMouseEnter={() => noomoStore.setCursorHover(true)}
            onMouseLeave={() => noomoStore.setCursorHover(false)}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/yunhai-dev"
            className="text-sans-18 text-white"
          >
            GitHub
          </a>
          <a
            onMouseEnter={() => noomoStore.setCursorHover(true)}
            onMouseLeave={() => noomoStore.setCursorHover(false)}
            target="_blank"
            rel="noopener noreferrer"
            href="https://gitee.com/yun2hai"
            className="text-sans-18 text-white"
          >
            Gitee
          </a>
          <a
            onMouseEnter={() => noomoStore.setCursorHover(true)}
            onMouseLeave={() => noomoStore.setCursorHover(false)}
            href="/rss.xml"
            className="text-sans-18 text-white"
          >
            RSS
          </a>
          <a
            onMouseEnter={() => noomoStore.setCursorHover(true)}
            onMouseLeave={() => noomoStore.setCursorHover(false)}
            target="_blank"
            rel="noopener noreferrer"
            href="https://status.yhnotes.com/"
            className="text-sans-18 text-white"
          >
            Status
          </a>
        </div>
        <div className="xs:mb-20 lg:mb-0 flex lg:order-2 flex-col items-center flex-1/3" />
      </div>
    </footer>
  );
};
