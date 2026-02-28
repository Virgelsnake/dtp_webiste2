// src/scripts/animations/faq.ts
// FAQ section - accordion animations

import { gsap } from 'gsap';
import { prefersReducedMotion } from './utils';

export function initFaqAnimations(): void {
  if (prefersReducedMotion()) return;

  const faqItems = document.querySelectorAll('.ma-faq-item');
  if (faqItems.length === 0) {
    console.warn('❌ FAQ items not found');
    return;
  }

  console.log('🎯 Initializing FAQ animations');

  faqItems.forEach((item) => {
    const summary = item.querySelector('summary') as HTMLElement;
    const content = item.querySelector('p') as HTMLElement;
    
    if (!summary || !content) return;

    // Set initial state
    gsap.set(content, { height: 0, opacity: 0, overflow: 'hidden' });

    // Add click handler
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isOpen = item.hasAttribute('open');
      
      if (isOpen) {
        // Close animation
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            item.removeAttribute('open');
          },
        });
        
        // Rotate icon back
        gsap.to(summary, {
          '--rotate': '0deg',
          duration: 0.3,
        });
      } else {
        // Open animation
        item.setAttribute('open', '');
        
        gsap.to(content, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        // Rotate icon
        gsap.to(summary, {
          '--rotate': '45deg',
          duration: 0.3,
        });
      }
    });
  });

  console.log('✅ FAQ animations initialized');
}
