import type { Locale } from '@/lib/capabilities'
import type { CatalogDomain } from './catalogTypes'

export const PRODUCTS_CATALOG: Record<Locale, CatalogDomain[]> = {
  pl: [
    {
      id: 'rent-an-expert-spend-management',
      title: 'Zarządzanie wydatkami',
      products: [
        {
          id: 'rent-a-category-manager',
          title: 'Rent-a-Category Manager',
          sections: [
            { title: 'Cel', paragraphs: ['Realizacja oszczędności w wybranej kategorii zakupowej.'] },
            {
              title: 'Zakres odpowiedzialności',
              items: [
                'analiza wydatków (Spend Analysis)',
                'identyfikacja potencjału oszczędności',
                'opracowanie strategii kategorii',
                'benchmark cen i warunków rynkowych',
                'prowadzenie negocjacji',
                'przeprowadzenie RFI/RFQ/RFP',
                'wdrożenie nowych dostawców',
              ],
            },
          ],
        },
        {
          id: 'rent-a-sourcing-manager',
          title: 'Rent-a-Sourcing Manager',
          sections: [
            { title: 'Cel', paragraphs: ['Skuteczne przeprowadzenie procesu wyboru dostawcy.'] },
            {
              title: 'Zakres',
              items: [
                'przygotowanie dokumentacji zakupowej',
                'komunikacja z rynkiem',
                'zarządzanie ofertowaniem',
                'analiza ofert',
                'negocjacje',
                'rekomendacja wyboru',
              ],
            },
          ],
        },
        {
          id: 'rent-a-cost-reduction-manager',
          title: 'Rent-a-Cost Reduction Manager',
          sections: [
            { title: 'Cel', paragraphs: ['Zidentyfikowanie i wdrożenie inicjatyw optymalizacyjnych.'] },
            { title: 'Przykłady', items: ['opakowania', 'logistyka', 'energia', 'usługi', 'koszty produkcyjne'] },
            { title: 'KPI', items: ['wartość oszczędności', 'ROI projektu', 'liczba wdrożonych inicjatyw'] },
          ],
        },
      ],
    },
    {
      id: 'rent-an-expert-organisation',
      title: 'Organizacja',
      products: [
        {
          id: 'rent-a-procurement-manager',
          title: 'Rent-a-Procurement Manager',
          sections: [
            { title: 'Cel', paragraphs: ['Tymczasowe zarządzanie funkcją zakupową klienta.'] },
            {
              title: 'Zakres',
              items: [
                'kierowanie zespołem zakupowym',
                'zarządzanie KPI',
                'ustalanie priorytetów',
                'rozwój kompetencji zespołu',
                'raportowanie do zarządu',
              ],
            },
            { title: 'Rezultat', items: ['stabilizacja organizacji', 'poprawa efektywności działu', 'wzrost dojrzałości zakupowej'] },
          ],
        },
        {
          id: 'rent-a-cpo',
          title: 'Rent-a-CPO',
          sections: [
            { title: 'Cel', paragraphs: ['Dla firm bez Dyrektora Zakupów.'] },
            {
              title: 'Zakres',
              items: [
                'budowa strategii zakupowej',
                'zarządzanie portfelem wydatków',
                'zarządzanie ryzykiem dostaw',
                'rozwój organizacji zakupowej',
                'raportowanie do Zarządu',
              ],
            },
            { title: 'Rezultat', items: ['profesjonalizacja zakupów', 'poprawa governance', 'wdrożenie najlepszych praktyk'] },
          ],
        },
        {
          id: 'rent-a-transformation-leader',
          title: 'Rent-a-Transformation Leader',
          sections: [
            { title: 'Cel', paragraphs: ['Przeprowadzenie programu zmian i transformacji funkcji zakupowej.'] },
            {
              title: 'Zakres',
              items: [
                'diagnoza organizacji',
                'model docelowy',
                'roadmapa zmian',
                'wdrożenie nowych ról i odpowiedzialności',
                'komunikacja i change management',
              ],
            },
            { title: 'Rezultat', items: ['trwała poprawa efektywności organizacji', 'wyższa dojrzałość zakupowa'] },
          ],
        },
      ],
    },
    {
      id: 'rent-an-expert-processes',
      title: 'Procesy i procedury',
      products: [
        {
          id: 'rent-a-process-architect',
          title: 'Rent-a-Process Architect',
          sections: [
            { title: 'Cel', paragraphs: ['Budowa i optymalizacja procesów zakupowych.'] },
            {
              title: 'Zakres',
              items: ['mapowanie procesów', 'identyfikacja luk', 'standaryzacja', 'uproszczenie ścieżek akceptacyjnych', 'wdrażanie KPI procesowych'],
            },
            { title: 'Rezultat', items: ['krótszy czas realizacji zakupów', 'mniej błędów procesowych', 'większa transparentność'] },
          ],
        },
        {
          id: 'rent-a-policy-manager',
          title: 'Rent-a-Policy Manager',
          sections: [
            { title: 'Cel', paragraphs: ['Budowa ładu korporacyjnego w zakupach.'] },
            {
              title: 'Zakres',
              items: ['polityka zakupowa', 'regulaminy', 'matryce kompetencji', 'limity akceptacyjne', 'Supplier Code of Conduct'],
            },
            { title: 'Rezultat', items: ['zgodność (Compliance)', 'ograniczenie ryzyka', 'uporządkowany governance'] },
          ],
        },
        {
          id: 'rent-a-contract-manager',
          title: 'Rent-a-Contract Manager',
          sections: [
            { title: 'Cel', paragraphs: ['Profesjonalne zarządzanie umowami.'] },
            {
              title: 'Zakres',
              items: ['baza umów', 'monitorowanie terminów', 'renegocjacje', 'zarządzanie KPI dostawców', 'egzekwowanie warunków'],
            },
            { title: 'Rezultat', items: ['ograniczenie utraconych oszczędności', 'poprawa jakości współpracy z dostawcami'] },
          ],
        },
      ],
    },
    {
      id: 'rent-an-expert-tools',
      title: 'Narzędzia i analityka',
      products: [
        {
          id: 'rent-a-procurement-analyst',
          title: 'Rent-a-Procurement Analyst',
          sections: [
            { title: 'Cel', paragraphs: ['Dostarczanie danych wspierających decyzje zakupowe.'] },
            { title: 'Zakres', items: ['Spend Cube', 'analiza wydatków', 'dashboardy Power BI', 'analiza dostawców', 'monitorowanie KPI'] },
            { title: 'Rezultat', items: ['transparentność wydatków', 'szybsze decyzje', 'identyfikacja oszczędności'] },
          ],
        },
        {
          id: 'rent-a-procurement-systems-expert',
          title: 'Rent-a-Procurement Systems Expert',
          sections: [
            { title: 'Cel', paragraphs: ['Wsparcie wdrożenia i wykorzystania narzędzi zakupowych.'] },
            { title: 'Zakres', items: ['e-Sourcing', 'e-Aukcje', 'CLM', 'SRM', 'P2P', 'ProcureComp'] },
            { title: 'Rezultat', items: ['wyższa automatyzacja', 'większa efektywność procesów', 'lepsza kontrola wydatków'] },
          ],
        },
        {
          id: 'rent-a-digital-buyer',
          title: 'Rent-a-Digital Buyer',
          sections: [
            { title: 'Cel', paragraphs: ['Realizacja zakupów przy wykorzystaniu zaawansowanych narzędzi analitycznych i AI.'] },
            { title: 'Zakres', items: ['analiza rynku', 'benchmark kosztów', 'analiza ofert', 'rekomendacje negocjacyjne', 'wykorzystanie AI w sourcingu'] },
            { title: 'Rezultat', items: ['szybsze procesy zakupowe', 'wyższa jakość decyzji', 'większa produktywność zespołu'] },
          ],
        },
      ],
    },
    {
      id: 'spot-check',
      title: 'SPOT Check',
      products: [
        {
          id: 'spot-check-what-is-it',
          title: 'Na czym polega SPOT Check',
          sections: [
            {
              paragraphs: [
                'SPOT Check to szybka, 3-4 tygodniowa diagnoza funkcji zakupowej, która pozwala ocenić dojrzałość organizacji w obszarach Sourcing, Process, Organization oraz Tools.',
                'W efekcie klient otrzymuje Raport Luk, benchmarking względem najlepszych praktyk rynkowych, identyfikację Quick Wins oraz wysokopoziomową roadmapę transformacji zakupów, wskazującą priorytety rozwojowe i potencjalne kierunki zwiększania efektywności organizacji zakupowej.',
              ],
            },
          ],
        },
        {
          id: 'spot-check-goal',
          title: 'Cel',
          sections: [
            {
              items: [
                'określenie aktualnego poziomu rozwoju funkcji zakupowej ("As-Is")',
                'identyfikacja luk względem najlepszych praktyk rynkowych',
                'wskazanie obszarów największych nieefektywności',
                'identyfikacja szybkich usprawnień (Quick Wins)',
                'przygotowanie rekomendacji oraz wysokopoziomowej roadmapy dalszego rozwoju funkcji zakupowej',
              ],
            },
          ],
        },
        {
          id: 'spot-check-sourcing',
          title: 'Zakres — Zarządzanie zakupami (Sourcing)',
          sections: [
            { items: ['kategorie zakupowe', 'baza dostawców', 'kontraktowanie', 'negocjacje', 'realizacja strategii zakupowych'] },
          ],
        },
        {
          id: 'spot-check-process',
          title: 'Zakres — Procesy (Process)',
          sections: [
            { items: ['budżetowanie', 'planowanie zakupów', 'wybór dostawców', 'płatności', 'powiązanie procesów z celami biznesowymi'] },
          ],
        },
        {
          id: 'spot-check-organization',
          title: 'Zakres — Organizacja (Organization)',
          sections: [
            { items: ['rola zakupów w organizacji', 'zakres wpływu na wydatki', 'struktura organizacyjna', 'kompetencje zespołu zakupowego'] },
          ],
        },
        {
          id: 'spot-check-tools',
          title: 'Zakres — Narzędzia (Tools)',
          sections: [
            { items: ['e-sourcing', 'aukcje elektroniczne', 'onboarding dostawców', 'zarządzanie zamówieniami', 'zarządzanie umowami', 'KPI i raportowanie'] },
          ],
        },
        {
          id: 'spot-check-value',
          title: 'Wartość dodana dla klienta',
          sections: [
            {
              groups: [
                { title: '1. Obiektywna ocena dojrzałości zakupowej', paragraphs: ['Klient otrzymuje ocenę funkcji zakupowej na tle dobrych praktyk rynkowych oraz benchmarków branżowych.'] },
                { title: '2. Raport luk (Gap Analysis)', paragraphs: ['Identyfikacja różnic pomiędzy aktualnym sposobem funkcjonowania zakupów a najlepszymi praktykami Procurement Excellence.'] },
                { title: '3. Identyfikacja Quick Wins', paragraphs: ['Wskazanie krótkoterminowych inicjatyw możliwych do wdrożenia przy relatywnie niewielkim nakładzie organizacyjnym.'] },
                {
                  title: '4. Benchmarking rynkowy',
                  paragraphs: ['Porównanie organizacji do:'],
                  items: ['najlepszych praktyk międzynarodowych', 'liderów rynku w Polsce', 'przedsiębiorstw z tej samej branży', 'innych spółek w grupie kapitałowej (benchmarking wewnętrzny)'],
                },
                { title: '5. Roadmapa rozwoju', paragraphs: ['Klient otrzymuje priorytety działań oraz kierunki transformacji zakupów w obszarach organizacji, procesów, narzędzi i zarządzania wydatkami.'] },
              ],
            },
          ],
        },
      ],
    },
  ],
  en: [
    {
      id: 'rent-an-expert-spend-management',
      title: 'Spend Management',
      products: [
        {
          id: 'rent-a-category-manager',
          title: 'Rent-a-Category Manager',
          sections: [
            { title: 'Goal', paragraphs: ['Achieving savings within a selected procurement category.'] },
            {
              title: 'Scope of responsibility',
              items: ['spend analysis', 'identification of savings potential', 'development of the category strategy', 'benchmarking prices and market conditions', 'leading negotiations', 'conducting RFI/RFQ/RFP', 'onboarding new suppliers'],
            },
          ],
        },
        {
          id: 'rent-a-sourcing-manager',
          title: 'Rent-a-Sourcing Manager',
          sections: [
            { title: 'Goal', paragraphs: ['Successfully running a supplier selection process.'] },
            { title: 'Scope', items: ['preparing procurement documentation', 'market communication', 'managing the tender process', 'bid analysis', 'negotiations', 'selection recommendation'] },
          ],
        },
        {
          id: 'rent-a-cost-reduction-manager',
          title: 'Rent-a-Cost Reduction Manager',
          sections: [
            { title: 'Goal', paragraphs: ['Identifying and implementing optimisation initiatives.'] },
            { title: 'Examples', items: ['packaging', 'logistics', 'energy', 'services', 'production costs'] },
            { title: 'KPI', items: ['savings value', 'project ROI', 'number of implemented initiatives'] },
          ],
        },
      ],
    },
    {
      id: 'rent-an-expert-organisation',
      title: 'Organisation',
      products: [
        {
          id: 'rent-a-procurement-manager',
          title: 'Rent-a-Procurement Manager',
          sections: [
            { title: 'Goal', paragraphs: ['Temporary management of the client’s procurement function.'] },
            { title: 'Scope', items: ['leading the procurement team', 'KPI management', 'priority setting', 'team capability development', 'reporting to the board'] },
            { title: 'Outcome', items: ['organisational stabilisation', 'improved function efficiency', 'higher procurement maturity'] },
          ],
        },
        {
          id: 'rent-a-cpo',
          title: 'Rent-a-CPO',
          sections: [
            { title: 'Goal', paragraphs: ['For companies without a Head of Procurement.'] },
            { title: 'Scope', items: ['building the procurement strategy', 'managing the spend portfolio', 'supply risk management', 'developing the procurement organisation', 'reporting to the Board'] },
            { title: 'Outcome', items: ['professionalisation of procurement', 'improved governance', 'implementation of best practices'] },
          ],
        },
        {
          id: 'rent-a-transformation-leader',
          title: 'Rent-a-Transformation Leader',
          sections: [
            { title: 'Goal', paragraphs: ['Delivering a change and transformation programme for the procurement function.'] },
            { title: 'Scope', items: ['organisation diagnosis', 'target operating model', 'change roadmap', 'implementation of new roles and responsibilities', 'communication and change management'] },
            { title: 'Outcome', items: ['lasting efficiency improvement across the organisation', 'higher procurement maturity'] },
          ],
        },
      ],
    },
    {
      id: 'rent-an-expert-processes',
      title: 'Processes & Procedures',
      products: [
        {
          id: 'rent-a-process-architect',
          title: 'Rent-a-Process Architect',
          sections: [
            { title: 'Goal', paragraphs: ['Building and optimising procurement processes.'] },
            { title: 'Scope', items: ['process mapping', 'gap identification', 'standardisation', 'simplifying approval paths', 'deploying process KPIs'] },
            { title: 'Outcome', items: ['shorter procurement lead times', 'fewer process errors', 'greater transparency'] },
          ],
        },
        {
          id: 'rent-a-policy-manager',
          title: 'Rent-a-Policy Manager',
          sections: [
            { title: 'Goal', paragraphs: ['Building corporate governance in procurement.'] },
            { title: 'Scope', items: ['procurement policy', 'procedures', 'competency matrices', 'approval thresholds', 'Supplier Code of Conduct'] },
            { title: 'Outcome', items: ['compliance', 'risk reduction', 'structured governance'] },
          ],
        },
        {
          id: 'rent-a-contract-manager',
          title: 'Rent-a-Contract Manager',
          sections: [
            { title: 'Goal', paragraphs: ['Professional contract management.'] },
            { title: 'Scope', items: ['contract repository', 'deadline tracking', 'renegotiations', 'supplier KPI management', 'terms enforcement'] },
            { title: 'Outcome', items: ['reduced value leakage', 'better supplier collaboration quality'] },
          ],
        },
      ],
    },
    {
      id: 'rent-an-expert-tools',
      title: 'Tools & Analytics',
      products: [
        {
          id: 'rent-a-procurement-analyst',
          title: 'Rent-a-Procurement Analyst',
          sections: [
            { title: 'Goal', paragraphs: ['Providing data that supports procurement decisions.'] },
            { title: 'Scope', items: ['Spend Cube', 'spend analysis', 'Power BI dashboards', 'supplier analysis', 'KPI monitoring'] },
            { title: 'Outcome', items: ['spend transparency', 'faster decisions', 'savings identification'] },
          ],
        },
        {
          id: 'rent-a-procurement-systems-expert',
          title: 'Rent-a-Procurement Systems Expert',
          sections: [
            { title: 'Goal', paragraphs: ['Supporting the implementation and use of procurement tools.'] },
            { title: 'Scope', items: ['e-Sourcing', 'e-Auctions', 'CLM', 'SRM', 'P2P', 'ProcureComp'] },
            { title: 'Outcome', items: ['higher automation', 'greater process efficiency', 'better spend control'] },
          ],
        },
        {
          id: 'rent-a-digital-buyer',
          title: 'Rent-a-Digital Buyer',
          sections: [
            { title: 'Goal', paragraphs: ['Executing procurement work with advanced analytical tools and AI.'] },
            { title: 'Scope', items: ['market analysis', 'cost benchmarking', 'bid analysis', 'negotiation recommendations', 'using AI in sourcing'] },
            { title: 'Outcome', items: ['faster procurement processes', 'higher decision quality', 'greater team productivity'] },
          ],
        },
      ],
    },
    {
      id: 'spot-check',
      title: 'SPOT Check',
      products: [
        {
          id: 'spot-check-what-is-it',
          title: 'What is SPOT Check?',
          sections: [
            {
              paragraphs: [
                'SPOT Check is a fast 3-4 week assessment of the procurement function that evaluates organisational maturity across Sourcing, Process, Organisation and Tools.',
                'As a result, the client receives a Gap Report, benchmarking against best market practices, Quick Wins identification and a high-level procurement transformation roadmap that sets development priorities and the most promising directions for improving procurement efficiency.',
              ],
            },
          ],
        },
        {
          id: 'spot-check-goal',
          title: 'Goal',
          sections: [
            {
              items: [
                'determine the current development level of the procurement function ("As-Is")',
                'identify gaps against best market practices',
                'highlight the areas of greatest inefficiency',
                'identify quick improvements (Quick Wins)',
                'prepare recommendations and a high-level roadmap for further development of the procurement function',
              ],
            },
          ],
        },
        {
          id: 'spot-check-sourcing',
          title: 'Scope - Sourcing',
          sections: [
            { items: ['procurement categories', 'supplier base', 'contracting', 'negotiations', 'execution of procurement strategies'] },
          ],
        },
        {
          id: 'spot-check-process',
          title: 'Scope - Process',
          sections: [
            { items: ['budgeting', 'procurement planning', 'supplier selection', 'payments', 'linking processes to business goals'] },
          ],
        },
        {
          id: 'spot-check-organization',
          title: 'Scope - Organisation',
          sections: [
            { items: ['the role of procurement in the organisation', 'scope of influence over spend', 'organisational structure', 'procurement team capabilities'] },
          ],
        },
        {
          id: 'spot-check-tools',
          title: 'Scope - Tools',
          sections: [
            { items: ['e-sourcing', 'electronic auctions', 'supplier onboarding', 'purchase order management', 'contract management', 'KPI and reporting'] },
          ],
        },
        {
          id: 'spot-check-value',
          title: 'Value for the client',
          sections: [
            {
              groups: [
                { title: '1. Objective assessment of procurement maturity', paragraphs: ['The client receives an assessment of the procurement function against market good practices and industry benchmarks.'] },
                { title: '2. Gap Analysis', paragraphs: ['Identification of the differences between the current way procurement operates and the best practices of Procurement Excellence.'] },
                { title: '3. Identification of Quick Wins', paragraphs: ['Identification of short-term initiatives that can be implemented with relatively limited organisational effort.'] },
                { title: '4. Market benchmarking', paragraphs: ['Comparison of the organisation against:'], items: ['best international practices', 'market leaders in Poland', 'companies from the same industry', 'other companies in the capital group (internal benchmarking)'] },
                { title: '5. Development roadmap', paragraphs: ['The client receives action priorities and directions for procurement transformation across organisation, processes, tools and spend management.'] },
              ],
            },
          ],
        },
      ],
    },
  ],
}