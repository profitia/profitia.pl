import type { Metadata } from 'next'
import {
  LegalLayout,
  LegalHero,
  LegalSection,
  LegalContent,
} from '@/components/legal'
import type { TOCItem } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Polityka cookies | Profitia',
  alternates: {
    canonical: 'https://www.profitia.pl/cookies',
    languages: {
      pl: 'https://www.profitia.pl/cookies',
      en: 'https://www.profitia.pl/en/cookies',
    },
  },
}

const TOC: TOCItem[] = [
  { id: 'czym-sa',          label: '1. Czym są pliki cookies' },
  { id: 'rodzaje',          label: '2. Rodzaje plików cookies' },
  { id: 'cookies-wlasne',   label: '3. Cookies własne' },
  { id: 'cookies-trzecie',  label: '4. Cookies podmiotów trzecich' },
  { id: 'zarzadzanie',      label: '5. Zarządzanie cookies' },
  { id: 'zmiany',           label: '6. Zmiany polityki' },
]

export default function CookiesPage() {
  return (
    <LegalLayout toc={TOC}>
      <LegalHero
        eyebrow="Dokument prawny"
        title="Polityka plików cookies"
        intro="Informacje o tym, jak serwis profitia.pl korzysta z plików cookies oraz jak możesz zarządzać swoimi preferencjami."
        meta={[
          { label: 'Ostatnia aktualizacja', value: 'Maj 2026' },
          { label: 'Wersja', value: '1.0' },
        ]}
      />

      <LegalSection id="czym-sa" title="1. Czym są pliki cookies">
        <LegalContent>
          <p>
            Pliki cookies (ciasteczka) to małe pliki tekstowe zapisywane na urządzeniu użytkownika przez przeglądarkę internetową podczas przeglądania stron. Umożliwiają zapamiętywanie informacji o sesji, preferencjach i zachowaniu użytkownika.
          </p>
          <p>
            Cookies nie są używane do identyfikacji tożsamości użytkownika ani do zbierania danych umożliwiających bezpośrednią identyfikację bez zgody.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="rodzaje" title="2. Rodzaje plików cookies">
        <LegalContent>
          <p>W serwisie profitia.pl wyróżniamy następujące kategorie plików cookies:</p>
          <ul>
            <li><strong>Cookies niezbędne</strong> - konieczne do prawidłowego funkcjonowania serwisu, nie wymagają zgody użytkownika.</li>
            <li><strong>Cookies funkcjonalne</strong> - zapamiętują preferencje użytkownika, takie jak wybór języka interfejsu.</li>
            <li><strong>Cookies analityczne</strong> - umożliwiają analizę ruchu i zachowania użytkowników w celu optymalizacji serwisu.</li>
            <li><strong>Cookies marketingowe</strong> - mogą być stosowane do wyświetlania spersonalizowanych treści i reklam.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="cookies-wlasne" title="3. Cookies własne">
        <LegalContent>
          <p>
            Serwis korzysta z cookies własnych w następujących celach:
          </p>
          <ul>
            <li>Zapamiętywanie preferencji językowych - plik <strong>PROFITIA_LOCALE</strong> przechowuje wybrany język interfejsu (PL/EN). Ważność: 12 miesięcy.</li>
            <li>Obsługa sesji użytkownika przy korzystaniu z formularzy kontaktowych.</li>
            <li>Bezpieczeństwo serwisu - ochrona przed atakami CSRF.</li>
          </ul>
          <p>
            Powyższe cookies są niezbędne do prawidłowego działania serwisu i nie wymagają odrębnej zgody użytkownika.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="cookies-trzecie" title="4. Cookies podmiotów trzecich">
        <LegalContent>
          <p>
            Serwis może korzystać z usług podmiotów trzecich, które umieszczają własne pliki cookies. Dotyczy to w szczególności:
          </p>
          <ul>
            <li>Narzędzi analitycznych (np. Google Analytics) - analiza ruchu i zachowania użytkowników.</li>
            <li>Platform do zarządzania treścią i formularzami.</li>
            <li>Integracji z portalami społecznościowymi.</li>
          </ul>
          <p>
            Zasady przetwarzania danych przez podmioty trzecie regulują ich własne polityki prywatności i pliki cookies.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="zarzadzanie" title="5. Zarządzanie plikami cookies">
        <LegalContent>
          <p>
            Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookies w swojej przeglądarce internetowej. Większość przeglądarek umożliwia:
          </p>
          <ul>
            <li>Przeglądanie zapisanych plików cookies i ich usuwanie.</li>
            <li>Blokowanie cookies od określonych witryn.</li>
            <li>Blokowanie cookies podmiotów trzecich.</li>
            <li>Blokowanie wszystkich cookies.</li>
          </ul>
          <p>
            Ograniczenie stosowania plików cookies może wpłynąć na funkcjonalność serwisu. Szczegółowe instrukcje zarządzania cookies znajdziesz w dokumentacji swojej przeglądarki.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="zmiany" title="6. Zmiany polityki cookies">
        <LegalContent>
          <p>
            Administrator zastrzega sobie prawo do zmiany niniejszej polityki plików cookies. Aktualna wersja jest zawsze dostępna pod adresem profitia.pl/cookies. Data ostatniej aktualizacji jest widoczna na górze dokumentu.
          </p>
          <p>
            Dalsze korzystanie z serwisu po wprowadzeniu zmian oznacza ich akceptację.
          </p>
        </LegalContent>
      </LegalSection>
    </LegalLayout>
  )
}
