import { cacheLife } from "next/cache"
import { contentService } from "../services/content"
import { adaptArticleDetail } from "../adapters/article"

/**
 * Server-side article read for SEO metadata / JSON-LD. `track: 0` keeps crawlers and
 * renders from inflating the view counter. Resolves to null on any failure so callers fall back.
 */
export async function getArticleBundle(slug) {
  "use cache"
  cacheLife("minutes")

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

  try {
    const res = await contentService.sitemap({ token: null })
    return res.data.articles.map((a) => a.slug)
  } catch {
    return []
  }
}
