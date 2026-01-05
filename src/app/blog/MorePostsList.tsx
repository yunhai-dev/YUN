'use client';

import React, {useState} from 'react';
import {Link} from "next-view-transitions";
import {cn} from "@/lib/utils";
import {usePrefetch} from "@/components/prefetch-link";
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

interface RegularPostProps {
    slug: string;
    category: string;
    title: string;
    date?: string;
}

function RegularPost({slug, category, title, date}: RegularPostProps) {
    const prefetchProps = usePrefetch(`/blog/${slug}`);
    
    return (
        <Link
            href={`/blog/${slug}`}
            className="flex justify-between items-center hover:bg-muted transition-colors group w-full"
            {...prefetchProps}
        >
            <div className="grid grid-cols-8 items-center gap-4 w-full p-4 rounded-lg hover:bg-muted">
                <h3 className="col-span-4 text-md font-medium group-hover:text-foreground transition-colors">{title}</h3>
                <span className="col-span-2 text-sm text-muted-foreground text-center">{category}</span>
                {date && <span className="col-span-2 text-sm text-muted-foreground text-center">{date}</span>}
            </div>
        </Link>
    );
}

interface MorePostsListProps {
    recentPosts: BlogPost[];
}

export function MorePostsList({recentPosts}: MorePostsListProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;

    // 计算分页相关数据
    const totalPages = Math.ceil(recentPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = recentPosts.slice(startIndex, endIndex);

    // 生成页码数组
    const getPageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="mb-8">
            <h2 className="text-sm text-muted-foreground font-medium mb-2">More Posts</h2>
            <div className="w-full h-[2px] bg-border mb-4"></div>
            <div className="mb-6">
                {currentPosts.map((post, index) => (
                    <RegularPost
                        key={`recent-${post.slug}-${index}`}
                        slug={post.slug}
                        category={post.category}
                        title={post.title}
                        date={post.lastEdited}
                    />
                ))}
            </div>

            {/* 分页组件 */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    className={cn(
                                        "cursor-pointer",
                                        currentPage === 1 && "pointer-events-none opacity-50"
                                    )}
                                />
                            </PaginationItem>

                            {getPageNumbers().map((pageNum, index) => (
                                <PaginationItem key={index}>
                                    {pageNum === 'ellipsis' ? (
                                        <PaginationEllipsis/>
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
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
    );
}
