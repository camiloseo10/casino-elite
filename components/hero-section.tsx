import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Shield, Truck } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10"></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-black">
                <Star className="mr-2 h-4 w-4 fill-current" />
                #1 Casino Equipment Store
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium Casino
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {" "}
                  Equipment
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-lg">
                Professional-grade casino equipment for serious players. From poker chips to gaming tables, elevate your
                game with authentic casino-quality gear.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800 px-8 py-4 text-lg"
              >
                View Catalog
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Truck className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Star className="h-5 w-5 text-amber-400 fill-current" />
                <span className="text-sm">5-Star Rated</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/hero-home-casino.webp"
                alt="Premium Casino Equipment"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-4 shadow-lg animate-bounce">
              <Star className="h-8 w-8 text-black fill-current" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-lg animate-pulse">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
