import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Nowy artykuł' }

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-brand-primary mb-8">Nowy artykuł</h1>
      {/* Article editor form - rich text editor (e.g. TipTap) to be integrated later */}
      <form className="bg-white rounded-xl shadow-sm p-8 space-y-6" method="POST" action="/api/articles">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Tytuł
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Slug (URL)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            placeholder="np. optymalizacja-kosztow-zakupow"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
            Lead / opis skrócony
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Treść (HTML)
          </label>
          <textarea
            id="content"
            name="content"
            rows={15}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-3">
          <input id="published" name="published" type="checkbox" className="w-4 h-4" />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">
            Opublikuj od razu
          </label>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="btn-primary">
            Zapisz artykuł
          </button>
          <Link href="/admin/articles" className="btn-secondary">
            Anuluj
          </Link>
        </div>
      </form>
    </div>
  )
}
