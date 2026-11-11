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
      <h2 style={{ margin: "var(--space-section) 0 var(--space-prose)" }}>The problem</h2>
      <p>{project.problem}</p>

      <h2 style={{ margin: "var(--space-section) 0 var(--space-prose)" }}>What I did</h2>
      <ul className="prose-list">
        {project.approach.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 style={{ margin: "var(--space-section) 0 var(--space-prose)" }}>Results</h2>
      <ul className="prose-list">
        {project.outcome.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {project.technical ? (
        <>
          <h2 style={{ margin: "var(--space-section) 0 var(--space-prose)" }}>How it works technically</h2>
          <p>{project.technical}</p>
        </>
      ) : null}
    </ArticleLayout>
  );
}
