import { Suspense } from "react"
import AboutHero from "@/components/about-hero"
import CompanyStats from "@/components/company-stats"
import WhyChooseUs from "@/components/why-choose-us"
import TeamSection from "@/components/team-section"
import Testimonials from "@/components/testimonials"
import AboutCTA from "@/components/about-cta"

export const metadata = {
  title: "About - CasinoElite | Leaders in Casino Equipment",
  description:
    "Learn about CasinoElite's story. Over 15 years providing professional casino equipment to players, clubs and casinos worldwide.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      <AboutHero />
      <CompanyStats />
      <WhyChooseUs />
      <Suspense
        fallback={
          <div className="py-20 bg-slate-800">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-64 animate-pulse bg-slate-700 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <TeamSection />
      </Suspense>
      <Testimonials />
      <AboutCTA />
    </main>
  )
}
