// Particle shape point clouds for the ParticleField component.
// Each shape is a Float32Array of flat [x0,y0,z0, x1,y1,z1, ...] coords
// normalized to roughly [-1, 1] in X/Y, Z=0.

export type ShapeId =
  | 'python' | 'javascript' | 'typescript' | 'react' | 'nextjs'
  | 'django' | 'fastapi' | 'postgresql' | 'redis' | 'sqlite'
  | 'tailwind' | 'git' | 'docker' | 'flutter' | 'rust'
  | 'nebula'
  | 'project-0' | 'project-1' | 'project-2' | 'project-3';

// Accent colors (RGB 0-1) matching home-skills-container-section.tsx
export const shapeColors: Record<ShapeId, [number, number, number]> = {
  python:     [0.376, 0.643, 0.980],
  javascript: [0.980, 0.800, 0.082],
  typescript: [0.220, 0.753, 0.984],
  react:      [0.380, 0.859, 0.980],
  nextjs:     [0.850, 0.850, 0.850],
  django:     [0.290, 0.855, 0.502],
  fastapi:    [0.063, 0.706, 0.506],
  postgresql: [0.255, 0.412, 0.882],
  redis:      [0.863, 0.149, 0.149],
  sqlite:     [0.576, 0.773, 0.992],
  tailwind:   [0.220, 0.753, 0.984],
  git:        [0.984, 0.443, 0.522],
  docker:     [0.133, 0.827, 0.933],
  flutter:    [0.376, 0.643, 0.980],
  rust:       [0.961, 0.620, 0.043],
  nebula:     [0.486, 0.361, 0.929],
  'project-0':[0.220, 0.753, 0.984],
  'project-1':[0.133, 0.706, 0.318],
  'project-2':[0.176, 0.831, 0.753],
  'project-3':[0.961, 0.620, 0.043],
};

// --- helpers ---

function pts(arr: number[]): Float32Array {
  return new Float32Array(arr);
}

// Uniformly sample N points along a parametric curve f(t) -> [x, y]
function sample(n: number, f: (t: number) => [number, number]): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const [x, y] = f(t);
    out.push(x, y, 0);
  }
  return out;
}

function circle(cx: number, cy: number, r: number, n: number, startAngle = 0, arc = Math.PI * 2): number[] {
  return sample(n, t => [cx + Math.cos(startAngle + t * arc) * r, cy + Math.sin(startAngle + t * arc) * r]);
}

function ellipse(cx: number, cy: number, rx: number, ry: number, angle: number, n: number, arc = Math.PI * 2): number[] {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return sample(n, t => {
    const lx = Math.cos(t * arc) * rx, ly = Math.sin(t * arc) * ry;
    return [cx + lx * cos - ly * sin, cy + lx * sin + ly * cos];
  });
}

function line(x1: number, y1: number, x2: number, y2: number, n: number): number[] {
  return sample(n, t => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]);
}

function jitter(arr: number[], amount: number, seed: number): number[] {
  // simple seeded noise for organic feel
  const out = [...arr];
  let s = seed;
  for (let i = 0; i < out.length; i += 3) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const rx = ((s >>> 16) / 32768 - 1) * amount;
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const ry = ((s >>> 16) / 32768 - 1) * amount;
    out[i] += rx; out[i + 1] += ry;
  }
  return out;
}

function arc(cx: number, cy: number, r: number, a0: number, a1: number, n: number): number[] {
  const span = a1 - a0;
  return sample(n, t => [cx + Math.cos(a0 + t * span) * r, cy + Math.sin(a0 + t * span) * r]);
}

function rect(x: number, y: number, w: number, h: number, nPerSide: number): number[] {
  return [
    ...line(x, y, x + w, y, nPerSide),
    ...line(x + w, y, x + w, y + h, nPerSide),
    ...line(x + w, y + h, x, y + h, nPerSide),
    ...line(x, y + h, x, y, nPerSide),
  ];
}

// seeded PRNG (mulberry32)
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5; let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 0x100000000;
  };
}

function cloud(n: number, seed: number, spread: [number, number] = [1.2, 0.9]): number[] {
  const rand = mulberry32(seed);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    // box-muller for gaussian cloud
    const u1 = rand(), u2 = rand();
    const mag = Math.sqrt(-2 * Math.log(Math.max(u1, 1e-9)));
    const x = mag * Math.cos(2 * Math.PI * u2) * spread[0];
    const y = mag * Math.sin(2 * Math.PI * u2) * spread[1];
    out.push(x, y, 0);
  }
  return out;
}

// --- Shape definitions ---

