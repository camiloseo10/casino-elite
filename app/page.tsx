// app/page.tsx
import { Suspense } from "react";
import HeroSection from "@/components/hero-section";
import FeaturedProducts from "@/components/featured-products";
import TrustBadges from "@/components/trust-badges";
import Newsletter from "@/components/newsletter";
import { getFeaturedProducts } from "@/lib/shopify";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  console.log('HomePage: Productos destacados obtenidos:', featuredProducts);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      <HeroSection />
      <TrustBadges />
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-800 rounded-lg" />}>
        <FeaturedProducts products={featuredProducts || []} />
      </Suspense>
      <Newsletter />
    </main>
  );
}