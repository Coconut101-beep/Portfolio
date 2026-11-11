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

export type Book = {
  id: string;
  title: string;
  authors: string;
  spineLabel: string;
  spineColor: "ocean" | "rose" | "gold" | "mint" | "rust" | "sky";
  note: string[];
  quote?: string;
  /** Optional height hint for organic shelf rhythm. */
  stature?: "short" | "regular" | "tall";
};

export type BookshelfPageCopy = {
  eyebrow: string;
  titleLines: [string, string, string];
  subtitle: string;
  shelfLead: string;
  roomForOneMoreLabel: string;
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
