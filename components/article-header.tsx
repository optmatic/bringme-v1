"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock, User, X, ChevronRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ds, getArticleInfoBarStyles } from "@/lib/design-system";
import Image from "next/image";
import { KeystaticArticle } from "@/lib/keystatic-types";

interface ArticleHeaderProps {
  article: KeystaticArticle;
}

// Navigation items - same as main header
const navItems = [
  { name: "AUSTRALIA", href: "/australia" },
  { name: "WORLD", href: "/world" },
  { name: "POLITICS", href: "/politics" },
  { name: "FEED", href: "/feed" },
  { name: "DISCOVER", href: "/discover" },
];

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Get article info bar styling from design system
  const infoBarStyles = getArticleInfoBarStyles();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setIsScrolled(scrollTop > 100); // Reduced threshold for earlier activation
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Call once on mount to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Article Header with Unified Background */}
      <header
        className={`relative ${ds.components.cards.header} sticky top-0 z-50`}
      >
        {/* Australian Flora Background - Shared across entire header */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url('/images/australian-flora-fauna-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Futuristic gradient accent line */}
        <div className="relative h-0.5 bg-gradient-to-r from-green-400 via-lime-300 to-green-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Header Row */}
          <div className="flex items-center justify-between py-4 sm:py-6">
            {/* Logo Section */}
            <div className="flex flex-col items-start space-y-2 sm:space-y-4">
              <Link href="/" className="group flex-shrink-0">
                <div className="logo-3d-border px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-300 group-hover:bg-black group-hover:text-white relative overflow-hidden">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight font-bokor relative z-10">
                    Bring Me Insight
                  </h1>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-lime-300/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              </Link>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block font-inter ml-2">
                Australia in Focus. The World in Frame.
              </p>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-2"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium transition-all duration-200 font-inter border border-transparent text-slate-700 hover:text-slate-900 hover:bg-gray-100 hover:border-gray-200/60"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button - Changed to "MORE" text */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden px-3 py-2 text-sm font-medium font-inter bg-gradient-to-r from-green-100/60 to-lime-50/60 text-green-700 hover:text-green-800 transition-colors border border-green-200/60 hover:border-green-300/80 hover:shadow-sm"
              aria-label="Toggle mobile menu"
            >
              MORE
            </button>
          </div>

          {/* Sticky Article Info Bar - Shows on Scroll */}
          <div
            className={cn(
              "relative w-full transition-all duration-300 ease-in-out overflow-hidden border-t border-gray-200/30",
              isScrolled ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile Layout */}
                <div className="sm:hidden py-4">
                  <div className="space-y-3">
                    {/* Top row: Author info */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 flex items-center justify-center flex-shrink-0">
                        <User
                          className="h-4 w-4 text-green-700"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800 font-inter">
                          {article.author.name}
                        </div>
                      </div>
                    </div>

                    {/* Bottom row: Metadata and progress */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-600 font-inter">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString(
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
                          <span>{article.readingTime} min read</span>
                        </div>
                        {article.tags[0] && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium font-inter uppercase tracking-wide border-green-200/60"
                          >
                            {article.tags[0].name}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="text-xs font-medium text-slate-800 font-inter">
                          {Math.round(readingProgress)}%
                        </div>
                        <div className="w-8 h-1.5 bg-green-200 overflow-hidden">
                          <div
                            className="h-full bg-green-500 transition-all duration-300 ease-out"
                            style={{ width: `${readingProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between py-3">
                  {/* Article Meta */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 bg-green-100 flex items-center justify-center flex-shrink-0">
                      <User
                        className="h-4 w-4 text-green-700"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-slate-800 font-inter truncate">
                        {article.author.name}
                      </div>
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 font-inter">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString(
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
                      <span>{article.readingTime} min read</span>
                    </div>
                    {article.tags[0] && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium font-inter uppercase tracking-wide border-green-200/60"
                      >
                        {article.tags[0].name}
                      </Badge>
                    )}
                  </div>

                  {/* Reading Progress */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-sm font-medium text-slate-800 font-inter">
                      {Math.round(readingProgress)}%
                    </div>
                    <div className="w-16 h-1.5 bg-green-200 overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all duration-300 ease-out"
                        style={{ width: `${readingProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
            <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between py-3 px-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function fixImageUrl(image: any): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") {
    if (image.startsWith("http://") || image.startsWith("https://"))
      return image;
    if (!image.startsWith("/")) return `/${image}`;
    return image;
  }
  // If it's an object (Keystatic image field), use .src
  if (typeof image === "object" && image.src) {
    if (image.src.startsWith("/")) return image.src;
    return `/${image.src}`;
  }
  return undefined;
}
