"use client";

import {Link} from "next-view-transitions"
import {motion} from "framer-motion";
import dynamic from 'next/dynamic';
import type {TerminalCommand} from "@/components/terminal-player";

const TerminalPlayer = dynamic(() => import("@/components/terminal-player"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#0d1117] rounded-lg animate-pulse" />
});

export function YunDownload() {
    const commands: TerminalCommand[] = [
        {
            command: 'yundownload https://www.yhnotes.com/test.exe',
            output: `INFO - download(57398) - 2025-12-17 23:21:54 - Protocol HttpProtocolHandler is supported for https://www.yhnotes.com/test.exe
INFO - download(57400) - 2025-12-17 23:21:54 - 🚀Start downloading metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:21:54 - stream download: https://www.yhnotes.com/test.exe to test.exe}
INFO - download(57400) - 2025-12-17 23:21:59 - 📊Downloading progress: 0.37 speed: 15.18 MB/S metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:22:04 - 📊Downloading progress: 0.69 speed: 12.98 MB/S metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:22:08 - 🏁Downloading result: success metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:22:08 - 📊Downloading progress: 1.0 speed: 13.23 MB/S metadata: https://www.yhnotes.com/test.exe to test.exe
INFO - download(57400) - 2025-12-17 23:22:08 - 📊Downloading progress: 1.0 speed: 0.0 MB/S metadata: https://www.yhnotes.com/test.exe to test.exe
file download success: https://www.yhnotes.com/test.exe`,
        }
    ]
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
                            高速下载工具
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Yundownload</h2>
                        <p className="text-muted-foreground mb-6">
                            支持 HTTP、FTP、SFTP、M3U8 等多种协议的高速下载工具，为用户提供快速、稳定、高效的下载体验。
                        </p>

                        <div className="space-y-4 mb-8">
                            <Feature
                                title="动态并发下载"
                                description="内置自适应并发控制器，根据响应码和延迟动态调整并发连接数，优化下载速度。"/>
                            <Feature
                                title="高度可定制"
                                description="统一的 API 接口，轻松与内部系统构建自定义集成。"/>
                        </div>

                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/yunhai-dev/yundownload"
                            className="text-foreground font-medium hover:underline inline-flex items-center">
                            了解更多关于 Yundownload
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="ml-1">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>

                    <div
                        className="bg-gray-600 rounded-lg overflow-hidden h-80 relative flex justify-center items-center">
                        <TerminalPlayer className="w-full" outputLineDelay={2000} commands={commands} autoPlay={false}/>
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
