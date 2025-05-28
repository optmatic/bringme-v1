import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import Image from "next/image"

export function FeaturedStory() {
  return (
    <section className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        <div className="space-y-6">
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
            FEATURED STORY
          </Badge>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Australia&apos;s Climate Policy Faces New Challenges in Global Context
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            As international pressure mounts, Australia navigates complex terrain between economic interests and
            environmental commitments
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                POLITICS
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                10 MIN READ
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="border-2 border-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            READ FEATURE
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="relative h-64 lg:h-full min-h-[300px] bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600&query=Australian parliament building with climate change imagery"
            alt="Featured story illustration"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
