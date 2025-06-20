import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import TrustBadges from "@/components/trust-badges"
import Newsletter from "@/components/newsletter"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      <HeroSection />
      <TrustBadges />
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-800 rounded-lg" />}>
        <FeaturedProducts />
      </Suspense>
      <Newsletter />
    </main>
  )
}
