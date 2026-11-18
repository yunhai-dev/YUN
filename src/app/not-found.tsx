import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
    const links = [
        { href: "/", label: "首页" },
        { href: "/blog", label: "博客" },
        { href: "/docs", label: "文档" },
        { href: "/tools", label: "工具" },
    ];

    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-32 text-center">
                <div className="relative flex items-center justify-center mb-6">
                    <span className="font-serif-sc text-[8rem] sm:text-[10rem] leading-none font-medium text-primary/15 select-none">
                        404
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/noomo/images/clouisle-mark.svg"
                        alt="Clouisle Mark"
                        className="absolute w-16 h-16 sm:w-20 sm:h-20 opacity-85"
                    />
                </div>

                <h1 className="font-serif-sc text-2xl sm:text-3xl font-medium mb-3">
                    此页未曾抵达
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-10 leading-relaxed">
                    你访问的路径不存在、已被移动或链接已失效。
                </p>

                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
                    {links.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group inline-flex items-center gap-1.5 text-foreground/85 hover:text-primary border-b border-transparent hover:border-primary pb-0.5 transition-colors"
                        >
                            <span>{item.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    ))}
                </nav>
            </div>
        </main>
    );
}
