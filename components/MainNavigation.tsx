"use client"

import Link from "next/link"
import { useCartStore } from "@/stores/useCartStore"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

export default function MainNavigation() {
  const items = useCartStore((state) => state.items)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.quantity, 0)
    setTotalItems(total)
  }, [items])

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-amber-400">
          CasinoElite
        </Link>
        <nav className="space-x-6 text-sm font-medium">
          <Link href="/products" className="hover:text-amber-400">Products</Link>
          <Link href="/collections" className="hover:text-amber-400">Collections</Link>
          <Link href="/about" className="hover:text-amber-400">About</Link>
          <Link href="/contact" className="hover:text-amber-400">Contact</Link>
          <button
            className="relative ml-4 p-2 rounded hover:bg-slate-800 transition"
            onClick={() => {
              const drawer = document.getElementById("cart-drawer")
              if (drawer) drawer.classList.toggle("translate-x-full")
            }}
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
