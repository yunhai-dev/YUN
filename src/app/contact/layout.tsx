import { siteName, image, baseUrl } from '@/config/site';
import type { Metadata } from 'next';

const pageUrl = `${baseUrl}/contact`;

export const metadata: Metadata = {
    title: `联系`,
    description: `联系 YunHai - 通过邮件、GitHub 或在线表单与我取得联系。欢迎合作、技术交流或反馈问题。`,
    keywords: ['联系', 'YunHai', '合作', '技术交流', '反馈'],
    openGraph: {
        title: `联系 | ${siteName}`,
        description: `联系 YunHai - 通过邮件、GitHub 或在线表单与我取得联系`,
        url: pageUrl,
        images: [image],
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: `联系 | ${siteName}`,
        description: `联系 YunHai - 欢迎合作、技术交流或反馈问题`,
        images: [image],
    },
    alternates: {
        canonical: pageUrl,
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}

