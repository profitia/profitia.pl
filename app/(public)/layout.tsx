import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ConsentProvider } from '@/components/consent'

export const metadata: Metadata = {
  title: {
    template: '%s | Profitia',
    default: 'Profitia - Doradztwo w zakupach',
  },
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </ConsentProvider>
  )
}
