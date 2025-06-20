import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"

const team = [
  {
    name: "Carlos Mendoza",
    role: "CEO & Founder",
    bio: "Former professional dealer with 20+ years in the industry. Founded CasinoElite with the vision of democratizing access to casino-quality equipment.",
    image: "/placeholder.svg?height=300&width=300&text=Carlos+CEO",
    specialties: ["Strategy", "Poker", "Leadership"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "carlos@casinoelite.com",
    },
  },
  {
    name: "Ana Rodriguez",
    role: "Product Director",
    bio: "Engineer specializing in materials. Oversees quality and development of all our products to ensure casino standards.",
    image: "/placeholder.svg?height=300&width=300&text=Ana+Product",
    specialties: ["Quality", "Innovation", "Materials"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "ana@casinoelite.com",
    },
  },
  {
    name: "Miguel Torres",
    role: "Casino Expert",
    bio: "International casino consultant. Brings his experience in regulations and industry standards to our professional products.",
    image: "/placeholder.svg?height=300&width=300&text=Miguel+Expert",
    specialties: ["Regulations", "Blackjack", "Consulting"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "miguel@casinoelite.com",
    },
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Team</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Meet the experts who make it possible for you to access the best casino equipment in the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="bg-slate-700 border-slate-600 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>

              <CardContent className="p-6 -mt-16 relative z-10">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-amber-400 font-semibold mb-3">{member.role}</p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-slate-600 text-slate-200">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-slate-600 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-slate-600 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-8 h-8 bg-slate-600 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Mail className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
