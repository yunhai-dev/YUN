import { siteName, image, baseUrl } from '@/config/site';
import type { Metadata } from 'next';

const pageUrl = `${baseUrl}/about`;

export const metadata: Metadata = {
    title: `关于`,
    description: `认识 YunHai - 全栈开发者、AI 应用开发者。专注于 Python、React/Next.js、AI/LLM 开发。`,
    keywords: ['YunHai', '全栈开发', 'AI开发', 'Python', 'Next.js', '个人介绍'],
    openGraph: {
        title: `关于 | ${siteName}`,
        description: `认识 YunHai - 全栈开发者、AI 应用开发者。专注于 Python、React/Next.js、AI/LLM 开发。`,
        url: pageUrl,
        images: [image],
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: `关于 | ${siteName}`,
        description: `认识 YunHai - 全栈开发者、AI 应用开发者`,
        images: [image],
    },
    alternates: {
        canonical: pageUrl,
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}

