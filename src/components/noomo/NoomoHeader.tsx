'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NoomoSiteMenu, siteMenuPrimaryItems } from './NoomoSiteMenu';
import { noomoStore, useNoomoStore } from './noomo-store';

export const NoomoHeader: React.FC<{
  onNavigate?: (targetPath: string) => void;
}> = ({ onNavigate }) => {
  const state = useNoomoStore();
  const isCases = state.currentPage === 'cases';
  const isDark = state.sectionColor === 'dark';
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleLink = (e: React.MouseEvent, target: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(target);
    }
  };

  const toggleMenu = () => {
    noomoStore.setMobileMenuOpen(!state.mobileMenuOpen);
  };

  const closeMenu = () => {
    noomoStore.setMobileMenuOpen(false);
  };

  const closeAndFocus = () => {
    closeMenu();
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  useEffect(() => {
    if (!state.mobileMenuOpen) return;
    // Freeze the homepage cursor effects while the menu owns the pointer.
    noomoStore.setCursorHover(false);
    noomoStore.setCursorHoverCase(false, '');
    noomoStore.setCursorText('');
    noomoStore.setCursorTextState(false);
  }, [state.mobileMenuOpen]);

  useEffect(() => {
    // The vendored WebGL runtime reads this flag to ignore body-level pointer input.
    const root = document.documentElement;
    if (state.mobileMenuOpen) {
      root.dataset.noomoPointerPaused = 'true';
    } else {
      delete root.dataset.noomoPointerPaused;
    }
    return () => {
      delete root.dataset.noomoPointerPaused;
    };
  }, [state.mobileMenuOpen]);

  useEffect(() => {
    if (!state.mobileMenuOpen) return;
    const scroll = state.scroll;
    if (!scroll) return;
    const wasPaused = Boolean(scroll.paused());
    scroll.paused(true);
    return () => {
      scroll.paused(wasPaused);
    };
  }, [state.mobileMenuOpen, state.scroll]);

  useEffect(() => () => noomoStore.setMobileMenuOpen(false), []);

  const isActive = (href: string) =>
    (href === '/' && state.currentPage === 'home') ||
    (href === '/contacts' && state.currentPage === 'contacts');
  const activePrimaryIndex = siteMenuPrimaryItems.findIndex((item) => isActive(item.href));

  return (
    <>
      <header
        className={`fixed z-10 w-full xs:pt-20 lg:pt-38 top-0 left-0 transition-opacity duration-300 ${
          state.mobileMenuOpen ? 'pointer-events-none opacity-0' : ''
        }`}
        inert={state.mobileMenuOpen}
        aria-hidden={state.mobileMenuOpen}
      >
      <div
        className={`cases-back absolute pointer-events-none top-0 left-0 w-full xs:h-200 lg:h-300 opacity-0 transition-all duration-500 ease-in-out ${
          isCases ? 'opacity-100' : ''
        }`}
      />
      <div className="container relative z-2 flex justify-between xs:items-center lg:items-start xs:px-20 lg:px-54">
        <div>
          {isCases ? (
            <Link
              href="/"
              onClick={(e) => handleLink(e, '/')}
              onMouseEnter={() => noomoStore.setCursorHover(true)}
              onMouseLeave={() => noomoStore.setCursorHover(false)}
              className="relative flex justify-center items-center w-48 h-48 rounded-full bg-white/15 backdrop-blur-xs transition-all duration-300 ease-in-out hover:scale-110"
            >
              <img alt="back" src="/noomo/images/svg/backArrowNew.svg" className="w-24 h-24" />
            </Link>
          ) : (
            <Link
              href="/"
              onClick={(e) => handleLink(e, '/')}
              onMouseEnter={() => noomoStore.setCursorHover(true)}
              onMouseLeave={() => noomoStore.setCursorHover(false)}
              className="relative inline-flex items-center gap-10 transition-opacity duration-300 hover:opacity-80"
            >
              <div className="flex items-center gap-10">
                <img
                  alt="云云亦海 Avatar"
                  src="https://rustfs-endpoint.yhnotes.com/content/Avatar.webp"
                  className="h-32 w-32 rounded-full object-cover border border-white/30"
                />
                <span
                  className={`text-sans-18 font-medium tracking-tight transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-brand-black'
                  }`}
                >
                  YunHai <span className="text-serif-18 opacity-80">· 云云亦海</span>
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* One drawer trigger at every width; the links themselves live in the right panel. */}
        <div className="relative z-2">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-label={state.mobileMenuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={state.mobileMenuOpen}
            aria-controls="noomo-site-menu"
            className="mobile-menu-button relative w-92 h-40 flex rounded-full justify-center items-center backdrop-blur-2xl bg-white/31 transition-all duration-500 ease-in-out"
          >
            <div className="bb" />
            <p
              className={`text-sans-18 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-brand-black'
              }`}
            >
              Menu
            </p>
          </button>
        </div>
      </div>
    </header>

    <NoomoSiteMenu
      open={state.mobileMenuOpen}
      onClose={closeAndFocus}
      onCloseQuietly={closeMenu}
      activeIndex={activePrimaryIndex}
      menuId="noomo-site-menu"
      onNavigate={(event, href) => {
        if (href === '/' || href === '/contacts') handleLink(event, href);
      }}
    />
    </>
  );
};
