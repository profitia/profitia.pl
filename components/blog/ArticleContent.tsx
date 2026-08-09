'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type ActiveImage = {
  alt: string
  src: string
}

interface ArticleContentProps {
  className: string
  html: string
}

export function ArticleContent({ className, html }: ArticleContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const images = Array.from(container.querySelectorAll('img'))
    for (const image of images) {
      image.tabIndex = 0
      image.setAttribute('role', 'button')
      image.setAttribute('aria-label', image.alt ? `Open image preview: ${image.alt}` : 'Open image preview')
    }

    const openImage = (image: HTMLImageElement) => {
      const src = image.getAttribute('src') || image.currentSrc || image.src
      if (!src) {
        return
      }
      setActiveImage({ alt: image.alt || '', src })
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof HTMLElement)) {
        return
      }
      const image = target.closest('img')
      if (!(image instanceof HTMLImageElement) || !container.contains(image)) {
        return
      }
      event.preventDefault()
      openImage(image)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return
      }
      const target = event.target
      if (!(target instanceof HTMLImageElement) || !container.contains(target)) {
        return
      }
      event.preventDefault()
      openImage(target)
    }

    container.addEventListener('click', handleClick)
    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('click', handleClick)
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [html])

  useEffect(() => {
    if (!activeImage) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [activeImage])

  return (
    <>
      <div
        ref={containerRef}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 bg-black/80 p-4 sm:p-8"
          onClick={() => setActiveImage(null)}
        >
          <div
            aria-label={activeImage.alt || 'Image preview'}
            aria-modal="true"
            className="relative mx-auto flex h-full max-w-6xl items-center justify-center"
            role="dialog"
          >
            <button
              aria-label="Close image preview"
              className="absolute right-0 top-0 rounded-full bg-white/95 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-white"
              onClick={(event) => {
                event.stopPropagation()
                setActiveImage(null)
              }}
              type="button"
            >
              X
            </button>

            <Image
              alt={activeImage.alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              src={activeImage.src}
              unoptimized
              height={1600}
              width={1600}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}