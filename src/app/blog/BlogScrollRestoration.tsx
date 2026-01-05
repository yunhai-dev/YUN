'use client';

import { useScrollRestoration } from '@/hooks/use-scroll-restoration';

export function BlogScrollRestoration() {
  useScrollRestoration('blog-list-scroll');
  return null;
}
