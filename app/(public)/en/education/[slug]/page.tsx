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
  return getDynamicStaticParams('education', 'en')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('education', 'en', slug)
  const cap = capabilityId ? getCapabilityBySlug(capabilityId) : undefined
  if (!cap) return {}
  return buildPublicMetadata(getCapabilityRouteId('education', cap.slug), 'en', {
    title: t(cap.metadata.title, 'en'),
    description: t(cap.metadata.description, 'en'),
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('education', 'en', slug)
  const cap = capabilityId ? getCapabilityBySlug(capabilityId) : undefined
  if (!cap || cap.type !== 'education') notFound()

  return <CapabilityPage capability={cap} locale="en" prefix="education" />
}
