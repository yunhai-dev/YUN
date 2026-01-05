'use client';

import { useEffect, useCallback, useRef } from 'react';

/**
 * 滚动位置恢复 Hook
 * 用于在列表页和详情页之间导航时保持滚动位置
 * 兼容 next-view-transitions
 * @param storageKey - 用于存储滚动位置的唯一标识符
 */
export function useScrollRestoration(storageKey: string) {
  const hasRestored = useRef(false);
  const targetScrollY = useRef<number | null>(null);

  // 保存滚动位置
  const saveScrollPosition = useCallback(() => {
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      sessionStorage.setItem(storageKey, String(scrollY));
    }
  }, [storageKey]);

  // 恢复滚动位置（只在需要时恢复，避免闪烁）
  const restoreScrollPosition = useCallback(() => {
    if (typeof window === 'undefined' || hasRestored.current) return;
    
    const saved = sessionStorage.getItem(storageKey);
    if (!saved) return;
    
    const scrollY = parseInt(saved, 10);
    if (isNaN(scrollY) || scrollY === 0) return;
    
    targetScrollY.current = scrollY;
    hasRestored.current = true;
    
    // 使用 requestAnimationFrame 确保在渲染后恢复
    const restore = () => {
      if (targetScrollY.current !== null) {
        window.scrollTo({ top: targetScrollY.current, behavior: 'instant' });
      }
    };
    
    // 立即恢复一次
    restore();
    
    // 使用 requestAnimationFrame 在下一帧再恢复一次
    requestAnimationFrame(() => {
      restore();
      // 再延迟一帧，确保 view transition 完成
      requestAnimationFrame(restore);
    });
  }, [storageKey]);

  // 清除保存的滚动位置
  const clearScrollPosition = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  // 组件挂载时恢复滚动位置
  useEffect(() => {
    restoreScrollPosition();
  }, [restoreScrollPosition]);

  // 监听链接点击，保存滚动位置
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href) {
        const url = new URL(link.href, window.location.origin);
        if (url.origin === window.location.origin && !link.href.includes('#')) {
          saveScrollPosition();
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveScrollPosition();
      }
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', saveScrollPosition);
    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', saveScrollPosition);
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [saveScrollPosition]);

  return {
    saveScrollPosition,
    restoreScrollPosition,
    clearScrollPosition,
  };
}

/**
 * 滚动位置恢复组件
 */
export function ScrollRestoration({ storageKey }: { storageKey: string }) {
  useScrollRestoration(storageKey);
  return null;
}


