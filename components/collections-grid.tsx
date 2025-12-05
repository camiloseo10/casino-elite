"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Crown, Star, Heart, Gift, Trophy, Home, Users, Sparkles, Target } from 'lucide-react'
import Image from "next/image"

const collections = [
  {
    id: 1,
    name: "Poker Professional",
    description: "Complete sets for serious players and professional tournaments",
    image: "/poker-professional-collections.webp",
    productCount: 25,
    priceFrom: 299,
    badge: "Most Popular",
    badgeColor: "bg-amber-500 text-black",
    icon: Crown,
    rating: 4.9,
    soldCount: 500,
    highlights: ["Clay chips", "Professional tables", "Complete accessories"],
  },
  {
    id: 2,
    name: "Blackjack & Table Games",
    description: "Everything needed for classic casino table games",
    image: "/blackjack-table-games.webp",
    productCount: 18,
    priceFrom: 199,
    badge: "Premium",
    badgeColor: "bg-purple-500 text-white",
    icon: Star,
    rating: 4.8,
    soldCount: 320,
    highlights: ["Blackjack tables", "Professional layouts", "Dealer accessories"],
  },
  {
    id: 3,
    name: "Luxury Dice Collection",
    description: "Precision dice and luxury sets for collectors",
    image: "/luxury-dice-collection.webp",
    productCount: 15,
    priceFrom: 89,
    badge: "Exclusive",
    badgeColor: "bg-red-500 text-white",
    icon: Sparkles,
    rating: 4.7,
    soldCount: 180,
    highlights: ["Precision dice", "Premium materials", "Limited editions"],
  },
  {
    id: 4,
    name: "Premium Playing Cards",
    description: "Casino-quality cards for demanding players",
    image: "/premium-playing-cards.webp",
    productCount: 22,
    priceFrom: 49,
    badge: "Best Seller",
    badgeColor: "bg-green-500 text-white",
    icon: Heart,
    rating: 4.6,
    soldCount: 750,
    highlights: ["100% plastic", "Unique designs", "Superior durability"],
  },
  {
    id: 5,
    name: "Casino Accessories",
    description: "Essential accessories to complete your casino setup",
    image: "/casino-accesories.webp",
    productCount: 30,
    priceFrom: 29,
    badge: "Essential",
    badgeColor: "bg-blue-500 text-white",
    icon: Target,
    rating: 4.5,
    soldCount: 420,
    highlights: ["Automatic shufflers", "Chip trays", "Dealer buttons"],
  },
  {
    id: 6,
    name: "Home Casino Setup",
    description: "Complete sets to create your home casino",
    image: "/home-casino-setup.webp",
    productCount: 12,
    priceFrom: 599,
    badge: "Complete",
    badgeColor: "bg-orange-500 text-black",
    icon: Home,
    rating: 4.9,
    soldCount: 150,
    highlights: ["Everything included", "Easy installation", "Professional quality"],
  },
  {
    id: 7,
    name: "Tournament Grade",
    description: "Tournament-grade equipment for official competitions",
    image: "/tournament-grade.webp",
    productCount: 20,
    priceFrom: 899,
    badge: "Pro",
    badgeColor: "bg-slate-600 text-white",
    icon: Trophy,
    rating: 4.8,
    soldCount: 95,
    highlights: ["Officially certified", "Tournament quality", "Extended warranty"],
  },
  {
    id: 8,
    name: "Beginner Friendly",
    description: "Perfect sets for those starting in the casino world",
    image: "/beginner-friendly-casino.webp",
    productCount: 16,
    priceFrom: 99,
    badge: "New",
    badgeColor: "bg-cyan-500 text-black",
    icon: Gift,
    rating: 4.4,
    soldCount: 280,
    highlights: ["Easy to use", "Affordable price", "Guides included"],
  },
]

export default function CollectionsGrid() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">All Collections</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore our carefully curated collections for every type of player and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => {
            const IconComponent = collection.icon

            return (
              <Card
                key={collection.id}
                className="bg-slate-800 border-slate-700 overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={collection.badgeColor}>
                      <IconComponent className="w-3 h-3 mr-1" />
                      {collection.badge}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">{collection.productCount} products</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
                      <p className="text-slate-400 text-sm mb-3">{collection.description}</p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span className="text-white font-semibold">{collection.rating}</span>
                        </div>
                        <div className="text-slate-400 text-sm">{collection.soldCount} sold</div>
                      </div>

                      <ul className="space-y-1 mb-4">
                        {collection.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center text-sm text-slate-300">
                            <span className="w-1 h-1 bg-amber-400 rounded-full mr-2 flex-shrink-0"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 text-sm">From</span>
                        <div className="text-2xl font-bold text-white">${collection.priceFrom}</div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold transition-all duration-200 hover:shadow-lg"
                      size="lg"
                    >
                      View Collection
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Can't find what you're looking for?</h3>
            <p className="text-slate-300 mb-6">
              Our team can help you create a custom collection according to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
              >
                <Users className="mr-2 h-5 w-5" />
                Contact Expert
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                View All Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
