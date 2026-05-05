import type { Metadata } from 'next'
import '@/styles/globals.css'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: {
    template: '%s | Profitia',
    default: 'Profitia - Doradztwo w zakupach',
  },
  description: 'Profitia - eksperci w zakresie optymalizacji zakupów i negocjacji z dostawcami.',
  metadataBase: new URL('https://www.profitia.pl'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
