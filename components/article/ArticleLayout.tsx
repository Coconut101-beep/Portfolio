import type { ReactNode } from "react";
import { Hairline } from "@/components/ui/Hairline";
import { Label } from "@/components/ui/Label";
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
    <article style={{ maxWidth: "var(--content-max)" }}>
      {eyebrow ? <Label>{eyebrow}</Label> : null}
      <h1 style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-4xl)" }}>{title}</h1>
      {summary ? (
        <p style={{ marginTop: "var(--space-4)", fontSize: "var(--text-lg)", color: "var(--color-ink-muted)" }}>
          {summary}
        </p>
      ) : null}
      <Hairline />
      <div style={{ display: "grid", gap: "var(--space-5)" }}>{children}</div>
      <p style={{ marginTop: "var(--space-7)", color: "var(--color-accent)" }}>
        <Link href={backHref}>← {backLabel}</Link>
      </p>
    </article>
  );
}
