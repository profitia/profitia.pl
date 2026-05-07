import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getJobBySlug, getAllJobSlugs, tCareer } from '@/lib/careers'
import { CareerJobPage } from '@/components/careers'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)
  if (!job) return {}
  return {
    title: tCareer(job.metadata.title, 'pl'),
    description: tCareer(job.metadata.description, 'pl'),
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const job = getJobBySlug(slug)
  if (!job) notFound()

  return <CareerJobPage job={job} locale="pl" />
}
