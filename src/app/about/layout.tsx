import { siteName, image, baseUrl } from '@/config/site';
import type { Metadata } from 'next';
import Script from 'next/script';

const pageUrl = `${baseUrl}/about`;

export const metadata: Metadata = {
    title: `关于我 - 全栈开发者 YunHai`,
    description: `认识 YunHai - 全栈开发者、AI 应用开发者。专注于 Python、React/Next.js、AI/LLM 开发，分享技术经验与项目实践。`,
    keywords: ['YunHai', '云海', '全栈开发者', 'AI开发', 'Python', 'Next.js', '个人主页'],
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

const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'name': `关于我 - 全栈开发者 YunHai`,
    'url': pageUrl,
    'mainEntity': {
        '@type': 'Person',
        'name': 'YunHai',
        'alternateName': '云海',
        'url': baseUrl,
        'image': image,
        'jobTitle': '全栈开发者 & AI 应用开发者',
        'description': '专注于 Python、React/Next.js、AI/LLM 开发，具备爬虫工程、后端开发、前端开发和 AI 应用开发全栈能力。',
        'knowsAbout': [
            'Python', 'Django', 'FastAPI',
            'React', 'Next.js', 'Vue.js', 'TypeScript',
            'AI/LLM Development', 'LangChain', 'LangGraph',
            'MCP Protocol', 'RAG', 'Web Scraping',
            'Docker', 'PostgreSQL', 'Redis'
        ],
        'sameAs': [
            'https://github.com/yunhai-dev',
            'https://gitee.com/yun2hai'
        ],
        'hasOccupation': [
            { '@type': 'Occupation', 'name': '爬虫工程师' },
            { '@type': 'Occupation', 'name': '后端开发工程师' },
            { '@type': 'Occupation', 'name': '前端开发工程师' },
            { '@type': 'Occupation', 'name': 'AI 应用开发者' },
        ],
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Script id="about-profile-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
            {children}
        </>
    );
}

