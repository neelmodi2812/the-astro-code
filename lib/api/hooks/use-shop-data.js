"use client"

import * as React from "react"
import { getShopData } from "@/lib/data/shop-data"
import { shopService } from "../services/shop"
import { adaptListProduct, mergeShopData } from "../adapters/shop"

const PAGE_SIZE = 50
const CACHE_TTL_MS = 60_000
const cache = new Map()

async function fetchAllProducts(lang) {
  const first = await shopService.products({ per_page: PAGE_SIZE, page: 1 }, lang, { token: null })
  const lastPage = first.meta?.last_page ?? 1
  const rest = await Promise.all(
    Array.from({ length: Math.max(0, lastPage - 1) }, (_, i) =>
      shopService.products({ per_page: PAGE_SIZE, page: i + 2 }, lang, { token: null })
    )
  )
  return [first, ...rest].flatMap((page) => page.data || [])
}

/** One catalog fetch per language per minute, shared by every shop page and component. */
export function loadLiveCatalog(lang) {
  const hit = cache.get(lang)
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.promise

  const promise = Promise.allSettled([
    fetchAllProducts(lang),
    shopService.categories(lang, { token: null }),
    shopService.featuredProducts(lang, { token: null }),
  ]).then(([productsRes, categoriesRes, featuredRes]) => {
    if (productsRes.status === "rejected") {
      throw productsRes.reason || new Error("Failed to load products")
    }

    const rawProducts = Array.isArray(productsRes.value) ? productsRes.value : []
    const categories = categoriesRes.status === "fulfilled" ? (categoriesRes.value?.data || []) : []
    const featured = featuredRes.status === "fulfilled" ? (featuredRes.value?.data?.[0] || null) : null

    return {
      products: rawProducts.map((p) => adaptListProduct(p, lang)),
      categories,
      featured,
    }
  })

  cache.set(lang, { at: Date.now(), promise })
  promise.catch(() => cache.delete(lang))
  return promise
}

/**
 * Shop page copy with the catalog loaded purely from live API data.
 * NEVER renders the static mock catalog, ensuring live accuracy and clear empty/loading states.
 */
export function useShopData(lang) {
  const base = React.useMemo(() => getShopData(lang), [lang])
  const [live, setLive] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const reload = React.useCallback(() => {
    cache.delete(lang)
    setLoading(true)
    setError(null)
    loadLiveCatalog(lang)
      .then((data) => {
        setLive({ lang, ...data })
      })
      .catch((err) => {
        setError(err?.message || "Failed to load catalog")
        setLive({ lang, products: [], categories: [], featured: null })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [lang])

  React.useEffect(() => {
    let cancelled = false

    loadLiveCatalog(lang)
      .then((data) => {
        if (!cancelled) {
          setLive({ lang, ...data })
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || "Failed to load catalog")
          setLive({ lang, products: [], categories: [], featured: null })
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
  }, [lang])

  return React.useMemo(() => {
    if (live && live.lang === lang) {
      const merged = mergeShopData(base, live, lang)
      return {
        ...merged,
        loading,
        error,
        reload,
      }
    }

    // While loading or before live data arrives:
    // Strip out base.products and mock featuredProduct so fallback items NEVER show!
    return {
      ...base,
      products: [],
      featuredProduct: null,
      quickCategories: [],
      sidebar: {
        ...base.sidebar,
        categories: base.sidebar.categories.filter((c) => c.id === "all").map((c) => ({ ...c, count: 0 })),
      },
      loading,
      error,
      reload,
    }
  }, [base, live, lang, loading, error, reload])
}

/** Live category list (slug, products_count) for category pages; null until loaded. */
export function useLiveCategories(lang) {
  const [state, setState] = React.useState({ lang: null, categories: null })

  React.useEffect(() => {
    let cancelled = false
    loadLiveCatalog(lang)
      .then((data) => {
        if (!cancelled) setState({ lang, categories: data.categories })
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [lang])

  return state.lang === lang ? state.categories : null
}
