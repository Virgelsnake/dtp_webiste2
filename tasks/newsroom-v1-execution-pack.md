# DTP Newsroom v1 — Execution Pack

## Objective (Tonight)
Ship newsroom v1 using file-based Astro content with human approval gate.

## Implemented Scope
- News collection added to Astro content schema
- `/news` approved-only listing
- `/news/[...slug]` article route
- 6 starter entries in `src/content/news`
- Scripted workflow for topic shortlist and draft generation

## Workflow (Operational)
1. Generate shortlist (8 topics)
2. Steve picks topic id
3. Generate draft markdown
4. Edit/review in PR
5. Approve by setting `approved: true` + `approvedBy` + `approvedAt`
6. Merge to publish

## Manual Commands

### From project root
```bash
cd /Users/gideon/clawd/projects/dtp_webiste2/company-website
```

### 1) Discover 8 topics shortlist
```bash
./scripts/news/discover_topics
```

### 2) Generate draft from picked topic
```bash
./scripts/news/generate_draft \
  --shortlist src/content/news/shortlists/$(date +%F)-topics.json \
  --topic-id topic-01
```

### 3) Local validation
```bash
npm run type-check
npm run build
npm run dev
```

## Approval Gate Rules
- Only entries with `approved: true` appear on `/news`
- Draft entries remain hidden until approved
- Approval metadata required for publish:
  - `approvedBy`
  - `approvedAt`

## Daily Cadence (Target)
- 08:30 UK: run `discover_topics`
- 09:00 UK: Steve picks 1 topic
- 09:15 UK: run `generate_draft`
- 10:00 UK: PR preview review (desktop + mobile)
- 10:30 UK: merge publish

## KPI Baseline (v1)
- Shortlist generated: yes/no
- Draft turnaround: minutes from pick to draft
- Publish lead time: pick -> merge
- Approval throughput: approved articles/week
