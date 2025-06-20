"use client"

import { useCartStore } from "@/stores/useCartStore"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function CartDrawer() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [lastAdded, setLastAdded] = useState<string | null>(null)

  useEffect(() => {
    if (items.length > 0) {
      const last = items[items.length - 1]
      setLastAdded(last.title)
      const timeout = setTimeout(() => setLastAdded(null), 3000)
      return () => clearTimeout(timeout)
    }
  }, [items])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-white hover:text-amber-500 relative">
          <ShoppingCart className="w-5 h-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-slate-900 text-white w-[90vw] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-amber-500">Your Cart</SheetTitle>
        </SheetHeader>

        {lastAdded && (
          <div className="mt-4 text-sm text-green-400 bg-green-900/30 rounded p-2 text-center">
            ✅ "{lastAdded}" added to cart
          </div>
        )}

        {items.length === 0 ? (
          <p className="mt-6 text-center text-slate-400">Your cart is empty.</p>
        ) : (
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[70vh]">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-4 border-b border-slate-700 pb-4">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                  <p className="text-sm text-amber-400 font-semibold mt-1">
                    
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-6 border-t border-slate-700 pt-4">
            <p className="text-lg font-semibold text-white flex justify-between">
              Total: <span></span>
            </p>
            <Button className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold">
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
