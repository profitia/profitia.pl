import type { Locale } from '@/lib/capabilities'
import { PUBLIC_HERO_ASSETS } from '@/lib/presentation/public-hero-assets'
import type { CatalogDomain } from './catalogTypes'
import type { DiagnosisCaseStudyContent } from '@/components/sections/case-study/DiagnosisCaseStudySections'

export type DigitalServicesPageContent = {
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    imageSrc: string
    imageAlt: string
  }
  seo: {
    title: string
    description: string
  }
  domains: CatalogDomain[]
  caseStudy?: DiagnosisCaseStudyContent
}

export type DigitalServiceId =
  | 'digital-consulting'
  | 'spend-analytics'
  | 'custom-applications'
  | 'ai-agents'

const DIGITAL_SERVICES_CATALOG: Record<Locale, Record<DigitalServiceId, DigitalServicesPageContent>> = {
  pl: {
    'digital-consulting': {
      hero: {
        eyebrow: 'Usługi Digital · Digital Consulting',
        title: 'Technologia zakupowa dopasowana do Twojej organizacji',
        subtitle: 'Oceniamy dojrzałość organizacji w zakresie automatyzacji procesów zakupowych, projektujemy docelowy stack technologiczny oraz wspieramy wybór dostawców, wdrożenie i zarządzanie zmianą.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalConsulting,
        imageAlt: 'Digital Consulting Profitia',
      },
      seo: {
        title: 'Digital Consulting | Profitia',
        description: 'Oceniamy dojrzałość cyfrową zakupów, projektujemy docelowy stack technologiczny i wspieramy wybór oraz wdrożenie narzędzi.',
      },
      domains: [
        {
          id: 'doradca-technologiczny',
          title: 'Doradca technologiczny',
          products: [
            {
              id: 'przeglad',
              title: 'Przegląd',
              description: [
                'Analiza wsparcia technologicznego procesów zakupowych',
                'Ocena poziomu automatyzacji',
                'Analiza wykorzystania funkcjonalności narzędzi',
                'Weryfikacja rozwiązań pod kątem specyfiki organizacji',
                'Ocena zgodności z najlepszymi praktykami',
              ],
            },
            {
              id: 'strategie',
              title: 'Strategie',
              description: [
                'Projekt docelowego stacku technologicznego',
                'Rekomendacje w zakresie rozbudowy, wymiany lub usunięcia wykorzystywanych narzędzi',
                'Dobór architektury do skali i dojrzałości organizacji',
                'Lista docelowych funkcjonalności zwiększających automatyzację',
                'Zdefiniowanie KPI',
                'Przygotowanie i przeprowadzenie analiz rynku',
              ],
            },
            {
              id: 'wdrozenie',
              title: 'Wdrożenie',
              description: [
                'Przeprowadzenie RFP na wybór dostawcy narzędzi',
                'Prowadzenie dialogów technicznych',
                'Monitoring prac wdrożeniowych i odpowiedzialność za harmonogram',
                'Przeprowadzanie testów narzędzi',
                'Zarządzanie zmianą w organizacji',
              ],
            },
          ],
        },
      ],
      caseStudy: {
        startingPoint: {
          eyebrow: 'Punkt wyjścia',
          title: 'Rosnąca organizacja potrzebowała uporządkować zakupy i przygotować je do dalszej skali',
          paragraphs: [
            'Dynamicznie rozwijająca się organizacja wchodziła na rynki zagraniczne, a dedykowany dział zakupów został w niej powołany dopiero niedawno. Szybka ekspansja stworzyła silną presję na automatyzację oraz uporządkowanie procesów w całej firmie.',
            'Organizacja potrzebowała przejść od działań opartych na komunikacji mailowej do spójnego środowiska narzędziowego, które zapewni przejrzystość procesów i będzie gotowe na dalszy wzrost.',
          ],
          signals: [
            'Brak narzędzi systemowych - działania zakupowe opierały się wyłącznie na komunikacji mailowej',
            'Brak przejrzystości - organizacja nie miała pełnego obrazu obszaru zakupowego ani kontroli nad procesami',
            'Niski poziom wiedzy technologicznej - ograniczona znajomość rynkowych rozwiązań IT dla zakupów',
            'Wsparcie od zera - potrzeba ustrukturyzowania całego obszaru zakupowego w odpowiedzi na rosnącą skalę biznesu',
          ],
        },
        scope: {
          eyebrow: 'Zakres diagnozy',
          title: 'Od diagnozy potrzeb do wyboru platformy zakupowej',
          intro: 'Celem projektu było przeprowadzenie Klienta przez pełny proces wyboru optymalnej platformy zakupowej oraz automatyzacja procesów Source-to-Contract (S2C). Projekt został zrealizowany w pięciu głównych etapach:',
          areas: [
            {
              title: 'Diagnoza potrzeb',
              description: 'Szczegółowa analiza i zmapowanie wymagań funkcjonalnych w obszarze narzędziowym.',
            },
            {
              title: 'Opracowanie drzewa zakupowego',
              description: 'Stworzenie spójnej struktury kategorii zakupowych na trzech poziomach.',
            },
            {
              title: 'Analiza i dopasowanie funkcjonalności',
              description: 'Weryfikacja rozwiązań pod kątem skali, profilu działalności, procedur Klienta oraz możliwości integracji z istniejącą infrastrukturą IT.',
            },
            {
              title: 'RFP i dialog techniczny',
              description: 'Przeprowadzenie zapytania ofertowego połączonego z dialogiem technicznym oraz negocjacjami cenowymi z dostawcami IT.',
            },
            {
              title: 'Wybór dostawcy',
              description: 'Wyłonienie partnera technologicznego oraz ustalenie ścieżki i kolejności wdrażania modułów.',
            },
          ],
        },
        result: {
          eyebrow: 'Rezultat',
          title: 'Od procesów manualnych do skalowalnego środowiska S2C',
          items: [
            'Dopasowanie do potrzeb i skali - wybrano dostawcę oraz zestaw funkcjonalności odpowiadający specyfice i rzeczywistym potrzebom Klienta, bez ponoszenia kosztów zbędnych modułów.',
            'Terminowość i sprawny start - precyzyjny harmonogram oraz właściwa kolejność wdrażania modułów umożliwiły szybkie uruchomienie narzędzia i terminową realizację projektu.',
            'Automatyzacja i cyfryzacja - rozproszoną komunikację e-mail zastąpiono spójnym, cyfrowym procesem S2C w całej organizacji.',
            'Skalowalność - powstał stabilny fundament narzędziowy i procesowy, gotowy na dalszą dynamiczną ekspansję zagraniczną firmy.',
          ],
          highlight: 'Projekt umożliwił organizacji sprawne przejście od procesów manualnych do nowoczesnego, zautomatyzowanego środowiska zakupowego S2C.',
        },
      },
    },
    'spend-analytics': {
      hero: {
        eyebrow: 'Usługi Digital · Spend Analytics',
        title: 'Przejrzystość wydatków, która prowadzi do lepszych decyzji',
        subtitle: 'Porządkujemy dane zakupowe i tail spend, usprawniamy zarządzanie kluczowymi kategoriami oraz identyfikujemy realny potencjał oszczędności.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalSpendAnalytics,
        imageAlt: 'Spend Analytics Profitia',
      },
      seo: {
        title: 'Spend Analytics | Profitia',
        description: 'Porządkujemy dane zakupowe, budujemy dopasowany Spend Cube i identyfikujemy potencjał oszczędności w kluczowych kategoriach oraz tail spend.',
      },
      domains: [
        {
          id: 'spend-analytics',
          title: 'Spend Analytics',
          products: [
            {
              id: 'spend-cube',
              title: 'Spend Cube',
              description: [
                'Czyszczenie danych dotyczących pozycji zakupowych i bazy dostawców',
                'Opracowanie drzewa kategorii dopasowanego do profilu działalności',
                'Dostosowanie widoku Spend Cube i docelowych funkcjonalności',
                'Pełny obraz skali wydatków',
                'Integracja z wewnętrznymi źródłami danych i automatyczne odświeżanie Spend Cube',
              ],
            },
          ],
        },
      ],
      caseStudy: {
        startingPoint: {
          eyebrow: 'Punkt wyjścia',
          title: 'Rozproszone dane nie dawały Grupie pełnego obrazu wydatków',
          paragraphs: [
            'Grupa Kapitałowa składająca się z ponad 10 spółek zależnych mierzyła się z mocno rozproszonymi i niespójnymi danymi zakupowymi.',
            'Poszczególne podmioty korzystały z różnych systemów źródłowych i nie miały jednolitej struktury danych. W efekcie kadra zarządzająca nie dysponowała pełnym obrazem całkowitych wydatków Grupy.',
          ],
          signals: [
            'Ponad 10 spółek zależnych pracujących na rozproszonych danych zakupowych',
            'Różne systemy ERP wykorzystywane przez poszczególne podmioty',
            'Brak jednolitej struktury, terminologii i klasyfikacji wydatków',
            'Brak pełnego wglądu w całkowite wydatki całej Grupy Kapitałowej',
          ],
        },
        scope: {
          eyebrow: 'Zakres diagnozy',
          title: 'Od konsolidacji danych do jednolitego Spend Cube',
          intro: 'Celem projektu było uporządkowanie historycznych wydatków zakupowych oraz stworzenie scentralizowanego narzędzia wspierającego decyzje zakupowe w całej organizacji. Prace objęły cztery główne obszary:',
          areas: [
            {
              title: 'Konsolidacja baz danych',
              description: 'Połączenie informacji pochodzących z wielu niezależnych systemów ERP w jeden spójny zbiór danych.',
            },
            {
              title: 'Oczyszczenie i standaryzacja danych',
              description: 'Usunięcie duplikatów, korekta błędnych wartości oraz ujednolicenie indeksów i nazw dostawców.',
            },
            {
              title: 'Budowa drzewa kategorii',
              description: 'Opracowanie spójnego, trzystopniowego drzewa kategorii zakupowych obowiązującego w całej Grupie Kapitałowej.',
            },
            {
              title: 'Wdrożenie Spend Cube',
              description: 'Budowa Spend Cube z zaawansowanymi wymiarami, takimi jak terminy płatności oraz podział wydatków na CAPEX i OPEX.',
            },
          ],
        },
        result: {
          eyebrow: 'Rezultat',
          title: 'Jedno źródło danych dla decyzji zakupowych całej Grupy',
          items: [
            'Pełna przejrzystość wydatków - zidentyfikowano rozproszony tail spend oraz obszary nieefektywności w wydatkach nieprodukcyjnych.',
            'Identyfikacja potencjału oszczędnościowego - różnice w cenach i umowach pomiędzy spółkami wskazały obszary do natychmiastowej standaryzacji i renegocjacji.',
            'Synergia i efekt skali - przygotowano rekomendacje dotyczące budowy umów centralnych, pozwalające wykorzystać siłę zakupową całej Grupy.',
            'Spójność procesowa - ujednolicono terminologię oraz klasyfikację wydatków we wszystkich podmiotach zależnych.',
          ],
          highlight: 'Spend Cube zapewnił Grupie Kapitałowej wspólny, wiarygodny obraz wydatków i podstawę do podejmowania decyzji zakupowych w skali całej organizacji.',
        },
      },
    },
    'custom-applications': {
      hero: {
        eyebrow: 'Usługi Digital · Dedykowane aplikacje',
        title: 'Aplikacje stworzone wokół Twoich procesów',
        subtitle: 'Projektujemy i wdrażamy dedykowane aplikacje dopasowane do istniejących procesów i procedur, aby zwiększyć automatyzację zakupów i zarządzania łańcuchem dostaw.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalCustomApplications,
        imageAlt: 'Dedykowane aplikacje zakupowe Profitia',
      },
      seo: {
        title: 'Dedykowane aplikacje dla zakupów | Profitia',
        description: 'Projektujemy i wdrażamy aplikacje dopasowane do procesów zakupowych i zarządzania łańcuchem dostaw.',
      },
      domains: [
        {
          id: 'dedykowane-aplikacje',
          title: 'Dedykowane aplikacje',
          products: [
            {
              id: 'aplikacje',
              title: 'Aplikacje',
              description: [
                'Warsztaty z biznesem oraz mapowanie procedur i procesów',
                'Identyfikacja obszarów do automatyzacji lub integracji',
                'Rekomendacje dotyczące aplikacji i funkcjonalności wraz z szacowanymi korzyściami dla organizacji',
                'Opracowanie i wdrożenie aplikacji',
                'Szkolenie użytkowników i administratorów narzędzia',
              ],
            },
          ],
        },
      ],
      caseStudy: {
        startingPoint: {
          eyebrow: 'Punkt wyjścia',
          title: 'Gdy standardowy system nie odpowiada na lokalne potrzeby organizacji',
          paragraphs: [
            'Standardowe platformy zakupowe klasy Enterprise, takie jak ERP, P2P i S2C, dobrze obsługują powtarzalne, globalne procesy. Nie zawsze jednak odpowiadają na specyficzne, lokalne wyzwania organizacji.',
            'Kosztowne i czasochłonne dostosowania gotowych systemów pozostawiają luki w ekosystemie IT. W tych miejscach procesy nadal opierają się na arkuszach Excel, wiadomościach e-mail i papierowych formularzach.',
          ],
          signals: [
            'Procesy rozproszone pomiędzy arkusze Excel, e-maile i formularze papierowe',
            'Gotowe platformy wymagające kosztownych i czasochłonnych dostosowań',
            'Konieczność dopasowywania organizacji do sztywnej logiki standardowego systemu',
            'Koszty licencji obejmujące rozbudowane moduły, z których zespół nie korzysta',
          ],
        },
        scope: {
          eyebrow: 'Zakres diagnozy',
          title: 'Od odkrycia potrzeby do skalowalnej aplikacji',
          intro: 'Dedykowana aplikacja powstaje wokół rzeczywistego procesu i jest rozwijana etapami - od zdefiniowania celu, przez działający prototyp, po bezpieczne uruchomienie produkcyjne.',
          areas: [
            {
              title: 'Discovery',
              description: 'Analiza potrzeb, mapowanie procesu i zdefiniowanie celu biznesowego aplikacji.',
            },
            {
              title: 'Prototyp UX',
              description: 'Przygotowanie makiet interfejsu i ich testowanie bezpośrednio z zespołem zakupowym.',
            },
            {
              title: 'Wdrożenie MVP',
              description: 'Dostarczenie w pełni funkcjonalnej wersji aplikacji gotowej do testów w ciągu kilku tygodni.',
            },
            {
              title: 'Integracja IT',
              description: 'Bezpieczne połączenie z systemami ERP, bazami danych oraz firmowym logowaniem SSO.',
            },
            {
              title: 'Skalowanie',
              description: 'Uruchomienie produkcyjne, szkolenie użytkowników oraz dalszy rozwój aplikacji o nowe moduły.',
            },
          ],
        },
        result: {
          eyebrow: 'Rezultat',
          title: 'Rozwiązanie dopasowane do procesu, gotowe w kilka tygodni',
          items: [
            'Wypełnienie luk w ekosystemie IT - rozproszone działania zostają połączone w jeden spójny proces cyfrowy.',
            'Krótki czas wdrożenia - funkcjonalny prototyp MVP rozwiązuje palący problem biznesowy bez wielomiesięcznego projektu korporacyjnego.',
            'Pełne dopasowanie do procedur - aplikacja odwzorowuje specyfikę organizacji bez wymuszania zmiany procesu pod logikę gotowego oprogramowania.',
            'Optymalizacja kosztów licencyjnych - organizacja płaci za funkcjonalności, których rzeczywiście potrzebuje, bez zbędnych modułów.',
          ],
          highlight: 'Dedykowana aplikacja zamienia lokalną lukę procesową w bezpieczne, zintegrowane i skalowalne rozwiązanie cyfrowe.',
        },
      },
    },
    'ai-agents': {
      hero: {
        eyebrow: 'Usługi Digital · Agenci AI',
        title: 'Agenci AI stworzeni do codziennej pracy zakupów',
        subtitle: 'Projektujemy spersonalizowanych agentów wspierających bieżącą pracę działu zakupów, podejmowanie decyzji i sprawniejszą realizację procesów.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalAiAgents,
        imageAlt: 'Agenci AI dla zakupów',
      },
      seo: {
        title: 'Agenci AI dla zakupów | Profitia',
        description: 'Projektujemy i wdrażamy spersonalizowanych agentów AI, którzy wspierają decyzje i codzienną pracę działów zakupów.',
      },
      domains: [
        {
          id: 'agenci-ai',
          title: 'Agenci AI',
          products: [
            {
              id: 'agenci',
              title: 'Agenci',
              description: [
                'Warsztaty z kluczowymi interesariuszami',
                'Identyfikacja obszarów procesu, które mogą być wspierane przez agentów AI',
                'Opracowanie dedykowanych agentów i wdrożenie ich w organizacji',
                'Zabezpieczenie infrastruktury przed wyciekiem danych',
                'Szkolenie z pracy z agentami i ich wykorzystania w codziennych zadaniach',
              ],
            },
          ],
        },
      ],
      caseStudy: {
        startingPoint: {
          eyebrow: 'Punkt wyjścia',
          title: 'Dedykowani Agenci AI zamiast kolejnego ogólnego chatbota',
          paragraphs: [
            'Nie wdrażamy powtarzalnych chatbotów. Tworzymy wyspecjalizowane cyfrowe mikro-role, które przejmują najbardziej czasochłonne, analityczne i żmudne zadania w zespole zakupowym.',
            'Agent działa w kontekście organizacji: wykorzystuje jej procedury, szablony, historię zakupów i umowy, a jego logika jest ograniczona do zweryfikowanej firmowej bazy wiedzy.',
          ],
          signals: [
            'RFP & Spec Agent przekształca wymagania biznesu w dokumentację RFP/RFI, specyfikacje techniczne i matryce oceny ofert',
            'Contract Review Agent analizuje projekty umów, wykrywa ryzykowne klauzule i porównuje zapisy z firmowym wzorcem',
            'Wiedza i kontekst pochodzą z procedur, szablonów, historii zakupów i umów organizacji dzięki architekturze RAG',
            'Dane pozostają w prywatnym środowisku korporacyjnym, na przykład Azure lub AWS, i nie uczą modeli zewnętrznych',
            'Agent wykonuje zadania: generuje pliki Excel, przygotowuje projekty e-maili i łączy się z ERP oraz API',
            'Guardrails ograniczają logikę do zweryfikowanej bazy wiedzy firmy i minimalizują ryzyko halucynacji',
          ],
        },
        scope: {
          eyebrow: 'Zakres diagnozy',
          title: 'Pięć kroków do inteligentnej automatyzacji zakupów',
          intro: 'Wdrożenie Agenta AI zaczyna się od wyboru właściwego procesu, a kończy kontrolowanym uruchomieniem, szkoleniem zespołu i skalowaniem rozwiązania.',
          areas: [
            {
              title: 'Diagnoza i wybór procesów',
              description: 'Analiza codziennych zadań kupców i wybór jednego lub dwóch procesów o najwyższym potencjale szybkiego zwrotu z inwestycji.',
            },
            {
              title: 'Przygotowanie bazy wiedzy',
              description: 'Bezpieczne podłączenie procedur zakupowych, wzorców umów, szablonów zapytań i słowników kategorii.',
            },
            {
              title: 'Konfiguracja i kalibracja logiki',
              description: 'Dostosowanie języka, terminologii i kryteriów decyzyjnych Agenta do branży, wymogów compliance i zasad organizacji.',
            },
            {
              title: 'Testy i bezpieczeństwo',
              description: 'Weryfikacja odpowiedzi w bezpiecznym środowisku testowym z zachowaniem kontroli człowieka w modelu Human-in-the-Loop.',
            },
            {
              title: 'Wdrożenie i skalowanie',
              description: 'Uruchomienie produkcyjne, szkolenie zespołu z efektywnej współpracy z AI oraz stopniowe dodawanie kolejnych modułów.',
            },
          ],
        },
        result: {
          eyebrow: 'Rezultat',
          title: 'Bezpieczna automatyzacja, która odciąża zespół zakupowy',
          items: [
            'Szybsze procesy i oszczędność czasu dzięki przejęciu powtarzalnych zadań analitycznych i dokumentacyjnych.',
            'Lepsze decyzje i niższe koszty dzięki pracy na uporządkowanej, firmowej bazie wiedzy.',
            'Bezpieczeństwo danych i zgodność z wymaganiami organizacji dzięki prywatnemu środowisku i kontroli Human-in-the-Loop.',
            'Większa satysfakcja zespołu kupców, który może koncentrować się na zadaniach wymagających oceny i relacji biznesowych.',
            'Skalowalna przewaga konkurencyjna dzięki stopniowemu rozwijaniu kolejnych wyspecjalizowanych Agentów AI.',
          ],
          highlight: 'Agent AI nie zastępuje decyzji kupca - przygotowuje rekomendacje i wykonuje zadania, pozostawiając człowiekowi kontrolę nad ostatecznym wyborem.',
        },
      },
    },
  },
  en: {
    'digital-consulting': {
      hero: {
        eyebrow: 'Digital Services · Digital Consulting',
        title: 'Procurement technology designed around your organisation',
        subtitle: 'We assess your organisation’s procurement automation maturity, define the target technology stack, and support supplier selection, implementation and change management.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalConsulting,
        imageAlt: 'Profitia Digital Consulting',
      },
      seo: {
        title: 'Digital Consulting | Profitia',
        description: 'We assess procurement digital maturity, define the target technology stack, and support technology selection and implementation.',
      },
      domains: [
        {
          id: 'technology-advisory',
          title: 'Technology Advisory',
          products: [
            {
              id: 'review',
              title: 'Review',
              description: [
                'Analysis of technology support across procurement processes',
                'Assessment of the current level of automation',
                'Review of how existing tool capabilities are used',
                'Evaluation of solutions against the organisation’s specific requirements',
                'Assessment against leading practices',
              ],
            },
            {
              id: 'strategy',
              title: 'Strategy',
              description: [
                'Design of the target technology stack',
                'Recommendations to expand, replace or retire existing tools',
                'Architecture aligned with the organisation’s scale and maturity',
                'Definition of target capabilities that increase automation',
                'Definition of KPIs',
                'Preparation and delivery of market analyses',
              ],
            },
            {
              id: 'implementation',
              title: 'Implementation',
              description: [
                'Management of an RFP process to select technology providers',
                'Management of technical dialogues with potential providers',
                'Monitoring implementation work and accountability for the delivery schedule',
                'Testing of selected tools',
                'Organisational change management',
              ],
            },
          ],
        },
      ],
      caseStudy: {
        startingPoint: {
          eyebrow: 'Starting point',
          title: 'A growing organisation needed to structure procurement and prepare it to scale',
          paragraphs: [
            'A fast-growing organisation was expanding into international markets, having only recently established a dedicated procurement function. Rapid expansion created significant pressure to automate and structure processes across the business.',
            'The organisation needed to move from email-based procurement activities to a coherent technology environment that would provide process transparency and support further growth.',
          ],
          signals: [
            'No system support - procurement activities relied entirely on email communication',
            'Limited transparency - the organisation lacked a complete view of procurement and control over its processes',
            'Limited technology knowledge - there was little familiarity with procurement-specific IT solutions available on the market',
            'Building from scratch - the procurement function needed to be structured in response to the growing scale of the business',
          ],
        },
        scope: {
          eyebrow: 'Assessment scope',
          title: 'From needs assessment to procurement platform selection',
          intro: 'The project was designed to guide the client through the complete process of selecting the right procurement platform and automating Source-to-Contract (S2C) processes. The work was delivered in five main stages:',
          areas: [
            {
              title: 'Needs assessment',
              description: 'A detailed analysis and mapping of functional requirements for the technology environment.',
            },
            {
              title: 'Procurement taxonomy design',
              description: 'Development of a coherent three-level procurement category structure.',
            },
            {
              title: 'Solution and functionality fit assessment',
              description: 'Evaluation of solutions against the client’s scale, business profile, procedures and integration requirements for the existing IT infrastructure.',
            },
            {
              title: 'RFP and technical dialogue',
              description: 'Delivery of an RFP process combined with technical dialogue and commercial negotiations with technology providers.',
            },
            {
              title: 'Provider selection',
              description: 'Selection of the technology partner and definition of the implementation path and module sequence.',
            },
          ],
        },
        result: {
          eyebrow: 'Outcome',
          title: 'From manual processes to a scalable S2C environment',
          items: [
            'Fit to needs and scale - the selected provider and functionality set matched the client’s specific requirements without the cost of unnecessary modules.',
            'On-time delivery and an efficient start - a precise schedule and the right module sequence enabled a rapid launch and timely project delivery.',
            'Automation and digitalisation - fragmented email communication was replaced with a coherent digital S2C process across the organisation.',
            'Scalability - the project established a stable technology and process foundation ready to support the company’s continued international expansion.',
          ],
          highlight: 'The project enabled the organisation to move efficiently from manual processes to a modern, automated S2C procurement environment.',
        },
      },
    },
    'spend-analytics': {
      hero: {
        eyebrow: 'Digital Services · Spend Analytics',
        title: 'Clear spend data for better decisions',
        subtitle: 'We structure procurement data and tail spend, improve the management of key categories, and identify tangible savings opportunities.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalSpendAnalytics,
        imageAlt: 'Profitia Spend Analytics',
      },
      seo: {
        title: 'Spend Analytics | Profitia',
        description: 'We structure procurement data, build a tailored Spend Cube, and identify savings opportunities across key categories and tail spend.',
      },
      domains: [
        {
          id: 'spend-analytics',
          title: 'Spend Analytics',
          products: [
            {
              id: 'spend-cube',
              title: 'Spend Cube',
              description: [
                'Data cleansing for procurement line items and supplier master data',
                'Development of a category tree tailored to the organisation’s business profile',
                'Customisation of the Spend Cube view and target capabilities',
                'A complete view of the organisation’s spend',
                'Integration with internal data sources and automated Spend Cube refreshes',
              ],
            },
          ],
        },
      ],
      caseStudy: {
        startingPoint: {
          eyebrow: 'Starting point',
          title: 'Fragmented data prevented the Group from seeing its total spend',
          paragraphs: [
            'A corporate group comprising more than ten subsidiaries was working with highly fragmented and inconsistent procurement data.',
            'Individual companies used different source systems and lacked a common data structure. As a result, management did not have a complete view of total Group spend.',
          ],
          signals: [
            'More than ten subsidiaries working with fragmented procurement data',
            'Different ERP systems used across individual entities',
            'No common structure, terminology or spend classification',
            'No complete view of total spend across the corporate group',
          ],
        },
        scope: {
          eyebrow: 'Assessment scope',
          title: 'From data consolidation to a single Spend Cube',
          intro: 'The project set out to organise historical procurement spend and create a centralised analytics tool that would support procurement decisions across the organisation. The work covered four core areas:',
          areas: [
            {
              title: 'Data consolidation',
              description: 'Combining information from multiple independent ERP systems into one consistent dataset.',
            },
            {
              title: 'Data cleansing and standardisation',
              description: 'Removing duplicates, correcting inaccurate values, and standardising item codes and supplier names.',
            },
            {
              title: 'Category taxonomy design',
              description: 'Developing a consistent three-level procurement category tree for the entire corporate group.',
            },
            {
              title: 'Spend Cube implementation',
              description: 'Building a Spend Cube with advanced dimensions including payment terms and CAPEX/OPEX spend classification.',
            },
          ],
        },
        result: {
          eyebrow: 'Outcome',
          title: 'One source of data for procurement decisions across the Group',
          items: [
            'Full spend visibility - the analysis exposed fragmented tail spend and inefficiencies across non-production spend.',
            'Savings opportunities - differences in prices and contracts between subsidiaries revealed immediate areas for standardisation and renegotiation.',
            'Synergy and scale - recommendations for central agreements enabled the organisation to use the combined purchasing power of the Group.',
            'Process consistency - terminology and spend classification were standardised across all subsidiaries.',
          ],
          highlight: 'The Spend Cube gave the corporate group a shared, reliable view of spend and a sound basis for procurement decisions across the entire organisation.',
        },
      },
    },
    'custom-applications': {
      hero: {
        eyebrow: 'Digital Services · Custom Applications',
        title: 'Applications built around your processes',
        subtitle: 'We design and implement custom applications aligned with your existing processes and procedures to increase automation across procurement and supply chain management.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalCustomApplications,
        imageAlt: 'Profitia custom procurement applications',
      },
      seo: {
        title: 'Custom Procurement Applications | Profitia',
        description: 'We design and implement applications tailored to procurement and supply chain management processes.',
      },
      domains: [
        {
          id: 'custom-applications',
          title: 'Custom Applications',
          products: [
            {
              id: 'applications',
              title: 'Applications',
              description: [
                'Business workshops and mapping of procedures and processes',
                'Identification of opportunities for automation and integration',
                'Recommendations for applications and functionality, including estimated organisational benefits',
                'Application design, development and implementation',
                'Training for users and tool administrators',
              ],
            },
          ],
        },
      ],
      caseStudy: {
        startingPoint: {
          eyebrow: 'Starting point',
          title: 'When a standard system does not address local business needs',
          paragraphs: [
            'Enterprise procurement platforms such as ERP, P2P and S2C systems work well for repeatable global processes. They do not always address an organisation’s specific local challenges.',
            'Costly and time-consuming customisation leaves gaps in the technology landscape. These gaps are often filled with spreadsheets, email exchanges and paper-based forms.',
          ],
          signals: [
            'Processes fragmented across spreadsheets, email and paper forms',
            'Off-the-shelf platforms requiring costly and time-consuming customisation',
            'The organisation having to adapt its processes to rigid software logic',
            'Licence costs covering complex modules that the team never uses',
          ],
        },
        scope: {
          eyebrow: 'Assessment scope',
          title: 'From discovery to a scalable application',
          intro: 'A custom application is designed around the real process and developed in stages - from defining the objective and testing a working prototype to secure production deployment.',
          areas: [
            {
              title: 'Discovery',
              description: 'Needs assessment, process mapping and definition of the application’s business objective.',
            },
            {
              title: 'UX prototype',
              description: 'Preparation of interface mock-ups tested directly with the procurement team.',
            },
            {
              title: 'MVP delivery',
              description: 'Delivery of a fully functional application version ready for testing within a matter of weeks.',
            },
            {
              title: 'IT integration',
              description: 'Secure integration with ERP systems, databases and the organisation’s SSO environment.',
            },
            {
              title: 'Scaling',
              description: 'Production launch, user training and continued development of additional modules.',
            },
          ],
        },
        result: {
          eyebrow: 'Outcome',
          title: 'A process-fit solution delivered within weeks',
          items: [
            'Closing gaps in the technology landscape - fragmented activities are brought together in one coherent digital process.',
            'Rapid implementation - a functional MVP addresses an urgent business problem without a lengthy corporate deployment programme.',
            'Complete process fit - the application reflects the organisation’s specific requirements instead of forcing the process into off-the-shelf software logic.',
            'Optimised licence costs - the organisation pays for the capabilities it actually needs rather than unused modules.',
          ],
          highlight: 'A custom application turns a local process gap into a secure, integrated and scalable digital solution.',
        },
      },
    },
    'ai-agents': {
      hero: {
        eyebrow: 'Digital Services · AI Agents',
        title: 'AI agents built for day-to-day procurement work',
        subtitle: 'We design tailored AI agents that support day-to-day procurement work, improve decision-making and accelerate key processes.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalAiAgents,
        imageAlt: 'Profitia AI agents for procurement',
      },
      seo: {
        title: 'AI Agents for Procurement | Profitia',
        description: 'We design and implement tailored AI agents that support procurement decisions and day-to-day procurement work.',
      },
      domains: [
        {
          id: 'ai-agents',
          title: 'AI Agents',
          products: [
            {
              id: 'agents',
              title: 'Agents',
              description: [
                'Workshops with key stakeholders',
                'Identification of process areas that can be supported by AI agents',
                'Design of tailored AI agents and their implementation across the organisation',
                'Protection of the infrastructure against data leakage',
                'Training on working with AI agents and using them in day-to-day tasks',
              ],
            },
          ],
        },
      ],
      caseStudy: {
        startingPoint: {
          eyebrow: 'Starting point',
          title: 'Purpose-built AI agents instead of another generic chatbot',
          paragraphs: [
            'We do not deploy repetitive chatbots. We build specialist digital micro-roles that take on the most time-consuming, analytical and repetitive tasks within a procurement team.',
            'Each agent works in the organisation’s own context, using its procedures, templates, procurement history and contracts, with logic constrained to a verified internal knowledge base.',
          ],
          signals: [
            'The RFP & Spec Agent converts business requirements into RFP/RFI documentation, technical specifications and objective bid evaluation matrices',
            'The Contract Review Agent reviews draft agreements, identifies risky clauses and compares their terms with the organisation’s approved template',
            'Knowledge and context come from the organisation’s procedures, templates, procurement history and contracts through a RAG architecture',
            'Data remains within a private corporate environment, such as Azure or AWS, and is not used to train external models',
            'The agent performs tasks: it generates Excel files, prepares email drafts and connects to ERP systems and APIs',
            'Guardrails constrain the agent to the company’s verified knowledge base and minimise hallucination risk',
          ],
        },
        scope: {
          eyebrow: 'Assessment scope',
          title: 'Five steps towards intelligent procurement automation',
          intro: 'An AI agent implementation begins by selecting the right process and ends with controlled deployment, team training and the gradual scaling of the solution.',
          areas: [
            {
              title: 'Process assessment and selection',
              description: 'Reviewing buyers’ day-to-day tasks and selecting one or two processes with the strongest potential for rapid return on investment.',
            },
            {
              title: 'Knowledge base preparation',
              description: 'Securely connecting procurement procedures, contract templates, sourcing documents and category dictionaries.',
            },
            {
              title: 'Logic configuration and calibration',
              description: 'Adapting the agent’s language, terminology and decision criteria to the industry, compliance requirements and organisational rules.',
            },
            {
              title: 'Testing and security',
              description: 'Validating outputs in a secure test environment while preserving human control through a Human-in-the-Loop model.',
            },
            {
              title: 'Deployment and scaling',
              description: 'Production launch, training the team to work effectively with AI, and gradually adding further modules.',
            },
          ],
        },
        result: {
          eyebrow: 'Outcome',
          title: 'Secure automation that gives procurement teams time back',
          items: [
            'Faster processes and time savings as repetitive analytical and documentation tasks are automated.',
            'Better decisions and lower costs through structured use of the organisation’s own knowledge base.',
            'Data security and compliance through a private environment and Human-in-the-Loop controls.',
            'Greater buyer satisfaction as the team can focus on work that requires judgement and business relationships.',
            'Scalable competitive advantage through the gradual development of further specialist AI agents.',
          ],
          highlight: 'An AI agent does not replace the buyer’s decision - it prepares recommendations and performs tasks while leaving the final choice under human control.',
        },
      },
    },
  },
}

export function getDigitalServiceContent(locale: Locale, serviceId: DigitalServiceId): DigitalServicesPageContent {
  return DIGITAL_SERVICES_CATALOG[locale][serviceId]
}

export function isDigitalServiceId(value: string): value is DigitalServiceId {
  return value in DIGITAL_SERVICES_CATALOG.pl
}

export const DIGITAL_SERVICE_IDS = Object.keys(DIGITAL_SERVICES_CATALOG.pl) as DigitalServiceId[]
