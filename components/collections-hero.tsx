import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Package } from 'lucide-react'

export default function CollectionsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10"></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-black">
                <Package className="mr-2 h-4 w-4" />
                Curated Collections
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {" "}
                  Collections
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Discover our carefully curated collections. From complete beginner sets to professional tournament-grade
                equipment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg"
              >
                Explore Collections
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800 px-8 py-4 text-lg"
              >
                View All Products
              </Button>
            </div>

            <div className="flex items-center justify-center gap-12 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">8</div>
                <div className="text-slate-400">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-slate-400">Products</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 text-amber-400 fill-current" />
                  <span className="text-3xl font-bold text-white">4.8</span>
                </div>
                <div className="text-slate-400">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
