# PRD: Mobile Compliance Remediation

**Project:** DTP Website Mobile Compliance Fixes  
**Version:** 1.0  
**Created:** March 2026  
**Source:** `@/company-website/docs/MOBILE_COMPLIANCE_AUDIT.md`

---

## 1. Overview

This PRD defines the remediation work required to bring the Digital Technology Partner (DTP) website into full mobile compliance. The work addresses issues identified in the Mobile Compliance & Responsiveness Audit, covering viewport consistency, layout overflow, touch target accessibility, image responsiveness, and performance optimizations.

**Problem Statement:** The DTP website has partial mobile compliance with inconsistent implementation across pages and components. Critical issues include horizontal overflow on mobile devices, touch targets below WCAG minimums, and missing responsive image handling.

---

## 2. Platforms & Release Targets

| Platform | In Scope | Notes |
|----------|----------|-------|
| **PWA (Web)** | ✅ Yes | Primary target |
| iOS Native | ❌ No | — |
| Android Native | ❌ No | — |

### Target Devices & Viewports

| Device | Width | Priority |
|--------|-------|----------|
| iPhone SE | 320px | High — smallest common viewport |
| Samsung Galaxy S21 | 360px | High — common Android |
| iPhone 12/13/14 | 390px | High — most common iPhone |
| iPhone 14 Pro Max | 430px | Medium |
| iPad Mini | 768px | High — tablet breakpoint edge |
| iPad | 810px | Medium |

### Browser Targets

- Safari (iOS 15+)
- Chrome (Android 10+, Desktop)
- Firefox (Desktop)
- Edge (Desktop)

---

## 3. Recommended Stack & Rationale

**No stack changes required.** This is remediation work on an existing Astro + Tailwind CSS website.

| Technology | Current | Change Required |
|------------|---------|-----------------|
| Framework | Astro | None |
| Styling | Tailwind CSS + Custom CSS | Minor additions only |
| Animations | GSAP | Optimize loading strategy |
| Build | Astro build | None |

---

## 4. Goals

1. **Zero horizontal overflow** on all production pages across target viewports (320px–810px)
2. **WCAG 2.1 AA compliance** for touch targets (minimum 44×44px on all interactive elements)
3. **Consistent viewport behavior** across all pages using standardized meta tags
4. **Responsive images** that don't cause layout shifts or overflow
5. **Maintained visual design** — all fixes must preserve the existing look and feel

---

## 5. User Stories & Personas

### Primary Persona: Mobile Visitor

> As a **potential DTP client browsing on my phone**, I want the website to be fully usable without horizontal scrolling or tiny tap targets, so that I can easily learn about DTP's services and contact them.

### Secondary Persona: Tablet User

> As a **business decision-maker reviewing DTP on my iPad**, I want layouts to adapt gracefully to my screen size, so that content is readable and navigation is intuitive.

---

## 6. Functional Requirements

### 6.1 Viewport & Layout (High Priority)

| ID | Requirement | Source |
|----|-------------|--------|
| **FR-1.1** | Standardize viewport meta tag to `width=device-width, initial-scale=1.0` in `Layout.astro` | Audit §1.1 |
| **FR-1.2** | Add mobile breakpoint to `DevelopmentJourney.astro` minimal variant to stack vertically at ≤768px | Audit §1.2 |
| **FR-1.3** | Add intermediate breakpoint to `BentoGrid.astro` at 1024px for tablet optimization | Audit §1.2 |

### 6.2 Touch Targets (Medium Priority)

| ID | Requirement | Source |
|----|-------------|--------|
| **FR-2.1** | Increase Header hamburger button tap area to minimum 44×44px | Audit §3.2 |
| **FR-2.2** | Increase Header nav links vertical padding to ensure 44px minimum height | Audit §3.2 |
| **FR-2.3** | Increase CommandPalette close button to 44×44px | Audit §3.2 |
| **FR-2.4** | Increase news tag filter button padding to minimum `.75rem 1rem` with `min-height: 44px` | Audit §3.2 |
| **FR-2.5** | Review and increase `faq.astro` details/summary tap targets | Audit §3.2 |

### 6.3 Images (Medium Priority)

| ID | Requirement | Source |
|----|-------------|--------|
| **FR-3.1** | Add global responsive image rule `img { max-width: 100%; height: auto; }` to `v2-design-system.css` | Audit §4.1 |
| **FR-3.2** | Implement `srcset`/`sizes` attributes for key hero and content images | Audit §4.4 |

### 6.4 Forms & Modals (Low Priority)

| ID | Requirement | Source |
|----|-------------|--------|
| **FR-4.1** | Change CommandPalette search input to `type="search"` | Audit §5.1 |
| **FR-4.2** | Optimize CommandPalette modal for small screens (keyboard handling, spacing) | Audit §5.3 |

