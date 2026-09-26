import Image from 'next/image';
import {Link} from 'next-view-transitions';
import {ArrowDown, ArrowRight, ArrowUpRight} from 'lucide-react';
import {FAQStructuredData} from '@/components/structured-data';
import {getBlogPostBySlug} from '@/data/blog-posts';
import './atelier-home.css';

const homeFAQs = [
    {question: '云云亦海是什么网站？', answer: '云云亦海是开发者 YunHai 的个人网站，记录 AI 应用、全栈开发、开源项目与持续写作。'},
    {question: '在哪里了解 YunHai 的作品？', answer: '首页展示 YunHai 的思考、Clouisle 与 Crawlsy 等作品及文章记录；关于、博客、文档和工具页面提供更多内容。'},
];

const thinking = [
    {number: '01', title: 'AI', subtitle: 'A more human intelligence', description: '让智能真正理解人的需要。', href: '/blog/openclaw-thinking/', image: '/atelier/thinking-0.webp'},
    {number: '02', title: 'Engineering', subtitle: 'From idea to impact', description: '让想法扎实发生。', href: '/docs/', image: '/atelier/thinking-1.webp'},
    {number: '03', title: 'Tools', subtitle: 'A calmer creative life', description: '更从容的创造力。', href: '/tools/', image: '/atelier/thinking-2.webp'},
];

const smallerWorks = [
    {number: '02', title: 'Crawlsy', label: '采集网络与爬虫管理', href: 'https://github.com/yunhai-dev/crawlsy', image: '/atelier/thinking-1.webp'},
    {number: '03', title: 'D0 Tools', label: '给日常开发一点轻盈', href: 'https://github.com/yunhai-dev/D0-Tools', image: '/atelier/thinking-2.webp'},
];

const noteSlugs = ['openclaw-thinking', 'expect', '2025-Summary'];

function displayDate(value: string) {
    const match = value.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    return match ? match[1] + '.' + match[2].padStart(2, '0') + '.' + match[3].padStart(2, '0') : value;
}

function SectionLabel({number, english}: {number: string; english: string}) {
    return <div className="atelier-section-label"><span className="atelier-hairline" /><span>{number}</span><span>{english}</span></div>;
}

