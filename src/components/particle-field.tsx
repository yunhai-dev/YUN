"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  shapes,
  shapeColors,
  skillIdList,
  projectColors,
  VIOLET,
  type ShapeId,
} from "@/lib/particle-shapes";

gsap.registerPlugin(ScrollTrigger);

// ponytail: particle counts chosen for 60fps on mid-range laptop
const PARTICLE_COUNT_DESKTOP = 10_000;
const PARTICLE_COUNT_MOBILE = 4_000;

const VERT = `
precision highp float;

attribute vec3 aPositionA;
attribute vec3 aPositionB;
attribute float aSize;
attribute float aRandom;
attribute vec3 aColor;

uniform float uMorphProgress;
uniform float uTime;
uniform float uIdleStrength;
uniform float uOpacity;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float vAlpha;
varying vec3 vColor;

float easeInOutCubic(float t) {
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
  float e = easeInOutCubic(clamp(uMorphProgress, 0.0, 1.0));

  float phase = aRandom * 6.2832 + uTime * 0.35;
  vec3 drift = vec3(
    sin(phase) * 0.04,
    cos(phase * 0.7 + 1.3) * 0.025,
    sin(phase * 0.4 + 2.1) * 0.015
  ) * uIdleStrength * (1.0 - e * 0.8);

  vec3 pos = mix(aPositionA, aPositionB, e) + drift;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (700.0 / -mvPos.z);
  gl_Position = projectionMatrix * mvPos;

  vAlpha = (0.6 + aRandom * 0.4) * uOpacity;
  vColor = aColor;
}
`;

const FRAG = `
precision mediump float;

varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float core = smoothstep(0.5, 0.0, d);
  float halo = smoothstep(0.5, 0.15, d) * 0.35;
  float a = (core + halo) * vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor * (core * 1.4 + halo), a);
}
`;

// --- helpers ---

function buildShapeBuffer(shapeId: ShapeId, N: number): Float32Array {
  const src = shapes[shapeId];
  const srcN = src.length / 3;
  const out = new Float32Array(N * 3);
  const scaleX = 1.6, scaleY = 1.2;

  if (srcN >= N) {
    // subsample
    const step = srcN / N;
    for (let i = 0; i < N; i++) {
      const si = Math.floor(i * step) * 3;
      out[i * 3]     = src[si]     * scaleX;
      out[i * 3 + 1] = src[si + 1] * scaleY;
      out[i * 3 + 2] = src[si + 2];
    }
  } else {
    // copy then pad with jittered duplicates
    for (let i = 0; i < srcN; i++) {
      out[i * 3]     = src[i * 3]     * scaleX;
      out[i * 3 + 1] = src[i * 3 + 1] * scaleY;
      out[i * 3 + 2] = src[i * 3 + 2];
    }
    let s = 99991;
    for (let i = srcN; i < N; i++) {
      const base = (i % srcN) * 3;
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const jx = ((s >>> 16) / 65536 - 0.5) * 0.15;
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const jy = ((s >>> 16) / 65536 - 0.5) * 0.15;
      out[i * 3]     = out[base]     + jx;
      out[i * 3 + 1] = out[base + 1] + jy;
      out[i * 3 + 2] = 0;
    }
  }
  return out;
}

function buildColorBuffer(N: number, color: [number, number, number]): Float32Array {
  const out = new Float32Array(N * 3);
  const [r, g, b] = color;
  for (let i = 0; i < N; i++) {
    out[i * 3] = r; out[i * 3 + 1] = g; out[i * 3 + 2] = b;
  }
  return out;
}

// freeze current interpolated positions into a flat array
function freezeCurrentPositions(
  posA: Float32Array, posB: Float32Array, progress: number, N: number
): Float32Array {
  const out = new Float32Array(N * 3);
  const e = Math.min(1, Math.max(0, progress));
  const ie = 1 - e;
  for (let i = 0; i < N * 3; i++) {
    out[i] = posA[i] * ie + posB[i] * e;
  }
  return out;
}

