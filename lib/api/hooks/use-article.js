"use client"

import * as React from "react"
import { getArticleById } from "@/lib/data/article-data"
import { contentService } from "../services/content"
import { adaptArticleDetail } from "../adapters/article"
import { tokenStore } from "../token-store"

/**
 * Article for the detail page: live API article (current language, counts a view) →
 * server-provided article → bundled static article (only when the id is a known static one).
 */
export function useArticle(id, initialArticle) {
  const [live, setLive] = React.useState(null)
  const [version, setVersion] = React.useState(0)

  const reload = React.useCallback(() => {
    setVersion((v) => v + 1)
  }, [])

  React.useEffect(() => {
    let cancelled = false
    const token = tokenStore.get()
    contentService.articles
      .detail(id, "gu", { token: token || null })
      .then((res) => {
        if (!cancelled && res?.data) {
          setLive({ id, article: adaptArticleDetail(res.data) })
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [id, version])

  return React.useMemo(() => {
    let art = null
    if (live?.id === id) art = live.article
    else if (initialArticle?.id === id || initialArticle?.slug === id) art = initialArticle
    else art = getArticleById(id)

    if (art && typeof art === "object") {
      return { ...art, reload }
    }
    return art
  }, [live, id, initialArticle, reload])
}
