import { cacheLife, cacheTag } from "next/cache"
import { contentService } from "../services/content"
import { adaptArticleDetail } from "../adapters/article"

/**
 * Server-side article read for SEO metadata / JSON-LD. `track: 0` keeps crawlers and
 * renders from inflating the view counter. Resolves to null on any failure so callers fall back.
 */
export async function getArticleBundle(slug) {
  "use cache"
  cacheLife("minutes")
  cacheTag("articles", `article-${slug}`)

  try {
    const res = await contentService.articles.detail(slug, "gu", { token: null, query: { track: 0 } })
    return adaptArticleDetail(res.data)
  } catch {
    return null
  }
}

export async function getArticleSlugs() {
  "use cache"
  cacheLife("minutes")
  cacheTag("articles-sitemap", "articles")

  try {
    const res = await contentService.sitemap({ token: null })
    return res.data.articles.map((a) => a.slug)
  } catch {
    return []
  }
}

export async function getCategoryArticleList(slug, lang, size) {
  "use cache"
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 })
  cacheTag("articles", `category-articles-${slug}`)

  for (const delay of [0, 350, 900]) {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay))

    try {
      const response = await contentService.articles.list(
        { category: slug, per_page: size },
        lang,
        { token: null, signal: AbortSignal.timeout(3500) },
      )
      if (!Array.isArray(response?.data)) throw new Error("Invalid category response")
      return response.data
    } catch (error) {
      if (error.status >= 400 && error.status < 500 && error.status !== 429) throw error
    }
  }

  throw new Error("Category article service unavailable")
}
