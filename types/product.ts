export type ProductImage = {
  url: string
  altText: string | null
}

export type Product = {
  id: string
  title: string
  handle: string
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  images: {
    edges: {
      node: ProductImage
    }[]
  }
}
