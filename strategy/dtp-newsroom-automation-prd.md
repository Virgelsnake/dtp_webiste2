# DTP Newsroom Automation — Strategy & PRD
## Digital Technology Partner Content Pipeline

**Prepared for:** Steve Shearman (DTP)  
**Analysis by:** SPOCK (RESEARCH-1), AI With Agency  
**Date:** 2026-02-22  
**Status:** Draft v1.0 — Implementation Ready

---

## 1. PRD Outline

### 1.1 Problem Statement

| Issue | Current State | Impact |
|-------|---------------|--------|
| **Stale News Page** | `news2.astro` contains hardcoded placeholder articles (dated Dec 2024) | Site appears unmaintained; SEO penalty for stale content |
| **Manual Content Creation** | No systematic process for generating topical articles | Inconsistent publishing; high effort per article |
| **No Editorial Workflow** | No approval gate between draft and publish | Risk of off-brand or inaccurate content going live |
| **Missed SEO Opportunities** | No targeting of trending AI/tech topics | Competitors capturing search traffic for emerging terms |

### 1.2 Goals

**Primary:**
- Establish daily automated content ideation pipeline using `last30days` skill
- Create human-in-the-loop approval workflow (Steve selects 1-2 topics → AI generates → Steve approves → publish)
- Launch production-ready news section within 2 weeks

**Secondary:**
- Build reusable content architecture supporting both short-form cards and long-form articles
- Establish editorial trust markers (AI disclosure, sourcing, human oversight)
- Create foundation for Phase 2: YouTube URL → transcript → rewritten article

### 1.3 Non-Goals

| Out of Scope | Rationale |
|--------------|-----------|
| Fully automated publishing without approval | Brand risk; human judgment required for DTP voice |
| Multi-author bylines | Single voice (Steve/DTP brand) maintains consistency |
| Real-time news (breaking) | Daily batch processing sufficient for evergreen tech content |
| Comment system / community | Adds moderation burden; focus on content first |
| Paywall / subscription | DTP is services marketing, not media revenue |

### 1.4 User Stories

| Role | Story | Acceptance Criteria |
|------|-------|---------------------|
| **Steve (Editor)** | "Each morning at 08:30, I receive 8 topical AI/tech story ideas researched from the last 30 days" | Cron runs daily; generates Markdown list with topic + 2-sentence pitch + suggested angle |
| **Steve (Editor)** | "I can select 1-2 topics and trigger article generation with one command" | `/newsroom generate [topic-id]` produces draft article within 5 minutes |
| **Steve (Editor)** | "I review and approve articles before they go live" | Articles written to `drafts/` folder; Steve moves to `published/` or requests revision |
| **Visitor** | "I see fresh, relevant tech content on the DTP news page" | News page displays articles from `published/` collection; max age 7 days on homepage |
| **Visitor** | "I can read a summary and click through to full article" | Each article has card (title + 150-char excerpt + read time) linking to full page |
| **SEO Bot** | "Content has proper structured data and semantic markup" | Articles include Schema.org Article JSON-LD; OpenGraph tags; semantic HTML |

### 1.5 Acceptance Criteria

**Functional:**
- [ ] Daily cron at 08:30 UK generates 8 topic ideas via `last30days` skill
- [ ] Topic ideas include: headline suggestion, angle/pitch (2 sentences), primary source URL, confidence score
- [ ] Steve can trigger article generation via Telegram command or Mission Control UI
- [ ] Generated articles include: title, excerpt (150 chars), body (500-800 words), tags, canonical source citations
- [ ] Articles support two formats: short card (for listing) and full article (dedicated page)
- [ ] Approval workflow: drafts in `src/content/news/drafts/` → approval → move to `src/content/news/published/`

**Non-Functional:**
- [ ] Article generation completes within 5 minutes of trigger
- [ ] Build time increase <30 seconds per 10 articles
- [ ] Zero unapproved articles visible on production site
- [ ] All AI-generated content marked with disclosure badge

---

## 2. Information Architecture

### 2.1 Astro Content Collections

