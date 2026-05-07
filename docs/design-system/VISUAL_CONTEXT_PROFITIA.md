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

---

## SECTION 23 — CANONICAL HEADER SYSTEM

> **Source of truth.** Header osiągnął canonical state w maju 2026. Implementacja: `components/layout/Header.tsx`. Wszelkie zmiany wymagają explicit authorization i aktualizacji tej sekcji.

---

### A. HEADER PHILOSOPHY

Header reprezentuje pierwszy i najbardziej persistentny punkt kontaktu użytkownika z marką Profitia. Musi komunikować:

- **Strategic intelligence firm** — nie agencja, nie startup, nie SaaS
- **Restrained authority** — pewność siebie bez nadmiernej ekspresji
- **Editorial calm** — spokojny, wyselekcjonowany, nie krzykliwy
- **Institutional presence** — premium consulting, doradztwo strategiczne

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
- **Logo** — left anchor, flex-shrink-0, no crowding
- **Navigation** — centered visual weight, hidden on mobile
- **Utility cluster** — right: lang switcher → CTA → hamburger

**Container:** `container-base` = `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

**Two-state sticky behavior:**
| State | Height | Background | Border | Shadow |
|-------|--------|------------|--------|--------|
| Top (unscrolled) | `h-[88px]` | `bg-white/0 backdrop-blur-[2px]` | `border-transparent` | none |
| Scrolled (>20px) | `h-[72px]` | `bg-white/96 backdrop-blur-md` | `border-gray-100/80` | `shadow-[0_1px_16px_0_rgba(0,0,0,0.04)]` |

**Transition:** `transition-all duration-[260ms] ease-out` — smooth, not jarring, not instant.

---

### C. DESKTOP NAV RULES

**Nav structure — two tiers, one visual line:**

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

**Format:** `PL · EN` — dot separator, no full names, no flags, no dropdown.

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
- "PL — Polski" / "EN — English" labels
- Dropdown menu
- Globe icon
- Heavy border/background style

---

### E. CTA BUTTON STANDARD

**Color:** `bg-[#1C1C1E]` (dark graphite) — advisory, authoritative, not SaaS blue

**Hover:** `hover:bg-[#2D2D30]` — subtle lightening, never white/light

**Desktop:** `px-4 py-[9px] text-[13px] font-medium tracking-[-0.01em] rounded-lg`

**Mobile:** `w-full py-4 text-sm font-medium rounded-xl` — full width, taller tap target

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

**Approach:** Fullscreen overlay — not drawer, not dropdown, not slide-in panel.

**Overlay spec:**
- `fixed inset-0 z-40` — covers full viewport
- `bg-white` — pure white, not frosted, not dark
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
- Contact email: `text-xs text-gray-400` — plain fallback (institutional address)

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

**LOCKED — requires explicit authorization to change:**
- Two-state sticky behavior and timing (`260ms`)
- Logo position (always left)
- Nav structure (primary/separator/secondary split)
- CTA color `#1C1C1E`
- Mobile fullscreen overlay approach
- Language switcher format (`PL · EN`)
- Canonical hover timing (`duration-200 ease-out`)

**CONDITIONALLY CHANGEABLE (with justification):**
- Nav link labels (driven by dictionary — localization OK)
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

## SECTION 24 — CANONICAL FOOTER SYSTEM

> **Source of truth.** Footer osiągnął canonical state w maju 2026. Implementacja: `components/layout/Footer.tsx`. Kontakty chronione przez canonical security system (Section 22). Wszelkie zmiany wymagają explicit authorization i aktualizacji tej sekcji.

---

### A. FOOTER PHILOSOPHY

Footer jest institutionalną warstwą informacyjną — nie konwersyjną. Musi komunikować:

- **Institutional authority** — pełna informacja, zorganizowana, czytelna
- **Trust architecture** — certyfikaty, dane kontaktowe, adres, zasoby
- **Editorial density** — informacja gęsta ale spokojna, nie przytłaczająca
- **Premium consulting** — nie startup, nie SaaS, nie marketing-heavy

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

**Background:** `bg-white` — nigdy dark, nigdy gradient

**Section dividers:** `border-gray-100` — delikatne, niewidoczne z daleka

---

### C. NEWSLETTER STANDARD

**Philosophy:** Editorial newsletter invite — nie marketing popup, nie conversion banner.

**Grid:** `md:grid-cols-[1fr_1.1fr]` — lekka asymetria na korzyść formularza, `gap-6 lg:gap-10`

**Left (copy):**
- Eyebrow: `text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400`
- Heading: `text-xl font-semibold tracking-tight text-gray-900 max-w-sm`
- Sub: `text-sm text-gray-500 mt-3 max-w-xs leading-relaxed`

**Right (form):**
- Input + button w jednej linii (`flex gap-2`)
- Input: `px-4 py-3.5 text-sm border border-gray-200 rounded-lg focus:border-gray-500`
- Button: `bg-[#1C1C1E] hover:bg-[#2D2D30] px-5 py-3.5 text-sm font-medium rounded-lg`
- No `max-w` constraint on form — fills column

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
1. Logo link — `hover:opacity-70 transition-opacity duration-200 ease-out`
2. Legal company name — `text-[10px] font-bold tracking-[0.12em] uppercase text-gray-600` (institutional feel)
3. Tagline/descriptor — `text-[11px] text-gray-400 leading-relaxed`
4. Address — `text-[11px] text-gray-400 leading-relaxed`
5. CIPS logo — `grayscale opacity-50 hover:opacity-80 transition-opacity duration-200 ease-out`

**Hierarchy rationale:** Company name gets `font-bold + text-gray-600` (darker than other body) — institutional authority signal.

---

#### Column 2: Navigation

**Purpose:** Redundant navigation for discoverability + SEO

**Contents:** All main nav links + privacy link
**Typography:** `text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out`
**Spacing:** `space-y-2.5`

---

#### Column 3: Contact

**Purpose:** Full contact directory — protected by canonical security system

**Sub-sections (canonical order):**
1. **Main contact** — phone + email (`space-y-1`)
2. **Training & conferences** (sub-label) — name + email + phone (`space-y-0.5`)
3. **SpendGuru** (sub-label) — name + email + phone (`space-y-0.5`)

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

**Layout:** Left-aligned only — no right-side content

**Copyright:**
`text-xs text-gray-400`
`© {year} Profitia Management Consultants. {dict.footer.rights}`

**Why no privacy link here:** Privacy link exists in Column 2 (Navigation). Duplication removed — canonical rule is single occurrence.

**Container padding:** `py-5`

**Forbidden:**
- Right-side links in legal bar (privacy already in nav column)
- Legal entity details in legal bar (belongs in brand column)
- Large font size legal text

---

### F. MOBILE FOOTER RULES

**Approach:** Editorial stacking — controlled collapse, consistent rhythm.

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

**Spacing:** `gap-10` maintained on all breakpoints — prevents compression artifacts

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

**LOCKED — requires explicit authorization to change:**
- Three-section architecture (newsletter / grid / legal)
- Four-column grid structure
- Column assignment and ordering
- Background: `bg-white`
- Section dividers: `border-gray-100`
- No social label above icons
- No privacy link in legal bar
- Contact protection (Section 22) — all personal data must be protected
- Canonical hover timing (`duration-200 ease-out`)

**CONDITIONALLY CHANGEABLE (with justification):**
- Newsletter copy (dictionary-driven — localization OK)
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

*Sekcja dodana: May 2026 | Canonical Header + Footer System — source of truth dla globalnego shell Profitia.*

---

## SECTION 25 — CANONICAL LEGAL SYSTEM

> **Status:** Stable | Production-grade | Canonical
> **Cross-ref:** Section 21 (Interaction System) · Section 23 (Header System) · Section 24 (Footer System) · `docs/design-system/LEGAL_SYSTEM.md`

Legal pages constitute a distinct experience system — not a page type, not a template category. They implement a dedicated **editorial + institutional reading architecture** that prioritizes trust, readability, and cognitive calm over conversion, engagement, or aesthetics.

---

### A. PHILOSOPHY

Legal pages serve a different function than every other page on the site. They exist to:

- Build **institutional trust** — the reader is evaluating whether this company can be trusted
- Support **sustained long-form reading** — sections run to hundreds of words
- **Reduce visual fatigue** — dense legal text requires exceptional typographic care
- Project **institutional character** — calm, restrained, authoritative

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
| `LegalLayout` | Server | Two-column grid shell — sidebar + content |
| `LegalSidebar` | Client | Sticky desktop TOC wrapper / collapsible mobile |
| `LegalTOC` | Client | IntersectionObserver-based active-section TOC |
| `LegalContent` | Server | Prose container with manual Tailwind arbitrary variants |
| `LegalSection` | Server | Individually scrollable section with `id` and `scroll-mt-28` |
| `LegalHero` | Server | Restrained hero with eyebrow, H1, intro, and metadata chips |
| `LegalMeta` | Server | Metadata chip strip (date, jurisdiction, version) |
| `LegalAnchorLink` | Client | Smooth-scroll anchor with `prefers-reduced-motion` support |

**Layout behavior:**

- **Desktop:** Two-column grid — `240px` sticky sidebar + fluid content column (`max-w-[65ch]`)
- **Mobile:** Single column — collapsible TOC above content
- **Sidebar:** `sticky top-28 self-start` on desktop; accordion pattern on mobile
- **Content width:** Constrained to `max-w-[65ch]` — optimal for long-form reading
- **Spacing:** Deep decompression at page bottom (`pb-32 lg:pb-44`) — reading should end with calm, not collision with footer

**Navigation:**

- TOC tracks the active section using `IntersectionObserver` with `rootMargin: '-10% 0% -70% 0%'`
- Anchor links use smooth scroll with `prefers-reduced-motion` fallback to `behavior: 'auto'`
- URL hash updates on anchor click via `history.pushState` (no Next.js navigation triggered)

---

### C. COMPONENT LOCK RULES

**LOCKED — requires explicit authorization to change:**
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
- Line length hard-capped at `max-w-[65ch]` — no sprawling legal text
- Contrast is **restrained** — body is `text-gray-600`, not `text-gray-900` — reduces fatigue on long reads
- Heading hierarchy is strict: H1 → H2 → H3. No skipping.
- Section borders (`border-t border-gray-100`) provide visual pacing without heavy dividers

---

### E. ACCESSIBILITY

| Rule | Implementation |
|------|----------------|
| Reduced motion | `LegalAnchorLink` checks `window.matchMedia('(prefers-reduced-motion: reduce)')` — uses `behavior: 'auto'` when true |
| Keyboard navigation | All TOC links are native `<a>` elements — fully keyboard-reachable |
| Anchor accessibility | TOC `<nav>` has `aria-label="Spis treści"` |
| Heading hierarchy | H1 in `LegalHero` → H2 in `LegalSection` → H3 in `LegalContent` — no skips |
| Mobile reading | Single-column layout, collapsible TOC, `scroll-mt-28` anchor offset |
| TOC nav label | `aria-label` present — screen reader can navigate directly to TOC |

---

*Sekcja dodana: May 2026 | Canonical Legal System — source of truth dla legal reading architecture.*

---

## SECTION 26 — LEGAL FOOTER VARIANT

> **Cross-ref:** Section 24 (Canonical Footer System)

Legal pages use an **institutional footer variant** — the standard newsletter section is suppressed. This is not an option or override; it is the canonical behavior for all legal pages.

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
- Legal path list (add new legal pages — update the detection array)
- Grid content (consistent with Section 24 rules)

---

*Sekcja dodana: May 2026 | Legal Footer Variant — institutional footer behavior for legal reading.*

---

## SECTION 27 — LEGAL READING UX RULES

> **Cross-ref:** Section 21 (Interaction System) · Section 23 (Header System) · Section 25 (Legal System)

This section defines the **UX doctrine** governing the reading experience on all legal pages. Implementation details live in `LEGAL_SYSTEM.md` and component files. This section defines the *why* and the *what* at system level.

---

### A. READING RHYTHM

Legal text is cognitively demanding. The spacing system exists to reduce fatigue, not to fill space.

**Principles:**

- **Breathing room first** — sections are separated by both spacing and a subtle `border-t border-gray-100`; the eye gets a rest between topics
- **Section rhythm** — each section opens with an H2, body text immediately follows at the same scale; no decorative sub-headers before content begins
- **Decompression spacing** — the page does not end abruptly; `pb-32 lg:pb-44` gives the reader a soft landing before the footer
- **Visual fatigue reduction** — `text-gray-600` (not `text-gray-900`) for body text; `leading-[1.8]` for generous line height
- **Cognitive pacing** — section borders (`border-t`) act as visual chapter breaks that signal "this topic is complete"

---

### B. TOC EXPERIENCE

The Table of Contents is an editorial navigation system, not a utility widget.

| Property | Rule |
|----------|------|
| Font size | `text-[13.5px]` — readable without competing with content |
| Line height | `leading-[1.5]` — prevents cramping on multi-word entries |
| Vertical rhythm | `space-y-3` — entries have room to breathe |
| Active state | Left border rail `border-l-[1.5px] border-gray-700` + `text-gray-900 font-medium` |
| Inactive state | `text-gray-400` — clearly secondary |
| Hover | `hover:text-gray-600 transition-colors duration-200 ease-out` — restrained, no jump |
| Inactive border | `border-gray-100` — barely visible, maintains alignment |
| Mobile | Collapsible accordion above content — open by default on first load |
| Tracking | `IntersectionObserver` with `rootMargin: '-10% 0% -70% 0%'` — activates upper-viewport section |

The TOC never dominates. It is always clearly secondary to the content column.

---

### C. HEADER BEHAVIOR ON LEGAL PAGES

Legal pages **always render the stabilized (scrolled) header state** — from the very first pixel, regardless of scroll position.

| State | Standard pages | Legal pages |
|-------|---------------|-------------|
| At top of page | `bg-white/0 backdrop-blur-[2px] border-transparent h-[88px]` | `bg-white/96 backdrop-blur-md border-gray-100/80 h-[72px]` |
| Scrolled | `bg-white/96 backdrop-blur-md border-gray-100/80 h-[72px]` | same |

**Rationale:**
A transparent, shifting header creates visual noise during reading. Legal pages need a stable, anchored top bar — a consistent reference point while scrolling through long text. The solid header signals institutional stability and removes the distraction of a header changing state mid-read.

**Implementation:** `Header.tsx` detects legal paths via `usePathname()` and applies `showScrolled = scrolled || isLegalPage`.

*Cross-ref: Section 23 (CANONICAL HEADER SYSTEM)*

---

### D. MOBILE LEGAL UX

| Rule | Implementation |
|------|----------------|
| Spacing | Single-column layout with standard `container-base` horizontal padding |
| Bullet indentation | `pl-5` — clear indentation without excessive nesting |
| Paragraph rhythm | `mb-5` paragraph gaps maintained on all viewport sizes |
| Anchor offset | `scroll-mt-28` on all `LegalSection` — accounts for sticky header height |
| TOC behavior | Collapsible accordion (`mb-8`) above content on mobile |
| Safe area | Standard Next.js app shell handles safe-area-inset via `container-base` |
| Reading width | No artificial narrowing on mobile — full-width within container is appropriate at small sizes |
| H2 spacing | `mt-12 pt-6` — sections breathe even on narrow screens |

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

*Sekcja dodana: May 2026 | Legal Reading UX Rules — high-level doctrine for institutional reading experience.*

---

## SECTION 28 — CANONICAL CONSENT INFRASTRUCTURE SYSTEM

> **Status:** Production-ready | GDPR-grade | Architecture-complete | Canonical | Integration-ready
> **Cross-ref:** Section 21 (Interaction System) · Section 24 (Footer System) · Section 25 (Legal System) · Section 27 (Legal UX) · `docs/design-system/LEGAL_SYSTEM.md`

The Profitia Consent Infrastructure is not a cookie banner. It is a full **institutional trust layer** — a compliance architecture and user agency system that governs all data processing consent across the platform.

---

### A. PHILOSOPHY

**What the consent system is:**
- Institutional trust layer
- Legal + UX infrastructure
- Compliance architecture
- User agency system — the visitor is always in control

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
| Dark patterns | Consent must be freely given — manipulation invalidates it |
| Hidden reject action | Equal-weight actions are a legal and ethical requirement |
| Oversized accept CTA | Creates implied pressure — constitutes a dark pattern |
| Pre-enabled marketing cookies | Unlawful under GDPR Article 7 — consent must be opt-in |
| Fake urgency or emotional pressure | Consent must be informed, not coerced |
| Aggressive overlays | Must not obstruct the user's ability to reject |
| Deceptive toggle states | Toggle visual state must accurately reflect consent state |

---

### B. CORE ARCHITECTURE

The system is split into two layers: a pure logic layer (`lib/consent/`) and a UI layer (`components/consent/`).

**`lib/consent/` — Logic Foundation**

| File | Role |
|------|------|
| `types.ts` | Canonical type definitions: `ConsentRecord`, `ConsentCategories`, `ConsentCategory`, `ConsentStatus`, `ConsentContextValue` |
| `categories.ts` | Category registry — `CONSENT_CATEGORIES` array with PL/EN copy inline, extensible without redesign |
| `storage.ts` | Persistence layer — cookie (primary) + localStorage (sync), all reads/writes guarded, version-aware |

**`components/consent/` — UI Layer**

| Component | Type | Role |
|-----------|------|------|
| `ConsentProvider` | Client | Global context: state machine, actions, mounts Banner + Modal |
| `ConsentBanner` | Client | Initial consent panel — first visit experience |
| `ConsentModal` | Client | Full preferences management interface |
| `ConsentToggle` | Client | Accessible ARIA toggle switch per category |
| `ConsentGate` | Client | Integration gate — conditional rendering based on consent |
| `index.ts` | — | Barrel export — all consuming code imports from `@/components/consent` |

**Architectural properties:**
- **Typed end-to-end** — `ConsentRecord`, `ConsentCategories`, `ConsentCategory` are strict TypeScript types used throughout
- **SSR-safe** — all storage reads deferred to `useEffect`; server never touches consent state
- **Hydration-safe** — `isLoaded` flag prevents Banner/Modal rendering until client hydration completes; no mismatch possible
- **Provider-based** — `ConsentProvider` wraps the app tree; all children access context via hooks
- **Category-driven** — the category registry is the single source of truth for all copy, behavior, and gate logic

---

### C. CONSENT CATEGORY SYSTEM

Four canonical categories. Defined in `lib/consent/categories.ts`.

| Category | Required | Default | Purpose |
|----------|----------|---------|---------|
| `necessary` | Yes — immutable | Always `true` | Session, security, language, GDPR consent itself |
| `analytics` | No | `false` (opt-in) | Aggregated, anonymized site usage data |
| `marketing` | No | `false` (opt-in) | Advertising attribution, pixel-based tracking |
| `functional` | No | `false` (opt-in) | Embedded content, CRM forms, chat integrations |

**`necessary` is immutable.** The toggle is visually locked, keyboard-disabled (`disabled` attribute), and labeled "Always active". The category cannot be set to `false` — the provider enforces `necessary: true` on every `saveCustom()` call regardless of input.

**Extensibility:** New categories (e.g. `personalization`, `video`) can be added to `CONSENT_CATEGORIES` in `categories.ts` and the `ConsentCategories` interface in `types.ts`. The Provider, Modal, and Gate all consume the registry — no component-level changes required.

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
  version: string       // '1.0' — schema version
  createdAt: string     // ISO 8601 — first consent. Never updated.
  updatedAt: string     // ISO 8601 — last re-customization
  locale: string        // 'pl' | 'en' — locale at time of decision
  status: ConsentStatus // 'pending' | 'accepted_all' | 'rejected_all' | 'customized'
  categories: ConsentCategories
}
```

**Version-aware invalidation:** If the stored record's `version` field does not match `CONSENT_VERSION` constant in `storage.ts`, the record is treated as `null` — the visitor sees the banner again. This mechanism allows re-consent collection after policy changes without manual cookie clearing.

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
- Renders `null` until client hydration is complete (`isLoaded = false`) — no tracking fires on SSR or before consent check
- Renders `fallback` (default: `null`) if the category is not consented
- Renders `children` only when the category is consented

**Usage pattern — future integrations:**

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
| Accept all | Filled button — `bg-[#1C1C1E]` (canonical CTA) |
| Customize settings | Outlined button — `border border-gray-200` |
| Reject non-essential | Text-only button — `text-gray-400` |

No action is hidden. No action requires more steps than another. The reject path is one click — identical to accept.

#### Banner doctrine

| Property | Rule |
|----------|------|
| Position | Fixed bottom panel — does not block reading or navigation |
| Entrance | Slide-up + opacity fade, 300ms, `ease-out` |
| Width | Full-width within `container-base` constraints |
| Mobile | Stacked layout, safe-area inset respected |
| Content | Eyebrow + heading + body + privacy link + 3 actions |
| Blocking | Never blocks the page — visitor can read and scroll freely |
| Persistence | Remains until an explicit decision is made |

#### Modal doctrine

| Property | Rule |
|----------|------|
| Layout — mobile | Full-width bottom sheet, rounded top corners |
| Layout — desktop | Centered, `max-w-lg`, `max-h-[80vh]`, internal scroll |
| Backdrop | `bg-black/20 backdrop-blur-[2px]` — subtle, not aggressive |
| Close | Escape key, backdrop click, cancel button, ×  button |
| Body scroll | Locked while modal is open |
| Tone | Editorial, legal-grade — not SaaS preferences UI |
| Required category | Visually distinct lock state — labeled "Always active" |
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

### H. FOOTER INTEGRATION — REOPEN MECHANISM

The consent preferences are always accessible via the Footer legal bar.

**Canonical trigger:** Text button labeled "Ustawienia prywatności" (PL) / "Privacy settings" (EN)

**Placement:** Footer legal bar — right side, same row as copyright notice

**Behavior:**
- Calls `openModal()` from `useConsent()` — opens the full preferences modal
- Always available — no page-type restriction
- Persistent across all routes

**Forbidden reopen patterns:**
- Floating privacy bubble (chat-like position)
- Fixed bottom-right privacy icon
- Sticky privacy widget
- Separate `/privacy-settings` page route

The legal bar already contains the copyright notice. The privacy settings trigger sits alongside it — quiet, persistent, and institutional.

*Cross-ref: Section 24 (CANONICAL FOOTER SYSTEM)*

---

### I. MOBILE CONSENT UX

| Rule | Implementation |
|------|----------------|
| Banner layout | Single-column stacked (text above, actions below) |
| Banner safe-area | `pb-[env(safe-area-inset-bottom)]` — accounts for iOS home indicator |
| Modal type | Bottom sheet — slides up from bottom, rounded top corners |
| Modal height | `max-h-[90vh]` on mobile — category list scrolls internally |
| Modal safe-area | `pb-[env(safe-area-inset-bottom)]` inside modal footer |
| Toggle size | `h-6 w-11` toggle, `h-5 w-5` thumb — within comfortable touch range |
| Category items | `py-5` per item — generous tap area and reading room |
| Content width | Full container width — no artificial narrowing on small screens |
| Backdrop | Tappable to close — consistent with mobile UX conventions |

---

### J. FORBIDDEN PATTERNS

| Pattern | Category | Reason |
|---------|----------|--------|
| Third-party CMP widget (Cookiebot, OneTrust, etc.) | Architecture | Breaks visual consistency; external aesthetic; data sharing |
| Neon or brand-accent consent UI | Visual | Incompatible with editorial aesthetic |
| Cyber / SaaS-dashboard aesthetic | Visual | Wrong tone for institutional trust context |
| Oversized overlay blocking the page | UX | Creates pressure; may constitute a dark pattern |
| Forced consent (no visible reject) | Legal | Unlawful under GDPR — consent must be freely refusable |
| Accept-only prominent flow | Legal | Equal-weight actions are required |
| Pre-enabled marketing or analytics | Legal | Opt-in required — default must be `false` |
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

*Sekcja dodana: May 2026 | Canonical Consent Infrastructure System — source of truth dla GDPR-grade consent layer Profitia.*

---

## SECTION 29 — CANONICAL EDITORIAL INTELLIGENCE PUBLICATION SYSTEM

> **Cross-ref:** Section 7 (Card System) · Section 8 (Button System) · Section 21 (Interaction System) · Section 23 (Header System) · `prisma/schema.prisma`

This section defines the **editorial architecture** governing all publication surfaces on profitia.pl. The blog is positioned as a Procurement Intelligence publication — not a marketing blog. Every design and content decision follows from this positioning.

---

### A. PUBLICATION PHILOSOPHY

**Positioning:** Procurement Intelligence — not a marketing blog, not a company news feed.

**Editorial promise:** "Wiedza zakupowa. Bez szumu. Tylko substancja."

**Authority model:** Each article builds institutional credibility by being:
- Written by named, credentialed authors with roles
- Anchored in a specific procurement domain (category)
- Structured for professional readers who scan, then read deeply
- Cross-linked to related analyses (relatedSlugs)

**7 canonical categories:**
| Category key | Label |
|---|---|
| `negotiations` | Negocjacje |
| `procurement-strategy` | Strategia zakupów |
| `cost-intelligence` | Analiza kosztów |
| `supplier-risk` | Ryzyko dostawcy |
| `supply-chain` | Łańcuch dostaw |
| `market-analysis` | Analiza rynku |
| `spend-management` | Spend management |

---

### B. DATA MODEL — Article (Prisma)

All editorial fields are nullable — safe to add to existing articles without migration pain.

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
authorName   String?           // denormalized — no join needed
authorRole   String?           // e.g. "Senior Client Partner | Procurement Technology"
authorBio    String? @db.Text  // shown in ArticleAuthor block
relatedSlugs String[] @default([])  // slugs to display in ArticleRelated
```

**Schema applied:** `npx prisma db push` run against Neon production DB (May 2026).

---

### C. COMPONENT LIBRARY — `components/blog/`

All components are in `components/blog/`. Barrel export via `components/blog/index.ts`.

#### Index page components
| Component | Type | Purpose |
|---|---|---|
| `PublicationHero` | Server | Masthead — title + tagline. No image. |
| `FeaturedArticle` | Server | Full-width hero card for `featured=true` article |
| `ArticleCard` | Server | Grid card for non-featured articles |
| `BlogNewsletter` | **Client** | Email capture form (`onSubmit` handler) |
| `CategoryBadge` | Server | Pill label for category display |
| `ReadingProgress` | **Client** | Scroll-based reading progress bar (top of viewport) |

#### Article page components
| Component | Type | Purpose |
|---|---|---|
| `ArticleHero` | Server | Title + subtitle + meta (category, date, reading time) |
| `ArticleLayout` | **Client** | TOC sidebar + prose column. IntersectionObserver for active section. |
| `ArticleAuthor` | Server | Author card: name, role, bio, avatar initial |
| `ArticleNewsletter` | **Client** | In-article email capture (`onSubmit` handler) |
| `ArticleRelated` | Server | Related articles grid from `relatedSlugs` |

#### Editorial block components
| Component | Type | Purpose |
|---|---|---|
| `PullQuote` | Server | Large-format callout quote — breaks prose rhythm |
| `InsightBlock` | Server | Highlighted analytical insight box |

**Critical rule:** Any component with event handlers MUST have `'use client'` as first line. Without it, Next.js 15 App Router throws a 500 at runtime (not build time).

---

### D. ROUTES

| Route | File | Notes |
|---|---|---|
| `/blog` | `app/(public)/blog/page.tsx` | PL publication index |
| `/blog/[slug]` | `app/(public)/blog/[slug]/page.tsx` | PL article page |
| `/en/blog` | `app/(public)/en/blog/page.tsx` | EN publication index |
| `/en/blog/[slug]` | `app/(public)/en/blog/[slug]/page.tsx` | EN article page |

All blog pages use `export const dynamic = 'force-dynamic'` — required for Prisma DB queries at runtime.

---

### E. ARTICLE LAYOUT SYSTEM

The article page uses a **two-column editorial layout**:

```
┌─────────────────────────────────────┬────────────────────┐
│  PROSE COLUMN (max-w ~680px)        │  TOC SIDEBAR       │
│                                     │  (sticky, lg+)     │
│  ArticleHero                        │                    │
│  [H2] Section heading               │  ● Section heading │  ← active highlight
│  [p] Body text                      │  ○ Another section │
│  [PullQuote]                        │  ○ Third section   │
│  [InsightBlock]                     │                    │
│  [H2] Another section               │                    │
│                                     │                    │
│  ArticleAuthor                      │                    │
│  ArticleNewsletter                  │                    │
│  ArticleRelated                     │                    │
└─────────────────────────────────────┴────────────────────┘
```

**TOC extraction:** `ArticleLayout` parses `content` HTML at runtime, extracts all `<h2>` tags, builds TOC items with generated IDs. Active section tracked via `IntersectionObserver`.

**Prose rendering:** `ArticleLayout` uses Tailwind arbitrary variants — NO `@tailwindcss/typography` plugin. All prose styles are explicit:
```
[&>p]:text-[17px] [&>p]:leading-[1.8] [&>p]:text-gray-700
[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-900
[&>h3]:text-xl [&>h3]:font-semibold ...
```

---

### F. CONTENT MIGRATION — EDITORIAL ADAPTATION STANDARD

**RULE: No copy-paste migration.** Every article migrated from the old blog must undergo full editorial adaptation:

1. **Structure rewrite** — flat text → H2/H3 hierarchy
2. **Pull quotes extracted** — 1-2 per article, placed at narrative peak moments
3. **Insight blocks added** — key analytical conclusions surfaced visually
4. **Author profile completed** — name, role, bio
5. **Category assigned** — from the 7 canonical keys
6. **relatedSlugs cross-linked** — minimum 2 articles linked to each other
7. **Cover image assigned** — Unsplash URL, editorially appropriate (not stock-business)
8. **Reading time set** — manual estimation at 200 wpm

**Seed script:** `scripts/seed-articles.ts` — `npx tsx scripts/seed-articles.ts`. Uses `prisma.article.upsert` — idempotent, safe to re-run.

---

### G. ARTICLES MIGRATED (May 2026)

| Slug | Category | Featured | Author | Reading |
|---|---|---|---|---|
| `cena-to-opinia-koszt-to-fakt` | cost-intelligence | true | Tomasz Uściński | 9 min |
| `dzien-z-zycia-kupca-kiedy-stala-cena-przegrywa-z-faktami` | cost-intelligence | false | Tomasz Uściński | 11 min |
| `analiza-finansowa-dostawcow` | supplier-risk | false | Rafał Gilatowski | 7 min |

**FeaturedArticle slot:** `cena-to-opinia-koszt-to-fakt` — "Cena to opinia. Koszt to fakt." renders as the full-width hero on `/blog`.

---

### H. UTILITY LAYER — `lib/content/`

| File | Exports |
|---|---|
| `lib/content/types.ts` | `ArticlePreviewData`, `ArticleDetailData`, `ArticleTOCItem`, category type |
| `lib/content/utils.ts` | `estimateReadingTime`, `getCategoryLabel`, `getAllCategories`, `formatPublishDate`, `formatReadingTime` |

---

### I. SYSTEM LOCK RULES

1. **NO `@tailwindcss/typography`** — ever. All prose via arbitrary Tailwind variants in `ArticleLayout`.
2. **All editorial DB fields nullable** — new fields MUST be nullable to preserve backward compatibility with legacy articles.
3. **Cover images: Unsplash only** — domain whitelisted in `next.config.mjs`. No other image domains for editorial content.
4. **`'use client'` on all interactive components** — `BlogNewsletter`, `ArticleNewsletter`, `ArticleLayout`, `ReadingProgress`. Build succeeds without it, runtime fails.
5. **`force-dynamic` on all blog pages** — required for server-side DB queries. Remove only if moving to ISR with explicit revalidation.
6. **Featured slot = exactly one article** — `featured: true` on exactly one article at any time. If none: empty state renders. If multiple: first returned by `orderBy` wins.
7. **Seed script is the migration record** — `scripts/seed-articles.ts` is the authoritative source for all migrated content. Keep updated when adding articles.

---

*Sekcja dodana: May 2026 | Editorial Intelligence Publication System — canonical architecture for Procurement Intelligence publication layer.*

