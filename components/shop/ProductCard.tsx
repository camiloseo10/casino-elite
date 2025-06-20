// components/shop/ProductCard.tsx
import type { Product } from "@/types/product"
import Image from "next/image"
import Link from "next/link"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const image = product.images.edges[0]?.node

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {image && (
        <Image
          src={image.url}
          alt={image.altText || product.title}
          width={500}
          height={500}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{product.title}</h3>
        <p className="text-amber-600 font-bold mt-2">
          ${product.priceRange.minVariantPrice.amount}
        </p>
        <Link
          href={`/products/${product.handle}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-3 inline-block"
        >
          View product
        </Link>
      </div>
    </div>
  )
}