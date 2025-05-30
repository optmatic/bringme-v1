"use client";

import { Badge } from "@/components/ui/badge";
import {
  Clock,
  User,
  Share2,
  ArrowUp,
  Calendar,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ds, getHeadingClasses, getLinkClasses } from "@/lib/design-system";
import { GhostPost } from "@/lib/ghost";

interface ArticleContentProps {
  article: GhostPost;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract sections from article content
  const sections =
    article.html.match(/<h[2-3][^>]*>.*?<\/h[2-3]>/g)?.map((heading) => {
      const id =
        heading.match(/id="([^"]+)"/)?.[1] ||
        heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const title = heading.replace(/<[^>]+>/g, "");
      const level = heading.startsWith("<h2") ? 2 : 3;
      return { id, title, level };
    }) || [];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  useEffect(() => {
    const updateHeaderHeight = () => {
      const stickyHeader = document.querySelector('header[class*="sticky"]');
      if (stickyHeader) {
        const height = stickyHeader.getBoundingClientRect().height;
        setHeaderHeight(height + 16);
      } else {
        setHeaderHeight(isScrolled ? 120 : 24);
      }
    };

    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    const updateActiveSection = () => {
      const sectionElements = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);
      const currentSection = sectionElements.find((element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 180 && rect.bottom >= 180;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      updateReadingProgress();
      updateActiveSection();
      updateHeaderHeight();
    };

    handleScroll();
    updateHeaderHeight();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        updateReadingProgress();
        updateHeaderHeight();
      },
      { passive: true }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateReadingProgress);
    };
  }, [sections, isScrolled]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8 xl:gap-12">
        {/* Main Content */}
        <div className="w-full xl:col-span-9 space-y-8">
          {/* Article Header */}
          <header
            ref={headerRef}
            className={
              ds.components.cards.header +
              " overflow-hidden border border-transparent shadow-[0_1px_6px_0_rgba(163,230,53,0.06)]"
            }
            style={{
              borderImage:
                "linear-gradient(135deg, #e0fbe6, #d9f99d, #f0fdf4) 1",
            }}
          >
            {/* Meta Info Bar */}
            <div className="flex items-center light-green-bg justify-between px-8 py-2 lg:px-10 lg:py-4 border-b border-gray-100/80 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-lime-300 flex items-center justify-center shadow-sm">
                  <User className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-700 font-inter">
                  <span className="font-medium">
                    {article.authors[0]?.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span>
                      {new Date(article.published_at).toLocaleDateString(
                        "en-GB",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>{article.reading_time} min read</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {article.tags[0] && (
                  <Badge
                    variant="secondary"
                    className={`${ds.components.badges.category} px-3 py-1 text-xs font-medium font-inter uppercase tracking-wide`}
                  >
                    {article.tags[0].name}
                  </Badge>
                )}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="text-xs font-medium text-slate-700 font-inter">
                    {Math.round(readingProgress)}%
                  </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 lg:px-8 lg:py-12 light-green-bg">
              <div className="lg:col-span-2 space-y-6">
                <h1
                  className={
                    getHeadingClasses("h1", "lg") +
                    " text-slate-950 leading-tight font-black text-2xl sm:text-3xl lg:text-4xl"
                  }
                >
                  {article.title}
                </h1>
                <p className="text-sm lg:text-lg text-slate-700 leading-relaxed font-inter font-light">
                  {article.excerpt}
                </p>
              </div>

              {article.feature_image && (
                <div className="lg:col-span-1">
                  <div
                    className="relative w-full aspect-[4/3] overflow-hidden light-green-bg border border-transparent shadow-[0_1px_6px_0_rgba(163,230,53,0.06)]"
                    style={{
                      borderImage:
                        "linear-gradient(135deg, #e0fbe6, #d9f99d, #f0fdf4) 1",
                    }}
                  >
                    <Image
                      src={article.feature_image}
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
          <article
            className={`prose prose-lg lg:prose-xl max-w-none ${ds.components.cards.article} border border-transparent shadow-[0_1px_6px_0_rgba(163,230,53,0.06)] p-4 sm:p-6 lg:p-8`}
            style={{
              borderImage:
                "linear-gradient(135deg, #e0fbe6, #d9f99d, #f0fdf4) 1",
            }}
            ref={contentRef}
          >
            <div
              className={`${ds.spacing.sections.gap} text-slate-950 leading-relaxed font-inter text-sm`}
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </article>

          {/* Article Footer */}
          <footer
            className="inline-block bg-green-50/50 p-3 border border-transparent shadow-[0_1px_6px_0_rgba(163,230,53,0.06)]"
            style={{
              borderImage:
                "linear-gradient(135deg, #e0fbe6, #d9f99d, #f0fdf4) 1",
            }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-700 font-inter">Tagged:</span>
              {article.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="bg-white/80 text-green-700 text-xs px-2 py-0.5 font-inter border border-green-100/50"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </footer>
        </div>

        {/* Sidebar */}
        <div className="w-full xl:col-span-3 mt-8 xl:mt-0">
          <div
            className="space-y-6 transition-all duration-300 ease-in-out"
            style={{
              position: "sticky",
              top: `${headerHeight}px`,
              zIndex: 20,
              // marginTop: "1rem",
            }}
          >
            {/* Table of Contents */}
            <div
              className={`${ds.components.cards.sidebar} p-4 sm:p-6 relative overflow-hidden light-green-bg border border-transparent shadow-[0_1px_6px_0_rgba(163,230,53,0.06)]`}
              style={{
                borderImage:
                  "linear-gradient(135deg, #e0fbe6, #d9f99d, #f0fdf4) 1",
                background: "#f7fee7",
              }}
            >
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-4 font-gothic">
                  In This Article
                </h3>
                <nav className="toc-container">
                  {sections.map((section) => (
                    <div key={section.id}>
                      {section.level === 2 && (
                        <>
                          <div className="flex items-center justify-between">
                            <a
                              href={`#${section.id}`}
                              className={`toc-h2 ${
                                activeSection === section.id
                                  ? "toc-h2-active"
                                  : ""
                              }`}
                            >
                              {section.title}
                            </a>
                            {sections.some(
                              (s) =>
                                s.level === 3 && s.id.startsWith(section.id)
                            ) && (
                              <button
                                onClick={() => toggleSection(section.id)}
                                className="toc-toggle"
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

                          {expandedSections.includes(section.id) && (
                            <div className="toc-subsection">
                              {sections
                                .filter(
                                  (s) =>
                                    s.level === 3 && s.id.startsWith(section.id)
                                )
                                .map((subsection) => (
                                  <a
                                    key={subsection.id}
                                    href={`#${subsection.id}`}
                                    className={`toc-h3 ${
                                      activeSection === subsection.id
                                        ? "toc-h3-active"
                                        : ""
                                    }`}
                                  >
                                    {subsection.title}
                                  </a>
                                ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div
                className={`${ds.components.cards.sidebar} p-0 overflow-hidden border border-transparent shadow-[0_1px_6px_0_rgba(163,230,53,0.06)]`}
                style={{
                  borderImage:
                    "linear-gradient(135deg, #e0fbe6, #d9f99d, #f0fdf4) 1",
                  background: "#f7fee7",
                }}
              >
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-2 w-full p-4 text-green-600 hover:bg-green-50/50 transition-colors font-inter text-sm"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span>Back to top</span>
                </button>
              </div>

              <div
                className={`${ds.components.cards.sidebar} p-0 overflow-hidden border border-transparent shadow-[0_1px_6px_0_rgba(163,230,53,0.06)]`}
                style={{
                  borderImage:
                    "linear-gradient(135deg, #e0fbe6, #d9f99d, #f0fdf4) 1",
                  background: "#f7fee7",
                }}
              >
                <button
                  onClick={shareArticle}
                  className="flex items-center gap-2 w-full p-4 text-green-600 hover:bg-green-50/50 transition-colors font-inter text-sm"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share article</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
