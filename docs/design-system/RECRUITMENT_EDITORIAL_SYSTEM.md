# SECTION 35 - RECRUITMENT EDITORIAL SYSTEM

> **Status:** Source of Truth | Version 1.0 | May 2026
> **Scope:** Career listing, job detail pages, application form, consent architecture, document upload, submission UX - all recruitment-facing surfaces.
> **Obowiązuje od:** ETAP 7.5 (May 2026) - confirmed canonical after ETAP 7.6.

---

## SECTION 1 - PLATFORM POSITIONING

### What this layer is not

The recruitment layer is not employer branding.

Employer branding exists to make a company desirable to a broad population of passive candidates. It uses emotion, narrative energy, identity aspiration and lifestyle imagery to widen the top of a hiring funnel. That is not what Profitia's career layer does.

The recruitment layer is not startup hiring UX.

Startup hiring pages communicate velocity, informality, and cultural fit. They use phrases like "we move fast", "own your work", "no bureaucracy". They foreground perks, team photos, and office culture. The implicit message is: working here will feel like something. That is not the institutional signal Profitia transmits.

The recruitment layer is not emotional recruiting.

Emotional recruiting uses excitement as a substitution for precision. It tells candidates how they will feel, rather than explaining what they will do and what the work requires. It asks the reader to want the company, rather than the company evaluating whether the reader qualifies.

### What this layer is

The recruitment layer is **institutional filtering through editorial authority**.

Its function is to present a serious, structured, precise description of a role - and allow a qualified professional to determine whether they are the appropriate candidate. It does not persuade. It informs.

The layer operates through:

**Institutional filtering** - the editorial voice selects by professional standard. Candidates who find the format too formal, too demanding, or too quiet are not the intended audience. Self-selection is a feature, not a problem.

**Professional positioning** - the narrative defines role expectations, operating environment, and decision-making scope with specificity. A qualified candidate reads a role description and recognises the work.

**Document-centric submission** - the application process mirrors the standard of a professional submission: CV, relevant data, required consent. Nothing supplementary. Nothing performative.

**Executive-caliber communication** - the language operates at the register of procurement consulting. Not aspirational. Not casual. Precise, weighted, institutional.

### Application as institutional submission

The application is not an onboarding step. It is not the beginning of a relationship.

It is a formal submission of candidature.

This distinction governs every design decision in the application layer. The form is narrow, document-oriented, procedurally paced. The success state is a receipt acknowledgement, not a welcome message. The upload component looks like a file attachment row, not a drag-and-drop marketing widget.

The candidate is a professional submitting a document.
The system is an institution receiving one.

---

## SECTION 2 - CAREER PAGE PHILOSOPHY

### Continuation of the capability layer

The career page does not stand apart from the platform. It is an editorial continuation of the capability pages.

The capability system establishes Profitia as a procurement intelligence institution. Its content demonstrates analytical depth, domain expertise, and strategic seriousness. A reader who has moved through the capabilities section arrives at the career page with a formed understanding of the intellectual standard of the firm.

The career page must honour that standard.

What the career page communicates through editorial:

**Strategic exposure** - candidates will work on procurement transformation engagements, spend analytics, category strategies, and negotiation programs for complex clients. This exposure must be communicated without dilution.

**Analytical rigor** - the work requires structured thinking, model-building, data interpretation, and evidence-based recommendation. Not general analytical "mindset". Actual analytical practice.

**Procurement complexity** - the domain is specialist. Procurement is not an entry-level function at Profitia. The career page should make the intellectual demands of the domain clear.

**Ownership** - roles carry genuine decision-making weight. The page communicates this by describing real scope, not aspirational scope.

**Client-facing work** - candidates will represent Profitia in executive environments. The editorial register of the career page is the reader's first encounter with that professional standard.

**Real business decisions** - the work influences commercial outcomes: negotiation results, cost positions, sourcing strategies, vendor relationships. The career page states this plainly.

### Explicitly prohibited

The following phrases and communication patterns are forbidden on all career pages, job descriptions, and application-adjacent copy:

