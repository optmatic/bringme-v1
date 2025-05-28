import { Badge } from "@/components/ui/badge"
import { ds } from "@/lib/design-system"

const tags = [
  { name: "Climate Policy", count: 8 },
  { name: "Politics", count: 12 },
  { name: "Indigenous Rights", count: 5 },
  { name: "Economics", count: 9 },
  { name: "Housing Crisis", count: 6 },
  { name: "Electoral Reform", count: 4 },
  { name: "International Relations", count: 7 },
  { name: "Social Policy", count: 5 },
  { name: "Democracy", count: 3 },
  { name: "Constitutional Law", count: 2 },
]

export function TagCloud() {
  return (
    <section
      className={`${ds.components.cards.sidebar} p-5 border-l-2 border-gradient-to-b from-green-400 to-lime-300`}
      role="navigation"
      aria-label="Article topics"
    >
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-bold text-gray-900 font-gothic">Explore Topics</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-green-400 via-lime-300 to-green-500 opacity-30"></div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.name}
            className="group"
            aria-label={`View articles about ${tag.name} (${tag.count} articles)`}
          >
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-green-100 via-lime-50 to-green-100 text-green-800 hover:from-green-200 hover:via-lime-100 hover:to-green-200 border border-green-200/60 transition-all duration-200 cursor-pointer px-3 py-1"
            >
              {tag.name}
              <span className="ml-1 text-xs opacity-75">({tag.count})</span>
            </Badge>
          </button>
        ))}
      </div>
    </section>
  )
}
