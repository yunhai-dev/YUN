"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ChevronDown, Github, Hand, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { STORAGE_HOST } from "@/data/baseUrl";
import { Command } from "@/components/command";
import EaseToolTip from "@/components/EaseToolTip";
import { useHandControl } from "@/context/HandControlContext";

const exploreLinks = [
    { title: "工具 · Tools", href: "/tools/", description: "高效开发的实用工具集" },
    { title: "API · 接口", href: "/api/", description: "探索接口，轻松集成" },
    { title: "音乐 · Media", href: "/media/", description: "发现好音乐，尽情享受" },
    { title: "纪念日 · Days", href: "/anniversary/", description: "记录时间胶囊" },
    { title: "对话 · Chat", href: "/chat/", description: "AI 对话 Playground" },
    { title: "测试 · Lab", href: "/test/", description: "实验与交互测试" },
];

const primaryLinks = [
    { href: "/blog/", label: "Blog", zh: "博客" },
    { href: "/docs/", label: "Docs", zh: "文档" },
    { href: "/tools/", label: "Tools", zh: "工具" },
    { href: "/about/", label: "About", zh: "关于" },
    { href: "/contact/", label: "Contact", zh: "联系" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [exploreOpen, setExploreOpen] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { isEnabled, toggleEnabled, isLoading } = useHandControl();

    useEffect(() => {
        const handleScroll = () => setIsAtTop(window.scrollY < 24);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setExploreOpen(false);
    }, [pathname]);

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setExploreOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => setExploreOpen(false), 160);
    };

    const isPlayerPage = /^\/media\/[^/]+\/?$/.test(pathname);
    const isStorytellingPage =
        pathname === "/" ||
        pathname.startsWith("/cases/") ||
        pathname === "/cases" ||
        pathname === "/contacts" ||
        pathname.startsWith("/contacts/");
    if (isPlayerPage || isStorytellingPage) {
        return null;
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            <div
                className={cn(
                    "mx-auto transition-all duration-500 ease-out pointer-events-auto",
                    isAtTop
                        ? "max-w-[1440px] w-full px-5 md:px-10 pt-5 md:pt-7"
                        : "max-w-[1440px] w-[calc(100%-2.5rem)] md:w-[calc(100%-5rem)] mt-3 px-5 md:px-6 py-2.5 rounded-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800 shadow-sm"
                )}
            >
                <div className="flex items-center justify-between gap-4">
                    {/* Left Brand: Matches NoomoHeader */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80 shrink-0"
                    >
                        <Image
                            src={`${STORAGE_HOST}/Avatar.webp`}
                            alt="云云亦海 Avatar"
                            width={32}
                            height={32}
                            sizes="32px"
                            className="h-8 w-8 rounded-full object-cover ring-1 ring-primary/25"
                            priority
                        />
                        <span className="text-sm md:text-base font-medium tracking-tight">
                            YunHai <span className="font-serif-sc opacity-75">· 云云亦海</span>
                        </span>
                    </Link>

                    {/* Desktop Right Navigation: Airy editorial links matching NoomoHeader */}
                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex items-center gap-5">
                            {primaryLinks.map((link) => {
                                const isActive =
                                    pathname === link.href ||
                                    (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        data-active={isActive ? "true" : "false"}
                                        className={cn(
                                            "crystal-nav-link text-sm py-1 transition-colors",
                                            isActive
                                                ? "text-foreground font-medium"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <span>{link.label}</span>
                                        <span className="font-serif-sc opacity-75"> · {link.zh}</span>
                                    </Link>
                                );
                            })}

                            {/* Explore Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    type="button"
                                    className={cn(
                                        "crystal-nav-link text-sm py-1 inline-flex items-center gap-1 transition-colors cursor-pointer",
                                        exploreLinks.some((c) => pathname.startsWith(c.href))
                                            ? "text-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <span>更多</span>
                                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", exploreOpen && "rotate-180")} />
                                </button>

                                <div
                                    className={cn(
                                        "absolute right-0 top-full mt-3 w-[440px] bg-white dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl shadow-xl p-3 transition-all duration-200",
                                        exploreOpen
                                            ? "opacity-100 translate-y-0 pointer-events-auto"
                                            : "opacity-0 -translate-y-1 pointer-events-none"
                                    )}
                                >
                                    <div className="grid grid-cols-2 gap-2">
                                        {exploreLinks.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={cn(
                                                    "rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 hover:bg-zinc-100/90 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 p-3.5 block transition-colors",
                                                    pathname.startsWith(child.href) && "bg-zinc-100 dark:bg-zinc-800/80"
                                                )}
                                            >
                                                <div className="font-serif-sc text-sm font-medium text-foreground mb-1">
                                                    {child.title}
                                                </div>
                                                <div className="text-xs text-muted-foreground leading-relaxed">
                                                    {child.description}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Compact Utility Controls */}
                        <div className="flex items-center gap-1 pl-3 border-l border-border/50">
                            <Command hotkey={true} />
                            <EaseToolTip tip={isEnabled ? "关闭手势控制" : "开启手势控制 (Beta)"}>
                                <button
                                    onClick={toggleEnabled}
                                    aria-label="Toggle Hand Control"
                                    className={cn(
                                        "text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent/50 flex items-center justify-center",
                                        isEnabled && "text-primary bg-primary/10"
                                    )}
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Hand className="h-4 w-4" />
                                    )}
                                </button>
                            </EaseToolTip>
                            <EaseToolTip tip="GitHub">
                                <a
                                    href="https://github.com/yunhai-dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent/50"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                            </EaseToolTip>
                        </div>
                    </div>

                    {/* Mobile Controls + Frosted Menu Button matching NoomoHeader */}
                    <div className="flex md:hidden items-center gap-1.5">
                        <Command />
                        <button
                            type="button"
                            onClick={() => setIsOpen((v) => !v)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            className="rounded-full border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer"
                        >
                            {isOpen ? <X className="w-4 h-4" /> : "Menu"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Full-screen Frosted Mobile Drawer matching NoomoHeader */}
            <div
                className={cn(
                    "fixed inset-0 z-40 md:hidden flex flex-col justify-between px-8 py-24 backdrop-blur-2xl transition-all duration-400",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                style={{ background: "rgba(8, 10, 22, 0.86)" }}
            >
                <div />
                <nav className="flex flex-col items-center gap-6">
                    <Link
                        href="/"
                        className="font-serif-sc text-2xl text-white/90 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Home · 首页
                    </Link>
                    {primaryLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-serif-sc text-2xl text-white/90 hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label} · {link.zh}
                        </Link>
                    ))}
                    <div className="flex flex-wrap justify-center gap-3 pt-4">
                        {exploreLinks.slice(1, 5).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="px-3.5 py-1.5 rounded-full border border-white/20 text-xs text-white/80 hover:text-white hover:border-white/45 transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </nav>
                <div className="flex justify-center gap-10 text-sm text-white/60">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/yunhai-dev" className="hover:text-white">
                        GitHub
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://gitee.com/yun2hai" className="hover:text-white">
                        Gitee
                    </a>
                    <a href="/rss.xml" onClick={() => setIsOpen(false)} className="hover:text-white">
                        RSS
                    </a>
                </div>
            </div>
        </header>
    );
}
