/**
 * TeamProfileImage
 * ─────────────────────────────────────────────────────────────
 * Portrait with editorial grayscale treatment.
 * Falls back to initials monogram if imageUrl is not set.
 *
 * VISUAL:
 *   - grayscale(18%) always; desaturated-professional, not cold
 *   - aspect-[3/4] crop, rounded-xl
 *   - hover: subtle brightness lift, no scale (editorial restraint)
 *   - bg-gray-100 placeholder background
 */

import Image from 'next/image'
import { getInitials } from '@/lib/team/utils'

interface TeamProfileImageProps {
  name: string
  imageUrl?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE_CLASSES: Record<string, string> = {
  sm: 'w-16 h-16 text-base',
  md: 'w-24 h-24 text-xl',
  lg: 'w-full',
}

export function TeamProfileImage({
  name,
  imageUrl,
  size = 'lg',
  className = '',
}: TeamProfileImageProps) {
  const initials = getInitials(name)

  if (!imageUrl) {
    return (
      <div
        className={`
          ${SIZE_CLASSES[size]}
          ${size === 'lg' ? 'aspect-[3/4]' : 'rounded-full'}
          bg-gray-100 flex items-center justify-center
          rounded-xl select-none ${className}
        `}
        aria-label={name}
      >
        <span className="font-semibold tracking-tight text-gray-400">
          {initials}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`
        ${size === 'lg' ? 'w-full aspect-[3/4]' : SIZE_CLASSES[size]}
        relative overflow-hidden rounded-xl bg-gray-100
        group ${className}
      `}
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 280px, 240px"
        className="
          object-cover object-top
          [filter:grayscale(18%)_contrast(1.02)]
          transition-[filter] duration-300 ease-out
          group-hover:[filter:grayscale(8%)_contrast(1.02)]
        "
      />
    </div>
  )
}
