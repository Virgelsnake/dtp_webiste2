# Baseline Audit — DTP Automated Newsroom

Date: 2026-02-23

## Summary
- News scripts present: `scripts/news/discover_topics`, `scripts/news/generate_draft`
- News schema present: `src/content/config.ts` (`news` collection)
- News routes present: `src/pages/news/index.astro`, `src/pages/news/[...slug].astro`
- Content files: 7 total
- Approved (live): 3
- Draft/unapproved: 4

## Findings
1. Core pipeline skeleton exists and is functional for shortlist -> draft -> approval-gated publish.
2. Approval gating is implemented at route level (`approved === true` for listing and static paths).
3. Duplicate/near-duplicate story risk exists and should be guarded in draft workflow.

## Duplicate Title Check
- How Aberdeen Operators Can Cut Decommissioning Documentation Time with AI: 2026-02-22-aberdeen-decommissioning-ai.md, 2026-02-22-how-aberdeen-operators-can-cut-decommissioning-documentation-time-with-a.md

## Recommended Next Actions
1. Add duplicate guard in `generate_draft` before writing file.
2. Add reviewer checklist + mandatory approval metadata policy.
3. Produce productization pack for reuse across clients.
