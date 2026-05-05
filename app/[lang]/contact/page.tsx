import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/middleware'

type Props = { params: Promise<{ lang: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.nav.contact }
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <section className="py-20">
      <div className="container-base max-w-2xl">
        <h1 className="text-4xl font-heading font-bold text-brand-primary mb-8">
          {dict.nav.contact}
        </h1>
        {/* Contact form — placeholder, form logic added later */}
        <form className="space-y-6" aria-label="Formularz kontaktowy">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {dict.contact.form.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {dict.contact.form.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {dict.contact.form.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            {dict.contact.form.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