```typescript
// src/content/config.ts — ADD TO EXISTING
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(100),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    description: z.string().max(160), // SEO meta + card excerpt
    author: z.literal('Steve Shearman'),
    // AI transparency
    aiAssisted: z.boolean().default(true),
    aiModel: z.string().optional(), // e.g., "Kimi K2.5"
    humanEdited: z.boolean().default(false),
    // Source attribution
    primarySource: z.object({
      url: z.string().url(),
      title: z.string(),
      publisher: z.string(),
      publishedDate: z.date(),
    }),
    relatedSources: z.array(z.object({
      url: z.string().url(),
      title: z.string(),
    })).optional(),
    // Categorization
    tags: z.array(z.string()).max(5),
    topic: z.enum(['AI', 'Cloud', 'Security', 'Development', 'Trends', 'IoT', 'Blockchain']),
    readingTime: z.number(), // calculated, stored for display
    // Media
    image: z.object({
      url: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    }).optional(),
    // Phase 2: YouTube source
    youtubeSource: z.object({
      videoId: z.string(),
      channelName: z.string(),
      originalTitle: z.string(),
    }).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'case-studies': caseStudiesCollection,
  'services': servicesCollection,
  'testimonials': testimonialsCollection,
  'news': newsCollection, // NEW
};
```

### 2.2 File Structure

```
src/content/news/
├── drafts/                    # AI-generated, pending approval
│   ├── 2026-02-22-ai-chip-race.md
│   └── 2026-02-22-kubernetes-trends.md
├── published/                 # Approved and live
│   ├── 2026-02-21-cloud-security-2025.md
│   └── 2026-02-20-llm-enterprise-guide.md
└── _template.md               # Frontmatter template for generation

src/pages/news/
├── index.astro               # News hub (replaces news2.astro)
├── [slug].astro              # Individual article pages
└── tags/
    └── [tag].astro           # Tag-filtered views

src/components/news/
├── ArticleCard.astro         # Short-form card component
├── ArticleFull.astro         # Full article layout
├── TopicIdeasList.tsx        # Interactive topic selection (React)
├── SourceAttribution.astro   # Citation component
└── AIDisclosure.astro        # Transparency badge
```

### 2.3 Routes

| Route | Purpose | Data Source |
|-------|---------|-------------|
| `/news` | News hub with featured + recent articles | `getCollection('news', filter: published, sort: pubDate desc)` |
| `/news/[slug]` | Full article page | `getEntryBySlug('news', slug)` |
| `/news/tags/[tag]` | Tag-filtered listing | Filtered collection query |
| `/news/archive` | Paginated archive (Phase 1.1) | Paginated collection query |

### 2.4 Component Architecture

```
News Hub Page
├── Hero Section
│   └── Featured Article (most recent)
├── Topic Filter Bar
│   └── Tag pills (AI, Cloud, Security, etc.)
├── Article Grid
│   ├── ArticleCard × 6 (recent)
│   └── "Load More" or pagination
└── Sidebar (desktop)
    ├── Trending Topics
    ├── AI Disclosure Notice
    └── Subscribe CTA

Article Card Component
├── Thumbnail image (optional)
├── Tag + Date
├── Title (linked)
├── Excerpt (150 chars)
├── Reading time
└── Source badge

Full Article Page
├── Breadcrumb
├── Header
│   ├── Title
│   ├── Meta (date, reading time, tags)
│   └── AI Disclosure badge
├── Featured image (optional)
├── Article body (Markdown → HTML)
├── Source Citations block
├── Author bio (Steve)
└── Related articles
```

---

## 3. Editorial Policy

### 3.1 AI Transparency Framework

| Element | Implementation |
|---------|----------------|
| **Disclosure Badge** | Every AI-assisted article displays: "AI-Assisted Research · Human Edited" or "AI-Assisted Research · Draft Pending Review" |
| **Model Attribution** | Frontmatter stores AI model used (Kimi K2.5, etc.); displayed in article footer |
| **Human Approval Chain** | Draft → Steve review → Approve/Request Revision → Publish |
| **Confidence Scoring** | Generated topics include confidence score (High/Medium/Low) based on source diversity |

### 3.2 Sourcing Standards

**Primary Sources Only:**
- Official company announcements (press releases, investor relations)
- Academic papers (arXiv, IEEE, ACM)
- Technical documentation (AWS, Azure, Google Cloud docs)
- Verified expert commentary (LinkedIn from verified accounts, conference talks)

**Prohibited Sources:**
- Unverified social media claims
- Aggregator sites without original reporting
- Content farms / SEO spam
- Rumor/leak sites without corroboration

