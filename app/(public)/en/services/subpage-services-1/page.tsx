import { redirect } from 'next/navigation'

/**
 * Legacy route - redirected to canonical capability page.
 * Content migrated to /en/services/advisory-projects
 */
export default function Page() {
  redirect('/en/services/advisory-projects')
}
