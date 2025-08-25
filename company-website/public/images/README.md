# Open Graph Image Guidance

Provide a social preview image for rich link previews (WhatsApp, LinkedIn, Slack, Twitter/X).

- File: `og-default.jpg`
- Path: `public/images/og-default.jpg`
- Size: 1200 x 630 px (minimum). Keep key content within a 1120 x 550 px safe area.
- Format: JPG (recommended) or PNG. Aim for < 300 KB.
- Content suggestions:
  - DTP logo on dark background
  - Short headline/subtitle (2–5 words headline, 6–10 words subtitle)
  - Subtle gradient or brand imagery; avoid dense text

Once added, the layouts will use it automatically as the default image. You can also override per page by passing an `image` prop to `Layout.astro` or `BaseLayout.astro`.

Cache tips:

- Share a URL with a version query to bust previews: `https://digitaltechnologypartner.ai/?v=2`.
- Some platforms cache aggressively; re-share with a new query when updating.
