import { Link } from "@/components/ui/Link";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div>
      <h1 style={{ margin: "0 0 var(--space-prose)" }}>Projects</h1>
      <p>
        Prototypes and workflows — each one a loop from research to something people can use.
      </p>
      <ul className="prose-list">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`}>{p.title}</Link>
            {" — "}
            {p.summary}{" "}
            <em>
              ({p.category}, {p.role}, {p.period})
            </em>
            .
          </li>
        ))}
      </ul>
    </div>
  );
}
