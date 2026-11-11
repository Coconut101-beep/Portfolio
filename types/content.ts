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
