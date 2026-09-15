import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCapabilityBySlug, t } from '@/lib/capabilities'
import { CapabilityPage } from '@/components/capabilities'
import SpotAnalysisPage from '@/components/pages/SpotAnalysisPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'
import { getCapabilityRouteId, getDynamicStaticParams, resolveCapabilityIdFromSlug } from '@/lib/routing/public-routes'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getDynamicStaticParams('service', 'en')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('service', 'en', slug)
  const cap = capabilityId ? getCapabilityBySlug(capabilityId) : undefined
  if (!cap) return {}
  return buildPublicMetadata(getCapabilityRouteId('service', cap.slug), 'en', {
    title: t(cap.metadata.title, 'en'),
    description: t(cap.metadata.description, 'en'),
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('service', 'en', slug)
  const cap = capabilityId ? getCapabilityBySlug(capabilityId) : undefined
  if (!cap || cap.type !== 'service') notFound()

  if (cap.slug === 'analiza-spot') {
    return <SpotAnalysisPage locale="en" />
  }

  return <CapabilityPage capability={cap} locale="en" prefix="services" />
}
