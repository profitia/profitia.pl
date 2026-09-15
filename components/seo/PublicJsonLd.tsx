import { serializeJsonLd } from '@/lib/articles/article-seo'
import { buildPublicJsonLd } from '@/lib/routing/public-seo'
import type { PublicLocale, PublicRouteId } from '@/lib/routing/public-routes'

interface PublicJsonLdProps {
  routeId: PublicRouteId
  locale: PublicLocale
  title: string
  description?: string
}

export function PublicJsonLd({ routeId, locale, title, description }: PublicJsonLdProps) {
  const jsonLd = buildPublicJsonLd(routeId, locale, { title, description })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  )
}