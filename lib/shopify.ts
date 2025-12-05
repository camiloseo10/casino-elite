// lib/shopify.ts
import { API_URL, STOREFRONT_ACCESS_TOKEN } from '@/lib/constants';
// Importa todos los tipos necesarios desde types/product.ts
import {
  Product,
  Cart,
  CartLineAddInput,
  CartLineUpdateInput,
  ShopifyApiResponse, // Añadido para tipificar la respuesta de fetch
  Price // Por si lo necesitas en algún otro lugar
} from '@/types/product';

// Configuración básica para el fetch de Shopify
type ShopifyFetchConfig = {
  query: string;
  variables?: Record<string, any>;
  headers?: HeadersInit;
  tags?: string[];
  cache?: RequestCache; // 'no-store' | 'force-cache' | 'default' | 'reload' | 'no-cache' | 'only-if-cached'
};

const domain = process.env.SHOPIFY_STORE_DOMAIN; // Asegúrate de tener esta env variable

// Función genérica para hacer fetch a la API de Shopify
export async function shopifyFetch<T>({
  query,
  variables,
  headers,
  tags,
  cache = 'force-cache' // Default cache strategy
}: ShopifyFetchConfig): Promise<ShopifyApiResponse<T>> {
  if (!API_URL || !STOREFRONT_ACCESS_TOKEN || !domain) {
    throw new Error('Missing Shopify API credentials. Check .env.local');
  }

  try {
    const result = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
        ...headers
      },
      body: JSON.stringify({
        query,
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify GraphQL Errors:', body.errors);
      throw new Error(body.errors[0].message || 'Unknown Shopify GraphQL error');
    }

    if (!result.ok) {
      throw new Error(`Shopify API responded with status ${result.status}: ${JSON.stringify(body)}`);
    }

    return { status: result.status, body };

  } catch (e: any) {
    console.error('Error in shopifyFetch:', e);
    throw {
      error: e.message || 'Unknown error during Shopify API fetch',
      query: query,
      variables: variables,
      status: 500 // Assuming internal server error if fetch itself fails
    };
  }
}

// Fragmento de GraphQL para un producto completo
const productFragment = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    featuredImage {
      url
      altText
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          availableForSale
        }
      }
    }
    collections(first: 1) { # O más si necesitas todas las colecciones
      edges {
        node {
          title
          handle # Añadir handle si lo necesitas
        }
      }
    }
    # Añade cualquier otro campo que necesites del producto (ej. tags, seo)
    tags
  }
`;

// Fragmento para líneas del carrito (utilizado en queries de carrito)
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

// Fragmento para el carrito completo
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
      # Puedes añadir otros costos si los necesitas, ej. totalTaxAmount
    }
  }
  ${cartLineFragment}
`;

// -------------------------------------------------------------
// Funciones para obtener productos
// -------------------------------------------------------------

type GetFeaturedProductsResponse = {
  products: {
    edges: {
      node: Product;
    }[];
  };
};

export async function getFeaturedProducts(): Promise<Product[]> {
  const query = `
    query getFeaturedProducts {
      products(first: 4, query: "tag:featured") { # Asume que tienes productos con el tag 'featured'
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
    ${productFragment}
  `;

  try {
    const result = await shopifyFetch<GetFeaturedProductsResponse>({
      query,
      tags: ['products']
    });
    return result.body.data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

type GetAllProductsFullResponse = {
  products: {
    edges: {
      node: Product;
    }[];
  };
};

export async function getAllProductsFull(): Promise<Product[]> {
  const query = `
    query getAllProductsFull {
      products(first: 250) { # Puedes ajustar el 'first' según tus necesidades
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
    ${productFragment}
  `;

  try {
    const result = await shopifyFetch<GetAllProductsFullResponse>({
      query,
      tags: ['products']
    });
    return result.body.data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

// Puedes añadir más funciones para productos aquí (ej. getProductByHandle)
type GetProductByHandleResponse = {
  productByHandle: Product | null;
};

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFragment
      }
    }
    ${productFragment}
  `;

  try {
    const result = await shopifyFetch<GetProductByHandleResponse>({
      query,
      variables: { handle },
      tags: ['products'],
      cache: 'no-store' // Si quieres que siempre sea fresco
    });
    return result.body.data.productByHandle;
  } catch (error) {
    console.error(`Error fetching product by handle ${handle}:`, error);
    return null;
  }
}

// ... (otros fragmentos y funciones si los tenías)