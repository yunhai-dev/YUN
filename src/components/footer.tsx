"use client";

import {Link} from "next-view-transitions"
import {Separator} from "./ui/separator";

import {usePathname} from "next/navigation";

const footerLinks = [
    {
        title: "Service",
        links: [
            {href: "https://rustfs-console.yhnotes.com/", label: "OSS"},
            {href: "https://status.yhnotes.com/", label: "Server Status"},
            {href: "https://monitor.yhnotes.com/", label: "Monitor Status"},
        ],
    },
    {
        title: "Project",
        links: [
            {href: "https://clouisle.asia", label: "Clouisle"},
            {href: "https://github.com/yunhai-dev/D0-Tools", label: "D0 Tools"},
            {href: "https://github.com/yunhai-dev/naive-for-qt", label: "Naive for Qt"},
            {href: "https://github.com/yunhai-dev/job_hive", label: "Job Hive"},
            {href: "https://github.com/yunhai-dev/crawlsy", label: "Crawlsy"},
            {href: "https://github.com/yunhai-dev/yundownload", label: "Yundownload"},
            {href: "https://github.com/yunhai-dev/YunChat", label: "Yun Chat"},
        ],
    },
    {
        title: "Resource",
        links: [
            {href: "/api/", label: "API"},
            {href: "/rss.xml", label: "RSS Feed"},
            {href: "/atom.xml", label: "Atom Feed"},
        ],
    },
    {
        title: "Contact",
        links: [
            {href: "https://github.com/yunhai-dev", label: "GitHub"},
            {href: "https://gitee.com/yun2hai", label: "Gitee"},
            {href: "mailto:yunhai@yhnotes.com", label: "Email"},
        ],
    },
    {
        title: "Help",
        links: [
            {href: "/contact/", label: "Support"},
        ]
    },
];

export function Footer() {
    const pathname = usePathname()
    if (/^\/(api|docs|media|tools)\/[^/]+\/.*?$/.test(pathname) || pathname === '/chat/') {
        return null;
    }
    return (
        <footer className="pb-16 pt-24 px-4 border-t border-white/5">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-medium mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        {
                                            link.href.startsWith("/") ? (
                                                <Link href={link.href}
                                                                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <Link
                                                    target={link.href.startsWith('http') ? '_blank' : ''}
                                                    href={link.href}
                                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    {link.label}
                                                </Link>
                                            )
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="bg-white/5 mb-8"/>

                <div className="text-sm text-muted-foreground flex justify-between flex-col md:flex-row gap-3">
                    <p>© {new Date().getFullYear()} YunHai. All rights reserved.</p>
                    <p>Sharing Agreement&nbsp;
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400"
                            href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.en">
                            (CC BY-NC-SA 4.0)
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
