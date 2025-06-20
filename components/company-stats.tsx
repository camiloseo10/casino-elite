import { Trophy, Users, Globe, Star, Package, Award } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Satisfied Customers",
    description: "Worldwide",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Countries",
    description: "Global presence",
  },
  {
    icon: Package,
    value: "500+",
    label: "Products",
    description: "In catalog",
  },
  {
    icon: Trophy,
    value: "15+",
    label: "Years",
    description: "Of experience",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
    description: "From our customers",
  },
  {
    icon: Award,
    value: "25+",
    label: "Certifications",
    description: "Quality standards",
  },
]

export default function CompanyStats() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Numbers That Speak for Us</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Over a decade building trust and excellence in the casino equipment industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-700 rounded-2xl p-8 text-center hover:bg-slate-600 transition-all duration-300 hover:scale-105 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-black" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-amber-400 mb-1">{stat.label}</div>
              <div className="text-slate-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
