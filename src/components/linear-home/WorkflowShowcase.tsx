"use client";

import {useState} from 'react';
import Image from 'next/image';
import {
    ArrowRight,
    ArrowUpRight,
    Bot,
    CheckCircle2,
    Cpu,
    GitPullRequest,
    Layers,
    Sparkles,
    Workflow,
} from 'lucide-react';
import {STORAGE_HOST} from '@/data/baseUrl';

interface AgentTask {
    id: string;
    title: string;
    model: string;
    status: string;
    latency: string;
    prompt: string;
    steps: string[];
}

const AGENT_TASKS: AgentTask[] = [
    {
        id: 'AG-104',
        title: 'Clouisle · 多模型 Agent 协同路由',
        model: 'Agent Router',
        status: 'Completed',
        latency: '1.2s',
        prompt: '根据意图自动调度知识库检索、工具调用与长文归纳节点',
        steps: [
            'Context Triage — 识别问题涉及的私有文档与外部 API',
            'Tool Execution — 并发检索向量索引与结构化元数据',
            'Synthesis — 生成可溯源引用并沉淀至工作区笔记',
        ],
    },
    {
        id: 'AG-108',
        title: '每日技术雷达 · 自动采集与摘要管道',
        model: 'Workflow Pipeline',
        status: 'Running',
        latency: '0.8s',
        prompt: '聚合 GitHub Trending、Hacker News 与论文动态生成技术简报',
        steps: [
            'Fetch & Dedupe — 定时抓取并过滤重复条目',
            'Semantic Scoring — 按 AI / Full-Stack / Infra 维度打分排序',
            'Publish — 自动生成 Markdown 归档至站内博客',
        ],
    },
    {
        id: 'AG-112',
        title: '全栈工程辅助 · Diff 上下文审查',
        model: 'Code Assistant',
        status: 'Ready',
        latency: '0.5s',
        prompt: '在提交前检查边界条件、类型安全与性能回退风险',
        steps: [
            'AST & Type Check — 校验接口契约与静态类型推导',
            'Edge Case Scan — 标注潜在空值与异步竞态',
            'Summary — 输出精炼的变更说明与测试建议',
        ],
    },
];

interface ShowcaseProject {
    id: string;
    name: string;
    category: string;
    tagline: string;
    description: string;
    stack: string[];
    href: string;
    image?: string;
    imageAlt?: string;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
    {
        id: '01',
        name: 'Clouisle',
        category: 'AI Workspace',
        tagline: '在云与思考之间的 AI 工作空间',
        description:
            '将 Agent、可视化工作流与知识库放在同一处，让复杂的想法真正落地。支持多模型切换、上下文记忆与团队协作。',
        stack: ['Next.js', 'Python', 'AI Agent', 'RAG'],
        href: 'https://clouisle.asia/',
        image: `${STORAGE_HOST}/admin-panel.webp`,
        imageAlt: 'Clouisle AI 管理平台界面',
    },
    {
        id: '02',
        name: 'Crawlsy',
        category: 'Open Source',
        tagline: '现代化采集网络与爬虫调度平台',
        description:
            '面向工程化数据采集场景构建的爬虫管理与调度系统，提供任务编排、节点监控与结构化导出能力。',
        stack: ['Python', 'Playwright', 'AsyncIO', 'Docker'],
        href: 'https://github.com/yunhai-dev/crawlsy',
        image: `${STORAGE_HOST}/carwlsy.png`,
        imageAlt: 'Crawlsy 项目界面',
    },
    {
        id: '03',
        name: 'D0 Tools',
        category: 'Dev & Data',
        tagline: '给日常开发与数据标注一点轻盈',
        description:
            '专注高频开发辅助与数据标注效率的开源工具集，追求低心智负担与开箱即用的桌面体验。',
        stack: ['TypeScript', 'React', 'Data Labeling'],
        href: 'https://github.com/yunhai-dev/D0-Tools',
        image: `${STORAGE_HOST}/data-label.webp`,
        imageAlt: 'D0 Tools 数据标注界面',
    },
    {
        id: '04',
        name: 'Job Hive',
        category: 'Automation',
        tagline: '智能化任务调度与信息聚合实验',
        description:
            '结合定时任务管道与大语言模型语义过滤，自动聚合高价值信息流并生成结构化摘要。',
        stack: ['Python', 'LLM', 'Scheduler'],
        href: 'https://github.com/yunhai-dev/job_hive',
    },
    {
        id: '05',
        name: 'Naive for Qt',
        category: 'Desktop UI',
        tagline: '为 Qt 桌面端带来现代轻量组件体验',
        description:
            '将现代 Web 设计语言的克制与清晰带入原生 Qt 开发，提供统一的设计规范与常用基础控件。',
        stack: ['C++', 'Qt', 'UI Kit'],
        href: 'https://github.com/yunhai-dev/naive-for-qt',
    },
];

