# LEGAL SYSTEM - PROFITIA DESIGN SYSTEM

> **Source of truth** for all legal, compliance and policy pages.  
> Implemented: May 2026. All legal pages must use this system.

---

## 1. PHILOSOPHY

Legal pages are institutional documents, not marketing landing pages. They must communicate:

- **Trustworthiness** - calm, authoritative, no marketing noise
- **Readability** - excellent long-form reading comfort on all devices
- **Institutional clarity** - premium consulting, legal publishing feel
- **Editorial rhythm** - spacious, hierarchical, never cramped

**Anti-patterns (forbidden):**
- WordPress-style cramped legal pages
- Dark SaaS policy page aesthetic
- Aggressive CTAs or conversion elements on legal pages
- Flashy animations or transitions
- Narrow single-column with large padding (ruins mobile reading)

---

## 2. ARCHITECTURE

### Component tree

```
LegalLayout              → page shell (server)
  LegalSidebar           → sticky/collapsible TOC (client)
    LegalTOC             → active-section list (client)
      LegalAnchorLink    → smooth-scroll anchor (client)
  [content column]
    LegalHero            → page hero: eyebrow + h1 + meta (server)
      LegalMeta          → metadata chips (server)
    LegalSection         → section wrapper + h2 + id anchor (server)
      LegalContent       → prose typography container (server)
```

### File locations

| Type | Path |
|------|------|
| Components | `components/legal/` |
| Style tokens | `styles/legal/` |
| PL pages | `app/(public)/privacy/`, `cookies/`, `terms/` |
| EN pages | `app/(public)/en/privacy/`, `en/cookies/`, `en/terms/` |

---

## 3. LAYOUT SYSTEM

### Desktop (≥ lg = 1024px)

