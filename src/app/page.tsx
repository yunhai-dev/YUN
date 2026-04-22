import {Button} from "@/components/ui/button";
import {FAQStructuredData} from "@/components/structured-data";
import {Link} from "next-view-transitions";
import {ArrowUpRight} from "lucide-react";
import LaserFlow from "@/components/LaserFlow";
import {HomeProjectWheelSection} from "@/components/home-project-wheel-section";
import {HomeSkillsContainerSection} from "@/components/home-skills-container-section";
import {HomeWorkflowSection} from "@/components/home-workflow-section";
import {HomeRecentPostsSection} from "@/components/home-recent-posts-section";
import {HomeViewportOrchestrator} from "@/components/home-viewport-orchestrator";
import {getAllBlogPosts} from "@/data/blog-posts";

const homeFAQs = [
    {
        question: 'YunHai Ideas 是什么网站？',
        answer: 'YunHai Ideas（云海创意）是全栈开发者 YunHai 的个人网站，专注于 AI 应用开发、Python、React/Next.js 技术分享与项目实践，提供技术博客、在线工具和开发文档。'
    },
    {
        question: 'YunHai 擅长哪些技术？',
        answer: 'YunHai 擅长全栈开发，包括 Python（Django/FastAPI）后端、React/Next.js 前端、AI/LLM 应用开发（LangChain/LangGraph/MCP）、爬虫工程（JavaScript 逆向）以及数据工程（RAG、向量数据库）。'
    },
    {
        question: '网站提供哪些在线工具？',
        answer: '网站提供丰富的开发者在线工具，包括 JSON 格式化、Markdown 编辑器、文本对比、URL 编码解码、JWT 解码、正则测试、颜色选择器、Mermaid 图表编辑器、P2P 文件传输等，均免费使用。'
    },
    {
        question: '如何联系 YunHai？',
        answer: '可以通过网站的联系页面（/contact）与 YunHai 取得联系，也可以访问 GitHub（github.com/yunhai-dev）或 Gitee（gitee.com/yun2hai）查看开源项目。'
    },
    {
        question: '网站的技术博客涵盖哪些主题？',
        answer: '技术博客涵盖 AI 应用开发、Python 后端开发、React/Next.js 前端开发、爬虫工程、LLM 集成实践、系统架构设计等主题，定期更新技术文章与项目经验分享。'
    },
];

const destinations = [
    {
        title: '博客',
        description: '阅读关于 AI、Python、React 与工程体系的文章。',
        href: '/blog/',
        label: 'Articles',
    },
    {
        title: '文档',
        description: '查阅技术笔记、知识整理和项目沉淀。',
        href: '/docs/',
        label: 'Docs',
    },
    {
        title: '工具',
        description: '打开在线工具，把常见开发操作留在浏览器里完成。',
        href: '/tools/',
        label: 'Tools',
    },
    {
        title: '关于',
        description: '了解 YunHai 的能力范围、项目方向与合作方式。',
        href: '/about/',
        label: 'About',
    },
];

const showcaseImages = [
    {
        src: 'https://rustfs-endpoint.yhnotes.com/content/admin-panel.webp',
        alt: 'Admin panel showcase',
        className: 'home-showcase-primary',
    },
];

export default async function Home() {
    const recentPosts = (await getAllBlogPosts()).slice(0, 5);

    return (
        <>
            <FAQStructuredData faqs={homeFAQs} />
            <main className="home-shell home-page-transition">
                <HomeViewportOrchestrator />
                <section className="home-hero-section" data-home-section>
                    <div className="home-hero-glow home-hero-glow-left" />
                    <div className="home-hero-glow home-hero-glow-right" />
                    <div className="home-container home-hero-content">
                        <div className="home-hero-copy">
                            <span className="home-eyebrow home-reveal home-reveal-delay-1">YunHai / Clouisle</span>
                            <h1 className="home-display-title home-reveal home-reveal-delay-2">
                                云屿
                            </h1>
                            <p className="home-hero-description home-reveal home-reveal-delay-3">
                                AI Agent、工作流编排与企业级知识检索整合到同一平台，帮助团队安全落地生产级 AI。
                            </p>
                        </div>
                    </div>
                    <div className="home-container-wide home-hero-showcase home-reveal home-reveal-delay-4">
                        <div className="home-showcase-stack">
                            {showcaseImages.map((image) => (
                                <div key={image.src} className="home-showcase-media">
                                    <div className="home-showcase-laser">
                                        <LaserFlow
                                            color="#FF79C6"
                                            wispDensity={1}
                                            flowSpeed={0.35}
                                            verticalSizing={2}
                                            horizontalSizing={1.2}
                                            fogIntensity={0.45}
                                            fogScale={0.3}
                                            wispSpeed={15}
                                            wispIntensity={5}
                                            flowStrength={0.25}
                                            decay={1.1}
                                            horizontalBeamOffset={0}
                                            verticalBeamOffset={-0.5}
                                        />
                                    </div>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className={image.className}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <HomeProjectWheelSection />
                <HomeSkillsContainerSection />
                <HomeWorkflowSection />
                <HomeRecentPostsSection posts={recentPosts} />

                <section className="home-destinations-section" data-home-section>
                    <div className="home-container">
                        <div className="home-section-heading home-section-heading-row">
                            <div>
                                <span className="home-section-label">Destinations</span>
                                <h2>从这里进入最重要的四个方向</h2>
                            </div>
                            <p className="home-section-note">内容、知识库、工具与个人信息不再分散陈列，而是作为统一入口呈现。</p>
                        </div>
                        <div className="home-destination-grid">
                            {destinations.map((item) => (
                                <Link key={item.href} href={item.href} className="home-destination-card">
                                    <span className="home-destination-label">{item.label}</span>
                                    <div className="home-destination-body">
                                        <div>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                        <ArrowUpRight className="home-destination-icon" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="home-cta-section" data-home-section>
                    <div className="home-container">
                        <div className="home-cta-card">
                            <span className="home-section-label">Next step</span>
                            <h2>欢迎从这里开始了解我。</h2>
                            <div className="home-hero-actions">
                                <Button size="lg" asChild className="home-button-primary">
                                    <Link href="/contact/">联系我</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="home-button-secondary">
                                    <Link href="/blog/">查看博客</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
