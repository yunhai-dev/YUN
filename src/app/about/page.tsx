"use client";

import Image from "next/image";
import { image } from "@/config/site";
import { STORAGE_HOST } from "@/data/baseUrl";

const practices = [
    {
        area: "数据工程",
        detail:
            "通过 JavaScript 逆向分析获取公开数据，处理 WebSocket 加密协议、Cloudflare 防护与交互式人机验证的自动化识别。",
    },
    {
        area: "后端架构",
        detail:
            "深耕 Python（Django / FastAPI）与分布式服务架构，覆盖 OAuth2 / OIDC 单点登录、Celery / Redis / Kafka 消息队列与容器化部署。",
    },
    {
        area: "前端交互",
        detail:
            "构建 React / Next.js 与 Vue 现代 Web 应用，结合 TypeScript、Tailwind CSS、Three.js 与 GSAP 打磨沉浸式视觉与交互细节。",
    },
    {
        area: "AI 应用",
        detail:
            "围绕 Claude、GPT、DeepSeek 落地 LLM 应用、RAG 知识检索、LangGraph / Dify 工作流编排与 MCP 协议服务端实现。",
    },
];

export default function About() {
    return (
        <main className="min-h-screen flex flex-col">
            <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 pt-28 md:pt-36 pb-24">
                {/* Opening Editorial Spread */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end pb-16 border-b border-border/60">
                    <div className="md:col-span-8">
                        <h1 className="font-serif-sc text-5xl sm:text-6xl font-medium tracking-tight mb-6">
                            关于
                        </h1>
                        <p className="font-serif-sc text-2xl sm:text-3xl text-foreground/90 leading-relaxed mb-4">
                            用技术让生活更简单，让世界更美好。
                        </p>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                            我是 YunHai（云云亦海），一名专注于全栈工程与 AI 应用的独立开发者。喜欢从具体问题出发，拆解结构、构建工具并开源分享。
                        </p>
                    </div>
                    <div className="md:col-span-4 flex md:justify-end">
                        <div className="w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden bg-muted/30">
                            <Image
                                src={image}
                                alt="YunHai 头像"
                                width={176}
                                height={176}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* Hairline Practice Ledger */}
                <section className="py-16 border-b border-border/60">
                    <h2 className="font-serif-sc text-xl font-medium text-muted-foreground mb-8">
                        技术与实践
                    </h2>
                    <div className="divide-y divide-border/45">
                        {practices.map((item) => (
                            <div
                                key={item.area}
                                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6"
                            >
                                <h3 className="md:col-span-4 font-serif-sc text-xl font-medium">
                                    {item.area}
                                </h3>
                                <p className="md:col-span-8 text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {item.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Roots & Ethos */}
                <section className="pt-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                    <div className="md:col-span-6 space-y-4">
                        <h2 className="font-serif-sc text-2xl font-medium">故土 · 云南</h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            云南，悬浮于云端的人间仙境：江岸边的龙泉涌出天水，玉龙雪山披着用纳西族东巴文字织就的霜甲，静静守望着这片土地。
                        </p>
                        <div className="pt-2">
                            <Image
                                src={`${STORAGE_HOST}/xuanwei.svg`}
                                alt="宣威"
                                width={400}
                                height={260}
                                className="w-full max-w-sm h-44 object-contain rounded-xl bg-slate-950/90 p-4"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-6 space-y-4 md:pl-8 md:border-l md:border-border/50">
                        <h2 className="font-serif-sc text-2xl font-medium">探索与原则</h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            希望这个网站能承载探索的旅程，为突如其来的灵感提供一个即时的落脚之所。技术应当服务于人，而非让生活更复杂。
                        </p>
                        <ul className="space-y-3 pt-4 text-sm text-foreground/85 border-t border-border/45">
                            <li>创新 — 持续探索新技术，保持好奇与热情</li>
                            <li>开放 — 拥抱开源生态，分享可复用的方案</li>
                            <li>求索 — 路漫漫其修远兮，吾将上下而求索</li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    );
}