export function WorkflowShowcase() {
    const [activeTaskId, setActiveTaskId] = useState<string>(AGENT_TASKS[0].id);
    const [activeProjectId, setActiveProjectId] = useState<string>(SHOWCASE_PROJECTS[0].id);

    const activeTask = AGENT_TASKS.find((t) => t.id === activeTaskId) ?? AGENT_TASKS[0];
    const activeProject =
        SHOWCASE_PROJECTS.find((p) => p.id === activeProjectId) ?? SHOWCASE_PROJECTS[0];

    return (
        <>
            {/* Section: AI & Automations */}
            <section className="linear-divider py-20 md:py-28">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        <div className="lg:col-span-5 min-w-0 space-y-5">
                            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--lh-accent)]">
                                <Bot className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>AI & AUTOMATIONS</span>
                            </div>
                            <h2 className="linear-subheadline text-balance text-3xl sm:text-4xl text-[var(--lh-ink)]">
                                让智能体真正融入
                                <br />
                                日常工作流
                            </h2>
                            <p className="text-sm sm:text-base text-[var(--lh-muted)] leading-relaxed">
                                从提示词实验到生产级 Agent 编排，围绕{' '}
                                <span className="text-[var(--lh-ink)] font-medium">Clouisle</span>{' '}
                                持续探索人机协同的边界——把重复检索、信息整理与上下文切换交给自动化管道，让人专注于判断与创造。
                            </p>
                            <div className="pt-2">
                                <a
                                    href="https://clouisle.asia/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--lh-ink)] hover:text-[var(--lh-accent)] transition-colors"
                                >
                                    <span>探索 Clouisle</span>
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-7 min-w-0">
                            <div className="linear-card rounded-xl overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--lh-border)] bg-[var(--lh-surface-2)]/60">
                                    <div className="flex items-center gap-2 text-xs font-medium">
                                        <Workflow className="h-3.5 w-3.5 text-[var(--lh-accent)]" aria-hidden="true" />
                                        <span>Agent Execution Trace</span>
                                    </div>
                                    <span className="text-[11px] font-mono tabular-nums text-[var(--lh-subtle)]">
                                        {activeTask.model} · {activeTask.latency}
                                    </span>
                                </div>

                                {/* Task Selector Pills */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[var(--lh-border)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--lh-border)]">
                                    {AGENT_TASKS.map((task) => {
                                        const isActive = task.id === activeTask.id;
                                        return (
                                            <button
                                                key={task.id}
                                                type="button"
                                                aria-pressed={isActive}
                                                onClick={() => setActiveTaskId(task.id)}
                                                className={`p-3.5 text-left transition-colors ${
                                                    isActive
                                                        ? 'bg-[var(--lh-surface-hover)]'
                                                        : 'hover:bg-[var(--lh-surface-2)]/50'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-mono text-[10px] text-[var(--lh-subtle)]">
                                                        {task.id}
                                                    </span>
                                                    <span
                                                        className={`text-[10px] font-mono ${
                                                            isActive
                                                                ? 'text-[var(--lh-accent)]'
                                                                : 'text-[var(--lh-subtle)]'
                                                        }`}
                                                    >
                                                        {task.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs font-medium text-[var(--lh-ink)] line-clamp-1">
                                                    {task.title}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Active Task Detail */}
                                <div className="p-5 space-y-4">
                                    <div className="rounded-lg border border-[var(--lh-border)] bg-[var(--lh-surface-2)]/50 p-3.5">
                                        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--lh-subtle)] mb-1.5">
                                            <Sparkles className="h-3 w-3 text-[var(--lh-accent)]" />
                                            <span>INTENT</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-[var(--lh-ink)]">
                                            {activeTask.prompt}
                                        </p>
                                    </div>

                                    <div className="space-y-2.5">
                                        {activeTask.steps.map((step, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-2.5 text-xs text-[var(--lh-muted)]"
                                            >
                                                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--lh-status-live)] shrink-0 mt-0.5" aria-hidden="true" />
                                                <span>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Build, Review, and Ship (Selected Works) */}
            <section id="projects" className="linear-divider py-20 md:py-28">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="space-y-3 max-w-2xl">
                            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--lh-accent)]">
                                <GitPullRequest className="h-3.5 w-3.5" />
                                <span>BUILD, REVIEW & SHIP</span>
                            </div>
                            <h2 className="linear-subheadline text-balance text-3xl sm:text-4xl text-[var(--lh-ink)]">
                                用工程化实践，把想法变成真实产品
                            </h2>
                            <p className="text-sm sm:text-base text-[var(--lh-muted)] leading-relaxed">
                                覆盖 AI 工作空间、数据采集基础设施、桌面效率工具与全栈开源项目。
                            </p>
                        </div>
                        <a
                            href="https://github.com/yunhai-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--lh-muted)] hover:text-[var(--lh-ink)] transition-colors shrink-0"
                        >
                            <span>GitHub 主页</span>
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Project List */}
                        <div className="lg:col-span-5 min-w-0 linear-card rounded-xl divide-y divide-[var(--lh-border)] overflow-hidden self-start">
                            {SHOWCASE_PROJECTS.map((project) => {
                                const isActive = project.id === activeProject.id;
                                return (
                                    <button
                                        key={project.id}
                                        type="button"
                                        aria-pressed={isActive}
                                        onClick={() => setActiveProjectId(project.id)}
                                        className={`w-full text-left px-4 py-4 transition-colors flex items-start justify-between gap-3 ${
                                            isActive
                                                ? 'bg-[var(--lh-surface-hover)]'
                                                : 'hover:bg-[var(--lh-surface-2)]/60'
                                        }`}
                                    >
                                        <div className="space-y-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono tabular-nums text-[11px] text-[var(--lh-subtle)]">
                                                    {project.id}
                                                </span>
                                                <span className="text-sm font-medium text-[var(--lh-ink)]">
                                                    {project.name}
                                                </span>
                                            </div>
                                            <p className="text-xs text-[var(--lh-muted)] truncate">
                                                {project.tagline}
                                            </p>
                                        </div>
                                        <span className="shrink-0 rounded-full border border-[var(--lh-border)] px-2 py-0.5 text-[10px] font-mono text-[var(--lh-muted)]">
                                            {project.category}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Project Preview Frame */}
                        <div className="lg:col-span-7 min-w-0 linear-card rounded-xl overflow-hidden flex flex-col justify-between">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--lh-border)] bg-[var(--lh-surface-2)]/60">
                                <div className="flex items-center gap-2 text-xs font-mono text-[var(--lh-muted)]">
                                    <Layers className="h-3.5 w-3.5 text-[var(--lh-accent)]" />
                                    <span>
                                        {activeProject.id} / {activeProject.name}
                                    </span>
                                </div>
                                <a
                                    href={activeProject.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--lh-ink)] hover:text-[var(--lh-accent)] transition-colors"
                                >
                                    <span>访问项目</span>
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            </div>

                            {activeProject.image ? (
                                <div className="relative aspect-[16/9] w-full bg-[var(--lh-surface-2)] border-b border-[var(--lh-border)] overflow-hidden">
                                    <Image
                                        src={activeProject.image}
                                        alt={activeProject.imageAlt || activeProject.name}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="object-cover object-top"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-[16/9] w-full bg-[var(--lh-surface-2)]/50 border-b border-[var(--lh-border)] flex flex-col items-center justify-center p-6 text-center">
                                    <div className="h-10 w-10 rounded-lg border border-[var(--lh-border)] bg-[var(--lh-surface)] flex items-center justify-center mb-3">
                                        <Cpu className="h-5 w-5 text-[var(--lh-accent)]" />
                                    </div>
                                    <div className="text-sm font-medium text-[var(--lh-ink)]">
                                        {activeProject.name}
                                    </div>
                                    <div className="text-xs text-[var(--lh-muted)] mt-1 max-w-sm">
                                        {activeProject.tagline}
                                    </div>
                                </div>
                            )}

                            <div className="p-5 space-y-4">
                                <p className="text-sm text-[var(--lh-muted)] leading-relaxed">
                                    {activeProject.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {activeProject.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-md border border-[var(--lh-border)] bg-[var(--lh-surface-2)]/70 px-2.5 py-1 text-[11px] font-mono text-[var(--lh-muted)]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
