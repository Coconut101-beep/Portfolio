import type { ReactNode } from "react";
import { Link } from "@/components/ui/Link";

type Props = {
  eyebrow?: string;
  title: string;
  summary?: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
};

export function ArticleLayout({
  eyebrow,
  title,
  summary,
  children,
  backHref = "/projects",
  backLabel = "All projects",
}: Props) {
  return (
    <article className="content">
      {eyebrow ? <p style={{ fontStyle: "italic", marginBottom: "var(--space-prose)" }}>{eyebrow}</p> : null}
      <h1 style={{ margin: "0 0 var(--space-prose)" }}>{title}</h1>
      {summary ? <p>{summary}</p> : null}
      <div>{children}</div>
      <p style={{ marginTop: "var(--space-section)" }}>
        <Link href={backHref}>← {backLabel}</Link>
      </p>
    </article>
  );
}
