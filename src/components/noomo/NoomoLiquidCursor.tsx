'use client';

import React, { useEffect, useRef } from 'react';
import { noomoStore, useNoomoStore } from './noomo-store';

interface LiquidGlassFilterOptions {
  width: number;
  height: number;
  fragment: (uv: { x: number; y: number }, mouse: { x: number; y: number }) => { x: number; y: number };
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function roundedRectSDF(x: number, y: number, w: number, h: number, r: number): number {
  const qx = Math.abs(x) - w + r;
  const qy = Math.abs(y) - h + r;
  return Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - r;
}

class LiquidGlassFilter {
  width: number;
  height: number;
  fragment: LiquidGlassFilterOptions['fragment'];
  id: string;
  mouse = { x: 0, y: 0 };
  mouseUsed = false;
  svg!: SVGSVGElement;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  feImage!: SVGFEImageElement;
  feDisplacementMap!: SVGFEDisplacementMapElement;

  constructor(opts: LiquidGlassFilterOptions) {
    this.width = opts.width;
    this.height = opts.height;
    this.fragment = opts.fragment;
    this.id = 'liquid-glass-' + Math.random().toString(36).slice(2, 11);
    this.createFilterDom();
    this.updateShader();
  }

  private createFilterDom() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.svg.setAttribute('width', '0');
    this.svg.setAttribute('height', '0');
    this.svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;';

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', `${this.id}_filter`);
    filter.setAttribute('filterUnits', 'userSpaceOnUse');
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    filter.setAttribute('x', '0');
    filter.setAttribute('y', '0');
    filter.setAttribute('width', String(this.width));
    filter.setAttribute('height', String(this.height));

    this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
    this.feImage.setAttribute('id', `${this.id}_map`);
    this.feImage.setAttribute('width', String(this.width));
    this.feImage.setAttribute('height', String(this.height));

    this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    this.feDisplacementMap.setAttribute('in', 'SourceGraphic');
    this.feDisplacementMap.setAttribute('in2', `${this.id}_map`);
    this.feDisplacementMap.setAttribute('xChannelSelector', 'R');
    this.feDisplacementMap.setAttribute('yChannelSelector', 'G');

    filter.appendChild(this.feImage);
    filter.appendChild(this.feDisplacementMap);
    defs.appendChild(filter);
    this.svg.appendChild(defs);

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.display = 'none';
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas context unavailable');
    this.context = ctx;
  }

  updateShader() {
    const proxyMouse = new Proxy(this.mouse, {
      get: (target, prop) => {
        this.mouseUsed = true;
        return Reflect.get(target, prop);
      },
    });
    this.mouseUsed = false;

    const w = this.width;
    const h = this.height;
    const data = new Uint8ClampedArray(w * h * 4);
    let maxDelta = 0;
    const deltas: number[] = [];

    for (let i = 0; i < data.length; i += 4) {
      const px = (i / 4) % w;
      const py = Math.floor(i / 4 / w);
      const q = this.fragment({ x: px / w, y: py / h }, proxyMouse);
      const dx = q.x * w - px;
      const dy = q.y * h - py;
      maxDelta = Math.max(maxDelta, Math.abs(dx), Math.abs(dy));
      deltas.push(dx, dy);
    }

    maxDelta *= 0.5;
    if (maxDelta === 0) maxDelta = 1;
    let p = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = deltas[p++] / maxDelta + 0.5;
      const g = deltas[p++] / maxDelta + 0.5;
      data[i] = r * 255;
      data[i + 1] = g * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    this.context.putImageData(new ImageData(data, w, h), 0, 0);
    this.feImage.setAttribute('href', this.canvas.toDataURL());
    this.feDisplacementMap.setAttribute('scale', String(maxDelta));
  }

  destroy() {
    this.svg.remove();
    this.canvas.remove();
  }
}

