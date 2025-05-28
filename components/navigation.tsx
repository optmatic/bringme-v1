"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Updated navigation items - removed MEDIA
const navItems = [
  { name: "AUSTRALIA", href: "/australia" },
  { name: "WORLD", href: "/world" },
  { name: "POLITICS", href: "/politics" },
  { name: "FEED", href: "/feed" },
  { name: "DISCOVER", href: "/discover" },
]

export function Navigation() {
  const [activeItem, setActiveItem] = useState("AUSTRALIA")

  return (
    <nav className="border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.name)}
              className={cn(
                "py-4 px-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                activeItem === item.name
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
