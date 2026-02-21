# PRD: DTP Website Redesign — V2 Midnight Authority

**Status:** In Progress  
**Created:** 2025-02-21  
**Last updated:** 2025-02-21  
**Author:** Cascade (AI pair programmer)  
**Stakeholder:** Steve Shearman

---

## 1. Overview

Digital Technology Partner (DTP) is redeveloping its company website. The current site functions but its visual design feels generic and lacks a considered, human-led aesthetic. The goal of this project is to **apply the V2: Midnight Authority design system across the entire existing website** — every page, every component — while **migrating all current content** into the new build.

This is a **visual redesign and content migration**, not a replatform. The existing Astro + Tailwind tech stack and Netlify deployment pipeline remain in place. The information architecture (pages, routes, sitemap) remains unchanged unless explicitly agreed otherwise.

### What this project is NOT

- It is not a content rewrite (copy stays as-is unless flagged for review).
- It is not a feature addition (new ideas are captured in the companion document `tasks/REDESIGN_IDEAS.md` for separate review).
- It is not a migration to a different framework or hosting provider.

---

## 2. Platforms & Release Targets

| Target | Details |
|--------|---------|
| **Platform** | PWA (Web) — static site |
| **Browsers** | Chrome 120+, Firefox 115+, Safari 17+, Edge 120+ |
| **Devices** | Desktop (1200px+), Tablet (768–1199px), Mobile (320–767px) |
| **OS** | macOS, Windows, iOS Safari, Android Chrome |

**Assumption:** No native iOS/Android app is in scope. The website is a marketing and information site, not a web application requiring offline capability or service workers.

---

## 3. Recommended Stack & Rationale

The existing stack is retained:

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Astro 5.x | Already in use. Static output, component islands, excellent performance. No reason to change. |
| **Styling** | Custom CSS via `v2-design-system.css` + scoped `<style>` per component | Tailwind is available but the V2 design uses a bespoke CSS custom property system (`--ma-*`) for full design token control. Tailwind utility classes may be used sparingly where convenient. |
| **Fonts** | Google Fonts: Space Grotesk, IBM Plex Sans, IBM Plex Mono | Loaded via `<link>` with `preconnect`. |
| **Deployment** | Netlify (static) | Already configured via `netlify.toml`. |
| **Package Manager** | npm | Lockfile already present. |

### Why not Tailwind-only?

The V2 design system requires precise control over colours, typography, borders, and transitions that are cleaner as CSS custom properties than Tailwind utility chains. The `v2-design-system.css` file acts as the single source of truth for design tokens, shared across all pages and components.

---

## 4. Goals

1. **G1 — Visual Consistency:** Apply the V2 Midnight Authority design uniformly to every page and shared component (Header, Footer, Layout).
2. **G2 — Content Migration:** All existing text, links, images, contact details, booking URLs, and social links are preserved in the new design.
3. **G3 — Responsive:** All pages render correctly and are fully usable at desktop (≥1200px), tablet (768–1199px), and mobile (<768px) breakpoints.
4. **G4 — Maintainability:** The design system is centralised in `v2-design-system.css` with CSS custom properties. Page-specific styles use scoped `<style>` blocks. No inline styles except where Astro templating requires it.
5. **G5 — Performance:** Lighthouse Performance score ≥ 90 on all pages. No JavaScript frameworks loaded; interactivity uses vanilla JS in `<script>` tags where needed.
6. **G6 — Ideas Captured:** Any new design ideas, structural improvements, or content suggestions that arise during implementation are recorded in `tasks/REDESIGN_IDEAS.md` for stakeholder review — not implemented ad-hoc.

---

## 5. User Stories & Personas

### Persona: Prospective Client (Primary)
A business leader or technical decision-maker evaluating DTP as a potential AI/digital partner. They want to quickly understand what DTP does, see evidence of capability (case studies), and book a discovery call.

### Persona: Referral Partner
A consultancy or technology firm considering DTP as a subcontracting partner for AI/ML work. They want to see technical credibility and partnership flexibility.

### User Stories

