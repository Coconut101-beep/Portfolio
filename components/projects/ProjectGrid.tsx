import type { Project } from "@/types/content";
import { ProjectCard } from "./ProjectCard";
import styles from "./projects.module.css";

type Props = {
  projects: Project[];
  lead?: string;
};

export function ProjectGrid({ projects, lead }: Props) {
  return (
    <div>
      {lead ? <p className={styles.intro}>{lead}</p> : null}
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
