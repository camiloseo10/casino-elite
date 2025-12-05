// components/add-to-cart-button.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"; // Asegúrate de que esta ruta es correcta para tu componente de botón
import { ShoppingCart } from "lucide-react";
import { addItemToCart } from "@/lib/cart-actions";
import { useCartStore } from "@/stores/useCartStore"; // Importa tu store de Zustand

interface AddToCartButtonProps {
  variantId?: string;
  availableForSale?: boolean;
  productTitle: string;
}

export default function AddToCartButton({ variantId, availableForSale, productTitle }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const syncCart = useCartStore(state => state.syncCart); // Obtén la acción syncCart del store

  const handleAddToCart = async () => {
    if (!variantId) {
      console.warn("⚠️ No se puede agregar al carrito: ID de variante no encontrado para el producto:", productTitle);
      return;
    }
    if (!availableForSale) {
      console.warn("⚠️ Producto fuera de stock:", productTitle);
      return;
    }

    setIsAdding(true);
    console.log("Client: Intentando agregar desde AddToCartButton:", variantId, "al carrito...");

    try {
      // Ahora, addItemToCart devuelve el carrito actualizado de Shopify
      const updatedShopifyCart = await addItemToCart(variantId); 

      if (updatedShopifyCart) {
        console.log("Client: ✅ ¡Producto agregado al carrito con éxito desde AddToCartButton!", updatedShopifyCart);
        syncCart(updatedShopifyCart); // <-- ¡Llama a syncCart con el carrito actualizado!
        console.log("Client: Zustand store synced with new cart data.");
      } else {
        console.error("Client: ❌ Falló al agregar el producto al carrito desde AddToCartButton. La Server Action no devolvió un carrito válido.");
      }
    } catch (error) {
      console.error("Client: ❌ Error al añadir al carrito desde AddToCartButton:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      className="bg-[#f59e0b] hover:bg-[#fbbf24] text-black px-6 py-2 font-semibold rounded-lg"
      onClick={handleAddToCart}
      disabled={isAdding || !variantId || !availableForSale}
    >
      {isAdding ? (
        'Adding...'
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {availableForSale ? "Add to Cart" : "Out of Stock"}
        </>
      )}
    </Button>
  );
}