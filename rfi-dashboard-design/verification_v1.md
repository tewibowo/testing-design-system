# Verification report — RFI Self-Service Dashboard (Phase 1) mockups v1

**Source PRD:** `PRD: RFI Self-Service Dashboard — Phase 1` (Ver 0.4)
**Output:** single consolidated file `mockups_v1.html` (3 stories → ≤3-stories rule)
**Date:** 2026-05-29

---

## Build path (Phase 0 decision)

The StraitsX design system is **this repository itself** — it is **not installed as a runnable
package** (`node_modules` is empty, no build output, the package is the `src/` source). Per the
workflow's "not importable" branch, components were **reconstructed faithfully from documented
specs + design tokens**:

- `:root` tokens and global resets copied **verbatim** from `src/styles/tokens.css` + `src/styles/global.css`.
- Every component's CSS copied **verbatim** from its `src/components/<C>/<C>.css`.
- Each React component re-implements the real markup + class names from `src/components/<C>/<C>.jsx`, so the verbatim DS CSS applies and the documented prop API is preserved.
- Fonts (Red Hat Display, Hanken Grotesk, Red Hat Mono, Material Symbols Rounded) load from Google Fonts, as the brand guideline specifies these are Google-hosted.

**Copy source — important deviation.** The required `straitsx-web3-copywriter` skill is **not
available in this environment** (absent from `/mnt/skills`, `~/.claude/skills`, and plugin paths).
Per the "no bluffing" rule this is flagged rather than faked. All user-facing copy was instead
authored in the StraitsX brand voice using the in-repo **`brand_guidelines.txt`** (compliance-first,
secure, transparent, professional-yet-approachable) and reuses the **PRD's own specified strings**
for error/empty/status messages where the PRD defines them (e.g. the seat-limit message and file
errors are quoted verbatim from PRD §9 and Story 3 Req 4).

**In-browser verification — pending.** The sandbox has no browser, and its network allowlist blocks
CDN access, so Babel could not be fetched to compile-check or render the file here. The mockup was
reviewed statically against the real component source. It should be opened in a browser **with
internet access** (it loads React, Babel-standalone and Google Fonts from CDN on first open).

---

## Components used — all confirmed real (verified via `get-documentation`)

Button, IconButton, LinkButton, Tag, Badge, Input, Textarea, Select, DateInput, Copybox, Checkbox,
Upload, Card, Table, Pagination, PageTitle, Breadcrumb, Steps, EmptyState, Alert, Modal*, Menu,
Tabs, Sidebar, TopBar, Toast, Icon. *(Modal reconstructed and available but not placed — case
detail uses a full-page view per the approved decision.)*

No component, prop, variant or tone outside the documented catalog was invented (see Flagged gaps).

---

## Story 1 — RFI Case Management

**Mobbin reference:** query *"KYC compliance case management dashboard, list table with status badges,
summary stat cards and filters"* (web) → **Deel "Compliance documents"** (screen `9feb7477…`).
Borrowed: top row of count/stat cards, a filter row of dropdowns + search + a primary action, then a
status-badged data table with a per-row action + overflow menu. Secondary: Vanta "Controls" (sidebar
nav + summary cards + filterable table).

| Acceptance criterion (PRD Story 1) | Covered | Where in mockup |
|---|---|---|
| Case list columns: RFI ID, Full Name, Reason, Date Received, Expiry Date, Status, Action | Y | `Table` in `CaseList` |
| Filters: status, RFI reason, date range, free-text search | Y | `Select` ×2, `DateInput` ×2 (From/To), search `Input` |
| Four statuses: Received / Submitted / Expired / Completed | Y | `StatusTag` + sample data covers all four |
| Six stat cards: Total, Received, Submitted, Completed, Expired, Expiring ≤3 days | Y | `stat-grid` (clickable → filters list) |
| Case detail: user info, reason, questions, doc checklist, submission history + timestamps, SLA | Y | `CaseDetail` (full-page) |
| SLA indicator green >7d / amber 4–7d / red ≤3d | Y | `SlaIndicator` (`Badge` dot tones) + legend |
| CSV export | Partial | "Export CSV" `Button` present (visual; no file generated in mock) |
| Search by user email, submission ID, or case ID | Y | search filters across name/email/sub/id |
| Excluded fields (Last Updated, RFI Type, CP ID, …) not shown | Y | none rendered |

**Copy source:** brand voice (page title/subtitle, empty state, SLA legend). **Gaps:** see below
(Completed tone, CSV is non-functional in a static mock).

---

## Story 2 — Merchant-Initiated Response & Document Upload

**Mobbin reference:** query *"respond to request, upload documents panel with drag and drop file
dropzone, questions form with checkboxes and notes, submit for review"* (web) → **Deel "Add new
items"** (screen `9f389a3f…`): dashed dropzone with format/size hint + right-rail context. Secondary:
Docusign "Add documents/recipients" for mandatory `*` field treatment.

