import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import AdvisoryWidget from '@/components/AdvisoryWidget'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const isPreviewSite = process.env.PROFITIA_PREVIEW_SITE === 'true'

export const metadata: Metadata = {
  title: {
    template: '%s | Profitia',
    default: 'Profitia - Doradztwo w zakupach',
  },
  description: 'Profitia to firma doradcza specjalizująca się w optymalizacji zakupów, negocjacjach z dostawcami i budowaniu przewagi kosztowej.',
  metadataBase: new URL('https://profitia.pl'),
  ...(isPreviewSite
    ? {
        robots: {
          index: false,
          follow: false,
          nocache: true,
        },
      }
    : {}),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <AdvisoryWidget />
      </body>
    </html>
  )
}
