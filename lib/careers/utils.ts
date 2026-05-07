import { JOB_POSTS } from './data'
import type { JobPost } from './types'

export function getJobBySlug(slug: string): JobPost | undefined {
  return JOB_POSTS.find((job) => job.slug === slug)
}

export function getAllJobSlugs(): string[] {
  return JOB_POSTS.map((job) => job.slug)
}

export function getAllJobs(): JobPost[] {
  return JOB_POSTS
}

export function tCareer<T extends { pl: string; en: string }>(
  obj: T,
  locale: 'pl' | 'en'
): string {
  return obj[locale]
}
