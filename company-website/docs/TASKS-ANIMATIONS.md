# Task List: DTP Homepage Animation Implementation

**Generated from:** `PRD-ANIMATIONS.md`  
**Date:** 28 February 2026  
**Branch:** `news`  
**Methodology:** TDD (Red-Green-Refactor)

---

## Phase 1: Foundation (Setup & Global)

### 1.1 Install Dependencies
- [ ] **1.1.1** Install GSAP and Lenis packages
  ```bash
  npm install gsap lenis
  ```
- [ ] **1.1.2** Verify packages installed correctly
- [ ] **1.1.3** Check for TypeScript types (install @types if needed)

### 1.2 Global Smooth Scroll Setup
- [ ] **1.2.1** Create `src/scripts/smooth-scroll.ts`
- [ ] **1.2.2** Implement Lenis initialization with GSAP integration
- [ ] **1.2.3** Test smooth scroll on homepage
- [ ] **1.2.4** Verify ScrollTrigger updates with Lenis scroll events
- [ ] **1.2.5** Add reduced motion check

### 1.3 Global Animation Utilities
- [ ] **1.3.1** Create `src/scripts/animations/index.ts` (entry point)
- [ ] **1.3.2** Create `src/scripts/animations/utils.ts` (shared utilities)
- [ ] **1.3.3** Implement `prefersReducedMotion()` helper
- [ ] **1.3.4** Implement `isMobile()` detection helper
- [ ] **1.3.5** Create scroll progress indicator component

### 1.4 Base Styles
- [ ] **1.4.1** Add `will-change` utility classes
- [ ] **1.4.2** Add reduced motion CSS media query
- [ ] **1.4.3** Verify no layout shift from animation containers

---

## Phase 2: Hero Section Animations

### 2.1 Hero Text Reveal
- [ ] **2.1.1** Write test: Headline should split into words
- [ ] **2.1.2** Implement text splitting utility
- [ ] **2.1.3** Write test: Words should animate in with stagger
- [ ] **2.1.4** Implement word entrance animation (translateY + opacity)
- [ ] **2.1.5** Write test: Subheadline should animate after headline
- [ ] **2.1.6** Implement subheadline delayed entrance
- [ ] **2.1.7** Test on mobile (reduce stagger)

### 2.2 Hero Buttons Entrance
- [ ] **2.2.1** Write test: Buttons should slide up and fade in
- [ ] **2.2.2** Implement button entrance with stagger
- [ ] **2.2.3** Test button hover states still work

### 2.3 Hero Mesh Parallax
- [ ] **2.3.1** Write test: Mesh background should move slower than scroll
- [ ] **2.3.2** Implement parallax with ScrollTrigger
- [ ] **2.3.3** Verify performance (60fps)

### 2.4 Stats Counter Enhancement
- [ ] **2.4.1** Write test: Stats should animate when in viewport
- [ ] **2.4.2** Refactor existing counter to use GSAP
- [ ] **2.4.3** Add easing to counter animation
- [ ] **2.4.4** Test with IntersectionObserver trigger

---

## Phase 3: Benefits Section

### 3.1 Benefits Card Stagger
- [ ] **3.1.1** Write test: Cards should animate in sequence
- [ ] **3.1.2** Implement card entrance animation
- [ ] **3.1.3** Add stagger timing (0.1s between cards)
- [ ] **3.1.4** Test ScrollTrigger start point ("top 80%")

### 3.2 Card Line Draw Animation
- [ ] **3.2.1** Write test: Left border should animate height
- [ ] **3.2.2** Implement line draw with GSAP (height 0 → 100%)
- [ ] **3.2.3** Trigger on card entrance
- [ ] **3.2.4** Test timing with card fade-in

### 3.3 Hover Enhancement
- [ ] **3.3.1** Write test: Card should scale on hover
- [ ] **3.3.2** Implement hover scale (1.02x)
- [ ] **3.3.3** Add box-shadow increase on hover
- [ ] **3.3.4** Ensure transition is smooth

---

## Phase 4: Testimonials Section

### 4.1 Quote Mark Animation
- [ ] **4.1.1** Write test: Quote mark should fade and scale in
- [ ] **4.1.2** Implement quote mark entrance
- [ ] **4.1.3** Set proper opacity (0.15)

### 4.2 Testimonial Text Reveal
- [ ] **4.2.1** Write test: Quote text should reveal line by line
- [ ] **4.2.2** Implement line-by-line text reveal
- [ ] **4.2.3** Add stagger between lines
- [ ] **4.2.4** Test with long quotes

### 4.3 Card Entrance
- [ ] **4.3.1** Write test: Cards should slide up and fade in
- [ ] **4.3.2** Implement card entrance animation
- [ ] **4.3.3** Add stagger between cards

---

## Phase 5: Use Cases Section

### 5.1 Number Counter Animation
- [ ] **5.1.1** Write test: Numbers should count up from 0
- [ ] **5.1.2** Implement counter animation (01, 02, 03)
- [ ] **5.1.3** Add easing (power2.out)
- [ ] **5.1.4** Format with leading zero

### 5.2 Card Cascade
- [ ] **5.2.1** Write test: Cards should enter from different directions
- [ ] **5.2.2** Implement alternating entrance directions
- [ ] **5.2.3** Card 1: from left, Card 2: from bottom, Card 3: from right
- [ ] **5.2.4** Test stagger timing

### 5.3 Tag Stagger
- [ ] **5.3.1** Write test: Technology tags should pop in staggered
- [ ] **5.3.2** Implement tag entrance animation
- [ ] **5.3.3** Add scale effect (0.8 → 1)

