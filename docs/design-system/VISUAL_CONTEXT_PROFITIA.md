# VISUAL CONTEXT - PROFITIA DESIGN SYSTEM
> **Status:** Source of Truth | Version 1.0 | May 2026
> **Scope:** Wszystkie strony, podstrony, komponenty, sekcje, CTA, formularze, dashboardy, landing pages, moduły SaaS.
> **Obowiązuje od:** teraz i przez cały czas życia projektu.

---

## SYSTEM DOCUMENTS

| Document | Scope | Status |
|----------|-------|--------|
| VISUAL_CONTEXT_PROFITIA.md | Brand DNA, color system, global design rules | Source of Truth |
| CAPABILITY_EDITORIAL_SYSTEM.md | Services, Education, detail pages - editorial doctrine | Source of Truth |
| RECRUITMENT_EDITORIAL_SYSTEM.md | Career listing, job detail pages, application form, consent architecture | Source of Truth |
| LEGAL_SYSTEM.md | Legal, privacy, policy pages | Source of Truth |
| IMAGE_ART_DIRECTION.md | Photography, image editorial rules | Source of Truth |

For all capability platform work (Services, Education, detail pages), **CAPABILITY_EDITORIAL_SYSTEM.md** takes precedence on editorial and rhythm decisions. For all recruitment and application surfaces, **RECRUITMENT_EDITORIAL_SYSTEM.md** takes precedence. This document governs global visual language.

---

## JAK UŻYWAĆ TEGO DOKUMENTU

Ten plik jest **primary reference** dla każdego nowego elementu UI.

Przed zbudowaniem czegokolwiek - strony, sekcji, komponentu, CTA:

1. Przeczytaj sekcję **Brand DNA** i **Visual Character**
2. Sprawdź **Color System** - wybierz kolor z palety, nie intuicyjnie
3. Zastosuj **Section Composition Rules** - nie stackuj bloków jak landing page builder
4. Zweryfikuj przez **Anti-Patterns** - jeśli cokolwiek pasuje do listy zakazanej, cofnij
5. Przejdź przez **Visual Consistency Guardrails** - ostateczna weryfikacja

Jeśli coś nie istnieje w tym dokumencie → zapytaj, nie zgaduj.

---

## 1. BRAND DNA

### Kim jest Profitia

Profitia **nie jest**:
- software startup (brak neonów, brak "move fast" estetyki)
- agencją kreatywną (brak portfolio grid, brak agency animation)
- klasycznym consultingiem (brak corporate navy + white klichés)
- bootstrap enterprise software (brak ciężkich sidebar dashboardów, brak form-heavy UI)

Profitia **jest**:
- **premium strategic intelligence platform** - operuje na poziomie decyzji C-suite
- **negotiation intelligence company** - specjalistyczna wiedza, dane, przewaga
- **executive SaaS** - UI musi być godne prezentacji przed CFO / CPO / Board
- **data-driven advisory platform** - content ważniejszy niż dekoracja
- **sophisticated enterprise technology brand** - elegancja, nie ostentacja

### Inspiracje wizualne

| Marka | Co przenieść |
|-------|-------------|
| **Linear** | Compositional grid, dark depth, micro-typography |
| **Vercel** | Editorial whitespace, section rhythm, monochromatic confidence |
| **Ramp** | Financial intelligence UI, clean data presentation |
| **Stripe editorial** | Long-form elegance, visual hierarchy, confident type scale |
| **Notion enterprise** | Content-first layout, readable density, calm UI |
| **Apple enterprise** | Premium craftsmanship, image treatment, breathing room |

### Co definiuje Profitia visual identity

- **Negotiation** - napięcie, precyzja, waga decyzji - UI musi to oddawać
- **Intelligence** - data, pattern, insight - layout musi komunikować głębię
- **Premium** - każdy piksel ma uzasadnienie - brak przypadkowych elementów
- **Quiet confidence** - nie krzyczy, nie sprzedaje agresywnie, mówi spokojnie i pewnie

---

## 2. VISUAL CHARACTER

### Przymiotniki UI

| ✅ Docelowe | ❌ Zakazane |
|------------|------------|
| premium | generic |
| minimalistyczny | dashboard-heavy |
| editorial | template-like |
| cinematic | startup neon |
| elegant | bootstrap |
| strategic | agency feel |
| refined | corporate consulting cliché |
| quiet luxury SaaS | Webflow template vibe |
| composition-driven | stacked blocks |
| asymmetrical | rigid symmetric grid |
| whitespace-driven | compressed / dense |

### Tone of UI

UI Profitii ma brzmieć wizualnie jak:
- raport przygotowany przez McKinsey × Bloomberg Technology
- narzędzie, któremu ufa procurement director dużej korporacji
- platforma, która wygląda drożej niż kosztuje

---

## 3. COLOR SYSTEM

### Paleta brandbook Profitia (oficjalna)

#### Primary Colors

| Nazwa | HEX | RGB | Zastosowanie |
|-------|-----|-----|-------------|
| **Deep Navy** | `#242F44` | 36 / 47 / 68 | Primary brand, dark sections, headline accents |
| **Corporate Blue** | `#006D9E` | 0 / 109 / 158 | Interactive elements, link hover, secondary CTA |
| **Bright Blue** | `#0092D9` | 0 / 146 / 217 | Active states, data highlights, charts |

#### Premium Accents

| Nazwa | HEX | RGB | Zastosowanie |
|-------|-----|-----|-------------|
| **Deep Purple** | `#48103F` | 72 / 16 / 63 | Dark accent sections, premium moments, testimonial bg |
| **Magenta Accent** | `#8E0055` | 142 / 0 / 85 | High-contrast accent, metric highlights, selected states |

#### Neutrals

| Nazwa | HEX | Tailwind odpowiednik | Zastosowanie |
|-------|-----|---------------------|-------------|
| **Dark Gray** | `#3B3838` | ~ gray-800 | Body text, secondary headlines |
| **Medium Gray** | `#767171` | ~ gray-500 | Supporting text, meta, labels |
| **Soft Gray** | `#A6A6A6` | ~ gray-400 | Placeholders, muted UI elements |
| **Light Gray** | `#D9D9D9` | ~ gray-300 | Borders, dividers, subtle lines |
| **Blue Gray** | `#CAD2E3` | - | Section tints, card backgrounds, subtle depth |

### Background Logic - systemowe użycie tła

Kolory tła muszą tworzyć **tonal rhythm** - nie przypadkowe sekcje.

| Typ sekcji | Tło | Przeznaczenie |
|-----------|-----|--------------|
| **Primary / hero** | `bg-white` | Otwarcie, maksymalny oddech |
| **Secondary / alternating** | `bg-gray-50` lub `#CAD2E3/15` | Delikatna zmiana bez kontrastu |
| **Dark accent break** | `bg-[#242F44]` | Testimonial, proof moment, executive statement |
| **Premium dark moment** | `bg-[#48103F]` | Wyjątkowe sekcje - sparingly |
| **Full black CTA** | `bg-black` | CTA section - identyczna z landing page |
| **Data section** | `bg-gray-900` | Wykresy, metryki, insight sections |

#### Gradient Logic

Dozwolone gradienty:
- `bg-gradient-to-b from-white to-gray-50` - delikatne przejście między sekcjami
- `bg-gradient-to-r from-[#242F44] to-[#006D9E]` - hero dark variant, sparingly
- `from-black/20 to-transparent` - overlay na zdjęciach (standard)
- `from-black/30 to-transparent` - hero image overlay (bardziej intensywny)

Zakazane gradienty:
- rainbow / multi-color gradients
- neon gradients (`pink → purple → blue`)
- heavy solid-to-transparent na kolorowych tłach bez uzasadnienia

### Tailwind Config - stan docelowy

```ts
// tailwind.config.ts - docelowa konfiguracja
colors: {
  brand: {
    navy: '#242F44',      // Primary - Deep Navy
    blue: '#006D9E',      // Corporate Blue
    bright: '#0092D9',    // Bright Blue
    purple: '#48103F',    // Deep Purple
    magenta: '#8E0055',   // Magenta Accent
    // Neutrals (reference Tailwind grays - nie custom)
  }
}
```

> **Uwaga:** Obecna config ma `brand.primary: #1a365d` - to placeholder, nie brandbook. Wymaga aktualizacji na `#242F44`.

---

## 4. TYPOGRAPHY SYSTEM

### Stack

| Rola | Font | Weight range |
|------|------|-------------|
| **Headlines** | Inter (nie Poppins) | 500-700 |
| **Body** | Inter | 400-500 |
| **Labels / caps** | Inter | 500-600 |
| **Data / mono** | JetBrains Mono (opcjonalnie) | 400 |

> **Kluczowe:** UI Profitii używa **Inter jako jedynego fonta**. Poppins (`font-heading`) był placeholder - nie pasuje do editorial premium character. Wszystkie nowe komponenty: tylko Inter.

### Hierarchy Rules

#### Labels (section openers)

```
text-xs font-medium tracking-[0.25em] uppercase text-gray-400
```
Przykład: `"O firmie"`, `"Jak działamy"`, `"Wyniki"` - zawsze nad H2.

#### H1 - Page heroes

```
text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight
text-gray-900 leading-[1.08]
```

#### H2 - Section headlines

```
text-3xl md:text-4xl font-semibold tracking-tight
text-gray-900 leading-tight
```

#### H3 - Card / feature titles

```
text-lg font-semibold text-gray-900 tracking-tight
```

#### H4 - Minor titles

```
text-base font-semibold text-gray-900
```

#### Body - primary

```
text-base text-gray-600 leading-relaxed
```

#### Body - supporting / secondary

```
text-sm text-gray-500 leading-relaxed
```

#### Metric / stat display

```
text-5xl font-semibold tracking-tight text-gray-900
```
lub na dark bg:
```
text-5xl font-semibold tracking-tight text-white
```

#### Caps label - dark sections

```
text-xs font-semibold tracking-[0.2em] uppercase text-gray-600
```
(używane w CTA `bg-black`)

### Paragraph Width Rules

| Kontekst | Max-width |
|---------|----------|
| H1 / hero headline | `max-w-xl` do `max-w-2xl` |
| H2 / section headline | `max-w-xl` |
| Body paragraph | `max-w-prose` (65ch) lub `max-w-md` |
| CTA headline | `max-w-2xl mx-auto` |
| CTA subtitle | `max-w-lg mx-auto` |

> Długie linie tekstu niszczą premium feel. Nigdy `w-full` dla tekstu narracyjnego.

---

## 5. SPACING & LAYOUT PHILOSOPHY

### Sekcje - vertical padding

| Typ | Klasy |
|-----|-------|
| Standard section | `py-28` |
| Hero section | `py-20 lg:py-0` (split-screen) lub `py-24` |
| CTA section | `py-24 lg:py-32` |
| Compact section | `py-16` |

### Kontenery