| Prohibited | Reason |
|-----------|--------|
| "young dynamic team" | Age-coded enthusiasm. Signals cultural informality. |
| "fast-growing" | Startup velocity framing. Contextually untrue for consulting. |
| "startup energy" | Contradicts institutional positioning. |
| "work hard play hard" | Lifestyle recruiting. Not appropriate register. |
| "great vibes" / "amazing culture" | Emotion substituting for precision. |
| Perks-first communication | Leading with benefits before defining the work. |
| Generic office descriptions | Open space, coffee, ping-pong - irrelevant to the audience. |
| Enthusiasm injections | "Exciting opportunity", "incredible team", "passionate". |
| Vague impact language | "Make a difference", "change the world", "create impact". |
| Social proof headshots | Team photos, culture collages - belongs to employer branding. |

### What replaces these patterns

A precise description of the operating environment, the decisions the role owns, the clients and engagements it touches, and the professional standard it requires.

The reader should leave the career page knowing:
- what the work actually is,
- what the working environment actually looks like,
- whether they have the competencies this role requires.

They should not leave feeling inspired. They should leave informed.

---

## SECTION 3 - EDITORIAL RHYTHM

### Inherited from the capability layer

Career pages inherit the full editorial rhythm of the capability system:

**Institutional silence** - generous whitespace is the primary tool of authority. The gaps between sections are not empty. They are pacing. They allow the preceding section to settle before the next is encountered.

**Chapter cadence** - each section of a career page is a chapter. It has a clear topic, a clear start, a clear end. Sections do not merge. Section boundaries are marked by structural borders (`border-b border-gray-100`) and deliberate spacing (`pt-20 pb-16`).

**Low contrast hierarchy** - the typographic hierarchy is quiet. There is no urgency in size. Eyebrows are `text-[9px]` to `text-[11px]`, uppercase, `tracking-[0.2em]` to `tracking-[0.28em]`. Headings are `text-xl` to `text-4xl`. The platform does not shout.

**Document rhythm** - sections read like chapters of an institutional document. The two-column layout (label column + content column) reinforces the feeling of a structured report, not a scrollable marketing page.

**Metadata labels** - eyebrows are compass labels, not section titles. They locate the reader in the document. They are not calls to action.

**Airy spacing** - `leading-[1.75]` to `leading-[1.85]` on body text. `space-y-8` between form fields. `pt-16 pb-14` between chapters. The reader is never rushed.

**Restrained CTA behavior** - the application CTA appears once, at the end of the role detail page. It does not appear mid-page. It does not appear in sidebars. It does not follow the reader while scrolling. It waits.

### Why career pages should feel like institutional documents

The reference aesthetic for career pages is:

- an executive briefing prepared before a major procurement decision,
- a consulting project proposal reviewed by a Procurement Director,
- an institutional report from an advisory firm.

It is emphatically not:

- an HR portal (no tracking tables, no progress bars, no approval states),
- a startup recruiting page (no emoji, no exclamation marks, no "Hey!"),
- a dashboard system (no sidebar navigation, no card grids, no status chips).

This distinction is not stylistic preference. It is positioning.

A professional evaluating a Profitia role reads the career page and forms an immediate impression of the intellectual register of the organisation. The editorial system is the interview before the interview. If the career page communicates with the register of an HR portal, the candidate correctly concludes the organisation operates at that level.

---

## SECTION 4 - ROLE DETAIL PAGE STRUCTURE

### Canonical narrative progression

Every job detail page follows this exact seven-chapter structure:

| Chapter | Section | Editorial function |
|---------|---------|-------------------|
| 1 | Role context | Where this role operates. The business environment, the client exposure, the decision scope. |
| 2 | Scope of work | What the person will actually do. Action-oriented. Specific items. Not aspirational duties. |
| 3 | Requirements | What competencies are required. Honest about the bar. Not a wish list. Not a checklist. |
| 4 | Candidate profile | What kind of professional succeeds in this role. Characteristics, not qualifications. |
| 5 | Working model | Practical working arrangement. Objective and non-evasive. |
| 6 | Development path | How the role develops over time. What the person gains through doing the work well. |
| 7 | Application CTA | One invitation. One action. End of document. |

