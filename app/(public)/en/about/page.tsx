import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Profitia',
  alternates: {
    canonical: 'https://www.profitia.pl/en/about',
    languages: {
      'pl': 'https://www.profitia.pl/about',
      'en': 'https://www.profitia.pl/en/about',
    },
  },
}

export default function AboutPageEN() {
  return (
    <section className="py-28">
      <div className="container-base max-w-3xl">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-6">
          About
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mb-8">
          About us
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">— Content coming soon —</p>
      </div>
    </section>
  )
}
