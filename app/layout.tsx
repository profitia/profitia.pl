import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@profitia/advisory-widget/styles.css'
import '@profitia/advisory-widget/styles.css'
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
      <head>
        <script
          id="ga4-consent-default"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied'
              });
              gtag('js', new Date());
              if ((location.hostname === 'profitia.pl' || location.hostname === 'www.profitia.pl') && !location.pathname.startsWith('/admin')) {
                gtag('config', 'G-5TQDR26KT5', { send_page_view: false });
              }
            `,
          }}
        />
        <script defer src="https://www.googletagmanager.com/gtag/js?id=G-5TQDR26KT5" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <AdvisoryWidget />
      </body>
    </html>
  )
}
