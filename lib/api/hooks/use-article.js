"use client"

import * as React from "react"
import { getArticleById } from "@/lib/data/article-data"
import { contentService } from "../services/content"
import { adaptArticleDetail } from "../adapters/article"

/**
 * Article for the detail page: live API article (current language, counts a view) →
 * server-provided article → bundled static article (only when the id is a known static one).
 */
export function useArticle(id, initialArticle) {
  const [live, setLive] = React.useState(null)

  React.useEffect(() => {
    let cancelled = false
    contentService.articles
      .detail(id, "gu", { token: null })
      .then((res) => {
        if (!cancelled) setLive({ id, article: adaptArticleDetail(res.data) })
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [id])

  return React.useMemo(() => {
    if (live?.id === id) return live.article
    if (initialArticle?.id === id || initialArticle?.slug === id) return initialArticle
    return getArticleById(id)
  }, [live, id, initialArticle])
}
