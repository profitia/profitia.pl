# VISUAL CONTEXT — PROFITIA DESIGN SYSTEM
> **Status:** Source of Truth | Version 1.0 | May 2026
> **Scope:** Wszystkie strony, podstrony, komponenty, sekcje, CTA, formularze, dashboardy, landing pages, moduły SaaS.
> **Obowiązuje od:** teraz i przez cały czas życia projektu.

---

## JAK UŻYWAĆ TEGO DOKUMENTU

Ten plik jest **primary reference** dla każdego nowego elementu UI.

Przed zbudowaniem czegokolwiek — strony, sekcji, komponentu, CTA:

1. Przeczytaj sekcję **Brand DNA** i **Visual Character**
2. Sprawdź **Color System** — wybierz kolor z palety, nie intuicyjnie
3. Zastosuj **Section Composition Rules** — nie stackuj bloków jak landing page builder
4. Zweryfikuj przez **Anti-Patterns** — jeśli cokolwiek pasuje do listy zakazanej, cofnij
5. Przejdź przez **Visual Consistency Guardrails** — ostateczna weryfikacja

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
- **premium strategic intelligence platform** — operuje na poziomie decyzji C-suite
- **negotiation intelligence company** — specjalistyczna wiedza, dane, przewaga
- **executive SaaS** — UI musi być godne prezentacji przed CFO / CPO / Board
- **data-driven advisory platform** — content ważniejszy niż dekoracja
- **sophisticated enterprise technology brand** — elegancja, nie ostentacja

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

- **Negotiation** — napięcie, precyzja, waga decyzji — UI musi to oddawać
- **Intelligence** — data, pattern, insight — layout musi komunikować głębię
- **Premium** — każdy piksel ma uzasadnienie — brak przypadkowych elementów
- **Quiet confidence** — nie krzyczy, nie sprzedaje agresywnie, mówi spokojnie i pewnie

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
| **Blue Gray** | `#CAD2E3` | — | Section tints, card backgrounds, subtle depth |

### Background Logic — systemowe użycie tła

Kolory tła muszą tworzyć **tonal rhythm** — nie przypadkowe sekcje.

| Typ sekcji | Tło | Przeznaczenie |
|-----------|-----|--------------|
| **Primary / hero** | `bg-white` | Otwarcie, maksymalny oddech |
| **Secondary / alternating** | `bg-gray-50` lub `#CAD2E3/15` | Delikatna zmiana bez kontrastu |
| **Dark accent break** | `bg-[#242F44]` | Testimonial, proof moment, executive statement |
| **Premium dark moment** | `bg-[#48103F]` | Wyjątkowe sekcje — sparingly |
| **Full black CTA** | `bg-black` | CTA section — identyczna z landing page |
| **Data section** | `bg-gray-900` | Wykresy, metryki, insight sections |

#### Gradient Logic

Dozwolone gradienty:
- `bg-gradient-to-b from-white to-gray-50` — delikatne przejście między sekcjami
- `bg-gradient-to-r from-[#242F44] to-[#006D9E]` — hero dark variant, sparingly
- `from-black/20 to-transparent` — overlay na zdjęciach (standard)
- `from-black/30 to-transparent` — hero image overlay (bardziej intensywny)

Zakazane gradienty:
- rainbow / multi-color gradients
- neon gradients (`pink → purple → blue`)
- heavy solid-to-transparent na kolorowych tłach bez uzasadnienia

### Tailwind Config — stan docelowy

```ts
// tailwind.config.ts — docelowa konfiguracja
colors: {
  brand: {
    navy: '#242F44',      // Primary — Deep Navy
    blue: '#006D9E',      // Corporate Blue
    bright: '#0092D9',    // Bright Blue
    purple: '#48103F',    // Deep Purple
    magenta: '#8E0055',   // Magenta Accent
    // Neutrals (reference Tailwind grays — nie custom)
  }
}
```

> **Uwaga:** Obecna config ma `brand.primary: #1a365d` — to placeholder, nie brandbook. Wymaga aktualizacji na `#242F44`.

---

## 4. TYPOGRAPHY SYSTEM

### Stack

| Rola | Font | Weight range |
|------|------|-------------|
| **Headlines** | Inter (nie Poppins) | 500–700 |
| **Body** | Inter | 400–500 |
| **Labels / caps** | Inter | 500–600 |
| **Data / mono** | JetBrains Mono (opcjonalnie) | 400 |

> **Kluczowe:** UI Profitii używa **Inter jako jedynego fonta**. Poppins (`font-heading`) był placeholder — nie pasuje do editorial premium character. Wszystkie nowe komponenty: tylko Inter.

