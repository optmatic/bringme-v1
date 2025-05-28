import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ds } from "@/lib/design-system"

const relatedArticles = [
  {
    slug: "indigenous-voice-debate",
    title: "Indigenous Voice Proposal Sparks National Debate",
    excerpt: "Constitutional recognition discussions highlight societal divisions",
    readTime: "6 min read",
    tags: ["Indigenous Rights", "Politics"],
    image: "/placeholder.svg?height=200&width=300&query=Indigenous Australian community meeting",
  },
  {
    slug: "electoral-reform-debate",
    title: "Electoral Reform Debate Intensifies",
    excerpt: "System changes proposed ahead of federal election",
    readTime: "7 min read",
    tags: ["Electoral Reform", "Democracy"],
    image: "/placeholder.svg?height=200&width=300&query=Australian voting booth electoral system",
  },
]

interface RelatedArticlesProps {
  currentSlug: string
}

export function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
  const filtered = relatedArticles.filter((article) => article.slug !== currentSlug)

  if (filtered.length === 0) return null

  return (
    <section className="mt-12 space-y-6" role="complementary" aria-label="Related articles">
      <h2 className="text-2xl font-black text-gray-900 font-gothic">Related Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((article) => (
          <article
            key={article.slug}
            className={`${ds.components.cards.article} overflow-hidden hover:shadow-md transition-shadow duration-200`}
          >
            <div className="relative h-32 bg-gray-100 border-b border-gray-200/60">
              <Image
                src={article.image || "/placeholder.svg"}
                alt=""
                fill
                className="object-cover"
                role="presentation"
              />
            </div>

            <div className="p-4 space-y-3">
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className={`${ds.components.badges.tag} text-xs`}>
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 leading-tight font-gothic">
                <Link href={`/article/${article.slug}`} className="hover:text-green-600 transition-colors duration-200">
                  {article.title}
                </Link>
              </h3>

              <p className="text-sm text-gray-600 font-inter">{article.excerpt}</p>

              <div className="flex items-center text-xs text-gray-500 font-inter">
                <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
