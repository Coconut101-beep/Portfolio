import type { NavItem, Profile } from "@/types/content";

export const profile: Profile = {
  name: "Chuni Miao",
  nickname: "Lorina",
  role: "data analyst / strategist",
  course: "MSc Analytics and Management",
  school: "London Business School",
  email: "lorinamiao@gmail.com",
  linkedin: "https://www.linkedin.com/in/chuni-miao-6302662a5",
  shortBio:
    "I'm Chuni Miao, a data analyst / strategist studying MSc Analytics and Management at London Business School. I like building things — below are some things I've made, grouped by what kind of thing they are.",
  shopBio:
    "LOREM — expanding shop bio placeholder. Replace with the real shop story in a later session.",
  avatarSrc: undefined,
};

export const following = ["Google", "OpenAI"];

export const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/books", label: "Bookshelf" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/earth", label: "Living on Earth" },
  { href: "/clips", label: "Clips of life" },
];
