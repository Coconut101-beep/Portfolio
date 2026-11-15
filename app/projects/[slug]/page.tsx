import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
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

  const eyebrow = [project.category, project.method, project.role, project.period]
    .filter(Boolean)
    .join(" · ");

  return (
    <ArticleLayout
      eyebrow={eyebrow}
      title={project.title}
      summary={project.summary}
      backHref="/projects"
      backLabel="All projects"
    >
      {project.links ? <ProjectLinks links={project.links} /> : null}

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

      {project.sections?.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 style={{ margin: "var(--space-section) 0 var(--space-prose)" }}>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>
      ))}
    </ArticleLayout>
  );
}
