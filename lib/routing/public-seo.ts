import type { Metadata } from 'next'
import { getSiteUrl } from '@/lib/articles/article-seo'
import { getPublicPath, getPublicRouteById, type PublicLocale, type PublicRouteId } from './public-routes'

export function getAbsolutePublicUrl(routeId: PublicRouteId, locale: PublicLocale): string {
  return new URL(getPublicPath(routeId, locale), `${getSiteUrl()}/`).toString()
}

export function buildPublicMetadata(
  routeId: PublicRouteId,
  locale: PublicLocale,
  input: {
    title: string
    description?: string
  },
): Metadata {
  const canonical = getAbsolutePublicUrl(routeId, locale)
  const languages = {
    pl: getAbsolutePublicUrl(routeId, 'pl'),
    en: getAbsolutePublicUrl(routeId, 'en'),
    'x-default': getAbsolutePublicUrl(routeId, 'pl'),
  }

  return {
    title: input.title,
    ...(input.description ? { description: input.description } : {}),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: input.title,
      ...(input.description ? { description: input.description } : {}),
      url: canonical,
    },
  }
}

function getPublicSchemaType(routeId: PublicRouteId): string {
  if (routeId === 'home') return 'WebSite'
  if (routeId === 'services:index' || routeId === 'products:index' || routeId === 'education:index' || routeId === 'career:index') {
    return 'CollectionPage'
  }
  if (routeId === 'about') return 'AboutPage'
  if (routeId === 'contact') return 'ContactPage'
  return 'WebPage'
}

export function buildPublicJsonLd(
  routeId: PublicRouteId,
  locale: PublicLocale,
  input: {
    title: string
    description?: string
  },
): Record<string, unknown> {
  const canonical = getAbsolutePublicUrl(routeId, locale)
  const route = getPublicRouteById(routeId)

  return {
    '@context': 'https://schema.org',
    '@type': getPublicSchemaType(routeId),
    name: input.title,
    ...(input.description ? { description: input.description } : {}),
    url: canonical,
    inLanguage: locale === 'pl' ? 'pl-PL' : 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Profitia',
      url: `${getSiteUrl()}/`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    ...(route?.kind ? { about: route.kind } : {}),
  }
}