# IMAGE ART DIRECTION
## profitia.pl - Visual Photography & Imagery System

> **Source of truth:** This document defines all image selection, treatment, and composition rules for profitia.pl.
> Read alongside `VISUAL_CONTEXT_PROFITIA.md` - image decisions must reinforce the same editorial, premium, strategic aesthetic.

---

## 1. VISUAL IDENTITY FOR IMAGERY

### The feeling images must convey:
- **Strategic** - intelligence, deliberation, precision
- **Cinematic** - wide proportions, considered framing, breathing room
- **Editorial** - photography-magazine quality, not stock-photo generic
- **Calm** - no urgency, no cheap excitement, no visual noise
- **Premium** - sophisticated clients, boardroom-level trust

### The feeling images must NEVER convey:
- ❌ Startup energy (quirky, cartoon, illustration-heavy)
- ❌ Generic consulting (handshakes, smiling teams in glass offices)
- ❌ SaaS cliché (rocket ships, icons on dashboards, neon gradients)
- ❌ Cheap optimism (over-bright colors, forced diversity stock)
- ❌ Complexity theater (data visualization that looks impressive but means nothing)

---

## 2. PHOTOGRAPHY STYLE

### Subject direction:
- **Business context:** procurement rooms, negotiation settings, documentation, supply chain
- **People:** candid, focused, working - not posed, not smiling at camera
- **Environment:** neutral, clean, sophisticated - not cluttered, not flashy
- **Scale:** close-up details or wide cinematic environments - avoid mid-range "corporate" shots

### Lighting rules:
- **Preferred:** soft natural light, diffused window light, cool-toned overcast
- **Acceptable:** controlled studio neutrals, architectural indirect light
- **Forbidden:** harsh flash, HDR, dramatic spotlights, neon/colored light on people

### Color treatment:
- **Tone:** slightly desaturated, cool-neutral, no warmth filters
- **Contrast:** elevated but not crushed blacks - preserve detail
- **Avoid:** Instagram warmth, vintage filters, oversaturation, split toning

---

## 3. CROP & COMPOSITION RULES

### Aspect ratios by section:
| Section | Ratio | Notes |
|---|---|---|
| Hero split image | 4:3 | Cinematic but not ultrawide |
| Feature split image | 4:3 or 3:2 | Content must read at small sizes |
| Card / thumbnail | 16:9 or square | Consistent within a grid |
| Full-bleed hero | 16:9 or 2:1 | Wide, editorial - rare use only |
| Portrait / team | 3:4 or 1:1 | Clean background, head+shoulders |

### Composition principles:
- **Rule of thirds** - subject should not be dead-center unless intentional
- **Negative space** - leave room on the side where text will overlay or sit adjacent
- **Asymmetry** - slight imbalance creates visual tension and editorial quality
- **No borders / frames** - images are frameless, sit in `rounded-2xl` containers
- **Content should breathe** - no edge-to-edge claustrophobia

### What to avoid in framing:
- ❌ Centered portrait of a smiling person looking at camera
- ❌ Multiple subjects all facing different directions ("stock diversity")
- ❌ Images so busy that the eye has nowhere to rest
- ❌ Text or logos in the original image (add nothing on top of real photos)

---

## 4. OVERLAY RULES

When images require text overlay:
- Use `bg-gray-900/60` or `bg-black/50` - not brand colors
- Text over image: always white, `font-semibold`, tight tracking
- Never overlay colored gradients (no brand-navy over photo)
- Never overlay text unless contrast is guaranteed at all viewports

---

## 5. SATURATION & PROCESSING

### Target treatment:
```
Saturation:   -15% to -25% (slightly desaturated vs. phone default)
Contrast:     +10 to +15 (lifted, not crushed)
Exposure:     neutral to slightly underexposed (premium feel)
Color temp:   cool-neutral (5000-5500K equivalent)
Clarity:      +5 to +10 (crisp, not muddy)
```

### What this means in practice:
- Images should feel like high-quality magazine editorial photography
- If you can imagine it in a Monocle spread or a McKinsey report - it's right
- If it looks like an Instagram brand post - it's wrong

---

