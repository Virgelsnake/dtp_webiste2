# DTP Newsroom — Execution Brief
**For:** NEO, DATA | **Deadline:** Morning delivery | **Status:** URGENT

---

## 1. Acceptance Criteria (Exact)

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | `/news` route renders without errors | `npm run build` passes; no 500 errors on navigation |
| 2 | Content collection `news` defined in `src/content/config.ts` | Schema includes all fields in Section 2 |
| 3 | Article cards display: title, excerpt (≤150 chars), date, reading time, tag | Visual inspection + character count validation |
| 4 | Article pages render full Markdown content with proper styling | Test with 3 sample articles |
| 5 | AI disclosure badge appears on all articles | `aiAssisted: true` triggers badge render |
| 6 | Source attribution block renders with linked primary source | Click-through test validates URL |
| 7 | Tag filtering works (click tag → filtered view) | `/news/tags/ai` shows only AI-tagged articles |
| 8 | Mobile responsive (cards stack, typography scales) | Chrome DevTools: iPhone 12 Pro + Desktop |
| 9 | Build time increase <30s for 10 articles | Time `npm run build` before/after |
| 10 | No placeholder content on production | All sample articles removed or marked `draft: true` |

---

## 2. Content Schema Fields (Required)

```typescript
// src/content/config.ts — newsCollection
{
  title: z.string().max(100),
  pubDate: z.date(),
  description: z.string().max(160),
  author: z.literal('Steve Shearman'),
  aiAssisted: z.boolean().default(true),
  aiModel: z.string().optional(),
  humanEdited: z.boolean().default(false),
  primarySource: z.object({
    url: z.string().url(),
    title: z.string(),
    publisher: z.string(),
    publishedDate: z.date(),
  }),
  tags: z.array(z.string()).max(5),
  topic: z.enum(['AI', 'Cloud', 'Security', 'Development', 'Trends', 'IoT', 'Blockchain']),
  readingTime: z.number(),
  draft: z.boolean().default(false),  // ADD THIS
}
```

---

## 3. QA Checklist (Pre-Release)

### Content
- [ ] 3+ sample articles in `src/content/news/` with valid frontmatter
- [ ] All sample articles have `draft: true` OR are production-ready
- [ ] No "Lorem ipsum" or placeholder text
- [ ] All primarySource URLs resolve (200 status)

### Functionality
- [ ] `/news` loads without errors
- [ ] Click article card → full article page
- [ ] Tag pills clickable and filter correctly
- [ ] Back button returns to `/news` hub
- [ ] RSS feed at `/news/rss.xml` (if implemented)

### Visual
- [ ] Matches DTP design system (colors, fonts, spacing)
- [ ] AI disclosure badge visible on all articles
- [ ] Source attribution styled (blockquote or distinct section)
- [ ] Images responsive (if article images present)

### Performance
- [ ] Lighthouse score ≥90 on `/news`
- [ ] No render-blocking resources
- [ ] Images lazy-loaded

### Build
- [ ] `npm run build` completes without errors
- [ ] No TypeScript errors (`npm run check` or `tsc --noEmit`)
- [ ] All routes prerendered (no server errors)

---

## 4. Release Notes Template

```markdown
## DTP Newsroom v1.0 — Release Notes
**Date:** YYYY-MM-DD
**Deploy:** Merge PR #X → Netlify auto-deploy

### What's New
- News hub at `/news` with featured + recent articles
- Article cards with title, excerpt, metadata
- Full article pages with Markdown rendering
- AI disclosure badges on all AI-assisted content
- Source attribution with primary source linking
- Tag filtering (AI, Cloud, Security, etc.)

### Technical
- Astro content collection: `news`
- Schema: 12 fields including AI transparency
- Components: ArticleCard, ArticleFull, AIDisclosure
- Routes: `/news`, `/news/[slug]`, `/news/tags/[tag]`

### Content
- X articles published (initial batch)
- All articles include primary source citations
- Human approval workflow: drafts → published

### Known Issues
- (List any non-blocking issues)

### Next (v1.1)
- RSS feed
- Archive pagination
- Related articles
```

---

## 5. File Locations (Create/Modify)

| File | Action |
|------|--------|
| `src/content/config.ts` | ADD `newsCollection` schema |
| `src/content/news/` | CREATE directory; add sample `.md` files |
| `src/pages/news/index.astro` | CREATE hub page |
| `src/pages/news/[slug].astro` | CREATE article page |
| `src/pages/news/tags/[tag].astro` | CREATE tag filter page |
| `src/components/news/ArticleCard.astro` | CREATE card component |
| `src/components/news/ArticleFull.astro` | CREATE full article component |
| `src/components/news/AIDisclosure.astro` | CREATE disclosure badge |
| `src/components/news/SourceAttribution.astro` | CREATE citation component |

---

**Execute. Verify. Deploy.**
