"use client"

import * as React from "react"
import { getSiteShell } from "@/lib/config/site"
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
 * Landing-page data: base site shell with the live API feed layered on top.
 * When initialFeed is passed (e.g. from Server Component SSR), it is rendered immediately.
 */
export function useHomeData(lang, initialFeed = null) {
  const base = React.useMemo(() => getSiteShell(lang), [lang])
  const [live, setLive] = React.useState(() => {
    if (initialFeed && (lang === "gu" || !initialFeed.lang || initialFeed.lang === lang)) {
      return { lang, feed: initialFeed }
    }
    return null
  })

  React.useEffect(() => {
    let cancelled = false
    loadHomeFeed(lang)
      .then((feed) => {
        if (!cancelled) setLive({ lang, feed })
      })
      .catch(() => {
        /* keep baseline */
      })
    return () => {
      cancelled = true
    }
  }, [lang])

  return React.useMemo(() => {
    if (live && live.feed && live.lang === lang) {
      return mergeHomeFeed(base, live.feed, lang)
    }
    if (initialFeed && lang === "gu") {
      return mergeHomeFeed(base, initialFeed, lang)
    }
    return base
  }, [base, live, lang, initialFeed])
}
