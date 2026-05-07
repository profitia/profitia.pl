/**
 * ArticleAuthor — Author Bio Section
 *
 * Shown below article content.
 * Institutional, restrained — not social-media-like.
 */

import type { ArticleDetailData } from '@/lib/content/types'

interface ArticleAuthorProps {
  article: ArticleDetailData
  locale: 'pl' | 'en'
}

const LABEL = { pl: 'O autorze', en: 'About the author' }

export function ArticleAuthor({ article, locale }: ArticleAuthorProps) {
  if (!article.authorName) return null

  return (
    <div className="container-base">
      <div className="max-w-[68ch] border-t border-gray-100 pt-10 pb-12">
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-5">
          {LABEL[locale]}
        </p>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-sm font-semibold text-gray-500" aria-hidden="true">
              {article.authorName.charAt(0)}
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-0.5">
              {article.authorName}
            </p>
            {article.authorRole && (
              <p className="text-[12px] text-gray-500 mb-3">{article.authorRole}</p>
            )}
            {article.authorBio && (
              <p className="text-sm text-gray-500 leading-[1.7] max-w-[52ch]">
                {article.authorBio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
