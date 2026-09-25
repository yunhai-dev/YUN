'use client';

import dynamic from 'next/dynamic';
import {ArrowDown, ArrowUpRight} from 'lucide-react';
import {Link} from 'next-view-transitions';
import {useCallback, useEffect, useRef, useState} from 'react';
import './gallery-story.css';

const GalleryScene = dynamic(() => import('./gallery-scene').then(mod => mod.GalleryScene), {ssr: false});

const chapters = [
    {
        id: 'entrance', number: '00', kicker: 'An invitation to wander',
        title: '把好奇心，\n留在路上。',
        description: '这里是云云亦海的个人数字艺术馆。沿着一条参观路径，认识一个持续思考、创造与记录的开发者。',
        detail: 'YunHai · Developer / Maker / Writer',
        link: {href: '/about/', label: '认识我'},
    },
    {
        id: 'author', number: '01', kicker: 'The person behind the work',
        title: '云云亦海',
        description: '我把技术当作表达方式：写代码，也写下问题、过程和新的可能。从 AI 应用到日常工具，每件作品都始于一次认真观察。',
        detail: '思考 · 构建 · 记录',
        link: {href: '/about/', label: '关于 YunHai'},
    },
    {
        id: 'clouisle', number: '02', kicker: 'Selected work / AI',
        title: 'Clouisle',
        description: '让 AI Agent、工作流与知识库在同一个空间协作。它是我对实用 AI 产品的一次长期探索。',
        detail: 'AI Agent · Workflow · Knowledge',
        link: {href: 'https://clouisle.asia/', label: '参观 Clouisle'},
    },
    {
        id: 'crawlsy', number: '03', kicker: 'Selected work / Open source',
        title: 'Crawlsy',
        description: '从分散的采集任务到可管理的网络：让爬虫的运行、组织与观察变得清晰。',
        detail: 'Collection network · Open source',
        link: {href: 'https://github.com/yunhai-dev/crawlsy', label: '查看开源项目'},
    },
    {
        id: 'archive', number: '04', kicker: 'An ongoing archive',
        title: '文章与记录',
        description: '作品会完成，思考仍会继续。这里保存技术笔记、实践复盘，以及下一件作品开始前的线索。',
        detail: 'Writing · Notes · Discoveries',
        link: {href: '/blog/', label: '进入文章档案'},
    },
];

const destinations = [
    {href: '/about/', label: '关于我', english: 'About'},
    {href: '/blog/', label: '文章', english: 'Journal'},
    {href: '/docs/', label: '文档', english: 'Notes'},
    {href: '/tools/', label: '工具', english: 'Tools'},
];

export function GalleryStory() {
    const rootRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState(0);
    const [sceneState, setSceneState] = useState<'loading' | 'ready' | 'unavailable'>('loading');
    const [reducedMotion, setReducedMotion] = useState(false);
    const [sceneVisible, setSceneVisible] = useState(false);

    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReducedMotion(preference.matches);
        update();
        preference.addEventListener('change', update);
        return () => preference.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const observer = new IntersectionObserver(([entry]) => {
            setSceneVisible(entry.isIntersecting);
            if (!entry.isIntersecting) setSceneState(previous => previous === 'ready' ? 'loading' : previous);
        }, {rootMargin: '150px'});
        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const root = rootRef.current;
            if (!root) return;
            const range = Math.max(1, root.offsetHeight - window.innerHeight);
            const next = Math.max(0, Math.min(1, -root.getBoundingClientRect().top / range));
            setProgress(previous => Math.abs(previous - next) < 0.0005 ? previous : next);
            setActive(Math.min(chapters.length - 1, Math.round(next * (chapters.length - 1))));
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', schedule, {passive: true});
        window.addEventListener('resize', schedule);
        return () => {
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const onSceneReady = useCallback(() => setSceneState('ready'), []);
    const onSceneError = useCallback(() => setSceneState('unavailable'), []);

    return (
        <div className="gallery-home">
            <div className="gallery-story" ref={rootRef}>
                <div className="gallery-stage" aria-hidden="true">
                    {chapters.map((chapter, index) => (
                        <div key={chapter.id} className={'gallery-poster ' + (active === index ? 'is-active' : '')}
                             style={{backgroundImage: 'url(/gallery/station-' + chapter.number + '.webp)'}} />
                    ))}
                    {!reducedMotion && sceneVisible && sceneState !== 'unavailable' && (
                        <div className={'gallery-canvas ' + (sceneState === 'ready' ? 'is-ready' : '')}>
                            <GalleryScene progress={progress} onReady={onSceneReady} onError={onSceneError} />
                        </div>
                    )}
                    <div className="gallery-stage-vignette" />
                    <div className="gallery-stage-status">
                        <span className="gallery-status-dot" />
                        {reducedMotion ? '静态参观' : sceneState === 'loading' ? '正在布置展厅' : sceneState === 'ready' ? '场景已就绪' : '预览模式'}
                    </div>
                    <div className="gallery-progress" style={{'--gallery-progress': (progress * 100) + '%'} as React.CSSProperties}>
                        <span>YUNHAI / GALLERY</span>
                        <div className="gallery-progress-track"><div /></div>
                        <span>{String(active + 1).padStart(2, '0')} / 05</span>
                    </div>
                </div>

                <div className="gallery-chapters">
                    {chapters.map((chapter, index) => (
                        <section className={'gallery-chapter gallery-chapter-' + index} id={chapter.id} key={chapter.id}
                                 aria-label={chapter.number + ' ' + chapter.title.replace('\n', '')}>
                            <div className="gallery-caption">
                                <div className="gallery-caption-top"><span>{chapter.number} / 04</span><span>{chapter.kicker}</span></div>
                                <div className="gallery-caption-rule" />
                                {index === 0 ? <h1>{chapter.title}</h1> : <h2>{chapter.title}</h2>}
                                <p>{chapter.description}</p>
                                <div className="gallery-caption-bottom">
                                    <span>{chapter.detail}</span>
                                    {chapter.link.href.startsWith('http') ? (
                                        <a href={chapter.link.href} target="_blank" rel="noopener noreferrer" className="gallery-caption-link">
                                            {chapter.link.label}<ArrowUpRight size={16} aria-hidden="true" />
                                        </a>
                                    ) : (
                                        <Link href={chapter.link.href} className="gallery-caption-link">
                                            {chapter.link.label}<ArrowUpRight size={16} aria-hidden="true" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                            {index === 0 && <div className="gallery-scroll-cue"><span>向下滚动，开始参观</span><ArrowDown size={16} aria-hidden="true" /></div>}
                        </section>
                    ))}
                </div>
            </div>

            <section className="gallery-exit" aria-labelledby="gallery-exit-title">
                <div className="gallery-exit-inner">
                    <span className="gallery-exit-kicker">The visit continues</span>
                    <h2 id="gallery-exit-title">走出展厅，继续探索。</h2>
                    <p>还有更多文章、笔记与日常使用的小工具，等你慢慢发现。</p>
                    <div className="gallery-destinations">
                        {destinations.map(item => (
                            <Link href={item.href} key={item.href} className="gallery-destination">
                                <span>{item.english}</span><strong>{item.label}</strong><ArrowUpRight size={19} aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
