import { redirect } from 'next/navigation'

/**
 * Legacy route - redirected to canonical capability page.
 * Content migrated to /en/advisory/services/advisory-projects
 */
export default function Page() {
  redirect('/en/advisory/services/advisory-projects')
}
