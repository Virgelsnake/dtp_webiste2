# Animation Briefing: DTP Homepage Enhancement
## Creative Direction for GSAP + Lenis Integration

**Date:** 28 February 2026  
**Branch:** `news` (auto-deploy)  
**Objective:** Elevate the DTP homepage with premium scroll animations and interactions

---

## Current State Analysis

### What's Already Working:
- ✅ Gradient mesh backgrounds with CSS animation
- ✅ Scan line effect in hero
- ✅ Stats counter animation on scroll
- ✅ Scroll-triggered process section (5 steps)
- ✅ Hover effects on cards
- ✅ Dark theme with mint accents

### What's Missing (Opportunities):
- ❌ No smooth scroll (native browser scroll feels jarring)
- ❌ Scroll-linked animations are basic CSS-only
- ❌ No parallax effects
- ❌ No text reveal animations
- ❌ No staggered entrance animations
- ❌ No magnetic/interactive cursor effects

---

## Creative Vision: "Digital Fluidity"

The DTP brand is about "AI that works, simplified." The animations should reflect:
- **Precision** - Clean, calculated movements
- **Fluidity** - Smooth transitions, no jank
- **Intelligence** - Context-aware, responsive interactions
- **Premium** - High-end agency feel

**Mood Keywords:** Sleek, kinetic, purposeful, futuristic-but-grounded

---

## Animation Opportunities by Section

### 1. HERO SECTION
**Current:** Static with scan line and counter animation

**Enhancements:**
- **Smooth scroll** (Lenis) - Immediate quality boost
- **Text reveal animation** - Hero headline characters stagger in
- **Parallax mesh** - Background moves slower than foreground
- **Magnetic buttons** - CTAs follow cursor slightly
- **Cursor glow** - Subtle glow follows mouse

**Technical:**
- GSAP SplitText for headline reveal
- GSAP Parallax on mesh background
- Custom cursor with blend mode

---

### 2. BENEFITS SECTION
**Current:** 6 cards, hover lift effect

**Enhancements:**
- **Scroll-triggered stagger** - Cards fade in + slide up sequentially
- **Card line animation** - The left border line draws on scroll
- **Counter animation** - Stats animate when in view
- **Hover expansion** - Cards slightly expand on hover

**Technical:**
- GSAP ScrollTrigger with stagger
- DrawSVG for line animation

---

### 3. TESTIMONIALS SECTION
**Current:** Static cards with hover effect

**Enhancements:**
- **Quote mark animation** - Large quote mark fades in first
- **Staggered text reveal** - Quote text reveals line by line
- **Card stack effect** - Cards appear to stack as you scroll
- **Parallax depth** - Subtle depth between cards

**Technical:**
- GSAP ScrollTrigger batch
- Text reveal with SplitText

---

### 4. USE CASES SECTION
**Current:** 3 cards with gradient mesh

**Enhancements:**
- **Number counter** - Large 01, 02, 03 count up
- **Mesh parallax** - Background mesh moves with scroll
- **Card cascade** - Cards slide in from alternating sides
- **Tag animation** - Technology tags pop in staggered

**Technical:**
- Counter animation with GSAP
- Parallax with ScrollTrigger scrub

---

### 5. PROCESS SECTION (Already has scroll logic)
**Current:** Scroll-triggered step progression

**Enhancements:**
- **Smooth step transitions** - Lenis will make this buttery
- **Progress bar fill** - Visual progress bar at top
- **Number morph** - Step numbers morph between states
- **Content fade** - Smoother content transitions

**Technical:**
- Integrate with existing scroll logic
- Add GSAP transitions between steps

---

### 6. CASE STUDIES SECTION
**Current:** Static cards

**Enhancements:**
- **Horizontal scroll section** - Scroll vertically, cards move horizontally
- **Image reveal** - Case study images reveal on scroll
- **Stack animation** - Cards stack and unstack
- **Result counter** - "Hours → Minutes" animates

**Technical:**
- GSAP horizontal scroll
- Pin section during scroll

---

### 7. FAQ SECTION
**Current:** Native details/summary

**Enhancements:**
- **Accordion animation** - Smooth height animation
- **Icon rotation** - Plus to X rotation
- **Staggered open** - Multiple items can animate

**Technical:**
- GSAP height animation
- State-based icon rotation

---

### 8. CTA SECTION
**Current:** Static centered CTA

**Enhancements:**
- **Background pulse** - Subtle gradient pulse
- **Button magnetic effect** - Stronger magnetic pull
- **Text shimmer** - Subtle shimmer on headline

**Technical:**
- CSS animation for pulse
- GSAP magnetic button

---

## Global Enhancements

### Smooth Scroll (Lenis)
**Implementation:**
```javascript
import Lenis from 'lenis';
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
```

**Why:** Immediately elevates the entire site feel

### Custom Cursor
**Style:** Ring that follows cursor, expands on hoverable elements
**Blend Mode:** `mix-blend-mode: difference` for visibility on all backgrounds

### Scroll Progress Indicator
**Style:** Thin mint line at top of viewport
**Implementation:** GSAP ScrollTrigger progress

### Page Transition
**Style:** Fade with slight scale
**Trigger:** On navigation (if using client-side routing)

---

## Technical Stack

```bash
npm install gsap lenis
```

**GSAP Plugins Needed:**
- ScrollTrigger (scroll-linked animations)
- SplitText (text reveals) - *Club GreenSock*
- DrawSVG (line animations) - *Club GreenSock*

**Alternative to Club GreenSock:**
- Use `gsap.to()` with manual text splitting for headlines
- Use CSS animations for simple line draws

---

## Performance Considerations

- Use `will-change` on animated elements
- Implement `prefers-reduced-motion` fallbacks
- Lazy load animations below the fold
- Use Intersection Observer for triggering
- Avoid animating layout properties (width, height)

---

## Success Metrics

- ✅ 60fps on all animations
- ✅ Smooth scroll feels native
- ✅ Animations enhance, not distract
- ✅ Mobile experience is smooth (reduced complexity)
- ✅ Lighthouse performance > 90

---

## Priority Order

1. **P0:** Lenis smooth scroll (biggest impact, easiest)
2. **P1:** Hero text reveal + parallax
3. **P1:** Benefits card stagger
4. **P2:** Process section enhancement
5. **P2:** Testimonials text reveal
6. **P3:** Case studies horizontal scroll
7. **P3:** Custom cursor
8. **P4:** FAQ accordion animations

---

*This briefing serves as creative direction for the PRD and task generation.*
