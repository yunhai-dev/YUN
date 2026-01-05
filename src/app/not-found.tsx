import {Link} from "next-view-transitions"
import {Button} from "@/components/ui/button";
import {Home, Search, FileText, Wrench} from "lucide-react";

export default function NotFound() {
    const popularLinks = [
        {href: "/blog", label: "Blog Posts", icon: FileText},
        {href: "/docs", label: "Documentation", icon: FileText},
        {href: "/tools", label: "Tools", icon: Wrench},
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
                    
                    <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                    <p className="text-muted-foreground mb-8">
                        Sorry, the page you are looking for does not exist, has been removed, or the link is broken.
                    </p>
                    
                    {/* Main Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                        <Button asChild>
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/docs" className="flex items-center gap-2">
                                <Search className="w-4 h-4" />
                                Browse Docs
                            </Link>
                        </Button>
                    </div>
                    
                    {/* Popular Links */}
                    <div className="border-t border-border pt-8">
                        <p className="text-sm text-muted-foreground mb-4">Or visit these popular pages:</p>
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
