import { siteName, image, baseUrl } from '@/config/site';
import type { Metadata } from 'next';

const pageUrl = `${baseUrl}/contact`;

export const metadata: Metadata = {
    title: `联系我 - 合作与技术交流`,
    description: `联系 YunHai - 通过邮件、GitHub 或在线表单与我取得联系，欢迎技术合作、项目咨询或问题反馈。`,
    keywords: ['联系YunHai', '技术合作', '项目咨询', '合作交流', 'YunHai'],
    openGraph: {
        title: `联系我 - 合作与技术交流 | ${siteName}`,
        description: `联系 YunHai - 欢迎技术合作、项目咨询或问题反馈`,
        url: pageUrl,
        images: [image],
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: `联系我 - 合作与技术交流 | ${siteName}`,
        description: `联系 YunHai - 欢迎技术合作、项目咨询或问题反馈`,
        images: [image],
    },
    alternates: {
        canonical: pageUrl,
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}

