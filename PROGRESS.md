# PROGRESS.md

Session log for the Portfolio site. **Append only** — never rewrite earlier entries.

## Session table

| Session | Name | Status | Notes |
| --- | --- | --- | --- |
| S0 | Foundation | in progress | Tokens, shell, six routes scaffolded in Next.js |
| S1 | Content model | in progress | Seed data + `lib/content.ts` in place (some LOREM) |
| S2 | Bookshelf | in progress | Interactive shelf + card (hover/keyboard/Esc/mobile sheet) |
| S3 | Article + projects | in progress | Shared article layout + project index/detail |
| S4 | Thoughts | pending | Reuse article layout untouched |
| S5 | Gallery + Living on Earth | pending | Grid + lightbox + photo groups |
| S6 | Clips of life | pending | Reuse gallery untouched |
| S7 | About + identity | pending | About, shop bio, email copy |
| S8 | Motion + polish | pending | Tokens only |
| S9 | A11y, perf, deploy | pending | Focus, alt, contrast, Lighthouse, export |

## Log

### Docs bootstrap — 2026-11-11 (Europe/London)

- Wrote engineering contract `AGENTS.md` and this `PROGRESS.md` in a new standalone `Portfolio` repo (no Lovable).
- Files touched: `AGENTS.md`, `PROGRESS.md`, `README.md`.
- Next: await go-ahead for **S0 Foundation** (no feature/components yet).
- Need from owner: confirm the two docs, then green-light S0.

### Remote published — 2026-11-11 (Europe/London)

- Pushed foundation docs to `https://github.com/Coconut101-beep/Portfolio`.
- Files touched: `AGENTS.md`, `PROGRESS.md`, `README.md` (name aligned to Portfolio).
- Next: owner confirms docs; then S0.
- Need from owner: confirm `AGENTS.md` / `PROGRESS.md`, green-light S0.

### Remote push blocked — 2026-11-11 (Europe/London)

- Target confirmed: `https://github.com/Coconut101-beep/Portfolio` (empty).
- `git push` denied for `cursor[bot]` — Cursor GitHub App lacks write access to this repo.
- Files ready locally: `AGENTS.md`, `PROGRESS.md`, `README.md` (`27ef7eb`).
- Next: owner grants Cursor app access to `Portfolio`; agent re-pushes.
- Need from owner: add repo in GitHub → Settings → Applications → Cursor → repository access.

### Session order clarified — 2026-11-11 (Europe/London)

- Owner: sessions may run out of order / in parallel; start with first page, bookshelf, and projects.
- Updated `AGENTS.md` Sessions section accordingly (S0 shell still first unless waived).
- Files touched: `AGENTS.md`, `PROGRESS.md`.
- Next: scaffold Portfolio web from the MD contract (not the old Lovable site).
- Need from owner: Cursor write access to GitHub `Portfolio` for push; confirm palette if not the design-brief defaults.

### Surfer intro design brief filed — 2026-11-11 (Europe/London)

- Added `docs/SURFER_INTRO_SPEC.md` plus `docs/reference-frames.png` (and related design refs).
- Files touched: `docs/SURFER_INTRO_SPEC.md`, `docs/reference-frames.png`, `docs/surfer-intro-how-to.png`, `docs/bookshelf-confessions-reference.png`, `PROGRESS.md`.
- Next: push when Cursor has write access; still awaiting confirm on `AGENTS.md` / `PROGRESS.md` before S0; do **not** start Surfer Phase 0 until explicitly asked.
- Need from owner: Cursor app access to `Portfolio` for push; then green-light order (docs confirm → S0 vs Surfer Phase 0).

### S0–S3 scaffold started — 2026-11-11 (Europe/London)

- Built Next.js Portfolio from `AGENTS.md` (not the old Lovable site). About, Bookshelf, Projects live locally.
- Files touched: `styles/tokens.css`, `app/**`, `components/{shell,ui,article,bookshelf}/**`, `data/**`, `lib/content.ts`, `types/content.ts`, `docs/decisions.md`, package files.
- Next: grant Cursor write access to GitHub `Portfolio` so we can push; then polish + publish shareable link.
- Need from owner: Cursor app access to `Coconut101-beep/Portfolio`; feedback on first-page / shelf / project look.

### S2 Bookshelf redesign — 2026-11-11 (Europe/London)

- Poster-style hero + multi-row shelves (7 per row) so all books fit; empty “room for one more” slot.
- Files: `components/bookshelf/*`, `data/books.ts`, `app/books/page.tsx`, `styles/tokens.css`, `types/content.ts`, `lib/content.ts`, `public/bookshelf/*`.
- Next: replace LOREM book titles/notes with real ones; push when GitHub access granted.
- Need from owner: real book list / notes; Cursor write access to `Portfolio`.

### Visual spec applied — 2026-11-11 (Europe/London)

- Matched measured editorial spec: core palette, Source Serif 4 only, nav/text geometry, identity row, colour bank + spine remap.
- Files: `styles/tokens.css`, `app/**`, `components/{shell,ui,article,bookshelf}/**`, `data/{books,profile}.ts`, `types/content.ts`, `lib/content.ts`, `docs/decisions.md`.
- Next: avatar image; push when GitHub access granted; real book notes.
- Need from owner: avatar asset; Cursor write access to `Portfolio`.

### Design guide filed — 2026-11-11 (Europe/London)

- Added `docs/design-guide.md` (older Lovable-era guide).
- Note: conflicts with the measured visual spec already applied (#F0E4C3 / Source Serif 4 / fixed columns). Awaiting owner on which wins.
- Files touched: `docs/design-guide.md`, `PROGRESS.md`.
- Next: owner confirms whether to keep measured spec or revert toward this guide.

### Design guide migration — 2026-11-11 (Europe/London)

- Owner chose `docs/design-guide.md` over the measured visual spec.
- Migrated tokens (beige #F3E7C4, Tiffany links, sunset accent), Georgia system stack, 160px sticky tab rail, 576px content / 720px bookshelf, bookshelf spine palette, nav “— ” current state + 4px hover slide.
- Files: `styles/tokens.css`, `app/{layout,globals,about,projects,thoughts,earth,clips}/**`, `components/{shell,ui,article,bookshelf}/**`, `data/books.ts`, `types/content.ts`, `docs/decisions.md`.
- Next: avatar asset; real book notes; push when Cursor has write access to GitHub `Portfolio`; Surfer intro only when asked.
- Need from owner: avatar; Cursor app write access to `Coconut101-beep/Portfolio`.
