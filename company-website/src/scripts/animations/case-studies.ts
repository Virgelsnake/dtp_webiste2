// src/scripts/animations/case-studies.ts
// Case studies section - card entrance and result highlight

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils';

export function initCaseStudiesAnimations(): void {
  if (prefersReducedMotion()) return;

  const section = document.getElementById('work');
  if (!section) {
    console.warn('❌ Case studies section not found');
    return;
  }

  console.log('🎯 Initializing case studies animations');

  // 1. Card entrance animation
  initCardEntrance();

  // 2. Result text highlight
  initResultHighlight();
}

/**
 * Staggered card entrance from bottom
 */
function initCardEntrance(): void {
  const cards = document.querySelectorAll('.ma-case');
  if (cards.length === 0) return;

  // Set initial state
  gsap.set(cards, {
    opacity: 0,
    y: 60,
    scale: 0.95,
  });

  // Create scroll-triggered animation
  ScrollTrigger.create({
    trigger: '#work',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
      });

      // Animate tech stack tags after cards appear
      cards.forEach((card, index) => {
        const tags = card.querySelectorAll('.ma-case-stack span');
        gsap.fromTo(tags,
          { opacity: 0, y: 10, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            delay: index * 0.15 + 0.4,
            ease: 'back.out(1.5)',
          }
        );
      });
    },
  });

  console.log('✅ Case studies card entrance initialized');
}

/**
 * Result text highlight animation
 */
function initResultHighlight(): void {
  const results = document.querySelectorAll('.ma-case-result');
  
  results.forEach((result) => {
    ScrollTrigger.create({
      trigger: result,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // Subtle glow pulse on result text
        gsap.fromTo(result,
          { textShadow: '0 0 0px rgba(0, 229, 160, 0)' },
          {
            textShadow: '0 0 20px rgba(0, 229, 160, 0.5)',
            duration: 0.6,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
          }
        );
      },
    });
  });

  console.log('✅ Result highlight initialized');
}
