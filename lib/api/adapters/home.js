import { toLocalDigits } from "./shop"

const DEFAULT_TAG_CLASS = "bg-[#fdc72d] text-[#1b1c1a]"
const SOCIAL_COLORS = {
  facebook: { platform: "Facebook", color: "text-[#1877F2]" },
  x: { platform: "X", color: "text-foreground" },
  youtube: { platform: "YouTube", color: "text-[#FF0000]" },
}

export function formatDate(iso, lang) {
  if (!iso) return ""
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString(lang === "gu" ? "gu-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function timeAgo(iso, lang) {
  if (!iso) return ""
  const minutes = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  const [value, en, gu] =
    minutes < 60
      ? [minutes, "mins ago", "મિનિટ પહેલા"]
      : minutes < 60 * 24
        ? [Math.round(minutes / 60), "hours ago", "કલાક પહેલા"]
        : [Math.round(minutes / (60 * 24)), "days ago", "દિવસ પહેલા"]

  return lang === "gu" ? `${toLocalDigits(value, "gu")} ${gu}` : `${value} ${en}`
}

const articleBase = (a, lang) => ({
  id: a.slug,
  tag: a.tag || a.category?.name || "",
  title: a.title,
  author: a.author_name,
  date: formatDate(a.published_at, lang),
  image: a.image,
  imageAlt: a.image_alt || a.title,
})

export const adaptHeroStory = articleBase

export const adaptFeaturedArticle = (a, lang) => ({
  ...articleBase(a, lang),
  tagColor: DEFAULT_TAG_CLASS,
  description: a.subtitle || "",
  readTime: a.read_time,
})

export const adaptJyotirlinga = (a) => ({
  id: a.slug,
  title: a.tag || a.title,
  heading: a.title,
  summary: a.subtitle || "",
  image: a.image,
})

export const adaptInsight = (a, lang) => ({
  id: a.slug,
  tag: a.tag || a.category?.name || "",
  timeAgo: timeAgo(a.published_at, lang),
  title: a.title,
  summary: a.subtitle || "",
  image: a.image,
})

export const adaptPopular = (a, index, lang) => ({
  id: a.slug,
  rank: String(index + 1),
  title: a.title,
  reads:
    lang === "gu"
      ? `${toLocalDigits(Number(a.views_count).toLocaleString("en-IN"), "gu")} વાંચન`
      : `${Number(a.views_count).toLocaleString("en-IN")} reads`,
})

export const adaptStoreProduct = (p) => ({
  id: p.slug,
  name: p.name,
  subtitle: p.subtitle || "",
  badge: p.badge || "",
  discount: p.discount_percent ? `-${p.discount_percent}%` : "",
  rating: Number(p.rating).toFixed(1),
  reviewCount: `(${p.reviews_count})`,
  price: `₹ ${Number(p.price).toLocaleString("en-IN")}`,
  originalPrice: p.original_price ? `₹ ${Number(p.original_price).toLocaleString("en-IN")}` : "",
  image: p.image,
  imageAlt: p.name,
})

const pick = (obj, key, lang) => obj?.[`${key}_${lang}`] ?? obj?.[`${key}_gu`]

function adaptPanchangWidget(base, panchang) {
  return {
    ...base,
    samvatTitle: panchang.samvat || base.samvatTitle,
    activeMuhurta: panchang.active_choghadiya || base.activeMuhurta,
    rows: base.rows.map((row, index) => {
      const live = [panchang.tithi, panchang.nakshatra, panchang.rahu_kaal, panchang.abhijit_muhurta][index]
      return live ? { ...row, value: live } : row
    }),
  }
}

/**
 * Overlay the live /home/feed on the bundled landing copy (see lib/data/astro-data.js).
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
  if (nonEmpty(feed.devotional_special)) merged.jyotirlingas = feed.devotional_special.map(adaptJyotirlinga)
  if (nonEmpty(feed.latest_articles)) merged.astroInsights = feed.latest_articles.map((a) => adaptInsight(a, lang))
  if (nonEmpty(feed.most_popular)) merged.popular = feed.most_popular.map((a, i) => adaptPopular(a, i, lang))
  if (nonEmpty(feed.categories)) merged.categories = feed.categories.map((c) => ({ id: c.slug, label: c.name }))
  if (nonEmpty(feed.spiritual_store)) merged.products = feed.spiritual_store.map(adaptStoreProduct)

  if (feed.founder) {
    merged.config = {
      ...base.config,
      founder: {
        ...base.config.founder,
        name: feed.founder.name ?? base.config.founder.name,
        title: pick(feed.founder, "title", lang) ?? base.config.founder.title,
        description: pick(feed.founder, "description", lang) ?? base.config.founder.description,
        image: feed.founder.image ?? base.config.founder.image,
        phone: feed.founder.phone ?? base.config.founder.phone,
        whatsappUrl: feed.founder.whatsapp_url ?? base.config.founder.whatsappUrl,
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
