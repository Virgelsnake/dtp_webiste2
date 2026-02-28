# Product Requirements Document: DTP Homepage Animation Enhancement

**Document Version:** 1.0  
**Date:** 28 February 2026  
**Project:** DTP Website — News Branch Animation Implementation  
**Prepared by:** AI With Agency Development Team  

---

## 1. Overview

### 1.1 Purpose of This Document

This PRD provides a complete specification for implementing premium scroll animations and interactions on the Digital Technology Partner homepage using GSAP (GreenSock Animation Platform) and Lenis smooth scroll library.

### 1.2 Key Stakeholders

| Role | Responsibility |
|------|----------------|
| **Development Team** | Implementation of animations, performance optimization |
| **Design Director** | Animation timing, easing approval |
| **QA** | Cross-browser testing, performance validation |

---

## 2. Objectives

| # | Objective | Success Metric |
|---|-----------|----------------|
| 1 | Implement Lenis smooth scroll | 60fps, feels native |
| 2 | Add GSAP scroll-triggered animations | All sections animated |
| 3 | Enhance hero with text reveal + parallax | Text reveals smoothly, parallax at 60fps |
| 4 | Stagger benefits card entrance | Cards animate in sequence |
| 5 | Improve process section transitions | Smooth step transitions |
| 6 | Maintain Lighthouse performance > 90 | Post-implementation audit |

---

## 3. Technical Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Animation Library** | GSAP 3.12+ | Industry standard, ScrollTrigger plugin |
| **Smooth Scroll** | Lenis 1.1+ | Lightweight, 60fps, accessibility-friendly |
| **Framework** | Astro (existing) | Static site, minimal JS overhead |
| **Styling** | Tailwind CSS (existing) | Utility-first, consistent with codebase |
| **Build Tool** | Vite (existing) | Fast builds, HMR |

---

## 4. Installation Requirements

### 4.1 NPM Packages

```bash
npm install gsap lenis
```

### 4.2 GSAP Plugin Registration

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

---

## 5. Global Implementation

### 5.1 Lenis Smooth Scroll Setup

**File:** `src/scripts/smooth-scroll.ts`

```typescript
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSmoothScroll() {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: true,
  });

  // Integrate with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}
```

### 5.2 Global Scroll Progress Indicator

