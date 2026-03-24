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
                                Contact Me
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl">
                                Let's connect and create something amazing together.
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
                    <h2 className="text-3xl font-bold mb-8 text-center mt-8 md:mt-0">Contact Methods</h2>
                    <div className="gap-3 grid grid-cols-2">
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-blue-500 mr-3 rounded-full"/>
                                Email
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                Feel free to reach out to me via email for any inquiries or collaboration opportunities.
                            </p>
                            <Link href="mailto:yunhai@yhnotes.com" className="text-blue-500 hover:underline relative z-10"
                                  target="_blank" rel="noopener noreferrer">
                                Click Contact me by email
                            </Link>
                        </div>

                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-purple-500 mr-3 rounded-full"/>
                                GitHub
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                Check out my open source projects and contributions on GitHub.
                            </p>
                            <Link href="https://github.com/yunhai-dev" className="text-blue-500 hover:underline relative z-10"
                                  target="_blank" rel="noopener noreferrer">
                                Click here to view my Github
                            </Link>
                        </div>

                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-orange-500 mr-3 rounded-full"/>
                                Gitee
                            </h3>
                            <p className="text-muted-foreground text-lg mb-4 relative z-10">
                                Follow my projects and activities on Gitee.
                            </p>
                            <Link href="https://gitee.com/yun2hai" className="text-blue-500 hover:underline relative z-10"
                                  target="_blank" rel="noopener noreferrer">
                                Click here to view my Gitee
                            </Link>
                        </div>
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="flex items-center text-xl font-semibold mb-4 relative z-10">
                                <div className="size-3 bg-green-500 mr-3 rounded-full"/>
                                WeChat
                            </h3>
                            <div className="md:flex relative z-10">
                                <p className="text-muted-foreground text-lg mb-4">
                                    I can be contacted in this way, but of course you need to indicate your intention
                                    when
                                    adding it to facilitate our subsequent communication
                                </p>
                                <Image
                                    width={120}
                                    height={120}
                                    alt="wx"
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
                    <h2 className="text-3xl font-bold mb-8 text-center mt-8 md:mt-0">Support</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 text-center glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">Technical Support</h3>
                            <p className="text-muted-foreground relative z-10">
                                Need help with technical issues? Feel free to contact me.
                            </p>
                        </div>
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 text-center glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">Project Collaboration</h3>
                            <p className="text-muted-foreground relative z-10">
                                Interested in working together? Let's discuss your ideas.
                            </p>
                        </div>
                        <div className="border border-border hover:border-violet-500/50 rounded-lg p-6 text-center glow-card group/card transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">Freelance Work</h3>
                            <p className="text-muted-foreground relative z-10">
                                Available for part-time projects. Web dev, AI apps, and more.
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
                            <h2 className="text-3xl font-bold mb-6 mt-8 md:mt-0">Response Time</h2>
                            <p className="text-muted-foreground text-lg mb-4">
                                I typically respond to all inquiries within 24 hours during business days.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                For urgent matters, please indicate "URGENT" in your email subject line.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-8">
                            <h3 className="text-xl font-semibold mb-6">Best Practices</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>Be specific about your inquiry or request</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>Include relevant context and details</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>Attach any necessary files or documentation</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
