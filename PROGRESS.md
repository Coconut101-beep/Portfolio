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
- Local verify: `next build` clean; `/about` `/books` `/projects` `/thoughts` 200 on :3000; bookshelf dialog + nav current marker OK.
- Branch: `cursor/design-guide-migration-7c77` (`91d5c89`) — `git push` still 403 for `cursor[bot]`.
- Next: avatar asset; real book notes; grant Cursor write access then push/PR; Surfer intro only when asked.
- Need from owner: avatar; Cursor app write access to `Coconut101-beep/Portfolio`.

### Lending Club + Data sync — 2026-11-15 (UTC)

- Added Educational project **Lending Club Defaults** at `/projects/logistic-regression` (case study + sections from Data notebook/audit/site only).
- Projects index + About selected work use floating cards (`components/projects/*`); design-guide palette.
- Sync: `npm run sync:data-projects`, `data/from-data/catalog.json`, `docs/data-portfolio-project-workflow.md`.
- Files: `data/projects.ts`, `types/content.ts`, `components/projects/*`, `app/projects/*`, `app/about/page.tsx`, `scripts/sync-data-projects.mjs`, `docs/*`, `PROGRESS.md`.
- Next: add `portfolio/projects.json` in Data; optional live host for Data `site/`; grant token read on Data for CI sync.
- Need from owner: confirm card layout; Pages/host for interactive note if desired on-domain.

### Projects star map — 2026-11-15 (UTC)

- Replaced floating cards with ORIGIN star map (concentric orbits, active vs soon stars, Tiffany active nodes).
- Data & Algorithms → `/projects/logistic-regression`; Hackathon → DormVibe; Business Reflection → YOUBELONG.
- Files: `components/projects/ProjectStarMap.tsx`, `star-map.module.css`, `data/project-stars.ts`, `styles/tokens.css`, pages, removed card grid files.
- Next: owner confirm star angles/labels; optional second DA session when a real Data project ships.

### Merge main into PR — 2026-11-15 (UTC)

- Merged `origin/main` (`466d8f7` notebook + `public/lending-club/*`).
- Conflict: `app/projects/page.tsx` → kept star map.
- Deduped duplicate `logistic-regression` in `data/projects.ts` (kept PR Educational entry).
- Kept main’s dedicated notebook page for that slug (shadows `[slug]` case-study render).
- Next: owner decide whether case-study ArticleLayout should wrap/precede the notebook.

### S8 project star map — 2026-11-22

- Made both orbits static, matched spokes to inactive dots, and gave active dots dark blue cores, translucent rims, and radial motion.
- Updated components/projects/ProjectStarMap.tsx, components/projects/star-map.module.css, and styles/tokens.css.
- Diff check passed. Build and lint require dependencies, and npm ci hit a permissions error in node_modules. Next is a browser check after dependency installation.

### S8 project labels — 2026-11-22

- Positioned all labels below their dots and kept titles on one line in ProjectStarMap.tsx, star-map.module.css, and tokens.css.
- Local review pending. The npm registry timed out and the offline cache could not complete installation.

### S8 project dot motion — 2026-11-22

- Increased radial travel and switched to a quicker linear back-and-forth in star-map.module.css and tokens.css.
- Lint reported seven warnings and zero errors. Build hit a permissions error writing .next. The hydration warning needs the console attribute diff to identify its source.

### S8 staggered project motion — 2026-11-22

- Animated every project dot with slower easing and varied radial travel, speed, and phase. Updated ProjectStarMap.tsx, star-map.module.css, and tokens.css.
- Lint reported seven warnings and zero errors. Build hit a permissions error writing .next.

### S8 randomized project motion — 2026-11-22

- Randomized radial targets around a 9-unit mean travel. Spoke endpoints track dots, turns decelerate smoothly, and the active rim radius increased by one unit.
- Updated ProjectStarMap.tsx, star-map.module.css, and tokens.css. Production build and lint passed with existing warnings. Browser feel remains for review.

### S8 full project orbits — 2026-11-22

- Fixed flickering caused by the CSS build converting 1900ms to 1.9s before JavaScript read the number. Each dot now settles at a new radius, completes a full lap, and pauses briefly before repeating.
- Updated ProjectStarMap.tsx, star-map.module.css, and tokens.css. Build and lint passed with existing warnings. Browser review pending.

### S8 radial project cycles — 2026-11-22

- Corrected the motion in ProjectStarMap.tsx and tokens.css. Each of the seven dots travels out along its spoke, returns to its starting point, pauses briefly, and then samples a new distance.
- Production build, lint, and diff check passed. Browser review pending.

### S7 About cleanup — 2026-11-22

- Removed the Selected work section and project map from app/about/page.tsx. The Projects route retains its map.
- Build and lint passed with existing warnings. No owner action needed.

### S2 bookshelf comparison — 2026-11-25

- Appended the 3D library below the current shelf on `/books`. It uses the portfolio palette, native WebGL, genre filters, book previews, and a responsive details panel. Missing artwork uses generated title covers.
- Files: `app/books/page.tsx`, `components/bookshelf/{OrbitalLibrary.tsx,orbital-library.module.css,orbit-controller.ts,orbit-renderer.ts}`, `data/books.ts`, `styles/tokens.css`, and this log.
- Build and lint passed with existing warnings. Chrome verified desktop and mobile navigation, filtering, previews and details, reduced motion, and the WebGL fallback. Both designs are ready for the owner to compare.

### S2 independent globe catalog — 2026-11-25

- Copied all 14 original entries into a separate globe list in `data/books.ts`. New globe entries need only a title and author.
- Updated `data/books.ts`, `app/books/page.tsx`, `components/bookshelf/OrbitalLibrary.tsx`, and this log.
- Build and lint passed with existing warnings. Verified the separate catalogs and a minimal entry, plus the copied author, note, and quote in Chrome. Future globe content edits go in `orbitalBookEntries`.

### S2 globe motion and catalog cleanup — 2026-11-25

- Added a two-minute clockwise orbit with hover pause and reduced-motion support. Genre selection stays single-select and uses arrays for selections and book genres.
- Removed sample entries from both catalogs and kept the one real title found in the repository. Globe entries accept title, authors, notes, genres, and a cover image path.
- Updated `data/books.ts`, `components/bookshelf/{OrbitalLibrary.tsx,orbital-library.module.css,orbit-controller.ts}`, `styles/tokens.css`, and this log. Build, lint, catalog checks, and desktop/mobile Chrome checks passed with existing lint warnings.
- Next: import any additional real titles once the owner shares the bookshelf database link or export.

### S2 original shelf restoration — 2026-11-25

- Restored the original 14-book catalog exactly. The separate globe catalog keeps the verified title and slow clockwise rotation with hover pause.
- Enabled multi-select genres on the globe. Books match any selected genre, All Books clears the selection, and the mobile drawer stays open for additional picks.
- Updated `data/books.ts`, `components/bookshelf/OrbitalLibrary.tsx`, and this log. Build and lint passed with existing warnings. Chrome verified the restored shelf, autoplay and mobile drawer. Filter checks covered overlapping genres, deselection, and clearing with test data.

### S2 full globe catalog — 2026-11-25

- Copied all 14 original bookshelf entries into the globe's independent catalog, including the existing examples. Added an inline entry template in `data/books.ts` for title, authors, notes, cover, and genres.
- Updated `data/books.ts` and this log. Build and lint passed with existing warnings. Desktop and mobile Chrome verified both catalogs, multi-select, and hover pause. The owner can curate `orbitalBookEntries` directly.
