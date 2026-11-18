"use client";
import {useEffect, useRef, useState} from "react";
import '@/components/terminal-player-element';

// 导入两个主题样式，通过 CSS 层叠控制显示
import 'highlight.js/styles/github-dark-dimmed.css';


const MarkdownView = ({contentHtml}: { contentHtml: string }) => {
    const [isDark, setIsDark] = useState<boolean | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mermaidInitialized = useRef(false);

    // 监听主题变化
    useEffect(() => {
        const checkTheme = () => {
            const isLight = document.documentElement.classList.contains('light');
            setIsDark(!isLight);
        };
        
        // 初始检查
        checkTheme();
        
        // 监听 class 变化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkTheme();
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isDark === null || mermaidInitialized.current) return; // 等待主题初始化完成

        const container = containerRef.current;
        if (!container) return;

        // Mermaid 及其依赖（dagre/rough/katex）约 180KB gzip；只有真正包含图表
        // 的文章才值得加载它。
        const nodes = Array.from(container.querySelectorAll<HTMLElement>('.mermaid'));
        if (nodes.length === 0) return;

        mermaidInitialized.current = true;
        let cancelled = false;

        void import('mermaid')
            .then(({default: mermaid}) => {
                if (cancelled) return;
                mermaid.initialize({
                    startOnLoad: false,
                    theme: isDark ? 'dark' : 'default',
                    securityLevel: 'loose'
                });
                return mermaid.run({nodes});
            })
            .catch((error) => {
                console.error('[markdown-view] mermaid render failed:', error);
            });

        return () => {
            cancelled = true;
        };
    }, [contentHtml, isDark]);

    // 使用 content-visibility 和 containment 优化渲染
    const baseClasses = `prose max-w-none prose-headings:scroll-mt-32
          prose-pre:border prose-pre:rounded-lg
          prose-code:font-mono prose-code:rounded-md prose-code:px-1 prose-code:py-0.5
          prose-pre:p-0! [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre_code]:font-mono [&_pre_code_*]:font-mono`;
    
    const themeClasses = isDark === null 
        ? '' // 等待主题初始化时不应用任何样式变化
        : isDark 
            ? 'prose-invert prose-pre:bg-[#0d1117] prose-pre:border-[#30363d] prose-code:text-[#e6edf3] prose-code:bg-[#161b22] [&_pre]:bg-[#0d1117] [&_:not(pre)>code]:bg-[#161b22] [&_.hljs]:bg-[#0d1117]!'
            : 'hljs-light prose-pre:bg-[#f6f8fa] prose-pre:border-[#d0d7de] prose-code:text-[#1f2328] prose-code:bg-[#f6f8fa] [&_pre]:bg-[#f6f8fa] [&_:not(pre)>code]:bg-[#f6f8fa] [&_.hljs]:bg-[#f6f8fa]!';

    return (
        <div
            ref={containerRef}
            className={`${baseClasses} ${themeClasses}`}
            dangerouslySetInnerHTML={{__html: contentHtml}}
            suppressHydrationWarning
        />
    )

}

export default MarkdownView;