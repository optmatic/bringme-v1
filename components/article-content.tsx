"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, User, Share2, ArrowUp, Calendar, ChevronDown, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ds, getHeadingClasses, getLinkClasses } from "@/lib/design-system"

interface Article {
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: string
  tags: string[]
  category: string
  image?: string
}

interface ArticleContentProps {
  article: Article
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  // Table of contents sections with subsections
  const sections = [
    {
      id: "economic-implications",
      title: "Economic Implications",
      subsections: [{ id: "regional-impact-assessment", title: "Regional Impact Assessment" }],
    },
    {
      id: "international-pressure",
      title: "International Relations",
      subsections: [{ id: "trade-implications", title: "Trade Implications" }],
    },
    {
      id: "looking-forward",
      title: "The Path Forward",
      subsections: [{ id: "policy-recommendations", title: "Policy Recommendations" }],
    },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setReadingProgress(Math.min(100, Math.max(0, progress)))
    }

    const updateActiveSection = () => {
      const allSectionIds = sections.flatMap((section) => [section.id, ...section.subsections.map((sub) => sub.id)])

      const sectionElements = allSectionIds.map((id) => document.getElementById(id)).filter(Boolean)

      const currentSection = sectionElements.find((element) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 180 && rect.bottom >= 180
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100) // Match header scroll threshold
      updateReadingProgress()
      updateActiveSection()
    }

