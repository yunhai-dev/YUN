import {CallToAction} from "@/components/call-to-action";
import {FeaturesSection} from "@/components/features-section";
import {Hero} from "@/components/hero";
import {Carwlsy} from "@/components/carwlsy";
import {D0Tools} from "@/components/d0-tools";
import {TechStack} from "@/components/tech-stack";
import {Announcement} from "@/components/announcement";
import {YunDownload} from "@/components/yundownload";
import {Clouisle} from "@/components/clouisle";
import {FAQStructuredData} from "@/components/structured-data";

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

export default function Home() {
    return (
        <main className="main">
            <FAQStructuredData faqs={homeFAQs} />
            <Announcement/>
            <Hero/>
            <FeaturesSection/>
            <TechStack/>
            <Clouisle/>
            <D0Tools/>
            <Carwlsy/>
            <YunDownload/>
            <CallToAction/>
        </main>
    );
}
