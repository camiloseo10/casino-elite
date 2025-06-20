// components/shop/ProductDetail.tsx
import type { Product } from "@/types/product"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductDetail({ product }: { product: Product }) {
  const image = product.images.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const originalPrice = price * 1.25
  const rating = 4.8
  const reviews = 132

  return (
    <section className="py-12 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            width={800}
            height={800}
            className="w-full h-auto rounded-lg object-cover shadow-md"
          />
        )}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-slate-400"}`}
                />
              ))}
            </div>
            <span className="text-slate-500">{rating} ({reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-amber-600">
              ${price.toFixed(2)}
            </span>
            <span className="text-xl line-through text-slate-400">
              ${originalPrice.toFixed(2)}
            </span>
          </div>

          <p className="text-slate-700 dark:text-slate-300">
            This is a premium quality casino product, ideal for professional and home use. Built with high-grade materials and expert craftsmanship.
          </p>

          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold px-6 py-3 rounded-md shadow">
            <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
          </Button>
        </div>
      </div>
    </section>
  )
}
