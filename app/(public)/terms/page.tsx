import type { Metadata } from 'next'
import {
  LegalLayout,
  LegalHero,
  LegalSection,
  LegalContent,
} from '@/components/legal'
import type { TOCItem } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Regulamin | Profitia',
  alternates: {
    canonical: 'https://www.profitia.pl/terms',
    languages: {
      pl: 'https://www.profitia.pl/terms',
      en: 'https://www.profitia.pl/en/terms',
    },
  },
}

const TOC: TOCItem[] = [
  { id: 'definicje',        label: '1. Definicje' },
  { id: 'zakres',           label: '2. Zakres usług' },
  { id: 'warunki',          label: '3. Warunki korzystania' },
  { id: 'odpowiedzialnosc', label: '4. Odpowiedzialność' },
  { id: 'wlasnosc',         label: '5. Własność intelektualna' },
  { id: 'postanowienia',    label: '6. Postanowienia końcowe' },
]

export default function TermsPage() {
  return (
    <LegalLayout toc={TOC}>
      <LegalHero
        eyebrow="Dokument prawny"
        title="Regulamin serwisu"
        intro="Regulamin korzystania z serwisu internetowego profitia.pl prowadzonego przez Profitia Management Consultants Mazurowski i Wspólnicy Sp. J."
        meta={[
          { label: 'Ostatnia aktualizacja', value: 'Maj 2026' },
          { label: 'Wersja', value: '1.0' },
          { label: 'Jurysdykcja', value: 'Polska' },
        ]}
      />

      <LegalSection id="definicje" title="1. Definicje">
        <LegalContent>
          <p>Użyte w niniejszym regulaminie pojęcia oznaczają:</p>
          <ul>
            <li><strong>Serwis</strong> - serwis internetowy dostępny pod adresem profitia.pl.</li>
            <li><strong>Administrator</strong> - Profitia Management Consultants Mazurowski i Wspólnicy Sp. J., ul. Puławska 145, 02-715 Warszawa.</li>
            <li><strong>Użytkownik</strong> - osoba fizyczna korzystająca z serwisu.</li>
            <li><strong>Treści</strong> - wszelkie materiały zamieszczone w serwisie, w tym artykuły, opracowania, raporty, grafiki.</li>
            <li><strong>Usługi</strong> - usługi doradcze, szkoleniowe i analityczne świadczone przez Administratora.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="zakres" title="2. Zakres usług">
        <LegalContent>
          <p>
            Serwis profitia.pl jest serwisem informacyjnym i marketingowym, prezentującym ofertę Administratora w zakresie:
          </p>
          <ul>
            <li>Doradztwa zakupowego i negocjacyjnego.</li>
            <li>Szkoleń i programów certyfikacyjnych CIPS.</li>
            <li>Rozwiązania analitycznego SpendGuru.</li>
            <li>Raportów i opracowań branżowych.</li>
          </ul>
          <p>
            Szczegółowe warunki świadczenia poszczególnych usług regulowane są oddzielnymi umowami zawieranymi z Klientami.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="warunki" title="3. Warunki korzystania">
        <LegalContent>
          <p>Korzystanie z serwisu jest bezpłatne i nie wymaga rejestracji, z wyjątkiem funkcji wymagających zalogowania.</p>
          <p>Użytkownik zobowiązuje się do:</p>
          <ul>
            <li>Korzystania z serwisu zgodnie z prawem i dobrymi obyczajami.</li>
            <li>Niepodejmowania działań mogących zakłócić funkcjonowanie serwisu.</li>
            <li>Nieuprawnionego kopiowania lub rozpowszechniania treści serwisu.</li>
          </ul>
          <p>
            Administrator zastrzega sobie prawo do czasowego zawieszenia dostępu do serwisu w celu przeprowadzenia prac konserwacyjnych lub aktualizacji.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="odpowiedzialnosc" title="4. Odpowiedzialność">
        <LegalContent>
          <p>
            Administrator dołoży wszelkich starań, aby informacje prezentowane w serwisie były aktualne i rzetelne. Jednocześnie:
          </p>
          <ul>
            <li>Treści mają charakter informacyjny i nie stanowią porady prawnej ani finansowej.</li>
            <li>Administrator nie ponosi odpowiedzialności za decyzje podjęte na podstawie treści zamieszczonych w serwisie.</li>
            <li>Administrator nie ponosi odpowiedzialności za przerwy w dostępie do serwisu spowodowane przyczynami niezależnymi od niego.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="wlasnosc" title="5. Własność intelektualna">
        <LegalContent>
          <p>
            Wszelkie treści zamieszczone w serwisie, w tym teksty, grafiki, logotypy, dane i opracowania, stanowią własność Administratora lub podmiotów, które udzieliły Administratorowi odpowiednich licencji.
          </p>
          <p>
            Kopiowanie, modyfikowanie lub dystrybucja treści bez uprzedniej pisemnej zgody Administratora jest zabroniona, z wyjątkiem przypadków dopuszczonych przez przepisy prawa autorskiego (np. cytowanie z podaniem źródła).
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="postanowienia" title="6. Postanowienia końcowe">
        <LegalContent>
          <p>
            Regulamin wchodzi w życie z dniem jego opublikowania w serwisie.
          </p>
          <p>
            Administrator zastrzega sobie prawo do zmiany regulaminu. Zmiany wchodzą w życie z chwilą ich opublikowania. Dalsze korzystanie z serwisu po wprowadzeniu zmian oznacza ich akceptację.
          </p>
          <p>
            W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu Cywilnego i ustawy o świadczeniu usług drogą elektroniczną.
          </p>
          <p>
            Wszelkie spory wynikające z korzystania z serwisu rozstrzygane będą przez sąd właściwy dla siedziby Administratora.
          </p>
        </LegalContent>
      </LegalSection>
    </LegalLayout>
  )
}