| ID | Story | Acceptance |
|----|-------|------------|
| US1 | As a prospective client, I want to land on the homepage and immediately understand what DTP does, so I can decide if they're relevant to my needs. | Hero section loads with clear value proposition, CTA, and key stats within 2 seconds. |
| US2 | As a prospective client, I want to read case studies with real business impact, so I can trust DTP's ability to deliver. | Case studies page shows 3 detailed projects with challenge/solution/impact/tech stack. |
| US3 | As a prospective client, I want to book a discovery call easily from any page, so I can start a conversation without friction. | Booking CTA present in header nav and at least one CTA section per page. All booking links use the correct Microsoft Bookings URL. |
| US4 | As a visitor, I want the site to feel premium and technically competent, so I trust DTP as a serious partner. | V2 Midnight Authority design applied consistently: Space Grotesk headings, electric mint accent, dark surface colours, monospace tags, grid background effects. |
| US5 | As a mobile visitor, I want to navigate the full site on my phone, so I get the same information as desktop users. | All pages fully responsive. Mobile hamburger menu works. No horizontal scrolling. All content accessible. |

---

## 6. Functional Requirements

### 6.1 Design System (Global)

| ID | Requirement |
|----|-------------|
| FR-DS-1 | All design tokens (colours, fonts, spacing, radii, transitions) are defined as CSS custom properties in `src/styles/v2-design-system.css`. |
| FR-DS-2 | All pages import the design system via `Layout.astro`. |
| FR-DS-3 | Google Fonts (Space Grotesk, IBM Plex Sans, IBM Plex Mono) are loaded via `<link>` tags in the `<head>` of `Layout.astro` with `preconnect`. |
| FR-DS-4 | Shared UI patterns (`.ma-btn`, `.ma-card`, `.ma-tag`, `.ma-faq-item`, etc.) are defined in the design system CSS and reused across pages. |

### 6.2 Layout (`Layout.astro`)

| ID | Requirement |
|----|-------------|
| FR-L-1 | Imports `v2-design-system.css` (replacing old `deepgram-buttons.css`). |
| FR-L-2 | Includes all SEO meta tags: canonical, Open Graph, Twitter Cards. |
| FR-L-3 | Includes favicons and apple-touch-icon. |
| FR-L-4 | Renders `<slot />` for page content and `<Footer />` at bottom. |
| FR-L-5 | `<body>` has no Tailwind background class — background is set by the design system CSS. |

### 6.3 Header (`Header.astro`)

| ID | Requirement |
|----|-------------|
| FR-H-1 | Fixed position, backdrop-blur, dark background with `--ma-border` bottom border. |
| FR-H-2 | Logo: `// DTP` with mint-coloured `//` mark, linking to `/`. |
| FR-H-3 | Desktop nav links: Home, Our Approach, Case Studies, FAQ, News, Contact. |
| FR-H-4 | Desktop CTA: "Book a Call" button (mint) linking to Microsoft Bookings URL. |
| FR-H-5 | Mobile: Hamburger menu at `<1024px`. Mobile panel with same links + full "Book a Discovery Call" CTA. |
| FR-H-6 | ESC key closes mobile menu. Hamburger toggles `aria-expanded`. |

### 6.4 Footer (`Footer.astro`)

| ID | Requirement |
|----|-------------|
| FR-F-1 | Copyright line: "© 2025 Digital Technology Partner. All Rights Reserved." |
| FR-F-2 | Links: LinkedIn (existing URL), Email (Info@digitaltechnologypartner.ai), WhatsApp (+44 7769 386204). |
| FR-F-3 | Responsive: stacks vertically on mobile. |

### 6.5 Pages

Each page must:
- Import `Layout` and `Header`.
- Use the V2 design system classes and tokens.
- Migrate **all** existing content (copy, links, data).
- Include at least one CTA linking to the booking URL.
- Be fully responsive at all breakpoints.

#### 6.5.1 Homepage (`/`) — `src/pages/index.astro`

