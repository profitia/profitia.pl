import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicesPage from '@/components/pages/ServicesPage'
import { getDigitalServiceContent, isDigitalServiceId } from '@/components/pages/digitalServicesCatalog'
import { buildPublicMetadata } from '@/lib/routing/public-seo'
import { getCapabilityRouteId, getDynamicStaticParams, resolveCapabilityIdFromSlug } from '@/lib/routing/public-routes'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getDynamicStaticParams('digital-service', 'pl')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('digital-service', 'pl', slug)
  if (!capabilityId || !isDigitalServiceId(capabilityId)) return {}
  const content = getDigitalServiceContent('pl', capabilityId)

  return buildPublicMetadata(getCapabilityRouteId('digital-service', capabilityId), 'pl', content.seo)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const capabilityId = resolveCapabilityIdFromSlug('digital-service', 'pl', slug)
  if (!capabilityId || !isDigitalServiceId(capabilityId)) notFound()
  const content = getDigitalServiceContent('pl', capabilityId)

  return (
    <ServicesPage
      locale="pl"
      routeId={getCapabilityRouteId('digital-service', capabilityId)}
      hero={content.hero}
      seo={content.seo}
      domains={content.domains}
    />
  )
}