    // Initial calls
    handleScroll()

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateReadingProgress, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateReadingProgress)
    }
  }, [sections])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* Compact Article Header */}
          <header className={ds.components.cards.header + " overflow-hidden"}>
            {/* Meta Info Bar */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100/80 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-lime-300 flex items-center justify-center shadow-sm">
                  <User className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-700 font-inter">
                  <span className="font-medium">{article.author}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span>{article.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>{article.readTime} read</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className={`${ds.components.badges.category} px-3 py-1 text-xs font-medium font-inter uppercase tracking-wide`}
                >
                  {article.category}
                </Badge>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="text-xs font-medium text-slate-700 font-inter">{Math.round(readingProgress)}%</div>
                  <div className="w-12 h-1.5 bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-lime-300 transition-all duration-300 ease-out"
                      style={{ width: `${readingProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Title, Excerpt & Image Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              {/* Content Section */}
              <div className="md:col-span-2 space-y-6">
                <h1
                  className={
                    getHeadingClasses("h1", "lg") +
                    " text-slate-950 leading-tight mb-6 font-black text-3xl sm:text-4xl lg:text-5xl"
                  }
                >
                  {article.title}
                </h1>
                <p className="text-base text-slate-700 leading-relaxed font-inter font-light italic">
                  {article.excerpt}
                </p>
              </div>

              {/* Feature Image */}
              {article.image && (
                <div className="md:col-span-1">
                  <div className="relative w-full aspect-square overflow-hidden shadow-sm bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200/60">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt=""
                      fill
                      className="object-cover"
                      priority
                      role="presentation"
                    />
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Article Content */}
          <article className={`prose prose-lg lg:prose-xl max-w-none ${ds.components.cards.article} p-4 sm:p-6 lg:p-8`}>
            <div className={`${ds.spacing.sections.gap} text-slate-950 leading-relaxed font-inter text-sm`}>
              <p className="mb-6 text-slate-950">
                Australia stands at a critical juncture in its climate policy development. As global leaders intensify
                their commitments to emissions reduction targets, the pressure on Australia to align with international
                standards has never been greater. The recent UN Climate Summit saw renewed pledges from major economies,
                leaving Australia&apos;s current policy framework under increased scrutiny.
              </p>

              <p className="mb-6 text-slate-950">
                Prime Minister&apos;s recent statements indicate a potential shift in the government&apos;s approach,
                acknowledging the economic opportunities that could arise from a more ambitious climate agenda. &quot;We
                recognize that the global economy is transitioning,&quot; the Prime Minister stated at a{" "}
                <a href="#" className={getLinkClasses()}>
                  press conference
                </a>{" "}
                last week. &quot;Australia has an opportunity to become a renewable energy superpower.&quot;
              </p>

              <section id="economic-implications" className="scroll-mt-64 my-8">
                <h2
                  className={`${ds.typography.sizes.h2.base} ${ds.components.headings.h2.background} ${ds.components.headings.h2.border} ${ds.components.headings.h2.display} ${ds.components.headings.h2.font} ${ds.spacing.headings.h2.marginTop} ${ds.spacing.headings.h2.marginBottom} ${ds.spacing.headings.h2.padding} text-slate-950`}
                >
                  Economic Implications
                </h2>

                <p className="mb-6 text-slate-950">
                  The economic implications of climate policy reform remain a contentious issue. Traditional industries,
                  particularly coal and natural gas, continue to represent significant export revenue and employment.
                  However, emerging research from the{" "}
                  <a href="#" className={getLinkClasses()}>
                    Climate Council
                  </a>{" "}
                  suggests that renewable energy investments could generate three times more jobs per dollar invested
                  than fossil fuel projects.
                </p>

                <h3
                  id="regional-impact-assessment"
                  className={`${ds.typography.sizes.h3.base} ${ds.components.headings.h3.background} ${ds.components.headings.h3.border} ${ds.components.headings.h3.display} ${ds.components.headings.h3.font} ${ds.spacing.headings.h3.marginTop} ${ds.spacing.headings.h3.marginBottom} ${ds.spacing.headings.h3.padding} text-slate-900 scroll-mt-64 mt-8 mb-4`}
                >
                  Regional Impact Assessment
                </h3>

                <p className="mb-6 text-slate-950">
                  Regional communities face unique challenges in this transition. Mining-dependent towns across
                  Queensland and Western Australia are particularly vulnerable to policy shifts that could affect coal
                  and gas exports. The{" "}
                  <a href="#" className={getLinkClasses()}>
                    Regional Australia Institute
                  </a>{" "}
                  has published comprehensive research on these impacts.
                </p>

                {/* Enhanced Quote Block */}
                <blockquote className="relative my-8 p-5 bg-gradient-to-r from-green-50/70 to-lime-50/70 border-l-2 border-green-300 shadow-sm">
                  <div className="absolute top-4 left-4 w-6 h-6 bg-green-300/70 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">&quot;</span>
                  </div>
                  <div className="ml-10">
                    <p className="text-base italic text-slate-800 font-inter leading-relaxed mb-3">
                      &quot;The transition to a low-carbon economy presents both challenges and opportunities. Those
                      nations that move decisively now will secure competitive advantages in the industries of the
                      future.&quot;
                    </p>
                    <footer className="text-xs font-medium text-green-600 font-inter">
                      — Dr. Helena Wong, Climate Economics Institute
                    </footer>
                  </div>
                </blockquote>

                <p className="mb-6 text-slate-950">
                  Regional communities, particularly those dependent on fossil fuel industries, have expressed concerns
                  about the pace of transition. The government has proposed a{" "}
                  <a href="#" className={getLinkClasses()}>
                    $3.5 billion Regional Transition Fund
                  </a>{" "}
                  aimed at supporting affected communities through economic diversification programs.
                </p>
              </section>

              <section id="international-pressure" className="scroll-mt-64 my-8">
                <h2
                  className={`${ds.typography.sizes.h2.base} ${ds.components.headings.h2.background} ${ds.components.headings.h2.border} ${ds.components.headings.h2.display} ${ds.components.headings.h2.font} ${ds.spacing.headings.h2.marginTop} ${ds.spacing.headings.h2.marginBottom} ${ds.spacing.headings.h2.padding} text-slate-950`}
                >
                  International Relations
                </h2>

                <p className="mb-6 text-slate-950">
                  Australia&apos;s international relationships are increasingly influenced by climate policy positions.
                  Trade agreements, diplomatic relations, and participation in international forums are all affected by
                  perceptions of Australia&apos;s climate commitment.
                </p>

                <h3
                  id="trade-implications"
                  className={`${ds.typography.sizes.h3.base} ${ds.components.headings.h3.background} ${ds.components.headings.h3.border} ${ds.components.headings.h3.display} ${ds.components.headings.h3.font} ${ds.spacing.headings.h3.marginTop} ${ds.spacing.headings.h3.marginBottom} ${ds.spacing.headings.h3.padding} text-slate-900 scroll-mt-64 mt-8 mb-4`}
                >
                  Trade Implications
                </h3>

                <p className="mb-6 text-slate-950">
                  The{" "}
                  <a href="#" className={getLinkClasses()}>
                    European Union&apos;s proposed carbon border adjustments
                  </a>{" "}
                  could significantly impact Australian exports, creating additional economic pressure for policy
                  reform. Similarly, major trading partners are increasingly factoring climate considerations into their
                  economic relationships.
                </p>
              </section>

              <section id="looking-forward" className="scroll-mt-64 my-8">
                <h2
                  className={`${ds.typography.sizes.h2.base} ${ds.components.headings.h2.background} ${ds.components.headings.h2.border} ${ds.components.headings.h2.display} ${ds.components.headings.h2.font} ${ds.spacing.headings.h2.marginTop} ${ds.spacing.headings.h2.marginBottom} ${ds.spacing.headings.h2.padding} text-slate-950`}
                >
                  The Path Forward
                </h2>

                <p className="mb-6 text-slate-950">
                  The path forward requires careful navigation of competing interests and stakeholder concerns. Success
                  will likely depend on the government&apos;s ability to articulate a clear vision that addresses both
                  economic and environmental imperatives while maintaining social cohesion.
                </p>

                <h3
                  id="policy-recommendations"
                  className={`${ds.typography.sizes.h3.base} ${ds.components.headings.h3.background} ${ds.components.headings.h3.border} ${ds.components.headings.h3.display} ${ds.components.headings.h3.font} ${ds.spacing.headings.h3.marginTop} ${ds.spacing.headings.h3.marginBottom} ${ds.spacing.headings.h3.padding} text-slate-900 scroll-mt-64 mt-8 mb-4`}
                >
                  Policy Recommendations
                </h3>

                <p className="mb-6 text-slate-950">
                  As Australia continues to grapple with these challenges, the decisions made in the coming months will
                  have lasting implications for the country&apos;s economic future, international standing, and
                  environmental legacy. Key policy frameworks from the{" "}
                  <a href="#" className={getLinkClasses()}>
                    Australian Climate Policy Institute
                  </a>{" "}
                  provide valuable guidance for this transition.
                </p>
              </section>
            </div>
          </article>

          {/* Article Footer */}
          <footer className="inline-block bg-green-50/50 p-3 border border-green-100/50 rounded-md">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-700 font-inter">Tagged:</span>
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/80 text-green-700 text-xs px-2 py-0.5 font-inter border border-green-100/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </footer>
        </div>

        {/* Sidebar with Australian Flora Background */}
        <div className="xl:col-span-1">
          <div
            className={`sticky space-y-6 transition-all duration-500 ease-in-out z-40 ${isScrolled ? "top-20 xl:top-24" : "top-24"}`}
          >
            {/* Table of Contents with Background */}
            <div className={`${ds.components.cards.sidebar} p-4 sm:p-6 relative overflow-hidden bg-white`}>
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-4 font-gothic">In This Article</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <div key={section.id}>
                      {/* Main section */}
                      <div className="flex items-center justify-between">
                        <a
                          href={`#${section.id}`}
                          className={`block text-sm transition-colors duration-200 font-inter flex-1 ${
                            activeSection === section.id
                              ? "text-green-600 font-medium"
                              : "text-slate-700 hover:text-slate-900"
                          }`}
                        >
                          {section.title}
                        </a>
                        {section.subsections.length > 0 && (
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            aria-label={`Toggle ${section.title} subsections`}
                          >
                            {expandedSections.includes(section.id) ? (
                              <ChevronDown className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Subsections */}
                      {section.subsections.length > 0 && expandedSections.includes(section.id) && (
                        <div className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-3">
                          {section.subsections.map((subsection) => (
                            <a
                              key={subsection.id}
                              href={`#${subsection.id}`}
                              className={`block text-xs transition-colors duration-200 font-inter ${
                                activeSection === subsection.id
                                  ? "text-green-600 font-medium"
                                  : "text-slate-600 hover:text-slate-800"
                              }`}
                            >
                              {subsection.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Action Buttons - Updated to match sidebar background and styling */}
            <div className="space-y-3">
              <div className={`${ds.components.cards.sidebar} p-0 overflow-hidden`}>
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-2 w-full p-4 text-green-600 hover:bg-green-50/50 transition-colors font-inter text-sm"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span>Back to top</span>
                </button>
              </div>

              <div className={`${ds.components.cards.sidebar} p-0 overflow-hidden`}>
                <button
                  onClick={shareArticle}
                  className="flex items-center gap-2 w-full p-4 text-green-600 hover:bg-green-50/50 transition-colors font-inter text-sm"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share article</span>
                </button>
              </div>
            </div>

            {/* No duplicate reading progress on mobile */}
          </div>
        </div>
      </div>
    </div>
  )
}
