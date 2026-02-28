// src/scripts/animations/section-headers.ts
// Section headers - tag and title reveal animations

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils';

export function initSectionHeadersAnimations(): void {
  if (prefersReducedMotion()) return;

  console.log('🎯 Initializing section headers animations');

  const headers = document.querySelectorAll('.ma-section-header');
  
  headers.forEach((header) => {
    const tag = header.querySelector('.ma-section-tag') as HTMLElement;
    const title = header.querySelector('h2') as HTMLElement;

    // Set initial states
    if (tag) gsap.set(tag, { opacity: 0, x: -20 });
    if (title) gsap.set(title, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: header,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        // Tag slides in from left
        if (tag) {
          tl.to(tag, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        }

        // Title fades up
        if (title) {
          tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          }, '-=0.3');
        }
      },
    });
  });

  console.log('✅ Section headers animations initialized');
}
