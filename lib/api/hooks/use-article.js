"use client"

import * as React from "react"
import { getArticleById } from "@/lib/data/article-data"
import { contentService } from "../services/content"
import { adaptArticleDetail } from "../adapters/article"

const safeDecode = (val) => {
  if (!val) return ""
  try {
    return decodeURIComponent(String(val))
  } catch {
    return String(val)
  }
}

/**
 * Article for the detail page: live API article (current language, counts a view) →
 * server-provided article → bundled static article (only when the id is a known static one).
 */
export function useArticle(id, initialArticle) {
  const [live, setLive] = React.useState(null)
  const decodedId = React.useMemo(() => safeDecode(id), [id])

  React.useEffect(() => {
    let cancelled = false
    contentService.articles
      .detail(decodedId || id, "gu", { token: null })
      .then((res) => {
        if (!cancelled && res?.data) {
          setLive({ id: decodedId || id, article: adaptArticleDetail(res.data) })
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [id, decodedId])

  return React.useMemo(() => {
    if (live?.id === id || live?.id === decodedId) return live.article
    if (
      initialArticle &&
      (initialArticle.id === id ||
        initialArticle.id === decodedId ||
        initialArticle.slug === id ||
        initialArticle.slug === decodedId)
    ) {
      return initialArticle
    }
    return getArticleById(decodedId) || getArticleById(id)
  }, [live, id, decodedId, initialArticle])
}
