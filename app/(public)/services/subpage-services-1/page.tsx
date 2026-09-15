import { redirect } from 'next/navigation'

/**
 * Legacy route - redirected to canonical capability page.
 * Content migrated to /doradztwo/uslugi/projekty-doradcze
 */
export default function Page() {
  redirect('/doradztwo/uslugi/projekty-doradcze')
}
