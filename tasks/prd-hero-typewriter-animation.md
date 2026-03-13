# PRD: Hero Typewriter Animation Feature

## 1. Overview

Implement a sequential typewriter animation effect for the hero section of the DTP website homepage. This feature creates a dynamic and engaging first impression by progressively revealing the hero text content through a typewriter effect, reinforcing the technical/developer-focused brand identity while maintaining premium UX standards.

**Problem Statement:** The current hero section displays text statically, missing an opportunity to create engagement and draw attention to the core messaging during the critical first moments of page load.

**Solution:** Implement a two-phase typewriter animation: (1) auto-play tag line on page load, (2) scroll-triggered headline animation with a continuously blinking cursor, all built with accessibility and performance as first-class concerns.

---

## 2. Platforms & Release Targets

**In Scope:**
- **PWA (Web):** Desktop and mobile browsers
- **Target Browsers:** Chrome, Firefox, Safari, Edge (modern versions with ES6+ support)
- **Mobile Web:** iOS Safari, Chrome Mobile, Samsung Internet
- **Responsive:** Must work seamlessly across all viewport sizes (320px - 2560px+)

**Accessibility Targets:**
- WCAG 2.1 Level AA compliance
- Screen reader compatibility (VoiceOver, NVDA, JAWS)
- Keyboard navigation support
- Respects `prefers-reduced-motion` user preference

---

## 3. Recommended Stack & Rationale

### Primary Recommendation: Astro + Vanilla JavaScript

**Stack Components:**
- **Framework:** Astro (existing site framework)
- **Animation Logic:** Vanilla JavaScript (no external libraries)
- **Component Structure:** Reusable Astro component with inline `<script>`
- **Styling:** CSS with existing design system variables
- **Testing:** Playwright for E2E animation verification

**Rationale:**
1. **Consistency:** Matches existing site architecture (Astro-based)
2. **Performance:** Vanilla JS keeps bundle size minimal (~2KB for typewriter logic)
3. **Maintainability:** Self-contained component follows existing pattern (see `DevelopmentJourney.astro`, `ScrollProgress.astro`)
4. **No Dependencies:** Avoids adding external animation libraries (GSAP already available but overkill for this)
5. **Accessibility:** Full control over DOM manipulation for screen reader optimization

**Trade-offs:**
- ✅ Zero additional dependencies
- ✅ Predictable performance characteristics
- ✅ Easy to test and debug
- ⚠️ Manual animation timing management (acceptable for simple typewriter effect)

**Alternatives Considered:**
- **GSAP:** Already in `package.json` but adds unnecessary complexity for character-by-character typing
- **CSS-only animations:** Cannot achieve character-by-character reveal with scroll trigger logic

---

## 4. Goals

1. **Engagement:** Increase time-on-page and scroll depth by creating visual interest in hero section
2. **Brand Reinforcement:** Strengthen technical/developer identity through code-like animation aesthetic
3. **Performance:** Maintain Lighthouse score >90 (currently 95+ on mobile)
4. **Accessibility:** Ensure animation enhances rather than hinders usability for all users
5. **Reusability:** Create component pattern that can be applied to other pages if needed

---

## 5. User Stories & Personas

### Primary Persona: Technical Decision Maker
**As a** CTO or Engineering Lead visiting the DTP website  
**I want to** see dynamic, technically-sophisticated UI elements  
**So that** I feel confident DTP understands modern development practices

### Secondary Persona: Screen Reader User
**As a** visually impaired user navigating with a screen reader  
**I want to** access the hero content immediately without waiting for animations  
**So that** I can efficiently understand the site's value proposition

### Tertiary Persona: Motion-Sensitive User
**As a** user who experiences motion sensitivity  
**I want** animations to be disabled when I've set `prefers-reduced-motion`  
**So that** I can browse comfortably without triggering discomfort

---

## 6. Functional Requirements

### 6.1 Component Structure
- **FR-1.1:** Create reusable `HeroTypewriter.astro` component in `/src/components/`
- **FR-1.2:** Component accepts props: `tagText`, `headlineText`, `typingSpeed`, `startDelay`
- **FR-1.3:** Component exports default styles and inline script for self-contained functionality

