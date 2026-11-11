import { Link } from "@/components/ui/Link";
import { getProfile, getProjects } from "@/lib/content";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const profile = getProfile();
  const projects = getProjects();

  return (
    <div>
      <h1 style={{ margin: "0 0 var(--space-prose)" }}>About</h1>
      <p>{profile.shortBio}</p>

      <h2 style={{ margin: "var(--space-section) 0 var(--space-prose)" }}>Selected work</h2>
      <ul className="prose-list">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`}>{p.title}</Link>
            {" — "}
            {p.summary}{" "}
            <em>
              ({p.role}, {p.period})
            </em>
            .
          </li>
        ))}
      </ul>
    </div>
  );
}
