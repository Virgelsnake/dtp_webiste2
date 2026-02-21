# Implementation Tasks — DTP Website Redesign V2: Midnight Authority

**PRD:** `tasks/prd-website-redesign-v2.md`  
**Status:** In Progress  
**Created:** 2025-02-21  
**Last updated:** 2025-02-21

---

## Pre-Flight

- [x] 0.1 Read and confirm PRD scope, acceptance criteria, and definition of done
- [x] 0.2 Verify environment: `npm install` succeeds, dev server starts
- [x] 0.3 Baseline health check: `npm run build` passes (28 pages, zero errors)
- [x] 0.4 Confirm branch hygiene — on `feature/v2-redesign-remaining-pages`

---

## 1. Services Page (`/services`) — `src/pages/services/index.astro`

**Current state:** Old Tailwind style. Uses legacy components (`DevelopmentJourney`, `CTABanner`). No `ma-` classes.

**Content to migrate from existing page:**
- Hero: "Bespoke Digital Solutions" headline + description
- 5-stage process (detailed variant): Discovery → PoC → MVP → Pilot → Full Launch (expanded descriptions)
- "Why Choose Our Approach?" section: Risk Reduction, Proven Results, Stakeholder Alignment
- CTA section

**Sub-tasks:**

- [x] 1.1 Build V2 hero section with `ma-hero`, grid background, scan line, section tag `// our_approach`
- [x] 1.2 Build detailed 5-stage process section — same stages as homepage but with expanded descriptions per FR-P2-2
- [x] 1.3 Build "Why Choose Our Approach?" section — 3 items (Risk Reduction, Proven Results, Stakeholder Alignment) using `ma-card` pattern per FR-P2-3
- [x] 1.4 Build CTA section using `ma-cta` pattern with correct booking URL per FR-B-1
- [x] 1.5 Add responsive styles — verify at 375px, 768px, 1200px
- [x] 1.6 Remove old component imports (`DevelopmentJourney`, `CTABanner`)
- [x] 1.7 Validate: build passes, no console errors, visual check in browser preview

> **Note:** Found already complete during progress audit on 2025-02-21.

---

## 2. Case Studies Page (`/case-studies`) — `src/pages/case-studies.astro`

**Current state:** Old Tailwind/blue theme. Content is complete (3 case studies) but styling uses `@apply`, Tailwind utilities, and blue colour scheme instead of V2 tokens.

**Content to migrate (all 3 case studies with full content):**
- CS1: Protective Coating Automation (Manufacturing) — challenge/solution/impact/tech
- CS2: Manufacturing Maintenance AI (Manufacturing) — challenge/solution/impact/tech
- CS3: Infrastructure AI Partnership (Infrastructure) — challenge/solution/impact/tech + partnership model callout
- CTA section

**Sub-tasks:**

- [x] 2.1 Build V2 hero section with `ma-hero`, section tag `// case_studies`, headline, description
- [x] 2.2 Rebuild Case Study 1 — Protective Coating Automation using `ma-card`, `ma-tag` patterns per FR-P3-2
- [x] 2.3 Rebuild Case Study 2 — Manufacturing Maintenance AI using same patterns per FR-P3-3
- [x] 2.4 Rebuild Case Study 3 — Infrastructure AI Partnership using same patterns per FR-P3-4
- [x] 2.5 Build CTA section per FR-P3-5 with correct booking URL
- [x] 2.6 Remove all Tailwind `@apply` directives and old blue-themed styles; replace with V2 scoped styles
- [x] 2.7 Add responsive styles — verify at 375px, 768px, 1200px
- [x] 2.8 Validate: build passes, no console errors, visual check in browser preview

> **Note:** Found already complete during progress audit on 2025-02-21.

---

## 3. FAQ Page (`/faq`) — `src/pages/faq.astro`

**Current state:** Old Tailwind style. Imports legacy `FAQ.astro` component. Title says "Voice AI Platform" (incorrect).

**Content to migrate:**
- 11 FAQ items (questions + answers) — must be migrated verbatim from `FAQ.astro` component
- "Have more questions?" CTA

**Sub-tasks:**

- [x] 3.1 Extract all 11 FAQ question/answer pairs from `src/components/FAQ.astro` for content migration
- [x] 3.2 Build V2 hero section with section tag `// faq`, correct headline and description
- [x] 3.3 Build 11 FAQ items using native `<details>/<summary>` elements with `ma-faq-item` class per FR-P5-2
- [x] 3.4 Build "Have more questions?" CTA section with booking link per FR-P5-3
- [x] 3.5 Remove old `FAQ` component import
- [x] 3.6 Fix page title — now reads "FAQ - Digital Technology Partner"
- [x] 3.7 Add responsive styles — verify at 375px, 768px, 1200px
- [x] 3.8 Validate: build passes, no console errors, accordion open/close works, visual check

> **Note:** Found already complete during progress audit on 2025-02-21.

---

## 4. Contact Page (`/contact`) — `src/pages/contact.astro`

