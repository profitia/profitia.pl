import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Zakupy, które realnie wpływają na wynik firmy',
  description:
    'Profitia — doradztwo zakupowe. Pomagamy organizacjom podejmować lepsze decyzje zakupowe, łącząc doświadczenie, dane i technologię.',
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════
          HERO
          ════════════════════════════════════ */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT: text */}
          <div className="flex flex-col justify-center h-auto md:h-[calc(100vh-80px)] px-6 md:px-12 py-16 md:py-0">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">Profitia</p>
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mt-6">
              Zakupy, które realnie&nbsp;wpływają na&nbsp;wynik&nbsp;firmy
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mt-6">
              Nie chodzi o to, żeby negocjować więcej.<br />
              Chodzi o to, żeby podejmować lepsze decyzje &mdash; zanim usiądziesz do rozmowy.
            </p>
            <p className="text-gray-500 leading-relaxed mt-4">
              Łączymy doświadczenie, dane i narzędzia, żeby zakupy przestały być reaktywne
              i zaczęły realnie wpływać na marżę.
            </p>
            <div className="mt-8">
              <Link
                href="#g6lvxh"
                className="inline-block bg-black text-white rounded-xl px-6 py-3.5 font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
              >
                Umów rozmowę
              </Link>
            </div>
          </div>

          {/* RIGHT: image */}
          <div className="relative w-full h-[60vh] md:h-[calc(100vh-80px)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"
              alt="Spotkanie negocjacyjne — doradztwo zakupowe Profitia"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 bg-white px-4 py-3 rounded-lg shadow-md">
              <div className="text-xs text-gray-500">Średnia poprawa warunków zakupowych</div>
              <div className="text-xl font-semibold text-gray-900 mt-0.5">+20%</div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          PROBLEM
          ════════════════════════════════════ */}
      <section id="bzze51" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-16">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">Kontekst</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight text-gray-900">
              Zakupy przestały być funkcją operacyjną
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            <div className="space-y-10">
              {[
                { title: 'Wpływ na marżę', desc: 'Decyzje zakupowe coraz bezpośredniej przekładają się na rentowność. Każdy punkt marży wymaga precyzji, nie przybliżeń.' },
                { title: 'Ciągłość działania', desc: 'Przerwy w łańcuchu dostaw mają realny koszt. Zakupy muszą zarządzać ryzykiem, nie tylko ceną.' },
                { title: 'Ryzyko dostawców', desc: 'Koncentracja, zależność, płynność finansowa kontrahentów &mdash; to teraz elementarz funkcji zakupów.' },
                { title: 'Zmienność rynku', desc: 'Ceny surowców, kursy walut, dostępność &mdash; zmienne, których nie można ignorować przy podejmowaniu decyzji.' },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <p className="font-medium text-lg text-gray-900">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-10">
              {[
                { title: 'Więcej danych, mniej jasności', desc: 'Dane są wszędzie &mdash; ale zamiana ich w konkretną decyzję zakupową wymaga czegoś więcej niż Excela i intuicji.' },
                { title: 'Presja czasu', desc: 'Negocjacje, renegocjacje, zapytania ofertowe &mdash; tempo pracy nie pozwala na głębszą analizę wtedy, gdy jest najbardziej potrzebna.' },
                { title: 'Większa odpowiedzialność', desc: 'Zakupy odpowiadają za więcej &mdash; często bez odpowiedniego wsparcia merytorycznego ani narzędzi.' },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <p className="font-medium text-lg text-gray-900">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 max-w-3xl border-l-4 border-gray-900 pl-6">
            <p className="text-2xl font-medium text-gray-900 leading-relaxed">
              Zakupy stają się funkcją strategiczną &mdash; ale nadal działają reaktywnie.
            </p>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          INSIGHT
          ════════════════════════════════════ */}
      <section id="3hhwq4" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">

          <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">Diagnoza</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16 leading-tight text-gray-900">
            To nie jest problem jednego obszaru
          </h2>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
            {[
              { n: '1', title: 'Nie chodzi tylko o negocjacje', desc: 'Nawet najlepsza negocjacja nie zastąpi złej strategii kategorii, braku danych czy nieprzygotowanego zespołu. Wynik negocjacji zależy od tego, co dzieje się przed i po.' },
              { n: '2', title: 'Nie chodzi tylko o dane', desc: 'Dane bez interpretacji to koszt. Kluczowe jest wiedzieć, jakich danych szukać, skąd je brać i jak przekształcić je w konkretną decyzję zakupową.' },
              { n: '3', title: 'Nie chodzi tylko o kompetencje', desc: 'Wykształcony zespół bez właściwego podejścia i narzędzi nadal będzie działał reaktywnie. Kompetencje potrzebują struktury, żeby działać efektywnie.' },
            ].map((item) => (
              <div key={item.n} className="relative pl-12 mb-12">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                  {item.n}
                </div>
                <p className="text-lg font-medium text-gray-900">{item.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gray-50 rounded-xl">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              Decyzje nie wynikają z danych.<br />
              Wynikają z tego, jak je wykorzystasz.
            </p>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          PILLARS
          ════════════════════════════════════ */}
      <style>{`
        #pillars-section:hover .pillar { opacity: 0.4; }
        #pillars-section .pillar:hover { opacity: 1 !important; }
      `}</style>
      <section id="pillars-section" className="flex flex-col md:flex-row md:h-[calc(100vh-80px)] overflow-hidden">
        {[
          { n: '01', title: 'Doradztwo', desc: 'Rozwiązanie konkretnych problemów zakupowych i wdrożenie rekomendacji w praktyce.', img: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80', alt: 'Doradztwo zakupowe — spotkanie konsultacyjne' },
          { n: '02', title: 'Kompetencje', desc: 'Wzmacniamy zespoły zakupowe, żeby podejmowały lepsze decyzje w realnych sytuacjach.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', alt: 'Rozwój kompetencji zakupowych — szkolenie zespołu' },
          { n: '03', title: 'Narzędzia', desc: 'Dane i narzędzia, które zamieniają przeczucia w uzasadnione decyzje.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', alt: 'Narzędzia analityczne — dane zakupowe' },
        ].map((pillar, i) => (
          <div
            key={pillar.n}
            className={`pillar group relative flex flex-col justify-end p-6 md:p-8 md:flex-1 h-[60vh] md:h-auto ${i < 2 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''} overflow-hidden cursor-pointer transition-opacity duration-500`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Image
                src={pillar.img}
                alt={pillar.alt}
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 group-hover:text-white/50 mb-4 transition-colors duration-300">{pillar.n}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">{pillar.title}</h3>
              <p className="text-sm md:text-base text-gray-500 mt-3 group-hover:text-gray-200 max-w-xs leading-relaxed transition-colors duration-300">{pillar.desc}</p>
              <span className="inline-block mt-5 text-sm text-gray-900 group-hover:text-white transition-colors duration-300">Zobacz więcej &rarr;</span>
            </div>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════════
          PROCESS
          ════════════════════════════════════ */}
      <section id="b5xg0q" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">Jak działamy</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight">
              Jak wygląda lepsze podejmowanie decyzji zakupowych
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { n: '01', title: 'Diagnoza sytuacji', desc: 'Rozumiemy punkt wyjścia &mdash; jakie kategorie, jakie napięcia, jakie dane już masz. Nie zaczynamy od rozwiązania, które mamy w katalogu.' },
              { n: '02', title: 'Analiza i kontekst rynkowy', desc: 'Identyfikujemy możliwości i ryzyka w oparciu o dane rynkowe, benchmarki i historię zakupową. Łączymy dane zewnętrzne z Twoim kontekstem wewnętrznym.' },
              { n: '03', title: 'Konkretna rekomendacja', desc: 'Nie raport &mdash; plan działania. Co zrobić, w jakiej kolejności, z jakim uzasadnieniem. Rekomendacja gotowa do prezentacji zarządowi i wdrożenia z zespołem.' },
              { n: '04', title: 'Wdrożenie z zespołem', desc: 'Realizujemy razem z Twoim zespołem &mdash; żeby wiedza i podejście zostały w organizacji. Nie robimy za Was; robimy razem, z transferem kompetencji.' },
              { n: '05', title: 'Weryfikacja efektów', desc: 'Mierzymy, co się zmieniło. Korekta tam, gdzie potrzeba &mdash; ciągłe doskonalenie, nie jednorazowy projekt z raportem końcowym.' },
            ].map((step) => (
              <div key={step.n} className="grid md:grid-cols-[100px_1fr] gap-6 md:gap-10 py-10 group hover:bg-gray-50 rounded-xl px-4 -mx-4 transition-colors duration-200">
                <div className="text-5xl font-thin text-gray-100 group-hover:text-gray-200 transition-colors leading-none pt-1 select-none">{step.n}</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 pt-10 border-t border-gray-100">
            <p className="text-xl font-medium leading-relaxed">
              Nie chodzi o ilość danych &mdash;{' '}
              <span className="text-gray-400">tylko o ich właściwe wykorzystanie.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          IMPACT
          ════════════════════════════════════ */}
      <section id="vqj89m" className="py-28 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5">Efekt</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight">
              Co się zmienia, gdy zakupy działają strategicznie
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Kontrola kosztów', desc: 'Wiesz, skąd pochodzi każda złotówka kosztu i masz argumenty, żeby ją negocjować lub uzasadnić.' },
              { title: 'Mniej chaosu', desc: 'Zamiast reagować na każdą zmianę, wyprzedzasz je. Decyzje stają się przewidywalne i uzasadnione.' },
              { title: 'Lepszy zespół', desc: 'Twoi ludzie rozumieją nie tylko co robić, ale dlaczego &mdash; i potrafią samodzielnie uzasadnić decyzje.' },
              { title: 'Spójność', desc: 'Jeden sposób myślenia o zakupach w całej organizacji &mdash; zamiast różnych podejść w każdym departamencie.' },
              { title: 'Przewidywalność', desc: 'Zamiast niespodzianek od dostawców &mdash; terminarz renegocjacji, monitoring rynku i gotowość na zmianę.' },
              { title: 'Realny wynik', desc: 'Zakupy przestają być centrum kosztów. Stają się funkcją, która aktywnie chroni i buduje marżę.' },
            ].map((card) => (
              <div key={card.title} className="border border-white/10 rounded-lg p-6 transition-all duration-300 hover:border-white/30 hover:bg-white/5">
                <div className="text-white/40 mb-4">&rarr;</div>
                <h4 className="text-lg font-medium text-white mb-2">{card.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          USE-CASES
          ════════════════════════════════════ */}
      <section id="p8800w" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">Kiedy warto się odezwać</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight">
              Sytuacje, w których pomagamy działać szybciej i pewniej
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { n: '01', title: 'Podwyżka od dostawcy', desc: 'Dostawca przysłał notyfikację o wzroście cen. Masz 2 tygodnie. Czy podwyżka jest uzasadniona? Jak negocjować? Jaka jest Twoja realna siła przetargowa?' },
              { n: '02', title: 'Brak benchmarków', desc: 'Nie wiesz, czy płacisz właściwą cenę. Negocjujesz bez punktu odniesienia. Decyzje opierasz na przeczuciu lub historii, nie na danych rynkowych.' },
              { n: '03', title: 'Trudne decyzje zakupowe', desc: 'Zmiana dostawcy, konsolidacja kategorii, decyzja make-or-buy. Wysokie stawki, wiele zmiennych i presja czasu &mdash; potrzebujesz zewnętrznego punktu widzenia.' },
              { n: '04', title: 'Chaos w kategoriach', desc: 'Każdy kupiec działa po swojemu. Brak strategii kategorii, brak spójności. Trudno powiedzieć, co faktycznie kupujesz, od kogo i na jakich warunkach.' },
            ].map((uc) => (
              <div key={uc.n} className="group border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:bg-gray-900 hover:text-white hover:shadow-lg">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-500 mb-5 transition-colors">{uc.n}</p>
                <h3 className="font-semibold text-xl text-gray-900 group-hover:text-white mb-4 transition-colors tracking-tight">{uc.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">{uc.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-600">
              Masz podobną sytuację?{' '}
              <Link href="#g6lvxh" className="text-gray-900 font-medium hover:underline">
                &rarr; Umów rozmowę
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROOF
          ════════════════════════════════════ */}
      <section id="d31qlk" className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">Wiarygodność</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Efekty, nie obietnice
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden mb-20">
            {[
              { val: '+20%', label: 'średnia poprawa warunków zakupowych w pierwszym cyklu renegocjacji' },
              { val: '3\u20136\u00a0tyg.', label: 'czas od diagnozy do pierwszych konkretnych wyników w terenie' },
              { val: '12+', label: 'lat doświadczenia w zakupach i doradztwie dla firm różnej skali' },
            ].map((stat) => (
              <div key={stat.val} className="bg-white p-10 text-center">
                <p className="text-5xl font-semibold text-gray-900 mb-3">{stat.val}</p>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto">{stat.label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-8">
              Pracowaliśmy z organizacjami z sektorów
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center p-4 bg-white rounded-xl h-14 shadow-sm">
                  <div className="w-16 h-5 bg-gray-200 rounded opacity-50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CASES
          ════════════════════════════════════ */}
      <section id="io58to" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">Przypadek</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Jak to wygląda w praktyce
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="relative w-full rounded-2xl shadow-sm aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
                  alt="Analiza danych zakupowych — przypadek firmy produkcyjnej"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-10 pt-4">
              {[
                { label: 'Problem', text: 'Firma produkcyjna, 4 kluczowe kategorie zakupowe &mdash; każda zarządzana przez inny dział, inaczej. Brak benchmarków, brak strategii. Dwóch kluczowych dostawców wysyła podwyżki w tym samym kwartale o łącznie 14%.' },
                { label: 'Działanie', text: 'Analiza kosztów kategorii, zestawienie z danymi rynkowymi, opracowanie pozycji negocjacyjnej dla obu dostawców. 3-tygodniowy sprint: diagnoza, dane zewnętrzne, rekomendacja, przygotowanie zespołu do rozmów.' },
                { label: 'Efekt', text: 'Negocjacje zakończone przy 6% wzroście zamiast 14% &mdash; połowiczne przejęcie podwyżki. Strategia na kolejne 18 miesięcy dla obu kategorii. Zespół z modelem pracy gotowym do samodzielnego stosowania.' },
              ].map((item, idx) => (
                <div key={item.label} className={idx > 0 ? 'border-t border-gray-100 pt-10' : ''}>
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-3">{item.label}</p>
                  <p className="text-gray-700 leading-relaxed text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA
          ════════════════════════════════════ */}
      <section id="g6lvxh" className="py-24 lg:py-32 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-600 mb-7">Następny krok</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-7 max-w-2xl mx-auto leading-tight">
            Zacznij od jednego konkretnego przypadku
          </h2>
          <p className="text-gray-400 text-lg mb-4 max-w-lg mx-auto leading-relaxed">
            Możemy przejść przez jedną sytuację i pokazać lepsze podejście &mdash; bez zobowiązań i bez ogólnikowych propozycji.
          </p>
          <p className="text-gray-600 text-sm mb-12">
            Bez zobowiązań. Bez sprzedaży.<br />Konkretna rozmowa o Twojej sytuacji.
          </p>
          <a
            href="mailto:kontakt@profitia.pl"
            className="inline-block bg-white text-black rounded-xl px-8 py-4 font-medium text-base hover:bg-gray-100 transition-colors duration-200"
          >
            Umów rozmowę
          </a>
        </div>
      </section>
    </>
  )
}



