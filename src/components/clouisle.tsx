"use client";

import {Link} from "next-view-transitions"
import {motion} from "framer-motion";
import Image from "next/image";
import {STORAGE_HOST} from "@/data/baseUrl";

export function Clouisle() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="order-2 md:order-1 bg-muted rounded-lg overflow-hidden aspect-[584/320] relative">
                        <Image
                            src={`${STORAGE_HOST}/admin-panel.webp`}
                            alt="Carwlsy"
                            width={584}
                            height={320}
                            sizes="(min-width: 768px) 640px, 100vw"
                            className="w-full h-full rounded-md object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div className="order-1 md:order-2">
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground mb-4">
                            <div className="w-2 h-2 bg-sky-500 rounded-full mr-2"></div>
                            企业级 AI 平台
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Clouisle</h2>
                        <p className="text-muted-foreground mb-6">
                            Clouisle 将 AI Agent、工作流自动化与企业知识管理整合于一个统一平台，助力团队自信地部署生产级 AI 应用。
                        </p>

                        <div className="space-y-4 mb-8">
                            <Feature
                                title="AI Agent 管理"
                                description="支持多模型 Agent 配置，集成知识库、编排工具、管理访问权限，全面掌控对话生命周期。"/>
                            <Feature
                                title="可视化工作流编排"
                                description="提供 15+ 节点类型与多种触发方式，支持实时监控执行状态、在线调试工作流，快速部署自动化流程。"/>
                            <Feature
                                title="企业知识管理系统"
                                description="支持导入 PDF、DOCX、XLSX 等多种文件格式，具备智能分块、向量索引与异步处理能力。"/>
                        </div>

                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://clouisle.asia"
                            className="text-foreground font-medium hover:underline inline-flex items-center">
                            了解更多关于 Clouisle
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="ml-1">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Feature({title, description}: { title: string; description: string }) {
    return (
        <div>
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
