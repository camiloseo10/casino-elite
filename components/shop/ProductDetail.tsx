"use client"

import type { Product } from "@/types/product"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"
import { useState } from "react"

type Props = {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem)
  const toggleCart = useCartStore((state) => state.toggleCart)
  const [quantity, setQuantity] = useState(1)

  const image = product.images.edges[0]?.node
  const variant = product.variants?.edges[0]?.node

  const handleAddToCart = () => {
    if (!variant) return

    addItem({
      id: variant.id,
      title: product.title,
      price: parseFloat(variant.price.amount),
      image: image?.url,
      quantity, // ✅ Se respeta la cantidad seleccionada
    })

    toggleCart() // ✅ Abre el Drawer del carrito
  }

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            width={600}
            height={600}
            className="w-full md:w-1/2 object-cover rounded-lg"
          />
        )}

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-amber-600 text-2xl font-bold">
              ${variant?.price.amount}
            </span>
            {variant?.compareAtPrice?.amount && (
              <span className="line-through text-slate-500">
                ${variant.compareAtPrice.amount}
              </span>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-300 mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Quantity</span>
            <div className="flex items-center border border-slate-400 rounded overflow-hidden">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 text-lg font-bold text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                −
              </button>
              <span className="px-4 py-1 text-slate-900 dark:text-white">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 text-lg font-bold text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  )
}
