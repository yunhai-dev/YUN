"use client";
import {useEffect} from "react";
import {useToast} from "@/hooks/use-toast";
import MarkdownView from '@/components/markdown-view';

const BlogClient = ({content}: { content: string }) => {
    const {toast} = useToast()

    useEffect(() => {
        const handleCopyClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const btn = target.closest('.copy-btn') as HTMLElement | null;
            if (btn) {
                const code = decodeURIComponent(btn.getAttribute('data-code') || '');
                navigator.clipboard.writeText(code);
                toast({
                    title: '代码已复制',
                    description: '代码已复制到剪贴板',
                    duration: 2000,
                });
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