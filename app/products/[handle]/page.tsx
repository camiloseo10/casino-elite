// app/products/[handle]/page.tsx
import { getAllProducts, getProductsInCollection } from "@/lib/shopify"
import ProductDetail from "@/components/shop/ProductDetail"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({ handle: product.handle }))
}

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const allProducts = await getProductsInCollection()
  const product = allProducts.find((p) => p.handle === params.handle)

  if (!product) return { title: "Product not found" }

  return {
    title: `${product.title} - CasinoElite`,
    description: `Buy ${product.title} now at the best price. High-quality casino equipment.`,
  }
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const allProducts = await getProductsInCollection()
  const product = allProducts.find((p) => p.handle === params.handle)

  if (!product) {
    return <div className="text-center text-red-600 py-20 text-xl">Product not found</div>
  }

  return <ProductDetail product={product} />
}
