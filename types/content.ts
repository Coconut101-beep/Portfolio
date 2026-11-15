export type NavItem = {
  href: string;
  label: string;
};

export type Profile = {
  name: string;
  nickname: string;
  role: string;
  course: string;
  school: string;
  email: string;
  linkedin: string;
  shortBio: string;
  shopBio?: string;
  avatarSrc?: string;
};

/** Bookshelf spine colours from docs/design-guide.md */
export type SpineColor = "coral" | "teal" | "green" | "gold" | "rose" | "paper" | "ink";

export type Book = {
  id: string;
  title: string;
  authors: string;
  spineLabel: string;
  spineColor: SpineColor;
  note: string[];
  quote?: string;
  stature?: "short" | "regular" | "tall";
};

export type BookshelfPageCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  shelfLead: string;
  roomForOneMoreLabel: string;
};

/** Outbound artifacts — only real destinations; omit missing ones. */
export type ProjectLinks = {
  repo?: string;
  notebook?: string;
  demo?: string;
  writeup?: string;
  related?: string;
  primary?: "repo" | "notebook" | "demo" | "writeup" | "related";
};

export type ProjectSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  period: string;
  role: string;
  summary: string;
  problem: string;
  approach: string[];
  outcome: string[];
  technical?: string;
  /** Quiet meta for Educational pages, e.g. Classification · Logistic regression */
  method?: string;
  links?: ProjectLinks;
  /** Extra long-form sections after the case-study block (Educational explainers). */
  sections?: ProjectSection[];
  /** Source id in the Data repo catalog when this entry was synced. */
  dataProjectId?: string;
  /** Card accent from the design-guide colour bank (token name, not a raw hex). */
  cardTone?: "teal" | "coral" | "gold" | "green" | "rose" | "sky";
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
};

export type Photo = {
  id: string;
  src: string;
  alt: string;
  group: string;
};
