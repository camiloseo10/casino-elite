// lib/cart-actions.ts
'use server'; // Asegura que este archivo solo se ejecute en el servidor de Next.js

import { cookies } from 'next/headers'; // Para acceder y manipular las cookies en el servidor
import { revalidatePath, revalidateTag } from 'next/cache'; // Para revalidar datos en la caché de Next.js
import {
  createCart as createShopifyCart,
  addToCart as addShopifyItemToCart,
  removeFromCart as removeShopifyItemFromCart,
  updateCart as updateShopifyCart,
  getCart as getShopifyCart,
} from './shopify-cart'; // Funciones que interactúan directamente con la API de Shopify
import { Cart } from '@/types/product'; // Importa el tipo Cart definido en types/product.ts
import { CART_COOKIE_NAME } from '@/lib/constants'; // Asegúrate de que esta constante esté definida (ej. 'cartId')

/**
 * Obtiene el ID del carrito de las cookies.
 * @returns {Promise<string | null>} El ID del carrito o null si no existe.
 */
export async function getCartId(): Promise<string | null> {
  const cookieStore = cookies();
  // Retorna el valor de la cookie 'cartId' o null si no se encuentra.
  return cookieStore.get(CART_COOKIE_NAME)?.value || null;
}

/**
 * Crea un nuevo carrito en Shopify y guarda su ID en una cookie.
 * @returns {Promise<Cart | null>} El objeto del carrito creado o null si falla.
 */
export async function createNewCart(): Promise<Cart | null> {
  try {
    const newCart = await createShopifyCart();
    if (newCart?.id) {
      const cookieStore = cookies();
      cookieStore.set(CART_COOKIE_NAME, newCart.id, {
        httpOnly: true, // La cookie no es accesible desde JavaScript del lado del cliente
        secure: process.env.NODE_ENV === 'production', // Solo envía la cookie sobre HTTPS en producción
        sameSite: 'lax', // Protege contra CSRF
        path: '/', // La cookie está disponible en toda la aplicación
        maxAge: 60 * 60 * 24 * 30, // Expira en 30 días
      });
      console.log("✅ Carrito creado y ID guardado en cookies:", newCart.id);
      // Revalida las rutas para que se muestren los cambios en el carrito (ej. cantidad en el icono)
      revalidatePath('/');
      revalidatePath('/products');
      revalidatePath('/cart'); // Añadido por si tienes una página de carrito específica
      revalidateTag('cart'); // Para revalidar datos cacheados con la etiqueta 'cart'
      return newCart;
    }
    console.error("❌ Falló la creación del carrito: No se recibió un ID de carrito válido.");
    return null;
  } catch (error) {
    console.error("❌ Error en createNewCart:", error);
    // Propaga el error para que pueda ser manejado por el llamador si es necesario
    throw error;
  }
}

/**
 * Añade un item (variante de producto) al carrito. Si no hay carrito, crea uno nuevo.
 * @param {string} merchandiseId - El ID de la variante del producto a añadir.
 * @param {number} quantity - La cantidad del item a añadir (por defecto es 1).
 * @returns {Promise<Cart | null>} El carrito actualizado o null si falla.
 */
export async function addItemToCart(merchandiseId: string, quantity = 1): Promise<Cart | null> {
  let cartId = await getCartId();

  if (!cartId) {
    console.log("No cartId found, creating new cart...");
    const newCart = await createNewCart();
    if (newCart) {
      cartId = newCart.id;
    } else {
      console.error("Failed to create new cart, cannot add item.");
      return null;
    }
  }

  try {
    console.log(`Intentando añadir ${quantity} de ${merchandiseId} al carrito ${cartId}`);
    // Asegúrate de que el objeto pasado a addShopifyItemToCart coincida con CartLineAddInput
    const updatedCart = await addShopifyItemToCart(cartId, [{ merchandiseId, quantity }]);
    console.log("✅ Item añadido al carrito. Carrito actualizado:", updatedCart);

    // Revalida las rutas y tags afectados por el cambio en el carrito
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/cart');
    revalidateTag('cart'); // Para actualizar el caché de datos del carrito

    return updatedCart;
  } catch (error) {
    console.error("❌ Error al añadir item al carrito:", error);
    throw error;
  }
}

/**
 * Elimina items del carrito por sus IDs de línea.
 * @param {string[]} lineIds - Un array de IDs de línea del carrito a eliminar.
 * @returns {Promise<Cart | null>} El carrito actualizado o null si falla.
 */
export async function removeItemFromCart(lineIds: string[]): Promise<Cart | null> {
  const cartId = await getCartId();
  if (!cartId) {
    console.warn("No cartId found, nothing to remove.");
    return null;
  }
  try {
    const updatedCart = await removeShopifyItemFromCart(cartId, lineIds);
    console.log("✅ Items eliminados del carrito. Carrito actualizado:", updatedCart);

    // Revalida las rutas y tags afectados
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/cart');
    revalidateTag('cart');

    return updatedCart;
  } catch (error) {
    console.error("❌ Error al eliminar items del carrito:", error);
    throw error;
  }
}

/**
 * Actualiza la cantidad de un item existente en el carrito.
 * @param {string} lineId - El ID de la línea del carrito a actualizar.
 * @param {string} merchandiseId - El ID de la variante del producto asociado a la línea.
 * @param {number} quantity - La nueva cantidad deseada para el item.
 * @returns {Promise<Cart | null>} El carrito actualizado o null si falla.
 */
export async function updateItemInCart(lineId: string, merchandiseId: string, quantity: number): Promise<Cart | null> {
  const cartId = await getCartId();
  if (!cartId) {
    console.warn("No cartId found, cannot update quantity.");
    return null;
  }
  try {
    // Asegúrate de que el objeto pasado a updateShopifyCart coincida con CartLineUpdateInput
    const updatedCart = await updateShopifyCart(cartId, [{ id: lineId, merchandiseId: merchandiseId, quantity: quantity }]);
    console.log("✅ Cantidad de item actualizada. Carrito actualizado:", updatedCart);

    // Revalida las rutas y tags afectados
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/cart');
    revalidateTag('cart');

    return updatedCart;
  } catch (error) {
    console.error("❌ Error al actualizar cantidad del item en el carrito:", error);
    throw error;
  }
}