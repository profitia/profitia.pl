import { redirect } from 'next/navigation'

/**
 * Legacy route - redirected to canonical capability page.
 * Content migrated to /uslugi/projekty-doradcze
 */
export default function Page() {
  redirect('/uslugi/projekty-doradcze')
}