```
.container-base → max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

Dla węższych treści (blog, forms, legal):
```
max-w-3xl mx-auto
```

### Whitespace Philosophy

UI Profitii operuje na zasadzie **breathing room** - każdy element ma przestrzeń do istnienia.

- Między label a H2: `mb-5` do `mb-6`
- Między H2 a body: `mb-6` do `mb-8`
- Między body a CTA/listy: `mb-8` do `mb-10`
- Między body a grid: `mb-12` do `mb-16`
- Sekcja gap (grid): `gap-16 lg:gap-20` lub `gap-24`

> Jeśli coś wygląda za ciasno → dodaj whitespace. Never compress.

### Layout Character

- **Asymetryczny**: `grid-cols-1 lg:grid-cols-2` z różnymi wagami kolumn (`lg:grid-cols-[60%_40%]`)
- **Compositional**: elementy nie są centered-by-default - mają optyczną wagę
- **Left-anchored**: większość headlinów left-aligned, nie centered (z wyjątkiem CTA i testimonials)
- **Non-rigid**: nie wszystkie kolumny równe, nie wszystkie sekcje identyczne

---

## 6. GRID SYSTEM

### Standard content grids

```
grid grid-cols-1 md:grid-cols-2 gap-8       // 2-col card grid
grid grid-cols-1 md:grid-cols-3 gap-5       // 3-col service cards
grid grid-cols-1 lg:grid-cols-2 gap-16      // image + content split
```

### Proof section / feature grid (landing page style)

```
grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden
```
Komórki: `bg-white p-10 group hover:bg-gray-900 transition-all duration-300`

Ten pattern pochodzi z landing page - używaj dla "co dostaniesz", "jak to działa", process steps.

### Split-screen (hero, image + content sections)

```
grid grid-cols-1 lg:grid-cols-2
```
Lewa kolumna: content z `px-6 md:px-10 lg:px-14 py-20`
Prawa kolumna: obraz z `relative h-[60vh] lg:h-[calc(100vh-64px)]`

---

## 7. CARD SYSTEM

### Standard service / feature card

```
border border-gray-200 rounded-xl p-8
hover:bg-gray-900 hover:border-gray-900 hover:text-white hover:shadow-lg
transition-all duration-300
```

Ikona w karcie: `text-gray-400` (no background circle, no colored container)
Tytuł karcie: `text-lg font-semibold text-gray-900 group-hover:text-white`
Body w karcie: `text-sm text-gray-600 group-hover:text-gray-300`

### Stat / metric display (no card border)

```
// Editorial - bez box, bez border, tylko cyfra + label
<p class="text-5xl font-semibold tracking-tight text-gray-900 mb-3">{value}</p>
<p class="text-sm text-gray-500 max-w-[240px] leading-relaxed">{label}</p>
```
Separator między statami: `border-t border-gray-100 pt-10`

### Testimonial (dark bg)

Testimonial **zawsze** na `bg-gray-900` lub `bg-[#242F44]`:
```
section: py-28 bg-gray-900 text-white border-t border-gray-800
quote: text-2xl md:text-3xl font-semibold tracking-tight leading-snug text-white
author: text-sm font-medium text-white
role: text-xs text-gray-500 mt-0.5
metric separator: border-t border-gray-800 mt-16 pt-12
```

### Anti-card patterns (zakazane)

- `shadow-xl` bez hover - wygląda ciężko
- `bg-brand-light` z `border-brand-secondary` - corporate feeling
- `rounded-2xl` na zwykłych kartach z treścią - zbyt playful
- `card hover:shadow-md` bez color change - zbyt bootstrap

---

## 8. BUTTON SYSTEM

### Primary button - jasne tła

```
bg-black text-white rounded-xl px-6 py-3.5 font-medium text-sm
hover:bg-gray-800 transition-colors duration-200
```

### Primary button - dark sections (bg-black)

```
bg-white text-black rounded-xl px-8 py-4 font-medium text-base
hover:bg-gray-100 transition-colors duration-200
```

### Secondary / outline button

```
border border-gray-300 text-gray-700 rounded-xl px-6 py-3.5 font-medium text-sm
hover:border-gray-900 hover:text-gray-900 transition-colors duration-200
```

### Secondary - dark sections

```
border border-gray-700 text-gray-300 rounded-xl px-8 py-4 font-medium text-base
hover:border-gray-400 hover:text-white transition-colors duration-200
```

### Brand CTA button (alternatywny - sparingly)

```
bg-[#242F44] text-white rounded-xl px-6 py-3.5 font-medium text-sm
hover:bg-[#006D9E] transition-colors duration-200
```

### Zakazane

- `btn-primary` z obecnej `globals.css` (navy `#1a365d`, placeholder) - nie używać w nowych komponentach
- `rounded-lg` - używamy `rounded-xl`
- `px-4 py-2` - zbyt kompaktowy, nie premium
- `inline-flex items-center` bez gap - tylko gdy naprawdę potrzebna ikona inline

---

## 9. SECTION COMPOSITION RULES

### Rhythm tonal stron

Strony Profitii mają następować po sobie z **tonal progression**:

```
white → gray-50 → white → gray-50 → gray-900 (dark break) → white → black (CTA)
```

Nigdy: `navy → white → navy → white` - to corporate consulting.
Nigdy: `white → white → white → white` - brak rytmu, brak głębi.

### Sekcja otwierająca (label → headline → body)

Każda sekcja zaczyna się od:
```
1. Label (caps, gray-400, tracking)
2. H2 (semibold, tracking-tight, gray-900)
3. Body / opis
4. Grid / content
```

Odstępy:
- Label → H2: `mb-5`
- H2 → body: `mb-6` do `mb-8`
- H2 → grid (jeśli bez body): `mb-12` do `mb-16`

### Separator między sekcjami

Sekcje rozdziela wyłącznie: `border-t border-gray-100`
Nigdy: `<hr>`, `border-t border-gray-300`, `bg-gray-300 h-px`.

### CTA section - zawsze ostatnia

Strony kończą się sekcją CTA:
```
bg-black, py-24 lg:py-32, text-center
```
Dokładny pattern z `public/landing/components/cta.html` - nie modyfikować.

---

## 10. ANIMATION PHILOSOPHY

### Reveal system (istniejący)

Klasy zdefiniowane w `styles/globals.css`:
```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
.reveal.active { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
```

Komponent Next.js: `components/services/subpage-services-1/RevealWrapper.tsx`

### Zasady animacji

| ✅ Dozwolone | ❌ Zakazane |
|------------|------------|
| fade in opacity (0 → 1) | slide-in z boku (translateX) |
| subtle translateY (24px) | scale up / bounce |
| stagger delay (0.1-0.4s) | delay > 0.5s |
| smooth hover transitions (200-300ms) | animations > 600ms |
| opacity hover na kartach | flashy entrance effects |

### Hover transitions - standard

```
transition-all duration-300     // karty z color change
transition-colors duration-200  // buttony, linki
transition-transform duration-200  // arrow → translate-x-1
```

---

## 11. IMAGE TREATMENT

### Standard - full section image

```
relative h-[380px] md:h-[480px] rounded-2xl overflow-hidden
<Image fill className="object-cover" />
<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
```

### Hero split-screen - prawa kolumna

```
relative w-full h-[60vh] lg:h-[calc(100vh-64px)] overflow-hidden
<Image fill className="object-cover" priority />
<div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
```

### Art direction guidelines

- **Kolorystyka:** zimnoniebieska, szaro-niebieskawa, ciemna - pasuje do brand navy
- **Temat:** ludzie w kontekście biznesowym, dane, negocjacje, spotkania boardroom
- **Styl:** editorial, cinematic - nie marketing stock, nie cheesy handshake
- **Overlay:** zawsze `from-black/20` lub `from-black/30` - nigdy plain background

### Zakazane

- Clipart / ilustracje wektorowe bez kontekstu
- Oversaturated stock photos (uśmiechnięci ludzie z laptopami)
- Białe tło na zdjęciach bez rounded-2xl/overflow-hidden
- Zdjęcia bez overlay w kontekście premium

---

## 12. RESPONSIVE DESIGN RULES

### Breakpoints (Tailwind default)

| Breakpoint | Zastosowanie |
|-----------|-------------|
| base | Mobile first - single column, pełna szerokość |
| `md:` (768px) | 2-column grids, show desktop nav elements |
| `lg:` (1024px) | Split-screen layouts, full desktop experience |
| `xl:` (1280px) | Spacious containers, wide content |

### Mobile typography

Na mobile H1 zmniejsza się automatycznie:
```
text-4xl md:text-5xl lg:text-6xl
```
Body nie zmienia się - `text-base` wystarczy na mobile.

### Mobile spacing

Sekcje na mobile mają padding boczny:
```
px-4 sm:px-6  // via container-base
```
Sekcja hero na mobile:
```
py-20 lg:py-0  // split-screen: content ma py-20 na mobile
```

### Mobile stacking

- Gridy zawsze `grid-cols-1` jako base → `md:grid-cols-2` lub `lg:grid-cols-2`
- Split-screen: image na mobile jest `h-[60vh]` PRZED contentem
- Nav mobile: hamburger lub uproszczony - nie `hidden` bez zastępnika

### Touch areas

- Buttony minimum `py-3.5` (touch target ≥ 44px)
- Linki nawigacyjne minimum `py-3`
- Karty z linkiem: cały element klikalny

---

## 13. UX PRINCIPLES

### 1. Content over decoration

Każdy element wizualny musi komunikować coś znaczącego. Brak dekoracyjnych dividerów, brak random shapes, brak ilustracji dla "urozmaicenia".

### 2. Progressive disclosure

Strony zaczynają od syntezy (hero), potem rozbudowują temat (overview, details, proof), kończą na akcji (CTA). Nigdy nie zaczynaj od szczegółów.

### 3. Hierarchy is king

Użytkownik patrząc na sekcję ma natychmiast wiedzieć co jest najważniejsze. Jeden dominujący element - headline, stat, lub obraz. Reszta podporządkowana.

### 4. Trust signals - nieagresywne

Social proof (testimonials, stats, case studies) - zawsze jako dark accent break (gray-900), nie pop-up, nie banner. Musi wyglądać jak fakt, nie claim.

### 5. CTA - jedno na sekcję

Każda strona ma jeden primary CTA path. Sekcje mogą mieć secondary linki ("Dowiedz się więcej"), ale tylko jedna sekcja ma główny przycisk akcji.

---

## 14. COMPONENT REUSABILITY RULES

### Komponenty tworzysz gdy:

- Element pojawia się w 2+ miejscach
- Ma warianty (background, imageLeft/imageRight, dark/light)
- Zawiera logikę (animacja, interaktywność)

### Komponenty ogólne vs. page-specific

```
components/
  layout/         // Header, Footer - globalne
  services/
    subpage-services-1/  // page-specific - OK dla teraz
  ui/             // (docelowo) Button, Card, Label, RevealWrapper
```

### Props convention

Sekcje przyjmują **wszystkie treści jako props** - zero hardcoded stringów w komponentach. Komponenty są wizualnie opinionated, treściowo agnostic.

### Istniejące komponenty do reuse

| Komponent | Ścieżka | Reużywalny |
|-----------|---------|-----------|
| `RevealWrapper` | `components/services/subpage-services-1/RevealWrapper.tsx` | ✅ Przenieść do `components/ui/` |
| `HeroSection` | `components/services/subpage-services-1/HeroSection.tsx` | ✅ Z wariantami |
| `CtaSection` | `components/services/subpage-services-1/CtaSection.tsx` | ✅ Globalny |
| `TestimonialSection` | `components/services/subpage-services-1/TestimonialSection.tsx` | ✅ |
| `ImageContentSection` | `components/services/subpage-services-1/ImageContentSection.tsx` | ✅ |

---

## 15. LOGO SYSTEM

### Dostępne wersje

Wszystkie pliki w: `Logotypy/`

| Plik | Zastosowanie |
|------|-------------|
| `final - PROFITIA logo poppins.svg` | **PRIMARY** - jasne tła, header, standardowe sekcje |
| `final - PROFITIA logo poppins WHITE.svg` | Ciemne tła, footer, dark CTA, navy bg |
| `final - PROFITIA logo poppins BLACK.svg` | Ultra-clean jasne sekcje - selektywnie |

### Deployment do public

Logo do użycia w Next.js musi być skopiowane do `public/`:
```
public/
  logo/
    profitia-default.svg    // kopia "final - PROFITIA logo poppins.svg"
    profitia-white.svg      // kopia "final - PROFITIA logo poppins WHITE.svg"
    profitia-black.svg      // kopia "final - PROFITIA logo poppins BLACK.svg"
```

### Header Rule

Header (`bg-white`):
```tsx
<Image src="/logo/profitia-default.svg" alt="Profitia" width={120} height={32} />
```

Header na ciemnym tle:
```tsx
<Image src="/logo/profitia-white.svg" alt="Profitia" width={120} height={32} />
```

### Footer Rule

Footer zawsze ciemny (`bg-[#242F44]` lub `bg-black`):
```tsx
<Image src="/logo/profitia-white.svg" alt="Profitia" width={120} height={32} />
```

### Logo Usage Rules - absolutne

| ✅ Dozwolone | ❌ Zakazane |
|------------|------------|
| Używać z odpowiednim tłem | Zmieniać kolory logo |
| Zachować proporcje | Dodawać shadow / glow |
| Używać jednej z 3 wersji | Tintować / nakładać gradienty |
| Odpowiedni whitespace | Deformować proporcje |
| | Tworzyć inne wersje |
| | Używać tekstu "Profitia" jako zastępnika |

### Spacing wokół logo

```
// Header logo container
px-6 lg:px-8  // horyzontalne
```
Logo nie jest nigdy dosunięte do krawędzi. Zawsze ma padding równy przynajmniej połowie swojej wysokości.

---

## 16. VISUAL CONSISTENCY GUARDRAILS

### Złota zasada

> **Homepage (landing page na `public/landing/index.html`) definiuje visual DNA. Każda podstrona, komponent i sekcja jest rozszerzeniem tego samego systemu.**

### Weryfikacja przed każdym commitem

Przed dodaniem nowej strony / sekcji zadaj te pytania:

- [ ] Czy to wygląda jak **część tego samego produktu** co landing page?
- [ ] Czy używam kolorów z **palety brandowej** (nie `#1a365d` placeholder)?
- [ ] Czy typografia to **Inter** (nie Poppins / font-heading)?
- [ ] Czy whitespace jest **wystarczający** (py-28 dla standardowych sekcji)?
- [ ] Czy sekcja ma **label → headline → body** progression?
- [ ] Czy CTA button to `bg-black` lub `bg-[#242F44]` (nie `btn-primary`)?
- [ ] Czy dark section to `bg-gray-900` lub `bg-[#242F44]` (nie random dark)?
- [ ] Czy animacje to reveal/fade (nie slide-in / bounce)?
- [ ] Czy ikony są `text-gray-400` bez background circle?
- [ ] Czy obraz ma `from-black/20` overlay?

### Anti-bootstrap rules

- Żadne `rounded-lg` na kartach - używamy `rounded-xl`
- Żadne `shadow-md` jako default - tylko na hover dark cards
- Żadne `border-2` - używamy `border` (1px)
- Żadne `text-center` jako domyślne - treści left-aligned
- Żadne `flex-wrap justify-center` na nav linkach

### Anti-template rules

- Żadne sekcje copy-paste z UI kit bez dostosowania do brandowej palety
- Żadne "about us" w 3 kolumnach z ikonami i centered text (generic SaaS)
- Żadne hero z centralnie ułożonym tekstem i stock photo w tle (Webflow)
- Żadne "feature highlight" z colored icon boxes (startup template)

### Anti-corporate-consulting rules

- Żadne `bg-brand-primary` jako sekcja hero (obecny `page.tsx` - do refactoru)
- Żadne `font-heading` (Poppins) na headline
- Żadne `border border-gray-200` hover `shadow-md` bez dark hover color
- Żadne `text-blue-200` jako body text na dark sections (używaj `text-gray-300`)

---

## 17. ANTI-PATTERNS

Poniższe wzorce są **absolutnie zakazane** w całym projekcie Profitia:

### Kolory

```
❌ bg-brand-primary         → używaj bg-[#242F44] lub bg-black
❌ bg-brand-light           → używaj bg-gray-50 lub bg-white
❌ text-blue-200            → używaj text-gray-300 lub text-gray-400
❌ border-brand-secondary   → używaj border-gray-200 lub border-gray-800
❌ focus:ring-brand-primary → używaj focus:ring-[#006D9E]
```

### Typography

```
❌ font-heading (Poppins)   → używaj domyślnego Inter (font-sans)
❌ font-bold z font-heading → używaj font-semibold Inter
❌ text-brand-primary       → używaj text-gray-900
❌ text-blue-200 (body)     → używaj text-gray-300 / text-gray-400
```

### Layout

```
❌ <section class="py-20">   → używaj py-28 (standard) lub py-24 lg:py-32 (CTA)
❌ stack centered sections    → asymetryczny grid
❌ uniform column widths      → różne wagi kolumn
❌ brak separatora sekcji    → border-t border-gray-100 między sekcjami
```

### Buttons

```
❌ .btn-primary (globals.css navy)  → bg-black rounded-xl
❌ .btn-secondary (globals.css)     → border border-gray-300 rounded-xl
❌ rounded-lg                       → rounded-xl
❌ px-4 py-2                       → px-6 py-3.5 minimum
```

### Cards

```
❌ bg-brand-light border-brand     → bg-white border-gray-200 + hover:bg-gray-900
❌ p-6 border rounded-xl hover:shadow-md  → p-8, hover z color change
❌ icon in colored circle bg       → icon raw text-gray-400
❌ checkmark SVG in blue circle    → dot w-1.5 h-1.5 rounded-full bg-gray-400
```

---

## 18. FINAL GLOBAL RULE

> **Każdy nowy element - page, subpage, component, section, CTA, dashboard, feature block, form - MUSI wyglądać jak część tego samego produktu, tego samego design systemu, tej samej marki, tej samej filozofii UI.**

Profitia nie ma "różnych sekcji strony". Ma **jedną spójną obecność cyfrową**.

Jeśli coś co budujesz wygląda inaczej niż landing page lub service subpage - zatrzymaj się. Wróć do sekcji Brand DNA, Visual Character, Color System. Zidentyfikuj rozbieżność. Napraw przed commitem.

---

## 19. FUTURE REFACTORS - lista niespójności

Poniżej zidentyfikowane miejsca wymagające refactoru dla pełnej spójności:

### Priorytet 1 - Krytyczne

| Plik | Problem | Wymagane działanie |
|------|---------|-------------------|
| `tailwind.config.ts` | `brand.primary: #1a365d` - placeholder, nie brandbook | Zaktualizować na `#242F44`, dodać pełną paletę |
| `styles/globals.css` | `.btn-primary` i `.btn-secondary` → navy placeholder | Zaktualizować lub usunąć, zastąpić nowym systemem |
| `styles/globals.css` | `h1-h6 { @apply font-heading }` → Poppins wszędzie | Usunąć, Inter jako jedyny font |
| `components/layout/Header.tsx` | `text-brand-primary` jako logo text | Zastąpić `<Image>` z SVG logo |
| `components/layout/Footer.tsx` | `bg-brand-primary text-blue-200` | Zaktualizować na `bg-[#242F44]`, `text-gray-300` |

### Priorytet 2 - Ważne

| Plik | Problem | Wymagane działanie |
|------|---------|-------------------|
| `app/[lang]/page.tsx` | Hero: `bg-brand-primary` navy → corporate | Pełny redesign z landing page DNA |
| `app/[lang]/page.tsx` | Service cards: hover `shadow-md` bez color | Dark hover pattern |
| `app/[lang]/services/page.tsx` | Placeholder, brak designu | Nowa strona services z grid kart |
| `app/[lang]/about/page.tsx` | Placeholder, `font-heading font-bold` | Nowa strona O nas |
| `app/[lang]/contact/page.tsx` | `focus:ring-brand-primary`, `rounded-lg` inputs | Zaktualizować form styles |

### Priorytet 3 - Medium

| Plik | Problem | Wymagane działanie |
|------|---------|-------------------|
| `app/admin/layout.tsx` | `bg-brand-primary sidebar` | Admin ma swój visual system - ok, ale zaktualizować na brand navy `#242F44` |
| `app/admin/layout.tsx` | `hover:bg-brand-secondary` | → `hover:bg-[#006D9E]` |
| `Logotypy/*.svg` | Pliki są w root projektu, nie w `public/` | Skopiować do `public/logo/` |
| `components/layout/Header.tsx` | Brak mobile hamburger menu | Dodać mobile nav |

### Priorytet 4 - Low / Future

| Obszar | Wymagane działanie |
|--------|-------------------|
| `RevealWrapper.tsx` | Przenieść do `components/ui/RevealWrapper.tsx` |
| `CtaSection.tsx` | Wyekstrahować do globalnego komponentu |
| Blog pages | Brak designu - zaplanować editorial blog layout |
| Admin panel | Osobny visual system dla admin - nie musi matchować public |

---

*Ten dokument jest żywym artefaktem - aktualizuj go gdy design system ewoluuje.*
*Wersja: 1.1 | Ostatnia aktualizacja: May 2026*

---

## 20. HOMEPAGE CANONICAL STRUCTURE

> **Status: LOCKED** - Kanoniczny układ strony głównej. Chroniony. Nie modyfikować bez wyraźnej instrukcji użytkownika.

### Czym jest homepage Profitii

Homepage (`app/(public)/page.tsx`) **nie jest** zwykłą podstroną, template page, generic landing page ani systemem reusable bloków.

Homepage **jest** SIGNATURE EXPERIENCE.

Definiuje:
- brand perception całego produktu,
- strategic positioning Profitii,
- premium feeling i tonal DNA,
- narrative pacing i dramaturgię,
- executive experience C-suite,
- visual DNA rozciągający się na wszystkie podstrony.

Homepage jest bardziej:
- **art-directed** niż inne strony,
- **editorial** - każda sekcja wnosi narrację,
- **cinematic** - sekcje mają dramaturgię, rytm, napięcie,
- **narrative-driven** - nie showcase komponentów, lecz opowieść,
- **strategic** - journey zakupowy użytkownika jest zaplanowany,
- **premium** - wrażenie jakości droższe niż koszt.

---

### HOMEPAGE STRUCTURE LOCK

Poniższa struktura jest **kanoniczna i zablokowana**.

#### Kolejność sekcji - LOCKED

| # | Sekcja | ID / opis | Klucz kompozycyjny |
|---|--------|-----------|-------------------|
| 1 | **Hero** | - | 2 kolumny: tekst L + visual R; badge "+20%" |
| 2 | **Problem** | `#bzze51` | Szare tło; 7 punktów bólowych w 2 kolumnach; quote block z lewym borderem |
| 3 | **Insight** | `#3hhwq4` | Timeline; 3 numerowane punkty w kółkach; szara linia pionowa |
| 4 | **Pillars** | `#pillars-section` | 3 kolumny full-height; hover reveal image; efekt przyciemniania sąsiadów |
| 5 | **Process** | `#b5xg0q` | Kroki 01-05; duże blade numery; editorial divide-y |
| 6 | **Impact** | `#vqj89m` | Dark section `bg-gray-900`; 6 kart ze strzałkami; tonal break |
| 7 | **Use Cases** | `#p8800w` | 4 karty; hover invert na `bg-gray-900`; kontekstowe triggery |
| 8 | **Insights / Articles** | `#insights-section` | Editorial grid 3 kolumny; cinematic card images; strategic perspectives layer |
| 9 | **Proof** | `#d31qlk` | Szare tło; 3 statystyki (+20%, 3-6 tyg., 12+); grid sektorów |
| 10 | **Cases** | `#io58to` | Obraz + 3 bloki (Problem / Działanie / Efekt) |
| 11 | **CTA** | `#g6lvxh` | Czarne tło; finalna konwersja; kanoniczne zamknięcie |

---

### HOMEPAGE MODIFICATION CHECKLIST

Przed każdą zmianą w `app/(public)/page.tsx` odpowiedz:

- [ ] Czy zmieniam kolejność sekcji? → **NIE WOLNO**
- [ ] Czy usuwam sekcję? → **NIE WOLNO**
- [ ] Czy dodaję nową sekcję? → **NIE WOLNO** bez wyraźnej akceptacji użytkownika
- [ ] Czy zmieniam narrative flow? → **NIE WOLNO**
- [ ] Czy refactoruję homepage na template/modularny system? → **NIE WOLNO**
- [ ] Czy zmieniam tekst / copy? → **Dozwolone**
- [ ] Czy zmieniam obrazy / placeholdery? → **Dozwolone**
- [ ] Czy dodaję animacje / hover effects? → **Dozwolone**
- [ ] Czy poprawiam responsiveness / accessibility? → **Dozwolone**
- [ ] Czy zmieniam mikrospacing? → **Dozwolone**
- [ ] Czy poprawiam SEO / semantic HTML? → **Dozwolone**

**Złota zasada:**

> „Czy ta zmiana narusza canonical homepage structure?"
>
> Jeśli TAK → NIE wdrażaj bez wyraźnej instrukcji użytkownika.

---

### HOMEPAGE ARCHITECTURE PROTECTION RULES

#### Co jest chronione

| Element | Status |
|---------|--------|
| Liczba sekcji (11) | LOCKED |
| Kolejność sekcji | LOCKED |
| Strategic flow i narrative pacing | LOCKED |
| 3-filarowa architektura (Pillars section) | LOCKED |
| Overall dramaturgiczny rytm | LOCKED |
| Tonal progression sekcji | LOCKED |
| Identyfikatory sekcji (`#bzze51`, `#b5xg0q` itd.) | LOCKED |
| Hero 2-kolumnowy układ | LOCKED |
| CTA `bg-black` jako domknięcie | LOCKED |
| Insights / Articles jako sekcja #8 (między Use Cases a Proof) | LOCKED |

#### Co można zmieniać

| Element | Status |
|---------|--------|
| Teksty i copy | DOZWOLONE |
| Obrazy i placeholdery | DOZWOLONE |
| Animacje i motion polish | DOZWOLONE |
| Hover effects | DOZWOLONE |
| Responsiveness | DOZWOLONE |
| Accessibility | DOZWOLONE |
| Performance | DOZWOLONE |
| Semantic HTML | DOZWOLONE |
| SEO (meta, alt, headings) | DOZWOLONE |
| Mikrospacing | DOZWOLONE |
| Implementacja komponentów wewnętrznych | DOZWOLONE* |

*Uwaga: użycie reusable components / shell / wrappers wewnątrz sekcji jest dozwolone, o ile NIE zmienia struktury, pacingu, flow ani dramaturgii strony.

#### Override - kiedy wolno zmienić strukturę

Zmiana struktury homepage jest dozwolona WYŁĄCZNIE gdy użytkownik:
1. Wyraźnie i świadomie o to prosi,
2. Zatwierdza zmianę architecture,
3. Akceptuje zmianę narrative flow.

Przypadkowe, automatyczne lub "improvement"-driven zmiany struktury są **bezwzględnie zakazane**.

---

### INSIGHTS / ARTICLES SECTION - LOCKED

> **Dodana: May 2026** | Autoryzowana zmiana kanonicznej struktury homepage.

#### Cel sekcji

Sekcja **Insights / Articles** to editorial authority layer homepage Profitii.

- **NIE jest** content marketingiem, blogiem startupowym, portalem newsowym ani "latest posts feed"
- **JEST** strategic intelligence layer, executive editorial section, curated featured insights

Buduje:
- credibility ekspercką Profitii,
- topical authority SEO (procurement, negotiation, cost strategy),
- trust u C-suite i Dyrektorów Zakupów.

#### Placement

```
Use Cases (#p8800w)
↓
Insights / Articles (#insights-section)   ← LOCKED position
↓
Proof (#d31qlk)
```

#### Architektura techniczna

| Element | Ścieżka |
|---------|---------|
| Section wrapper | `components/sections/insights/FeaturedArticles.tsx` |
| Card component | `components/sections/insights/FeaturedArticleCard.tsx` |
| Barrel export | `components/sections/insights/index.ts` |
| Dictionary key | `homepage.insights` (pl.json + en.json) |

#### Visual rules

- `bg-white` - spokojny editorial background
- `py-28` - standard section spacing
- Grid: 3 kolumny desktop / 2 tablet / 1 mobile
- Card image: `aspect-[16/10]`, `rounded-xl`, hover zoom + brightness dim
- Meta: uppercase, tracked, `text-[10px]`, gray-400
- Title: `text-xl font-semibold`, 2-3 linie max
- CTA: inline text link (NIE button), `→` suffix

#### Editorial direction

Obrazy: cinematic, muted, strategic - procurement, manufacturing, supply chain, analytics, boardroom, industrial.
NIE: startup stock photos, uśmiechnięci ludzie w biurze, generic corporate.

#### Override - modyfikacja sekcji

Dozwolone:
- Dodanie/zmiana artykułów w słowniku
- Zmiana obrazów w słowniku
- Stylizacja hover / animacje

NIE wolno bez wyraźnej instrukcji:
- Usuwać sekcji
- Zmieniać placement (między Use Cases a Proof)
- Zmieniać na "latest posts" dynamiczny feed
- Przepisywać komponentów na inny design system

---

*Sekcja dodana: May 2026 | Bazuje na wersji page.tsx zatwierdzonej po przywróceniu układu z referencyjnego HTML Profitii.*

---

## 21. CANONICAL INTERACTION SYSTEM

> **Status: LOCKED** - Kanoniczny system interakcji. Obowiązuje we WSZYSTKICH komponentach platformy.

### Filozofia interakcji

Profitia to:
- premium strategic advisory
- executive editorial product
- boutique consulting brand

Interakcje mają:
- **wzmacniać spokój** - nie dramatyzować
- **dawać feedback** - nie przyciągać uwagi
- **czuć się premium** - nie startupowo

---

### GLOBALNE REGUŁY HOVER

#### Dozwolone

| Zachowanie | Opis |
|-----------|------|
| Subtle opacity shift | Zmiana opacity: 70-90% → 100% lub odwrotnie |
| Subtle color darkening | gray-400 → gray-700 → gray-900 (progresja) |
| Border transition | border-gray-200 → border-gray-400 |
| Background transition | transparent → gray-50 lub gray-900 (invert cards) |
| Underline reveal | opacity-0 → opacity-30/50, height 1px |
| translateY (-1px max) | Wyłącznie dla card-level hovers |

#### Zakazane

| Zachowanie | Powód |
|-----------|-------|
| `scale` hover | Za agresywne, psuje rytm |
| `bounce` / `spring` | Playful - nie pasuje do tonu |
| Dramatic translate | Traci spokój editorial |
| Glow / glow shadow | Neon/gaming feel |
| Colorful hover states | Dekoncentruje |
| `transition-all` bez powodu | Niekonkretne, może powodować jitter |
| Hover chaos między komponentami | Powoduje incoherent UX |

---

### STANDARD TIMING

```
Micro interactions (color, opacity):   180ms - 220ms  → preferred: 200ms
Card-level transitions (bg, shadow):   260ms - 320ms  → preferred: 300ms
Section/overlay animations:            260ms - 360ms  → preferred: 300ms
Reveal animations:                     500ms - 600ms  → preferred: 550ms
```

### CANONICAL EASING

```
Wszystkie hover + color:   ease-out
Reveal scroll animations:  ease (standard)
Overlay open/close:        ease-out
```

---

### HOVER STANDARDS PER ELEMENT TYPE

#### Navigation links (desktop)

```
Base:   text-gray-500  font-medium
Hover:  text-gray-900
Active: text-gray-900 + hairline underline (opacity-30, h-px)
Timing: duration-200 ease-out
```

#### Navigation links (mobile overlay)

```
Base:   text-gray-700  font-medium
Hover:  text-gray-900
Active: text-gray-900
Timing: duration-150 ease-out
NO movement, NO scale
```

#### Language switcher (desktop + mobile)

```
Active:   text-gray-900 font-semibold
Inactive: text-gray-400
Hover:    text-gray-700
Timing:   duration-150 ease-out
```

#### CTA buttons

```
Base:   bg-[#1C1C1E] text-white
Hover:  bg-[#2D2D30]
Timing: duration-200 ease-out
NO scale, NO glow
```

#### Cards (PremiumCard / hover-invert)

```
Base:   border-gray-200 bg-white
Hover:  bg-gray-900 border-gray-900 text-white shadow-lg
Timing: duration-300 ease-out
translateY: none (reserved only if explicitly added to specific card)
```

#### Article / Insights cards

```
Image hover:  scale-105 + brightness-75
Timing:       duration-700 ease-out (cinematic, slow and refined)
Text/link:    color transition duration-200
```

#### Logo

```
Hover:  opacity-70
Timing: duration-200 ease-out
```

---

### IMPLEMENTATION REFERENCE

Motion tokens: `styles/tokens/motion.ts`

Canonical token mapping:

| Token | Tailwind equivalent | Used for |
|-------|-------------------|---------|
| `hover.soft` | `hover:text-gray-900 transition-colors duration-200` | Nav links, text links |
| `hover.button` | `transition-colors duration-200` | CTA buttons |
| `hover.card` | `hover:bg-gray-900 ... transition-all duration-300` | PremiumCards |
| `hover.icon` | `hover:text-gray-600 transition-colors duration-200` | Icons, small elements |
| `transition.standard` | `transition-colors duration-200` | Default |
| `transition.premium` | `transition-all duration-300` | Cards, surfaces |

---

### CONSISTENCY RULE

> Każdy nowy komponent MUSI używać kanonicznych timing/easing z tej sekcji.
> Komponenty z niezgodnym hover są traktowane jako defekt, nie feature.

Przed commitowaniem nowego komponentu:
- [ ] Hover timing: 150-220ms (micro) lub 260-320ms (card)?
- [ ] Easing: ease-out?
- [ ] Brak scale / bounce / glow?
- [ ] Color progression zgodna z paletą (gray-400 → gray-700 → gray-900)?
- [ ] Spójne z innymi komponentami tego samego typu?

---

*Sekcja dodana: May 2026 | Canonical interaction standard - obowiązuje od tego momentu we wszystkich komponentach.*

---

## SECTION 22 - CONTACT DATA EXPOSURE STANDARD

### REGUŁA KANONICZNA

Każde wystąpienie następujących danych osobowych/kontaktowych na stronie MUSI być renderowane przez kanoniczny protection system (`components/security/`):

- imiona i nazwiska osób
- adresy email
- numery telefonów
- dane kontaktowe konkretnych ludzi

**Nigdy:**
- inline `<a href="mailto:...">` w SSR HTML
- inline `<a href="tel:...">` w SSR HTML
- surowy tekst emaila/telefonu rendorowany po stronie serwera
- ręczna implementacja ochrony poza komponentami kanonicznymi

### CANONICAL COMPONENTS

| Komponent | Plik | Zastosowanie |
|-----------|------|-------------|
| `<ProtectedEmail user domain className />` | `components/security/ProtectedEmail.tsx` | Każdy email |
| `<ProtectedPhone parts display className />` | `components/security/ProtectedPhone.tsx` | Każdy numer telefonu |
| `<ProtectedPerson name className />` | `components/security/ProtectedPerson.tsx` | Imię i nazwisko osoby |

Import zawsze przez barrel: `import { ProtectedEmail, ProtectedPhone, ProtectedPerson } from '@/components/security'`

### MECHANIZM

- SSR renderuje pusty `<span aria-hidden="true" />` - żadnych danych w HTML source
- Po hydration (`useEffect` → `mounted`) renderuje pełny semantyczny element:
  - `<a href="mailto:user@domain">` dla emaila
  - `<a href="tel:+48...">` dla telefonu
  - `<span>` dla nazwiska
- Dane przekazywane jako split props (user + domain osobno) - niewidoczne w source

### WYJĄTKI (nie wymagają ochrony)

- Adres siedziby firmy (instytucjonalny, publiczny)
- NIP / REGON / KRS firmy
- Publiczne dane rejestrowe spółki
- Telefon główny firmy (opcjonalnie - do decyzji per-project)

### GDZIE STOSOWAĆ

Ochrona jest **obowiązkowa** w:
- Footerze (`Footer.tsx`) ✅ wdrożone May 2026
- Stronie kontaktowej
- Stronie O nas (sekcje z ludźmi)
- Stronie kariery
- Stronach autorów bloga
- Formularzach kontaktowych
- Landing pages z danymi osób
- Oknach modalnych z kontaktem

### CHECKLIST PRZED COMMITEM

- [ ] Żaden `href="mailto:"` w statycznym SSR HTML?
- [ ] Żaden `href="tel:"` w statycznym SSR HTML?
- [ ] Żadne nazwisko w SSR HTML?
- [ ] Dane renderowane przez `ProtectedEmail` / `ProtectedPhone` / `ProtectedPerson`?
- [ ] Import z `@/components/security` (nie inline)?
- [ ] TS: zero błędów?

*Sekcja dodana: May 2026 | Contact Data Exposure Standard - obowiązuje od tego momentu we wszystkich komponentach i stronach.*

---

## SECTION 23 - CANONICAL HEADER SYSTEM

> **Source of truth.** Header osiągnął canonical state w maju 2026. Implementacja: `components/layout/Header.tsx`. Wszelkie zmiany wymagają explicit authorization i aktualizacji tej sekcji.

---

### A. HEADER PHILOSOPHY

Header reprezentuje pierwszy i najbardziej persistentny punkt kontaktu użytkownika z marką Profitia. Musi komunikować:

- **Strategic intelligence firm** - nie agencja, nie startup, nie SaaS
- **Restrained authority** - pewność siebie bez nadmiernej ekspresji
- **Editorial calm** - spokojny, wyselekcjonowany, nie krzykliwy
- **Institutional presence** - premium consulting, doradztwo strategiczne

**Personality attributes:**
Restrained · Editorial · Strategic · Premium consulting · Calm · Non-startup · Non-SaaS

**Anti-patterns (forbidden):**
- Dashboard navbar
- Startup bright hero header
- Agency marketing site navigation
- Flashy animated navbar
- Over-spaced mobile-app style header

---

### B. HEADER STRUCTURE

```
[ Logo ]  ·  [ Primary Nav | separator | Secondary Nav ]  ·  [ PL · EN ] [ CTA ] [ ☰ ]
```

**Layout hierarchy:**
- **Logo** - left anchor, flex-shrink-0, no crowding
- **Navigation** - centered visual weight, hidden on mobile
- **Utility cluster** - right: lang switcher → CTA → hamburger

**Container:** `container-base` = `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

**Two-state sticky behavior:**
| State | Height | Background | Border | Shadow |
|-------|--------|------------|--------|--------|
| Top (unscrolled) | `h-[88px]` | `bg-white/0 backdrop-blur-[2px]` | `border-transparent` | none |
| Scrolled (>20px) | `h-[72px]` | `bg-white/96 backdrop-blur-md` | `border-gray-100/80` | `shadow-[0_1px_16px_0_rgba(0,0,0,0.04)]` |

**Transition:** `transition-all duration-[260ms] ease-out` - smooth, not jarring, not instant.

---

### C. DESKTOP NAV RULES

**Nav structure - two tiers, one visual line:**

```
primaryNav: Usługi · Blog          (font-medium, gray-500 → gray-900)
─── separator (w-px h-3.5 bg-gray-200) ───
secondaryNav: O nas · Kontakt      (font-normal, gray-400 → gray-700)
```

**Typography:**
- Font size: `text-[13.5px]`
- Letter spacing: `tracking-[-0.01em]`
- Primary: `font-medium` | Secondary: `font-normal`

**Active state:**
- Primary active: `text-gray-900` + `<span>` underline indicator (`h-px bg-gray-800 opacity-30 rounded-full absolute -bottom-1`)
- Secondary active: `text-gray-700 font-medium`
- No background fills, no pills, no boxes

**Hover state (canonical):**
- Primary: `text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out`
- Secondary: `text-gray-400 hover:text-gray-700 transition-colors duration-200 ease-out`

**Forbidden in nav:**
- Scale transforms
- Background color fills on hover
- Underline on all states (only active)
- Bright color transitions
- Opacity jumps

---

### D. LANGUAGE SWITCHER STANDARD

**Format:** `PL · EN` - dot separator, no full names, no flags, no dropdown.

**Canonical implementation:**
```tsx
<button>PL</button>
<span aria-hidden>·</span>
<button>EN</button>
```

**Typography:** `text-[11.5px]`, `gap-[2px]` between elements

**Active locale:** `text-gray-900 font-semibold`
**Inactive locale:** `text-gray-400 font-normal hover:text-gray-700`
**Transition:** `transition-colors duration-150 ease-out`

**Locale persistence:** cookie `PROFITIA_LOCALE`, `max-age=31536000`, `path=/`, `samesite=lax`

**Forbidden:**
- Country flags
- "PL - Polski" / "EN - English" labels
- Dropdown menu
- Globe icon
- Heavy border/background style

---

### E. CTA BUTTON STANDARD

**Color:** `bg-[#1C1C1E]` (dark graphite) - advisory, authoritative, not SaaS blue

**Hover:** `hover:bg-[#2D2D30]` - subtle lightening, never white/light

**Desktop:** `px-4 py-[9px] text-[13px] font-medium tracking-[-0.01em] rounded-lg`

**Mobile:** `w-full py-4 text-sm font-medium rounded-xl` - full width, taller tap target

**Transition:** `transition-colors duration-200` (no ease-out addition needed on bg-only)

**Forbidden:**
- Gradient backgrounds
- Shadow effects on CTA
- Outline/ghost variant in nav context
- Brand color (non-dark) CTA

---

### F. LOGO INTERACTION

**Default:** full opacity (`opacity-100`)
**Hover:** `hover:opacity-70 transition-opacity duration-200 ease-out`
**Forbidden:** color shift, scale, rotation, any transform

---

### G. MOBILE NAV RULES

**Approach:** Fullscreen overlay - not drawer, not dropdown, not slide-in panel.

**Overlay spec:**
- `fixed inset-0 z-40` - covers full viewport
- `bg-white` - pure white, not frosted, not dark
- Fade in: `opacity-0 → opacity-100 transition-all duration-300 ease-out`
- Translate: `-translate-y-3 → translate-y-0` (subtle upward drift on open)

**Open/close behavior:**
- Hamburger → X toggle (animated, `duration-200`)
- ESC key closes (keyboard listener)
- Route change closes (pathname effect)
- Body scroll locked (`document.body.style.overflow = 'hidden'`)

**Nav links typography:**
- All links (primary + secondary merged): `text-2xl font-medium tracking-tight`
- Vertical rhythm: `py-3` per link, `space-y-0` container
- Active: `text-gray-900` | Inactive: `text-gray-700 hover:text-gray-900`
- Transition: `duration-150 ease-out`

**Single link map (canonical):**
```tsx
[...primaryNav, ...secondaryNav].map(link => <Link ... />)
```
No separate primary/secondary rendering on mobile. Unified list.

**Bottom bar (below nav):**
- `border-t border-gray-100`, `pt-8`
- Language switcher: `text-xs`, same `PL · EN` format
- CTA: full-width dark graphite button
- Contact email: `text-xs text-gray-400` - plain fallback (institutional address)

**Accessibility:**
- `role="dialog" aria-modal="true" aria-label="Menu nawigacyjne"`
- `aria-hidden={!mobileOpen}` on overlay
- `aria-expanded` on hamburger button
- `aria-controls="mobile-nav-panel"` on trigger

---

### H. RESPONSIVENESS

| Breakpoint | Nav | Lang Switcher | CTA | Hamburger |
|------------|-----|--------------|-----|-----------|
| `< md` (mobile) | Hidden | Hidden | Hidden | Visible |
| `≥ md` (desktop) | Visible | Visible | Visible | Hidden |

Mobile breakpoint: Tailwind `md` = 768px

---

### I. HEADER LOCK RULES

**LOCKED - requires explicit authorization to change:**
- Two-state sticky behavior and timing (`260ms`)
- Logo position (always left)
- Nav structure (primary/separator/secondary split)
- CTA color `#1C1C1E`
- Mobile fullscreen overlay approach
- Language switcher format (`PL · EN`)
- Canonical hover timing (`duration-200 ease-out`)

**CONDITIONALLY CHANGEABLE (with justification):**
- Nav link labels (driven by dictionary - localization OK)
- CTA label text (dictionary key)
- Logo file (brand update OK, keep same sizing)
- Header height values (if brand evolution requires)

**FORBIDDEN:**
- Dropdown mega-menu
- Animated logo
- Bright/colored nav hover states
- Nav underlines on all states (only active)
- Scale transforms anywhere in header
- Dark header background (non-scrolled state)
- Background fills on nav links
- Country flag language switcher
- Additional nav items without authorization

*Cross-ref: Section 21 (CANONICAL INTERACTION SYSTEM)*

---

## SECTION 24 - CANONICAL FOOTER SYSTEM

> **Source of truth.** Footer osiągnął canonical state w maju 2026. Implementacja: `components/layout/Footer.tsx`. Kontakty chronione przez canonical security system (Section 22). Wszelkie zmiany wymagają explicit authorization i aktualizacji tej sekcji.

---

### A. FOOTER PHILOSOPHY

Footer jest institutionalną warstwą informacyjną - nie konwersyjną. Musi komunikować:

- **Institutional authority** - pełna informacja, zorganizowana, czytelna
- **Trust architecture** - certyfikaty, dane kontaktowe, adres, zasoby
- **Editorial density** - informacja gęsta ale spokojna, nie przytłaczająca
- **Premium consulting** - nie startup, nie SaaS, nie marketing-heavy

**Personality attributes:**
Institutional · Editorial · Trust-oriented · Premium consulting · Strategic · Calm

**Anti-patterns (forbidden):**
- Dark flashy SaaS footer
- Marketing-heavy "Get started today" footer
- App-like minimalist footer (tylko copyright)
- Startup-style pastel/gradient footer
- Icon-grid social media wall

---

### B. FOOTER ARCHITECTURE

Trzy warstwy, zawsze w tej kolejności:

```
┌──────────────────────────────────────────────────────┐
│ 1. NEWSLETTER LAYER        (border-b border-gray-100) │
├──────────────────────────────────────────────────────┤
│ 2. MAIN INFORMATION GRID   (4-column, py-16)          │
├──────────────────────────────────────────────────────┤
│ 3. LEGAL LAYER             (border-t border-gray-100) │
└──────────────────────────────────────────────────────┘
```

**Background:** `bg-white` - nigdy dark, nigdy gradient

**Section dividers:** `border-gray-100` - delikatne, niewidoczne z daleka

---

### C. NEWSLETTER STANDARD

**Philosophy:** Editorial newsletter invite - nie marketing popup, nie conversion banner.

**Grid:** `md:grid-cols-[1fr_1.1fr]` - lekka asymetria na korzyść formularza, `gap-6 lg:gap-10`

**Left (copy):**
- Eyebrow: `text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400`
- Heading: `text-xl font-semibold tracking-tight text-gray-900 max-w-sm`
- Sub: `text-sm text-gray-500 mt-3 max-w-xs leading-relaxed`

**Right (form):**
- Input + button w jednej linii (`flex gap-2`)
- Input: `px-4 py-3.5 text-sm border border-gray-200 rounded-lg focus:border-gray-500`
- Button: `bg-[#1C1C1E] hover:bg-[#2D2D30] px-5 py-3.5 text-sm font-medium rounded-lg`
- No `max-w` constraint on form - fills column

**Input interaction:**
- Focus: `focus:border-gray-500 focus:outline-none transition-colors duration-200 ease-out`
- No glow, no shadow, no ring

**Forbidden:**
- `rounded-full` (SaaS/startup style)
- Aggressive conversion copy ("Join 10,000+ subscribers!")
- Background color change on hover
- Separate submit arrow icon (text label only)

---

### D. INFORMATION GRID STANDARD

**Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8`

**Column headings (all 4 columns):**
`text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-5`

---

#### Column 1: Brand / Trust

**Purpose:** Institutional identity + credentials

**Contents (canonical order):**
1. Logo link - `hover:opacity-70 transition-opacity duration-200 ease-out`
2. Legal company name - `text-[10px] font-bold tracking-[0.12em] uppercase text-gray-600` (institutional feel)
3. Tagline/descriptor - `text-[11px] text-gray-400 leading-relaxed`
4. Address - `text-[11px] text-gray-400 leading-relaxed`
5. CIPS logo - `grayscale opacity-50 hover:opacity-80 transition-opacity duration-200 ease-out`

**Hierarchy rationale:** Company name gets `font-bold + text-gray-600` (darker than other body) - institutional authority signal.

---

#### Column 2: Navigation

**Purpose:** Redundant navigation for discoverability + SEO

**Contents:** All main nav links + privacy link
**Typography:** `text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out`
**Spacing:** `space-y-2.5`

---

#### Column 3: Contact

**Purpose:** Full contact directory - protected by canonical security system

**Sub-sections (canonical order):**
1. **Main contact** - phone + email (`space-y-1`)
2. **Training & conferences** (sub-label) - name + email + phone (`space-y-0.5`)
3. **SpendGuru** (sub-label) - name + email + phone (`space-y-0.5`)

**Sub-section labels:** `text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-1.5`

**Person name:** `text-gray-700 font-medium text-xs mb-1`

**Contact links:** `text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out`

**Spacing between sub-sections:** `space-y-5` (parent container)

**SECURITY:** All emails, phones, and names MUST use `ProtectedEmail`, `ProtectedPhone`, `ProtectedPerson` from `@/components/security`. See Section 22.

---

#### Column 4: Resources + Social

**Purpose:** Knowledge assets + minimal social presence

**Resources:** `text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out`
- External links: `↗` suffix, `target="_blank" rel="noopener noreferrer"`
- `space-y-3 mb-10`

**Social icons:**
- No label above icons (no "SOCIAL" heading)
- Icons: `w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-200 ease-out`
- `flex items-center gap-3 mt-2`
- SVG icons inline (no external icon library dependency)
- Current: LinkedIn + Facebook

---

### E. LEGAL LAYER STANDARD

**Layout:** Left-aligned only - no right-side content

**Copyright:**
`text-xs text-gray-400`
`© {year} Profitia Management Consultants. {dict.footer.rights}`

**Why no privacy link here:** Privacy link exists in Column 2 (Navigation). Duplication removed - canonical rule is single occurrence.

**Container padding:** `py-5`

**Forbidden:**
- Right-side links in legal bar (privacy already in nav column)
- Legal entity details in legal bar (belongs in brand column)
- Large font size legal text

---

### F. MOBILE FOOTER RULES

**Approach:** Editorial stacking - controlled collapse, consistent rhythm.

**Stack order on mobile (sm → lg breakpoints):**
```
Newsletter (full width)
↓
Brand column
↓
Navigation column
↓
Contact column
↓
Resources + Social column
↓
Legal bar
```

**Grid breakpoints:**
- Mobile: `grid-cols-1` (single column stack)
- Tablet: `grid-cols-2` (2-column layout)
- Desktop: `grid-cols-4`

**Spacing:** `gap-10` maintained on all breakpoints - prevents compression artifacts

**Forbidden:**
- Giant whitespace between stacked columns
- Horizontal scroll
- Collapsed accordion mobile footer
- Different content on mobile (same content, same structure)

---

### G. HOVER CONSISTENCY

All interactive footer elements use canonical interaction system:

| Element | Hover state | Transition |
|---------|-------------|------------|
| Logo | `opacity-70` | `duration-200 ease-out` |
| Nav links | `text-gray-900` | `duration-200 ease-out` |
| Contact links | `text-gray-900` | `duration-200 ease-out` |
| Resource links | `text-gray-900` | `duration-200 ease-out` |
| Social icons | `text-gray-900` | `duration-200 ease-out` |
| CIPS logo | `opacity-80` | `duration-200 ease-out` |
| Newsletter CTA | `bg-[#2D2D30]` | `duration-200` |
| Newsletter input focus | `border-gray-500` | `duration-200 ease-out` |

*Cross-ref: Section 21 (CANONICAL INTERACTION SYSTEM)*

---

### H. FOOTER LOCK RULES

**LOCKED - requires explicit authorization to change:**
- Three-section architecture (newsletter / grid / legal)
- Four-column grid structure
- Column assignment and ordering
- Background: `bg-white`
- Section dividers: `border-gray-100`
- No social label above icons
- No privacy link in legal bar
- Contact protection (Section 22) - all personal data must be protected
- Canonical hover timing (`duration-200 ease-out`)

**CONDITIONALLY CHANGEABLE (with justification):**
- Newsletter copy (dictionary-driven - localization OK)
- Resource links (add/remove PDF assets)
- Social platform links (add LinkedIn/Facebook/Twitter)
- Contact sub-sections (add/remove named contacts)
- Address data (if company moves)

**FORBIDDEN:**
- Dark footer background
- Gradient footer background
- Marketing-heavy conversion copy in newsletter section
- Raw `mailto:` / `tel:` links for personal contact data
- "SOCIAL" label above icon cluster
- Duplicate privacy link in legal bar
- Scale or opacity jump interactions on text links
- Icon library imports (use inline SVG)

*Cross-ref: Section 21 (CANONICAL INTERACTION SYSTEM) | Section 22 (CONTACT DATA EXPOSURE STANDARD)*

---

*Sekcja dodana: May 2026 | Canonical Header + Footer System - source of truth dla globalnego shell Profitia.*

---

## SECTION 25 - CANONICAL LEGAL SYSTEM

> **Status:** Stable | Production-grade | Canonical
> **Cross-ref:** Section 21 (Interaction System) · Section 23 (Header System) · Section 24 (Footer System) · `docs/design-system/LEGAL_SYSTEM.md`

Legal pages constitute a distinct experience system - not a page type, not a template category. They implement a dedicated **editorial + institutional reading architecture** that prioritizes trust, readability, and cognitive calm over conversion, engagement, or aesthetics.

---

### A. PHILOSOPHY

Legal pages serve a different function than every other page on the site. They exist to:

- Build **institutional trust** - the reader is evaluating whether this company can be trusted
- Support **sustained long-form reading** - sections run to hundreds of words
- **Reduce visual fatigue** - dense legal text requires exceptional typographic care
- Project **institutional character** - calm, restrained, authoritative

**What legal pages are:**
- Editorial-quality long-form reading experiences
- Institutional trust signals
- Architecture-first, content-second

**What legal pages are not:**
- Marketing pages
- SaaS settings screens
- CMS-generated policy dumps
- Startup legal screens with developer-grade formatting

**Tone of the system:**
- Calm
- Restrained
- Editorial
- Typographic
- Highly readable

No element on a legal page should compete with the text. No decoration, no illustration, no animation should distract from reading.

---

### B. ARCHITECTURE

The Legal System is composed of 8 canonical components:

| Component | Type | Role |
|-----------|------|------|
| `LegalLayout` | Server | Two-column grid shell - sidebar + content |
| `LegalSidebar` | Client | Sticky desktop TOC wrapper / collapsible mobile |
| `LegalTOC` | Client | IntersectionObserver-based active-section TOC |
| `LegalContent` | Server | Prose container with manual Tailwind arbitrary variants |
| `LegalSection` | Server | Individually scrollable section with `id` and `scroll-mt-28` |
| `LegalHero` | Server | Restrained hero with eyebrow, H1, intro, and metadata chips |
| `LegalMeta` | Server | Metadata chip strip (date, jurisdiction, version) |
| `LegalAnchorLink` | Client | Smooth-scroll anchor with `prefers-reduced-motion` support |

**Layout behavior:**

- **Desktop:** Two-column grid - `240px` sticky sidebar + fluid content column (`max-w-[65ch]`)
- **Mobile:** Single column - collapsible TOC above content
- **Sidebar:** `sticky top-28 self-start` on desktop; accordion pattern on mobile
- **Content width:** Constrained to `max-w-[65ch]` - optimal for long-form reading
- **Spacing:** Deep decompression at page bottom (`pb-32 lg:pb-44`) - reading should end with calm, not collision with footer

**Navigation:**

- TOC tracks the active section using `IntersectionObserver` with `rootMargin: '-10% 0% -70% 0%'`
- Anchor links use smooth scroll with `prefers-reduced-motion` fallback to `behavior: 'auto'`
- URL hash updates on anchor click via `history.pushState` (no Next.js navigation triggered)

---

### C. COMPONENT LOCK RULES

**LOCKED - requires explicit authorization to change:**
- Legal layout two-column grid structure
- Sidebar position (left, `240px`, sticky desktop)
- TOC active tracking logic (IntersectionObserver)
- Content column width (`max-w-[65ch]`)
- Typography rhythm (heading scale, body scale, spacing)
- Section spacing (`scroll-mt-28`, `mt-12`, `pt-6`, `border-t border-gray-100`)
- Bottom decompression spacing (`pb-32 lg:pb-44`)
- `prefers-reduced-motion` smooth-scroll fallback

**CONDITIONALLY CHANGEABLE (with justification):**
- Metadata chip content (dates, jurisdiction labels, version numbers)
- Section count (add/remove sections as legal copy evolves)
- Legal copy and translations
- Language variants (`/en/privacy`, `/en/cookies`, `/en/terms`)

**FORBIDDEN on legal pages:**
- Marketing hero sections
- Illustrations or decorative imagery
- Conversion CTA sections
- Aggressive or brand accent colors
- Dark / cyber aesthetic
- Entrance animations or scroll-triggered effects
- Dense multi-column content layouts
- Modal-based reading flows
- Newsletter or promotional sections (→ Footer Variant, Section 26)

---

### D. TYPOGRAPHY RULES

Legal typography is optimized for long-form reading, not scanning.

| Element | Spec |
|---------|------|
| Body text | `text-[15px] text-gray-600 leading-[1.8]` |
| Paragraph gap | `mb-5` |
| H2 (section) | `text-xl font-semibold tracking-tight text-gray-900 leading-snug mt-12 mb-4` |
| H3 (sub-section) | `text-[15px] font-semibold text-gray-800 mt-7 mb-3` |
| Lists | `list-disc pl-5 mb-5`, item `leading-[1.8] mb-1.5` |
| Strong | `font-semibold text-gray-800` |
| Links | `text-gray-900 underline` with `hover:text-gray-600` |
| Blockquote | `border-l-2 border-gray-200 pl-4 text-gray-500` |
| H1 (hero) | `text-3xl md:text-[2.25rem] font-semibold tracking-tight leading-[1.08]` |
| Hero intro | `text-base text-gray-500 leading-[1.75] max-w-[60ch]` |
| Eyebrow | `text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400` |

**Principles:**
- Line length hard-capped at `max-w-[65ch]` - no sprawling legal text
- Contrast is **restrained** - body is `text-gray-600`, not `text-gray-900` - reduces fatigue on long reads
- Heading hierarchy is strict: H1 → H2 → H3. No skipping.
- Section borders (`border-t border-gray-100`) provide visual pacing without heavy dividers

---

### E. ACCESSIBILITY

| Rule | Implementation |
|------|----------------|
| Reduced motion | `LegalAnchorLink` checks `window.matchMedia('(prefers-reduced-motion: reduce)')` - uses `behavior: 'auto'` when true |
| Keyboard navigation | All TOC links are native `<a>` elements - fully keyboard-reachable |
| Anchor accessibility | TOC `<nav>` has `aria-label="Spis treści"` |
| Heading hierarchy | H1 in `LegalHero` → H2 in `LegalSection` → H3 in `LegalContent` - no skips |
| Mobile reading | Single-column layout, collapsible TOC, `scroll-mt-28` anchor offset |
| TOC nav label | `aria-label` present - screen reader can navigate directly to TOC |

---

*Sekcja dodana: May 2026 | Canonical Legal System - source of truth dla legal reading architecture.*

---

## SECTION 26 - LEGAL FOOTER VARIANT

> **Cross-ref:** Section 24 (Canonical Footer System)

Legal pages use an **institutional footer variant** - the standard newsletter section is suppressed. This is not an option or override; it is the canonical behavior for all legal pages.

---

### A. BEHAVIOR

| Context | Newsletter section | Grid section | Legal bar |
|---------|-------------------|--------------|-----------|
| Standard pages | Visible | Visible | Visible |
| Legal pages | **Hidden** | Visible | Visible |

**Rationale:**

Legal reading is a focused, high-trust activity. A newsletter CTA immediately after reading a Privacy Policy creates:
- A jarring tonal shift (institutional → promotional)
- An impression of data harvesting at exactly the wrong moment
- A disruption of the decompression rhythm at page end

Legal reading ≠ content browsing. The footer should close the experience quietly.

---

### B. CANONICAL IMPLEMENTATION

Auto-detection via `usePathname()` inside `Footer.tsx`:

```tsx
const isLegalPage = ['/privacy', '/cookies', '/terms'].some(
  (p) => pathname === p || pathname === `/en${p}`
)
```

The newsletter `<div>` is conditionally rendered:

```tsx
{!isLegalPage && (
  <div className="border-b border-gray-100">
    {/* Newsletter section */}
  </div>
)}
```

No prop required. No layout modification needed. Detection is automatic.

---

### C. LOCK RULES

**LOCKED:**
- Newsletter section hidden on all legal paths (PL + EN)
- Legal paths: `/privacy`, `/cookies`, `/terms`, `/en/privacy`, `/en/cookies`, `/en/terms`
- Grid section and legal bar always visible on legal pages

**FORBIDDEN on legal pages:**
- Newsletter / email capture CTA
- Promotional sections of any kind
- Conversion-oriented footer content
- Marketing tone in footer copy

**CONDITIONALLY CHANGEABLE:**
- Legal path list (add new legal pages - update the detection array)
- Grid content (consistent with Section 24 rules)

---

*Sekcja dodana: May 2026 | Legal Footer Variant - institutional footer behavior for legal reading.*

---

## SECTION 27 - LEGAL READING UX RULES

> **Cross-ref:** Section 21 (Interaction System) · Section 23 (Header System) · Section 25 (Legal System)

This section defines the **UX doctrine** governing the reading experience on all legal pages. Implementation details live in `LEGAL_SYSTEM.md` and component files. This section defines the *why* and the *what* at system level.

---

### A. READING RHYTHM

Legal text is cognitively demanding. The spacing system exists to reduce fatigue, not to fill space.

**Principles:**

- **Breathing room first** - sections are separated by both spacing and a subtle `border-t border-gray-100`; the eye gets a rest between topics
- **Section rhythm** - each section opens with an H2, body text immediately follows at the same scale; no decorative sub-headers before content begins
- **Decompression spacing** - the page does not end abruptly; `pb-32 lg:pb-44` gives the reader a soft landing before the footer
- **Visual fatigue reduction** - `text-gray-600` (not `text-gray-900`) for body text; `leading-[1.8]` for generous line height
- **Cognitive pacing** - section borders (`border-t`) act as visual chapter breaks that signal "this topic is complete"

---

### B. TOC EXPERIENCE

The Table of Contents is an editorial navigation system, not a utility widget.

| Property | Rule |
|----------|------|
| Font size | `text-[13.5px]` - readable without competing with content |
| Line height | `leading-[1.5]` - prevents cramping on multi-word entries |
| Vertical rhythm | `space-y-3` - entries have room to breathe |
| Active state | Left border rail `border-l-[1.5px] border-gray-700` + `text-gray-900 font-medium` |
| Inactive state | `text-gray-400` - clearly secondary |
| Hover | `hover:text-gray-600 transition-colors duration-200 ease-out` - restrained, no jump |
| Inactive border | `border-gray-100` - barely visible, maintains alignment |
| Mobile | Collapsible accordion above content - open by default on first load |
| Tracking | `IntersectionObserver` with `rootMargin: '-10% 0% -70% 0%'` - activates upper-viewport section |

The TOC never dominates. It is always clearly secondary to the content column.

---

### C. HEADER BEHAVIOR ON LEGAL PAGES

Legal pages **always render the stabilized (scrolled) header state** - from the very first pixel, regardless of scroll position.

| State | Standard pages | Legal pages |
|-------|---------------|-------------|
| At top of page | `bg-white/0 backdrop-blur-[2px] border-transparent h-[88px]` | `bg-white/96 backdrop-blur-md border-gray-100/80 h-[72px]` |
| Scrolled | `bg-white/96 backdrop-blur-md border-gray-100/80 h-[72px]` | same |

**Rationale:**
A transparent, shifting header creates visual noise during reading. Legal pages need a stable, anchored top bar - a consistent reference point while scrolling through long text. The solid header signals institutional stability and removes the distraction of a header changing state mid-read.

**Implementation:** `Header.tsx` detects legal paths via `usePathname()` and applies `showScrolled = scrolled || isLegalPage`.

*Cross-ref: Section 23 (CANONICAL HEADER SYSTEM)*

---

### D. MOBILE LEGAL UX

| Rule | Implementation |
|------|----------------|
| Spacing | Single-column layout with standard `container-base` horizontal padding |
| Bullet indentation | `pl-5` - clear indentation without excessive nesting |
| Paragraph rhythm | `mb-5` paragraph gaps maintained on all viewport sizes |
| Anchor offset | `scroll-mt-28` on all `LegalSection` - accounts for sticky header height |
| TOC behavior | Collapsible accordion (`mb-8`) above content on mobile |
| Safe area | Standard Next.js app shell handles safe-area-inset via `container-base` |
| Reading width | No artificial narrowing on mobile - full-width within container is appropriate at small sizes |
| H2 spacing | `mt-12 pt-6` - sections breathe even on narrow screens |

---

### E. FORBIDDEN PATTERNS

No exception is valid for any of the following on legal pages:

| Pattern | Reason banned |
|---------|---------------|
| Flashy entrance/scroll transitions | Disrupts reading focus |
| Floating CTA button | Competes with text; inappropriate tone |
| Popup or modal interruptions | Destroys institutional trust during legal reading |
| Animated illustrations | Wrong tone category entirely |
| Oversized hero typography | Marketing energy incompatible with legal context |
| Dark-theme-first legal pages | Legibility and institutional character both suffer |
| Aggressive sticky bars | Reduces reading area; creates visual noise |
| Oversized hero sections | Legal pages open immediately into reading, not marketing |
| Newsletter CTA anywhere on page | Trust contradiction at the wrong moment |
| Parallax or scroll effects | Conflict with accessibility + reading focus |

---

*Sekcja dodana: May 2026 | Legal Reading UX Rules - high-level doctrine for institutional reading experience.*

---

## SECTION 28 - CANONICAL CONSENT INFRASTRUCTURE SYSTEM

> **Status:** Production-ready | GDPR-grade | Architecture-complete | Canonical | Integration-ready
> **Cross-ref:** Section 21 (Interaction System) · Section 24 (Footer System) · Section 25 (Legal System) · Section 27 (Legal UX) · `docs/design-system/LEGAL_SYSTEM.md`

The Profitia Consent Infrastructure is not a cookie banner. It is a full **institutional trust layer** - a compliance architecture and user agency system that governs all data processing consent across the platform.

---

### A. PHILOSOPHY

**What the consent system is:**
- Institutional trust layer
- Legal + UX infrastructure
- Compliance architecture
- User agency system - the visitor is always in control

**What the consent system is not:**
- A marketing widget
- A conversion tool
- A cookie popup
- A friction-reduction mechanism for data collection

**Tone of the system:**
- Calm
- Editorial
- Restrained
- Non-manipulative
- Transparent

**Profitia never uses:**

| Forbidden pattern | Why |
|---|---|
| Dark patterns | Consent must be freely given - manipulation invalidates it |
| Hidden reject action | Equal-weight actions are a legal and ethical requirement |
| Oversized accept CTA | Creates implied pressure - constitutes a dark pattern |
| Pre-enabled marketing cookies | Unlawful under GDPR Article 7 - consent must be opt-in |
| Fake urgency or emotional pressure | Consent must be informed, not coerced |
| Aggressive overlays | Must not obstruct the user's ability to reject |
| Deceptive toggle states | Toggle visual state must accurately reflect consent state |

---

### B. CORE ARCHITECTURE

The system is split into two layers: a pure logic layer (`lib/consent/`) and a UI layer (`components/consent/`).

**`lib/consent/` - Logic Foundation**

| File | Role |
|------|------|
| `types.ts` | Canonical type definitions: `ConsentRecord`, `ConsentCategories`, `ConsentCategory`, `ConsentStatus`, `ConsentContextValue` |
| `categories.ts` | Category registry - `CONSENT_CATEGORIES` array with PL/EN copy inline, extensible without redesign |
| `storage.ts` | Persistence layer - cookie (primary) + localStorage (sync), all reads/writes guarded, version-aware |

**`components/consent/` - UI Layer**

| Component | Type | Role |
|-----------|------|------|
| `ConsentProvider` | Client | Global context: state machine, actions, mounts Banner + Modal |
| `ConsentBanner` | Client | Initial consent panel - first visit experience |
| `ConsentModal` | Client | Full preferences management interface |
| `ConsentToggle` | Client | Accessible ARIA toggle switch per category |
| `ConsentGate` | Client | Integration gate - conditional rendering based on consent |
| `index.ts` | - | Barrel export - all consuming code imports from `@/components/consent` |

**Architectural properties:**
- **Typed end-to-end** - `ConsentRecord`, `ConsentCategories`, `ConsentCategory` are strict TypeScript types used throughout
- **SSR-safe** - all storage reads deferred to `useEffect`; server never touches consent state
- **Hydration-safe** - `isLoaded` flag prevents Banner/Modal rendering until client hydration completes; no mismatch possible
- **Provider-based** - `ConsentProvider` wraps the app tree; all children access context via hooks
- **Category-driven** - the category registry is the single source of truth for all copy, behavior, and gate logic

---

### C. CONSENT CATEGORY SYSTEM

Four canonical categories. Defined in `lib/consent/categories.ts`.

| Category | Required | Default | Purpose |
|----------|----------|---------|---------|
| `necessary` | Yes - immutable | Always `true` | Session, security, language, GDPR consent itself |
| `analytics` | No | `false` (opt-in) | Aggregated, anonymized site usage data |
| `marketing` | No | `false` (opt-in) | Advertising attribution, pixel-based tracking |
| `functional` | No | `false` (opt-in) | Embedded content, CRM forms, chat integrations |

**`necessary` is immutable.** The toggle is visually locked, keyboard-disabled (`disabled` attribute), and labeled "Always active". The category cannot be set to `false` - the provider enforces `necessary: true` on every `saveCustom()` call regardless of input.

**Extensibility:** New categories (e.g. `personalization`, `video`) can be added to `CONSENT_CATEGORIES` in `categories.ts` and the `ConsentCategories` interface in `types.ts`. The Provider, Modal, and Gate all consume the registry - no component-level changes required.

---

### D. STORAGE + VERSIONING

**Persistence strategy:**

| Layer | Mechanism | Max-age | Purpose |
|-------|-----------|---------|---------|
| Primary | HTTP cookie (`profitia_consent`) | 1 year | Survives tab close, browser restart, cross-session |
| Sync | `localStorage` | Browser-controlled | Fast read on next load; fallback if cookie blocked |

**`ConsentRecord` schema:**

```ts
{
  version: string       // '1.0' - schema version
  createdAt: string     // ISO 8601 - first consent. Never updated.
  updatedAt: string     // ISO 8601 - last re-customization
  locale: string        // 'pl' | 'en' - locale at time of decision
  status: ConsentStatus // 'pending' | 'accepted_all' | 'rejected_all' | 'customized'
  categories: ConsentCategories
}
```

**Version-aware invalidation:** If the stored record's `version` field does not match `CONSENT_VERSION` constant in `storage.ts`, the record is treated as `null` - the visitor sees the banner again. This mechanism allows re-consent collection after policy changes without manual cookie clearing.

**Safety guarantees:**
- Corrupt or unparseable JSON → `null` (re-consent shown)
- `localStorage` unavailable (private browsing) → non-fatal; cookie layer continues
- Cookie write failure → non-fatal; `localStorage` layer continues
- Both unavailable → consent state is in-memory only for the session

---

### E. CONSENT GATE SYSTEM

`ConsentGate` is the **canonical integration pattern** for all third-party and tracking systems.

**Rule:** Every analytics, tracking, advertising, CRM, or data-collection integration **must** be wrapped in `ConsentGate`. Direct unconditional rendering of tracking code is forbidden.

**Behavior:**
- Renders `null` until client hydration is complete (`isLoaded = false`) - no tracking fires on SSR or before consent check
- Renders `fallback` (default: `null`) if the category is not consented
- Renders `children` only when the category is consented

**Usage pattern - future integrations:**

```tsx
// Google Analytics 4
<ConsentGate category="analytics">
  <GoogleAnalytics id="G-XXXXXXXX" />
</ConsentGate>

// Google Tag Manager
<ConsentGate category="analytics">
  <GoogleTagManager id="GTM-XXXXXXX" />
</ConsentGate>

// Meta Pixel
<ConsentGate category="marketing">
  <MetaPixel id="XXXXXXXXXX" />
</ConsentGate>

// LinkedIn Insight Tag
<ConsentGate category="marketing">
  <LinkedInInsight partnerId="XXXXXXX" />
</ConsentGate>

// HubSpot Forms / CRM
<ConsentGate category="functional">
  <HubSpotForm portalId="..." formId="..." />
</ConsentGate>

// Embedded video (Vimeo / YouTube)
<ConsentGate category="functional" fallback={<VideoConsentPlaceholder />}>
  <VimeoEmbed id="..." />
</ConsentGate>

// Newsletter tracking pixel
<ConsentGate category="marketing">
  <NewsletterTrackingPixel />
</ConsentGate>
```

**ConsentGate is not optional.** Any system that sets cookies, fires pixels, or transmits user data to third parties must pass through it.

---

### F. UX DOCTRINE

#### Equal-weight action principle

The three primary consent actions carry equal visual hierarchy. This is both a legal requirement (GDPR consent must be freely given) and a design principle.

| Action | Visual treatment |
|--------|-----------------|
| Accept all | Filled button - `bg-[#1C1C1E]` (canonical CTA) |
| Customize settings | Outlined button - `border border-gray-200` |
| Reject non-essential | Text-only button - `text-gray-400` |

No action is hidden. No action requires more steps than another. The reject path is one click - identical to accept.

#### Banner doctrine

| Property | Rule |
|----------|------|
| Position | Fixed bottom panel - does not block reading or navigation |
| Entrance | Slide-up + opacity fade, 300ms, `ease-out` |
| Width | Full-width within `container-base` constraints |
| Mobile | Stacked layout, safe-area inset respected |
| Content | Eyebrow + heading + body + privacy link + 3 actions |
| Blocking | Never blocks the page - visitor can read and scroll freely |
| Persistence | Remains until an explicit decision is made |

#### Modal doctrine

| Property | Rule |
|----------|------|
| Layout - mobile | Full-width bottom sheet, rounded top corners |
| Layout - desktop | Centered, `max-w-lg`, `max-h-[80vh]`, internal scroll |
| Backdrop | `bg-black/20 backdrop-blur-[2px]` - subtle, not aggressive |
| Close | Escape key, backdrop click, cancel button, ×  button |
| Body scroll | Locked while modal is open |
| Tone | Editorial, legal-grade - not SaaS preferences UI |
| Required category | Visually distinct lock state - labeled "Always active" |
| Version info | Consent version + last updated date shown in modal footer |

---

### G. ACCESSIBILITY + MOTION

| Rule | Implementation |
|------|----------------|
| `prefers-reduced-motion` | Banner entrance animation disabled (`motion-reduce:transition-none`); smooth-scroll uses `behavior: 'auto'` |
| Keyboard navigation | All buttons and toggles fully keyboard-reachable |
| Toggle ARIA | `role="switch"`, `aria-checked={enabled}`, `disabled` when required |
| Modal ARIA | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to modal title |
| Escape handling | `keydown` listener closes modal on Escape |
| Focus safety | Close button has `focus-visible:ring-2` focus ring; toggle has `focus-visible:ring-2` |
| Mobile readability | Touch targets ≥ 44px, readable font sizes, non-cramped layout |

*Cross-ref: Section 21 (CANONICAL INTERACTION SYSTEM)*

---

### H. FOOTER INTEGRATION - REOPEN MECHANISM

The consent preferences are always accessible via the Footer legal bar.

**Canonical trigger:** Text button labeled "Ustawienia prywatności" (PL) / "Privacy settings" (EN)

**Placement:** Footer legal bar - right side, same row as copyright notice

**Behavior:**
- Calls `openModal()` from `useConsent()` - opens the full preferences modal
- Always available - no page-type restriction
- Persistent across all routes

**Forbidden reopen patterns:**
- Floating privacy bubble (chat-like position)
- Fixed bottom-right privacy icon
- Sticky privacy widget
- Separate `/privacy-settings` page route

The legal bar already contains the copyright notice. The privacy settings trigger sits alongside it - quiet, persistent, and institutional.

*Cross-ref: Section 24 (CANONICAL FOOTER SYSTEM)*

---

### I. MOBILE CONSENT UX

| Rule | Implementation |
|------|----------------|
| Banner layout | Single-column stacked (text above, actions below) |
| Banner safe-area | `pb-[env(safe-area-inset-bottom)]` - accounts for iOS home indicator |
| Modal type | Bottom sheet - slides up from bottom, rounded top corners |
| Modal height | `max-h-[90vh]` on mobile - category list scrolls internally |
| Modal safe-area | `pb-[env(safe-area-inset-bottom)]` inside modal footer |
| Toggle size | `h-6 w-11` toggle, `h-5 w-5` thumb - within comfortable touch range |
| Category items | `py-5` per item - generous tap area and reading room |
| Content width | Full container width - no artificial narrowing on small screens |
| Backdrop | Tappable to close - consistent with mobile UX conventions |

---

### J. FORBIDDEN PATTERNS

| Pattern | Category | Reason |
|---------|----------|--------|
| Third-party CMP widget (Cookiebot, OneTrust, etc.) | Architecture | Breaks visual consistency; external aesthetic; data sharing |
| Neon or brand-accent consent UI | Visual | Incompatible with editorial aesthetic |
| Cyber / SaaS-dashboard aesthetic | Visual | Wrong tone for institutional trust context |
| Oversized overlay blocking the page | UX | Creates pressure; may constitute a dark pattern |
| Forced consent (no visible reject) | Legal | Unlawful under GDPR - consent must be freely refusable |
| Accept-only prominent flow | Legal | Equal-weight actions are required |
| Pre-enabled marketing or analytics | Legal | Opt-in required - default must be `false` |
| Popup spam or repeated banner re-appearance | UX | Banner appears only until a decision is made |
| Floating privacy bubble | UX | Inconsistent with editorial, institutional system |
| Animation-heavy consent flows | Accessibility | Conflicts with `prefers-reduced-motion`; distracts from reading |
| Direct unconditional analytics rendering | Architecture | All tracking must pass through `ConsentGate` |

---

### K. CANONICAL STATUS

The Profitia Consent Infrastructure System is considered:

**Stable** · **Production-grade** · **GDPR-compliant** · **Extensible** · **Future-ready**

All future integrations involving data collection, tracking, advertising, or user identification **must** route through this architecture:

| Integration type | Required gate |
|-----------------|---------------|
| Web analytics (GA4, Plausible, Matomo) | `ConsentGate category="analytics"` |
| Tag management (GTM) | `ConsentGate category="analytics"` |
| Advertising pixels (Meta, LinkedIn, Google Ads) | `ConsentGate category="marketing"` |
| CRM (HubSpot, Pipedrive tracking) | `ConsentGate category="functional"` |
| Newsletter tracking | `ConsentGate category="marketing"` |
| Form analytics | `ConsentGate category="analytics"` |
| Embedded content (video, maps, calendars) | `ConsentGate category="functional"` |
| ATS / recruitment tools | `ConsentGate category="functional"` |
| Automation / event systems | Category depends on data processing scope |

No exception is valid without an explicit architectural decision and documentation update.

---

*Sekcja dodana: May 2026 | Canonical Consent Infrastructure System - source of truth dla GDPR-grade consent layer Profitia.*

---

## SECTION 29 - CANONICAL EDITORIAL PLATFORM SYSTEM

> **Status: CANONICAL** - Procurement Intelligence Publication Layer. Osiągnął canonical state w maju 2026 po editorial polish pass. Obowiązuje we wszystkich surface'ach editorial: `/blog`, `/blog/[slug]`, `/en/blog`, `/en/blog/[slug]`.
> **Cross-ref:** Section 7 (Card System) · Section 8 (Button System) · Section 21 (Interaction System) · Section 23 (Header System) · Section 24 (Footer System) · `prisma/schema.prisma` · `components/blog/`

---

### A. EDITORIAL PHILOSOPHY

#### Czym jest ten system

Profitia editorial platform to **Procurement Intelligence Publication** - instytucjonalna warstwa wiedzy zakupowej.

**NIE jest:**
- marketing blogiem firmy consultingowej
- startup SaaS content hubem z artykułami o produktywności
- WordPress-style publication z agresywnymi CTA
- company news feed
- thought leadership feed dla szerokiej publiczności

**Jest:**
- procurement intelligence publication - publikacja dla praktyków zakupów na poziomie decyzyjnym
- institutional editorial layer - warstwa autorytetu i wiedzy, nie sprzedaży
- strategic knowledge platform - każdy artykuł to analiza, nie ogłoszenie
- quiet authority system - nie krzyczy, nie konwertuje agresywnie, przekonuje głębią

#### Inspiracje formalne

| Inspiracja | Co zostało przeniesione |
|---|---|
| **Stripe Editorial** | Long-form typographic confidence, heading hierarchy, breathing room |
| **McKinsey Insights** | Institutional authority tone, analytics-first structure, author credibility |
| **Linear Essays** | Prose rhythm, whitespace discipline, heading-to-content ratio |
| **Notion editorial** | Content-first layout, clean reading column, calm component density |

#### Personality attributes

- **Quiet** - żaden element nie krzyczy, nie atakuje wzroku
- **Editorial** - hierarchia treści ważniejsza niż dekoracja
- **Intelligent** - zakłada kompetentnego czytelnika
- **Premium** - każdy piksel ma uzasadnienie
- **Restrained** - mniej to więcej; nic bez powodu
- **Institutional** - styl bliższy FT/McKinsey niż Hubspot/G2

#### Canonical promise

> "Wiedza zakupowa. Bez szumu. Tylko substancja."

---

### B. BLOG INDEX ARCHITECTURE

#### Canonical page structure

```
┌────────────────────────────────────────────────────────────┐
│  PublicationHero                                           │
│  (masthead - title + tagline, no image, no CTA)           │
├────────────────────────────────────────────────────────────┤
│  FeaturedArticle (Cover Story)                             │
│  (full-width section, asymmetric grid: 5/12 copy + 7/12   │
│   cinematic image, py-20 lg:py-28)                        │
├────────────────────────────────────────────────────────────┤
│  Article Grid (non-featured articles)                      │
│  (3-column on desktop, 2-column tablet, 1-column mobile)  │
├────────────────────────────────────────────────────────────┤
│  BlogNewsletter                                            │
│  (Intelligence Brief subscription - editorial tone)        │
└────────────────────────────────────────────────────────────┘
│  Footer (full canonical - with newsletter section)         │
└────────────────────────────────────────────────────────────┘
```

#### Metadata hierarchy (per card / featured)

Order of visual weight:
1. **Category** - eyebrow, `text-[10px] tracking-[0.22em] uppercase text-gray-600` - always first
2. **Reading time** - `text-gray-500`, dot separator
3. **Title** - dominant, `font-semibold tracking-tight text-gray-900`
4. **Subtitle / excerpt** - secondary, `text-gray-500 leading-[1.75]`
5. **Author + date** - `text-gray-500 text-[12px]`, bottom of card

#### FeaturedArticle - Cover Story rules (LOCKED)

- Grid: `5fr 7fr` (copy 42% / image 58%) on desktop
- Outer padding: `py-20 lg:py-28`
- Column gap: `gap-12 lg:gap-20`
- Title: `text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem]`, `leading-[1.08]`, `font-semibold`
- Subtitle: `text-[17px]`, `leading-[1.75]`, `max-w-[52ch]`
- Meta spacing between elements: `mb-6` (eyebrow) → `mb-5` (title) → `mb-9` (subtitle) → `mb-9` (meta) → CTA
- Image: `aspect-[16/9]`, `rounded-2xl`, image scale `1.02` on group-hover
- CTA: `text-[13.5px] font-semibold`, arrow gap expands on hover via `group-hover:gap-3`

**LOCK: Copy leads. Image supports.** Image column never dominates copy column at the information level. Image is cinematic context; copy is the argument.

#### Newsletter relationship on blog index

- `BlogNewsletter` renders after the article grid - always visible
- Footer also shows newsletter section on `/blog` - this is intentional and correct
- **ONLY on article pages** is footer newsletter suppressed (see §29.G - Newsletter Policy)

---

### C. ARTICLE PAGE ARCHITECTURE

#### Canonical page structure (ordered)

```
┌────────────────────────────────────────────────────────────┐
│  ReadingProgress (fixed top, Client Component)             │
│  (2px bar, z-[100], appears after 80px scroll)            │
├────────────────────────────────────────────────────────────┤
│  ArticleHero (Server Component)                            │
│  back link → metadata row → H1 → subtitle → author        │
│  → cinematic cover image (aspect-[16/7])                   │
├────────────────────────────────────────────────────────────┤
│  ArticleLayout (Server Component)                          │
│  ┌──────────────────────┬───────────────────────────────┐  │
│  │ ArticleTOCSidebar    │ Prose Column (max-w-[68ch])   │  │
│  │ (Client Component)   │                               │  │
│  │ sticky, lg+          │ [H2] → [p] → [PullQuote]     │  │
│  │ collapsible mobile   │ → [InsightBlock] → [H2] ...  │  │
│  └──────────────────────┴───────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│  ArticleAuthor (Server Component)                          │
├────────────────────────────────────────────────────────────┤
│  ArticleNewsletter (Client Component - inline)             │
├────────────────────────────────────────────────────────────┤
│  ArticleRelated (Server Component)                         │
└────────────────────────────────────────────────────────────┘
│  Footer - COMPRESSED VARIANT (no newsletter section)       │
└────────────────────────────────────────────────────────────┘
```

#### What is LOCKED on article pages

| Element | Lock rule |
|---|---|
| `ReadingProgress` | Always present. Never animated except `transition-[width] duration-75 ease-linear`. Never hidden until 80px scroll. |
| `ArticleHero` structure | back → meta → H1 → subtitle → author → image. Sequence must not change. |
| Prose column max-width | `max-w-[68ch]`. Never wider. Reading line length is a readability commitment. |
| TOC sidebar | `240px` at `lg+`. Hidden on mobile; collapsible panel instead. Never inline. |
| Author block | Always shown when `authorName` is present. Never omit. Credibility layer. |
| `ArticleNewsletter` | Always inline, after author, before related. Never moved to top of page. |
| Footer newsletter | Always hidden on article pages (see §29.G). |

#### What is conditionally changeable

| Element | Condition |
|---|---|
| `ArticleHero` image | Shown only when `coverImage` is set. Fallback: gradient placeholder. |
| `ArticleAuthor` block | Shown only when `authorName` is set. If null: block does not render. |
| `ArticleRelated` | Shown only when `relatedSlugs` is non-empty. |
| TOC sidebar | Shown only when `tocItems.length > 0`. If empty: renders empty `<aside />`. |
| Subtitle (standfirst) | Shown only when `subtitle` is set. Not a required field. |

#### What is FORBIDDEN on article pages

- Floating CTA buttons during reading
- Progress-gated content popups
- Scroll-triggered modals
- Sidebar advertising or promotional blocks
- "Related products" widgets
- Author social media follow buttons
- Comment sections
- Star ratings / social proof widgets
- "Share to social" inline blocks (only in footer if ever added)
- Marketing CTAs mid-article

---

### D. TYPOGRAPHY + READING RHYTHM

#### Max-width doctrine

- **Prose column:** `max-w-[68ch]` - canonical and immovable. Based on optimal typographic line length for professional reading. 45-75 characters per line is the academic standard; 68ch places us in the premium editorial range.
- **Subtitle / standfirst:** `max-w-[58ch]` - slightly shorter than body, creates visual containment
- **Hero title:** `max-w-[44rem]` - allows multi-line without runaway wrap on large viewports
- **Author bio:** `max-w-[52ch]` - personal, intimate, not sprawling

**RULE:** Never use full container width for reading text. Prose that stretches `container-base` full width fails the readability contract.

#### Line-height doctrine

| Element | Line height | Why |
|---|---|---|
| H1 (hero title) | `leading-[1.06]` | Tight but elegant - editorial display heading |
| H2 (section heading) | `leading-snug` | Scans well, clearly hierarchical |
| Subtitle / standfirst | `leading-[1.7]` | Comfortable introductory read |
| Body paragraph | `leading-[1.9]` | Maximum reading comfort for long-form |
| List items | `leading-[1.85]` | Dense but not squeezed |
| Blockquote | `leading-[1.78]` | Slower, deliberate reading - matches italic tone |
| Excerpt (cards) | `leading-[1.7]` | Scannable, not deep-read |

#### Whitespace cadence (prose)

| Element | Top margin | Bottom margin | Notes |
|---|---|---|---|
| Paragraph | - | `mb-7` | 28px bottom - breathing between thoughts |
| H2 | `mt-16` | `mb-6` | 64px top for section break rhythm |
| H2 top padding | `pt-10` | - | Adds visual separation from preceding text |
| H3 | `mt-10` | `mb-4` | 40px top - sub-section cadence |
| H4 | `mt-8` | `mb-3` | Compact but distinct |
| Blockquote | `my-12` | - | 48px vertical - pause moment |
| HR | `my-12` | - | 48px - section transition signal |
| List | - | `mb-7` | Same as paragraph |
| PullQuote component | `my-14` | - | 56px - most prominent pause element |
| InsightBlock component | `my-12` | - | 48px - equals blockquote weight |

**RULE: Readability > Density.** This publication is not a data sheet or newsletter. The reader is a procurement professional reading for insight, not speed. Every extra pixel of whitespace is an investment in comprehension and trust. Compressing prose to fit "above the fold" is explicitly forbidden - there is no fold in long-form editorial reading.

#### Heading hierarchy

```
H1 - Article title - text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-semibold
H2 - Major section - text-2xl font-semibold (with border-t divider)
H3 - Sub-section   - text-lg font-semibold
H4 - Minor point   - text-base font-semibold
```

All headings: `tracking-tight text-gray-900`. H2 has `border-t border-gray-100` as visual section cadence marker.

#### Scroll offset

All H2 and H3 headings: `scroll-mt-28` - compensates for the sticky header height. Without this, TOC clicks land behind the header.

---

### E. EDITORIAL MOTION SYSTEM

> **Cross-ref:** Section 21 - Canonical Interaction System. All motion on editorial surfaces obeys §21 rules. This subsection defines editorial-specific constraints within that system.

#### Restrained hover philosophy

Editorial surfaces use **institutional hover** - motion that confirms interaction, not motion that entertains. No motion should attract attention away from the text being read.

**Scale principle:**
- Maximum image hover scale: `scale-[1.015]` (ArticleCard) - barely perceptible, confirms interactivity
- Maximum image hover scale on featured: `scale-[1.02]` (FeaturedArticle) - slightly more prominent because it's a showcase element
- **Never exceed `scale-[1.02]`** on editorial surfaces
- **Never use `translateY`** for card lift on editorial surfaces - forbidden (see §29.I)

**Title hover:**
- ArticleCard, ArticleRelated: `group-hover:text-gray-600` - darkens slightly, `duration-200 ease-out`
- FeaturedArticle title: `group-hover:text-gray-700` - subtler shift, `duration-300 ease-out`
- Never changes font weight on hover

**CTA arrow:**
- FeaturedArticle CTA: `group-hover:gap-3` (gap expands from `gap-2`) - arrow slides right
- `transition-all duration-300 ease-out`

#### TOC active section transitions

- Border color: `border-gray-200` (inactive) → `border-gray-700` (active), `duration-300 ease-out`
- Text: `text-gray-500 hover:text-gray-700` (inactive) → `text-gray-900 font-medium` (active), `duration-300 ease-out`
- No transform or scale transitions on TOC items - text/color only

#### Reading progress behavior

- Fixed to top of viewport, `z-[100]`, height `2px`
- Background track: `bg-gray-100`
- Fill bar: `bg-gray-900`
- Width transition: `transition-[width] duration-75 ease-linear` - smooth but near-real-time, no lag
- Visibility: appears at `scrollY > 80px`, disappears at top
- Respects `prefers-reduced-motion: reduce` - does not render if reduced motion is preferred

#### Transition timing reference (editorial surfaces)

| Interaction | Duration | Easing |
|---|---|---|
| Image scale hover | `duration-500` | `ease-out` |
| Title color hover | `duration-200-300` | `ease-out` |
| TOC border/text | `duration-300` | `ease-out` |
| CTA gap expand | `duration-300` | `ease-out` |
| Reading progress width | `duration-75` | `ease-linear` |
| Back link hover | `duration-200` | `ease-out` |
| Mobile TOC open/close | `duration-200` | default |

**Forbidden on editorial surfaces:**
- `bounce` easing
- Spring physics
- `duration > 500ms` on interactive elements
- Glow, shadow pulse, or color flash effects
- `translateY > 2px` card lift

---

### F. CONTRAST SYSTEM (EDITORIAL)

#### Institutional contrast philosophy

Profitia editorial UI uses **institutional editorial contrast** - not ultra-light gray minimalism, not high-contrast startup SaaS.

The doctrine: every piece of text must be **readable by design**, not merely detectable. Ultra-light gray (< `gray-400`) on white creates washed-out UI that signals insufficient craft. Institutional publications (FT, McKinsey, The Economist) never use ultra-light copy for supporting text.

#### Contrast ladder for editorial surfaces

| Role | Color | Context |
|---|---|---|
| Primary text (body, H2, H3, H4) | `text-gray-900` | Always |
| Secondary text (subtitle, excerpt, author bio) | `text-gray-600` or `text-gray-500` | Long-form reading |
| Meta text (date, reading time, author role) | `text-gray-500` | Metadata rows |
| Helper text (labels, captions, attribution) | `text-gray-500` | Eyebrow labels, TOC inactive, section labels |
| Category badge | `text-gray-600` | Higher contrast - identity element |
| TOC inactive | `text-gray-500 hover:text-gray-700` | Restrained, not invisible |
| TOC active | `text-gray-900 font-medium` | Clear active state |
| Separator dots | `text-gray-300` | Present but not dominant |

**RULE: Minimum `gray-500` for all visible supporting text on editorial pages.** `gray-400` and below is permitted only for decorative or purely structural elements with zero reading expectation. Using `gray-400` for meta text that a user might actually read is a quality failure.

#### Why ultra-light gray is forbidden for editorial copy

`text-gray-300` or `text-gray-400` on white (#fff) at small sizes fails:
1. WCAG AA readability standards for body copy
2. Editorial softness ≠ editorial illegibility
3. It creates washed-out UI that signals template aesthetics, not institutional craft

---

### G. NEWSLETTER POLICY + ARTICLE FOOTER VARIANT

#### Newsletter duplication is forbidden on article pages

Article pages contain `ArticleNewsletter` - an inline subscription block that appears after the author bio, before related articles. This is the **canonical newsletter touchpoint** within the reading experience.

**Duplication rule:**
- On `/blog/[slug]` and `/en/blog/[slug]`: **footer newsletter section is hidden**
- Detection: `Footer.tsx` checks `isArticlePage = /^(\/en)?\/blog\/[^/]+/.test(pathname)`
- On `/blog` and `/en/blog`: footer newsletter renders normally
- On legal pages: footer newsletter is suppressed (existing rule, unchanged)

**Why:**
- Two newsletter prompts in close proximity (inline → footer) creates pressure, not invitation
- Inline newsletter is contextually appropriate - it appears after the reader has finished the article
- Footer newsletter after inline newsletter is redundant and reduces institutional tone

#### Article footer variant - compressed rhythm

After a long-form article, the full canonical footer creates visual overload. The article footer variant is **the same component**, with compressed spacing:

| Property | Default footer | Article footer variant |
|---|---|---|
| Newsletter section | Visible | **Hidden** (see above) |
| Main grid padding | `py-16` | `py-10` |
| Legal bar padding | `py-5` | `py-4` |

**Implementation:** `Footer.tsx` applies Tailwind class conditional via `isArticlePage` boolean. No separate component. Single source of truth.

**RULE:** The article footer variant is NOT a separate component. It is a **conditional variant of the canonical Footer**. Never create a separate `ArticleFooter.tsx` component.

---

### H. MOBILE EDITORIAL RULES

#### Mobile reading doctrine

The editorial experience on mobile must preserve the **reading immersion** of desktop, adapted to the touch context. Mobile is not a degraded version of desktop - it is the canonical reading context for many professional readers (commute, offsite, meetings).

**Principle:** Compress spacing, not content. Never hide editorial elements for mobile; adapt their presentation.

#### Hero on mobile

- Title: `text-[2rem]` (20% smaller than lg) - readable, dominant
- Subtitle: same size as desktop, same `max-w-[58ch]` - may wrap; this is correct
- Metadata row: wraps naturally via `flex-wrap` - never truncated
- Cover image: `aspect-[16/7]` maintained - cinematic even on mobile

#### TOC on mobile

- Desktop sticky sidebar collapses to **collapsible panel** (`lg:hidden`)
- Panel opens via chevron button - `bg-gray-50`, `rounded-lg`, `border border-gray-100`
- Toggle button: `text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500`
- TOC links in panel: same size and color rules as desktop
- Panel closes on link click (`handleClick` callback)
- **Never:** inline TOC forced before content on mobile without collapsing

#### Prose on mobile

- Body text `text-[16px]` - same as desktop. Never reduce below `15px` for body copy.
- Line height maintained at `leading-[1.9]` - same as desktop. Never compress.
- Horizontal padding: handled by `container-base` (mobile: `px-5`)
- Max-width `max-w-[68ch]` becomes full-width on small viewports - this is correct and expected

#### FeaturedArticle on mobile

- Stacks vertically: image top, copy below (`order-1`/`order-2` swap at `lg+`)
- Image: `aspect-[16/9]` - remains cinematic in vertical stack
- Title font size: `text-[1.75rem]` on mobile - strong, still hierarchical
- CTA gap animation: preserved on mobile via CSS group-hover (touch devices: static state shown)

#### Spacing compression rules

On mobile, some vertical padding is compressed automatically via responsive Tailwind suffixes:
- Hero: `pt-14 pb-12` (vs `lg:pt-24 lg:pb-16`)
- Featured: `py-20 lg:py-28`
- ArticleLayout: `pt-12 pb-36 lg:pb-52`

**RULE:** Never compress paragraph `mb-*` values for mobile. Reading rhythm must be preserved. Only container-level padding may be reduced.

#### Touch rhythm

- All tap targets: minimum `44px` height (iOS HIG) - TOC links, cards, CTA buttons
- TOC sidebar panel: full viewport-width on mobile (not partial panel)
- No hover-only states without touch equivalent

---

### I. FORBIDDEN PATTERNS

| Pattern | Why forbidden |
|---|---|
| Marketing-style card with "Learn more ›" button | Editorial cards have no explicit button - the whole card is the CTA |
| Aggressive hover (scale > 1.02, translateY > 2px, shadow lift) | Creates startup SaaS feel, breaks institutional tone |
| Colorful category badges (colored chips, gradient labels) | CategoryBadge is uppercase gray text only - color = noise |
| Narrow prose column (< 58ch) | Reading lines too short - exhausting for long-form |
| Dense layout (compressed whitespace, paragraph mb < 4) | Destroys reading immersion, signals newsletter not publication |
| Animated progress bar (spring, bounce, overshooting) | ReadingProgress is informational only - `duration-75 ease-linear` |
| Popups during reading | Reading mode must never be interrupted |
| Sidebar ads or promotional blocks | This is not a media publication supported by advertising |
| Floating CTA buttons during scroll | Editorial reading must not be interrupted by conversion pressure |
| WordPress-style author widget with follow button | Author block is credential display, not social follow prompt |
| Infinite scroll | Deliberate article list - the reader chooses what to read |
| Two newsletter prompts on same page | Inline newsletter + footer newsletter = duplication. Article pages: inline only. |
| `@tailwindcss/typography` plugin | Removed intentionally - all prose via explicit Tailwind arbitrary variants |
| Full-width prose text | `max-w-[68ch]` is non-negotiable - wide prose destroys reading comfort |
| Cover images from non-Unsplash domains | Only Unsplash is domain-whitelisted in `next.config.mjs` |
| `featured: true` on more than one article | One featured slot - the cover story. Multiple featured = undefined behavior. |
| `'use client'` on `ArticleLayout` | ArticleLayout is a Server Component - RSC boundary for large HTML string |
| Dark background editorial surface | All editorial surfaces: white background, no exceptions |
| Non-italic blockquotes | Blockquote rhythm requires italic - signals quotation, not assertion |

---

### J. DATA MODEL - Article (Prisma)

All editorial fields are nullable - safe to add to existing articles without migration pain.

**Core fields (legacy):**
- `id`, `slug`, `title`, `content` (HTML), `excerpt`, `published`, `publishedAt`
- `metaTitle`, `metaDescription`, `authorId`

**Editorial extension fields:**
```prisma
category     String?           // one of 7 canonical keys
readingTime  Int?              // minutes, estimated or manual
coverImage   String?           // Unsplash URL only
featured     Boolean @default(false)  // drives FeaturedArticle slot on index
subtitle     String? @db.Text  // displayed under H1 in ArticleHero
authorName   String?           // denormalized - no join needed
authorRole   String?           // e.g. "Senior Client Partner | Procurement Technology"
authorBio    String? @db.Text  // shown in ArticleAuthor block
relatedSlugs String[] @default([])  // slugs to display in ArticleRelated
```

**Schema applied:** `npx prisma db push` run against Neon production DB (May 2026).

**7 canonical categories:**

| Category key | Label PL | Label EN |
|---|---|---|
| `negotiations` | Negocjacje | Negotiations |
| `procurement-strategy` | Strategia zakupów | Procurement Strategy |
| `cost-intelligence` | Analiza kosztów | Cost Intelligence |
| `supplier-risk` | Ryzyko dostawcy | Supplier Risk |
| `supply-chain` | Łańcuch dostaw | Supply Chain |
| `market-analysis` | Analiza rynku | Market Analysis |
| `spend-management` | Spend management | Spend Management |

---

### K. COMPONENT LIBRARY - `components/blog/`

All components are in `components/blog/`. Barrel export via `components/blog/index.ts`.

> **Architecture note (May 2026):** `ArticleLayout` was refactored from a Client Component to a **Server Component**. The RSC boundary for large content HTML strings caused production 500 errors. Server-side heading extraction now produces `tocItems[]`, which crosses the boundary as a small array to `ArticleTOCSidebar` (Client Component).

#### Blog index page components

| Component | RSC type | Purpose |
|---|---|---|
| `PublicationHero` | Server | Masthead - publication title + tagline. No image. No CTA. |
| `FeaturedArticle` | Server | Cover story slot for `featured=true` article |
| `ArticleCard` | Server | Grid card for non-featured articles |
| `BlogNewsletter` | **Client** | Intelligence Brief email capture (`onSubmit`) |
| `CategoryBadge` | Server | Uppercase gray category label |

#### Article page components

| Component | RSC type | Purpose |
|---|---|---|
| `ReadingProgress` | **Client** | Fixed `2px` top progress bar - scroll-driven |
| `ArticleHero` | Server | back link + metadata row + H1 + subtitle + author + cover image |
| `ArticleLayout` | **Server** | Server-side TOC extraction + prose render via `dangerouslySetInnerHTML` |
| `ArticleTOCSidebar` | **Client** | TOC UI + IntersectionObserver for active section tracking |
| `ArticleAuthor` | Server | Author credential block - name, role, bio, initial avatar |
| `ArticleNewsletter` | **Client** | Inline Intelligence Brief subscription form |
| `ArticleRelated` | Server | Up to 3 related articles from `relatedSlugs` |

#### Editorial block components

| Component | RSC type | Purpose |
|---|---|---|
| `PullQuote` | Server | Large callout quote - `border-l-[3px]`, `text-[18px] italic`, `my-14` |
| `InsightBlock` | Server | Analytical highlight - stat / insight / finding variants |

**Critical rule:** Components with event handlers MUST have `'use client'` as first line. Without it, Next.js 15 App Router throws a 500 at **runtime** (not build time - silent failure at build).

---

### L. ROUTES

| Route | File | Notes |
|---|---|---|
| `/blog` | `app/(public)/blog/page.tsx` | PL publication index |
| `/blog/[slug]` | `app/(public)/blog/[slug]/page.tsx` | PL article page |
| `/en/blog` | `app/(public)/en/blog/page.tsx` | EN publication index |
| `/en/blog/[slug]` | `app/(public)/en/blog/[slug]/page.tsx` | EN article page |

All blog pages: `export const dynamic = 'force-dynamic'` - required for Prisma DB queries at runtime. Remove only if moving to ISR with explicit revalidation strategy.

**DB query pattern:** `prisma.article.findFirst({ where: { slug, published: true }, select: { ...explicitFields } })`. Never use `findUnique` on article pages - use `findFirst` with `published: true` guard.

---

### M. UTILITY LAYER - `lib/content/`

| File | Exports |
|---|---|
| `lib/content/types.ts` | `ArticlePreviewData`, `ArticleDetailData`, `ArticleTOCItem`, `ArticleCategory` |
| `lib/content/utils.ts` | `estimateReadingTime`, `getCategoryLabel`, `getAllCategories`, `formatPublishDate`, `formatReadingTime` |

`formatPublishDate` uses try/catch with manual ICU fallback - required for Render.com's Node environment robustness.

---

### N. CONTENT MIGRATION - EDITORIAL ADAPTATION STANDARD

**RULE: No copy-paste migration.** Every article migrated from the old blog must undergo full editorial adaptation:

1. **Structure rewrite** - flat text → H2/H3 hierarchy
2. **Pull quotes extracted** - 1-2 per article, placed at narrative peak moments
3. **Insight blocks added** - key analytical conclusions surfaced visually
4. **Author profile completed** - name, role, bio (all three fields)
5. **Category assigned** - from the 7 canonical keys
6. **`relatedSlugs` cross-linked** - minimum 2 articles linked bidirectionally
7. **Cover image assigned** - Unsplash URL, editorially appropriate (not stock-business-handshake)
8. **Reading time set** - manual estimation at 200 wpm Polish / 250 wpm English

**Seed script:** `scripts/seed-articles.ts` - `npx tsx scripts/seed-articles.ts`. Uses `prisma.article.upsert` - idempotent, safe to re-run. This script is the **authoritative migration record**.

---

### O. ARTICLES IN CANONICAL STATE (May 2026)

| Slug | Category | Featured | Author | Reading |
|---|---|---|---|---|
| `cena-to-opinia-koszt-to-fakt` | cost-intelligence | ✓ | Tomasz Uściński | 9 min |
| `dzien-z-zycia-kupca-kiedy-stala-cena-przegrywa-z-faktami` | cost-intelligence | - | Tomasz Uściński | 11 min |
| `analiza-finansowa-dostawcow` | supplier-risk | - | Rafał Gilatowski | 7 min |

**FeaturedArticle slot:** `cena-to-opinia-koszt-to-fakt` - "Cena to opinia. Koszt to fakt." renders as the cover story on `/blog`.

---

### P. FUTURE EXTENSIBILITY

The editorial platform architecture is designed to support the following without architectural refactoring:

#### Content types (addable without schema migration)

| Content type | How to add |
|---|---|
| Research PDFs | `pdfUrl String?` nullable field + download CTA in `ArticleHero` |
| Executive summaries | `executiveSummary String? @db.Text` + `SummaryBlock` component |
| Embedded charts | `chartsData Json?` field + Client Component chart renderer |
| Procurement Intelligence Reports | New `reportType` enum + gated download flow |
| Citations / footnotes | `citations Json?` field + `CitationBlock` component |
| Analyst briefings | New category key `analyst-briefing` |

#### Access control (addable without UI refactor)

| Pattern | Implementation path |
|---|---|
| Gated content | `gated Boolean @default(false)` + `ConsentGate` pattern (see §28) |
| Lead-gen before PDF | Form before download - existing form system |
| Newsletter-gated access | `subscriptionRequired Boolean?` + email verification flow |

#### Component extension points

- `ArticleLayout`: heading extraction regex can be extended to H4, custom `[data-*]` blocks
- `InsightBlock`: new `type` variants - `chart`, `quote-stat`, `matrix`
- `ArticleHero`: `reportType` badge variant for reports vs articles
- `ArticleRelated`: can accommodate cross-content-type related items

**RULE:** All extensions must preserve the editorial doctrine. New component variants must pass the character test: Quiet · Editorial · Intelligent · Premium · Restrained · Institutional. If a proposed addition would push the platform toward marketing SaaS aesthetics - it does not belong here.

---

### Q. SYSTEM LOCK RULES

1. **NO `@tailwindcss/typography`** - ever. All prose via arbitrary Tailwind variants in `ArticleLayout`. This is a permanent architectural decision.
2. **All editorial DB fields nullable** - new fields MUST be nullable to preserve backward compatibility with existing articles.
3. **Cover images: Unsplash only** - domain whitelisted in `next.config.mjs`. No other image domains for editorial content.
4. **`ArticleLayout` is a Server Component** - never add `'use client'`. Content HTML is rendered server-side. TOC interaction lives in `ArticleTOCSidebar` (Client).
5. **`'use client'` only on true interactive components** - `BlogNewsletter`, `ArticleNewsletter`, `ArticleTOCSidebar`, `ReadingProgress`. Build succeeds without it; runtime fails.
6. **`force-dynamic` on all blog pages** - required for Prisma DB queries. Remove only if moving to ISR.
7. **Featured slot = exactly one article** - `featured: true` on exactly one article at any time. If none: empty state. If multiple: first by `orderBy` wins.
8. **Minimum `gray-500` for all readable supporting text** - editorial contrast doctrine. Never use `gray-400` for text a user might actually read.
9. **Prose max-width: `max-w-[68ch]`** - canonical and immovable. Line length is a readability commitment.
10. **Article pages: no footer newsletter** - inline `ArticleNewsletter` is the canonical touchpoint. Footer newsletter on article pages is duplication and is forbidden.
11. **Article footer: compressed variant only** - `py-10` main grid, `py-4` legal bar. Same component, conditional class via `isArticlePage`.
12. **Seed script is the migration record** - `scripts/seed-articles.ts` is the authoritative source for all migrated content. Update when adding articles.

---

*Sekcja zaktualizowana: May 2026 | CANONICAL EDITORIAL PLATFORM SYSTEM - source of truth dla warstwy editorial Profitia. Zastępuje poprzednią wersję sekcji z May 2026. Wdrożona po editorial polish pass: contrast refinement, hero polish, immersion improvements, motion refinement, newsletter policy, article footer variant.*

---

## SECTION 30 - CANONICAL ABOUT PAGE + TEAM SYSTEM

Ta sekcja staje się source of truth dla wszystkich obecnych i przyszłych:
- stron About,
- leadership pages,
- expert pages,
- advisor systems,
- author profiles,
- institutional trust sections,
- executive presentation layers.

System NIE może być traktowany jako klasyczna „team page".  
To jest: **institutional trust architecture.**

---

### A. PHILOSOPHY

Canonical About Page ma komunikować:
- kompetencję,
- spokój,
- doświadczenie,
- strategiczne myślenie,
- institutional confidence.

NIE:
- startup energy,
- culture marketing,
- „poznaj nasz zespół",
- employer branding,
- playful interactions,
- team showcase.

Strona ma wyglądać bardziej jak:
- McKinsey Insights,
- Stripe Editorial,
- Linear,
- annual report institution,
- advisory intelligence firm,

niż:
- SaaS startup,
- agency website,
- WordPress corporate page.

---

### B. CANONICAL PAGE STRUCTURE

Canonical About Page składa się z 7 sekcji:

1. HERO
2. FOUNDATION
3. CAPABILITIES
4. PHILOSOPHY
5. LEADERSHIP
6. CREDENTIALS
7. QUIET CTA

Każda sekcja posiada własny spacing cadence.  
Rytm NIE może być uniform.

---

### C. SECTION PACING SYSTEM

| Sekcja | Mobile | Tablet | Desktop |
|---|---|---|---|
| Hero | `pt-20 pb-20` | - | `pt-40 pb-32` |
| Foundation | `py-16` | - | `py-20` |
| Capabilities | `py-20` | - | `py-28` |
| Philosophy | `py-20` | `py-28` | `py-36` |
| Leadership | `py-24` | - | `py-32` |
| Credentials | `py-16` | - | `py-24` |
| Quiet CTA | `py-24` | `py-32` | `py-48` |

Philosophy jest zawsze najgłębszą sekcją. To jest intencjonalne.

---

### D. HERO SYSTEM

Hero musi działać jak institutional cover statement.

**Zasady:**
- restrained width,
- high whitespace,
- no visual overload,
- no decorative assets,
- no marketing claims.

**Canonical values:**
- `max-w-[54rem]` - headline container
- `max-w-[46ch]` - subtitle width
- `leading-[1.85]` - subtitle line height
- `leading-[1.04]` - desktop headline (`lg:`)
- `mb-8 lg:mb-12` - eyebrow spacing (asymmetric)

**Forbidden:**
- centered hero,
- gradients,
- illustrations,
- animated backgrounds,
- team collage,
- marketing badges,
- excessive CTA pressure.

---

### E. FOUNDATION SYSTEM

Foundation section = institutional grounding layer.

Stats MUST feel like annual report data - not dashboard widgets.

**Canonical pattern:**
- `border-t border-gray-100` separator above stats grid,
- `pt-8` breathing after separator,
- uppercase `tracking-[0.22em]` labels,
- `mb-3` between number and label,
- no cards, no shadows, no colored metrics.

**Forbidden:**
- KPI cards,
- charts,
- animated counters,
- colorful statistics,
- icon-driven layout.

---

### F. CAPABILITIES SYSTEM

Capabilities section MUST feel analytical, structured, understated.

**Canonical:**
- numbered rows (`01`, `02`…),
- `divide-y divide-gray-100` separators,
- `py-10 lg:py-12` per row,
- prose-first hierarchy.

**Forbidden:**
- icon grids,
- feature cards,
- marketing feature lists,
- hover-heavy interactions.

---

### G. PHILOSOPHY SYSTEM

Philosophy is the most spacious section. This is by design.

Reason: this is the intellectual core of the institution.

**Canonical:**
- deepest breathing (see pacing table),
- essay cadence,
- quote system with subtle left border,
- minimal decoration,
- slow reading rhythm.

**Quote styling:**
- subtle left border (`border-l-2 border-gray-200`),
- restrained typography,
- no oversized quotation marks,
- no colored callouts.

**Forbidden:**
- large decorative quotes,
- colored callouts,
- animated reveals.

---

### H. LEADERSHIP SYSTEM

Leadership section is NOT a people gallery. It is: **executive advisory layer.**

---

#### H1. TEAM DATA ARCHITECTURE

```
lib/team/
  types.ts     - TeamMember interface, TeamMemberType union
  data.ts      - canonical team data, FEATURED_TEAM export
  utils.ts     - getInitials, getRole, getBio, getAreas, sortByOrder, filterByType
  index.ts     - barrel export

components/team/
  TeamProfileImage   - portrait + grayscale treatment + initials fallback
  TeamMeta           - name + credentials badge + role eyebrow + experience + areas
  TeamMemberCard     - vertical card (grid contexts)
  TeamMemberRow      - horizontal editorial row (leadership contexts)
  TeamGrid           - responsive grid wrapper
  LeadershipSection  - maps featured members to TeamMemberRow
  AdvisorySection    - advisory board context
  TeamQuote          - editorial quote attribution
  TeamSection        - generic section wrapper
  index.ts           - barrel export
```

System MUST remain reusable for: leadership, advisors, experts, article authors, conference speakers, institutional profiles.

---

#### H2. LEADERSHIP LAYOUT

**Canonical row:** portrait + prose layout. NOT profile cards.

**Desktop grid:** `grid-cols-[240px_1fr]`  
**Mobile grid:** `grid-cols-[180px_1fr]`

**Canonical spacing:**
- `py-16 lg:py-20` per row,
- `border-b border-gray-100 last:border-b-0 first:pt-0`.

**Bio rules:**
- `max-w-[58ch]`
- `leading-[1.88]`
- `text-gray-600` (executive reading contrast - NOT gray-500)
- `mt-7` (separation between meta and bio)

**Expertise tags:**
- `showAreas={false}` - hidden on executive/leadership pages,
- allowed in expert / author contexts.

---

#### H3. PORTRAIT TREATMENT

**Canonical:**
- `[filter:grayscale(10%)_contrast(1.03)]` - base
- `[filter:grayscale(2%)_contrast(1.03)]` - hover
- `rounded-2xl`
- `object-cover object-top`
- `transition-[filter] duration-300 ease-out`

**Forbidden:**
- circular avatars (`rounded-full`),
- bright / colorful portraits,
- glow effects,
- shadows (`drop-shadow`),
- floating cards,
- social-profile aesthetics.

---

### I. CREDENTIALS SYSTEM

Credentials section = institutional proof layer.

CIPS logo MUST behave as: **accreditation seal.**

**Canonical:**
- `mt-10 pt-8 border-t border-gray-100` wrapper,
- `opacity-50 grayscale`,
- `h-12 w-auto`,
- prose-first hierarchy - logo follows text, not leads it.

**Forbidden:**
- badge wall,
- certification carousel,
- partner logos grid,
- colorful certifications.

**Active logo URL:**  
`https://cipsdistancelearning.com/wp-content/uploads/2022/07/CIPS_Centre-Excellence_Logo_2022.png`  
(PNG - nie SVG. SVG z tego domenu jest broken.)

---

### J. QUIET CTA SYSTEM

Final CTA is NOT conversion pressure. It is: **editorial closing invitation.**

**Canonical:**
- understated typography,
- editorial text link - `text-[11px] font-semibold tracking-[0.18em] uppercase`,
- `text-gray-400 hover:text-gray-700 transition-colors duration-200 ease-out`,
- calm spacing (deepest after Philosophy),
- low-pressure interaction.

**Forbidden:**
- large conversion CTA,
- aggressive sales copy,
- growth marketing patterns,
- countdowns,
- urgency mechanics.

---

### K. ABOUT PAGE FOOTER VARIANT

About page uses dedicated footer behavior.

**Rules:**
- newsletter hidden,
- `py-14` main grid (compressed vs default `py-16`),
- `py-4` legal bar (same as article variant),
- softer transition after Quiet CTA.

**Detection regex:** `/^(\/en)?\/about\/?$/`

**Reason:** newsletter after Quiet CTA breaks institutional cadence.

---

### L. VISUAL LANGUAGE LOCK RULES

**LOCKED - nie zmieniać:**
- grayscale portrait treatment,
- editorial spacing cadence,
- quiet CTA logic,
- leadership row architecture (horizontal, NOT cards),
- philosophy spacing dominance,
- restrained institutional palette,
- prose-first hierarchy,
- `border-gray-100` separators.

**FORBIDDEN:**
- shadows,
- gradients,
- colorful cards,
- startup culture visuals,
- playful interactions,
- card-heavy layouts,
- centered executive cards,
- icon overload,
- marketing animations.

**CONDITIONALLY CHANGEABLE:**
- copy,
- number of leadership members,
- capabilities content,
- credentials content,
- quote content,
- advisor categories.

---

### M. SYSTEM STATUS

**Status: CANONICAL FREEZE APPROVED**

This system becomes the default institutional trust layer for the entire Profitia platform.

*Sekcja dodana: May 2026 | Commit: c25e9dd | TSC clean | Wdrożona po: team system build (18 files), editorial refinement pass, CIPS logo fix, final institutional micro-polish pass.*

---

## SECTION 31 - TYPOGRAPHIC NEUTRALITY SYSTEM

> **Status:** Source of Truth | Version 1.0 | May 2026
> **Scope:** All platform surfaces - copy, labels, CTAs, documentation, legal, editorial, forms, metadata.
> **Obowiazuje od:** ETAP 7.7 (May 2026).

---

### Standard separator

Profitia uses **space-hyphen-space** as the canonical sentence separator across the entire platform.

**Correct:** ` - ` (space-hyphen-space)
**Forbidden:** `—` (em dash), `–` (en dash used as separator), `--` (double hyphen)

### Why the em dash was retired

The em dash (`—`) carries typographic register associations that conflict with Profitia's institutional positioning:

| Em dash register | Profitia register |
|-----------------|------------------|
| Editorial magazines | Institutional documentation |
| Luxury brand communication | Executive briefings |
| Literary publishing | Consulting papers |
| Designed sentence drama | Procurement operating systems |
| Typographic expressiveness | Procedural neutrality |

The em dash makes typography perform. Profitia's typography is not a performance. It is a structure that allows content to carry authority without decoration.

### What the institutional hyphen communicates

The standard hyphen is:
- calmer - less typographically assertive,
- more procedural - belongs to operational communication,
- more institutional - aligned with the register of advisory documents,
- more neutral - does not introduce editorial emotion into sentence rhythm.

These properties align precisely with:
- institutional silence (the whitespace principle extended to punctuation),
- low-emotion communication (analytics, procurement, advisory),
- executive readability (C-suite audiences read efficiently, not poetically),
- restrained cadence (sentence construction carries rhythm, not punctuation).

### Scope of the rule

The typographic neutrality rule applies to:

| Surface | Examples |
|---------|----------|
| User-visible copy | Dictionary strings (pl.json, en.json), component COPY objects |
| Editorial documentation | All docs/design-system/*.md files |
| Legal content | Privacy, terms, cookies pages |
| Form copy | Labels, placeholders, error messages, consent text |
| Career and application layer | Role descriptions, CTA labels, success states |
| Metadata | page titles, descriptions, alt text |
| Code comments | Inline and JSDoc comments in .ts/.tsx files |
| Internal documentation | README files, CHANGELOG files |

### Permitted exceptions

The following uses of hyphen variants are permitted where technically appropriate:

| Usage | Rule | Example |
|-------|------|---------|
| Numeric ranges | Plain hyphen, no spaces | `3-6 tyg.` |
| Phone numbers | Per-standard formatting | `+48 787 417 293` |
| URL slugs and file names | Per-standard formatting | `career-apply`, `procurement-consultant` |
| CSS class names and code operators | Per-language syntax | `max-w-[42rem]`, `border-gray-200` |
| Compound words | Per-language grammar | `well-documented`, `state-of-the-art` |

### Future rule - absolute

The following are permanently prohibited as editorial or stylistic devices:

| Character | Unicode | Name | Prohibition |
|-----------|---------|------|-------------|
| `—` | U+2014 | Em dash | Absolute - no exceptions for editorial use |
| `–` | U+2013 | En dash | Forbidden as sentence separator |
| `--` | ASCII | Double hyphen as separator | Forbidden |

**No future contributor, component, dictionary entry, or documentation file may introduce `—` or `–` for stylistic or editorial pacing purposes.**

**Default separator across the entire system:** ` - ` (space-hyphen-space).

### Cross-document authority

This rule is enforced in:
- `CAPABILITY_EDITORIAL_SYSTEM.md` - capability and detail page layer
- `RECRUITMENT_EDITORIAL_SYSTEM.md` - career and application layer
- `VISUAL_CONTEXT_PROFITIA.md` - global visual language (this document)

All three documents are in agreement. The rule is system-wide, not page-specific.

---

*Sekcja dodana: May 2026 - ETAP 7.7 typographic normalization pass. 154 source files updated. Zero em/en dashes remain in the codebase.*

