import type { ProjectStar } from "@/types/content";

/**
 * Projects origin map — positions match docs/media star-map layout.
 * Data & Algorithms → constellation page (/projects/data-algorithms).
 */
export const projectStars: ProjectStar[] = [
  {
    id: "hackathon",
    label: "Hackathon",
    code: "HK · 1",
    ring: 2,
    angle: 0,
    status: "active",
    slug: "dormvibe",
  },
  {
    id: "health",
    label: "Health",
    code: "soon",
    ring: 2,
    angle: 318,
    status: "soon",
  },
  {
    id: "data-algorithms",
    label: "Data & Algorithms",
    code: "DA · 2",
    ring: 1,
    angle: 42,
    status: "active",
    slug: "data-algorithms",
  },
  {
    id: "business-reflection",
    label: "Business Reflection",
    code: "BR · 1",
    ring: 1,
    angle: 92,
    status: "active",
    slug: "youbelong",
  },
  {
    id: "science",
    label: "Science",
    code: "soon",
    ring: 2,
    angle: 148,
    status: "soon",
  },
  {
    id: "space",
    label: "Space",
    code: "soon",
    ring: 2,
    angle: 208,
    status: "soon",
  },
  {
    id: "agentic-ai",
    label: "Agentic AI",
    code: "soon",
    ring: 2,
    angle: 248,
    status: "soon",
  },
];

export const projectStarMapCopy = {
  origin: "ORIGIN",
  hint: "Select a star to open a session.",
};
