# DTP Website – Outstanding Tasks

Use this checklist to track work. Tick items as they’re completed. Feel free to add dates/owners.

- [ ] General: Review this list weekly and prune completed/obsolete items

## SEO & Meta

- [ ] Add dedicated Open Graph image (1200x630) at `public/images/og-default.jpg`
- [ ] Update `og:image` and `twitter:image` defaults in `src/layouts/Layout.astro` and `src/layouts/BaseLayout.astro`
- [ ] Set per-page `description` and `image` where appropriate (e.g., Services, News, Contact)
- [ ] Verify WhatsApp/LinkedIn/Slack previews after deploy (use `?v=2` cache-busting)

## Content & Pages

- [ ] Finalize homepage hero copy and CTAs
- [ ] Complete “Our Approach” section copy to match 5-stage journey
- [ ] Add FAQ entries and review tone/style
- [ ] Contact page: confirm email routing and privacy copy

## Components & Interactions

- [ ] News page Bento-box hover animation per provided 5-step plan
- [ ] Ensure `DevelopmentJourney.astro` variants match current brand styles
- [ ] Refine button hover effects for consistency across pages

## Assets & Branding

- [ ] Provide/export a crisp OG preview image (1200x630) with logo + headline
- [ ] Verify favicon/touch icons on iOS/Android and dark backgrounds

## Performance

- [ ] Run Lighthouse on desktop/mobile; target 90+ scores
- [ ] Optimize images (SVG/PNG compression; consider AVIF/WebP where applicable)
- [ ] Audit unused CSS (Tailwind purging is enabled; confirm bundle size)

## Accessibility (a11y)

- [ ] Add skip links and improve focus states as needed
- [ ] Ensure semantic headings and alt text across pages
- [ ] Test keyboard navigation for mobile menu and carousels

## Analytics & Monitoring

- [ ] Add analytics (if required) and cookie notice as applicable
- [ ] Set up uptime monitoring and error tracking (optional)

## Deployment/Infra

- [ ] Confirm `astro.config.mjs` site URL remains accurate across environments
- [ ] Netlify: verify redirects, headers, and sitemap are correct

## Testing & QA

- [ ] Cross-browser tests (Safari, Firefox, Chrome, Edge)
- [ ] Responsive checks (sm/md/lg/xl) for all key pages
- [ ] Content proofreading pass (typos, consistency)

---

Notes:
- Layouts accept per-page `description` and `image` props.
- Use absolute URLs for external images or root-relative paths that resolve via `Astro.site`.
