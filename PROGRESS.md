# PROGRESS.md

Session log for the Portfolio site. **Append only** — never rewrite earlier entries.

## Session table

| Session | Name | Status | Notes |
| --- | --- | --- | --- |
| S0 | Foundation | pending | Tokens, shell, six empty routes, `AGENTS.md`, `PROGRESS.md` |
| S1 | Content model | pending | Types + seed data; plain-text lists |
| S2 | Bookshelf | pending | Interactive shelf + card |
| S3 | Article + projects | pending | Shared article layout + project pages |
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
