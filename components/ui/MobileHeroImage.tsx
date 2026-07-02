import Image from 'next/image'

interface MobileHeroImageProps {
  src: string
  alt: string
  priority?: boolean
  overlayClassName?: string
  imageClassName?: string
  imageStyle?: React.CSSProperties
}

/**
 * Canonical mobile hero image frame.
 * Matches the homepage hero behavior: full-bleed, no side gutters, no radius.
 */
export default function MobileHeroImage({
  src,
  alt,
  priority = false,
  overlayClassName,
  imageClassName,
  imageStyle,
}: MobileHeroImageProps) {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-gray-100 md:hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName ?? 'object-cover'}
        style={imageStyle}
        sizes="(max-width: 767px) 100vw, 50vw"
        priority={priority}
      />
      {overlayClassName ? <div className={`absolute inset-0 ${overlayClassName}`} /> : null}
    </div>
  )
}