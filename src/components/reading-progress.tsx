"use client";

import { useEffect, useRef, useState } from "react";

interface ReadingProgressProps {
  /** 进度条颜色，默认紫色渐变 */
  color?: string;
  /** 进度条高度，默认 3px */
  height?: number;
  /** 目标容器选择器，默认整个文档 */
  targetSelector?: string;
}

export function ReadingProgress({
  color = "linear-gradient(to right, #a990f6, #eabdf6, #cebdf8)",
  height = 3,
  targetSelector,
}: ReadingProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    // The bar is updated straight on the DOM: a scroll handler that calls setState would
    // re-render the article on every scroll event.
    const calculateProgress = () => {
      rafRef.current = 0;

      let scrollTop: number;
      let scrollHeight: number;
      let clientHeight: number;

      if (targetSelector) {
        const target = document.querySelector(targetSelector);
        if (!target) return;
        
        const rect = target.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top;
        const targetHeight = target.scrollHeight;
        
        scrollTop = Math.max(0, window.scrollY - targetTop);
        scrollHeight = targetHeight;
        clientHeight = window.innerHeight;
      } else {
        scrollTop = window.scrollY;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      }

      const maxScroll = scrollHeight - clientHeight;
      
      if (maxScroll <= 0) {
        if (barRef.current) barRef.current.style.transform = "scaleX(0)";
        setIsVisible(false);
        return;
      }

      const currentProgress = Math.min(1, Math.max(0, scrollTop / maxScroll));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${currentProgress})`;
      }
      if (containerRef.current) {
        containerRef.current.setAttribute("aria-valuenow", String(Math.round(currentProgress * 100)));
      }
      setIsVisible(scrollTop > 100);
    };

    const schedule = () => {
      if (rafRef.current !== 0) return;
      rafRef.current = window.requestAnimationFrame(calculateProgress);
    };

    calculateProgress();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (rafRef.current !== 0) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [targetSelector]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      style={{ height: `${height}px`, opacity: isVisible ? 1 : 0 }}
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="阅读进度"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left will-change-transform"
        style={{
          background: color,
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}