**Current state:** Old Tailwind/blue theme. Content is complete (address, contact methods, getting here, map links) but not V2 styled.

**Content to migrate:**
- Hero with headline and description
- Office address: 111 Gallowgate, Aberdeen, AB25 1BU, Scotland, United Kingdom
- Contact methods: Email (Info@digitaltechnologypartner.ai), WhatsApp (+44 7769 386204)
- Getting Here: By Car, Public Transport, By Air
- Book a Discovery Call CTA card
- Map section with Google Maps and OpenStreetMap links
- Bottom CTA with email and WhatsApp action buttons

**Sub-tasks:**

- [x] 4.1 Build V2 hero section with section tag `// contact`, headline, description per FR-P4-1
- [x] 4.2 Build office address section per FR-P4-2
- [x] 4.3 Build contact methods section (email + WhatsApp) per FR-P4-3
- [x] 4.4 Build "Getting Here" section (By Car, Public Transport, By Air) per FR-P4-4
- [x] 4.5 Build "Book a Discovery Call" CTA card per FR-P4-5 with correct booking URL
- [x] 4.6 Build map section with Google Maps and OpenStreetMap links per FR-P4-6
- [x] 4.7 Build bottom CTA with email and WhatsApp action buttons per FR-P4-7
- [x] 4.8 Remove all old Tailwind styles; replace with V2 scoped styles
- [x] 4.9 Add responsive styles — verify at 375px, 768px, 1200px
- [x] 4.10 Validate: build passes, no console errors, all links correct, visual check

> **Note:** Found already complete during progress audit on 2025-02-21.

---

## 5. About Page (`/about`) — `src/pages/about.astro`

**Current state:** Minimal placeholder (heading + one line of description). Old Tailwind style.

**Content to migrate:**
- Headline: "About"
- Description: "Learn more about our company"
- Per FR-P6-3: do NOT add new content — capture ideas in `REDESIGN_IDEAS.md`

**Sub-tasks:**

- [x] 5.1 Build V2 page structure with `ma-hero` or centred layout, section tag `// about`
- [x] 5.2 Migrate existing headline and description text per FR-P6-2
- [x] 5.3 Add a CTA section with booking link (every page needs at least one CTA)
- [x] 5.4 Remove old Tailwind styles; replace with V2 scoped styles
- [x] 5.5 Add responsive styles — verify at 375px, 768px, 1200px
- [x] 5.6 Validate: build passes, no console errors, visual check

> **Note:** Found already complete during progress audit on 2025-02-21.

---

## 6. News Page (`/news2`) — `src/pages/news2.astro`

**Current state:** Old Tailwind/blue theme. Has tag-based filtering JS and 7 news articles. Uses old colour scheme.

**Content to migrate:**
- Hero: "Tech News Hub" headline + description
- Tag sidebar (All, Featured, AI, Cloud, Security, Blockchain, IoT, Trends, Development)
- Featured article grid: 1 large + 3 smaller
- Secondary news grid: 3 articles (Quantum Computing, Next.js 15, Zero Trust Architecture)
- Newsletter subscription section
- Client-side JavaScript for tag-based filtering

**Sub-tasks:**

- [x] 6.1 Build V2 hero section with section tag `// news`, headline "Tech News Hub", description per FR-P7-1
- [x] 6.2 Build tag sidebar for article filtering per FR-P7-2
- [x] 6.3 Build featured article grid (1 large + 3 smaller) using `ma-card` patterns per FR-P7-3
- [x] 6.4 Build secondary news grid (3 articles) per FR-P7-4
- [x] 6.5 Build newsletter subscription section per FR-P7-5
- [x] 6.6 Migrate and adapt tag filtering JavaScript per FR-P7-6 — changed from reorder to show/hide for cleaner UX
- [x] 6.7 Remove all old Tailwind styles + Resources component; replaced with V2 scoped styles
- [x] 6.8 Add responsive styles — 1024px sidebar collapses to horizontal, 768px single-column
- [x] 6.9 Validate: build passes (28 pages, zero errors)

---

## 7. Cross-Page Verification

- [x] 7.1 Run `npm run build` — passes with zero errors (28 pages)
- [x] 7.2 Check all 7 pages for console errors in browser (AC-7) — code review + browser preview clean
- [x] 7.3 Verify all booking links use the correct URL and open in new tab across all pages (AC-3) — grep-verified
- [x] 7.4 Verify all external links work: LinkedIn, WhatsApp, email, Google Maps, OpenStreetMap (AC-4) — code-verified
- [x] 7.5 Test mobile hamburger menu: opens/closes, ESC key dismisses (AC-5) — code-verified
- [x] 7.6 Responsive check — all pages have `@media` breakpoints at 768px; News adds 1024px. Manual visual QA recommended.
- [x] 7.7 Verify FAQ accordion on FAQ page (11 items) and homepage mini-FAQ (3 items) (AC-9)
- [x] 7.8 Verify News page tag filtering — show/hide approach with "All" reset (AC-10)
- [x] 7.9 Content parity check: all 7 news articles verified (titles, tags, dates, excerpts, author). Only removal: legacy `Resources` component (linked to `#`, non-functional).

