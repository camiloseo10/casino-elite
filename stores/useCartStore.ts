import { create } from "zustand"

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  image?: string
}

type CartState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items
    const existing = items.find((i) => i.id === item.id)
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] })
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) })
  },
  clearCart: () => {
    set({ items: [] })
  },
}))
