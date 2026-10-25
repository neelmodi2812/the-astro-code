import { DEFAULT_AUTHOR } from "@/lib/data/article-data"
import { formatDate } from "./home"
import { toLocalDigits } from "./shop"

const both = (value) => ({ gu: value, en: value })

/** Plain text or simple HTML body → paragraph list. */
export function toParagraphs(content) {
  return (content || "")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
}

/**
 * API article → the shape of lib/data/article-data.js used by the article page.
 * The backend stores one body per language, so the first paragraph becomes the lead and the rest a
 * single section. The page's quote / muhurta / ritual / sankalp blocks are left null: the backend has
 * no per-article data for them, and the shared placeholders read as if they belonged to the article.
 */
export function adaptArticleDetail(d) {
  const gu = toParagraphs(d.content_gu)
  const en = toParagraphs(d.content_en)
  const body = Array.from({ length: Math.max(gu.length, en.length) }, (_, i) => ({
    gu: gu[i] ?? en[i] ?? "",
    en: en[i] ?? gu[i] ?? "",
  }))
  const [lead, ...rest] = body
  const views = Number(d.views_count) || 0

  return {
    id: d.slug,
    slug: d.slug,
    publishedAt: d.published_at,
    category: both(d.category?.name ?? ""),
    subBadges: d.tag_gu || d.tag_en ? [{ gu: d.tag_gu || d.tag_en, en: d.tag_en || d.tag_gu }] : [],
    title: { gu: d.title_gu, en: d.title_en },
    subtitle: { gu: d.subtitle_gu ?? "", en: d.subtitle_en ?? "" },
    lead: lead ?? null,
    author: { ...DEFAULT_AUTHOR, name: both(d.author_name || DEFAULT_AUTHOR.name.en) },
    date: { gu: formatDate(d.published_at, "gu"), en: formatDate(d.published_at, "en") },
    readTime: both(d.read_time || ""),
    views: {
      gu: `${toLocalDigits(views.toLocaleString("en-IN"), "gu")} દર્શકો`,
      en: `${views.toLocaleString("en-IN")} views`,
    },
    heroImage: d.image,
    heroImageAlt: d.image_alt || d.title_en,
    heroCaption: both(d.image_alt || ""),
    heroBadge: both(d.tag_en || ""),
    sections: rest.length ? [{ heading: { gu: "વિગતવાર માહિતી", en: "In Detail" }, paragraphs: rest }] : [],
    muhurtaCard: null,
    quote: null,
    rituals: null,
    sankalpPuja: null,
    reactions: { divine: 0, insightful: 0, wonderful: 0 },
    audioText: { gu: gu.join(" "), en: en.join(" ") },
    related: (d.related_articles || []).map((a) => ({
      id: a.slug,
      image: a.image,
      title: { gu: a.title_gu || a.title, en: a.title_en || a.title },
      tag: { gu: a.tag_gu || a.tag || "", en: a.tag_en || a.tag || "" },
      date: { gu: formatDate(a.published_at, "gu"), en: formatDate(a.published_at, "en") },
    })),
  }
}
