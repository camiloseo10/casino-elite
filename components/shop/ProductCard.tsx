// components/shop/ProductCard.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
// Importa los tipos directamente desde types/product.ts
import { Product, Price, Image as ImageType, ProductVariant } from "@/types/product"
import { ShoppingCart, Star } from "lucide-react"

// Importa la Server Action que interactúa con Shopify
import { addItemToCart } from "@/lib/cart-actions"

// Importa el store de Zustand si quieres usarlo para abrir el carrito después de añadir un producto
import { useCartStore } from "@/stores/useCartStore";

export default function ProductCard({ product }: { product: Product }) {
  const toggleCart = useCartStore((state) => state.toggleCart); // Para abrir el carrito

  // Asegúrate de usar 'featuredImage' si tu ProductFragment lo trae, o la primera imagen
  const image: ImageType | undefined | null = product.featuredImage || product.images?.edges?.[0]?.node;
  const variant: ProductVariant | undefined | null = product.variants?.edges?.[0]?.node;

  // Asegúrate de que price y compareAtPrice son correctos de la variante
  const price: string | undefined = variant?.price?.amount;
  const currencyCode: string = variant?.price?.currencyCode || 'USD'; // Default currency
  const compareAt: string | undefined = variant?.compareAtPrice?.amount;
  const isAvailableForSale: boolean = variant?.availableForSale ?? false; // Default to false if undefined

  const handleAddToCart = async () => {
    if (!variant || !variant.id || !isAvailableForSale) {
      console.warn("ProductCard: No se puede agregar al carrito: variante no encontrada, ID de variante ausente o no disponible para la venta.");
      // Opcional: Mostrar un toast o mensaje al usuario
      return;
    }

    console.log("ProductCard: Intentando agregar variante:", variant.id, "al carrito desde ProductCard...");
    const success = await addItemToCart(variant.id); // Llama a la Server Action
    if (success) {
      console.log("ProductCard: ✅ ¡Producto agregado al carrito con éxito!");
      toggleCart(); // Abre el carrito después de añadir
      // Opcional: Podrías usar un toast o un feedback visual aquí
    } else {
      console.error("ProductCard: ❌ Falló al agregar el producto al carrito.");
      // Opcional: Mostrar un mensaje de error al usuario
      alert("Error adding product to cart. Please try again.");
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition border border-slate-700 flex flex-col justify-between">
      <div>
        {/* Imagen */}
        <div className="relative">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              width={500}
              height={500}
              className="w-full h-64 object-cover"
            />
          )}
          {/* Badge (Considera si este "-20%" es estático o debe ser dinámico) */}
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            -20%
          </span>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-base mb-1 line-clamp-2 min-h-[3rem]">
            {product.title}
          </h3>

          {/* Rating (Ejemplo estático, considera si será dinámico) */}
          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span>4.0</span>
            <span className="text-slate-400 text-xs ml-1">(50)</span>
          </div>

          {/* Precios */}
          <div className="mb-4">
            {price && (
              <span className="text-white text-lg font-bold">${price} {currencyCode}</span>
            )}
            {compareAt && (
              <span className="text-slate-400 line-through text-sm ml-2">
                ${compareAt} {currencyCode}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-2 p-4 pt-0">
        {/* Botón View product */}
        {product.handle && (
          <Link
            href={`/products/${product.handle}`}
            className="w-1/2 bg-slate-700 hover:bg-slate-600 text-white text-center py-2 px-4 rounded text-sm font-semibold transition"
          >
            View product
          </Link>
        )}
        
        {/* Botón Add to cart */}
        <button
          onClick={handleAddToCart}
          className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-sm font-semibold transition flex items-center justify-center gap-1"
          disabled={!isAvailableForSale} // Deshabilita si no está disponible
        >
          <ShoppingCart className="w-4 h-4" />
          {isAvailableForSale ? "Add to cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  )
}