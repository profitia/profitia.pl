'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Eye, ImagePlus, RefreshCw, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { ARTICLE_CATEGORIES } from '@/lib/content/types'
import { uploadMediaFile } from '@/lib/media/client'

const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => <div className="mt-1 min-h-[26rem] animate-pulse rounded-lg border border-gray-300 bg-gray-50" />,
})

type Locale = 'PL' | 'EN'

export type ArticleFormValue = {
  id?: string
  locale: Locale
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
  publishedAt: string
  metaTitle: string
  metaDescription: string
  category: string
  readingTime: string
  coverImage: string
  coverImageAlt: string
  coverMediaId: string
  featured: boolean
}

type LanguageLink = { id: string; locale: Locale } | null

interface Props {
  initialValue: ArticleFormValue
  mode: 'create' | 'edit'
  sibling?: LanguageLink
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toLocalDateTime(value: string) {
  if (!value) return ''
  const date = new Date(value)
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

export default function ArticleForm({ initialValue, mode, sibling = null }: Props) {
  const router = useRouter()
  const [value, setValue] = useState({
    ...initialValue,
    publishedAt: toLocalDateTime(initialValue.publishedAt),
  })
  const [slugTouched, setSlugTouched] = useState(mode === 'edit')
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [coverBusy, setCoverBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty) return
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warnBeforeUnload)
    return () => window.removeEventListener('beforeunload', warnBeforeUnload)
  }, [dirty])

  const update = <Key extends keyof ArticleFormValue>(key: Key, next: ArticleFormValue[Key]) => {
    setValue((current) => ({ ...current, [key]: next }))
    setDirty(true)
  }

  const handleTitleChange = (title: string) => {
    setValue((current) => ({
      ...current,
      title,
      ...(!slugTouched && { slug: slugify(title) }),
    }))
    setDirty(true)
  }

  const payload = () => ({
    locale: value.locale,
    title: value.title,
    slug: value.slug,
    excerpt: value.excerpt || null,
    content: value.content,
    publishedAt: value.publishedAt ? new Date(value.publishedAt).toISOString() : null,
    metaTitle: value.metaTitle || null,
    metaDescription: value.metaDescription || null,
    category: value.category || null,
    readingTime: value.readingTime || null,
    coverImage: value.coverImage || null,
    coverImageAlt: value.coverImageAlt || null,
    coverMediaId: value.coverMediaId || null,
    featured: value.featured,
  })

  const uploadCover = async (file: File | undefined) => {
    if (!file) return
    setCoverBusy(true)
    setError(null)
    try {
      const media = await uploadMediaFile(file)
      setValue((current) => ({
        ...current,
        coverImage: media.publicUrl,
        coverMediaId: media.id,
      }))
      setDirty(true)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Could not upload the cover image')
    } finally {
      setCoverBusy(false)
      if (coverInputRef.current) coverInputRef.current.value = ''
    }
  }

  const removeCover = () => {
    setValue((current) => ({ ...current, coverImage: '', coverImageAlt: '', coverMediaId: '' }))
    setDirty(true)
  }

  const save = async ({ navigateAfterCreate = true } = {}) => {
    setBusy(true)
    setError(null)
    try {
      const endpoint = mode === 'create' ? '/api/articles' : `/api/articles/${value.id}`
      const response = await fetch(endpoint, {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload()),
      })
      const result = await response.json() as { article?: { id: string; content: string }; message?: string }
      if (!response.ok || !result.article) {
        throw new Error(result.message ?? 'Could not save the article')
      }
      setValue((current) => ({ ...current, content: result.article!.content }))
      setDirty(false)
      if (mode === 'create' && navigateAfterCreate) {
        router.push(`/admin/articles/${result.article.id}/edit`)
      } else {
        router.refresh()
      }
      return result.article.id
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the article')
      return null
    } finally {
      setBusy(false)
    }
  }

  const preview = async () => {
    const id = await save({ navigateAfterCreate: false })
    if (id) window.location.assign(`/admin/preview/articles/${id}`)
  }

  const changePublication = async (action: 'publish' | 'unpublish') => {
    const id = await save()
    if (!id) return

    setBusy(true)
    setError(null)
    try {
      const response = await fetch(`/api/articles/${id}/${action}`, { method: 'POST' })
      const result = await response.json() as {
        article?: { published: boolean; publishedAt: string | null }
        message?: string
      }
      if (!response.ok || !result.article) {
        throw new Error(result.message ?? `Could not ${action} the article`)
      }
      setValue((current) => ({
        ...current,
        published: result.article!.published,
        publishedAt: result.article!.publishedAt
          ? toLocalDateTime(result.article!.publishedAt)
          : current.publishedAt,
      }))
      setDirty(false)
      router.refresh()
    } catch (publicationError) {
      setError(publicationError instanceof Error ? publicationError.message : 'Publication action failed')
    } finally {
      setBusy(false)
    }
  }

  const addTranslation = async () => {
    if (!value.id) return
    const locale: Locale = value.locale === 'PL' ? 'EN' : 'PL'
    setBusy(true)
    setError(null)
    try {
      const response = await fetch(`/api/articles/${value.id}/translations`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ locale }),
      })
      const result = await response.json() as { article?: { id: string }; message?: string }
      if (!response.ok || !result.article) {
        throw new Error(result.message ?? 'Could not create the translation')
      }
      router.push(`/admin/articles/${result.article.id}/edit`)
    } catch (translationError) {
      setError(translationError instanceof Error ? translationError.message : 'Translation creation failed')
    } finally {
      setBusy(false)
    }
  }

  const targetLocale: Locale = value.locale === 'PL' ? 'EN' : 'PL'
  const inputClass = 'w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-brand-primary'
  const searchTitle = value.metaTitle.trim() || value.title.trim() || 'Untitled article'
  const searchDescription = value.metaDescription.trim() || value.excerpt.trim()
  const searchPath = value.locale === 'EN'
    ? `profitia.pl › en › blog › ${value.slug || 'article-slug'}`
    : `profitia.pl › blog › ${value.slug || 'article-slug'}`

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-3xl font-heading font-bold text-brand-primary">
              {mode === 'create' ? 'Nowy artykuł' : value.title || 'Nowy artykuł'}
            </h1>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${value.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {value.published ? 'PUBLISHED' : 'DRAFT'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Language: {value.locale === 'PL' ? 'Polish' : 'English'}
          </p>
        </div>
        <Button href="/admin/articles" variant="secondary">Wróć do listy</Button>
      </div>

      {mode === 'edit' && (
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Languages</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span>{value.locale} - Current</span>
            {sibling ? (
              <Button href={`/admin/articles/${sibling.id}/edit`} size="sm" variant="secondary">
                {sibling.locale} - Edit
              </Button>
            ) : (
              <Button onClick={addTranslation} size="sm" variant="secondary" disabled={busy || dirty}>
                Add {targetLocale === 'PL' ? 'Polish' : 'English'} version
              </Button>
            )}
          </div>
          {dirty && !sibling && <p className="mt-2 text-xs text-gray-500">Save changes before adding a translation.</p>}
        </section>
      )}

      <section className="space-y-5 rounded-lg bg-white p-6 shadow-sm">
        {mode === 'create' && (
          <label className="block text-sm font-medium text-gray-700">
            Language
            <select className={`${inputClass} mt-1`} value={value.locale} onChange={(event) => update('locale', event.target.value as Locale)}>
              <option value="PL">Polski</option>
              <option value="EN">English</option>
            </select>
          </label>
        )}

        <label className="block text-sm font-medium text-gray-700">
          Title
          <input className={`${inputClass} mt-1`} value={value.title} onChange={(event) => handleTitleChange(event.target.value)} />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Slug
          <div className="mt-1 flex items-center rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-brand-primary">
            <span className="pl-4 text-sm text-gray-400">profitia.pl/{value.locale === 'EN' ? 'en/' : ''}blog/</span>
            <input
              className="min-w-0 flex-1 rounded-lg px-1 py-3 outline-none disabled:bg-gray-50 disabled:text-gray-500"
              disabled={value.published}
              pattern="[a-z0-9-]+"
              value={value.slug}
              onChange={(event) => {
                setSlugTouched(true)
                update('slug', event.target.value.toLowerCase())
              }}
            />
          </div>
          {value.published && <span className="mt-1 block text-xs text-gray-500">Slug is locked after publication.</span>}
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Lead / Excerpt
          <textarea className={`${inputClass} mt-1`} rows={4} value={value.excerpt} onChange={(event) => update('excerpt', event.target.value)} />
        </label>

        <div className="text-sm font-medium text-gray-700">
          Content
          <RichTextEditor value={value.content} onChange={(html) => update('content', html)} />
        </div>
      </section>

      <section className="space-y-5 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Publication</h2>
        <label className="block text-sm font-medium text-gray-700">
          Publication date
          <input className={`${inputClass} mt-1 max-w-md`} type="datetime-local" value={value.publishedAt} onChange={(event) => update('publishedAt', event.target.value)} />
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            Category
            <select className={`${inputClass} mt-1`} value={value.category} onChange={(event) => update('category', event.target.value)}>
              <option value="">No category</option>
              {Object.entries(ARTICLE_CATEGORIES).map(([slug, category]) => (
                <option key={slug} value={slug}>{category.label[value.locale === 'PL' ? 'pl' : 'en']}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Reading time (minutes)
            <input className={`${inputClass} mt-1`} min="1" type="number" value={value.readingTime} onChange={(event) => update('readingTime', event.target.value)} />
          </label>
        </div>
        <div>
          <span className="block text-sm font-medium text-gray-700">Cover image</span>
          <input
            ref={coverInputRef}
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            type="file"
            onChange={(event) => void uploadCover(event.target.files?.[0])}
          />
          {value.coverImage ? (
            <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
              <div className="relative aspect-[16/7] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value.coverImage} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-wrap gap-3 border-t border-gray-200 p-4">
                <Button size="sm" variant="secondary" disabled={coverBusy} onClick={() => coverInputRef.current?.click()}>
                  <RefreshCw className="mr-2" size={15} /> Replace
                </Button>
                <Button size="sm" variant="secondary" disabled={coverBusy} onClick={removeCover}>
                  <Trash2 className="mr-2" size={15} /> Remove
                </Button>
              </div>
            </div>
          ) : (
            <button
              className="mt-2 flex min-h-36 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-gray-600 hover:border-brand-primary hover:text-brand-primary disabled:opacity-50"
              disabled={coverBusy}
              type="button"
              onClick={() => coverInputRef.current?.click()}
            >
              <ImagePlus size={22} />
              {coverBusy ? 'Uploading...' : 'Upload cover image'}
            </button>
          )}
        </div>
        {value.coverImage && (
          <label className="block text-sm font-medium text-gray-700">
            Cover image alt text
            <input
              className={`${inputClass} mt-1`}
              maxLength={500}
              value={value.coverImageAlt}
              onChange={(event) => update('coverImageAlt', event.target.value)}
            />
          </label>
        )}
        <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
          <input checked={value.featured} className="h-4 w-4" type="checkbox" onChange={(event) => update('featured', event.target.checked)} />
          Featured article
        </label>
      </section>

      <section className="space-y-5 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">SEO</h2>
        <label className="block text-sm font-medium text-gray-700">
          Meta title <span className={`font-normal ${value.metaTitle.length > 60 ? 'text-amber-700' : 'text-gray-400'}`}>({value.metaTitle.length}/60 recommended)</span>
          <input className={`${inputClass} mt-1`} value={value.metaTitle} onChange={(event) => update('metaTitle', event.target.value)} />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Meta description <span className={`font-normal ${value.metaDescription.length > 160 ? 'text-amber-700' : 'text-gray-400'}`}>({value.metaDescription.length}/160 recommended)</span>
          <textarea className={`${inputClass} mt-1`} rows={4} value={value.metaDescription} onChange={(event) => update('metaDescription', event.target.value)} />
        </label>
        <div className="border-t border-gray-200 pt-5">
          <h3 className="text-sm font-semibold text-gray-900">Search preview</h3>
          <div className="mt-4 max-w-2xl font-sans" aria-label="Search result preview">
            <p className="break-all text-sm text-[#202124]">{searchPath}</p>
            <p className="mt-1 text-xl leading-6 text-[#1a0dab]">{searchTitle}</p>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#4d5156]">
              {searchDescription || 'No description. Add a meta description or article excerpt.'}
            </p>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            {!value.metaTitle.trim() && 'Meta title is empty, so the article title is used. '}
            {!value.metaDescription.trim() && 'Meta description is empty, so the excerpt is used. '}
            {!value.coverImage && 'Without a cover image, social metadata will not include an image.'}
          </p>
        </div>
      </section>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}

      <div className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
        <Button onClick={() => void save()} disabled={busy}>
          {value.published ? 'Save changes' : 'Save draft'}
        </Button>
        <Button onClick={() => void preview()} disabled={busy} variant="secondary">
          <Eye className="mr-2" size={16} /> Preview
        </Button>
        {mode === 'edit' && (
          <Button
            onClick={() => void changePublication(value.published ? 'unpublish' : 'publish')}
            disabled={busy}
            variant={value.published ? 'secondary' : 'brand'}
          >
            {value.published ? 'Unpublish' : 'Publish'}
          </Button>
        )}
      </div>
    </div>
  )
}