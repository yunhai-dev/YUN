'use client';

import React, { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { Hand, Loader2 } from 'lucide-react';
import { SiGitee, SiGithub, SiRss } from 'react-icons/si';
import { Command } from '@/components/command';
import { useHandControl } from '@/context/HandControlContext';

export interface SiteMenuLink {
  href: string;
  label: string;
  zh: string;
}

/**
 * Canonical full-screen navigation, shared by the storytelling shell and the
 * global navbar. Hosts use the same list to decide which row is current.
 */
export const siteMenuPrimaryItems: SiteMenuLink[] = [
  { href: '/', label: 'Home', zh: '首页' },
  { href: '/blog/', label: 'Blog', zh: '博客' },
  { href: '/docs/', label: 'Docs', zh: '文档' },
  { href: '/tools/', label: 'Tools', zh: '工具' },
  { href: '/media/', label: 'Media', zh: '音乐' },
  { href: '/about/', label: 'About', zh: '关于' },
  { href: '/contacts', label: 'Contact', zh: '联系' },
];

export const siteMenuExploreItems: SiteMenuLink[] = [
  { href: '/api/', label: 'API', zh: '接口' },
  { href: '/anniversary/', label: 'Days', zh: '纪念日' },
  { href: '/chat/', label: 'Chat', zh: '对话' },
  { href: '/test/', label: 'Lab', zh: '测试' },
];

const socialItems = [
  { href: 'https://github.com/yunhai-dev', label: 'GitHub', external: true, icon: SiGithub },
  { href: 'https://gitee.com/yun2hai', label: 'Gitee', external: true, icon: SiGitee },
  { href: '/rss.xml', label: 'RSS', external: false, icon: SiRss },
];

interface NoomoSiteMenuProps {
  open: boolean;
  onClose: () => void;
  /** Close without returning focus, for when another overlay takes over. */
  onCloseQuietly?: () => void;
  /** Index into `siteMenuPrimaryItems` for the current page; -1 when none. */
  activeIndex?: number;
  /** Highlight and expand Explore when the current page is one of its links. */
  exploreActive?: boolean;
  menuId?: string;
  /** Lets hosts keep their own router link (e.g. next-view-transitions). */
  linkComponent?: React.ElementType;
  onNavigate?: (event: React.MouseEvent, href: string) => void;
}

export const NoomoSiteMenu: React.FC<NoomoSiteMenuProps> = ({
  open,
  onClose,
  onCloseQuietly,
  activeIndex = -1,
  exploreActive = false,
  menuId = 'noomo-site-menu',
  linkComponent,
  onNavigate,
}) => {
  const LinkComponent = linkComponent ?? NextLink;
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [exploreOpen, setExploreOpen] = useState(false);
  // Mount the search/actions only after the menu is first opened, so pages that
  // never open it do not load the search index.
  const [actionsReady, setActionsReady] = useState(false);
  const { isEnabled, toggleEnabled, isLoading } = useHandControl();

  useEffect(() => {
    if (!open) {
      setExploreOpen(false);
      return;
    }
    setActionsReady(true);
    setExploreOpen(exploreActive);
  }, [open, exploreActive]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Anchor the active page at level 0; rows outside it step back one step per row.
  const stairLevel = (index: number) =>
    activeIndex >= 0 ? Math.abs(index - activeIndex) : index;
  const exploreLevel = stairLevel(siteMenuPrimaryItems.length);
  const handleItemClick = (event: React.MouseEvent, href: string) => {
    onClose();
    onNavigate?.(event, href);
  };

  return (
    /* Full-screen navigation on a frosted-glass layer; w-screen includes the scrollbar
       gutter, so the glass reaches the real window edge. */
    <div
      className={`fixed inset-y-0 left-0 z-[90] w-screen overflow-hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
      style={{
        backgroundColor: open ? 'rgba(245, 242, 253, 0.34)' : 'rgba(245, 242, 253, 0)',
        backdropFilter: open ? 'blur(24px) saturate(125%)' : 'blur(0px)',
        WebkitBackdropFilter: open ? 'blur(24px) saturate(125%)' : 'blur(0px)',
        transition:
          'background-color 500ms ease, backdrop-filter 500ms ease, -webkit-backdrop-filter 500ms ease',
      }}
    >
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="站点导航"
        inert={!open}
        className={`relative isolate flex h-full flex-col transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
        style={{
          // Reproduce the storytelling shell's 10px rem base and 1px spacing
          // scale so the menu renders identically on every route.
          '--spacing': '1px',
          fontSize: '10px',
          fontFamily:
            'var(--font-noto-serif-sc), "TTNeoris", "Songti SC", "Noto Serif SC", ui-serif, Georgia, serif',
        } as React.CSSProperties}
      >
        {/* Transparent overlay: only the oversized signature sits behind the content. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {/* Oversized serif signature cropped by the bottom edge. */}
          <span className="absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
            <span className="noomo-menu-serif translate-y-[0.2em] select-none whitespace-nowrap text-[clamp(70px,16vw,160px)] italic leading-[0.8] tracking-[-0.03em] text-[#6248a4] opacity-[0.07]">
              YunHai
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between px-20 pt-30 lg:px-54 lg:pt-38">
          <div>
            <p className="italic text-[#6248a4]/75">Navigation</p>
            <p className="mt-2 noomo-menu-sans-18 text-[#29345a]/75">云云亦海</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="关闭菜单"
            className="flex h-40 w-40 items-center justify-center rounded-full border border-[#29345a]/15 bg-white/55 text-[#29345a]/70 transition-colors hover:bg-white hover:text-[#29345a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6248a4]/40"
          >
            <svg width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path
                d="M0.12207 1.07617L2.64062 3.85547L3.43848 4.73242L2.61133 5.5127L0.00195312 8.20605L1.07812 9.33496L4.65723 5.58398L8.23633 9.33496L9.3125 8.20605L6.70312 5.5127L5.87598 4.73242L6.67383 3.85547L9.19238 1.07617L8.0791 0L4.65723 3.82129L1.23535 0L0.12207 1.07617Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-20 lg:px-54">
          <div className="relative mx-auto my-auto w-full max-w-[1280px] py-16">
            <div>
              <nav
                aria-label="站点导航"
                className="mx-auto flex w-max max-w-full flex-col items-start"
                style={{ '--stair-step': 'clamp(12px, 2.9vw, 37px)' } as React.CSSProperties}
              >
                {siteMenuPrimaryItems.map((item, index) => {
                  const active = index === activeIndex;
                  return (
                    <LinkComponent
                      key={item.href}
                      href={item.href}
                      onClick={(event: React.MouseEvent) => handleItemClick(event, item.href)}
                      className="group border-b border-[#29345a]/10 py-9 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6248a4]/40"
                      style={{
                        // The active row anchors level 0; rows above it step back to the right.
                        marginLeft: `calc(var(--stair-step) * ${stairLevel(index)})`,
                        transitionDelay: open ? `${120 + index * 35}ms` : '0ms',
                        opacity: open ? 1 : 0,
                        transform: open ? 'translateY(0)' : 'translateY(16px)',
                        transitionProperty: 'opacity, transform',
                        transitionDuration: '500ms',
                        transitionTimingFunction: 'ease-out',
                      }}
                    >
                      <span className="flex items-baseline justify-between gap-10">
                        <span className="flex items-baseline gap-14">
                          <span className="w-24 shrink-0 noomo-menu-sans-16 tabular-nums text-[#6248a4]/40">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={`text-[clamp(24px,3.6vw,40px)] leading-[1.08] transition-colors duration-300 ${
                              active
                                ? 'text-[#29345a]'
                                : 'text-[#29345a]/60 group-hover:text-[#29345a]'
                            }`}
                          >
                            {item.label} <span className="opacity-60">· {item.zh}</span>
                          </span>
                        </span>
                        <span
                          className={`noomo-menu-sans-16 transition-colors duration-300 ${
                            active
                              ? 'text-[#6248a4]'
                              : 'text-[#29345a]/25 group-hover:text-[#29345a]/55'
                          }`}
                        >
                          {active ? '●' : '↗'}
                        </span>
                      </span>
                    </LinkComponent>
                  );
                })}

                <div
                  className="flex flex-col items-start self-stretch"
                  style={{
                    transitionDelay: open ? `${120 + siteMenuPrimaryItems.length * 35}ms` : '0ms',
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0)' : 'translateY(16px)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '500ms',
                    transitionTimingFunction: 'ease-out',
                  }}
                  onMouseLeave={() => setExploreOpen(false)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setExploreOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={exploreOpen}
                    aria-controls={`${menuId}-explore`}
                    onMouseEnter={() => setExploreOpen(true)}
                    onClick={() => setExploreOpen((value) => !value)}
                    className="group flex items-baseline gap-14 border-b border-[#29345a]/10 py-9 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6248a4]/40"
                    style={{ marginLeft: `calc(var(--stair-step) * ${exploreLevel})` }}
                  >
                    <span className="w-24 shrink-0 noomo-menu-sans-16 tabular-nums text-[#6248a4]/40">
                      {String(siteMenuPrimaryItems.length + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-[clamp(24px,3.6vw,40px)] leading-[1.08] transition-colors duration-300 ${
                        exploreOpen || exploreActive
                          ? 'text-[#29345a]'
                          : 'text-[#29345a]/60 group-hover:text-[#29345a]'
                      }`}
                    >
                      Explore <span className="opacity-60">· 探索</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`self-center noomo-menu-sans-16 transition-transform duration-300 ${
                        exploreOpen
                          ? 'rotate-45 text-[#6248a4]'
                          : 'text-[#29345a]/25 group-hover:text-[#29345a]/55'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={`${menuId}-explore`}
                    inert={!exploreOpen}
                    aria-hidden={!exploreOpen}
                    className={`grid self-stretch transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      exploreOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col items-start pb-10 pt-6">
                        {siteMenuExploreItems.map((item, index) => (
                          <LinkComponent
                            key={item.href}
                            href={item.href}
                            onClick={(event: React.MouseEvent) => handleItemClick(event, item.href)}
                            className="group flex items-baseline gap-8 border-b border-[#29345a]/10 py-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6248a4]/40"
                            style={{
                              // Children start one step past Explore, then keep stepping right.
                              marginLeft: `calc(var(--stair-step) * ${exploreLevel + 1 + index * 0.67})`,
                            }}
                          >
                            <span className="w-16 shrink-0 noomo-menu-sans-16 tabular-nums text-[#6248a4]/40">
                              {String.fromCharCode(97 + index)}
                            </span>
                            <span className="noomo-menu-sans-18 text-[#29345a]/55 transition-colors duration-300 group-hover:text-[#29345a]">
                              {item.label} <span className="opacity-60">· {item.zh}</span>
                            </span>
                            <span className="noomo-menu-sans-16 text-[#29345a]/25 transition-colors duration-300 group-hover:text-[#29345a]/55">
                              ↗
                            </span>
                          </LinkComponent>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-0 hidden lg:flex">
              <span className="noomo-menu-serif text-[24px] italic leading-none tracking-[0.24em] text-[#6248a4]/20 [writing-mode:vertical-rl]">
                云云亦海
              </span>
            </div>
          </div>
        </div>

        {/* Actions at the bottom-left; the search dialog lives above the page, so
            close the menu before it opens. */}
        {actionsReady && (
          <div className="absolute bottom-20 left-20 z-10 flex items-center gap-10 lg:bottom-30 lg:left-54">
            <div
              onClickCapture={(event) => {
                // Ignore clicks inside the portaled search dialog.
                if (event.currentTarget.contains(event.target as Node)) {
                  (onCloseQuietly ?? onClose)();
                }
              }}
              className="[&>p]:flex [&>p]:h-40 [&>p]:w-40 [&>p]:items-center [&>p]:justify-center [&>p]:rounded-full [&>p]:border [&>p]:border-[#29345a]/15 [&>p]:bg-white/55 [&>p]:p-0 [&>p]:text-[#29345a]/60 [&:hover>p]:bg-white [&:hover>p]:text-[#29345a] [&_svg]:size-[16px]"
            >
              <Command hotkey={true} />
            </div>
            <button
              type="button"
              onClick={toggleEnabled}
              aria-label={isEnabled ? '关闭手势控制' : '开启手势控制'}
              title={isEnabled ? '关闭手势控制' : '开启手势控制 (Beta)'}
              className={`flex h-40 w-40 items-center justify-center rounded-full border border-[#29345a]/15 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6248a4]/40 ${
                isEnabled
                  ? 'bg-white text-[#6248a4]'
                  : 'bg-white/55 text-[#29345a]/60 hover:bg-white hover:text-[#29345a]'
              }`}
            >
              {isLoading ? (
                <Loader2 className="h-16 w-16 animate-spin" aria-hidden="true" />
              ) : (
                <Hand className="h-16 w-16" aria-hidden="true" />
              )}
            </button>
          </div>
        )}

        <div className="absolute bottom-20 right-20 z-10 flex items-center gap-10 lg:bottom-30 lg:right-54">
          {socialItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={item.external ? undefined : onClose}
                aria-label={item.label}
                title={item.label}
                className="flex h-40 w-40 items-center justify-center rounded-full border border-[#29345a]/15 bg-white/55 text-[#29345a]/60 transition-colors hover:bg-white hover:text-[#29345a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6248a4]/40"
              >
                <Icon className="h-16 w-16" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
