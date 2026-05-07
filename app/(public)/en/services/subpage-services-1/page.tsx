import { redirect } from 'next/navigation'

/**
 * Legacy route - redirected to canonical capability page.
 * Content migrated to /en/services/projekty-doradcze
 */
export default function Page() {
  redirect('/en/services/projekty-doradcze')
}
