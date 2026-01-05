"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface PrefetchLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  prefetchDelay?: number;
}

/**
 * 智能预取链接组件
 * 鼠标悬停时预加载目标页面，提升导航速度
 */
export function PrefetchLink({
  href,
  children,
  prefetchDelay = 100,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefetchedRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    // 仅预取内部链接
    if (!href.startsWith("/") || prefetchedRef.current) return;

    timeoutRef.current = setTimeout(() => {
      router.prefetch(href);
      prefetchedRef.current = true;
    }, prefetchDelay);
  }, [href, prefetchDelay, router]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // 仅处理内部链接的左键点击
      if (!href.startsWith("/") || e.metaKey || e.ctrlKey) return;
      
      e.preventDefault();
      router.push(href);
    },
    [href, router]
  );

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}

/**
 * Hook: 为任意元素添加预取功能
 */
export function usePrefetch(href: string, delay = 100) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefetchedRef = useRef(false);

  const onMouseEnter = useCallback(() => {
    if (!href.startsWith("/") || prefetchedRef.current) return;

    timeoutRef.current = setTimeout(() => {
      router.prefetch(href);
      prefetchedRef.current = true;
    }, delay);
  }, [href, delay, router]);

  const onMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { onMouseEnter, onMouseLeave };
}