// --- component ---

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mount = mountRef.current!;
    const N = window.innerWidth >= 1024 ? PARTICLE_COUNT_DESKTOP : PARTICLE_COUNT_MOBILE;

    // WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: false, alpha: true, depth: false, stencil: false,
      powerPreference: "high-performance", premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });
    const baseDpr = Math.min(window.devicePixelRatio || 1, 2);
    let currentDpr = baseDpr;
    renderer.setPixelRatio(currentDpr);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const canvas = renderer.domElement;
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
    mount.appendChild(canvas);

    // scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5;

    // geometry with all attributes
    const geometry = new THREE.BufferGeometry();
    const posA = buildShapeBuffer("nebula", N);
    const posB = buildShapeBuffer("nebula", N);
    const sizes = new Float32Array(N);
    const randoms = new Float32Array(N);
    const colors = buildColorBuffer(N, VIOLET);

    let s = 777;
    for (let i = 0; i < N; i++) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      sizes[i] = 0.8 + ((s >>> 16) / 65536) * 1.4;
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      randoms[i] = (s >>> 16) / 65536;
    }

    geometry.setAttribute("aPositionA", new THREE.BufferAttribute(posA.slice(), 3));
    geometry.setAttribute("aPositionB", new THREE.BufferAttribute(posB.slice(), 3));
    geometry.setAttribute("aSize",      new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aRandom",    new THREE.BufferAttribute(randoms, 1));
    geometry.setAttribute("aColor",     new THREE.BufferAttribute(colors.slice(), 3));

    const uniforms = {
      uMorphProgress: { value: 0 },
      uTime:          { value: 0 },
      uIdleStrength:  { value: 1 },
      uOpacity:       { value: 0 },
    };

    const material = new THREE.RawShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms, transparent: true, depthTest: false, depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    // transitionTo: freeze current positions → load new target → reset progress
    let currentShape: ShapeId = "nebula";

    function transitionTo(newShape: ShapeId, newColor: [number, number, number]) {
      if (newShape === currentShape) return;
      currentShape = newShape;

      const attrA = geometry.getAttribute("aPositionA") as THREE.BufferAttribute;
      const attrB = geometry.getAttribute("aPositionB") as THREE.BufferAttribute;

      // freeze current interpolated positions into A
      const frozen = freezeCurrentPositions(
        attrA.array as Float32Array,
        attrB.array as Float32Array,
        uniforms.uMorphProgress.value,
        N,
      );
      (attrA.array as Float32Array).set(frozen);
      attrA.needsUpdate = true;

      // new target into B
      const newBuf = buildShapeBuffer(newShape, N);
      (attrB.array as Float32Array).set(newBuf);
      attrB.needsUpdate = true;

      // update per-vertex colors
      const colorAttr = geometry.getAttribute("aColor") as THREE.BufferAttribute;
      const newColors = buildColorBuffer(N, newColor);
      (colorAttr.array as Float32Array).set(newColors);
      colorAttr.needsUpdate = true;

      uniforms.uMorphProgress.value = 0;
    }

    // resize + DPR adapt
    const lastSize = { w: 0, h: 0, dpr: 0 };
    const fpsSamples: number[] = [];
    let lastFpsCheck = performance.now();
    let lastDprChange = 0;

    function setSizeNow() {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      const pr = currentDpr;
      if (Math.abs(w - lastSize.w) < 1 && Math.abs(h - lastSize.h) < 1 && Math.abs(pr - lastSize.dpr) < 0.01) return;
      lastSize.w = w; lastSize.h = h; lastSize.dpr = pr;
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    let resizeRaf = 0;
    const scheduleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(setSizeNow);
    };

    setSizeNow();
    const ro = new ResizeObserver(scheduleResize);
    ro.observe(mount);

    let paused = false;
    const onVis = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVis, { passive: true });

    const onCtxLost = (e: Event) => { e.preventDefault(); paused = true; };
    const onCtxRestored = () => { paused = false; scheduleResize(); };
    canvas.addEventListener("webglcontextlost", onCtxLost, false);
    canvas.addEventListener("webglcontextrestored", onCtxRestored, false);

    // render loop with DPR adaptation
    const clock = new THREE.Clock();
    let emaFps = 60;
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (paused || document.hidden) return;

      const dt = Math.min(0.05, clock.getDelta());
      uniforms.uTime.value += dt;

      // fade in on first frames
      if (uniforms.uOpacity.value < 0.85) {
        uniforms.uOpacity.value = Math.min(0.85, uniforms.uOpacity.value + dt * 0.6);
      }

      renderer.render(scene, camera);

      // DPR adaptation every 1.5s
      const now = performance.now();
      emaFps = emaFps * 0.9 + (1 / Math.max(dt, 0.001)) * 0.1;
      fpsSamples.push(emaFps);
      if (now - lastFpsCheck > 1500 && fpsSamples.length > 0) {
        const avg = fpsSamples.reduce((a, b) => a + b) / fpsSamples.length;
        fpsSamples.length = 0;
        lastFpsCheck = now;
        if (avg < 45 && currentDpr > 0.6 && now - lastDprChange > 2500) {
          currentDpr = Math.max(0.6, currentDpr * 0.8);
          lastDprChange = now;
          setSizeNow();
        } else if (avg > 58 && currentDpr < baseDpr && now - lastDprChange > 2500) {
          currentDpr = Math.min(baseDpr, currentDpr * 1.15);
          lastDprChange = now;
          setSizeNow();
        }
      }
    };

    animate();

    // ScrollTrigger: Hero area — idle nebula
    ScrollTrigger.create({
      trigger: ".home-hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onEnterBack() {
        transitionTo("nebula", VIOLET);
        gsap.to(uniforms.uOpacity, { value: 0.85, duration: 0.6 });
        gsap.to(uniforms.uIdleStrength, { value: 1.0, duration: 0.8 });
      },
      onUpdate(self) {
        uniforms.uIdleStrength.value = 1.0 - self.progress * 0.5;
      },
    });

    // ScrollTrigger: Project wheel — particles morph into project shapes
    let wheelCurrentIdx = -1;
    ScrollTrigger.create({
      trigger: ".home-project-wheel-section",
      start: "top top",
      end: () => `+=${window.innerHeight * 4}`,
      scrub: true,
      onEnter() {
        gsap.to(uniforms.uOpacity, { value: 0.9, duration: 0.4 });
      },
      onUpdate(self) {
        const idx = Math.min(3, Math.floor(self.progress * 4));
        const sub = (self.progress * 4) % 1;
        const shapeId = `project-${idx}` as ShapeId;

        if (wheelCurrentIdx !== idx) {
          wheelCurrentIdx = idx;
          transitionTo(shapeId, projectColors[idx]);
        }
        uniforms.uMorphProgress.value = Math.min(sub * 2.5, 1.0);
        uniforms.uIdleStrength.value = 0.3;
      },
      onLeave() {
        wheelCurrentIdx = -1;
      },
      onLeaveBack() {
        wheelCurrentIdx = -1;
        transitionTo("nebula", VIOLET);
        gsap.to(uniforms.uIdleStrength, { value: 1.0, duration: 0.8 });
      },
    });

    // ScrollTrigger: Skills section — morph through tech logos
    let skillCurrentIdx = -1;
    ScrollTrigger.create({
      trigger: ".home-skills-section",
      start: "top 65%",
      end: "bottom 35%",
      scrub: 1,
      onEnter() {
        gsap.to(uniforms.uOpacity, { value: 0.9, duration: 0.4 });
      },
      onUpdate(self) {
        const idx = Math.min(14, Math.floor(self.progress * 15));
        const sub = (self.progress * 15) % 1;
        const shapeId = skillIdList[idx];

        if (skillCurrentIdx !== idx) {
          skillCurrentIdx = idx;
          transitionTo(shapeId, shapeColors[shapeId]);
        }
        uniforms.uMorphProgress.value = Math.min(sub * 3.0, 1.0);
        uniforms.uIdleStrength.value = 0.4;
      },
      onLeave() {
        skillCurrentIdx = -1;
        transitionTo("nebula", VIOLET);
        gsap.to(uniforms.uIdleStrength, { value: 1.0, duration: 1.0 });
        gsap.to(uniforms.uOpacity, { value: 0.15, duration: 0.6 });
      },
      onLeaveBack() {
        skillCurrentIdx = -1;
        transitionTo("nebula", VIOLET);
        gsap.to(uniforms.uIdleStrength, { value: 1.0, duration: 0.8 });
        gsap.to(uniforms.uOpacity, { value: 0.85, duration: 0.4 });
      },
    });

    // cleanup
    return () => {
      cancelAnimationFrame(raf);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      ScrollTrigger.getAll().forEach(t => {
        if (
          t.vars.trigger === ".home-hero-section" ||
          t.vars.trigger === ".home-project-wheel-section" ||
          t.vars.trigger === ".home-skills-section"
        ) t.kill();
      });
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onCtxLost);
      canvas.removeEventListener("webglcontextrestored", onCtxRestored);
      scene.clear();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (mount.contains(canvas)) mount.removeChild(canvas);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />;
}