export default async function Home() {
    const noteResults = await Promise.all(noteSlugs.map(getBlogPostBySlug));
    const notes = noteResults.filter((post): post is NonNullable<typeof post> => post !== null);

    return (
        <>
            <FAQStructuredData faqs={homeFAQs} />
            <div className="atelier-home">

                <section className="atelier-hero" id="home" aria-labelledby="atelier-title">
                    <Image src="/atelier/hero.webp" alt="" fill priority sizes="100vw" className="atelier-hero-image" aria-hidden="true" />
                    <div className="atelier-hero-shade" />
                    <div className="atelier-hero-content">
                        <div className="atelier-hero-copy">
                            <span className="atelier-overline">Creative technologist / Personal archive</span>
                            <h1 id="atelier-title">YunHai</h1>
                            <p className="atelier-chinese-name">云 云 亦 海</p>
                            <p className="atelier-hero-intro">在技术与人文之间，<br />寻找更大的可能。</p>
                            <p className="atelier-hero-english">Exploring a more open,<br />intelligent and human future.</p>
                        </div>
                        <div className="atelier-hero-aside"><span>Technology</span><span>Humanity</span><span>A More Open Future</span><i /></div>
                        <div className="atelier-hero-vertical" aria-hidden="true">似 云<br />亦 如 海<br /><span />流 动 的 思 考<br />无 垠 的 可 能</div>
                    </div>
                    <div className="atelier-hero-bottom">
                        <a href="#thinking" className="atelier-scroll-hint">SCROLL <ArrowDown size={15} aria-hidden="true" /></a>
                        <div className="atelier-page-count"><strong>01</strong><span>/ 04</span></div>
                    </div>
                </section>

                <section className="atelier-section atelier-thinking" id="thinking" aria-labelledby="thinking-title">
                    <div className="atelier-section-inner atelier-editorial-grid">
                        <div className="atelier-section-intro">
                            <SectionLabel number="02" english="Thinking" /><h2 id="thinking-title">思考</h2>
                            <p>从更大的视角，理解技术与世界。<br /><span>Bigger questions. A more open perspective.</span></p>
                            <Link className="atelier-outline-link" href="/blog/">阅读所有文章 <ArrowRight size={15} aria-hidden="true" /></Link>
                        </div>
                        <div className="atelier-thinking-cards">
                            {thinking.map(item => (
                                <Link className="atelier-thinking-card atelier-reveal" href={item.href} key={item.number}>
                                    <Image src={item.image} alt="" fill sizes="(max-width: 720px) 80vw, 25vw" loading="lazy" aria-hidden="true" />
                                    <div className="atelier-card-shade" />
                                    <div className="atelier-thinking-copy"><small>{item.number}</small><h3>{item.title}</h3><span>{item.subtitle}</span><p>{item.description}</p></div>
                                    <ArrowUpRight className="atelier-card-arrow" size={17} aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="atelier-section atelier-works" id="works" aria-labelledby="works-title">
                    <div className="atelier-section-inner atelier-works-grid">
                        <div className="atelier-section-intro">
                            <SectionLabel number="03" english="Selected works" /><h2 id="works-title">作品</h2>
                            <p>用技术创造具体的价值，<br />也探索更多可能的表达方式。<br /><span>Turning ideas into real things, and exploring more ways to create.</span></p>
                            <Link className="atelier-outline-link" href="/about/">了解更多 <ArrowRight size={15} aria-hidden="true" /></Link>
                        </div>
                        <div className="atelier-featured-visual atelier-reveal">
                            <Image src="/atelier/featured-work.webp" alt="玻璃展柜中的通透雕塑，象征 Clouisle 的智能与知识连接" fill sizes="(max-width: 900px) 100vw, 40vw" loading="lazy" />
                            <span>YH / SELECTED WORKS</span>
                        </div>
                        <div className="atelier-works-list">
                            <div className="atelier-main-work">
                                <span className="atelier-work-number">01 / AI PRODUCT</span><h3>Clouisle</h3>
                                <p className="atelier-work-subtitle">在云与思考之间</p>
                                <p>一个关于思考、记录与连接的 AI 工作空间。将 Agent、工作流与知识库放在同一处，让复杂的想法真正落地。</p>
                                <a href="https://clouisle.asia/" target="_blank" rel="noopener noreferrer" className="atelier-text-link">参观项目 <ArrowUpRight size={15} aria-hidden="true" /></a>
                            </div>
                            {smallerWorks.map(item => (
                                <a className="atelier-small-work" href={item.href} target="_blank" rel="noopener noreferrer" key={item.number}>
                                    <div className="atelier-small-work-image"><Image src={item.image} alt="" fill sizes="84px" loading="lazy" aria-hidden="true" /></div>
                                    <div><span>{item.number} / OPEN SOURCE</span><strong>{item.title}</strong><small>{item.label}</small></div>
                                    <ArrowUpRight size={15} aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="atelier-section atelier-notes" id="notes" aria-labelledby="notes-title">
                    <div className="atelier-section-inner atelier-editorial-grid">
                        <div className="atelier-section-intro">
                            <SectionLabel number="04" english="Notes" /><h2 id="notes-title">记录</h2>
                            <p>记录思考的片段，<br />也记录生活的痕迹。<br /><span>Notes on technology, life, and everything in between.</span></p>
                            <Link className="atelier-outline-link" href="/blog/">阅读所有记录 <ArrowRight size={15} aria-hidden="true" /></Link>
                        </div>
                        <div className="atelier-note-cards">
                            {notes.map((post, index) => (
                                <Link href={'/blog/' + post.slug + '/'} key={post.slug} className="atelier-note-card atelier-reveal">
                                    <div className="atelier-note-image"><Image src={'/atelier/note-' + index + '.webp'} alt="" fill sizes="(max-width: 720px) 80vw, 25vw" loading="lazy" aria-hidden="true" /></div>
                                    <div className="atelier-note-body">
                                        <span>{displayDate(post.lastEdited)} <i /> {post.category.split(',')[0]}</span>
                                        <h3>{post.title}</h3><p>{post.excerpt}</p><ArrowUpRight size={16} aria-hidden="true" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="atelier-closing" id="explore" aria-labelledby="atelier-explore-title">
                    <Image src="/atelier/closing.webp" alt="" fill sizes="100vw" loading="lazy" className="atelier-closing-image" aria-hidden="true" />
                    <div className="atelier-closing-shade" />
                    <div className="atelier-closing-inner">
                        <div className="atelier-closing-copy">
                            <span className="atelier-overline">The journey continues</span>
                            <h2 id="atelier-explore-title">继续探索<br /><em>Explore More</em></h2>
                            <p>保持好奇，继续前行。<br /><span>Stay curious. Keep exploring.</span></p>
                            <Link className="atelier-closing-link" href="/about/">了解云云亦海 <ArrowRight size={17} aria-hidden="true" /></Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
