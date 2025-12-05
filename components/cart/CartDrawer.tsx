// components/cart/CartDrawer.tsx
'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react'; // Importar useEffect
import { useCartStore } from '@/stores/useCartStore'; // Importa el store de Zustand
// No importamos directamente las Server Actions aquí, ya que el store las maneja
// import { removeItemFromCart, updateItemInCart } from '@/lib/cart-actions';

export default function CartDrawer() {
  const { isOpen, toggleCart, items, totalItems, subtotal, total, checkoutUrl, loading, error, loadInitialCart, removeItem, updateItemQuantity } = useCartStore();

  // Carga el carrito inicial cuando el componente se monta por primera vez
  // Esto es crucial para la persistencia del carrito a través de las sesiones del navegador
  useEffect(() => {
    loadInitialCart();
  }, [loadInitialCart]); // Dependencia para asegurar que solo se ejecuta una vez al montar


  if (!isOpen) return null;

  // Los manejadores ahora llaman a las funciones del store, que a su vez llaman a las Server Actions
  const handleRemoveItem = async (lineId: string) => {
    await removeItem(lineId);
  };

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    // Busca el item para obtener el variantId
    const item = items.find(i => i.id === lineId);
    if (item) {
        await updateItemQuantity(lineId, newQuantity);
    } else {
        console.warn("Item not found in client state for quantity update:", lineId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={toggleCart}>
      <div
        className="w-full md:w-1/3 bg-slate-900 h-full shadow-lg p-6 flex flex-col"
        onClick={(e) => e.stopPropagation()} // Previene que al hacer clic dentro se cierre
      >
        {/* Encabezado del carrito */}
        <div className="flex justify-between items-center border-b border-slate-700 pb-4 mb-4">
          <h2 className="text-2xl font-bold text-white">Your Cart ({totalItems})</h2>
          <button onClick={toggleCart} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {loading && <p className="text-white">Loading cart...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Contenido del carrito */}
        {items.length === 0 && !loading ? (
          <p className="text-slate-400 text-center flex-grow flex items-center justify-center">Your cart is empty.</p>
        ) : (
          <div className="flex-grow overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b border-slate-800 last:border-b-0">
                <div className="relative w-20 h-20 flex-shrink-0">
                  {item.image?.url && (
                    <Image
                      src={item.image.url}
                      alt={item.image.altText || item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="80px"
                      className="rounded-md"
                    />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                  <p className="text-slate-400 text-sm">
                    {item.price.amount} {item.price.currencyCode}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1 || loading}
                      className="text-slate-400 hover:text-white px-2 py-1 border border-slate-700 rounded"
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={loading}
                      className="text-slate-400 hover:text-white px-2 py-1 border border-slate-700 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={loading}
                      className="ml-auto text-red-500 hover:text-red-400 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resumen y Checkout */}
        {items.length > 0 && (
          <div className="border-t border-slate-700 pt-4 mt-4">
            <div className="flex justify-between text-white text-lg font-semibold mb-2">
              <span>Subtotal:</span>
              <span>{subtotal?.amount || '0.00'} {subtotal?.currencyCode || 'USD'}</span>
            </div>
            <div className="flex justify-between text-white text-xl font-bold mb-6">
              <span>Total:</span>
              <span>{total?.amount || '0.00'} {total?.currencyCode || 'USD'}</span>
            </div>
            {checkoutUrl && (
              <Link
                href={checkoutUrl}
                target="_blank"
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-md font-bold transition"
              >
                Proceed to Checkout
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}