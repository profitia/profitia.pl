import type { Metadata } from 'next'
import { DigitalSurveyForm } from '@/components/forms/DigitalSurveyForm'

export const metadata: Metadata = {
  title: 'Otrzymaj agenta AI dopasowanego do potrzeb Twojej firmy',
  description:
    'Zgłoś udział w krótkim badaniu Profitia. Na podstawie odpowiedzi pomożemy dobrać agenta AI do realnych wyzwań Twojej organizacji.',
  robots: {
    index: false,
    follow: false,
  },
}

const services = [
  {
    title: 'Procurement Tech Advisory',
    body: 'Oceniamy potrzeby technologiczne zakupów i pomagamy dobrać rozwiązania do procesów oraz celów organizacji. Wskazujemy priorytety i kierunek wdrożenia.',
    accent: 'border-[rgb(0,146,217)]',
  },
  {
    title: 'Agenci AI',
    body: 'Projektujemy agentów wspierających analizę danych, pracę z dokumentami i codzienne zadania zakupowe. Pomagamy zespołom ograniczać ręczną pracę i szybciej podejmować decyzje.',
    accent: 'border-[rgb(236,0,141)]',
  },
  {
    title: 'Aplikacje dedykowane',
    body: 'Tworzymy aplikacje dopasowane do procesów i potrzeb Twojej organizacji. Łączymy dane oraz porządkujemy obieg pracy, aby ułatwić realizację zadań zakupowych.',
    accent: 'border-[rgb(167,42,147)]',
  },
]

export default function DigitalSurveyPage() {
  return (
    <div className="min-h-screen bg-[rgb(247,250,252)] text-[rgb(36,47,68)]">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-14 xl:gap-20">
          <section className="pt-2 lg:pt-5">
            <div className="max-w-3xl">
              <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,109,158)]">
                Profitia Digital
              </p>
              <h1 className="max-w-[760px] text-[38px] font-semibold leading-[1.04] tracking-[-0.045em] text-[rgb(36,47,68)] sm:text-[52px] lg:text-[58px]">
                Otrzymaj agenta AI dopasowanego do potrzeb Twojej firmy
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[rgb(72,94,136)] sm:text-[18px]">
                Wypełnij krótki kwestionariusz, abyśmy mogli poznać rzeczywiste wyzwania Twojego zespołu.
                Na podstawie odpowiedzi skontaktujemy się z Tobą i dobierzemy agenta AI do Twoich potrzeb.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-12 lg:grid-cols-1 xl:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className={`rounded-2xl border border-[rgb(226,232,240)] border-t-4 ${service.accent} bg-white p-5 sm:p-6`}
                >
                  <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-[rgb(36,47,68)]">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-[13.5px] leading-6 text-[rgb(72,94,136)]">
                    {service.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-[rgb(199,237,251)]/70 p-6 sm:p-7">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[rgb(0,109,158)]">
                Co dalej?
              </p>
              <p className="mt-2 max-w-xl text-[15px] leading-7 text-[rgb(36,47,68)]">
                Po zgłoszeniu skontaktujemy się w sprawie udziału w kwestionariuszu.
              </p>
            </div>
          </section>

          <section className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] border border-[rgb(226,232,240)] bg-white p-6 shadow-[0_24px_70px_rgba(36,47,68,0.10)] sm:p-8 lg:p-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,109,158)]">
                Zgłoś udział w badaniu
              </p>
              <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.035em] text-[rgb(36,47,68)]">
                Zostaw dane kontaktowe
              </h2>
              <p className="mt-3 text-[14px] leading-6 text-[rgb(72,94,136)]">
                Odezwiemy się z krótkim kwestionariuszem dopasowanym do Twojej organizacji.
              </p>
              <div className="mt-7">
                <DigitalSurveyForm />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
