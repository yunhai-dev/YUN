'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'next-view-transitions';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    Bot,
    Compass,
    Feather,
    Maximize2,
    Minimize2,
    QrCode,
    Sparkles,
    Terminal,
    Volume2,
    VolumeX,
    Wrench,
    X,
} from 'lucide-react';

export interface FullpagePostItem {
    slug: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
}

interface HotspotCardData {
    id: string;
    title: string;
    subtitle: string;
    badge: string;
    description: string;
    href: string;
    external?: boolean;
    x: string;
    y: string;
}

type ShapeId = 'yunhai' | 'agent' | 'converter' | 'writing' | 'epilogue' | 'monogram';

interface StorySection {
    id: string;
    navLabel: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    shape: ShapeId;
    hotspots: HotspotCardData[];
}

const PARTICLE_COUNT = 9000;
const STAR_COUNT = 280;
const BOKEH_COUNT = 28;

interface CameraRigPreset {
    pos: [number, number, number];
    lookAt: [number, number, number];
    fov: number;
    roll: number;
}

const CAMERA_RIGS: Record<ShapeId, CameraRigPreset> = {
    yunhai: { pos: [0.35, 0.35, 7.2], lookAt: [-0.35, 0.0, 0], fov: 46, roll: 0 },
    agent: { pos: [-0.25, 0.35, 6.2], lookAt: [-0.25, 0.0, 0], fov: 47, roll: 0 },
    converter: { pos: [0.35, 0.15, 6.4], lookAt: [-0.25, 0.0, 0], fov: 46, roll: 0 },
    writing: { pos: [0.25, 0.85, 6.3], lookAt: [-0.3, -0.1, 0], fov: 45, roll: 0 },
    epilogue: { pos: [0, 0.85, 7.8], lookAt: [0, 0.0, 0], fov: 45, roll: 0 },
    monogram: { pos: [0, 0.1, 6.2], lookAt: [0, 0, 0], fov: 46, roll: 0 },
};

const YUN_BITMAP = [
    '10001010001010001',
    '01010010001011001',
    '00100010001010101',
    '00100010001010011',
    '00100001110010001',
];

const AGENT_TOOL_NODES = [
    new THREE.Vector3(2.15, 1.1, 0.45),
    new THREE.Vector3(-2.15, 1.0, -0.4),
    new THREE.Vector3(2.0, -1.1, -0.55),
    new THREE.Vector3(-2.05, -1.05, 0.55),
];

const GLB_URLS: Partial<Record<ShapeId, string>> = {
    agent: '/models/agent_core.glb',
    converter: '/models/tooling_gears.glb',
    writing: '/models/writing_book_pen.glb',
};

async function sampleGlbModel(url: string, count: number): Promise<Float32Array> {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(url);

    const meshes: THREE.Mesh[] = [];
    gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            if (m.geometry) {
                meshes.push(m);
            }
        }
    });

    const arr = new Float32Array(count * 3);
    if (meshes.length === 0) return arr;

    // Compute combined bounding box to normalize scale & center at origin
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 4.6 / maxDim;

    // Weight sampling by approximate bounding volume/surface of each sub-mesh
    const weights = meshes.map((m) => {
        const b = new THREE.Box3().setFromObject(m);
        const s = new THREE.Vector3();
        b.getSize(s);
        return Math.max(0.01, s.x * s.y + s.y * s.z + s.x * s.z);
    });
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    const tempPos = new THREE.Vector3();
    let offset = 0;

    meshes.forEach((mesh, idx) => {
        const partCount =
            idx === meshes.length - 1
                ? count - offset
                : Math.floor((weights[idx] / totalWeight) * count);
        if (partCount <= 0) return;

        // Bake world matrix into cloned geometry so sampler reads exact world coordinates
        const geo = mesh.geometry.clone();
        geo.applyMatrix4(mesh.matrixWorld);
        const tempMesh = new THREE.Mesh(geo);
        const sampler = new MeshSurfaceSampler(tempMesh).build();

        for (let i = 0; i < partCount && offset < count; i++) {
            sampler.sample(tempPos);
            arr[offset * 3] = (tempPos.x - center.x) * scale;
            arr[offset * 3 + 1] = (tempPos.y - center.y) * scale;
            arr[offset * 3 + 2] = (tempPos.z - center.z) * scale;
            offset++;
        }
        geo.dispose();
    });

    return arr;
}

function createGlowTexture(): THREE.CanvasTexture | null {
    if (typeof document === 'undefined') return null;
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.28, 'rgba(224, 236, 255, 0.9)');
    grad.addColorStop(0.62, 'rgba(94, 106, 210, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
}

