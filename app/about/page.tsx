import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getProfile, getProjects } from "@/lib/content";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const profile = getProfile();
  const projects = getProjects();

  return (
    <div>
      <div className="content">
        <h1 style={{ margin: "0 0 0.75em" }}>About</h1>
        <p>{profile.shortBio}</p>
        <h2 style={{ margin: "1.75em 0 0.75em" }}>Selected work</h2>
      </div>
      <ProjectGrid projects={projects} />
    </div>
  );
}
