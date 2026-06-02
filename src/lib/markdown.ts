import {Marked, Renderer} from 'marked';
import hljs from 'highlight.js';
import {alertBlock} from "@/lib/marked-extensions";
import {terminalPlayerExtension} from "@/lib/terminal-player-extension";


export interface TableOfContents {
    id: string;
    title: string;
    level: number;
    number?: string;
}

// 定义 SVG 图标
const clipboardSvg = `<svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg>`;

const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, char => htmlEscapeMap[char]);

const cssColorPattern = /^(?:#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})|(?:rgb|hsl)a?\(\s*[-+]?\d+(?:\.\d+)?%?(?:\s*,\s*|\s+)[-+]?\d+(?:\.\d+)?%?(?:\s*,\s*|\s+)[-+]?\d+(?:\.\d+)?%?(?:(?:\s*,\s*|\s*\/\s*)[-+]?\d+(?:\.\d+)?%?)?\s*\))$/i;

const renderColorCode = (text: string): string | null => {
    const color = text.trim();

    if (!cssColorPattern.test(color)) {
        return null;
    }

    return `<code class="markdown-color-code"><span aria-hidden="true" style="background-color: ${color};"></span>${escapeHtml(text)}</code>`;
};

export async function markdownToHtml(markdown: string): Promise<{ content: string; headings: TableOfContents[] }> {
    const headings: TableOfContents[] = [];
    const idCount: Record<string, number> = {};
    let mermaidIdCounter = 0;

    // 生成唯一的标题 ID
    const generateHeadingId = (text: string): string => {
        let id = text
            .toLowerCase()
            .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s-]/g, "")
            .replace(/\s+/g, "-");

        id = `toc-${id}`;

        if (idCount[id] !== undefined) {
            idCount[id] += 1;
            id = `${id}-${idCount[id]}`;
        } else {
            idCount[id] = 0;
        }

        return id;
    };

    const renderer: Partial<Renderer> = {
        // 处理代码块
        code({text, lang}) {
            const [langName, filename] = lang === undefined ? ["", ""] : (lang as string).split(' ');
            if (langName === 'mermaid') {
                // 使用递增计数器
                const uniqueId = `mermaid-${mermaidIdCounter++}`;
                return `<div class="mermaid" id="${uniqueId}" style="white-space: break-spaces">${text}</div>`;
            }
            const validLang = lang && hljs.getLanguage(langName) ? langName : "plaintext";
            const highlighted = hljs.highlight(text, {language: validLang}).value;
            const macAction = '<div class="size-[12px] bg-red-600 rounded-full"></div> <div class="size-[12px] bg-yellow-600 rounded-full"></div> <div class="size-[12px] bg-green-600 rounded-full"></div>'
            const header = `<div class="flex justify-between items-center code-header"><div class="filename flex items-center gap-1">${macAction}${filename ? filename : ''}</div><div class="flex items-center gap-2"><div class="langname">${langName}</div><button class="copy-btn" data-code="${encodeURIComponent(text)}" title="复制代码">${clipboardSvg}</button></div></div>`;

            return `<pre>${header}<code class="hljs ${validLang}">${highlighted}</code></pre>`;
        },

        // 处理行内代码
        codespan({text}) {
            const colorCode = renderColorCode(text);

            if (colorCode) {
                return colorCode;
            }

            const highlighted = hljs.highlight(text, {language: 'bash'}).value;
            return `<code style="white-space: pre-wrap; word-break: break-all;">${highlighted}</code>`;
        },

        // 处理标题
        heading({tokens, depth}) {
            const text = this.parser!.parseInline(tokens);
            const customIdMatch = text.match(/\s*\{#([A-Za-z0-9_-]+)}$/);
            const title = customIdMatch ? text.slice(0, customIdMatch.index) : text;
            const id = customIdMatch ? customIdMatch[1] : generateHeadingId(title);
            headings.push({id, title: title.replace(/<[^>]*>/g, ''), level: depth});
            return `<h${depth} id="${id}">${title}</h${depth}>\n`;
        },

        // 处理段落
        paragraph({tokens}) {
            const text = this.parser!.parseInline(tokens);
            return `<p class="whitespace-pre-wrap">${text}</p>\n`;
        },

        // 处理图片
        image({href, title, text}) {
            return `<img src="${href}" alt="${text}" title="${title ?? ''}" class="mk-img bg-card border border-border p-1" loading="lazy" decoding="async" />`;
        },

        // 处理表格
        table(token) {
            const headerCells = token.header.map(cell => {
                const align = cell.align ? ` style="text-align:${cell.align}"` : '';
                const content = this.parser!.parseInline(cell.tokens);
                return `<th${align}>${content}</th>`;
            }).join('\n');
            
            const bodyRows = token.rows.map(row => {
                const cells = row.map(cell => {
                    const align = cell.align ? ` style="text-align:${cell.align}"` : '';
                    const content = this.parser!.parseInline(cell.tokens);
                    return `<td${align}>${content}</td>`;
                }).join('\n');
                return `<tr>\n${cells}\n</tr>`;
            }).join('\n');
            
            return `<div class="overflow-x-auto marked-table"><table>\n<thead>\n<tr>\n${headerCells}\n</tr>\n</thead>\n<tbody>\n${bodyRows}\n</tbody>\n</table></div>\n`;
        },

        // 处理链接
        link({href, title, tokens}) {
            const text = this.parser!.parseInline(tokens);
            return `<a href="${href}" title="${title ?? ''}" class="text-blue-500 hover:underline dark:text-blue-400">${text}</a>`;
        }
    };

    const marked = new Marked();
    marked.use({renderer});
    marked.use({extensions: [alertBlock, terminalPlayerExtension]});

    const content = await marked.parse(markdown);

    return {content, headings};
}