const GU_DIGITS = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"]

export function toLocalDigits(value, lang) {
  const text = String(value)
  return lang === "gu" ? text.replace(/[0-9]/g, (d) => GU_DIGITS[d]) : text
}

export function pickLocalized(val, lang) {
  if (!val) return ""
  if (typeof val === "string") return val
  if (typeof val === "object") {
    return val[lang] || val.current || val.gu || val.en || ""
  }
  return String(val)
}


export const FALLBACK_IMAGE = "https://dummyjson.com/image/200x100"

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
    purpose: p.purpose || undefined,
    image: p.image || FALLBACK_IMAGE,
    images: (p.images && p.images.length > 0) ? p.images : (p.image ? [p.image] : [FALLBACK_IMAGE]),
    stockStatus: p.stock_status,
    details: [p.deity_or_planet, p.origin].filter(Boolean).join(" · "),
  }
}

/**
 * Overlay live catalog data on the static page copy (hero, filters, trust badges …).
 * Only data owned by the admin panel is replaced: products, category counts and the featured card.
 */
const DEFAULT_CATEGORY_ICON = "Gem"

/** Icon for a live category: the static tile's icon for known slugs, else the admin's icon name, else a gem. */
function iconFor(base, category) {
  const known = base.quickCategories.find((c) => c.id === category.slug)
  return known?.icon || category.icon || DEFAULT_CATEGORY_ICON
}

export function mergeShopData(base, live, lang) {
  const total = live.products.length

  const featured = live.featured
  const featuredProduct = featured
    ? {
        ...base.featuredProduct,
        id: featured.slug,
        name: featured.name,
        subtitle: featured.subtitle || "",
        image: featured.image || FALLBACK_IMAGE,
        price: Number(featured.price),
        originalPrice: featured.original_price ? Number(featured.original_price) : Number(featured.price),
        rating: Number(featured.rating) || 0,
        discount: featured.discount_percent
          ? lang === "gu"
            ? `${toLocalDigits(featured.discount_percent, lang)}% OFF`
            : `${featured.discount_percent}% OFF`
          : "",
        savingsText: Number(featured.original_price) > Number(featured.price)
          ? lang === "gu"
            ? `તમે બચાવો ₹${toLocalDigits(Math.round(featured.original_price - featured.price).toLocaleString("en-IN"), lang)}`
            : `You save ₹${Math.round(featured.original_price - featured.price).toLocaleString("en-IN")}`
          : "",
        category: featured.category?.slug ?? "",
        // Marketing copy written for one specific product must not follow whichever product is featured.
        badge: featured.badge || "",
        originBadge: featured.origin || "",
        reviewsCount: featured.reviews_count
          ? lang === "gu"
            ? `${toLocalDigits(featured.reviews_count, lang)} સમીક્ષાઓ`
            : `${featured.reviews_count} reviews`
          : "",
        usps: [],
      }
    : null

  return {
    ...base,
    products: live.products,
    featuredProduct,
    quickCategories: live.categories.map((c) => ({
      id: c.slug,
      name: c.name,
      subtitle: c.subtitle || "",
      icon: iconFor(base, c),
      count: c.products_count ?? 0,
    })),
    sidebar: {
      ...base.sidebar,
      categories: [
        ...base.sidebar.categories.filter((c) => c.id === "all").map((c) => ({ ...c, count: total })),
        ...live.categories.map((c) => ({ id: c.slug, label: c.name, count: c.products_count ?? 0 })),
      ],
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
 * Variants are intentionally dropped: the server charges the catalog price, so a variant price could not be honoured.
 */
export function adaptProductDetail(detail, lang) {
  const specs = detail.vedic_specifications || {}
  const price = Number(detail.price)
  const rawImages = detail.images?.length ? detail.images : [detail.primary_image].filter(Boolean)
  const images = rawImages.length > 0 ? rawImages : [FALLBACK_IMAGE]
  const mainImage = detail.primary_image || (detail.images && detail.images[0]) || FALLBACK_IMAGE

  const name = pickLocalized(detail.name, lang) || ""
  const subtitle = pickLocalized(detail.subtitle, lang) || ""
  const badge = pickLocalized(detail.badge, lang) || ""
  const description = pickLocalized(detail.description, lang) || ""
  const categoryName = pickLocalized(detail.category?.name, lang) || ""

  return {
    id: detail.slug,
    apiId: detail.id,
    slug: detail.slug,
    sku: detail.sku,
    category: detail.category?.slug ?? "all",
    categoryName,
    name,
    subtitle,
    badge,
    price,
    originalPrice: detail.original_price ? Number(detail.original_price) : price,
    discountPercent: detail.discount_percent ?? 0,
    stockStatus: detail.stock_status,
    stockCount: detail.stock_count,
    rating: Number(detail.rating) || 0,
    reviewsCount: detail.reviews_count ?? 0,
    image: mainImage,
    images,
    deityOrPlanet: pickLocalized(specs.deity_or_planet, lang) || "",
    beejMantra: pickLocalized(specs.beej_mantra, lang) || "",
    wearingDay: pickLocalized(specs.wearing_day, lang) || "",
    fingerOrPosition: pickLocalized(specs.finger_or_position, lang) || "",
    origin: pickLocalized(specs.origin, lang) || "",
    consecrationProcess: pickLocalized(specs.consecration_details, lang) || "",
    authenticityDetails: specs.certificate_info || "",
    description,
    benefits: detail.benefits?.length ? detail.benefits : [],
    variants: [],
    faqs: detail.faqs || [],
    reviews: detail.reviews || [],
  }
}
