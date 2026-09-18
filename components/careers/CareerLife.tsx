import Image from 'next/image'

interface LifeItem {
  title: string
  description: string
}

interface Props {
  eyebrow: string
  title: string
  introduction: string
  items: LifeItem[]
  imageAlt: string
}

const PLACEHOLDER_IMAGE = '/images/website/Profitia_30.jpg'

export default function CareerLife({ eyebrow, title, introduction, items, imageAlt }: Props) {
  return (
    <section className="border-b border-gray-100 py-24">
      <div className="container-base">
        <div className="mb-14 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-20">
          <div>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-gray-400">
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
          <div className="relative aspect-[3/2] bg-gray-100 md:col-span-7 md:aspect-[16/10]">
            <Image src={PLACEHOLDER_IMAGE} alt={imageAlt} fill className="object-cover" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <div className="grid gap-px bg-gray-200 md:col-span-5">
            <div className="relative aspect-[3/2] bg-gray-100 md:aspect-auto">
              <Image src={PLACEHOLDER_IMAGE} alt="" fill className="object-cover object-[35%_center]" sizes="(min-width: 768px) 42vw, 100vw" />
            </div>
            <div className="relative aspect-[3/2] bg-gray-100 md:aspect-auto">
              <Image src={PLACEHOLDER_IMAGE} alt="" fill className="object-cover object-[70%_center]" sizes="(min-width: 768px) 42vw, 100vw" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="border-t border-gray-200 pt-6">
              <h3 className="mb-3 text-[16px] font-semibold tracking-tight text-gray-900">{item.title}</h3>
              <p className="text-[14px] leading-[1.75] text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
