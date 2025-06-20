import { Shield, Truck, Award, Users, Clock, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const reasons = [
  {
    icon: Award,
    title: "Certified Quality",
    description: "All our products meet international casino standards. ISO certifications and official approvals.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Proven Experience",
    description:
      "15+ years equipping professional casinos, poker clubs and serious players. We know exactly what you need.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Total Guarantee",
    description:
      "Extended warranty on all our products. If you're not 100% satisfied, we'll refund your money no questions asked.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description:
      "Free shipping on orders over $200. Express delivery available. Secure packaging for delicate products.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our team of experts is available to help you anytime. Live chat, email and phone support.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "Passion for Gaming",
    description: "We don't just sell products, we share your passion. Every team member is a casino enthusiast.",
    color: "from-pink-500 to-rose-500",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose CasinoElite?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We're not just another equipment supplier. We're your partner in the pursuit of gaming excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="bg-slate-800 border-slate-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${reason.color} rounded-full group-hover:scale-110 transition-transform duration-300`}
                  >
                    <reason.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{reason.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{reason.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