| Acceptance criterion (PRD Story 2) | Covered | Where in mockup |
|---|---|---|
| Inline question rendering, no separate page/navigation | Y | Respond panel expands inside the case-detail `Card` |
| Each question shows text, type pill, mandatory indicator | Y | `q-head`: title + `Tag` type pill + `*` required |
| File upload: drag-drop / browse, JPG/PNG/PDF, ≤10 MB, multi-file, preview | Y | `Upload multiple accept=".jpg,.jpeg,.png,.pdf"` + file list |
| Client-side validation before upload | Y | `onFiles` checks type + size, shows error states |
| Multiple choice, select-all, selected highlighted blue | Y | `Checkbox` per option; selected row `is-on` (info-blue) |
| Free text: expandable textarea w/ placeholder | Y | `Textarea` with counter |
| Copy all questions (one click, plain text) | Y | `Copybox multiline` with assembled text |
| Optional notes field | Y | `Textarea` "Add a note for our operations team (optional)" |
| On submit → "Submitted — Under Review"; ops notified; audit logged | Y | status flips to Submitted; success `Toast`; history step added |
| Submit disabled until all mandatory answered | Y | `canSubmit` gates the primary `Button` |
| Error states (unsupported format / >10 MB / corrupted / already resolved) | Y | `Alert`/`Upload` errors — strings quoted from PRD §9 |

**Copy source:** PRD §9 verbatim for file errors + "This case has already been resolved."; brand
voice for headings/helpers/toast. Interactive: file validation, choice toggling, submit-gating and
the submit→toast transition all run live.

---

## Story 3 — Role-Based Access Control

**Mobbin reference:** query *"team members settings, invite member by email with role dropdown,
members table with roles and permissions, manage access"* (web) → **Lyssna "Manage your team"**
(screen `249efdbd…`): seat-plan banner, email + role + invite row, member list with per-row role
menu. Secondary: Vercel "Invite Team Members" (Members / Pending tabs + row menus), Gumroad (role
dropdown per member).

| Acceptance criterion (PRD Story 3) | Covered | Where in mockup |
|---|---|---|
| Role definitions: Admin ×1, Ops User ×5, Viewer ×3 | Y | seat counter + members table |
| Permission matrix (who can view / export / respond / manage / settings) | Y | "Permissions" tab matrix `Table` |
| UI hidden/disabled per role; Viewers see no action buttons | Y | "Preview as" switch hides Export/Respond/invite/menus for Viewer |
| No cross-merchant visibility | Y | stated on Permissions tab |
| Member invitation by email + role at invite; seat limit enforced w/ message | Y | invite row; seat-limit `Alert` quotes PRD message |
| Access revocation / role changes; sessions invalidated ≤5 min | Y | row `Menu` (change role / revoke) + 5-min note |
| Audit trail: user email, action, case ID, timestamp; queryable by ops | Y | "Activity log" tab `Table` |

**Copy source:** PRD Story 3 Req 4 verbatim for the seat-limit message; brand voice elsewhere.
**Permission enforcement is exercisable** via the global "Preview as Admin / Ops User / Viewer"
control in the top bar — it also gates Story 1 (Export hidden for Viewer) and Story 2 (Respond
hidden for Viewer); navigating to Team management as Ops/Viewer shows an access-denied panel.

---

## Flagged gaps & deviations (honest list)

1. **"Completed" status colour.** PRD design note specifies Completed = *teal*. The `Tag` component
   ships no `teal` tone (tones: positive/critical/warning/info/neutral/brand). To avoid inventing a
   prop, Completed is mapped to `tone="brand"` (vibrant-green chip) — the closest catalog tone and
   visually distinct from Submitted (`positive`, soft green). **Decision needed:** add a `teal` Tag
   tone to the DS, or accept `brand`.
2. **SLA indicator** uses `Badge dot` + tone (brand/warning/critical) + text — no dedicated
   traffic-light component exists; this is grounded in documented `Badge` props.
3. **Submission-history timeline** uses `Steps orientation="vertical"` — the DS has no dedicated
   timeline component; the vertical stepper is the documented fit.
4. **CSV export** is a visual `Button` only; a static mock does not generate a file.
5. **Pagination** is visual (2 pages shown); the sample dataset isn't sliced across pages.
6. **Side drawer** for case detail was not used — per approval, detail is a **full-page view**
   (adds a Back action / breadcrumb the PRD flow did not explicitly specify).
7. **Copywriter skill unavailable** — copy authored from `brand_guidelines.txt` + PRD strings (see
   Build path). Recommend a copy pass once `straitsx-web3-copywriter` is available.
8. **In-browser render not verified** in-sandbox (no browser; CDN blocked by network allowlist).
