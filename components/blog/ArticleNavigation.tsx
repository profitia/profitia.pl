import Link from 'next/link'

interface ArticleNavigationItem {
  slug: string
  title: string
}

interface ArticleNavigationProps {
  locale: 'pl' | 'en'
  previous: ArticleNavigationItem | null
  next: ArticleNavigationItem | null
}

const COPY = {
  pl: { previous: 'Poprzedni artykuł', next: 'Następny artykuł' },
  en: { previous: 'Previous article', next: 'Next article' },
} as const

export function ArticleNavigation({ locale, previous, next }: ArticleNavigationProps) {
  if (!previous && !next) return null

  const prefix = locale === 'en' ? '/en' : ''
  const copy = COPY[locale]

  return (
    <nav className="container-base" aria-label={locale === 'pl' ? 'Nawigacja między artykułami' : 'Article navigation'}>
      <div className="grid gap-px border-y border-gray-200 bg-gray-200 sm:grid-cols-2">
        <div className="min-w-0 bg-white">
          {previous ? (
            <Link
              href={`${prefix}/blog/${previous.slug}`}
              className="group flex h-full min-h-36 flex-col justify-center px-6 py-8 transition-colors duration-200 hover:bg-gray-50 md:px-10"
            >
              <span className="editorial-label text-gray-500 transition-colors group-hover:text-brand-blue">
                ← {copy.previous}
              </span>
              <span className="mt-3 text-base font-semibold leading-snug tracking-tight text-gray-900 md:text-lg">
                {previous.title}
              </span>
            </Link>
          ) : null}
        </div>

        <div className="min-w-0 bg-white text-right">
          {next ? (
            <Link
              href={`${prefix}/blog/${next.slug}`}
              className="group flex h-full min-h-36 flex-col justify-center px-6 py-8 transition-colors duration-200 hover:bg-gray-50 md:px-10"
            >
              <span className="editorial-label text-gray-500 transition-colors group-hover:text-brand-blue">
                {copy.next} →
              </span>
              <span className="mt-3 text-base font-semibold leading-snug tracking-tight text-gray-900 md:text-lg">
                {next.title}
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
