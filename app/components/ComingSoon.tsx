import React from "react";
import FloraFauna from "@/public/images/australian-flora-fauna-bg.webp";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Australian Flora Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${FloraFauna.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-lime-300 to-green-500 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>

      <div className="text-center px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bokor mb-6 text-gray-900">
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          We're working on something exciting. Stay tuned for insightful
          analysis on Australian and global politics, society, and culture.
        </p>
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-gray-900 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
