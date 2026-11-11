import type { NavItem, Profile } from "@/types/content";

export const profile: Profile = {
  name: "Chuni Miao",
  nickname: "Lorina",
  role: "Data Analyst / Strategist",
  course: "MSc Analytics and Management",
  school: "London Business School",
  email: "lorinamiao@gmail.com",
  linkedin: "https://www.linkedin.com/in/chuni-miao-6302662a5",
  shortBio:
    "I start from first principles and let the data change my mind. I like building things — below are some things I've made, grouped by what kind of thing they are.",
  shopBio:
    "LOREM — expanding shop bio placeholder. Replace with the real shop story in a later session.",
};

export const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/books", label: "Bookshelf" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/earth", label: "Living on Earth" },
  { href: "/clips", label: "Clips of life" },
];
