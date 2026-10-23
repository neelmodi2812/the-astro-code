"use client"

import * as React from "react"
import { getAstroData } from "@/lib/data/astro-data"
import { contentService } from "../services/content"
import { mergeHomeFeed } from "../adapters/home"

const CACHE_TTL_MS = 60_000
const cache = new Map()

/** One /home/feed request per language per minute, shared by every consumer. */
export function loadHomeFeed(lang) {
  const hit = cache.get(lang)
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.promise

  const promise = contentService.home.feed(lang, { token: null }).then((res) => res.data)
  cache.set(lang, { at: Date.now(), promise })
  promise.catch(() => cache.delete(lang))
  return promise
}

/**
 * Landing-page data: bundled bilingual copy with the live feed layered on top.
 * The static data renders first and stays in place if the API is unreachable.
 */
export function useHomeData(lang) {
  const base = React.useMemo(() => getAstroData(lang), [lang])
  const [live, setLive] = React.useState(null)

  React.useEffect(() => {
    let cancelled = false
    loadHomeFeed(lang)
      .then((feed) => {
        if (!cancelled) setLive({ lang, feed })
      })
      .catch(() => {
        /* keep static fallback */
      })
    return () => {
      cancelled = true
    }
  }, [lang])

  return React.useMemo(
    () => (live && live.lang === lang ? mergeHomeFeed(base, live.feed, lang) : base),
    [base, live, lang]
  )
}
