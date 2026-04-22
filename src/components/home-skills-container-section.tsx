"use client";

import type {CSSProperties} from "react";
import type {Body as MatterBody} from "matter-js";
import type {IconType} from "react-icons";
import {
    SiDjango,
    SiDocker,
    SiFastapi,
    SiFlutter,
    SiGit,
    SiJavascript,
    SiNextdotjs,
    SiPostgresql,
    SiPython,
    SiReact,
    SiRedis,
    SiRust,
    SiSqlite,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";
import {useEffect, useRef, useState} from "react";

type SkillItem = {
    name: string;
    accent: string;
    size: "md" | "lg";
    icon: IconType;
};

const skills: SkillItem[] = [
    {name: "Python", accent: "#60a5fa", size: "lg", icon: SiPython},
    {name: "JavaScript", accent: "#facc15", size: "lg", icon: SiJavascript},
    {name: "TypeScript", accent: "#38bdf8", size: "lg", icon: SiTypescript},
    {name: "React", accent: "#61dafb", size: "lg", icon: SiReact},
    {name: "Next.js", accent: "#ffffff", size: "md", icon: SiNextdotjs},
    {name: "Django", accent: "#4ade80", size: "md", icon: SiDjango},
    {name: "FastAPI", accent: "#10b981", size: "md", icon: SiFastapi},
    {name: "PostgreSQL", accent: "#4169e1", size: "md", icon: SiPostgresql},
    {name: "Redis", accent: "#dc2626", size: "md", icon: SiRedis},
    {name: "SQLite", accent: "#93c5fd", size: "md", icon: SiSqlite},
    {name: "Tailwind CSS", accent: "#38bdf8", size: "md", icon: SiTailwindcss},
    {name: "Git", accent: "#fb7185", size: "md", icon: SiGit},
    {name: "Docker", accent: "#22d3ee", size: "md", icon: SiDocker},
    {name: "Flutter", accent: "#60a5fa", size: "md", icon: SiFlutter},
    {name: "Rust", accent: "#f59e0b", size: "md", icon: SiRust},
];

export function HomeSkillsContainerSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [enablePhysics, setEnablePhysics] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [activeSkills, setActiveSkills] = useState<string[]>([]);

    const toggleSkill = (name: string) => {
        setActiveSkills((current) =>
            current.includes(name)
                ? current.filter((item) => item !== name)
                : [...current, name]
        );
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        const updateMode = () => {
            setEnablePhysics(window.innerWidth >= 1024 && !mediaQuery.matches);
        };

        updateMode();
        window.addEventListener("resize", updateMode);
        mediaQuery.addEventListener("change", updateMode);

        return () => {
            window.removeEventListener("resize", updateMode);
            mediaQuery.removeEventListener("change", updateMode);
        };
    }, []);

    useEffect(() => {
        if (!enablePhysics) {
            setHasPlayed(false);
            return;
        }

        const section = sectionRef.current;
        const stage = stageRef.current;
        if (!section || !stage) return;

        let cancelled = false;
        let cleanupPhysics: (() => void) | null = null;
        let observer: IntersectionObserver | null = null;

        const startPhysics = async () => {
            if (cancelled || cleanupPhysics) return;
            setHasPlayed(true);

            const Matter = await import("matter-js");
            if (cancelled || !stageRef.current) return;

            const {Bodies, Body, Engine, Runner, World} = Matter;
            const chipElements = chipRefs.current.filter((chip): chip is HTMLDivElement => Boolean(chip));
            if (chipElements.length === 0) return;

            const engine = Engine.create();
            engine.gravity.y = 1.15;
            engine.gravity.x = 0;
            engine.positionIterations = 10;
            engine.velocityIterations = 8;

            const runner = Runner.create();
            const stageRect = stageRef.current.getBoundingClientRect();
            const width = stageRect.width;
            const height = stageRect.height;
            const wallThickness = 64;

            const boundaries = [
                Bodies.rectangle(width / 2, height + wallThickness / 2, width + wallThickness * 2, wallThickness, {isStatic: true}),
                Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2, {isStatic: true}),
                Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2, {isStatic: true}),
            ];

            World.add(engine.world, boundaries);

            const entries = chipElements.map((element, index) => {
                const rect = element.getBoundingClientRect();
                return {
                    element,
                    width: rect.width,
                    height: rect.height,
                    index,
                    body: null as MatterBody | null,
                };
            });

            entries.forEach(({element}) => {
                element.style.opacity = "0";
            });

            const releaseTimers: number[] = [];
            let frameId = 0;
            let gravityResetTimer = 0;
            let targetGravityY = 1.15;
            let lastScrollY = window.scrollY;

            const isSectionActive = () => {
                const rect = section.getBoundingClientRect();
                return rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08;
            };

            const syncDom = () => {
                engine.gravity.y += (targetGravityY - engine.gravity.y) * 0.12;

                entries.forEach((entry) => {
                    if (!entry.body) return;
                    const {x, y} = entry.body.position;
                    entry.element.style.transform = `translate(${x - entry.width / 2}px, ${y - entry.height / 2}px) rotate(${entry.body.angle}rad)`;
                });
                frameId = window.requestAnimationFrame(syncDom);
            };

            const restoreGravity = () => {
                window.clearTimeout(gravityResetTimer);
                gravityResetTimer = window.setTimeout(() => {
                    targetGravityY = 1.15;
                }, 180);
            };

            const handleScroll = () => {
                if (!isSectionActive()) {
                    lastScrollY = window.scrollY;
                    return;
                }

                const delta = window.scrollY - lastScrollY;
                lastScrollY = window.scrollY;
                if (Math.abs(delta) < 1) return;

                const intensity = Math.min(1, Math.abs(delta) / 42);
                const activeBodies = entries.flatMap((entry) => (entry.body ? [entry.body] : []));
                if (activeBodies.length === 0) return;

                if (delta < 0) {
                    targetGravityY = -0.28 - intensity * 0.4;
                    activeBodies.forEach((body, index) => {
                        if (body.position.y > height - 180) {
                            Body.applyForce(body, body.position, {
                                x: (index % 2 === 0 ? -1 : 1) * 0.00012 * intensity * body.mass,
                                y: -0.0032 * intensity * body.mass,
                            });
                        }
                    });
                    restoreGravity();
                    return;
                }

                targetGravityY = 1.15 + intensity * 0.75;
                restoreGravity();
            };

            entries.forEach((entry) => {
                const laneCount = 4;
                const laneIndex = entry.index % laneCount;
                const laneWidth = width / (laneCount + 1);
                const startX = laneWidth * (laneIndex + 1) + (entry.index % 2 === 0 ? -18 : 18);
                const startY = -120 - entry.index * 52;

                releaseTimers.push(window.setTimeout(() => {
                    if (cancelled) return;
                    const body = Bodies.rectangle(startX, startY, entry.width, entry.height, {
                        restitution: 0.56,
                        friction: 0.22,
                        frictionAir: 0.014,
                        density: 0.0014,
                        chamfer: {radius: 18},
                        angle: (entry.index % 2 === 0 ? -1 : 1) * (0.03 + entry.index * 0.008),
                    });

                    entry.body = body;
                    entry.element.style.opacity = "1";
                    World.add(engine.world, body);
                    Body.setAngularVelocity(body, (entry.index % 2 === 0 ? -1 : 1) * 0.012);

                }, entry.index * 160));
            });

            window.addEventListener("scroll", handleScroll, {passive: true});
            Runner.run(runner, engine);
            syncDom();

            cleanupPhysics = () => {
                window.removeEventListener("scroll", handleScroll);
                window.clearTimeout(gravityResetTimer);
                releaseTimers.forEach((timer) => window.clearTimeout(timer));
                window.cancelAnimationFrame(frameId);
                Runner.stop(runner);
                World.clear(engine.world, false);
                Engine.clear(engine);
                chipElements.forEach((element) => {
                    element.style.opacity = "";
                    element.style.transform = "";
                });
            };
        };

        observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer?.disconnect();
                void startPhysics();
            },
            {threshold: 0.35}
        );

        observer.observe(section);

        return () => {
            cancelled = true;
            observer?.disconnect();
            cleanupPhysics?.();
        };
    }, [enablePhysics]);

    return (
        <section ref={sectionRef} className="home-skills-section" data-home-section>
            <div className="home-container home-skills-layout">
                <div className="home-section-heading home-skills-heading">
                    <span className="home-section-label">Capabilities</span>
                    <h2>我持续使用的技术能力</h2>
                    <p className="home-section-note">
                        这些技术不是清单式陈列，而是我在产品开发、系统实现与长期维护中反复使用的工作语言。
                    </p>
                </div>

                <div className={`home-skills-stage${hasPlayed ? " home-skills-stage-active" : ""}`}>
                    {enablePhysics ? (
                        <div ref={stageRef} className="home-skills-physics-layer" aria-hidden="true">
                            {skills.map((skill, index) => {
                                const Icon = skill.icon;
                                return (
                                    <button
                                        key={skill.name}
                                        type="button"
                                        ref={(element) => {
                                            chipRefs.current[index] = element;
                                        }}
                                        className={`home-skills-chip home-skills-chip-${skill.size}${activeSkills.includes(skill.name) ? " home-skills-chip-active" : ""}`}
                                        style={{"--skill-accent": skill.accent} as CSSProperties}
                                        aria-pressed={activeSkills.includes(skill.name)}
                                        onClick={() => toggleSkill(skill.name)}
                                    >
                                        <span className="home-skills-chip-glow" />
                                        <Icon className="home-skills-chip-icon" aria-hidden="true" />
                                        <span className="home-skills-chip-label">{skill.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="home-skills-static-grid">
                            {skills.map((skill) => {
                                const Icon = skill.icon;
                                return (
                                    <button
                                        key={skill.name}
                                        type="button"
                                        className={`home-skills-chip home-skills-chip-${skill.size} home-skills-chip-static${activeSkills.includes(skill.name) ? " home-skills-chip-active" : ""}`}
                                        style={{"--skill-accent": skill.accent} as CSSProperties}
                                        aria-pressed={activeSkills.includes(skill.name)}
                                        onClick={() => toggleSkill(skill.name)}
                                    >
                                        <span className="home-skills-chip-glow" />
                                        <Icon className="home-skills-chip-icon" aria-hidden="true" />
                                        <span className="home-skills-chip-label">{skill.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
