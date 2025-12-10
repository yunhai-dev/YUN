"use client";

import {Button} from "./ui/button";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import {Github, Hand, Loader2, Menu, X} from 'lucide-react';
import {Link} from "next-view-transitions"
import {STORAGE_HOST} from "@/data/baseUrl";
import {Command} from "@/components/command";
import {ThemeToggle} from "@/components/theme-toggle";
import EaseToolTip from "@/components/EaseToolTip";
import {useHandControl} from '@/context/HandControlContext';

const navLinks = [
    {href: "/blog/", text: "Blog"},
    {href: "/docs/", text: "Document"},
    {
        href: null,
        text: "Explore",
        children: [
            {
                title: "Tools",
                href: "/tools/",
                description: "Powerful tools for efficient development"
            },
            // {
            //     title: "Share",
            //     href: "/share/",
            //     description: "Share easily, collaborate happily"
            // },
            {
                title: "API",
                href: "/api/",
                description: "Explore our API, integrate with ease"
            },
            {
                title: "Music",
                href: "/media/",
                description: "Discover great music and enjoy it"
            },
            {
                title: "Anniversary",
                href: "/anniversary/",
                description: "Special moment"
            },
            {
                title: "Test",
                href: "/test/",
                description: "Testing can be fun too"
            },
        ]
    },
    {href: "/contact/", text: "Contact"},
    {href: "/about/", text: "About"},
];


export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
    const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
    const [isAtTop, setIsAtTop] = useState(true); // 新增
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const {isEnabled, toggleEnabled, isLoading} = useHandControl();

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };
        window.addEventListener('scroll', handleScroll);
        // 初始化
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (linkText: string) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setHoveredDropdown(linkText);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredDropdown(null);
        }, 150); // 150ms延迟
    };

    const mobileHandleClick = () => {
        setIsOpen(false);
    };

    return (
        <header
            className={cn(
                isAtTop
                    ? "top-0 left-0 right-0 border-b"
                    : "top-10 border max-w-7xl mx-auto left-0 right-0 rounded-full",
                "fixed z-50 h-16 py-3 bg-background/50 backdrop-blur-md transition-all duration-500 ease-in-out"
            )}
        >
            {/* Container: Relative for positioning button, center on mobile, space-between on desktop */}
            <div
                className={cn(
                    "container mx-auto px-4 relative flex items-center h-full",
                    "justify-center md:justify-between"
                )}>
                {/* Logo Link - Centered on mobile via container justify-center */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={`${STORAGE_HOST}/Avatar.webp`}
                        alt="YunHai Logo"
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                    />
                    <span className="font-semibold">YunHai</span>
                </Link>
                <nav className="hidden md:flex gap-2 items-center absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        link.children ? (
                            <div
                                key={link.text}
                                className="relative text-sm transition-colors"
                                onMouseEnter={() => handleMouseEnter(link.text)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span
                                    className={cn(
                                        "text-sm transition-colors hover:text-foreground cursor-pointer flex items-center gap-1 hover:bg-muted py-1 px-2 rounded-md min-h-[32px]",
                                        link.children.some(child => pathname === child.href) ? "text-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {link.text}
                                </span>
                                {/* 下拉菜单 */}
                                <div
                                    className={cn(
                                        "absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[60vw] bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl z-50 transition-all duration-150 p-2",
                                        hoveredDropdown === link.text ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                                    )}
                                    onMouseEnter={() => handleMouseEnter(link.text)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="grid grid-cols-3 gap-2 p-2">
                                        {link.children.map(child => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={cn(
                                                    "block p-4 rounded-md border border-border hover:bg-muted transition-colors group",
                                                    pathname === child.href ? "bg-muted" : ""
                                                )}
                                            >
                                                <div
                                                    className="font-medium text-foreground mb-2 group-hover:text-foreground transition-colors">
                                                    {child.title}
                                                </div>
                                                <div
                                                    className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors leading-relaxed">
                                                    {child.description}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm transition-colors hover:text-foreground hover:bg-muted py-1 px-4 rounded-md",
                                    pathname === link.href ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {link.text}
                            </Link>
                        )
                    ))}
                </nav>

                {/* Theme Toggle, Search And GitHub Icon */}
                <div className="flex gap-3">
                    <div className="hidden md:flex items-center">
                        <ThemeToggle/>
                    </div>
                    <div className="hidden md:flex items-center">
                        <Command hotkey={true}/>
                    </div>
                    <div className="hidden md:flex items-center">
                        <EaseToolTip tip={isEnabled ? "关闭手势控制" : "开启手势控制 (Beta)"}>
                            <button
                                onClick={toggleEnabled}
                                aria-label="Toggle Hand Control"
                                className={cn(
                                    "text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted flex items-center justify-center",
                                    isEnabled && "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-950/30"
                                )}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin"/>
                                ) : (
                                    <Hand className="h-[1.2rem] w-[1.2rem]"/>
                                )}
                            </button>
                        </EaseToolTip>
                    </div>
                    <div className="hidden md:flex items-center">
                        <EaseToolTip tip="GitHub">
                            <a
                                href="https://github.com/yunhai-dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted"
                            >
                                <Github className="h-[1.2rem] w-[1.2rem]"/>
                            </a>
                        </EaseToolTip>
                    </div>
                </div>

                {/* Mobile Menu Button: Positioned absolutely on mobile */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden flex gap-1">
                    <ThemeToggle/>
                    <div className="md:flex items-center">
                        <Command/>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        {isOpen ? <X className="h-[1.2rem] w-[1.2rem]"/> : <Menu className="h-[1.2rem] w-[1.2rem]"/>}
                    </Button>
                </div>

                {isOpen && (
                    <div
                        className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border md:hidden">
                        <div className="flex flex-col px-4 py-2">
                            {navLinks.map((link) => (
                                link.children ? (
                                    <div key={link.text}>
                                        <button
                                            className={cn(
                                                "py-2 text-sm w-full text-left flex items-center gap-1 transition-colors hover:text-foreground focus:outline-none",
                                                link.children.some(child => pathname === child.href) ? "text-foreground" : "text-muted-foreground"
                                            )}
                                            onClick={() => setOpenMobileDropdown(openMobileDropdown === link.text ? null : link.text)}
                                        >
                                            {link.text}
                                            <svg
                                                className={cn("w-[1.2rem] h-[1.2rem] ml-1 transition-transform", openMobileDropdown === link.text ? "rotate-180" : "")}
                                                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                                            </svg>
                                        </button>
                                        {openMobileDropdown === link.text && (
                                            <div className="pl-4">
                                                {link.children.map(child => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className={cn(
                                                            "block py-2 text-sm transition-colors hover:text-foreground",
                                                            pathname === child.href ? "text-foreground" : "text-muted-foreground"
                                                        )}
                                                        onClick={mobileHandleClick}
                                                    >
                                                        <div className="font-medium">{child.title}</div>
                                                        <div
                                                            className="text-xs text-muted-foreground mt-1">{child.description}</div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "py-2 text-sm transition-colors hover:text-foreground",
                                            pathname === link.href ? "text-foreground" : "text-muted-foreground"
                                        )}
                                        onClick={mobileHandleClick}
                                    >
                                        {link.text}
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                )}
                {/* Removed the extra wrapping div around logo and desktop nav */}
            </div>
            {/* End of container div */}
        </header>
    );
}
