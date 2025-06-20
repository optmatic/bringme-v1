import { Header } from "@/components/header";
import { FeaturedArticle } from "@/components/featured-article";
import { ArticleList } from "@/components/article-list";
import { Footer } from "@/components/footer";
import { getAllArticles } from "@/lib/keystatic";

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-lime-50/20 to-green-50/30">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FeaturedArticle />
        <ArticleList articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
