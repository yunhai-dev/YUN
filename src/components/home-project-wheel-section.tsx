"use client";

import {useEffect, useLayoutEffect, useRef, useState} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Link} from "next-view-transitions";
import Image from "next/image";
import dynamic from "next/dynamic";
import {ArrowUpRight} from "lucide-react";
import {d0ToolsProject} from "@/components/d0-tools";
import {clouisleProject} from "@/components/clouisle";
import {yundownloadProject} from "@/components/yundownload";
import {carwlsyProject} from "@/components/carwlsy";
import type {TerminalCommand} from "@/components/terminal-player";

type ProjectItem = {
    id: string;
    name: string;
    eyebrow: string;
    description: string;
    detail: string;
    summary: string;
    highlights: string[];
    href: string;
    image: string;
    accent: string;
};

const TerminalPlayer = dynamic(() => import("@/components/terminal-player"), {
    ssr: false,
    loading: () => <div className="home-project-wheel-terminal-skeleton" />,
});

const yundownloadCommands: TerminalCommand[] = [
    {
        command: "yundownload https://www.yhnotes.com/test.exe",
        output: `INFO - download(57398) - 2025-12-17 23:21:54 - Protocol HttpProtocolHandler is supported for https://www.yhnotes.com/test.exe
INFO - download(57400) - 2025-12-17 23:21:54 - 🚀Start downloading metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:21:54 - stream download: https://www.yhnotes.com/test.exe to test.exe}
INFO - download(57400) - 2025-12-17 23:21:59 - 📊Downloading progress: 0.37 speed: 15.18 MB/S metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:22:04 - 📊Downloading progress: 0.69 speed: 12.98 MB/S metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:22:08 - 🏁Downloading result: success metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:22:08 - 📊Downloading progress: 1.0 speed: 13.23 MB/S metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:22:08 - 📊Downloading progress: 1.0 speed: 0.0 MB/S metadata: https://www.yhnotes.com/test.exe to test.exe
file download success: https://www.yhnotes.com/test.exe`,
    },
];

const projects: ProjectItem[] = [
    {
        ...clouisleProject,
        summary: "把 AI Agent、工作流编排和企业知识管理放进同一个交付界面，减少团队从试验到生产之间的切换成本。",
        highlights: [
            "统一管理多模型 Agent 与知识库权限",
            "支持可视化工作流编排与运行监控",
            "面向企业场景组织文档、索引与协作流程",
        ],
    },
    {
        ...d0ToolsProject,
        summary: "围绕数据采集、标注和交付建立统一工作台，用更高密度的工具链提升标注效率与可控性。",
        highlights: [
            "支持矩形、多边形、分割与点等标注模式",
            "结合 YOLO、SAM 等模型提升智能辅助能力",
            "覆盖数据流转、过期控制与交付管理",
        ],
    },
    {
        ...yundownloadProject,
        summary: "将多协议下载抽象成统一体验，强调高并发性能、稳定性以及和内部系统的集成能力。",
        highlights: [
            "支持 HTTP、FTP、SFTP、M3U8 等协议",
            "内置动态并发控制以平衡速度与稳定性",
            "统一 API 便于嵌入自动化流程或业务系统",
        ],
    },
    {
        ...carwlsyProject,
        summary: "面向分布式采集与任务投递的工程平台，把脚本部署、运行和调度整合进同一个操作面板。",
        highlights: [
            "支持 Docker 与本地方式部署服务",
            "内置 Web IDE 方便快速开发与发布",
            "强化分布式调度、采集与任务告警能力",
        ],
    },
];

