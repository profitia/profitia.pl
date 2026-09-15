import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCapabilityBySlug, t } from '@/lib/capabilities'
import { CapabilityPage } from '@/components/capabilities'
import { buildPublicMetadata } from '@/lib/routing/public-seo'
import { getCapabilityRouteId, getDynamicStaticParams, resolveCapabilityIdFromSlug } from '@/lib/routing/public-routes'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getDynamicStaticParams('education', 'pl')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('education', 'pl', slug)
  const cap = capabilityId ? getCapabilityBySlug(capabilityId) : undefined
  if (!cap) return {}

  return buildPublicMetadata(getCapabilityRouteId('education', cap.slug), 'pl', {
    title: t(cap.metadata.title, 'pl'),
    description: t(cap.metadata.description, 'pl'),
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('education', 'pl', slug)
  const cap = capabilityId ? getCapabilityBySlug(capabilityId) : undefined
  if (!cap || cap.type !== 'education') notFound()

  return <CapabilityPage capability={cap} locale="pl" prefix="education" />
}