// components/products-grid-real.tsx
// Este componente debe ser un Server Component (no lleva "use client")
import { getAllProductsFull } from "@/lib/shopify"; // ¡CAMBIADO: Usar getAllProductsFull!
import { Product } from "@/types/product"; // Asegúrate de importar el tipo Product
import ProductCard from "@/components/shop/ProductCard"; // Ruta de importación correcta

export default async function ProductsGridReal() {
  // CAMBIO CLAVE: Usa getAllProductsFull() para obtener TODOS los productos
  // getFeaturedProducts() solo trae 4, lo que no es apropiado para una página de productos.
  const products: Product[] = await getAllProductsFull();

  if (!products || !Array.isArray(products) || products.length === 0) { // Añadido .length === 0
    return (
      <div className="text-white text-center py-8">
        <p>No se encontraron productos.</p>
        <p className="text-slate-400">Intenta ajustar los filtros o revisa más tarde.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}