**Element:** Fixed top bar showing scroll progress
**Color:** Mint (#00E5A0)
**Height:** 2px
**Z-index:** 9999

---

## 6. Section-by-Section Requirements

### 6.1 HERO SECTION

#### Current State
- Gradient mesh background with CSS animation
- Scan line animation
- Stats counter on scroll
- Static text

#### Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| H1 | Text reveal animation | Headline fades in + slides up, words stagger 0.1s |
| H2 | Subtext reveal | Subheadline fades in after headline, 0.3s delay |
| H3 | Button entrance | CTAs slide up and fade in, stagger 0.1s |
| H4 | Mesh parallax | Background moves at 0.5x scroll speed |
| H5 | Stats counter enhancement | Numbers count with easing, commas added |

#### Animation Specs

**Text Reveal:**
- Duration: 0.8s
- Easing: `power3.out`
- Stagger: 0.1s per word
- Transform: `translateY(30px)` → `translateY(0)`
- Opacity: 0 → 1

**Mesh Parallax:**
- Speed: 0.5x (moves half as fast as scroll)
- Implementation: GSAP ScrollTrigger scrub

---

### 6.2 BENEFITS SECTION

#### Current State
- 6 cards in 3x2 grid
- Hover lift effect
- Left border line on hover

#### Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| B1 | Card stagger entrance | Cards fade in + slide up, 0.1s stagger |
| B2 | Line draw animation | Left border draws from top to bottom on scroll |
| B3 | Number counter | If stats present, animate counting |
| B4 | Hover enhancement | Card scales 1.02x, shadow increases |

#### Animation Specs

**Card Entrance:**
- Trigger: When section enters viewport (start: "top 80%")
- Duration: 0.6s
- Easing: `power2.out`
- Stagger: 0.1s
- Transform: `translateY(40px)` → `translateY(0)`

**Line Draw:**
- Duration: 0.8s
- Easing: `power2.inOut`
- Trigger: Per-card when in view

---

### 6.3 TESTIMONIALS SECTION

#### Current State
- 3 testimonial cards
- Quote mark decoration
- Static content

#### Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| T1 | Quote mark fade | Large quote mark fades in first |
| T2 | Text stagger reveal | Quote text reveals line by line |
| T3 | Card entrance | Cards slide in from bottom, staggered |
| T4 | Citation fade | Author citation fades in last |

#### Animation Specs

**Quote Mark:**
- Scale: 0.8 → 1
- Opacity: 0 → 0.15
- Duration: 0.6s

**Text Reveal:**
- Split by lines
- Stagger: 0.05s
- Duration: 0.5s

---

### 6.4 USE CASES SECTION

#### Current State
- 3 use case cards
- Large numbers (01, 02, 03)
- Technology tags
- Gradient mesh background

#### Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| U1 | Number counter | Numbers count up from 0 to final value |
| U2 | Card cascade | Cards slide in from alternating sides |
| U3 | Tag stagger | Technology tags pop in with stagger |
| U4 | Mesh parallax | Background moves at 0.3x scroll speed |

#### Animation Specs

**Number Counter:**
- Duration: 1.5s
- Easing: `power2.out`
- Format: Pad with leading zero

**Card Cascade:**
- Card 1: From left (`translateX(-50px)`)
- Card 2: From bottom (`translateY(50px)`)
- Card 3: From right (`translateX(50px)`)
- Stagger: 0.15s

---

### 6.5 PROCESS SECTION (ENHANCEMENT)

#### Current State
- Three-column layout
- Scroll-triggered step progression
- Step content changes on scroll

#### Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| P1 | Smooth transitions | Content transitions with GSAP instead of CSS |
| P2 | Progress bar | Visual progress bar showing section progress |
| P3 | Enhanced node animation | Active node pulses subtly |
| P4 | Content morph | Text crossfades smoothly between steps |

#### Animation Specs

**Content Transition:**
- Duration: 0.4s
- Easing: `power2.inOut`
- Crossfade with slight Y offset

**Progress Bar:**
- Height: 2px
- Color: Mint gradient
- Width: 0% → 100% based on scroll progress

---

### 6.6 CASE STUDIES SECTION

#### Current State
- 3 case study cards
- Static layout

#### Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| C1 | Horizontal scroll | Cards scroll horizontally on vertical scroll |
| C2 | Pin section | Section pins during horizontal scroll |
| C3 | Card reveal | Each card reveals as it enters viewport |
| C4 | Result highlight | "Hours → Minutes" text animates |

#### Animation Specs

**Horizontal Scroll:**
- Pin duration: 300vh
- Cards move: x: 0 → x: -200vw
- Snap to each card

---

### 6.7 FAQ SECTION

#### Current State
- Native `<details>` elements
- No animation

#### Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| F1 | Smooth expand/collapse | Height animates smoothly |
| F2 | Icon rotation | Plus rotates to X (45deg) |
| F3 | Content fade | Answer text fades in |

#### Animation Specs

**Height Animation:**
- Duration: 0.3s
- Easing: `power2.out`
- Use GSAP to animate height/max-height

---

### 6.8 CTA SECTION

#### Current State
- Static centered layout
- Single button

#### Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| CTA1 | Background pulse | Subtle gradient pulse animation |
| CTA2 | Button magnetic | Button follows cursor slightly on hover |
| CTA3 | Text entrance | Headline reveals on scroll |

---

## 7. Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Frame Rate** | 60fps | Chrome DevTools FPS meter |
| **Lighthouse Performance** | > 90 | Lighthouse CI |
| **First Contentful Paint** | < 1.5s | Lighthouse |
| **Time to Interactive** | < 3.5s | Lighthouse |
| **Reduced Motion** | Supported | `prefers-reduced-motion` media query |

### 7.1 Optimization Techniques

- Use `will-change` sparingly (add before animation, remove after)
- Use `transform` and `opacity` only (GPU accelerated)
- Lazy load ScrollTriggers below the fold
- Debounce resize events
- Use Intersection Observer for triggering

---

## 8. Accessibility Requirements

| ID | Requirement | Implementation |
|----|-------------|----------------|
| A1 | Reduced motion | Check `prefers-reduced-motion`, disable animations |
| A2 | Focus states | Maintain visible focus indicators |
| A3 | Screen readers | Animations don't interfere with SR navigation |
| A4 | Keyboard nav | All interactive elements keyboard accessible |

### 8.1 Reduced Motion Implementation

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Disable GSAP animations
  gsap.globalTimeline.pause();
}
```

---

## 9. Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Chrome | 90+ | ✅ Reduced complexity |
| Mobile Safari | 14+ | ✅ Reduced complexity |

---

## 10. File Structure

```
src/
├── scripts/
│   ├── smooth-scroll.ts      # Lenis initialization
│   ├── animations/
│   │   ├── hero.ts           # Hero animations
│   │   ├── benefits.ts       # Benefits section
│   │   ├── testimonials.ts   # Testimonials section
│   │   ├── use-cases.ts      # Use cases section
│   │   ├── process.ts        # Process section enhancement
│   │   ├── case-studies.ts   # Case studies horizontal scroll
│   │   ├── faq.ts            # FAQ accordion
│   │   └── cta.ts            # CTA section
│   └── index.ts              # Main animation entry point
├── components/
│   └── animations/
│       └── ScrollProgress.astro  # Progress bar component
└── pages/
    └── index.astro           # Import animation scripts
