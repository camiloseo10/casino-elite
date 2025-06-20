import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Crown, Star, Package } from "lucide-react"
import Image from "next/image"

export default function FeaturedCollection() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-black">
                <Crown className="w-4 h-4 mr-2" />
                Featured Collection
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Poker Professional
                <span className="block text-amber-400">Tournament Series</span>
              </h2>
              <p className="text-lg text-slate-300">
                The most complete collection for serious players. Includes everything needed to organize professional
                tournaments from home or at your club.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">25+</div>
                <div className="text-slate-400">Products</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">$299</div>
                <div className="text-slate-400">From</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="text-2xl font-bold text-white">4.9</span>
                </div>
                <div className="text-slate-400">Rating</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-slate-400">Sold</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Includes:</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Professional chip sets (300-1000 pieces)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Casino-quality cards
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Professional tables and toppers
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Dealer accessories
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
              >
                View Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                <Package className="mr-2 h-5 w-5" />
                View Complete Sets
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Poker+Professional+Collection"
                alt="Poker Professional Collection"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-4 shadow-lg animate-bounce">
              <Crown className="h-8 w-8 text-black" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-lg animate-pulse">
              <Star className="h-8 w-8 text-white fill-current" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
