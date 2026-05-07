import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCapabilityBySlug, getSlugsByType, t } from '@/lib/capabilities'
import { CapabilityPage } from '@/components/capabilities'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getSlugsByType('education').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cap = getCapabilityBySlug(slug)
  if (!cap) return {}
  return {
    title: t(cap.metadata.title, 'en'),
    description: t(cap.metadata.description, 'en'),
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const cap = getCapabilityBySlug(slug)
  if (!cap || cap.type !== 'education') notFound()

  return <CapabilityPage capability={cap} locale="en" prefix="education" />
}
