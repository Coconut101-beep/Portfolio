# Decisions

## 2026-11-11 — Sessions can run in parallel

Owner may book sessions out of order. Module boundaries still apply. S0 shell remains the prerequisite for pages that need the shell.

## 2026-11-11 — Stack is Next.js App Router

`AGENTS.md` paths (`/app`, `/styles/tokens.css`) map to a Next.js App Router project in this repo. Not Lovable / TanStack.

## 2026-11-11 — Measured editorial visual spec

Matched the owner’s measured reference: three-colour core (#F0E4C3 / #282624 / #34827E), Source Serif 4 only, fixed nav/text geometry (455/100 → 676/570), no cards/shadows/borders/sans. Colour bank appended for spines and rare surfaces only.

## 2026-11-11 — design-guide.md wins

Owner confirmed `docs/design-guide.md` as the design source of truth over the measured visual spec. Tokens, Georgia type, 160px sticky tabs, 576px content / 720px bookshelf, Tiffany links, and bookshelf palette now follow that guide.

## 2026-11-15 — Educational projects sync from Data

Lending Club Defaults lives at `/projects/logistic-regression`. Educational catalog snapshots come from `Coconut101-beep/Data` via `npm run sync:data-projects` → `data/from-data/catalog.json`. Case-study prose stays hand-authored in `data/projects.ts` from notebook/audit only. See `docs/data-portfolio-project-workflow.md`.

## 2026-11-15 — Projects origin star map

Projects index uses an ORIGIN star map (`components/projects/ProjectStarMap`, `data/project-stars.ts`) per the attached layout. Design-guide beige / ink / Tiffany only; monospace is local to the map. Active **Data & Algorithms** opens `/projects/logistic-regression`.

## 2026-11-15 — Merge main: Lending Club notebook route

`main` added `app/projects/logistic-regression/page.tsx` + `public/lending-club/*` (interactive note via `Notebook`). That static route takes precedence over `app/projects/[slug]` for the same path. Star map still links there. Case-study fields remain in `data/projects.ts` for sync/catalog; the live URL currently renders the notebook shell from `main`.
