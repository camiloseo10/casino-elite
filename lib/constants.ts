// lib/constants.ts
// Asegúrate de que estas variables de entorno están en tu .env.local
export const API_URL = process.env.SHOPIFY_STOREFRONT_GRAPHQL_URL as string;
export const STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;
export const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN as string; // Ahora existirá
export const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-04'; // O la versión que uses

export const CART_COOKIE_NAME = 'cartId';