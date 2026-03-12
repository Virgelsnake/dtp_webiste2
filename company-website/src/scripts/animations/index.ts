// src/scripts/animations/index.ts
// Main entry point for all animations

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils';
import { initSmoothScroll } from '../smooth-scroll';

// Import section animations
import { initHeroAnimations } from './hero';
import { initBenefitsAnimations } from './benefits';
import { initTestimonialsAnimations } from './testimonials';
import { initUseCasesAnimations } from './use-cases';
import { initProcessAnimations } from './process';
import { initCaseStudiesAnimations } from './case-studies';
import { initFaqAnimations } from './faq';
import { initCTAAnimations } from './cta';
import { initSectionHeadersAnimations } from './section-headers';
// NOTE: Custom cursor disabled - removed initCustomCursor import

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize all animations
 * Call this from the main page or layout
 */
export function initAnimations(): void {
  // Check for reduced motion
  if (prefersReducedMotion()) {
    console.log('ℹ️ Reduced motion enabled - skipping animations');
    // Make all elements visible
    gsap.set('[data-animate]', { opacity: 1, y: 0 });
    return;
  }

  // Initialize smooth scroll first
  initSmoothScroll();

  // Initialize section animations
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    initHeroAnimations();
    initSectionHeadersAnimations();
    initBenefitsAnimations();
    initTestimonialsAnimations();
    initUseCasesAnimations();
    initProcessAnimations();
    initCaseStudiesAnimations();
    initFaqAnimations();
    initCTAAnimations();
    // initCustomCursor(); // DISABLED: Custom cursor removed
    
    console.log('✅ All animations initialized');
  });
}

/**
 * Refresh ScrollTrigger (call after DOM changes)
 */
export function refreshAnimations(): void {
  ScrollTrigger.refresh();
}

/**
 * Kill all animations (cleanup)
 */
export function killAnimations(): void {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
}
