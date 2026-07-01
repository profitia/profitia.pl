'use client'

/**
 * BlogNewsletter - Editorial Subscription Section
 *
 * Used in the blog index below the article grid.
 * Tone: intelligence subscription, not marketing.
 * Institutional, restrained, editorial.
 */

const COPY = {
  pl: {
    eyebrow: 'Intelligence Brief',
    heading: 'Otrzymuj analizy bezpośrednio.',
    sub: 'Spostrzeżenia dotyczące zakupów, negocjacji i rynków dostawców. Bez marketingu. Bez szumu.',
    placeholder: 'Twój adres e-mail',
    button: 'Zapisz się',
    note: 'Bez spamu. Wypis w jednym kliknięciu.',
  },
  en: {
    eyebrow: 'Intelligence Brief',
    heading: 'Receive analysis directly.',
    sub: 'Procurement, negotiation and supplier market insights. No marketing. No noise.',
    placeholder: 'Your email address',
    button: 'Subscribe',
    note: 'No spam. Unsubscribe in one click.',
  },
}

interface BlogNewsletterProps {
  locale: 'pl' | 'en'
}

export function BlogNewsletter({ locale }: BlogNewsletterProps) {
  const t = COPY[locale]

  return (
    <section className="border-t border-gray-100">
      <div className="container-base py-20 lg:py-24">
        <div className="max-w-[36rem]">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-5">
            {t.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-snug mb-3">
            {t.heading}
          </h2>
          <p className="text-base text-gray-500 leading-[1.7] mb-8">
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
              className="flex-1 min-w-0 px-4 py-3.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-blue transition-colors duration-200 ease-out"
            />
            <button
              type="submit"
              className="px-5 py-3.5 text-sm font-medium text-white bg-gray-900 hover:bg-brand-blue rounded-lg transition-colors duration-200 ease-out whitespace-nowrap"
            >
              {t.button}
            </button>
          </form>

          <p className="mt-4 text-[12px] text-gray-400">{t.note}</p>
        </div>
      </div>
    </section>
  )
}
