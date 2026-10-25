import { notFound } from "next/navigation"
import { getProductById, getAllProductIds } from "@/lib/data/product-data"
import { getProductBundle, getCatalogSlugs } from "@/lib/api/server/catalog"
import { JsonLd } from "@/components/seo-structured-data"
import ProductDetailClient from "./ProductDetailClient"

/**
 * Dynamic Product Details Page for /myshop/product/[id]
 * 
 * Server Component following Next.js 16 App Router architecture.
 * Opts out of instant blocking and statically generates all valid product paths.
 */
export const instant = false

/**
 * Live catalog first (bundled static catalog as fallback), so products created
 * in the Laravel admin work without a code change.
 */
async function resolveProduct(id, lang) {
  const bundle = await getProductBundle(id, lang)
  return { bundle, product: bundle?.product ?? getProductById(id, lang) }
}

export async function generateStaticParams() {
  const live = await getCatalogSlugs()
  return [...new Set([...getAllProductIds(), ...live.products])].map((id) => ({ id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const { product } = await resolveProduct(id, "en")

  if (!product) {
    return {
      title: "Product Not Found | MyShop",
      description: "The requested spiritual item could not be found in our Vedic store."
    }
  }

  const title = `${product.name} | MyShop`
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images?.[0] || product.image],
    }
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params
  const { bundle, product } = await resolveProduct(id, "gu")

  if (!product) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"
  const canonicalUrl = `${siteUrl}/myshop/product/${id}`
  const primaryImage = product.images?.[0] || product.image || `${siteUrl}/the_astro_code_golden_yantra_logo.png`

  // Google Rich Results - Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images || [primaryImage],
    "description": product.subtitle || product.description,
    "sku": product.sku || `TAC-${id}`,
    "brand": {
      "@type": "Brand",
      "name": "The Astro Code"
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "INR",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stockStatus === "out_of_stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "The Astro Code",
        "url": siteUrl
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 4.9,
      "reviewCount": product.reviewsCount || 108,
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  // Google Rich Results - BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "હોમ",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "MyShop સ્ટોર",
        "item": `${siteUrl}/myshop`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": canonicalUrl
      }
    ]
  }

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductDetailClient productId={id} initialBundle={bundle} />
    </>
  )
}
