// src/scripts/animations/cta.ts
// CTA section - background pulse, text reveal, magnetic button

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, isMobile } from './utils';

export function initCTAAnimations(): void {
  if (prefersReducedMotion()) return;

  const section = document.querySelector('.ma-cta');
  if (!section) {
    console.warn('❌ CTA section not found');
    return;
  }

  console.log('🎯 Initializing CTA animations');

  // 1. Background pulse
  initBackgroundPulse();

  // 2. Text reveal
  initTextReveal();

  // 3. Magnetic button (desktop only)
  if (!isMobile()) {
    initMagneticButton();
  }
}

/**
 * Subtle gradient background pulse
 */
function initBackgroundPulse(): void {
  const section = document.querySelector('.ma-cta') as HTMLElement;
  if (!section) return;

  // Add subtle pulse animation to the section
  gsap.to(section, {
    backgroundPosition: '100% 50%',
    duration: 8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });

  console.log('✅ CTA background pulse initialized');
}

/**
 * Text reveal on scroll
 */
function initTextReveal(): void {
  const section = document.querySelector('.ma-cta') as HTMLElement;
  if (!section) return;

  const heading = section.querySelector('h2') as HTMLElement;
  const paragraph = section.querySelector('p') as HTMLElement;
  const button = section.querySelector('.ma-btn') as HTMLElement;

  // Set initial states
  if (heading) gsap.set(heading, { opacity: 0, y: 30 });
  if (paragraph) gsap.set(paragraph, { opacity: 0, y: 20 });
  if (button) gsap.set(button, { opacity: 0, y: 20, scale: 0.95 });

  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline();

      if (heading) {
        tl.to(heading, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      }

      if (paragraph) {
        tl.to(paragraph, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.4');
      }

      if (button) {
        tl.to(button, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.5)',
        }, '-=0.2');
      }
    },
  });

  console.log('✅ CTA text reveal initialized');
}

/**
 * Magnetic button effect
 */
function initMagneticButton(): void {
  const buttons = document.querySelectorAll('.ma-cta .ma-btn, .ma-hero-actions .ma-btn-mint');
  
  buttons.forEach((button) => {
    const btn = button as HTMLElement;
    
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Move button slightly towards cursor
      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      // Reset position
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });

  console.log('✅ Magnetic button initialized');
}
