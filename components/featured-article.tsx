import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { getFeaturedArticle } from "@/lib/keystatic";

export async function FeaturedArticle() {
  const article = await getFeaturedArticle();

  if (!article) {
    return null;
  }

  return (
    <section className="mb-8 sm:mb-12 pt-4 sm:pt-8">
      <Link href={`/article/${article.slug}`}>
        <article className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src={article.featureImage || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded-full">
                {article.tags[0]?.name || "Featured"}
              </span>
              <div className="flex items-center text-sm text-white/80">
                <Clock className="h-4 w-4 mr-1" />
                {article.readingTime} min read
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 font-gothic">
              {article.title}
            </h2>

            <p className="text-lg text-white/90 mb-4 line-clamp-2">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {article.author.profileImage && (
                  <Image
                    src={article.author.profileImage}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-sm text-white/80">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <span className="flex items-center text-green-400 hover:text-green-300 transition-colors duration-200">
                Read Article
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </section>
  );
}