### 6.5 Performance (Medium Priority)

| ID | Requirement | Source |
|----|-------------|--------|
| **FR-5.1** | Implement lazy-loading strategy for GSAP on homepage | Audit §6.1 |
| **FR-5.2** | Replace `getBoundingClientRect()` scroll handler with Intersection Observer API or throttle | Audit §6.3 |

### 6.6 Typography & Spacing (Low Priority)

| ID | Requirement | Source |
|----|-------------|--------|
| **FR-6.1** | Convert `h3` from fixed `1.15rem` to `clamp()` for responsive scaling | Audit §2.2 |
| **FR-6.2** | Increase gap between news tag buttons for touch-friendly spacing | Audit §7.1 |

---

## 7. Acceptance Criteria & Test Strategy

### 7.1 Acceptance Criteria

| ID | Criteria | Validation Method |
|----|----------|-------------------|
| **AC-1** | All pages render without horizontal scrollbar on viewports 320px–810px | Visual testing + automated viewport test |
| **AC-2** | All interactive elements (buttons, links, form inputs) have minimum 44×44px tap area | CSS inspection + automated accessibility audit |
| **AC-3** | Viewport meta tag is consistent (`width=device-width, initial-scale=1.0`) across all layouts | Code review |
| **AC-4** | `DevelopmentJourney.astro` displays as single column on mobile (≤768px) | Visual testing |
| **AC-5** | `BentoGrid.astro` displays appropriately on tablets (769px–1024px) | Visual testing |
| **AC-6** | Images do not overflow their containers on any viewport | Visual testing |
| **AC-7** | No visual design changes — colors, typography, spacing ratios, and component appearance remain identical | Visual regression testing |

### 7.2 Test Strategy

| Test Type | Scope | Tools |
|-----------|-------|-------|
| **Unit Tests** | CSS breakpoint logic, clamp() calculations | N/A (CSS-only changes) |
| **Visual Regression** | All production pages at 320px, 390px, 768px, 810px | Percy, Playwright screenshots, or manual comparison |
| **Accessibility Audit** | Touch target sizes, WCAG compliance | axe-core, Lighthouse |
| **Device Testing** | Real device validation | BrowserStack or physical devices |
| **Performance** | GSAP loading impact, scroll handler performance | Lighthouse, Chrome DevTools |

### 7.3 Test-First Approach

Before implementing each fix:
1. Create a visual baseline screenshot at affected viewports
2. Document the current failing state (e.g., horizontal overflow present)
3. Implement the fix
4. Capture new screenshot and compare
5. Verify no visual design changes beyond the fix

---

## 8. Definition of Done

- [ ] All acceptance criteria (AC-1 through AC-7) pass
- [ ] No horizontal overflow on any page at 320px, 360px, 390px, 430px, 768px, 810px viewports
- [ ] All interactive elements meet 44×44px minimum tap area
- [ ] Lighthouse accessibility score ≥90 on all production pages
- [ ] Visual regression tests confirm no unintended design changes
- [ ] Code changes pass linting and type-checking
- [ ] Build completes successfully
- [ ] Changes deployed to staging and verified on real devices

---

## 9. Non-Goals (Out of Scope)

1. **Visual design changes** — This remediation must preserve the existing look and feel
2. **New features or components** — Only fixing existing compliance issues
3. **Content changes** — No copy or content updates
4. **Build-time optimizations** — Bundle size, image format conversion (WebP/AVIF) are separate initiatives
5. **Design variant pages** — `design-v1.astro` through `design-v5.astro` are experimental and excluded
6. **Placeholder pages** — `pricing.astro` and `testimonials.astro` are minimal placeholders
7. **Third-party integrations** — Microsoft Bookings iframe, Google Maps embed responsiveness
8. **Native app development** — iOS/Android native apps are not in scope

---

## 10. Design Considerations

### Constraint: Preserve Visual Design

All fixes must be **invisible to users** on desktop viewports. Changes should only affect:
- Mobile/tablet breakpoint behavior
- Touch target hit areas (can use transparent padding)
- CSS properties that don't alter visual appearance

### Responsive Patterns to Use

| Pattern | Use Case |
|---------|----------|
| `@media (max-width: 768px)` | Primary mobile breakpoint |
| `@media (max-width: 1024px)` | Tablet intermediate breakpoint |
| `min-height: 44px; min-width: 44px` | Touch target enforcement |
| `clamp(min, preferred, max)` | Fluid typography |
| `max-width: 100%; height: auto` | Responsive images |

---

## 11. Technical Considerations

### Files to Modify