| ID | Requirement |
|----|-------------|
| FR-P1-1 | Hero with grid background, scan line animation, monospace init tag, headline with blinking cursor, subheadline, two CTA buttons (mint + outline), and stat bar. |
| FR-P1-2 | Benefits section: 6 cards in 3-column grid. Titles: Reduced Risk, Security by Design, Reliable Delivery, Scales with You, Flexible Engagement, Works With Your Tools. |
| FR-P1-3 | Testimonials section: 3 quote cards with attribution (Managing Director, COO, CEO). |
| FR-P1-4 | Use Cases section: 3 cards (Operations Automation, Data & Reporting, AI Assistants for Teams) with tech tags. |
| FR-P1-5 | Process section: 5-step vertical timeline (Discovery → PoC → MVP → Pilot → Full Launch) with hover effects on timeline dots. |
| FR-P1-6 | FAQ mini section: 3 questions using `<details>` elements + link to full FAQ page. |
| FR-P1-7 | CTA section: Heading, subtitle, mint button. |

#### 6.5.2 Our Approach / Services (`/services`) — `src/pages/services/index.astro`

| ID | Requirement |
|----|-------------|
| FR-P2-1 | Hero with headline "Bespoke Digital Solutions" and description. |
| FR-P2-2 | Detailed 5-stage process (same stages as homepage but with expanded descriptions for each stage). |
| FR-P2-3 | "Why Choose Our Approach?" section: 3 items — Risk Reduction, Proven Results, Stakeholder Alignment. |
| FR-P2-4 | CTA section. |

#### 6.5.3 Case Studies (`/case-studies`) — `src/pages/case-studies.astro`

| ID | Requirement |
|----|-------------|
| FR-P3-1 | Hero with headline and description. |
| FR-P3-2 | Case Study 1 — Protective Coating Automation (Manufacturing): Challenge (4 bullets), Solution (4 items), Business Impact (3 metrics: Hours→Minutes, 100%, Faster), Tech stack (Python, Flask/FastAPI, React, MongoDB, OCR). |
| FR-P3-3 | Case Study 2 — Manufacturing Maintenance AI (Manufacturing): Challenge (4 bullets), Solution (4 items), Business Impact (Zero missed maintenance, Real-time visibility, No training required), Tech stack (AI Agent, NLP, Cloud APIs, Mobile Integration, Voice Processing). |
| FR-P3-4 | Case Study 3 — Infrastructure AI Partnership (Infrastructure): Partnership Need (4 bullets), Technical Contributions (4 items), Business Impact (Expanded, Accelerated, Enhanced), Partnership Model callout, Tech stack (Vector Databases, ML, Generative AI, NLP, API Integration). |
| FR-P3-5 | CTA section. |

#### 6.5.4 Contact (`/contact`) — `src/pages/contact.astro`

| ID | Requirement |
|----|-------------|
| FR-P4-1 | Hero with headline and description. |
| FR-P4-2 | Office address: 111 Gallowgate, Aberdeen, AB25 1BU, Scotland, United Kingdom. |
| FR-P4-3 | Contact methods: Email (Info@digitaltechnologypartner.ai), WhatsApp (+44 7769 386204). |
| FR-P4-4 | Getting Here: By Car, Public Transport, By Air descriptions. |
| FR-P4-5 | Book a Discovery Call CTA card. |
| FR-P4-6 | Map section with links to Google Maps and OpenStreetMap. |
| FR-P4-7 | Bottom CTA with email and WhatsApp action buttons. |

#### 6.5.5 FAQ (`/faq`) — `src/pages/faq.astro`

| ID | Requirement |
|----|-------------|
| FR-P5-1 | Hero with headline and description. |
| FR-P5-2 | 11 FAQ items using `<details>` elements (native HTML accordion). All existing questions and answers migrated verbatim. |
| FR-P5-3 | "Have more questions?" CTA with booking link. |

**FAQ content to migrate:**
1. How do I get started with AI solutions?
2. How do you ensure data security?
3. Do you provide ongoing support and optimisation?
4. How do you measure success?
5. What's the typical project timeline?
6. What types of AI models do you use?
7. Do I need technical expertise to use your solutions?
8. What industries do you specialise in?
9. How do you create tailored solutions?
10. What are the benefits of automation?
11. What is your stage-gate process?

#### 6.5.6 About (`/about`) — `src/pages/about.astro`

| ID | Requirement |
|----|-------------|
| FR-P6-1 | Currently a placeholder page. Redesign with V2 styling. |
| FR-P6-2 | Maintain existing headline ("About") and description text. |
| FR-P6-3 | **Note:** Any ideas for expanding this page's content should be captured in `tasks/REDESIGN_IDEAS.md`, not implemented during this phase. |

