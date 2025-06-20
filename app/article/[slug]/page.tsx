import { ArticleHeader } from "@/components/article-header";
import { ArticleContent } from "@/components/article-content";
import { Footer } from "@/components/footer";
import { getArticle } from "@/lib/keystatic";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50/30 via-lime-50/20 to-green-50/30">
      <ArticleHeader article={article} />
      <main className="flex-1 w-full">
        <ArticleContent article={article} />
      </main>
      <Footer />
    </div>
  );
}