```
┌────────────────────────────────────────────────────────────┐
│  container-base (max-w-7xl)                                 │
│  ┌──────────────┐  gap-16  ┌────────────────────────────┐  │
│  │ Sidebar 240px│          │ Content max-w-[65ch]       │  │
│  │ sticky top-28│          │                            │  │
│  └──────────────┘          └────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

- Grid: `lg:grid-cols-[240px_1fr] lg:gap-16`
- Sidebar: `sticky top-28 self-start`
- Content: `max-w-[65ch]` - optimal reading line length (~75 chars)

### Mobile (< lg)

- Single column: sidebar stacks above content (DOM order preserved)
- TOC: collapsible trigger (`bg-gray-50 rounded-lg`)
- Content: full width with `container-base` padding

### Page spacing

- Top padding: `pt-16 lg:pt-24`
- Bottom padding: `pb-24 lg:pb-32`

---

## 4. COMPONENT SPECIFICATIONS

### LegalLayout

**Props:** `toc: TOCItem[]`, `children: ReactNode`  
**Purpose:** Grid shell. Renders LegalSidebar + content column.  
**Server component.** Imports LegalSidebar (client boundary).

### LegalHero

**Props:** `eyebrow`, `title`, `intro?`, `meta?: {label, value}[]`  
**Purpose:** Page intro - restrained, no marketing energy.  
**Structure:**
- Eyebrow: `text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400`
- H1: `text-3xl md:text-[2.25rem] font-semibold tracking-tight text-gray-900 leading-[1.08]`
- Intro: `text-base text-gray-500 leading-[1.75] max-w-[60ch]`
- Meta chips: inline `label + value` pairs (last updated, version, jurisdiction)
- Bottom: `mb-12 pb-12 border-b border-gray-100`

### LegalSection

**Props:** `id: string`, `title: string`, `children: ReactNode`  
**Purpose:** Reusable section - provides anchor target + H2 heading.  
**Key classes:**
- `scroll-mt-28` - offset for sticky header on anchor navigation (~88px header)
- H2: `text-xl font-semibold ... mt-12 mb-4 pt-6 border-t border-gray-100`

### LegalContent

**Props:** `children: ReactNode`  
**Purpose:** Prose typography container. Manual Tailwind arbitrary-variant styles (no `@tailwindcss/typography` plugin).

**Supported elements:**

| Element | Style |
|---------|-------|
| `<p>` | `text-[15px] text-gray-600 leading-[1.8] mb-5` |
| `<ul>` | `list-disc pl-5 mb-5` |
| `<ol>` | `list-decimal pl-5 mb-5` |
| `<li>` | `text-[15px] text-gray-600 leading-[1.8] mb-1.5` |
| `<h3>` | `text-[15px] font-semibold text-gray-800 mt-7 mb-3` |
| `<strong>` | `font-semibold text-gray-800` |
| `<a>` | `text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors duration-200` |
| `<table>` | `w-full text-sm border-collapse mb-5` with styled `th` + `td` |
| `<blockquote>` | `border-l-2 border-gray-200 pl-4 text-[14px] text-gray-500 italic mb-5` |

### LegalTOC

**Props:** `items: TOCItem[]`  
**Client component** - requires `'use client'`.  
**Active section tracking:** IntersectionObserver with `rootMargin: '-10% 0% -70% 0%'`  
- Section becomes "active" when it occupies the upper ~30% of the viewport
- Active item: `text-gray-900 font-medium`
- Inactive item: `text-gray-400 hover:text-gray-700 transition-colors duration-200 ease-out`

### LegalSidebar

**Props:** `items: TOCItem[]`  
**Client component** - manages mobile open/close state.  
**Desktop:** `hidden lg:block sticky top-28` - always visible, eyebrow label + TOC list  
**Mobile:** toggle button → collapsible `bg-gray-50 rounded-lg` panel

### LegalAnchorLink

**Props:** `href: string`, `className?`, `children`  
**Client component** - smooth scroll with `scrollIntoView({ behavior: 'smooth' })` + `history.pushState` for URL hash update without navigation.

### LegalMeta

**Props:** `items: {label, value}[]`  
**Purpose:** Metadata chips - last updated, version, jurisdiction.  
**Rendered inside LegalHero.**

---

## 5. TYPOGRAPHY TOKENS

Reference: `styles/legal/typography.ts`

| Token | Class string | Usage |
|-------|-------------|-------|
| `h1` | `text-3xl md:text-[2.25rem] font-semibold tracking-tight text-gray-900 leading-[1.08]` | Page title |
| `h2` | `text-xl font-semibold tracking-tight text-gray-900` | Section heading |
| `h3` | `text-[15px] font-semibold text-gray-800` | Sub-section |
| `lead` | `text-base text-gray-500 leading-[1.75]` | Hero intro |
| `body` | `text-[15px] text-gray-600 leading-[1.8]` | Body paragraphs |
| `eyebrow` | `text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400` | Category label |
| `tocItem` | `text-[13px] text-gray-400 leading-snug` | TOC link |
| `tocActive` | `text-[13px] text-gray-900 font-medium leading-snug` | Active TOC link |

---

## 6. SPACING TOKENS

Reference: `styles/legal/spacing.ts`

| Token | Value | Usage |
|-------|-------|-------|
| `pageTop` | `pt-16 lg:pt-24` | Distance from header to hero |
| `pageBottom` | `pb-24 lg:pb-32` | Distance from last section to footer |
| `heroBottom` | `mb-12 pb-12 border-b border-gray-100` | Hero → first section divider |
| `sectionSpacing` | `scroll-mt-28` | Anchor offset (sticky header) |
| `sectionH2Top` | `mt-12 pt-6 border-t border-gray-100` | Section heading top rhythm |
| `contentWidth` | `max-w-[65ch]` | Optimal reading width |
| `sidebarTop` | `top-28` | Sticky sidebar offset |
| `sidebarWidth` | `240px` | Grid definition |

---

## 7. INTERACTION RULES

All legal page interactions follow the **Canonical Interaction System** (VISUAL_CONTEXT_PROFITIA.md §21).

| Element | Hover | Transition |
|---------|-------|------------|
| TOC links (inactive) | `text-gray-700` | `duration-200 ease-out` |
| TOC links (active) | no hover change (already active) | - |
| Body links | `text-gray-600` | `duration-200` |
| Mobile TOC trigger | `bg-gray-100` | `duration-200 ease-out` |

**Forbidden on legal pages:**
- Scale transforms
- Opacity jumps
- Slide/fade animations on content
- Bright color hover states
- Any animation on text while reading (causes fatigue)

---

## 8. ACCESSIBILITY

- `<nav aria-label="Spis treści">` on TOC
- `aria-expanded` on mobile collapse trigger
- `aria-controls` referencing collapsible panel id
- Proper heading hierarchy: `h1` (hero) → `h2` (sections) → `h3` (sub-sections)
- Sufficient contrast: body text `text-gray-600` (#4B5563) on white → ratio ≈ 7:1 ✅
- `scroll-mt-28` ensures anchored sections are not hidden under sticky header
- `<a>` links inside LegalContent retain native keyboard focus behavior

---

## 9. SEO

Each legal page must include:
- `export const metadata: Metadata = { title: '...' }` at page level
- `alternates.canonical` pointing to the canonical URL
- `alternates.languages` with both PL and EN URLs (hreflang)

---

## 10. PAGE INVENTORY

| Route (PL) | Route (EN) | Status |
|------------|-----------|--------|
| `/privacy` | `/en/privacy` | ✅ Implemented May 2026 |
| `/cookies` | `/en/cookies` | ✅ Implemented May 2026 |
| `/terms` | `/en/terms` | ✅ Implemented May 2026 |

---

## 11. LOCK RULES

**LOCKED - requires explicit authorization to change:**
- Two-column layout (sidebar + content)
- `max-w-[65ch]` content width
- `scroll-mt-28` section anchor offset
- TOC active tracking via IntersectionObserver
- Typography scale (body `text-[15px] leading-[1.8]`)
- Sidebar sticky offset `top-28`

**CONDITIONALLY CHANGEABLE (with justification):**
- Sidebar width (currently 240px) - adjust for language/content needs
- Gap between sidebar and content (`lg:gap-16`)
- Page vertical rhythm (`pt-16 lg:pt-24`) - if global shell changes

**FORBIDDEN:**
- Marketing CTAs on legal pages
- Hero images on legal pages
- Dark backgrounds
- Animations on content while reading
- Inline `mailto:` / `tel:` for personal contact data (use `ProtectedEmail` / `ProtectedPhone` from `components/security/`)
- Adding legal pages outside `app/(public)/` route group

*Cross-ref: §21 Canonical Interaction System | §22 Contact Data Exposure Standard*

---

*Document created: May 2026 | Legal System Foundation - source of truth for all legal and compliance pages.*