// Python: two interlocked snake/serpent arcs (simplified as two mirrored S-curves)
const python = pts(jitter([
  ...ellipse(0, 0.3, 0.55, 0.38, 0, 160),
  ...ellipse(0, -0.3, 0.55, 0.38, 0, 160),
  ...circle(0.2, 0.55, 0.18, 80),
  ...circle(-0.2, -0.55, 0.18, 80),
  ...line(-0.55, 0.3, -0.55, -0.05, 40),
  ...line(0.55, -0.3, 0.55, 0.05, 40),
], 0.025, 1001));

// JavaScript: square outline with bold "J" and "S" inside
const javascript = pts(jitter([
  ...rect(-0.9, -0.9, 1.8, 1.8, 60),
  // "J"
  ...line(0.1, 0.7, 0.1, -0.4, 50),
  ...arc(0.1 - 0.2, -0.4, 0.2, 0, Math.PI, 40),
  // "S" curve
  ...arc(-0.45, 0.2, 0.28, Math.PI * 1.1, Math.PI * 2.1, 80),
  ...arc(-0.45, -0.2, 0.28, 0, Math.PI * 1.1, 80),
  ...line(-0.17, 0.2, -0.73, 0.2, 30),
  ...line(-0.17, -0.2, -0.73, -0.2, 30),
  ...line(-0.1, 0.7, 0.7, 0.7, 40),
], 0.028, 2003));

// TypeScript: square with "T" and "S"
const typescript = pts(jitter([
  ...rect(-0.9, -0.9, 1.8, 1.8, 60),
  // "T"
  ...line(-0.82, 0.6, -0.18, 0.6, 50),
  ...line(-0.5, 0.6, -0.5, -0.7, 70),
  // "S"
  ...arc(0.35, 0.22, 0.3, Math.PI * 1.0, Math.PI * 2.1, 80),
  ...arc(0.35, -0.22, 0.3, 0, Math.PI * 1.1, 80),
  ...line(0.05, 0.22, 0.65, 0.22, 30),
  ...line(0.05, -0.22, 0.65, -0.22, 30),
], 0.028, 3007));

// React: atomic model — 3 elliptical orbits + center dot
const react = pts(jitter([
  ...ellipse(0, 0, 0.9, 0.32, 0, 200),
  ...ellipse(0, 0, 0.9, 0.32, Math.PI / 3, 200),
  ...ellipse(0, 0, 0.9, 0.32, -Math.PI / 3, 200),
  ...circle(0, 0, 0.1, 50),
], 0.02, 4011));

// Next.js: bold "N" letterform
const nextjs = pts(jitter([
  ...line(-0.6, 0.85, -0.6, -0.85, 100),
  ...line(-0.6, 0.85, 0.6, -0.85, 140),
  ...line(0.6, 0.85, 0.6, -0.85, 100),
  ...line(-0.6, -0.85, 0.6, -0.85, 80),
  ...line(-0.6, 0.85, 0.6, 0.85, 80),
], 0.025, 5013));


// Django: "D" letterform
const django = pts(jitter([
  ...line(-0.4, 0.85, -0.4, -0.85, 120),
  ...arc(0, 0, 0.72, -Math.PI / 2, Math.PI / 2, 180),
  ...line(-0.4, 0.85, 0.0, 0.85, 50),
  ...line(-0.4, -0.85, 0.0, -0.85, 50),
], 0.025, 6017));

// FastAPI: lightning bolt
const fastapi = pts(jitter([
  ...line(0.25, 0.95, -0.35, 0.05, 120),
  ...line(-0.35, 0.05, 0.15, 0.05, 50),
  ...line(0.15, 0.05, -0.45, -0.95, 120),
  ...line(-0.45, -0.95, 0.35, -0.95, 40),
  ...line(0.35, -0.95, 0.35, 0.95, 60),
  ...line(0.25, 0.95, -0.35, 0.95, 40),
], 0.028, 7019));

// PostgreSQL: elephant silhouette (simplified: cylinder + arc trunk)
const postgresql = pts(jitter([
  ...ellipse(0, 0.5, 0.65, 0.2, 0, 120),
  ...ellipse(0, -0.5, 0.65, 0.2, 0, 120),
  ...line(-0.65, 0.5, -0.65, -0.5, 80),
  ...line(0.65, 0.5, 0.65, -0.5, 80),
  ...arc(0.55, -0.1, 0.35, -Math.PI / 2, Math.PI * 0.6, 80),
  ...circle(0, 0.5, 0.2, 60),
], 0.025, 8023));

