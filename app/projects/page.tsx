import { Hairline } from "@/components/ui/Hairline";
import { Label } from "@/components/ui/Label";
import { Link } from "@/components/ui/Link";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div style={{ maxWidth: "var(--content-max)" }}>
      <Label>Projects</Label>
      <h1 style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-4xl)" }}>
        Projects that started as questions
      </h1>
      <p style={{ marginTop: "var(--space-4)", color: "var(--color-ink-muted)" }}>
        Prototypes and workflows — each one a loop from research to something people can use.
      </p>
      <Hairline />
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-5)" }}>
        {projects.map((p) => (
          <li key={p.slug}>
            <Label>
              {p.category} · {p.role} · {p.period}
            </Label>
            <div style={{ marginTop: "var(--space-2)" }}>
              <Link href={`/projects/${p.slug}`}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)" }}>{p.title}</span>
              </Link>
            </div>
            <p style={{ margin: "var(--space-2) 0 0", color: "var(--color-ink-muted)" }}>{p.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
