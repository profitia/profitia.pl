import type { ArticleDetailData, ArticlePreviewData } from '@/lib/content/types'
import {
  ArticleHero,
  ArticleLayout,
  ArticleAuthor,
  ArticleNewsletter,
  ArticleNavigation,
  ArticleRelated,
  ReadingProgress,
} from '@/components/blog'
import { ArticleLanguageNavigation } from '@/components/blog/ArticleLanguageNavigation'
import type { LanguagePaths } from '@/components/layout/LanguageNavigationProvider'

interface Props {
  locale: 'pl' | 'en'
  article: ArticleDetailData
  relatedArticles: ArticlePreviewData[]
  neighbors?: {
    previous: { slug: string; title: string } | null
    next: { slug: string; title: string } | null
  }
  languagePaths?: LanguagePaths
}

export default function BlogArticlePage({ locale, article, relatedArticles, neighbors, languagePaths }: Props) {
  return (
    <>
      {languagePaths ? <ArticleLanguageNavigation paths={languagePaths} /> : null}
      <ReadingProgress />
      <ArticleHero article={article} locale={locale} />
      <ArticleLayout content={article.content} locale={locale} />
      {neighbors ? <ArticleNavigation locale={locale} {...neighbors} /> : null}
      <ArticleAuthor article={article} locale={locale} />
      <ArticleNewsletter locale={locale} />
      <ArticleRelated articles={relatedArticles} locale={locale} />
    </>
  )
}
