"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock, User, X, ChevronRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ds, getArticleInfoBarStyles } from "@/lib/design-system";
import Image from "next/image";
import { GhostPost } from "@/lib/ghost";

interface ArticleHeaderProps {
  article: GhostPost;
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
                          {article.authors[0]?.name}
                        </div>
                      </div>
                    </div>

                    {/* Bottom row: Metadata and progress */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-600 font-inter">
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
                      <div className="flex items-center gap-2 mb-1">
                        {article.tags[0] && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium font-inter uppercase tracking-wide border-green-200/60"
                          >
                            {article.tags[0].name}
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-sm font-semibold text-slate-800 truncate font-gothic pr-4 leading-tight">
                        {article.title}
                      </h2>
                    </div>
                  </div>

                  {/* Reading Progress & Meta */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-inter">
                      <span className="leading-none">
                        {article.authors[0]?.name}
                      </span>
                      <span className="leading-none">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        <span className="leading-none">
                          {article.reading_time} min read
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-xs font-medium text-slate-800 font-inter leading-none">
                        {Math.round(readingProgress)}%
                      </div>
                      <div className="w-12 h-1.5 bg-green-200 overflow-hidden">
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
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          {/* Backdrop with Australian flora pattern */}
          <div
            className="absolute inset-0 bg-white/95 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "url('/images/australian-flora-fauna-bg.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          {/* Menu Container */}
          <div className="relative h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/60">
              <Link
                href="/"
                className="group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="logo-3d-border px-3 py-1.5 transition-all duration-300 group-hover:bg-black group-hover:text-white relative overflow-hidden">
                  <h1 className="text-xl font-bold tracking-tight font-bokor relative z-10">
                    Bring Me Insight
                  </h1>
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-600 border border-green-200/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 py-8 px-4">
              <ul className="space-y-6">
                {navItems.map((item, index) => {
                  const isActive = item.name === "POLITICS"; // Hardcoded for article page
                  return (
                    <li key={item.name} className="relative">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center group py-3 transition-all duration-300",
                          isActive ? "text-green-600" : "text-slate-700"
                        )}
                      >
                        {/* Animated indicator */}
                        <div
                          className={cn(
                            "absolute left-0 w-1.5 h-12 bg-gradient-to-b from-green-400 to-lime-300 rounded-r-full transition-all duration-300",
                            isActive
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-50"
                          )}
                        />

                        {/* Menu item text with hover effect */}
                        <span className="text-2xl font-bold font-gothic tracking-tight group-hover:translate-x-1 transition-transform duration-200 ml-6">
                          {item.name}
                        </span>

                        {/* Arrow indicator */}
                        <ChevronRight
                          className={cn(
                            "ml-auto h-5 w-5 transition-all duration-300",
                            isActive
                              ? "opacity-100 text-green-500"
                              : "opacity-0 group-hover:opacity-70 text-slate-400"
                          )}
                        />
                      </Link>

                      {/* Animated underline */}
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-3 opacity-70" />
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-6 text-center text-sm text-slate-500 font-inter">
              <p>Australia in Focus. The World in Frame.</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