### 6.2 Tag Line Animation (Phase 1)
- **FR-2.1:** Tag line text (`> digital_technology_partner.init()`) must type out character-by-character
- **FR-2.2:** Animation starts automatically 500ms after page load
- **FR-2.3:** Character typing speed: 120ms per character (configurable via prop)
- **FR-2.4:** No cursor displayed during tag line typing

### 6.3 Headline Animation (Phase 2)
- **FR-3.1:** Headline text (`AI that works.`) remains invisible until scroll trigger
- **FR-3.2:** Animation triggers on first scroll event (any scroll movement >0px)
- **FR-3.3:** Character typing speed: 120ms per character
- **FR-3.4:** Animation runs only once per page session (no re-triggering on subsequent scrolls)
- **FR-3.5:** Scroll listener must be removed after first trigger (performance optimization)

### 6.4 Blinking Cursor
- **FR-4.1:** Pipe character `|` displayed at end of headline
- **FR-4.2:** Cursor color: mint green (`#00E5A0` / `var(--ma-mint)`)
- **FR-4.3:** Blink cycle: 1 second (0.5s visible, 0.5s invisible)
- **FR-4.4:** Animation type: `step-end` (hard cut, no fade)
- **FR-4.5:** Cursor blinks indefinitely after headline animation completes

### 6.5 Accessibility Features
- **FR-5.1:** Full text content available in DOM immediately (not generated by JS)
- **FR-5.2:** Use `aria-live="polite"` for typewriter containers
- **FR-5.3:** Detect `prefers-reduced-motion` and skip animations if enabled
- **FR-5.4:** Provide visually-hidden skip link for screen reader users
- **FR-5.5:** Ensure keyboard focus order remains logical during animations

### 6.6 Performance Requirements
- **FR-6.1:** Total JavaScript payload <3KB (minified)
- **FR-6.2:** No layout shift (CLS = 0) during animations
- **FR-6.3:** Use `requestAnimationFrame` for smooth rendering
- **FR-6.4:** Cleanup all event listeners and timers on component unmount

---

## 7. Acceptance Criteria & Test Strategy

### Test-Driven Development Approach
All tests must be written **before** implementation using Playwright for E2E verification.

### AC-1: Tag Line Typewriter (Auto-play)
**Given** a user loads the homepage  
**When** the page finishes loading  
**Then** the tag line should:
- Start typing after 500ms delay
- Display characters sequentially at 120ms intervals
- Complete typing "> digital_technology_partner.init()" in ~4.3 seconds
- Not display a cursor

**Test Strategy:**
```typescript
// tests/hero-typewriter.spec.ts
test('tag line types out on page load', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(500);
  
  const tagElement = page.locator('.typewriter-tag');
  await expect(tagElement).toBeVisible();
  
  // Check progressive reveal
  await page.waitForTimeout(1000);
  const partialText = await tagElement.textContent();
  expect(partialText.length).toBeGreaterThan(0);
  expect(partialText.length).toBeLessThan(37);
  
  // Check completion
  await page.waitForTimeout(5000);
  await expect(tagElement).toHaveText('> digital_technology_partner.init()');
});
```

### AC-2: Headline Scroll Trigger
**Given** the tag line has finished typing  
**When** the user scrolls the page (any amount)  
**Then** the headline should:
- Begin typing "AI that works."
- Complete in ~1.7 seconds (14 chars × 120ms)
- Only animate once (not on subsequent scrolls)

**Test Strategy:**
```typescript
test('headline types on first scroll only', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(5000); // Wait for tag line
  
  const headline = page.locator('.typewriter-headline');
  await expect(headline).toHaveText(''); // Initially empty
  
  // Trigger scroll
  await page.mouse.wheel(0, 100);
  await page.waitForTimeout(500);
  
  const partialText = await headline.textContent();
  expect(partialText.length).toBeGreaterThan(0);
  
  // Wait for completion
  await page.waitForTimeout(2000);
  await expect(headline).toHaveText('AI that works.');
  
  // Verify no re-trigger on second scroll
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.wheel(0, 200);
  await page.waitForTimeout(500);
  await expect(headline).toHaveText('AI that works.'); // Unchanged
});
```

