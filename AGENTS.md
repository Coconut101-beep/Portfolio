# AGENTS.md — engineering contract

This is a long-term site built across many separate Cursor sessions.
Treat the design brief as the source of truth for visual design.
Treat **this file** as the source of truth for architecture.
If the two conflict: **this file wins for architecture; the brief wins for design.**

This repository (`Portfolio`) is standalone. It is not connected to Lovable.

## Hard module boundaries

Every area of the site owns its own folder. One concern, one home.

| Path | Owns |
| --- | --- |
| `/styles/tokens.css` | Colours, type scale, spacing, motion durations. **The only CSS file with raw values in it.** |
| `/app/layout.tsx` | App shell only: left rail, identity block, `<main>`. |
| `/components/shell/` | Rail, nav, identity block, mobile menu. |
| `/components/ui/` | Tiny primitives (`Link`, `Hairline`, `Label`). Nothing else. |
| `/components/article/` | Shared long-form page layout. |
| `/components/gallery/` | Shared photo grid and lightbox. |
| `/components/bookshelf/` | Bookshelf and its pop-up card. Used by one page. |
| `/app/<route>/page.tsx` | Thin: import a layout component, pass it data. |
| `/data/<collection>.ts` | All copy and content, typed, one file per collection. |
| `/lib/content.ts` | The only place pages get data from. |
| `/docs/decisions.md` | Short notes when a decision changes. |

### Rules that make sessions safe

- **Content never lives inside a component.** If a string appears on screen, it comes from `/data`.
- **No raw colour, font size, radius or duration outside `tokens.css`. Ever.**
- A component in `/components/bookshelf` must not import from `/components/gallery`, `/components/article`, or `/app/*`. Feature folders don't know about each other.
- Anything used by two features moves to `/components/ui`, and only then.
- Adding a page means adding a route file and a data file. It never means editing the shell.
- Prefer adding an optional field to a type over changing an existing one. Don't rename exported props or data fields once a later session depends on them; add a new one and migrate.
- **Delete nothing outside the files you were asked to touch.**

## Change map

Ask for changes in these shapes. Each should touch one place:

| Ask | Touch |
| --- | --- |
| Change the background / accent / type | `styles/tokens.css` only |
| Change a book note, add a book | `data/books.ts` only |
| Add a project | `data/projects.ts` plus one route file |
| Change how the bookshelf card looks or moves | `components/bookshelf` only |
| Change the photo grid everywhere | `components/gallery` only |
| Change how article pages are laid out | `components/article` only |
| Add a nav item | `components/shell` plus one stub route |
| Change my bio or email | `data/profile.ts` only |

If a request would need edits in **two feature folders at once**, say so and propose the smallest split before doing it.

## Sessions

Each session is a fresh chat. Each has a scope, a file allow-list, and a definition of done.
If a task needs a file outside its allow-list, **stop and ask** instead of widening the change.

Sessions are a **menu, not a strict queue**. The owner may run them out of order or book several at once.
When multiple sessions run together: keep each feature inside its own folder, do not cross-import feature folders, and list every allow-list you are using in the five-line start reply.
**S0 (shell + tokens + empty routes) still comes before any page that needs the shell**, unless the owner explicitly waives that.

| Session | Scope | Allow-list (summary) | Done when |
| --- | --- | --- | --- |
| **S0** Foundation | Tokens, type scale, app shell, six empty routes, `AGENTS.md`, `PROGRESS.md` | `tokens.css`, `layout.tsx`, `components/shell/*`, `components/ui/*`, `app/*/page.tsx` stubs | All six routes render the shell on mobile and desktop with no content |
| **S1** Content model | Types and seed files for projects, books, photos, posts, plus `lib/content.ts`. Lorem clearly marked | `/data/*`, `/lib/content.ts`, `/types/*` | Every page can list its items as plain text |
| **S2** Bookshelf | Whole interactive shelf and card | `components/bookshelf/*`, `data/books.ts`, `app/books/page.tsx`, plus tokens for shelf shadow and timing | Hover, click, keyboard, Esc and mobile bottom sheet all work; nothing outside this folder changed |
| **S3** Article + projects | Shared article layout, project index, three project pages | `components/article/*`, project routes/data as needed | One shared layout serves all project pages; layout generic enough for thoughts |
| **S4** Thoughts | Reuse `components/article/*` **untouched** | `data/posts.ts`, `app/thoughts/*` | Post pages render through the S3 layout with **zero** edits to `components/article` |
| **S5** Gallery + Living on Earth | Photo grid/lightbox + three photo groups | `components/gallery/*` plus related route/data | Grid, lightbox and empty slots work |
| **S6** Clips of life | Reuse `components/gallery/*` **untouched** | `data/clips.ts`, `app/clips/*` | Four groups render with **no** edits to `components/gallery` |
| **S7** About + identity | About page, expanding shop bio, email copy button | `app/about/page.tsx`, `components/shell/identity*`, `data/profile.ts` | About + identity behaviours work |
| **S8** Motion + polish | One pass across the site | Existing tokens only | Motion/polish complete without new raw values |
| **S9** A11y, perf, deploy | Focus order, alt text, contrast, Lighthouse mobile, static export | As required for that pass | Ship-ready on those checks |

## How every later session must start and end

### Start

1. Read `AGENTS.md` and `PROGRESS.md`.
2. Reply with **five lines**:
   - which session
   - which files you'll touch
   - which files you won't
   - what "done" means
   - anything in the brief you think is ambiguous
3. **Wait for go-ahead.**

### End

1. Run the build and lint.
2. Append to `PROGRESS.md`: session number, date, what changed, files touched, what's next, anything needed from the owner.
3. Keep it to a few lines. **Never rewrite earlier entries.**
