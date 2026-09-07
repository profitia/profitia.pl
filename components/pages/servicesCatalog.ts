import type { Locale } from '@/lib/capabilities'
import type { CatalogDomain, CatalogProduct, CatalogProductAction } from './catalogTypes'

export type ServicesProductAction = CatalogProductAction
export type ServicesProduct = CatalogProduct
export type ServicesDomain = CatalogDomain

export const SERVICES_CATALOG: Record<Locale, ServicesDomain[]> = {
  pl: [
    {
      id: 'zarzadzanie-wydatkami',
      title: 'Zarządzanie wydatkami',
      products: [
        {
          id: 'analiza-wydatkow',
          title: 'Analiza wydatków',
          description: [
            'kategoryzacja wydatków',
            'budowa drzewa zakupowego',
            'identyfikacja kategorii zakupowych do działań sourcingowych',
            'wskazanie obszarów Quick Wins',
          ],
        },
        {
          id: 'strategie-zakupowe',
          title: 'Strategie zakupowe',
          description: [
            'strategia dla całej organizacji zakupowej',
            'strategie kategorii zakupowych',
            'dźwignie / taktyki zakupowe pod negocjacje',
            'plan działań sourcingowych',
            'analiza rynku dostawców',
            'benchmarking cenowy',
          ],
        },
        {
          id: 'programy-oszczednosciowe',
          title: 'Programy oszczędnościowe',
          description: [
            'mapowanie potencjału oszczędności',
            'sourcing strategiczny',
            'negocjacje',
            'global sourcing (China sourcing / CEE)',
            'zarządzanie kategoriami',
          ],
        },
        {
          id: 'zarzadzanie-dostawcami',
          title: 'Zarządzanie dostawcami',
          description: [
            'kategoryzacja dostawców (krytyczni, kluczowi, long-tail itd.)',
            'budowa długich list dostawców',
            'kwalifikacja dostawców',
            'ocena ryzyka dostaw',
            'eliminacja single source',
            'programy rozwoju dostawców',
          ],
        },
        {
          id: 'produkty-koncowe-wydatki',
          title: 'Przykładowe produkty końcowe',
          description: [
            'strategie kategorii',
            'plany sourcingowe',
            'modele kalkulacji oszczędności',
            'metodologie liczenia savings',
            'business case dla inicjatyw zakupowych',
            'listy potencjalnych dostawców',
            'raporty potencjału oszczędności',
            'strategie negocjacyjne / scenariusze negocjacji',
          ],
        },
      ],
    },
    {
      id: 'organizacja',
      title: 'Organizacja',
      products: [
        {
          id: 'projektowanie-organizacji-zakupow',
          title: 'Projektowanie organizacji zakupów',
          description: [
            'analiza istniejącej struktury',
            'centralizacja zakupów',
            'SSC / Shared Services',
            'podział odpowiedzialności kupców strategicznych i operacyjnych',
          ],
        },
        {
          id: 'projektowanie-rol-i-odpowiedzialnosci',
          title: 'Projektowanie ról i odpowiedzialności',
          description: [
            'Tandem Zakupowy (Zakupy – Biznes)',
            'Dyrektor Zakupów',
            'Category Manager',
            'Kupiec Strategiczny',
            'Kupiec Operacyjny',
            'Analityk Danych',
          ],
        },
        {
          id: 'budowa-kompetencji',
          title: 'Budowa kompetencji',
          description: [
            'akademie zakupowe',
            'szkolenia zakupowe',
            'coaching',
            'programy rozwoju kompetencji',
            'dobre praktyki rynkowe',
            'standardy CIPS',
          ],
        },
        {
          id: 'kpi-i-cele-funkcji-zakupowej',
          title: 'KPI i cele funkcji zakupowej',
          description: [
            'system zarządzania przez cele',
            'KPI dla zakupów',
            'KPI dla zaopatrzenia',
            'monitoring efektywności funkcji zakupowej',
          ],
        },
        {
          id: 'produkty-koncowe-organizacja',
          title: 'Przykładowe produkty końcowe',
          description: [
            'docelowa struktura organizacyjna',
            'opisy stanowisk',
            'matryca odpowiedzialności',
            'plan rozwoju kompetencji',
            'program akademii zakupowej',
            'system KPI dla zakupów',
          ],
        },
      ],
    },
    {
      id: 'proces',
      title: 'Proces',
      products: [
        {
          id: 'mapowanie-procesow',
          title: 'Mapowanie procesów',
          description: [
            'analiza stanu obecnego',
            'identyfikacja nieefektywności',
            'pomiar czasów procesów',
            'benchmarking procesów',
            'luki w procesie',
          ],
        },
        {
          id: 'projektowanie-procesow-docelowych',
          title: 'Projektowanie procesów docelowych',
          description: [
            'procesy docelowe',
            'przebieg procesu zakupowego',
            'role uczestników / macierz RACI',
            'punkty kontrolne i akceptacyjne',
            'ścieżki awaryjne',
          ],
        },
        {
          id: 'procedury-zakupowe',
          title: 'Procedury zakupowe',
          description: [
            'progi zakupowe',
            'polityka zakupowa',
            'zasady konkurencyjności',
            'proces kwalifikacji dostawców',
            'procedury kontraktowania',
            'zarządzanie cyklem życia kontraktu',
          ],
        },
        {
          id: 'dokumentacja-zakupowa',
          title: 'Dokumentacja zakupowa',
          description: [
            'RFI, RFP/RFQ',
            'pakiety negocjacyjne (szablon)',
            'wzory umów',
            'OWZ',
            'arkusze oceny dostawców',
            'formularze kwalifikacyjne',
            'dokumenty podsumowania ofert',
            'formatki do research’u',
          ],
        },
        {
          id: 'produkty-koncowe-proces',
          title: 'Przykładowe produkty końcowe',
          description: [
            'mapy procesów aktualne / docelowe',
            'procedura zakupowa',
            'polityka zakupowa',
            'pakiet wzorów dokumentów',
            'workflow zakupowy',
            'model kontroli procesów zakupowych',
          ],
        },
      ],
    },
    {
      id: 'narzedzia',
      title: 'Narzędzia',
      products: [
        {
          id: 'ocena-srodowiska-it',
          title: 'Ocena środowiska IT',
          description: [
            'przegląd wykorzystywanych narzędzi',
            'analiza luk funkcjonalnych',
            'identyfikacja realnych potrzeb biznesowych',
          ],
        },
        {
          id: 'digital-procurement-wsparcie-wyboru-rozwiazania',
          title: 'Digital Procurement - wsparcie wyboru rozwiązania',
          description: [
            'platformy sourcingowe',
            'eRFx',
            'elektroniczne aukcje',
            'elektroniczny obieg dokumentów',
            'narzędzia kontroli wydatków',
          ],
        },
        {
          id: 'zarzadzanie-danymi-zakupowymi',
          title: 'Zarządzanie danymi zakupowymi',
          description: [
            'spend analytics',
            'SpendCube',
            'raportowanie KPI',
            'dashboardy zakupowe',
            'aktualizacja cenników',
            'analiza ilości / jakości dostawców',
          ],
        },
        {
          id: 'wsparcie-wdrozen',
          title: 'Wsparcie wdrożeń',
          description: [
            'platformy zakupowe',
            'systemy ERP',
            'EOD (Elektroniczny Obieg Dokumentów)',
            'zarządzanie zapasami',
            'narzędzia oceny dostawców',
            'rozwiązania do zarządzania zapasami',
          ],
        },
        {
          id: 'produkty-koncowe-narzedzia',
          title: 'Przykładowe produkty końcowe',
          description: [
            'strategia cyfryzacji zakupów',
            'business case wdrożenia systemu',
            'dashboard KPI',
            'formularze i workflow elektroniczne',
            'model raportowania zakupowego',
            'rekomendacja architektury narzędziowej',
          ],
        },
      ],
    },
  ],
  en: [
    {
      id: 'spend-management',
      title: 'Spend Management',
      products: [
        {
          id: 'spend-analysis',
          title: 'Spend Analysis',
          description: [
            'spend categorisation',
            'building the procurement tree',
            'identifying categories for sourcing actions',
            'highlighting Quick Win areas',
          ],
        },
        {
          id: 'procurement-strategies',
          title: 'Procurement Strategies',
          description: [
            'strategy for the entire procurement organisation',
            'category strategies',
            'levers and tactics for negotiations',
            'sourcing action plan',
            'supplier market analysis',
            'price benchmarking',
          ],
        },
        {
          id: 'savings-programmes',
          title: 'Savings Programmes',
          description: [
            'mapping the savings potential',
            'strategic sourcing',
            'negotiations',
            'global sourcing (China sourcing / CEE)',
            'category management',
          ],
        },
        {
          id: 'supplier-management',
          title: 'Supplier Management',
          description: [
            'supplier segmentation (critical, key, long-tail, etc.)',
            'building long supplier lists',
            'supplier qualification',
            'supply risk assessment',
            'eliminating single source dependency',
            'supplier development programmes',
          ],
        },
        {
          id: 'deliverables-spend',
          title: 'Example Deliverables',
          description: [
            'category strategies',
            'sourcing plans',
            'savings calculation models',
            'savings calculation methodologies',
            'business cases for procurement initiatives',
            'potential supplier lists',
            'savings potential reports',
            'negotiation strategies and negotiation scenarios',
          ],
        },
      ],
    },
    {
      id: 'organisation',
      title: 'Organisation',
      products: [
        {
          id: 'procurement-organisation-design',
          title: 'Procurement Organisation Design',
          description: [
            'analysis of the current structure',
            'centralisation of procurement',
            'SSC / Shared Services',
            'splitting responsibilities between strategic and operational buyers',
          ],
        },
        {
          id: 'roles-and-responsibilities',
          title: 'Roles and Responsibilities Design',
          description: [
            'Procurement Tandem (Procurement - Business)',
            'Procurement Director',
            'Category Manager',
            'Strategic Buyer',
            'Operational Buyer',
            'Data Analyst',
          ],
        },
        {
          id: 'capability-building',
          title: 'Capability Building',
          description: [
            'procurement academies',
            'procurement training',
            'coaching',
            'competency development programmes',
            'market best practices',
            'CIPS standards',
          ],
        },
        {
          id: 'procurement-kpis',
          title: 'KPI and Procurement Goals',
          description: [
            'management-by-objectives system',
            'procurement KPIs',
            'supply KPIs',
            'monitoring procurement function performance',
          ],
        },
        {
          id: 'deliverables-organisation',
          title: 'Example Deliverables',
          description: [
            'target organisational structure',
            'job descriptions',
            'responsibility matrix',
            'competency development plan',
            'procurement academy programme',
            'procurement KPI system',
          ],
        },
      ],
    },
    {
      id: 'process',
      title: 'Process',
      products: [
        {
          id: 'process-mapping',
          title: 'Process Mapping',
          description: [
            'current-state analysis',
            'identifying inefficiencies',
            'measuring process times',
            'process benchmarking',
            'process gaps',
          ],
        },
        {
          id: 'target-process-design',
          title: 'Target Process Design',
          description: [
            'target processes',
            'procurement process flow',
            'participant roles / RACI matrix',
            'control and approval points',
            'fallback paths',
          ],
        },
        {
          id: 'procurement-procedures',
          title: 'Procurement Procedures',
          description: [
            'spend thresholds',
            'procurement policy',
            'competition principles',
            'supplier qualification process',
            'contracting procedures',
            'contract lifecycle management',
          ],
        },
        {
          id: 'procurement-documentation',
          title: 'Procurement Documentation',
          description: [
            'RFI, RFP/RFQ',
            'negotiation packs (template)',
            'contract templates',
            'GTCs',
            'supplier evaluation sheets',
            'qualification forms',
            'offer summary documents',
            'research templates',
          ],
        },
        {
          id: 'deliverables-process',
          title: 'Example Deliverables',
          description: [
            'as-is / to-be process maps',
            'procurement procedure',
            'procurement policy',
            'document template pack',
            'procurement workflow',
            'procurement control model',
          ],
        },
      ],
    },
    {
      id: 'tools',
      title: 'Tools',
      products: [
        {
          id: 'it-environment-assessment',
          title: 'IT Environment Assessment',
          description: [
            'review of currently used tools',
            'functional gap analysis',
            'identification of real business needs',
          ],
        },
        {
          id: 'digital-procurement-tool-selection',
          title: 'Digital Procurement - Solution Selection Support',
          description: [
            'sourcing platforms',
            'eRFx',
            'electronic auctions',
            'electronic document workflows',
            'spend control tools',
          ],
        },
        {
          id: 'procurement-data-management',
          title: 'Procurement Data Management',
          description: [
            'spend analytics',
            'SpendCube',
            'KPI reporting',
            'procurement dashboards',
            'price list updates',
            'supplier quantity / quality analysis',
          ],
        },
        {
          id: 'implementation-support',
          title: 'Implementation Support',
          description: [
            'procurement platforms',
            'ERP systems',
            'EOD (Electronic Document Workflow)',
            'inventory management',
            'supplier assessment tools',
            'inventory management solutions',
          ],
        },
        {
          id: 'deliverables-tools',
          title: 'Example Deliverables',
          description: [
            'procurement digitisation strategy',
            'system implementation business case',
            'KPI dashboard',
            'digital forms and workflows',
            'procurement reporting model',
            'tool architecture recommendation',
          ],
        },
      ],
    },
  ],
}
