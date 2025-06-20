import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CategoryHero } from "@/components/category-hero";
import { CategoryArticleList } from "@/components/category-article-list";
import { DiscoverContent } from "@/components/discover-content";
import { notFound } from "next/navigation";

// Define valid categories (matching the navigation items)
const validCategories = ["australia", "world", "politics", "feed", "discover"];

// This would normally come from your CMS or API
const getCategoryData = (category: string) => {
  const categoryMap: Record<string, { title: string; description: string }> = {
    australia: {
      title: "Australia",
      description:
        "In-depth coverage of Australian politics, society, and culture.",
    },
    world: {
      title: "World",
      description:
        "Global perspectives on international affairs and their impact on Australia.",
    },
    politics: {
      title: "Politics",
      description:
        "Analysis and insights on Australian political landscape and policy debates.",
    },
    feed: {
      title: "Feed",
      description: "The latest stories and updates from across all categories.",
    },
    discover: {
      title: "Discover",
      description:
        "A curated collection of interesting content from around the web that I find insightful and worth sharing.",
    },
  };

  return categoryMap[category] || null;
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryLower = category.toLowerCase();

  // Check if the category is valid
  if (!validCategories.includes(categoryLower)) {
    notFound();
  }

  const categoryData = getCategoryData(categoryLower);

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-lime-50/20 to-green-50/30">
      <Header activeCategory={categoryLower} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CategoryHero
          title={categoryData.title}
          description={categoryData.description}
        />

        {/* Render different content based on category */}
        {categoryLower === "discover" ? (
          <DiscoverContent />
        ) : (
          <CategoryArticleList category={categoryLower} />
        )}
      </main>
      <Footer />
    </div>
  );
}
