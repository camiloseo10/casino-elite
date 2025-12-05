// ✅ types/cart.ts
export interface ShopifyCart {
  id: string
  lines: any[]
  cost: {
    subtotalAmount: {
      amount: string
    }
  }
}
