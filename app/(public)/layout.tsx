import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NewsletterStrip from '@/components/layout/NewsletterStrip'
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
      <NewsletterStrip />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </ConsentProvider>
  )
}
