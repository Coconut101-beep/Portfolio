import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { getProject, getProjects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <ArticleLayout
      eyebrow={`${project.category} · ${project.role} · ${project.period}`}
      title={project.title}
      summary={project.summary}
      backHref="/projects"
      backLabel="All projects"
    >
      <section>
        <h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>The problem</h2>
        <p style={{ marginTop: "var(--space-2)" }}>{project.problem}</p>
      </section>
      <section>
        <h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>What I did</h2>
        <ul>
          {project.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>Results</h2>
        <ul>
          {project.outcome.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      {project.technical ? (
        <section>
          <h2 style={{ fontSize: "var(--text-xl)", margin: 0 }}>How it works technically</h2>
          <p style={{ marginTop: "var(--space-2)" }}>{project.technical}</p>
        </section>
      ) : null}
    </ArticleLayout>
  );
}
