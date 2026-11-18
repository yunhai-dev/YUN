import { getAllBlogPosts } from "@/data/blog-posts";
import { baseUrl, image, siteName } from "@/config/site";
import type { Metadata } from "next";
import { BlogScrollRestoration } from "./BlogScrollRestoration";
import Script from "next/script";
import { ClaudeResourcesBrowser } from "./ClaudeResourcesBrowser";
import type { BlogResourceSummary } from "@/components/blog/ResourceCard";

export const metadata: Metadata = {
    title: `技术博客 - AI开发与全栈开发文章`,
    description: `${siteName} 博客 - 技术文章、AI开发、全栈开发经验与项目分享。`,
    keywords: ["技术博客", "AI开发", "Python", "Next.js", "全栈开发", "YunHai"],
    openGraph: {
        title: `博客 | ${siteName}`,
        description: `${siteName} 博客 - 技术文章、AI开发、全栈开发经验与项目分享。`,
        url: `${baseUrl}/blog`,
        images: [image],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `博客 | ${siteName}`,
        description: `${siteName} 博客 - 技术文章、AI开发、全栈开发经验与项目分享。`,
        images: [image],
    },
    alternates: {
        canonical: `${baseUrl}/blog`,
    },
};

export async function generateStaticParams() {
    const allPosts = await getAllBlogPosts();
    return allPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPage() {
    const allPosts = await getAllBlogPosts();

    const summaries: BlogResourceSummary[] = allPosts.map((post) => ({
        slug: post.slug,
        title: post.title,
        category: post.category,
        lastEdited: post.lastEdited,
        excerpt: post.excerpt,
        imageUrl: post.imageUrl,
        tags: post.tags,
        readingTime: post.readingTime,
    }));

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `博客 | ${siteName}`,
        description: `${siteName} 博客 - 技术文章、AI开发、全栈开发经验与项目分享。`,
        url: `${baseUrl}/blog`,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: allPosts.slice(0, 10).map((post, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${baseUrl}/blog/${post.slug}`,
                name: post.title,
            })),
        },
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Script
                id="blog-collection-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <BlogScrollRestoration />
            <ClaudeResourcesBrowser allPosts={summaries} />
        </main>
    );
}
