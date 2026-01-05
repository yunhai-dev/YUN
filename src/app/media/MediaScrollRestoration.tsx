'use client';

import { useScrollRestoration } from '@/hooks/use-scroll-restoration';

export function MediaScrollRestoration() {
  useScrollRestoration('media-list-scroll');
  return null;
}
