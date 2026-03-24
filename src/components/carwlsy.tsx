"use client";

import {Link} from "next-view-transitions"
import {motion} from "framer-motion";
import Image from "next/image";
import {STORAGE_HOST} from "@/data/baseUrl";

export function Carwlsy() {
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
                            src={`${STORAGE_HOST}/carwlsy.png`}
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
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            分布式数据采集平台
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Carwlsy</h2>
                        <p className="text-muted-foreground mb-6">
                            优化速度与效率。通过内置 SDK 实现数据集成与告警，Carwlsy 可轻松部署 Python 脚本并提供分布式调度能力。
                        </p>

                        <div className="space-y-4 mb-8">
                            <Feature title="简化部署"
                                     description="可通过 Docker 或本地命令部署开箱即用的服务"/>
                            <Feature title="Web IDE"
                                     description="使用内置 IDE 进行敏捷开发与快速部署"/>
                        </div>

                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/yunhai-dev/crawlsy"
                            className="text-foreground font-medium hover:underline inline-flex items-center">
                            了解更多关于 Crawlsy
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
