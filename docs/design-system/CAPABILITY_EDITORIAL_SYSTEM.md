# SECTION 34 — CANONICAL CAPABILITY EDITORIAL SYSTEM

> **Status:** Source of Truth | Version 1.0 | May 2026
> **Scope:** Services listing, Education listing, Capability detail pages, Related capabilities, CTA structure, Editorial breaks, Footer behavior on capability routes.
> **Obowiązuje od:** ETAP 6.6 (May 2026) — confirmed canonical after ETAP 6.8.1.

---

## PLATFORM PHILOSOPHY

The capability system is not a website section.

It is an **institutional procurement intelligence publication layer**.

It must read like:
- a strategic report published by a serious advisory institution,
- an executive briefing prepared for C-suite review,
- an operating philosophy publication — not a product catalogue,
- a knowledge platform built on earned authority.

**It must not read like:**
- a SaaS product landing page,
- a consulting agency brochure,
- a course catalogue,
- a lead generation funnel.

### The principle of institutional silence

Whitespace is not empty. It is the primary tool of hierarchy.

The absence of an element carries as much editorial weight as its presence. Every margin, every pause, every gap between sections is a deliberate statement about the authority of the content that follows.

When in doubt: add space. Remove contrast. Reduce density. The content earns attention. The design does not demand it.

---

## THE HIERARCHY SYSTEM

### Three editorial tiers (Services listing)

The listing pages use a three-tier section hierarchy — not a uniform grid.

#### Tier 1 — Dominant

One section per page. The primary anchor practice. Most commanding editorial presence.

- Left column: 400px
- Section heading: `text-3xl`
- Section padding: `pt-28 pb-16`
- Description: present, `text-[15px] text-gray-500`
- Gap: `lg:gap-24`

Currently: **Doradztwo i Transformacja** (Advisory & Transformation) — marked `dominant: true` in `categories.ts`.

A dominant section communicates: *this is the centre of gravity of our practice*.

#### Tier 2 — Featured

Two sections. Significant practice tracks, clearly present, secondary to dominant.

- Left column: 300px
- Section heading: `text-xl`
- Section padding: `pt-20 pb-10`
- Description: present, `text-sm text-gray-400`
- Gap: `lg:gap-16`

Currently: **Negocjacje i Cost Intelligence**, **Dane i Analityka**.

#### Tier 3 — Standard

One or more sections. Supporting practices. Quiet, matter-of-fact.

- Left column: 220px
- Section heading: `text-lg`
- Section padding: `pt-12 pb-4`
- Description: present, `text-sm text-gray-400`

Currently: **Rozwój Kompetencji** (Capability Development).

### Why Education has no dominant section

Education is structured differently — intentionally.

Services carries strategic pressure, hierarchy, executive authority. One practice leads. Others follow.

Education carries reflection, balance, institutional development. All tracks are peers. No track commands the page — they invite.

This distinction between **strategic pressure** (Services) and **institutional development** (Education) is architecturally significant. It must be preserved in all future evolution.

### First-row reading anchor

Within each section, the first capability row is slightly more present:
- Title: `font-semibold` (vs `font-medium` for subsequent rows)
- Spacing: `pt-6 pb-9` (additional bottom pause after the anchor)
- CTA: `text-gray-500` (vs `text-gray-400`)

This creates an optical entry point per section. The eye enters through the anchor, then scans. It prevents the spreadsheet feeling of perfectly identical rows.

---

## EDITORIAL RHYTHM

### Chapter cadence

The listing page and detail pages are structured as a series of chapters, not sections. Each chapter has a distinct weight and pacing. The reader experiences rhythm — a sequence of tension, structure, breath — not a sequence of identically designed blocks.

### Marginalia — editorial breaks

Between selected sections on listing pages, brief editorial statements appear. These are not separators. They are not designed quote blocks.

They are **marginal strategic annotations** — the kind of quiet observation that appears in the margin of a serious report.

Visual characteristics:
- `text-[11px] text-gray-200 leading-[1.9] max-w-[22rem]`
- Low contrast — annotation, not announcement
- Narrow column — marginalia, not centred separator
- High line-height within — reflective, not declarative

