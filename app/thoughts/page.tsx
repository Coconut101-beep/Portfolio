import { Label } from "@/components/ui/Label";
import { Link } from "@/components/ui/Link";
import { getPosts } from "@/lib/content";

export const metadata = { title: "Thoughts" };

export default function ThoughtsPage() {
  const posts = getPosts();
  return (
    <div style={{ maxWidth: "var(--content-max)" }}>
      <Label>Thoughts</Label>
      <h1 style={{ margin: "var(--space-3) 0 var(--space-5)", fontSize: "var(--text-4xl)" }}>Thoughts</h1>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-4)" }}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/thoughts/${post.slug}`}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)" }}>{post.title}</span>
            </Link>
            <p style={{ margin: "var(--space-1) 0 0", color: "var(--color-ink-muted)" }}>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
