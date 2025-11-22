// src/app/tools/page.tsx
"use client"; // 添加 use client 指令

import React, {useEffect, useMemo, useState} from 'react'; // 引入 useState, useEffect, useMemo
import {getAllTools} from '@/data/tools';
import {Tool} from "@/types/tools";
import {cn} from "@/lib/utils";
import {Link} from "next-view-transitions"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

// ToolCard 组件保持不变...
interface ToolCardProps {
    tool: Tool;
}

function ToolCard({tool}: ToolCardProps) {
    const {name, description, href, category} = tool; // 移除 imageUrl
    const isExternal = href.startsWith('http');

    const cardContent = (
        <div
            className="block rounded-lg border border-white/5 bg-card overflow-hidden p-1 h-full transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:-translate-y-1 relative group/card">
            {/* 荧光背景层 */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"/>

            {/* 内容区域 */}
            <div className="p-4 relative z-10">
                {category && <div className="text-sm text-muted-foreground mb-2">{category}</div>}
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            </div>
        </div>
    );

    if (isExternal) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="h-full group">
                {cardContent}
            </a>
        );
    } else {
        return (
            <Link href={href} className="h-full group">
                {cardContent}
            </Link>
        );
    }
}


// 更新 ToolsPage 组件以包含筛选逻辑
const ToolsPage = () => {
    const allTools = useMemo(() => getAllTools(), []); // 获取所有工具数据，使用 useMemo 避免重复计算
    const [selectedCategory, setSelectedCategory] = useState<string>('全部'); // 状态：当前选中的分类
    const [filteredTools, setFilteredTools] = useState<Tool[]>(allTools); // 状态：筛选后的工具列表
    const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
    const itemsPerPage = 30; // 每页显示的工具数量

    // 提取所有唯一的分类，并添加 "全部" 选项
    const categories = useMemo(() => {
        const uniqueCategories = new Set(allTools.map(tool => tool.category).filter(Boolean)); // 过滤掉 undefined 或空字符串
        return ['全部', ...Array.from(uniqueCategories)] as string[];
    }, [allTools]);

    // 当选中的分类改变时，更新筛选后的工具列表并重置页码
    useEffect(() => {
        if (selectedCategory === '全部') {
            setFilteredTools(allTools);
        } else {
            setFilteredTools(allTools.filter(tool => tool.category === selectedCategory));
        }
        setCurrentPage(1); // 重置到第一页
        window.scrollTo({top: 0, behavior: 'smooth'}); // 滚动到页面顶部
    }, [selectedCategory, allTools]);

    // 计算分页相关数据
    const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTools = filteredTools.slice(startIndex, endIndex);

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
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32 pb-16">
                <div className="flex gap-6">
                    {/* 左侧分类栏 - 悬浮样式 */}
                    <aside className="w-48 flex-shrink-0 hidden lg:block">
                        <div className="sticky top-32 rounded-lg border border-white/5 bg-card/50 backdrop-blur-sm p-3">
                            <h2 className="text-sm font-semibold mb-3 px-2 text-muted-foreground">功能分类</h2>
                            <nav className="space-y-0.5">
                                {categories.map((category) => {
                                    const count = category === '全部'
                                        ? allTools.length
                                        : allTools.filter(t => t.category === category).length;

                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={cn(
                                                "w-full text-left px-3 py-1.5 rounded-md transition-all text-sm group",
                                                selectedCategory === category
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <span className="flex items-center justify-between gap-2">
                                                <span className="truncate">{category}</span>
                                                <span className={cn(
                                                    "text-xs tabular-nums flex-shrink-0",
                                                    selectedCategory === category
                                                        ? "opacity-80"
                                                        : "opacity-50 group-hover:opacity-70"
                                                )}>
                                                    {count}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* 右侧内容区 */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl font-bold">
                                {selectedCategory === '全部' ? '工具' : selectedCategory}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                共 {filteredTools.length} 个工具
                            </p>
                        </div>

                        {/* 使用 Grid 布局展示筛选后的工具卡片 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                            {currentTools.length > 0 ? (
                                currentTools.map((tool) => (
                                    <div className="h-full" key={tool.id}>
                                        <ToolCard tool={tool}/>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-full text-center text-muted-foreground py-12">
                                    该分类下暂无工具。
                                </p>
                            )}
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
                </div>
            </div>
        </main>
    );
};

export default ToolsPage;
