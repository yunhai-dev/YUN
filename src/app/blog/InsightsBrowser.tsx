"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { InsightCard, type InsightPostSummary } from "@/components/blog/InsightCard";

interface InsightsBrowserProps {
  allPosts: InsightPostSummary[];
  featuredCount?: number;
}

const PAGE_SIZE = 12;

export function InsightsBrowser({ allPosts, featuredCount = 4 }: InsightsBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<string>("全部");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  // Extract main categories ordered by frequency
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of allPosts) {
      const parts = (post.category || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      for (const p of parts) {
        counts.set(p, (counts.get(p) || 0) + 1);
      }
    }
    const sorted = Array.from(counts.entries())
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([name]) => name);
    return ["全部", ...sorted];
  }, [allPosts]);

  // When "全部" is active, skip the top featured posts so they aren't duplicated right below.
  // When a specific category is selected, show all matching posts across the archive.
  const filteredPosts = useMemo(() => {
    if (activeCategory === "全部") {
      return allPosts.slice(featuredCount);
    }
    return allPosts.filter((post) =>
      (post.category || "")
        .split(",")
        .map((s) => s.trim())
        .includes(activeCategory)
    );
  }, [allPosts, activeCategory, featuredCount]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const remaining = Math.max(0, filteredPosts.length - visiblePosts.length);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="mt-24 lg:mt-32">
      {/* Section Header + Category Filter + Full-width Bottom Hairline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-foreground/25 mb-10">
        <div className="flex items-baseline gap-3">
          <h2 className="font-serif-sc text-2xl sm:text-3xl lg:text-[28px] font-medium tracking-tight">
            全部文章
          </h2>
          <span className="text-sm text-muted-foreground tabular-nums">
            {filteredPosts.length} 篇
          </span>
        </div>

        <nav
          aria-label="文章分类筛选"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm lg:text-[15px]"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={cn(
                  "relative pb-1 transition-colors cursor-pointer",
                  isActive
                    ? "text-primary font-medium after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1.5px] after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3-Column Responsive Editorial Grid */}
      {visiblePosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 lg:gap-y-14">
          {visiblePosts.map((post, idx) => (
            <InsightCard
              key={post.slug}
              post={post}
              variant="grid"
              fallbackIndex={idx + 1}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground text-sm">
          该分类下暂无文章。
        </div>
      )}

      {/* Load More */}
      {remaining > 0 && (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="crystal-pill px-7 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            加载更多（还有 {remaining} 篇）
          </button>
        </div>
      )}
    </section>
  );
}
