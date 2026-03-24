import { siteName, image, baseUrl } from '@/config/site';
import type { Metadata } from 'next';

const pageUrl = `${baseUrl}/about`;

export const metadata: Metadata = {
    title: `关于我 - 全栈开发者 YunHai`,
    description: `认识 YunHai - 全栈开发者、AI 应用开发者。专注于 Python、React/Next.js、AI/LLM 开发，分享技术经验与项目实践。`,
    keywords: ['YunHai', '云海', '全���开发者', 'AI开发', 'Python', 'Next.js', '个人主页'],
    openGraph: {
        title: `关于我 - 全栈开发者 YunHai | ${siteName}`,
        description: `认识 YunHai - 全栈开发者、AI 应用开发者。专注于 Python、React/Next.js、AI/LLM 开发。`,
        url: pageUrl,
        images: [image],
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: `关于我 - 全栈开发者 YunHai | ${siteName}`,
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