**Attribution Format:**
```markdown
> **Source:** [Google Cloud Blog](https://cloud.google.com/blog/...) — "Introducing Gemini 2.0", published 2026-02-20
```

### 3.3 Voice and Tone Guidelines

**Executive/Consultative:**
- Lead with business impact, not technical specs
- Use "organizations" not "companies" (broader applicability)
- Include "So what?" — why this matters to decision-makers

**Approachable:**
- One conversational paragraph per 3 technical paragraphs
- Use analogies for complex concepts
- Avoid jargon without immediate definition

**Examples:**
- ❌ "Gemini 2.0 utilizes a Mixture-of-Experts architecture with 1.5T parameters"
- ✅ "Google's new Gemini 2.0 is essentially a team of specialist AIs that route questions to the right expert — like having separate consultants for strategy, operations, and finance rather than one generalist"

### 3.4 Content Categories

| Category | Purpose | Example |
|----------|---------|---------|
| **Trend Analysis** | "What this means for your business" | "Why the AI Chip Race Matters for Mid-Market Companies" |
| **Practical Guide** | Actionable advice | "5 Kubernetes Security Changes for 2025" |
| **Executive Summary** | Complex topic distilled | "The Complete Guide to Enterprise LLM Deployment" |
| **Opinion/Commentary** | DTP perspective | "Why 'AI Transformation' Is the Wrong Framing" |

---

## 4. Risks and Mitigation

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| **Hallucinated facts published** | High | Medium | Human approval gate mandatory; confidence scoring; primary source requirement |
| **Off-brand tone** | Medium | Medium | Prompt templates with voice guidelines; Steve review; revision loop available |
| **Copyright issues from sources** | Medium | Low | Link to primary sources (fair use); never reproduce full text; paraphrase with attribution |
| **SEO penalty for low-quality AI content** | High | Low | Human editing required; quality guidelines; unique analysis added (not just summarization) |
| **Cron failure (no topics generated)** | Low | Medium | Health check alerts; manual fallback `/newsroom generate [topic]` command; 48-hour buffer stock |
| **YouTube source copyright (Phase 2)** | Medium | Medium | Only use Creative Commons or transformative commentary; avoid full transcript reproduction |
| **Build failures from malformed frontmatter** | Low | Low | Schema validation; pre-commit hooks; staging environment |

**Contingency Plan:**
If AI generation quality degrades, fall back to:
1. Manual topic curation (Steve provides topics)
2. AI-assisted outlining only (Steve writes full articles)
3. Weekly rather than daily cadence

---

## 5. Phased Roadmap

### Phase 1: Foundation (Week 1-2) — Core Newsroom

**Week 1: Infrastructure**
- [ ] Set up `news` content collection with schema
- [ ] Create `/news` hub page (replace `news2.astro`)
- [ ] Create `[slug].astro` article template
- [ ] Build `ArticleCard` and `ArticleFull` components
- [ ] Implement AI Disclosure and Source Attribution components
- [ ] Styling: match existing DTP design system

**Week 2: Automation Pipeline**
- [ ] Create `newsroom` cron job (08:30 UK daily)
- [ ] Build topic generation script using `last30days` skill
- [ ] Create topic storage format (JSON: id, headline, pitch, sources, confidence)
- [ ] Build article generation script (triggered manually via Telegram/MC UI)
- [ ] Create draft → approval → publish workflow
- [ ] Test full cycle: cron → topics → generation → approval → build → deploy

**Deliverable:** Production newsroom with daily ideation, manual article generation, approval workflow

### Phase 1.1: Polish (Week 3) — Quality & Scale

- [ ] Add tag filtering and tag pages
- [ ] Implement reading time calculation
- [ ] Add "Related Articles" logic (same topic/tag)
- [ ] RSS feed generation (`/news/rss.xml`)
- [ ] Archive/pagination for older articles
- [ ] Image generation integration (DALL-E for article thumbnails)
- [ ] Analytics: track most-read topics for feedback loop

**Deliverable:** Full-featured newsroom with discoverability and distribution

### Phase 2: Video-to-Article (Week 4-5) — YouTube Integration

**Week 4: Transcription Pipeline**
- [ ] Integrate YouTube transcript extraction (YouTube API or `yt-dlp`)
- [ ] Build transcript → article rewrite prompt
- [ ] Add `youtubeSource` to content schema
- [ ] Create YouTube URL input interface (Telegram bot command)
- [ ] Test with 5-10 sample videos

