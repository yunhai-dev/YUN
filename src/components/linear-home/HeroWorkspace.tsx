"use client";

import {useState} from 'react';
import {Link} from 'next-view-transitions';
import {
    ArrowUpRight,
    Bot,
    CheckCircle2,
    CircleDot,
    Code2,
    FileText,
    FolderKanban,
    Layers,
    Sparkles,
    Terminal,
    Wrench,
} from 'lucide-react';

export interface HeroNoteItem {
    slug: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
}

interface WorkspaceRow {
    id: string;
    title: string;
    subtitle: string;
    status: 'Active' | 'Shipped' | 'Published' | 'Curated';
    tag: string;
    meta: string;
    href: string;
    external?: boolean;
    details: string[];
}

const PROJECT_ROWS: WorkspaceRow[] = [
    {
        id: 'CL-01',
        title: 'Clouisle',
        subtitle: '在云与思考之间的 AI 工作空间',
        status: 'Active',
        tag: 'AI Workspace',
        meta: 'Agent · RAG · Workflow',
        href: 'https://clouisle.asia/',
        external: true,
        details: [
            '将多模型 Agent、可视化工作流与个人/团队知识库整合在同一工作区',
            '支持工具调用、长上下文记忆与结构化输出',
            '持续迭代中的核心 AI 产品实践',
        ],
    },
    {
        id: 'CR-02',
        title: 'Crawlsy',
        subtitle: '现代化网络采集与爬虫调度平台',
        status: 'Shipped',
        tag: 'Open Source',
        meta: 'Python · Playwright · Queue',
        href: 'https://github.com/yunhai-dev/crawlsy',
        external: true,
        details: [
            '统一管理采集任务、节点状态、代理策略与结构化清洗管道',
            '内置可视化任务监控与失败重试机制',
            '面向工程化数据采集场景设计',
        ],
    },
    {
        id: 'D0-03',
        title: 'D0 Tools',
        subtitle: '给日常开发与数据标注一点轻盈',
        status: 'Shipped',
        tag: 'Dev & Data',
        meta: 'TypeScript · Desktop',
        href: 'https://github.com/yunhai-dev/D0-Tools',
        external: true,
        details: [
            '轻量、低心智负担的开发者效率与数据标注辅助工具集',
            '专注高频小任务：格式转换、数据集校验、快速预览',
            '开源可本地运行，零多余依赖',
        ],
    },
    {
        id: 'JH-04',
        title: 'Job Hive',
        subtitle: '智能化任务调度与信息聚合实验',
        status: 'Shipped',
        tag: 'Automation',
        meta: 'Full-Stack · Scheduler',
        href: 'https://github.com/yunhai-dev/job_hive',
        external: true,
        details: [
            '定时抓取、去重归档与个性化信息流过滤',
            '结合 LLM 自动提取关键字段与摘要',
        ],
    },
    {
        id: 'YC-05',
        title: 'Yun Chat',
        subtitle: '简洁流式 AI 对话与提示词实验场',
        status: 'Active',
        tag: 'AI Chat',
        meta: 'Next.js · AI SDK',
        href: '/chat/',
        external: false,
        details: [
            '站内直接体验流式对话、代码高亮与多轮上下文',
            '基于 Vercel AI SDK 与现代 React 架构构建',
        ],
    },
];

