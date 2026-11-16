'use client';

import React from 'react';
import Link from 'next/link';
import { noomoStore, useNoomoStore } from './noomo-store';

interface SimpleButtonProps {
  href: string;
  external?: boolean;
  borderRadius?: 'medium' | 'full' | 'none';
  children: React.ReactNode;
  onClick?: () => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  href,
  external = false,
  borderRadius = 'medium',
  children,
  onClick,
}) => {
  const state = useNoomoStore();
  const radiusClass =
    borderRadius === 'full'
      ? 'full-rounded'
      : borderRadius === 'none'
      ? 'none-rounded'
      : 'medium-rounded';
  const modeClass = state.sectionColor === 'dark' ? 'dark' : '';

  const className = `simple-button relative text-sans-18 text-brand-black px-8 h-24 flex transition-all duration-300 ease-in-out items-center justify-center cursor-pointer ${radiusClass} ${modeClass}`;

  const underline = (
    <span className="inline-block absolute h-2 -bottom-3 opacity-0 transition-all duration-300 w-0" />
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onMouseEnter={() => noomoStore.setCursorHover(true)}
        onMouseLeave={() => noomoStore.setCursorHover(false)}
      >
        {children}
        {underline}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={className}
      onMouseEnter={() => noomoStore.setCursorHover(true)}
      onMouseLeave={() => noomoStore.setCursorHover(false)}
    >
      {children}
      {underline}
    </Link>
  );
};

export const NoomoHeader: React.FC<{
  onNavigate?: (targetPath: string) => void;
}> = ({ onNavigate }) => {
  const state = useNoomoStore();
  const isCases = state.currentPage === 'cases';
  const isDark = state.sectionColor === 'dark';

  const handleLink = (e: React.MouseEvent, target: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(target);
    }
  };

  const toggleMenu = () => {
    noomoStore.setMobileMenuOpen(!state.mobileMenuOpen);
  };

  return (
    <header className="fixed z-10 w-full xs:pt-20 lg:pt-38 top-0 left-0">
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

        {/* Desktop navigation */}
        <div className="md:flex xs:hidden gap-14">
          <div className="flex gap-4 items-end">
            <SimpleButton href="/blog/" borderRadius="medium">
              Blog · 博客
            </SimpleButton>
            <SimpleButton href="/tools/" borderRadius="full">
              Tools · 工具
            </SimpleButton>
            <SimpleButton href="/about/" borderRadius="medium">
              About · 关于
            </SimpleButton>
            <SimpleButton
              href="/contacts"
              borderRadius="none"
              onClick={() => onNavigate?.('/contacts')}
            >
              Contact · 联系
            </SimpleButton>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden xs:block">
          <button
            type="button"
            onClick={toggleMenu}
            className={`mobile-menu-button relative w-92 h-40 flex rounded-full justify-center items-center backdrop-blur-2xl bg-white/31 transition-all duration-500 ease-in-out ${
              state.mobileMenuOpen ? '!w-40' : ''
            }`}
          >
            <div className="bb" />
            <p
              className={`text-sans-18 transition-all duration-500 ease-in-out ${
                isDark ? 'text-white' : 'text-brand-black'
              } ${state.mobileMenuOpen ? 'opacity-0' : ''}`}
            >
              Menu
            </p>
            <div
              className={`close absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 opacity-0 transition-all duration-300 ease-in-out ${
                state.mobileMenuOpen ? 'opacity-100' : ''
              }`}
            >
              <img alt="close" src="/noomo/images/svg/close.svg" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`mobile-menu absolute pb-24 top-0 left-0 w-full flex flex-col justify-between h-screen opacity-0 pointer-events-none transition-all duration-500 ease-in-out ${
          state.mobileMenuOpen ? 'opacity-100 !pointer-events-auto' : ''
        }`}
        style={{
          background: state.mobileMenuOpen ? 'rgba(6, 11, 29, 0.78)' : undefined,
        }}
      >
        <div />
        <div className="flex flex-col gap-36 items-center">
          <Link
            href="/"
            onClick={(e) => {
              noomoStore.setMobileMenuOpen(false);
              handleLink(e, '/');
            }}
            className={`text-sans-30 text-white opacity-0 transition-all duration-300 ease-in-out ${
              state.mobileMenuOpen ? 'opacity-100 delay-200' : ''
            }`}
          >
            Home · 首页
          </Link>
          <Link
            href="/blog/"
            onClick={() => noomoStore.setMobileMenuOpen(false)}
            className={`text-sans-30 text-white opacity-0 transition-all duration-300 ease-in-out ${
              state.mobileMenuOpen ? 'opacity-100 delay-250' : ''
            }`}
          >
            Blog · 博客
          </Link>
          <Link
            href="/tools/"
            onClick={() => noomoStore.setMobileMenuOpen(false)}
            className={`text-sans-30 text-white opacity-0 transition-all duration-300 ease-in-out ${
              state.mobileMenuOpen ? 'opacity-100 delay-300' : ''
            }`}
          >
            Tools · 工具
          </Link>
          <Link
            href="/docs/"
            onClick={() => noomoStore.setMobileMenuOpen(false)}
            className={`text-sans-30 text-white opacity-0 transition-all duration-300 ease-in-out ${
              state.mobileMenuOpen ? 'opacity-100 delay-325' : ''
            }`}
          >
            Docs · 文档
          </Link>
          <Link
            href="/about/"
            onClick={() => noomoStore.setMobileMenuOpen(false)}
            className={`text-sans-30 text-white opacity-0 transition-all duration-300 ease-in-out ${
              state.mobileMenuOpen ? 'opacity-100 delay-350' : ''
            }`}
          >
            About · 关于
          </Link>
          <Link
            href="/contacts"
            onClick={(e) => {
              noomoStore.setMobileMenuOpen(false);
              handleLink(e, '/contacts');
            }}
            className={`text-sans-30 text-white opacity-0 transition-all duration-300 ease-in-out ${
              state.mobileMenuOpen ? 'opacity-100 delay-400' : ''
            }`}
          >
            Contact · 联系
          </Link>
        </div>
        <div
          className={`flex justify-between px-20 opacity-0 delay-400 transition-all duration-300 ease-in-out ${
            state.mobileMenuOpen ? 'opacity-100' : ''
          }`}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/yunhai-dev"
            className="text-sans-18 text-white opacity-61"
          >
            GitHub
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://gitee.com/yun2hai"
            className="text-sans-18 text-white opacity-61"
          >
            Gitee
          </a>
          <a
            href="/rss.xml"
            onClick={() => noomoStore.setMobileMenuOpen(false)}
            className="text-sans-18 text-white opacity-61"
          >
            RSS
          </a>
        </div>
      </div>
    </header>
  );
};