#### 6.5.7 News (`/news2`) — `src/pages/news2.astro`

| ID | Requirement |
|----|-------------|
| FR-P7-1 | Hero with headline "Tech News Hub" and description. |
| FR-P7-2 | Tag sidebar for filtering articles (All, Featured, AI, Cloud, Security, Blockchain, IoT, Trends, Development). |
| FR-P7-3 | Featured article grid: 1 large featured article + 3 smaller articles. |
| FR-P7-4 | Secondary news grid: 3 articles (Quantum Computing, Next.js 15, Zero Trust Architecture). |
| FR-P7-5 | Newsletter subscription section. |
| FR-P7-6 | Client-side JavaScript for tag-based article filtering. |

### 6.6 Booking URL (Global)

| ID | Requirement |
|----|-------------|
| FR-B-1 | All "Book a Discovery Call" / "Book a Call" links use this exact URL: `https://outlook.office.com/bookwithme/user/f0762b9af6a94ed2add9818a4f3ca4e5@digitaltechnologypartner.ai/meetingtype/qc2lOXjEdkO6GkMS_jZJrQ2?anonymous` |
| FR-B-2 | All booking links open in a new tab with `target="_blank" rel="noopener noreferrer"`. |

---

## 7. Acceptance Criteria & Test Strategy

### 7.1 Acceptance Criteria

| ID | Criteria | Verification Method |
|----|----------|-------------------|
| AC-1 | V2 Midnight Authority design is applied to all 7 pages (Home, Services, Case Studies, Contact, FAQ, About, News). | Visual inspection in browser at 3 breakpoints. |
| AC-2 | All existing text content is present and unchanged (unless a typo fix is flagged). | Side-by-side comparison of old vs new page content. |
| AC-3 | All booking links resolve to the correct Microsoft Bookings URL and open in new tab. | Click-test every CTA across all pages. |
| AC-4 | All external links (LinkedIn, WhatsApp, email, Google Maps, OpenStreetMap) work correctly. | Click-test all external links. |
| AC-5 | Mobile navigation (hamburger) opens/closes correctly, ESC key dismisses. | Manual test on mobile viewport + keyboard test. |
| AC-6 | All pages responsive: no horizontal scroll, no content overflow, at 375px, 768px, 1200px, 1440px widths. | Browser dev tools responsive mode. |
| AC-7 | No console errors on any page. | Browser console inspection on all 7 pages. |
| AC-8 | Astro build (`npm run build`) completes without errors. | Terminal build output. |
| AC-9 | FAQ accordion items open/close correctly on FAQ page and homepage mini-FAQ. | Manual click-test. |
| AC-10 | News page tag filtering works (filters articles, resets with "All"). | Manual test with each tag. |

### 7.2 Test Strategy

| Type | Scope | Tool |
|------|-------|------|
| **Visual Regression** | Compare before/after screenshots at 3 breakpoints per page | Manual (browser) |
| **Build Verification** | `npm run build` passes | Terminal |
| **Lint** | `npm run lint` passes (if configured) | Terminal |
| **Link Verification** | All internal and external links resolve | Manual click-through |
| **Accessibility** | Lighthouse accessibility audit ≥ 90 per page | Chrome DevTools |
| **Performance** | Lighthouse performance score ≥ 90 per page | Chrome DevTools |

---

## 8. Definition of Done

A page is "done" when:

- [ ] V2 design system applied (correct fonts, colours, spacing, components)
- [ ] All existing content migrated (text, links, data)
- [ ] Responsive at mobile (375px), tablet (768px), desktop (1200px+)
- [ ] No console errors
- [ ] All CTAs link to correct booking URL
- [ ] Astro build passes
- [ ] Page reviewed in browser preview

The **project** is done when:

- [ ] All 7 pages pass the page-level definition of done
- [ ] Header and Footer render correctly on all pages
- [ ] `npm run build` succeeds
- [ ] Lighthouse Performance ≥ 90 on homepage
- [ ] Lighthouse Accessibility ≥ 90 on homepage
- [ ] All new ideas captured in `tasks/REDESIGN_IDEAS.md`
- [ ] Design variant pages (`design-v1` through `design-v5`) cleaned up or retained per stakeholder preference

---

