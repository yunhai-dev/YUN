"use client";

import React, { useState } from "react";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefetch } from "@/components/prefetch-link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPost {
    slug: string;
    category: string;
    title: string;
    lastEdited?: string;
}

function ArchiveRow({ slug, category, title, date }: { slug: string; category: string; title: string; date?: string }) {
    const prefetchProps = usePrefetch(`/blog/${slug}`);

    return (
        <Link
            href={`/blog/${slug}`}
            className="group grid grid-cols-1 md:grid-cols-12 items-baseline gap-2 md:gap-4 py-5 px-2 -mx-2 rounded-lg hover:bg-primary/5 transition-colors"
            {...prefetchProps}
        >
            <span className="md:col-span-2 text-xs text-muted-foreground tabular-nums">
                {date || "—"}
            </span>
            <span className="md:col-span-7 font-serif-sc text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                {title}
            </span>
            <span className="md:col-span-2 text-xs text-muted-foreground md:text-right">
                {category}
            </span>
            <span className="hidden md:flex md:col-span-1 justify-end text-muted-foreground/50 group-hover:text-primary transition-all group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
            </span>
        </Link>
    );
}

export function MorePostsList({ recentPosts }: { recentPosts: BlogPost[] }) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(recentPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPosts = recentPosts.slice(startIndex, startIndex + itemsPerPage);

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
        <section>
            <div className="flex items-baseline justify-between pb-4 border-b border-border/60">
                <h2 className="font-serif-sc text-xl font-medium">全部归档</h2>
                <span className="text-xs text-muted-foreground tabular-nums">
                    共 {recentPosts.length} 篇
                </span>
            </div>

            <div className="divide-y divide-border/40 mb-10">
                {currentPosts.map((post, index) => (
                    <ArchiveRow
                        key={`recent-${post.slug}-${index}`}
                        slug={post.slug}
                        category={post.category}
                        title={post.title}
                        date={post.lastEdited}
                    />
                ))}
            </div>

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
        </section>
    );
}
