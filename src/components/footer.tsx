"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

const quickLinks = [
    { href: "/blog/", label: "博客" },
    { href: "/docs/", label: "文档" },
    { href: "/tools/", label: "工具" },
    { href: "/api/", label: "API" },
    { href: "/media/", label: "音乐" },
    { href: "/about/", label: "关于" },
    { href: "/contact/", label: "联系" },
];

export function Footer() {
    const pathname = usePathname();
    const isStorytellingPage =
        pathname === "/" ||
        pathname.startsWith("/cases/") ||
        pathname === "/cases" ||
        pathname === "/contacts" ||
        pathname.startsWith("/contacts/");
    const isMediaWallPage = pathname === "/media" || pathname === "/media/";
    if (/^\/(api|docs|media|tools)\/[^/]+\/.*?$/.test(pathname) || pathname === "/chat/" || isMediaWallPage || isStorytellingPage) {
        return null;
    }

    return (
        <footer className="relative py-14 border-t border-zinc-200/80 dark:border-zinc-800">
            <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <p className="font-serif-sc text-base font-medium tracking-wide text-foreground">
                            YunHai · 云云亦海
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            发现具体问题 · 拆解构建 · 开源分享
                        </p>
                    </div>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-muted-foreground/80">
                    <p>
                        © {new Date().getFullYear()} YunHai ·{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                            href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.en"
                        >
                            CC BY-NC-SA 4.0
                        </a>
                    </p>
                    <div className="flex items-center gap-5">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/yunhai-dev" className="hover:text-foreground transition-colors">
                            GitHub
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://gitee.com/yun2hai" className="hover:text-foreground transition-colors">
                            Gitee
                        </a>
                        <a href="/rss.xml" className="hover:text-foreground transition-colors">
                            RSS
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://status.yhnotes.com/" className="hover:text-foreground transition-colors">
                            服务状态
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