function generateStaticData(shape: ShapeId, count: number): Float32Array {
    const arr = new Float32Array(count * 3);

    if (shape === 'yunhai' || shape === 'epilogue') {
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            if (i < count * 0.56) {
                // Deep undulating sea grid
                const subCount = Math.floor(count * 0.56);
                const cols = 80;
                const rows = Math.ceil(subCount / cols);
                const col = i % cols;
                const row = Math.floor(i / cols);
                arr[i3] = (col / (cols - 1) - 0.5) * 9.2;
                arr[i3 + 1] = -0.95;
                arr[i3 + 2] = (row / Math.max(1, rows - 1) - 0.5) * 6.2;
            } else if (i < count * 0.68) {
                // Rising mist spirals
                const k = i - Math.floor(count * 0.56);
                arr[i3] = Math.sin(k * 0.73) * 3.4;
                arr[i3 + 1] = (k % 100) / 100;
                arr[i3 + 2] = Math.cos(k * 1.13) * 2.4;
            } else {
                // Volumetric multi-cluster clouds (Gaussian-like puffs)
                const k = i - Math.floor(count * 0.68);
                const clusterIdx = k % 7;
                const cx = ((clusterIdx - 3) * 1.15) + Math.sin(clusterIdx * 2.1) * 0.35;
                const cy = 1.05 + Math.cos(clusterIdx * 1.7) * 0.28;
                const cz = Math.sin(clusterIdx * 3.1) * 1.4;
                const r = Math.pow(Math.random(), 0.6) * 0.95;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                arr[i3] = cx + r * Math.sin(phi) * Math.cos(theta) * 1.45;
                arr[i3 + 1] = cy + r * Math.cos(phi) * 0.52;
                arr[i3 + 2] = cz + r * Math.sin(phi) * Math.sin(theta) * 1.1;
            }
        }
        return arr;
    }

    if (shape === 'agent') {
        // Multi-layered J.A.R.V.I.S.-style Agent Harness Core + 3 Gyroscopic Rings + 4 Tool Satellites + Beams
        const coreOuter = new THREE.IcosahedronGeometry(1.05, 3).attributes.position;
        const coreInner = new THREE.IcosahedronGeometry(0.55, 2).attributes.position;
        const c1End = Math.floor(count * 0.34);
        const c2End = Math.floor(count * 0.54);
        const c3End = Math.floor(count * 0.76);
        const c4End = Math.floor(count * 0.88);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            if (i < c1End) {
                const useInner = i % 3 === 0;
                const attr = useInner ? coreInner : coreOuter;
                const idx = i % attr.count;
                arr[i3] = attr.getX(idx);
                arr[i3 + 1] = attr.getY(idx);
                arr[i3 + 2] = attr.getZ(idx);
            } else if (i < c2End) {
                // 4 Tool Satellite Nodes with mini-rings
                const toolIdx = (i - c1End) % 4;
                const tool = AGENT_TOOL_NODES[toolIdx];
                const isRing = i % 2 === 0;
                if (isRing) {
                    const a = (i * 0.27) % (Math.PI * 2);
                    const r = 0.52;
                    arr[i3] = tool.x + Math.cos(a) * r;
                    arr[i3 + 1] = tool.y + Math.sin(a) * r * 0.5;
                    arr[i3 + 2] = tool.z + Math.sin(a) * r * 0.85;
                } else {
                    const phi = Math.acos(1 - 2 * (((i * 37) % 100) / 100));
                    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
                    const r = 0.28;
                    arr[i3] = tool.x + r * Math.sin(phi) * Math.cos(theta);
                    arr[i3 + 1] = tool.y + r * Math.sin(phi) * Math.sin(theta);
                    arr[i3 + 2] = tool.z + r * Math.cos(phi);
                }
            } else if (i < c3End) {
                // Signal beams between Core and Tool Nodes
                const tool = AGENT_TOOL_NODES[(i - c2End) % 4];
                const t = ((i - c2End) % 250) / 250;
                arr[i3] = tool.x * t;
                arr[i3 + 1] = tool.y * t;
                arr[i3 + 2] = tool.z * t;
            } else if (i < c4End) {
                // 3 tilted gyroscopic rings around core
                const ringIdx = (i - c3End) % 3;
                const a = ((i - c3End) / (c4End - c3End)) * Math.PI * 2 * 3;
                const rad = 1.52 + ringIdx * 0.22;
                const x0 = Math.cos(a) * rad;
                const z0 = Math.sin(a) * rad;
                const tilt = ringIdx === 0 ? 0.45 : ringIdx === 1 ? -0.55 : 0.15;
                arr[i3] = x0;
                arr[i3 + 1] = z0 * Math.sin(tilt);
                arr[i3 + 2] = z0 * Math.cos(tilt);
            } else {
                // Outer context ring
                const a = ((i - c4End) / (count - c4End)) * Math.PI * 2;
                arr[i3] = Math.cos(a) * 3.05;
                arr[i3 + 1] = Math.sin(a * 3) * 0.24;
                arr[i3 + 2] = Math.sin(a) * 3.05;
            }
        }
        return arr;
    }

    if (shape === 'converter') {
        const c1End = Math.floor(count * 0.28);
        const c2End = Math.floor(count * 0.68);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            if (i < c1End) {
                const t = i / c1End;
                arr[i3] = -3.4 + t * 2.4;
                arr[i3 + 1] = Math.sin(i * 1.7) * (1.2 - t * 0.65);
                arr[i3 + 2] = Math.cos(i * 2.3) * (1.2 - t * 0.65);
            } else if (i < c2End) {
                const ring = i % 3;
                const a = ((i - c1End) / (c2End - c1End)) * Math.PI * 2 * 3;
                const r = ring === 0 ? 1.15 : ring === 1 ? 0.82 : 0.52;
                arr[i3] = Math.cos(a) * r * (ring === 0 ? 0.45 : ring === 1 ? 1 : 0.75);
                arr[i3 + 1] = Math.sin(a) * r;
                arr[i3 + 2] = Math.cos(a) * r * (ring === 0 ? 1 : ring === 1 ? 0.45 : 0.75);
            } else {
                const idx = i - c2End;
                const col = idx % 12;
                const row = Math.floor(idx / 12) % 12;
                const depth = Math.floor(idx / 144);
                arr[i3] = 1.4 + (depth / 15) * 2.1;
                arr[i3 + 1] = (row / 11 - 0.5) * 1.55;
                arr[i3 + 2] = (col / 11 - 0.5) * 1.55;
            }
        }
        return arr;
    }

    if (shape === 'writing') {
        const pageEnd = Math.floor(count * 0.8);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            if (i < pageEnd) {
                const side = i % 2 === 0 ? 1 : -1;
                const lineIdx = Math.floor((i / 2) % 18);
                const layer = (i % 3) * 0.045;
                const u = (((i * 13) % 100) / 100) * 0.9 + 0.05;
                const v = (lineIdx / 17 - 0.5) * 2;
                const x = side * (0.08 + u * 2.35);
                const arch = Math.sin(u * Math.PI * 0.88) * (0.64 - layer * 0.4);
                arr[i3] = x;
                arr[i3 + 1] = arch - 0.55 - layer;
                arr[i3 + 2] = v * 1.75;
            } else {
                const k = i - pageEnd;
                arr[i3] = ((k % 45) / 44 - 0.5) * 4.4;
                arr[i3 + 1] = 0.6 + ((k * 7) % 24) * 0.07;
                arr[i3 + 2] = (Math.floor(k / 45) / 28 - 0.5) * 2.8;
            }
        }
        return arr;
    }

    // monogram
    const activeCells: { x: number; y: number }[] = [];
    const rows = YUN_BITMAP.length;
    const cols = YUN_BITMAP[0].length;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (YUN_BITMAP[r][c] === '1') {
                activeCells.push({
                    x: (c - (cols - 1) / 2) * 0.25,
                    y: ((rows - 1) / 2 - r) * 0.32,
                });
            }
        }
    }
    for (let i = 0; i < count; i++) {
        const cell = activeCells[i % activeCells.length];
        arr[i * 3] = cell.x + (Math.random() - 0.5) * 0.14;
        arr[i * 3 + 1] = cell.y + (Math.random() - 0.5) * 0.14;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.28;
    }
    return arr;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
}

function easeOutQuart(t: number): number {
    const u = 1 - t;
    return 1 - u * u * u * u;
}

// Smooth color palette constants
const C_INDIGO = new THREE.Color('#5e6ad2');
const C_CYAN = new THREE.Color('#38bdf8');
const C_EMERALD = new THREE.Color('#34d399');
const C_AMBER = new THREE.Color('#fbbf24');
const C_WHITE = new THREE.Color('#f1f5f9');
const C_SLATE = new THREE.Color('#64748b');

