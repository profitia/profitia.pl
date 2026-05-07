import type { Metadata } from 'next'
import {
  LegalLayout,
  LegalHero,
  LegalSection,
  LegalContent,
} from '@/components/legal'
import type { TOCItem } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Polityka prywatności | Profitia',
  alternates: {
    canonical: 'https://www.profitia.pl/privacy',
    languages: {
      pl: 'https://www.profitia.pl/privacy',
      en: 'https://www.profitia.pl/en/privacy',
    },
  },
}

const TOC: TOCItem[] = [
  { id: 'administrator',    label: '1. Administrator danych' },
  { id: 'podstawy',         label: '2. Podstawy prawne' },
  { id: 'kategorie',        label: '3. Kategorie danych' },
  { id: 'cele',             label: '4. Cele przetwarzania' },
  { id: 'okres',            label: '5. Okres przechowywania' },
  { id: 'prawa',            label: '6. Prawa użytkownika' },
  { id: 'przekazywanie',    label: '7. Przekazywanie danych' },
  { id: 'kontakt',          label: '8. Kontakt' },
]

export default function PrivacyPage() {
  return (
    <LegalLayout toc={TOC}>
      <LegalHero
        eyebrow="Dokument prawny"
        title="Polityka prywatności"
        intro="Niniejsza polityka prywatności opisuje sposób, w jaki Profitia Management Consultants zbiera, wykorzystuje i chroni dane osobowe użytkowników serwisu profitia.pl."
        meta={[
          { label: 'Ostatnia aktualizacja', value: 'Maj 2026' },
          { label: 'Wersja', value: '1.0' },
          { label: 'Jurysdykcja', value: 'Polska / UE' },
        ]}
      />

      <LegalSection id="administrator" title="1. Administrator danych">
        <LegalContent>
          <p>
            Administratorem danych osobowych w rozumieniu Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO) jest spółka <strong>Profitia Management Consultants Mazurowski i Wspólnicy Sp. J.</strong> z siedzibą przy ul. Puławskiej 145 (Villa Metro, V piętro), 02-715 Warszawa.
          </p>
          <p>
            W sprawach związanych z przetwarzaniem danych osobowych można kontaktować się za pośrednictwem adresu e-mail: kontakt@profitia.pl lub pisemnie na adres siedziby spółki.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="podstawy" title="2. Podstawy prawne przetwarzania">
        <LegalContent>
          <p>
            Przetwarzamy dane osobowe na następujących podstawach prawnych wynikających z art. 6 RODO:
          </p>
          <ul>
            <li><strong>Art. 6 ust. 1 lit. a</strong> - zgoda osoby, której dane dotyczą (np. zapis na newsletter, formularze kontaktowe).</li>
            <li><strong>Art. 6 ust. 1 lit. b</strong> - wykonanie umowy lub działania poprzedzające zawarcie umowy.</li>
            <li><strong>Art. 6 ust. 1 lit. c</strong> - wypełnienie obowiązku prawnego ciążącego na Administratorze.</li>
            <li><strong>Art. 6 ust. 1 lit. f</strong> - prawnie uzasadniony interes Administratora (np. marketing bezpośredni, bezpieczeństwo serwisu).</li>
          </ul>
          <p>
            Szczegółowa podstawa prawna jest każdorazowo wskazywana w momencie zbierania danych lub w odpowiedniej klauzuli informacyjnej.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="kategorie" title="3. Kategorie przetwarzanych danych">
        <LegalContent>
          <p>W zależności od celu kontaktu lub korzystania z serwisu możemy przetwarzać następujące kategorie danych:</p>
          <ul>
            <li>Dane identyfikacyjne - imię, nazwisko, stanowisko, firma.</li>
            <li>Dane kontaktowe - adres e-mail, numer telefonu.</li>
            <li>Dane techniczne - adres IP, pliki cookies, dane logów serwera.</li>
            <li>Dane dotyczące korespondencji - treść wiadomości przesłanych przez formularze.</li>
          </ul>
          <p>
            Nie przetwarzamy danych osobowych szczególnych kategorii, o których mowa w art. 9 RODO, chyba że wynika to z wyraźnej zgody lub wymagań prawnych.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="cele" title="4. Cele przetwarzania danych">
        <LegalContent>
          <p>Dane osobowe przetwarzane są w następujących celach:</p>
          <ul>
            <li>Obsługa zapytań ofertowych i korespondencji - na podstawie uzasadnionego interesu lub umowy.</li>
            <li>Realizacja usług doradczych i szkoleniowych - na podstawie umowy.</li>
            <li>Wysyłka newslettera i komunikacji marketingowej - na podstawie zgody.</li>
            <li>Analiza ruchu na stronie i optymalizacja serwisu - na podstawie uzasadnionego interesu.</li>
            <li>Wypełnienie obowiązków księgowych i podatkowych - na podstawie prawa.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="okres" title="5. Okres przechowywania danych">
        <LegalContent>
          <p>
            Dane osobowe przechowujemy przez okres niezbędny do realizacji celu, dla którego zostały zebrane, lub przez czas wymagany przez przepisy prawa.
          </p>
          <ul>
            <li>Dane z formularzy kontaktowych - do 3 lat od ostatniego kontaktu.</li>
            <li>Dane wynikające z umów - przez okres wymagany przepisami podatkowymi i rachunkowymi (zazwyczaj 5 lat).</li>
            <li>Dane z zapisów na newsletter - do czasu cofnięcia zgody.</li>
          </ul>
          <p>
            Po upływie wskazanego okresu dane są trwale usuwane lub anonimizowane.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="prawa" title="6. Prawa osób, których dane dotyczą">
        <LegalContent>
          <p>Na podstawie RODO przysługują Państwu następujące prawa:</p>
          <ul>
            <li><strong>Prawo dostępu</strong> - do treści danych oraz informacji o sposobie ich przetwarzania.</li>
            <li><strong>Prawo sprostowania</strong> - danych nieprawidłowych lub niekompletnych.</li>
            <li><strong>Prawo usunięcia</strong> - tzw. &quot;prawo do bycia zapomnianym&quot;.</li>
            <li><strong>Prawo ograniczenia przetwarzania</strong> - w przypadkach wskazanych w art. 18 RODO.</li>
            <li><strong>Prawo przenoszenia danych</strong> - w zakresie, w jakim przetwarzanie odbywa się na podstawie zgody lub umowy.</li>
            <li><strong>Prawo sprzeciwu</strong> - wobec przetwarzania na podstawie uzasadnionego interesu.</li>
            <li><strong>Prawo cofnięcia zgody</strong> - w każdym czasie, bez wpływu na zgodność z prawem przetwarzania dokonanego przed cofnięciem.</li>
          </ul>
          <p>
            W celu skorzystania z praw prosimy o kontakt pod adresem kontakt@profitia.pl. Administrator odpowie na żądanie w terminie 30 dni od jego otrzymania.
          </p>
          <p>
            Przysługuje Państwu również prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="przekazywanie" title="7. Przekazywanie danych do państw trzecich">
        <LegalContent>
          <p>
            Co do zasady dane osobowe nie są przekazywane do państw trzecich (poza Europejski Obszar Gospodarczy). W przypadku korzystania z narzędzi zewnętrznych, których dostawcy mogą przetwarzać dane poza EOG (np. usługi chmurowe), dbamy o zapewnienie odpowiednich zabezpieczeń, takich jak standardowe klauzule umowne zatwierdzone przez Komisję Europejską.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="kontakt" title="8. Kontakt z Administratorem">
        <LegalContent>
          <p>
            We wszelkich sprawach dotyczących ochrony danych osobowych prosimy o kontakt:
          </p>
          <ul>
            <li>E-mail: kontakt@profitia.pl</li>
            <li>Adres: ul. Puławska 145, Villa Metro V p., 02-715 Warszawa</li>
            <li>Telefon: +48 533 747 340</li>
          </ul>
          <p>
            Niniejsza polityka prywatności może być aktualizowana. O istotnych zmianach będziemy informować poprzez serwis lub korespondencję e-mail.
          </p>
        </LegalContent>
      </LegalSection>
    </LegalLayout>
  )
}
