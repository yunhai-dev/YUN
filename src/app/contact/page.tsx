'use client';
import {motion} from "framer-motion";
import Image from "next/image";
import {Link} from "next-view-transitions"
import {image} from '@/config/site';
import {STORAGE_HOST} from "@/data/baseUrl";
import {FAQStructuredData} from "@/components/structured-data";

// FAQ 数据用于结构化数据
const faqs = [
    {
        question: "如何联系 YunHai？",
        answer: "您可以通过邮件 yunhai@yhnotes.com 联系我，或通过 GitHub、Gitee 等平台与我取得联系。"
    },
    {
        question: "YunHai 提供哪些技术服务？",
        answer: "我提供全栈开发（Python/Django/FastAPI + React/Next.js）、AI 应用开发（LLM/Agent）、数据爬取等技术服务。"
    },
    {
        question: "回复时间一般是多久？",
        answer: "我通常在工作日 24 小时内回复所有咨询。紧急事项请在邮件主题中标注「URGENT」。"
    }
];


export default function Contact() {
    return (
        <main className="min-h-screen flex flex-col">
            <FAQStructuredData faqs={faqs} />

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
                                alt="YunHai"
                                width={128}
                                height={128}
                                className="w-full h-full rounded-full object-cover"
                                priority
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                联系我
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl">
                                一起探索，共同创造有价值的事物。
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 px-4 bg-white/5">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center mt-8 md:mt-0">联系方式</h2>
                    <div className="gap-3 grid grid-cols-2">
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-blue-500 mr-3 rounded-full"/>
                                邮件
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                欢迎通过邮件联系我，无论是技术咨询还是合作机会。
                            </p>
                            <Link href="mailto:yunhai@yhnotes.com" className="text-blue-500 hover:underline relative z-10"
                                  target="_blank" rel="noopener noreferrer">
                                点击发送邮件
                            </Link>
                        </div>

                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-purple-500 mr-3 rounded-full"/>
                                GitHub
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                查看我的开源项目与代码贡献。
                            </p>
                            <Link href="https://github.com/yunhai-dev" className="text-blue-500 hover:underline relative z-10"
                                  target="_blank" rel="noopener noreferrer">
                                访问我的 GitHub
                            </Link>
                        </div>

                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-orange-500 mr-3 rounded-full"/>
                                Gitee
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                关注我在 Gitee 上的项目与动态。
                            </p>
                            <Link href="https://gitee.com/yun2hai" className="text-blue-500 hover:underline relative z-10"
                                  target="_blank" rel="noopener noreferrer">
                                访问我的 Gitee
                            </Link>
                        </div>
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-green-500 mr-3 rounded-full"/>
                                微信
                            </h3>
                            <div className="md:flex relative z-10">
                                <p className="text-muted-foreground text-lg mb-4">
                                    欢迎通过微信联系，添加时请说明来意，以便我们更好地沟通。
                                </p>
                                <Image
                                    width={120}
                                    height={120}
                                    alt="微信二维码"
                                    className="size-36 rounded bg-green-500/60 p-2 ml-4"
                                    src={`${STORAGE_HOST}/contact-wechat.png`}/>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Support Section */}
            <section className="py-16 px-4">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center mt-8 md:mt-0">我能提供的帮助</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 text-center glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">技术支持</h3>
                            <p className="text-muted-foreground relative z-10">
                                遇到技术问题？欢迎随时联系，一起解决。
                            </p>
                        </div>
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 text-center glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">项目合作</h3>
                            <p className="text-muted-foreground relative z-10">
                                对合作感兴趣？欢迎聊聊你的想法。
                            </p>
                        </div>
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 text-center glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">自由开发</h3>
                            <p className="text-muted-foreground relative z-10">
                                接受兼职项目委托，Web 开发、AI 应用等均可。
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Response Time */}
            <section className="py-16 px-4 bg-white/5">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="max-w-4xl mx-auto"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 mt-8 md:mt-0">回复时间</h2>
                            <p className="text-muted-foreground text-lg mb-4">
                                我通常在工作日 24 小时内回复所有咨询。
                            </p>
                            <p className="text-muted-foreground text-lg">
                                紧急事项请在邮件主题中标注「URGENT」。
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-8">
                            <h3 className="text-xl font-semibold mb-6">沟通建议</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>清晰描述你的需求或问题</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>提供相关背景信息和细节</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>如有必要，附上相关文件或截图</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
