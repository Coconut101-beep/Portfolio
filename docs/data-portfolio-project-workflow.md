# Data → Portfolio project workflow

How Educational project content moves from [`Coconut101-beep/Data`](https://github.com/Coconut101-beep/Data) into this site without inventing metrics.

## Roles

| Repo | Owns |
| --- | --- |
| **Data** | Project name, notebook, interactive HTML (`site/`), phase notes, real numbers |
| **DataCrunch** | Related Lending Club *regression* dashboard (interest-rate modelling) — link as related when useful; do not mix its metrics into the defaults case study |
| **Portfolio** | Site chrome, case-study pages, project cards, design-guide look |

## Contract (preferred)

Add this file in **Data** (once):

`portfolio/projects.json`

```json
{
  "projects": [
    {
      "id": "lending-club-defaults",
      "slug": "logistic-regression",
      "title": "Lending Club Defaults",
      "category": "Educational",
      "period": "2026",
      "role": "Analyst",
      "method": "Classification · Logistic regression",
      "summary": "One honest sentence from the notebook or site dek.",
      "state": "In progress",
      "links": {
        "repo": "https://github.com/Coconut101-beep/Data",
        "notebook": "https://github.com/Coconut101-beep/Data/blob/main/notebooks/AM04_Project1_Chuni.ipynb",
        "demo": "https://github.com/Coconut101-beep/Data/blob/main/site/index.html",
        "writeup": "https://github.com/Coconut101-beep/Data/blob/main/docs/phase-0-audit.md",
        "related": "https://github.com/Coconut101-beep/DataCrunch",
        "primary": "demo"
      }
    }
  ]
}
```

Rules:

- Only fields you can point to in Data (or DataCrunch for `related`).
- No placeholder AUCs, fake lift, or “coming soon” link targets.
- `slug` is the Portfolio route under `/projects/<slug>`.

Until that manifest exists, the sync script falls back to the project table in Data’s `README.md`.

## Automated refresh (Portfolio)

```bash
# Needs a GitHub token that can read the private Data repo
export GITHUB_TOKEN=…   # or GH_TOKEN
npm run sync:data-projects
```

What it does:

1. Fetches `portfolio/projects.json` from Data (or parses `README.md`).
2. Writes `data/from-data/catalog.json` (committed snapshot).
3. Prints which Educational slugs changed.

What it does **not** do automatically:

- Rewrite long-form case-study prose (`problem` / `approach` / `outcome` / `sections`) — those stay hand-authored in `data/projects.ts` from the notebook + phase audit so narrative stays accurate.
- Deploy the site.
- Copy interactive `site/` assets into `public/` (optional; see below).

After sync, merge any new catalog rows into `data/projects.ts`, then open a PR as usual.

### Optional GitHub Action

A workflow can run `npm run sync:data-projects` on a schedule or `repository_dispatch` from Data, commit `data/from-data/catalog.json`, and open a PR. That still needs a human (or a follow-up script) to merge narrative fields when a **new** project appears.

## Add a new Data project (checklist)

1. **In Data:** notebook + (optional) `site/` interactive + README row + `portfolio/projects.json` entry.
2. **In Portfolio:** `npm run sync:data-projects`.
3. **In Portfolio:** add/merge the Educational object in `data/projects.ts` — fill case-study fields from the notebook/audit only.
4. **In Portfolio:** no new route file needed (`app/projects/[slug]/page.tsx` already covers every slug).
5. Build, lint, PR, deploy host.

## Update an existing project

1. Change numbers/copy in Data (notebook, `site/`, audit).
2. Update the matching bullets in `data/projects.ts` (and catalog links if paths moved).
3. Re-run sync if the manifest/README row changed.
4. Deploy Portfolio.

## Deploy / refresh steps that cannot be fully automated

| Step | Why |
| --- | --- |
| Grant Cursor/GitHub token read access to **Data** | Sync cannot fetch a private repo without it |
| Author case-study narrative | Metrics can sync; judgement in “What I did / Results” should not be auto-generated |
| Host or publish Data `site/index.html` | GitHub blob URLs are not a live demo; Pages/Netlify/public copy is a separate publish |
| Merge + deploy Portfolio | CI can assist; production cutover is still a host deploy |
| Loan CSV | Stays out of git (licence); never sync raw rows into Portfolio |

## Live interactive note

Today Portfolio links to the Data repo’s `site/index.html` (and notebook). To serve the interactive under this domain later:

1. Copy Data `site/*` into `public/data/lending-club-defaults/` (or a sync step).
2. Point `links.demo` at `/data/lending-club-defaults/`.
3. Keep Portfolio design tokens for the case study page; the interactive may keep its own note CSS.

## First project mapping

| Data | Portfolio |
| --- | --- |
| Lending Club defaults | `/projects/logistic-regression` (title: Lending Club Defaults) |
| Interactive logistic note | `links.demo` |
| AM04 notebook | `links.notebook` |
| DataCrunch Streamlit (rate regression) | `links.related` only |
