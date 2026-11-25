"use client"

import * as React from "react"
import { fetchCategoryArticles } from "../services/category-articles"
import { contentService } from "../services/content"

const CACHE_TTL_MS = 5 * 60_000
const SUBMENU_SIZE = 6
const JYOTIRLING_SLUG = "jyotirling"
const JYOTIRLING_COUNT = 12
const cache = new Map()

const FIXED_IDS = ["home", "dainik-panchang", "myshop", "more"]

const asList = (res) => (Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [])

/** One categories + per-category article request per language per 5 minutes, shared by every header. */
export function loadNavMenu(lang) {
  const hit = cache.get(lang)
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.promise

  const promise = contentService.articles.categories(lang, { token: null }).then(async (res) => {
    const categories = asList(res)
    const sections = []
    for (let offset = 0; offset < categories.length; offset += 2) {
      const batch = await Promise.all(categories.slice(offset, offset + 2).map(async (category) => {
        const slug = category.slug === "jyotirlinga" ? JYOTIRLING_SLUG : category.slug
        const size = slug === JYOTIRLING_SLUG ? JYOTIRLING_COUNT : SUBMENU_SIZE
        const articles = await fetchCategoryArticles(slug, lang, { size }).catch(() => null)
        return { category: { ...category, slug }, articles }
      }))
      sections.push(...batch)
    }
    return sections
  })

  cache.set(lang, { at: Date.now(), promise })
  promise.then(
    (sections) => {
      if (cache.get(lang)?.promise === promise && sections.some(({ articles }) => articles === null)) {
        cache.delete(lang)
      }
    },
    () => {
      if (cache.get(lang)?.promise === promise) cache.delete(lang)
    },
  )
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
        if (!cancelled) setLive({ lang, sections: [] })
      })
    return () => {
      cancelled = true
    }
  }, [lang])

  return React.useMemo(() => {
    const loading = live?.lang !== lang
    if (loading || live.sections.length === 0) return { navLinks, submenus: {}, loading }

    const submenus = {}
    const dynamicItems = live.sections.map(({ category, articles }) => {
      const items = (articles || []).map((a) => ({
        label: { gu: a.title_gu || a.title, en: a.title_en || a.title },
        href: `/article/${a.slug || a.id}`,
      }))
      if (items.length > 0) {
        submenus[category.slug] = items
      }
      const catLabel = lang === "en" ? (category.name_en || category.name) : (category.name_gu || category.name)
      return {
        id: category.slug,
        label: catLabel,
        href: `/category/${category.slug === "jyotirlinga" ? "jyotirling" : category.slug}`,
        hasSubmenu: items.length > 0,
        dynamic: true,
      }
    })

    const homeItem = navLinks.find((item) => item.id === "home") || {
      id: "home",
      label: lang === "gu" ? "હોમ" : "Home",
      href: "/",
      hasSubmenu: false,
    }
    const panchangItem = navLinks.find((item) => item.id === "dainik-panchang") || {
      id: "dainik-panchang",
      label: lang === "gu" ? "દૈનિક પંચાંગ" : "Dainik Panchang",
      href: "/dainik-panchang",
      hasSubmenu: false,
    }
    const shopItem = navLinks.find((item) => item.id === "myshop") || {
      id: "myshop",
      label: lang === "gu" ? "MyShop સ્ટોર" : "MyShop Store",
      href: "/myshop",
      hasSubmenu: false,
    }
    const moreItem = navLinks.find((item) => item.id === "more") || {
      id: "more",
      label: lang === "gu" ? "વધુ" : "More",
      href: "/categories",
      hasSubmenu: true,
    }

    const PREFERRED_ORDER = [
      "jyotishshastra",
      "dharmik",
      "jyotirling",
      "bahuchar-maa-nu-rajwadu",
      "navdurga",
      "ankashastra",
      "preranatmak",
    ]

    const sortedDynamicItems = [...dynamicItems].sort((a, b) => {
      const idxA = PREFERRED_ORDER.indexOf(a.id)
      const idxB = PREFERRED_ORDER.indexOf(b.id)
      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1
      return 0
    })

    // Keep top 3 dynamic categories in top navigation bar so they fit without horizontal scroll
    const MAX_VISIBLE_DYNAMIC = 3
    const visibleDynamicItems = sortedDynamicItems.slice(0, MAX_VISIBLE_DYNAMIC)
    const overflowDynamicItems = sortedDynamicItems.slice(MAX_VISIBLE_DYNAMIC)

    // Build the "More" submenu combining the overflow categories + site directories
    const overflowSubItems = overflowDynamicItems.map((cat) => ({
      label: { gu: cat.label, en: cat.label },
      href: cat.href,
      isCategory: true,
    }))

    const defaultMoreItems = [
      { label: { gu: "તમામ વિષય સંગ્રહ", en: "All Categories Directory" }, href: "/categories" },
      { label: { gu: "અમારા વિશે અને પરિચય", en: "About Us & History" }, href: "/about-us" },
      { label: { gu: "સંપર્ક કરો અને મુલાકાત સરનામું", en: "Contact Us & Office Location" }, href: "/contact-us" },
    ]

    submenus["more"] = [...overflowSubItems, ...defaultMoreItems]

    const seenIds = new Set()
    const finalNav = [
      homeItem,
      panchangItem,
      ...visibleDynamicItems,
      shopItem,
      moreItem,
    ].filter((item) => {
      if (!item || !item.id || seenIds.has(item.id)) return false
      seenIds.add(item.id)
      return true
    })

    return { navLinks: finalNav, submenus, loading }
  }, [live, lang, navLinks])
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
        if (!cancelled) setState({ lang, sections: sections.map((section) => ({ ...section, articles: section.articles || [] })) })
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
