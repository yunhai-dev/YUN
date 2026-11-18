"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResourceCard, type BlogResourceSummary } from "@/components/blog/ResourceCard";
import { CategoryFeatureCarousel } from "@/components/blog/CategoryFeatureCarousel";

interface ClaudeResourcesBrowserProps {
  allPosts: BlogResourceSummary[];
}

const INITIAL_COUNT = 11; // 1 featured (2 cols) + 1 normal (1 col) + 9 normal (3x3) = 11
const LOAD_MORE_STEP = 9;

export function ClaudeResourcesBrowser({ allPosts }: ClaudeResourcesBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    if (!showFilters) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFilters(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showFilters]);

  // All tags for the filter drawer, ordered by usage.
  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of allPosts) {
      for (const t of post.tags || []) {
        const trimmed = t.trim();
        if (trimmed) counts.set(trimmed, (counts.get(trimmed) || 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN"))
      .map(([name, count]) => ({ name, count }));
  }, [allPosts]);

  // Carousel featured posts (5 posts)
  const carouselPosts = useMemo(() => allPosts.slice(0, 5), [allPosts]);

  const hasActiveFilter = !!activeTag || !!searchQuery.trim();

  // Filtered list for grid. While filtering, the carousel is hidden so every match is reachable.
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const featuredSlugs = hasActiveFilter
      ? new Set<string>()
      : new Set(carouselPosts.map((post) => post.slug));
    return allPosts.filter((post) => {
      if (featuredSlugs.has(post.slug)) return false;

      if (activeTag) {
        const tags = (post.tags || []).map((t) => t.trim());
        if (!tags.includes(activeTag)) return false;
      }

      if (q) {
        const hay = `${post.title} ${post.excerpt || ""} ${post.category} ${(post.tags || []).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [allPosts, carouselPosts, activeTag, searchQuery, hasActiveFilter]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const remaining = Math.max(0, filteredPosts.length - visiblePosts.length);
  const matchCount = hasActiveFilter ? filteredPosts.length : allPosts.length;

  return (
    <section className="pt-12 md:pt-14 pb-24">
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10">
        {/* Book-Spine Featured Carousel */}
        {!hasActiveFilter && <CategoryFeatureCarousel posts={carouselPosts} />}

        {/* Toolbar: Search + Tag Filters */}
        <div className="mt-14 lg:mt-20 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 min-w-0 max-w-sm">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(INITIAL_COUNT);
                }}
                placeholder="搜索文章标题、摘要或技术关键词…"
                aria-label="搜索文章"
                className="w-full h-11 pl-10 pr-9 rounded-xl border border-white/55 bg-white/30 backdrop-blur-xl backdrop-saturate-150 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:outline-none focus-visible:outline-none focus:bg-white/45 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="清空搜索"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              aria-expanded={showFilters}
              onClick={() => setShowFilters(true)}
              className={cn(
                "h-11 px-4 rounded-xl border border-white/55 text-sm font-medium inline-flex items-center justify-center gap-2 backdrop-blur-xl backdrop-saturate-150 transition-colors cursor-pointer shrink-0 sm:ml-auto",
                showFilters || activeTag
                  ? "bg-white/55 text-foreground"
                  : "bg-white/30 text-foreground hover:bg-white/45"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>标签筛选</span>
              {activeTag && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-foreground/15">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Tag Filter Drawer */}
          <div
            className={cn("fixed inset-0 z-[60]", showFilters ? "" : "pointer-events-none")}
            aria-hidden={!showFilters}
            inert={!showFilters}
          >
            <div
              aria-hidden="true"
              onClick={() => setShowFilters(false)}
              className={cn(
                "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
                showFilters ? "opacity-100" : "opacity-0"
              )}
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="标签筛选"
              className={cn(
                "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/50 bg-background/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out",
                showFilters ? "translate-x-0" : "translate-x-full"
              )}
            >
              <div className="flex items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">标签筛选</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    共 {allTags.length} 个标签，按使用频率排序
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  aria-label="关闭标签筛选"
                  className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  {allTags.map(({ name, count }) => {
                    const selected = activeTag === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          setActiveTag(selected ? null : name);
                          setVisibleCount(INITIAL_COUNT);
                        }}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs border transition-colors cursor-pointer",
                          selected
                            ? "border-foreground/20 bg-foreground text-background"
                            : "border-border/70 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        )}
                      >
                        {name}
                        <span className="ml-1.5 tabular-nums opacity-60">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-border/60 px-5 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTag(null);
                    setVisibleCount(INITIAL_COUNT);
                  }}
                  disabled={!activeTag}
                  className="h-10 shrink-0 rounded-xl border border-border/70 px-4 text-sm text-foreground transition-colors hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  重置
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="h-10 flex-1 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 cursor-pointer"
                >
                  查看 {matchCount} 篇文章
                </button>
              </div>
            </aside>
          </div>

          <p className="text-xs text-muted-foreground mt-3 tabular-nums">
            当前显示 {visiblePosts.length} / 共 {filteredPosts.length} 篇文章
          </p>
        </div>

        {/* 3-Column Resource Grid (First card spans 2 cols with plate) */}
        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visiblePosts.map((post, idx) => {
              const isFirstFeatured = idx === 0;
              return (
                <ResourceCard
                  key={post.slug}
                  post={post}
                  featured={isFirstFeatured}
                  accentIndex={idx}
                  className={isFirstFeatured ? "md:col-span-2" : undefined}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 py-16 text-center">
            <p className="text-sm text-muted-foreground mb-3">没有找到匹配的文章。</p>
            <button
              type="button"
              onClick={() => {
                setActiveTag(null);
                setSearchQuery("");
              }}
              className="text-sm text-foreground hover:underline cursor-pointer"
            >
              清除筛选条件
            </button>
          </div>
        )}

        {/* View More Row */}
        {remaining > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
              className="px-6 py-2.5 rounded-xl border border-white/55 bg-white/30 backdrop-blur-xl backdrop-saturate-150 hover:bg-white/45 text-sm font-medium text-foreground transition-colors cursor-pointer"
            >
              查看更多（还有 {remaining} 篇）
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
