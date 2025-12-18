"use client";

import {useEffect, useMemo, useState} from 'react';
import {ChevronDown, ChevronRight, List, Menu, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import type {TableOfContents as TocItem} from "@/lib/markdown";
import {Link} from "next-view-transitions"
import MarkdownView from '@/components/markdown-view';
import {DocItem} from "@/data/docs-navigation";
import {useToast} from "@/hooks/use-toast";

interface DocsClientProps {
    allDocs: DocItem[];
    currentSlug: string;
    contentHtml: string;
    headings: TocItem[];
    title: string;
}

function DocNavItem({
                        doc,
                        currentSlug,
                        level,
                    }: {
    doc: DocItem;
    currentSlug: string;
    level: number;
}) {
    const isActive = doc.slug === currentSlug;
    const hasChildren = !!doc.items?.length;

    // 自动展开含有当前项的父级
    const shouldBeOpen = currentSlug.startsWith(doc.slug);
    const [open, setOpen] = useState(shouldBeOpen);

    useEffect(() => {
        if (shouldBeOpen) setOpen(true);
    }, [shouldBeOpen]);

    return (
        <div className="space-y-1">
            <div
                className={`flex items-center cursor-pointer pl-${level} ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'} text-sm py-1`}
                onClick={() => hasChildren ? setOpen(!open) : null}
            >
                {hasChildren ? (
                    <span className="flex-1 block" onClick={() => setOpen(!open)}>
                        {doc.title}
                    </span>
                ) : (
                    <Link href={`/docs/${doc.slug}`} className="flex-1 block">
                        {doc.title}
                    </Link>
                )}
                {hasChildren && (
                    <span className="ml-1">
                        {open ? <ChevronDown className="w-4 h-4"/> : <ChevronRight className="w-4 h-4"/>}
                    </span>
                )}
            </div>
            {hasChildren && (
                <div
                    className={`ml-1 border-l border-border pl-2 overflow-hidden transition-all duration-300 ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{
                        // 让动画更流畅
                        transitionProperty: 'max-height, opacity',
                    }}
                >
                    {open && doc.items!.map((child) => (
                        <DocNavItem key={child.slug} doc={child} currentSlug={currentSlug} level={level + 1}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export function DocNavigation({
                                  docs,
                                  currentSlug,
                                  className,
                              }: {
    docs: DocItem[];
    currentSlug: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <div className="sticky top-0 border-r pt-[64px] h-screen pointer-events-auto">
                <nav
                    className="scroll-container hover:overflow-auto space-y-1 overflow-y-auto max-h-[calc(100vh-64px)] scrollbar scrollbar-thumb-gray-700 scrollbar-track-transparent pr-4 py-4">
                    {docs.map((doc) => (
                        <DocNavItem key={doc.slug} doc={doc} currentSlug={currentSlug} level={0}/>
                    ))}
                </nav>
            </div>
        </div>
    );
}

// 构建嵌套的 TOC 结构
interface TocNode extends TocItem {
    children: TocNode[];
}

function buildTocTree(headings: TocItem[]): TocNode[] {
    const root: TocNode[] = [];
    const stack: TocNode[] = [];

    headings.forEach((heading) => {
        const node: TocNode = { ...heading, children: [] };

        // 找到合适的父节点
        while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
            stack.pop();
        }

        if (stack.length === 0) {
            root.push(node);
        } else {
            stack[stack.length - 1].children.push(node);
        }

        stack.push(node);
    });

    return root;
}

// 检查节点或其子节点是否包含活跃的 ID
function containsActiveId(node: TocNode, activeId: string | null): boolean {
    if (node.id === activeId) return true;
    return node.children.some((child) => containsActiveId(child, activeId));
}

function TocItemComponent({
    node,
    activeId,
    expandedIds,
    onToggle,
    level = 0,
}: {
    node: TocNode;
    activeId: string | null;
    expandedIds: Set<string>;
    onToggle: (id: string) => void;
    level?: number;
}) {
    const hasChildren = node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const isActive = activeId === node.id;
    const containsActive = containsActiveId(node, activeId);

    return (
        <div className="space-y-0.5">
            <div className="flex items-center group">
                {hasChildren && (
                    <button
                        onClick={() => onToggle(node.id)}
                        className="p-0.5 mr-1 rounded hover:bg-muted/50 transition-colors"
                        aria-label={isExpanded ? '折叠' : '展开'}
                    >
                        {isExpanded ? (
                            <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        ) : (
                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                        )}
                    </button>
                )}
                {!hasChildren && <span className="w-4 mr-1" />}
                <a
                    id={`table-toc-${node.id}`}
                    href={`#${node.id}`}
                    className={`py-1 flex-1 transition-all block text-[13px] hover:text-foreground truncate ${
                        isActive
                            ? 'text-foreground font-medium'
                            : containsActive
                            ? 'text-foreground/80'
                            : 'text-muted-foreground'
                    }`}
                    title={node.title}
                >
                    {node.title}
                </a>
            </div>
            {hasChildren && (
                <div
                    className={`ml-2 border-l border-border pl-2 overflow-hidden transition-all duration-200 ${
                        isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    {node.children.map((child) => (
                        <TocItemComponent
                            key={child.id}
                            node={child}
                            activeId={activeId}
                            expandedIds={expandedIds}
                            onToggle={onToggle}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function TableOfContents({headings, className}: { headings: TocItem[]; className?: string }) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    // 构建树形结构
    const tocTree = useMemo(() => buildTocTree(headings), [headings]);

    // 自动展开包含活跃项的父节点
    useEffect(() => {
        if (!activeId) return;

        const newExpandedIds = new Set(expandedIds);
        let changed = false;

        const expandParents = (nodes: TocNode[]): boolean => {
            for (const node of nodes) {
                if (node.id === activeId) return true;
                if (node.children.length > 0) {
                    if (expandParents(node.children)) {
                        if (!newExpandedIds.has(node.id)) {
                            newExpandedIds.add(node.id);
                            changed = true;
                        }
                        return true;
                    }
                }
            }
            return false;
        };

        expandParents(tocTree);
        if (changed) {
            setExpandedIds(newExpandedIds);
        }
    }, [activeId, tocTree]);

    useEffect(() => {
        if (typeof window === 'undefined') return; // SSR 保护

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleHeadings = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visibleHeadings.length > 0) {
                    setActiveId(visibleHeadings[0].target.id);
                }
            },
            {
                rootMargin: '0% 0px -60% 0px',
                threshold: 0,
            }
        );

        // 确保 heading 元素已挂载再注册
        const observedElements: HTMLElement[] = [];
        setTimeout(() => {
            headings.forEach((heading) => {
                const el = document.getElementById(heading.id);
                if (el) {
                    observer.observe(el);
                    observedElements.push(el);
                }
            });
        }, 0);

        return () => {
            observedElements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, [headings]);

    const handleToggle = (id: string) => {
        setExpandedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    if (headings.length === 0) return null;

    return (
        <div className={className}>
            <div className="sticky top-0 pt-[64px] h-screen pointer-events-auto">
                <nav
                    className="py-4 space-y-1 pl-2 overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pr-4">
                    {tocTree.map((node) => (
                        <TocItemComponent
                            key={node.id}
                            node={node}
                            activeId={activeId}
                            expandedIds={expandedIds}
                            onToggle={handleToggle}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
}

function MobileNavigation({isOpen, onClose, docs, currentSlug}: {
    isOpen: boolean;
    onClose: () => void;
    docs: DocItem[];
    currentSlug: string;
}) {
    return (
        <div
            className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-200 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={onClose}
        >
            <div
                className={`fixed top-0 pl-4 left-0 w-64 bg-background shadow-xl border-r border-border transition-transform duration-200 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                    aria-label="Close Sidebar"
                >
                    <X className="h-5 w-5"/>
                </Button>
                <DocNavigation docs={docs} currentSlug={currentSlug}/>
            </div>
        </div>
    );
}

function MobileTOC({isOpen, onClose, headings}: {
    isOpen: boolean;
    onClose: () => void;
    headings: TocItem[];
}) {
    return (
        <div
            className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-200 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={onClose}
        >
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-background p-6 pt-20 overflow-y-auto shadow-xl border-l border-border transition-transform duration-200 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                    aria-label="Close Table of Contents"
                >
                    <X className="h-5 w-5"/>
                </Button>
                <TableOfContents headings={headings}/>
            </div>
        </div>
    );
}

function MobileControls({onToggleSidebar, onToggleTOC, isSidebarOpen, isTocOpen}: {
    onToggleSidebar: () => void;
    onToggleTOC: () => void;
    isSidebarOpen: boolean;
    isTocOpen: boolean;
}) {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 lg:hidden">
            <Button
                size="icon"
                onClick={onToggleTOC}
                className="rounded-full shadow-lg"
                aria-label="Toggle Table of Contents"
            >
                {isTocOpen ? <X className="h-5 w-5"/> : <List className="h-5 w-5"/>}
            </Button>
            <Button
                size="icon"
                onClick={onToggleSidebar}
                className="rounded-full shadow-lg"
                aria-label="Toggle Sidebar"
            >
                {isSidebarOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
            </Button>
        </div>
    );
}




export function DocsClient({allDocs, title, currentSlug, contentHtml, headings}: DocsClientProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTocOpen, setIsTocOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const {toast} = useToast()


    useEffect(() => {
        setIsMounted(true);
        const handleCopyClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const btn = target.closest('.copy-btn') as HTMLElement | null;
            if (btn) {
                const code = decodeURIComponent(btn.getAttribute('data-code') || '');
                navigator.clipboard.writeText(code);
                toast({
                    title: '代码已复制',
                    description: '代码已复制到剪贴板',
                    duration: 2000,
                });
            }
        }
        window.addEventListener('click', handleCopyClick as EventListener);
        return () => {
            window.removeEventListener('click', handleCopyClick as EventListener);
        };
    }, [toast])

    const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleToggleTOC = () => setIsTocOpen(!isTocOpen);
    const handleCloseSidebar = () => setIsSidebarOpen(false);
    const handleCloseTOC = () => setIsTocOpen(false);

    const renderContent = useMemo(() => {
        if (!contentHtml) {
            return (
                <div className="text-red-500">
                    文档内容为空，请检查文档文件。
                </div>
            );
        }

        return (
            <MarkdownView contentHtml={contentHtml}/>
        );
    }, [contentHtml])

    // 如果没有当前文档且文档列表为空，显示提示信息
    if (!currentSlug && allDocs.length === 0) {
        return (
            <div className="flex-1 pt-32 pb-24">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="text-red-500">
                        暂无文档内容。
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <div className="container max-w-7xl mx-auto px-4 relative">
                {isMounted && (
                    <MobileControls
                        onToggleSidebar={handleToggleSidebar}
                        onToggleTOC={handleToggleTOC}
                        isSidebarOpen={isSidebarOpen}
                        isTocOpen={isTocOpen}
                    />
                )}

                <div className="flex">
                    {/* Desktop Sidebar */}
                    <DocNavigation
                        docs={allDocs}
                        currentSlug={currentSlug}
                        className="hidden lg:block w-48 shrink-0 mr-8"
                    />

                    {/* Mobile Sidebar */}
                    <MobileNavigation
                        isOpen={isSidebarOpen}
                        onClose={handleCloseSidebar}
                        docs={allDocs}
                        currentSlug={currentSlug}
                    />

                    {/* Main Content */}
                    <article className="flex-1 min-w-0 px-0 lg:px-4 mt-32 mb-[50vh]">
                        {/* add title*/}
                        <h1 className="text-4xl font-bold">{title}</h1>
                        <div className="w-full h-[1px] bg-gray-500 my-8"></div>
                        {renderContent}
                    </article>

                    {/* Desktop TOC */}
                    <TableOfContents
                        headings={headings}
                        className="hidden lg:block w-48 ml-8 shrink-0"
                    />

                    {/* Mobile TOC */}
                    <MobileTOC
                        isOpen={isTocOpen}
                        onClose={handleCloseTOC}
                        headings={headings}
                    />
                </div>
            </div>
        </div>
    );
}
