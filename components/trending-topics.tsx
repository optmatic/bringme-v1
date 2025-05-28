import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const topics = [
  "Climate Policy",
  "Federal Election",
  "Indigenous Voice",
  "Housing Crisis",
  "Economic Outlook",
  "Healthcare Reform",
  "Energy Transition",
  "Immigration Policy",
]

export function TrendingTopics() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>

      <div className="space-y-3">
        {topics.map((topic) => (
          <Badge
            key={topic}
            variant="secondary"
            className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer transition-colors duration-200 w-full justify-start p-2"
          >
            {topic}
          </Badge>
        ))}
      </div>

      <Button variant="ghost" className="w-full mt-4 text-green-600 hover:text-green-700">
        EXPLORE ALL TOPICS
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
