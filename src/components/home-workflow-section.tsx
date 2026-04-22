"use client";

import {useEffect, useRef, useState} from "react";

type WorkflowStepId = "capture" | "aggregate" | "refine" | "output";

const workflowSteps = [
    {
        id: "capture",
        index: "01",
        title: "捕捉方向",
        description: "从问题、主题与素材里确认一个值得继续展开的方向。",
        detail: "把 AI 应用、全栈开发、工程实践和工具想法收拢为可执行的起点。",
        chips: ["AI 应用", "全栈开发", "工具想法"],
    },
    {
        id: "aggregate",
        index: "02",
        title: "组织结构",
        description: "把零散信息整理成页面、内容与功能层级。",
        detail: "让博客、文档、工具和项目展示不再分散，而是形成统一结构。",
        chips: ["博客内容", "文档目录", "功能分层"],
    },
    {
        id: "refine",
        index: "03",
        title: "提炼表达",
        description: "把技术信息压缩成更清晰、更可读的表达方式。",
        detail: "弱化噪音，保留关键价值，让内容既有技术密度，也有阅读节奏。",
        chips: ["标题优化", "重点突出", "阅读节奏"],
    },
    {
        id: "output",
        index: "04",
        title: "生成结果",
        description: "把同一份内容切换为更适合展示、阅读和交付的结果。",
        detail: "最终输出为视觉卡片和更稳定的内容入口。",
        chips: ["视觉卡片", "内容入口", "展示结果"],
    },
] as const satisfies ReadonlyArray<{
    id: WorkflowStepId;
    index: string;
    title: string;
    description: string;
    detail: string;
    chips: readonly string[];
}>;

const captureFragments = [
    {eyebrow: "Source / 01", title: "AI 应用方向", value: "围绕 LangChain、LangGraph、MCP 与智能系统实践展开"},
    {eyebrow: "Source / 02", title: "全栈开发主题", value: "覆盖 Python、React、Next.js 与产品开发流程"},
    {eyebrow: "Source / 03", title: "工程经验沉淀", value: "把项目中的架构、调试和交付经验整理成内容"},
    {eyebrow: "Source / 04", title: "在线工具构想", value: "把高频开发操作压缩成浏览器内可直接使用的工具"},
] as const;

const outputCards = [
    {
        eyebrow: "Card / 01",
        title: "AI Notes",
        subtitle: "围绕 AI 应用开发、提示词工程与工作流构建整理主题卡片。",
    },
    {
        eyebrow: "Card / 02",
        title: "Engineering",
        subtitle: "把全栈开发、系统实现与项目经验压缩成更清晰的知识入口。",
    },
    {
        eyebrow: "Card / 03",
        title: "Tooling",
        subtitle: "将高频操作沉淀为在线工具，让常见开发任务在浏览器里完成。",
    },
] as const;

