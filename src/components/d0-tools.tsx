"use client";

import {Link} from "next-view-transitions"
import {motion} from "framer-motion";
import Image from 'next/image';
import {STORAGE_HOST} from "@/data/baseUrl";

export function D0Tools() {
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
                    <div>
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            数据标注工具
                        </div>
                        <h2 className="text-3xl font-bold mb-4">D0 Tools</h2>
                        <p className="text-muted-foreground mb-6">
                            专注于统一的数据标注体验与开放接口。深度集成 YOLO、SAM 等模型，提供更智能的标注体验。
                        </p>

                        <div className="space-y-4 mb-8">
                            <Feature
                                title="安全可靠"
                                description="集中管理数据采集、标注与交付，支持设置数据过期时间，保障数据安全。"/>
                            <Feature
                                title="功能极其丰富"
                                description="内置矩形、多边形、分割、点等标注工具，支持像素级操作、图层调整、数据微调等高级功能。"/>
                        </div>

                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/yunhai-dev/D0-Tools"
                            className="text-foreground font-medium hover:underline inline-flex items-center">
                            了解更多关于 D0 Tools
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="ml-1">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>

                    <div
                        className="bg-gray-600 rounded-lg overflow-hidden aspect-video relative flex justify-center items-center">
                        <Image
                            src={`${STORAGE_HOST}/data-label.webp`}
                            alt="D0 Tools"
                            width={960}
                            height={540}
                            sizes="(min-width: 1024px) 640px, 100vw"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Feature({
                     title, description
                 }: {
    title: string;
    description: string
}) {
    return (
        <div>
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