### Hierarchy Rules

#### Labels (section openers)

```
text-xs font-medium tracking-[0.25em] uppercase text-gray-400
```
Przykład: `"O firmie"`, `"Jak działamy"`, `"Wyniki"` — zawsze nad H2.

#### H1 — Page heroes

```
text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight
text-gray-900 leading-[1.08]
```

#### H2 — Section headlines

```
text-3xl md:text-4xl font-semibold tracking-tight
text-gray-900 leading-tight
```

#### H3 — Card / feature titles

```
text-lg font-semibold text-gray-900 tracking-tight
```

#### H4 — Minor titles

```
text-base font-semibold text-gray-900
```

#### Body — primary

```
text-base text-gray-600 leading-relaxed
```

#### Body — supporting / secondary

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

#### Caps label — dark sections

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

### Sekcje — vertical padding

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

UI Profitii operuje na zasadzie **breathing room** — każdy element ma przestrzeń do istnienia.

- Między label a H2: `mb-5` do `mb-6`
- Między H2 a body: `mb-6` do `mb-8`
- Między body a CTA/listy: `mb-8` do `mb-10`
- Między body a grid: `mb-12` do `mb-16`
- Sekcja gap (grid): `gap-16 lg:gap-20` lub `gap-24`

> Jeśli coś wygląda za ciasno → dodaj whitespace. Never compress.

### Layout Character

- **Asymetryczny**: `grid-cols-1 lg:grid-cols-2` z różnymi wagami kolumn (`lg:grid-cols-[60%_40%]`)
- **Compositional**: elementy nie są centered-by-default — mają optyczną wagę
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

Ten pattern pochodzi z landing page — używaj dla "co dostaniesz", "jak to działa", process steps.

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
// Editorial — bez box, bez border, tylko cyfra + label
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

- `shadow-xl` bez hover — wygląda ciężko
- `bg-brand-light` z `border-brand-secondary` — corporate feeling
- `rounded-2xl` na zwykłych kartach z treścią — zbyt playful
- `card hover:shadow-md` bez color change — zbyt bootstrap

---

## 8. BUTTON SYSTEM

### Primary button — jasne tła

```
bg-black text-white rounded-xl px-6 py-3.5 font-medium text-sm
hover:bg-gray-800 transition-colors duration-200
```

### Primary button — dark sections (bg-black)

```
bg-white text-black rounded-xl px-8 py-4 font-medium text-base
hover:bg-gray-100 transition-colors duration-200
```

### Secondary / outline button

```
border border-gray-300 text-gray-700 rounded-xl px-6 py-3.5 font-medium text-sm
hover:border-gray-900 hover:text-gray-900 transition-colors duration-200
```

### Secondary — dark sections

```
border border-gray-700 text-gray-300 rounded-xl px-8 py-4 font-medium text-base
hover:border-gray-400 hover:text-white transition-colors duration-200
```

### Brand CTA button (alternatywny — sparingly)

```
bg-[#242F44] text-white rounded-xl px-6 py-3.5 font-medium text-sm
hover:bg-[#006D9E] transition-colors duration-200
```

### Zakazane

- `btn-primary` z obecnej `globals.css` (navy `#1a365d`, placeholder) — nie używać w nowych komponentach
- `rounded-lg` — używamy `rounded-xl`
- `px-4 py-2` — zbyt kompaktowy, nie premium
- `inline-flex items-center` bez gap — tylko gdy naprawdę potrzebna ikona inline

---

## 9. SECTION COMPOSITION RULES

### Rhythm tonal stron

Strony Profitii mają następować po sobie z **tonal progression**:

```
white → gray-50 → white → gray-50 → gray-900 (dark break) → white → black (CTA)
```

Nigdy: `navy → white → navy → white` — to corporate consulting.
Nigdy: `white → white → white → white` — brak rytmu, brak głębi.

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

### CTA section — zawsze ostatnia

Strony kończą się sekcją CTA:
```
bg-black, py-24 lg:py-32, text-center
```
Dokładny pattern z `public/landing/components/cta.html` — nie modyfikować.

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
| stagger delay (0.1–0.4s) | delay > 0.5s |
| smooth hover transitions (200–300ms) | animations > 600ms |
| opacity hover na kartach | flashy entrance effects |

### Hover transitions — standard

```
transition-all duration-300     // karty z color change
transition-colors duration-200  // buttony, linki
transition-transform duration-200  // arrow → translate-x-1
```

---

## 11. IMAGE TREATMENT

### Standard — full section image