Editorial characteristics:
- Written as institutional observation, not as marketing copy
- Never begins with "We" or "Our"
- Never sells — only observes
- Appears once or twice per listing page, never at every section boundary

### Philosophy block (Education only)

A single institutional statement about learning philosophy appears between the hero and the first section on the Education listing page. It is wider than marginalia (`max-w-[44rem]`) and rendered at `text-[15px] text-gray-500`. It frames the academic intent of the page before the reader enters the programme listings.

### Reading anchors

Every section on both listing and detail pages has at least one optical anchor — a typographic element with slightly more presence than its surroundings. This gives the eye something to enter through. Without anchors, equal-weight elements produce scanning fatigue.

### Institutional silence between chapters

Chapter boundaries on detail pages are marked by whitespace alone — `border-t border-gray-100` and generous padding. No decorative separators. No accent lines. No visual noise.

The silence between chapters is the transition.

---

## DETAIL PAGE NARRATIVE

### Full document structure

```
1. Hero (CapabilityDetail)
   — Breadcrumb → eyebrow → large title → lede paragraph
   — pt-20 pb-16, lede text-[17px] text-gray-600 max-w-[44rem]

2. Thesis (CapabilityPage, conditional)
   — Expert institutional observation — one or two sentences
   — Not a slogan. Not a summary. An authoritative opening.
   — pt-16 pb-14 border-b border-gray-100
   — text-[16px] text-gray-600 max-w-[40rem]

3. Problem (CapabilityPage — "Where organisations get stuck")
   — Numbered. Compressed density. The weight of the problem.
   — Most tension in the document

4. Methodology (CapabilityMethodology — "How engagements work")
   — Numbered. Structured. Process accent line (border-gray-200).
   — Ordered clarity — the most structured section

5. Outcome (CapabilityOutcome — "What changes operationally")
   — Numbered. Airy. Forward-looking.
   — Most breathing in the document

6. Engagement (CapabilityEngagement — "Engagement format")
   — DL metadata grid. Quietest section.
   — Document close, not feature list.

7. Related capabilities (CapabilityRelated)
   — Editorial rows, not card grid
   — Reading continuation, not appendix

8. Institutional CTA (CapabilityCTA)
   — Invitation to conversation. Single sentence. Single link.

9. Footer
   — Institutional signature close
   — Newsletter suppressed on all capability pages
```

### Emotional density progression

The four body sections carry distinct emotional density. The reader feels a progression — tension, clarity, relief, quiet — not a sequence of identical templates.

| Section | Emotional density | Key characteristics |
|---------|------------------|---------------------|
| Problem | Compressed, weighted | `leading-[1.65]`, tighter spacing, eyebrow `text-gray-400` |
| Methodology | Structured, ordered | `border-gray-200` accent, `space-y-8`, `leading-[1.75]` |
| Outcome | Airy, forward-looking | `leading-[1.85]`, `space-y-8`, heading at lower contrast |
| Engagement | Quietest, metadata | Labels `text-gray-200`, body `text-gray-600` |

This progression is not decorative. It mirrors how a thoughtful executive reads: enters through the problem, traces the solution logic, arrives at outcomes, closes with format. Each section feels like the one that belongs after the previous.

### The thesis layer

Each capability has an institutional thesis — one or two sentences that open the body of the detail page. These are stored in `lib/capabilities/thesis.ts` and rendered between the hero lede and the Problem section.

**What the thesis is:**
- An expert observation, not a sales claim
- Written in the tone of a research paper abstract
- A statement about the broader strategic context of the capability
- Bilingual (PL + EN)

**What the thesis is not:**
- A marketing tagline
- A capability summary
- A repetition of the lede paragraph
- A promise of results

---

## CTA SEMANTICS

### The fundamental distinction

Navigation CTA and conversion CTA must never share the same language.

**Navigation CTA** — appears on listing rows and related capability rows. The click leads to a detail page. The language must reflect exploration.

**Conversion CTA** — appears exclusively at the bottom of detail pages (`CapabilityCTA`). The click leads to contact. The language reflects intent.

### Official navigation label system

