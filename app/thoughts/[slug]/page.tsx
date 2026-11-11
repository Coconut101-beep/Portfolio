import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { getPost, getPosts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: getPost(slug)?.title ?? "Thought" };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <ArticleLayout
      eyebrow={post.date}
      title={post.title}
      summary={post.summary}
      backHref="/thoughts"
      backLabel="All thoughts"
    >
      {post.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </ArticleLayout>
  );
}
