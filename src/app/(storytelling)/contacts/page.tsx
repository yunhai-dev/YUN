'use client';

import { useEffect, useState } from 'react';
import { noomoStore, useNoomoStore } from '@/components/noomo/noomo-store';

export default function ContactsPage() {
  const state = useNoomoStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    noomoStore.setCurrentPage('contacts');
    noomoStore.setCursorHover(false);
    noomoStore.setContactTransition(1);
    noomoStore.setCursorTransition(1);
    noomoStore.setSectionColor('dark');
    const t = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className={`min-h-screen relative z-1000 opacity-0 transition-opacity duration-500 ease-in-out ${
        visible && !state.mobileMenuOpen ? 'opacity-100' : ''
      }`}
    >
      <footer className="flex xs:pb-20 lg:pb-30 lg:pt-175 xs:pt-140 flex-col justify-between h-screen py-30 xs:px-20 lg:px-38 w-full fixed z-9 top-0 left-0">
        <div className="stagger-item flex flex-col items-center">
          <div className="mt-50 lg:mb-40 xs:mb-10 relative xs:h-0 lg:h-130 w-full hidden">
            <img
              className="absolute blur-lg h-full w-fit -translate-x-1/2 left-1/2 top-0"
              alt="noomo logo"
              src="/noomo/images/svg/logoSimple.svg"
            />
            <img
              className="absolute h-full w-fit -translate-x-1/2 left-1/2 top-0"
              alt="noomo logo"
              src="/noomo/images/svg/logoSimple.svg"
            />
          </div>
          <p className="xs:text-sans-18 lg:text-sans-32 mt-10 text-white text-center">
            保持好奇，保持 <span className="xs:text-serif-18 lg:text-serif-32">诚恳</span>，
            <br /> 一起探索并创造真正有用的东西
          </p>
          <a
            onMouseEnter={() => noomoStore.setCursorHover(true)}
            onMouseLeave={() => noomoStore.setCursorHover(false)}
            className="text-white mt-32 xs:text-sans-26 lg:text-sans-66"
            href="mailto:yunhai@yhnotes.com"
          >
            yunhai@yhnotes.com
          </a>
        </div>

        <div className="flex xs:items-start stagger-item xs:flex-col lg:flex-row justify-between lg:items-end">
          <div className="lg:order-1 xs:order-2 flex gap-50 flex-1/3">
            <a
              onMouseEnter={() => noomoStore.setCursorHover(true)}
              onMouseLeave={() => noomoStore.setCursorHover(false)}
              href="/contact/"
              className="text-sans-18 text-white opacity-61"
            >
              更多联系方式 & FAQ
            </a>
          </div>
          <div className="xs:mb-20 lg:mb-0 flex lg:order-2 flex-col items-center flex-1/3">
            <div className="flex xs:justify-around gap-16" />
          </div>
          <div className="lg:mb-0 xs:mb-20 lg:order-3 flex xs:gap-30 lg:gap-50 flex-1/3 justify-end">
            <a
              onMouseEnter={() => noomoStore.setCursorHover(true)}
              onMouseLeave={() => noomoStore.setCursorHover(false)}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/yunhai-dev"
              className="text-sans-18 text-white opacity-61"
            >
              GitHub
            </a>
            <a
              onMouseEnter={() => noomoStore.setCursorHover(true)}
              onMouseLeave={() => noomoStore.setCursorHover(false)}
              target="_blank"
              rel="noopener noreferrer"
              href="https://gitee.com/yun2hai"
              className="text-sans-18 text-white opacity-61"
            >
              Gitee
            </a>
            <a
              onMouseEnter={() => noomoStore.setCursorHover(true)}
              onMouseLeave={() => noomoStore.setCursorHover(false)}
              href="/rss.xml"
              className="text-sans-18 text-white opacity-61"
            >
              RSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
