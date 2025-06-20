import { Suspense } from "react"
import ProductsGrid from "@/components/products-grid-real"
import ProductsFilters from "@/components/products-filters"
import ProductsHeader from "@/components/products-header"

export const metadata = {
  title: "Products - CasinoElite | Professional Casino Equipment",
  description:
    "Discover our complete collection of professional casino equipment. Poker chips, gaming tables, dice, cards and more.",
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      <ProductsHeader />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductsFilters />
          </aside>
          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-96 animate-pulse bg-slate-800 rounded-lg" />
                  ))}
                </div>
              }
            >
              <ProductsGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
