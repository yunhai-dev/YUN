import {Link} from "next-view-transitions"
import {Button} from "@/components/ui/button";
import {Home, Search, FileText, Wrench} from "lucide-react";

export default function NotFound() {
    const popularLinks = [
        {href: "/blog", label: "博客文章", icon: FileText},
        {href: "/docs", label: "文档中心", icon: FileText},
        {href: "/tools", label: "在线工具", icon: Wrench},
    ];

    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-1 pt-32 pb-24 px-4 flex justify-center items-start">
                <div className="text-center max-w-lg">
                    {/* 404 Animation */}
                    <div className="relative mb-8">
                        <h1 className="text-8xl font-bold text-muted-foreground/20">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Search className="w-16 h-16 text-muted-foreground animate-pulse" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-semibold mb-4">页面未找到</h2>
                    <p className="text-muted-foreground mb-8">
                        抱歉，您访问的页面不存在、已被删除或链接已失效。
                    </p>
                    
                    {/* Main Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                        <Button asChild>
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                返回首页
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/docs" className="flex items-center gap-2">
                                <Search className="w-4 h-4" />
                                浏览文档
                            </Link>
                        </Button>
                    </div>
                    
                    {/* Popular Links */}
                    <div className="border-t border-border pt-8">
                        <p className="text-sm text-muted-foreground mb-4">或访问以下常用页面：</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {popularLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-violet-500/50 hover:bg-muted transition-colors text-sm"
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
