'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { noomoStore, useNoomoStore } from '../noomo-store';
import { useNoomoNavigation } from '../NoomoExperienceShell';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

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

interface TextItemProps {
  className?: string;
  content: string;
  scrollStart: number;
  scrollEnd: number;
  scrollStart2: number;
  scrollEnd2: number;
  mode?: 'light' | 'dark';
  toTop?: number;
}

const BigTextNew: React.FC<TextItemProps> = ({
  className = '',
  content,
  scrollStart,
  scrollEnd,
  scrollStart2,
  scrollEnd2,
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const parent = parentRef.current;
    const el = elRef.current;
    if (!parent || !el) return;

    let split: SplitText | null = null;
    let tl: gsap.core.Timeline | null = null;
    let st: ScrollTrigger | null = null;

    const timer = window.setTimeout(() => {
      const p = el.querySelector('p');
      if (!p) return;
      split = new SplitText(p, { type: 'chars', charsClass: 'char', linesClass: 'line++' });
      el.querySelectorAll('.ic').forEach((ic) => {
        ic.classList.add('char');
        gsap.set(ic, { display: 'inline-block' });
      });
      el.querySelectorAll('.char').forEach((ch) => {
        ch.classList.add('opacity-0');
      });

      const chars = Array.from(el.querySelectorAll('.char'));
      const isDesktop = window.innerWidth >= 1024;
      const blurOut = isDesktop ? 'blur(8px)' : 'none';
      const blurIn = isDesktop ? 'blur(0px)' : 'none';

      st = ScrollTrigger.create({
        trigger: 'body',
        start: () => `top+=${vhToPx(Math.min(scrollStart, scrollStart2))} top`,
        end: () => `top+=${vhToPx(Math.max(scrollEnd, scrollEnd2))} top`,
        onToggle: (self) => {
          parent.style.display = self.isActive ? 'unset' : 'none';
        },
      });
      parent.style.visibility = '';
      parent.style.display = st.isActive ? 'unset' : 'none';

      tl = gsap.timeline();
      tl.fromTo(
        chars,
        { opacity: 0, scale: 1.3, filter: blurOut },
        {
          opacity: 1,
          scale: 1,
          filter: blurIn,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: () => `top+=${vhToPx(scrollStart)} top`,
            end: () => `top+=${vhToPx(scrollEnd)} top`,
            scrub: true,
          },
        }
      ).fromTo(
        chars,
        { opacity: 1, scale: 1, filter: blurIn },
        {
          opacity: 0,
          scale: 1.3,
          filter: blurOut,
          stagger: 0.05,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: 'body',
            start: () => `top+=${vhToPx(scrollStart2)} top`,
            end: () => `top+=${vhToPx(scrollEnd2)} top`,
            scrub: true,
          },
        }
      );

      gsap.set(chars, { opacity: 0, scale: 1.3, filter: blurOut });
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.clearTimeout(timer);
      const chars = el.querySelectorAll('.char');
      if (chars.length) gsap.killTweensOf(chars);
      gsap.killTweensOf(parent);
      st?.kill();
      tl?.kill();
      split?.revert();
    };
  }, [scrollStart, scrollEnd, scrollStart2, scrollEnd2]);

  return (
    <div ref={parentRef} style={{ visibility: 'hidden' }} className={`absolute animated-text-big ${className}`}>
      <div ref={elRef} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

const SmallTextNew: React.FC<TextItemProps> = ({
  className = '',
  content,
  scrollStart,
  scrollEnd,
  scrollStart2,
  scrollEnd2,
  mode = 'light',
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const parent = parentRef.current;
    const el = elRef.current;
    if (!parent || !el) return;

    const p = el.querySelector('p');
    if (!p) return;

    const split = new SplitText(p, { type: 'chars', charsClass: 'char', linesClass: 'line++' });
    el.querySelectorAll('.ic').forEach((ic) => {
      ic.classList.add('char');
      gsap.set(ic, { display: 'inline-block' });
    });

    const chars = Array.from(el.querySelectorAll('.char'));
    const isDesktop = window.innerWidth >= 1024;
    const blurOut = isDesktop ? 'blur(8px)' : 'none';
    const blurIn = isDesktop ? 'blur(0px)' : 'none';

    const st = ScrollTrigger.create({
      trigger: 'body',
      start: () => `top+=${vhToPx(Math.min(scrollStart, scrollStart2))} top`,
      end: () => `top+=${vhToPx(Math.max(scrollEnd, scrollEnd2))} top`,
      onToggle: (self) => {
        parent.style.display = self.isActive ? 'unset' : 'none';
      },
    });
    parent.style.visibility = '';
    parent.style.display = st.isActive ? 'unset' : 'none';
    parent.style.display = st.isActive ? 'unset' : 'none';

    const tl = gsap.timeline();
    tl.fromTo(
      chars,
      {
        opacity: 0,
        scale: (_i, target: HTMLElement) => (target.classList.contains('from-scale') ? 0 : 1.3),
        filter: blurOut,
      },
      {
        opacity: 1,
        scale: 1,
        filter: blurIn,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: () => `top+=${vhToPx(scrollStart)} top`,
          end: () => `top+=${vhToPx(scrollEnd)} top`,
          scrub: true,
        },
      }
    )
      .fromTo(
        chars,
        { opacity: 1, scale: 1, filter: blurIn },
        {
          opacity: 0,
          scale: 1.3,
          filter: blurOut,
          stagger: 0.05,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: 'body',
            start: () => `top+=${vhToPx(scrollStart2)} top`,
            end: () => `top+=${vhToPx(scrollEnd2)} top`,
            scrub: true,
          },
        }
      )
      .to(chars, {
        opacity: 0,
        scale: (_i, target: HTMLElement) => (target.classList.contains('from-scale') ? 0 : 1.3),
        filter: blurOut,
      });

    return () => {
      if (chars.length) gsap.killTweensOf(chars);
      gsap.killTweensOf(parent);
      st.kill();
      tl.kill();
      split.revert();
    };
  }, [scrollStart, scrollEnd, scrollStart2, scrollEnd2]);

  return (
    <div ref={parentRef} style={{ visibility: 'hidden' }} className={`xs:fixed lg:absolute animated-text ${className}`}>
      <div
        ref={elRef}
        className={mode === 'light' ? 'text-brand-black' : 'text-white'}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

const LinesText: React.FC<TextItemProps> = ({
  className = '',
  content,
  scrollStart,
  scrollEnd,
  scrollStart2,
  scrollEnd2,
  toTop = 110,
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const parent = parentRef.current;
    const el = elRef.current;
    if (!parent || !el) return;

    const p = el.querySelector('p');
    if (!p) return;

    const split = new SplitText(p, { type: 'lines', linesClass: 'line++' });
    el.querySelectorAll('.ic').forEach((ic) => {
      ic.classList.add('line');
      gsap.set(ic, { display: 'inline-block' });
    });

    const lines = Array.from(el.querySelectorAll('.line'));
    const isDesktop = window.innerWidth >= 1024;
    const blurOut = isDesktop ? 'blur(8px)' : 'none';
    const blurIn = isDesktop ? 'blur(0px)' : 'none';

    const tl1 = gsap
      .timeline({
        scrollTrigger: {
          trigger: 'body',
          start: () => `top+=${vhToPx(scrollStart)} top`,
          end: () => `top+=${vhToPx(scrollEnd)} top`,
          scrub: true,
        },
      })
      .fromTo(
        lines,
        {
          opacity: 0,
          scale: (_i, target: HTMLElement) => (target.classList.contains('from-scale') ? 0 : 1.05),
          filter: blurOut,
        },
        {
          opacity: 1,
          scale: 1,
          filter: blurIn,
          stagger: 0.05,
          ease: 'none',
        }
      );

    const st = ScrollTrigger.create({
      trigger: 'body',
      start: () => `top+=${vhToPx(Math.min(scrollStart, scrollStart2))} top`,
      end: () => `top+=${vhToPx(Math.max(scrollEnd, scrollEnd2))} top`,
      onToggle: (self) => {
        parent.style.display = self.isActive ? 'unset' : 'none';
      },
    });
    parent.style.visibility = '';
    parent.style.display = st.isActive ? 'unset' : 'none';

    const tl2 = gsap
      .timeline({
        scrollTrigger: {
          trigger: 'body',
          start: () => `top+=${vhToPx(scrollStart2)} top`,
          end: () => `top+=${vhToPx(scrollEnd2)} top`,
          scrub: true,
        },
      })
      .fromTo(parent, { y: 0 }, { y: () => -vhToPx(toTop), ease: 'none', duration: 1 });

    return () => {
      if (lines.length) gsap.killTweensOf(lines);
      gsap.killTweensOf(parent);
      st.kill();
      tl1.kill();
      tl2.kill();
      split.revert();
    };
  }, [scrollStart, scrollEnd, scrollStart2, scrollEnd2, toTop]);

  return (
    <div ref={parentRef} style={{ visibility: 'hidden' }} className={`absolute animated-text ${className}`}>
      <div ref={elRef} className="text-white" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

interface CaseHoverProps {
  id: string;
  content: string;
  link: string;
  className?: string;
}

const CaseHover: React.FC<CaseHoverProps> = ({ id, content, link, className = '' }) => {
  const state = useNoomoStore();
  const { navigateWithTransition } = useNoomoNavigation();
  const [isTouchViewport, setIsTouchViewport] = useState(false);
  const [innerHeight, setInnerHeight] = useState(800);

  useEffect(() => {
    const check = () => {
      setIsTouchViewport(window.innerWidth < 1024);
      setInnerHeight(window.innerHeight);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const unsub = noomoStore.onAction(({ name, args }) => {
      if (name === 'setCursorHoverCase' && args[1] === id) {
        noomoStore.playCubeSound();
        noomoStore.setCursorText(content);
      } else if (name === 'toCase' && noomoStore.getSnapshot().hoverCaseId === id) {
        if (!noomoStore.getSnapshot().transitionActive) {
          navigateWithTransition(link);
        }
      }
    });
    return unsub;
  }, [id, content, link, navigateWithTransition]);

  const rawY = state.iceCubesPosition[id]?.y ?? -0.24;
  const minY = -0.24;
  const maxY = 1.2;
  const clamped = (Math.min(maxY, Math.max(minY, rawY)) - minY) / (maxY - minY);
  const minPx = -innerHeight * 0.5;
  const maxPx = innerHeight;
  const translateY = minPx + clamped * (maxPx - minPx);
  const isActive = rawY > minY && rawY < maxY;
  const fadeOpacity = rawY <= 0.75 ? 1 : rawY >= 1.15 ? 0 : 1 - (rawY - 0.75) / (1.15 - 0.75);

  const handleClick = () => {
    if (!noomoStore.getSnapshot().transitionActive) {
      navigateWithTransition(link);
    }
  };

  return (
    <div
      className={`fixed z-9 case-debug xs:w-full lg:w-[48vh] lg:!hidden flex items-end xs:h-[45vh] lg:h-[48vh] transform bottom-0 ${className}`}
      style={{
        transform: `translateY(${-translateY}px)`,
        display: isActive ? 'flex' : 'none',
      }}
      onClick={handleClick}
    >
      {isTouchViewport && (
        <div
          className={`text-white content bottom-0 translate-y-110 text-center w-full xs:opacity-100 lg:opacity-0 transition-opacity ease-linear ${
            state.mobileMenuOpen || state.currentPage === 'cases' ? '!opacity-0 !delay-0' : ''
          }`}
          style={{ opacity: fadeOpacity }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
};

export const NoomoAnimatedTexts: React.FC = () => {
  const state = useNoomoStore();
  const [ready, setReady] = useState(false);
  const [winHeight, setWinHeight] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setWinHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener('resize', onResize);
    const t = window.setTimeout(() => setReady(true), 550);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const sec = state.scrollSections;
  const e = (idx: number) => {
    let sum = 0;
    for (let i = 0; i <= idx; i++) {
      sum += sec[i]?.scrollLength || 0;
    }
    return sum;
  };
  const n = isMobile ? 2 : 1;

  const caseHoverItems = useMemo(
    () => [
      {
        className: 'xs:left-0 lg:left-[20vw]',
        id: 'crystal0',
        content: `<span class="flex xs:items-center lg:items-start gap-0 flex-col xs:relative lg:absolute h-full lg:-top-12 lg:left-80">
          <span class="xs:text-sans-26 lg:text-sans-50 whitespace-nowrap relative z-2">Clouisle</span><br>
          <span class="text-sans-18 -mt-10 relative z-2">AI 知识库与工作流平台</span>
          <span class="absolute xs:hidden lg:block w-full xs:blur-none lg:blur-[80px] h-151 bg-dark-400 left-0 top-0 rounded-[100%] -translate-y-1/4"></span>
        </span>`,
        link: '/cases/clouisle',
      },
      {
        className: 'xs:right-0 lg:right-[20vw]',
        id: 'crystal1',
        content: `<span class="flex xs:items-center lg:items-start gap-0 flex-col xs:relative lg:absolute h-full lg:-top-12 lg:right-80">
          <span class="xs:text-sans-26 lg:text-sans-50 whitespace-nowrap relative z-2">D0 Tools</span><br>
          <span class="text-sans-18 -mt-10 relative z-2">数据标注与 AI 辅助工具</span>
          <span class="absolute xs:hidden lg:block w-full blur-[80px] h-151 bg-dark-400 left-0 top-0 rounded-[100%] -translate-y-1/4"></span>
        </span>`,
        link: '/cases/d0-tools',
      },
      {
        className: 'xs:left-0 lg:left-[20vw]',
        id: 'crystal2',
        content: `<span class="flex xs:items-center lg:items-start gap-0 flex-col xs:relative lg:absolute h-full lg:-top-12 lg:left-80">
          <span class="xs:text-sans-26 lg:text-sans-50 whitespace-nowrap relative z-2">Crawlsy</span><br>
          <span class="text-sans-18 -mt-10 relative z-2">高可扩展数据采集框架</span>
          <span class="absolute xs:hidden lg:block w-full blur-[80px] h-151 bg-dark-400 left-0 top-0 rounded-[100%] -translate-y-1/4"></span>
        </span>`,
        link: '/cases/crawlsy',
      },
      {
        className: 'xs:right-0 lg:right-[20vw]',
        id: 'crystal3',
        content: `<span class="flex xs:items-center lg:items-start gap-0 flex-col xs:relative lg:absolute h-full lg:-top-12 lg:right-80">
          <span class="xs:text-sans-26 lg:text-sans-50 whitespace-nowrap relative z-2">Yundownload</span><br>
          <span class="text-sans-18 -mt-10 relative z-2">多协议异步下载 CLI</span>
          <span class="absolute xs:hidden lg:block w-full blur-[80px] h-151 bg-dark-400 left-0 top-0 rounded-[100%] -translate-y-1/4"></span>
        </span>`,
        link: '/cases/yundownload',
      },
      {
        className: 'xs:left-0 lg:left-[20vw]',
        id: 'crystal4',
        content: `<span class="flex xs:items-center lg:items-start gap-0 flex-col xs:relative lg:absolute h-full lg:-top-12 lg:left-80">
          <span class="xs:text-sans-26 lg:text-sans-50 whitespace-nowrap relative z-2">Naive for Qt</span><br>
          <span class="text-sans-18 -mt-10 relative z-2">Qt 现代桌面 UI 组件库</span>
          <span class="absolute xs:hidden lg:block w-full blur-[80px] h-151 bg-dark-400 left-0 top-0 rounded-[100%] -translate-y-1/4"></span>
        </span>`,
        link: '/cases/naive-for-qt',
      },
      {
        className: 'xs:right-0 lg:right-[20vw]',
        id: 'crystal5',
        content: `<span class="flex xs:items-center lg:items-start gap-0 flex-col xs:relative lg:absolute h-full lg:-top-12 lg:right-80">
          <span class="xs:text-sans-26 lg:text-sans-50 whitespace-nowrap relative z-2">Job Hive</span><br>
          <span class="text-sans-18 -mt-10 relative z-2">智能求职与岗位聚合平台</span>
          <span class="absolute xs:hidden lg:block w-full blur-[80px] h-151 bg-dark-400 left-0 top-0 rounded-[100%] -translate-y-1/4"></span>
        </span>`,
        link: '/cases/job-hive',
      },
      {
        className: 'xs:left-0 lg:left-[20vw]',
        id: 'crystal6',
        content: `<span class="flex xs:items-center lg:items-start gap-0 flex-col xs:relative lg:absolute h-full lg:-top-12 lg:left-80">
          <span class="xs:text-sans-26 lg:text-sans-50 whitespace-nowrap relative z-2">Yun Chat</span><br>
          <span class="text-sans-18 -mt-10 whitespace-nowrap relative z-2">全栈 AI 对话游乐场</span>
          <span class="absolute xs:hidden lg:block w-full blur-[80px] h-151 bg-dark-400 left-0 top-0 rounded-[100%] -translate-y-1/4"></span>
        </span>`,
        link: '/cases/yun-chat',
      },
    ],
    []
  );

  const lightSmallTexts = [
    {
      className: 'top-1/2 left-1/2 -translate-x-1/2 xs:-translate-y-1/1 lg:-translate-y-2/3',
      scrollStart: e(0) - 50 / n + (isMobile ? 30 : 0),
      scrollEnd: e(0) + 100 / n,
      scrollStart2: e(1),
      scrollEnd2: e(1) + 150 / n,
      text: `<p class='lg:text-sans-50 xs:text-sans-30 text-center'>
        <span class="text-icon-bird ic mb-20 inline-block"></span>
        <span class="text-line from-scale half ic lg:!w-300 xs:!w-200 xs:-translate-y-5 lg:-translate-y-0 xs:translate-x-1/2 lg:translate-x-1/3"></span>
        很多事情的开始<br>
        <span class="text-line from-scale ic translate-x-[10%] xs:!hidden lg:!block -translate-y-[200%] xs:!w-350 lg:!w-500"></span>
        <span class="relative z-2">其实都很 <i class="lg:text-serif-50 xs:text-serif-30 xs:-translate-y-1 lg:translate-y-0">简单</i></span><br>
        <span class="text-line from-scale half ic xs:translate-y-8 lg:translate-y-0 xs:translate-x-[-10%] lg:translate-x-[0%] !w-412"></span>
      </p>`,
    },
    {
      className: 'lg:top-[40vh] xs:top-[30vh] right-[10vw]',
      scrollStart: e(1) + 100 / n,
      scrollEnd: e(1) + 220 / n,
      scrollStart2: e(2) + 70 / n,
      scrollEnd2: e(2) + 200 / n,
      text: `<p class='lg:text-sans-50 xs:text-sans-30 text-right'>
        <span class="xs:hidden lg:inline-block xs:mr-0 lg:mr-178">只是不想重复</span><br>
        <span class="text-line from-scale xs:!hidden lg:!block half ic !w-230 xs:translate-x-[160%] lg:translate-x-1/1"></span>
        <span class="inline-block xs:mr-63 lg:mr-110 relative z-2"><span class="xs:inline lg:hidden">只是不想重复</span>&nbsp;繁琐的手动操作</span><br>
        <span class="text-line from-scale xs:!hidden lg:!block ic half !w-300 xs:translate-x-[110%] lg:translate-x-4/5"></span>
        <span class="inline-block xs:mr-25 lg:mr-0 relative z-2">想让一个</span><br>
        <span class="text-line from-scale xs:!hidden lg:!block ic half !w-400 translate-x-4/6"></span>
        <span class="inline-block xs:mr-0 lg:mr-115 relative z-2"><i class="lg:text-serif-50 xs:text-serif-30 xs:-translate-x-3 lg:translate-x-0">卡住的</i></span><br>
        <span class="text-line from-scale xs:!hidden lg:!block ic half !w-300 translate-x-3/4 xs:translate-x-[85%] lg:-translate-y-[200%]"></span>
        <span class="inline-block xs:mr-20 lg:mr-166">流程顺畅起来，</span><br>
        <span class="text-line from-scale xs:!hidden lg:!block ic half !w-450 xs:translate-x-[50%] lg:translate-x-1/10"></span>
        <span class="inline-block xs:mr-20 lg:mr-223">顺手写下 <i class="lg:text-serif-50 xs:text-serif-30 xs:-translate-x-3 lg:translate-x-0">第一行</i></span><br>
        <span class="text-line from-scale ic half xs:-translate-y-[0%] lg:-translate-y-[200%] xs:!w-300 lg:!w-600 xs:translate-x-[5%] lg:-translate-x-1/3"></span>
      </p>`,
    },
    {
      className: 'top-1/2 left-1/2 -translate-x-1/2 xs:-translate-y-[120%] lg:-translate-y-2/3',
      scrollStart: e(3) + 250 / n,
      scrollEnd: e(3) + 400 / n,
      scrollStart2: e(5),
      scrollEnd2: e(5) + 100 / n,
      text: `<p class='lg:text-sans-50 xs:text-sans-30 text-center'>
        <span class="text-icon-bird-2 rotate-180 ic mb-20 inline-block"></span>
        <span class="text-line from-scale half ic xs:!w-250 lg:!w-320 xs:translate-x-[-10%] lg:translate-x-[15%]"></span>
        看着零散的 <i class="lg:text-serif-50 xs:text-serif-30 xs:-translate-x-2 xs:-translate-y-1 lg:translate-x-0 lg:translate-y-0">脚本</i> 慢慢长成系统<br>
        <span class="text-line from-scale ic half xs:translate-x-[10%] lg:translate-x-[10%] translate-y-4 xs:!w-200 lg:!w-400"></span>
      </p>`,
    },
  ];

  const bigTexts = [
    {
      className: 'top-1/2 left-1/2 -translate-x-1/2 xs:-translate-y-1/1 lg:-translate-y-1/2',
      scrollStart: e(2) + 150 / n,
      scrollEnd: e(2) + 300 / n,
      scrollStart2: e(3) + 150 / n,
      scrollEnd2: e(3) + 300 / n,
      text: `<p class="xs:text-serif-80 lg:text-serif-200 text-center whitespace-nowrap">
        <i class="lg:text-serif-50 xs:block lg:inline-block xs:text-serif-30 text-brand-black lg:-translate-y-[200%] xs:translate-y-[140%] lg:-translate-x-[40%]">始于</i>
        <span class="gradient-text">好奇</span><br>
      </p>`,
    },
    {
      className: 'top-1/2 left-1/2 -translate-x-1/2 xs:-translate-y-1/1 lg:-translate-y-1/2',
      scrollStart: e(5) + 50 / n,
      scrollEnd: e(5) + 120 / n,
      scrollStart2: e(5) + 220 / n + 50 / n,
      scrollEnd2: e(5) + 290 / n + 50 / n,
      text: `<p class="xs:text-serif-100 whitespace-nowrap lg:text-serif-200 text-center gradient-text gradient-text-big">拆解</p>`,
    },
    {
      className: 'top-1/2 left-1/2 -translate-x-1/2 xs:-translate-y-1/1 lg:-translate-y-1/2',
      scrollStart: e(6) - 240 / n + 50 / n,
      scrollEnd: e(6) - 170 / n + 50 / n,
      scrollStart2: e(6) - 70 / n + 50 / n,
      scrollEnd2: e(6) + 50 / n,
      text: `<p class="xs:text-serif-100 whitespace-nowrap lg:text-serif-200 text-center gradient-text gradient-text-big">构建</p>`,
    },
    {
      className: 'top-1/2 left-1/2 -translate-x-1/2 xs:-translate-y-1/1 lg:-translate-y-1/2',
      scrollStart: e(6) - 20 / n + 50 / n,
      scrollEnd: e(6) + 50 / n + 50 / n,
      scrollStart2: e(6) + 150 / n + 50 / n,
      scrollEnd2: e(6) + 220 / n + 50 / n,
      text: `<p class="xs:text-serif-100 whitespace-nowrap lg:text-serif-200 text-center gradient-text gradient-text-big">开源</p>`,
    },
  ];

  const darkSmallTexts = [
    {
      className: 'xs:top-1/4 lg:top-1/12 left-1/2 -translate-x-1/2',
      scrollStart: e(10) - 100,
      scrollEnd: e(10) - 30,
      scrollStart2: e(10) + 50,
      scrollEnd2: e(10) + 170,
      text: `<p class='xs:text-sans-38 lg:text-sans-50 text-center'>
        <span class="text-icon-flower-white ic mb-26 !mx-auto !block"></span>
        好用的 <i class="xs:text-serif-38 lg:text-serif-50">工具</i><br>
        <span class="text-line xs:!hidden lg:!block from-scale -translate-y-4 dark ic !w-280"></span>
        <span class="relative z-2">从不炫耀复杂度</span><br>
        <span class="text-line xs:!hidden lg:!block from-scale dark ic !w-260"></span>
        <span class="relative z-2">它只是</span>&nbsp;<i class="text-serif-38 xs:inline lg:hidden">安静地</i><br>
        <span class="text-line xs:!hidden lg:!block from-scale dark ic !w-300 -translate-x-[7%]"></span>
        <span class="xs:text-serif-38 xs:hidden lg:block lg:text-serif-50 relative z-2">安静地</span>
        <span class="text-line xs:!hidden lg:!block from-scale dark ic -translate-y-4 !w-300 -translate-x-[7%]"></span>
        <span class="relative z-2 mt-5 inline-block">接住 <i class="xs:text-serif-38 lg:text-serif-50">每一次</i></span><br>
        <span class="text-line xs:!hidden lg:!block from-scale dark -translate-y-4 ic !w-300 translate-x-[1%]"></span>
        <span class="relative z-2">真实的 <i class="xs:text-serif-38 lg:text-serif-50">点击与输入</i></span><br>
        <span class="text-line from-scale dark ic !w-300 lg:-translate-y-2 xs:translate-x-[2%] lg:translate-x-[7%]"></span>
      </p>`,
    },
    {
      className: 'xs:top-1/9 lg:top-1/6 left-1/2 xs:w-full lg:w-auto -translate-x-1/2',
      scrollStart: e(17) - 180 + (isMobile ? -100 : 0),
      scrollEnd: e(17) - 90 + (isMobile ? -100 : 0),
      scrollStart2: e(17) - 10 + (isMobile ? -20 : 0),
      scrollEnd2: e(17) + 60 + (isMobile ? -20 : 0),
      text: `<p class='xs:text-sans-18 lg:text-sans-26 text-center'>最初只是为了解决 <br>自己手边的一个小麻烦。</p>`,
    },
    {
      className: 'xs:bottom-1/8 lg:bottom-1/6 left-1/2 -translate-x-1/2',
      scrollStart: e(17) - 160 + (isMobile ? -100 : 0),
      scrollEnd: e(17) - 70 + (isMobile ? -100 : 0),
      scrollStart2: e(17) + 40 + (isMobile ? 20 : 0),
      scrollEnd2: e(17) + 120 + (isMobile ? 20 : 0),
      text: `<p class='xs:text-sans-38 lg:text-sans-66 text-center'>
        <span>写着写着</span><br>
        <span class="text-line lg:!block xs:!hidden from-scale dark ic !w-700 -translate-y-1 -translate-x-[8%]"></span>
        <span class="inline-block lg:-translate-y-2">就帮到了 <i class="xs:text-sans-38 xs:not-italic lg:italic lg:text-serif-66">更多人</i></span><br>
        <span class="text-line from-scale dark ic xs:!w-250 lg:!w-600 xs:-translate-y-4 lg:-translate-y-10 xs:translate-x-[10%] lg:-translate-x-[5%]"></span>
      </p>`,
    },
    {
      className: 'lg:bottom-1/10 xs:bottom-1/9 left-1/2 -translate-x-1/2',
      scrollStart: e(17) + 110 + (isMobile ? 20 : 0),
      scrollEnd: e(17) + 210 + (isMobile ? 20 : 0),
      scrollStart2: e(17) + 300,
      scrollEnd2: e(17) + 400,
      text: `<p class='xs:text-sans-38 lg:text-sans-66 text-center xs:w-[100vw] lg:w-auto xs:px-0 lg:px-0'>
        <span>技术应当服务于人，</span><br>
        <span class="text-line xs:!hidden lg:!block -translate-y-6 from-scale dark ic !w-700 -translate-x-[8%]"></span>
        <span>而不是</span>&nbsp;<span class="xs:block lg:inline"><i class="xs:text-serif-38 lg:text-serif-66">让生活更复杂</i>。</span>
        <span class="text-line lg:-translate-y-6 from-scale dark ic xs:!w-250 lg:!w-600 xs:translate-x-[25%] md:translate-x-[90%] lg:-translate-x-[5%]"></span>
      </p>`,
    },
  ];

  const linesTexts = [
    {
      className: 'xs:top-1/9 2xl:top-1/8 xl:top-1/17 left-1/2 xs:w-full lg:w-auto -translate-x-1/2 -translate-y-2/2',
      scrollStart: e(10) + 150,
      scrollEnd: e(10) + 250,
      scrollStart2: e(11) + 220 - (winHeight < 850 ? 40 : 0),
      scrollEnd2: e(11) + 420 - (winHeight < 850 ? 40 : 0),
      toTop: 110,
      text: `<p class='xs:text-sans-18 lg:text-sans-26 text-center'>
        <span class="text-icon-feather-white ic xs:mb-20 lg:mb-56 !block mx-auto"></span>
        <span class="inline-block xs:mb-8 lg:mb-0">在终端与界面之间，</span><br>
        <span class="xs:text-sans-38 lg:text-sans-66">我最在意的 <i class="xs:text-serif-38 lg:text-serif-66">四件事</i></span><br>
      </p>`,
    },
    {
      className: 'bottom-0 xs:pl-20 lg:pl-0 lg:right-1/10 w-410',
      scrollStart: e(11) + 100 + 60,
      scrollEnd: e(11) + 150 + 60,
      scrollStart2: e(11) + 160,
      scrollEnd2: e(11) + 360,
      toTop: 120,
      text: `<p class='xs:text-sans-18 lg:text-sans-26 text-left'>
        <span class="xs:text-sans-26 lg:text-sans-38">AI 与全栈 · <i class="xs:text-serif-26 lg:text-serif-38">落地生产</i></span><br>
        <span class="text-line from-scale dark xs:my-10 lg:my-20 ic !w-600 -translate-x-[30%]"></span>
        <span class="lg:lines-text-gradient">代码不是写给架构图看的。</span><br>
        <span class="lg:lines-text-gradient">无论是 FastAPI 后端服务，</span><br>
        <span class="lg:lines-text-gradient">还是多模型 Agent 与 RAG 编排，</span><br>
        <span class="lg:lines-text-gradient">最终都要稳稳地跑在真实场景里。</span><br>
      </p>`,
    },
    {
      className: 'bottom-0 xs:pr-40 lg:pr-0 xs:right-0 lg:left-1/10 w-410',
      scrollStart: e(11) + 170 + 60,
      scrollEnd: e(11) + 220 + 60,
      scrollStart2: e(11) + 170 + 60,
      scrollEnd2: e(11) + 420 + 10,
      toTop: 120,
      text: `<p class='xs:text-sans-18 lg:text-sans-26 text-right'>
        <span class="xs:text-sans-26 lg:text-sans-38">界面与交互 · <i class="xs:text-serif-26 lg:text-serif-38">克制顺手</i></span><br>
        <span class="text-line from-scale dark xs:my-10 lg:my-20 ic !w-500 -translate-x-[5%]"></span>
        <span class="lg:lines-text-gradient-left">少一点多余的装饰。</span><br>
        <span class="lg:lines-text-gradient-left">从 Qt 原生桌面组件到 Web 动效，</span><br>
        <span class="lg:lines-text-gradient-left">每一次流畅的反馈与排版，</span><br>
        <span class="lg:lines-text-gradient-left">都为了让你更专注手头的事。</span><br>
      </p>`,
    },
    {
      className: 'bottom-0 xs:pl-20 lg:pl-0 lg:right-1/10 w-410',
      scrollStart: e(11) + 240 + 60,
      scrollEnd: e(11) + 290 + 60,
      scrollStart2: e(11) + 240 + 60,
      scrollEnd2: e(11) + 490 + 10,
      toTop: 120,
      text: `<p class='xs:text-sans-18 lg:text-sans-26 text-left'>
        <span class="xs:text-sans-26 lg:text-sans-38">逆向与数据 · <i class="xs:text-serif-26 lg:text-serif-38">直面复杂</i></span><br>
        <span class="text-line from-scale dark xs:my-10 lg:my-20 ic !w-550 -translate-x-[30%]"></span>
        <span class="lg:lines-text-gradient">遇到黑盒，就去拆开它。</span><br>
        <span class="lg:lines-text-gradient">从加密协议解析到异步高速下载，</span><br>
        <span class="lg:lines-text-gradient">在杂乱的网页与数据流里，</span><br>
        <span class="lg:lines-text-gradient">理出一条清晰可靠的通道。</span><br>
      </p>`,
    },
    {
      className: 'bottom-0 xs:pr-40 lg:pr-0 xs:right-0 lg:left-1/10 w-410',
      scrollStart: e(11) + 310 + 60,
      scrollEnd: e(11) + 360 + 60,
      scrollStart2: e(11) + 310 + 60,
      scrollEnd2: e(11) + 560 + 10,
      toTop: 120,
      text: `<p class='xs:text-sans-18 lg:text-sans-26 text-right'>
        <span class="xs:text-sans-26 lg:text-sans-38">开源与笔记 · <i class="xs:text-serif-26 lg:text-serif-38">留给后来人</i></span><br>
        <span class="text-line from-scale dark xs:my-10 lg:my-20 ic !w-600 -translate-x-[15%]"></span>
        <span class="lg:lines-text-gradient-left">写给自己，也分享给社区。</span><br>
        <span class="lg:lines-text-gradient-left">把踩过的坑整理成博客文章，</span><br>
        <span class="whitespace-nowrap lg:lines-text-gradient-left">把顺手的工具放到 GitHub 上，</span><br>
        <span class="lg:lines-text-gradient-left">让后来的人少走一点弯路。</span>
      </p>`,
    },
    {
      className: 'top-1/8 left-1/2 -translate-x-1/2 xs:w-full lg:w-auto',
      scrollStart: e(15) + 40,
      scrollEnd: e(15) + 130,
      scrollStart2: e(15) + 225 - (isMobile ? 50 : 0),
      scrollEnd2: e(15) + 430 - (isMobile ? 10 : 0),
      toTop: 110,
      text: `<p class='xs:text-sans-38 lg:text-sans-66 text-center'>
        <span>七个 <i class="xs:text-serif-38 lg:text-serif-66 lg:mr-3">真实运行</i></span><br>
        <span class="inline-block lg:-translate-y-10">中的开源与实践项目</span><br>
      </p>`,
    },
  ];

  const isOverlayHidden = state.currentPage !== 'home' || state.mobileMenuOpen;

  return (
    <div>
      <div
        className={`opacity-0 w-screen h-screen fixed top-0 left-0 z-9 pointer-events-none ${
          ready && !state.scrollCrutch ? 'opacity-100 duration-300' : ''
        } ${isOverlayHidden ? '!opacity-0 transition-opacity duration-300 ease-in-out' : ''}`}
      >
        {lightSmallTexts.map((item, i) => (
          <SmallTextNew
            key={`light-small-${i}`}
            className={item.className}
            content={item.text}
            scrollStart={item.scrollStart}
            scrollEnd={item.scrollEnd}
            scrollStart2={item.scrollStart2}
            scrollEnd2={item.scrollEnd2}
            mode="light"
          />
        ))}
        {darkSmallTexts.map((item, i) => (
          <SmallTextNew
            key={`dark-small-${i}`}
            className={item.className}
            content={item.text}
            scrollStart={item.scrollStart}
            scrollEnd={item.scrollEnd}
            scrollStart2={item.scrollStart2}
            scrollEnd2={item.scrollEnd2}
            mode="dark"
          />
        ))}
        {bigTexts.map((item, i) => (
          <BigTextNew
            key={`big-${i}`}
            className={item.className}
            content={item.text}
            scrollStart={item.scrollStart}
            scrollEnd={item.scrollEnd}
            scrollStart2={item.scrollStart2}
            scrollEnd2={item.scrollEnd2}
          />
        ))}
        {linesTexts.map((item, i) => (
          <LinesText
            key={`lines-${i}`}
            className={item.className}
            content={item.text}
            scrollStart={item.scrollStart}
            scrollEnd={item.scrollEnd}
            scrollStart2={item.scrollStart2}
            scrollEnd2={item.scrollEnd2}
            toTop={item.toTop}
          />
        ))}
      </div>

      {caseHoverItems.map((item) => (
        <CaseHover
          key={item.id}
          id={item.id}
          content={item.content}
          link={item.link}
          className={item.className}
        />
      ))}
    </div>
  );
};
