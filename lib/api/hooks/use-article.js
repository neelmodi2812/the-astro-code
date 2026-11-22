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
  const cleanId = React.useMemo(() => {
    if (!id) return ""
    try {
      return decodeURIComponent(String(id))
    } catch {
      return String(id)
    }
  }, [id])

  const initialMatches = React.useMemo(() => {
    if (!initialArticle || !cleanId) return null
    if (
      initialArticle.id === cleanId ||
      initialArticle.slug === cleanId ||
      initialArticle.id === id ||
      initialArticle.slug === id
    ) {
      return initialArticle
    }
    return null
  }, [initialArticle, cleanId, id])

  const [live, setLive] = React.useState(null)
  const [loading, setLoading] = React.useState(!initialMatches)
  const [notFound, setNotFound] = React.useState(false)
  const [version, setVersion] = React.useState(0)

  const reload = React.useCallback(() => {
    setVersion((v) => v + 1)
  }, [])

  React.useEffect(() => {
    if (!cleanId) {
      setLoading(false)
      setNotFound(true)
      return
    }

    let cancelled = false
    if (!initialMatches && (!live || (live.id !== cleanId && live.id !== id))) {
      setLoading(true)
      setNotFound(false)
    }

    const token = tokenStore.get()
    contentService.articles
      .detail(cleanId, "gu", { token: token || null })
      .then((res) => {
        if (cancelled) return
        if (res?.data) {
          setLive({ id: cleanId, article: adaptArticleDetail(res.data) })
          setNotFound(false)
        } else if (!initialMatches) {
          setNotFound(true)
        }
      })
      .catch(() => {
        if (cancelled) return
        if (!initialMatches) {
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
  }, [cleanId, id, version, initialMatches])

  return React.useMemo(() => {
    let art = null
    if (live && (live.id === cleanId || live.id === id) && live.article) {
      art = live.article
    } else if (initialMatches) {
      art = initialMatches
    }

    const isStillLoading = loading || (!art && !notFound)
    const isActuallyNotFound = !isStillLoading && notFound && !art

    if (art && typeof art === "object") {
      return {
        ...art,
        article: art,
        loading: false,
        notFound: false,
        reload,
      }
    }

    return {
      article: null,
      loading: isStillLoading,
      notFound: isActuallyNotFound,
      reload,
    }
  }, [live, cleanId, id, initialMatches, loading, notFound, reload])
}