This structure is canonical. It does not vary by role, seniority, or department.

### Emotional density progression

The seven chapters are not uniform in density. They follow a deliberate arc:

**Chapters 1-3 (compressed)** - the institutional voice is at its most structured. Role context is precise. Scope items are concise. Requirements are honest, direct, and specific. Line heights are standard. The reader moves through this material efficiently.

**Chapter 4 (transitional)** - the candidate profile introduces more interpretive language. Less list-like. More descriptive of professional character. The rhythm opens slightly.

**Chapter 5 (factual)** - working model returns to objective register. It states facts. One paragraph. No elaboration.

**Chapter 6 (most open)** - development path is the most generous chapter in rhythm. `leading-[1.85]`. Paragraph prose rather than list. The reader has earned this section by reading through the requirements. It rewards attention without becoming promotional.

**Chapter 7 (closing, quiet)** - the CTA is not a climax. It is a measured invitation. `pt-20 pb-16`. One sentence of invitation. One button. The page ends without acceleration.

### The invitation sentence

The CTA section opens with one sentence before the action label. This sentence is an institutional invitation, not a marketing call-to-action.

Correct: *"Jeżeli ta rola odpowiada temu, czego szukasz - prześlij aplikację."*

Incorrect: *"Ready to join a high-performing team? Apply now and start your journey!"*

The sentence acknowledges that the reader has already evaluated the role. It does not need to persuade them at the final step.

---

## SECTION 5 - APPLICATION FORM PHILOSOPHY

### What the form is

The application form is a document submission interface.

It is calm. It is narrow (`max-w-[42rem]`). It is vertically paced (`space-y-8`). It is document-oriented. Every visual decision reinforces the institutional register of the submission.

The form reflects the kind of interaction a professional has with a government filing system, a bank document portal, or a professional registration form. Not because these are exciting references - but because they are appropriate ones.

### What the form is not

The form is not conversational. There are no tooltips saying "Tell us a bit about yourself". There are no inline animations rewarding the user for filling a field correctly. There is no micro-copy congratulating the user for uploading their CV.

The form is not gamified. There are no points, no progress achievements, no badges for completing sections.

The form is not onboarding-driven. It does not simulate a friendly guide walking the user through a process. The user is a professional submitting an application. They do not need to be guided. They need a clean submission interface.

### Why the system intentionally avoids modern form UX patterns

**Progress bars** - progress bars exist to prevent abandonment in multi-step forms. The application form is intentionally a single page. Abandonment by an unsuitable candidate is acceptable. A progress bar signals that the system is optimising for completion, which contradicts institutional filtering.

**Multistep flows** - multistep flows are appropriate for onboarding, checkout, or wizard-style configuration. They are not appropriate for a professional document submission. A professional does not need to be walked through the concept of attaching a PDF.

**Animated uploads** - upload animations (spinning icons, growing progress bars, confetti on completion) belong to consumer product UX. They inject emotion into an administrative action.

**Colorful states** - success states in green, error states in red with backgrounds, warning states in yellow - these belong to form libraries optimised for consumer products. The application system uses `text-red-600` for error text and a quiet vertical bar for success. Nothing more.

**Celebration language** - "You're all set!", "Amazing, your application is in!", "We're so excited to hear from you!" - these phrases misrepresent the nature of the submission. The application has been received. It has not been accepted. The success state communicates receipt, not approval.

---

## SECTION 6 - ROLE SELECTION MODEL

### One shared form

Profitia operates one application form for all open roles.

There is no separate form per job. There is no embedded application form on detail pages. There is no modal-triggered application flow.

The single-form model is canonical.

```
/career/apply          - PL application form
/en/career/apply       - EN application form
```

### Role selection mechanics

The role field is:

- a required dropdown (not a radio group, not a card selector),
- automatically pre-selected when arriving from a job detail page (`?role=[slug]`),
- user-adjustable - the candidate can change the selection before submitting,
- dynamically populated from `JOB_POSTS` - no hardcoded options.

The URL parameter that carries the pre-selection value is `ROLE_PARAM = 'role'`, defined in `lib/careers/application/constants.ts`.

