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
    <RevealWrapper delay={imageLeft ? 1 : 2} className="relative h-[360px] md:h-[440px] rounded-2xl overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent" />
    </RevealWrapper>
  )

  const contentCol = (
    <div className="flex flex-col justify-center">
      <RevealWrapper delay={imageLeft ? 2 : 1}>
        <p className="text-xs font-medium tracking-[0.22em] uppercase text-brand-secondary mb-5">
          {label}
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary leading-tight tracking-tight mb-6">
          {headline}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-7">{description}</p>
        {bullets && bullets.length > 0 && (
          <ul className="space-y-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="flex-shrink-0 mt-1 w-4 h-4 rounded-full bg-brand-light flex items-center justify-center">
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-brand-secondary" fill="currentColor">
                    <path d="M10.3 2.3a1 1 0 0 0-1.4 0L4.5 6.6 3.1 5.2a1 1 0 1 0-1.4 1.4l2.1 2.1a1 1 0 0 0 1.4 0l5-5a1 1 0 0 0 0-1.4z"/>
                  </svg>
                </span>
                {b.text}
              </li>
            ))}
          </ul>
        )}
      </RevealWrapper>
    </div>
  )

  return (
    <section className={`py-24 ${bg}`}>
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
