import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="bg-white rounded-lg shadow-sm p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Informed</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Subscribe to our weekly newsletter for in-depth analysis and exclusive content.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Your email address"
          className="flex-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
        />
        <Button className="bg-green-500 hover:bg-green-600 text-white px-8">SUBSCRIBE</Button>
      </div>
    </section>
  )
}
