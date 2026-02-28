// src/scripts/smooth-scroll.ts
// Lenis smooth scroll initialization with GSAP ScrollTrigger integration

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/**
 * Initialize smooth scroll with Lenis
 * Integrates with GSAP ScrollTrigger for scroll-linked animations
 */
export function initSmoothScroll(): Lenis | null {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    console.log('ℹ️ Reduced motion enabled - skipping smooth scroll');
    return null;
  }

  // Check if mobile (disable on mobile for better native feel)
  const isMobile = window.matchMedia('(pointer: coarse)').matches;
  
  if (isMobile) {
    console.log('ℹ️ Mobile detected - using native scroll');
    return null;
  }

  // Initialize Lenis
  lenisInstance = new Lenis({
    lerp: 0.1,          // Lower = smoother (0.05 - 0.1 recommended)
    smoothWheel: true,  // Smooth mouse wheel scrolling
    syncTouch: true,    // Sync with touch events
  });

  // Integrate with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Add Lenis to GSAP ticker
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  // Disable GSAP lag smoothing for better sync
  gsap.ticker.lagSmoothing(0);

  console.log('✅ Smooth scroll initialized');
  
  return lenisInstance;
}

/**
 * Get the current Lenis instance
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Scroll to a specific element or position
 */
export function scrollTo(target: string | number, options?: { offset?: number; duration?: number }): void {
  if (!lenisInstance) {
    // Fallback to native scroll
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    return;
  }

  lenisInstance.scrollTo(target, {
    offset: options?.offset || 0,
    duration: options?.duration || 1.2,
  });
}

/**
 * Destroy Lenis instance (cleanup)
 */
export function destroySmoothScroll(): void {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
    gsap.ticker.remove((time) => {
      lenisInstance?.raf(time * 1000);
    });
    console.log('✅ Smooth scroll destroyed');
  }
}
