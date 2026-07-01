'use client'

/**
 * ArticleNewsletter - End-of-Article Subscription Block
 *
 * Appears after the article content and author block.
 * Editorial intelligence subscription tone - not marketing.
 * Contextual: reads as a natural continuation of the article.
 */

const COPY = {
  pl: {
    eyebrow: 'Intelligence Brief',
    heading: 'Więcej analiz, mniej szumu.',
    sub: 'Otrzymuj spostrzeżenia dotyczące zakupów, negocjacji i rynków dostawców. Bez spamu.',
    placeholder: 'Twój adres e-mail',
    button: 'Zapisz się',
  },
  en: {
    eyebrow: 'Intelligence Brief',
    heading: 'More analysis, less noise.',
    sub: 'Receive procurement, negotiation and supplier market insights. No spam.',
    placeholder: 'Your email address',
    button: 'Subscribe',
  },
}

interface ArticleNewsletterProps {
  locale: 'pl' | 'en'
}

export function ArticleNewsletter({ locale }: ArticleNewsletterProps) {
  const t = COPY[locale]

  return (
    <div className="container-base">
      <div className="max-w-[68ch] border-t border-gray-100 pt-10 pb-16">
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-4">
          {t.eyebrow}
        </p>
        <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
          {t.heading}
        </h3>
        <p className="text-sm text-gray-500 leading-[1.7] mb-6 max-w-[44ch]">
          {t.sub}
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-2.5 flex-col sm:flex-row"
          aria-label={t.eyebrow}
        >
          <input
            type="email"
            required
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            className="flex-1 min-w-0 px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-blue transition-colors duration-200 ease-out"
          />
          <button
            type="submit"
            className="px-5 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-brand-blue rounded-lg transition-colors duration-200 ease-out whitespace-nowrap"
          >
            {t.button}
          </button>
        </form>
      </div>
    </div>
  )
}
