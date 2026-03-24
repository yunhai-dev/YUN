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
                            Enterprise AI Platform
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Clouisle</h2>
                        <p className="text-muted-foreground mb-6">
                            Clouisle brings together AI agents, workflow automation, and enterprise knowledge management
                            in one unified platform, enabling teams to deploy production-ready AI with confidence.
                        </p>

                        <div className="space-y-4 mb-8">
                            <Feature
                                title="AI Agent Management"
                                description="Configure agents with multiple models while integrating knowledge bases, orchestrating tools, managing access permissions, and controlling the complete conversation lifecycle."/>
                            <Feature
                                title="Visual Workflow Orchestration"
                                description="With over 15 node types and multiple trigger options, you can monitor execution in real-time, debug workflows on the fly, and deploy automation quickly."/>
                            <Feature
                                title="Enterprise Knowledge Management System"
                                description="Supports importing multiple file formats including PDF, DOCX, and XLSX, with intelligent chunking, vector indexing, and asynchronous processing capabilities."/>
                        </div>

                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://clouisle.asia"
                            className="text-foreground font-medium hover:underline inline-flex items-center">
                            Learn more about Clouisle
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
