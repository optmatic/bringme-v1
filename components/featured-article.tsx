import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar, ArrowRight } from "lucide-react"

// Featured article data - would normally come from CMS
const featuredArticle = {
  slug: "climate-policy-challenges",
  title: "Australia's Climate Policy Faces New Challenges in Global Context",
  excerpt:
    "From international pressure to domestic economic concerns, Australia navigates complex terrain between competing interests and environmental commitments.",
  author: "Sarah Mitchell",
  publishedAt: "March 15",
  readTime: "8 min",
  category: "POLITICS",
  tags: ["Climate Policy", "Politics"],
  image: "/placeholder.svg?height=400&width=600&query=Australian parliament building with renewable energy imagery",
}

export function FeaturedArticle() {
  return (
    <section className="mb-8 sm:mb-12 pt-4 sm:pt-8">
      <Link
        href={`/article/${featuredArticle.slug}`}
        className="block group transition-all duration-300 relative p-4 sm:p-6 md:p-8 bg-gradient-to-br from-green-50/30 via-lime-50/20 to-green-50/30 border border-gray-200/60"
      >
        {/* Hover overlay effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-lime-500/5 shadow-[0_4px_20px_rgba(34,197,94,0.15)]"></div>
        </div>

        <div className="relative">
          {/* Category label */}
          <div className="mb-3 sm:mb-2">
            <span className="text-xs sm:text-sm font-medium text-green-600 uppercase tracking-wide group-hover:text-green-700 transition-colors">
              {featuredArticle.category}
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] mb-4 sm:mb-6 font-gothic group-hover:text-green-800 transition-colors">
            {featuredArticle.title}
          </h1>

          {/* Mobile-first layout */}
          <div className="space-y-4 lg:grid lg:grid-cols-12 lg:gap-6 lg:space-y-0">
            {/* Image - Mobile first, then desktop column */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-gray-100 border border-gray-200/60 overflow-hidden group-hover:border-green-200/80 transition-colors">
                <Image
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  role="presentation"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-1.5 text-xs text-white">
                  Photo: Australian Parliament
                </div>

                {/* Image overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Content column */}
            <div className="lg:col-span-5 flex flex-col space-y-3 sm:space-y-4">
              {/* Excerpt */}
              <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-inter group-hover:text-slate-700 transition-colors">
                {featuredArticle.excerpt}
              </p>

              {/* Tags and Read link row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex flex-wrap gap-2">
                  {featuredArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-green-700 border border-green-200/60 px-2 py-0.5 group-hover:border-green-300/80 group-hover:bg-green-50/80 transition-all rounded-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-sm font-medium text-green-600 group-hover:text-green-700 transition-colors flex items-center self-start sm:self-auto">
                  Read <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Author and metadata row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-600 gap-2 sm:gap-3 pt-2 border-t border-gray-200/60 sm:border-t-0 sm:pt-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <span className="text-green-600 font-medium text-xs">SM</span>
                  </div>
                  <span>{featuredArticle.author}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span>{featuredArticle.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