The dropdown uses `useSearchParams()` to read the initial value. This requires a `Suspense` boundary on the page component - a Next.js 15 architectural requirement, not optional.

### Why the single-form model is correct

**Architectural simplicity** - one route, one form component, one validation schema, one submission handler. When a new role is added to `lib/careers/data.ts`, it appears in the dropdown automatically. No new form pages. No new routes. No new components.

**Institutional consistency** - the application experience is identical regardless of role. A candidate applying for a junior analyst role and a candidate applying for a senior consultant role submit through the same form. This communicates that the application process is a professional standard, not a per-role workflow.

**Scalable future hiring logic** - when a backend submission handler is introduced, it handles all roles through a single endpoint (`POST /api/career/apply`). The `roleSlug` field in the `CareerApplication` type routes the submission to the appropriate review queue. No multi-endpoint architecture. No role-specific API routes.

**Navigation semantics** - the role detail page CTA says "Prześlij CV" / "Submit your CV". It navigates to `/career/apply?role=[slug]`. This is a navigation action, not an in-page action. The detail page describes the role; the apply page receives the submission. These are different concerns on different routes.

---

## SECTION 7 - DOCUMENT UPLOAD UX

### Upload doctrine

The CV upload component must feel procedural, quiet, and administrative.

It is a file attachment. The user selects a PDF. The interface acknowledges the selection by showing the filename and file size. The user can remove the selection. That is the complete interaction.

### The canonical upload component

The upload renders as a small bordered row:

```
┌─────────────────────────────────────────────────────────────────┐
│  CV / Résumé                                                     │
│  ─────────────────────────────────────────────────────────────  │
│  PDF · max 10 MB                                    Wybierz plik │
└─────────────────────────────────────────────────────────────────┘
```

After selection:

```
┌─────────────────────────────────────────────────────────────────┐
│  CV / Résumé                                                     │
│  ─────────────────────────────────────────────────────────────  │
│  tomasz_uscinski_cv.pdf · 348 KB                           Usuń │
└─────────────────────────────────────────────────────────────────┘
```

Visual properties: `border border-gray-200 rounded-xl px-5 py-4`. Label: `text-[11px] tracking-[0.18em] uppercase text-gray-500`. File name: `text-[13px] text-gray-700`. Remove link: `text-[12px] text-gray-400 hover:text-gray-600`.

The hidden `<input type="file">` is triggered by a labelled underline link ("Wybierz plik" / "Choose file"). No visible file input element.

### Explicitly not the upload component

**A drag-and-drop zone.** Drag-and-drop zones are appropriate for file management, asset upload in creative tools, and bulk document workflows. A single CV PDF does not require drag-and-drop affordance.

**A highlighted upload area.** Large dashed-border boxes with cloud icons and "Drop your file here" copy belong to file hosting product UX.

**A playful upload interaction.** Animated document-falling-into-folder, progress bar for a 400KB file, upload spinner - these add visual noise to an administrative action.

**An onboarding experience.** Upload is one field in a professional form. It should behave accordingly.

### Validation constraints

| Property | Value |
|----------|-------|
| `CV_ALLOWED_TYPES` | `['application/pdf']` |
| `CV_ALLOWED_EXTENSIONS` | `.pdf` |
| `CV_MAX_BYTES` | `10 * 1024 * 1024` (10 MB) |

Validation is performed on the client before submission. The `cv` field is validated separately from the Zod schema (file objects cannot be Zod-validated in browser environments) via the `validateApplication()` function in `lib/careers/application/validation.ts`.

---

## SECTION 8 - CONSENT ARCHITECTURE

### Two-consent system

The application form contains exactly two consent checkboxes:

**Consent 1 - Required.** Processing of personal data for the purposes of the current recruitment process. Without this consent, the application cannot be submitted. This is the minimum legal basis for processing the data in the first place.

**Consent 2 - Optional.** Processing of personal data for the purposes of future recruitment processes at Profitia. This consent is opt-in. It allows Profitia to retain candidate data and consider the candidate for future openings. It must be explicitly unchecked or left unchecked - it is never pre-checked.

### Why they must never be merged

