"use client";

import Image from "next/image";
import {motion} from "framer-motion";
import {image} from '@/config/site';
import {STORAGE_HOST} from "@/data/baseUrl";

export default function About() {
    return (
        <main className="min-h-screen flex flex-col">

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="max-w-7xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="w-32 h-32 md:w-64 md:h-64">
                            <Image
                                src={image}
                                alt="头像"
                                width={128}
                                height={128}
                                className="w-full h-full rounded-full object-cover"
                                priority
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                关于我
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl">
                                用技术让生活更简单，让世界更美好。
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Work Experience */}
            <section className="py-16 px-4 bg-white/5">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center mt-8 md:mt-0">工作经历</h2>
                    <div className="space-y-6">
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-red-500 mr-3 rounded-full"/>
                                爬虫工程师
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                负责通过 JavaScript 逆向分析网站获取公开数据。处理过多种复杂场景，包括 WebSocket 加密通信协议、Cloudflare 防护等反爬机制。
                            </p>
                            <p className="text-muted-foreground text-lg relative z-10">
                                针对人机验证（如滑块验证），可根据页面缩放比例精确计算滑动距离，实现自动化通过。
                            </p>
                        </div>

                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-yellow-500 mr-3 rounded-full"/>
                                后端开发
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                精通 Python 后端开发，擅长 Django 和 FastAPI 框架。具备构建可扩展分布式系统的经验，熟悉 OAuth2/OIDC 单点登录（SSO）集成（Google、GitHub 等）及 RESTful API 设计。
                            </p>
                            <p className="text-muted-foreground text-lg relative z-10">
                                熟练掌握消息队列系统（Celery、Redis、Kafka）、微服务架构、数据库优化（PostgreSQL、MySQL），以及 Docker/Kubernetes 容器化部署。
                            </p>
                        </div>

                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-green-500 mr-3 rounded-full"/>
                                前端开发
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                熟练掌握 React/Next.js 和 Vue 生态系统的现代前端开发。使用 TypeScript、Tailwind CSS 及主流 UI 组件库构建响应式、可访问、高性能的 Web 应用。
                            </p>
                            <p className="text-muted-foreground text-lg relative z-10">
                                具备 SSR/SSG 渲染策略、状态管理（Zustand/Pinia）及 API 集成的丰富经验。本网站即为前端能力的实践展示。
                            </p>
                        </div>

                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-blue-500 mr-3 rounded-full"/>
                                AI 应用开发
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                基于前沿 AI 技术构建智能应用。具备 LLM 集成（Claude、GPT、DeepSeek）、RAG 系统及 AI Agent 开发经验，熟练使用 LangChain/LangGraph 框架。
                            </p>
                            <p className="text-muted-foreground text-lg relative z-10">
                                熟悉 MCP（模型上下文协议）服务端实现、基于 Dify 的 AI 工作流编排，能够将 AI 能力落地为生产级功能。
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Skills Grid */}
            <section className="py-16 px-4">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center mt-8 md:mt-0">技术能力</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 text-center glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">全栈开发</h3>
                            <p className="text-muted-foreground relative z-10">
                                Python（Django/FastAPI）+ Next.js/Vue，桌面端 Tauri/Electron，跨平台移动端 Flutter
                            </p>
                        </div>
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 text-center glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">AI 应用开发</h3>
                            <p className="text-muted-foreground relative z-10">
                                基于 Claude/GPT/DeepSeek 的 LLM 应用，AI Agent 与工作流（LangGraph/Dify），MCP 协议集成
                            </p>
                        </div>
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 text-center glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">数据工程</h3>
                            <p className="text-muted-foreground relative z-10">
                                RAG 管道、向量数据库、实时流处理、ETL 自动化
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Hometown */}
            <section className="py-16 px-4 bg-white/5">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="max-w-4xl mx-auto"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-bold mb-6 mt-8 md:mt-0">家乡</h2>
                            <p className="text-muted-foreground text-lg">
                                云南，悬浮于云端的人间仙境：江岸边的龙泉涌出天水——传说中龙神吐珠之地。玉龙雪山披着用纳西族东巴文字织就的霜甲，静静守望着这片土地。
                            </p>
                        </div>
                        <div className="order-1 md:order-2">
                            <Image
                                src={`${STORAGE_HOST}/xuanwei.svg`}
                                alt="宣威"
                                width={400}
                                height={400}
                                className="w-full h-auto object-cover border border-border p-2 rounded-lg bg-black/70"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Values */}
            <section className="py-16 px-4">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="max-w-4xl mx-auto"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 mt-8 md:mt-0">探索</h2>
                            <p className="text-muted-foreground text-lg mb-4">
                                希望这个网站能承载探索的旅程，为突如其来的灵感提供一个即时的落脚之所。
                            </p>
                            <p className="text-muted-foreground text-lg">
                                技术应当服务于人，而非让生活更复杂。我们的目标是让每个人都能轻松驾驭技术。
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-8">
                            <h3 className="text-xl font-semibold mb-6">价值观</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>创新：持续探索新技术，保持学习的热情</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>开放：保持开放的心态，拥抱变化</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>路漫漫其修远兮，吾将上下而求索</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
