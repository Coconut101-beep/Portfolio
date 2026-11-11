import { Link } from "@/components/ui/Link";
import { getPosts } from "@/lib/content";

export const metadata = { title: "Thoughts" };

export default function ThoughtsPage() {
  const posts = getPosts();
  return (
    <div>
      <h1 style={{ margin: "0 0 var(--space-prose)" }}>Thoughts</h1>
      <ul className="prose-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/thoughts/${post.slug}`}>{post.title}</Link>
            {" — "}
            {post.summary} <em>({post.date})</em>.
          </li>
        ))}
      </ul>
    </div>
  );
}
