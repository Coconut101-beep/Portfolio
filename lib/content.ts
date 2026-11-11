import { books, bookshelfPage } from "@/data/books";
import { clips } from "@/data/clips";
import { photos } from "@/data/photos";
import { posts } from "@/data/posts";
import { navItems, profile } from "@/data/profile";
import { projects } from "@/data/projects";

/** The only place pages get data from. */
export function getProfile() {
  return profile;
}

export function getNavItems() {
  return navItems;
}

export function getProjects() {
  return projects;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getBooks() {
  return books;
}

export function getBookshelfPage() {
  return bookshelfPage;
}

export function getPosts() {
  return posts;
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getPhotos() {
  return photos;
}

export function getClips() {
  return clips;
}
