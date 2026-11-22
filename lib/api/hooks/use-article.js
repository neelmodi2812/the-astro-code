"use client"

import * as React from "react"
import { contentService } from "../services/content"
import { adaptArticleDetail } from "../adapters/article"
import { tokenStore } from "../token-store"

/**
 * Article for the detail page: live API article (current language, counts a view) →
 * server-provided live article → null (never show default/mock article when not found).
 */
export function useArticle(id, initialArticle) {
  const [live, setLive] = React.useState(null)
  const [loading, setLoading] = React.useState(!initialArticle)
  const [notFound, setNotFound] = React.useState(false)
  const [version, setVersion] = React.useState(0)

  const reload = React.useCallback(() => {
    setVersion((v) => v + 1)
  }, [])

  React.useEffect(() => {
    if (!id) {
      setLoading(false)
      setNotFound(true)
      return
    }

    let cancelled = false
    setLoading(!initialArticle)
    setNotFound(false)

    const token = tokenStore.get()
    contentService.articles
      .detail(id, "gu", { token: token || null })
      .then((res) => {
        if (cancelled) return
        if (res?.data) {
          setLive({ id, article: adaptArticleDetail(res.data) })
          setNotFound(false)
        } else if (!initialArticle) {
          setNotFound(true)
        }
      })
      .catch(() => {
        if (cancelled) return
        if (!initialArticle) {
          setNotFound(true)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [id, version, initialArticle])

  return React.useMemo(() => {
    let art = null
    if (live?.id === id && live?.article) {
      art = live.article
    } else if (initialArticle && (initialArticle.id === id || initialArticle.slug === id)) {
      art = initialArticle
    }

    const isStillLoading = loading && !art
    const isActuallyNotFound = !isStillLoading && (notFound || !art)

    if (art && typeof art === "object") {
      return {
        ...art,
        article: art,
        loading: isStillLoading,
        notFound: isActuallyNotFound,
        reload,
      }
    }

    return {
      article: null,
      loading: isStillLoading,
      notFound: isActuallyNotFound,
      reload,
    }
  }, [live, id, initialArticle, loading, notFound, reload])
}