export const NoomoLiquidCursor: React.FC<{
  width?: number;
  height?: number;
  offset?: number;
  followSpeed?: number;
}> = ({ width = 48, height = 48, offset = 10, followSpeed = 0.18 }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const glassRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<LiquidGlassFilter | null>(null);
  const state = useNoomoStore();

  useEffect(() => {
    const root = rootRef.current;
    const glass = glassRef.current;
    if (!root || !glass) return;

    const ua = navigator.userAgent || '';
    const isSafariOrFirefox =
      (/Safari/.test(ua) && !/(Chrome|CriOS|FxiOS|EdgiOS|OPiOS|OPR|EdgA|Edg)/.test(ua)) ||
      /Firefox/.test(ua);

    const clampPos = (x: number, y: number, w: number, h: number) => {
      const maxX = window.innerWidth - w - offset - (noomoStore.getSnapshot().cursorTextVisible ? 125 : 0);
      const maxY = window.innerHeight - h - offset;
      return {
        x: Math.max(offset, Math.min(maxX, x)),
        y: Math.max(offset, Math.min(maxY, y)),
      };
    };

    const applyBackdrop = (el: HTMLElement, id: string, blurPx = 1, contrast = 1.2, brightness = 1.05, saturate = 1.1) => {
      const base = `blur(${blurPx}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturate})`;
      const value = !isSafariOrFirefox ? `url(#${id}_filter) ${base}` : base;
      el.style.backdropFilter = value;
      (el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = value;
      el.style.backgroundColor = 'rgba(255,255,255,0.01)';
    };

    root.style.position = 'fixed';
    root.style.width = `${width}px`;
    root.style.height = `${height}px`;
    root.style.zIndex = '99';
    root.style.pointerEvents = 'none';

    const initPos = clampPos(offset, offset, width, height);
    let curX = initPos.x;
    let curY = initPos.y;
    let targetX = initPos.x;
    let targetY = initPos.y;
    let lastClientX = 0;
    let lastClientY = 0;
    let hasMoved = false;

    const setPos = (x: number, y: number) => {
      root.style.left = `${x}px`;
      root.style.top = `${y}px`;
    };
    setPos(curX, curY);

    glass.style.position = 'absolute';
    glass.style.inset = '0';
    glass.style.width = '100%';
    glass.style.height = '100%';
    glass.style.overflow = 'hidden';
    glass.style.pointerEvents = 'auto';
    glass.style.borderRadius = '9999px';

    const fragment = (uv: { x: number; y: number }) => {
      const cx = uv.x - 0.5;
      const cy = uv.y - 0.5;
      const d = roundedRectSDF(cx, cy, 0.3, 0.2, 0.6);
      const t = smoothstep(0.6, 0, d - 0.1);
      const k = smoothstep(0, 1, t);
      return { x: cx * k + 0.5, y: cy * k + 0.5 };
    };

    const lf = new LiquidGlassFilter({ width, height, fragment });
    filterRef.current = lf;
    root.appendChild(lf.svg);
    applyBackdrop(glass, lf.id, 1, 1.2, 1.05, 1.1);

    let currentFilterWidth = width;
    const resizeFilter = (newWidth: number, blurPx = 1) => {
      if (!filterRef.current || !rootRef.current || !glassRef.current || currentFilterWidth === newWidth) return;
      currentFilterWidth = newWidth;
      const h = rootRef.current.offsetHeight || height;
      filterRef.current.destroy();
      const next = new LiquidGlassFilter({ width: newWidth, height: h, fragment });
      filterRef.current = next;
      rootRef.current.appendChild(next.svg);
      applyBackdrop(glassRef.current, next.id, blurPx, 1.2, 1.05, 1.1);
    };

    const updateTarget = (cx: number, cy: number) => {
      const clamped = clampPos(cx - width / 2, cy - height / 2, width, height);
      targetX = clamped.x;
      targetY = clamped.y;
      const rect = glass.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && filterRef.current) {
        filterRef.current.mouse.x = (cx - rect.left) / rect.width;
        filterRef.current.mouse.y = (cy - rect.top) / rect.height;
        if (filterRef.current.mouseUsed) filterRef.current.updateShader();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      // The full-screen menu owns the pointer while it is open.
      if (noomoStore.getSnapshot().mobileMenuOpen) return;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      hasMoved = true;
      updateTarget(e.clientX, e.clientY);
    };

    const onScroll = () => {
      if (hasMoved) updateTarget(lastClientX, lastClientY);
    };

    const onResize = () => {
      const clamped = clampPos(curX, curY, width, height);
      curX = clamped.x;
      curY = clamped.y;
      targetX = clamped.x;
      targetY = clamped.y;
      setPos(curX, curY);
    };

    let rafId = 0;
    const tick = () => {
      curX = curX + (targetX - curX) * followSpeed;
      curY = curY + (targetY - curY) * followSpeed;
      setPos(curX, curY);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onResize);

    let resetTimer: number | null = null;
    const unsub = noomoStore.onAction(({ name, args }) => {
      if (name === 'setCursorText' && typeof args[0] === 'string' && args[0].length > 0) {
        if (resetTimer) window.clearTimeout(resetTimer);
        resizeFilter(162, 2);
      } else if (name === 'setCursorTextState' && !args[0]) {
        if (resetTimer) window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => resizeFilter(48, 1), 300);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (resetTimer) window.clearTimeout(resetTimer);
      unsub();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      filterRef.current?.destroy();
      filterRef.current = null;
    };
  }, [width, height, offset, followSpeed]);

  const isClickToStart = state.cursorTextVisible && Boolean(state.cursorText);

  return (
    <div
      ref={rootRef}
      className="liquid-glass-root"
      style={{ visibility: state.mobileMenuOpen ? 'hidden' : undefined }}
    >
      <div
        className={`wrapper relative transition-all transform duration-300 ease-in-out scale-100 ${
          state.cursorHover ? '!scale-75' : ''
        } ${state.cursorHoverCase ? '!scale-140' : ''}`}
      >
        <div
          className={`inner-border transition-all transform duration-300 ease-in-out ${
            state.cursorTextVisible || state.cursorHover ? 'opacity-0' : ''
          }`}
        />
        <div
          className={`outer-border -translate-1/2 transition-all transform duration-300 ease-in-out scale-100 ${
            state.cursorHover ? '!scale-75 opacity-0' : ''
          } ${isClickToStart ? '!w-178 !rounded-[100px] !-translate-x-31' : ''}`}
        />
        <div
          className={`star transition-all duration-300 ease-in-out ${
            state.cursorHover || state.cursorHoverCase ? 'opacity-0' : ''
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.0625 17.6094H7.54688V12.5781H10.0625V17.6094ZM7.54688 10.0625V12.5781H5.03125V10.0625H7.54688ZM12.5781 12.5781H10.0625V10.0625H12.5781V12.5781ZM5.03125 10.0625H0V7.54688H5.03125V10.0625ZM17.6094 10.0625H12.5781V7.54688H17.6094V10.0625ZM7.54688 7.54688H5.03125V5.03125H7.54688V7.54688ZM12.5781 7.54688H10.0625V5.03125H12.5781V7.54688ZM10.0625 5.03125H7.54688V0H10.0625V5.03125Z"
              fill={isClickToStart ? '#2A2336' : 'white'}
            />
          </svg>
        </div>
        <div
          className={`arrow transition-all opacity-0 duration-300 ease-in-out ${
            state.cursorHoverCase ? 'opacity-100' : ''
          }`}
        />
        <div
          ref={glassRef}
          className={`liquid-glass transition-all opacity-100 transform duration-300 ease-in-out ${
            state.cursorHover ? '!opacity-0' : ''
          } ${isClickToStart ? '!w-162' : ''} ${state.cursorHoverCase ? 'bg-brand-blue-600/41' : ''}`}
        >
          <div
            className={`relative w-full h-full flex whitespace-nowrap justify-center items-center opacity-0 transition-all duration-300 delay-0 text-sans-18 text-brand-black pl-30 ${
              state.cursorTextVisible ? '!opacity-100 !delay-300' : ''
            }`}
          >
            {state.cursorText}
          </div>
        </div>
      </div>
      <div
        className={`hover-case-text flex w-full top-0 left-0 h-full text-brand-white absolute transition-all blur-sm transform duration-400 ease-in-out scale-120 opacity-0 ${
          state.cursorHoverCase ? 'opacity-100 !blur-none' : ''
        }`}
      >
        <div
          key={state.cursorText}
          className="hover-case-text-content w-full"
          dangerouslySetInnerHTML={{ __html: state.cursorText }}
        />
      </div>
    </div>
  );
};
