"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ds } from "@/lib/design-system"

// This would normally come from your CMS or API based on the category
const getArticlesByCategory = (category: string) => {
  // Sample articles data - in a real app, this would be filtered from your database
  const allArticles = [
    {
      slug: "climate-policy-challenges",
      title: "Australia's Climate Policy Faces New Challenges in Global Context",
      excerpt:
        "From international pressure to domestic economic concerns, Australia navigates complex terrain between competing interests and environmental commitments.",
      author: "Sarah Mitchell",
      publishedAt: "March 15",
      readTime: "8 min",
      category: "politics",
      tags: ["Climate Policy", "Politics"],
      image: "/placeholder.svg?height=400&width=600&query=Australian parliament building with renewable energy imagery",
    },
    {
      slug: "indigenous-voice-debate",
      title: "Indigenous Voice Proposal Sparks National Debate on Constitutional Recognition",
      excerpt:
        "The proposed Indigenous Voice to Parliament has ignited discussions across political and social landscapes.",
      author: "Michael Chen",
      publishedAt: "March 12",
      readTime: "6 min",
      category: "politics",
      tags: ["Indigenous Rights", "Politics"],
      image:
        "/placeholder.svg?height=300&width=500&query=Indigenous Australian community meeting constitutional recognition",
    },
    {
      slug: "electoral-reform-debate",
      title: "Electoral Reform Debate Intensifies as Next Federal Election Approaches",
      excerpt: "Calls for electoral system changes grow louder as parties prepare for the upcoming federal election.",
      author: "Emma Thompson",
      publishedAt: "March 10",
      readTime: "7 min",
      category: "politics",
      tags: ["Electoral Reform", "Politics"],
      image: "/placeholder.svg?height=300&width=500&query=Australian electoral commission voting booth democracy",
    },
    {
      slug: "housing-crisis-analysis",
      title: "Housing Affordability Crisis Reaches Breaking Point in Major Cities",
      excerpt:
        "New data reveals the extent of Australia's housing affordability crisis with implications for social mobility.",
      author: "David Park",
      publishedAt: "March 8",
      readTime: "9 min",
      category: "australia",
      tags: ["Housing Crisis", "Economics"],
      image: "/placeholder.svg?height=300&width=500&query=Australian housing development urban planning",
    },
    {
      slug: "democracy-challenges",
      title: "Democratic Institutions Under Pressure",
      excerpt: "Analysis of challenges facing Australia's democratic institutions in the modern era.",
      author: "Rachel Green",
      publishedAt: "March 1",
      readTime: "7 min",
      category: "australia",
      tags: ["Democracy", "Politics"],
      image: "/placeholder.svg?height=300&width=500&query=Australian parliament democracy",
    },
    {
      slug: "global-trade-impact",
      title: "Global Trade Tensions Impact Australian Exports",
      excerpt: "How international trade disputes are affecting key Australian export industries.",
      author: "James Wilson",
      publishedAt: "March 5",
      readTime: "8 min",
      category: "world",
      tags: ["Trade", "Economics"],
      image: "/placeholder.svg?height=300&width=500&query=Global trade shipping containers Australia exports",
    },
    {
      slug: "media-transformation",
      title: "Digital Transformation Reshapes Australian Media Landscape",
      excerpt: "Traditional media outlets adapt to changing consumption patterns and digital disruption.",
      author: "Lisa Zhang",
      publishedAt: "March 3",
      readTime: "6 min",
      category: "media",
      tags: ["Digital Media", "Journalism"],
      image: "/placeholder.svg?height=300&width=500&query=Australian media digital transformation newsroom",
    },
    {
      slug: "social-media-impact",
      title: "Social Media's Growing Influence on Public Discourse",
      excerpt: "Examining how digital platforms are reshaping political and social conversations in Australia.",
      author: "Tom Richards",
      publishedAt: "February 28",
      readTime: "7 min",
      category: "media",
      tags: ["Social Media", "Technology"],
      image: "/placeholder.svg?height=300&width=500&query=Social media influence public discourse Australia",
    },
  ]

  // For the "feed" category, return all articles
  if (category === "feed") {
    return allArticles
  }

  // For "discover", return a curated selection (in a real app, this would have specific logic)
  if (category === "discover") {
    return allArticles.filter((_, index) => index % 3 === 0) // Just a sample approach
  }

  // For other categories, filter by the category
  return allArticles.filter((article) => article.category === category)
}

interface CategoryArticleListProps {
  category: string
}

export function CategoryArticleList({ category }: CategoryArticleListProps) {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null)
  const articles = getArticlesByCategory(category)

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 border border-gray-200/60 bg-white/50">
        <p className="text-slate-700 font-inter">No articles found in this category.</p>
      </div>
    )
  }

  return (
    <section role="main" aria-label={`${category} Articles`}>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-black text-slate-950 font-gothic">
          Latest in {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-green-400 via-lime-300 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="group block h-full"
            onMouseEnter={() => setHoveredArticle(article.slug)}
            onMouseLeave={() => setHoveredArticle(null)}
          >
            <article
              className={`relative ${ds.components.cards.article} hover:shadow-md transition-all duration-300 overflow-hidden hover:border-green-300/60 h-full`}
              role="article"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Section */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  role="presentation"
                />

                {/* Category badge overlay */}
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="secondary"
                    className="bg-white/95 backdrop-blur-sm text-green-800 border border-green-200/60 px-2 py-1 text-xs font-medium font-inter shadow-sm rounded-none"
                  >
                    {article.tags[0]}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 space-y-3 flex-1 flex flex-col">
                <header className="flex-1">
                  <h3 className="font-bold text-sm sm:text-base text-slate-950 leading-tight font-gothic group-hover:text-green-800 transition-colors duration-200 mb-2">
                    {article.title}
                  </h3>

                  <p className="text-slate-700 text-xs sm:text-sm leading-normal font-inter line-clamp-2">
                    {article.excerpt}
                  </p>
                </header>

                {/* Meta Information */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100/80 mt-auto">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-600 font-inter">
                    <User className="h-3 w-3" aria-hidden="true" />
                    <span>{article.author}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-600 font-inter">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
