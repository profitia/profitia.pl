import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getJobBySlug, tCareer } from '@/lib/careers'
import { CareerJobPage } from '@/components/careers'
import { buildPublicMetadata } from '@/lib/routing/public-seo'
import { getCareerRouteId, getDynamicStaticParams, resolveCareerIdFromSlug } from '@/lib/routing/public-routes'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getDynamicStaticParams('career', 'en')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const jobId = resolveCareerIdFromSlug('en', slug)
  const job = jobId ? getJobBySlug(jobId) : undefined
  if (!job) return {}
  return buildPublicMetadata(getCareerRouteId(job.slug), 'en', {
    title: tCareer(job.metadata.title, 'en'),
    description: tCareer(job.metadata.description, 'en'),
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const jobId = resolveCareerIdFromSlug('en', slug)
  const job = jobId ? getJobBySlug(jobId) : undefined
  if (!job) notFound()

  return <CareerJobPage job={job} locale="en" />
}
