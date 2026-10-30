"use client"

import * as React from "react"
import { getProductById, getRelatedProducts } from "@/lib/data/product-data"
import { shopService } from "../services/shop"
import { adaptListProduct, adaptProductDetail } from "../adapters/shop"

/**
 * Product + related items for the detail page.
 *
 * Order of preference: live API for the current language → server-provided live bundle (rendered in Gujarati)
 * → bundled static catalog. A 404/network failure simply keeps the best data already on screen.
 */
export function useProduct(slug, lang, initialBundle) {
  const [live, setLive] = React.useState(null)
  const [loading, setLoading] = React.useState(!initialBundle?.product)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    shopService
      .productDetail(slug, lang, { token: null })
      .then((res) => {
        if (cancelled) return
        setLive({
          key: `${slug}:${lang}`,
          product: adaptProductDetail(res.data, lang),
          related: (res.related_products || []).map((p) => adaptListProduct(p, lang)),
        })
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug, lang])

  return React.useMemo(() => {
    if (live?.key === `${slug}:${lang}`) return { ...live, loading }

    // The server-rendered live bundle beats the bundled sample catalog (stale price, stock, variants).
    if (initialBundle?.product) return { ...initialBundle, loading }

    const staticProduct = getProductById(slug, lang)
    if (staticProduct) {
      return {
        product: staticProduct,
        related: getRelatedProducts(staticProduct.id, staticProduct.category, lang, 4),
        loading,
      }
    }

    return { ...(initialBundle ?? { product: null, related: [] }), loading }
  }, [live, slug, lang, initialBundle, loading])
}
