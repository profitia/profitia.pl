'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface LifeItem {
  title: string
  description: string
}

interface Props {
  locale: 'pl' | 'en'
  eyebrow: string
  title: string
  introduction: string
  items: LifeItem[]
  imageAlt: string
}

interface GalleryImage {
  src: string
  alt: string
  position?: string
}

const PLACEHOLDER_IMAGE = '/images/website/Profitia_30.jpg'
const VISIBLE_IMAGE_COUNT = 3
const GALLERY_IMAGE_COUNT = 13

export default function CareerLife({ locale, eyebrow, title, introduction, items, imageAlt }: Props) {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const galleryImages = useMemo<GalleryImage[]>(
    () =>
      Array.from({ length: GALLERY_IMAGE_COUNT }, (_, index) => ({
        src: PLACEHOLDER_IMAGE,
        alt: `${imageAlt} - ${index + 1}`,
        position: index === 1 ? '35% center' : index === 2 ? '70% center' : 'center',
      })),
    [imageAlt]
  )
  const hiddenImageCount = Math.max(galleryImages.length - VISIBLE_IMAGE_COUNT, 0)

  const closeGallery = useCallback(() => {
    setActiveImage(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const showPreviousImage = useCallback(() => {
    setActiveImage((current) =>
      current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length
    )
  }, [galleryImages.length])

  const showNextImage = useCallback(() => {
    setActiveImage((current) =>
      current === null ? null : (current + 1) % galleryImages.length
    )
  }, [galleryImages.length])

  const openGallery = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setActiveImage(index)
  }

  useEffect(() => {
    if (activeImage === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeGallery()
      if (event.key === 'ArrowLeft') showPreviousImage()
      if (event.key === 'ArrowRight') showNextImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage, closeGallery, showNextImage, showPreviousImage])

  const labels = locale === 'pl'
    ? {
        dialog: `${imageAlt} - galeria`,
        close: 'Zamknij galerię',
        previous: 'Poprzednie zdjęcie',
        next: 'Następne zdjęcie',
      }
    : {
        dialog: `${imageAlt} - gallery`,
        close: 'Close gallery',
        previous: 'Previous image',
        next: 'Next image',
      }

  const renderGalleryButton = (index: number, sizes: string, position?: string) => {
    const image = galleryImages[index]
    const isLastVisibleImage = index === VISIBLE_IMAGE_COUNT - 1

    return (
      <button
        type="button"
        className="group relative block h-full w-full cursor-zoom-in overflow-hidden bg-gray-100 text-left focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue"
        onClick={(event) => openGallery(index, event.currentTarget)}
        aria-label={`${image.alt}. ${index + 1} / ${galleryImages.length}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ objectPosition: position ?? image.position }}
          sizes={sizes}
        />
        <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" aria-hidden="true" />
        {isLastVisibleImage && hiddenImageCount > 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-gray-950/35 text-3xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:bg-gray-950/45 md:text-4xl" aria-hidden="true">
            +{hiddenImageCount}
          </span>
        )}
      </button>
    )
  }

  return (
    <section className="border-b border-gray-100 py-24">
      <div className="container-base">
        <div className="mb-14 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-20">
          <div>
            <p className="mb-5 editorial-label text-gray-400">
              {eyebrow}
            </p>
            <h2 className="text-2xl font-semibold leading-snug tracking-tight text-gray-900 md:text-3xl">
              {title}
            </h2>
          </div>
          <p className="max-w-[46rem] text-[16px] leading-[1.8] text-gray-600">
            {introduction}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-px overflow-hidden bg-gray-200 md:grid-cols-12">
          <div className="relative aspect-[3/2] md:col-span-7 md:aspect-[16/10]">
            {renderGalleryButton(0, '(min-width: 768px) 58vw, 100vw')}
          </div>
          <div className="grid gap-px bg-gray-200 md:col-span-5">
            <div className="relative aspect-[3/2] md:aspect-auto">
              {renderGalleryButton(1, '(min-width: 768px) 42vw, 100vw', '35% center')}
            </div>
            <div className="relative aspect-[3/2] md:aspect-auto">
              {renderGalleryButton(2, '(min-width: 768px) 42vw, 100vw', '70% center')}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="border-t border-gray-200 pt-6">
              <h3 className="editorial-box-title mb-3 text-gray-900">{item.title}</h3>
              <p className="text-[14px] leading-[1.75] text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {activeImage !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/90 px-4 py-8 backdrop-blur-sm md:px-16"
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialog}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGallery()
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeGallery}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8 md:top-8"
            aria-label={labels.close}
          >
            ×
          </button>

          <button
            type="button"
            onClick={showPreviousImage}
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-8"
            aria-label={labels.previous}
          >
            ‹
          </button>

          <div className="relative h-full max-h-[82vh] w-full max-w-6xl">
            <Image
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].alt}
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <button
            type="button"
            onClick={showNextImage}
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8"
            aria-label={labels.next}
          >
            ›
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-4 py-2 text-sm tabular-nums text-white md:bottom-8">
            {activeImage + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  )
}
