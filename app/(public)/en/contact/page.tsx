import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Profitia',
  alternates: {
    canonical: 'https://www.profitia.pl/en/contact',
    languages: {
      'pl': 'https://www.profitia.pl/contact',
      'en': 'https://www.profitia.pl/en/contact',
    },
  },
}

export default function ContactPageEN() {
  return (
    <section className="py-28">
      <div className="container-base max-w-3xl">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-6">
          Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mb-8">
          Get in touch
        </h1>
        <div className="text-gray-600 text-lg leading-relaxed space-y-4">
          <p>
            <a href="mailto:kontakt@profitia.pl" className="text-gray-900 font-medium hover:underline">
              kontakt@profitia.pl
            </a>
          </p>
          <p>
            <a href="tel:+48787417293" className="hover:underline">
              +48 787 417 293
            </a>
          </p>
          <p className="text-gray-400">Warsaw, Poland</p>
        </div>
      </div>
    </section>
  )
}
