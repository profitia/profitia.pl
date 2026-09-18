'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type DeferredArticleImageProps = {
  src: string
  alt: string
  sizes: string
  className?: string
}

export function DeferredArticleImage({ src, alt, sizes, className }: DeferredArticleImageProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return

    const host = hostRef.current
    if (!host || !('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '600px 0px' }
    )

    observer.observe(host)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <span ref={hostRef} className="absolute inset-0">
      {shouldLoad ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading="lazy"
          fetchPriority="low"
          className={className}
        />
      ) : null}
    </span>
  )
}
