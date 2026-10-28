import { ARTICLES_DATA, getAllArticleIds } from "@/lib/data/article-data"
import { getAllProductIds } from "@/lib/data/product-data"
import { getAllCategorySlugs } from "@/lib/data/shop-data"
import { getCatalogSlugs } from "@/lib/api/server/catalog"
import { getArticleSlugs } from "@/lib/api/server/articles"

/**
 * Next.js App Router - Dynamic Comprehensive Sitemap Generation
 *
 * Automatically generates and serves /sitemap.xml
 * Lists all public indexable pages, categories, consecrated store products, and editorial articles.
 * Strictly adheres to Google Search Central and Bing Webmaster guidelines by excluding private/auth pages.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"
  const currentDate = new Date().toISOString()

  // Live slugs from the backend; the bundled catalog is only a fallback while the API is unreachable.
  const [liveCatalog, liveArticleSlugs] = await Promise.all([getCatalogSlugs(), getArticleSlugs()])

  // 1. Core Primary Static Pages (High Authority Public Landing Pages)
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dainik-panchang`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/myshop`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/numerology`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  // 2. Dynamic Shop Categories (/myshop/[category])
  const categorySlugs = liveCatalog.categories.length ? liveCatalog.categories : getAllCategorySlugs()
  const categoryPages = categorySlugs.map((slug) => ({
    url: `${baseUrl}/myshop/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // 3. Dynamic Consecrated Products Catalog (/myshop/product/[id])
  const productIds = liveCatalog.products.length ? liveCatalog.products : getAllProductIds()
  const uniqueProductIds = Array.from(new Set(productIds))
  const productPages = uniqueProductIds.map((id) => ({
    url: `${baseUrl}/myshop/product/${id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // 4. Dynamic Editorial & Scriptural Articles (/article/[id])
  const articleIds = liveArticleSlugs.length
    ? liveArticleSlugs
    : typeof getAllArticleIds === "function"
      ? getAllArticleIds()
      : Object.keys(ARTICLES_DATA)
  const uniqueArticleIds = Array.from(new Set(articleIds))
  const articlePages = uniqueArticleIds.map((id) => ({
    url: `${baseUrl}/article/${id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...productPages, ...articlePages]
}
