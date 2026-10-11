import { notFound } from "next/navigation"
import { getProductById, getAllProductIds } from "@/lib/data/product-data"
import ProductDetailClient from "./ProductDetailClient"

/**
 * Dynamic Product Details Page for /myshop/product/[id]
 * 
 * Server Component following Next.js 16 App Router architecture.
 * Opts out of instant blocking and statically generates all valid product paths.
 */
export const instant = false

export async function generateStaticParams() {
  return getAllProductIds().map((id) => ({ id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = getProductById(id, "en")

  if (!product) {
    return {
      title: "Product Not Found | MyShop | The Astro Code",
      description: "The requested spiritual item could not be found in our Vedic store."
    }
  }

  const title = `${product.name} | MyShop | The Astro Code`
  const description = `${product.subtitle}. 100% authentic, lab certified and ritually consecrated with Vedic mantras. Free shipping across India.`

  return {
    title,
    description,
    alternates: {
      canonical: `/myshop/product/${id}`
    },
    openGraph: {
      title,
      description,
      url: `/myshop/product/${id}`,
      siteName: "The Astro Code",
      images: [
        {
          url: product.images?.[0] || product.image,
          width: 800,
          height: 800,
          alt: product.name
        }
      ],
      locale: "gu_IN",
      type: "website"
    }
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = getProductById(id, "gu")

  if (!product) {
    notFound()
  }

  return <ProductDetailClient productId={id} />
}
