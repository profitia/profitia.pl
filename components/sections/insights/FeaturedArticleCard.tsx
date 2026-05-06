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
    <article className="group flex flex-col">
      {/* Image */}
      <Link href={`/blog/${article.slug}`} className="block overflow-hidden rounded-xl">
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={article.img}
            alt={article.imgAlt}
            fill
            className="object-cover brightness-90 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 pt-5">
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-3">
          {article.meta}
        </p>
        <Link href={`/blog/${article.slug}`} className="group/title flex-1">
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 leading-snug group-hover/title:text-gray-600 transition-colors duration-200">
            {article.title}
          </h3>
        </Link>
        <Link
          href={`/blog/${article.slug}`}
          className="mt-4 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 inline-flex items-center gap-1"
        >
          {article.cta}
        </Link>
      </div>
    </article>
  )
}
