import type {Metadata} from "next";
import {Inter} from "next/font/google";
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


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        default: siteName,
        template: `%s | ${siteName}`
    },
    description: `${siteName}，专注于技术文章、项目经验、生活点滴与云端分享。`,
    keywords: [siteName, "云海亦云", "技术博客", "前端开发", "全栈开发", "项目经验", "生活分享"],
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
        description: `${siteName}，专注于技术文章、项目经验、生活点滴与云端分享。`,
        url: baseUrl,
        siteName: siteName,
        images: [
            {
                url: image,
                width: 800,
                height: 600,
            },
        ],
        locale: 'zh_CN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteName,
        description: `${siteName}，专注于技术文章、项目经验、生活点滴与云端分享。`,
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
            <html lang="zh-CN" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://rustfs-endpoint.yhnotes.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://rustfs-endpoint.yhnotes.com" />
                <link rel="preconnect" href="https://cloud.umami.is" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://cloud.umami.is" />
                {/* PWA 支持 */}
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#8b5cf6" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                {/* RSS Feed */}
                <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
                <link rel="alternate" type="application/atom+xml" title="Atom Feed" href="/atom.xml" />
                {/* 主题初始化脚本 - 防止闪烁 */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme') || 'dark';
                                    if (theme === 'auto') {
                                        var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                        if (!isDark) {
                                            document.documentElement.classList.add('light');
                                        }
                                    } else if (theme === 'light') {
                                        document.documentElement.classList.add('light');
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
                        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
                    >
                        跳过导航，直达内容
                    </a>
                    <Navbar/>
                    <HandControlOverlay />
                    <Toaster/>
                    <main id="main-content" className="min-h-screen">
                        <ErrorBoundary>
                            {children}
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