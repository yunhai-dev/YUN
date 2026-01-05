"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  /** 进度条颜色，默认紫色渐变 */
  color?: string;
  /** 进度条高度，默认 3px */
  height?: number;
  /** 目标容器选择器，默认整个文档 */
  targetSelector?: string;
}

export function ReadingProgress({
  color = "linear-gradient(to right, #22c55e, #4ade80)",
  height = 3,
  targetSelector,
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
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
        setProgress(0);
        setIsVisible(false);
        return;
      }

      const currentProgress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
      setProgress(currentProgress);
      setIsVisible(scrollTop > 100);
    };

    calculateProgress();
    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [targetSelector]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      style={{ height: `${height}px` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="阅读进度"
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: color,
        }}
      />
    </div>
  );
}
