"use client"

import * as React from "react"
import { getProductById, getRelatedProducts } from "@/lib/data/product-data"
import { shopService } from "../services/shop"
import { adaptListProduct, adaptProductDetail } from "../adapters/shop"

/**
 * Product + related items for the detail page.
 *
 * Order of preference: live API for the current language → server-provided live bundle (rendered in Gujarati)
 * → null. Never falls back to mock/sample catalog data when missing.
 */
export function useProduct(slug, lang, initialBundle) {
  const currentKey = `${slug}:${lang}`
  const [live, setLive] = React.useState(null)
  const [activeKey, setActiveKey] = React.useState(currentKey)
  const [loading, setLoading] = React.useState(!initialBundle?.product)
  const [notFound, setNotFound] = React.useState(false)

  if (activeKey !== currentKey) {
    setActiveKey(currentKey)
    setLoading(true)
    setNotFound(false)
  }

  React.useEffect(() => {
    let cancelled = false
    shopService
      .productDetail(slug, lang, { token: null })
      .then((res) => {
        if (cancelled) return
        if (res?.data) {
          setLive({
            key: `${slug}:${lang}`,
            product: adaptProductDetail(res.data, lang),
            related: (res.related_products || []).map((p) => adaptListProduct(p, lang)),
          })
          setNotFound(false)
        } else if (!initialBundle?.product) {
          setNotFound(true)
        }
      })
      .catch(() => {
        if (!cancelled && !initialBundle?.product) {
          setNotFound(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug, lang, initialBundle])

  return React.useMemo(() => {
    if (live?.key === `${slug}:${lang}`) return { ...live, loading, notFound }
    if (initialBundle?.product) return { ...initialBundle, loading, notFound }

    return { product: null, related: [], loading, notFound }
  }, [live, slug, lang, initialBundle, loading, notFound])
}
