import { notFound } from "next/navigation"
import { getCategoryMeta, getAllCategorySlugs } from "@/lib/data/shop-data"
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
    return { title: "Category Not Found | MyShop | The Astro Code" }
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
    }
  }
}

export default async function CategoryPage({ params }) {
  const { category } = await params
  const validSlugs = getAllCategorySlugs()

  if (!validSlugs.includes(category)) {
    notFound()
  }

  return <CategoryClient categorySlug={category} />
}
