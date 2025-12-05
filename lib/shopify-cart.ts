// lib/shopify-cart.ts
import { shopifyFetch } from '@/lib/shopify'; // Importa la función de fetch genérica
import {
  Cart,
  CartLineAddInput,
  CartLineUpdateInput,
  ShopifyApiResponse // Asegúrate de que este tipo esté importado
} from '@/types/product'; // Importa los tipos de carrito desde types/product.ts

// Asegúrate de que el fragmento del carrito esté disponible desde shopify.ts
// O puedes definirlo aquí si prefieres, pero lo mantendré separado para reusabilidad.
// Para este ejemplo, lo definimos aquí para evitar una dependencia circular.
const cartLineFragment = `
  fragment CartLineFragment on CartLine {
    id
    quantity
    merchandise {
      ...on ProductVariant {
        id
        title
        price {
          amount
          currencyCode
        }
        product {
          id
          handle
          title
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const cartFragment = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          ...CartLineFragment
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
  }
  ${cartLineFragment}
`;


// -------------------------------------------------------------
// Funciones para la interacción con el carrito
// -------------------------------------------------------------

type CreateCartResponse = {
  cartCreate: {
    cart: Cart;
  };
};

export async function createCart(): Promise<Cart | null> {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          ...CartFragment
        }
      }
    }
    ${cartFragment}
  `;

  try {
    const result = await shopifyFetch<CreateCartResponse>({
      query,
      cache: 'no-store' // No cachear la creación de carrito
    });
    return result.body.data.cartCreate.cart;
  } catch (e) {
    console.error("Error creating cart:", e);
    return null;
  }
}

type GetCartResponse = {
  cart: Cart;
};

export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
    ${cartFragment}
  `;

  try {
    const result = await shopifyFetch<GetCartResponse>({
      query,
      variables: { cartId },
      tags: ['cart'], // Tag para revalidación en Server Actions
      cache: 'no-store' // No cachear el carrito para que siempre sea actual
    });
    return result.body.data.cart;
  } catch (e) {
    console.error(`Error getting cart ${cartId}:`, e);
    return null;
  }
}

type AddToCartResponse = {
  cartLinesAdd: {
    cart: Cart;
    userErrors: Array<{ field: string[]; message: string }>;
  };
};

export async function addToCart(
  cartId: string,
  lines: CartLineAddInput[]
): Promise<Cart | null> {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${cartFragment}
  `;

  try {
    const result = await shopifyFetch<AddToCartResponse>({
      query,
      variables: { cartId, lines },
      cache: 'no-store' // No cachear esta mutación
    });

    if (result.body.data.cartLinesAdd.userErrors.length > 0) {
      console.error("Shopify User Errors on AddToCart:", result.body.data.cartLinesAdd.userErrors);
      throw new Error(result.body.data.cartLinesAdd.userErrors[0].message);
    }

    return result.body.data.cartLinesAdd.cart;
  } catch (e) {
    console.error(`Error adding to cart ${cartId}:`, e);
    return null;
  }
}

type RemoveFromCartResponse = {
  cartLinesRemove: {
    cart: Cart;
    userErrors: Array<{ field: string[]; message: string }>;
  };
};

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${cartFragment}
  `;

  try {
    const result = await shopifyFetch<RemoveFromCartResponse>({
      query,
      variables: { cartId, lineIds },
      cache: 'no-store'
    });

    if (result.body.data.cartLinesRemove.userErrors.length > 0) {
      console.error("Shopify User Errors on RemoveFromCart:", result.body.data.cartLinesRemove.userErrors);
      throw new Error(result.body.data.cartLinesRemove.userErrors[0].message);
    }

    return result.body.data.cartLinesRemove.cart;
  } catch (e) {
    console.error(`Error removing from cart ${cartId}:`, e);
    return null;
  }
}

type UpdateCartResponse = {
  cartLinesUpdate: {
    cart: Cart;
    userErrors: Array<{ field: string[]; message: string }>;
  };
};

export async function updateCart(
  cartId: string,
  lines: CartLineUpdateInput[]
): Promise<Cart | null> {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${cartFragment}
  `;

  try {
    const result = await shopifyFetch<UpdateCartResponse>({
      query,
      variables: { cartId, lines },
      cache: 'no-store'
    });

    if (result.body.data.cartLinesUpdate.userErrors.length > 0) {
      console.error("Shopify User Errors on UpdateCart:", result.body.data.cartLinesUpdate.userErrors);
      throw new Error(result.body.data.cartLinesUpdate.userErrors[0].message);
    }

    return result.body.data.cartLinesUpdate.cart;
  } catch (e) {
    console.error(`Error updating cart ${cartId}:`, e);
    return null;
  }
}