import { Product } from "@/types/product"

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

async function shopifyFetch(query: string) {
  const URL = `https://${domain}/api/2023-07/graphql.json`

  const options = {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }

  try {
    const response = await fetch(URL, options)
    const json = await response.json()

    if (json.errors) {
      console.error("Shopify API error:", JSON.stringify(json.errors, null, 2))
      throw new Error("Shopify API error")
    }

    return json.data
  } catch (error) {
    throw new Error("Failed to fetch Shopify data")
  }
}

export async function getProductsInCollection(): Promise<Product[]> {
  const query = `
    {
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
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
  `

  const data = await shopifyFetch(query)
  return data.products.edges.map((edge: any) => edge.node)
}

export async function getAllProducts(): Promise<{ id: string; handle: string }[]> {
  const query = `
    {
      products(first: 250) {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query)
  return data.products.edges.map((edge: any) => edge.node)
}