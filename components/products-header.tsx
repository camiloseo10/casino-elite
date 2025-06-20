import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProductsHeader() {
  return (
    <section className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Premium Products</h1>
            <p className="text-slate-400">Professional casino equipment for serious players</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:w-96">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 md:hidden">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
