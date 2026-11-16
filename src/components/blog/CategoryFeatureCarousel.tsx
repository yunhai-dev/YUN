"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResourceCard, type BlogResourceSummary } from "@/components/blog/ResourceCard";

interface CategoryFeatureCarouselProps {
  posts: BlogResourceSummary[];
}

const SPINE_COLORS = [
  "bg-[#cebdf8]", // lavender mist
  "bg-[#eabdf6]", // orchid blush
  "bg-[#a990f6]", // violet crystal
  "bg-[#9ec5f8]", // glacier blue
  "bg-[#b8c0d9]", // slate pearl
];

function ShelfDivider({ lean = "-1.5deg", edge = false }: { lean?: string; edge?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "hidden md:flex items-stretch gap-2 shrink-0 py-1",
        edge ? "px-1" : "px-2.5"
      )}
    >
      <span className={cn("rounded-[1px] bg-border/80", edge ? "w-[2px]" : "w-[3px]")} />
      <span
        className="w-[3px] rounded-[1px] bg-border/70 transition-transform"
        style={{ transform: `rotate(${lean})` }}
      />
      <span className="w-[5px] rounded-[1px] bg-border/60" />
    </div>
  );
}

export function CategoryFeatureCarousel({ posts }: CategoryFeatureCarouselProps) {
  const items = posts.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="精选文章"
      className="mt-10 lg:mt-14 relative"
    >
      {/* Desktop Book-Spine Shelf */}
      <div className="hidden md:flex items-stretch md:h-[360px]">
        <ShelfDivider lean="-1.5deg" edge />

        {items.map((post, idx) => {
          const isActive = idx === activeIndex;
          const lean = idx % 2 === 0 ? "-1.5deg" : "1.5deg";
          return (
            <React.Fragment key={post.slug}>
              <div
                className={cn(
                  "relative min-w-0 h-full overflow-hidden transition-[flex-grow,flex-basis,border-radius] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
                  isActive
                    ? "flex-1 rounded-2xl"
                    : "flex-[0_0_18px] hover:flex-[0_0_24px] rounded-[3px]"
                )}
              >
                {isActive ? (
                  <div className="h-full w-full min-w-[540px] lg:min-w-[640px]">
                    <ResourceCard
                      post={post}
                      featured
                      inCarousel
                      accentIndex={idx}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`查看精选文章 ${idx + 1}: ${post.title}`}
                    className={cn(
                      "w-full h-full cursor-pointer border-0 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary",
                      SPINE_COLORS[idx % SPINE_COLORS.length]
                    )}
                  />
                )}
              </div>

              {idx < items.length - 1 && <ShelfDivider lean={lean} />}
            </React.Fragment>
          );
        })}

        <ShelfDivider lean="1.5deg" edge />
      </div>

      {/* Mobile Single Card View */}
      <div className="md:hidden">
        <ResourceCard
          post={items[activeIndex]}
          featured
          inCarousel
          accentIndex={activeIndex}
        />
      </div>

      {/* Controls: Prev + Dots + Next */}
      {items.length > 1 && (
        <div className="flex items-center justify-between mt-5">
          <button
            type="button"
            onClick={goPrev}
            aria-label="上一篇精选"
            className="w-9 h-9 rounded-full border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`切换到第 ${idx + 1} 篇精选`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    isActive
                      ? "w-6 bg-foreground/75"
                      : "w-2 bg-border hover:bg-muted-foreground/50"
                  )}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="下一篇精选"
            className="w-9 h-9 rounded-full border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
