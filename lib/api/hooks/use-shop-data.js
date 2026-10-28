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
  return [first, ...rest].flatMap((page) => page.data)
}

/** One catalog fetch per language per minute, shared by every shop page and component. */
export function loadLiveCatalog(lang) {
  const hit = cache.get(lang)
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.promise

  const promise = Promise.all([
    fetchAllProducts(lang),
    shopService.categories(lang, { token: null }),
    shopService.featuredProducts(lang, { token: null }),
  ]).then(([products, categories, featured]) => ({
    products: products.map((p) => adaptListProduct(p, lang)),
    categories: categories.data,
    featured: featured.data[0] ?? null,
  }))

  cache.set(lang, { at: Date.now(), promise })
  promise.catch(() => cache.delete(lang))
  return promise
}

/**
 * Shop page copy (static, bilingual) with the catalog replaced by live API data.
 * Renders the static catalog first and while the API is unreachable, so the page never breaks.
 */
export function useShopData(lang) {
  const base = React.useMemo(() => getShopData(lang), [lang])
  const [live, setLive] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    loadLiveCatalog(lang)
      .then((data) => {
        if (!cancelled) setLive({ lang, ...data })
      })
      .catch(() => {
        /* keep static fallback */
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [lang])

  return React.useMemo(
    () => {
      const data = live && live.lang === lang ? mergeShopData(base, live, lang) : base
      return { ...data, loading }
    },
    [base, live, lang, loading]
  )
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
