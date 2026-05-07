import type { JobPost } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL JOB POST DATA
// Institutional, editorial, bilingual.
// No HR tone. No startup language. No perks lists.
// ─────────────────────────────────────────────────────────────────────────────

export const JOB_POSTS: JobPost[] = [

  // ══════════════════════════════════════════════════════════════
  // 1. Procurement Consultant / Konsultant Zakupowy
  // ══════════════════════════════════════════════════════════════
  {
    slug: 'procurement-consultant',
    title: {
      pl: 'Konsultant Zakupowy',
      en: 'Procurement Consultant',
    },
    department: {
      pl: 'Doradztwo',
      en: 'Advisory',
    },
    location: {
      pl: 'Warszawa (Villa Metro) · zdalnie elastycznie',
      en: 'Warsaw (Villa Metro) · flexible remote',
    },
    employmentType: {
      pl: 'Umowa o pracę lub B2B',
      en: 'Employment contract or B2B',
    },
    summary: {
      pl: 'Praca bezpośrednio przy projektach doradczych — analiza, przygotowanie negocjacji, rekomendacje dla dyrektorów zakupów i CFO.',
      en: 'Working directly on advisory projects — analysis, negotiation preparation and recommendations for procurement directors and CFOs.',
    },
    roleContext: {
      pl: 'Konsultant Zakupowy pracuje bezpośrednio przy projektach klientów. Rola obejmuje analizę danych zakupowych, budowanie strategii negocjacyjnej, przygotowanie benchmarków rynkowych i współtworzenie rekomendacji, które trafiają do zarządów i dyrektorów zakupów. Projekty są zróżnicowane kategoriowo i sektorowo — od dóbr pośrednich przez logistykę po usługi profesjonalne. Praca ma realny wpływ na decyzje zakupowe organizacji o obrotach od kilkuset milionów do kilku miliardów złotych.',
      en: 'The Procurement Consultant works directly on client projects. The role covers procurement data analysis, negotiation strategy development, market benchmarking and contributing to recommendations that reach boards and procurement directors. Projects span a wide range of categories and sectors — from indirect spend through logistics to professional services. The work has direct influence on procurement decisions in organisations with revenues from several hundred million to several billion PLN.',
    },
    workItems: [
      {
        pl: 'Analiza struktury wydatków klienta — kategoryzacja, identyfikacja potencjału oszczędnościowego, analiza warunków umów',
        en: 'Client spend structure analysis — categorisation, savings potential identification, contract terms review',
      },
      {
        pl: 'Budowanie strategii negocjacyjnej — argumentacja, modele cenowe, benchmarki rynkowe, pozycja przetargowa',
        en: 'Negotiation strategy development — argumentation, pricing models, market benchmarks, tender positioning',
      },
      {
        pl: 'Prowadzenie warsztatów diagnostycznych z zespołami zakupowymi i finansowymi klienta',
        en: 'Facilitating diagnostic workshops with client procurement and finance teams',
      },
      {
        pl: 'Przygotowanie modeli ilościowych: identyfikacja oszczędności, analiza struktury kosztów, should-cost analysis',
        en: 'Building quantitative models: savings identification, cost structure analysis, should-cost modelling',
      },
      {
        pl: 'Współtworzenie deliverables klienta — raportów, rekomendacji, planów wdrożeniowych',
        en: 'Contributing to client deliverables — reports, recommendations, implementation plans',
      },
      {
        pl: 'Praca bezpośrednio z danymi klienta i wewnętrznymi narzędziami analitycznymi Profitia',
        en: 'Working directly with client data and Profitia internal analytical tools',
      },
    ],
    requirements: [
      {
        pl: 'Myślenie analityczne: zdolność do strukturyzowania problemu, budowania argumentu z danych i komunikowania wniosków',
        en: 'Analytical thinking: ability to structure a problem, build an argument from data and communicate conclusions clearly',
      },
      {
        pl: 'Wiedza zakupowa lub kategoriowa — albo silna motywacja do jej szybkiego zbudowania',
        en: 'Procurement or category knowledge — or strong motivation to build it rapidly',
      },
      {
        pl: 'Biegłość w Excel / narzędziach danych na poziomie umożliwiającym samodzielną analizę',
        en: 'Proficiency in Excel / data tools at a level enabling independent analysis',
      },
      {
        pl: 'Komunikacja biznesowa: umiejętność przygotowania profesjonalnego dokumentu rekomendacyjnego',
        en: 'Business communication: ability to prepare a professional recommendation document',
      },
      {
        pl: 'Zdolność do samodzielnej pracy i poczucie odpowiedzialności za przydzielone zadania',
        en: 'Capacity for independent work and ownership of assigned tasks',
      },
    ],
    profile: [
      {
        pl: 'Złożone problemy biznesowe są dla Ciebie ciekawsze niż proste odpowiedzi',
        en: 'You find complex business problems more interesting than simple answers',
      },
      {
        pl: 'Preferujesz ustrukturyzowane myślenie nad decyzjami opartymi na intuicji',
        en: 'You prefer structured thinking over intuition-led decisions',
      },
      {
        pl: 'Bierzesz odpowiedzialność i realizujesz zadania bez oczekiwania instrukcji na każdym kroku',
        en: 'You take ownership and follow through without needing direction at each step',
      },
      {
        pl: 'Czujesz się komfortowo pracując z realnymi danymi klientów i niejednoznacznymi sytuacjami komercyjnymi',
        en: 'You are comfortable working with real client data and ambiguous commercial situations',
      },
    ],
    workingModel: {
      pl: 'Praca projektowa. Biuro Warszawa (Villa Metro, ul. Puławska 145). Elastyczność zdalna zależna od fazy projektu. Okazjonalne wyjazdy do klientów.',
      en: 'Project-based work. Warsaw office (Villa Metro, Puławska 145). Remote flexibility depending on project phase. Occasional client travel.',
    },
    development: {
      pl: 'Ekspozycja na zróżnicowane kategorie zakupowe, typy klientów i sytuacje biznesowe. Mentoring wewnętrzny i ustrukturyzowany feedback po każdym projekcie. Ścieżka rozwoju w kierunku starszego konsultanta i roli właściciela klienta.',
      en: 'Exposure to a broad range of procurement categories, client types and business situations. Internal mentoring and structured feedback after each project. Pathway towards senior consultant and client ownership roles.',
    },
    metadata: {
      title: {
        pl: 'Konsultant Zakupowy | Kariera | Profitia',
        en: 'Procurement Consultant | Career | Profitia',
      },
      description: {
        pl: 'Rola konsultanta zakupowego w Profitia — praca przy projektach doradczych, negocjacyjnych i analitycznych dla organizacji zakupowych.',
        en: 'Procurement Consultant role at Profitia — advisory, negotiation and analytics projects for procurement organisations.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // 2. Junior Business Analyst / Młodszy Analityk Biznesowy
  // ══════════════════════════════════════════════════════════════
  {
    slug: 'junior-business-analyst',
    title: {
      pl: 'Młodszy Analityk Biznesowy',
      en: 'Junior Business Analyst',
    },
    department: {
      pl: 'Analityka i Dane',
      en: 'Analytics & Data',
    },
    location: {
      pl: 'Warszawa (Villa Metro) · zdalnie elastycznie',
      en: 'Warsaw (Villa Metro) · flexible remote',
    },
    employmentType: {
      pl: 'Umowa o pracę',
      en: 'Employment contract',
    },
    summary: {
      pl: 'Punkt wejścia do pracy analitycznej i doradczej Profitia — analiza danych zakupowych, intelligence rynkowy, przygotowanie materiałów dla klientów.',
      en: 'Entry point into Profitia analytical and advisory work — procurement data analysis, market intelligence and client material preparation.',
    },
    roleContext: {
      pl: 'Rola Młodszego Analityka Biznesowego to rzeczywisty punkt wejścia do pracy doradczej Profitia. Rola skupia się na rozwijaniu kompetencji analitycznych, które stanowią fundament pracy z klientami — analiza danych zakupowych, strukturyzacja informacji rynkowych, budowanie modeli i wspieranie przygotowania materiałów projektowych. Praca jest realizowana w bezpośrednim kontakcie z projektami i danymi klientów, pod mentoringiem doświadczonych konsultantów.',
      en: 'The Junior Business Analyst role is a genuine entry point into Profitia advisory work. It focuses on developing the analytical skills that underpin client work — procurement data analysis, market intelligence structuring, model building and supporting project material preparation. The work takes place in direct contact with client projects and data, under the mentoring of experienced consultants.',
    },
    workItems: [
      {
        pl: 'Przetwarzanie i strukturyzowanie danych zakupowych klientów — kategoryzacja, czyszczenie, przygotowanie analityczne',
        en: 'Processing and structuring client procurement data — categorisation, cleansing, analytical preparation',
      },
      {
        pl: 'Budowanie standardowych modeli analitycznych: wydatki wg kategorii, koncentracja dostawców, porównania rok-do-roku',
        en: 'Building standard analytical models: spend by category, supplier concentration, year-on-year comparisons',
      },
      {
        pl: 'Prowadzenie badań rynkowych i dostawców na potrzeby strategii negocjacyjnych',
        en: 'Conducting supplier and market research to inform negotiation strategies',
      },
      {
        pl: 'Wspieranie przygotowania prezentacji i dokumentów rekomendacyjnych dla klientów',
        en: 'Supporting the preparation of client presentations and recommendation documents',
      },
      {
        pl: 'Udział w budowaniu wewnętrznej bazy wiedzy: benchmarki kategorii, dane rynkowe, biblioteki metodologiczne',
        en: 'Contributing to the internal knowledge base: category benchmarks, market data, methodology libraries',
      },
      {
        pl: 'Praca z Excel oraz stopniowe zapoznawanie się z platformami danych i SQL',
        en: 'Working with Excel and progressively developing competency in data platforms and SQL',
      },
    ],
    requirements: [
      {
        pl: 'Ustrukturyzowane podejście analityczne — zdolność do pracy z danymi i wyciągania uzasadnionych wniosków',
        en: 'Structured analytical approach — ability to work with data and draw defensible conclusions',
      },
      {
        pl: 'Dbałość o jakość: dokładność ma znaczenie w deliverables klientów',
        en: 'Attention to quality: accuracy matters in client deliverables',
      },
      {
        pl: 'Biegłość w Excel; chęć do dalszego rozwijania kompetencji analitycznych',
        en: 'Proficiency in Excel; interest in developing data analysis skills further',
      },
      {
        pl: 'Zdolność do klarownego komunikowania wyników — pisemnie i ustnie',
        en: 'Ability to communicate findings clearly in written and verbal form',
      },
      {
        pl: 'Silna motywacja do nauki zakupów i metodologii negocjacyjnej',
        en: 'Strong motivation to learn procurement and negotiation methodology',
      },
    ],
    profile: [
      {
        pl: 'Jesteś ciekawy jak firmy kupują i co to oznacza dla ich ekonomiki',
        en: 'You are curious about how organisations buy and what that means for their economics',
      },
      {
        pl: 'Preferujesz precyzję nad szybkością; weryfikujesz zanim wyciągniesz wniosek',
        en: 'You prefer precision over speed; you verify before concluding',
      },
      {
        pl: 'Masz metodyczne podejście i budujesz wiedzę od podstaw, nie przez założenia',
        en: 'You are methodical; you build understanding from first principles rather than assumptions',
      },
      {
        pl: 'Jesteś gotowy zadawać pytania i budować kompetencje przez rzeczywistą pracę projektową',
        en: 'You are comfortable asking questions and building knowledge through real project work',
      },
    ],
    workingModel: {
      pl: 'Praca głównie z biura w Warszawie (Villa Metro, ul. Puławska 145), z elastycznością zdalną. Ekspozycja na projekty zaczyna się od ustrukturyzowanego wsparcia analitycznego, z sukcesywnie rosnącym zakresem samodzielności.',
      en: 'Primarily Warsaw office-based (Villa Metro, Puławska 145), with remote flexibility. Project exposure begins with structured analytical support, with gradually expanding scope and ownership.',
    },
    development: {
      pl: 'Pierwsze 12 miesięcy to przede wszystkim nauka i realizacja: kompetencje analityczne, słownictwo zakupowe, kontekst klientów. Mentoring przez doświadczonych konsultantów. Jasna ścieżka rozwoju: junior analyst → analyst → senior analyst.',
      en: 'The first 12 months focus on learning and contributing: analytical skills, procurement vocabulary, client context. Mentoring by senior consultants. Clear progression path: junior analyst → analyst → senior analyst.',
    },
    metadata: {
      title: {
        pl: 'Młodszy Analityk Biznesowy | Kariera | Profitia',
        en: 'Junior Business Analyst | Career | Profitia',
      },
      description: {
        pl: 'Rola analityczna w Profitia — praca z danymi zakupowymi, analityka spend, wsparcie projektów doradczych i negocjacyjnych.',
        en: 'Analytical role at Profitia — procurement data work, spend analytics, support for advisory and negotiation projects.',
      },
    },
  },
]
