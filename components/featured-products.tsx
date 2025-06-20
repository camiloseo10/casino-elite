"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, Zap } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Professional Poker Chip Set",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    reviews: 234,
    badge: "Best Seller",
    features: ["500 Clay Chips", "Aluminum Case", "2 Decks Cards"],
  },
  {
    id: 2,
    name: "Blackjack Gaming Table",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    reviews: 89,
    badge: "Premium",
    features: ["Professional Felt", "Chip Trays", "Cup Holders"],
  },
  {
    id: 3,
    name: "Luxury Dice Set",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    reviews: 156,
    badge: "Limited",
    features: ["Precision Balanced", "Gold Accents", "Velvet Case"],
  },
  {
    id: 4,
    name: "Roulette Wheel Pro",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    reviews: 67,
    badge: "Hot Deal",
    features: ["Mahogany Wood", "Precision Bearings", "32-inch Diameter"],
  },
]

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (productId: number) => {
    // Aquí integrarías con Shopify Cart API
    console.log(`Added product ${productId} to cart`)
  }

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Products</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover our most popular casino equipment, trusted by professionals worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-slate-800 border-slate-700 overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`
                    ${product.badge === "Best Seller" ? "bg-amber-500 text-black" : ""}
                    ${product.badge === "Premium" ? "bg-purple-500 text-white" : ""}
                    ${product.badge === "Limited" ? "bg-red-500 text-white" : ""}
                    ${product.badge === "Hot Deal" ? "bg-orange-500 text-black" : ""}
                  `}
                  >
                    {product.badge === "Hot Deal" && <Zap className="w-3 h-3 mr-1" />}
                    {product.badge}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-400">({product.reviews})</span>
                    </div>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-amber-400 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">${product.price}</span>
                      <span className="text-sm text-slate-400 line-through ml-2">${product.originalPrice}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
