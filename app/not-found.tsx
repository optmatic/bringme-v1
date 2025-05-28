import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-lime-50/20 to-green-50/30">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] font-gothic">
            Page Not Found
          </h1>
          <p className="text-base text-slate-700 leading-relaxed font-inter max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="pt-6">
            <Link
              href="/"
              className="inline-block px-4 py-2 text-sm font-medium text-green-600 border border-green-200/60 hover:bg-green-50 hover:border-green-300/80 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
