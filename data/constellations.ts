import type { Constellation } from "@/types/content";

/**
 * Constellation (subproject) pages — Figma “subproject display” layout.
 * Untitled study is listed as soon (no real artifact yet).
 */
export const constellations: Constellation[] = [
  {
    id: "data-algorithms",
    code: "DA",
    slug: "data-algorithms",
    title: "Data & Algorithms",
    subtitle: "Models, datasets and the questions behind them.",
    breadcrumbIndex: "INDEX",
    entries: [
      {
        id: "lending-club-default",
        title: "Lending Club Default",
        year: "2026",
        tags: ["classification", "credit risk", "python"],
        angle: 0,
        ring: 2,
        status: "active",
        slug: "logistic-regression",
      },
      {
        id: "untitled-study",
        title: "Untitled study",
        year: "2026",
        tags: ["tbd"],
        angle: 180,
        ring: 2,
        status: "soon",
      },
    ],
  },
];
