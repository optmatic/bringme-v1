import { ArticleHeader } from "@/components/article-header";
import { ArticleContent } from "@/components/article-content";
import { Footer } from "@/components/footer";
import { getPost } from "@/lib/ghost";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ArticleHeader article={post} />
      <ArticleContent article={post} />
      <Footer />
    </div>
  );
}
