"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";
import { X, ChevronRight } from "lucide-react";

// Updated navigation items - removed MEDIA
const navItems = [
  { name: "AUSTRALIA", href: "/australia" },
  { name: "WORLD", href: "/world" },
  { name: "POLITICS", href: "/politics" },
  { name: "FEED", href: "/feed" },
  { name: "DISCOVER", href: "/discover" },
];

interface HeaderProps {
  activeCategory?: string;
}

export function Header({ activeCategory }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Convert activeCategory to uppercase to match navItems format
  const activeCategoryUpper = activeCategory
    ? activeCategory.toUpperCase()
    : undefined;

  // Find active index for animation
  useEffect(() => {
    if (activeCategoryUpper) {
      const index = navItems.findIndex(
        (item) => item.name === activeCategoryUpper
      );
      setActiveIndex(index);
    }
  }, [activeCategoryUpper]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`${ds.components.cards.header} sticky top-0 z-50 relative`}
    >
      {/* Futuristic gradient accent line */}
      <div className="h-0.5 bg-gradient-to-r from-green-400 via-lime-300 to-green-500 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            <p className="text-xs sm:text-sm text-slate-600 font-inter ml-2 hidden sm:block">
              Australia in Focus. The World in Frame.
            </p>
          </div>

          {/* Desktop Topic Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
            aria-label="Topic navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-all duration-200 font-inter border border-transparent",
                  activeCategoryUpper === item.name
                    ? "bg-gradient-to-r from-green-100 via-lime-50 to-green-100 text-green-800 border-green-200/60"
                    : "text-slate-700 hover:text-slate-900 hover:bg-gray-100 hover:border-gray-200/60"
                )}
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

        {/* Creative Mobile Menu Dropdown - FIXED ALIGNMENT */}
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
                backgroundImage: "url('/images/australian-flora-fauna-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          {/* Menu Container */}
          <div className="relative h-full flex flex-col">
            {/* Header - PROPERLY ALIGNED */}
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

            {/* Navigation Items - ALIGNED WITH LOGO, NO SPARKLES */}
            <nav className="flex-1 py-8 px-4">
              <ul className="space-y-6">
                {navItems.map((item, index) => {
                  const isActive = activeCategoryUpper === item.name;
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

                        {/* Menu item text with hover effect - REMOVED SPARKLE ICON */}
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
      </div>
    </header>
  );
}
