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

  const [result, setResult] = React.useState(null)
  const [version, setVersion] = React.useState(0)

  const reload = React.useCallback(() => {
    setVersion((value) => value + 1)
  }, [])

  React.useEffect(() => {
    if (!cleanId) return

    const controller = new AbortController()
    const token = tokenStore.get()
    contentService.articles
      .detail(cleanId, "gu", { token: token || null, signal: controller.signal })
      .then((response) => {
        if (controller.signal.aborted) return
        if (!response?.data) throw new Error("Invalid article response")
        setResult({ id: cleanId, version, article: adaptArticleDetail(response.data) })
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setResult({ id: cleanId, version, notFound: error.status === 404, failed: error.status !== 404 })
        }
      })

    return () => controller.abort()
  }, [cleanId, version])

  const matchingResult = result?.id === cleanId ? result : null
  const currentResult = matchingResult?.version === version ? matchingResult : null
  const article = matchingResult?.article || initialMatches

  if (article) return { ...article, article, loading: false, notFound: false, failed: false, reload }

  return {
    article: null,
    loading: Boolean(cleanId && !currentResult),
    notFound: !cleanId || Boolean(currentResult?.notFound),
    failed: Boolean(currentResult?.failed),
    reload,
  }
}
