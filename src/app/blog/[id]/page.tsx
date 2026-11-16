import {getAllBlogPosts, getBlogPostBySlug} from "@/data/blog-posts";
import {markdownToHtml} from "@/lib/markdown";
import {notFound} from "next/navigation";
import Script from "next/script";
import {Link} from "next-view-transitions";
import BlogClient from "@/components/blog-client";
import {Metadata} from "next";
import {baseUrl, image, siteName} from '@/config/site';
import {BreadcrumbStructuredData} from "@/components/structured-data";
import {ReadingProgress} from "@/components/reading-progress";
import {ResourceCard, type BlogResourceSummary} from "@/components/blog/ResourceCard";
import {ArrowLeft} from "lucide-react";
import React from "react";

// 生成所有可能的博客文章路径
export async function generateStaticParams() {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({
        id: post.slug,
    }));
}

// 生成页面元数据
export async function generateMetadata({params}: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const id = (await params).id
    const post = await getBlogPostBySlug(id);
    if (!post) return {title: '文章未找到', robots: {index: false, follow: false}};

    const imageUrl = post.imageUrl || image;
    const keywords = post.tags.join(', ');
    const canonicalUrl = `${baseUrl}/blog/${id}`;

    return {
        title: `${post.title}`,
        description: post.excerpt,
        keywords,
        authors: [{name: post.author}],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.lastEdited,
            authors: [post.author],
            images: [imageUrl],
            url: canonicalUrl,
            siteName: siteName,
            locale: "zh_CN"
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
            creator: post.author,
        },
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1
        }
    };
}

// 将中文日期格式转换为ISO 8601格式
function formatDateToISO(dateStr: string): string {
    // 匹配中文日期格式，例如"2025年6月18日"
    const match = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (match) {
        const year = match[1];
        const month = match[2].padStart(2, '0');
        const day = match[3].padStart(2, '0');
        return `${year}-${month}-${day}T00:00:00+08:00`;
    }
    // Try parsing as-is, fallback to current date
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

// 博客文章页面组件
export default async function BlogPost({params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const [post, allPosts] = await Promise.all([
        getBlogPostBySlug(id),
        getAllBlogPosts(),
    ]);

    if (!post) {
        notFound();
    }

    // 将 Markdown 转换为 HTML
    const {content} = await markdownToHtml(post.content);

    // 格式化日期为ISO 8601格式
    const isoDate = formatDateToISO(post.lastEdited);

    // 网站域名
    const siteUrl = baseUrl;
    const articleUrl = `${siteUrl}/blog/${id}`;

    // 推荐 3 篇更多文章（优先同分类，再补最新）
    const primaryCat = post.category.split(",")[0]?.trim();
    const otherPosts = allPosts.filter((p) => p.slug !== post.slug);
    const sameCat = primaryCat
        ? otherPosts.filter((p) => p.category.includes(primaryCat))
        : [];
    const fallbackPool = otherPosts.filter((p) => !sameCat.some((s) => s.slug === p.slug));
    const relatedPosts: BlogResourceSummary[] = [...sameCat, ...fallbackPool]
        .slice(0, 3)
        .map((p) => ({
            slug: p.slug,
            title: p.title,
            category: p.category,
            lastEdited: p.lastEdited,
            excerpt: p.excerpt,
            imageUrl: p.imageUrl,
            tags: p.tags,
            readingTime: p.readingTime,
        }));

    const displayCategories = post.category
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .slice(0, 3);

    // 生成结构化数据
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.imageUrl ? [post.imageUrl] : [image],
        "author": {
            "@type": "Person",
            "name": post.author,
            "jobTitle": post.authorRole,
            "url": `${siteUrl}/about`
        },
        "publisher": {
            "@type": "Organization",
            "name": siteName,
            "logo": {
                "@type": "ImageObject",
                "url": image
            }
        },
        "datePublished": isoDate,
        "dateModified": isoDate,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleUrl
        },
        "url": articleUrl,
        "articleSection": post.category,
        "keywords": post.tags.join(', ')
    };

    // 生成面包屑
    const breadcrumbItems = [
        { name: '首页', url: '/' },
        { name: '博客', url: '/blog' },
        { name: post.title, url: `/blog/${id}` }
    ];

    return (
        <>
            <ReadingProgress />
            <Script
                id="article-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
            />
            <BreadcrumbStructuredData items={breadcrumbItems} />
            <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
                <main className="flex-1 pt-32 md:pt-40 pb-24">
                    {/* Article Hero */}
                    <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>返回文摘</span>
                        </Link>

                        <header className="mb-10 pb-8 border-b border-border/50">
                            <h1 className="font-serif-sc text-3xl sm:text-5xl lg:text-[3.25rem] font-medium leading-[1.22] tracking-tight mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                                {displayCategories.map((cat) => (
                                    <React.Fragment key={cat}>
                                        <strong className="font-medium text-foreground/85">{cat}</strong>
                                        <span className="inline-block w-1 h-1 rounded-full bg-foreground/45" />
                                    </React.Fragment>
                                ))}
                                <time dateTime={isoDate} className="tabular-nums">
                                    {post.lastEdited}
                                </time>
                                <span>·</span>
                                <span>{post.readingTime}</span>
                                <span>·</span>
                                <span>
                                    {post.author}
                                    {post.authorRole && `（${post.authorRole}）`}
                                </span>
                            </div>
                        </header>

                        {post.imageUrl && (
                            <div className="w-full aspect-[16/9] mb-12 sm:mb-16 rounded-[4px] overflow-hidden bg-muted/30">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    width={1200}
                                    height={675}
                                    loading="eager"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </div>

                    {/* Reading Column */}
                    <article className="max-w-[740px] mx-auto px-5 sm:px-6">
                        <BlogClient content={content}/>
                        <div className="crystal-divider mt-14 mb-6" />
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                            {post.tags.map((tag) => (
                                <span key={tag}># {tag}</span>
                            ))}
                        </div>
                    </article>

                    {/* More Insights Section */}
                    {relatedPosts.length > 0 && (
                        <section className="max-w-[1440px] w-full mx-auto px-5 md:px-10 mt-24 pt-12 border-t border-border/60">
                            <div className="flex items-baseline justify-between mb-8">
                                <h2 className="font-serif-sc text-2xl sm:text-3xl font-medium tracking-tight">
                                    更多文章
                                </h2>
                                <Link
                                    href="/blog"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    查看全部 →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((item, idx) => (
                                    <ResourceCard
                                        key={item.slug}
                                        post={item}
                                        accentIndex={idx}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </>
    );
}