```

---

## 11. Testing Strategy

| Test Type | Scope | When |
|-----------|-------|------|
| **Performance audit** | Lighthouse, WebPageTest | Post-implementation |
| **Cross-browser** | Chrome, Firefox, Safari, Edge | Post-implementation |
| **Mobile testing** | iOS Safari, Chrome Android | Post-implementation |
| **Reduced motion** | macOS, iOS | Post-implementation |
| **FPS monitoring** | Chrome DevTools | During development |

---

## 12. Definition of Done

- [ ] Lenis smooth scroll implemented and working
- [ ] All sections have scroll-triggered animations
- [ ] Hero text reveal + parallax implemented
- [ ] Benefits cards stagger entrance working
- [ ] Process section enhanced with GSAP transitions
- [ ] Performance audit shows > 90 Lighthouse score
- [ ] Reduced motion preference respected
- [ ] Cross-browser testing passed
- [ ] Mobile experience smooth (30fps minimum)
- [ ] Code reviewed and merged to `news` branch
- [ ] Deployed and verified on staging

---

## 13. Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Performance degradation | Medium | High | Test on low-end devices, optimize early |
| Browser compatibility issues | Low | Medium | Test early, progressive enhancement |
| Accessibility concerns | Low | High | Implement reduced motion from start |
| Scope creep | Medium | Medium | Stick to PRD, additional features v2 |

---

## 14. Appendices

### Appendix A: Easing Reference

| Name | Value | Use Case |
|------|-------|----------|
| `power1.out` | `0.25, 0.46, 0.45, 0.94` | Subtle exits |
| `power2.out` | `0.215, 0.61, 0.355, 1` | Standard entrances |
| `power3.out` | `0.165, 0.84, 0.44, 1` | Dramatic entrances |
| `power4.out` | `0.23, 1, 0.32, 1` | Strong emphasis |
| `back.out` | `0.175, 0.885, 0.32, 1.275` | Playful bounce |

### Appendix B: Documentation Links

- **GSAP Docs:** https://greensock.com/docs/
- **ScrollTrigger:** https://greensock.com/scroll/
- **Lenis:** https://github.com/darkroomengineering/lenis
- **Astro Client Scripts:** https://docs.astro.build/en/guides/client-side-scripts/

---

*Document generated for implementation on `news` branch. Deploys automatically on push.*
