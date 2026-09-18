import type { JobPost } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL JOB POST DATA
// Institutional, editorial, bilingual.
// No HR tone. No startup language. No perks lists.
// ─────────────────────────────────────────────────────────────────────────────

export const JOB_POSTS: JobPost[] = [

  // ══════════════════════════════════════════════════════════════
  // 1. Consultant / Senior Consultant
  // ══════════════════════════════════════════════════════════════
  {
    slug: 'procurement-consultant',
    title: {
      pl: 'Consultant / Senior Consultant',
      en: 'Consultant / Senior Consultant',
    },
    subtitle: {
      pl: 'W zależności od Twojej wiedzy i doświadczenia',
      en: 'Depending on your knowledge and experience',
    },
    department: {
      pl: 'Doradztwo',
      en: 'Advisory',
    },
    location: {
      pl: 'Warszawa (Villa Metro) · praca hybrydowa',
      en: 'Warsaw (Villa Metro) · hybrid work',
    },
    employmentType: {
      pl: 'Umowa o pracę lub B2B',
      en: 'Employment contract or B2B',
    },
    summary: {
      pl: 'Praca bezpośrednio przy projektach doradczych - od analizy i przygotowania negocjacji po prowadzenie strumieni projektowych i rekomendacje dla kadry zarządzającej.',
      en: 'Direct involvement in advisory projects - from analysis and negotiation preparation to leading project workstreams and developing recommendations for senior management.',
    },
    roleContext: {
      pl: 'Zakres odpowiedzialności dopasowujemy do doświadczenia. Consultant pracuje bezpośrednio przy analizach, strategiach i wdrożeniach dla klientów, a Senior Consultant przejmuje odpowiedzialność za wybrane strumienie projektu, jakość rekomendacji oraz rozwój młodszych członków zespołu. Projekty obejmują różne kategorie i sektory - od dóbr pośrednich przez logistykę po usługi profesjonalne.',
      en: 'We tailor the scope of responsibility to experience. A Consultant works directly on client analyses, strategies and implementation, while a Senior Consultant takes ownership of selected project workstreams, recommendation quality and the development of junior team members. Projects cover a broad range of categories and sectors - from indirect spend and logistics to professional services.',
    },
    workItems: [
      {
        pl: 'Analiza struktury wydatków klienta - kategoryzacja, identyfikacja potencjału oszczędnościowego, analiza warunków umów',
        en: 'Client spend structure analysis - categorisation, savings potential identification, contract terms review',
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
        pl: 'Budowanie strategii negocjacyjnej - argumentacja, modele cenowe, benchmarki rynkowe, pozycja przetargowa',
        en: 'Negotiation strategy development - argumentation, pricing models, market benchmarks, tender positioning',
      },
      {
        pl: 'Współtworzenie deliverables klienta - raportów, rekomendacji, planów wdrożeniowych',
        en: 'Contributing to client deliverables - reports, recommendations, implementation plans',
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
        pl: 'Wiedza zakupowa lub kategoriowa - albo silna motywacja do jej szybkiego zbudowania',
        en: 'Procurement or category knowledge - or strong motivation to build it rapidly',
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
        pl: 'Consultant / Senior Consultant | Kariera | Profitia',
        en: 'Consultant / Senior Consultant | Career | Profitia',
      },
      description: {
        pl: 'Rola konsultanta zakupowego w Profitia - praca przy projektach doradczych, negocjacyjnych i analitycznych dla organizacji zakupowych.',
        en: 'Procurement Consultant role at Profitia - advisory, negotiation and analytics projects for procurement organisations.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // 2. Junior Analyst / Analyst
  // ══════════════════════════════════════════════════════════════
  {
    slug: 'junior-business-analyst',
    title: {
      pl: 'Junior Analyst / Analyst',
      en: 'Junior Analyst / Analyst',
    },
    subtitle: {
      pl: 'W zależności od Twojej wiedzy i doświadczenia',
      en: 'Depending on your knowledge and experience',
    },
    department: {
      pl: 'Analityka i Dane',
      en: 'Analytics & Data',
    },
    location: {
      pl: 'Warszawa (Villa Metro) · praca hybrydowa',
      en: 'Warsaw (Villa Metro) · hybrid work',
    },
    employmentType: {
      pl: 'Umowa zlecenie',
      en: 'Civil contract (zlecenie)',
    },
    summary: {
      pl: 'Rozwój w analityce i doradztwie zakupowym - analiza danych, market intelligence, modele kosztowe i przygotowanie materiałów dla klientów.',
      en: 'Development in procurement analytics and advisory - data analysis, market intelligence, cost modelling and preparation of client materials.',
    },
    roleContext: {
      pl: 'Zakres odpowiedzialności dopasowujemy do wiedzy i doświadczenia. Junior Analyst rozwija warsztat analityczny pod opieką bardziej doświadczonych osób, a Analyst samodzielnie prowadzi uzgodnione analizy i odpowiada za wybrane części materiałów projektowych. Fundamentem obu poziomów są dane zakupowe, informacje rynkowe, modele i rzetelne wnioski.',
      en: 'We tailor the scope of responsibility to knowledge and experience. A Junior Analyst develops analytical skills with support from more experienced colleagues, while an Analyst independently delivers agreed analyses and owns selected parts of project materials. Both levels are grounded in procurement data, market intelligence, modelling and well-supported conclusions.',
    },
    workItems: [
      {
        pl: 'Przetwarzanie i strukturyzowanie danych zakupowych klientów - kategoryzacja, czyszczenie, przygotowanie analityczne',
        en: 'Processing and structuring client procurement data - categorisation, cleansing, analytical preparation',
      },
      {
        pl: 'Budowanie standardowych modeli analitycznych: wydatki wg kategorii, koncentracja dostawców, porównania rok-do-roku',
        en: 'Building standard analytical models: spend by category, supplier concentration, year-on-year comparisons',
      },
      {
        pl: 'Prowadzenie badań rynkowych i dostawców',
        en: 'Conducting supplier and market research',
      },
      {
        pl: 'Wspieranie przygotowania prezentacji i dokumentów dla klientów',
        en: 'Supporting the preparation of client presentations and documents',
      },
      {
        pl: 'Udział w budowaniu wewnętrznej bazy wiedzy: benchmarki kategorii, dane rynkowe, biblioteki metodologiczne',
        en: 'Contributing to the internal knowledge base: category benchmarks, market data, methodology libraries',
      },
      {
        pl: 'Praca z Excel oraz PowerPoint',
        en: 'Working with Excel and PowerPoint',
      },
    ],
    requirements: [
      {
        pl: 'Ustrukturyzowane podejście analityczne - zdolność do pracy z danymi i wyciągania uzasadnionych wniosków',
        en: 'Structured analytical approach - ability to work with data and draw defensible conclusions',
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
        pl: 'Zdolność do klarownego komunikowania wyników - pisemnie i ustnie',
        en: 'Ability to communicate findings clearly in written and verbal form',
      },
      {
        pl: 'Minimum II rok studiów',
        en: 'At minimum second year of studies',
      },
      {
        pl: 'Dostępność minimum 20 godzin tygodniowo',
        en: 'Availability of at least 20 hours per week',
      },
      {
        pl: 'Umiejętność pracy w zespole i komunikacji interpersonalnej',
        en: 'Ability to work collaboratively and communicate effectively',
      },
      {
        pl: 'Orientacja na osiąganie celów',
        en: 'Results-oriented mindset',
      },
      {
        pl: 'Zainteresowanie tematyką zakupów, łańcucha dostaw lub konsultingu',
        en: 'Interest in procurement, supply chain or consulting',
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
        pl: 'Junior Analyst / Analyst | Kariera | Profitia',
        en: 'Junior Analyst / Analyst | Career | Profitia',
      },
      description: {
        pl: 'Rola analityczna w Profitia - praca z danymi zakupowymi, analityka spend, wsparcie projektów doradczych i negocjacyjnych.',
        en: 'Analytical role at Profitia - procurement data work, spend analytics, support for advisory and negotiation projects.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // 3. Manager
  // ══════════════════════════════════════════════════════════════
  {
    slug: 'manager',
    title: { pl: 'Manager', en: 'Manager' },
    department: { pl: 'Doradztwo', en: 'Advisory' },
    location: { pl: 'Warszawa (Villa Metro) · praca hybrydowa', en: 'Warsaw (Villa Metro) · hybrid work' },
    employmentType: { pl: '', en: '' },
    summary: {
      pl: 'Odpowiedzialność za prowadzenie projektów doradczych, relacje z klientami, jakość rekomendacji i rozwój zespołu.',
      en: 'Responsibility for leading advisory projects, client relationships, recommendation quality and team development.',
    },
    roleContext: {
      pl: 'Manager prowadzi projekty od diagnozy do wdrożenia. Łączy odpowiedzialność merytoryczną i komercyjną: porządkuje problem klienta, buduje plan pracy, koordynuje zespół, dba o jakość rezultatów i prowadzi komunikację z interesariuszami po stronie klienta. To rola dla osoby, która potrafi połączyć wiedzę zakupową z zarządzaniem projektem i rozwojem ludzi.',
      en: 'A Manager leads projects from diagnosis through implementation. The role combines subject-matter and commercial responsibility: structuring the client problem, defining the workplan, coordinating the team, assuring deliverable quality and managing communication with client stakeholders. It suits someone who can combine procurement expertise with project leadership and people development.',
    },
    workItems: [
      { pl: 'Prowadzenie projektów i strumieni doradczych od ustalenia zakresu po wdrożenie rekomendacji', en: 'Leading advisory projects and workstreams from scoping through implementation of recommendations' },
      { pl: 'Zarządzanie relacją z klientem oraz komunikacją z kadrą zarządzającą i liderami funkcji zakupowej', en: 'Managing client relationships and communication with senior management and procurement leaders' },
      { pl: 'Zapewnianie jakości analiz, rekomendacji, prezentacji i pozostałych rezultatów projektu', en: 'Assuring the quality of analyses, recommendations, presentations and other project deliverables' },
      { pl: 'Planowanie pracy zespołu, delegowanie odpowiedzialności i bieżące zarządzanie ryzykiem projektu', en: 'Planning team delivery, delegating ownership and managing project risks' },
      { pl: 'Rozwijanie konsultantów i analityków poprzez mentoring, feedback i wspólną pracę projektową', en: 'Developing consultants and analysts through mentoring, feedback and joint project work' },
      { pl: 'Współtworzenie ofert i rozwijanie relacji biznesowych Profitii', en: 'Contributing to proposals and developing Profitia’s business relationships' },
    ],
    requirements: [
      { pl: 'Doświadczenie w prowadzeniu projektów doradczych, zakupowych, transformacyjnych lub optymalizacyjnych', en: 'Experience leading advisory, procurement, transformation or optimisation projects' },
      { pl: 'Umiejętność prowadzenia klienta od niejednoznacznego problemu do konkretnej decyzji i planu wdrożenia', en: 'Ability to guide a client from an ambiguous problem to a clear decision and implementation plan' },
      { pl: 'Bardzo dobre rozumienie procesów zakupowych, strategii kategorii, negocjacji lub transformacji funkcji zakupowej', en: 'Strong understanding of procurement processes, category strategy, negotiations or procurement transformation' },
      { pl: 'Doświadczenie w zarządzaniu zespołem i rozwijaniu mniej doświadczonych współpracowników', en: 'Experience managing teams and developing less experienced colleagues' },
      { pl: 'Swoboda komunikacji biznesowej w języku polskim i angielskim', en: 'Confident business communication in Polish and English' },
    ],
    profile: [
      { pl: 'Łączysz myślenie strategiczne z odpowiedzialnością za dowiezienie rezultatu', en: 'You combine strategic thinking with accountability for delivery' },
      { pl: 'Potrafisz podejmować decyzje przy niepełnych danych i jasno komunikować ich uzasadnienie', en: 'You can make decisions with incomplete information and communicate the rationale clearly' },
      { pl: 'Budujesz autorytet poprzez wiedzę, jakość pracy i partnerskie podejście', en: 'You build authority through expertise, quality and a collaborative approach' },
      { pl: 'Rozwój ludzi traktujesz jako część odpowiedzialności za projekt', en: 'You see people development as part of project leadership' },
    ],
    workingModel: {
      pl: 'Praca projektowa w modelu hybrydowym. Biuro w Warszawie (Villa Metro, ul. Puławska 145), praca zdalna oraz spotkania i wyjazdy do klientów zależnie od etapu projektu.',
      en: 'Hybrid project work based in our Warsaw office (Villa Metro, 145 Puławska Street), combined with remote work and client meetings or travel depending on the project stage.',
    },
    development: {
      pl: 'Rozwój w kierunku odpowiedzialności za portfel klientów, budowania specjalizacji eksperckiej oraz współtworzenia praktyki doradczej Profitii.',
      en: 'Development towards ownership of a client portfolio, a distinct expert specialism and a role in shaping Profitia’s advisory practice.',
    },
    metadata: {
      title: { pl: 'Manager | Kariera | Profitia', en: 'Manager | Career | Profitia' },
      description: {
        pl: 'Rola Managera w Profitia - prowadzenie projektów doradczych, relacji z klientami i rozwoju zespołu.',
        en: 'Manager role at Profitia - leading advisory projects, client relationships and team development.',
      },
    },
  },
]