export function HomeProjectWheelSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const bodyRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const transitionRef = useRef<gsap.core.Timeline | null>(null);
    const requestedIndexRef = useRef(0);
    const displayedIndexRef = useRef(0);
    const isTransitioningRef = useRef(false);
    const [displayedIndex, setDisplayedIndex] = useState(0);

    const splitText = (text: string) =>
        Array.from(text).map((char, index) => (
            <span key={`${text}-${index}`} className="home-project-wheel-char">
                {char === " " ? " " : char}
            </span>
        ));

    const setDisplayedProject = (nextIndex: number) => {
        displayedIndexRef.current = nextIndex;
        setDisplayedIndex(nextIndex);
    };

    const getTransitionTargets = () => {
        const titleTarget = titleRef.current;
        const bodyTarget = bodyRef.current;
        const imageTarget = imageRef.current;
        const titleChars = titleTarget ? Array.from(titleTarget.querySelectorAll<HTMLElement>(".home-project-wheel-char")) : [];
        const bodyChars = bodyTarget ? Array.from(bodyTarget.querySelectorAll<HTMLElement>(".home-project-wheel-char")) : [];
        const accents = bodyTarget ? Array.from(bodyTarget.querySelectorAll<HTMLElement>(".home-project-wheel-accent")) : [];
        const blocks = [titleTarget, bodyTarget, imageTarget].filter((node): node is HTMLDivElement => Boolean(node));

        return {titleChars, bodyChars, accents, imageTarget, blocks};
    };

    const startEnterTransition = () => {
        const {titleChars, bodyChars, accents, imageTarget, blocks} = getTransitionTargets();
        if (blocks.length === 0) {
            isTransitioningRef.current = false;
            return;
        }

        isTransitioningRef.current = true;
        transitionRef.current?.kill();
        gsap.killTweensOf([...titleChars, ...bodyChars, ...accents, ...blocks]);
        gsap.set(titleChars, {autoAlpha: 0, y: 18, filter: "blur(10px)"});
        gsap.set(bodyChars, {autoAlpha: 0, y: 14, filter: "blur(10px)"});
        gsap.set(accents, {autoAlpha: 0, y: 10, filter: "blur(10px)"});
        if (imageTarget) {
            gsap.set(imageTarget, {autoAlpha: 0});
        }

        const timeline = gsap.timeline({
            onComplete: () => {
                transitionRef.current = null;
                isTransitioningRef.current = false;
                if (requestedIndexRef.current !== displayedIndexRef.current) {
                    startExitTransition();
                }
            },
        });

        timeline
            .to(titleChars, {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.32,
                ease: "power3.out",
                stagger: 0.018,
            })
            .to(bodyChars, {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.24,
                ease: "power3.out",
                stagger: 0.006,
            }, "<+0.06")
            .to(accents, {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.18,
                ease: "power3.out",
                stagger: 0.02,
            }, "<+0.03");

        if (imageTarget) {
            timeline.to(imageTarget, {
                autoAlpha: 1,
                duration: 0.32,
                ease: "power2.out",
                clearProps: "opacity,visibility",
            }, "<+0.08");
        }

        transitionRef.current = timeline;
    };

    const startExitTransition = () => {
        if (isTransitioningRef.current) return;
        if (requestedIndexRef.current === displayedIndexRef.current) return;

        const {titleChars, bodyChars, accents, imageTarget, blocks} = getTransitionTargets();
        if (blocks.length === 0) {
            const nextIndex = requestedIndexRef.current;
            if (nextIndex === displayedIndexRef.current) {
                startEnterTransition();
                return;
            }
            setDisplayedProject(nextIndex);
            return;
        }

        isTransitioningRef.current = true;
        transitionRef.current?.kill();
        gsap.killTweensOf([...titleChars, ...bodyChars, ...accents, ...blocks]);

        const timeline = gsap.timeline({
            onComplete: () => {
                transitionRef.current = null;
                const nextIndex = requestedIndexRef.current;
                if (nextIndex === displayedIndexRef.current) {
                    startEnterTransition();
                    return;
                }
                setDisplayedProject(nextIndex);
            },
        });

        timeline
            .to(titleChars, {
                autoAlpha: 0,
                y: -8,
                filter: "blur(8px)",
                duration: 0.12,
                ease: "power2.out",
                stagger: 0.008,
            })
            .to(bodyChars, {
                autoAlpha: 0,
                y: -6,
                filter: "blur(8px)",
                duration: 0.12,
                ease: "power2.out",
                stagger: 0.004,
            }, "<")
            .to(accents, {
                autoAlpha: 0,
                y: -4,
                filter: "blur(8px)",
                duration: 0.1,
                ease: "power2.out",
                stagger: 0.01,
            }, "<");

        if (imageTarget) {
            timeline.to(imageTarget, {
                autoAlpha: 0,
                duration: 0.2,
                ease: "power2.out",
            }, "<");
        }

        transitionRef.current = timeline;
    };

    const activeProject = projects[displayedIndex] ?? projects[0];

    useEffect(() => {
        displayedIndexRef.current = displayedIndex;
    }, [displayedIndex]);

    useEffect(() => {
        if (!sectionRef.current || !pinRef.current) return;
        if (window.innerWidth < 1024) return;

        gsap.registerPlugin(ScrollTrigger);

        const updateProgress = (nextProgress: number) => {
            const clamped = gsap.utils.clamp(0, 0.999999, nextProgress);
            const nextIndex = Math.min(
                projects.length - 1,
                Math.max(0, Math.floor(clamped * projects.length))
            );

            if (requestedIndexRef.current === nextIndex) return;

            requestedIndexRef.current = nextIndex;

            if (displayedIndexRef.current === nextIndex) return;
            startExitTransition();
        };

        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * projects.length}`,
            pin: pinRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                updateProgress(self.progress);
            },
        });

        const onRefresh = () => {
            updateProgress(trigger.progress);
        };

        ScrollTrigger.addEventListener("refresh", onRefresh);
        updateProgress(0);

        return () => {
            transitionRef.current?.kill();
            ScrollTrigger.removeEventListener("refresh", onRefresh);
            trigger.kill();
        };
    }, []);

    useLayoutEffect(() => {
        startEnterTransition();
    }, [displayedIndex]);

    return (
        <section ref={sectionRef} className="home-project-wheel-section">
            <div ref={pinRef} className="home-project-wheel-pin">
                <div className="home-container home-project-wheel-layout">
                    <div className="home-project-wheel-copy">
                        <span className="home-section-label">Projects</span>
                        <div className="home-project-wheel-detail">
                            <div ref={titleRef} className="home-project-wheel-detail-title-block">
                                <span className="home-project-wheel-index">
                                    {String(displayedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                                </span>
                                <div className="home-project-wheel-detail-head">
                                    <span className="home-project-wheel-eyebrow" style={{color: activeProject.accent}}>
                                        {activeProject.eyebrow}
                                    </span>
                                    <h3>{splitText(activeProject.name)}</h3>
                                </div>
                            </div>
                            <div ref={bodyRef} className="home-project-wheel-detail-body">
                                <p>{splitText(activeProject.description)}</p>
                                <p className="home-project-wheel-detail-sub">{splitText(activeProject.summary)}</p>
                                <ul className="home-project-wheel-points">
                                    {activeProject.highlights.map((item) => (
                                        <li key={item}>
                                            <span className="home-project-wheel-accent home-project-wheel-point-dot" />
                                            <span>{splitText(item)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="home-project-wheel-detail-note">{splitText(activeProject.detail)}</p>
                                <Link href={activeProject.href} className="home-project-wheel-link" target="_blank" rel="noopener noreferrer">
                                    <span className="home-project-wheel-link-text">{splitText("查看项目")}</span>
                                    <ArrowUpRight className="home-project-wheel-link-icon home-project-wheel-accent" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="home-project-wheel-stage">
                        <div className="home-project-wheel-stage-media">
                            <div ref={imageRef} className="home-project-wheel-stage-stack">
                                <span className="home-project-wheel-stage-label" style={{color: activeProject.accent}}>
                                    {activeProject.name}
                                </span>
                                {activeProject.image === "terminal" ? (
                                    <div className="home-project-wheel-stage-card home-project-wheel-stage-terminal-card">
                                        <TerminalPlayer
                                            className="home-project-wheel-terminal-player"
                                            commands={yundownloadCommands}
                                            outputLineDelay={2000}
                                            autoPlay={false}
                                            title="Yundownload"
                                        />
                                    </div>
                                ) : (
                                    <div className="home-project-wheel-stage-visual">
                                        <Image
                                            src={activeProject.image}
                                            alt={activeProject.name}
                                            fill
                                            sizes="(min-width: 1100px) 42vw, 100vw"
                                            className="home-project-wheel-stage-image"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="home-project-wheel-stage-overlay" />
                    </div>
                </div>
            </div>
        </section>
    );
}
