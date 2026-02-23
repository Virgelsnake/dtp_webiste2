# PRD — DTP Automated Newsroom Service (v1)

## Functional Requirements

### FR1 — Topic Discovery
System generates a daily shortlist of candidate topics.
- Input: static or trend-informed topic pool
- Output: shortlist JSON with IDs and metadata

### FR2 — Draft Generation
User selects shortlist topic and system generates markdown draft.
- Output location: `src/content/news/*.md`
- Draft must include metadata + structured article body scaffold

### FR3 — Editorial Approval Gate
Only approved articles appear on live news pages.
- `approved: true` required for listing and article route rendering
- Optional reviewer metadata retained (`approvedBy`, `approvedAt`)

### FR4 — Dual Content Format Delivery
Every article supports:
1. Tile display fields (title/description/date/category/tags)
2. Expanded full article page content

### FR5 — Source + Transparency
Maintain source attribution and AI-assisted workflow transparency.

## Non-Functional Requirements
- Build passes cleanly
- Predictable content schema
- Mobile-friendly rendering for news pages
- Easy handoff and maintenance by small team

## Acceptance Criteria
- `/news` renders approved articles only
- `/news/[slug]` renders full article for approved entries
- Drafts remain hidden
- Topic shortlist + draft scripts run locally
- No duplicate story slugs in publish set

## Risks
- Duplicate or near-duplicate stories
- Quality drift without editorial discipline
- Process not fully reusable unless documented as product

## Mitigations
- Add duplicate checks in generation workflow
- Enforce reviewer checklist before approval
- Package process docs and SOP for reuse
