# UI INCONSISTENCIES - Profitia Frontend Audit
> **Status:** Living document | Version 2.0 | May 2026
> **Last audited:** 7 May 2026 (Sprint 3)
> **Scope:** All files under `app/`, `components/`, `styles/`
> **Reference:** `docs/design-system/VISUAL_CONTEXT_PROFITIA.md`

---

## HOW TO READ THIS DOCUMENT

Each entry has:
- **File** - exact path
- **Line(s)** - approximate line reference
- **Problem** - what violates the design system
- **Fix** - exact action required
- **Priority** - P1 (critical) → P4 (low/future)
- **Status** - open / in-progress / resolved

---

## PRIORITY 1 - CRITICAL (blocks visual consistency)

### ✅ C-01 - tailwind.config.ts: placeholder brand colors
- **File:** `tailwind.config.ts`
- **Lines:** 12-18
- **Problem:** `brand.primary: #1a365d` was a non-brandbook placeholder. `brand.secondary: #2b6cb0` same. `brand.accent: #ed8936` (orange) had no brand basis.
- **Fix:** Updated to full brandbook palette (`#242F44`, `#006D9E`, `#0092D9`, `#48103F`, `#8E0055`). Legacy aliases now point to correct values.
- **Status:** ✅ Resolved (May 2026 sprint)

---

### ✅ C-02 - globals.css: h1-h6 forced to Poppins (`font-heading`)
- **File:** `styles/globals.css`
- **Lines:** 14-16
- **Problem:** `h1, h2, h3, h4, h5, h6 { @apply font-heading }` applied Poppins to all headings globally. Profitia uses Inter-only.
- **Fix:** Changed to `@apply font-sans font-semibold tracking-tight`. `font-heading` config now outputs Inter (shim).
- **Status:** ✅ Resolved (May 2026 sprint)

---

