// stores/useCartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// Importa los tipos directamente desde types/product.ts
import { Cart as ShopifyCart } from '@/types/product'; // Renombra para evitar conflictos con el tipo local de 'Cart' si lo tuvieras
// Importa las Server Actions para interactuar con el carrito en el servidor
import {
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
  getCartId, // Asumiendo que esta función obtiene el cartId de una cookie HTTP-only o similar del servidor
} from '@/lib/cart-actions'; // Usa @/lib si así lo tienes configurado en tsconfig.json

import { getCart as getShopifyCart } from '@/lib/shopify-cart'; // Asumiendo esta importación correcta

// Define el tipo de un ítem en el carrito para el estado de Zustand
// Este es el tipo 'aplanado' que quieres usar en tu UI para mostrar los ítems del carrito
export type CartItem = {
  id: string; // ID de la línea del carrito de Shopify (line.id)
  productId: string;
  productHandle: string;
  variantId: string; // ID de la variante del producto (merchandise.id)
  title: string; // Título de la variante o producto + variante
  quantity: number;
  price: {
    amount: string;
    currencyCode: string;
  };
  image: {
    url: string;
    altText?: string;
  };
};

// Define la interfaz completa de tu estado del carrito para Zustand
export type CartState = {
  isOpen: boolean;
  cartId: string | null;
  items: CartItem[];
  totalItems: number;
  subtotal: { amount: string; currencyCode: string } | null;
  total: { amount: string; currencyCode: string } | null;
  checkoutUrl: string | null;
  loading: boolean;
  error: string | null;

  // Acciones (funciones que modifican el estado o interactúan con Server Actions)
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  setCartId: (id: string | null) => void;
  loadInitialCart: () => Promise<void>; // Carga el carrito desde Shopify al inicio o rehidratación
  syncCart: (shopifyCart: ShopifyCart | null) => void; // Sincroniza el estado de Zustand con los datos de Shopify
  clearCart: () => void; // Limpia el carrito local y en Shopify si es posible
  addItem: (merchandiseId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string | string[]) => Promise<void>; // Permite eliminar por un solo ID o un array de IDs
  updateItemQuantity: (lineId: string, newQuantity: number) => Promise<void>;
};

// Estado inicial por defecto del carrito
const initialState: Omit<CartState, 'toggleCart' | 'closeCart' | 'openCart' | 'setCartId' | 'loadInitialCart' | 'syncCart' | 'clearCart' | 'addItem' | 'removeItem' | 'updateItemQuantity'> = {
  isOpen: false,
  cartId: null,
  items: [],
  totalItems: 0,
  subtotal: null,
  total: null,
  checkoutUrl: null,
  loading: false,
  error: null,
};

