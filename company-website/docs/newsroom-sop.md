# DTP Newsroom SOP (Discover → Draft → Review → Approve → Publish)

## Purpose
Run a consistent, low-friction newsroom workflow that produces quality posts quickly while keeping human approval control.

## Daily Workflow

### 1) Discover topics
```bash
./scripts/news/discover_topics --date YYYY-MM-DD
```
Output shortlist JSON in `src/content/news/shortlists/`.

### 2) Produce 10 candidate subjects + overviews
Create a concise shortlist for Steve: 10 topics with one-line rationale each.

### 3) Share shortlist and request selection
Send shortlist to Steve and ask for chosen topic number.

### 4) Fallback rule (3 hours)
If no selection is received within 3 hours, auto-pick the strongest topic and continue.

### 5) Generate draft from selected topic
```bash
./scripts/news/generate_draft \
  --shortlist src/content/news/shortlists/YYYY-MM-DD-topics.json \
  --topic-id topic-01
```
Notes:
- Duplicate title/slug generation is blocked by default.
- Use `--allow-duplicate` only for explicit editorial override.

### 6) Editorial review
Use checklist:
- `docs/newsroom-review-checklist.md`

### 7) Approve for publish
In article frontmatter set:
- `approved: true`
- `approvedBy: "<reviewer>"`
- `approvedAt: YYYY-MM-DD`
- `source: "<source url or note>"`

Also **remove any approval/disclaimer lines from the article body** (e.g., “Human‑approved…” or “AI‑assisted draft…”). Those must never ship in published content.

### 8) Validate governance
```bash
npm run news:validate
```
Must pass before release.

### 9) Check pipeline status
```bash
npm run news:status
```
Shows total, approved, drafts, duplicate titles.

### 10) Publish
Deploy site as normal. `/news` shows approved entries only.

## Operator Notes
- Drafts remain hidden until approved.
- Keep claims tied to source context.
- Maintain British English spelling in all output.
