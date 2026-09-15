import { permanentRedirect } from 'next/navigation'
import { getPublicPath } from '@/lib/routing/public-routes'

export default function Page() {
  permanentRedirect(getPublicPath('products:index', 'pl'))
}