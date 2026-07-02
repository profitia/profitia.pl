import type { ArticleDetailData, ArticlePreviewData } from '@/lib/content/types'
import {
  ArticleHero,
  ArticleLayout,
  ArticleAuthor,
  ArticleNewsletter,
  ArticleRelated,
  ReadingProgress,
} from '@/components/blog'

interface Props {
  locale: 'pl' | 'en'
  article: ArticleDetailData
  relatedArticles: ArticlePreviewData[]
}

export default function BlogArticlePage({ locale, article, relatedArticles }: Props) {
  return (
    <>
      <ReadingProgress />
      <ArticleHero article={article} locale={locale} />
      <ArticleLayout content={article.content} />
      <ArticleAuthor article={article} locale={locale} />
      <ArticleNewsletter locale={locale} />
      <ArticleRelated articles={relatedArticles} locale={locale} />
    </>
  )
}