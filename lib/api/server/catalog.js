import { cacheLife } from "next/cache"
import { shopService } from "../services/shop"
import { contentService } from "../services/content"
import { adaptListProduct, adaptProductDetail } from "../adapters/shop"

/**
 * Server-side catalog reads for SEO metadata, JSON-LD and static params.
 * Cached for a few minutes; any backend failure resolves to `null` so callers
 * fall back to the bundled static catalog instead of breaking the build.
 */
export async function getProductBundle(slug, lang = "gu") {
  "use cache"
  cacheLife("minutes")

  try {
    const res = await shopService.productDetail(slug, lang, { token: null })
    return {
      product: adaptProductDetail(res.data, lang),
      related: (res.related_products || []).map((p) => adaptListProduct(p, lang)),
    }
  } catch {
    return null
  }
}

export async function getCatalogSlugs() {
  "use cache"
  cacheLife("minutes")

  try {
    const res = await contentService.sitemap({ token: null })
    return {
      products: res.data.products.map((p) => p.slug),
      categories: res.data.categories.map((c) => c.slug),
    }
  } catch {
    return { products: [], categories: [] }
  }
}