### 5.4 Mesh Parallax
- [ ] **5.4.1** Write test: Background mesh should have parallax
- [ ] **5.4.2** Implement mesh parallax (0.3x speed)
- [ ] **5.4.3** Verify doesn't interfere with content

---

## Phase 6: Process Section Enhancement

### 6.1 Content Transition Refactor
- [ ] **6.1.1** Write test: Step content should crossfade smoothly
- [ ] **6.1.2** Refactor CSS transitions to GSAP
- [ ] **6.1.3** Implement crossfade with Y offset
- [ ] **6.1.4** Test all 5 step transitions

### 6.2 Progress Bar
- [ ] **6.2.1** Write test: Progress bar should fill with scroll
- [ ] **6.2.2** Implement fixed progress bar
- [ ] **6.2.3** Width: 0% → 100% based on section scroll
- [ ] **6.2.4** Add mint gradient color

### 6.3 Enhanced Node Animation
- [ ] **6.3.1** Write test: Active node should have pulse effect
- [ ] **6.3.2** Implement subtle pulse animation
- [ ] **6.3.3** Test with existing scroll logic

---

## Phase 7: Case Studies Section

### 7.1 Horizontal Scroll Setup
- [ ] **7.1.1** Write test: Section should pin on scroll
- [ ] **7.1.2** Implement ScrollTrigger pin
- [ ] **7.1.3** Set pin duration (300vh)
- [ ] **7.1.4** Test pinning behavior

### 7.2 Horizontal Card Movement
- [ ] **7.2.1** Write test: Cards should move horizontally
- [ ] **7.2.2** Implement horizontal scroll transform
- [ ] **7.2.3** Cards move: x: 0 → x: -200vw
- [ ] **7.2.4** Test scrub timing

### 7.3 Card Reveal
- [ ] **7.3.1** Write test: Each card should reveal as it enters
- [ ] **7.3.2** Implement card reveal animation
- [ ] **7.3.3** Add opacity and transform

---

## Phase 8: FAQ Section

### 8.1 Accordion Animation
- [ ] **8.1.1** Write test: Details should expand smoothly
- [ ] **8.1.2** Implement height animation with GSAP
- [ ] **8.1.3** Handle both expand and collapse
- [ ] **8.1.4** Test with multiple items

### 8.2 Icon Rotation
- [ ] **8.2.1** Write test: Plus icon should rotate to X
- [ ] **8.2.2** Implement 45deg rotation on open
- [ ] **8.2.3** Reverse rotation on close

### 8.3 Content Fade
- [ ] **8.3.1** Write test: Answer text should fade in
- [ ] **8.3.2** Implement content fade animation
- [ ] **8.3.3** Trigger after height animation starts

---

## Phase 9: CTA Section

### 9.1 Background Pulse
- [ ] **9.1.1** Write test: Background should have subtle pulse
- [ ] **9.1.2** Implement CSS gradient pulse
- [ ] **9.1.3** Keep subtle (not distracting)

### 9.2 Text Entrance
- [ ] **9.2.1** Write test: Headline should reveal on scroll
- [ ] **9.2.2** Implement text entrance animation
- [ ] **9.2.3** Test timing with scroll position

---

## Phase 10: Testing & Optimization

### 10.1 Performance Testing
- [ ] **10.1.1** Run Lighthouse audit
- [ ] **10.1.2** Verify performance score > 90
- [ ] **10.1.3** Check FPS in Chrome DevTools
- [ ] **10.1.4** Test on low-end device

### 10.2 Cross-Browser Testing
- [ ] **10.2.1** Test in Chrome
- [ ] **10.2.2** Test in Firefox
- [ ] **10.2.3** Test in Safari
- [ ] **10.2.4** Test in Edge

### 10.3 Mobile Testing
- [ ] **10.3.1** Test on iOS Safari
- [ ] **10.3.2** Test on Android Chrome
- [ ] **10.3.3** Verify touch scrolling works
- [ ] **10.3.4** Check reduced animations on mobile

### 10.4 Accessibility Testing
- [ ] **10.4.1** Test with `prefers-reduced-motion: reduce`
- [ ] **10.4.2** Verify keyboard navigation
- [ ] **10.4.3** Test with screen reader
- [ ] **10.4.4** Check focus indicators

### 10.5 Code Review
- [ ] **10.5.1** Review all animation code
- [ ] **10.5.2** Check for memory leaks
- [ ] **10.5.3** Verify event listeners cleaned up
- [ ] **10.5.4** Ensure TypeScript types correct

---

## Phase 11: Deployment

### 11.1 Pre-Deployment
- [ ] **11.1.1** Run production build
- [ ] **11.1.2** Verify no build errors
- [ ] **11.1.3** Check bundle size (should not increase significantly)

### 11.2 Deploy
- [ ] **11.2.1** Commit all changes
- [ ] **11.2.2** Push to `news` branch
- [ ] **11.2.3** Verify Netlify build succeeds
- [ ] **11.2.4** Check deployed site

### 11.3 Post-Deployment
- [ ] **11.3.1** Run Lighthouse on deployed site
- [ ] **11.3.2** Verify all animations work in production
- [ ] **11.3.3** Check console for errors
- [ ] **11.3.4** Test on real mobile devices

---

## Definition of Done (Per Task)

- [ ] Test written (Red phase)
- [ ] Implementation complete (Green phase)
- [ ] Code refactored if needed (Refactor phase)
- [ ] Test passes
- [ ] No console errors
- [ ] 60fps maintained
- [ ] Mobile compatible

---

## Task Status Legend

- [ ] Not started
- [~] In progress
- [x] Complete
- [!] Blocked/Issue

---

*Task list generated from PRD. Follow TDD methodology: Red → Green → Refactor*
