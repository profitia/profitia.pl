import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import ChatWidget from '@/components/ChatWidget'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Profitia',
    default: 'Profitia - Doradztwo w zakupach',
  },
  description: 'Profitia to firma doradcza specjalizująca się w optymalizacji zakupów, negocjacjach z dostawcami i budowaniu przewagi kosztowej.',
  metadataBase: new URL('https://www.profitia.pl'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
