import { Header } from "@/components/header";
import { FeaturedArticle } from "@/components/featured-article";
import { ArticleList } from "@/components/article-list";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-lime-50/20 to-green-50/30">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FeaturedArticle />
        <ArticleList />
      </main>
      <Footer />
    </div>
  );
}