| Capability type | PL | EN |
|----------------|----|----|
| `service` | `Zobacz usługę →` | `Explore service →` |
| `education` | `Zobacz program →` | `Explore programme →` |

These labels are derived from `capability.type` — not from `ctaLabel` — in `CapabilityCard` and `CapabilityRelated`. This makes the semantic distinction structural, not textual. Future capabilities inherit correct navigation language automatically.

The `ctaLabel` field in `data.ts` is preserved and used exclusively by `CapabilityCTA` at the bottom of detail pages.

### Why this matters

Presenting "Umów rozmowę" as the CTA for a link that leads to a detail page creates a false expectation. The user prepares for a conversion step and arrives at an article. Institutional credibility is built on honest language. The navigation system must tell the truth about where it leads.

---

## RELATED CAPABILITIES

Related capability rows are **reading continuation**, not a "you might also like" UI block.

They appear at the end of the body, before the final CTA. They invite the reader to continue exploring adjacent expertise — not to convert, but to deepen understanding.

Visual system:
- Simple `border-b border-gray-100` rows — identical to listing page rows
- No rounded cards, no borders, no shadows
- Section label: `text-[9px] text-gray-300` — document metadata level
- Section title: `text-base font-medium text-gray-800` — present but not commanding
- Per-row spacing: `py-6`
- CTA per row: `text-gray-500` — readable, secondary

Cross-type safety: the URL prefix (`/services/` vs `/education/`) is derived from `cap.type`, not from the host page's prefix. A service detail page can correctly link to education capabilities.

Maximum three related capabilities per page.

---

## FOOTER BEHAVIOR

On capability pages (both listing and detail), the newsletter section is suppressed.

Reason: detail pages close with an institutional CTA invitation — a single, considered statement inviting conversation. Stacking a newsletter section after this creates redundant endings and dilutes the institutional close.

On capability pages, the footer operates as:
- Institutional signature (not utility navigation)
- Larger vertical rhythm: `py-20` for the main grid
- Column labels at `text-gray-500` — readable as section headers, not as design decoration

The footer should feel like the final page of a strategic report — present, dignified, quiet.

---

## VISUAL RESTRICTIONS

The following are explicitly prohibited in the capability system:

| Category | Prohibited |
|----------|-----------|
| Layout | Card grids as primary listing UI |
| Layout | Carousel or tabbed navigation for capabilities |
| Visual | Shadows, drop-shadows, box-shadows |
| Visual | Gradients of any kind |
| Visual | Animated counters, progress bars, SVG animations |
| Visual | Coloured badges, pills, labels |
| Visual | Dashboard-style metric displays |
| Typography | Aggressive contrast transitions between sections |
| Typography | Marketing-style headline copy in section labels |
| CTA | Multiple CTAs per listing row |
| CTA | Conversion language on navigation links |
| CTA | Sticky CTA bars or floating buttons |

The system achieves authority through restraint. Adding visual weight reduces institutional credibility.

---

## DO NOT BREAK

These principles must survive all future redesigns, refactors and migrations.

### 1. The listing must remain editorial, not commercial

Capability listings are not a product catalogue. They are an inventory of expertise. They must read as such. The moment a listing page feels like a SaaS pricing page or an agency portfolio, institutional trust is broken.

### 2. The three-tier hierarchy must be preserved

One dominant section, selected featured sections, and supporting standard sections. This asymmetry creates hierarchy narrative. A grid of equal-weight sections produces no narrative — only a list.

### 3. Institutional silence must not be filled

Future designers will be tempted to fill whitespace. They must not. The space between sections is editorial breathing. It is not a slot for content.

### 4. CTA semantics must remain structurally separated

Navigation labels (listing rows) and conversion labels (final CTA) must never converge. This distinction is now structural — `NAV_LABEL` is derived from `capability.type`, `ctaLabel` is the conversion field. If this is ever collapsed, rebuild it structurally.

### 5. The emotional density progression must be maintained

The four detail page sections (Problem → Methodology → Outcome → Engagement) carry distinct emotional weights. If spacing and line-height are normalised for consistency, the progression is destroyed. Template uniformity is not the goal. Narrative rhythm is.

### 6. Services and Education must remain different in character

