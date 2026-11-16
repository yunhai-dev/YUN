import type {Metadata} from "next";
import localFont from "next/font/local";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";
import {Toaster} from "@/components/ui/toaster"
import {baseUrl, image, siteName} from '@/config/site';
import Script from "next/script";
import {ViewTransitions} from 'next-view-transitions'
import {TooltipProvider} from "@/components/ui/tooltip";
import { HandControlProvider } from "@/context/HandControlContext";
import { WebsiteStructuredData, PersonStructuredData } from "@/components/structured-data";
import { BackToTop } from "@/components/back-to-top";
import { ErrorBoundary } from "@/components/error-boundary";
import { WebVitals } from "@/components/web-vitals";
import HandControlOverlay from "@/components/HandControlOverlay";
import { NoomoExperienceShell } from "@/components/noomo/NoomoExperienceShell";


const inter = localFont({src: './fonts/inter-latin.woff2', display: 'swap', weight: '100 900', fallback: ['Arial', 'sans-serif']});

const notoSansSC = Noto_Sans_SC({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-noto-sans-sc',
    display: 'swap',
});

const notoSerifSC = Noto_Serif_SC({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-noto-serif-sc',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: siteName,
        template: `%s | ${siteName}`
    },
    description: `${siteName} - 全栈开发者 YunHai 的个人网站，专注于 AI 应用开发、Python、React/Next.js 技术分享与项目实践。`,
    keywords: [siteName, 'YunHai', '云海', '全栈开发', 'AI应用开发', 'Python', 'Next.js', 'React', '技术博客'],
    authors: [{name: siteName}],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
        canonical: baseUrl,
    },
    openGraph: {
        title: siteName,
        description: `${siteName} - 全栈开发者 YunHai 的个人网站，专注于 AI 应用开发、Python、React/Next.js 技术分享与项目实践。`,
        url: baseUrl,
        siteName: siteName,
        images: [
            {
                url: image,
                width: 1200,
                height: 630,
            },
        ],
        locale: 'zh_CN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteName,
        description: `${siteName} - 全栈开发者 YunHai 的个人网站，专注于 AI 应用开发、Python、React/Next.js 技术分享与项目实践。`,
        images: [image],
    },
    icons: {
        icon: image,
        apple: image,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html lang="zh-CN" className={`${notoSansSC.variable} ${notoSerifSC.variable} light`} suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://rustfs-endpoint.yhnotes.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://rustfs-endpoint.yhnotes.com" />
                <link rel="preconnect" href="https://cloud.umami.is" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://cloud.umami.is" />
                {/* PWA 支持 */}
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                {/* RSS Feed */}
                <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
                <link rel="alternate" type="application/atom+xml" title="Atom Feed" href="/atom.xml" />
                {/* 主题初始化脚本 - 统一启用亮色模式 */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    document.documentElement.classList.add('light');
                                    document.documentElement.classList.remove('dark');
                                    var p = window.location.pathname;
                                    if (p === '/' || p === '/cases' || p.indexOf('/cases/') === 0 || p === '/contacts' || p.indexOf('/contacts/') === 0) {
                                        document.documentElement.classList.add('noomo-active');
                                        var vh = ((window.visualViewport && window.visualViewport.height) || window.innerHeight) * 0.01;
                                        document.documentElement.style.setProperty('--app-vh', vh + 'px');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            {/* 网站监控脚本 */}
            <Script
                strategy="lazyOnload"
                src="https://cloud.umami.is/script.js"
                data-website-id="e7012192-3cfd-4138-af60-453aa655c7f9"
            ></Script>
            {/* 结构化数据 */}
            <WebsiteStructuredData />
            <PersonStructuredData />
            <TooltipProvider>
                <HandControlProvider>
                    <body className={inter.className}>
                    {/* 跳过导航链接 - 可访问性优化 */}
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-hidden"
                    >
                        跳过导航，直达内容
                    </a>
                    <Navbar/>
                    <HandControlOverlay />
                    <Toaster/>
                    <main id="main-content" className="min-h-screen">
                        <ErrorBoundary>
                            <NoomoExperienceShell>
                                {children}
                            </NoomoExperienceShell>
                        </ErrorBoundary>
                    </main>
                    <Footer/>
                    <BackToTop />
                    <WebVitals />
                    </body>
                </HandControlProvider>
            </TooltipProvider>

            </html>
        </ViewTransitions>
    );
}

export const dynamicParams = false