```
relative h-[380px] md:h-[480px] rounded-2xl overflow-hidden
<Image fill className="object-cover" />
<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
```

### Hero split-screen — prawa kolumna

```
relative w-full h-[60vh] lg:h-[calc(100vh-64px)] overflow-hidden
<Image fill className="object-cover" priority />
<div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
```

### Art direction guidelines

- **Kolorystyka:** zimnoniebieska, szaro-niebieskawa, ciemna — pasuje do brand navy
- **Temat:** ludzie w kontekście biznesowym, dane, negocjacje, spotkania boardroom
- **Styl:** editorial, cinematic — nie marketing stock, nie cheesy handshake
- **Overlay:** zawsze `from-black/20` lub `from-black/30` — nigdy plain background

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
| base | Mobile first — single column, pełna szerokość |
| `md:` (768px) | 2-column grids, show desktop nav elements |
| `lg:` (1024px) | Split-screen layouts, full desktop experience |
| `xl:` (1280px) | Spacious containers, wide content |

### Mobile typography

Na mobile H1 zmniejsza się automatycznie:
```
text-4xl md:text-5xl lg:text-6xl
```
Body nie zmienia się — `text-base` wystarczy na mobile.

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
- Nav mobile: hamburger lub uproszczony — nie `hidden` bez zastępnika

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

Użytkownik patrząc na sekcję ma natychmiast wiedzieć co jest najważniejsze. Jeden dominujący element — headline, stat, lub obraz. Reszta podporządkowana.

### 4. Trust signals — nieagresywne

Social proof (testimonials, stats, case studies) — zawsze jako dark accent break (gray-900), nie pop-up, nie banner. Musi wyglądać jak fakt, nie claim.

### 5. CTA — jedno na sekcję

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
  layout/         // Header, Footer — globalne
  services/
    subpage-services-1/  // page-specific — OK dla teraz
  ui/             // (docelowo) Button, Card, Label, RevealWrapper
```

### Props convention

Sekcje przyjmują **wszystkie treści jako props** — zero hardcoded stringów w komponentach. Komponenty są wizualnie opinionated, treściowo agnostic.

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
| `final – PROFITIA logo poppins.svg` | **PRIMARY** — jasne tła, header, standardowe sekcje |
| `final – PROFITIA logo poppins WHITE.svg` | Ciemne tła, footer, dark CTA, navy bg |
| `final – PROFITIA logo poppins BLACK.svg` | Ultra-clean jasne sekcje — selektywnie |

### Deployment do public

Logo do użycia w Next.js musi być skopiowane do `public/`:
```
public/
  logo/
    profitia-default.svg    // kopia "final – PROFITIA logo poppins.svg"
    profitia-white.svg      // kopia "final – PROFITIA logo poppins WHITE.svg"
    profitia-black.svg      // kopia "final – PROFITIA logo poppins BLACK.svg"
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

### Logo Usage Rules — absolutne

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

- Żadne `rounded-lg` na kartach — używamy `rounded-xl`
- Żadne `shadow-md` jako default — tylko na hover dark cards
- Żadne `border-2` — używamy `border` (1px)
- Żadne `text-center` jako domyślne — treści left-aligned
- Żadne `flex-wrap justify-center` na nav linkach

### Anti-template rules

- Żadne sekcje copy-paste z UI kit bez dostosowania do brandowej palety
- Żadne "about us" w 3 kolumnach z ikonami i centered text (generic SaaS)
- Żadne hero z centralnie ułożonym tekstem i stock photo w tle (Webflow)
- Żadne "feature highlight" z colored icon boxes (startup template)

### Anti-corporate-consulting rules

- Żadne `bg-brand-primary` jako sekcja hero (obecny `page.tsx` — do refactoru)
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

> **Każdy nowy element — page, subpage, component, section, CTA, dashboard, feature block, form — MUSI wyglądać jak część tego samego produktu, tego samego design systemu, tej samej marki, tej samej filozofii UI.**

Profitia nie ma "różnych sekcji strony". Ma **jedną spójną obecność cyfrową**.

Jeśli coś co budujesz wygląda inaczej niż landing page lub service subpage — zatrzymaj się. Wróć do sekcji Brand DNA, Visual Character, Color System. Zidentyfikuj rozbieżność. Napraw przed commitem.

---

## 19. FUTURE REFACTORS — lista niespójności

Poniżej zidentyfikowane miejsca wymagające refactoru dla pełnej spójności:

### Priorytet 1 — Krytyczne

