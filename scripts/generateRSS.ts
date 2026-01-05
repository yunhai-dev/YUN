import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Marked, Renderer } from 'marked';
import hljs from 'highlight.js';

const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');
const siteUrl = 'https://www.yhnotes.com';
const siteName = 'YunHai Ideas 云海创意';

interface BlogPostForRSS {
    slug: string;
    title: string;
    category: string;
    lastEdited: string;
    excerpt: string;
    content: string;
}

function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function convertChineseDateToISO(dateStr: string): string {
    const match = dateStr.match(/(\d{4}).(\d{1,2}).(\d{1,2})./);
    if (!match) return new Date().toISOString();
    
    const year = match[1];
    const month = match[2].padStart(2, '0');
    const day = match[3].padStart(2, '0');
    
    return new Date(`${year}-${month}-${day}`).toISOString();
}

function getAllBlogPosts(): BlogPostForRSS[] {
    if (!fs.existsSync(blogsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(blogsDirectory);

    const allPosts = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const fullPath = path.join(blogsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const stats = fs.statSync(fullPath);
            const { data, content } = matter(fileContents);
            const slug = fileName.replace(/\.md$/, '');
            const lastEdited = data.lastEdited || new Date(stats.mtimeMs).toISOString();

            return {
                slug,
                title: data.title || '无标题',
                category: data.category || '未分类',
                lastEdited,
                excerpt: data.excerpt || content.slice(0, 200).replace(/[#*`\[\]]/g, '') + '...',
                content,
            };
        });

    return allPosts.sort((a, b) => {
        const dateA = convertChineseDateToISO(a.lastEdited);
        const dateB = convertChineseDateToISO(b.lastEdited);
        return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
}

// 使用 marked 和 highlight.js 将 Markdown 转换为 HTML（与网站保持一致）
async function markdownToHtml(markdown: string): Promise<string> {
    // 移除 frontmatter
    const contentWithoutFrontmatter = markdown.replace(/^---[\s\S]*?---\n*/m, '');
    
    const renderer: Partial<Renderer> = {
        // 处理代码块
        code({ text, lang }) {
            const langName = lang ? lang.split(' ')[0] : '';
            if (langName === 'mermaid') {
                return `<pre class="mermaid">${text}</pre>`;
            }
            const validLang = lang && hljs.getLanguage(langName) ? langName : 'plaintext';
            const highlighted = hljs.highlight(text, { language: validLang }).value;
            return `<pre><code class="hljs ${validLang}">${highlighted}</code></pre>`;
        },

        // 处理行内代码
        codespan({ text }) {
            return `<code>${text}</code>`;
        },

        // 处理标题
        heading({ tokens, depth }) {
            const text = this.parser!.parseInline(tokens);
            return `<h${depth}>${text}</h${depth}>\n`;
        },

        // 处理段落
        paragraph({ tokens }) {
            const text = this.parser!.parseInline(tokens);
            return `<p>${text}</p>\n`;
        },

        // 处理图片 - 转换为绝对路径
        image({ href, title, text }) {
            const absoluteHref = href?.startsWith('http') ? href : `${siteUrl}${href}`;
            return `<img src="${absoluteHref}" alt="${text}" title="${title ?? ''}" />`;
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
            
            return `<table>\n<thead>\n<tr>\n${headerCells}\n</tr>\n</thead>\n<tbody>\n${bodyRows}\n</tbody>\n</table>\n`;
        },

        // 处理链接 - 转换为绝对路径
        link({ href, title, tokens }) {
            const text = this.parser!.parseInline(tokens);
            const absoluteHref = href?.startsWith('http') || href?.startsWith('/') 
                ? (href.startsWith('/') ? `${siteUrl}${href}` : href)
                : href;
            return `<a href="${absoluteHref}" title="${title ?? ''}">${text}</a>`;
        },

        // 处理引用块
        blockquote({ tokens }) {
            const content = this.parser!.parse(tokens);
            return `<blockquote>${content}</blockquote>\n`;
        },

        // 处理列表
        list(token) {
            const tag = token.ordered ? 'ol' : 'ul';
            const items = token.items.map(item => {
                const content = this.parser!.parse(item.tokens);
                return `<li>${content}</li>`;
            }).join('\n');
            return `<${tag}>\n${items}\n</${tag}>\n`;
        },

        // 处理水平线
        hr() {
            return '<hr />\n';
        }
    };

    const marked = new Marked();
    marked.use({ renderer });

    const content = await marked.parse(contentWithoutFrontmatter);
    return content;
}

async function generateRSS(): Promise<string> {
    const posts = getAllBlogPosts();
    const now = new Date().toUTCString();
    const avatarUrl = 'https://rustfs-endpoint.yhnotes.com/content/Avatar.webp';

    const items = await Promise.all(posts.slice(0, 20).map(async post => {
        const pubDate = new Date(convertChineseDateToISO(post.lastEdited)).toUTCString();
        const htmlContent = await markdownToHtml(post.content);
        
        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
      <category>${escapeXml(post.category.split(',')[0])}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    }));

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteName}</title>
    <link>${siteUrl}</link>
    <description>专注于技术文章、项目经验、生活点滴与云端分享。</description>
    <language>zh-CN</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${avatarUrl}</url>
      <title>${siteName}</title>
      <link>${siteUrl}</link>
    </image>${items.join('')}
  </channel>
</rss>`;
}

async function generateAtom(): Promise<string> {
    const posts = getAllBlogPosts();
    const now = new Date().toISOString();
    const avatarUrl = 'https://rustfs-endpoint.yhnotes.com/content/Avatar.webp';

    const entries = await Promise.all(posts.slice(0, 20).map(async post => {
        const updated = convertChineseDateToISO(post.lastEdited);
        const htmlContent = await markdownToHtml(post.content);
        
        return `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${siteUrl}/blog/${post.slug}"/>
    <id>${siteUrl}/blog/${post.slug}</id>
    <updated>${updated}</updated>
    <summary>${escapeXml(post.excerpt)}</summary>
    <content type="html"><![CDATA[${htmlContent}]]></content>
    <category term="${escapeXml(post.category.split(',')[0])}"/>
    <author>
      <name>YunHai</name>
    </author>
  </entry>`;
    }));

    return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${siteName}</title>
  <link href="${siteUrl}"/>
  <link href="${siteUrl}/atom.xml" rel="self"/>
  <id>${siteUrl}/</id>
  <updated>${now}</updated>
  <subtitle>专注于技术文章、项目经验、生活点滴与云端分享。</subtitle>
  <icon>${avatarUrl}</icon>
  <logo>${avatarUrl}</logo>
  <author>
    <name>YunHai</name>
    <uri>${siteUrl}</uri>
  </author>${entries.join('')}
</feed>`;
}

// 主函数
async function main() {
    const publicDir = path.join(process.cwd(), 'public');
    
    // 生成 RSS 2.0
    const rss = await generateRSS();
    fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss, 'utf8');
    console.log('✅ RSS feed 已生成: public/rss.xml');
    
    // 生成 Atom
    const atom = await generateAtom();
    fs.writeFileSync(path.join(publicDir, 'atom.xml'), atom, 'utf8');
    console.log('✅ Atom feed 已生成: public/atom.xml');
}

main();