// Crea el store de Zustand con persistencia
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({ // 'set' y 'get' son las funciones proporcionadas por Zustand para interactuar con el store
      ...initialState, // Aplica el estado inicial

      // Definición de acciones
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
      openCart: () => set({ isOpen: true }),
      setCartId: (id) => set({ cartId: id }),

      loadInitialCart: async () => {
        set({ loading: true, error: null });
        try {
          // Intenta obtener el cartId del estado persistido de Zustand (desde localStorage)
          // O de una cookie HTTP-only (si `getCartId` lo implementa como Server Action)
          const existingCartId = get().cartId; // Si el store ya rehidrató el cartId, úsalo

          let shopifyCart: ShopifyCart | null = null;
          if (existingCartId) {
            // Intenta obtener el carrito completo de Shopify usando el cartId
            shopifyCart = await getShopifyCart(existingCartId);
            // Si Shopify devuelve nulo (ej. carrito expirado o no encontrado), limpia el cartId local
            if (!shopifyCart) {
              set({ cartId: null });
            }
          }

          // Sincroniza el estado de Zustand con los datos obtenidos de Shopify (o nulo si no hay carrito)
          get().syncCart(shopifyCart);
        } catch (err: any) {
          console.error("Error loading initial cart:", err);
          set({ error: err.message || "Failed to load initial cart.", loading: false });
        }
      },

      syncCart: (shopifyCart) => {
        set((state) => {
          console.log("Syncing cart with Shopify data:", shopifyCart);

          // Si no hay un carrito de Shopify válido, limpia el estado local
          if (!shopifyCart) {
            console.log("No Shopify cart provided to sync. Clearing local cart state.");
            return {
              ...state,
              cartId: null,
              items: [],
              totalItems: 0,
              subtotal: null,
              total: null,
              checkoutUrl: null,
              loading: false,
              error: null,
            };
          }

          // Mapea las líneas del carrito de Shopify a tu tipo CartItem local
          const newItems: CartItem[] = shopifyCart.lines?.edges?.map((edge) => {
            const lineNode = edge.node;
            const merchandise = lineNode.merchandise;
            const product = merchandise.product; // Accede al producto anidado (requiere types/product.ts actualizado)

            const image = product?.images?.edges?.[0]?.node; // Obtener la primera imagen del producto

            return {
              id: lineNode.id, // ID de la línea del carrito de Shopify
              productId: product?.id || '', // ID del producto
              productHandle: product?.handle || '', // Handle del producto para URL
              variantId: merchandise.id, // ID de la variante (SKU en muchos casos)
              title: `${product?.title || 'Unknown Product'}${merchandise.title !== 'Default Title' ? ` - ${merchandise.title}` : ''}`, // Título completo
              quantity: lineNode.quantity,
              price: {
                amount: merchandise.price.amount,
                currencyCode: merchandise.price.currencyCode,
              },
              image: image
                ? {
                    url: image.url,
                    altText: image.altText || product?.title || 'No image available',
                  }
                : {
                    url: '/placeholder-image.jpg', // Imagen por defecto si no hay
                    altText: 'No image available',
                  },
            };
          }) || [];

          // Calcula el número total de ítems en el carrito
          const newTotalItems = newItems.reduce((acc, item) => acc + item.quantity, 0);

          // Retorna el nuevo estado del carrito
          const updatedState = {
            ...state,
            cartId: shopifyCart.id,
            items: newItems,
            totalItems: newTotalItems,
            subtotal: shopifyCart.cost.subtotalAmount,
            total: shopifyCart.cost.totalAmount,
            checkoutUrl: shopifyCart.checkoutUrl,
            loading: false,
            error: null,
          };
          console.log("🛒 Zustand Cart State after sync:", updatedState);
          return updatedState;
        });
      },

      clearCart: () => {
        set(() => {
          return {
            ...initialState, // Restablece el store a su estado inicial vacío
          };
        });
      },

      // --- Métodos que interactúan con Server Actions para modificar el carrito de Shopify ---
      addItem: async (merchandiseId: string, quantity: number) => {
        set({ loading: true, error: null });
        try {
          // Llama a la Server Action para añadir el ítem al carrito de Shopify
          // Se espera que addItemToCart devuelva el carrito de Shopify actualizado
          const updatedCart = await addItemToCart(merchandiseId, quantity);
          if (updatedCart) {
            get().syncCart(updatedCart); // Sincroniza el store con el carrito recién actualizado
            get().openCart(); // Abre el carrito visualmente
          } else {
            set({ error: "Failed to add item to cart via Server Action: No cart returned." });
          }
        } catch (error: any) {
          console.error("Error adding item via Server Action:", error);
          set({ error: error.message || "Failed to add item to cart." });
        } finally {
          set({ loading: false });
        }
      },

      removeItem: async (lineId: string | string[]) => { // Acepta un solo ID o un array de IDs
        set({ loading: true, error: null });
        try {
          // Asegurarse de que removeItemFromCart siempre reciba un array de strings
          const lineIdsToRemove = Array.isArray(lineId) ? lineId : [lineId];
          // Llama a la Server Action para eliminar ítems del carrito de Shopify
          // Se espera que removeItemFromCart devuelva el carrito actualizado
          const updatedCart = await removeItemFromCart(lineIdsToRemove);
          if (updatedCart) {
            get().syncCart(updatedCart);
          } else {
            set({ error: "Failed to remove item from cart via Server Action: No cart returned." });
          }
        } catch (error: any) {
          console.error("Error removing item via Server Action:", error);
          set({ error: error.message || "Failed to remove item from cart." });
        } finally {
          set({ loading: false });
        }
      },

      updateItemQuantity: async (lineId: string, newQuantity: number) => {
        set({ loading: true, error: null });
        try {
          // Encuentra el ítem actual en el estado local para obtener el variantId
          const currentItem = get().items.find(item => item.id === lineId);
          if (!currentItem) {
            console.error("Item not found for quantity update in Zustand.");
            set({ error: "Item not found in cart." });
            return;
          }

          // Llama a la Server Action para actualizar la cantidad del ítem en Shopify
          // Se espera que updateItemInCart devuelva el carrito actualizado
          const updatedCart = await updateItemInCart(lineId, currentItem.variantId, newQuantity);
          if (updatedCart) {
            get().syncCart(updatedCart);
          } else {
            set({ error: "Failed to update item quantity via Server Action: No cart returned." });
          }
        } catch (error: any) {
          console.error("Error updating item quantity via Server Action:", error);
          set({ error: error.message || "Failed to update item quantity." });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'cart-storage', // Clave para el almacenamiento persistente (localStorage)
      storage: createJSONStorage(() => localStorage), // Usa localStorage para la persistencia
      // `partialize` define qué partes del estado se guardarán en el almacenamiento.
      // Solo necesitamos persistir el `cartId` porque el resto del carrito se puede rehidratar desde Shopify.
      partialize: (state) => ({ cartId: state.cartId }),
      // `onRehydrateStorage` es un callback que se ejecuta cuando el store intenta rehidratarse.
      onRehydrateStorage: (state) => {
        // La función `get` del store está disponible en este ámbito por closure.

        // Esta función interna se devuelve y se ejecuta DESPUÉS de que el store ha sido
        // inicializado con el estado rehidratado (en este caso, solo `cartId`).
        return (rehydratedState) => {
          if (rehydratedState && rehydratedState.cartId) {
            // Si se rehidrató un `cartId`, se llama a `loadInitialCart`
            // para obtener los datos más recientes del carrito desde Shopify.
            get().loadInitialCart(); // Usa el 'get' del ámbito superior directamente.
          }
        };
      },
      // Puedes añadir `version` y `migrate` aquí para manejar cambios en la estructura del estado persistido
      // si tu aplicación evoluciona y el formato del `cart-storage` cambia.
    }
  )
);