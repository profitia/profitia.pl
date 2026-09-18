import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n'
import { FeaturedArticles } from '@/components/sections/insights'
import HomePillars from '@/components/home/HomePillars'
import InteractiveTestimonials from '@/components/home/InteractiveTestimonials'
import { RevealWrapper } from '@/components/ui'
import { getCapabilityPath, getPublicPath } from '@/lib/routing/public-routes'

const IDENTITY_POINTS = [
  {
    n: '01',
    title: 'Strategicznie',
    desc: 'Patrzymy na zakupy przez ich wpływ na wynik finansowy, ryzyko i model działania całej organizacji.',
  },
  {
    n: '02',
    title: 'Praktycznie',
    desc: 'Rekomendacja ma prowadzić do działania, a nie kończyć się prezentacją.',
  },
  {
    n: '03',
    title: 'Elastycznie',
    desc: 'Dobieramy sposób pracy do skali problemu, zamiast dopasowywać klienta do gotowego produktu konsultingowego.',
  },
  {
    n: '04',
    title: 'Za wynik',
    desc: 'Mierzymy wdrożone oszczędności, poprawę procesów i trwałość zmiany w organizacji.',
  },
] as const

const SYSTEM_AREAS = [
  {
    n: '01',
    title: 'Sourcing i oszczędności',
    desc: 'Kategoryzujemy wydatki, identyfikujemy potencjał, tworzymy strategie kategorii, poszukujemy nowych źródeł dostaw i wspieramy wdrożenie oszczędności.',
  },
  {
    n: '02',
    title: 'Organizacja zakupów',
    desc: 'Projektujemy docelowy model funkcji zakupowej, centralizację, role, odpowiedzialności i ścieżki rozwoju zespołu.',
  },
  {
    n: '03',
    title: 'Procesy i procedury',
    desc: 'Porządkujemy polityki zakupowe, rozdzielamy procesy strategiczne i operacyjne oraz usprawniamy przebieg zakupów i Procure-to-Pay.',
  },
  {
    n: '04',
    title: 'Dane i technologia',
    desc: 'Zwiększamy przejrzystość wydatków, definiujemy wymagania funkcjonalne oraz wspieramy wybór i wdrożenie rozwiązań technologicznych.',
  },
] as const

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Rozumiemy punkt wyjścia',
    desc: 'Analizujemy wydatki, kategorie, organizację, procesy, narzędzia i kompetencje. Ustalamy, gdzie znajduje się realny potencjał i co blokuje jego wykorzystanie.',
  },
  {
    n: '02',
    title: 'Projektujemy właściwe rozwiązanie',
    desc: 'Łączymy dane klienta, wiedzę rynkową, benchmarki i doświadczenie projektowe. Budujemy rekomendację dopasowaną do organizacji - nie do katalogu usług.',
  },
  {
    n: '03',
    title: 'Wdrażamy razem z zespołem',
    desc: 'Prowadzimy działania sourcingowe, negocjacje, zmiany organizacyjne, usprawnienia procesów lub wdrożenia technologiczne. Pracujemy wspólnie z osobami, które później przejmą rozwiązanie.',
  },
  {
    n: '04',
    title: 'Mierzymy efekt i przekazujemy kompetencje',
    desc: 'Weryfikujemy wyniki, korygujemy działania i dbamy o to, aby wiedza, narzędzia i sposób pracy pozostały w organizacji.',
  },
] as const

const PROOF_STATS = [
  {
    val: '15+',
    label: 'lat doświadczenia w projektach zakupowych',
  },
  {
    val: '>7 mln EUR',
    label: 'zidentyfikowanych korzyści w 21 kategoriach w jednym z programów',
  },
  {
    val: '~2 mln EUR',
    label: 'zidentyfikowanych i wdrożonych korzyści w 27 kategoriach',
  },
] as const

const WHEN_WE_HELP = [
  {
    n: '01',
    title: 'Potrzebujesz programu oszczędnościowego',
    desc: 'Chcesz zidentyfikować potencjał, uporządkować kategorie i przełożyć analizę na konkretne inicjatywy sourcingowe.',
  },
  {
    n: '02',
    title: 'Zmieniasz organizację lub procesy zakupowe',
    desc: 'Potrzebujesz nowego modelu działania, jasnych odpowiedzialności, polityk albo sprawniejszego procesu Procure-to-Pay.',
  },
  {
    n: '03',
    title: 'Dane i narzędzia nie wspierają decyzji',
    desc: 'Nie masz pełnej przejrzystości wydatków, obecne narzędzia nie są właściwie wykorzystywane albo potrzebujesz planu automatyzacji.',
  },
  {
    n: '04',
    title: 'Chcesz zbudować silniejszy zespół',
    desc: 'Rozwijasz kompetencje strategiczne, negocjacyjne, analityczne lub liderskie i zależy Ci na zmianie widocznej w codziennej pracy.',
  },
] as const

