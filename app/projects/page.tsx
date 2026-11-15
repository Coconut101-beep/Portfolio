import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div>
      <h1 style={{ margin: "0 0 0.75em" }}>Projects</h1>
      <ProjectGrid
        projects={projects}
        lead="Prototypes, workflows and educational models — each card opens the case study."
      />
    </div>
  );
}
