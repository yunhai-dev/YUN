"use client";
import dynamic from "next/dynamic";
import {useEffect} from "react";
import {useToast} from "@/hooks/use-toast";

const MarkdownView = dynamic(() => import('@/components/markdown-view'),
    {
        ssr: false,
        loading: () => (
            <div>
                <div className="animate-pulse space-y-6">
                    <div className="flex justify-center mb-10">
                        <div className="h-80 bg-gray-400 rounded w-2/3"></div>
                    </div>
                    <div className="h-6 bg-gray-400 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                    {
                        Array.from({length: 10}).map((_, idx) => (
                            <div key={idx} className="h-6 bg-gray-400 rounded w-full"></div>
                        ))
                    }
                </div>
            </div>
        )
    }
)

const BlogClient = ({content}: { content: string }) => {
    const {toast} = useToast()


    useEffect(() => {
        const handleCopyClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const btn = target.closest('.copy-btn') as HTMLElement | null;
            if (btn) {
                const code = decodeURIComponent(btn.getAttribute('data-code') || '');
                navigator.clipboard.writeText(code);
                btn.classList.add('copied');
                toast({
                    title: '代码已复制',
                    description: '代码已复制到剪贴板',
                    duration: 2000,
                });
                setTimeout(() => btn.classList.remove('copied'), 1000);
            }
        }
        window.addEventListener('click', handleCopyClick as EventListener);
        return () => {
            window.removeEventListener('click', handleCopyClick as EventListener);
        };
    }, [toast])
    return (
        <MarkdownView contentHtml={content}/>
    )
}

export default BlogClient;