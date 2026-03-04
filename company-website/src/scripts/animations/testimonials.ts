// src/scripts/animations/testimonials.ts
// Testimonials section - quote reveal and text animations

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils';

export function initTestimonialsAnimations(): void {
  if (prefersReducedMotion()) return;

  const section = document.querySelector('.mesh-testimonials');
  if (!section) {
    console.warn('❌ Testimonials section not found');
    return;
  }

  console.log('🎯 Initializing testimonials animations');

  const cards = section.querySelectorAll('.ma-testimonial-card');
  if (cards.length === 0) return;

  // Set initial states
  cards.forEach((card) => {
    const quoteMark = card.querySelector('.ma-quote-mark') as HTMLElement;
    const blockquote = card.querySelector('blockquote') as HTMLElement;
    const cite = card.querySelector('cite') as HTMLElement;

    if (quoteMark) gsap.set(quoteMark, { opacity: 0, scale: 0.8 });
    if (blockquote) gsap.set(blockquote, { opacity: 0, y: 20 });
    if (cite) gsap.set(cite, { opacity: 0, y: 10 });
  });

  // Create scroll trigger for each card
  cards.forEach((card, index) => {
    const quoteMark = card.querySelector('.ma-quote-mark') as HTMLElement;
    const blockquote = card.querySelector('blockquote') as HTMLElement;
    const cite = card.querySelector('cite') as HTMLElement;

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ delay: index * 0.15 });

        // Quote mark fades in with scale
        if (quoteMark) {
          tl.to(quoteMark, {
            opacity: 0.15,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
        }

        // Quote text fades in
        if (blockquote) {
          tl.to(blockquote, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          }, '-=0.3');
        }

        // Citation fades in
        if (cite) {
          tl.to(cite, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          }, '-=0.2');
        }
      },
    });
  });

  console.log('✅ Testimonials animations initialized');
}