**Week 5: Refinement**
- [ ] Optimize prompts for conversational → article transformation
- [ ] Add video embed in article template
- [ ] Handle copyright-sensitive content (transformation verification)
- [ ] Document workflow: Steve pastes YouTube URL → gets draft article → approves

**Deliverable:** YouTube-to-article pipeline operational

### Phase 3: Intelligence (Future) — Advanced Features

- [ ] Trend forecasting (identify rising topics before they peak)
- [ ] Competitor content monitoring
- [ ] A/B testing headlines (measure CTR)
- [ ] Newsletter generation (weekly digest of top articles)
- [ ] LinkedIn/Twitter auto-posting (with Steve approval)

---

## 6. Technical Implementation Notes

### 6.1 Cron Configuration

```bash
# ~/.openclaw/cron/newsroom-topics.json
{
  "name": "DTP Newsroom Topic Generation",
  "schedule": {
    "kind": "cron",
    "expr": "30 8 * * *",
    "tz": "Europe/London"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "Run newsroom topic generation for DTP. Use last30days skill to research trending AI/tech topics from last 30 days. Generate 8 topic ideas with headline, 2-sentence pitch, primary source URL, and confidence score. Save to /Users/gideon/clawd/projects/dtp_webiste2/newsroom/topics/[YYYY-MM-DD].json. Notify Steve via Telegram with summary."
  },
  "delivery": {
    "mode": "announce",
    "channel": "telegram"
  },
  "sessionTarget": "isolated"
}
```

### 6.2 Article Generation Prompt Template

```markdown
# DTP Newsroom Article Generator

## Input
- Topic: {{topic_headline}}
- Angle: {{topic_pitch}}
- Primary Source: {{source_url}}

## Output Requirements

**Format:** Markdown with frontmatter
**Length:** 500-800 words
**Tone:** Executive/consultative but approachable
**Structure:**
1. Hook (business impact question)
2. Context (what's happening)
3. Analysis (so what? why it matters)
4. Implications (what should organizations do?)
5. Conclusion (forward-looking)

**Frontmatter:**
```yaml
---
title: "{{headline}}"
pubDate: {{current_date}}
description: "{{150_char_summary}}"
author: "Steve Shearman"
aiAssisted: true
aiModel: "Kimi K2.5"
humanEdited: false
primarySource:
  url: "{{source_url}}"
  title: "{{source_title}}"
  publisher: "{{source_publisher}}"
  publishedDate: {{source_date}}
tags: [{{suggested_tags}}]
topic: "{{topic_category}}"
readingTime: {{calculated}}
---
```

**Citation Format:**
> **Source:** [Publisher Name](URL) — "Article Title", published YYYY-MM-DD

**Voice Guidelines:**
- Use analogies for technical concepts
- Every technical paragraph should have business context
- Avoid hype words ("revolutionary", "game-changing") unless quoting
- DTP perspective: practical, experienced, slightly skeptical of buzzwords
```

### 6.3 Telegram Commands

```
/newsroom topics           # Show today's 8 generated topics
/newsroom generate [id]    # Generate article for topic ID
/newsroom status           # Show draft/published counts
/newsroom publish [slug]   # Move draft to published (approval)
/newsroom reject [slug]    # Delete draft
/newsroom youtube [url]    # Phase 2: Generate from YouTube
```

### 6.4 Environment Variables

```bash
# Required for last30days skill
export OPENAI_API_KEY="..."

# Optional: Newsroom config
export DTP_NEWSROOM_WORKSPACE="/Users/gideon/clawd/projects/dtp_webiste2"
export DTP_NEWSROOM_EDITOR_ID="telegram:user_id"  # Steve's Telegram ID for notifications
```

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Content Velocity** | 5-7 articles/week | Count published articles |
| **Approval Rate** | >70% of generated drafts approved | Approved / Generated |
| **Time to Publish** | <24h from topic selection | Timestamp topic selection → publish |
| **Organic Traffic** | +20% news page visits in 30 days | Google Analytics |
| **Engagement** | >2 min avg time on article | GA4 engagement time |
| **Source Diversity** | >3 unique sources per article | Frontmatter audit |

---

*Document ready for implementation review. All specifications validated against existing DTP codebase and Astro content collection patterns.*

— SPOCK (RESEARCH-1)  
*Live long and prosper.*
