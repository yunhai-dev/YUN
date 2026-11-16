'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'next-view-transitions';
import * as THREE from 'three';
import { ArrowUpRight, Pause, Play, Sparkles } from 'lucide-react';

export type MorphShapeId = 'wave' | 'neural' | 'matrix' | 'torus' | 'book';

export interface PillarStageItem {
    id: MorphShapeId;
    index: string;
    label: string;
    title: string;
    description: string;
    modelName: string;
    hotspots: {
        label: string;
        href: string;
        external?: boolean;
        x: string;
        y: string;
    }[];
}

export const PILLAR_STAGE_ITEMS: PillarStageItem[] = [
    {
        id: 'neural',
        index: '01',
        label: '01 / INTELLIGENCE',
        title: 'AI 与智能体',
        description: '探索让智能真正理解人的需要，构建实用且克制的 AI 工作空间。',
        modelName: 'Neural Core · 神经网络多面体',
        hotspots: [
            { label: 'Clouisle AI Workspace', href: 'https://clouisle.asia/', external: true, x: '22%', y: '26%' },
            { label: 'AI 对话实验场', href: '/chat/', x: '68%', y: '72%' },
        ],
    },
    {
        id: 'matrix',
        index: '02',
        label: '02 / ENGINEERING',
        title: '全栈工程实践',
        description: '从架构设计到细节打磨，让想法在可靠的代码中扎实发生。',
        modelName: 'Modular Grid · 精密工程矩阵',
        hotspots: [
            { label: '开放 API 文档', href: '/api/', x: '26%', y: '68%' },
            { label: '结构化工程指南', href: '/docs/', x: '66%', y: '24%' },
        ],
    },
    {
        id: 'torus',
        index: '03',
        label: '03 / OPEN SOURCE',
        title: '开源与工具链',
        description: '将日常开发中的高频痛点提炼为轻量、可复用的开源工具。',
        modelName: 'Mobius Loop · 工具链拓扑环',
        hotspots: [
            { label: '工具导航库 /tools', href: '/tools/', x: '24%', y: '30%' },
            { label: 'Mermaid & JSON 工具', href: '/tools/json-formatter/', x: '64%', y: '70%' },
        ],
    },
    {
        id: 'book',
        index: '04',
        label: '04 / WRITING',
        title: '持续记录与分享',
        description: '在技术与人文之间保持思考，把经验沉淀为长期可检索的文档。',
        modelName: 'Open Pages · 人文书页曲面',
        hotspots: [
            { label: '技术与随笔 /blog', href: '/blog/', x: '24%', y: '28%' },
            { label: '关于云云亦海', href: '/about/', x: '66%', y: '72%' },
        ],
    },
];

const WAVE_ITEM: PillarStageItem = {
    id: 'wave',
    index: '00',
    label: '00 / YUNHAI',
    title: '云海意象',
    description: '似云，亦如海。在技术秩序与人文温度之间流动呼吸。',
    modelName: 'Cloud Sea · 动态云海波浪场',
    hotspots: [
        { label: '探索作品与思考', href: '#projects', x: '22%', y: '68%' },
        { label: '近期文章记录', href: '/blog/', x: '68%', y: '28%' },
    ],
};

const PARTICLE_COUNT = 3400;

