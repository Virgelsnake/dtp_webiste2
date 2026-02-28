// src/scripts/animations/process.ts
// Process section - enhanced transitions and progress bar

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils';

export function initProcessAnimations(): void {
  if (prefersReducedMotion()) return;

  const section = document.querySelector('.three-col-process-section');
  if (!section) {
    console.warn('❌ Process section not found');
    return;
  }

  console.log('🎯 Initializing process animations');

  // 1. Progress bar
  initProgressBar();

  // 2. Enhanced content transitions
  initContentTransitions();
}

/**
 * Scroll progress bar at top of section
 */
function initProgressBar(): void {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'process-progress-bar';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #00E5A0, #00B8D4);
    width: 0%;
    z-index: 9999;
    transition: opacity 0.3s;
    opacity: 0;
  `;
  document.body.appendChild(progressBar);

  // Show/hide and update progress
  ScrollTrigger.create({
    trigger: '.three-col-process-section',
    start: 'top top',
    end: 'bottom bottom',
    onEnter: () => { progressBar.style.opacity = '1'; },
    onLeave: () => { progressBar.style.opacity = '0'; },
    onEnterBack: () => { progressBar.style.opacity = '1'; },
    onLeaveBack: () => { progressBar.style.opacity = '0'; },
    onUpdate: (self) => {
      progressBar.style.width = `${self.progress * 100}%`;
    },
  });

  console.log('✅ Progress bar initialized');
}

/**
 * Enhanced content transitions between steps
 */
function initContentTransitions(): void {
  const descriptions = document.querySelectorAll('.step-description');
  
  // Enhance the existing transitions with GSAP
  // The existing code uses CSS transitions, we'll enhance with GSAP
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target as HTMLElement;
        const isActive = target.classList.contains('active');
        
        if (isActive) {
          // Animate in
          gsap.fromTo(target,
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
          );
        }
      }
    });
  });

  descriptions.forEach((desc) => {
    observer.observe(desc, { attributes: true });
  });

  console.log('✅ Content transitions enhanced');
}
