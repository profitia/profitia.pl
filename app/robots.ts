import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/articles/article-seo'

export default function robots(): MetadataRoute.Robots {
  if (process.env.PROFITIA_PREVIEW_SITE === 'true') {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  }
}
