import { notFound } from "next/navigation"
import { getCategoryMeta, getAllCategorySlugs } from "@/lib/data/shop-data"
import { JsonLd } from "@/components/seo-structured-data"
import CategoryClient from "./CategoryClient"

/**
 * Dynamic Category Page for /myshop/[category]
 * 
 * Server component that handles SEO metadata generation and
 * validates the category slug before rendering the client component.
 */

// Opt out of instant navigation since entire page depends on the [category] param
export const instant = false

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ category: slug }))
}

export async function generateMetadata({ params }) {
  const { category } = await params
  const meta = getCategoryMeta(category, "en")

  if (!meta) {
    return { title: "Category Not Found | MyShop" }
  }

  return {
    title: meta.seoTitle,
    description: meta.seoDescription,
    alternates: {
      canonical: `/myshop/${category}`
    },
    openGraph: {
      title: meta.seoTitle,
      description: meta.seoDescription,
      url: `/myshop/${category}`,
      siteName: "The Astro Code",
      locale: "gu_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: meta.seoTitle,
      description: meta.seoDescription,
    }
  }
}

export default async function CategoryPage({ params }) {
  const { category } = await params
  const validSlugs = getAllCategorySlugs()

  if (!validSlugs.includes(category)) {
    notFound()
  }

  const meta = getCategoryMeta(category, "gu") || getCategoryMeta(category, "en")
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"
  const canonicalUrl = `${siteUrl}/myshop/${category}`

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": meta?.name || category,
    "description": meta?.description || meta?.heroSubtitle,
    "url": canonicalUrl,
    "inLanguage": "gu",
    "isPartOf": {
      "@type": "WebSite",
      "name": "The Astro Code",
      "url": siteUrl
    }
  }

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
        "name": meta?.name || category,
        "item": canonicalUrl
      }
    ]
  }

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <CategoryClient categorySlug={category} />
    </>
  )
}
