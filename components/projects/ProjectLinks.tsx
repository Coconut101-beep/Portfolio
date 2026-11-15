import type { ProjectLinks as Links } from "@/types/content";
import { Link } from "@/components/ui/Link";

const LABELS: Record<keyof Omit<Links, "primary">, string> = {
  demo: "Interactive note",
  notebook: "Notebook",
  repo: "Repository",
  writeup: "Phase 0 audit",
  related: "Related dashboard (DataCrunch)",
};

type Props = {
  links: Links;
};

export function ProjectLinks({ links }: Props) {
  const entries = (Object.keys(LABELS) as Array<keyof typeof LABELS>).flatMap((key) => {
    const href = links[key];
    return href ? [{ key, href, label: LABELS[key] }] : [];
  });

  if (entries.length === 0) return null;

  return (
    <p>
      {entries.map((item, index) => (
        <span key={item.key}>
          {index > 0 ? " · " : null}
          <Link href={item.href} external={/^https?:\/\//.test(item.href)}>
            {item.label}
          </Link>
        </span>
      ))}
    </p>
  );
}
