"use client";
import mermaid from "mermaid";
import {useEffect, useState} from "react";
import '@/components/terminal-player-element';

// 预加载两个主题样式
import 'highlight.js/styles/github-dark-dimmed.css';
import 'highlight.js/styles/github.css';


const MarkdownView = ({contentHtml}: { contentHtml: string }) => {
    const [isDark, setIsDark] = useState(true);

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
        mermaid.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default',
            securityLevel: 'loose'
        })
        setTimeout(() => {
            mermaid.run()
        }, 100)
    }, [contentHtml, isDark]);

    return (
        <div
            className={`prose max-w-none prose-headings:scroll-mt-32
          prose-pre:border prose-pre:rounded-lg
          prose-code:rounded-md prose-code:px-1 prose-code:py-0.5
          prose-pre:!p-0 [&_pre]:overflow-x-auto [&_pre]:p-4
          ${isDark 
            ? 'prose-invert prose-pre:bg-[#0d1117] prose-pre:border-[#30363d] prose-code:text-[#e6edf3] prose-code:bg-[#161b22] [&_pre]:bg-[#0d1117] [&_:not(pre)>code]:bg-[#161b22] [&_.hljs]:!bg-[#0d1117]' 
            : 'prose-pre:bg-[#f6f8fa] prose-pre:border-[#d0d7de] prose-code:text-[#1f2328] prose-code:bg-[#f6f8fa] [&_pre]:bg-[#f6f8fa] [&_:not(pre)>code]:bg-[#f6f8fa] [&_.hljs]:!bg-[#f6f8fa]'
          }`}
            dangerouslySetInnerHTML={{__html: contentHtml}}
        />
    )

}

export default MarkdownView;