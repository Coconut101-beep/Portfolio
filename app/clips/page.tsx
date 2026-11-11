import { Label } from "@/components/ui/Label";
import { getClips } from "@/lib/content";

export const metadata = { title: "Clips of life" };

export default function ClipsPage() {
  const clips = getClips();
  return (
    <div>
      <Label>Clips of life</Label>
      <h1 style={{ margin: "var(--space-3) 0 var(--space-4)", fontSize: "var(--text-4xl)" }}>Clips of life</h1>
      <p style={{ color: "var(--color-ink-muted)" }}>
        Reuses the gallery in S6. For now, plain text slots from data:
      </p>
      <ul>
        {clips.map((c) => (
          <li key={c.id}>
            {c.group}: {c.alt}
          </li>
        ))}
      </ul>
    </div>
  );
}
