import { getPhotos } from "@/lib/content";

export const metadata = { title: "Living on Earth" };

export default function EarthPage() {
  const photos = getPhotos();
  return (
    <div>
      <h1 style={{ margin: "0 0 var(--space-prose)" }}>Living on Earth</h1>
      <p>Gallery arrives in a later session. For now, the groups live as a plain list.</p>
      <ul className="prose-list">
        {photos.map((p) => (
          <li key={p.id}>
            <em>{p.group}</em> — {p.alt}.
          </li>
        ))}
      </ul>
    </div>
  );
}