export function HomeWorkflowSection() {
    const stepRefs = useRef<Array<HTMLElement | null>>([]);
    const activeStepRef = useRef<WorkflowStepId>("capture");
    const [activeStep, setActiveStep] = useState<WorkflowStepId>("capture");
    const [activeOutputCard, setActiveOutputCard] = useState(1);

    useEffect(() => {
        activeStepRef.current = activeStep;
    }, [activeStep]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        let frameId = 0;

        const syncActiveStep = () => {
            const elements = stepRefs.current.filter((element): element is HTMLElement => Boolean(element));
            if (elements.length === 0) return;

            const viewportAnchor = window.innerHeight * 0.5;
            const hysteresis = 36;
            const centers = elements.map((element) => {
                const rect = element.getBoundingClientRect();
                return rect.top + rect.height / 2;
            });

            let nextIndex = Math.max(
                0,
                workflowSteps.findIndex((step) => step.id === activeStepRef.current)
            );

            while (nextIndex < centers.length - 1) {
                const midpoint = (centers[nextIndex] + centers[nextIndex + 1]) / 2;
                if (viewportAnchor <= midpoint + hysteresis) break;
                nextIndex += 1;
            }

            while (nextIndex > 0) {
                const midpoint = (centers[nextIndex - 1] + centers[nextIndex]) / 2;
                if (viewportAnchor >= midpoint - hysteresis) break;
                nextIndex -= 1;
            }

            const nextStep = workflowSteps[nextIndex]?.id ?? workflowSteps[0].id;
            if (nextStep !== activeStepRef.current) {
                activeStepRef.current = nextStep;
                setActiveStep(nextStep);
            }
        };

        const requestSync = () => {
            window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(syncActiveStep);
        };

        requestSync();
        window.addEventListener("scroll", requestSync, {passive: true});
        window.addEventListener("resize", requestSync);

        return () => {
            window.removeEventListener("scroll", requestSync);
            window.removeEventListener("resize", requestSync);
            window.cancelAnimationFrame(frameId);
        };
    }, []);

    const activeStepData = workflowSteps.find((step) => step.id === activeStep) ?? workflowSteps[0];

    return (
        <section className="home-workflow-section" data-home-section>
            <div className="home-container home-workflow-layout">
                <div className="home-workflow-stage-shell">
                    <div className="home-workflow-stage">
                        <div className="home-workflow-stage-header">
                            <div>
                                <span className="home-section-label">Workflow / {activeStepData.index}</span>
                                <h2>从灵感，到成形</h2>
                            </div>
                            <p>{activeStepData.detail}</p>
                        </div>

                        <div className="home-workflow-stage-body">
                            <div className={`home-workflow-panel${activeStep === "capture" ? " home-workflow-panel-active" : ""}`}>
                                <CapturePreview />
                            </div>
                            <div className={`home-workflow-panel${activeStep === "aggregate" ? " home-workflow-panel-active" : ""}`}>
                                <AggregatePreview />
                            </div>
                            <div className={`home-workflow-panel${activeStep === "refine" ? " home-workflow-panel-active" : ""}`}>
                                <RefinePreview />
                            </div>
                            <div className={`home-workflow-panel${activeStep === "output" ? " home-workflow-panel-active" : ""}`}>
                                <OutputPreview
                                    activeOutputCard={activeOutputCard}
                                    setActiveOutputCard={setActiveOutputCard}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home-workflow-track">
                    <div className="home-section-heading home-workflow-heading">
                        <span className="home-section-label">Workflow</span>
                        <h2>让零散片段逐步聚合、提纯，并成为可以被看见的表达。</h2>
                        <p className="home-section-note">
                            从技术主题、项目经验到在线工具，这一流程把内容逐步整理为更适合浏览、阅读和使用的结果。
                        </p>
                    </div>

                    <div className="home-workflow-steps">
                        {workflowSteps.map((step, index) => {
                            const isActive = step.id === activeStep;

                            return (
                                <article
                                    key={step.id}
                                    ref={(element) => {
                                        stepRefs.current[index] = element;
                                    }}
                                    data-step={step.id}
                                    className="home-workflow-step"
                                >
                                    <button
                                        type="button"
                                        className={`home-workflow-step-card${isActive ? " home-workflow-step-card-active" : ""}`}
                                        onClick={() => {
                                            stepRefs.current[index]?.scrollIntoView({block: "center", behavior: "smooth"});
                                        }}
                                        onFocus={() => {
                                            stepRefs.current[index]?.scrollIntoView({block: "center", behavior: "smooth"});
                                        }}
                                    >
                                        <span className="home-workflow-step-index">{step.index}</span>
                                        <div className="home-workflow-step-copy">
                                            <div>
                                                <h3>{step.title}</h3>
                                                <p>{step.description}</p>
                                            </div>
                                            <div className="home-workflow-step-chips">
                                                {step.chips.map((chip) => (
                                                    <span key={chip} className="home-workflow-step-chip">
                                                        {chip}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CapturePreview() {
    return (
        <div className="home-workflow-capture-preview">
            <div className="home-workflow-capture-core">
                <span>Input scope</span>
                <strong>技术主题与产品想法正在汇集</strong>
            </div>
            {captureFragments.map((fragment, index) => (
                <article key={fragment.eyebrow} className={`home-workflow-fragment-card home-workflow-fragment-card-${index + 1}`}>
                    <span>{fragment.eyebrow}</span>
                    <h3>{fragment.title}</h3>
                    <p>{fragment.value}</p>
                </article>
            ))}
        </div>
    );
}

function AggregatePreview() {
    return (
        <div className="home-workflow-aggregate-preview">
            <div className="home-workflow-aggregate-line home-workflow-aggregate-line-horizontal" />
            <div className="home-workflow-aggregate-line home-workflow-aggregate-line-vertical" />
            <article className="home-workflow-aggregate-node home-workflow-aggregate-node-center">
                <span>Core</span>
                <strong>统一入口</strong>
            </article>
            <article className="home-workflow-aggregate-node home-workflow-aggregate-node-top">
                <span>Docs</span>
                <strong>文档结构</strong>
            </article>
            <article className="home-workflow-aggregate-node home-workflow-aggregate-node-left">
                <span>Blog</span>
                <strong>技术内容</strong>
            </article>
            <article className="home-workflow-aggregate-node home-workflow-aggregate-node-right">
                <span>Tools</span>
                <strong>在线工具</strong>
            </article>
            <article className="home-workflow-aggregate-node home-workflow-aggregate-node-bottom">
                <span>Projects</span>
                <strong>项目展示</strong>
            </article>
        </div>
    );
}

function RefinePreview() {
    return (
        <div className="home-workflow-refine-preview">
            <article className="home-workflow-copy-card home-workflow-copy-card-muted">
                <span>Draft</span>
                <div className="home-workflow-copy-lines">
                    <div className="home-workflow-copy-line home-workflow-copy-line-long" />
                    <div className="home-workflow-copy-line home-workflow-copy-line-mid" />
                    <div className="home-workflow-copy-line home-workflow-copy-line-short" />
                    <div className="home-workflow-copy-line home-workflow-copy-line-mid" />
                </div>
                <p>最初只是技术主题、项目笔记和工具想法的并列堆叠。</p>
            </article>
            <article className="home-workflow-copy-card home-workflow-copy-card-active">
                <span>Refined</span>
                <h3>内容、工具与项目开始形成统一表达</h3>
                <p>技术密度被保留下来，但信息层次更清晰，页面入口也更容易理解。</p>
                <div className="home-workflow-copy-highlight">让复杂内容变得更容易浏览与使用。</div>
            </article>
        </div>
    );
}

function OutputPreview({
    activeOutputCard,
    setActiveOutputCard,
}: {
    activeOutputCard: number;
    setActiveOutputCard: (value: number) => void;
}) {
    return (
        <div className="home-workflow-output-preview home-workflow-output-preview-cards">
            <div className="home-workflow-output-dots" role="tablist" aria-label="选择展示卡片">
                {outputCards.map((card, index) => {
                    const cardIndex = index + 1;
                    const isActive = activeOutputCard === cardIndex;

                    return (
                        <button
                            key={card.title}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`home-workflow-output-dot${isActive ? " home-workflow-output-dot-active" : ""}`}
                            onClick={() => setActiveOutputCard(cardIndex)}
                        >
                            <span className="home-workflow-output-dot-index">0{cardIndex}</span>
                            <span className="home-workflow-output-dot-label">{card.title}</span>
                        </button>
                    );
                })}
            </div>

            <div className="home-workflow-output-stack">
                {outputCards.map((card, index) => {
                    const cardIndex = index + 1;
                    const isActive = activeOutputCard === cardIndex;

                    return (
                        <button
                            key={card.title}
                            type="button"
                            className={`home-workflow-visual-card home-workflow-visual-card-${cardIndex}${isActive ? " home-workflow-visual-card-active" : ""}`}
                            onClick={() => setActiveOutputCard(cardIndex)}
                        >
                            <span>{card.eyebrow}</span>
                            <h3>{card.title}</h3>
                            <p>{card.subtitle}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
