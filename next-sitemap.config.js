const baseUrl = 'https://www.yhnotes.com';

/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: baseUrl,
    generateRobotsTxt: false,
    outDir: './out',
    generateIndexSitemap: false,
    sitemapSize: 5000,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/test', '/test/*', '/share', '/share/*', '/api', '/api/*'],
    // 为不同类型的页面设置不同的优先级
    transform: async (config, path) => {
        // 首页最高优先级
        if (path === '/') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }
        
        // 博客和文档页面较高优先级
        if (path.startsWith('/blog/') || path.startsWith('/docs/')) {
            return {
                loc: path,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: new Date().toISOString(),
            };
        }
        
        // 列表页面
        if (path === '/blog' || path === '/docs' || path === '/tools') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 0.9,
                lastmod: new Date().toISOString(),
            };
        }
        
        // 静态页面
        if (path === '/about' || path === '/contact') {
            return {
                loc: path,
                changefreq: 'monthly',
                priority: 0.6,
                lastmod: new Date().toISOString(),
            };
        }
        
        // 默认配置
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: new Date().toISOString(),
        };
    },
};
