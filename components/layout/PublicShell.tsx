import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NewsletterStrip from '@/components/layout/NewsletterStrip'
import { ConsentProvider } from '@/components/consent'
import { LanguageNavigationProvider } from '@/components/layout/LanguageNavigationProvider'

interface PublicShellProps {
  articlePage?: boolean
  children: React.ReactNode
  locale?: 'pl' | 'en'
}

export default function PublicShell({ articlePage = false, children, locale }: PublicShellProps) {
  return (
    <ConsentProvider>
      <LanguageNavigationProvider>
        <NewsletterStrip localeOverride={locale} />
        <Header localeOverride={locale} />
        <main className="min-h-screen">{children}</main>
        <Footer articlePage={articlePage} localeOverride={locale} />
      </LanguageNavigationProvider>
    </ConsentProvider>
  )
}