// Redis: cube outline (isometric)
const redis = pts(jitter([
  // top face
  ...line(0, 0.85, 0.7, 0.42, 70),
  ...line(0, 0.85, -0.7, 0.42, 70),
  ...line(0.7, 0.42, 0, 0, 70),
  ...line(-0.7, 0.42, 0, 0, 70),
  // left face
  ...line(-0.7, 0.42, -0.7, -0.42, 80),
  ...line(-0.7, -0.42, 0, -0.85, 70),
  // right face
  ...line(0.7, 0.42, 0.7, -0.42, 80),
  ...line(0.7, -0.42, 0, -0.85, 70),
  ...line(0, -0.85, 0, 0, 80),
], 0.022, 9029));

// SQLite: curved "S" with a feather/leaf
const sqlite = pts(jitter([
  ...arc(0, 0.3, 0.55, Math.PI * 0.9, Math.PI * 2.1, 160),
  ...arc(0, -0.3, 0.55, -Math.PI * 0.1, Math.PI * 1.1, 160),
  ...line(-0.55, 0.3, -0.55, -0.3, 80),
  ...line(0.55, 0.3, 0.55, -0.3, 80),
], 0.025, 10031));


// Tailwind: wave / swoosh
const tailwind = pts(jitter([
  ...sample(200, t => [
    -0.9 + t * 1.8,
    Math.sin(t * Math.PI * 3) * 0.45
  ]),
  ...sample(200, t => [
    -0.9 + t * 1.8,
    Math.sin(t * Math.PI * 3 + Math.PI) * 0.25 - 0.55
  ]),
  ...sample(200, t => [
    -0.9 + t * 1.8,
    Math.sin(t * Math.PI * 3) * 0.45 + 0.55
  ]),
], 0.022, 11037));

// Git: branch/fork pattern
const git = pts(jitter([
  ...line(0, 0.85, 0, -0.15, 100),
  ...circle(0, 0.7, 0.12, 60),
  ...circle(-0.5, -0.55, 0.12, 60),
  ...circle(0.5, -0.55, 0.12, 60),
  ...arc(-0.5, -0.05, 0.5, -Math.PI / 2, 0, 80),
  ...arc(0.5, -0.05, 0.5, -Math.PI, -Math.PI / 2, 80),
  ...line(-0.5, -0.55, -0.5, -0.05, 70),
  ...line(0.5, -0.55, 0.5, -0.05, 70),
], 0.025, 12041));

// Docker: whale with water waves
const docker = pts(jitter([
  // whale body (rounded rect)
  ...ellipse(-0.1, 0.1, 0.7, 0.45, 0, 200),
  // stacked container boxes on whale
  ...rect(-0.55, 0.35, 0.3, 0.22, 20),
  ...rect(-0.2, 0.35, 0.3, 0.22, 20),
  ...rect(0.15, 0.35, 0.3, 0.22, 20),
  ...rect(-0.38, 0.57, 0.3, 0.22, 20),
  ...rect(0.0, 0.57, 0.3, 0.22, 20),
  // tail
  ...arc(0.7, 0.1, 0.3, -Math.PI * 0.6, Math.PI * 0.1, 60),
  // water waves
  ...sample(80, t => [-0.9 + t * 1.8, Math.sin(t * Math.PI * 4) * 0.08 - 0.7]),
], 0.022, 13043));

// Flutter: two chevrons forming "F" logo
const flutter = pts(jitter([
  // upper blue chevron
  ...line(-0.5, 0.85, 0.5, 0, 120),
  ...line(0.5, 0, -0.5, -0.85, 120),
  // lower teal chevron (offset down)
  ...line(-0.15, 0.35, 0.5, -0.3, 100),
  ...line(0.5, -0.3, -0.15, -0.95, 100),
  // top bar
  ...line(-0.5, 0.85, 0.05, 0.85, 60),
], 0.025, 14047));

// Rust: gear/cogwheel (circle + teeth)
const rust = pts(jitter([
  ...circle(0, 0, 0.55, 160),
  ...circle(0, 0, 0.22, 80),
  ...((): number[] => {
    const teeth: number[] = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const a1 = a - 0.15, a2 = a + 0.15;
      const r1 = 0.55, r2 = 0.78;
      teeth.push(
        Math.cos(a1) * r1, Math.sin(a1) * r1, 0,
        Math.cos(a1) * r2, Math.sin(a1) * r2, 0,
        Math.cos(a2) * r2, Math.sin(a2) * r2, 0,
        Math.cos(a2) * r1, Math.sin(a2) * r1, 0,
      );
    }
    return teeth;
  })(),
], 0.02, 15053));