Merging the two consents into a single checkbox is legally imprecise and architecturally wrong.

The two consents serve different legal purposes, have different scopes, and carry different data retention implications:

| Property | Consent 1 | Consent 2 |
|---------|-----------|-----------|
| Scope | Current process | Future processes |
| Required | Yes | No |
| Data retention | Until conclusion of current process | Extended, per data retention policy |
| Legal basis | Processing for stated specific purpose | Explicit opt-in for extended use |

A merged checkbox would either force the candidate to consent to future use as a condition of applying (legally problematic), or make future-use consent implicit in submitting an application (not valid consent under GDPR). Both are wrong.

Each consent is rendered as a separate `ApplicationConsent` instance. The component is never extended to accept multiple items.

### Institutional transparency as visual trust

The two-consent structure is visible to the candidate. The separation communicates:

- Profitia distinguishes between what it needs and what it prefers,
- the candidate has real control over the scope of data processing,
- the organisation operates with procedural precision.

This is not legalese buried in a privacy policy. It is front-facing architecture. The form's honesty about consent is part of the institutional signal.

---

## SECTION 9 - SUCCESS STATE PHILOSOPHY

### What the success state communicates

When the application is submitted, the form is replaced by a confirmation block.

The confirmation communicates:

- the application has been received,
- it will be reviewed,
- a response will follow.

Nothing more.

### Success state anatomy

```
│
│  (vertical bar - w-0.5 h-14 bg-gray-900)
│
REKRUTACJA                                    (eyebrow - text-[10px] tracking-[0.28em])

Dziękujemy za przesłanie aplikacji.           (heading - text-xl font-semibold)

Zapoznamy się ze zgłoszeniem                  (body - text-[15px] text-gray-500
i wrócimy z odpowiedzią.                       leading-[1.75])
```

The component carries `role="status" aria-live="polite"` - it announces the confirmation to assistive technology without interrupting reading flow.

### What the success state must not do

| Prohibited | Why |
|-----------|-----|
| "Świetnie!" / "Amazing!" | Emotional reinforcement of an administrative action |
| "Jesteśmy podekscytowani!" | Misrepresents the institutional register |
| "Twoja aplikacja jest w drodze!" | Marketing metaphor - inappropriate register |
| "Wkrótce się odezwiemy 🎉" | Emoji is categorically prohibited |
| "Dołączysz do naszego zespołu!" | Premature - application has not been evaluated |
| Animated confetti | Consumer product UX - wrong context |
| Countdown to response | Operational promise that cannot always be honoured |
| "Sprawdź pocztę!" | Unnecessary instruction - receipt acknowledgement suffices |

### Receipt acknowledgement vs. onboarding

The distinction is precise.

**Receipt acknowledgement** communicates: *we have your document. The process will now proceed on our side.*

**Onboarding** communicates: *welcome. You are now part of something. Here is what happens next.*

The application success state is receipt acknowledgement. The candidate has not been accepted. Nothing has begun except the review process. The success state must not communicate otherwise.

---

## SECTION 10 - VISUAL RESTRICTIONS

The following patterns are explicitly prohibited on all career and application surfaces.

| Pattern | Category | Why prohibited |
|---------|----------|---------------|
| Glassmorphism | Decoration | Startup/gaming aesthetic. No institutional grounding. |
| Gradients | Color | Violates monochromatic discipline. Contradicts editorial authority. |
| Onboarding UI | Pattern | Progress bars, tooltips, guided walkthroughs. Not appropriate for professional submission. |
| HR SaaS cards | Layout | Status chips, priority badges, applicant tracking widgets. Wrong layer. |
| Colorful states | Feedback | Green success banners, yellow warning boxes, blue info toasts. Use `text-red-600` only for errors. |
| Illustration-heavy recruiting | Content | Culture-team illustrations, abstract "we're hiring" artwork. |
| Oversized upload zones | Component | Large drag-and-drop areas with cloud icons and instructional copy. Use document row. |
| Gamified interactions | Interaction | Step completion animations, field validation celebrations, "You're doing great!" messages. |
| Startup copywriting | Copy | Exclamation marks, emoji, velocity language, perks-first framing. |
| Profile photo fields | Form | Not requested. Not evaluated. Not institutional. |
| Social login buttons | Auth | "Apply with LinkedIn" - bypasses document-centric submission model. |
| Video introduction requests | Form | Optional video message fields belong to startup/media UX. |
| Culture section embeds | Layout | Team photos, office tours, "Day in the life" content on application flow. |

