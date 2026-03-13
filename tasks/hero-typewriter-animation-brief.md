# Hero Typewriter Animation - Feature Brief

## Overview
Implement a sequential typewriter animation effect for the hero section of the DTP website homepage, creating a dynamic and engaging first impression for visitors.

## Current State
- Hero section contains two text elements:
  1. Tag line: `> digital_technology_partner.init()`
  2. Main headline: `AI that works.` with a pipe cursor `|`
- Both elements currently appear statically with no animation

## Desired Behavior

### Phase 1: Initial Page Load
**Element:** `.ma-hero-tag` (the `> digital_technology_partner.init()` text)
- **Trigger:** Automatically on page load
- **Animation:** Typewriter effect
  - Characters appear sequentially from left to right
  - Typing speed: ~120ms per character
  - Start delay: 500ms after page load
- **Cursor:** No cursor needed for this element

### Phase 2: Scroll-Triggered Animation
**Element:** Hero `<h1>` (the `AI that works.` text)
- **Trigger:** User begins scrolling the page (any scroll movement)
- **Animation:** Typewriter effect
  - Text: "AI that works."
  - Characters appear sequentially from left to right
  - Typing speed: ~120ms per character
  - Should only animate once (not on every scroll)

### Phase 3: Blinking Cursor
**Element:** Pipe character `|` at the end of the h1
- **Color:** Mint green (`#00E5A0` or `var(--ma-mint)` - match existing site accent color)
- **Animation:** Continuous blinking
  - Blink cycle: 1 second (1s)
  - Pattern: Visible for 0.5s, invisible for 0.5s
  - Animation type: `step-end` (hard cut, no fade)
  - Should continue blinking indefinitely after h1 typewriter completes

## Technical Requirements

### HTML Structure
```html
<!-- Tag line with typewriter -->
<div class="ma-hero-tag">
  <span class="typewriter-tag"></span>
</div>

<!-- Headline with typewriter and blinking cursor -->
<h1>
  <span class="typewriter-headline"></span>
  <span class="ma-cursor">|</span>
</h1>
```

### CSS Requirements
```css
.typewriter-tag,
.typewriter-headline {
  display: inline;
}

.ma-cursor {
  display: inline;
  color: var(--ma-mint); /* or #00E5A0 */
  font-weight: 400;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

### JavaScript Requirements
1. **Tag Typewriter Function**
   - Text content: "> digital_technology_partner.init()"
   - Target element: `.typewriter-tag`
   - Start automatically after 500ms delay
   - Character delay: 120ms

2. **Headline Typewriter Function**
   - Text content: "AI that works."
   - Target element: `.typewriter-headline`
   - Trigger: On first scroll event
   - Character delay: 120ms
   - Should only run once (use flag to prevent re-triggering)

3. **Scroll Detection**
   - Listen for `scroll` event on `window`
   - On first scroll, trigger headline typewriter
   - Remove scroll listener after first trigger (performance optimization)

## User Experience Goals
- Create a sense of progressive disclosure and engagement
- Reinforce the technical/developer-focused brand identity
- Draw attention to the hero message through animation
- Maintain performance (animations should be lightweight)
- Ensure animations don't interfere with page usability

## Acceptance Criteria
- [ ] Tag line types out automatically on page load
- [ ] Headline remains invisible until user scrolls
- [ ] Headline types out on first scroll event
- [ ] Cursor blinks continuously in mint green color
- [ ] Animations run smoothly without jank
- [ ] Typewriter only runs once per page load (no re-triggering)
- [ ] Works across modern browsers (Chrome, Firefox, Safari, Edge)
- [ ] Accessible (doesn't break screen readers or keyboard navigation)

## Notes
- Use vanilla JavaScript (no external animation libraries needed for this)
- Ensure proper cleanup of event listeners
- Consider using `requestAnimationFrame` if performance issues arise
- Test on mobile devices to ensure smooth performance
