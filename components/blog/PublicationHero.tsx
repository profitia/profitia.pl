import { RevealWrapper } from '@/components/ui'

/**
 * PublicationHero - Editorial Publication Introduction
 *
 * The opening frame of the blog index.
 * Institutional, minimal - establishes editorial positioning.
 * No marketing energy. Pure publication authority.
 */

const COPY = {
  pl: {
    eyebrow: 'Inteligencja zakupowa',
    h1: 'Wiedza zakupowa',
    intro:
      'Analizy, strategie i inteligencja dla osób odpowiedzialnych za zakupy, koszty i negocjacje. Bez szumu. Tylko substancja.',
  },
  en: {
    eyebrow: 'Procurement Intelligence',
    h1: 'Intelligence',
    intro:
      'Analysis, strategy and intelligence for procurement, cost and negotiation decision-makers. No noise. Only substance.',
  },
}

interface PublicationHeroProps {
  locale: 'pl' | 'en'
  articleCount: number
}

export function PublicationHero({ locale, articleCount }: PublicationHeroProps) {
  const t = COPY[locale]

  return (
    <div className="container-base pt-16 pb-14 lg:pt-24 lg:pb-20 border-b border-gray-100">
      <RevealWrapper delay={0}>
        <div className="max-w-[52rem]">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400 mb-6">
            {t.eyebrow}
            {articleCount > 0 && (
              <span className="ml-4 text-gray-300">
                {articleCount} {locale === 'en' ? (articleCount === 1 ? 'article' : 'articles') : (articleCount === 1 ? 'artykuł' : articleCount < 5 ? 'artykuły' : 'artykułów')}
              </span>
            )}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-gray-900 leading-[1.06] mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-gray-500 leading-[1.7] max-w-[48ch]">
            {t.intro}
          </p>
        </div>
      </RevealWrapper>
    </div>
  )
}
