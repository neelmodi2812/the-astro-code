"use client"

import * as React from "react"
import { userService } from "../services/user"
import { tokenStore } from "../token-store"

const STORAGE_KEY = "astro_wishlist_items"

function readLocal() {
  try {
    const list = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]")
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

function writeLocal(slugs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs))
  } catch {
    /* storage unavailable: the heart only lasts for this page */
  }
}

/**
 * Wishlist keyed by product slug (the shop's product `id`).
 * Signed-in shoppers use the server wishlist (shared with the app); guests keep a local one in this browser.
 * A product without a server id (static catalog fallback) is also kept locally.
 */
export function useWishlist(lang = "gu") {
  const [slugs, setSlugs] = React.useState([])

  React.useEffect(() => {
    let cancelled = false

    if (!tokenStore.get()) {
      Promise.resolve().then(() => {
        if (!cancelled) setSlugs(readLocal())
      })
      return () => {
        cancelled = true
      }
    }

    userService.wishlist
      .list(lang)
      .then((res) => {
        if (!cancelled) setSlugs((res.data || []).map((product) => product.slug))
      })
      .catch(() => {
        if (!cancelled) setSlugs(readLocal())
      })

    return () => {
      cancelled = true
    }
  }, [lang])

  const isWishlisted = React.useCallback((slug) => slugs.includes(slug), [slugs])

  /** Resolves with the new state (true = now in the wishlist). Throws if the server rejects the change. */
  const toggle = React.useCallback(
    async (product) => {
      const slug = product.id
      const next = !slugs.includes(slug)

      if (tokenStore.get() && product.apiId) {
        await (next ? userService.wishlist.add(product.apiId) : userService.wishlist.remove(product.apiId))
        setSlugs((prev) => (next ? [...prev, slug] : prev.filter((s) => s !== slug)))
        return next
      }

      const updated = next ? [...slugs, slug] : slugs.filter((s) => s !== slug)
      writeLocal(updated)
      setSlugs(updated)
      return next
    },
    [slugs]
  )

  return { isWishlisted, toggle }
}
