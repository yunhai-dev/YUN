import { siteName, image, baseUrl } from '@/config/site';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getAllTools } from '@/data/tools';
import { ToolsPwaRegister } from '@/components/tools-pwa-register';

const pageUrl = `${baseUrl}/tools`;

export const metadata: Metadata = {
    title: `在线工具箱 - 开发者实用工具集合`,
    description: `精选开发者实用工具 - 包含 JSON 格式化、Markdown 编辑器、文本对比、URL 编码、P2P 传输等在线工具，免费使用。`,
    manifest: '/tools/manifest.json',
    keywords: ['在线工具', 'JSON格式化', 'Markdown编辑器', '文本对比', '开发工具', 'YunHai'],
    openGraph: {
        title: `在线工具箱 - 开发者实用工具 | ${siteName}`,
        description: `精选开发者实用工具 - JSON 格式化、Markdown 编辑器、文本对比、URL 编码等在线工具，免费使用。`,
        url: pageUrl,
        images: [image],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: `工具 | ${siteName}`,
        description: `精选实用开发工具与在线资源 - 包含 AI 工具、开发辅助、设计资源等`,
        images: [image],
    },
    alternates: {
        canonical: pageUrl,
    },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    const tools = getAllTools();
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': `在线工具箱 | ${siteName}`,
        'description': '精选开发者实用工具 - JSON 格式化、Markdown 编辑器、文本对比、URL 编码等在线工具，免费使用。',
        'url': pageUrl,
        'mainEntity': {
            '@type': 'ItemList',
            'numberOfItems': tools.length,
            'itemListElement': tools.slice(0, 20).map((tool, i) => ({
                '@type': 'ListItem',
                'position': i + 1,
                'name': tool.name,
                'description': tool.description,
                'url': tool.href.startsWith('http') ? tool.href : `${baseUrl}${tool.href}`,
            })),
        },
    };
    return (
        <>
            <ToolsPwaRegister />
            <Script id="tools-collection-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            {children}
        </>
    );
}