function createGlowTexture(): THREE.CanvasTexture | null {
    if (typeof document === 'undefined') return null;
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.28, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.65, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

function generateShapePositions(shape: MorphShapeId, count: number): Float32Array {
    const positions = new Float32Array(count * 3);

    if (shape === 'wave') {
        const cols = Math.ceil(Math.sqrt(count * 1.45));
        const rows = Math.ceil(count / cols);
        for (let i = 0; i < count; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const u = (col / (cols - 1) - 0.5) * 6.2;
            const v = (row / (rows - 1) - 0.5) * 4.4;
            const dist = Math.sqrt(u * u + v * v);
            const y = Math.sin(dist * 1.35) * 0.45 + Math.cos(u * 0.9) * 0.18;
            positions[i * 3] = u;
            positions[i * 3 + 1] = y - 0.15;
            positions[i * 3 + 2] = v;
        }
        return positions;
    }

    if (shape === 'neural') {
        // Dual-layer icosahedron core + orbiting synaptic nodes
        const outerGeo = new THREE.IcosahedronGeometry(2.05, 3);
        const outerAttr = outerGeo.attributes.position;
        const innerGeo = new THREE.IcosahedronGeometry(1.02, 2);
        const innerAttr = innerGeo.attributes.position;

        for (let i = 0; i < count; i++) {
            if (i < count * 0.68) {
                const idx = Math.floor(Math.random() * outerAttr.count);
                const jitter = 0.04;
                positions[i * 3] = outerAttr.getX(idx) + (Math.random() - 0.5) * jitter;
                positions[i * 3 + 1] = outerAttr.getY(idx) + (Math.random() - 0.5) * jitter;
                positions[i * 3 + 2] = outerAttr.getZ(idx) + (Math.random() - 0.5) * jitter;
            } else {
                const idx = Math.floor(Math.random() * innerAttr.count);
                const jitter = 0.03;
                positions[i * 3] = innerAttr.getX(idx) + (Math.random() - 0.5) * jitter;
                positions[i * 3 + 1] = innerAttr.getY(idx) + (Math.random() - 0.5) * jitter;
                positions[i * 3 + 2] = innerAttr.getZ(idx) + (Math.random() - 0.5) * jitter;
            }
        }
        outerGeo.dispose();
        innerGeo.dispose();
        return positions;
    }

    if (shape === 'matrix') {
        // Architectural modular cube grid (3x3x3 sub-cubes wireframe/surface)
        const gridSize = 3;
        const spacing = 1.15;
        const subSize = 0.72;
        for (let i = 0; i < count; i++) {
            const gx = (Math.floor(Math.random() * gridSize) - 1) * spacing;
            const gy = (Math.floor(Math.random() * gridSize) - 1) * spacing;
            const gz = (Math.floor(Math.random() * gridSize) - 1) * spacing;

            // Sample along edges of each sub-cube for crisp engineering feel
            const edgeAxis = Math.floor(Math.random() * 3);
            const s1 = (Math.random() > 0.5 ? 1 : -1) * (subSize / 2);
            const s2 = (Math.random() > 0.5 ? 1 : -1) * (subSize / 2);
            const along = (Math.random() - 0.5) * subSize;

            let lx = 0;
            let ly = 0;
            let lz = 0;
            if (edgeAxis === 0) {
                lx = along;
                ly = s1;
                lz = s2;
            } else if (edgeAxis === 1) {
                lx = s1;
                ly = along;
                lz = s2;
            } else {
                lx = s1;
                ly = s2;
                lz = along;
            }

            positions[i * 3] = gx + lx;
            positions[i * 3 + 1] = gy + ly;
            positions[i * 3 + 2] = gz + lz;
        }
        return positions;
    }

    if (shape === 'torus') {
        // Interlocking Mobius / TorusKnot topology
        const knotGeo = new THREE.TorusKnotGeometry(1.32, 0.36, 160, 18, 2, 3);
        const attr = knotGeo.attributes.position;
        for (let i = 0; i < count; i++) {
            const idx = Math.floor((i / count) * attr.count) % attr.count;
            positions[i * 3] = attr.getX(idx) + (Math.random() - 0.5) * 0.03;
            positions[i * 3 + 1] = attr.getY(idx) + (Math.random() - 0.5) * 0.03;
            positions[i * 3 + 2] = attr.getZ(idx) + (Math.random() - 0.5) * 0.03;
        }
        knotGeo.dispose();
        return positions;
    }

    // 'book': Open book pages curved surface
    for (let i = 0; i < count; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        // u goes from spine (0) to outer page edge (1)
        const u = Math.random();
        // v goes from bottom (-1) to top (1)
        const v = (Math.random() - 0.5) * 2;
        // Layer multiple stacked pages slightly
        const layer = Math.floor(Math.random() * 5) * 0.055;

        const x = side * (0.08 + u * 2.25);
        // Gentle open-book arch curve
        const arch = Math.sin(u * Math.PI * 0.88) * (0.62 - layer * 0.4);
        const y = arch - 0.35 - layer;
        const z = v * 1.65;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
}

function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function ParticleMorphStage() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [activeId, setActiveId] = useState<MorphShapeId>('wave');
    const [autoCycle, setAutoCycle] = useState<boolean>(true);
    const [webglSupported, setWebglSupported] = useState<boolean>(true);
    const [isLightTheme, setIsLightTheme] = useState<boolean>(false);

    const activeItem = useMemo(() => {
        if (activeId === 'wave') return WAVE_ITEM;
        return PILLAR_STAGE_ITEMS.find((p) => p.id === activeId) ?? WAVE_ITEM;
    }, [activeId]);

    const shapeTargets = useMemo(() => {
        return {
            wave: generateShapePositions('wave', PARTICLE_COUNT),
            neural: generateShapePositions('neural', PARTICLE_COUNT),
            matrix: generateShapePositions('matrix', PARTICLE_COUNT),
            torus: generateShapePositions('torus', PARTICLE_COUNT),
            book: generateShapePositions('book', PARTICLE_COUNT),
        };
    }, []);

    const activeIdRef = useRef<MorphShapeId>(activeId);
    const isLightRef = useRef<boolean>(isLightTheme);
    const morphStateRef = useRef<{
        startPositions: Float32Array;
        targetPositions: Float32Array;
        startTime: number;
        duration: number;
        delays: Float32Array;
        morphing: boolean;
    }>({
        startPositions: new Float32Array(shapeTargets.wave),
        targetPositions: new Float32Array(shapeTargets.wave),
        startTime: 0,
        duration: 1450,
        delays: new Float32Array(PARTICLE_COUNT),
        morphing: false,
    });

    // Detect light/dark theme class on <html>
    useEffect(() => {
        const checkTheme = () => {
            setIsLightTheme(document.documentElement.classList.contains('light'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        isLightRef.current = isLightTheme;
    }, [isLightTheme]);

    // Trigger particle morph when activeId changes
    useEffect(() => {
        activeIdRef.current = activeId;
        const state = morphStateRef.current;
        const container = containerRef.current;
        const currentGeo = (container as (HTMLDivElement & { __currentPositions?: Float32Array }) | null)
            ?.__currentPositions;

        if (currentGeo) {
            state.startPositions.set(currentGeo);
        }
        state.targetPositions.set(shapeTargets[activeId]);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            state.delays[i] = Math.random() * 0.35;
        }
        state.startTime = performance.now();
        state.morphing = true;
    }, [activeId, shapeTargets]);

    // Auto-cycle between shapes when enabled
    useEffect(() => {
        if (!autoCycle) return;
        const order: MorphShapeId[] = ['wave', 'neural', 'matrix', 'torus', 'book'];
        const timer = window.setInterval(() => {
            setActiveId((prev) => {
                const idx = order.indexOf(prev);
                return order[(idx + 1) % order.length];
            });
        }, 5200);
        return () => window.clearInterval(timer);
    }, [autoCycle]);

    // Three.js WebGL setup
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const prefersReducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let renderer: THREE.WebGLRenderer | null = null;
        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            });
        } catch {
            setWebglSupported(false);
            return;
        }

        const width = container.clientWidth || 640;
        const height = container.clientHeight || 420;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0.4, 6.2);
        camera.lookAt(0, 0, 0);

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(shapeTargets[activeIdRef.current]);
        const colors = new Float32Array(PARTICLE_COUNT * 3);

        // Expose buffer for seamless morph snapshots
        (container as HTMLDivElement & { __currentPositions?: Float32Array }).__currentPositions =
            positions;

        const updateParticleColors = (light: boolean) => {
            const c1 = new THREE.Color(light ? '#4f46e5' : '#5e6ad2');
            const c2 = new THREE.Color(light ? '#1e293b' : '#e2e8f0');
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const mix = (i % 97) / 97;
                const c = c1.clone().lerp(c2, mix * 0.72);
                colors[i * 3] = c.r;
                colors[i * 3 + 1] = c.g;
                colors[i * 3 + 2] = c.b;
            }
            if (geometry.attributes.color) {
                geometry.attributes.color.needsUpdate = true;
            }
        };

        updateParticleColors(isLightRef.current);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const glowTexture = createGlowTexture();
        const material = new THREE.PointsMaterial({
            size: isLightRef.current ? 0.065 : 0.075,
            map: glowTexture ?? undefined,
            vertexColors: true,
            transparent: true,
            opacity: isLightRef.current ? 0.85 : 0.92,
            depthWrite: false,
            blending: isLightRef.current ? THREE.NormalBlending : THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Mouse parallax state
        let targetRotX = 0.12;
        let targetRotY = 0;

        const handlePointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / rect.width - 0.5;
            const ny = (e.clientY - rect.top) / rect.height - 0.5;
            targetRotY = nx * 0.55;
            targetRotX = 0.12 + ny * 0.35;
        };

        const handlePointerLeave = () => {
            targetRotX = 0.12;
            targetRotY = 0;
        };

        container.addEventListener('pointermove', handlePointerMove);
        container.addEventListener('pointerleave', handlePointerLeave);

        const handleResize = () => {
            if (!container || !renderer) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (w === 0 || h === 0) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        let lastTheme = isLightRef.current;
        let rafId = 0;

        const animate = (now: number) => {
            rafId = window.requestAnimationFrame(animate);

            // Sync theme palette dynamically
            if (lastTheme !== isLightRef.current) {
                lastTheme = isLightRef.current;
                updateParticleColors(lastTheme);
                material.blending = lastTheme ? THREE.NormalBlending : THREE.AdditiveBlending;
                material.size = lastTheme ? 0.065 : 0.075;
                material.opacity = lastTheme ? 0.85 : 0.92;
                material.needsUpdate = true;
            }

            const state = morphStateRef.current;
            const posAttr = geometry.attributes.position as THREE.BufferAttribute;
            const arr = posAttr.array as Float32Array;

            if (state.morphing && !prefersReducedMotion) {
                const elapsed = (now - state.startTime) / state.duration;
                let allDone = true;

                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    const delay = state.delays[i];
                    const localT = Math.max(0, Math.min(1, (elapsed - delay) / (1 - delay)));
                    if (localT < 1) allDone = false;

                    const eased = easeOutExpo(localT);
                    const i3 = i * 3;
                    const sx = state.startPositions[i3];
                    const sy = state.startPositions[i3 + 1];
                    const sz = state.startPositions[i3 + 2];

                    const tx = state.targetPositions[i3];
                    const ty = state.targetPositions[i3 + 1];
                    const tz = state.targetPositions[i3 + 2];

                    // Subtle swirl burst during transition (inspired by UP2017 storm)
                    const swirl = Math.sin(localT * Math.PI) * 0.25;
                    const angle = (i % 12) * 0.52 + localT * 2.2;

                    arr[i3] = sx + (tx - sx) * eased + Math.cos(angle) * swirl;
                    arr[i3 + 1] = sy + (ty - sy) * eased + Math.sin(angle * 0.7) * swirl * 0.6;
                    arr[i3 + 2] = sz + (tz - sz) * eased + Math.sin(angle) * swirl;
                }

                posAttr.needsUpdate = true;
                if (allDone) {
                    state.morphing = false;
                }
            } else if (state.morphing && prefersReducedMotion) {
                arr.set(state.targetPositions);
                posAttr.needsUpdate = true;
                state.morphing = false;
            } else if (activeIdRef.current === 'wave' && !prefersReducedMotion) {
                // Live breathing wave motion for Cloud Sea
                const time = now * 0.0012;
                const base = shapeTargets.wave;
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    const i3 = i * 3;
                    const x = base[i3];
                    const z = base[i3 + 2];
                    const dist = Math.sqrt(x * x + z * z);
                    arr[i3 + 1] =
                        Math.sin(dist * 1.35 - time * 1.4) * 0.42 +
                        Math.cos(x * 0.85 + time * 0.7) * 0.16 -
                        0.15;
                }
                posAttr.needsUpdate = true;
            }

            if (!prefersReducedMotion) {
                const idleRot = activeIdRef.current === 'wave' ? 0 : now * 0.00018;
                points.rotation.y += (targetRotY + idleRot - points.rotation.y) * 0.05;
                points.rotation.x += (targetRotX - points.rotation.x) * 0.05;
            }

            renderer?.render(scene, camera);
        };

        rafId = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            container.removeEventListener('pointermove', handlePointerMove);
            container.removeEventListener('pointerleave', handlePointerLeave);
            geometry.dispose();
            material.dispose();
            glowTexture?.dispose();
            renderer?.dispose();
        };
    }, [shapeTargets]);

    const handleSelectPillar = (id: MorphShapeId) => {
        setAutoCycle(false);
        setActiveId(id);
    };

    return (
        <div className="space-y-6">
            {/* Interactive 3D Particle Viewport */}
            <div className="linear-card relative rounded-2xl overflow-hidden border border-[var(--lh-border)] bg-[var(--lh-surface)]">
                {/* Top HUD bar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[var(--lh-border)] bg-[var(--lh-surface)]/80 backdrop-blur-md">
                    <div className="flex items-center gap-2.5 text-xs font-mono">
                        <span className="inline-block h-2 w-2 rounded-full bg-[var(--lh-accent)] linear-live-dot" />
                        <span className="text-[var(--lh-subtle)]">{activeItem.label}</span>
                        <span className="text-[var(--lh-border-strong)]">/</span>
                        <span className="text-[var(--lh-ink)] font-medium">{activeItem.modelName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleSelectPillar('wave')}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                                activeId === 'wave'
                                    ? 'bg-[var(--lh-accent-soft)] text-[var(--lh-accent)] border border-[var(--lh-accent)]/40'
                                    : 'text-[var(--lh-muted)] hover:text-[var(--lh-ink)] border border-transparent'
                            }`}
                        >
                            00 · 云海
                        </button>
                        <button
                            type="button"
                            onClick={() => setAutoCycle((v) => !v)}
                            title={autoCycle ? '暂停自动轮播' : '开启自动轮播'}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border border-[var(--lh-border)] text-[var(--lh-muted)] hover:text-[var(--lh-ink)] hover:border-[var(--lh-border-strong)] transition-colors cursor-pointer"
                        >
                            {autoCycle ? (
                                <>
                                    <Pause className="h-3 w-3" />
                                    <span className="hidden sm:inline">AUTO</span>
                                </>
                            ) : (
                                <>
                                    <Play className="h-3 w-3" />
                                    <span className="hidden sm:inline">PAUSED</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* 3D Canvas Area */}
                <div className="relative h-[300px] sm:h-[360px] md:h-[400px] w-full select-none">
                    {/* Ambient subtle radial glow behind particles */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                'radial-gradient(circle at 50% 50%, var(--lh-glow) 0%, transparent 65%)',
                        }}
                    />

                    {webglSupported ? (
                        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 space-y-2">
                            <Sparkles className="h-6 w-6 text-[var(--lh-accent)]" />
                            <p className="text-sm text-[var(--lh-ink)] font-medium">
                                {activeItem.modelName}
                            </p>
                            <p className="text-xs text-[var(--lh-muted)] max-w-md">
                                {activeItem.description}
                            </p>
                        </div>
                    )}

                    {/* Floating Interactive Hotspots (UP2017-inspired) */}
                    <div className="pointer-events-none absolute inset-0 hidden sm:block">
                        {activeItem.hotspots.map((spot) => {
                            const content = (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--lh-border-strong)] bg-[var(--lh-surface)]/85 backdrop-blur-md px-3 py-1.5 text-xs text-[var(--lh-ink)] shadow-lg hover:border-[var(--lh-accent)] hover:text-[var(--lh-accent)] transition-all">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lh-accent)] opacity-60" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lh-accent)]" />
                                    </span>
                                    <span>{spot.label}</span>
                                    <ArrowUpRight className="h-3 w-3 opacity-70" />
                                </span>
                            );

                            return (
                                <div
                                    key={spot.label}
                                    style={{ left: spot.x, top: spot.y }}
                                    className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                                >
                                    {spot.external ? (
                                        <a href={spot.href} target="_blank" rel="noopener noreferrer">
                                            {content}
                                        </a>
                                    ) : (
                                        <Link href={spot.href}>{content}</Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom hint */}
                    <div className="pointer-events-none absolute bottom-3 inset-x-4 flex items-center justify-between text-[11px] font-mono text-[var(--lh-subtle)]">
                        <span>MOVE POINTER TO ORBIT · {PARTICLE_COUNT.toLocaleString()} PARTICLES</span>
                        <span className="hidden sm:inline">CLICK PILLARS BELOW TO MORPH</span>
                    </div>
                </div>
            </div>

            {/* 4 Pillars Interactive Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[var(--lh-border)] rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[var(--lh-border)] bg-[var(--lh-surface)]">
                {PILLAR_STAGE_ITEMS.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <button
                            key={item.label}
                            type="button"
                            onMouseEnter={() => handleSelectPillar(item.id)}
                            onClick={() => handleSelectPillar(item.id)}
                            className={`text-left p-6 space-y-2.5 transition-colors cursor-pointer relative ${
                                isActive
                                    ? 'bg-[var(--lh-surface-hover)]'
                                    : 'hover:bg-[var(--lh-surface-hover)]/60'
                            }`}
                        >
                            {isActive && (
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 top-0 h-[2px] bg-[var(--lh-accent)]"
                                />
                            )}
                            <div className="flex items-center justify-between">
                                <span
                                    className={`text-[11px] font-mono transition-colors ${
                                        isActive ? 'text-[var(--lh-accent)]' : 'text-[var(--lh-subtle)]'
                                    }`}
                                >
                                    {item.label}
                                </span>
                                <span
                                    className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                                        isActive
                                            ? 'bg-[var(--lh-accent)] opacity-100'
                                            : 'bg-[var(--lh-subtle)] opacity-30'
                                    }`}
                                />
                            </div>
                            <h3 className="text-base font-medium text-[var(--lh-ink)]">
                                {item.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[var(--lh-muted)] leading-relaxed">
                                {item.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