## 9. Non-Goals (Out of Scope)

| Item | Reason |
|------|--------|
| Content rewriting | Copy is migrated as-is. Any suggested improvements go to `REDESIGN_IDEAS.md`. |
| New pages | No new routes are added. Any ideas go to `REDESIGN_IDEAS.md`. |
| CMS integration | Content remains in Astro files. |
| Analytics / tracking | Not in scope for this phase. |
| Contact form backend | No form submission handling. CTAs link to external booking. |
| SEO keyword optimisation | Existing meta tags are preserved. |
| Blog/content management system | News articles remain hardcoded. |
| Animation libraries (Framer Motion, GSAP) | CSS-only animations per V2 design. |
| A/B testing | Not in scope. |

---

## 10. Design Considerations

### V2: Midnight Authority Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--ma-bg` | `#0A0A0F` | Page background |
| `--ma-surface` | `#1A1A2E` | Card/section backgrounds |
| `--ma-surface-alt` | `#111122` | Alternating section backgrounds |
| `--ma-border` | `#2A2A3E` | Borders, dividers |
| `--ma-mint` | `#00E5A0` | Primary accent (CTAs, highlights) |
| `--ma-mint-dim` | `rgba(0,229,160,0.12)` | Tag backgrounds |
| `--ma-text` | `#E0E0E0` | Body text |
| `--ma-text-dim` | `#8888A0` | Secondary text |
| `--ma-white` | `#F0F0F5` | Headings |
| `--ma-font-display` | Space Grotesk | Headlines, buttons |
| `--ma-font-body` | IBM Plex Sans | Body text |
| `--ma-font-mono` | IBM Plex Mono | Code/tag decorations |

### Key Visual Patterns

- **Section tags**: Monospace `// section_name` labels above headings
- **Grid background**: Subtle grid overlay on hero sections
- **Scan line**: Animated horizontal line sweeping through hero
- **Blinking cursor**: `|` after hero headline
- **Process numbers**: Large faded `01`–`05` before process steps
- **Cards**: Dark surface, 1px border, mint border + glow on hover
- **Buttons**: Mint solid (primary), outline with mint hover (secondary)

---

## 11. Technical Considerations

### File Structure (Post-Redesign)

```
src/
├── components/
│   ├── Header.astro          ← V2 rebuilt
│   └── Footer.astro          ← V2 rebuilt
├── layouts/
│   └── Layout.astro           ← V2 rebuilt (imports v2-design-system.css)
├── pages/
│   ├── index.astro            ← V2 rebuilt ✅
│   ├── about.astro            ← V2 pending
│   ├── case-studies.astro     ← V2 pending
│   ├── contact.astro          ← V2 pending
│   ├── faq.astro              ← V2 pending
│   ├── news2.astro            ← V2 pending
│   ├── services/
│   │   └── index.astro        ← V2 pending
│   ├── design-v1.astro        ← Phase 1 artifact (cleanup TBD)
│   ├── design-v2.astro        ← Phase 1 artifact (cleanup TBD)
│   ├── design-v3.astro        ← Phase 1 artifact (cleanup TBD)
│   ├── design-v4.astro        ← Phase 1 artifact (cleanup TBD)
│   └── design-v5.astro        ← Phase 1 artifact (cleanup TBD)
└── styles/
    ├── v2-design-system.css   ← V2 design tokens + base styles ✅
    ├── global.css             ← Legacy (may be removed)
    └── deepgram-buttons.css   ← Legacy (no longer imported)
```

### Dependencies on Existing Components

The following old components are **no longer imported** by V2 pages. Their content has been inlined into page-level markup in the V2 design:

- `PlatformFeatures.astro` → content in homepage benefits section
- `BusinessTransformation.astro` → content in homepage use cases section
- `TestimonialCarousel.astro` → content in homepage testimonials section
- `DevelopmentJourney.astro` → content in homepage/services process section
- `FAQ.astro` → content in FAQ page as native `<details>` elements
- `DeploymentOptions.astro`, `WhyChooseUs.astro`, `ContactCTA.astro`, `FAQMini.astro`, `CTABanner.astro` → content absorbed into page sections

These old component files can be retained for reference or cleaned up after the redesign is verified.

---

## 12. Implementation Notes (Non-binding)

