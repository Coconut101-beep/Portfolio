import { Label } from "@/components/ui/Label";
import { getPhotos } from "@/lib/content";

export const metadata = { title: "Living on Earth" };

export default function EarthPage() {
  const photos = getPhotos();
  return (
    <div>
      <Label>Living on Earth</Label>
      <h1 style={{ margin: "var(--space-3) 0 var(--space-4)", fontSize: "var(--text-4xl)" }}>Living on Earth</h1>
      <p style={{ color: "var(--color-ink-muted)" }}>
        Gallery arrives in S5. For now, plain text slots from data:
      </p>
      <ul>
        {photos.map((p) => (
          <li key={p.id}>
            {p.group}: {p.alt}
          </li>
        ))}
      </ul>
    </div>
  );
}
