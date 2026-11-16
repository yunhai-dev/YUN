"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getAllTools } from "@/data/tools";
import { Tool } from "@/types/tools";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ToolsInstallButton } from "@/components/tools-install-button";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";

function ToolRow({ tool }: { tool: Tool }) {
    const { name, description, href, category } = tool;
    const isExternal = href.startsWith("http");

    const inner = (
        <div className="group flex items-start justify-between gap-6 py-5 px-2 -mx-2 rounded-lg hover:bg-primary/5 transition-colors">
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3 mb-1.5">
                    <h3 className="font-serif-sc text-lg font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {name}
                    </h3>
                    {category && (
                        <span className="text-[11px] text-muted-foreground/75 shrink-0">
                            {category}
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 leading-relaxed">
                    {description}
                </p>
            </div>
            <span className="mt-1 text-muted-foreground/50 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                {isExternal ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </span>
        </div>
    );

    if (isExternal) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block border-b border-border/45">
                {inner}
            </a>
        );
    }

    return (
        <Link href={href} className="block border-b border-border/45">
            {inner}
        </Link>
    );
}

const ToolsPage = () => {
    const allTools = useMemo(() => getAllTools(), []);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(allTools.map((tool) => tool.category).filter(Boolean));
        return ["全部", ...Array.from(uniqueCategories)] as string[];
    }, [allTools]);

    const getCategoryFromHash = () => {
        if (typeof window === "undefined") return "全部";
        const hash = window.location.hash.slice(1);
        if (!hash) return "全部";
        const decodedHash = decodeURIComponent(hash);
        return categories.includes(decodedHash) ? decodedHash : "全部";
    };

    const [selectedCategory, setSelectedCategory] = useState<string>("全部");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredTools, setFilteredTools] = useState<Tool[]>(allTools);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 30;

    useEffect(() => {
        setSelectedCategory(getCategoryFromHash());
        const handleHashChange = () => setSelectedCategory(getCategoryFromHash());
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        const newHash = category === "全部" ? "" : `#${encodeURIComponent(category)}`;
        window.history.pushState(null, "", `/tools${newHash}`);
    };

    useEffect(() => {
        const q = searchQuery.trim().toLowerCase();
        const base =
            selectedCategory === "全部"
                ? allTools
                : allTools.filter((tool) => tool.category === selectedCategory);
        const result = q
            ? base.filter(
                  (t) =>
                      t.name.toLowerCase().includes(q) ||
                      t.description.toLowerCase().includes(q)
              )
            : base;
        setFilteredTools(result);
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, allTools]);

    const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTools = filteredTools.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const getPageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
        } else if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) pageNumbers.push(i);
            pageNumbers.push("ellipsis", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pageNumbers.push(1, "ellipsis");
            for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
        } else {
            pageNumbers.push(1, "ellipsis");
            for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
            pageNumbers.push("ellipsis", totalPages);
        }
        return pageNumbers;
    };

    return (
        <main className="min-h-screen flex flex-col">
            <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 pt-28 md:pt-36 pb-24">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-border/60 mb-8">
                    <div>
                        <h1 className="font-serif-sc text-5xl sm:text-6xl font-medium tracking-tight mb-2">
                            {selectedCategory === "全部" ? "工具" : selectedCategory}
                        </h1>
                        <p className="text-sm text-muted-foreground tabular-nums">
                            精选开发工具与线上实用器 · {filteredTools.length} 项
                        </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        <label className="relative flex items-center h-10 px-3.5 rounded-xl border border-zinc-200/90 bg-zinc-50 focus-within:bg-zinc-100/70 focus-within:border-zinc-300 transition-colors">
                            <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="检索工具…"
                                className="bg-transparent text-sm w-44 sm:w-56 border-0 outline-none focus:outline-none focus-visible:outline-none ring-0 placeholder:text-muted-foreground/60"
                            />
                        </label>
                        <ToolsInstallButton />
                    </div>
                </header>

                {/* Typographic Category Tabs */}
                <nav className="flex flex-nowrap sm:flex-wrap gap-x-6 gap-y-2 overflow-x-auto pb-4 mb-6 border-b border-border/40">
                    {categories.map((category) => {
                        const active = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={cn(
                                    "relative text-sm whitespace-nowrap shrink-0 pb-1.5 transition-colors cursor-pointer",
                                    active
                                        ? "text-foreground font-medium"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {category}
                                {active && (
                                    <span className="absolute left-0 right-0 -bottom-px h-[1.5px] bg-foreground" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* 2-Column Architectural Index */}
                {currentTools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mb-12">
                        {currentTools.map((tool) => (
                            <ToolRow key={tool.id} tool={tool} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-16">
                        未找到匹配的工具。
                    </p>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                        className={cn(
                                            "cursor-pointer",
                                            currentPage === 1 && "pointer-events-none opacity-50"
                                        )}
                                    />
                                </PaginationItem>

                                {getPageNumbers().map((pageNum, index) => (
                                    <PaginationItem key={index}>
                                        {pageNum === "ellipsis" ? (
                                            <PaginationEllipsis />
                                        ) : (
                                            <PaginationLink
                                                onClick={() => setCurrentPage(pageNum as number)}
                                                isActive={currentPage === pageNum}
                                                className="cursor-pointer"
                                            >
                                                {pageNum}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                        className={cn(
                                            "cursor-pointer",
                                            currentPage === totalPages && "pointer-events-none opacity-50"
                                        )}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </main>
    );
};

export default ToolsPage;
