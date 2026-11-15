import NextLink from "next/link";
import type { Project } from "@/types/content";
import styles from "./projects.module.css";

const TONE_VAR: Record<NonNullable<Project["cardTone"]>, string> = {
  teal: "var(--color-book-teal)",
  coral: "var(--color-book-coral)",
  gold: "var(--color-book-gold)",
  green: "var(--color-book-green)",
  rose: "var(--color-book-rose)",
  sky: "var(--color-wave-sky)",
};

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  const tone = TONE_VAR[project.cardTone ?? "teal"];
  const meta = [project.category, project.method, project.period].filter(Boolean).join(" · ");

  return (
    <NextLink
      className={styles.card}
      href={`/projects/${project.slug}`}
      style={{ ["--tone" as string]: tone }}
    >
      <span className={styles.tone} aria-hidden="true" />
      <p className={styles.meta}>{meta}</p>
      <h2 className={styles.title}>{project.title}</h2>
      <p className={styles.summary}>{project.summary}</p>
      <p className={styles.cta}>Open project</p>
    </NextLink>
  );
}