const TOOL_ROWS: WorkspaceRow[] = [
    {
        id: 'TL-01',
        title: 'AI 应用与效率精选',
        subtitle: '精选真正提升日常构建效率的 AI 工具',
        status: 'Curated',
        tag: 'AI Apps',
        meta: 'Clouisle · Cursor · Raycast',
        href: '/tools/',
        details: [
            '按实际使用体验筛选，而非盲目堆砌列表',
            '包含简介、适用场景与直达链接',
        ],
    },
    {
        id: 'TL-02',
        title: '大语言模型与推理导航',
        subtitle: '主流闭源与开源模型能力速览',
        status: 'Curated',
        tag: 'LLMs',
        meta: 'Claude · GPT · DeepSeek · Qwen',
        href: '/tools/',
        details: [
            '持续追踪编程、推理、多模态模型的迭代节奏',
            '帮助在不同任务中快速选型',
        ],
    },
    {
        id: 'TL-03',
        title: '全栈开发者工具链',
        subtitle: '前端、后端、终端与部署利器',
        status: 'Curated',
        tag: 'DevTools',
        meta: 'Next.js · Bun · Docker · RustFS',
        href: '/tools/',
        details: [
            '覆盖从本地编码到 CI/CD 与可观测性的完整链路',
            '支持站内快速检索与 PWA 离线访问',
        ],
    },
];

function StatusIcon({status}: {status: WorkspaceRow['status']}) {
    if (status === 'Active') {
        return <CircleDot className="h-3.5 w-3.5 text-[var(--lh-status-active)] shrink-0" aria-hidden="true" />;
    }
    if (status === 'Shipped' || status === 'Published') {
        return <CheckCircle2 className="h-3.5 w-3.5 text-[var(--lh-accent)] shrink-0" aria-hidden="true" />;
    }
    return <Sparkles className="h-3.5 w-3.5 text-[var(--lh-status-live)] shrink-0" aria-hidden="true" />;
}

