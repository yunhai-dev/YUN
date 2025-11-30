import {getAllBlogPosts} from "@/data/blog-posts";
import {Link} from "next-view-transitions"
import {image, siteName} from '@/config/site';
import type {Metadata} from 'next';
import {STORAGE_HOST} from "@/data/baseUrl";
import {MorePostsList} from './MorePostsList';

interface BlogPostProps {
    index?: number;
    slug: string;
    category: string;
    title: string;
    imageUrl?: string;
    date?: string;
    excerpt?: string;
}

function FeaturedPost({index, slug, category, title, imageUrl, excerpt}: BlogPostProps) {
    return (
        <Link
            href={`/blog/${slug}`}
            className="block rounded-lg border border-border hover:border-violet-500/50 bg-card overflow-hidden p-1 h-full glow-card group/card transition-colors"
        >
            {/* 荧光背景层 */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"/>

            <div
                className="h-64 rounded-md overflow-hidden flex items-center justify-center mb-4 relative z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageUrl || `${STORAGE_HOST}/YUN Blog bg ${index}.svg`}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 relative z-10">
                <div className="text-sm text-muted-foreground mb-2">
                    {
                        category.split(',').map(item => (
                            <span key={item}
                                  className="inline-block border px-1 backdrop-blur-xs text-[hsl(var(--linear-gray))] rounded-sm py-1 text-xs font-semibold mr-2">
                                {item}
                            </span>
                        ))
                    }
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                {excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-1">{excerpt}</p>
                )}
            </div>
        </Link>
    );
}

export const metadata: Metadata = {
    title: `博客`,
    description: `${siteName} 博客文章与技术分享`,
    openGraph: {
        title: `博客 | ${siteName}`,
        description: `${siteName} 博客文章与技术分享`,
        images: [image],
    },
};

export async function generateStaticParams() {
    const allPosts = await getAllBlogPosts();
    return allPosts.map(post => ({
        slug: post.slug
    }));
}

export default async function BlogPage() {
    // 获取博客文章数据 (已经按 mtimeMs 排序)
    const allPosts = await getAllBlogPosts();

    // 分离精选文章（前5篇）和常规文章（剩余的）
    const featuredPosts = allPosts.slice(0, 5);
    const recentPosts = allPosts.slice(5);

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main">
                <div className="flex items-center justify-between mb-16">
                    <h1 className="text-4xl font-bold">博客</h1>
                </div>

                {/* 博客文章布局 */}
                <div className="mb-16 space-y-6">
                    {/* 前两个卡片一行 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {featuredPosts.slice(0, 2).map((post, idx) => (
                            <div className="h-full" key={`featured-top-${post.slug}-${idx}`}>
                                <FeaturedPost
                                    index={idx + 1}
                                    slug={post.slug}
                                    category={post.category}
                                    title={post.title}
                                    imageUrl={post.imageUrl}
                                    excerpt={post.excerpt}
                                />
                            </div>
                        ))}
                    </div>

                    {/* 后三个卡片一行 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredPosts.slice(2, 5).map((post, idx) => (
                            <div
                                className={`h-full ${idx === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                                key={`featured-bottom-${post.slug}-${idx}`}
                            >
                                <FeaturedPost
                                    index={idx + 3}
                                    slug={post.slug}
                                    category={post.category}
                                    title={post.title}
                                    imageUrl={post.imageUrl}
                                    excerpt={post.excerpt}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <MorePostsList recentPosts={recentPosts}/>
            </div>
        </main>
    );
}
