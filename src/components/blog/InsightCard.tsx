"use client";

import React from "react";
import { Link } from "next-view-transitions";
import { ArrowUpRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefetch } from "@/components/prefetch-link";
import { STORAGE_HOST } from "@/data/baseUrl";

export interface InsightPostSummary {
  slug: string;
  title: string;
  category: string;
  lastEdited?: string;
  excerpt?: string;
  imageUrl?: string;
  tags: string[];
  readingTime?: string;
}

interface InsightCardProps {
  post: InsightPostSummary;
  variant?: "big" | "small" | "grid";
  fallbackIndex?: number;
  priority?: boolean;
}

function getDisplayTags(post: InsightPostSummary): string[] {
  const fromTags = (post.tags || []).map((t) => t.trim()).filter(Boolean);
  const fromCats = (post.category || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const merged = Array.from(new Set([...fromCats, ...fromTags]));
  return merged.slice(0, 3);
}

export function InsightCard({
  post,
  variant = "grid",
  fallbackIndex = 1,
  priority = false,
}: InsightCardProps) {
  const prefetchProps = usePrefetch(`/blog/${post.slug}`);
  const displayTags = getDisplayTags(post);
  const coverSrc =
    post.imageUrl || `${STORAGE_HOST}/YUN Blog bg ${((fallbackIndex - 1) % 6) + 1}.svg`;

  const isBig = variant === "big";
  const isSmall = variant === "small";

  return (
    <Link
      href={`/blog/${post.slug}`}
      {...prefetchProps}
      className={cn(
        "group block focus:outline-none",
        isSmall && "flex flex-row lg:flex-col gap-4 lg:gap-0 items-start lg:items-stretch",
        !isSmall && "flex flex-col justify-between"
      )}
    >
      {/* Cover Frame */}
      <div
        className={cn(
          "relative overflow-hidden bg-muted/30 rounded-[4px] shrink-0",
          isBig && "w-full aspect-[16/10] lg:aspect-[16/11]",
          isSmall && "w-28 h-20 sm:w-44 sm:h-28 lg:w-full lg:h-auto lg:aspect-[16/10]",
          variant === "grid" && "w-full aspect-[16/10]"
        )}
      >
        {/* Main Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverSrc}
          alt={post.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Soft Ambient Blur Layer on Hover (desktop) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="hidden lg:block pointer-events-none absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-0 group-hover:opacity-45 transition-opacity duration-500"
        />

        {/* Hover Dark Scrim + Eye + READ */}
        <div className="hidden lg:flex pointer-events-none absolute inset-0 z-10 flex-col items-center justify-center gap-3 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <Eye className="w-10 h-10 text-white/95 stroke-[1.35]" />
          <span className="text-white text-2xl tracking-[0.22em] font-medium uppercase">
            READ
          </span>
        </div>

        {/* Hover Floating Pill Tags (top-right, desktop) */}
        {displayTags.length > 0 && (
          <div className="hidden lg:flex pointer-events-none absolute top-3.5 right-3.5 z-20 flex-col items-end gap-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full border border-white/80 bg-black/25 backdrop-blur-sm px-2.5 py-1 text-[12px] leading-none font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Text & Meta Area */}
      <div
        className={cn(
          "flex-1 min-w-0",
          isSmall ? "lg:mt-6" : isBig ? "mt-6 lg:mt-10" : "mt-5 lg:mt-6"
        )}
      >
        {/* Title + Hover Arrow */}
        <div className="relative flex items-start justify-between gap-4">
          <h2
            className={cn(
              "font-serif-sc font-medium text-foreground group-hover:text-primary transition-colors duration-300",
              isBig && "text-2xl sm:text-3xl lg:text-[36px] leading-[1.22] max-w-[600px]",
              isSmall && "text-base sm:text-lg lg:text-[24px] leading-[1.28] lg:max-w-[85%] line-clamp-2",
              variant === "grid" && "text-lg sm:text-xl lg:text-[24px] leading-[1.28] lg:max-w-[85%] line-clamp-2"
            )}
          >
            {post.title}
          </h2>

          {/* Slide-in Arrow on Hover */}
          <span
            aria-hidden="true"
            className="hidden lg:flex shrink-0 w-10 h-10 items-center justify-center overflow-hidden text-foreground/80 group-hover:text-primary"
          >
            <ArrowUpRight className="w-6 h-6 translate-x-6 -translate-y-6 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
          </span>
        </div>

        {/* Meta Row: Bold Tags + Dot + Date */}
        <div
          className={cn(
            "font-sans flex flex-wrap items-center gap-x-2 gap-y-1 text-sm lg:text-base text-muted-foreground",
            isBig ? "mt-5 lg:mt-7" : isSmall ? "mt-2.5 lg:mt-6" : "mt-4 lg:mt-7"
          )}
        >
          {displayTags.slice(0, 2).map((tag, idx) => (
            <React.Fragment key={tag}>
              <strong className="font-medium text-foreground/90">{tag}</strong>
              {(idx < Math.min(displayTags.length, 2) - 1 || post.lastEdited) && (
                <span className="inline-block w-1 h-1 rounded-full bg-foreground/60 mx-1.5" />
              )}
            </React.Fragment>
          ))}
          {post.lastEdited && (
            <time className="tabular-nums text-muted-foreground">{post.lastEdited}</time>
          )}
        </div>
      </div>
    </Link>
  );
}