export function HeroWorkspace({notes}: {notes: HeroNoteItem[]}) {
    const [activeTab, setActiveTab] = useState<'projects' | 'notes' | 'tools'>('projects');
    const [selectedId, setSelectedId] = useState<string>('CL-01');

    const noteRows: WorkspaceRow[] = notes.map((note, idx) => ({
        id: `NT-0${idx + 1}`,
        title: note.title,
        subtitle: note.excerpt,
        status: 'Published',
        tag: note.category.split(',')[0]?.trim() || 'Note',
        meta: note.date,
        href: `/blog/${note.slug}/`,
        details: [
            note.excerpt,
            `分类：${note.category} · 发布于 ${note.date}`,
        ],
    }));

    const rows =
        activeTab === 'projects'
            ? PROJECT_ROWS
            : activeTab === 'notes'
                ? noteRows
                : TOOL_ROWS;

    const selectedRow = rows.find((r) => r.id === selectedId) ?? rows[0];

    const handleTabChange = (tab: 'projects' | 'notes' | 'tools') => {
        setActiveTab(tab);
        if (tab === 'projects') setSelectedId(PROJECT_ROWS[0].id);
        if (tab === 'notes' && noteRows[0]) setSelectedId(noteRows[0].id);
        if (tab === 'tools') setSelectedId(TOOL_ROWS[0].id);
    };

    const triggerCommandPalette = () => {
        window.dispatchEvent(
            new KeyboardEvent('keydown', {
                key: 'k',
                metaKey: true,
                bubbles: true,
            })
        );
    };

    return (
        <div className="linear-hero-stage mt-12 md:mt-16">
            <div className="linear-hero-frame linear-window rounded-xl md:rounded-2xl overflow-hidden border border-[var(--lh-border)]">
                {/* Top App Chrome */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--lh-border)] bg-[var(--lh-surface-2)]/70">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--lh-border-strong)] shrink-0" aria-hidden="true" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--lh-border-strong)] shrink-0" aria-hidden="true" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--lh-border-strong)] shrink-0" aria-hidden="true" />
                        <span className="ml-2 text-xs font-mono text-[var(--lh-muted)] truncate">
                            yunhai.workspace
                        </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={triggerCommandPalette}
                            aria-label="打开快速搜索 (Command + K)"
                            className="hidden sm:inline-flex items-center gap-2 rounded-md border border-[var(--lh-border)] bg-[var(--lh-surface)] px-2.5 py-1 text-[11px] text-[var(--lh-muted)] hover:text-[var(--lh-ink)] hover:border-[var(--lh-border-strong)] transition-colors"
                        >
                            <span>快速搜索</span>
                            <kbd className="font-mono text-[10px] opacity-75">⌘K</kbd>
                        </button>
                    </div>
                </div>

                {/* App Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] text-left">
                    {/* Left Sidebar */}
                    <aside className="lg:col-span-3 min-w-0 border-b lg:border-b-0 lg:border-r border-[var(--lh-border)] p-3 md:p-4 bg-[var(--lh-surface)]">
                        <div className="flex items-center justify-between px-2 py-1.5 mb-3">
                            <div className="flex items-center gap-2">
                                <span className="h-5 w-5 rounded-md bg-[var(--lh-accent-soft)] text-[var(--lh-accent)] flex items-center justify-center text-[11px] font-semibold">
                                    Y
                                </span>
                                <span className="text-xs font-medium tracking-tight">云云亦海</span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--lh-status-live)]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--lh-status-live)] linear-live-dot" aria-hidden="true" />
                                LIVE
                            </span>
                        </div>

                        <div
                            role="tablist"
                            aria-label="工作区视图切换"
                            className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0"
                        >
                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === 'projects'}
                                onClick={() => handleTabChange('projects')}
                                className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors shrink-0 ${
                                    activeTab === 'projects'
                                        ? 'bg-[var(--lh-surface-hover)] text-[var(--lh-ink)] font-medium'
                                        : 'text-[var(--lh-muted)] hover:text-[var(--lh-ink)] hover:bg-[var(--lh-surface-2)]'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <FolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span>Projects · 作品</span>
                                </span>
                                <span className="font-mono tabular-nums text-[10px] opacity-75">{PROJECT_ROWS.length}</span>
                            </button>

                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === 'notes'}
                                onClick={() => handleTabChange('notes')}
                                className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors shrink-0 ${
                                    activeTab === 'notes'
                                        ? 'bg-[var(--lh-surface-hover)] text-[var(--lh-ink)] font-medium'
                                        : 'text-[var(--lh-muted)] hover:text-[var(--lh-ink)] hover:bg-[var(--lh-surface-2)]'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span>Notes · 文章</span>
                                </span>
                                <span className="font-mono tabular-nums text-[10px] opacity-75">{noteRows.length}</span>
                            </button>

                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === 'tools'}
                                onClick={() => handleTabChange('tools')}
                                className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors shrink-0 ${
                                    activeTab === 'tools'
                                        ? 'bg-[var(--lh-surface-hover)] text-[var(--lh-ink)] font-medium'
                                        : 'text-[var(--lh-muted)] hover:text-[var(--lh-ink)] hover:bg-[var(--lh-surface-2)]'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span>Tools · 工具</span>
                                </span>
                                <span className="font-mono tabular-nums text-[10px] opacity-75">{TOOL_ROWS.length}</span>
                            </button>
                        </div>

                        <div className="hidden lg:block mt-6 pt-4 border-t border-[var(--lh-border)] px-2 space-y-2">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--lh-subtle)]">
                                Quick Links
                            </div>
                            <Link
                                href="/docs/"
                                className="flex items-center gap-2 py-1 text-xs text-[var(--lh-muted)] hover:text-[var(--lh-ink)] transition-colors"
                            >
                                <Layers className="h-3.5 w-3.5" />
                                <span>技术文档库</span>
                            </Link>
                            <Link
                                href="/chat/"
                                className="flex items-center gap-2 py-1 text-xs text-[var(--lh-muted)] hover:text-[var(--lh-ink)] transition-colors"
                            >
                                <Bot className="h-3.5 w-3.5" />
                                <span>AI Playground</span>
                            </Link>
                            <Link
                                href="/api/"
                                className="flex items-center gap-2 py-1 text-xs text-[var(--lh-muted)] hover:text-[var(--lh-ink)] transition-colors"
                            >
                                <Terminal className="h-3.5 w-3.5" />
                                <span>开放 API 接口</span>
                            </Link>
                        </div>
                    </aside>

                    {/* Center List */}
                    <div className="lg:col-span-5 min-w-0 border-b lg:border-b-0 lg:border-r border-[var(--lh-border)] divide-y divide-[var(--lh-border)]">
                        <div className="flex items-center justify-between px-4 py-2.5 text-[11px] font-mono text-[var(--lh-subtle)] bg-[var(--lh-surface-2)]/40">
                            <span>
                                {activeTab === 'projects'
                                    ? 'SELECTED WORKS'
                                    : activeTab === 'notes'
                                        ? 'RECENT NOTES'
                                        : 'CURATED STACK'}
                            </span>
                            <span>STATUS</span>
                        </div>
                        {rows.length === 0 ? (
                            <div className="px-4 py-8 text-center text-xs text-[var(--lh-muted)]">
                                暂无记录，前往博客查看更多内容。
                            </div>
                        ) : (
                            rows.map((row) => {
                                const isSelected = selectedRow?.id === row.id;
                                return (
                                    <button
                                        key={row.id}
                                        type="button"
                                        aria-current={isSelected ? 'true' : undefined}
                                        onClick={() => setSelectedId(row.id)}
                                        className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                                            isSelected
                                                ? 'bg-[var(--lh-surface-hover)]'
                                                : 'hover:bg-[var(--lh-surface-2)]/60'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <StatusIcon status={row.status} />
                                            <span className="font-mono tabular-nums text-[11px] text-[var(--lh-subtle)] shrink-0">
                                                {row.id}
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium truncate">
                                                {row.title}
                                            </span>
                                        </div>
                                        <span className="shrink-0 rounded-full border border-[var(--lh-border)] px-2 py-0.5 text-[10px] font-mono text-[var(--lh-muted)]">
                                            {row.tag}
                                        </span>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    {/* Right Inspector */}
                    {selectedRow ? (
                        <div className="lg:col-span-4 min-w-0 p-5 flex flex-col justify-between bg-[var(--lh-surface-2)]/25">
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="font-mono tabular-nums text-[11px] text-[var(--lh-accent)]">
                                        {selectedRow.id} · {selectedRow.status}
                                    </span>
                                    <span className="font-mono tabular-nums text-[11px] text-[var(--lh-subtle)] truncate">
                                        {selectedRow.meta}
                                    </span>
                                </div>
                                <h3 className="text-base font-medium tracking-tight mb-1.5">
                                    {selectedRow.title}
                                </h3>
                                <p className="text-xs text-[var(--lh-muted)] leading-relaxed mb-4">
                                    {selectedRow.subtitle}
                                </p>
                                <div className="space-y-2 border-t border-[var(--lh-border)] pt-4">
                                    {selectedRow.details.map((line, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs text-[var(--lh-muted)] leading-relaxed">
                                            <Code2 className="h-3.5 w-3.5 text-[var(--lh-subtle)] shrink-0 mt-0.5" aria-hidden="true" />
                                            <span>{line}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 pt-3 border-t border-[var(--lh-border)] flex items-center justify-between">
                                <span className="text-[11px] text-[var(--lh-subtle)] font-mono">
                                    {selectedRow.tag}
                                </span>
                                {selectedRow.external ? (
                                    <a
                                        href={selectedRow.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-medium text-[var(--lh-ink)] hover:text-[var(--lh-accent)] transition-colors"
                                    >
                                        <span>打开项目</span>
                                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </a>
                                ) : (
                                    <Link
                                        href={selectedRow.href}
                                        className="inline-flex items-center gap-1 text-xs font-medium text-[var(--lh-ink)] hover:text-[var(--lh-accent)] transition-colors"
                                    >
                                        <span>查看详情</span>
                                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="lg:col-span-4 min-w-0 p-5 flex items-center justify-center text-xs text-[var(--lh-muted)] bg-[var(--lh-surface-2)]/25">
                            选择左侧条目以查看详情
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