### Suggested Build Order

1. ~~`v2-design-system.css`~~ ✅ Done
2. ~~`Layout.astro`~~ ✅ Done
3. ~~`Header.astro`~~ ✅ Done
4. ~~`Footer.astro`~~ ✅ Done
5. ~~`index.astro` (Homepage)~~ ✅ Done
6. `services/index.astro` (Our Approach)
7. `case-studies.astro`
8. `faq.astro`
9. `contact.astro`
10. `about.astro`
11. `news2.astro`
12. Final verification pass

### Guidelines for Each Page

- Start with `---` frontmatter importing `Layout` and `Header`.
- Use `<Layout title="Page Title">` wrapper.
- Add `<Header />` as first child.
- Structure sections using `.ma-section`, `.ma-container`, `.ma-section-header` with `.ma-section-tag`.
- Use design system classes (`.ma-card`, `.ma-btn`, `.ma-tag`, `.ma-faq-item`) wherever applicable.
- Page-specific styles go in a scoped `<style>` block at the bottom.
- Interactive JS (FAQ accordion, news filtering) goes in a `<script>` block.

### Edge Cases

- **About page**: Currently a placeholder. Apply V2 styling to the existing minimal content. Do not invent new content — capture ideas in `REDESIGN_IDEAS.md`.
- **News page**: Tag filtering JavaScript must be retained and tested after visual redesign.
- **FAQ page**: Migrate from `onclick` handlers to native `<details>/<summary>` for better accessibility and zero-JS operation.

---

## 13. Success Metrics

| Metric | Target |
|--------|--------|
| All 7 pages redesigned | 100% |
| Content parity with original site | 100% (no missing text, links, or data) |
| Lighthouse Performance (homepage) | ≥ 90 |
| Lighthouse Accessibility (homepage) | ≥ 90 |
| Console errors across all pages | 0 |
| Build passes (`npm run build`) | Yes |
| Responsive at 375px, 768px, 1200px | All pages pass |

---

## 14. Open Questions

| # | Question | Status |
|---|----------|--------|
| Q1 | Should the 5 design variant pages (`design-v1` to `design-v5`) be deleted after the redesign is complete, or retained for reference? | **Open** — ask stakeholder |
| Q2 | Should the old component files (PlatformFeatures, BusinessTransformation, etc.) be deleted or retained? | **Open** — ask stakeholder |
| Q3 | The About page is a placeholder. Is there any content to add now, or should it remain minimal and be expanded later? | **Open** — captured in REDESIGN_IDEAS.md |
| Q4 | Should the News page articles link anywhere, or remain as static cards? | **Open** — captured in REDESIGN_IDEAS.md |

---

## 15. Appendix: Source Notes

### Context from Design Exploration (Phase 1 & 2)

- **5 design concepts** were created and implemented as browsable pages (`design-v1` through `design-v5`).
- **V2: Midnight Authority** was selected by the stakeholder as the preferred direction.
- The V2 landing page prototype (`design-v2.astro`) served as the visual reference for the design system.

### Files Reviewed for Content Migration

| File | Content Extracted |
|------|-------------------|
| `src/pages/index.astro` | Hero copy, CTA links, component structure |
| `src/pages/services/index.astro` | Services hero, "Why Choose" section content |
| `src/pages/case-studies.astro` | 3 full case studies with challenge/solution/impact/tech |
| `src/pages/contact.astro` | Address, email, WhatsApp, map links, getting here |
| `src/pages/faq.astro` | Page structure (imports FAQ component) |
| `src/pages/about.astro` | Placeholder content |
| `src/pages/news2.astro` | 7 news articles, tag filtering, newsletter section |
| `src/components/Header.astro` | Navigation links, booking URL, mobile menu |
| `src/components/Footer.astro` | Copyright, social links |
| `src/components/PlatformFeatures.astro` | 6 benefit items (titles + descriptions) |
| `src/components/BusinessTransformation.astro` | 3 use case items (titles + descriptions) |
| `src/components/TestimonialCarousel.astro` | 4 testimonials with quotes + attribution |
| `src/components/FAQ.astro` | 11 FAQ questions + answers |
| `src/components/DevelopmentJourney.astro` | 5-stage process (Discovery → Full Launch) |