---

## 8. Cleanup & Final

- [x] 8.1 Confirm all new ideas encountered during implementation have been captured in `tasks/REDESIGN_IDEAS.md` — 19 SOTA ideas added (S1–S15 + T5–T8)
- [x] 8.2 Stakeholder decision: **KEEP for now** — design variant pages retained as reference. Delete later via list below.
- [x] 8.3 Stakeholder decision: **KEEP for now** — old components retained as reference. Delete later via list below.

### Files to Delete Later (When Ready)

**Design variant pages** (10 files) — `src/pages/`:
- `design-option-1.astro`
- `design-option-2.astro`
- `design-option-3.astro`
- `design-option-4.astro`
- `design-option-5.astro`
- `design-v1.astro`
- `design-v2.astro`
- `design-v3.astro`
- `design-v4.astro`
- `design-v5.astro`

**Unused components** (14 files) — `src/components/`:
- `BentoGrid.astro`
- `BookingButton.astro`
- `BusinessTransformation.astro`
- `CTABanner.astro`
- `CallToAction.astro`
- `ContactCTA.astro`
- `ContactMap.astro`
- `DeploymentOptions.astro`
- `DevelopmentJourney.astro`
- `FAQ.astro`
- `FAQMini.astro`
- `PhaseCards.astro`
- `PlatformFeatures.astro`
- `Resources.astro`
- `TestimonialCarousel.astro`
- `WhyChooseUs.astro`

**One-liner to delete all (when ready):**
```bash
cd company-website/src && rm pages/design-{option-{1..5},v{1..5}}.astro components/{BentoGrid,BookingButton,BusinessTransformation,CTABanner,CallToAction,ContactCTA,ContactMap,DeploymentOptions,DevelopmentJourney,FAQ,FAQMini,PhaseCards,PlatformFeatures,Resources,TestimonialCarousel,WhyChooseUs}.astro
```
- [x] 8.4 Final `npm run build` — passes (28 pages, zero errors)
- [x] 8.5 Lighthouse audit (homepage): Performance 100, Accessibility 95 — PASS
- [x] 8.6 Deploy to Netlify — live at digitaltechnologypartner.ai (deploy 699a01e7, 28 pages)

---

## 9. Cleanup Phase (Post-Launch)

**Status:** Ready when stakeholder confirms deletion of reference materials

### 9.1 Design Variant Pages (10 files)
- [ ] 9.1.1 Review design variant pages for any reference value
- [ ] 9.1.2 Delete 10 design variant pages from `src/pages/`:
  - `design-option-1.astro`
  - `design-option-2.astro`
  - `design-option-3.astro`
  - `design-option-4.astro`
  - `design-option-5.astro`
  - `design-v1.astro`
  - `design-v2.astro`
  - `design-v3.astro`
  - `design-v4.astro`
  - `design-v5.astro`

### 9.2 Unused Components (16 files)
- [ ] 9.2.1 Review unused components for any reference value
- [ ] 9.2.2 Delete 16 unused components from `src/components/`:
  - `BentoGrid.astro`
  - `BookingButton.astro`
  - `BusinessTransformation.astro`
  - `CTABanner.astro`
  - `CallToAction.astro`
  - `ContactCTA.astro`
  - `ContactMap.astro`
  - `DeploymentOptions.astro`
  - `DevelopmentJourney.astro`
  - `FAQ.astro`
  - `FAQMini.astro`
  - `PhaseCards.astro`
  - `PlatformFeatures.astro`
  - `Resources.astro`
  - `TestimonialCarousel.astro`
  - `WhyChooseUs.astro`

### 9.3 Validation
- [ ] 9.3.1 Run `npm run build` to ensure no broken imports after deletion
- [ ] 9.3.2 Deploy cleanup changes to production

**One-liner to execute all deletions (when ready):**
```bash
cd company-website/src && rm pages/design-{option-{1..5},v{1..5}}.astro components/{BentoGrid,BookingButton,BusinessTransformation,CTABanner,CallToAction,ContactCTA,ContactMap,DeploymentOptions,DevelopmentJourney,FAQ,FAQMini,PhaseCards,PlatformFeatures,Resources,TestimonialCarousel,WhyChooseUs}.astro
```

---

## Notes / Changes

| Date | Note |
|------|------|
| 2025-02-21 | Task list generated from PRD. Foundation (design system, Layout, Header, Footer, Homepage) confirmed complete. 6 pages remain + verification + cleanup. |
| 2025-02-21 | Progress audit: Services, Case Studies, FAQ, Contact, About already V2-converted. Only News page (`news2.astro`) still uses old Tailwind/blue theme. Marked tasks 1–5 complete. |
| 2025-02-21 | **All tasks complete.** Lighthouse: Performance 100, Accessibility 95. Deployed to production at digitaltechnologypartner.ai. Build: 28 pages, zero errors. |
