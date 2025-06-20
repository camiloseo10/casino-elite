import { Suspense } from "react"
import CollectionsHero from "@/components/collections-hero"
import CollectionsGrid from "@/components/collections-grid"
import FeaturedCollection from "@/components/featured-collection"

export const metadata = {
  title: "Collections - CasinoElite | Professional Equipment by Category",
  description:
    "Explore our curated collections of casino equipment. From complete poker sets to premium accessories for your home casino.",
}

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      <CollectionsHero />
      <FeaturedCollection />
      <Suspense
        fallback={
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 animate-pulse bg-slate-800 rounded-lg" />
              ))}
            </div>
          </div>
        }
      >
        <CollectionsGrid />
      </Suspense>
    </main>
  )
}
