import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCapabilityBySlug, getSlugsByType, t } from '@/lib/capabilities'
import { CapabilityPage } from '@/components/capabilities'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getSlugsByType('service').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cap = getCapabilityBySlug(slug)
  if (!cap) return {}
  return {
    title: t(cap.metadata.title, 'pl'),
    description: t(cap.metadata.description, 'pl'),
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const cap = getCapabilityBySlug(slug)
  if (!cap || cap.type !== 'service') notFound()

  return <CapabilityPage capability={cap} locale="pl" prefix="services" />
}