// project-0 Clouisle: interconnected node graph (AI/network metaphor)
const project0 = pts(jitter([
  // center hub
  ...circle(0, 0, 0.12, 40),
  // 6 satellite nodes
  ...[0, 1, 2, 3, 4, 5].flatMap(i => {
    const a = (i / 6) * Math.PI * 2;
    const r = 0.62;
    const cx = Math.cos(a) * r, cy = Math.sin(a) * r;
    return [...circle(cx, cy, 0.1, 28), ...line(0, 0, cx, cy, 40)];
  }),
  // outer ring
  ...circle(0, 0, 0.88, 120),
  // cross connections
  ...line(Math.cos(0) * 0.62, Math.sin(0) * 0.62, Math.cos(Math.PI * 2 / 3) * 0.62, Math.sin(Math.PI * 2 / 3) * 0.62, 50),
  ...line(Math.cos(Math.PI / 3) * 0.62, Math.sin(Math.PI / 3) * 0.62, Math.cos(Math.PI) * 0.62, Math.sin(Math.PI) * 0.62, 50),
  ...line(Math.cos(Math.PI * 2 / 3) * 0.62, Math.sin(Math.PI * 2 / 3) * 0.62, Math.cos(Math.PI * 4 / 3) * 0.62, Math.sin(Math.PI * 4 / 3) * 0.62, 50),
], 0.025, 16057));

// project-1 D0Tools: data annotation grid
const project1 = pts(jitter([
  ...((): number[] => {
    const pts: number[] = [];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const x = -0.8 + c * 0.4, y = 0.8 - r * 0.4;
        pts.push(...rect(x - 0.1, y - 0.1, 0.2, 0.2, 6));
        if (r < 2 && c < 2) pts.push(...circle(x, y, 0.05, 8));
      }
    }
    return pts;
  })(),
  ...line(-0.9, 0.9, 0.9, 0.9, 30),
  ...line(-0.9, 0.9, -0.9, -0.9, 30),
], 0.018, 17059));

// project-2 Yundownload: downward stream of arrow shapes
const project2 = pts(jitter([
  // vertical stream lines
  ...line(0, 0.9, 0, -0.9, 80),
  ...line(-0.35, 0.7, -0.35, -0.7, 60),
  ...line(0.35, 0.7, 0.35, -0.7, 60),
  // arrow heads at multiple levels
  ...([-0.55, -0.1, 0.35].flatMap(y => [
    ...line(-0.6, y + 0.15, 0, y - 0.15, 60),
    ...line(0.6, y + 0.15, 0, y - 0.15, 60),
  ])),
  // bottom "receive" platform
  ...line(-0.8, -0.75, 0.8, -0.75, 60),
  ...line(-0.8, -0.9, 0.8, -0.9, 60),
], 0.025, 18061));

// project-3 Carwlsy: radial spider/crawler web
const project3 = pts(jitter([
  ...((): number[] => {
    const p: number[] = [];
    const spokes = 8;
    for (let i = 0; i < spokes; i++) {
      const a = (i / spokes) * Math.PI * 2;
      p.push(...line(0, 0, Math.cos(a) * 0.9, Math.sin(a) * 0.9, 50));
    }
    // concentric rings
    for (const r of [0.28, 0.55, 0.82]) {
      p.push(...circle(0, 0, r, Math.round(r * 160)));
    }
    // center
    p.push(...circle(0, 0, 0.08, 20));
    return p;
  })(),
], 0.02, 19067));

// nebula: seeded gaussian cloud
const nebulaArr = cloud(900, 42, [1.05, 0.8]);
const nebula = pts(nebulaArr);


// --- export ---

export const shapes: Record<ShapeId, Float32Array> = {
  python,
  javascript,
  typescript,
  react,
  nextjs,
  django,
  fastapi,
  postgresql,
  redis,
  sqlite,
  tailwind,
  git,
  docker,
  flutter,
  rust,
  nebula,
  'project-0': project0,
  'project-1': project1,
  'project-2': project2,
  'project-3': project3,
};

// Skill display order (matches home-skills-container-section.tsx)
export const skillIdList: ShapeId[] = [
  'python', 'javascript', 'typescript', 'react', 'nextjs',
  'django', 'fastapi', 'postgresql', 'redis', 'sqlite',
  'tailwind', 'git', 'docker', 'flutter', 'rust',
];

export const projectColors: [number, number, number][] = [
  shapeColors['project-0'],
  shapeColors['project-1'],
  shapeColors['project-2'],
  shapeColors['project-3'],
];

// violet accent (nebula / default)
export const VIOLET: [number, number, number] = [0.486, 0.361, 0.929];
