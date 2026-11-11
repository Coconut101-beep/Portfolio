import { Hairline } from "@/components/ui/Hairline";
import { Label } from "@/components/ui/Label";
import { Link } from "@/components/ui/Link";
import { getProfile, getProjects } from "@/lib/content";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const profile = getProfile();
  const projects = getProjects();

  return (
    <div style={{ maxWidth: "var(--content-max)" }}>
      <Label>{profile.role}</Label>
      <h1 style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-4xl)" }}>
        {profile.name}
      </h1>
      <p style={{ marginTop: "var(--space-2)", fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontStyle: "italic" }}>
        {profile.nickname}
      </p>
      <p style={{ marginTop: "var(--space-5)" }}>{profile.shortBio}</p>
      <p style={{ marginTop: "var(--space-3)", color: "var(--color-ink-muted)" }}>
        {profile.course} at {profile.school}.
      </p>

      <Hairline />

      <h2 style={{ fontSize: "var(--text-2xl)", margin: 0 }}>Selected work</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: "var(--space-4) 0 0", display: "grid", gap: "var(--space-4)" }}>
        {projects.map((p) => (
          <li key={p.slug}>
            <Label>{p.category}</Label>
            <div>
              <Link href={`/projects/${p.slug}`}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)" }}>{p.title}</span>
              </Link>
            </div>
            <p style={{ margin: "var(--space-1) 0 0", color: "var(--color-ink-muted)" }}>{p.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