---

## SECTION 11 - FUTURE EVOLUTION RULE

### The constraint

Every future addition to the recruitment layer must increase at least one of:

- institutional trust,
- procedural clarity,
- editorial calm,
- professional seriousness.

If a proposed feature does not demonstrably increase any of these, it does not belong in the system.

### The direction of allowed evolution

**Allowed directions:**

| Evolution | Justification |
|-----------|--------------|
| Backend submission handler + confirmation email | Procedural clarity - candidate receives formal receipt |
| Server-side CV validation | Procedural integrity |
| Admin review interface (internal, not public) | Operational function |
| Additional optional fields (e.g. availability date) | Reduces back-and-forth, maintains form discipline |
| Multi-language expansion | Extends institutional reach |
| Rate limiting + CSRF protection | Security hygiene |
| Error boundary + graceful failure state | Professional resilience |

**Prohibited directions:**

| Direction | Why prohibited |
|-----------|---------------|
| Multi-step form wizard | Increases delight, reduces institutional gravity |
| AI-powered form pre-fill | Onboarding dynamic - wrong register |
| "Similar roles" sidebar | Engagement optimisation - not filtering |
| Real-time feedback on CV quality | Consumer UX - inappropriate |
| Application tracking portal for candidates | HR SaaS feature set |
| Social sharing ("I just applied at Profitia!") | Marketing layer - not institutional |
| Video introduction field | Startup recruiting UX |
| Referral mechanics | Growth hacking - wrong domain |

### The test

Before introducing any feature, ask:

*Does this make the application process feel more like an institutional document submission, or more like a consumer product experience?*

If the answer is "consumer product" - do not build it.

---

## SECTION 12 - IMPLEMENTATION REFERENCE

### Architecture overview

```
lib/careers/
├── types.ts              - JobPost, CareerLocale, CareerLocalizedString, CareerMeta
├── data.ts               - JOB_POSTS: JobPost[] - bilingual, 2 roles (May 2026)
├── utils.ts              - getJobBySlug, getAllJobs, getAllJobSlugs, tCareer
└── index.ts              - barrel export

lib/careers/application/
├── types.ts              - CareerApplication (domain record), ApplicationFormValues,
│                           ApplicationFieldErrors
├── constants.ts          - CV_MAX_BYTES, CV_ALLOWED_TYPES, CV_ALLOWED_EXTENSIONS,
│                           ROLE_PARAM, FIELD_LIMITS
├── validation.ts         - applicationSchema (Zod), validateApplication(),
│                           hasApplicationErrors()
└── index.ts              - barrel export
```

```
components/careers/
├── CareerHero.tsx        - career listing hero - eyebrow + title + subtitle
├── CareerPhilosophy.tsx  - institutional positioning items - label + body pairs
├── CareerRoles.tsx       - role listing section - iterates JOB_POSTS
├── CareerRow.tsx         - single role row - NAV_LABEL: "Zobacz rolę" / "Explore role"
├── CareerExposure.tsx    - what candidates gain - 5 exposure items
├── CareerJobDetail.tsx   - job detail header - breadcrumb + dept + title + meta + lede
├── CareerJobPage.tsx     - full detail page assembly - 7 chapters + CTA
└── CareerCTA.tsx         - institutional application CTA - invitation + label + href

components/careers/apply/
├── ApplicationField.tsx     - controlled text/email/tel/url input
├── ApplicationTextarea.tsx  - multi-line input (no y-resize)
├── ApplicationSelect.tsx    - role dropdown - options from JOB_POSTS
├── ApplicationUpload.tsx    - document row upload - NOT drag-and-drop zone
├── ApplicationConsent.tsx   - single GDPR checkbox - never combined
├── ApplicationSuccess.tsx   - quiet institutional confirmation
├── ApplicationForm.tsx      - full form - useSearchParams → role preselect
└── index.ts                 - barrel export
```