### ✅ C-03 - globals.css: btn-primary / btn-secondary using wrong tokens
- **File:** `styles/globals.css`
- **Lines:** 22-32
- **Problem:** `.btn-primary` used `bg-brand-primary` (navy #1a365d), `rounded-lg` (not `rounded-xl`), `px-6 py-3` (not premium sizing). `.btn-secondary` used `border-2 border-brand-primary`, `hover:bg-brand-light`.
- **Fix:** Completely rewritten. `.btn-primary` → `bg-black rounded-xl px-6 py-3.5`. `.btn-secondary` → `border border-gray-300 rounded-xl`. Added `.btn-primary-dark`, `.btn-secondary-dark`, `.btn-brand`.
- **Status:** ✅ Resolved (May 2026 sprint)

---

### ✅ C-04 - Header.tsx: text-based logo (no SVG)
- **File:** `components/layout/Header.tsx`
- **Lines:** 25-27
- **Problem:** Logo was `<Link>Profitia</Link>` with `font-heading font-bold text-brand-primary`. No SVG asset, Poppins, wrong color.
- **Fix:** Replaced with `<Image src="/logo/profitia-default.svg" width={120} height={32} />`.
- **Status:** ✅ Resolved (May 2026 sprint)

---

### ✅ C-05 - Footer.tsx: wrong background + text colors
- **File:** `components/layout/Footer.tsx`
- **Lines:** 14, 20, 38, 53
- **Problem:** `bg-brand-primary` (was #1a365d, wrong navy). `text-blue-200` for all body/nav text (Tailwind blue, not brand neutral). `border-blue-800` divider. `font-heading font-bold` logo text.
- **Fix:** `style={{ backgroundColor: '#242F44' }}`, text → `text-gray-400`, divider → `border-white/10`, SVG logo via `<Image>`.
- **Status:** ✅ Resolved (May 2026 sprint)

---

### ✅ C-06 - app/[lang]/page.tsx: hero uses bg-brand-primary (corporate)
- **File:** `app/[lang]/page.tsx`
- **Lines:** 21-31
- **Problem:** Hero was `bg-brand-primary text-white` - navy corporate feel. `font-heading font-bold` on H1. `text-blue-200` subtitle. Service cards: `hover:shadow-md` only (no dark hover).
- **Fix:** Hero → `bg-white`, H1 → Inter semibold, subtitle → `text-gray-600`, CTAs → `btn-primary` / `btn-secondary`. Service cards → `PremiumCard` component with `hover:bg-gray-900`.
- **Status:** ✅ Resolved (May 2026 sprint)

---

### ✅ C-07 - Logo files not accessible to Next.js Image
- **File:** `Logotypy/` (root, not public)
- **Problem:** SVG logo files were in `Logotypy/` - outside `public/` directory, inaccessible to browser.
- **Fix:** Copied to `public/logo/profitia-default.svg`, `public/logo/profitia-white.svg`, `public/logo/profitia-black.svg`.
- **Status:** ✅ Resolved (May 2026 sprint)

---

## PRIORITY 2 - IMPORTANT (visible inconsistency)

### 🔴 I-01 - contact/page.tsx: form inputs wrong radius + focus ring
- **File:** `app/[lang]/contact/page.tsx`
- **Lines:** 35, 44, 53
- **Problem:** `rounded-lg` (not `rounded-xl`). `focus:ring-brand-primary` (was wrong color).
- **Fix:** Updated to `rounded-xl`, `focus:ring-gray-900`. *(Partially resolved in May 2026 sprint)*
- **Status:** ✅ Resolved (May 2026 sprint)

---

### 🔴 I-02 - about/page.tsx + services/page.tsx: `font-heading font-bold text-brand-primary`
- **File:** `app/[lang]/about/page.tsx`, `app/[lang]/services/page.tsx`
- **Lines:** 17, 17
- **Problem:** H1 used `font-heading font-bold text-brand-primary` - Poppins + wrong color + too heavy weight.
- **Fix:** Updated to Inter semibold, gray-900, label tag above H1. *(Resolved in May 2026 sprint)*
- **Status:** ✅ Resolved (May 2026 sprint)

---

### 🔴 I-03 - RevealWrapper duplicated in two locations
- **File:** `components/services/subpage-services-1/RevealWrapper.tsx` (original)
- **Created:** `components/ui/RevealWrapper.tsx` (canonical)
- **Problem:** Same component exists twice. Service subpage components import from `./RevealWrapper` (local), not from `@/components/ui`.
- **Fix:** Future refactor - update imports in 8 service subpage components to use `@/components/ui/RevealWrapper`.
- **Priority:** P2
- **Status:** 🔴 Open - canonical exists, imports not updated

---

### 🔴 I-04 - service subpage CtaSection vs global CTASection
- **File:** `components/services/subpage-services-1/CtaSection.tsx`
- **Created:** `components/ui/CTASection.tsx` (canonical global)
- **Problem:** Two CTA implementations. Page-specific one is correct visually but isolated.
- **Fix:** Update `subpage-services-1/page.tsx` to import from `@/components/ui/CTASection`.
- **Priority:** P2
- **Status:** 🔴 Open - global component exists, subpage not migrated

---

### 🟡 I-05 - admin/layout.tsx: brand-secondary hover on nav
- **File:** `app/admin/layout.tsx`
- **Lines:** 21, 24
- **Problem:** `hover:bg-brand-secondary` (was wrong blue). `text-blue-200` footer link.
- **Fix:** Updated to `hover:bg-white/10`, `text-gray-400`. *(Resolved in May 2026 sprint)*
- **Status:** ✅ Resolved (May 2026 sprint)

---

## PRIORITY 3 - MEDIUM (polish / debt)

### 🟡 M-01 - blog pages: no design
- **Files:** `app/[lang]/blog/page.tsx`, `app/[lang]/blog/[slug]/page.tsx`
- **Problem:** Blog pages have zero visual design - placeholder only.
- **Fix:** Design editorial blog layout using design system (article list, article detail).
- **Priority:** P3
- **Status:** 🔴 Open - future sprint

---

### 🟡 M-02 - contact form: no real submission handler
- **File:** `app/api/contact/route.ts`, `app/[lang]/contact/page.tsx`
- **Problem:** Form submits to nowhere (no fetch/server action). API route exists but form doesn't call it.
- **Fix:** Wire up form → `/api/contact` endpoint → Office365 Graph API (existing setup in `Integracja z Office365/`).
- **Priority:** P3
- **Status:** 🔴 Open

---

### 🟡 M-03 - Header: no mobile nav (hamburger menu missing)
- **File:** `components/layout/Header.tsx`
- **Lines:** 23-32
- **Problem:** Nav is `hidden md:flex` - mobile users see logo + lang switcher + CTA button only. No mobile menu.
- **Fix:** Add hamburger button + slide-down mobile nav panel.
- **Priority:** P3
- **Status:** 🔴 Open

---

### 🟡 M-04 - services/page.tsx: placeholder only
- **File:** `app/[lang]/services/page.tsx`
- **Problem:** Placeholder text, no actual services content or cards.
- **Fix:** Build full services overview page with `PremiumCard` grid, hero, CTA.
- **Priority:** P3
- **Status:** 🔴 Open

---

### 🟡 M-05 - about/page.tsx: placeholder only
- **File:** `app/[lang]/about/page.tsx`
- **Problem:** Placeholder text, no content.
- **Fix:** Build full About page - team, mission, values, editorial layout.
- **Priority:** P3
- **Status:** 🔴 Open

---

### 🟡 M-06 - service subpage components: local RevealWrapper imports
- **Files:** All 8 files in `components/services/subpage-services-1/`
- **Problem:** Import `./RevealWrapper` (local) instead of `@/components/ui/RevealWrapper` (canonical).
- **Fix:** Update import in each file. Then deprecate local copy.
- **Priority:** P3
- **Status:** 🔴 Open

---

### 🟡 M-07 - service subpage CtaSection not using global CTASection
- **File:** `components/services/subpage-services-1/CtaSection.tsx`, `app/[lang]/services/subpage-services-1/page.tsx`
- **Problem:** Page-specific CTA component duplicates global one.
- **Fix:** Replace import with `@/components/ui/CTASection`.
- **Priority:** P3
- **Status:** 🔴 Open

---

## PRIORITY 4 - LOW / FUTURE

### ⚪ L-01 - tailwind.config.ts: `font-heading` shim to Inter
- **File:** `tailwind.config.ts`
- **Lines:** 43
- **Problem:** `font-heading` key still exists (outputs Inter). Leaves door open for accidental Poppins assumption.
- **Fix:** Remove `font-heading` key entirely once all `font-heading` usages are confirmed gone from codebase.
- **Status:** ⚪ Open - after full audit of all font-heading usage

---

### ⚪ L-02 - globals.css: `.btn-primary` still uses `bg-black` (opinionated)
- **File:** `styles/globals.css`
- **Problem:** Global `.btn-primary` is `bg-black`. On dark sections, this is wrong (needs `bg-white`). Requires per-context override.
- **Fix:** Consider CSS custom properties or Tailwind `data-*` variants. Or use `Button` component always.
- **Status:** ⚪ Open - long-term architecture

---

### ⚪ L-03 - No `og:image` or structured metadata
- **Files:** `app/layout.tsx`, all page files
- **Problem:** No OpenGraph images defined. `generateMetadata` only sets `title`.
- **Fix:** Add `og:image`, `og:description`, `twitter:card` to page metadata.
- **Status:** ⚪ Open

---

### ⚪ L-04 - `app/admin/*` pages: no real data
- **Files:** `app/admin/dashboard/page.tsx`, `app/admin/articles/page.tsx`
- **Problem:** Admin UI is placeholder. Connected to Prisma/DB but no real articles flow.
- **Fix:** Implement full CRUD article management with Prisma.
- **Status:** ⚪ Open

---

### ⚪ L-05 - ChatWidget: visual alignment check
- **File:** `components/ChatWidget.tsx`
- **Problem:** Widget was added in earlier sprint - visual tokens not audited against new design system.
- **Fix:** Audit ChatWidget button/panel colors against brandbook.
- **Status:** ⚪ Open - low urgency

---

## SUMMARY TABLE

| ID | Description | Priority | Status |
|----|-------------|----------|--------|
| C-01 | tailwind.config.ts placeholder colors | P1 | ✅ Resolved |
| C-02 | globals.css font-heading on all headings | P1 | ✅ Resolved |
| C-03 | globals.css btn-primary/secondary wrong tokens | P1 | ✅ Resolved |
| C-04 | Header text logo (no SVG) | P1 | ✅ Resolved |
| C-05 | Footer wrong bg + text colors | P1 | ✅ Resolved |
| C-06 | Homepage corporate navy hero | P1 | ✅ Resolved |
| C-07 | Logo files outside public/ | P1 | ✅ Resolved |
| I-01 | Contact form wrong radius + focus ring | P2 | ✅ Resolved |
| I-02 | about + services font-heading H1 | P2 | ✅ Resolved |
| I-03 | RevealWrapper duplicated | P2 | 🔴 Open |
| I-04 | CtaSection vs CTASection duplication | P2 | 🔴 Open |
| I-05 | admin hover:bg-brand-secondary | P2 | ✅ Resolved |
| M-01 | Blog pages no design | P3 | 🔴 Open |
| M-02 | Contact form no submission handler | P3 | 🔴 Open |
| M-03 | Header no mobile nav | P3 | 🔴 Open |
| M-04 | services/page.tsx placeholder | P3 | 🔴 Open |
| M-05 | about/page.tsx placeholder | P3 | 🔴 Open |
| M-06 | Subpage components local RevealWrapper | P3 | 🔴 Open |
| M-07 | Subpage CtaSection not using global | P3 | 🔴 Open |
| L-01 | font-heading shim cleanup | P4 | ⚪ Open |
| L-02 | btn-primary on dark sections | P4 | ⚪ Open |
| L-03 | No og:image metadata | P4 | ⚪ Open |
| L-04 | Admin pages placeholder | P4 | ⚪ Open |
| L-05 | ChatWidget visual audit | P4 | ⚪ Open |

**Sprint May 2026 resolved:** 9/22 issues (all P1 + I-01, I-02, I-05)
**Sprint 2 May 2026 resolved:** Composition system created (not issue-resolution - architecture build)
**Sprint 3 May 2026 resolved:** Architecture Alignment - global app shell consolidation (see below)

---

## SPRINT 3 - ARCHITECTURE ALIGNMENT (7 May 2026)

Goal: stitch the entire app into one coherent system. Not redesign - consolidation.

### ✅ S3-01 - Locale routing flattened
- **What:** Removed `/pl/` and `/en/` URL prefixes. Renamed `app/[lang]/` → `app/(public)/` route group.
- **URLs before:** `/pl/contact`, `/pl/services`, `/en/about` etc.
- **URLs now:** `/contact`, `/services`, `/about`, `/blog`, `/`
- **middleware.ts:** Simplified - no locale detection/redirect. Exports nothing.
- **lib/i18n.ts:** Now owns `Locale` type (was imported from `@/middleware` everywhere - now fixed).
- **types/index.ts:** Updated to import `Locale` from `@/lib/i18n`.
- **All `app/(public)/` pages:** Removed `lang` params, `getDictionary` calls, hardcoded Polish content.

### ✅ S3-02 - Header unified (static hrefs + mobile nav added)
- **File:** `components/layout/Header.tsx`
- **Changes:**
  - Removed `lang: Locale` and `dict: Dictionary` props - component is now standalone
  - `NAV_LINKS` array: static hrefs (`/`, `/services`, `/about`, `/blog`, `/contact`)
  - Added `usePathname()` for active link highlighting
  - Added responsive hamburger menu with mobile nav panel (previously `hidden md:flex`, no mobile nav at all)
  - Mobile panel: slide-in via conditional render, closes on link click, ARIA attributes
  - `'use client'` directive added (needed for useState/usePathname)

### ✅ S3-03 - Footer unified (static hrefs)
- **File:** `components/layout/Footer.tsx`
- **Changes:**
  - Removed `lang: Locale` and `dict: Dictionary` props
  - Static hrefs, hardcoded Polish content
  - Contact info added: biuro@profitia.pl, +48 787 417 293
  - Background `#242F44` preserved, spacing improved (py-16, gap-12)

### ✅ S3-04 - Shell wrapper system created
- **Path:** `components/shell/index.tsx`
- **Exports:** `PageWrapper`, `SectionWrapper`, `DarkSectionWrapper`, `ContentWrapper`, `CTAWrapper`, `HeroWrapper`
- **Purpose:** Canonical layout primitives enforcing consistent spacing, container widths, tonal rhythm
- **Tonal rhythm documented:** `white → gray-50 → white → gray-900 → black CTA → navy footer`

### ✅ S3-05 - Service subpage lang cleanup
- **Files:** `components/services/subpage-services-1/HeroSection.tsx`, `RelatedServicesSection.tsx`, `app/(public)/services/subpage-services-1/page.tsx`
- **Changes:** Removed `lang: Locale` prop from HeroSection + RelatedServicesSection. Breadcrumb hrefs now static (`/`, `/services`). All `/pl/contact` and `/pl/services` hrefs fixed to `/contact`, `/services`.

### ✅ S3-06 - Blog legacy CSS classes fixed
- **Files:** `app/(public)/blog/page.tsx`, `app/(public)/blog/[slug]/page.tsx`
- **What:** Removed Sprint 1 leftovers: `font-heading`, `font-bold`, `text-brand-primary`. Now using `font-semibold tracking-tight text-gray-900` per design system. Date locale hardcoded to `'pl-PL'`.

### ✅ S3-07 - EditorialPlaceholder component
- **File:** `components/ui/EditorialPlaceholder.tsx`
- **Exported from:** `components/ui/index.ts`
- **Props:** `aspect` (16/9, 4/3, 3/2, 1/1, square, portrait), `label`, `size`, `tone` (subtle/deep/warm)
- **Design:** Gradient base + subtle grid texture + corner ratio mark. Intentionally premium - not a gray box.

---

## SPRINT 2 - COMPOSITION SYSTEM (6 May 2026)

Sprint 2 was architectural, not issue-resolution. Created the full modular composition framework.

### ✅ S2-01 - Section Library created
- **Path:** `components/sections/`
- **What:** 17 canonical section components across 4 categories (hero, features, proof, content, cta)
- **Sections:**
  - `hero/HeroEditorial`, `hero/HeroSplit`, `hero/HeroMinimal`
  - `features/FeatureGrid`, `features/FeatureSplit`, `features/FeatureStats`, `features/FeatureEditorial`
  - `proof/LogoCloud`, `proof/StatsStrip`, `proof/TestimonialSection`, `proof/QuoteHighlight`
  - `content/ContentSplit`, `content/EditorialContent`, `content/ComparisonGrid`
  - `cta/CTADark`, `cta/CTAMinimal`, `cta/CTAInline`
- **Import:** `import { HeroEditorial, FeatureGrid, CTADark } from '@/components/sections'`
- **Status:** ✅ Resolved

---

### ✅ S2-02 - Page Template System created
- **Path:** `components/templates/`
- **What:** 6 typed composition templates for all page types
  - `ServicePageTemplate` - 8-section service page composition
  - `AboutPageTemplate` - mission + values + stats + CTA
  - `ContactPageTemplate` - form slot + contact info + logo cloud
  - `InsightArticleTemplate` - editorial blog/insight article
  - `CaseStudyTemplate` - structured proof narrative
  - `LandingPageTemplate` - conversion-optimized campaign page
- **Import:** `import { ServicePageTemplate } from '@/components/templates'`
- **Status:** ✅ Resolved

---

### ✅ S2-03 - Spacing Token System created
- **Path:** `styles/tokens/spacing.ts`
- **What:** Canonical spacing constants (section, gap, width, stack, card, grid, bg)
- **Import:** `import { section, gap, width } from '@/styles/tokens/spacing'`
- **Status:** ✅ Resolved

---

### ✅ S2-04 - Motion Token System created
- **Path:** `styles/tokens/motion.ts`
- **What:** Canonical motion constants (reveal, hover, transition, delay, easing)
- **Import:** `import { hover, transition, delay } from '@/styles/tokens/motion'`
- **Status:** ✅ Resolved

---

### ✅ S2-05 - Image Art Direction created
- **Path:** `docs/design-system/IMAGE_ART_DIRECTION.md`
- **What:** Complete image style guide (photography direction, crop rules, overlay, saturation, mockup rules, sourcing, technical specs, litmus test)
- **Status:** ✅ Resolved

---

### ✅ S2-06 - Service Page System created
- **Path:** `components/templates/services/`
- **What:** 8 modular service page components
  - `ServiceHero`, `ServiceOverview`, `ServiceFeatures`, `ServiceStats`
  - `ServiceProcess`, `ServiceProof`, `RelatedServices`, `ServiceCTA`
- **Import:** `import { ServiceHero, ServiceCTA } from '@/components/templates/services'`
- **Canonical order:** Hero → Overview → Features → Stats → Process → Proof → Related → CTA
- **Status:** ✅ Resolved

---

## FUTURE REFACTOR ROADMAP

### Sprint 2 ✅ - Composition System Architecture (completed 6 May 2026)
1. ✅ Section Library - 17 sections in `components/sections/`
2. ✅ Page Templates - 6 templates in `components/templates/`
3. ✅ Spacing Token System - `styles/tokens/spacing.ts`
4. ✅ Motion Token System - `styles/tokens/motion.ts`
5. ✅ Image Art Direction - `docs/design-system/IMAGE_ART_DIRECTION.md`
6. ✅ Service Page System - 8 components in `components/templates/services/`

### Sprint 3 ✅ - Architecture Alignment (completed 7 May 2026)
1. ✅ Locale routing flattened - `app/[lang]/` → `app/(public)/`, clean `/services`, `/about` etc. URLs
2. ✅ Header unified - static hrefs, mobile hamburger nav added
3. ✅ Footer unified - static hrefs, real contact info
4. ✅ Shell wrapper system - `PageWrapper`, `SectionWrapper`, `DarkSectionWrapper`, `ContentWrapper`, `HeroWrapper`
5. ✅ Service subpage lang cleanup - `HeroSection` + `RelatedServicesSection` props cleaned
6. ✅ Blog legacy CSS fixed - `font-heading`, `text-brand-primary` removed
7. ✅ `EditorialPlaceholder` component - premium cinematic placeholder in `components/ui/`
8. ✅ TypeScript: 0 errors after cleanup

### Sprint 4 - First Real Pages Using the System (P3 items)
**Goal:** Build actual content pages using Section Library + Templates.
No custom layouts - only system composition.

1. **Services overview page** (`app/[lang]/services/page.tsx`)
   - Use `LandingPageTemplate` or compose from `HeroEditorial + FeatureGrid + CTADark`
   - Data: all services as `PremiumCard` items with links to subpages

2. **About page** (`app/[lang]/about/page.tsx`)
   - Use `AboutPageTemplate` with real content
   - Mission statement, values grid, team section

3. **Blog list + article** (`app/[lang]/blog/`)
   - Blog list: `HeroMinimal` + article cards grid
   - Article detail: `InsightArticleTemplate` with real content

4. **Contact form wired** (`app/[lang]/contact/page.tsx`)
   - Use `ContactPageTemplate` with real form
   - Wire form → `/api/contact` → Office365 Graph API

5. **Mobile header nav** (`components/layout/Header.tsx`)
   - Hamburger + slide-down panel
   - Uses design system colors only (`bg-white`, `text-gray-900`, `border-gray-100`)

6. **Migrate subpage components** (I-03, I-06)
   - Update 8 files in `components/services/subpage-services-1/` to import `RevealWrapper` from `@/components/ui`
   - Replace local `CtaSection` with `@/components/ui/CTASection`

### Sprint 4 - Polish & Production
1. OpenGraph / Twitter metadata for all pages (`og:image`, `og:description`)
2. Admin CRUD articles flow (Prisma)
3. `font-heading` final cleanup from `tailwind.config.ts`
4. Performance audit (LCP, CLS, INP)
5. Accessibility audit (WCAG 2.1 AA)
---

*Update this document after every sprint. Mark items resolved immediately, don't batch.*
*Reference: `docs/design-system/VISUAL_CONTEXT_PROFITIA.md`*
