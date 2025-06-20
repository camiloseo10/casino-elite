// components/products-grid-real.tsx
import { getProductsInCollection } from "@/lib/shopify"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import {
  Heart, Star, Zap, Crown, Flame, Gift
} from "lucide-react"

const badgeConfig = {
  "Best Seller": { icon: Crown, className: "bg-amber-500 text-black" },
  Premium: { icon: Star, className: "bg-purple-500 text-white" },
  Limited: { icon: Zap, className: "bg-red-500 text-white" },
  "Hot Deal": { icon: Flame, className: "bg-orange-500 text-black" },
  Popular: { icon: Heart, className: "bg-pink-500 text-white" },
  New: { icon: Gift, className: "bg-green-500 text-white" },
  Essential: { icon: Star, className: "bg-blue-500 text-white" },
  Tournament: { icon: Crown, className: "bg-yellow-500 text-black" },
  Compact: { icon: Star, className: "bg-indigo-500 text-white" },
  Pro: { icon: Crown, className: "bg-slate-600 text-white" },
  Tech: { icon: Zap, className: "bg-cyan-500 text-black" },
  Deluxe: { icon: Crown, className: "bg-gradient-to-r from-amber-500 to-orange-500 text-black" },
}

export default async function ProductsGrid() {
  const products = await getProductsInCollection()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product, index) => {
        const image = product.images.edges[0]?.node
        const title = product.title
        const price = parseFloat(product.priceRange.minVariantPrice.amount)

        // Simulación visual (puedes reemplazar por datos reales si los agregas en Shopify)
        const badgeLabel = Object.keys(badgeConfig)[index % Object.keys(badgeConfig).length]
        const badgeInfo = badgeConfig[badgeLabel as keyof typeof badgeConfig]
        const BadgeIcon = badgeInfo?.icon || Star

        const originalPrice = price * 1.25 // para simular descuentos
        const rating = (4 + (index % 2) * 0.5).toFixed(1)
        const reviews = 50 + index * 17

        return (
          <Card
            key={product.id}
            className="bg-slate-800 border-slate-700 overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              {image && (
                <Image
                  src={image.url}
                  alt={image.altText || title}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              )}
              <div className="absolute top-4 left-4">
                <Badge className={badgeInfo.className}>
                  <BadgeIcon className="w-3 h-3 mr-1" />
                  {badgeLabel}
                </Badge>
              </div>
              {/* Discount Badge */}
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(Number(rating))
                              ? "text-amber-400 fill-current"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400">
                      {rating} ({reviews})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">${price.toFixed(2)}</span>
                    <span className="text-sm text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Link href={`/products/${product.handle}`}>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold transition-all duration-200 hover:shadow-lg">
                    View product
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
