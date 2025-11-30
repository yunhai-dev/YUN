"use client";

import {Link} from "next-view-transitions"
import {motion} from "framer-motion";
import Image from 'next/image';
import {STORAGE_HOST} from "@/data/baseUrl";

export function YunDownload() {
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
                            <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
                            High-speed download tool
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Yundownload</h2>
                        <p className="text-muted-foreground mb-6">
                            A high-speed download utility that supports HTTP, FTP, SFTP, M3U8, and other protocols. It’s designed to give users fast, stable, and efficient download performance.
                        </p>

                        <div className="space-y-4 mb-8">
                            <Feature
                                title="Dynamic concurrent downloads"
                                description="Built-in adaptive concurrency controller that dynamically adjusts the number of concurrent connections—based on response codes and latency—to optimize download speeds."/>
                            <Feature
                                title="Fully customizable"
                                description="A unified API lets you build custom integrations with internal systems."/>
                        </div>

                        <Link
                            target="_blank"
                            href="https://github.com/yunhai-dev/yundownload"
                            className="text-foreground font-medium hover:underline inline-flex items-center">
                            Learn more about Yundownload
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="ml-1">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>

                    <div
                        className="bg-gray-600 rounded-lg overflow-hidden h-80 relative flex justify-center items-center">
                        <Image
                            src={`${STORAGE_HOST}/data-label.webp`}
                            alt="D0 Tools"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="size-full"
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
