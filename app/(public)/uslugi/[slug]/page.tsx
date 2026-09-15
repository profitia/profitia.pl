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
  return getDynamicStaticParams('service', 'pl')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('service', 'pl', slug)
  const cap = capabilityId ? getCapabilityBySlug(capabilityId) : undefined
  if (!cap) return {}

  return buildPublicMetadata(getCapabilityRouteId('service', cap.slug), 'pl', {
    title: t(cap.metadata.title, 'pl'),
    description: t(cap.metadata.description, 'pl'),
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('service', 'pl', slug)
  const cap = capabilityId ? getCapabilityBySlug(capabilityId) : undefined
  if (!cap || cap.type !== 'service') notFound()

  if (cap.slug === 'analiza-spot') {
    return <SpotAnalysisPage locale="pl" />
  }

  return <CapabilityPage capability={cap} locale="pl" prefix="services" />
}