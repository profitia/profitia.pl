import type { Capability } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL CAPABILITY DATA
// ─────────────────────────────────────────────────────────────────────────────
// Type: service | education
// Categories: advisory | negotiations | analytics | transformation |
//             coaching | executive-education | workshops | intelligence
// ─────────────────────────────────────────────────────────────────────────────

export const CAPABILITIES: Capability[] = [

  // ══════════════════════════════════════════════════════════════
  // SERVICES - Advisory & Transformation
  // ══════════════════════════════════════════════════════════════

  {
    slug: 'projekty-doradcze',
    type: 'service',
    category: 'advisory',
    featured: true,
    order: 101,
    eyebrow: { pl: 'Doradztwo', en: 'Advisory' },
    title: { pl: 'Projekty Doradcze', en: 'Advisory Projects' },
    shortDescription: {
      pl: 'Zewnętrzna perspektywa, dane rynkowe i doświadczenie, których nie ma Twój zespół wewnętrzny.',
      en: 'External perspective, market data and experience your internal team doesn\'t have.',
    },
    longDescription: {
      pl: 'Pomagamy organizacjom zakupowym zidentyfikować ukryty potencjał oszczędnościowy, przygotować się do negocjacji z kluczowymi dostawcami i wdrożyć rekomendacje, które realnie wpływają na wynik. Pracujemy na Twoich danych, ale z niezależną perspektywą.',
      en: 'We help procurement organisations identify hidden savings potential, prepare for negotiations with key suppliers and implement recommendations that genuinely impact the bottom line. We work with your data, but from an independent perspective.',
    },
    whatItSolves: [
      { pl: 'Brak zewnętrznego punktu odniesienia do oceny warunków zakupowych', en: 'No external reference point for assessing procurement terms' },
      { pl: 'Ograniczone zasoby wewnętrzne do przygotowania złożonych negocjacji', en: 'Limited internal resources for preparing complex negotiations' },
      { pl: 'Nieznana skala potencjału oszczędnościowego w kategoriach kosztowych', en: 'Unknown scale of savings potential across cost categories' },
      { pl: 'Reaktywna funkcja zakupowa bez strategicznego wpływu', en: 'Reactive procurement function without strategic influence' },
    ],
    outcomes: [
      { pl: 'Identyfikacja konkretnego potencjału oszczędnościowego (ilościowy)', en: 'Identified specific savings potential (quantified)' },
      { pl: 'Strategia negocjacyjna dla kluczowych kategorii', en: 'Negotiation strategy for key categories' },
      { pl: 'Plan wdrożeniowy z priorytetami i właścicielami', en: 'Implementation plan with priorities and owners' },
      { pl: 'Wewnętrzne kompetencje wzmocnione przez transfer wiedzy', en: 'Internal capabilities strengthened through knowledge transfer' },
    ],
    methodology: [
      { pl: 'Diagnoza - analiza danych zakupowych, struktury wydatków i warunków umów', en: 'Diagnosis - analysis of procurement data, spend structure and contract terms' },
      { pl: 'Benchmarki - porównanie z rynkiem w danej kategorii', en: 'Benchmarking - comparison with market standards in the category' },
      { pl: 'Strategia - pozycja negocjacyjna, argumentacja, plan działania', en: 'Strategy - negotiation position, argumentation, action plan' },
      { pl: 'Wdrożenie - towarzyszenie w realizacji i weryfikacja wyników', en: 'Implementation - support through execution and results verification' },
    ],
    engagement: {
      pl: 'Projekty 4-12 tygodni; format warsztatu diagnostycznego, analizy i raportów rekomendacyjnych.',
      en: '4-12 week projects; diagnostic workshop, analysis and recommendation report format.',
    },
    relatedCapabilities: ['interim-management', 'procurement-transformation', 'should-cost-analysis'],
    relatedInsights: [],
    ctaLabel: { pl: 'Umów rozmowę', en: 'Schedule a conversation' },
    metadata: {
      title: { pl: 'Projekty Doradcze | Profitia', en: 'Advisory Projects | Profitia' },
      description: {
        pl: 'Zewnętrzna perspektywa i dane rynkowe dla Twojej funkcji zakupowej. Identyfikujemy potencjał i wspieramy wdrożenie.',
        en: 'External perspective and market data for your procurement function. We identify potential and support implementation.',
      },
    },
  },

  {
    slug: 'interim-management',
    type: 'service',
    category: 'transformation',
    featured: false,
    order: 102,
    eyebrow: { pl: 'Doradztwo', en: 'Advisory' },
    title: { pl: 'Interim Management', en: 'Interim Management' },
    shortDescription: {
      pl: 'Doświadczony dyrektor zakupów dostępny tam, gdzie i kiedy potrzebujesz - na czas transformacji lub przejścia.',
      en: 'An experienced procurement director available where and when you need them - through transformation or transition.',
    },
    longDescription: {
      pl: 'Zapewniamy dostęp do seniorowego doświadczenia zakupowego w formule interim - bez kosztów stałych, z natychmiastowym efektem. Odpowiedź na lukę kompetencyjną, restrukturyzację funkcji lub potrzebę prowadzenia złożonego projektu zakupowego bez angażowania pełnoetatowego zasobu.',
      en: 'We provide access to senior procurement expertise on an interim basis - without permanent costs, with immediate impact. The answer to a competency gap, function restructuring or the need to lead a complex procurement project without full-time resource.',
    },
    whatItSolves: [
      { pl: 'Luka seniorowa w funkcji zakupowej podczas rekrutacji lub zmiany', en: 'Senior gap in procurement function during recruitment or change' },
      { pl: 'Potrzeba prowadzenia złożonego projektu zakupowego bez własnych zasobów', en: 'Need to lead a complex procurement project without own resources' },
      { pl: 'Restrukturyzacja funkcji zakupowej wymagająca zewnętrznego doświadczenia', en: 'Procurement function restructuring requiring external experience' },
    ],
    outcomes: [
      { pl: 'Ciągłość funkcji zakupowej zachowana przez cały okres przejścia', en: 'Procurement function continuity maintained throughout transition' },
      { pl: 'Projekt zakupowy zakończony zgodnie z harmonogramem', en: 'Procurement project completed on schedule' },
      { pl: 'Wiedza i procesy przeniesione do organizacji', en: 'Knowledge and processes transferred to the organisation' },
    ],
    methodology: [
      { pl: 'Szybkie wdrożenie - 1-2 tygodnie od decyzji do uruchomienia', en: 'Fast onboarding - 1-2 weeks from decision to launch' },
      { pl: 'Elastyczny zakres od 10 dni/miesiąc do pełnoetatowego zaangażowania', en: 'Flexible scope from 10 days/month to full-time engagement' },
      { pl: 'Regularne raportowanie i transfer wiedzy od pierwszego dnia', en: 'Regular reporting and knowledge transfer from day one' },
    ],
    engagement: {
      pl: 'Zaangażowanie 3-12 miesięcy; elastyczne od part-time do pełnoetatowego.',
      en: '3-12 month engagement; flexible from part-time to full-time.',
    },
    relatedCapabilities: ['projekty-doradcze', 'procurement-transformation', 'category-strategy'],
    relatedInsights: [],
    ctaLabel: { pl: 'Porozmawiajmy', en: 'Let\'s talk' },
    metadata: {
      title: { pl: 'Interim Management Zakupowy | Profitia', en: 'Procurement Interim Management | Profitia' },
      description: {
        pl: 'Doświadczony dyrektor zakupów w formule interim. Bez kosztów stałych, z natychmiastowym efektem.',
        en: 'An experienced procurement director on an interim basis. Without permanent costs, with immediate impact.',
      },
    },
  },

  {
    slug: 'procurement-transformation',
    type: 'service',
    category: 'transformation',
    featured: true,
    order: 103,
    eyebrow: { pl: 'Transformacja', en: 'Transformation' },
    title: { pl: 'Procurement Transformation', en: 'Procurement Transformation' },
    shortDescription: {
      pl: 'Kompleksowa transformacja funkcji zakupowej - od modelu operacyjnego po kulturę organizacyjną.',
      en: 'Comprehensive procurement function transformation - from operating model to organisational culture.',
    },
    longDescription: {
      pl: 'Przeprowadzamy organizacje przez kompleksową transformację funkcji zakupowej: od diagnozy dojrzałości, przez redesign procesów i modelu operacyjnego, po wdrożenie nowych kompetencji i narzędzi. Efektem jest funkcja zakupowa działająca na poziomie strategicznym.',
      en: 'We guide organisations through comprehensive procurement function transformation: from maturity diagnosis, through process and operating model redesign, to new competency and tool implementation. The result is a procurement function operating at strategic level.',
    },
    whatItSolves: [
      { pl: 'Funkcja zakupowa operująca reaktywnie, bez strategicznego wpływu', en: 'Procurement function operating reactively, without strategic influence' },
      { pl: 'Fragmentaryczne procesy, niezdefiniowane role i KPI', en: 'Fragmented processes, undefined roles and KPIs' },
      { pl: 'Niski poziom dojrzałości zakupowej w organizacji', en: 'Low procurement maturity level in the organisation' },
      { pl: 'Presja na wyniki bez odpowiednich narzędzi i metod', en: 'Pressure for results without adequate tools and methods' },
    ],
    outcomes: [
      { pl: 'Zdefiniowany model operacyjny i mapa procesów zakupowych', en: 'Defined operating model and procurement process map' },
      { pl: 'System KPI i mechanizm mierzenia efektywności', en: 'KPI system and effectiveness measurement mechanism' },
      { pl: 'Wzrost dojrzałości zakupowej o co najmniej 1 poziom w skali CPM', en: 'Procurement maturity increase of at least 1 level on CPM scale' },
      { pl: 'Zakupy jako partner strategiczny dla biznesu', en: 'Procurement as a strategic partner to the business' },
    ],
    methodology: [
      { pl: 'Diagnoza dojrzałości - ocena aktualnego stanu funkcji zakupowej', en: 'Maturity diagnosis - assessment of current procurement function state' },
      { pl: 'Blueprint - zaprojektowanie docelowego modelu operacyjnego', en: 'Blueprint - design of target operating model' },
      { pl: 'Pilotaż - wdrożenie zmian w wybranym obszarze', en: 'Pilot - change implementation in selected area' },
      { pl: 'Rollout - pełne wdrożenie z wsparciem change management', en: 'Rollout - full implementation with change management support' },
    ],
    engagement: {
      pl: 'Projekty 6-18 miesięcy; fazy diagnostyczna, projektowa i wdrożeniowa.',
      en: '6-18 month projects; diagnostic, design and implementation phases.',
    },
    relatedCapabilities: ['projekty-doradcze', 'operating-model-design', 'category-strategy'],
    relatedInsights: [],
    ctaLabel: { pl: 'Porozmawiajmy o transformacji', en: 'Talk about transformation' },
    metadata: {
      title: { pl: 'Transformacja Zakupowa | Profitia', en: 'Procurement Transformation | Profitia' },
      description: {
        pl: 'Kompleksowa transformacja funkcji zakupowej. Od modelu operacyjnego po kulturę i kompetencje.',
        en: 'Comprehensive procurement function transformation. From operating model to culture and competencies.',
      },
    },
  },

  {
    slug: 'category-strategy',
    type: 'service',
    category: 'advisory',
    featured: false,
    order: 104,
    eyebrow: { pl: 'Doradztwo', en: 'Advisory' },
    title: { pl: 'Category Strategy', en: 'Category Strategy' },
    shortDescription: {
      pl: 'Strategia dla kluczowych kategorii kosztowych - oparta na danych rynkowych, nie intuicji.',
      en: 'Strategy for key cost categories - grounded in market data, not intuition.',
    },
    longDescription: {
      pl: 'Budujemy strategie zakupowe dla kluczowych kategorii kosztowych Twojej organizacji. Każda strategia obejmuje analizę rynku dostawców, benchmarki, ocenę ryzyka i pozycję negocjacyjną - tak, żeby Twoi kupcy wchodzili do negocjacji z pełną wiedzą.',
      en: 'We build procurement strategies for your organisation\'s key cost categories. Each strategy covers supplier market analysis, benchmarking, risk assessment and negotiation position - so your buyers enter negotiations with complete knowledge.',
    },
    whatItSolves: [
      { pl: 'Decyzje zakupowe bez znajomości struktury rynku dostawców', en: 'Procurement decisions without knowledge of the supplier market structure' },
      { pl: 'Brak strategii dla kluczowych kategorii kosztowych', en: 'No strategy for key cost categories' },
      { pl: 'Reaktywne podejście do zarządzania dostawcami', en: 'Reactive approach to supplier management' },
    ],
    outcomes: [
      { pl: 'Strategia kategorii z mapą dostawców i pozycją negocjacyjną', en: 'Category strategy with supplier map and negotiation position' },
      { pl: 'Identyfikacja alternatywnych źródeł i możliwości konsolidacji', en: 'Identification of alternative sources and consolidation opportunities' },
      { pl: 'Plan renegocjacji z harmonogramem i priorytetami', en: 'Renegotiation plan with timeline and priorities' },
    ],
    methodology: [
      { pl: 'Analiza wydatków i struktury dostawców w kategorii', en: 'Spend and supplier structure analysis in the category' },
      { pl: 'Badanie rynku i benchmarki zewnętrzne', en: 'Market research and external benchmarks' },
      { pl: 'Ocena ryzyka i zależności od dostawców', en: 'Risk assessment and supplier dependency evaluation' },
      { pl: 'Opracowanie strategii i planu wdrożenia', en: 'Strategy development and implementation plan' },
    ],
    engagement: {
      pl: 'Projekty 3-8 tygodni na kategorię; możliwe podejście portfelowe dla wielu kategorii jednocześnie.',
      en: '3-8 week projects per category; portfolio approach available for multiple categories simultaneously.',
    },
    relatedCapabilities: ['projekty-doradcze', 'should-cost-analysis', 'spend-cube'],
    relatedInsights: [],
    ctaLabel: { pl: 'Porozmawiajmy', en: 'Let\'s talk' },
    metadata: {
      title: { pl: 'Category Strategy | Profitia', en: 'Category Strategy | Profitia' },
      description: {
        pl: 'Strategie zakupowe dla kluczowych kategorii kosztowych. Oparte na danych, nie intuicji.',
        en: 'Procurement strategies for key cost categories. Grounded in data, not intuition.',
      },
    },
  },

  {
    slug: 'operating-model-design',
    type: 'service',
    category: 'transformation',
    featured: false,
    order: 105,
    eyebrow: { pl: 'Transformacja', en: 'Transformation' },
    title: { pl: 'Operating Model Design', en: 'Operating Model Design' },
    shortDescription: {
      pl: 'Projektowanie modelu operacyjnego funkcji zakupowej - struktura, role, procesy i KPI.',
      en: 'Designing the procurement function operating model - structure, roles, processes and KPIs.',
    },
    longDescription: {
      pl: 'Pomagamy zaprojektować lub zredesignować model operacyjny funkcji zakupowej: strukturę organizacyjną, podział odpowiedzialności, kluczowe procesy, system mierzenia efektywności i mechanizmy governance.',
      en: 'We help design or redesign the procurement function operating model: organisational structure, responsibility split, key processes, effectiveness measurement system and governance mechanisms.',
    },
    whatItSolves: [
      { pl: 'Niejasne role i odpowiedzialności w funkcji zakupowej', en: 'Unclear roles and responsibilities in the procurement function' },
      { pl: 'Brak spójnych procesów i standardów działania', en: 'Lack of consistent processes and operating standards' },
      { pl: 'Nieprzyjęty model centralny vs. zdecentralizowany', en: 'Unresolved central vs. decentralised model' },
    ],
    outcomes: [
      { pl: 'Zaprojektowany model operacyjny gotowy do wdrożenia', en: 'Designed operating model ready for implementation' },
      { pl: 'Mapy procesów i RACI dla kluczowych obszarów', en: 'Process maps and RACI for key areas' },
      { pl: 'System KPI i rytm raportowania', en: 'KPI system and reporting cadence' },
    ],
    methodology: [
      { pl: 'Diagnoza obecnego modelu i identyfikacja luk', en: 'Diagnosis of current model and gap identification' },
      { pl: 'Benchmarki rynkowe modeli operacyjnych', en: 'Market benchmarks of operating models' },
      { pl: 'Warsztaty z interesariuszami i projektowanie docelowego stanu', en: 'Stakeholder workshops and target state design' },
      { pl: 'Roadmapa wdrożenia i plan change management', en: 'Implementation roadmap and change management plan' },
    ],
    engagement: {
      pl: 'Projekty 6-12 tygodni; połączone z diagnozą i warsztatami.',
      en: '6-12 week projects; combined with diagnosis and workshops.',
    },
    relatedCapabilities: ['procurement-transformation', 'projekty-doradcze'],
    relatedInsights: [],
    ctaLabel: { pl: 'Umów rozmowę', en: 'Schedule a conversation' },
    metadata: {
      title: { pl: 'Operating Model Design | Profitia', en: 'Operating Model Design | Profitia' },
      description: {
        pl: 'Projektowanie modelu operacyjnego funkcji zakupowej. Struktura, role, procesy i KPI.',
        en: 'Designing the procurement function operating model. Structure, roles, processes and KPIs.',
      },
    },
  },

  {
    slug: 'procurement-pmo',
    type: 'service',
    category: 'transformation',
    featured: false,
    order: 106,
    eyebrow: { pl: 'Transformacja', en: 'Transformation' },
    title: { pl: 'Procurement PMO', en: 'Procurement PMO' },
    shortDescription: {
      pl: 'Zarządzanie portfelem projektów zakupowych - governance, raportowanie i koordynacja inicjatyw.',
      en: 'Procurement project portfolio management - governance, reporting and initiative coordination.',
    },
    longDescription: {
      pl: 'Budujemy lub prowadzimy biuro zarządzania projektami zakupowymi (PMO): governance inicjatyw, śledzenie savings, koordynacja interdyscyplinarna i raportowanie dla zarządu. Dla organizacji prowadzących wiele równoległych inicjatyw zakupowych.',
      en: 'We build or run a procurement project management office (PMO): initiative governance, savings tracking, cross-functional coordination and board reporting. For organisations running multiple parallel procurement initiatives.',
    },
    whatItSolves: [
      { pl: 'Brak koordynacji i widoczności portfela inicjatyw zakupowych', en: 'No coordination or visibility of procurement initiative portfolio' },
      { pl: 'Trudności w śledzeniu savings i postępu projektów', en: 'Difficulty tracking savings and project progress' },
      { pl: 'Brak jednolitego rytmu raportowania dla zarządu', en: 'No consistent reporting cadence for management' },
    ],
    outcomes: [
      { pl: 'Pełna widoczność portfela inicjatyw zakupowych', en: 'Full visibility of procurement initiative portfolio' },
      { pl: 'Ustandaryzowany tracking savings i KPI', en: 'Standardised savings tracking and KPIs' },
      { pl: 'Governance i rytm decyzyjny dla inicjatyw zakupowych', en: 'Governance and decision cadence for procurement initiatives' },
    ],
    methodology: [
      { pl: 'Inwentaryzacja inicjatyw i wdrożenie systemu śledzenia', en: 'Initiative inventory and tracking system implementation' },
      { pl: 'Projekt rytmu raportowania i dashboardów', en: 'Reporting cadence and dashboard design' },
      { pl: 'Koordynacja interdyscyplinarna i eskalacje', en: 'Cross-functional coordination and escalations' },
    ],
    engagement: {
      pl: 'Model ongoing: od 10 dni/miesiąc; lub projekt jednorazowy wdrożenia systemu PMO.',
      en: 'Ongoing model: from 10 days/month; or one-off PMO system setup project.',
    },
    relatedCapabilities: ['procurement-transformation', 'operating-model-design'],
    relatedInsights: [],
    ctaLabel: { pl: 'Umów rozmowę', en: 'Schedule a conversation' },
    metadata: {
      title: { pl: 'Procurement PMO | Profitia', en: 'Procurement PMO | Profitia' },
      description: {
        pl: 'Zarządzanie portfelem projektów zakupowych. Governance, savings tracking i koordynacja inicjatyw.',
        en: 'Procurement project portfolio management. Governance, savings tracking and initiative coordination.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // SERVICES - Negotiation & Cost Intelligence
  // ══════════════════════════════════════════════════════════════

  {
    slug: 'analiza-spot',
    type: 'service',
    category: 'intelligence',
    featured: false,
    order: 201,
    eyebrow: { pl: 'Negocjacje', en: 'Negotiations' },
    title: { pl: 'Analiza SPOT', en: 'SPOT Analysis' },
    shortDescription: {
      pl: 'Szybka diagnoza potencjału negocjacyjnego w kluczowej kategorii - w ciągu tygodnia.',
      en: 'Fast diagnosis of negotiation potential in a key category - within one week.',
    },
    longDescription: {
      pl: 'Szybka analiza bieżącej pozycji zakupowej w wybranej kategorii lub u konkretnego dostawcy. Identyfikujemy gap między obecnymi warunkami a rynkiem, oceniamy siłę przetargową i wskazujemy najważniejsze dźwignie do natychmiastowego działania.',
      en: 'Fast analysis of the current procurement position in a selected category or with a specific supplier. We identify the gap between current terms and the market, assess bargaining power and highlight the most important levers for immediate action.',
    },
    whatItSolves: [
      { pl: 'Brak szybkiego obrazu potencjału negocjacyjnego przed rozmowami', en: 'No quick picture of negotiation potential before talks' },
      { pl: 'Niepewność, czy obecne warunki są rynkowe', en: 'Uncertainty whether current terms are market-competitive' },
      { pl: 'Potrzeba szybkiego przygotowania się do negocjacji', en: 'Need to prepare quickly for negotiations' },
    ],
    outcomes: [
      { pl: 'Ocena gap między obecnymi warunkami a rynkiem (ilościowo)', en: 'Gap assessment between current terms and market (quantified)' },
      { pl: 'Identyfikacja 3-5 kluczowych dźwigni negocjacyjnych', en: 'Identification of 3-5 key negotiation levers' },
      { pl: 'Rekomendacja kolejnych kroków', en: 'Next steps recommendation' },
    ],
    methodology: [
      { pl: 'Analiza danych transakcyjnych i warunków umów', en: 'Transactional data and contract terms analysis' },
      { pl: 'Benchmarki rynkowe w kategorii', en: 'Market benchmarks in the category' },
      { pl: 'Ocena siły przetargowej i zależności', en: 'Bargaining power and dependency assessment' },
    ],
    engagement: {
      pl: 'Format 5-10 dni roboczych; raport i prezentacja wyników.',
      en: '5-10 working day format; report and results presentation.',
    },
    relatedCapabilities: ['should-cost-analysis', 'negotiation-preparation', 'projekty-doradcze'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zamów analizę', en: 'Order analysis' },
    metadata: {
      title: { pl: 'Analiza SPOT | Profitia', en: 'SPOT Analysis | Profitia' },
      description: {
        pl: 'Szybka diagnoza potencjału negocjacyjnego w kategorii. W ciągu tygodnia.',
        en: 'Fast diagnosis of negotiation potential in a category. Within one week.',
      },
    },
  },

  {
    slug: 'should-cost-analysis',
    type: 'service',
    category: 'intelligence',
    featured: true,
    order: 202,
    eyebrow: { pl: 'Cost Intelligence', en: 'Cost Intelligence' },
    title: { pl: 'Should-Cost Analysis', en: 'Should-Cost Analysis' },
    shortDescription: {
      pl: 'Ile powinien kosztować produkt lub usługa - zbudowana od fundamentów kosztowych, nie ceny ofertowej.',
      en: 'What a product or service should cost - built from cost fundamentals, not the quoted price.',
    },
    longDescription: {
      pl: 'Modelujemy strukturę kosztów dostawcy: materiały, praca, overhead, marża. Pokazujemy, ile powinien kosztować produkt lub usługa na podstawie rzeczywistych czynników kosztowych - nie ceny, którą zaproponował dostawca. Fundament każdej negocjacji opartej na faktach.',
      en: 'We model the supplier\'s cost structure: materials, labour, overhead, margin. We show what a product or service should cost based on real cost drivers - not the price the supplier quoted. The foundation of any fact-based negotiation.',
    },
    whatItSolves: [
      { pl: 'Negocjacje bez znajomości rzeczywistej struktury kosztów dostawcy', en: 'Negotiations without knowledge of the supplier\'s real cost structure' },
      { pl: 'Brak argumentacji przy odrzucaniu podwyżek cen', en: 'No argumentation for rejecting price increases' },
      { pl: 'Niepewność, czy ceny są uczciwe wobec struktury rynku', en: 'Uncertainty whether prices are fair against market structure' },
    ],
    outcomes: [
      { pl: 'Model kosztowy produktu/usługi z rozbiciem na składowe', en: 'Product/service cost model broken down by components' },
      { pl: 'Rynkowy "powinien kosztować" jako punkt odniesienia negocjacji', en: 'Market "should cost" as a negotiation reference point' },
      { pl: 'Scenariusze negocjacyjne i zalecana pozycja startowa', en: 'Negotiation scenarios and recommended opening position' },
    ],
    methodology: [
      { pl: 'Inwentaryzacja składowych kosztu produktu/usługi', en: 'Inventory of product/service cost components' },
      { pl: 'Analiza rynkowych cen surowców, pracy i overheadów', en: 'Market analysis of raw material, labour and overhead prices' },
      { pl: 'Modelowanie struktury kosztów i kalkulacja should-cost', en: 'Cost structure modelling and should-cost calculation' },
      { pl: 'Opracowanie argumentacji i scenariuszy negocjacyjnych', en: 'Negotiation argumentation and scenario development' },
    ],
    engagement: {
      pl: 'Analiza 1-3 tygodnie na kategorię; model Excelowy z dokumentacją metodologii.',
      en: '1-3 week analysis per category; Excel model with methodology documentation.',
    },
    relatedCapabilities: ['analiza-spot', 'negotiation-preparation', 'supplier-benchmarking'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zamów analizę', en: 'Order analysis' },
    metadata: {
      title: { pl: 'Should-Cost Analysis | Profitia', en: 'Should-Cost Analysis | Profitia' },
      description: {
        pl: 'Ile powinien kosztować produkt lub usługa. Analiza struktury kosztów dostawcy jako fundament negocjacji.',
        en: 'What a product or service should cost. Supplier cost structure analysis as the foundation for negotiation.',
      },
    },
  },

  {
    slug: 'negotiation-preparation',
    type: 'service',
    category: 'negotiations',
    featured: true,
    order: 203,
    eyebrow: { pl: 'Negocjacje', en: 'Negotiations' },
    title: { pl: 'Negotiation Preparation', en: 'Negotiation Preparation' },
    shortDescription: {
      pl: 'Strategia, argumentacja i pozycja negocjacyjna przygotowane przed każdą ważną rozmową z dostawcą.',
      en: 'Strategy, argumentation and negotiation position prepared before every important supplier conversation.',
    },
    longDescription: {
      pl: 'Pomagamy przygotować każdą ważną negocjację zakupową: definiujemy cel, budujemy argumentację, przygotowujemy BATNA, modelujemy scenariusze i trenujemy zespół. Efektem jest pewność, że na salę negocjacyjną wchodzisz z przewagą informacyjną.',
      en: 'We help prepare every important procurement negotiation: defining the goal, building argumentation, preparing BATNA, modelling scenarios and training the team. The result is confidence that you enter the negotiation room with an information advantage.',
    },
    whatItSolves: [
      { pl: 'Niedostateczne przygotowanie do kluczowych negocjacji z dostawcami', en: 'Insufficient preparation for key supplier negotiations' },
      { pl: 'Brak struktury negocjacyjnej i jasnego celu rozmów', en: 'No negotiation structure and clear conversation goal' },
      { pl: 'Słaba pozycja wobec dobrze przygotowanych reprezentantów dostawcy', en: 'Weak position against well-prepared supplier representatives' },
    ],
    outcomes: [
      { pl: 'Pełna strategia negocjacyjna z celami i granicami ustępstw', en: 'Complete negotiation strategy with goals and concession limits' },
      { pl: 'Argumentacja faktualna i BATNA dla każdej strony', en: 'Factual argumentation and BATNA for each side' },
      { pl: 'Przećwiczony scenariusz rozmowy i gotowy do wejścia zespół', en: 'Practised conversation scenario and team ready to enter' },
    ],
    methodology: [
      { pl: 'Analiza bieżącej pozycji i punktu wyjścia dostawcy', en: 'Current position analysis and supplier starting point' },
      { pl: 'Definicja celów, BATNA i minimalnych wymagań', en: 'Goals, BATNA and minimum requirements definition' },
      { pl: 'Budowa argumentacji i kontrargumentacji', en: 'Argumentation and counter-argumentation build' },
      { pl: 'Symulacja negocjacyjna i debrief', en: 'Negotiation simulation and debrief' },
    ],
    engagement: {
      pl: 'Format 1-5 dni; warsztaty przygotowawcze i sesja symulacyjna.',
      en: '1-5 day format; preparation workshops and simulation session.',
    },
    relatedCapabilities: ['should-cost-analysis', 'analiza-spot', 'supplier-negotiation-support'],
    relatedInsights: [],
    ctaLabel: { pl: 'Przygotujmy rozmowę', en: 'Let\'s prepare the conversation' },
    metadata: {
      title: { pl: 'Przygotowanie Negocjacji | Profitia', en: 'Negotiation Preparation | Profitia' },
      description: {
        pl: 'Strategia i argumentacja przed każdą ważną negocjacją zakupową. Wejdź na salę z przewagą informacyjną.',
        en: 'Strategy and argumentation before every important procurement negotiation. Enter the room with an information advantage.',
      },
    },
  },

  {
    slug: 'supplier-benchmarking',
    type: 'service',
    category: 'intelligence',
    featured: false,
    order: 204,
    eyebrow: { pl: 'Intelligence', en: 'Intelligence' },
    title: { pl: 'Supplier Benchmarking', en: 'Supplier Benchmarking' },
    shortDescription: {
      pl: 'Porównanie Twoich warunków z rynkiem - żebyś wiedział, gdzie stoisz i o ile możesz poprawić.',
      en: 'Comparison of your terms against the market - so you know where you stand and how much you can improve.',
    },
    longDescription: {
      pl: 'Dostarczamy zewnętrzne benchmarki dla kluczowych kategorii i dostawców: ceny rynkowe, warunki płatności, poziom usług, warunki umów. Dane, które pozwalają ocenić, czy Twoje obecne warunki są rynkowe i gdzie jest przestrzeń do poprawy.',
      en: 'We provide external benchmarks for key categories and suppliers: market prices, payment terms, service levels, contract conditions. Data that lets you assess whether your current terms are market-competitive and where there is room to improve.',
    },
    whatItSolves: [
      { pl: 'Brak zewnętrznych benchmarków dla oceny warunków zakupowych', en: 'No external benchmarks for assessing procurement terms' },
      { pl: 'Ryzyko przepłacania bez możliwości weryfikacji', en: 'Risk of overpaying without ability to verify' },
      { pl: 'Słaba pozycja w negocjacjach bez danych rynkowych', en: 'Weak negotiation position without market data' },
    ],
    outcomes: [
      { pl: 'Raport benchmarkowy z pozycją vs. rynek w każdej kategorii', en: 'Benchmark report with position vs. market in each category' },
      { pl: 'Ilościowa ocena gap i potencjału negocjacyjnego', en: 'Quantified gap assessment and negotiation potential' },
      { pl: 'Rekomendacje priorytetów i kolejnych kroków', en: 'Priority recommendations and next steps' },
    ],
    methodology: [
      { pl: 'Zbieranie danych rynkowych ze źródeł branżowych i własnych', en: 'Market data collection from industry and proprietary sources' },
      { pl: 'Porównanie z warunkami klienta', en: 'Comparison with client terms' },
      { pl: 'Raport z oceną pozycji i rekomendacjami', en: 'Report with position assessment and recommendations' },
    ],
    engagement: {
      pl: 'Analiza 2-4 tygodnie; raport benchmarkowy dla 1-5 kategorii.',
      en: '2-4 week analysis; benchmark report for 1-5 categories.',
    },
    relatedCapabilities: ['should-cost-analysis', 'analiza-spot', 'negotiation-preparation'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zamów benchmarking', en: 'Order benchmarking' },
    metadata: {
      title: { pl: 'Supplier Benchmarking | Profitia', en: 'Supplier Benchmarking | Profitia' },
      description: {
        pl: 'Zewnętrzne benchmarki warunków zakupowych. Dowiedz się, gdzie stoisz wobec rynku.',
        en: 'External procurement terms benchmarks. Find out where you stand against the market.',
      },
    },
  },

  {
    slug: 'supplier-negotiation-support',
    type: 'service',
    category: 'negotiations',
    featured: false,
    order: 205,
    eyebrow: { pl: 'Negocjacje', en: 'Negotiations' },
    title: { pl: 'Supplier Negotiation Support', en: 'Supplier Negotiation Support' },
    shortDescription: {
      pl: 'Bezpośrednie wsparcie w negocjacjach z dostawcami - jako ekspert lub obserwator z debrief.',
      en: 'Direct support in supplier negotiations - as an expert or observer with debrief.',
    },
    longDescription: {
      pl: 'Wspieramy Twój zespół bezpośrednio podczas negocjacji z dostawcami - w roli eksperta przy stole lub jako obserwator z debrief po zakończeniu rozmów. Dostarczamy zarówno merytoryczne wsparcie argumentacyjne, jak i coaching negocjacyjny na żywo.',
      en: 'We support your team directly during supplier negotiations - as an expert at the table or as an observer with a post-session debrief. We provide both substantive argumentation support and live negotiation coaching.',
    },
    whatItSolves: [
      { pl: 'Brak doświadczonego negocjatora po stronie kupującego', en: 'No experienced negotiator on the buyer\'s side' },
      { pl: 'Asymetria doświadczenia negocjacyjnego na korzyść dostawcy', en: 'Negotiation experience asymmetry in favour of the supplier' },
      { pl: 'Potrzeba rozwinięcia umiejętności negocjacyjnych zespołu', en: 'Need to develop team negotiation skills' },
    ],
    outcomes: [
      { pl: 'Lepszy wynik negocjacji niż bez wsparcia zewnętrznego', en: 'Better negotiation outcome than without external support' },
      { pl: 'Transfer umiejętności i technik do zespołu', en: 'Skills and techniques transfer to the team' },
      { pl: 'Protokół negocjacji i plan follow-up', en: 'Negotiation minutes and follow-up plan' },
    ],
    methodology: [
      { pl: 'Sesja przygotowawcza z zespołem przed negocjacjami', en: 'Pre-negotiation preparation session with the team' },
      { pl: 'Bezpośrednie wsparcie podczas negocjacji', en: 'Direct support during negotiations' },
      { pl: 'Debrief i coaching po zakończeniu', en: 'Debrief and coaching after completion' },
    ],
    engagement: {
      pl: 'Format per negocjacja; możliwe zaangażowanie serii.',
      en: 'Per-negotiation format; series engagement possible.',
    },
    relatedCapabilities: ['negotiation-preparation', 'should-cost-analysis', 'analiza-spot'],
    relatedInsights: [],
    ctaLabel: { pl: 'Porozmawiajmy', en: 'Let\'s talk' },
    metadata: {
      title: { pl: 'Wsparcie Negocjacyjne | Profitia', en: 'Supplier Negotiation Support | Profitia' },
      description: {
        pl: 'Bezpośrednie wsparcie w negocjacjach z dostawcami. Ekspert przy stole lub coaching na żywo.',
        en: 'Direct support in supplier negotiations. Expert at the table or live coaching.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // SERVICES - Data & Analytics
  // ══════════════════════════════════════════════════════════════

  {
    slug: 'spend-cube',
    type: 'service',
    category: 'analytics',
    featured: true,
    order: 301,
    eyebrow: { pl: 'Analityka', en: 'Analytics' },
    title: { pl: 'Spend Cube', en: 'Spend Cube' },
    shortDescription: {
      pl: 'Kompletny obraz wydatków Twojej organizacji - skategoryzowany, analizowalny i gotowy do decyzji.',
      en: 'A complete picture of your organisation\'s spending - categorised, analysable and decision-ready.',
    },
    longDescription: {
      pl: 'Budujemy spend cube: pełen obraz wydatków organizacji z podziałem na kategorie, dostawców, jednostki organizacyjne i okresy. Dane oczyszczone, skategoryzowane i załadowane do środowiska analitycznego - gotowe do identyfikacji potencjału oszczędnościowego.',
      en: 'We build a spend cube: a complete picture of organisational spending broken down by category, supplier, organisational unit and period. Data cleaned, categorised and loaded into an analytical environment - ready for savings potential identification.',
    },
    whatItSolves: [
      { pl: 'Brak widoczności struktury wydatków i kluczowych dostawców', en: 'No visibility of spend structure and key suppliers' },
      { pl: 'Dane zakupowe w wielu systemach bez integracji', en: 'Procurement data in multiple systems without integration' },
      { pl: 'Niemożność identyfikacji potencjału oszczędnościowego bez danych', en: 'Inability to identify savings potential without data' },
    ],
    outcomes: [
      { pl: 'Skategoryzowana baza wydatków dla całej organizacji', en: 'Categorised spend database for the entire organisation' },
      { pl: 'Top dostawcy, kategorie i jednostki - w jednym widoku', en: 'Top suppliers, categories and units - in a single view' },
      { pl: 'Gotowe dane do analizy i decyzji zakupowych', en: 'Data ready for procurement analysis and decisions' },
    ],
    methodology: [
      { pl: 'Ekstrakcja danych z systemów źródłowych (ERP, finanse)', en: 'Data extraction from source systems (ERP, finance)' },
      { pl: 'Oczyszczanie, normalizacja i deduplikacja', en: 'Cleaning, normalisation and deduplication' },
      { pl: 'Kategoryzacja wg hierarchii zakupowej', en: 'Categorisation according to procurement hierarchy' },
      { pl: 'Załadowanie do środowiska analitycznego i budowa widoków', en: 'Loading to analytical environment and view construction' },
    ],
    engagement: {
      pl: 'Projekt 4-8 tygodni; jednorazowy lub w modelu recurring (quarterly refresh).',
      en: '4-8 week project; one-off or recurring model (quarterly refresh).',
    },
    relatedCapabilities: ['spend-analytics', 'procurement-dashboards', 'category-strategy'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zamów Spend Cube', en: 'Order Spend Cube' },
    metadata: {
      title: { pl: 'Spend Cube | Profitia', en: 'Spend Cube | Profitia' },
      description: {
        pl: 'Kompletny obraz wydatków organizacji. Skategoryzowany, analizowalny i gotowy do decyzji zakupowych.',
        en: 'A complete picture of organisational spending. Categorised, analysable and decision-ready.',
      },
    },
  },

  {
    slug: 'spend-analytics',
    type: 'service',
    category: 'analytics',
    featured: false,
    order: 302,
    eyebrow: { pl: 'Analityka', en: 'Analytics' },
    title: { pl: 'Spend Analytics', en: 'Spend Analytics' },
    shortDescription: {
      pl: 'Analiza wzorców wydatków, trendów i anomalii - od danych do rekomendacji zakupowych.',
      en: 'Analysis of spending patterns, trends and anomalies - from data to procurement recommendations.',
    },
    longDescription: {
      pl: 'Na bazie danych zakupowych przeprowadzamy kompleksową analizę spend: wzorce wydatków, trendy, anomalie, koncentracja dostawców, okazje do konsolidacji. Każda analiza kończy się konkretnymi rekomendacjami dla funkcji zakupowej.',
      en: 'Based on procurement data, we conduct comprehensive spend analysis: spending patterns, trends, anomalies, supplier concentration, consolidation opportunities. Every analysis ends with specific recommendations for the procurement function.',
    },
    whatItSolves: [
      { pl: 'Dane istnieją, ale nie są analizowane w sposób decyzyjny', en: 'Data exists but is not analysed in a decision-making way' },
      { pl: 'Brak identyfikacji anomalii i outlierów w wydatkach', en: 'No identification of anomalies and outliers in spending' },
      { pl: 'Brak rekomendacji opartych na danych dla priorytetów zakupowych', en: 'No data-driven recommendations for procurement priorities' },
    ],
    outcomes: [
      { pl: 'Pełna analiza wzorców i trendów wydatków', en: 'Complete analysis of spending patterns and trends' },
      { pl: 'Lista anomalii, outlierów i obszarów do wyjaśnienia', en: 'List of anomalies, outliers and areas requiring explanation' },
      { pl: 'Priorytety zakupowe z potencjałem i rekomendowanymi działaniami', en: 'Procurement priorities with potential and recommended actions' },
    ],
    methodology: [
      { pl: 'Przetworzenie i analiza danych zakupowych', en: 'Processing and analysis of procurement data' },
      { pl: 'Segmentacja dostawców i kategorii', en: 'Supplier and category segmentation' },
      { pl: 'Identyfikacja okazji i priorytetów', en: 'Opportunity and priority identification' },
      { pl: 'Raport rekomendacyjny i prezentacja', en: 'Recommendation report and presentation' },
    ],
    engagement: {
      pl: 'Analiza 2-4 tygodnie; raport + prezentacja wyników z rekomendacjami.',
      en: '2-4 week analysis; report + results presentation with recommendations.',
    },
    relatedCapabilities: ['spend-cube', 'procurement-dashboards', 'supplier-intelligence'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zamów analizę', en: 'Order analysis' },
    metadata: {
      title: { pl: 'Spend Analytics | Profitia', en: 'Spend Analytics | Profitia' },
      description: {
        pl: 'Analiza wzorców wydatków i rekomendacje zakupowe. Od danych do decyzji.',
        en: 'Spending pattern analysis and procurement recommendations. From data to decisions.',
      },
    },
  },

  {
    slug: 'procurement-dashboards',
    type: 'service',
    category: 'analytics',
    featured: false,
    order: 303,
    eyebrow: { pl: 'Analityka', en: 'Analytics' },
    title: { pl: 'Procurement Dashboards', en: 'Procurement Dashboards' },
    shortDescription: {
      pl: 'Dashboardy zakupowe - widoczność kluczowych wskaźników w czasie rzeczywistym.',
      en: 'Procurement dashboards - visibility of key metrics in real time.',
    },
    longDescription: {
      pl: 'Projektujemy i budujemy dashboardy zakupowe: systemy KPI, widoki dla zarządu, raporty operacyjne dla kupców. Narzędzia, które dają funkcji zakupowej pełną widoczność działań i wyników w jednym miejscu.',
      en: 'We design and build procurement dashboards: KPI systems, board views, operational reports for buyers. Tools that give the procurement function full visibility of actions and results in one place.',
    },
    whatItSolves: [
      { pl: 'Brak bieżącej widoczności kluczowych wskaźników zakupowych', en: 'No real-time visibility of key procurement metrics' },
      { pl: 'Ręczne przygotowywanie raportów dla zarządu co miesiąc', en: 'Manual report preparation for management every month' },
      { pl: 'Brak narzędzi do monitorowania savings i efektywności', en: 'No tools for monitoring savings and effectiveness' },
    ],
    outcomes: [
      { pl: 'System dashboardów gotowy do użycia przez cały zespół', en: 'Dashboard system ready for use by the entire team' },
      { pl: 'Automatyczne raporty zamiast ręcznej pracy', en: 'Automatic reports instead of manual work' },
      { pl: 'Pełna widoczność KPI zakupowych w czasie rzeczywistym', en: 'Full real-time visibility of procurement KPIs' },
    ],
    methodology: [
      { pl: 'Definicja KPI i wymagań analitycznych', en: 'KPI definition and analytical requirements' },
      { pl: 'Projekt UX i walidacja z użytkownikami', en: 'UX design and user validation' },
      { pl: 'Podłączenie źródeł danych i budowa dashboardów', en: 'Data source connection and dashboard build' },
      { pl: 'Wdrożenie i szkolenie zespołu', en: 'Implementation and team training' },
    ],
    engagement: {
      pl: 'Projekt 4-10 tygodni; zależnie od dostępności źródeł danych i zakresu.',
      en: '4-10 week project; depending on data source availability and scope.',
    },
    relatedCapabilities: ['spend-cube', 'procurement-kpi-systems', 'spend-analytics'],
    relatedInsights: [],
    ctaLabel: { pl: 'Porozmawiajmy', en: 'Let\'s talk' },
    metadata: {
      title: { pl: 'Procurement Dashboards | Profitia', en: 'Procurement Dashboards | Profitia' },
      description: {
        pl: 'Dashboardy zakupowe i systemy KPI. Widoczność wyników funkcji zakupowej w czasie rzeczywistym.',
        en: 'Procurement dashboards and KPI systems. Real-time visibility of procurement function results.',
      },
    },
  },

  {
    slug: 'supplier-intelligence',
    type: 'service',
    category: 'intelligence',
    featured: false,
    order: 304,
    eyebrow: { pl: 'Intelligence', en: 'Intelligence' },
    title: { pl: 'Supplier Intelligence', en: 'Supplier Intelligence' },
    shortDescription: {
      pl: 'Dogłębna analiza kondycji, strategii i pozycji rynkowej kluczowych dostawców.',
      en: 'In-depth analysis of the financial health, strategy and market position of key suppliers.',
    },
    longDescription: {
      pl: 'Przeprowadzamy dogłębną analizę kluczowych dostawców: kondycja finansowa, pozycja rynkowa, strategia, ryzyko operacyjne, alternatywne źródła. Informacje, które pozwalają ocenić siłę przetargową i ryzyko przed każdą ważną negocjacją.',
      en: 'We conduct in-depth analysis of key suppliers: financial health, market position, strategy, operational risk, alternative sources. Information that allows you to assess bargaining power and risk before every important negotiation.',
    },
    whatItSolves: [
      { pl: 'Negocjowanie z dostawcą bez znajomości jego sytuacji finansowej', en: 'Negotiating with a supplier without knowing their financial situation' },
      { pl: 'Brak oceny ryzyka koncentracji u kluczowych dostawców', en: 'No concentration risk assessment for key suppliers' },
      { pl: 'Nieznane alternatywne źródła dostaw w kategorii', en: 'Unknown alternative supply sources in the category' },
    ],
    outcomes: [
      { pl: 'Profil dostawcy z oceną finansową i rynkową', en: 'Supplier profile with financial and market assessment' },
      { pl: 'Ocena ryzyka i rekomendacja pozycji negocjacyjnej', en: 'Risk assessment and negotiation position recommendation' },
      { pl: 'Mapa alternatywnych dostawców w kategorii', en: 'Map of alternative suppliers in the category' },
    ],
    methodology: [
      { pl: 'Analiza sprawozdań finansowych i kondycji dostawcy', en: 'Analysis of supplier financial statements and health' },
      { pl: 'Badanie pozycji rynkowej i trendów branżowych', en: 'Market position and industry trend research' },
      { pl: 'Identyfikacja alternatywnych źródeł i ich ocena', en: 'Alternative source identification and assessment' },
    ],
    engagement: {
      pl: 'Profil na dostawcę 1-2 tygodnie; możliwe zaangażowanie portfelowe.',
      en: '1-2 weeks per supplier profile; portfolio engagement possible.',
    },
    relatedCapabilities: ['should-cost-analysis', 'supplier-benchmarking', 'spend-analytics'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zamów analizę', en: 'Order analysis' },
    metadata: {
      title: { pl: 'Supplier Intelligence | Profitia', en: 'Supplier Intelligence | Profitia' },
      description: {
        pl: 'Dogłębna analiza kluczowych dostawców. Kondycja finansowa, ryzyko i pozycja rynkowa.',
        en: 'In-depth analysis of key suppliers. Financial health, risk and market position.',
      },
    },
  },

  {
    slug: 'procurement-kpi-systems',
    type: 'service',
    category: 'analytics',
    featured: false,
    order: 305,
    eyebrow: { pl: 'Analityka', en: 'Analytics' },
    title: { pl: 'Procurement KPI Systems', en: 'Procurement KPI Systems' },
    shortDescription: {
      pl: 'Projektowanie i wdrożenie systemu KPI dla funkcji zakupowej.',
      en: 'Design and implementation of a KPI system for the procurement function.',
    },
    longDescription: {
      pl: 'Pomagamy zaprojektować i wdrożyć system mierzenia efektywności funkcji zakupowej: wybór wskaźników, metodologia liczenia, progi i cele, rytm raportowania. System, który łączy operacyjną codzienność zakupów z wymogami zarządu.',
      en: 'We help design and implement a procurement function effectiveness measurement system: metric selection, calculation methodology, thresholds and targets, reporting cadence. A system that connects the operational day-to-day of procurement with management requirements.',
    },
    whatItSolves: [
      { pl: 'Brak systemu mierzenia efektywności funkcji zakupowej', en: 'No system for measuring procurement function effectiveness' },
      { pl: 'Trudności w raportowaniu wartości zakupów dla zarządu', en: 'Difficulty reporting procurement value to management' },
      { pl: 'Niezdefiniowane cele i progi wydajności dla kupców', en: 'Undefined performance goals and thresholds for buyers' },
    ],
    outcomes: [
      { pl: 'Zdefiniowany zestaw KPI z metodologią liczenia', en: 'Defined KPI set with calculation methodology' },
      { pl: 'Cele i progi dla każdego wskaźnika', en: 'Goals and thresholds for each metric' },
      { pl: 'Rytm raportowania i szablony raportów', en: 'Reporting cadence and report templates' },
    ],
    methodology: [
      { pl: 'Warsztaty definicji KPI z interesariuszami', en: 'KPI definition workshops with stakeholders' },
      { pl: 'Projekt metodologii i kalibracja celów', en: 'Methodology design and goal calibration' },
      { pl: 'Wdrożenie systemu i szkolenie zespołu', en: 'System implementation and team training' },
    ],
    engagement: {
      pl: 'Projekt 3-6 tygodni; warsztaty + dokumentacja + wdrożenie.',
      en: '3-6 week project; workshops + documentation + implementation.',
    },
    relatedCapabilities: ['procurement-dashboards', 'operating-model-design', 'spend-analytics'],
    relatedInsights: [],
    ctaLabel: { pl: 'Porozmawiajmy', en: 'Let\'s talk' },
    metadata: {
      title: { pl: 'Procurement KPI Systems | Profitia', en: 'Procurement KPI Systems | Profitia' },
      description: {
        pl: 'System KPI dla funkcji zakupowej. Mierzenie efektywności, cele i rytm raportowania.',
        en: 'KPI system for the procurement function. Effectiveness measurement, goals and reporting cadence.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // SERVICES - Capability Development
  // ══════════════════════════════════════════════════════════════

  {
    slug: 'coaching-zakupowy',
    type: 'service',
    category: 'coaching',
    featured: false,
    order: 401,
    eyebrow: { pl: 'Coaching', en: 'Coaching' },
    title: { pl: 'Coaching Zakupowy', en: 'Procurement Coaching' },
    shortDescription: {
      pl: 'Indywidualny coaching dla kupców i dyrektorów zakupów - praktyczny, zorientowany na wyniki.',
      en: 'Individual coaching for buyers and procurement directors - practical, results-oriented.',
    },
    longDescription: {
      pl: 'Coaching indywidualny dla kupców i liderów funkcji zakupowej. Pracujemy nad konkretnymi wyzwaniami: negocjacje, zarządzanie dostawcami, komunikacja z zarządem, budowanie autorytetu zakupów w organizacji.',
      en: 'Individual coaching for buyers and procurement function leaders. We work on specific challenges: negotiations, supplier management, management communication, building procurement authority in the organisation.',
    },
    whatItSolves: [
      { pl: 'Stagnacja w rozwoju zawodowym kupca lub dyrektora zakupów', en: 'Stagnation in professional development of a buyer or procurement director' },
      { pl: 'Konkretne wyzwania negocjacyjne lub relacyjne wymagające wsparcia', en: 'Specific negotiation or relationship challenges requiring support' },
      { pl: 'Przygotowanie do awansu lub nowej roli w zakupach', en: 'Preparation for promotion or new procurement role' },
    ],
    outcomes: [
      { pl: 'Konkretne umiejętności i nawyki rozwinięte w ciągu programu', en: 'Specific skills and habits developed throughout the programme' },
      { pl: 'Rozwiązanie zidentyfikowanych wyzwań z planem działania', en: 'Identified challenges resolved with action plan' },
      { pl: 'Większa pewność i skuteczność w roli zakupowej', en: 'Greater confidence and effectiveness in the procurement role' },
    ],
    methodology: [
      { pl: 'Diagnoza - identyfikacja celów i wyzwań', en: 'Diagnosis - goal and challenge identification' },
      { pl: 'Regularne sesje (45-90 minut, co 2 tygodnie)', en: 'Regular sessions (45-90 minutes, every 2 weeks)' },
      { pl: 'Praca między sesjami - zadania i eksperymenty', en: 'Between-session work - assignments and experiments' },
      { pl: 'Ewaluacja postępów i korekta kursu', en: 'Progress evaluation and course correction' },
    ],
    engagement: {
      pl: 'Program 3-6 miesięcy; 6-12 sesji indywidualnych.',
      en: '3-6 month programme; 6-12 individual sessions.',
    },
    relatedCapabilities: ['negotiation-preparation', 'warsztaty-negocjacyjne', 'akademia-zakupow'],
    relatedInsights: [],
    ctaLabel: { pl: 'Porozmawiajmy o coachingu', en: 'Talk about coaching' },
    metadata: {
      title: { pl: 'Coaching Zakupowy | Profitia', en: 'Procurement Coaching | Profitia' },
      description: {
        pl: 'Indywidualny coaching dla kupców i liderów zakupów. Praktyczny, zorientowany na konkretne wyniki.',
        en: 'Individual coaching for buyers and procurement leaders. Practical, results-oriented.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // EDUCATION - Executive Programmes
  // ══════════════════════════════════════════════════════════════

  {
    slug: 'akademia-zakupow',
    type: 'education',
    category: 'executive-education',
    featured: true,
    order: 501,
    eyebrow: { pl: 'Program Executive', en: 'Executive Programme' },
    title: { pl: 'Akademia Zakupów', en: 'Procurement Academy' },
    shortDescription: {
      pl: 'Kompleksowy program kompetencji zakupowych - od strategii kategorii po zarządzanie dostawcami.',
      en: 'A comprehensive procurement competency programme - from category strategy to supplier management.',
    },
    longDescription: {
      pl: 'Akademia Zakupów to wielomodułowy program rozwijający kompetencje zakupowe na poziomie strategicznym i operacyjnym. Obejmuje strategie zakupowe, zarządzanie kategoriami, negocjacje oparte na faktach, zarządzanie dostawcami i analitykę zakupową.',
      en: 'Procurement Academy is a multi-module programme developing procurement competencies at strategic and operational level. It covers procurement strategies, category management, fact-based negotiations, supplier management and procurement analytics.',
    },
    whatItSolves: [
      { pl: 'Niejednolity poziom kompetencji w zespole zakupowym', en: 'Inconsistent competency levels within the procurement team' },
      { pl: 'Brak struktury rozwoju dla kupców na różnych poziomach', en: 'No development structure for buyers at different levels' },
      { pl: 'Potrzeba kompleksowego podniesienia kompetencji organizacji zakupowej', en: 'Need for comprehensive competency uplift of the procurement organisation' },
    ],
    outcomes: [
      { pl: 'Ujednolicony poziom kompetencji zakupowych w zespole', en: 'Unified procurement competency level across the team' },
      { pl: 'Praktyczne umiejętności z natychmiastowym zastosowaniem', en: 'Practical skills with immediate application' },
      { pl: 'Certyfikat uczestnictwa i ścieżka dalszego rozwoju', en: 'Participation certificate and further development path' },
    ],
    methodology: [
      { pl: 'Diagnoza startowa kompetencji uczestników', en: 'Starting competency diagnosis of participants' },
      { pl: 'Moduły tematyczne z case studies i ćwiczeniami', en: 'Thematic modules with case studies and exercises' },
      { pl: 'Projekty grupowe na realnych danych', en: 'Group projects on real data' },
      { pl: 'Ewaluacja i ścieżka certyfikacji', en: 'Evaluation and certification path' },
    ],
    engagement: {
      pl: 'Program 4-8 modułów; w trybie in-company lub otwartym; stacjonarnie lub online.',
      en: '4-8 module programme; in-company or open format; in-person or online.',
    },
    relatedCapabilities: ['procurement-excellence', 'coaching-zakupowy', 'strategic-sourcing'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zapytaj o program', en: 'Ask about the programme' },
    metadata: {
      title: { pl: 'Akademia Zakupów | Profitia', en: 'Procurement Academy | Profitia' },
      description: {
        pl: 'Wielomodułowy program kompetencji zakupowych. Strategia kategorii, negocjacje, zarządzanie dostawcami.',
        en: 'Multi-module procurement competency programme. Category strategy, negotiations, supplier management.',
      },
    },
  },

  {
    slug: 'procurement-excellence',
    type: 'education',
    category: 'executive-education',
    featured: false,
    order: 502,
    eyebrow: { pl: 'Program Executive', en: 'Executive Programme' },
    title: { pl: 'Procurement Excellence', en: 'Procurement Excellence' },
    shortDescription: {
      pl: 'Program dla dojrzałych organizacji zakupowych - doskonałość operacyjna i przewaga strategiczna.',
      en: 'A programme for mature procurement organisations - operational excellence and strategic advantage.',
    },
    longDescription: {
      pl: 'Zaawansowany program dla doświadczonych kupców i liderów zakupowych. Skupia się na osiągnięciu i utrzymaniu doskonałości operacyjnej: advanced category management, strategic cost management, procurement governance i przywództwo zakupowe.',
      en: 'Advanced programme for experienced buyers and procurement leaders. Focuses on achieving and maintaining operational excellence: advanced category management, strategic cost management, procurement governance and procurement leadership.',
    },
    whatItSolves: [
      { pl: 'Plateau w rozwoju doświadczonych kupców i liderów', en: 'Plateau in the development of experienced buyers and leaders' },
      { pl: 'Potrzeba przesunięcia na poziom strategic partner dla biznesu', en: 'Need to shift to strategic partner level for the business' },
      { pl: 'Przygotowanie do roli CPO lub VP Procurement', en: 'Preparation for CPO or VP Procurement role' },
    ],
    outcomes: [
      { pl: 'Zaawansowane umiejętności strategiczne i przywódcze', en: 'Advanced strategic and leadership skills' },
      { pl: 'Przygotowanie do roli C-suite w funkcji zakupowej', en: 'Preparation for C-suite role in the procurement function' },
      { pl: 'Sieć kontaktów z liderami zakupowymi', en: 'Network of contacts with procurement leaders' },
    ],
    methodology: [
      { pl: 'Zaawansowane warsztaty i studia przypadków', en: 'Advanced workshops and case studies' },
      { pl: 'Mentorat ze starszym praktykiem zakupowym', en: 'Mentoring from a senior procurement practitioner' },
      { pl: 'Projekt końcowy aplikowany do własnej organizacji', en: 'Final project applied to own organisation' },
    ],
    engagement: {
      pl: 'Program 6 miesięcy; mieszany format warsztatowy i mentorski.',
      en: '6-month programme; mixed workshop and mentoring format.',
    },
    relatedCapabilities: ['akademia-zakupow', 'coaching-zakupowy', 'strategic-sourcing'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zapytaj o program', en: 'Ask about the programme' },
    metadata: {
      title: { pl: 'Procurement Excellence | Profitia', en: 'Procurement Excellence | Profitia' },
      description: {
        pl: 'Zaawansowany program dla doświadczonych kupców i liderów. Doskonałość operacyjna i przewaga strategiczna.',
        en: 'Advanced programme for experienced buyers and leaders. Operational excellence and strategic advantage.',
      },
    },
  },

  {
    slug: 'strategic-sourcing',
    type: 'education',
    category: 'executive-education',
    featured: false,
    order: 503,
    eyebrow: { pl: 'Program Executive', en: 'Executive Programme' },
    title: { pl: 'Strategic Sourcing', en: 'Strategic Sourcing' },
    shortDescription: {
      pl: 'Jak zbudować strategię sourcingową dla złożonych kategorii - od analizy rynku po wybór dostawcy.',
      en: 'How to build a sourcing strategy for complex categories - from market analysis to supplier selection.',
    },
    longDescription: {
      pl: 'Program skupiony na umiejętności budowania i realizowania strategii sourcingowej. Uczymy systematycznego podejścia do wyboru dostawców: od analizy kategorii i rynku, przez RFP i ewaluację, po decyzję i onboarding nowego dostawcy.',
      en: 'Programme focused on building and executing sourcing strategy. We teach a systematic approach to supplier selection: from category and market analysis, through RFP and evaluation, to decision and new supplier onboarding.',
    },
    whatItSolves: [
      { pl: 'Brak ustrukturyzowanego podejścia do wyboru dostawców', en: 'No structured approach to supplier selection' },
      { pl: 'Niesystematyczne RFP i procesy ewaluacji', en: 'Unsystematic RFP and evaluation processes' },
      { pl: 'Zbyt wolne procesy wyboru dostawcy z ryzykiem subiektywności', en: 'Too slow supplier selection processes with subjectivity risk' },
    ],
    outcomes: [
      { pl: 'Ustrukturyzowany proces sourcingowy gotowy do zastosowania', en: 'Structured sourcing process ready to apply' },
      { pl: 'Narzędzia: szablony RFP, macierze ewaluacji, scorecardy', en: 'Tools: RFP templates, evaluation matrices, scorecards' },
      { pl: 'Pewność podejmowania decyzji dostawczych', en: 'Confidence in supplier decision-making' },
    ],
    methodology: [
      { pl: 'Teoria i case studies procesu sourcingowego', en: 'Theory and case studies of the sourcing process' },
      { pl: 'Praca na realnych scenariuszach i symulacje RFP', en: 'Work on real scenarios and RFP simulations' },
      { pl: 'Opracowanie własnego procesu sourcingowego', en: 'Development of own sourcing process' },
    ],
    engagement: {
      pl: 'Warsztat 2-3 dni lub program modułowy; in-company lub otwarty.',
      en: '2-3 day workshop or modular programme; in-company or open.',
    },
    relatedCapabilities: ['akademia-zakupow', 'category-strategy', 'warsztaty-negocjacyjne'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zapytaj o program', en: 'Ask about the programme' },
    metadata: {
      title: { pl: 'Strategic Sourcing | Profitia', en: 'Strategic Sourcing | Profitia' },
      description: {
        pl: 'Strategia sourcingowa dla złożonych kategorii. Od analizy rynku po wybór i onboarding dostawcy.',
        en: 'Sourcing strategy for complex categories. From market analysis to supplier selection and onboarding.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // EDUCATION - Negotiation Workshops
  // ══════════════════════════════════════════════════════════════

  {
    slug: 'warsztaty-negocjacyjne',
    type: 'education',
    category: 'workshops',
    featured: true,
    order: 601,
    eyebrow: { pl: 'Warsztaty', en: 'Workshop' },
    title: { pl: 'Negocjacje Zakupowe', en: 'Procurement Negotiations' },
    shortDescription: {
      pl: 'Praktyczne warsztaty negocjacyjne oparte na metodzie harvardzkiej i realnych case studies zakupowych.',
      en: 'Practical negotiation workshops grounded in Harvard methodology and real procurement case studies.',
    },
    longDescription: {
      pl: 'Flagowy warsztat negocjacyjny Profitia. Uczymy zaawansowanych technik negocjacyjnych dostosowanych do zakupów: metoda harvarda, negocjacje oparte na interesach, zarządzanie technikami manipulacyjnymi dostawców, budowanie BATNA i argumentacji fakturalnej.',
      en: 'Profitia\'s flagship negotiation workshop. We teach advanced negotiation techniques adapted to procurement: Harvard method, interest-based negotiation, managing supplier manipulation techniques, building BATNA and factual argumentation.',
    },
    whatItSolves: [
      { pl: 'Reaktywne i intuicyjne podejście do negocjacji z dostawcami', en: 'Reactive and intuitive approach to supplier negotiations' },
      { pl: 'Podatność na techniki manipulacyjne stosowane przez dostawców', en: 'Susceptibility to manipulation techniques used by suppliers' },
      { pl: 'Brak struktury i pewności w trudnych negocjacjach', en: 'No structure and confidence in difficult negotiations' },
    ],
    outcomes: [
      { pl: 'Opanowane kluczowe techniki negocjacyjne', en: 'Mastered key negotiation techniques' },
      { pl: 'Umiejętność rozpoznawania i odpierania technik manipulacyjnych', en: 'Ability to recognise and counter manipulation techniques' },
      { pl: 'Pewność i struktura w każdych negocjacjach zakupowych', en: 'Confidence and structure in any procurement negotiation' },
    ],
    methodology: [
      { pl: 'Teoria metody harvardzkiej i zasady negocjacji opartych na interesach', en: 'Harvard method theory and interest-based negotiation principles' },
      { pl: 'Symulacje negocjacyjne z feedback', en: 'Negotiation simulations with feedback' },
      { pl: 'Analiza technik manipulacyjnych i kontrstrategii', en: 'Manipulation technique analysis and counter-strategies' },
      { pl: 'Case studies z branż uczestników', en: 'Case studies from participants\' industries' },
    ],
    engagement: {
      pl: 'Warsztat 1-2 dni; in-company lub program otwarty. Dostępna wersja zaawansowana (dzień 3).',
      en: '1-2 day workshop; in-company or open programme. Advanced version available (day 3).',
    },
    relatedCapabilities: ['advanced-negotiations', 'negotiation-preparation', 'coaching-zakupowy'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zapytaj o warsztat', en: 'Ask about the workshop' },
    metadata: {
      title: { pl: 'Warsztaty Negocjacji Zakupowych | Profitia', en: 'Procurement Negotiations Workshop | Profitia' },
      description: {
        pl: 'Praktyczne warsztaty negocjacyjne oparte na metodzie harvardzkiej. Dla kupców i liderów zakupowych.',
        en: 'Practical negotiation workshops grounded in Harvard methodology. For buyers and procurement leaders.',
      },
    },
  },

  {
    slug: 'advanced-negotiations',
    type: 'education',
    category: 'workshops',
    featured: false,
    order: 602,
    eyebrow: { pl: 'Warsztaty', en: 'Workshop' },
    title: { pl: 'Advanced Negotiations', en: 'Advanced Negotiations' },
    shortDescription: {
      pl: 'Zaawansowane techniki negocjacyjne dla doświadczonych kupców - presja, koalicje i złożone scenariusze.',
      en: 'Advanced negotiation techniques for experienced buyers - pressure, coalitions and complex scenarios.',
    },
    longDescription: {
      pl: 'Dla doświadczonych kupców, którzy chcą wejść na wyższy poziom. Skupiamy się na zaawansowanych scenariuszach: negocjacje wielostronne, zarządzanie presją dostawcy, negocjacje w trudnych warunkach rynkowych, koalicje i alianse zakupowe.',
      en: 'For experienced buyers who want to reach the next level. We focus on advanced scenarios: multi-party negotiations, supplier pressure management, negotiations in difficult market conditions, coalitions and purchasing alliances.',
    },
    whatItSolves: [
      { pl: 'Plateau w umiejętnościach negocjacyjnych doświadczonego kupca', en: 'Plateau in negotiation skills of an experienced buyer' },
      { pl: 'Trudności z bardzo agresywnymi lub monopolistycznymi dostawcami', en: 'Difficulties with highly aggressive or monopolistic suppliers' },
      { pl: 'Brak narzędzi do wielostronnych lub złożonych negocjacji', en: 'No tools for multi-party or complex negotiations' },
    ],
    outcomes: [
      { pl: 'Zaawansowane techniki dla złożonych scenariuszy negocjacyjnych', en: 'Advanced techniques for complex negotiation scenarios' },
      { pl: 'Strategie radzenia sobie z presją i manipulacją na wysokim poziomie', en: 'Strategies for handling high-level pressure and manipulation' },
      { pl: 'Umiejętność budowania koalicji i aliansów zakupowych', en: 'Ability to build purchasing coalitions and alliances' },
    ],
    methodology: [
      { pl: 'Zaawansowane symulacje wielostronne', en: 'Advanced multi-party simulations' },
      { pl: 'Analiza trudnych przypadków z praktyki', en: 'Analysis of difficult real-world cases' },
      { pl: 'Indywidualny feedback i coaching technik', en: 'Individual feedback and technique coaching' },
    ],
    engagement: {
      pl: 'Warsztat 1-2 dni; wyłącznie in-company dla doświadczonych zespołów.',
      en: '1-2 day workshop; in-company only for experienced teams.',
    },
    relatedCapabilities: ['warsztaty-negocjacyjne', 'negotiation-preparation', 'coaching-zakupowy'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zapytaj o warsztat', en: 'Ask about the workshop' },
    metadata: {
      title: { pl: 'Advanced Negotiations | Profitia', en: 'Advanced Negotiations | Profitia' },
      description: {
        pl: 'Zaawansowane techniki negocjacyjne dla doświadczonych kupców. Presja, koalicje i złożone scenariusze.',
        en: 'Advanced negotiation techniques for experienced buyers. Pressure, coalitions and complex scenarios.',
      },
    },
  },

  {
    slug: 'fact-based-negotiation',
    type: 'education',
    category: 'workshops',
    featured: false,
    order: 603,
    eyebrow: { pl: 'Warsztaty', en: 'Workshop' },
    title: { pl: 'Fact-Based Negotiation', en: 'Fact-Based Negotiation' },
    shortDescription: {
      pl: 'Jak wygrywać negocjacje za pomocą danych - should-cost, benchmarki i argumentacja faktualna.',
      en: 'How to win negotiations using data - should-cost, benchmarks and factual argumentation.',
    },
    longDescription: {
      pl: 'Warsztat skupiony na negocjacjach opartych na danych: jak budować argumentację na podstawie should-cost, benchmarków i analiz rynkowych, jak odrzucać nieuzasadnione podwyżki, jak prowadzić rozmowę o cenach na podstawie faktów, a nie intuicji.',
      en: 'Workshop focused on data-driven negotiations: how to build argumentation based on should-cost, benchmarks and market analysis, how to reject unjustified price increases, how to conduct price conversations based on facts, not intuition.',
    },
    whatItSolves: [
      { pl: 'Intuicyjne negocjacje bez oparcia w danych rynkowych', en: 'Intuitive negotiations without grounding in market data' },
      { pl: 'Trudności z uzasadnionym odrzucaniem podwyżek cen', en: 'Difficulties justifiably rejecting price increases' },
      { pl: 'Brak umiejętności przygotowania argumentacji fakturalnej', en: 'No ability to prepare factual argumentation' },
    ],
    outcomes: [
      { pl: 'Umiejętność budowania argumentacji opartej na danych', en: 'Ability to build data-based argumentation' },
      { pl: 'Praktyczne narzędzia: should-cost, benchmarki, modele kalkulacji', en: 'Practical tools: should-cost, benchmarks, calculation models' },
      { pl: 'Pewność w rozmowach o cenach z dostawcami', en: 'Confidence in price conversations with suppliers' },
    ],
    methodology: [
      { pl: 'Teoria should-cost i benchmarkingu z ćwiczeniami', en: 'Should-cost and benchmarking theory with exercises' },
      { pl: 'Budowa argumentacji dla realnego scenariusza', en: 'Argumentation build for a real scenario' },
      { pl: 'Symulacja negocjacji z argumentacją fakturalną', en: 'Negotiation simulation with factual argumentation' },
    ],
    engagement: {
      pl: 'Warsztat 1 dzień; in-company lub otwarty; wymaga przygotowania danych przez uczestników.',
      en: '1-day workshop; in-company or open; requires data preparation by participants.',
    },
    relatedCapabilities: ['warsztaty-negocjacyjne', 'should-cost-analysis', 'spend-analytics'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zapytaj o warsztat', en: 'Ask about the workshop' },
    metadata: {
      title: { pl: 'Fact-Based Negotiation | Profitia', en: 'Fact-Based Negotiation | Profitia' },
      description: {
        pl: 'Negocjacje oparte na danych. Should-cost, benchmarki i argumentacja faktualna.',
        en: 'Data-driven negotiations. Should-cost, benchmarks and factual argumentation.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // EDUCATION - Analytics & Intelligence
  // ══════════════════════════════════════════════════════════════

  {
    slug: 'spend-analytics-training',
    type: 'education',
    category: 'analytics',
    featured: false,
    order: 701,
    eyebrow: { pl: 'Analityka', en: 'Analytics' },
    title: { pl: 'Spend Analytics', en: 'Spend Analytics' },
    shortDescription: {
      pl: 'Jak analizować dane zakupowe i przekuwać je w rekomendacje decyzyjne.',
      en: 'How to analyse procurement data and turn it into decision-relevant recommendations.',
    },
    longDescription: {
      pl: 'Szkolenie z analizy danych zakupowych: jak budować i interpretować spend cube, jak identyfikować okazje oszczędnościowe, jak przygotować analizę do prezentacji dla zarządu. Praktyczne narzędzia i podejście oparte na realnych danych.',
      en: 'Training in procurement data analysis: how to build and interpret a spend cube, how to identify savings opportunities, how to prepare analysis for board presentation. Practical tools and real-data approach.',
    },
    whatItSolves: [
      { pl: 'Brak umiejętności analizy danych zakupowych w zespole', en: 'No procurement data analysis skills in the team' },
      { pl: 'Trudności z przekształceniem danych w rekomendacje', en: 'Difficulties converting data into recommendations' },
      { pl: 'Brak narzędzi do budowania spend cube i raportów', en: 'No tools for building spend cube and reports' },
    ],
    outcomes: [
      { pl: 'Umiejętność samodzielnej analizy spend i budowy spend cube', en: 'Ability to independently analyse spend and build a spend cube' },
      { pl: 'Narzędzia Excel/BI gotowe do codziennego użycia', en: 'Excel/BI tools ready for daily use' },
      { pl: 'Raport analityczny gotowy do prezentacji zarządowi', en: 'Analytical report ready for management presentation' },
    ],
    methodology: [
      { pl: 'Teoria analizy spend i praktyczne ćwiczenia na danych', en: 'Spend analysis theory and practical data exercises' },
      { pl: 'Budowa spend cube krok po kroku', en: 'Step-by-step spend cube build' },
      { pl: 'Projekt własnej analizy spend', en: 'Own spend analysis project' },
    ],
    engagement: {
      pl: 'Warsztat 1-2 dni; in-company lub otwarty.',
      en: '1-2 day workshop; in-company or open.',
    },
    relatedCapabilities: ['spend-cube', 'procurement-dashboards', 'supplier-intelligence'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zapytaj o szkolenie', en: 'Ask about the training' },
    metadata: {
      title: { pl: 'Spend Analytics - Szkolenie | Profitia', en: 'Spend Analytics - Training | Profitia' },
      description: {
        pl: 'Szkolenie z analizy danych zakupowych. Spend cube, identyfikacja okazji i raport dla zarządu.',
        en: 'Procurement data analysis training. Spend cube, opportunity identification and management report.',
      },
    },
  },

  {
    slug: 'supplier-financial-analysis',
    type: 'education',
    category: 'analytics',
    featured: false,
    order: 702,
    eyebrow: { pl: 'Analityka', en: 'Analytics' },
    title: { pl: 'Analiza Finansowa Dostawców', en: 'Supplier Financial Analysis' },
    shortDescription: {
      pl: 'Jak czytać sprawozdania finansowe dostawców - ryzyko, kondycja i dźwignia negocjacyjna.',
      en: 'How to read supplier financial statements - risk, health and negotiation leverage.',
    },
    longDescription: {
      pl: 'Szkolenie z analizy finansowej dla kupców: jak ocenić kondycję finansową dostawcy, zidentyfikować ryzyka, ocenić czy dostawca jest silny czy słaby negocjacyjnie na podstawie jego sytuacji finansowej. Praktyczne narzędzia i ćwiczenia na realnych sprawozdaniach.',
      en: 'Financial analysis training for buyers: how to assess a supplier\'s financial health, identify risks, evaluate whether the supplier is negotiation-strong or weak based on their financial position. Practical tools and exercises on real statements.',
    },
    whatItSolves: [
      { pl: 'Brak umiejętności oceny kondycji finansowej dostawców', en: 'No ability to assess supplier financial health' },
      { pl: 'Nieznana siła negocjacyjna dostawcy wynikająca z jego finansów', en: 'Unknown supplier negotiation strength from their finances' },
      { pl: 'Ryzyko kontrahenta niezidentyfikowane w procesie zakupowym', en: 'Counterparty risk not identified in the procurement process' },
    ],
    outcomes: [
      { pl: 'Umiejętność samodzielnej analizy sprawozdań finansowych dostawców', en: 'Ability to independently analyse supplier financial statements' },
      { pl: 'Narzędzia scoringowe do oceny kondycji dostawcy', en: 'Scoring tools for supplier health assessment' },
      { pl: 'Integracja analizy finansowej z przygotowaniem negocjacji', en: 'Integration of financial analysis with negotiation preparation' },
    ],
    methodology: [
      { pl: 'Podstawy analizy finansowej dla nieprofesjonalistów', en: 'Financial analysis basics for non-professionals' },
      { pl: 'Ćwiczenia na realnych sprawozdaniach finansowych dostawców', en: 'Exercises on real supplier financial statements' },
      { pl: 'Projekt analizy wybranego dostawcy', en: 'Selected supplier analysis project' },
    ],
    engagement: {
      pl: 'Warsztat 1 dzień; in-company lub otwarty.',
      en: '1-day workshop; in-company or open.',
    },
    relatedCapabilities: ['supplier-intelligence', 'should-cost-analysis', 'warsztaty-negocjacyjne'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zapytaj o szkolenie', en: 'Ask about the training' },
    metadata: {
      title: { pl: 'Analiza Finansowa Dostawców | Profitia', en: 'Supplier Financial Analysis | Profitia' },
      description: {
        pl: 'Jak oceniać kondycję finansową dostawców. Ryzyko, siła negocjacyjna i narzędzia scoringowe.',
        en: 'How to assess supplier financial health. Risk, negotiation strength and scoring tools.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════
  // EDUCATION - Custom Programmes
  // ══════════════════════════════════════════════════════════════

  {
    slug: 'in-company-workshops',
    type: 'education',
    category: 'workshops',
    featured: false,
    order: 801,
    eyebrow: { pl: 'Program Dedykowany', en: 'Custom Programme' },
    title: { pl: 'Warsztaty In-Company', en: 'In-Company Workshops' },
    shortDescription: {
      pl: 'Dedykowane warsztaty zaprojektowane dla Twojego zespołu - na Twoich danych i wyzwaniach.',
      en: 'Dedicated workshops designed for your team - on your data and challenges.',
    },
    longDescription: {
      pl: 'Projektujemy i prowadzimy dedykowane warsztaty dla zespołów zakupowych. Każdy program jest dostosowany do specyfiki branży, poziomu kompetencji i konkretnych wyzwań organizacji. Pracujemy na danych i przypadkach klienta.',
      en: 'We design and run dedicated workshops for procurement teams. Each programme is adapted to the industry specifics, competency level and specific challenges of the organisation. We work on client data and cases.',
    },
    whatItSolves: [
      { pl: 'Standardowe szkolenia nie odpowiadają specyficznym potrzebom organizacji', en: 'Standard training does not address the organisation\'s specific needs' },
      { pl: 'Potrzeba programu dostosowanego do poziomu i kontekstu zespołu', en: 'Need for a programme adapted to team level and context' },
      { pl: 'Chęć pracy na własnych danych i case studies', en: 'Desire to work on own data and case studies' },
    ],
    outcomes: [
      { pl: 'Program skrojony dokładnie pod potrzeby organizacji', en: 'Programme tailored exactly to organisational needs' },
      { pl: 'Konkretne narzędzia i metody natychmiast stosowalne', en: 'Specific tools and methods immediately applicable' },
      { pl: 'Większa retencja wiedzy dzięki pracy na własnym kontekście', en: 'Higher knowledge retention through working in own context' },
    ],
    methodology: [
      { pl: 'Diagnoza potrzeb i projekt programu', en: 'Needs diagnosis and programme design' },
      { pl: 'Przygotowanie materiałów i case studies dla organizacji', en: 'Material and case study preparation for the organisation' },
      { pl: 'Realizacja warsztatów i ewaluacja', en: 'Workshop delivery and evaluation' },
    ],
    engagement: {
      pl: 'Czas trwania od pół dnia do wielodniowego programu; wyłącznie in-company.',
      en: 'Duration from half a day to a multi-day programme; in-company only.',
    },
    relatedCapabilities: ['warsztaty-negocjacyjne', 'akademia-zakupow', 'coaching-zakupowy'],
    relatedInsights: [],
    ctaLabel: { pl: 'Zaprojektujmy program', en: 'Let\'s design a programme' },
    metadata: {
      title: { pl: 'Warsztaty In-Company | Profitia', en: 'In-Company Workshops | Profitia' },
      description: {
        pl: 'Dedykowane warsztaty zakupowe dla Twojego zespołu. Na Twoich danych i wyzwaniach.',
        en: 'Dedicated procurement workshops for your team. On your data and challenges.',
      },
    },
  },

  {
    slug: 'procurement-mentoring',
    type: 'education',
    category: 'coaching',
    featured: false,
    order: 802,
    eyebrow: { pl: 'Program Dedykowany', en: 'Custom Programme' },
    title: { pl: 'Procurement Mentoring', en: 'Procurement Mentoring' },
    shortDescription: {
      pl: 'Mentoring od doświadczonego praktyka zakupowego - strategiczne wsparcie i transfer wiedzy.',
      en: 'Mentoring from an experienced procurement practitioner - strategic support and knowledge transfer.',
    },
    longDescription: {
      pl: 'Program mentorski łączący kupca lub lidera zakupowego z doświadczonym praktykiem. Skupiamy się na długoterminowym rozwoju zawodowym, nawigowaniu w organizacji i budowaniu autorytetu funkcji zakupowej.',
      en: 'Mentoring programme connecting a buyer or procurement leader with an experienced practitioner. We focus on long-term professional development, organisational navigation and building procurement function authority.',
    },
    whatItSolves: [
      { pl: 'Potrzeba długoterminowego wsparcia w rozwoju kariery zakupowej', en: 'Need for long-term support in procurement career development' },
      { pl: 'Brak dostępu do seniorowego doświadczenia w organizacji', en: 'No access to senior experience in the organisation' },
      { pl: 'Wyzwania w budowaniu pozycji zakupów w organizacji', en: 'Challenges in building procurement position in the organisation' },
    ],
    outcomes: [
      { pl: 'Wyraźny postęp w kluczowych wyzwaniach zawodowych', en: 'Clear progress in key professional challenges' },
      { pl: 'Dostęp do doświadczenia i sieci kontaktów mentora', en: 'Access to mentor\'s experience and network' },
      { pl: 'Długoterminowy plan rozwoju zawodowego', en: 'Long-term professional development plan' },
    ],
    methodology: [
      { pl: 'Sesje mentorskie co 2-4 tygodnie (60-90 minut)', en: 'Mentoring sessions every 2-4 weeks (60-90 minutes)' },
      { pl: 'Praca na konkretnych wyzwaniach i celach mentee', en: 'Work on specific mentee challenges and goals' },
      { pl: 'Dostęp do sieci i zasobów mentora', en: 'Access to mentor\'s network and resources' },
    ],
    engagement: {
      pl: 'Program 6-12 miesięcy; 6-12 sesji mentorskich.',
      en: '6-12 month programme; 6-12 mentoring sessions.',
    },
    relatedCapabilities: ['coaching-zakupowy', 'procurement-excellence', 'akademia-zakupow'],
    relatedInsights: [],
    ctaLabel: { pl: 'Porozmawiajmy o mentoraszu', en: 'Talk about mentoring' },
    metadata: {
      title: { pl: 'Procurement Mentoring | Profitia', en: 'Procurement Mentoring | Profitia' },
      description: {
        pl: 'Mentoring zakupowy od doświadczonego praktyka. Długoterminowy rozwój i transfer wiedzy.',
        en: 'Procurement mentoring from an experienced practitioner. Long-term development and knowledge transfer.',
      },
    },
  },
]
