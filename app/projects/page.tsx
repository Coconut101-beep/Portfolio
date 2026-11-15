import { ProjectStarMap } from "@/components/projects/ProjectStarMap";
import { getProjectStarMapCopy, getProjectStars } from "@/lib/content";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const stars = getProjectStars();
  const copy = getProjectStarMapCopy();

  return (
    <div>
      <h1 style={{ margin: "0 0 0.75em" }}>Projects</h1>
      <ProjectStarMap
        stars={stars}
        originLabel={copy.origin}
        hint={copy.hint}
        lead="Sessions radiate from origin — pick an active star to open the case study."
      />
    </div>
  );
}
