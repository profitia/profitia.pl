import { notFound, permanentRedirect } from 'next/navigation'
import { getRedirectDestination } from '@/lib/routing/public-routes'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const destination = getRedirectDestination(`/services/${slug}`)
  if (!destination) notFound()
  permanentRedirect(destination)
}
