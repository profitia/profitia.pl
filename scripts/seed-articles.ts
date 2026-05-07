/**
 * Editorial Content Migration — Procurement Intelligence Publication
 *
 * Migrates 3 original Profitia articles into the new editorial system.
 * Each article is fully adapted: structured TOC, pull quotes (blockquote),
 * insight blocks, editorial hierarchy, and complete content model fields.
 *
 * Run: npx tsx scripts/seed-articles.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ── Slugs ────────────────────────────────────────────────────────────────────

const SLUG_1 = 'cena-to-opinia-koszt-to-fakt'
const SLUG_2 = 'dzien-z-zycia-kupca-kiedy-stala-cena-przegrywa-z-faktami'
const SLUG_3 = 'analiza-finansowa-dostawcow'

// ── Author profiles ──────────────────────────────────────────────────────────

const AUTHOR_TOMASZ = {
  authorName: 'Tomasz Uściński',
  authorRole: 'Senior Client Partner | Procurement Technology',
  authorBio:
    'Od ponad dekady wspiera zespoły zakupowe w transformacji z funkcji administracyjnej w centrum strategiczne organizacji. Specjalizuje się w zastosowaniu metodologii Should Cost i analizy danych rynkowych w negocjacjach z dostawcami.',
}

const AUTHOR_RAFAL = {
  authorName: 'Rafał Gilatowski',
  authorRole: 'Head of Digital | Manager ds. Zakupów',
  authorBio:
    'Specjalizuje się w analizie finansowej dostawców i narzędziach wspierających strategiczne decyzje zakupowe. Łączy kompetencje analityczne z praktyką zarządzania portfelem dostawców w środowiskach o wysokiej zmienności rynkowej.',
}

// ── Article 1 ────────────────────────────────────────────────────────────────
// Original: "Cena to opinia. Koszt to fakt."
// Category: cost-intelligence | Featured: true | Reading: 9 min

const ARTICLE_1_CONTENT = `
<h2>Zakupy w świecie, gdzie ceny już nie idą w górę</h2>

<p>Przez ostatnie lata firmy radziły sobie z rosnącymi kosztami w najprostszy możliwy sposób: przerzucały je na klienta końcowego. Ceny na półkach rosły, marże były w miarę bezpieczne, a działy zakupów działały w cieniu sprzedaży.</p>

<p>Ale ten mechanizm właśnie się zdezaktualizował. Konsumenci doszli do swojego progu bólu. Nie da się już w nieskończoność podnosić cen produktów i usług - rynek po prostu mówi "nie". I w tej nowej rzeczywistości dzieje się coś fundamentalnego: Zakupy przestają być działem "od faktur", a stają się głównym strażnikiem wyniku finansowego firmy.</p>

<p>Jedyną trwałą dźwignią, która pozostaje, jest świadome zarządzanie kosztami zakupów. Nie optymalizacja "kiedyś". Zarządzanie teraz - oparte o fakty, nie o opinie.</p>

<h2>Dlaczego cena jest opinią</h2>

<p>Tradycyjny model negocjacji zakupowych opierał się na dobrze znanych mechanizmach: charyzma, wolumen, relacja z dostawcą. Sukces mierzono głównie zdolnością do "urwania" rabatu od ceny końcowej. Był to model, który działał w stabilnych warunkach - i który przestał wystarczać.</p>

<p>Dziś działamy w warunkach ekstremalnej zmienności i złożoności. Koszty surowców, energii i logistyki zmieniają się szybciej niż obowiązuje cennik. Dostawca przychodzi z podwyżką, argumentując enigmatyczną "sytuacją rynkową" - a bez wiedzy o rzeczywistych kosztach wytworzenia jesteśmy bezbronni, skazani na wiarę w słowo kontrahenta.</p>

<blockquote>Cena jest tym, co dostawca chce, żebyś zapłacił. Często jest wypadkową jego strategii, sytuacji i braku przejrzystości rynku. Koszt zasadny to obiektywna odpowiedź na pytanie: ile to naprawdę powinno kosztować w warunkach rynkowych.</blockquote>

<p>To nie jest różnica semantyczna. To różnica między grą w pokera a grą w szachy. W pokerze liczy się blef i psychologia. W szachach liczy się wiedza o tym, co ma druga strona na planszy.</p>

<p>Typowa sytuacja: dostawca przychodzi z podwyżką 8%, argumentując ją "sytuacją rynkową". Bez wiedzy o rzeczywistych kosztach wytworzenia, zespół zakupowy staje się bezbronny. Nie jest w stanie skutecznie zakwestionować skali podwyżki ani obronić wypracowanych warunków.</p>

<h2>Koszt zasadny: anatomia faktu</h2>

<p>Koszt zasadny (ang. should cost) polega na skalkulowaniu, ile dany produkt lub usługa powinny kosztować w warunkach rynkowych - na bazie obiektywnych elementów kosztotwórczych: surowców, robocizny, energii, logistyki, notowań giełdowych i wskaźników makroekonomicznych.</p>

<p>Kluczowe jest to, co świadomie pomijamy: marżę dostawcy i jego koszty ogólne. Nie dlatego, że dostawca nie ma prawa zarabiać - ale dlatego, że te elementy są zmienne, nieprzejrzyste i w negocjacjach łatwo zamieniają się w opinię. Should Cost ma jeden cel: określić oczekiwaną, uczciwą cenę rynkową jako punkt odniesienia.</p>

<h3>Co daje ta analiza w praktyce</h3>

<ul>
<li>Punkt odniesienia do negocjacji, który nie jest "wrażeniem rynkowym"</li>
<li>Zrozumienie przyszłych trendów kosztowych - tak, żeby nie kupować na "górce"</li>
<li>Przewagę negocjacyjną opartą na faktach, a nie na intuicji</li>
<li>Możliwość precyzyjnego kwestionowania podwyżek z pozycji wiedzy, nie emocji</li>
</ul>

<p>Kiedy dostawca mówi "musimy podnieść cenę, bo prąd zdrożał", możesz odpowiedzieć precyzyjnie: "Zgoda, energia zdrożała o 20%, ale stanowi ona tylko 8% struktury kosztu tej kategorii. Z kolei cena głównego surowca spadła o 15%. Z naszych wyliczeń wynika, że zamiast podwyżki powinniśmy rozmawiać o obniżce o 3,5%."</p>

<blockquote>W tym momencie dynamika rozmowy zmienia się diametralnie. Kupiec przestaje być petentem, a staje się równorzędnym partnerem, który rozumie biznes drugiej strony lepiej niż ona sama się spodziewała.</blockquote>

<h2>Archeologia zakupowa: co ukrywa historia?</h2>

<p>Jednym z najbardziej skutecznych zastosowań kosztu zasadnego jest analiza historyczna. Porównując ceny, które płaciliśmy dostawcy, z historycznym przebiegiem kosztu zasadnego, można zidentyfikować zjawiska, które kosztowały firmę realnie mierzalne pieniądze.</p>

<h3>Mechanizm "rakiet i piórek"</h3>

<p>W ekonomii behawioralnej i zakupach znane jest zjawisko asymetrii cenowej: ceny rosną jak rakiety (błyskawicznie reagując na wzrost kosztów surowców), ale spadają jak piórka (powoli i niechętnie, gdy koszty surowców tanieją).</p>

<p>Analiza historyczna bezlitośnie obnaża ten mechanizm. Na wykresach często widać, że w momencie, gdy rynkowe indeksy surowców pikują w dół, cena u dostawcy pozostaje płaska lub spada nieproporcjonalnie wolno. Firma nieświadomie finansuje nadmiarową marżę dostawcy w każdym miesiącu, w którym koszt zasadny jest poniżej ceny zakupu.</p>

<blockquote>To jest gotowy scenariusz negocjacyjny. Nie musimy oskarżać dostawcy o nieuczciwość. Pokazujemy mu dane: "W Q3, kiedy surowiec taniał, my wciąż płaciliśmy starą stawkę. Przejęliśmy na siebie cały ciężar Twojej marży. Oczekujemy, że ten nadpłacony kapitał zostanie uwzględniony w rabacie na kolejny okres."</blockquote>

<p>To twarde dane, z którymi trudno polemizować. Nie interpretacja - wykres.</p>

<h2>Od kontraktu stałego do kontraktu elastycznego</h2>

<p>Tradycyjny model "stałej ceny na rok" w niestabilnych czasach jest ryzykowny dla obu stron. Dostawca, bojąc się ryzyka, dolicza do ceny wysoki bufor bezpieczeństwa. Kupiec ryzykuje zafiksowanie ceny na "górce".</p>

<p>Alternatywą, która zyskuje na popularności dzięki dostępowi do wiarygodnych prognoz kosztowych, są kontrakty indeksowe i modele open book. Zamiast jednej ceny, umawiamy się na formułę: <strong>Cena = (Cena Surowca × Waga) + Koszt Przetworzenia + Marża.</strong></p>

<p>Kluczowe: aktualizujemy tylko część surowcową - w oparciu o publiczny indeks. Koszt przetworzenia i marża pozostają stałe. Dzięki temu cena "oddycha rynkiem", ale nie zamienia budżetu w ruletkę.</p>

<h3>Zarządzanie ryzykiem, nie tylko kupowanie</h3>

<p>Mając dostęp do prognoz kosztowych - wariantów optymistycznych, pesymistycznych i najbardziej prawdopodobnych - możemy precyzyjnie symulować, jak taki kontrakt wpłynie na budżet w każdym scenariuszu. Możemy powiedzieć Zarządowi: "W wariancie bazowym wydamy X, ale jesteśmy zabezpieczeni na wypadek wzrostów, a jeśli rynek spadnie - oszczędności trafią bezpośrednio do nas."</p>

<p>To jest definicja zarządzania ryzykiem, a nie tylko kupowania.</p>

<h2>Kondycja dostawcy jako zmienna negocjacyjna</h2>

<p>Koszt zasadny to jedna strona równania. Drugą jest kondycja finansowa samego dostawcy. Czy rozmawiamy z firmą, która stoi na krawędzi bankructwa i desperacko potrzebuje gotówki? Czy może z gigantem, dla którego nasz kontrakt to ułamek procenta przychodów i który nie będzie skłonny do ustępstw?</p>

<p>Ta wiedza jest potężną dźwignią. Firma walcząca o płynność inaczej reaguje na ofertę "skrócimy termin płatności w zamian za lepszą cenę" niż stabilny producent z nadwyżką gotówkową. Dostawca, który generuje 10% przychodów dzięki nam, a jego rentowność jest pod presją - jest w zupełnie innej pozycji negocjacyjnej niż ten, dla którego jesteśmy marginalnym klientem.</p>

<blockquote>Informacja to amunicja. W świecie, w którym dostawcy są doskonale przygotowani do negocjacji, brak wiedzy o koszcie zasadnym i kondycji dostawcy to wejście na ring z zawiązanymi oczami. Tę walkę można wygrać - czas zdjąć opaskę.</blockquote>

<h2>Od centrum kosztów do strażnika marży</h2>

<p>Zmiana podejścia do zarządzania kosztami jest dziś nie tylko zmianą techniczną, ale przede wszystkim rewolucją kulturową w organizacji. Zrozumienie kosztu zasadnego i otoczenia rynkowego otwiera Zespołom zakupowym drogę do ucieczki z pułapki ciągłej reaktywności.</p>

<p>Nowoczesne Zakupy nie odpowiadają na pisma dostawców, gdy pożar już płonie. Przewidują ruchy rynkowe, budują pozycję negocjacyjną z wyprzedzeniem i kwestionują podwyżki w oparciu o twarde fakty. To jest strategiczne centrum dowodzenia, od którego zależy kondycja całego przedsiębiorstwa.</p>

<p>W biznesie nie płaci się tyle, ile coś jest warte. Płaci się tyle, ile wynegocjuje. A najlepiej negocjuje ten, kto wie więcej.</p>

<p>Chcesz omówić podobne wyzwanie negocjacyjne w kontekście Twojej organizacji? Zapraszam do bezpośredniego kontaktu: <a href="mailto:tomasz.uscinski@profitia.pl">tomasz.uscinski@profitia.pl</a></p>
`.trim()

// ── Article 2 ────────────────────────────────────────────────────────────────
// Original: "Dzień z życia kupca: kiedy 'stała cena' przegrywa z faktami"
// Category: cost-intelligence | Featured: false | Reading: 11 min

const ARTICLE_2_CONTENT = `
<h2>Dwie osoby, dwie branże, jedna stawka: wynik firmy</h2>

<p>Kamil i Anna to kupcy kategorii w dużych organizacjach. Oboje działają w zupełnie różnych sektorach, zarządzają innymi kategoriami i mierzą się z innymi codziennymi presja mi. Ale jedno mają wspólne: ich skuteczność nie jest rozliczana z "ładnych negocjacji" - tylko z twardych KPI, które przekładają się bezpośrednio na P&L firmy.</p>

<p>Kamil pracuje w branży spożywczej i odpowiada za opakowania - m.in. tacki plastikowe używane na kluczowych liniach produkcyjnych. Jego KPI: oszczędności vs budżet (PPV/price variance), wpływ na marżę (EBIT/GM impact), ciągłość dostaw i service level, a także ryzyko w kategorii.</p>

<p>Anna pracuje w firmie z branży budowlanej i infrastrukturalnej. W jej kategorii "ramy stalowe" są krytycznym komponentem wyrobu i decydują o terminach realizacji kontraktów. Jej KPI są równie bezwzględne: utrzymanie kosztu w planie mimo zmienności stali i frachtu, stabilność dostaw pod projekty (OTIF), redukcja ekspozycji na wahania rynkowe.</p>

<blockquote>Oboje są oceniani nie za to, czy "urwali rabat", tylko za to, czy potrafią zamienić dane o kosztach w realną obronę wyniku firmy.</blockquote>

<p>Ten artykuł to historia jednego dnia ich pracy - dnia, w którym "stała cena" przestaje być bezpieczeństwem, a zaczyna być ryzykiem.</p>

<h2>Małe decyzje, duże pieniądze</h2>

<p>To, co w kalendarzu Kamila i Anny wygląda jak "zwykły dzień pracy" - kilka maili, rozmowa z produkcją, szybki rzut oka na wykresy, uzupełnienie danych w ERP - potrafi przełożyć się na realny wynik finansowy firmy.</p>

<p>Bo w zakupach nie wygrywa się jedną wielką decyzją raz do roku. Wygrywa się setką małych decyzji podejmowanych codziennie: czy przyjąć narrację dostawcy o "sytuacji rynkowej", czy sprawdzić fakty; czy zostawić stałą cenę bez przeglądu, czy wprowadzić mechanizm korekty; czy odpuścić "bo to tylko kilka groszy", czy policzyć wpływ na wolumen.</p>

<blockquote>Jeden dzień, w którym kupiec zamienia opinię w koszt zasadny, może oznaczać uniknięcie podwyżki, wynegocjowaną obniżkę albo lepszy kontrakt na kolejne kwartały. A to są już nie "ładne KPI zakupowe" - to twarde liczby w P&L.</blockquote>

<p>Kamil zaczyna dzień wcześnie, bo lubi mieć przewagę zanim zacznie się szum. Anna zaczyna później, ale szybciej wchodzi w sedno. Oboje wiedzą jedno: konsumenci doszli do progu bólu, więc "podnieśmy ceny" nie jest już planem. W takich czasach Zakupy przestają być od faktur. Są od wyniku.</p>

<h2>Kamil i tacki plastikowe: anatomia kosztu</h2>

<p>Kamil odpowiada za kategorię, która z boku wygląda banalnie: tacki plastikowe do pakowania produktów. Niby nic wielkiego - dopóki nie policzysz wolumenu. A kiedy policzysz wolumen, zrozumiesz, że pół procenta różnicy potrafi być różnicą między "jakoś dowieźliśmy" a "dlaczego marża nam ucieka".</p>

<p>Jeszcze niedawno Kamil cenił w tej kategorii jedno: stabilność. Stała cena od dostawcy brzmiała jak bezpieczeństwo. Tyle że stabilność bywa jak cisza przed burzą: nie oznacza, że nic się nie dzieje - tylko że nie patrzysz tam, gdzie powinieneś.</p>

<p>Dlatego Kamil otwiera model kosztu zasadnego dla tej kategorii. Na ekranie widzi rozbitą na czynniki pierwsze strukturę kosztu - z czego ta cena naprawdę jest zbudowana.</p>

<h3>Struktura kosztu tacki plastikowej</h3>

<ul>
<li><strong>PET (politereftalan etylenu):</strong> 60% - dominujący driver kosztowy</li>
<li><strong>Kopolimer:</strong> 10%</li>
<li><strong>Praca:</strong> 10%</li>
<li><strong>Transport:</strong> 8%</li>
<li><strong>Prąd:</strong> 7%</li>
<li><strong>Gaz:</strong> 5%</li>
</ul>

<p>To jest anatomia kosztu, która pozwala nie dyskutować o "cenie tacki", tylko o tym, co realnie ją buduje. Kiedy dostawca próbuje tłumaczyć podwyżkę energią, Kamil od razu widzi: energetyka to 12% kosztu. Nie można nią uzasadnić ruchu na całej cenie jednostkowej.</p>

<h2>Struktura kosztu w czasie: kiedy stała cena staje się ryzykiem</h2>

<p>Ale najważniejsze jest to, co dzieje się dynamicznie. Przy stałej cenie zakupu (100% jako punkt odniesienia) koszt zasadny nie stoi w miejscu. Pod koniec analizowanego okresu linia kosztu zasadnego schodzi do okolic 79,9% ceny dostawcy.</p>

<p>To oznacza jedno: przy tej samej cenie, po której kupowano przez cały rok, model Should Cost pokazuje koszt "uczciwy" istotnie niżej. Rynek kosztowy daje przestrzeń do renegocjacji - a stała cena tę przestrzeń aktywnie ignoruje.</p>

<blockquote>"Stała cena" przestaje być bezpieczeństwem. Staje się ryzykiem: ryzykiem, że płacisz jak w poprzednim roku, mimo że koszt zasadny mówi coś zupełnie innego od miesięcy.</blockquote>

<p>Do tego dochodzi kolejny sygnał: udział PET - "króla" tej kategorii - w czasie spada do okolic 50,8%. Relatywnie większego znaczenia nabierają koszty, które w rozmowach z dostawcami często giną w tle: energia, praca, transport. Dostawca, który opowiada świat jako "PET dyktuje wszystko" - mija się z aktualnym stanem faktycznym struktury kosztu.</p>

<h2>Excel, który zamienia model w decyzję</h2>

<p>Model Should Cost daje fakty. Ale żeby ten fakt poruszył organizację, musi stać się wpływem na budżet - realną wartością w walucie. I tu wchodzi analiza wolumenowa.</p>

<p>Kamil bierze z ERP miesięczne wolumeny tacek, wpisuje stałą cenę dostawcy i zestawia z benchmarkiem kosztu zasadnego. Arkusz przelicza różnicę miesiąc po miesiącu i pokazuje skumulowany efekt. I nagle "taniejący rynek" przestaje być narracją. Staje się liczbą.</p>

<ul>
<li>Cena dostawcy (ważona): <strong>440 zł</strong> za jednostkę</li>
<li>Średni koszt zasadny: <strong>387 zł</strong> za jednostkę</li>
<li>Nadpłata na jednostce (ważona wolumenem): ~53 zł</li>
<li><strong>Skumulowana strata roczna: 304 216 zł (-12%)</strong></li>
<li>Największa ekspozycja: Q4 (peak wolumenu przy najniższym koszcie zasadnym)</li>
</ul>

<blockquote>Kamil nie idzie z tą analizą do dostawcy po "rabacik". Idzie po korektę rzeczywistości: "Skoro od marca koszt zasadny jest poniżej 440, potrzebujemy korekty ceny w dół i mechanizmu, który będzie ją aktualizował, gdy rynek spada - inaczej cała nadwyżka zostaje u Was."</blockquote>

<p>I zamyka temat emocji jednym zdaniem: "Cena to opinia - my chcemy rozmawiać o faktach, czyli o kosztach i ich udziałach; jeśli rośnie energia czy logistyka, policzmy wpływ i korygujmy tylko tę część, a nie całą cenę jednostkową."</p>

<h2>Anna i rama stalowa: gdy stal traci dominację</h2>

<p>U Anny kategoria jest inna, ale zasada ta sama. Rama stalowa to produkt, który w wielu firmach jest sercem procesu. Tu "stała cena" kusi jeszcze bardziej, bo ciągłość dostaw jest kluczowa, a relacje z dostawcą bywają strategiczne.</p>

<h3>Struktura kosztu ramy stalowej</h3>

<ul>
<li><strong>Stal:</strong> 55% - dominujący driver kosztowy</li>
<li><strong>Produkcja / przetworzenie:</strong> 16%</li>
<li><strong>Praca:</strong> 10%</li>
<li><strong>Fracht morski:</strong> 8%</li>
<li><strong>Olej ochronny:</strong> 5%</li>
<li><strong>Paliwo:</strong> 4%</li>
<li><strong>Drut stalowy:</strong> 2%</li>
</ul>

<p>Te proporcje są kluczowe dla rozmowy z dostawcą. Jeśli ktoś próbuje "przepchnąć" podwyżkę powołując się na element z marginalnym udziałem, Anna widzi to natychmiast. A jeśli argument dotyczy stali - wie, że rozmawiamy o największej dźwigni kosztu. Ale i tu jest niespodzianaka: udział stali w czasie spada do okolic 49,3%.</p>

<blockquote>Jedna firma widzi głównie stal, druga odczuwa bardziej przetworzenie i łańcuch dostaw. To tłumaczy, dlaczego w tej samej kategorii można mieć dwie pozornie sprzeczne narracje rynkowe. Właśnie dlatego Anna nie chce rozmawiać o cenie jako o opinii. Ona chce rozmawiać o koszcie jako o fakcie.</blockquote>

<p>Na wykresie koszt zasadny schodzi pod koniec okresu do okolic 88,3% ceny zakupu. Przy cenie zakupu 100%, model Should Cost pokazuje, że oczekiwana uczciwa baza kosztowa była niżej. "Stała cena" nie jest neutralna - może oznaczać, że firma płaciła zbyt drogo względem tego, co wynika z driverów kosztowych.</p>

<p>I tu Anna przypomina o mechanizmie "rakiet i piórek": kiedy koszty rosną, ceny potrafią iść jak rakieta. Kiedy koszty spadają, ceny często spadają jak piórko. Analiza Should Cost obnaża to bez emocji - wykresem.</p>

<h2>Jak dane zmieniają dynamikę negocjacji</h2>

<p>Anna bierze tę samą metodologię: wolumen z ERP, stała cena dostawcy, benchmark Should Cost. I liczy.</p>

<ul>
<li>Stała cena dostawcy: <strong>790 zł</strong> za jednostkę</li>
<li>Benchmark Should Cost w szczytowych miesiącach: 574-648 zł</li>
<li><strong>Skumulowana strata roczna: 191 701 zł (-18,1%)</strong></li>
<li>Największa nadpłata: sierpień-październik (peak wolumenu + najniższy koszt zasadny)</li>
</ul>

<p>Anna bierze tę tabelę na spotkanie nie po to, żeby "udowodnić winę", tylko żeby ustawić zasady gry:</p>

<p><em>"Przy stałej cenie 790 i kosztach zasadnych spadających do poziomów 574-648, rok zamknął się dla nas na -191 701 (-18,1%) - to jest fakt, nie interpretacja. Od lutego praktycznie każdy miesiąc jest poniżej ceny zakupu, więc potrzebujemy korekty i mechanizmu przeglądu, żeby cena reagowała, gdy benchmark spada - inaczej cały upside zostaje po stronie dostawcy."</em></p>

<blockquote>Informacja to amunicja. Dzięki Should Cost Anna nie musi już mówić "wydaje mi się, że przepłacamy". Ona ma policzone: -191 701 zł i -18,1%. To nie jest "negocjacyjny detal" - to twarda strata wynikająca z braku mechanizmu korekty.</blockquote>

<p>Oboje - Kamil i Anna - wychodzą z tych rozmów z tym samym efektem: nie jednorazowym "urwaniem", tylko dojrzalszym modelem współpracy. Indeksacja tylko części surowcowej, kwartalny przegląd, formuła cost-plus tam gdzie ma sens - tak aby cena oddychała rynkiem i nie zamieniała budżetu w ruletkę.</p>

<p>I właśnie tu widać strategiczną rolę Zakupów: nie chodzi o jednorazowe "urwanie", tylko o trwałe zarządzanie marżą i ryzykiem. Bo gdy konsumenci są na progu bólu, nie wygrywa ten, kto głośniej negocjuje. Wygrywa ten, kto ma fakty - a potem potrafi zamienić je w warunki, które działają przez cały rok.</p>

<p>Chcesz przejść podobną analizę dla swojej kategorii? Napisz bezpośrednio: <a href="mailto:tomasz.uscinski@profitia.pl">tomasz.uscinski@profitia.pl</a></p>
`.trim()

// ── Article 3 ────────────────────────────────────────────────────────────────
// Original: "Analiza finansowa Dostawców"
// Category: supplier-risk | Featured: false | Reading: 7 min

const ARTICLE_3_CONTENT = `
<h2>Analiza finansowa jako przewaga zakupowca</h2>

<p>W świecie zakupów, gdzie "taniej" już dawno przestało być jedyną miarą, kluczowe staje się pytanie: skąd wiemy, że nasz łańcuch dostaw jest bezpieczny? Odpowiedź nie leży w pojedynczych liczbach, ale w relacjach między nimi.</p>

<p>Słysząc zwroty "analiza finansowa", "sprawozdanie finansowe" czy "wskaźniki finansowe", wiele osób odczuwa natychmiastową niechęć i skojarzenia z Wall Street i nerwowymi maklerami. W rzeczywistości analiza finansowa opiera się na podstawach matematyki i logicznego wyciągania wniosków. I jest jednym z najpotężniejszych narzędzi, które kupiec może mieć w swoim arsenale.</p>

<blockquote>Analiza finansowa to nie formalność przed podpisaniem umowy. To najlepsze paliwo do negocjacji. Zamiast argumentu "chcemy taniej", możesz powiedzieć: "widzimy pole do optymalizacji" - i poprzeć to liczbami, których dostawca nie może podważyć.</blockquote>

<h2>Wskaźniki jako biznesowe badanie krwi</h2>

<p>Analiza wskaźnikowa to proces zestawiania ze sobą dwóch pozornie odrębnych liczb (np. zysku i przychodów, zapasów i sprzedaży), aby zobaczyć relację, jaka między nimi zachodzi. Wyobraź sobie to jako biznesowe badanie krwi: pojedynczy wynik może nic nie mówić, ale gdy zestawimy go z normą i innymi parametrami, natychmiast widzimy, czy dany dostawca jest w dobrej kondycji finansowej, czy może grozi mu zator płatniczy.</p>

<p>Dla działów zakupów to przejście od zgadywania do twardych faktów. Decyzje o wyborze strategicznego dostawcy przestają opierać się na intuicji, a zyskują solidny fundament w postaci danych o wypłacalności i rentowności.</p>

<h3>Co analiza wskaźnikowa pozwala ocenić</h3>

<ul>
<li>Stabilność finansowa i ryzyko nagłej utraty płynności przez dostawcę</li>
<li>Rentowność i "grubość" marży - czy jest przestrzeń negocjacyjna</li>
<li>Zależność dostawcy od naszego kontraktu - kto ma większą siłę przetargową</li>
<li>Ekspozycja na zadłużenie i zmiany stóp procentowych</li>
<li>Trend w czasie: czy dostawca rośnie, stagnuje czy traci pozycję</li>
</ul>

<h2>Skąd brać dane o dostawcach</h2>

<p>Choć finanse firm bywają owiane tajemnicą, mamy do dyspozycji kilka legalnych i ogólnodostępnych źródeł, które dają pełen wgląd w kondycję partnera.</p>

<h3>Repozytorium Dokumentów Finansowych (e-KRS)</h3>

<p>To absolutna podstawa w Polsce. Każda spółka z o.o. czy akcyjna ma obowiązek składać roczne sprawozdania finansowe (bilans oraz rachunek zysków i strat). Dane są oficjalne, podpisane przez zarząd i całkowicie bezpłatne. Kluczowa wskazówka: pobierz dane z pięciu ostatnich lat - tylko wtedy zobaczysz trend, a nie jednorazową fotografię.</p>

<h3>Wywiadownie gospodarcze</h3>

<p>Jeśli portfel dostawców liczy setki firm, nie ma czasu na ręczne pobieranie PDF-ów z KRS. Serwisy wywiadowni wykonują tę pracę automatycznie i dostarczają gotowy raport z wyliczonymi wskaźnikami i oceną scoringową (np. ryzyko upadłości w skali 1-100). Najlepsze rozwiązanie przy audytach masowych i monitoringu dostawców w czasie rzeczywistym.</p>

<h3>Bezpośrednie zapytanie (RFI)</h3>

<p>Nie bój się prosić o dane. W ramach procesu RFI możesz poprosić dostawcę o przesłanie aktualnego bilansu. Sprawdzasz przy okazji transparentność partnera: jeśli firma unika odpowiedzi lub twierdzi, że dane są "ściśle tajne" (mimo że są publiczne w KRS), to jest jasny sygnał ostrzegawczy.</p>

<blockquote>Dla mniejszych podmiotów, które nie publikują danych w KRS, bezpośrednie zapytanie jest często jedynym źródłem wiedzy o ich kondycji - i jednocześnie testem na otwartość partnerską. Transparentność finansowa to jeden z sygnałów dojrzałości relacji.</blockquote>

<h2>Dynamika przychodów: pięć lat zamiast jednego roku</h2>

<p>Analiza pojedynczego roku to tylko fotografia. Dopiero zestawienie przychodów z ostatnich 5 lat tworzy film, który pokazuje kondycję dostawcy w czasie.</p>

<p>Trend wzrostowy wskazuje, że dostawca rośnie na rynku - co daje szansę na negocjowanie rabatów w zamian za długoterminowy kontrakt. Trend malejący sygnalizuje presję finansową i możliwą elastyczność cenową.</p>

<p>Istotna jest też odpowiedź na pytanie: jaki udział stanowią nasze obroty w przychodach dostawcy? Jeżeli jest to powyżej 20%, mamy silną pozycję negocjacyjną - nasz partner będzie walczył o utrzymanie kontraktu. Stanowimy dla niego klienta strategicznego. Na drugim biegunie są podmioty, dla których jesteśmy marginalnym udziałem - trudno będzie poprawić warunki, bo skupią się na ważniejszych klientach.</p>

<h2>Marża EBITDA i rentowność sprzedaży</h2>

<p>EBITDA (zysk przed odsetkami, podatkami i amortyzacją) to jeden z najważniejszych wskaźników, ponieważ pokazuje zdolność operacyjną dostawcy do generowania gotówki z jego podstawowej działalności. Oczyszcza wynik z decyzji księgowych i podatkowych - pokazuje gołą efektywność produkcji lub usług.</p>

<h3>Rentowność sprzedaży (ROS): "Ile oni na nas zarabiają?"</h3>

<p>Wskaźnik ROS mówi, ile groszy czystego zysku zostaje w kieszeni dostawcy z każdej złotówki przychodu. Jeśli rentowność dostawcy znacznie przewyższa średnią rynkową, masz czarno na białym, że marża jest wysoka jak na dany sektor.</p>

<blockquote>Wysoka rentowność sprzedaży to idealny punkt wyjścia do rozmów o obniżce ceny jednostkowej lub dodatkowych usługach w ramach obecnej ceny. Nie musisz zgadywać, czy "jest pole" - wskaźnik mówi wprost.</blockquote>

<h2>Płynność i zadłużenie jako dźwignie negocjacyjne</h2>

<h3>Płynność bieżąca (Current Ratio): "Jak bardzo potrzebują gotówki?"</h3>

<p>Wskaźnik płynności bieżącej pokazuje zdolność firmy do spłaty bieżących zobowiązań. Są dwa kluczowe scenariusze:</p>

<ul>
<li><strong>Niska płynność (poniżej 1,2):</strong> "zadyszka" finansowa. Szansa na wynegocjowanie dużego rabatu w zamian za skrócenie terminu płatności. Dla firmy walczącej o gotówkę, szybka wpłata jest warta więcej niż jakakolwiek oferta w przetargu.</li>
<li><strong>Wysoka płynność (powyżej 2,0):</strong> firma "śpi na gotówce". Tu agresywnie walczymy o wydłużone terminy płatności (90 dni), co poprawi własny cash-flow bez ryzyka dla stabilności dostawcy.</li>
</ul>

<h3>Wskaźnik zadłużenia: "Kto tu naprawdę rządzi?"</h3>

<p>Wskaźnik zadłużenia informuje, w jakim stopniu majątek dostawcy jest sfinansowany z kredytów. Jeśli dostawca jest mocno zadłużony, a stopy procentowe rosną, jego koszty operacyjne gwałtownie idą w górę.</p>

<p>W takiej sytuacji możesz negocjować kontrakt długoterminowy z gwarancją wolumenu. Dla banku dostawcy taki kontrakt to zabezpieczenie kredytowe - a Ty stajesz się dla niego partnerem strategicznym, który stabilizuje jego biznes. Obopólna korzyść jest tu bardzo wyraźna.</p>

<blockquote>Kontrakt długoterminowy z gwarancją wolumenu to jeden z rzadkich przypadków, gdzie interesy kupca i dostawcy są w pełni zbieżne. Dla dostawcy to tańszy kredyt i stabilność. Dla kupca to lepsza cena i bezpieczeństwo łańcucha dostaw.</blockquote>

<h2>Od tabelki w Excelu do strategii zakupowej</h2>

<p>Analiza wskaźnikowa to coś więcej niż wypełnianie tabelek. To fundament nowoczesnego zarządzania zakupami. W czasach rynkowej niepewności i rwących się łańcuchów dostaw, umiejętność czytania bilansów staje się jedną z kluczowych kompetencji kupca strategicznego.</p>

<p>Liczby są najlepszym argumentem negocjacyjnym. Pozwalają przejść z pozycji "proszącego o rabat" na pozycję partnera, który rozumie realia biznesowe i potrafi dopasować warunki kontraktu tak, by obie strony czerpały z niego korzyści.</p>

<p>Wprowadzenie regularnej analityki finansowej do procesów zakupowych to inwestycja w bezpieczeństwo łańcucha dostaw. Dzięki niej nie tylko uzyskujemy oszczędności - przede wszystkim budujemy portfel dostawców, na których można polegać, gdy rynek zaczyna skrzypieć.</p>

<blockquote>Nie wybieramy dostawców wyłącznie po cenie. Wybieramy ich po zdolności do dostarczenia wartości przez cały cykl kontraktu - a to wymaga wiedzy, nie tylko intuicji.</blockquote>

<p>Chcesz porozmawiać o tym, jak włączyć analizę finansową dostawców do swojego procesu zakupowego? Napisz bezpośrednio: <a href="mailto:tomasz.uscinski@profitia.pl">tomasz.uscinski@profitia.pl</a></p>
`.trim()

// ── Seed function ────────────────────────────────────────────────────────────

async function main() {
  console.log('Starting editorial content migration...\n')

  // Article 1: "Cena to opinia. Koszt to fakt."
  const a1 = await prisma.article.upsert({
    where: { slug: SLUG_1 },
    create: {
      slug: SLUG_1,
      title: 'Cena to opinia. Koszt to fakt.',
      subtitle:
        'Jak koszt zasadny zmienia układ sił przy stole negocjacyjnym - i dlaczego nowoczesne Zakupy muszą przestać mówić o cenie.',
      excerpt:
        'Przestań negocjować cenę. Zacznij zarządzać kosztem zasadnym. Metodologia Should Cost, analiza historyczna i kontrakty indeksowe jako fundament nowoczesnych zakupów.',
      content: ARTICLE_1_CONTENT,
      published: true,
      publishedAt: new Date('2025-09-15T08:00:00Z'),
      category: 'cost-intelligence',
      readingTime: 9,
      featured: true,
      coverImage:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80',
      relatedSlugs: [SLUG_2, SLUG_3],
      metaTitle: 'Cena to opinia. Koszt to fakt. | Profitia Intelligence',
      metaDescription:
        'Jak metodologia Should Cost zmienia pozycję negocjacyjną kupca. Przestań mówić o cenie - zacznij mówić o koszcie zasadnym i wygrywaj negocjacje danymi.',
      ...AUTHOR_TOMASZ,
    },
    update: {
      title: 'Cena to opinia. Koszt to fakt.',
      subtitle:
        'Jak koszt zasadny zmienia układ sił przy stole negocjacyjnym - i dlaczego nowoczesne Zakupy muszą przestać mówić o cenie.',
      excerpt:
        'Przestań negocjować cenę. Zacznij zarządzać kosztem zasadnym. Metodologia Should Cost, analiza historyczna i kontrakty indeksowe jako fundament nowoczesnych zakupów.',
      content: ARTICLE_1_CONTENT,
      published: true,
      publishedAt: new Date('2025-09-15T08:00:00Z'),
      category: 'cost-intelligence',
      readingTime: 9,
      featured: true,
      coverImage:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80',
      relatedSlugs: [SLUG_2, SLUG_3],
      metaTitle: 'Cena to opinia. Koszt to fakt. | Profitia Intelligence',
      metaDescription:
        'Jak metodologia Should Cost zmienia pozycję negocjacyjną kupca. Przestań mówić o cenie - zacznij mówić o koszcie zasadnym i wygrywaj negocjacje danymi.',
      ...AUTHOR_TOMASZ,
    },
  })
  console.log(`✓ Article 1 upserted: "${a1.title}" (id: ${a1.id})`)

  // Article 2: "Dzień z życia kupca"
  const a2 = await prisma.article.upsert({
    where: { slug: SLUG_2 },
    create: {
      slug: SLUG_2,
      title: 'Dzień z życia kupca: kiedy stała cena przegrywa z faktami',
      subtitle:
        'Dwoje kupców, dwie branże, jedna metodologia. Jak Should Cost zamienia "wydaje mi się" w 304 216 zł twardych liczb.',
      excerpt:
        'Kamil i Anna zarządzają zupełnie różnymi kategoriami - tacki plastikowe i ramy stalowe. Ale oboje odkrywają to samo: stała cena może być nie bezpieczeństwem, lecz ryzykiem. Historia jednego dnia i konkretnych liczb.',
      content: ARTICLE_2_CONTENT,
      published: true,
      publishedAt: new Date('2025-10-20T08:00:00Z'),
      category: 'cost-intelligence',
      readingTime: 11,
      featured: false,
      coverImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80',
      relatedSlugs: [SLUG_1, SLUG_3],
      metaTitle: 'Dzień z życia kupca: kiedy stała cena przegrywa z faktami | Profitia',
      metaDescription:
        'Jak Should Cost ujawnia 304 216 zł ukrytych strat w kategorii tacek plastikowych i 191 701 zł w ramach stalowych. Dwie branże, jedna metodologia.',
      ...AUTHOR_TOMASZ,
    },
    update: {
      title: 'Dzień z życia kupca: kiedy stała cena przegrywa z faktami',
      subtitle:
        'Dwoje kupców, dwie branże, jedna metodologia. Jak Should Cost zamienia "wydaje mi się" w 304 216 zł twardych liczb.',
      excerpt:
        'Kamil i Anna zarządzają zupełnie różnymi kategoriami - tacki plastikowe i ramy stalowe. Ale oboje odkrywają to samo: stała cena może być nie bezpieczeństwem, lecz ryzykiem. Historia jednego dnia i konkretnych liczb.',
      content: ARTICLE_2_CONTENT,
      published: true,
      publishedAt: new Date('2025-10-20T08:00:00Z'),
      category: 'cost-intelligence',
      readingTime: 11,
      featured: false,
      coverImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80',
      relatedSlugs: [SLUG_1, SLUG_3],
      metaTitle: 'Dzień z życia kupca: kiedy stała cena przegrywa z faktami | Profitia',
      metaDescription:
        'Jak Should Cost ujawnia 304 216 zł ukrytych strat w kategorii tacek plastikowych i 191 701 zł w ramach stalowych. Dwie branże, jedna metodologia.',
      ...AUTHOR_TOMASZ,
    },
  })
  console.log(`✓ Article 2 upserted: "${a2.title}" (id: ${a2.id})`)

  // Article 3: "Analiza finansowa dostawców"
  const a3 = await prisma.article.upsert({
    where: { slug: SLUG_3 },
    create: {
      slug: SLUG_3,
      title: 'Analiza finansowa dostawców',
      subtitle:
        'Jak czytać bilanse i zamieniać liczby w przewagę negocjacyjną - bez wiedzy biegłego rewidenta.',
      excerpt:
        'Wskaźniki finansowe to najpotężniejsze paliwo negocjacyjne, o którym większość kupców nie myśli. Skąd brać dane, jak je interpretować i jak EBITDA, płynność i zadłużenie zmieniają pozycję przy stole.',
      content: ARTICLE_3_CONTENT,
      published: true,
      publishedAt: new Date('2025-11-10T08:00:00Z'),
      category: 'supplier-risk',
      readingTime: 7,
      featured: false,
      coverImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80',
      relatedSlugs: [SLUG_1, SLUG_2],
      metaTitle: 'Analiza finansowa dostawców | Profitia Intelligence',
      metaDescription:
        'Jak czytać bilanse dostawców i zamieniać wskaźniki finansowe w argumenty negocjacyjne. Płynność, EBITDA, zadłużenie - kompletny przewodnik dla kupca.',
      ...AUTHOR_RAFAL,
    },
    update: {
      title: 'Analiza finansowa dostawców',
      subtitle:
        'Jak czytać bilanse i zamieniać liczby w przewagę negocjacyjną - bez wiedzy biegłego rewidenta.',
      excerpt:
        'Wskaźniki finansowe to najpotężniejsze paliwo negocjacyjne, o którym większość kupców nie myśli. Skąd brać dane, jak je interpretować i jak EBITDA, płynność i zadłużenie zmieniają pozycję przy stole.',
      content: ARTICLE_3_CONTENT,
      published: true,
      publishedAt: new Date('2025-11-10T08:00:00Z'),
      category: 'supplier-risk',
      readingTime: 7,
      featured: false,
      coverImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80',
      relatedSlugs: [SLUG_1, SLUG_2],
      metaTitle: 'Analiza finansowa dostawców | Profitia Intelligence',
      metaDescription:
        'Jak czytać bilanse dostawców i zamieniać wskaźniki finansowe w argumenty negocjacyjne. Płynność, EBITDA, zadłużenie - kompletny przewodnik dla kupca.',
      ...AUTHOR_RAFAL,
    },
  })
  console.log(`✓ Article 3 upserted: "${a3.title}" (id: ${a3.id})\n`)

  console.log('Migration complete. 3 articles live in the editorial system.')
  console.log(`\nContent model summary:`)
  console.log(`  Article 1: category=cost-intelligence, featured=true,  reading=9 min`)
  console.log(`  Article 2: category=cost-intelligence, featured=false, reading=11 min`)
  console.log(`  Article 3: category=supplier-risk,    featured=false, reading=7 min`)
  console.log(`\nAll articles linked to each other via relatedSlugs.`)
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
