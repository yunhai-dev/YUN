"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowUpRight } from "lucide-react";
import { STORAGE_HOST } from "@/data/baseUrl";
import { FAQStructuredData } from "@/components/structured-data";

const faqs = [
    {
        question: "如何联系 YunHai？",
        answer: "您可以通过邮件 yunhai@yhnotes.com 联系我，或通过 GitHub、Gitee 等平台与我取得联系。",
    },
    {
        question: "YunHai 提供哪些技术服务？",
        answer: "我提供全栈开发（Python/Django/FastAPI + React/Next.js）、AI 应用开发（LLM/Agent）、数据爬取等技术服务。",
    },
    {
        question: "回复时间一般是多久？",
        answer: "我通常在工作日 24 小时内回复所有咨询。紧急事项请在邮件主题中标注「URGENT」。",
    },
];

export default function Contact() {
    return (
        <main className="min-h-screen flex flex-col">
            <FAQStructuredData faqs={faqs} />

            <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 pt-28 md:pt-36 pb-24">
                {/* Editorial Invitation */}
                <section className="pb-16 border-b border-border/60">
                    <h1 className="font-serif-sc text-5xl sm:text-6xl font-medium tracking-tight mb-6">
                        联系
                    </h1>
                    <p className="font-serif-sc text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                        保持好奇，保持诚恳，一起探索并创造真正有用的东西。
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-6 justify-between">
                        <a
                            href="mailto:yunhai@yhnotes.com"
                            className="font-serif-sc text-2xl sm:text-4xl text-foreground hover:text-primary border-b border-border/70 hover:border-primary pb-1.5 transition-colors w-fit"
                        >
                            yunhai@yhnotes.com
                        </a>
                        <Link
                            href="/contacts"
                            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            切换至 3D 联系页
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>

                {/* Hairline Correspondence Ledger */}
                <section className="divide-y divide-border/45">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
                        <h2 className="md:col-span-4 font-serif-sc text-lg font-medium">开源与代码</h2>
                        <div className="md:col-span-8 flex flex-wrap gap-8 text-sm">
                            <a
                                href="https://github.com/yunhai-dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                            >
                                GitHub (@yunhai-dev)
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="https://gitee.com/yun2hai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                            >
                                Gitee (@yun2hai)
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 items-center">
                        <h2 className="md:col-span-4 font-serif-sc text-lg font-medium">微信交流</h2>
                        <div className="md:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                                欢迎扫码添加微信，添加时请备注来意（技术咨询、项目合作或日常交流），以便更高效地沟通。
                            </p>
                            <Image
                                width={104}
                                height={104}
                                alt="微信二维码"
                                className="size-24 rounded-lg bg-white p-1 shrink-0"
                                src={`${STORAGE_HOST}/contact-wechat.png`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
                        <h2 className="md:col-span-4 font-serif-sc text-lg font-medium">协作范围</h2>
                        <p className="md:col-span-8 text-sm text-muted-foreground leading-relaxed">
                            全栈 Web 开发（Python / Django / FastAPI + React / Next.js）、AI 应用与 Agent 工作流构建、数据工程与技术咨询。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
                        <h2 className="md:col-span-4 font-serif-sc text-lg font-medium">回复节奏</h2>
                        <p className="md:col-span-8 text-sm text-muted-foreground leading-relaxed">
                            工作日通常在 24 小时内回复所有邮件与咨询。如遇紧急事项，请在邮件主题中标注「URGENT」。
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
