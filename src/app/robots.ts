import { MetadataRoute } from 'next'
import { baseUrl } from '@/config/site'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/test/', '/share/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/test/', '/share/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/test/', '/share/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
