// components/featured-products.tsx
import { Product } from '@/lib/shopify'; // Importa el tipo Product desde shopify.ts
import ProductCard from '@/components/shop/ProductCard'; // ¡Ruta de importación corregida!

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-12 px-4 text-center text-slate-400">
        <h2 className="text-3xl font-bold mb-8 text-white">Featured Products</h2>
        <p>No featured products found.</p>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-black">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}