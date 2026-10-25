"use client"

import * as React from "react"
import { contentService } from "../services/content"

const CACHE_TTL_MS = 5 * 60_000
const SUBMENU_SIZE = 6
const cache = new Map()

const FIXED_IDS = ["home", "dainik-panchang", "myshop", "more"]

const asList = (res) => (Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [])

/** One categories + per-category article request per language per 5 minutes, shared by every header. */
export function loadNavMenu(lang) {
  const hit = cache.get(lang)
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.promise

  const promise = contentService.articles.categories(lang, { token: null }).then(async (res) => {
    const categories = asList(res)
    return Promise.all(
      categories.map(async (category) => {
        const articles = await contentService.articles
          .list({ category: category.slug, per_page: SUBMENU_SIZE }, lang, { token: null })
          .then(asList)
          .catch(() => [])
        return { category, articles }
      })
    )
  })

  cache.set(lang, { at: Date.now(), promise })
  promise.catch(() => cache.delete(lang))
  return promise
}

/**
 * Header menu built from the admin's article categories and their latest articles.
 * Items in `fixedIds` (home, panchang, shop, "more"...) keep their static entry; the
 * static content categories are swapped for the live ones, placed right after "home".
 * Returns the static `navLinks` untouched until the API answers, or if it fails.
 */
export function useNavMenu(lang, navLinks, fixedIds = FIXED_IDS) {
  const [live, setLive] = React.useState(null)

  React.useEffect(() => {
    let cancelled = false
    loadNavMenu(lang)
      .then((sections) => {
        if (!cancelled) setLive({ lang, sections })
      })
      .catch(() => {
        /* keep static menu */
      })
    return () => {
      cancelled = true
    }
  }, [lang])

  return React.useMemo(() => {
    if (!live || live.lang !== lang || live.sections.length === 0) return { navLinks, submenus: {} }

    const submenus = {}
    // A category with a single article has nothing to list in a dropdown, so it gets no pill.
    const dynamicItems = live.sections.filter(({ articles }) => articles.length > 1).map(({ category, articles }) => {
      const items = articles.map((a) => ({
        label: { gu: a.title_gu || a.title, en: a.title_en || a.title },
        href: `/article/${a.slug || a.id}`,
      }))
      submenus[category.slug] = items
      return {
        id: category.slug,
        label: category.name,
        href: items[0]?.href ?? "/categories",
        hasSubmenu: true,
        dynamic: true,
      }
    })

    const fixed = navLinks.filter((item) => fixedIds.includes(item.id))
    const home = fixed.filter((item) => item.id === "home")
    const rest = fixed.filter((item) => item.id !== "home")
    return { navLinks: [...home, ...dynamicItems, ...rest], submenus }
  }, [live, lang, navLinks, fixedIds])
}

/**
 * Every active article category with its latest articles, for the /categories directory.
 * `null` until the API answers (or if it fails), so the page can show its loading / fallback state.
 */
export function useCategorySections(lang) {
  const [state, setState] = React.useState({ lang: null, sections: null })

  React.useEffect(() => {
    let cancelled = false
    loadNavMenu(lang)
      .then((sections) => {
        if (!cancelled) setState({ lang, sections })
      })
      .catch(() => {
        if (!cancelled) setState({ lang, sections: [] })
      })
    return () => {
      cancelled = true
    }
  }, [lang])

  return state.lang === lang ? state.sections : null
}
