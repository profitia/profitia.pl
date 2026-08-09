import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'

export const metadata: Metadata = {
  title: {
    template: '%s | Profitia',
    default: 'Profitia - Doradztwo w zakupach',
  },
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>
}