| Plik | Problem | Wymagane działanie |
|------|---------|-------------------|
| `tailwind.config.ts` | `brand.primary: #1a365d` — placeholder, nie brandbook | Zaktualizować na `#242F44`, dodać pełną paletę |
| `styles/globals.css` | `.btn-primary` i `.btn-secondary` → navy placeholder | Zaktualizować lub usunąć, zastąpić nowym systemem |
| `styles/globals.css` | `h1-h6 { @apply font-heading }` → Poppins wszędzie | Usunąć, Inter jako jedyny font |
| `components/layout/Header.tsx` | `text-brand-primary` jako logo text | Zastąpić `<Image>` z SVG logo |
| `components/layout/Footer.tsx` | `bg-brand-primary text-blue-200` | Zaktualizować na `bg-[#242F44]`, `text-gray-300` |

### Priorytet 2 — Ważne

| Plik | Problem | Wymagane działanie |
|------|---------|-------------------|
| `app/[lang]/page.tsx` | Hero: `bg-brand-primary` navy → corporate | Pełny redesign z landing page DNA |
| `app/[lang]/page.tsx` | Service cards: hover `shadow-md` bez color | Dark hover pattern |
| `app/[lang]/services/page.tsx` | Placeholder, brak designu | Nowa strona services z grid kart |
| `app/[lang]/about/page.tsx` | Placeholder, `font-heading font-bold` | Nowa strona O nas |
| `app/[lang]/contact/page.tsx` | `focus:ring-brand-primary`, `rounded-lg` inputs | Zaktualizować form styles |

### Priorytet 3 — Medium

| Plik | Problem | Wymagane działanie |
|------|---------|-------------------|
| `app/admin/layout.tsx` | `bg-brand-primary sidebar` | Admin ma swój visual system — ok, ale zaktualizować na brand navy `#242F44` |
| `app/admin/layout.tsx` | `hover:bg-brand-secondary` | → `hover:bg-[#006D9E]` |
| `Logotypy/*.svg` | Pliki są w root projektu, nie w `public/` | Skopiować do `public/logo/` |
| `components/layout/Header.tsx` | Brak mobile hamburger menu | Dodać mobile nav |

### Priorytet 4 — Low / Future

| Obszar | Wymagane działanie |
|--------|-------------------|
| `RevealWrapper.tsx` | Przenieść do `components/ui/RevealWrapper.tsx` |
| `CtaSection.tsx` | Wyekstrahować do globalnego komponentu |
| Blog pages | Brak designu — zaplanować editorial blog layout |
| Admin panel | Osobny visual system dla admin — nie musi matchować public |

---

*Ten dokument jest żywym artefaktem — aktualizuj go gdy design system ewoluuje.*
*Wersja: 1.1 | Ostatnia aktualizacja: May 2026*

---

## 20. HOMEPAGE CANONICAL STRUCTURE

> **Status: LOCKED** — Kanoniczny układ strony głównej. Chroniony. Nie modyfikować bez wyraźnej instrukcji użytkownika.

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
- **editorial** — każda sekcja wnosi narrację,
- **cinematic** — sekcje mają dramaturgię, rytm, napięcie,
- **narrative-driven** — nie showcase komponentów, lecz opowieść,
- **strategic** — journey zakupowy użytkownika jest zaplanowany,
- **premium** — wrażenie jakości droższe niż koszt.

---

### HOMEPAGE STRUCTURE LOCK

Poniższa struktura jest **kanoniczna i zablokowana**.

#### Kolejność sekcji — LOCKED

| # | Sekcja | ID / opis | Klucz kompozycyjny |
|---|--------|-----------|-------------------|
| 1 | **Hero** | — | 2 kolumny: tekst L + visual R; badge "+20%" |
| 2 | **Problem** | `#bzze51` | Szare tło; 7 punktów bólowych w 2 kolumnach; quote block z lewym borderem |
| 3 | **Insight** | `#3hhwq4` | Timeline; 3 numerowane punkty w kółkach; szara linia pionowa |
| 4 | **Pillars** | `#pillars-section` | 3 kolumny full-height; hover reveal image; efekt przyciemniania sąsiadów |
| 5 | **Process** | `#b5xg0q` | Kroki 01–05; duże blade numery; editorial divide-y |
| 6 | **Impact** | `#vqj89m` | Dark section `bg-gray-900`; 6 kart ze strzałkami; tonal break |
| 7 | **Use Cases** | `#p8800w` | 4 karty; hover invert na `bg-gray-900`; kontekstowe triggery |
| 8 | **Insights / Articles** | `#insights-section` | Editorial grid 3 kolumny; cinematic card images; strategic perspectives layer |
| 9 | **Proof** | `#d31qlk` | Szare tło; 3 statystyki (+20%, 3–6 tyg., 12+); grid sektorów |
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

