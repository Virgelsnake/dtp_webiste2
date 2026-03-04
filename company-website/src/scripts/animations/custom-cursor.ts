// src/scripts/animations/custom-cursor.ts
// Custom cursor with blend mode

import { gsap } from 'gsap';
import { prefersReducedMotion, isMobile } from './utils';

export function initCustomCursor(): void {
  // Skip on mobile and reduced motion
  if (prefersReducedMotion() || isMobile()) return;

  console.log('🎯 Initializing custom cursor');

  // Create cursor element
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<div class="cursor-ring"></div><div class="cursor-dot"></div>';
  document.body.appendChild(cursor);

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .custom-cursor {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 99999;
      mix-blend-mode: difference;
    }
    .cursor-ring {
      width: 40px;
      height: 40px;
      border: 1px solid #00E5A0;
      border-radius: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, border-color 0.2s;
    }
    .cursor-dot {
      width: 6px;
      height: 6px;
      background: #00E5A0;
      border-radius: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
    }
    .custom-cursor.hovering .cursor-ring {
      width: 60px;
      height: 60px;
      border-color: #fff;
    }
    .custom-cursor.hovering .cursor-dot {
      background: #fff;
    }
    /* Hide default cursor */
    body {
      cursor: none;
    }
    a, button, [role="button"] {
      cursor: none;
    }
  `;
  document.head.appendChild(style);

  const ring = cursor.querySelector('.cursor-ring') as HTMLElement;
  const dot = cursor.querySelector('.cursor-dot') as HTMLElement;

  // Track mouse movement
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows immediately
    gsap.set(dot, {
      x: mouseX,
      y: mouseY,
    });
  });

  // Ring follows with delay (smooth)
  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    gsap.set(ring, {
      x: ringX,
      y: ringY,
    });
  });

  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .ma-btn, .ma-benefit-card, .ma-case');
  
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.2 });
  });

  console.log('✅ Custom cursor initialized');
}
