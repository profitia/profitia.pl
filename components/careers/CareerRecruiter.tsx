import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import type { CareerLocale } from '@/lib/careers'
import { TEAM_MEMBERS } from '@/lib/team'

interface Props {
  locale: CareerLocale
  eyebrow: string
  title: string
  body: string
  emailLabel: string
  linkedinLabel: string
}

export default function CareerRecruiter({ locale, eyebrow, title, body, emailLabel, linkedinLabel }: Props) {
  const monika = TEAM_MEMBERS.find((member) => member.id === 'monika-osiecka')

  if (!monika?.imageUrl || !monika.linkedin) return null

  const role = locale === 'en' ? monika.roleEN : monika.role

  return (
    <section className="border-b border-gray-100 py-24">
      <div className="container-base">
        <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr] lg:gap-20">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden bg-gray-100 lg:mx-0">
            <Image
              src={monika.imageUrl}
              alt={`${monika.name} - ${role}`}
              fill
              className="object-cover"
              style={{ objectPosition: monika.imagePosition }}
              sizes="(min-width: 1024px) 320px, min(100vw - 3rem, 320px)"
            />
          </div>

          <div className="max-w-[42rem]">
            <p className="mb-5 editorial-label text-gray-400">{eyebrow}</p>
            <h2 className="mb-6 text-2xl font-semibold leading-snug tracking-tight text-gray-900 md:text-3xl">{title}</h2>
            <p className="mb-7 text-[16px] leading-[1.8] text-gray-600">{body}</p>
            <div className="mb-8">
              <p className="text-[17px] font-semibold text-gray-900">{monika.name}</p>
              <p className="mt-1 text-[13px] text-gray-500">{role}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
              <a href="mailto:kariera@profitia.pl" className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:text-gray-900">
                <Mail size={17} aria-hidden="true" />
                {emailLabel}
              </a>
              <Link
                href={monika.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn - ${monika.name}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-blue"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[17px] w-[17px] fill-current">
                  <path d="M6.5 8.1H3V21h3.5V8.1ZM4.75 3A2.06 2.06 0 1 0 4.75 7.12 2.06 2.06 0 0 0 4.75 3ZM21 13.6c0-3.9-2.08-5.72-4.86-5.72a4.2 4.2 0 0 0-3.82 2.1V8.1H8.8V21h3.52v-6.4c0-1.68.32-3.31 2.41-3.31 2.06 0 2.09 1.93 2.09 3.42V21H21v-7.4Z" />
                </svg>
                {linkedinLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