export default function HomePageV1Sections({ dict }: { dict: Dictionary }) {
  const d = dict.homepage
  const pillarItems = d.pillars.items.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        title: 'Doradztwo zakupowe',
        desc: 'Od analizy wydatków i strategii kategorii, przez sourcing i negocjacje, po model organizacyjny, procesy oraz wdrożenie oszczędności.',
        href: getPublicPath('services:index', 'pl'),
      }
    }

    if (index === 1) {
      return {
        ...item,
        title: 'Usługi Digital',
        desc: 'Od oceny dojrzałości technologicznej i docelowego stacku narzędzi, przez Spend Analytics, po dedykowane aplikacje i agentów AI.',
        href: getCapabilityPath('digital-service', 'digital-consulting', 'pl'),
      }
    }

    return {
      ...item,
      title: 'Rozwój kompetencji',
      desc: 'Programy CIPS, akademie zakupowe, szkolenia i coaching rozwijające kompetencje na podstawie rzeczywistych sytuacji biznesowych.',
      href: getPublicPath('education:index', 'pl'),
    }
  })

  return (
    <>
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
            <RevealWrapper delay={0}>
              <p className="editorial-label text-[rgba(0,109,158,0.8)] mb-5">
                Profitia w skrócie
              </p>
              <h2 className="max-w-xl text-3xl md:text-4xl lg:text-[2.7rem] font-semibold tracking-[-0.035em] leading-[1.08] text-gray-900">
                Strategiczna perspektywa. Butikowy sposób pracy. Odpowiedzialność za wynik.
              </h2>
            </RevealWrapper>

            <RevealWrapper delay={1} className="lg:pt-9">
              <div className="max-w-2xl space-y-5 text-base md:text-lg leading-relaxed text-gray-600">
                <p>
                  Wywodzimy się z międzynarodowego doradztwa zarządczego i od ponad 15 lat koncentrujemy się na zakupach. Łączymy doświadczenie strategiczne i sourcingowe z elastycznością wyspecjalizowanego zespołu.
                </p>
                <p>
                  Nie wdrażamy gotowych recept. Projektujemy rozwiązania pod realia klienta i pracujemy ramię w ramię z jego zespołem - od diagnozy i business case&apos;u po wdrożenie, transfer kompetencji i pomiar efektów.
                </p>
              </div>
            </RevealWrapper>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
            {IDENTITY_POINTS.map((item) => (
              <div key={item.n} className="bg-gray-50 p-7 lg:p-8">
                <p className="editorial-index text-brand-blue">{item.n}</p>
                <h3 className="editorial-box-title mt-8 text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 pt-24 lg:pt-28">
        <div className="max-w-7xl mx-auto px-6 pb-14">
          <p className="editorial-label text-[rgba(0,109,158,0.8)] mb-5">
            Zakres wsparcia
          </p>
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20 lg:items-end">
            <h2 className="max-w-2xl text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-gray-900">
              Pomagamy organizacjom lepiej kupować - i utrzymać osiągnięty efekt
            </h2>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">
              Łączymy doradztwo, technologię i rozwój kompetencji. Dzięki temu możemy rozwiązać konkretny problem zakupowy albo przeprowadzić szerszą transformację całej funkcji.
            </p>
          </div>
        </div>
        <HomePillars items={pillarItems} seeMore="Zobacz ofertę →" />
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="editorial-label text-[rgba(0,109,158,0.8)] mb-5">
              Nasza perspektywa
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-gray-900">
              Trwały wynik wymaga więcej niż jednej udanej negocjacji
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-600">
              Oszczędności nie powstają w oderwaniu od organizacji, procesów, danych i kompetencji. Dlatego patrzymy na funkcję zakupową jako na jeden system i pracujemy równolegle w czterech obszarach.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {SYSTEM_AREAS.map((area) => (
              <div key={area.n} className="group rounded-2xl border border-gray-200 p-7 md:p-9 transition-colors duration-200 hover:border-[rgba(0,109,158,0.28)] hover:bg-[rgba(0,109,158,0.025)]">
                <div className="flex items-start gap-5">
                  <span className="shrink-0 text-sm font-semibold text-brand-blue">{area.n}</span>
                  <div>
                    <h3 className="editorial-box-title text-gray-900">{area.title}</h3>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-600">{area.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-20">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm">
              <Image
                src="/images/website/Profitia_25.jpg"
                alt="Zespół Profitia podczas pracy projektowej"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>

            <div>
              <p className="editorial-label text-[rgba(0,109,158,0.8)] mb-5">
                Sposób działania
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-gray-900">
                Od diagnozy do wdrożonego wyniku
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                Nie dostarczamy raportu o zmianie. Pomagamy tę zmianę przeprowadzić.
              </p>

              <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.n} className="grid gap-4 py-8 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-7">
                    <p className="text-3xl font-light tracking-tight text-gray-300">{step.n}</p>
                    <div>
                      <h3 className="editorial-box-title text-gray-900">{step.title}</h3>
                      <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#242F44] py-24 text-white lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
            <div>
              <p className="editorial-label text-[rgba(199,237,251,0.82)] mb-5">
                Wiarygodność
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                Efekty, które można policzyć
              </h2>
            </div>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-white/72">
              Wspieraliśmy firmy z wielu sektorów w Polsce, regionie CEE i Europie Zachodniej - od pojedynczych kategorii zakupowych po kompleksowe programy transformacyjne.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
            {PROOF_STATS.map((stat) => (
              <div key={stat.val} className="bg-white/[0.035] p-8 md:p-10">
                <p className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-white">{stat.val}</p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/64">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-3xl">
            <p className="editorial-label text-[rgba(0,109,158,0.8)] mb-5">
              Przykład projektu
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-gray-900">
              Od analizy wydatków do planów sourcingowych dla 21 kategorii
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20 lg:items-start">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm">
              <Image
                src="/images/website/Profitia_31.jpg"
                alt="Zespół pracujący nad programem strategicznych kategorii zakupowych"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>

            <div className="divide-y divide-gray-200 border-y border-gray-200">
              <div className="py-7">
                <p className="editorial-label text-brand-blue">Sytuacja</p>
                <p className="mt-3 text-base leading-relaxed text-gray-700">
                  Duża firma logistyczna potrzebowała zwiększyć przejrzystość wydatków i zbudować spójne podejście do strategicznych kategorii zakupowych.
                </p>
              </div>
              <div className="py-7">
                <p className="editorial-label text-brand-blue">Działanie</p>
                <p className="mt-3 text-base leading-relaxed text-gray-700">
                  Przeprowadziliśmy analizę wydatków, opracowaliśmy strategie sourcingowe i zaangażowaliśmy zespoły biznesowe w przygotowanie planów działań dla poszczególnych kategorii.
                </p>
              </div>
              <div className="py-7">
                <p className="editorial-label text-brand-blue">Rezultat</p>
                <p className="mt-3 text-base leading-relaxed text-gray-700">
                  Zidentyfikowaliśmy ponad 7 mln EUR potencjalnych korzyści w 21 kategoriach i przygotowaliśmy plany sourcingowe umożliwiające ich wdrożenie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InteractiveTestimonials eyebrow={d.testimonial.eyebrow} items={d.testimonial.items} />

      <section className="bg-[rgba(199,237,251,0.24)] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="editorial-label text-[rgba(0,109,158,0.8)] mb-5">
              Kiedy pomagamy
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-gray-900">
              Wchodzimy tam, gdzie zakupy mają realny wpływ na wynik firmy
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {WHEN_WE_HELP.map((item) => (
              <div key={item.n} className="rounded-2xl border border-[rgba(0,109,158,0.12)] bg-white/72 p-7 md:p-9">
                <p className="editorial-index text-brand-blue">{item.n}</p>
                <h3 className="editorial-box-title mt-6 text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-lg font-medium text-gray-900">
            Możemy zacząć od jednego obszaru, jednej kategorii albo jednego procesu.
          </p>
        </div>
      </section>

      <FeaturedArticles
        copy={{
          eyebrow: 'Wiedza',
          h2: 'Analizy dla ludzi, którzy odpowiadają za wynik zakupów',
          body: 'Rynek dostawców, struktura kosztów, negocjacje, dane i technologia - dzielimy się wiedzą, którą wykorzystujemy również w pracy projektowej.',
        }}
        articles={d.insights.articles}
      />

      <section id="g6lvxh" className="bg-gradient-to-br from-gray-900 to-gray-800 py-24 text-white lg:py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="editorial-label text-white/56 mb-7">Następny krok</p>
          <h2 className="max-w-3xl mx-auto text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Zacznijmy od problemu, który dziś najbardziej wpływa na wynik zakupów
          </h2>
          <p className="max-w-2xl mx-auto mt-7 text-base md:text-lg leading-relaxed text-white/72">
            Może to być konkretna kategoria, problem z dostawcą, zmiana organizacji funkcji zakupowej, proces albo technologia. W pierwszej rozmowie ustalimy Twoje potrzeby i punkt wyjścia oraz zaproponujemy działania, które mogą wnieść największą wartość i najszybsze mierzalne rezultaty.
          </p>
          <Link
            href={getPublicPath('contact', 'pl')}
            className="mt-10 inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-medium text-gray-900 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.92)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            Umów rozmowę
          </Link>
        </div>
      </section>
    </>
  )
}