#### Override — kiedy wolno zmienić strukturę

Zmiana struktury homepage jest dozwolona WYŁĄCZNIE gdy użytkownik:
1. Wyraźnie i świadomie o to prosi,
2. Zatwierdza zmianę architecture,
3. Akceptuje zmianę narrative flow.

Przypadkowe, automatyczne lub "improvement"-driven zmiany struktury są **bezwzględnie zakazane**.

---

### INSIGHTS / ARTICLES SECTION — LOCKED

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

- `bg-white` — spokojny editorial background
- `py-28` — standard section spacing
- Grid: 3 kolumny desktop / 2 tablet / 1 mobile
- Card image: `aspect-[16/10]`, `rounded-xl`, hover zoom + brightness dim
- Meta: uppercase, tracked, `text-[10px]`, gray-400
- Title: `text-xl font-semibold`, 2–3 linie max
- CTA: inline text link (NIE button), `→` suffix

#### Editorial direction

Obrazy: cinematic, muted, strategic — procurement, manufacturing, supply chain, analytics, boardroom, industrial.
NIE: startup stock photos, uśmiechnięci ludzie w biurze, generic corporate.

#### Override — modyfikacja sekcji

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

> **Status: LOCKED** — Kanoniczny system interakcji. Obowiązuje we WSZYSTKICH komponentach platformy.

### Filozofia interakcji

Profitia to:
- premium strategic advisory
- executive editorial product
- boutique consulting brand

Interakcje mają:
- **wzmacniać spokój** — nie dramatyzować
- **dawać feedback** — nie przyciągać uwagi
- **czuć się premium** — nie startupowo

---

### GLOBALNE REGUŁY HOVER

#### Dozwolone

| Zachowanie | Opis |
|-----------|------|
| Subtle opacity shift | Zmiana opacity: 70–90% → 100% lub odwrotnie |
| Subtle color darkening | gray-400 → gray-700 → gray-900 (progresja) |
| Border transition | border-gray-200 → border-gray-400 |
| Background transition | transparent → gray-50 lub gray-900 (invert cards) |
| Underline reveal | opacity-0 → opacity-30/50, height 1px |
| translateY (-1px max) | Wyłącznie dla card-level hovers |

#### Zakazane

| Zachowanie | Powód |
|-----------|-------|
| `scale` hover | Za agresywne, psuje rytm |
| `bounce` / `spring` | Playful — nie pasuje do tonu |
| Dramatic translate | Traci spokój editorial |
| Glow / glow shadow | Neon/gaming feel |
| Colorful hover states | Dekoncentruje |
| `transition-all` bez powodu | Niekonkretne, może powodować jitter |
| Hover chaos między komponentami | Powoduje incoherent UX |

---

### STANDARD TIMING

```
Micro interactions (color, opacity):   180ms – 220ms  → preferred: 200ms
Card-level transitions (bg, shadow):   260ms – 320ms  → preferred: 300ms
Section/overlay animations:            260ms – 360ms  → preferred: 300ms
Reveal animations:                     500ms – 600ms  → preferred: 550ms
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
- [ ] Hover timing: 150–220ms (micro) lub 260–320ms (card)?
- [ ] Easing: ease-out?
- [ ] Brak scale / bounce / glow?
- [ ] Color progression zgodna z paletą (gray-400 → gray-700 → gray-900)?
- [ ] Spójne z innymi komponentami tego samego typu?

---

*Sekcja dodana: May 2026 | Canonical interaction standard — obowiązuje od tego momentu we wszystkich komponentach.*

---

## SECTION 22 — CONTACT DATA EXPOSURE STANDARD

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

- SSR renderuje pusty `<span aria-hidden="true" />` — żadnych danych w HTML source
- Po hydration (`useEffect` → `mounted`) renderuje pełny semantyczny element:
  - `<a href="mailto:user@domain">` dla emaila
  - `<a href="tel:+48...">` dla telefonu
  - `<span>` dla nazwiska
- Dane przekazywane jako split props (user + domain osobno) — niewidoczne w source

### WYJĄTKI (nie wymagają ochrony)

- Adres siedziby firmy (instytucjonalny, publiczny)
- NIP / REGON / KRS firmy
- Publiczne dane rejestrowe spółki
- Telefon główny firmy (opcjonalnie — do decyzji per-project)

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

*Sekcja dodana: May 2026 | Contact Data Exposure Standard — obowiązuje od tego momentu we wszystkich komponentach i stronach.*

