'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

interface Props {
  id: string
  locale: 'PL' | 'EN'
  published: boolean
  missingLocale: 'PL' | 'EN' | null
}

export default function ArticleRowActions({ id, locale, published, missingLocale }: Props) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const statusAction = async () => {
    setBusy(true)
    setError(null)
    try {
      const action = published ? 'unpublish' : 'publish'
      const response = await fetch(`/api/articles/${id}/${action}`, { method: 'POST' })
      const result = await response.json() as { message?: string }
      if (!response.ok) throw new Error(result.message ?? 'Status change failed')
      router.refresh()
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : 'Status change failed')
    } finally {
      setBusy(false)
    }
  }

  const addTranslation = async () => {
    if (!missingLocale) return
    setBusy(true)
    setError(null)
    try {
      const response = await fetch(`/api/articles/${id}/translations`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ locale: missingLocale }),
      })
      const result = await response.json() as { article?: { id: string }; message?: string }
      if (!response.ok || !result.article) throw new Error(result.message ?? 'Translation creation failed')
      router.push(`/admin/articles/${result.article.id}/edit`)
    } catch (translationError) {
      setError(translationError instanceof Error ? translationError.message : 'Translation creation failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-w-48 flex-col items-end gap-2">
      <div className="flex flex-wrap justify-end gap-2">
        <Button href={`/admin/articles/${id}/edit`} size="sm" variant="secondary">Edit</Button>
        <Button onClick={() => void statusAction()} size="sm" disabled={busy}>
          {published ? 'Unpublish' : 'Publish'}
        </Button>
        {missingLocale && (
          <Button onClick={() => void addTranslation()} size="sm" variant="secondary" disabled={busy}>
            Add {missingLocale === 'PL' ? 'Polish' : 'English'}
          </Button>
        )}
      </div>
      {error && <span className="max-w-64 text-right text-xs text-red-700">{error}</span>}
      <span className="sr-only">Current language: {locale}</span>
    </div>
  )
}