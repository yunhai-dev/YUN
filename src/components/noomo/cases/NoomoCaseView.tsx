'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { noomoStore, useNoomoStore } from '../noomo-store';
import { useNoomoNavigation } from '../NoomoExperienceShell';
import type { CaseStudyData } from './cases-data';

const ViewCaseButton: React.FC<{ link: string; text: string; external?: boolean }> = ({
  link,
  text,
  external = true,
}) => {
  const content = (
    <>
      <div className="gradient gradient-1 absolute w-full h-full top-0 left-0 z-1" />
      <div className="gradient gradient-2 absolute w-full h-full top-0 left-0 z-2" />
      <img className="inline-block mr-10 relative z-5" alt="star" src="/noomo/images/svg/newStar.svg" />
      <div className="relative z-5 translate-y-2">
        <span className="xs:text-serif-18 lg:text-serif-18 inline-block -translate-x-2">View</span>{' '}
        {text}
      </div>
      <div className="bb" />
    </>
  );

  const className =
    'view-case-button relative bg-white/25 cursor-pointer xs:w-fit lg:w-auto xs:px-15 md:px-15 flex xs:text-sans-18 lg:text-sans-18 xs:h-46 lg:h-46 overflow-hidden rounded-full items-center pr-5 justify-center text-white';

  if (!external) {
    return (
      <Link
        href={link}
        onMouseEnter={() => noomoStore.setCursorHover(true)}
        onMouseLeave={() => noomoStore.setCursorHover(false)}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      onMouseEnter={() => noomoStore.setCursorHover(true)}
      onMouseLeave={() => noomoStore.setCursorHover(false)}
      className={className}
    >
      {content}
    </a>
  );
};

export const NoomoCaseView: React.FC<{ data: CaseStudyData }> = ({ data }) => {
  const state = useNoomoStore();
  const { navigateWithTransition } = useNoomoNavigation();
  const [ready, setReady] = useState(false);
  const [vignetteOffset, setVignetteOffset] = useState(0);

  useEffect(() => {
    noomoStore.setIceTransition(1);
    noomoStore.setVideoTransition(1);
    noomoStore.setCursorTransition(1);
    noomoStore.setCurrentPage('cases');
    noomoStore.setSectionColor('dark');
    noomoStore.setCursorTextState(false);
    noomoStore.setCursorText('');
    noomoStore.setCursorHoverCase(false, '');
    noomoStore.getSnapshot().scroll?.scrollTo(0, false);

    let disposed = false;
    let rafId = 0;

    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    let imgReady = false;
    img.onload = () => {
      imgReady = true;
    };
    img.src = data.image;

    const startTime = performance.now();
    const drawFrame = () => {
      if (disposed) return;
      if (ctx) {
        const elapsed = (performance.now() - startTime) * 0.001;
        const w = canvas.width;
        const h = canvas.height;
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, data.accentGradient[0]);
        grad.addColorStop(1, data.accentGradient[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        if (imgReady && img.naturalWidth > 0) {
          const scale = 1.04 + Math.sin(elapsed * 0.35) * 0.03;
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const canvasRatio = w / h;
          let drawW = w * scale;
          let drawH = h * scale;
          if (imgRatio > canvasRatio) {
            drawW = drawH * imgRatio;
          } else {
            drawH = drawW / imgRatio;
          }
          const dx = (w - drawW) / 2 + Math.cos(elapsed * 0.25) * 16;
          const dy = (h - drawH) / 2 + Math.sin(elapsed * 0.2) * 10;
          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.drawImage(img, dx, dy, drawW, drawH);
          ctx.restore();
        }

        // Subtle dark vignette for crisp white typography contrast
        const scrim = ctx.createLinearGradient(0, 0, 0, h);
        scrim.addColorStop(0, 'rgba(6, 11, 29, 0.28)');
        scrim.addColorStop(0.65, 'rgba(6, 11, 29, 0.38)');
        scrim.addColorStop(1, 'rgba(6, 11, 29, 0.72)');
        ctx.fillStyle = scrim;
        ctx.fillRect(0, 0, w, h);
      }
      rafId = window.requestAnimationFrame(drawFrame);
    };
    drawFrame();

    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.style.display = 'none';
    video.style.opacity = '0';
    video.style.pointerEvents = 'none';
    if (typeof canvas.captureStream === 'function') {
      video.srcObject = canvas.captureStream(30);
    }
    document.body.appendChild(video);

    noomoStore.setVideoElement(video);
    video.play().catch(() => {});

    const tweenState = { iceValue: 1 };
    const tween = gsap.to(tweenState, {
      iceValue: 0.1,
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: () => noomoStore.setIceTransition(tweenState.iceValue),
      onComplete: () => setReady(true),
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      tween.kill();
      noomoStore.setVideoElement(null);
      const stream = video.srcObject as MediaStream | null;
      stream?.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
      video.remove();
    };
  }, [data]);

  useEffect(() => {
    if (!ready) return;
    const clamped = Math.min(Math.max(state.scrollProgress / 0.8, 0), 1);
    const iceVal = 0.1 + clamped * 0.7;
    setVignetteOffset(clamped * 100);
    noomoStore.setIceTransition(iceVal);
  }, [ready, state.scrollProgress]);

  const handleNextOrBack = (e: React.MouseEvent, targetPath: string) => {
    e.preventDefault();
    if (noomoStore.getSnapshot().transitionActive) return;

    if (targetPath.startsWith('/cases/')) {
      setReady(false);
      noomoStore.getSnapshot().scroll?.paused(true);
      const obj = { iceValue: noomoStore.getSnapshot().iceTransition };
      gsap.to(obj, {
        iceValue: 1,
        duration: 0.7,
        ease: 'power2.inOut',
        onUpdate: () => noomoStore.setIceTransition(obj.iceValue),
        onComplete: () => {
          navigateWithTransition(targetPath);
          noomoStore.getSnapshot().scroll?.paused(false);
        },
      });
    } else {
      navigateWithTransition(targetPath);
    }
  };

  return (
    <div
      className={`min-h-screen relative z-1000 opacity-0 transition-opacity duration-500 ease-in-out ${
        ready && !state.mobileMenuOpen ? 'opacity-100' : ''
      }`}
    >
      {/* Hero section */}
      <div className="min-h-[100svh] relative z-3">
        <div className="wrapper xs:px-20 lg:px-108 min-h-[100svh] xs:pb-25 lg:pb-90 flex items-end">
          <div className="flex justify-between w-full items-center relative">
            <div>
              <h1
                className="xs:text-sans-44 lg:text-sans-66 text-white"
                dangerouslySetInnerHTML={{ __html: data.hero.title }}
              />
              <div className="cases-text-line xs:my-15 lg:my-30" />
              <div className="flex">
                {data.hero.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="xs:text-sans-16 lg:text-sans-18 text-white flex xs:mr-16 lg:mr-25"
                  >
                    <img alt="star" className="w-10 mr-4" src="/noomo/images/svg/tagsStar.svg" />
                    <span dangerouslySetInnerHTML={{ __html: tag }} />
                  </span>
                ))}
              </div>
              <div className="xs:block mt-20 lg:hidden">
                <ViewCaseButton
                  link={data.hero.caseLink}
                  text={data.hero.buttonText}
                  external={data.hero.external}
                />
              </div>
            </div>
            <div className="xs:hidden lg:block">
              <ViewCaseButton
                link={data.hero.caseLink}
                text={data.hero.buttonText}
                external={data.hero.external}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Narrative text section */}
      <div className="cases-text min-h-screen">
        <div className="wrapper lg:flex-row xs:flex-col lg:px-0 xs:px-20 lg:gap-100 lg:pl-170 lg:pr-245 xs:pt-30 lg:pt-190 lg:pb-176 flex justify-center">
          <div>
            <h2
              className="leading-46 xs:text-sans-38 lg:text-sans-50 max-w-457 xs:mb-40 lg:mb-0 text-white"
              dangerouslySetInnerHTML={{ __html: data.body.title }}
            />
          </div>
          <div
            className="xs:text-sans-18 lg:text-sans-26 leading-30 max-w-465 text-white desc"
            dangerouslySetInnerHTML={{ __html: data.body.texts }}
          />
        </div>
      </div>

      {/* Next / Prev section */}
      <div className="next-prev-cases">
        <div className="wrapper lg:items-end xs:pb-25 xs:gap-15 lg:gap-0 lg:pb-150 xs:mt-30 lg:mt-0 flex xs:px-20 lg:px-178 lg:justify-between">
          <div
            className="flex xs:hidden md:block"
            onMouseEnter={() => noomoStore.setCursorHover(true)}
            onMouseLeave={() => noomoStore.setCursorHover(false)}
          >
            <Link href="/" onClick={(e) => handleNextOrBack(e, '/')} className="flex nav-button">
              <div className="mobile-prev overflow-hidden xs:w-48 xs:h-48 lg:h-59 lg:w-59 relative flex items-center bg-white/11 rounded-full backdrop-blur-xs justify-center cursor-pointer">
                <div className="gradient gradient-1 absolute w-full h-full top-0 left-0 z-1" />
                <div className="gradient gradient-2 absolute w-full h-full top-0 left-0 z-2" />
                <div className="bb lg:hidden xs:block" />
                <img
                  alt="circle"
                  src="/noomo/images/svg/soundBorder.svg"
                  className="lg:block xs:hidden border-circle scale-104 absolute z-3 w-57 h-57 top-1 left-1 transition-all duration-600"
                />
                <img alt="arrow" className="rotate-180" src="/noomo/images/svg/backArrowNew.svg" />
              </div>
              <div className="ml-28 relative lg:block xs:hidden">
                <p className="text-sans-18 text-white mb-8">Back to</p>
                <p className="text-sans-38 text-white">返回云海全景</p>
                <div className="cases-text-line cases-text-line-prev half w-0 absolute transition-all duration-500 -left-120 -bottom-10" />
              </div>
            </Link>
          </div>

          <div className="flex">
            <Link
              href={data.next.link}
              onClick={(e) => handleNextOrBack(e, data.next.link)}
              onMouseEnter={() => noomoStore.setCursorHover(true)}
              onMouseLeave={() => noomoStore.setCursorHover(false)}
              className="flex nav-button"
            >
              <div className="mr-28 relative lg:block xs:hidden">
                <p className="text-sans-18 text-right text-white mb-8">Next Project</p>
                <p
                  className="text-sans-38 text-white"
                  dangerouslySetInnerHTML={{ __html: data.next.title }}
                />
                <div className="cases-text-line cases-text-line-next half w-0 absolute transition-all duration-500 -right-50 -bottom-10" />
              </div>
              <div className="mobile-next overflow-hidden xs:h-48 lg:h-59 bg-white/11 rounded-full backdrop-blur-xs xs:w-152 lg:w-59 relative flex items-center justify-center cursor-pointer">
                <div className="gradient gradient-1 absolute w-full h-full top-0 left-0 z-1" />
                <div className="gradient gradient-2 absolute w-full h-full top-0 left-0 z-2" />
                <div className="bb lg:hidden xs:block" />
                <img
                  alt="circle"
                  src="/noomo/images/svg/soundBorder.svg"
                  className="lg:block xs:hidden border-circle scale-104 absolute z-3 w-57 h-57 top-1 left-1 transition-all duration-600"
                />
                <p className="text-sans-18 xs:block lg:hidden text-white mr-9">Next Project</p>
                <img alt="arrow" src="/noomo/images/svg/backArrowNew.svg" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom vignette */}
      <div
        className="vignette-bottom vignette-bottom-safari vignette fixed ease-in-out xs:top-[40vh] lg:top-[70vh] xs:h-[60vh] lg:h-[40vh] w-full left-0 pointer-events-none"
        style={{ transform: `translateY(${vignetteOffset * 3}vh)` }}
      />
    </div>
  );
};
