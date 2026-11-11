import { getClips } from "@/lib/content";

export const metadata = { title: "Clips of life" };

export default function ClipsPage() {
  const clips = getClips();
  return (
    <div>
      <h1 style={{ margin: "0 0 var(--space-prose)" }}>Clips of life</h1>
      <p>The shared gallery arrives later. For now, clips are listed as text.</p>
      <ul className="prose-list">
        {clips.map((c) => (
          <li key={c.id}>
            <em>{c.group}</em> — {c.alt}.
          </li>
        ))}
      </ul>
    </div>
  );
}
