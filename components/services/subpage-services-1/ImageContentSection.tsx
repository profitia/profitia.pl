import Image from 'next/image'
import RevealWrapper from './RevealWrapper'

interface BulletItem {
  text: string
}

interface Props {
  imageLeft?: boolean
  background?: 'white' | 'gray'
  label: string
  headline: string
  description: string
  bullets?: BulletItem[]
  imageSrc: string
  imageAlt: string
}

export default function ImageContentSection({
  imageLeft = true,
  background = 'white',
  label,
  headline,
  description,
  bullets,
  imageSrc,
  imageAlt,
}: Props) {
  const bg = background === 'gray' ? 'bg-gray-50' : 'bg-white'

  const imageCol = (
    <RevealWrapper
      delay={imageLeft ? 1 : 2}
      className="relative h-[380px] md:h-[480px] rounded-2xl overflow-hidden"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </RevealWrapper>
  )

  const contentCol = (
    <div className="flex flex-col justify-center">
      <RevealWrapper delay={imageLeft ? 2 : 1}>
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">
          {label}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight mb-6">
          {headline}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8">{description}</p>
        {bullets && bullets.length > 0 && (
          <ul className="space-y-3.5">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                {b.text}
              </li>
            ))}
          </ul>
        )}
      </RevealWrapper>
    </div>
  )

  return (
    <section className={`py-28 ${bg} border-t border-gray-100`}>
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {imageLeft ? (
            <>
              {imageCol}
              {contentCol}
            </>
          ) : (
            <>
              {contentCol}
              {imageCol}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
