import { redirect } from 'next/navigation'

/**
 * Legacy route - redirected to canonical capability page.
 * Content migrated to /services/projekty-doradcze
 */
export default function Page() {
  redirect('/services/projekty-doradcze')
}
