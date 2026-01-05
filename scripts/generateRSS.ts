import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

function generateRSS(): string {
    const posts = getAllBlogPosts();
    const now = new Date().toUTCString();

    const items = posts.slice(0, 20).map(post => {
        const pubDate = new Date(convertChineseDateToISO(post.lastEdited)).toUTCString();
        
        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category.split(',')[0])}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    }).join('');

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
      <url>${siteUrl}/icons/icon-192.png</url>
      <title>${siteName}</title>
      <link>${siteUrl}</link>
    </image>${items}
  </channel>
</rss>`;
}

function generateAtom(): string {
    const posts = getAllBlogPosts();
    const now = new Date().toISOString();

    const entries = posts.slice(0, 20).map(post => {
        const updated = convertChineseDateToISO(post.lastEdited);
        
        return `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${siteUrl}/blog/${post.slug}"/>
    <id>${siteUrl}/blog/${post.slug}</id>
    <updated>${updated}</updated>
    <summary>${escapeXml(post.excerpt)}</summary>
    <category term="${escapeXml(post.category.split(',')[0])}"/>
    <author>
      <name>YunHai</name>
    </author>
  </entry>`;
    }).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${siteName}</title>
  <link href="${siteUrl}"/>
  <link href="${siteUrl}/atom.xml" rel="self"/>
  <id>${siteUrl}/</id>
  <updated>${now}</updated>
  <subtitle>专注于技术文章、项目经验、生活点滴与云端分享。</subtitle>
  <author>
    <name>YunHai</name>
    <uri>${siteUrl}</uri>
  </author>${entries}
</feed>`;
}

// 主函数
function main() {
    const publicDir = path.join(process.cwd(), 'public');
    
    // 生成 RSS 2.0
    const rss = generateRSS();
    fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss, 'utf8');
    console.log('✅ RSS feed 已生成: public/rss.xml');
    
    // 生成 Atom
    const atom = generateAtom();
    fs.writeFileSync(path.join(publicDir, 'atom.xml'), atom, 'utf8');
    console.log('✅ Atom feed 已生成: public/atom.xml');
}

main();
