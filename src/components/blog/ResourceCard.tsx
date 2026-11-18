"use client";

import { Link } from "next-view-transitions";
import { FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefetch } from "@/components/prefetch-link";
import { STORAGE_HOST } from "@/data/baseUrl";

export interface BlogResourceSummary {
  slug: string;
  title: string;
  category: string;
  lastEdited?: string;
  excerpt?: string;
  imageUrl?: string;
  tags: string[];
  readingTime?: string;
}

interface ResourceCardProps {
  post: BlogResourceSummary;
  featured?: boolean;
  className?: string;
  accentIndex?: number;
  inCarousel?: boolean;
}

function cleanExcerpt(raw?: string): string {
  if (!raw) return "";
  return raw
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function ResourceCard({
  post,
  featured = false,
  className,
  accentIndex = 0,
  inCarousel = false,
}: ResourceCardProps) {
  const prefetchProps = usePrefetch(`/blog/${post.slug}`);
  const primaryCat = post.category.split(",")[0]?.trim() || "文章";
  const displayTags = Array.from(
    new Set([
      ...post.category
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      ...(post.tags || []).map((t) => t.trim()).filter(Boolean),
    ])
  ).slice(0, 2);

  const summary = cleanExcerpt(post.excerpt);
  const coverSrc =
    post.imageUrl || `${STORAGE_HOST}/YUN Blog bg ${(accentIndex % 6) + 1}.svg`;

  return (
    <Link
      href={`/blog/${post.slug}`}
      {...prefetchProps}
      className={cn(
        "group gradient-hairline flex flex-col rounded-2xl bg-white/30 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_36px_-20px_rgba(64,52,110,0.35)] transition-colors duration-200 hover:bg-white/45 dark:bg-white/5 dark:hover:bg-white/10 overflow-hidden",
        featured && "min-h-[300px]",
        inCarousel && "h-full",
        className
      )}
    >
      {/* Card Top Header */}
      <div className="flex items-center justify-between gap-4 px-5 py-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2 font-medium text-foreground/80">
          <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span>{primaryCat}</span>
        </span>
        {post.lastEdited && (
          <time className="tabular-nums text-muted-foreground/85 shrink-0">
            {post.lastEdited}
          </time>
        )}
      </div>

      {/* Card Content */}
      <div
        className={cn(
          "flex-1 min-h-0 flex",
          featured ? "flex-col md:flex-row" : "flex-col"
        )}
      >
        {/* Text Body */}
        <div
          className={cn(
            "flex-1 min-w-0 flex flex-col gap-2.5",
            featured ? "p-6 sm:p-7" : "p-5 sm:p-6"
          )}
        >
          <h3
            className={cn(
              "font-serif-sc font-medium text-foreground transition-colors text-balance",
              featured
                ? "text-xl sm:text-2xl lg:text-[1.65rem] leading-[1.28] line-clamp-2"
                : "text-lg sm:text-[1.15rem] leading-[1.35] line-clamp-2"
            )}
          >
            {post.title}
          </h3>

          {summary && (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mt-0.5">
              {summary}
            </p>
          )}

          {/* Bottom Tags / Product Pills */}
          {displayTags.length > 0 && (
            <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {displayTags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-muted-foreground/80 shrink-0" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Optional Illustration / Cover Plate for Featured Card */}
        {featured && (
          <div className="md:w-[40%] shrink-0 p-5 pt-0 md:pt-5 md:pl-0 flex items-center justify-center">
            <div className="w-full aspect-[16/10] md:h-full md:max-h-[248px] md:aspect-auto rounded-xl overflow-hidden border border-border/50 bg-muted/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverSrc}
                alt={post.title}
                loading={inCarousel ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
