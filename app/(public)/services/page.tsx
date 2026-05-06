import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Usługi' }

export default function ServicesPage() {
  return (
    <section className="py-28">
      <div className="container-base">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-6">
          Co robimy
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mb-8">
          Usługi
        </h1>
        {/* Content placeholder */}
        <p className="text-gray-500 text-lg leading-relaxed">— Treść sekcji &quot;Usługi&quot; —</p>
      </div>
    </section>
  )
}
