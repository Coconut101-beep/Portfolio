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

/** Spine colours — named bank keys only, stored per book in data/books.ts */
export type SpineColor =
  | "foam"
  | "shell"
  | "parchment"
  | "sand"
  | "apricot"
  | "blush-clay"
  | "terracotta"
  | "sea-glass"
  | "sage"
  | "eucalyptus"
  | "deep-teal"
  | "slate-blue"
  | "oxblood"
  | "stone";

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
