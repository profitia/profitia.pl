import Image from 'next/image'
import Link from 'next/link'

export interface ArticleCardData {
  slug: string
  meta: string
  title: string
  cta: string
  img: string
  imgAlt: string
}

interface Props {
  article: ArticleCardData
}

export default function FeaturedArticleCard({ article }: Props) {
  return (
    <article className="hover-safe-card group flex flex-col">
      {/* Image */}
      <Link href={`/blog/${article.slug}`} className="block overflow-hidden rounded-xl">
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={article.img}
            alt={article.imgAlt}
            fill
            className="hover-safe-card-image object-cover brightness-90 transition-[transform,filter] duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 pt-5">
        <p className="editorial-label text-gray-400 mb-3">
          {article.meta}
        </p>
        <Link href={`/blog/${article.slug}`} className="group/title flex-1">
          <h3 className="editorial-box-title hover-safe-card-title text-gray-900 transition-colors duration-200">
            {article.title}
          </h3>
        </Link>
        <Link
          href={`/blog/${article.slug}`}
          className="mt-4 text-sm text-gray-500 hover-safe-text-brand transition-colors duration-200 inline-flex items-center gap-1"
        >
          {article.cta}
        </Link>
      </div>
    </article>
  )
}
