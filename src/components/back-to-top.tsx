'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackToTopProps {
  /** 显示按钮的滚动阈值（像素） */
  threshold?: number;
  /** 自定义类名 */
  className?: string;
}

export function BackToTop({ threshold = 400, className }: BackToTopProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const isStorytellingPage =
    pathname === '/' ||
    pathname.startsWith('/cases/') ||
    pathname === '/cases' ||
    pathname === '/contacts' ||
    pathname.startsWith('/contacts/');

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // 初始检查

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isStorytellingPage) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="返回顶部"
      className={cn(
        'fixed bottom-6 right-6 z-50 p-3 rounded-full',
        'bg-primary text-primary-foreground shadow-lg',
        'hover:bg-primary/90 hover:scale-110',
        'transition-all duration-300 ease-out',
        'focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