## 6. SCREENSHOT & UI MOCKUP RULES

### When showing product UI (SpendGuru):
- **Device:** floating screen only - no device frame (no MacBook renders)
- **Background:** transparent or white - place on `bg-gray-50` section
- **Shadow:** `shadow-xl` with `rounded-xl` - professional depth
- **Content visible:** show real data shapes, not Lorem Ipsum
- **Crop:** show the most impactful panel, not the whole interface

### When showing data visualization:
- Charts must look clean - remove all unnecessary chart chrome (gridlines, borders, tooltips in static)
- Color in charts: gray scale + single accent color only (brand blue `#0092D9` or `#006D9E`)
- Never show color-explosion pie charts or rainbow bar charts

### When showing documents / reports:
- Show page corner at an angle - editorial, not flat scan
- Use soft shadow on document
- Slightly rotated if compositionally appropriate

---

## 7. BUSINESS PHOTOGRAPHY DIRECTION

### Type A: Strategic environment
- Empty boardroom table, notebook, pen - no people
- Late afternoon light, architectural quality
- **Use for:** About page, hero sections

### Type B: Focused work
- Hands on keyboard or trackpad, document on desk
- Person looking at screen - not at camera
- Shallow depth of field, background blurred
- **Use for:** Feature sections, service pages

### Type C: Data moment
- Spreadsheet or document visible (not legible - artistic crop)
- Graph on screen, partial view
- Financial documents in context
- **Use for:** SpendGuru product descriptions, analytics sections

### Type D: Human connection
- Two people in conversation - side view or 3/4 angle, not facing camera
- Procurement/supplier meeting context
- Minimal clothing, neutral setting
- **Use for:** Proof sections, testimonial backgrounds

---

## 8. IMAGE SOURCING GUIDELINES

### Priority order:
1. **Custom photography** - best, most authentic
2. **Licensed editorial stock** (Getty, Offset, Pexels Pro) - acceptable with treatment
3. **Unsplash editorial** - acceptable for placeholders, limited production use
4. **Generated imagery (AI)** - only with explicit alignment to these rules

### Sources to avoid:
- ❌ Shutterstock (too generic)
- ❌ iStock basic tier (low quality, over-licensed)
- ❌ Freepik / Pixabay (visual quality inconsistent, watermark artifacts)
- ❌ Random AI images without art direction

---

## 9. TECHNICAL SPECIFICATIONS

### Format:
- **Photos:** `.webp` (Next.js Image component converts automatically) - use `.jpg` source
- **Screenshots:** `.webp` or `.png` (when transparency needed)
- **SVG assets:** only for logos, icons, decorative elements - never for photographs

### Sizing:
```
Hero image:      ≥ 1600px wide source
Feature image:   ≥ 1200px wide source
Card thumbnail:  ≥ 800px wide source
Portrait:        ≥ 600px wide source
```

### Next.js Image usage:
```tsx
<Image
  src="/images/[filename].jpg"
  alt="[descriptive alt - not keyword stuffing]"
  fill
  className="object-cover"
  sizes="(max-width: 1024px) 100vw, 50vw"
/>
```
- Always use `fill` + `sizes` for responsive hero/feature images
- Use `width` + `height` for fixed-dimension logo/thumbnail images
- `alt` must describe content, not keyword-stuff for SEO

### Placement in codebase:
```
/public/images/
  hero/           - hero section images
  features/       - feature split images
  proof/          - testimonial section backgrounds
  team/           - team member portraits
  product/        - product screenshots, UI mockups
  clients/        - client logos (PNG/SVG)
  case-studies/   - case study images
```

---

## 10. THE LITMUS TEST

Before using any image, ask:

1. **Would this appear in Monocle magazine or a McKinsey report?** - If yes, proceed.
2. **Does it feel calm and considered?** - If rushed or excited-feeling, reject.
3. **Is there visual noise competing with the text?** - If yes, re-crop or reject.
4. **Could this image be on 1000 other websites?** - If yes, it's too generic.
5. **Does it reinforce "strategic intelligence platform"?** - If not, find a better one.

---

*Last updated: Sprint 2 - May 2026*
*Owner: Design System, profitia.pl*
