// app/products/[handle]/page.tsx
// ESTE ES UN SERVER COMPONENT POR DEFECTO (sin "use client")

import { getProduct, getAllProductHandles } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/add-to-cart-button";
import type { Product as ProductType } from "@/types/product";

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product: ProductType | null = await getProduct(params.handle);

  if (!product) {
    return notFound();
  }

  const variant = product.variants?.edges?.[0]?.node;
  const image = product.images?.edges?.[0]?.node;

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-[#0f172a] to-[#431e70] text-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {image?.url && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            width={600}
            height={600}
            className="w-full h-auto rounded-xl shadow-2xl object-cover"
            priority
          />
        )}

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-300 mb-6">{product.description}</p>

          <div className="text-[#f59e0b] text-3xl font-extrabold mb-4">
            {/* CORRECCIÓN AQUÍ: Asegurarse de que tanto amount como currencyCode existen antes de renderizar */}
            {variant?.price?.amount && variant.price.currencyCode ? (
                <span>
                    {variant.price.amount} {variant.price.currencyCode}
                </span>
            ) : (
                <span>Price not available</span> // O un mensaje de fallback apropiado
            )}
          </div>

          <AddToCartButton
            variantId={variant?.id}
            availableForSale={variant?.availableForSale}
            productTitle={product.title}
          />
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles.map((handle) => ({
    handle: handle,
  }));
}