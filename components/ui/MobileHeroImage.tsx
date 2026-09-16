import Image from 'next/image'

interface MobileHeroImageProps {
  src: string
  alt: string
  priority?: boolean
  hideFrom?: 'md' | 'lg'
  overlayClassName?: string
  imageClassName?: string
  imageStyle?: React.CSSProperties
}

const HIDE_FROM_CLASS = {
  md: 'md:hidden',
  lg: 'lg:hidden',
} as const

/**
 * Canonical mobile hero image frame.
 * Matches the homepage hero behavior: full-bleed, no side gutters, no radius.
 */
export default function MobileHeroImage({
  src,
  alt,
  priority = false,
  hideFrom = 'md',
  overlayClassName,
  imageClassName,
  imageStyle,
}: MobileHeroImageProps) {
  return (
    <div className={`relative w-full aspect-[3/2] overflow-hidden bg-gray-100 ${HIDE_FROM_CLASS[hideFrom]}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName ?? 'object-cover object-center'}
        style={imageStyle}
        sizes="(max-width: 767px) 100vw, 50vw"
        priority={priority}
      />
      {overlayClassName ? <div className={`absolute inset-0 ${overlayClassName}`} /> : null}
    </div>
  )
}