| File | Changes |
|------|---------|
| `src/layouts/Layout.astro` | Add `initial-scale=1.0` to viewport meta |
| `src/components/DevelopmentJourney.astro` | Add mobile breakpoint for vertical stacking |
| `src/components/BentoGrid.astro` | Add tablet breakpoint |
| `src/components/Header.astro` | Increase hamburger and nav link tap areas |
| `src/components/CommandPalette.astro` | Increase close button size, change input type |
| `src/pages/news/index.astro` | Increase tag button padding and spacing |
| `src/pages/faq.astro` | Increase details/summary tap targets |
| `src/pages/index.astro` | Optimize GSAP loading, scroll handler |
| `public/styles/v2-design-system.css` | Add global responsive image rule, h3 clamp() |

### Dependencies

- No new dependencies required
- GSAP optimization may involve dynamic imports (already supported by Astro)

### Risks

| Risk | Mitigation |
|------|------------|
| CSS changes affect desktop layout | Test at all breakpoints; use mobile-only media queries |
| Touch target changes affect visual spacing | Use transparent padding or pseudo-elements for hit areas |
| GSAP lazy-loading causes animation flash | Implement loading state or preload critical animations |

---

## 12. Implementation Notes (Non-binding)

### Suggested Implementation Order

1. **Phase 1: Critical Fixes (High Priority)**
   - FR-1.1: Viewport meta tag (5 min)
   - FR-1.2: DevelopmentJourney mobile breakpoint (30 min)
   - FR-3.1: Global responsive image rule (5 min)

2. **Phase 2: Touch Targets (Medium Priority)**
   - FR-2.1–FR-2.5: All touch target fixes (2 hours)

3. **Phase 3: Layout Optimization (Medium Priority)**
   - FR-1.3: BentoGrid tablet breakpoint (30 min)
   - FR-3.2: Responsive images with srcset (1 hour)

4. **Phase 4: Performance (Medium Priority)**
   - FR-5.1: GSAP lazy-loading (1 hour)
   - FR-5.2: Scroll handler optimization (30 min)

5. **Phase 5: Polish (Low Priority)**
   - FR-4.1–FR-4.2: CommandPalette optimizations (30 min)
   - FR-6.1–FR-6.2: Typography and spacing (30 min)

### Edge Cases

- **DevelopmentJourney**: Ensure icon animations still work in vertical layout
- **BentoGrid**: Test grid item order when collapsing columns
- **Touch targets**: Verify increased tap areas don't overlap adjacent elements
- **GSAP**: Handle case where JavaScript is disabled or fails to load

### Code Patterns

**Touch target with transparent padding:**
```css
.touch-target {
  position: relative;
}
.touch-target::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 44px;
}
```

**Mobile-only breakpoint:**
```css
@media (max-width: 768px) {
  .grid-3-col {
    grid-template-columns: 1fr;
  }
}
```

---

## 13. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Horizontal overflow issues | 0 | Automated viewport testing |
| Touch target violations | 0 | axe-core accessibility audit |
| Lighthouse Accessibility Score | ≥90 | Lighthouse CI |
| Mobile usability errors (Google Search Console) | 0 | GSC report |
| Visual regression failures | 0 | Percy/Playwright comparison |

---

## 14. Open Questions

1. **GSAP animations**: Should we implement a reduced-motion media query for users who prefer reduced motion?
2. **Image optimization**: Is there a preferred CDN or image service for responsive image delivery?
3. **Testing infrastructure**: Is BrowserStack or similar available for real device testing?
4. **CI/CD integration**: Should visual regression tests be added to the deployment pipeline?

---

## 15. Appendix: Source Notes

### Source File
- `@/company-website/docs/MOBILE_COMPLIANCE_AUDIT.md`

### Key Facts Extracted

| Section | Key Finding |
|---------|-------------|
| Executive Summary | Partial mobile compliance; 4 critical, 4 moderate, 3 minor issues |
| §1.1 Viewport | `Layout.astro` missing `initial-scale=1.0` |
| §1.2 Layout | `DevelopmentJourney.astro` 3-column grid has no mobile breakpoint |
| §3.2 Touch Targets | Multiple elements below WCAG 44×44px minimum |
| §4.1 Images | No global responsive image rule |
| §6.1 Performance | GSAP loaded on homepage may impact mobile performance |

### Breakpoints in Use

| Breakpoint | Current Usage |
|------------|---------------|
| 1023px | Header mobile menu trigger |
| 980px | News sidebar collapse |
| 968px | Services split-hero collapse |
| 768px | Primary mobile breakpoint |
| 720px | News grid collapse |
| 640px | CTA banner adjustments |

---

*PRD generated from Mobile Compliance Audit. Visual testing on actual devices is recommended to validate all fixes.*
