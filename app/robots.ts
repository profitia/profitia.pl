import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/articles/article-seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  }
}