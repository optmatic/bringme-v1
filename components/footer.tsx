import Link from "next/link";

import FloraFauna from "@/public/images/australian-flora-fauna-bg.webp";

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Australian Flora Background - Match header opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${FloraFauna.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2, // Matching the header opacity
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-lime-300 to-green-500 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>

      {/* Moving gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-lime-300 to-green-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
      </div>

      <div className="relative bg-white/50 backdrop-blur-sm border border-gray-200/60">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link href="/" className="inline-block group">
                <div className="logo-3d-border px-3 py-1.5 transition-all duration-300 bg-white group-hover:bg-black group-hover:text-white relative overflow-hidden">
                  <h3 className="text-base sm:text-lg font-bold font-bokor relative z-10">
                    Bring Me Insight
                  </h3>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-lime-300/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              </Link>
              <p className="text-xs sm:text-sm text-slate-700 font-inter leading-relaxed">
                Independent journalism dedicated to providing insightful
                analysis on Australian and global politics, society, and
                culture.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 font-gothic">
                Quick Links
              </h4>
              <nav className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                <Link
                  href="/about"
                  className="text-xs sm:text-sm text-slate-700 hover:text-green-600 transition-colors duration-200 font-inter"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-xs sm:text-sm text-slate-700 hover:text-green-600 transition-colors duration-200 font-inter"
                >
                  Contact
                </Link>
                <Link
                  href="/privacy"
                  className="text-xs sm:text-sm text-slate-700 hover:text-green-600 transition-colors duration-200 font-inter"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs sm:text-sm text-slate-700 hover:text-green-600 transition-colors duration-200 font-inter"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/rss"
                  className="text-xs sm:text-sm text-slate-700 hover:text-green-600 transition-colors duration-200 font-inter"
                >
                  RSS Feed
                </Link>
                <Link
                  href="/archive"
                  className="text-xs sm:text-sm text-slate-700 hover:text-green-600 transition-colors duration-200 font-inter"
                >
                  Archive
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[10px] sm:text-xs text-slate-600 font-inter">
                © {new Date().getFullYear()} Bring Me Insight. All rights
                reserved.
              </p>
              <p className="text-[10px] sm:text-xs text-slate-600 font-inter">
                Australia-made by{" "}
                <a
                  href="https://optmatic.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-800 hover:text-green-900 transition-colors duration-200 italic uppercase font-bold mr-1"
                >
                  Optmatic
                </a>{" "}
                <span className="text-green-600">💚</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="h-1 bg-gradient-to-r from-green-400 via-lime-300 to-green-500">
        <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
      </div>
    </footer>
  );
}
