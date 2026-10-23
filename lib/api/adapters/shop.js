import { getProductById } from "@/lib/data/product-data"
import { getShopData } from "@/lib/data/shop-data"

// The "benefit / purpose" filter is editorial metadata the backend does not store yet.
const PURPOSE_BY_SLUG = Object.fromEntries(
  getShopData("en").products.filter((p) => p.purpose).map((p) => [p.id, p.purpose])
)

const GU_DIGITS = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"]

export function toLocalDigits(value, lang) {
  const text = String(value)
  return lang === "gu" ? text.replace(/[0-9]/g, (d) => GU_DIGITS[d]) : text
}

function savingsLabel(discountPercent, lang) {
  if (!discountPercent) return ""
  return lang === "gu"
    ? `${toLocalDigits(discountPercent, lang)}% બચત`
    : `${discountPercent}% OFF`
}

/**
 * API list product → the card shape used by the shop pages (see `products` in lib/data/shop-data.js).
 * `id` is the slug so existing routes (/myshop/product/:id) and cart items keep working.
 */
export function adaptListProduct(p, lang) {
  const price = Number(p.price)
  return {
    id: p.slug,
    apiId: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle || "",
    badge: p.badge || "",
    rating: Number(p.rating) || 0,
    reviewsCount: p.reviews_count ?? 0,
    price,
    originalPrice: p.original_price ? Number(p.original_price) : price,
    discountPercent: p.discount_percent ?? 0,
    savings: savingsLabel(p.discount_percent, lang),
    category: p.category?.slug ?? "all",
    purpose: PURPOSE_BY_SLUG[p.slug],
    image: p.image,
    images: p.image ? [p.image] : [],
    stockStatus: p.stock_status,
    details: [p.deity_or_planet, p.origin].filter(Boolean).join(" · "),
  }
}

/**
 * Overlay live catalog data on the static page copy (hero, filters, trust badges …).
 * Only data owned by the admin panel is replaced: products, category counts and the featured card.
 */
export function mergeShopData(base, live, lang) {
  const counts = Object.fromEntries(live.categories.map((c) => [c.slug, c.products_count ?? 0]))
  const total = live.products.length

  const featured = live.featured
  const featuredProduct = featured
    ? {
        ...base.featuredProduct,
        id: featured.slug,
        name: featured.name,
        subtitle: featured.subtitle || base.featuredProduct.subtitle,
        image: featured.image || base.featuredProduct.image,
        price: Number(featured.price),
        originalPrice: featured.original_price ? Number(featured.original_price) : Number(featured.price),
        rating: Number(featured.rating) || base.featuredProduct.rating,
        discount: featured.discount_percent
          ? lang === "gu"
            ? `${toLocalDigits(featured.discount_percent, lang)}% OFF`
            : `${featured.discount_percent}% OFF`
          : base.featuredProduct.discount,
        savingsText: featured.original_price
          ? lang === "gu"
            ? `તમે બચાવો ₹${toLocalDigits(Math.round(featured.original_price - featured.price).toLocaleString("en-IN"), lang)}`
            : `You save ₹${Math.round(featured.original_price - featured.price).toLocaleString("en-IN")}`
          : base.featuredProduct.savingsText,
        category: featured.category?.slug ?? base.featuredProduct.category,
      }
    : base.featuredProduct

  return {
    ...base,
    products: live.products,
    featuredProduct,
    quickCategories: base.quickCategories.map((c) => ({ ...c, count: counts[c.id] ?? 0 })),
    sidebar: {
      ...base.sidebar,
      categories: base.sidebar.categories.map((c) => ({
        ...c,
        count: c.id === "all" ? total : counts[c.id] ?? 0,
      })),
    },
  }
}

/** Category SEO/hero copy stays static; the product count comes from the API. */
export function withLiveCategoryCount(meta, categorySlug, liveCategories) {
  if (!meta) return meta
  const live = liveCategories?.find((c) => c.slug === categorySlug)
  return live ? { ...meta, productCount: live.products_count ?? meta.productCount } : meta
}

/**
 * API product detail → the shape used by the product page (see lib/data/product-data.js).
 * Rich copy the backend does not store (FAQs, reviews) is kept from the static catalog when the slug exists there.
 * Variants are intentionally dropped: the server charges the catalog price, so a variant price could not be honoured.
 */
export function adaptProductDetail(detail, lang) {
  const fallback = getProductById(detail.slug, lang)
  const specs = detail.vedic_specifications || {}
  const price = Number(detail.price)
  const images = detail.images?.length ? detail.images : [detail.primary_image].filter(Boolean)

  return {
    ...(fallback || {}),
    id: detail.slug,
    apiId: detail.id,
    slug: detail.slug,
    sku: detail.sku,
    category: detail.category?.slug ?? fallback?.category ?? "all",
    name: detail.name.current,
    subtitle: detail.subtitle.current || "",
    badge: detail.badge.current || "",
    price,
    originalPrice: detail.original_price ? Number(detail.original_price) : price,
    discountPercent: detail.discount_percent ?? 0,
    stockStatus: detail.stock_status,
    stockCount: detail.stock_count,
    rating: Number(detail.rating) || 0,
    reviewsCount: detail.reviews_count ?? 0,
    image: detail.primary_image,
    images,
    deityOrPlanet: specs.deity_or_planet?.current || fallback?.deityOrPlanet || "",
    beejMantra: specs.beej_mantra?.current || fallback?.beejMantra || "",
    wearingDay: specs.wearing_day?.current || fallback?.wearingDay || "",
    fingerOrPosition: specs.finger_or_position?.current || fallback?.fingerOrPosition || "",
    origin: specs.origin?.current || fallback?.origin || "",
    consecrationProcess: specs.consecration_details?.current || fallback?.consecrationProcess || "",
    authenticityDetails: specs.certificate_info || fallback?.authenticityDetails || "",
    description: detail.description.current || fallback?.description || "",
    benefits: detail.benefits?.length ? detail.benefits : fallback?.benefits || [],
    variants: [],
    faqs: detail.faqs?.length ? detail.faqs : fallback?.faqs || [],
    reviews: detail.reviews?.length ? detail.reviews : fallback?.reviews || [],
  }
}
