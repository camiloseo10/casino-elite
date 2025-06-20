import { getProductsInCollection } from "@/lib/shopify"
import ProductCard from "@/components/shop/ProductCard"

export default async function ProductGrid() {
  const products = await getProductsInCollection()

  return (
    <section className="py-12 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-10">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}