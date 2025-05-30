"use client";

import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ds } from "@/lib/design-system";
import { GhostPost } from "@/lib/ghost";

interface ArticleListProps {
  posts: GhostPost[];
}

export function ArticleList({ posts }: ArticleListProps) {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);

  return (
    <section role="main" aria-label="Articles">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-black text-slate-950 font-gothic">
          Latest Stories
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-green-400 via-lime-300 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            onMouseEnter={() => setHoveredArticle(post.id)}
            onMouseLeave={() => setHoveredArticle(null)}
          >
            <div className="relative h-48 bg-gray-100">
              <Image
                src={post.feature_image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 space-y-4">
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                {post.tags[0]?.name || "Uncategorized"}
              </Badge>

              <h3 className="text-lg font-semibold text-gray-900 leading-tight hover:text-green-600 transition-colors duration-200 cursor-pointer">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.reading_time} min read
                </div>
                <Link
                  href={`/article/${post.slug}`}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                >
                  READ
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
