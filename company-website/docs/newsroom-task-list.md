# Task List — DTP Automated Newsroom Service

Project ID: `6c3a2e19-712a-4289-83c8-ad962de2eaab`
Project Name: DTP Automated Newsroom
Scope: Consolidate docs, harden workflow, and productize offer

**Status:** Phases A-D Complete | 7-Day Live Run In Progress
**Last Updated:** 2026-02-24 09:10 GMT (by Gideon)

---

## Quick Status
| Phase | Status | Key Deliverables |
|-------|--------|------------------|
| A — Audit & Baseline | ✅ Done | Scripts confirmed, duplicates removed, visibility verified |
| B — Workflow Hardening | ✅ Done | Duplicate guard, reviewer checklist, metadata validation |
| C — Delivery Ops | ✅ Done | SOP doc, weekly cadence, reporting snapshot |
| D — Productization | ✅ Done | Service package, pricing/tiers, onboarding checklist |
| E — Live Validation | 🔄 In Progress | 7-day cron run (24 Feb–2 Mar), daily articles, case studies |
| F — Release | ⏳ Pending | Evidence bundle, marketing positioning, move to review |

---

## Phase A — Audit & Baseline ✅ COMPLETE
- [x] A1. Confirm current scripts, schema, routes, and content status
- [x] A2. Remove/merge duplicate article entries
  - Duplicate draft archived: `src/content/news/_archive/2026-02-22-how-aberdeen-operators-can-cut-decommissioning-documentation-time-with-a.md`
- [x] A3. Verify approved vs draft visibility behavior

## Phase B — Workflow Hardening ✅ COMPLETE
- [x] B1. Add duplicate-title/slug guard in draft workflow
  - Script: `scripts/news/generate_draft`
- [x] B2. Add reviewer checklist template for approvals
  - Doc: `docs/newsroom-review-checklist.md`
- [x] B3. Ensure every approved post has source metadata
  - Script: `scripts/news/validate_approved` (PASS)

## Phase C — Delivery Ops ✅ COMPLETE
- [x] C1. Document end-to-end SOP (discover → draft → review → approve → publish)
  - Doc: `docs/newsroom-sop.md`
- [x] C2. Define weekly editorial cadence
  - Doc: `docs/newsroom-weekly-cadence.md`
- [x] C3. Add simple reporting snapshot (draft/approved/published counts)
  - Script: `npm run news:status`
  - Status: No duplicates, counts visible

## Phase D — Productization (AI With Agency) ✅ COMPLETE
- [x] D1. Create reusable service package docs
  - Location: `projects/ai-with-agency/offerings/automated-newsroom/`
- [x] D2. Define pricing/tiers and deliverables
  - Included in service package docs
- [x] D3. Define onboarding checklist for new client rollout
  - Included in service package docs

## Phase E — Live Validation 🔄 IN PROGRESS
- [x] E1. Schedule 7-day daily cron runs (09:00 UK)
  - Dates: 2026-02-24 to 2026-03-02
- [~] E2. Execute daily run and publish at least one additional approved article each day where quality threshold is met
  - Day 1 (24 Feb): ✅ "When 'Vibe Coding' Goes Wrong: The Hidden Risks of AI Experiments in Enterprise Environments"
- [~] E3. Capture outcomes as mini case-study notes
  - Template: `case-studies/dtp-newsroom-2026-02-23.md`
- [ ] E4. Compile 7-day evidence bundle

## Phase F — Release Readiness ⏳ PENDING
- [ ] F1. Finalise marketing positioning from live DTP outcomes
- [ ] F2. Prepare evidence bundle for review
- [ ] F3. Move task to `review` column in Mission Control

## Done Criteria
- [ ] DTP workflow stable and used repeatedly (pending 7-day validation)
- [ ] Team can execute without ad-hoc steps (SOP in place, pending validation)
- [ ] Reusable service package ready for external clients (docs ready, pending case study evidence)

---

## Agent Process Discipline (Gideon Protocol)

**This section is MANDATORY and must not be removed.**

### Before Starting Work
1. **Read the task list first** — Open this file before writing any code
2. **Identify current phase** — Know which items are `[ ]`, `[~]`, or `[x]`
3. **Pick the next unstarted item** — Work in phase order (A → B → C → D → E → F)

### During Work
4. **Update status immediately** — When a task is done, change `[ ]` to `[x]` in the same session
5. **Mark partial progress** — Use `[~]` for "in progress / partially done"
6. **Note blockers** — Add inline comments if blocked (e.g., `Blocked: needs API key`)

### After Work
7. **Update the Quick Status table** — Reflect accurate % completion
8. **Update Last Updated timestamp** — Add date/time + your name
9. **Commit with task reference** — Include task ID in commit message (e.g., `E2: Publish day 3 article`)

### Verification Checklist (Before saying "I'm done")
- [ ] Did I update the task list with `[x]` for completed items?
- [ ] Did I update the Quick Status table?
- [ ] Did I update the Last Updated timestamp?
- [ ] Did I verify the fix/feature actually works (not just "should work")?

**Violation of this protocol is a project hygiene failure.**

---

## Document References
- **Brief:** `docs/newsroom-product-brief.md`
- **PRD:** `docs/newsroom-prd.md`
- **Baseline Audit:** `docs/newsroom-baseline-audit.md`
- **SOP:** `docs/newsroom-sop.md`
- **Weekly Cadence:** `docs/newsroom-weekly-cadence.md`
- **Reviewer Checklist:** `docs/newsroom-review-checklist.md`
- **Task Context:** `/Users/gideon/clawd/projects/mission-control/docs/task-context/6c3a2e19-712a-4289-83c8-ad962de2eaab.md`
- **AI With Agency Package:** `/Users/gideon/clawd/projects/ai-with-agency/offerings/automated-newsroom/`

---

*Template version: 1.0*
