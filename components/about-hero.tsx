import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Globe } from 'lucide-react'
import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10"></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-black">
                <Award className="mr-2 h-4 w-4" />
                Since 2009
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Leaders in
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {" "}
                  Casino
                </span>
                <span className="block">Equipment</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-lg">
                For over 15 years, we've been the preferred choice of professional casinos, poker clubs and serious
                players worldwide. Our passion for excellence has made us industry leaders.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg"
              >
                Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800 px-8 py-4 text-lg"
              >
                Contact Team
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-sm">10,000+ Customers</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="h-5 w-5 text-green-400" />
                <span className="text-sm">50+ Countries</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="h-5 w-5 text-amber-400" />
                <span className="text-sm">ISO Certified</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=600&width=600&text=CasinoElite+Team"
                alt="CasinoElite Team"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-4 shadow-lg animate-bounce">
              <Award className="h-8 w-8 text-black" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-lg animate-pulse">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
