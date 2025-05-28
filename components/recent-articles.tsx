import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const articles = [
  {
    id: 1,
    title: "Indigenous Voice Proposal Sparks National Debate on Constitutional Recognition",
    excerpt: "The proposed Indigenous Voice to Parliament has ignited discussions across political and social...",
    category: "POLITICS",
    readTime: "8 MIN READ",
    image: "/placeholder.svg?height=200&width=300&query=Indigenous Australian community meeting",
  },
  {
    id: 2,
    title: "Electoral Reform Debate Intensifies as Next Federal Election Approaches",
    excerpt: "Calls for electoral system changes grow louder as parties prepare for the upcoming federal election",
    category: "POLITICS",
    readTime: "7 MIN READ",
    image: "/placeholder.svg?height=200&width=300&query=Australian electoral commission voting booth",
  },
  {
    id: 3,
    title: "Australian Parliament Debates New National Security Legislation",
    excerpt: "Proposed laws would expand intelligence agencies&apos; powers while raising privacy concerns",
    category: "POLITICS",
    readTime: "6 MIN READ",
    image: "/placeholder.svg?height=200&width=300&query=Australian parliament house security debate",
  },
]

export function RecentArticles() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
        <Button variant="ghost" className="text-green-600 hover:text-green-700">
          VIEW ALL
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative h-48 bg-gray-100">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>

            <div className="p-6 space-y-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                {article.category}
              </Badge>

              <h3 className="text-lg font-semibold text-gray-900 leading-tight hover:text-green-600 transition-colors duration-200 cursor-pointer">
                {article.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">{article.excerpt}</p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 p-0">
                  READ
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
