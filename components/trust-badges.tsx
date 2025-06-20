import { Shield, Truck, RotateCcw, Award } from "lucide-react"

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Secure Payment",
      description: "256-bit SSL encryption",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $200",
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description: "Money-back guarantee",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Casino-grade equipment",
    },
  ]

  return (
    <section className="py-16 bg-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-4 text-center lg:text-left">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-black" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white">{badge.title}</h3>
                <p className="text-sm text-slate-400">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
