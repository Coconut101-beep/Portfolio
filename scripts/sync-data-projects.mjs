#!/usr/bin/env node
/**
 * Pull Educational project catalog from Coconut101-beep/Data into Portfolio.
 *
 * Prefers Data/portfolio/projects.json when present.
 * Falls back to parsing the project table in Data/README.md.
 * Writes data/from-data/catalog.json and prints a merge hint for data/projects.ts.
 *
 * Auth: GITHUB_TOKEN or GH_TOKEN with read access to Data (private).
 * Without a token, uses the local snapshot and exits 0 with a warning.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "data/from-data/catalog.json");
const OWNER = "Coconut101-beep";
const REPO = "Data";
const MANIFEST_PATH = "portfolio/projects.json";
const README_PATH = "README.md";

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

async function ghGet(path) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
  const headers = {
    Accept: "application/vnd.github.raw+json",
    "User-Agent": "portfolio-sync-data-projects",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const body = await res.text();
    const err = new Error(`GitHub ${res.status} for ${path}: ${body.slice(0, 200)}`);
    err.status = res.status;
    throw err;
  }
  return res.text();
}

function parseReadmeTable(md) {
  const projects = [];
  const rowRe =
    /^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]*)\|\s*([^|]*)\|/gm;
  let match;
  while ((match = rowRe.exec(md))) {
    const [, no, name, state, linkCell, interactiveCell] = match;
    if (name.toLowerCase() === "project") continue;
    const notebook = extractHref(linkCell);
    const demo = extractHref(interactiveCell);
    const id = slugify(name);
    projects.push({
      id,
      slug: id === "lending-club-defaults" ? "logistic-regression" : id,
      title: name.trim(),
      category: "Educational",
      period: new Date().getFullYear().toString(),
      role: "Analyst",
      method: undefined,
      summary: `${name.trim()} — see Data repo for the notebook and interactive note.`,
      state: state.trim(),
      links: {
        repo: `https://github.com/${OWNER}/${REPO}`,
        notebook: notebook || undefined,
        demo: demo || undefined,
        primary: demo ? "demo" : notebook ? "notebook" : "repo",
      },
      sourceRow: Number(no),
    });
  }
  return projects;
}

function extractHref(cell) {
  const m = /\[[^\]]*\]\(([^)]+)\)/.exec(cell || "");
  if (!m) return undefined;
  const href = m[1].trim();
  if (href.startsWith("http")) return href;
  return `https://github.com/${OWNER}/${REPO}/blob/main/${href.replace(/^\.\//, "")}`;
}

function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function loadLocalSnapshot() {
  try {
    return JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  await mkdir(dirname(OUT), { recursive: true });
  let projects = [];
  let sourcePath = MANIFEST_PATH;
  let mode = "remote-manifest";

  try {
    const raw = await ghGet(MANIFEST_PATH);
    const parsed = JSON.parse(raw);
    projects = Array.isArray(parsed) ? parsed : parsed.projects || [];
  } catch (err) {
    if (err.status === 404) {
      mode = "remote-readme";
      sourcePath = README_PATH;
      const md = await ghGet(README_PATH);
      projects = parseReadmeTable(md);
    } else if (!token) {
      mode = "local-snapshot";
      const snap = await loadLocalSnapshot();
      if (!snap) {
        console.error(
          "No GITHUB_TOKEN and no local catalog. Add a token with Data read access, or keep data/from-data/catalog.json.",
        );
        process.exit(1);
      }
      console.warn("Warning: could not reach Data (%s). Keeping local catalog.", err.message);
      console.log("Synced projects: %d (unchanged local snapshot)", snap.projects?.length ?? 0);
      return;
    } else {
      throw err;
    }
  }

  const catalog = {
    sourceRepo: `${OWNER}/${REPO}`,
    sourcePath,
    syncedAt: new Date().toISOString().slice(0, 10),
    syncMode: mode,
    projects,
  };

  await writeFile(OUT, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log("Wrote %s (%d project(s) via %s)", OUT, projects.length, mode);
  console.log(
    "Next: merge Educational entries into data/projects.ts (preserve Prototype/Workflow hand copy).",
  );
  for (const p of projects) {
    console.log(" - %s → /projects/%s", p.title || p.id, p.slug || p.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