### AC-3: Blinking Cursor
**Given** the headline animation has completed  
**When** observing the cursor element  
**Then** it should:
- Display in mint green color (#00E5A0)
- Blink with 1s cycle (0.5s on, 0.5s off)
- Continue blinking indefinitely

**Test Strategy:**
```typescript
test('cursor blinks continuously after headline completes', async ({ page }) => {
  await page.goto('/');
  await page.mouse.wheel(0, 100);
  await page.waitForTimeout(7000); // Wait for both animations
  
  const cursor = page.locator('.ma-cursor');
  
  // Check color
  const color = await cursor.evaluate(el => 
    window.getComputedStyle(el).color
  );
  expect(color).toBe('rgb(0, 229, 160)'); // #00E5A0
  
  // Check blink animation
  const opacity1 = await cursor.evaluate(el => 
    window.getComputedStyle(el).opacity
  );
  await page.waitForTimeout(500);
  const opacity2 = await cursor.evaluate(el => 
    window.getComputedStyle(el).opacity
  );
  expect(opacity1).not.toBe(opacity2); // Should toggle
});
```

### AC-4: Accessibility - Reduced Motion
**Given** a user has `prefers-reduced-motion: reduce` enabled  
**When** they load the page  
**Then** all text should appear immediately without animation

**Test Strategy:**
```typescript
test('respects prefers-reduced-motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  
  const tag = page.locator('.typewriter-tag');
  const headline = page.locator('.typewriter-headline');
  
  // Text should appear immediately
  await expect(tag).toHaveText('> digital_technology_partner.init()');
  await expect(headline).toHaveText('AI that works.');
});
```

### AC-5: Accessibility - Screen Reader
**Given** a screen reader user navigates to the page  
**When** the page loads  
**Then** the full text content should be available immediately in the DOM

**Test Strategy:**
```typescript
test('full text available in DOM for screen readers', async ({ page }) => {
  await page.goto('/');
  
  // Check aria-live regions exist
  const tagLive = page.locator('.typewriter-tag[aria-live="polite"]');
  const headlineLive = page.locator('.typewriter-headline[aria-live="polite"]');
  
  await expect(tagLive).toBeAttached();
  await expect(headlineLive).toBeAttached();
  
  // Verify text content is in DOM (even if visually hidden during animation)
  const tagData = await tagLive.getAttribute('data-text');
  const headlineData = await headlineLive.getAttribute('data-text');
  
  expect(tagData).toBe('> digital_technology_partner.init()');
  expect(headlineData).toBe('AI that works.');
});
```

### AC-6: Performance - No Layout Shift
**Given** animations are running  
**When** measuring Cumulative Layout Shift  
**Then** CLS should remain 0 (no layout shift)

**Test Strategy:**
```typescript
test('animations cause no layout shift', async ({ page }) => {
  await page.goto('/');
  
  const cls = await page.evaluate(() => {
    return new Promise((resolve) => {
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
      
      setTimeout(() => resolve(clsValue), 8000);
    });
  });
  
  expect(cls).toBe(0);
});
```

### AC-7: Cross-Browser Compatibility
**Given** the feature is deployed  
**When** tested across target browsers  
**Then** animations should work consistently

**Test Strategy:**
- Run Playwright tests with `@playwright/test` projects for chromium, firefox, webkit
- Manual testing on iOS Safari (real device)
- Manual testing on Chrome Mobile (real device)

---

## 8. Definition of Done

### Mandatory Checklist
- [ ] `HeroTypewriter.astro` component created in `/src/components/`
- [ ] Component integrated into `/src/pages/index.astro`
- [ ] All 7 Playwright test suites pass (AC-1 through AC-7)
- [ ] `npm run build` completes without errors
- [ ] `npm run type-check` passes with no TypeScript errors
- [ ] `npm run lint` passes with no ESLint warnings
- [ ] Lighthouse performance score remains >90 (mobile)
- [ ] Lighthouse accessibility score remains 100
- [ ] Manual testing completed on iOS Safari and Chrome Mobile
- [ ] Code review completed by team lead
- [ ] Documentation updated in component file (JSDoc comments)

### Validation Commands
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build

# Test suite
npx playwright test tests/hero-typewriter.spec.ts

# Performance audit
npx lighthouse http://localhost:4321 --only-categories=performance,accessibility --view
```

---

## 9. Non-Goals (Out of Scope)

**Explicitly NOT included in this feature:**
- ❌ Typewriter effects on other pages (services, about, etc.)
- ❌ Customizable typing speed via user settings/preferences
- ❌ Sound effects for typing (audio feedback)
- ❌ Multiple headline variations with rotation
- ❌ Pause/resume controls for animations
- ❌ Analytics tracking of animation completion rates
- ❌ A/B testing infrastructure for animation variants
- ❌ Animated cursor styles beyond blinking (e.g., underscore, block)
- ❌ Typewriter effect for hero subheading or CTA buttons

---

## 10. Design Considerations

### Visual Design
- **Typography:** Maintain existing hero font stack and sizing
- **Color Palette:** 
  - Tag line: Existing text color (likely white/light gray)
  - Headline: Existing h1 color
  - Cursor: Mint green (`#00E5A0` / `var(--ma-mint)`)
- **Spacing:** No changes to existing hero layout or spacing
- **Animation Easing:** Linear for character reveal (typewriter aesthetic)

### UX Principles
1. **Progressive Disclosure:** Reveal content in logical order (tag → headline)
2. **User Control:** Respect motion preferences, don't block interaction
3. **Performance Budget:** <3KB JS, <100ms to interactive
4. **Feedback:** Cursor provides visual feedback that animation is "alive"

### Mobile Considerations
- Same animation timing on mobile (don't speed up for perceived performance)
- Ensure touch scrolling triggers headline animation reliably
- Test on slow 3G connection to verify animation doesn't block page usability

---

## 11. Technical Considerations

### Architecture
```
/src/components/HeroTypewriter.astro
├── Props interface (tagText, headlineText, typingSpeed, startDelay)
├── HTML structure (semantic markup with ARIA attributes)
├── CSS styles (scoped, uses design system variables)
└── <script> tag (vanilla JS, self-contained logic)
```

### Integration Points
- **Homepage:** `/src/pages/index.astro` imports and uses component
- **Design System:** Uses existing CSS variables (`--ma-mint`, font stacks)
- **Layout:** Fits within existing `.ma-hero-content` container
- **Other Pages:** Component can be imported but not used yet (future enhancement)

### Dependencies
- **Zero new dependencies** (uses existing Astro, Playwright)
- **Browser APIs:** `window.scrollY`, `requestAnimationFrame`, `matchMedia`

### Performance Optimizations
1. **Debouncing:** Not needed (scroll listener removed after first trigger)
2. **RAF:** Use `requestAnimationFrame` for character reveals
3. **Cleanup:** Remove event listeners in component cleanup phase
4. **Lazy Execution:** Defer script execution until DOMContentLoaded

### Security Considerations
- **XSS Prevention:** Text content passed as props, not innerHTML
- **CSP Compliance:** Inline script uses nonce if CSP headers present
- **No External Resources:** All code self-contained, no CDN dependencies

---

## 12. Implementation Notes (Non-binding)

### Suggested Component Structure
```astro
---
// HeroTypewriter.astro
interface Props {
  tagText: string;
  headlineText: string;
  typingSpeed?: number; // default 120ms
  startDelay?: number; // default 500ms
}

const { 
  tagText, 
  headlineText, 
  typingSpeed = 120, 
  startDelay = 500 
} = Astro.props;
---

<div class="hero-typewriter">
  <div class="ma-hero-tag" aria-live="polite" data-text={tagText}>
    <span class="typewriter-tag"></span>
  </div>
  <h1 aria-live="polite" data-text={headlineText}>
    <span class="typewriter-headline"></span>
    <span class="ma-cursor">|</span>
  </h1>
</div>

<style>
  /* Scoped styles */
  .ma-cursor {
    display: inline;
    color: var(--ma-mint, #00E5A0);
    font-weight: 400;
    animation: blink 1s step-end infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .typewriter-tag::before,
    .typewriter-headline::before {
      content: attr(data-text);
    }
    .ma-cursor {
      animation: none;
    }
  }
</style>

<script>
  // Vanilla JS typewriter logic
  // - Check prefers-reduced-motion
  // - Implement typewriter function
  // - Set up scroll listener
  // - Clean up on unmount
</script>
```

### Edge Cases to Handle
1. **Fast Scrollers:** User scrolls before tag line completes → headline should still wait for scroll
2. **Slow Networks:** Page loads slowly → ensure animations don't start before DOM ready
3. **Browser Back Button:** User navigates back → animations should replay (new page load)
4. **Mid-Animation Scroll:** User scrolls during tag line → headline should queue, not interrupt
5. **Zero Height Viewport:** Mobile landscape mode → ensure text remains visible

### Sequencing Recommendation
1. Write Playwright test suite first (TDD approach)
2. Create component skeleton with props and HTML structure
3. Implement CSS (cursor blink, reduced motion styles)
4. Implement tag line typewriter logic
5. Implement scroll detection and headline typewriter
6. Add accessibility attributes and screen reader support
7. Run tests, iterate until all pass
8. Integrate into homepage
9. Manual cross-browser testing
10. Performance audit and optimization

---

## 13. Success Metrics

### Quantitative Metrics
- **Performance:** Lighthouse performance score remains ≥90 (mobile)
- **Accessibility:** Lighthouse accessibility score remains 100
- **Bundle Size:** Total JS for feature <3KB (minified)
- **Animation Timing:** Tag line completes in 4.3s ± 0.2s
- **Test Coverage:** 100% of acceptance criteria covered by automated tests

### Qualitative Metrics
- **User Feedback:** Positive sentiment in user testing sessions
- **Brand Perception:** Reinforces "technical sophistication" brand attribute
- **Usability:** No increase in bounce rate or decrease in scroll depth

### Monitoring
- Track via Google Analytics custom events (optional future enhancement):
  - `typewriter_tag_complete`
  - `typewriter_headline_triggered`
  - `typewriter_headline_complete`

---

## 14. Open Questions

1. **Animation Timing:** Should typing speed be faster on mobile for perceived performance? (Recommendation: No, keep consistent)
2. **Cursor Style:** Should cursor be underscore `_` instead of pipe `|`? (Recommendation: Pipe matches brief)
3. **Replay Mechanism:** Should there be a way to replay animations without page reload? (Recommendation: No, out of scope)
4. **Other Pages:** Should this component be used on services/about pages? (Recommendation: Not in this phase)
5. **Analytics:** Should we track animation completion rates? (Recommendation: Yes, but as future enhancement)

---

## 15. Appendix: Source Notes

### Context Files Used
- **`tasks/hero-typewriter-animation-brief.md`:** Primary source for functional requirements, timing specifications, and acceptance criteria
- **`company-website/src/pages/index.astro`:** Existing hero section structure, CSS class names, and integration context
- **`company-website/package.json`:** Confirmed Astro version (5.13.2), Playwright availability, and existing dependencies (GSAP, Lenis)

### Key Facts Extracted
- Existing hero uses `.ma-hero-tag` and `.ma-cursor` classes
- Site already has Playwright configured for testing
- Design system uses `--ma-mint` CSS variable for accent color
- Component pattern exists (see `DevelopmentJourney.astro`, `ScrollProgress.astro`)
- Site uses Astro 5.x with TypeScript support

---

## Document Metadata
- **Version:** 1.0
- **Created:** 2026-03-13
- **Author:** Cascade AI (via /create-prd workflow)
- **Status:** Ready for Development
- **Estimated Effort:** 8-12 hours (including TDD test writing)
