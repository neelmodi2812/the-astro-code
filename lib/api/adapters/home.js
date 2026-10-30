import { toLocalDigits } from "./shop"

const DEFAULT_TAG_CLASS = "bg-[#fdc72d] text-[#0e3934]"
const SOCIAL_COLORS = {
  facebook: { platform: "Facebook", color: "text-[#1877F2]" },
  x: { platform: "X", color: "text-foreground" },
  youtube: { platform: "YouTube", color: "text-[#FF0000]" },
}

export function formatDate(iso, lang) {
  if (!iso) return ""
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  const formatted = date.toLocaleDateString(lang === "gu" ? "gu-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  return toLocalDigits(formatted, lang)
}

export function timeAgo(iso, lang) {
  if (!iso) return ""
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""

  const diffMs = Date.now() - date.getTime()
  if (diffMs < 60000) {
    return lang === "gu" ? "હમણાં જ" : "Just now"
  }

  const minutes = Math.round(diffMs / 60000)
  if (minutes < 60) {
    return lang === "gu"
      ? `${toLocalDigits(minutes, "gu")} મિનિટ પહેલા`
      : `${minutes} mins ago`
  }

  const hours = Math.round(minutes / 60)
  if (hours < 24) {
    return lang === "gu"
      ? `${toLocalDigits(hours, "gu")} કલાક પહેલા`
      : `${hours} hours ago`
  }

  const days = Math.round(hours / 24)
  if (days === 1) {
    return lang === "gu" ? "ગઈકાલે" : "Yesterday"
  }
  if (days < 7) {
    return lang === "gu"
      ? `${toLocalDigits(days, "gu")} દિવસ પહેલા`
      : `${days} days ago`
  }

  // Beyond 7 days: format as proper localized calendar date instead of awkward "566 days ago"
  return formatDate(iso, lang)
}

const SACRED_IMAGE_MAP = {
  "hero-1": "/images/bahucharaji-temple.jpg",
  "hero-2": "/images/bahucharaji-temple.jpg",
  "hero-3": "/images/bahucharaji-temple.jpg",
  "hero-4": "/images/bahucharaji-temple.jpg",
  "hero-1-bahuchar-maa-pragatya": "/images/bahucharaji-temple.jpg",
  "hero-2-chunval-bahucharaji-parcha": "/images/bahucharaji-temple.jpg",
  "hero-3-varkhadi-vruksh-rahasya": "/images/bahucharaji-temple.jpg",
  "hero-4-ladu-no-gokh-mahatmya": "/images/bahucharaji-temple.jpg",
  "anand-no-garbo-pragatya": "/images/bahucharaji-temple.jpg",
  "tara-sat-thi-bhakto-nu-mahatva": "/images/bahucharaji-temple.jpg",
  "somnath-mahadev-pratham-jyotirling": "/images/somnath-mahadev-temple.jpg",
  "mahakaleshwar-bhasma-aarti-rahasya": "/images/mahakaleshwar-temple.jpg",
  "dwarkadhish-jagat-mandir-dhwaja-poojan": "/images/somnath-mahadev-temple.jpg",
  "kaal-sarp-pitrudosh-saral-vedic-upay": "/images/vedic-3d-mandala.jpg",
  "moolank-bhagyank-karkirdi-dhanlabh": "/images/sacred-vedic-hero.jpg",
}

function resolveArticleImage(slug, originalImage) {
  // Admin-uploaded images win. The seeded Unsplash placeholders are random stock photos (bedrooms, bags…)
  // unrelated to the article, so they are skipped in favour of the bundled temple photos.
  if (originalImage && !originalImage.includes("unsplash.com")) return originalImage
  if (SACRED_IMAGE_MAP[slug]) return SACRED_IMAGE_MAP[slug]
  const s = String(slug || "").toLowerCase()
  if (s.includes("somnath") || s.includes("jyotirling")) return "/images/somnath-mahadev-temple.jpg"
  if (s.includes("mahakal")) return "/images/mahakaleshwar-temple.jpg"
  if (s.includes("dwarka")) return "/images/somnath-mahadev-temple.jpg"
  if (s.includes("bahuchar")) return "/images/bahucharaji-temple.jpg"
  if (s.includes("garbo") || s.includes("tara-sat")) return "/images/bahucharaji-temple.jpg"
  if (s.includes("kaal-sarp") || s.includes("kundli")) return "/images/vedic-3d-mandala.jpg"
  if (s.includes("moolank") || s.includes("numerology")) return "/images/sacred-vedic-hero.jpg"
  return "/images/bahucharaji-temple.jpg"
}

function resolveProductImage(slug, originalImage) {
  if (originalImage && !originalImage.includes("unsplash.com")) return originalImage
  const s = String(slug || "").toLowerCase()
  if (s.includes("rudraksha") || s.includes("mala") || s.includes("mukhi")) return "/images/silver-capped-rudraksha-mala.jpg"
  if (s.includes("yantra") || s.includes("mahalakshmi") || s.includes("meru")) return "/images/vedic-3d-mandala.jpg"
  if (s.includes("gemstone") || s.includes("ruby") || s.includes("ratna")) return "/images/rudraksha-lab-certificate-sample.jpg"
  return "/images/silver-capped-rudraksha-mala.jpg"
}

const articleBase = (a, lang) => {
  const isEn = lang === "en"
  const tag = isEn
    ? (a.tag_en || a.tag || a.category?.name_en || a.category?.name || "")
    : (a.tag_gu || a.tag || a.category?.name_gu || a.category?.name || "")
  const title = isEn ? (a.title_en || a.title) : (a.title_gu || a.title)
  return {
    id: a.slug,
    tag,
    title,
    author: a.author_name || (isEn ? "Dr. Vishal Modi" : "ડૉ. વિશાલ મોદી"),
    date: formatDate(a.published_at, lang),
    image: resolveArticleImage(a.slug, a.image),
    imageAlt: a.image_alt || title,
  }
}

export const adaptHeroStory = articleBase

export const adaptFeaturedArticle = (a, lang) => {
  const isEn = lang === "en"
  return {
    ...articleBase(a, lang),
    tagColor: DEFAULT_TAG_CLASS,
    description: isEn ? (a.subtitle_en || a.subtitle || "") : (a.subtitle_gu || a.subtitle || ""),
    readTime: toLocalDigits(a.read_time, lang),
  }
}

export const adaptJyotirlinga = (a, lang) => {
  const isEn = lang === "en"
  return {
    id: a.slug,
    title: isEn ? (a.tag_en || a.tag || a.title) : (a.tag_gu || a.tag || a.title),
    heading: isEn ? (a.title_en || a.title) : (a.title_gu || a.title),
    summary: isEn ? (a.subtitle_en || a.subtitle || "") : (a.subtitle_gu || a.subtitle || ""),
    image: resolveArticleImage(a.slug, a.image),
  }
}

export const adaptInsight = (a, lang) => {
  const isEn = lang === "en"
  const tag = isEn
    ? (a.tag_en || a.tag || a.category?.name_en || a.category?.name || "")
    : (a.tag_gu || a.tag || a.category?.name_gu || a.category?.name || "")
  const title = isEn ? (a.title_en || a.title) : (a.title_gu || a.title)
  const summary = isEn ? (a.subtitle_en || a.subtitle || "") : (a.subtitle_gu || a.subtitle || "")
  return {
    id: a.slug,
    tag,
    timeAgo: timeAgo(a.published_at, lang),
    title,
    summary,
    image: resolveArticleImage(a.slug, a.image),
  }
}

export const adaptPopular = (a, index, lang) => {
  const isEn = lang === "en"
  const views = Number(a.views_count) || 0
  return {
    id: a.slug,
    rank: toLocalDigits(String(index + 1), lang),
    title: isEn ? (a.title_en || a.title) : (a.title_gu || a.title),
    reads:
      lang === "gu"
        ? `${toLocalDigits(views.toLocaleString("en-IN"), "gu")} વાંચન`
        : `${views.toLocaleString("en-IN")} reads`,
  }
}

export const adaptStoreProduct = (p, lang) => {
  const isEn = lang === "en"
  const priceVal = Number(p.price) || 0
  const origPriceVal = Number(p.original_price) || 0
  const priceStr = `₹ ${priceVal.toLocaleString("en-IN")}`
  const origPriceStr = origPriceVal ? `₹ ${origPriceVal.toLocaleString("en-IN")}` : ""

  return {
    id: p.slug,
    name: isEn ? (p.name_en || p.name) : (p.name_gu || p.name),
    subtitle: isEn ? (p.subtitle_en || p.subtitle || "") : (p.subtitle_gu || p.subtitle || ""),
    badge: isEn ? (p.badge_en || p.badge || "") : (p.badge_gu || p.badge || ""),
    discount: p.discount_percent ? `-${toLocalDigits(p.discount_percent, lang)}%` : "",
    rating: toLocalDigits(Number(p.rating || 5).toFixed(1), lang),
    reviewCount: `(${toLocalDigits(p.reviews_count || 0, lang)})`,
    price: toLocalDigits(priceStr, lang),
    originalPrice: origPriceStr ? toLocalDigits(origPriceStr, lang) : "",
    image: resolveProductImage(p.slug, p.image),
    imageAlt: isEn ? (p.name_en || p.name) : (p.name_gu || p.name),
  }
}

const pick = (obj, key, lang) => obj?.[`${key}_${lang}`] ?? obj?.[`${key}_gu`]

function adaptPanchangWidget(base, panchang) {
  let cleanMuhurta = panchang.active_choghadiya || base.activeMuhurta || ""
  if (cleanMuhurta.includes("(")) {
    cleanMuhurta = cleanMuhurta.split("(")[0].trim()
  }

  return {
    ...base,
    samvatTitle: panchang.samvat || base.samvatTitle,
    activeMuhurta: cleanMuhurta || base.activeMuhurta,
    fullChoghadiya: panchang.active_choghadiya || base.activeMuhurta,
    rows: base.rows.map((row, index) => {
      const live = [panchang.tithi, panchang.nakshatra, panchang.rahu_kaal, panchang.abhijit_muhurta][index]
      return live ? { ...row, value: live } : row
    }),
  }
}

/**
 * Overlay the live /home/feed on the bundled landing copy (see lib/config/site.js).
 * Each section is replaced only when the backend returned content for it, so a half-empty
 * database never blanks the home page.
 */
export function mergeHomeFeed(base, feed, lang) {
  const merged = { ...base }
  const nonEmpty = (list) => Array.isArray(list) && list.length > 0

  if (nonEmpty(feed.hero_stories)) merged.heroStories = feed.hero_stories.map((a) => adaptHeroStory(a, lang))
  if (nonEmpty(feed.featured_articles)) {
    merged.featuredArticles = feed.featured_articles.map((a) => adaptFeaturedArticle(a, lang))
  }
  if (nonEmpty(feed.devotional_special)) merged.jyotirlingas = feed.devotional_special.map((a) => adaptJyotirlinga(a, lang))
  if (nonEmpty(feed.latest_articles)) merged.astroInsights = feed.latest_articles.map((a) => adaptInsight(a, lang))
  if (nonEmpty(feed.most_popular)) merged.popular = feed.most_popular.map((a, i) => adaptPopular(a, i, lang))
  if (nonEmpty(feed.categories)) {
    merged.categories = feed.categories.map((c) => ({
      id: c.slug,
      label: lang === "en" ? (c.name_en || c.name) : (c.name_gu || c.name),
    }))

    merged.navLinks = [
      { id: "home", label: lang === "gu" ? "હોમ" : "Home", href: "/", hasSubmenu: false, active: true },
      ...feed.categories.map((c) => ({
        id: c.slug,
        label: lang === "en" ? (c.name_en || c.name) : (c.name_gu || c.name),
        href: "/categories",
        hasSubmenu: true,
        dynamic: true,
      })),
      { id: "dainik-panchang", label: lang === "gu" ? "દૈનિક પંચાંગ" : "Dainik Panchang", href: "/dainik-panchang", hasSubmenu: false },
      { id: "myshop", label: lang === "gu" ? "MyShop સ્ટોર" : "MyShop Store", href: "/myshop", hasSubmenu: false },
      { id: "more", label: lang === "gu" ? "વધુ" : "More", href: "/categories", hasSubmenu: true },
    ]
  }
  if (nonEmpty(feed.spiritual_store)) merged.products = feed.spiritual_store.map((p) => adaptStoreProduct(p, lang))

  if (feed.founder) {
    const rawImage = feed.founder.image
    const validFounderImage = rawImage && !rawImage.includes("unsplash.com") ? rawImage : "/images/author-dr-vishal-modi.jpg"

    merged.config = {
      ...base.config,
      founder: {
        ...base.config.founder,
        name: feed.founder.name ?? base.config.founder.name,
        title: pick(feed.founder, "title", lang) ?? base.config.founder.title,
        description: pick(feed.founder, "description", lang) ?? base.config.founder.description,
        image: validFounderImage,
        phone: (feed.founder.phone && !feed.founder.phone.includes("000000")) ? feed.founder.phone : base.config.founder.phone,
        whatsappUrl: (feed.founder.whatsapp_url && !feed.founder.whatsapp_url.includes("000000")) ? feed.founder.whatsapp_url : base.config.founder.whatsappUrl,
        location: pick(feed.founder, "location", lang) ?? base.config.founder.location,
      },
    }
  }

  if (feed.social_stats) {
    merged.social = Object.entries(feed.social_stats)
      .filter(([key]) => SOCIAL_COLORS[key])
      .map(([key, stat]) => ({ ...SOCIAL_COLORS[key], count: stat.count, label: stat.label }))
  }

  if (feed.top_bar) {
    merged.topBar = {
      ...base.topBar,
      samvat: pick(feed.top_bar, "samvat", lang) ?? base.topBar.samvat,
      sunTimings: pick(feed.top_bar, "sun_timings", lang) ?? base.topBar.sunTimings,
      shubhMuhurtaTitle: pick(feed.top_bar, "shubh_muhurta_title", lang) ?? base.topBar.shubhMuhurtaTitle,
      shubhMuhurta: feed.top_bar.shubh_muhurta_time ?? base.topBar.shubhMuhurta,
      bookConsultation: pick(feed.top_bar, "consultation_cta", lang) ?? base.topBar.bookConsultation,
    }
  }

  if (feed.ticker) {
    merged.ticker = {
      ...base.ticker,
      badge: feed.ticker.badge || base.ticker.badge,
      headline: feed.ticker.headline || base.ticker.headline,
      ...(feed.panchang?.active_choghadiya ? { currentChoghadiya: feed.panchang.active_choghadiya } : {}),
      ...(feed.panchang?.sunset ? { sunset: feed.panchang.sunset } : {}),
    }
  }

  if (feed.panchang) merged.panchang = adaptPanchangWidget(base.panchang, feed.panchang)

  return merged
}
