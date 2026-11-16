import { ProjectStarMap } from "@/components/projects/ProjectStarMap";
import { getProfile, getProjectStarMapCopy, getProjectStars } from "@/lib/content";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const profile = getProfile();
  const stars = getProjectStars();
  const copy = getProjectStarMapCopy();

  return (
    <div>
      <div className="content">
        <h1 style={{ margin: "0 0 0.75em" }}>About</h1>
        <p>{profile.shortBio}</p>
        <h2 style={{ margin: "1.75em 0 0.75em" }}>Selected work</h2>
      </div>
      <ProjectStarMap stars={stars} originLabel={copy.origin} hint={copy.hint} />
    </div>
  );
}