Services: strategic pressure, dominant hierarchy, executive authority.
Education: reflection, balance, academy rhythm, institutional development.

Do not apply dominant-tier hierarchy to Education. Do not soften Services to match Education's reflective pace.

### 7. Related capabilities must remain editorial rows, not cards

Card grids import SaaS visual language. Editorial rows maintain publication language. The moment related capabilities become a card grid, the page feels like a product recommendation engine. It must feel like a bibliography.

---

## FUTURE EVOLUTION RULE

Every future change to the capability system must satisfy this test:

> *Does this change increase the institutional editorial feel, or does it increase the designed UI feel?*

If the answer is "designed UI feel" — the change is wrong.

Acceptable evolution directions:
- More breathing, not less
- Quieter labels, not louder
- More asymmetry, not more uniformity
- Richer thesis content, not richer visual decoration
- Deeper editorial breaks, not more sections
- Stronger chapter rhythm, not more UI components

Unacceptable evolution directions:
- Any card-ification of listing rows
- Any addition of visual decorative elements (icons, illustrations, patterns)
- Any increase in colour usage
- Any animated transitions or scroll effects
- Any landing-page-style "why choose us" blocks
- Any increase in CTA density

---

## APPENDIX — REFERENCE CONCEPTS

These are conceptual references — not visual templates. They describe the quality of thinking that informs this system.

### Institutional report cadence

The best strategic documents do not announce themselves. They open quietly, establish authority through precision, and close without fanfare. The reader finishes knowing more than they started — not because they were sold to, but because the document respected their intelligence.

This is the reading experience the capability system aims to produce.

### Executive briefing economy

An executive briefing has no filler. Every sentence earns its space. Labels are structural, not decorative. Numbers are auxiliary, not dominant. The document's authority comes from what it contains, not from how it is designed.

The thesis layer, the problem section and the methodology steps should carry this quality. Each entry exists because it must.

### Research paper rhythm

Academic papers move through a predictable but satisfying rhythm: abstract → problem → method → findings → implications. The reader knows where they are in the document. The progression feels inevitable.

The capability detail page mirrors this rhythm. The reader is never surprised by what comes next — they are simply drawn forward.

### Procurement operating philosophy

The most effective procurement institutions publish their thinking. They do not sell their services — they demonstrate their expertise through the quality and depth of their published positions. Clients engage not because they were persuaded, but because they recognised expertise.

The capability system is the published voice of that expertise.

---

## IMPLEMENTATION REFERENCE

For technical implementation details, see the source components:

```
lib/capabilities/
  types.ts         — Core types including dominant?: boolean and Capability
  data.ts          — 22 capabilities (PL + EN) — ctaLabel for conversion only
  categories.ts    — SERVICE_SECTIONS, EDUCATION_SECTIONS (dominant/featured flags)
  thesis.ts        — CAPABILITY_THESIS: Record<string, { pl: string; en: string }>
  utils.ts         — getCapabilitiesForSection, getRelatedCapabilities
  index.ts         — All exports

components/capabilities/
  CapabilityHero.tsx        — variant: 'services' | 'education'
  CapabilityLayout.tsx      — listing layout: hero → philosophy → sections → CTA
  CapabilitySection.tsx     — three-tier: dominant / featured / standard
  CapabilityCard.tsx        — row: isFirst hierarchy, NAV_LABEL by type
  CapabilityPage.tsx        — detail: thesis → problem → ... → CTA
  CapabilityDetail.tsx      — hero block with lede
  CapabilityMethodology.tsx — numbered process steps
  CapabilityOutcome.tsx     — numbered outcomes, airy
  CapabilityEngagement.tsx  — metadata dl grid, quietest
  CapabilityRelated.tsx     — editorial rows, cross-type URL safe
  CapabilityCTA.tsx         — institutional invitation, conversion only
  CapabilityMeta.tsx        — eyebrow metadata

components/layout/
  Footer.tsx  — newsletter suppressed on all /services|education routes
```

---

*Last updated: May 2026 — following ETAP 6.6 through ETAP 6.8.1.*
*This document is part of the Profitia Design System canon. It supersedes any prior informal notes or inline component comments on capability editorial philosophy.*
