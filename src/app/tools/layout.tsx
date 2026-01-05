import { siteName, image, baseUrl } from '@/config/site';
import type { Metadata } from 'next';

const pageUrl = `${baseUrl}/tools`;

export const metadata: Metadata = {
    title: `工具`,
    description: `精选实用开发工具与在线资源 - 包含 AI 工具、开发辅助、设计资源、效率提升等多个分类。`,
    keywords: ['开发工具', '在线工具', 'AI工具', '效率工具', 'YunHai'],
    openGraph: {
        title: `工具 | ${siteName}`,
        description: `精选实用开发工具与在线资源 - 包含 AI 工具、开发辅助、设计资源等多个分类`,
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
    return children;
}