```
app/(public)/career/
├── page.tsx              - career listing - PL
└── [slug]/page.tsx       - job detail - PL

app/(public)/career/apply/
└── page.tsx              - application form - PL (Suspense-wrapped)

app/(public)/en/career/
├── page.tsx              - career listing - EN
└── [slug]/page.tsx       - job detail - EN

app/(public)/en/career/apply/
└── page.tsx              - application form - EN (Suspense-wrapped)
```

### Component layer classification

| Component | Layer | Role |
|-----------|-------|------|
| `CareerHero` | Editorial layer | Page entry - institutional positioning |
| `CareerPhilosophy` | Editorial layer | Philosophy section - institutional voice |
| `CareerRoles` | Editorial layer | Role listing - navigational |
| `CareerRow` | Editorial layer | Role row - navigate to detail |
| `CareerExposure` | Editorial layer | Exposure items - professional development |
| `CareerJobDetail` | Editorial layer | Role header - chapter 0 of detail narrative |
| `CareerJobPage` | Editorial layer | Full detail page - chapters 1-7 |
| `CareerCTA` | Editorial → Application bridge | CTA linking to `/career/apply?role=` |
| `ApplicationField` | Application form system | Text input primitive |
| `ApplicationTextarea` | Application form system | Textarea primitive |
| `ApplicationSelect` | Application form system | Role selection primitive |
| `ApplicationUpload` | Application form system | Document upload row |
| `ApplicationConsent` | Application form system | GDPR consent primitive |
| `ApplicationSuccess` | Application form system | Receipt confirmation state |
| `ApplicationForm` | Application form system | Form orchestrator |

### Role addition protocol

When a new role is added to `lib/careers/data.ts`:

1. The role appears automatically in `CareerRoles` on the career listing page.
2. A new detail page is generated via dynamic `[slug]` route.
3. The role appears automatically in `ApplicationSelect` dropdown on the apply page.
4. No new routes, components, or form pages are required.

This is the intended scalability model of the single-form architecture.

### CTA link pattern

From job detail pages:

```tsx
href={`${locale === 'en' ? '/en' : ''}/career/apply?role=${job.slug}`}
```

From career listing page: `/contact` - the listing CTA is not role-specific. It routes to general contact.

---

*Last updated: May 2026 - following ETAP 7, ETAP 7.5, and ETAP 7.7.*
*This document is part of the Profitia Design System canon. It supersedes any informal inline notes about recruitment UX or career page editorial decisions.*

---

## TYPOGRAPHIC NEUTRALITY

### Standard separator

All recruitment and application surfaces use **space-hyphen-space** as the canonical sentence separator.

```
Correct:  "Zapoznamy sie ze zgloszeniem - i wrócimy z odpowiedzia."
Correct:  "Select a position and attach your CV - we respond after reviewing each submission."
Forbidden: any use of — or –
```

### Why this matters for institutional application UX

The application layer exists at the intersection of two institutional signals:
- the editorial authority of the platform,
- the procedural clarity of a formal submission interface.

Both signals are undermined by expressive typography. An em dash in a form label or success confirmation reads as a stylistic gesture - exactly what the institutional application model prohibits.

The hyphen is:
- calmer,
- more procedural,
- less typographically expressive,
- more operationally neutral.

This aligns with institutional silence, low-emotion communication, and the document-submission philosophy that governs this entire layer.

### Platform priorities

Typographic choices in recruitment surfaces must support:
- **Procedural clarity** - form labels, consent text, and confirmations read without stylistic friction,
- **Institutional neutrality** - the typography does not editorialise the submission experience,
- **Professional register** - separators carry structure, not emotion.

### Future rule - absolute

`—` (em dash) and `–` (en dash used as separators) are permanently prohibited across all recruitment and application surfaces, documentation, and copy.

**Default separator:** ` - ` (space-hyphen-space, always).

**Permitted exceptions** (technical contexts only): phone numbers, URL slugs, numeric ranges, code syntax.