export function FullpageParticleHome({
    recentPosts,
    totalPosts,
}: {
    recentPosts: FullpagePostItem[];
    totalPosts: number;
}) {
    const canvasHostRef = useRef<HTMLDivElement | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [entered, setEntered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [textVisible, setTextVisible] = useState(false);
    const [agentStepLabel, setAgentStepLabel] = useState('感知输入');
    const [isQrHovered, setIsQrHovered] = useState(false);
    const [activePop, setActivePop] = useState<HotspotCardData | null>(null);
    const [popTilt, setPopTilt] = useState({ rx: 0, ry: 0, sx: 50, sy: 50 });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [webglOk, setWebglOk] = useState(true);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const audioGainRef = useRef<GainNode | null>(null);

    const sections: StorySection[] = useMemo(() => {
        const latestPost = recentPosts[0];
        const secondPost = recentPosts[1];

        return [
            {
                id: 'intro',
                navLabel: '关于我',
                eyebrow: 'HELLO · 我是 YUNHAI',
                title: '云云亦海',
                subtitle:
                    '一名在技术与人文之间探索的全栈开发者与独立构建者。似云，亦如海——希望做出像工具一样顺手、也像文字一样留有余韵的数字作品。',
                shape: 'yunhai',
                hotspots: [
                    {
                        id: 'about-me',
                        title: '认识云海',
                        subtitle: 'ABOUT ME · /ABOUT',
                        badge: '个人档案',
                        description:
                            '了解 YunHai 的技术栈、创作理念，以及“云云亦海”这个名字背后的故事。',
                        href: '/about/',
                        x: '60%',
                        y: '68%',
                    },
                    {
                        id: 'clouisle-intro',
                        title: 'Clouisle AI Workspace',
                        subtitle: 'CURRENTLY BUILDING',
                        badge: '正在构建',
                        description:
                            '我目前投入精力最多的 AI 工作空间项目，探索更自然的人机协作方式。',
                        href: 'https://clouisle.asia/',
                        external: true,
                        x: '76%',
                        y: '34%',
                    },
                ],
            },
            {
                id: 'agent',
                navLabel: 'AI 与智能体',
                eyebrow: '01 · 智能体实践',
                title: '让 AI 真正理解人的需要',
                subtitle:
                    '在构建 Clouisle 与 AI 对话实验场的过程中，我专注于 Agent Harness 的完整闭环——从感知上下文、规划推理，到工具调用与结果观测。',
                shape: 'agent',
                hotspots: [
                    {
                        id: 'clouisle',
                        title: 'Clouisle AI Workspace',
                        subtitle: 'AI WORKSPACE',
                        badge: '代表作品',
                        description:
                            '围绕真实工作流打造的多模型与智能体协作空间，强调克制的界面交互与高可用工程落地。',
                        href: 'https://clouisle.asia/',
                        external: true,
                        x: '58%',
                        y: '34%',
                    },
                    {
                        id: 'chat',
                        title: 'AI 对话实验场',
                        subtitle: 'PLAYGROUND · /CHAT',
                        badge: '在线体验',
                        description:
                            '站点内置的流式 AI 对话实验场，你可以直接在这里体验多轮上下文交互。',
                        href: '/chat/',
                        x: '76%',
                        y: '58%',
                    },
                ],
            },
            {
                id: 'tools',
                navLabel: '工具与开源',
                eyebrow: '02 · 造一点顺手的工具',
                title: '把高频痛点打磨成轻量工具',
                subtitle:
                    '日常开发和写作中总有一些重复的小麻烦。我把它们提炼成了开源项目、开放 API，以及 16+ 个打开即用的在线小工具。',
                shape: 'converter',
                hotspots: [
                    {
                        id: 'tools-hub',
                        title: '开发者工具库',
                        subtitle: '16+ UTILITIES · /TOOLS',
                        badge: '开箱即用',
                        description:
                            'JSON 格式化、Mermaid 图表、Regex 测试、文本对比、代码卡片与 P2P 跨端直传。',
                        href: '/tools/',
                        x: '58%',
                        y: '36%',
                    },
                    {
                        id: 'docs',
                        title: '工程文档与 API',
                        subtitle: '/DOCS & /API',
                        badge: '体系沉淀',
                        description:
                            '整理好的系统配置指南、OpenAPI 规范文档以及多媒体实验沙盒。',
                        href: '/docs/',
                        x: '75%',
                        y: '66%',
                    },
                ],
            },
            {
                id: 'writing',
                navLabel: '博客与写作',
                eyebrow: '03 · 持续记录与分享',
                title: '在代码之外，保持思考与写作',
                subtitle:
                    '技术会迭代，但解决问题的思路与观察世界的角度值得长期留存。这里记录着我近期的开发笔记与随笔。',
                shape: 'writing',
                hotspots: [
                    {
                        id: 'latest-article',
                        title: latestPost ? latestPost.title : '近期技术文章',
                        subtitle: latestPost ? `${latestPost.date} · ${latestPost.category}` : 'LATEST',
                        badge: '最新文章',
                        description:
                            latestPost?.excerpt || '阅读近期关于全栈工程与 AI 应用的最新分享。',
                        href: latestPost ? `/blog/${latestPost.slug}/` : '/blog/',
                        x: '74%',
                        y: '34%',
                    },
                    {
                        id: 'second-article',
                        title: secondPost ? secondPost.title : '全部文章归档',
                        subtitle: secondPost ? `${secondPost.date} · ${secondPost.category}` : '/BLOG',
                        badge: '精选阅读',
                        description:
                            secondPost?.excerpt || '浏览站点全部技术文章与生活随笔记录。',
                        href: secondPost ? `/blog/${secondPost.slug}/` : '/blog/',
                        x: '60%',
                        y: '68%',
                    },
                ],
            },
            {
                id: 'epilogue',
                navLabel: '保持联系',
                eyebrow: '04 · THE JOURNEY CONTINUES',
                title: '很高兴在云海与你相遇',
                subtitle:
                    '欢迎翻阅我的博客、试用这些小工具，或者给我写一封信聊聊你的想法。',
                shape: 'epilogue',
                hotspots: [],
            },
        ];
    }, [recentPosts]);

    const shapeData = useMemo(() => {
        return {
            yunhai: generateStaticData('yunhai', PARTICLE_COUNT),
            agent: generateStaticData('agent', PARTICLE_COUNT),
            converter: generateStaticData('converter', PARTICLE_COUNT),
            writing: generateStaticData('writing', PARTICLE_COUNT),
            epilogue: generateStaticData('epilogue', PARTICLE_COUNT),
            monogram: generateStaticData('monogram', PARTICLE_COUNT),
        };
    }, []);

    // Load realistic Blender .glb models & sample surface particles in background
    const glbLoadedRef = useRef<Partial<Record<ShapeId, boolean>>>({});

    useEffect(() => {
        let cancelled = false;
        const loadModels = async () => {
            const entries: [ShapeId, string][] = [
                ['agent', GLB_URLS.agent!],
                ['converter', GLB_URLS.converter!],
                ['writing', GLB_URLS.writing!],
            ];
            await Promise.all(
                entries.map(async ([key, url]) => {
                    try {
                        const sampled = await sampleGlbModel(url, PARTICLE_COUNT);
                        if (cancelled) return;
                        shapeData[key].set(sampled);
                        glbLoadedRef.current[key] = true;

                        // If user is currently viewing this shape, smoothly morph to the newly loaded Blender sculpture
                        if (currentShapeRef.current === key) {
                            const host = canvasHostRef.current as
                                | (HTMLDivElement & { __positions?: Float32Array; __colors?: Float32Array })
                                | null;
                            const m = morphRef.current;
                            if (host?.__positions) m.startPos.set(host.__positions);
                            if (host?.__colors) m.startCol.set(host.__colors);
                            m.duration = 1200;
                            m.startTime = performance.now();
                            m.active = true;
                        }
                    } catch {
                        // Fallback to procedural geometry if GLB fails
                    }
                })
            );
        };
        loadModels();
        return () => {
            cancelled = true;
        };
    }, [shapeData]);

    // UP2017-style blur-in focus reveal for section text & hotspots
    useEffect(() => {
        if (!entered) return;
        setTextVisible(false);
        const timer = window.setTimeout(() => {
            setTextVisible(true);
        }, 280);
        return () => window.clearTimeout(timer);
    }, [activeIndex, entered]);

    const currentShape: ShapeId = isQrHovered
        ? 'monogram'
        : sections[activeIndex]?.shape ?? 'yunhai';

    const currentShapeRef = useRef<ShapeId>(currentShape);
    const enteredRef = useRef<boolean>(entered);
    const agentStepRef = useRef<string>('感知输入');

    // Morph state stores snapshot of positions & colors for seamless zero-snap blending
    const morphRef = useRef<{
        startPos: Float32Array;
        startCol: Float32Array;
        delays: Float32Array;
        startTime: number;
        duration: number;
        active: boolean;
    }>({
        startPos: new Float32Array(PARTICLE_COUNT * 3),
        startCol: new Float32Array(PARTICLE_COUNT * 3),
        delays: new Float32Array(PARTICLE_COUNT),
        startTime: 0,
        duration: 1250,
        active: false,
    });

    // Lock body scroll on fullpage home
    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, []);

    // Fast smooth loading intro
    useEffect(() => {
        let val = 0;
        const timer = window.setInterval(() => {
            val += Math.floor(Math.random() * 22) + 16;
            if (val >= 100) {
                setLoadingProgress(100);
                window.clearInterval(timer);
                window.setTimeout(() => setEntered(true), 220);
            } else {
                setLoadingProgress(val);
            }
        }, 60);
        return () => window.clearInterval(timer);
    }, []);

    // Snapshot current positions & colors whenever shape changes for zero-snap transition
    useEffect(() => {
        currentShapeRef.current = currentShape;
        const host = canvasHostRef.current as
            | (HTMLDivElement & {
                  __positions?: Float32Array;
                  __colors?: Float32Array;
              })
            | null;
        const m = morphRef.current;

        if (host?.__positions) {
            m.startPos.set(host.__positions);
        }
        if (host?.__colors) {
            m.startCol.set(host.__colors);
        }
        m.duration = currentShape === 'monogram' ? 950 : 1550;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            m.delays[i] = Math.random() * (currentShape === 'monogram' ? 0.18 : 0.42);
        }
        m.startTime = performance.now();
        m.active = true;
    }, [currentShape]);

    useEffect(() => {
        enteredRef.current = entered;
        if (!entered) return;
        const m = morphRef.current;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            m.startPos[i * 3] = (Math.random() - 0.5) * 16;
            m.startPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
            m.startPos[i * 3 + 2] = (Math.random() - 0.5) * 16 + 4;
            m.startCol[i * 3] = C_INDIGO.r;
            m.startCol[i * 3 + 1] = C_INDIGO.g;
            m.startCol[i * 3 + 2] = C_INDIGO.b;
            m.delays[i] = Math.random() * 0.3;
        }
        m.duration = 1500;
        m.startTime = performance.now();
        m.active = true;
    }, [entered]);

    // Continuous WebGL Particle Engine
    useEffect(() => {
        const host = canvasHostRef.current;
        if (!host) return;

        let renderer: THREE.WebGLRenderer | null = null;
        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            });
        } catch {
            setWebglOk(false);
            return;
        }

        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        host.innerHTML = '';
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x05070e, 0.042);

        const camera = new THREE.PerspectiveCamera(48, w / h, 0.1, 100);
        camera.position.set(0, 0.18, 6.9);

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 14;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
            colors[i * 3] = C_INDIGO.r;
            colors[i * 3 + 1] = C_INDIGO.g;
            colors[i * 3 + 2] = C_INDIGO.b;
        }

        (
            host as HTMLDivElement & {
                __positions?: Float32Array;
                __colors?: Float32Array;
            }
        ).__positions = positions;
        (
            host as HTMLDivElement & {
                __positions?: Float32Array;
                __colors?: Float32Array;
            }
        ).__colors = colors;

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const glowTex = createGlowTexture();
        const material = new THREE.PointsMaterial({
            size: 0.058,
            map: glowTex ?? undefined,
            vertexColors: true,
            transparent: true,
            opacity: 0.92,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const particleCloud = new THREE.Points(geometry, material);
        scene.add(particleCloud);

        // Cosmic background stars
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(STAR_COUNT * 3);
        for (let i = 0; i < STAR_COUNT; i++) {
            starPos[i * 3] = (Math.random() - 0.5) * 28;
            starPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            starPos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({
            size: 0.042,
            map: glowTex ?? undefined,
            color: 0x94a3b8,
            transparent: true,
            opacity: 0.36,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        // Foreground shallow-DOF Bokeh dust particles
        const bokehGeo = new THREE.BufferGeometry();
        const bokehPos = new Float32Array(BOKEH_COUNT * 3);
        for (let i = 0; i < BOKEH_COUNT; i++) {
            bokehPos[i * 3] = (Math.random() - 0.5) * 11;
            bokehPos[i * 3 + 1] = (Math.random() - 0.5) * 7;
            bokehPos[i * 3 + 2] = 2.6 + Math.random() * 3.2;
        }
        bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPos, 3));
        const bokehMat = new THREE.PointsMaterial({
            size: 0.36,
            map: glowTex ?? undefined,
            color: 0x818cf8,
            transparent: true,
            opacity: 0.14,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const bokehDust = new THREE.Points(bokehGeo, bokehMat);
        scene.add(bokehDust);

        // Cinematic Camera Rig State
        const camCurrentPos = new THREE.Vector3(0.9, 0.45, 11.5);
        const camCurrentLook = new THREE.Vector3(-0.65, 0.05, 0);
        const camTargetLook = new THREE.Vector3();
        let camCurrentRoll = 0;
        let mouseNormX = 0;
        let mouseNormY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseNormX = e.clientX / window.innerWidth - 0.5;
            mouseNormY = e.clientY / window.innerHeight - 0.5;
        };

        const onResize = () => {
            if (!renderer) return;
            const nw = window.innerWidth;
            const nh = window.innerHeight;
            camera.aspect = nw / nh;
            camera.updateProjectionMatrix();
            renderer.setSize(nw, nh);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        let raf = 0;
        const animate = (now: number) => {
            raf = window.requestAnimationFrame(animate);

            const tSec = now * 0.001;
            const shape = currentShapeRef.current;
            const base = shapeData[shape];
            const m = morphRef.current;
            const posAttr = geometry.attributes.position as THREE.BufferAttribute;
            const colAttr = geometry.attributes.color as THREE.BufferAttribute;
            const arr = posAttr.array as Float32Array;
            const colArr = colAttr.array as Float32Array;

            // Smooth continuous Agent Harness cycle weights (zero hard jumps)
            const agentCycle = (tSec % 7.2) / 7.2; // 7.2s per full loop
            // Smooth bell curves for each of the 4 Agent Harness stages
            const wPerceive = smoothstep(0.0, 0.1, agentCycle) * (1 - smoothstep(0.22, 0.34, agentCycle));
            const wPlan = smoothstep(0.22, 0.34, agentCycle) * (1 - smoothstep(0.46, 0.56, agentCycle));
            const wAct = smoothstep(0.46, 0.56, agentCycle) * (1 - smoothstep(0.74, 0.84, agentCycle));
            const wObserve = smoothstep(0.74, 0.84, agentCycle) * (1 - smoothstep(0.94, 1.0, agentCycle));

            if (shape === 'agent') {
                const label =
                    agentCycle < 0.28
                        ? '01 感知上下文'
                        : agentCycle < 0.52
                          ? '02 推理与规划'
                          : agentCycle < 0.8
                            ? '03 调用外部工具'
                            : '04 观测并输出';
                if (agentStepRef.current !== label) {
                    agentStepRef.current = label;
                    setAgentStepLabel(label);
                }
            }

            const morphElapsed = m.active ? (now - m.startTime) / m.duration : 1;
            let allMorphDone = true;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const bx = base[i3];
                const by = base[i3 + 1];
                const bz = base[i3 + 2];

                // 1. Compute live target position & color for this particle at tSec
                let lx = bx;
                let ly = by;
                let lz = bz;
                let lr = C_INDIGO.r;
                let lg = C_INDIGO.g;
                let lb = C_INDIGO.b;

                if (shape === 'yunhai' || shape === 'epilogue') {
                    if (glbLoadedRef.current[shape]) {
                        // Realistic Blender Humpback Whale swimming undulation
                        const swim = Math.sin(tSec * 1.4 - bx * 0.75) * (0.06 + Math.max(0, -bx) * 0.045);
                        ly = by + swim;
                        lx = bx;
                        lz = bz + Math.cos(tSec * 0.9 + by) * 0.03;
                        const highlight = smoothstep(-0.4, 0.8, by);
                        lr = C_INDIGO.r + (C_CYAN.r - C_INDIGO.r) * highlight;
                        lg = C_INDIGO.g + (C_CYAN.g - C_INDIGO.g) * highlight;
                        lb = C_INDIGO.b + (C_CYAN.b - C_INDIGO.b) * highlight;
                    } else {
                        const seaEnd = Math.floor(PARTICLE_COUNT * 0.56);
                        const mistEnd = Math.floor(PARTICLE_COUNT * 0.68);
                        if (i < seaEnd) {
                            const dist = Math.sqrt(bx * bx + bz * bz);
                            ly =
                                -0.95 +
                                Math.sin(dist * 1.15 - tSec * 1.4) * 0.36 +
                                Math.cos(bx * 0.8 + tSec * 0.6) * 0.16;
                            lr = C_INDIGO.r;
                            lg = C_INDIGO.g;
                            lb = C_INDIGO.b;
                        } else if (i < mistEnd) {
                            const rise = ((i - seaEnd) / (mistEnd - seaEnd) + tSec * 0.14) % 1;
                            lx = bx + Math.sin(rise * Math.PI * 2 + i) * 0.28;
                            ly = -0.85 + rise * 1.95;
                            const fade = Math.sin(rise * Math.PI);
                            lr = C_CYAN.r * fade + C_INDIGO.r * (1 - fade);
                            lg = C_CYAN.g * fade + C_INDIGO.g * (1 - fade);
                            lb = C_CYAN.b * fade + C_INDIGO.b * (1 - fade);
                        } else {
                            const drift = ((bx + 4.2 + tSec * 0.22) % 8.4) - 4.2;
                            lx = drift;
                            ly = by + Math.sin(drift * 0.8 + tSec * 0.85) * 0.14;
                            lr = C_WHITE.r * 0.82;
                            lg = C_WHITE.g * 0.82;
                            lb = C_WHITE.b * 0.82;
                        }
                    }
                } else if (shape === 'agent') {
                    if (glbLoadedRef.current.agent) {
                        // Realistic Blender Agent Core + 4 Tool Arms with Agent Harness 4-Stage Wave
                        const dist = Math.sqrt(bx * bx + by * by + bz * bz);
                        const isCore = dist < 0.95;
                        const isArmEnd = dist > 1.75;

                        const pulse =
                            isCore
                                ? 1 + wPlan * Math.sin(tSec * 9) * 0.04 + wObserve * 0.08
                                : isArmEnd
                                  ? 1 + wAct * 0.06
                                  : 1;
                        lx = bx * pulse;
                        ly = by * pulse;
                        lz = bz * pulse;

                        // Radial signal wave traveling outward during Act, inward during Observe
                        const waveOut = Math.max(0, 1 - Math.abs(dist - ((tSec * 2.2) % 2.8)) * 2.2) * wAct;
                        const waveIn = Math.max(0, 1 - Math.abs(dist - (2.8 - ((tSec * 2.2) % 2.8))) * 2.2) * wObserve;
                        const coreGlow = isCore ? wPlan * 0.8 : 0;
                        const armGlow = isArmEnd ? wAct * 0.85 : 0;

                        lr =
                            C_INDIGO.r +
                            (C_CYAN.r - C_INDIGO.r) * Math.min(1, coreGlow + waveOut) +
                            (C_AMBER.r - C_INDIGO.r) * armGlow +
                            (C_EMERALD.r - C_INDIGO.r) * waveIn;
                        lg =
                            C_INDIGO.g +
                            (C_CYAN.g - C_INDIGO.g) * Math.min(1, coreGlow + waveOut) +
                            (C_AMBER.g - C_INDIGO.g) * armGlow +
                            (C_EMERALD.g - C_INDIGO.g) * waveIn;
                        lb =
                            C_INDIGO.b +
                            (C_CYAN.b - C_INDIGO.b) * Math.min(1, coreGlow + waveOut) +
                            (C_AMBER.b - C_INDIGO.b) * armGlow +
                            (C_EMERALD.b - C_INDIGO.b) * waveIn;
                    } else {
                        const c1End = Math.floor(PARTICLE_COUNT * 0.34);
                        const c2End = Math.floor(PARTICLE_COUNT * 0.54);
                        const c3End = Math.floor(PARTICLE_COUNT * 0.76);
                        const c4End = Math.floor(PARTICLE_COUNT * 0.88);

                        if (i < c1End) {
                            const coreScale =
                                1 +
                                wPlan * Math.sin(tSec * 10) * 0.05 +
                                wObserve * 0.12 -
                                wPerceive * 0.05;
                            lx = bx * coreScale;
                            ly = by * coreScale;
                            lz = bz * coreScale;

                            const scan = wPlan * Math.max(0, 1 - Math.abs(by - Math.sin(tSec * 5) * 0.9) * 3.5);
                            lr = C_INDIGO.r + (C_CYAN.r - C_INDIGO.r) * (wPlan + scan * 0.5) + (C_EMERALD.r - C_INDIGO.r) * wObserve;
                            lg = C_INDIGO.g + (C_CYAN.g - C_INDIGO.g) * (wPlan + scan * 0.5) + (C_EMERALD.g - C_INDIGO.g) * wObserve;
                            lb = C_INDIGO.b + (C_CYAN.b - C_INDIGO.b) * (wPlan + scan * 0.5) + (C_EMERALD.b - C_INDIGO.b) * wObserve;
                        } else if (i < c2End) {
                            const toolIdx = (i - c1End) % 4;
                            const tool = AGENT_TOOL_NODES[toolIdx];
                            const s = 1 + (wAct + wObserve * 0.5) * Math.max(0, Math.sin(tSec * 8 - toolIdx)) * 0.28;
                            lx = tool.x + (bx - tool.x) * s;
                            ly = tool.y + (by - tool.y) * s;
                            lz = tool.z + (bz - tool.z) * s;

                            const heat = Math.min(1, wAct + wObserve * 0.4);
                            lr = C_SLATE.r + (C_AMBER.r - C_SLATE.r) * heat;
                            lg = C_SLATE.g + (C_AMBER.g - C_SLATE.g) * heat;
                            lb = C_SLATE.b + (C_AMBER.b - C_SLATE.b) * heat;
                        } else if (i < c3End) {
                            const toolIdx = (i - c2End) % 4;
                            const tool = AGENT_TOOL_NODES[toolIdx];
                            const offset = ((i - c2End) % 250) / 250;
                            const speed = wAct > wObserve ? tSec * 1.25 : -tSec * 1.25;
                            const p = (((offset + speed) % 1) + 1) % 1;
                            const arc = Math.sin(p * Math.PI) * 0.24 * (wAct + wObserve);

                            lx = tool.x * p;
                            ly = tool.y * p + arc;
                            lz = tool.z * p;

                            const beam = Math.min(1, wAct + wObserve + 0.15);
                            const bcR = C_CYAN.r * wAct + C_EMERALD.r * wObserve + C_INDIGO.r * (1 - Math.min(1, wAct + wObserve));
                            const bcG = C_CYAN.g * wAct + C_EMERALD.g * wObserve + C_INDIGO.g * (1 - Math.min(1, wAct + wObserve));
                            const bcB = C_CYAN.b * wAct + C_EMERALD.b * wObserve + C_INDIGO.b * (1 - Math.min(1, wAct + wObserve));
                            lr = bcR * beam;
                            lg = bcG * beam;
                            lb = bcB * beam;
                        } else if (i < c4End) {
                            const ringIdx = (i - c3End) % 3;
                            const spin = tSec * (ringIdx === 0 ? 0.55 : ringIdx === 1 ? -0.75 : 0.4);
                            const cos = Math.cos(spin);
                            const sin = Math.sin(spin);
                            lx = bx * cos - bz * sin;
                            ly = by;
                            lz = bx * sin + bz * cos;
                            lr = C_CYAN.r * 0.75;
                            lg = C_CYAN.g * 0.75;
                            lb = C_CYAN.b * 0.75;
                        } else {
                            const a = ((i - c4End) / (PARTICLE_COUNT - c4End)) * Math.PI * 2 + tSec * 0.3;
                            const rad = 3.05 * (1 - wPerceive * 0.25 + wObserve * 0.15);
                            lx = Math.cos(a) * rad;
                            ly = Math.sin(a * 3 + tSec * 0.8) * 0.24;
                            lz = Math.sin(a) * rad;

                            lr = C_INDIGO.r + (C_WHITE.r - C_INDIGO.r) * wPerceive + (C_EMERALD.r - C_INDIGO.r) * wObserve;
                            lg = C_INDIGO.g + (C_WHITE.g - C_INDIGO.g) * wPerceive + (C_EMERALD.g - C_INDIGO.g) * wObserve;
                            lb = C_INDIGO.b + (C_WHITE.b - C_INDIGO.b) * wPerceive + (C_EMERALD.b - C_INDIGO.b) * wObserve;
                        }
                    }
                } else if (shape === 'converter') {
                    if (glbLoadedRef.current.converter) {
                        // Realistic Blender Mechanical Watch Gears with subtle shimmer
                        const shimmer = 0.5 + 0.5 * Math.sin(bx * 1.5 + by * 1.5 - tSec * 2.2);
                        lr = C_INDIGO.r + (C_CYAN.r - C_INDIGO.r) * shimmer;
                        lg = C_INDIGO.g + (C_CYAN.g - C_INDIGO.g) * shimmer;
                        lb = C_INDIGO.b + (C_CYAN.b - C_INDIGO.b) * shimmer;
                    } else {
                        const c1End = Math.floor(PARTICLE_COUNT * 0.28);
                        const c2End = Math.floor(PARTICLE_COUNT * 0.68);
                        if (i < c1End) {
                            const flow = ((i / c1End) + tSec * 0.42) % 1;
                            const spread = 1.2 * (1 - flow * 0.72);
                            lx = -3.4 + flow * 2.4;
                            ly = Math.sin(i * 1.7 + tSec * 2.4) * spread;
                            lz = Math.cos(i * 2.3 + tSec * 2.0) * spread;
                            lr = C_AMBER.r;
                            lg = C_AMBER.g;
                            lb = C_AMBER.b;
                        } else if (i < c2End) {
                            const ring = i % 3;
                            const spin = tSec * (ring === 0 ? 1.05 : ring === 1 ? -1.45 : 0.8);
                            const cos = Math.cos(spin);
                            const sin = Math.sin(spin);
                            lx = bx;
                            ly = by * cos - bz * sin;
                            lz = by * sin + bz * cos;
                            lr = C_CYAN.r;
                            lg = C_CYAN.g;
                            lb = C_CYAN.b;
                        } else {
                            const pulse = Math.sin(bx * 2.0 - tSec * 3.0) * 0.05;
                            lx = bx;
                            ly = by + pulse;
                            lz = bz;
                            lr = C_EMERALD.r;
                            lg = C_EMERALD.g;
                            lb = C_EMERALD.b;
                        }
                    }
                } else if (shape === 'writing') {
                    if (glbLoadedRef.current.writing) {
                        // Realistic Blender Hardcover Book & Floating Fountain Pen
                        const isPen = bz > 0.15;
                        const scanY = ((tSec * 0.7) % 3.0) - 1.5;
                        const glow = isPen ? 0.85 : Math.max(0, 1 - Math.abs(by - scanY) * 2.5);
                        lr = C_INDIGO.r + (C_WHITE.r - C_INDIGO.r) * glow;
                        lg = C_INDIGO.g + (C_WHITE.g - C_INDIGO.g) * glow;
                        lb = C_INDIGO.b + (C_WHITE.b - C_INDIGO.b) * glow;
                    } else {
                        const pageEnd = Math.floor(PARTICLE_COUNT * 0.8);
                        const scanZ = ((tSec * 0.85) % 3.5) - 1.75;
                        if (i < pageEnd) {
                            lx = bx;
                            ly = by + Math.sin(tSec * 1.2 + bx * 0.7) * 0.028;
                            lz = bz;
                            const highlight = Math.max(0, 1 - Math.abs(bz - scanZ) * 3.2);
                            lr = C_INDIGO.r + (C_WHITE.r - C_INDIGO.r) * highlight;
                            lg = C_INDIGO.g + (C_WHITE.g - C_INDIGO.g) * highlight;
                            lb = C_INDIGO.b + (C_WHITE.b - C_INDIGO.b) * highlight;
                        } else {
                            const fall = ((i - pageEnd) / (PARTICLE_COUNT - pageEnd) + tSec * 0.2) % 1;
                            lx = bx + Math.sin(tSec * 1.3 + i) * 0.12;
                            ly = 2.05 - fall * 2.25;
                            lz = bz;
                            lr = C_CYAN.r;
                            lg = C_CYAN.g;
                            lb = C_CYAN.b;
                        }
                    }
                } else {
                    // monogram
                    ly = by + Math.sin(tSec * 2 + i * 0.1) * 0.02;
                    lr = C_CYAN.r;
                    lg = C_CYAN.g;
                    lb = C_CYAN.b;
                }

                // 2. Continuously blend from start snapshot -> live target (clean radial scatter, NO spinning)
                if (m.active) {
                    const delay = m.delays[i];
                    const rawT = Math.max(0, Math.min(1, (morphElapsed - delay) / (1 - delay)));
                    if (rawT < 1) allMorphDone = false;
                    const e = easeOutQuart(rawT);

                    // Gentle outward scatter in the middle of transition, then settle cleanly
                    const scatter = Math.sin(rawT * Math.PI) * 0.55;
                    const sx = m.startPos[i3];
                    const sy = m.startPos[i3 + 1];
                    const sz = m.startPos[i3 + 2];
                    const len = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
                    const dirX = sx / len;
                    const dirY = sy / len;
                    const dirZ = sz / len;

                    arr[i3] = sx + (lx - sx) * e + dirX * scatter;
                    arr[i3 + 1] = sy + (ly - sy) * e + dirY * scatter;
                    arr[i3 + 2] = sz + (lz - sz) * e + dirZ * scatter;

                    colArr[i3] = m.startCol[i3] + (lr - m.startCol[i3]) * e;
                    colArr[i3 + 1] = m.startCol[i3 + 1] + (lg - m.startCol[i3 + 1]) * e;
                    colArr[i3 + 2] = m.startCol[i3 + 2] + (lb - m.startCol[i3 + 2]) * e;
                } else {
                    arr[i3] = lx;
                    arr[i3 + 1] = ly;
                    arr[i3 + 2] = lz;
                    colArr[i3] = lr;
                    colArr[i3 + 1] = lg;
                    colArr[i3 + 2] = lb;
                }
            }

            if (m.active && allMorphDone) {
                m.active = false;
            }

            posAttr.needsUpdate = true;
            colAttr.needsUpdate = true;

            // Cinematic Camera Choreography (Dolly + Orbit + Handheld Drift + Dynamic FOV)
            const rig = CAMERA_RIGS[shape];
            const driftX = Math.sin(tSec * 0.38) * 0.14 + mouseNormX * 0.85;
            const driftY = Math.cos(tSec * 0.31) * 0.09 - mouseNormY * 0.55;
            const driftZ = Math.sin(tSec * 0.25) * 0.16;

            camCurrentPos.x += (rig.pos[0] + driftX - camCurrentPos.x) * 0.035;
            camCurrentPos.y += (rig.pos[1] + driftY - camCurrentPos.y) * 0.035;
            camCurrentPos.z += (rig.pos[2] + driftZ - camCurrentPos.z) * 0.035;

            camTargetLook.set(
                rig.lookAt[0] + mouseNormX * 0.15,
                rig.lookAt[1] - mouseNormY * 0.1,
                rig.lookAt[2]
            );
            camCurrentLook.lerp(camTargetLook, 0.045);

            camera.position.copy(camCurrentPos);
            camera.lookAt(camCurrentLook);

            camCurrentRoll += (rig.roll - mouseNormX * 0.035 - camCurrentRoll) * 0.04;
            camera.rotation.z += camCurrentRoll;

            const morphFovBoost = m.active ? Math.sin(Math.min(1, morphElapsed) * Math.PI) * 3.5 : 0;
            const targetFov = rig.fov + morphFovBoost;
            if (Math.abs(camera.fov - targetFov) > 0.02) {
                camera.fov += (targetFov - camera.fov) * 0.06;
                camera.updateProjectionMatrix();
            }

            // Subtle, steady parallax without dizzying spinning
            particleCloud.rotation.y += (mouseNormX * 0.16 - particleCloud.rotation.y) * 0.04;
            particleCloud.rotation.x += (-mouseNormY * 0.08 - particleCloud.rotation.x) * 0.04;

            stars.rotation.y = camCurrentPos.x * 0.04 + now * 0.000025;
            bokehDust.position.x = -mouseNormX * 0.9 + Math.sin(tSec * 0.2) * 0.25;
            bokehDust.position.y = mouseNormY * 0.5 + Math.cos(tSec * 0.18) * 0.15;

            renderer?.render(scene, camera);
        };

        raf = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            geometry.dispose();
            material.dispose();
            starGeo.dispose();
            starMat.dispose();
            bokehGeo.dispose();
            bokehMat.dispose();
            glowTex?.dispose();
            renderer?.dispose();
        };
    }, [shapeData]);

    // Fullpage Scroll / Keyboard / Touch Navigation
    const scrollLockRef = useRef<number>(0);
    const touchStartYRef = useRef<number | null>(null);

    const goToSection = useCallback(
        (nextIndex: number) => {
            const clamped = Math.max(0, Math.min(sections.length - 1, nextIndex));
            if (clamped === activeIndex) return;
            setActivePop(null);
            setActiveIndex(clamped);
        },
        [activeIndex, sections.length]
    );

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            if (!enteredRef.current || activePop) return;
            const now = Date.now();
            if (now - scrollLockRef.current < 800) return;
            if (Math.abs(e.deltaY) < 22) return;

            scrollLockRef.current = now;
            if (e.deltaY > 0) {
                goToSection(activeIndex + 1);
            } else {
                goToSection(activeIndex - 1);
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (!enteredRef.current) return;
            if (e.key === 'Escape' && activePop) {
                setActivePop(null);
                return;
            }
            if (activePop) return;
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                goToSection(activeIndex + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                goToSection(activeIndex - 1);
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            touchStartYRef.current = e.touches[0]?.clientY ?? null;
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (!enteredRef.current || activePop || touchStartYRef.current === null) return;
            const endY = e.changedTouches[0]?.clientY ?? touchStartYRef.current;
            const diff = touchStartYRef.current - endY;
            touchStartYRef.current = null;
            if (Math.abs(diff) < 42) return;
            if (diff > 0) {
                goToSection(activeIndex + 1);
            } else {
                goToSection(activeIndex - 1);
            }
        };

        window.addEventListener('wheel', onWheel, { passive: true });
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [activeIndex, activePop, goToSection]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(() => {});
        } else {
            document.exitFullscreen?.().catch(() => {});
        }
    };

    useEffect(() => {
        const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    const toggleAmbientAudio = () => {
        if (isAudioPlaying) {
            if (audioGainRef.current && audioCtxRef.current) {
                audioGainRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.35);
            }
            setIsAudioPlaying(false);
            return;
        }

        try {
            if (!audioCtxRef.current) {
                const AudioContextClass =
                    window.AudioContext ||
                    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                const ctx = new AudioContextClass();
                const masterGain = ctx.createGain();
                masterGain.gain.value = 0.0001;
                masterGain.connect(ctx.destination);

                const freqs = [130.81, 196.0, 293.66];
                freqs.forEach((f, idx) => {
                    const osc = ctx.createOscillator();
                    osc.type = idx === 0 ? 'sine' : 'triangle';
                    osc.frequency.value = f;

                    const filter = ctx.createBiquadFilter();
                    filter.type = 'lowpass';
                    filter.frequency.value = 420;

                    const g = ctx.createGain();
                    g.gain.value = idx === 0 ? 0.06 : 0.025;

                    osc.connect(filter);
                    filter.connect(g);
                    g.connect(masterGain);
                    osc.start();
                });

                audioCtxRef.current = ctx;
                audioGainRef.current = masterGain;
            }

            if (audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
            }
            audioGainRef.current?.gain.setTargetAtTime(0.65, audioCtxRef.current.currentTime, 0.6);
            setIsAudioPlaying(true);
        } catch {
            // Audio unsupported
        }
    };

    useEffect(() => {
        return () => {
            audioCtxRef.current?.close().catch(() => {});
        };
    }, []);

    const handlePopMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setPopTilt({
            rx: (0.5 - py) * 14,
            ry: (px - 0.5) * 16,
            sx: px * 100,
            sy: py * 100,
        });
    };

    const currentSection = sections[activeIndex];

    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#08090a] text-[#f7f8f8] select-none antialiased">
            {/* Linear-style subtle top ambient aura */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 75% 50% at 50% -8%, rgba(120, 119, 198, 0.16), transparent 68%), radial-gradient(ellipse 50% 40% at 75% 25%, rgba(94, 106, 210, 0.08), transparent 65%)',
                }}
            />

            {/* Fullscreen WebGL Canvas */}
            {webglOk && (
                <div
                    ref={canvasHostRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                />
            )}

            {/* Subtle edge vignette */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(circle at center, transparent 55%, rgba(8, 9, 10, 0.78) 100%)',
                }}
            />

            {/* Opening Loading Overlay */}
            <div
                className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090a] transition-all duration-700 ${
                    entered ? 'opacity-0 pointer-events-none scale-[1.02]' : 'opacity-100'
                }`}
            >
                <div className="flex items-end gap-1 h-6 mb-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <span
                            key={idx}
                            className="w-[2px] rounded-full bg-[#5e6ad2] animate-pulse"
                            style={{
                                height: `${35 + ((idx * 29) % 65)}%`,
                                animationDelay: `${idx * 90}ms`,
                                animationDuration: '900ms',
                            }}
                        />
                    ))}
                </div>
                <div className="text-[11px] font-mono tracking-[0.28em] text-[#8a8f98] uppercase mb-1.5">
                    YunHai · 云云亦海
                </div>
                <div className="text-sm font-mono tabular-nums text-[#f7f8f8]/80 tracking-widest mb-5">
                    {loadingProgress}%
                </div>
                <button
                    type="button"
                    onClick={() => setEntered(true)}
                    className="px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] font-mono text-[#8a8f98] hover:text-[#f7f8f8] hover:border-white/[0.18] transition-colors cursor-pointer"
                >
                    Skip
                </button>
            </div>

            {/* Linear-style Minimal Top Header */}
            <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-6 sm:px-10 py-5 pointer-events-none">
                <Link
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        goToSection(0);
                    }}
                    className="pointer-events-auto group inline-flex items-center gap-2.5"
                >
                    <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:border-white/25 transition-colors">
                        <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            className="h-3.5 w-3.5 text-[#f7f8f8]"
                            aria-hidden="true"
                        >
                            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
                            <path
                                d="M4.2 9.2C5.4 7.6 6.8 7.6 8 9.2C9.2 10.8 10.6 10.8 11.8 9.2"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                    <span className="text-[13px] font-medium tracking-[-0.01em] text-[#f7f8f8]">
                        云云亦海
                    </span>
                    <span className="hidden sm:inline text-[12px] text-[#8a8f98] font-normal">
                        / YunHai
                    </span>
                </Link>

                <nav className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 text-[12px] text-[#8a8f98] bg-[#0d0e11]/70 border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl rounded-full px-2 py-1">
                    <Link
                        href="/blog/"
                        className="px-2.5 py-1 rounded-full hover:text-[#f7f8f8] hover:bg-white/[0.05] transition-colors"
                    >
                        博客
                    </Link>
                    <Link
                        href="/tools/"
                        className="px-2.5 py-1 rounded-full hover:text-[#f7f8f8] hover:bg-white/[0.05] transition-colors"
                    >
                        工具
                    </Link>
                    <Link
                        href="/docs/"
                        className="px-2.5 py-1 rounded-full hover:text-[#f7f8f8] hover:bg-white/[0.05] transition-colors"
                    >
                        文档
                    </Link>
                    <Link
                        href="/chat/"
                        className="px-2.5 py-1 rounded-full hover:text-[#f7f8f8] hover:bg-white/[0.05] transition-colors"
                    >
                        AI 对话
                    </Link>
                    <Link
                        href="/about/"
                        className="hidden sm:inline-block px-2.5 py-1 rounded-full hover:text-[#f7f8f8] hover:bg-white/[0.05] transition-colors"
                    >
                        关于
                    </Link>
                </nav>
            </header>

            {/* Linear-style Minimal Right Progress Indicator */}
            <aside
                aria-label="章节导航"
                className="fixed right-5 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-3"
            >
                {sections.map((sec, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                        <button
                            key={sec.id}
                            type="button"
                            onClick={() => goToSection(idx)}
                            className="group flex items-center gap-3 cursor-pointer py-1"
                        >
                            <span
                                className={`hidden md:inline-block text-[11px] tracking-[0.02em] transition-all duration-300 ${
                                    isActive
                                        ? 'opacity-100 translate-x-0 text-[#f7f8f8] font-medium'
                                        : 'opacity-0 translate-x-1.5 group-hover:opacity-90 group-hover:translate-x-0 text-[#8a8f98]'
                                }`}
                            >
                                {sec.navLabel}
                            </span>
                            <span
                                className={`block rounded-full transition-all duration-300 ${
                                    isActive
                                        ? 'w-5 h-1.5 bg-[#f7f8f8] shadow-[0_0_12px_rgba(247,248,248,0.45)]'
                                        : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/60'
                                }`}
                            />
                        </button>
                    );
                })}
            </aside>

            {/* Main Fullscreen Personal Story Sections */}
            <main className="relative z-20 w-full h-full pointer-events-none">
                {activeIndex < 4 ? (
                    <div
                        key={currentSection.id}
                        className="relative w-full h-full flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-28 pb-20"
                    >
                        {/* Linear-style Refined Typography Block with GPU-accelerated Blur-in Focus */}
                        <div
                            className={`max-w-lg space-y-4 pointer-events-auto will-change-[filter,opacity,transform] transition-all duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                textVisible
                                    ? 'opacity-100 blur-0 scale-100 translate-y-0'
                                    : 'opacity-0 blur-[18px] scale-[1.02] translate-y-2'
                            }`}
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md px-3 py-1 text-[11px] font-mono tracking-[0.08em] text-[#8a8f98]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#5e6ad2]" />
                                <span>{currentSection.eyebrow}</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-medium tracking-[-0.035em] leading-[1.08] bg-gradient-to-b from-[#f7f8f8] via-[#f7f8f8] to-[#f7f8f8]/60 bg-clip-text text-transparent">
                                {currentSection.title}
                            </h1>

                            <p className="text-[14px] sm:text-[15px] text-[#8a8f98] max-w-[440px] leading-[1.7] font-normal">
                                {currentSection.subtitle}
                            </p>

                            {/* First screen primary actions */}
                            {currentSection.id === 'intro' && (
                                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => goToSection(1)}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#f7f8f8] text-[#08090a] px-4 py-2 text-[13px] font-medium hover:bg-white transition-all shadow-[0_1px_2px_rgba(0,0,0,0.2)] cursor-pointer"
                                    >
                                        <span>开始探索</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                    <Link
                                        href="/blog/"
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#0d0e11]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md text-[#f7f8f8] px-4 py-2 text-[13px] font-medium hover:bg-white/[0.06] hover:border-white/[0.16] transition-all"
                                    >
                                        <span>阅读博客</span>
                                    </Link>
                                </div>
                            )}

                            {/* Subtle live Agent Harness status pill on Section 2 */}
                            {currentSection.shape === 'agent' && (
                                <div className="pt-1 inline-flex items-center gap-2 rounded-md border border-[#5e6ad2]/25 bg-[#5e6ad2]/[0.08] px-2.5 py-1 text-[11px] font-mono text-[#a5b4fc]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                                    <span>Agent Harness · {agentStepLabel}</span>
                                </div>
                            )}

                            {/* Writing screen: Linear-style compact article list */}
                            {currentSection.id === 'writing' && recentPosts.length > 0 && (
                                <div className="pt-2 rounded-xl border border-white/[0.08] bg-[#0d0e11]/75 shadow-[0_16px_48px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl divide-y divide-white/[0.06] max-w-md overflow-hidden">
                                    {recentPosts.slice(0, 3).map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={`/blog/${post.slug}/`}
                                            className="group flex items-center justify-between gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors"
                                        >
                                            <div className="min-w-0">
                                                <div className="text-[13px] font-medium text-[#f7f8f8] group-hover:text-white transition-colors truncate">
                                                    {post.title}
                                                </div>
                                                <div className="text-[11px] font-mono text-[#8a8f98] mt-0.5">
                                                    {post.date} · {post.category.split(',')[0]?.trim()}
                                                </div>
                                            </div>
                                            <ArrowUpRight className="h-3.5 w-3.5 text-[#8a8f98] group-hover:text-[#f7f8f8] transition-colors shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Linear-style Subtle Hotspots around 3D Model (right-side safe zone, label expands on hover) */}
                        <div
                            className={`hidden md:block absolute inset-0 pointer-events-none will-change-[filter,opacity] transition-all duration-[1000ms] delay-200 ease-out ${
                                textVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-[14px]'
                            }`}
                        >
                            {currentSection.hotspots.map((spot) => (
                                <button
                                    key={spot.id}
                                    type="button"
                                    onClick={() => setActivePop(spot)}
                                    style={{ left: spot.x, top: spot.y }}
                                    className="pointer-events-auto group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 cursor-pointer"
                                >
                                    <span className="relative flex h-5 w-5 items-center justify-center transition-transform duration-300 group-hover:scale-125">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5e6ad2] opacity-45" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f7f8f8] shadow-[0_0_12px_rgba(94,106,210,0.9)]" />
                                    </span>
                                    <span className="rounded-lg border border-white/[0.1] bg-[#0d0e11]/85 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl px-2.5 py-1 text-[12px] text-[#f7f8f8] opacity-80 group-hover:opacity-100 group-hover:border-white/25 transition-all whitespace-nowrap">
                                        {spot.title}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Mobile Hotspot Pills */}
                        <div className="md:hidden flex flex-wrap gap-2 pointer-events-auto mt-auto mb-4">
                            {currentSection.hotspots.map((spot) => (
                                <button
                                    key={spot.id}
                                    type="button"
                                    onClick={() => setActivePop(spot)}
                                    className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-[#0d0e11]/80 backdrop-blur-md px-3 py-1.5 text-[12px] text-[#f7f8f8]"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#5e6ad2]" />
                                    <span>{spot.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Section 5: Linear-style Epilogue with GPU-accelerated Blur-in Focus */
                    <div
                        key="epilogue"
                        className={`relative w-full h-full flex flex-col items-center justify-center text-center px-6 pointer-events-auto will-change-[filter,opacity,transform] transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            textVisible
                                ? 'opacity-100 blur-0 scale-100 translate-y-0'
                                : 'opacity-0 blur-[18px] scale-[1.02] translate-y-2'
                        }`}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] px-3 py-1 text-[11px] font-mono tracking-[0.12em] text-[#8a8f98] uppercase mb-5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#5e6ad2]" />
                            <span>似云 · 亦如海</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-[3.75rem] font-medium tracking-[-0.035em] leading-[1.08] bg-gradient-to-b from-[#f7f8f8] via-[#f7f8f8] to-[#f7f8f8]/60 bg-clip-text text-transparent max-w-3xl mb-5">
                            很高兴在云海与你相遇
                        </h1>

                        <p className="text-[15px] text-[#8a8f98] max-w-lg mb-9 leading-[1.7]">
                            我是 YunHai。这里是我记录技术思考、沉淀开源工具与分享生活点滴的个人数字工坊。
                        </p>

                        <div className="grid grid-cols-3 border border-white/[0.08] bg-[#0d0e11]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl rounded-xl divide-x divide-white/[0.08] mb-9 overflow-hidden">
                            <div className="px-5 sm:px-8 py-4">
                                <div className="text-lg sm:text-xl font-mono font-medium text-[#f7f8f8] tabular-nums">
                                    {totalPosts}+
                                </div>
                                <div className="text-[11px] text-[#8a8f98] mt-0.5">个人文章</div>
                            </div>
                            <div className="px-5 sm:px-8 py-4">
                                <div className="text-lg sm:text-xl font-mono font-medium text-[#f7f8f8] tabular-nums">
                                    16+
                                </div>
                                <div className="text-[11px] text-[#8a8f98] mt-0.5">自制工具</div>
                            </div>
                            <div className="px-5 sm:px-8 py-4">
                                <div className="text-lg sm:text-xl font-mono font-medium text-[#f7f8f8] tabular-nums">
                                    YunHai
                                </div>
                                <div className="text-[11px] text-[#8a8f98] mt-0.5">独立构建</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href="/blog/"
                                className="inline-flex items-center gap-2 rounded-lg bg-[#f7f8f8] text-[#08090a] px-5 py-2.5 text-[13px] font-medium hover:bg-white transition-all shadow-[0_8px_24px_rgba(94,106,210,0.2)]"
                            >
                                <BookOpen className="h-3.5 w-3.5" />
                                <span>阅读我的博客</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                            <Link
                                href="/tools/"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0d0e11]/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md text-[#f7f8f8] px-5 py-2.5 text-[13px] font-medium hover:bg-white/[0.06] hover:border-white/[0.16] transition-all"
                            >
                                <Compass className="h-3.5 w-3.5" />
                                <span>试用工具库</span>
                            </Link>
                            <Link
                                href="/contact/"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] text-[#8a8f98] px-4 py-2.5 text-[13px] font-medium hover:text-[#f7f8f8] hover:border-white/[0.16] transition-all"
                            >
                                <span>联系我</span>
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Center Scroll Mouse Indicator */}
            {activeIndex < sections.length - 1 && (
                <button
                    type="button"
                    onClick={() => goToSection(activeIndex + 1)}
                    aria-label="向下滚动到下一屏"
                    className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-[#8a8f98] hover:text-[#f7f8f8] transition-colors cursor-pointer"
                >
                    <div className="w-[18px] h-[28px] rounded-full border border-white/[0.18] flex justify-center pt-1.5">
                        <span className="w-[2px] h-1.5 rounded-full bg-[#f7f8f8]/80 animate-bounce" />
                    </div>
                </button>
            )}

            {/* Bottom-right Controls */}
            <div className="fixed bottom-5 right-5 sm:right-8 z-30 flex items-center gap-2">
                <button
                    type="button"
                    onClick={toggleAmbientAudio}
                    title={isAudioPlaying ? '静音环境音' : '开启空间环境音'}
                    className={`h-8 w-8 rounded-lg border backdrop-blur-xl flex items-center justify-center transition-colors cursor-pointer ${
                        isAudioPlaying
                            ? 'border-[#5e6ad2]/60 bg-[#5e6ad2]/20 text-[#f7f8f8]'
                            : 'border-white/[0.08] bg-[#0d0e11]/70 text-[#8a8f98] hover:text-[#f7f8f8] hover:border-white/[0.16]'
                    }`}
                >
                    {isAudioPlaying ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                </button>

                <button
                    type="button"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? '退出全屏' : '全屏模式'}
                    className="h-8 w-8 rounded-lg border border-white/[0.08] bg-[#0d0e11]/70 backdrop-blur-xl text-[#8a8f98] hover:text-[#f7f8f8] hover:border-white/[0.16] flex items-center justify-center transition-colors cursor-pointer"
                >
                    {isFullscreen ? (
                        <Minimize2 className="h-3.5 w-3.5" />
                    ) : (
                        <Maximize2 className="h-3.5 w-3.5" />
                    )}
                </button>

                <Link
                    href="/contact/"
                    onMouseEnter={() => setIsQrHovered(true)}
                    onMouseLeave={() => setIsQrHovered(false)}
                    title="悬停触发 YUN 粒子矩阵 · 点击联系我"
                    className="h-8 px-3 rounded-lg border border-white/[0.08] bg-[#0d0e11]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl text-[#8a8f98] hover:text-[#f7f8f8] hover:border-white/[0.16] flex items-center gap-1.5 text-[12px] transition-colors"
                >
                    <QrCode className="h-3.5 w-3.5 text-[#5e6ad2]" />
                    <span className="hidden sm:inline">联系我</span>
                </Link>
            </div>

            {/* Linear-style 3D Parallax Popup Card */}
            {activePop && (
                <div
                    onClick={() => setActivePop(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    style={{ perspective: '1200px' }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        onMouseMove={handlePopMouseMove}
                        onMouseLeave={() => setPopTilt({ rx: 0, ry: 0, sx: 50, sy: 50 })}
                        style={{
                            transform: `rotateX(${popTilt.rx}deg) rotateY(${popTilt.ry}deg)`,
                            transition: 'transform 0.15s ease-out',
                        }}
                        className="relative w-full max-w-md rounded-2xl border border-white/[0.12] bg-[#0d0e11]/95 p-6 sm:p-7 shadow-[0_32px_96px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-35"
                            style={{
                                background: `radial-gradient(circle at ${popTilt.sx}% ${popTilt.sy}%, rgba(94, 106, 210, 0.3), transparent 60%)`,
                            }}
                        />

                        <button
                            type="button"
                            onClick={() => setActivePop(null)}
                            aria-label="关闭弹窗"
                            className="absolute top-4 right-4 h-7 w-7 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#8a8f98] hover:text-[#f7f8f8] flex items-center justify-center cursor-pointer"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>

                        <div className="relative space-y-4">
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-mono text-[#8a8f98]">
                                <Terminal className="h-3 w-3 text-[#5e6ad2]" />
                                <span>{activePop.badge}</span>
                            </div>

                            <div>
                                <div className="text-[11px] font-mono tracking-[0.12em] text-[#8a8f98] uppercase mb-1">
                                    {activePop.subtitle}
                                </div>
                                <h2 className="text-xl font-medium tracking-[-0.02em] text-[#f7f8f8]">
                                    {activePop.title}
                                </h2>
                            </div>

                            <p className="text-[14px] text-[#8a8f98] leading-[1.65]">
                                {activePop.description}
                            </p>

                            <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
                                <span className="text-[11px] font-mono text-[#8a8f98]/60">
                                    YunHai · 云云亦海
                                </span>
                                {activePop.external ? (
                                    <a
                                        href={activePop.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#f7f8f8] text-[#08090a] px-3.5 py-1.5 text-[12px] font-medium hover:bg-white transition-colors"
                                    >
                                        <span>立即前往</span>
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                ) : (
                                    <Link
                                        href={activePop.href}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#f7f8f8] text-[#08090a] px-3.5 py-1.5 text-[12px] font-medium hover:bg-white transition-colors"
                                    >
                                        <span>立即前往</span>
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
