"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ResourceCard, type BlogResourceSummary } from "@/components/blog/ResourceCard";
import { CategoryFeatureCarousel } from "@/components/blog/CategoryFeatureCarousel";

interface ClaudeResourcesBrowserProps {
  allPosts: BlogResourceSummary[];
}

const INITIAL_COUNT = 11; // 1 featured (2 cols) + 1 normal (1 col) + 9 normal (3x3) = 11
const LOAD_MORE_STEP = 9;

export function ClaudeResourcesBrowser({ allPosts }: ClaudeResourcesBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<string>("全部文章");
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setSwitcherOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Extract main categories ordered by frequency
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of allPosts) {
      for (const raw of (post.category || "").split(",")) {
        const c = raw.trim();
        if (c) counts.set(c, (counts.get(c) || 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name]) => name);
  }, [allPosts]);

  // Extract top tags for Advanced Filters drawer
  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of allPosts) {
      for (const t of post.tags || []) {
        const trimmed = t.trim();
        if (trimmed) counts.set(trimmed, (counts.get(trimmed) || 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([name]) => name);
  }, [allPosts]);

  // Carousel featured posts (5 posts)
  const carouselPosts = useMemo(() => allPosts.slice(0, 5), [allPosts]);

  // Filtered list for grid
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allPosts.filter((post) => {
      if (activeCategory !== "全部文章") {
        const cats = (post.category || "")
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);
        if (!cats.includes(activeCategory)) return false;
      }

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
  }, [allPosts, activeCategory, activeTag, searchQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const remaining = Math.max(0, filteredPosts.length - visiblePosts.length);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setSwitcherOpen(false);
    setVisibleCount(INITIAL_COUNT);
  };

  const hasActiveFilter = activeCategory !== "全部文章" || !!activeTag || !!searchQuery.trim();

  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10">
        {/* Hero */}
        <header>
          <h1 className="font-serif-sc text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight leading-[1.1] text-foreground">
            博客文章
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-3.5 max-w-2xl leading-relaxed">
            来自云云亦海的技术专栏、AI 工程实践、每日科技早报与开源项目拆解。
          </p>
        </header>

        {/* Book-Spine Featured Carousel */}
        <CategoryFeatureCarousel posts={carouselPosts} />

        {/* Toolbar: Search + Category Switcher + Tag Filters */}
        <div className="mt-14 lg:mt-20 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(INITIAL_COUNT);
                }}
                placeholder="搜索文章标题、摘要或技术关键词…"
                aria-label="搜索文章"
                className="w-full h-11 pl-10 pr-9 rounded-xl border border-zinc-200/90 bg-zinc-50/90 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:outline-none focus-visible:outline-none focus:bg-zinc-100/80 transition-colors"
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

            {/* Category Dropdown */}
            <div ref={switcherRef} className="relative sm:w-44 shrink-0">
              <button
                type="button"
                aria-expanded={switcherOpen}
                onClick={() => setSwitcherOpen((v) => !v)}
                className={cn(
                  "w-full h-11 px-4 flex items-center gap-2 text-sm font-medium text-foreground bg-zinc-50/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 transition-colors cursor-pointer",
                  switcherOpen
                    ? "rounded-t-xl border-b-zinc-200/60 dark:border-b-zinc-800"
                    : "rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
                )}
              >
                <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="flex-1 text-left truncate">{activeCategory}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0",
                    switcherOpen && "rotate-180"
                  )}
                />
              </button>

              {switcherOpen && (
                <ul className="absolute left-0 right-0 top-full z-30 max-h-80 overflow-y-auto rounded-b-xl border border-t-0 border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-2 shadow-lg">
                  <li className="px-2">
                    <button
                      type="button"
                      onClick={() => handleSelectCategory("全部文章")}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                        activeCategory === "全部文章"
                          ? "bg-zinc-100 dark:bg-zinc-800 font-medium text-foreground"
                          : "text-foreground/80 hover:bg-zinc-100/70 dark:hover:bg-zinc-900"
                      )}
                    >
                      <span>全部文章</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  </li>

                  <li role="separator" className="my-1.5 border-t border-zinc-200/70 dark:border-zinc-800" />

                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat;
                    return (
                      <li key={cat} className="px-2">
                        <button
                          type="button"
                          onClick={() => handleSelectCategory(cat)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                            isSelected
                              ? "bg-zinc-100 dark:bg-zinc-800 font-medium text-foreground"
                              : "text-foreground/80 hover:bg-zinc-100/70 dark:hover:bg-zinc-900"
                          )}
                        >
                          <span>{cat}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <button
              type="button"
              aria-expanded={showFilters}
              onClick={() => setShowFilters((v) => !v)}
              className={cn(
                "h-11 px-4 rounded-xl border border-zinc-200/90 dark:border-zinc-800 text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0",
                showFilters || activeTag
                  ? "bg-zinc-100 dark:bg-zinc-800 text-foreground"
                  : "bg-zinc-50/90 dark:bg-zinc-900/60 text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900"
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

          {/* Expandable Tag Filters */}
          {showFilters && topTags.length > 0 && (
            <div className="mt-3 p-4 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/50 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">热门标签：</span>
              {topTags.map((tag) => {
                const selected = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setActiveTag(selected ? null : tag);
                      setVisibleCount(INITIAL_COUNT);
                    }}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs border transition-colors cursor-pointer",
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    )}
                  >
                    {tag}
                  </button>
                );
              })}
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("全部文章");
                    setActiveTag(null);
                    setSearchQuery("");
                    setVisibleCount(INITIAL_COUNT);
                  }}
                  className="ml-auto text-xs text-foreground hover:underline cursor-pointer"
                >
                  重置全部筛选
                </button>
              )}
            </div>
          )}

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
                setActiveCategory("全部文章");
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
              className="px-6 py-2.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-sm font-medium text-foreground transition-colors cursor-pointer"
            >
              查看更多（还有 {remaining} 篇）
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
