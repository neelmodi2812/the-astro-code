/**
 * Next.js App Router - Robots Configuration
 *
 * Automatically generates and serves /robots.txt route.
 * Follows Next.js MetadataRoute.Robots official specification for maximum SEO performance.
 * Strictly prevents crawling of private user vaults, checkout carts, and authentication forms.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"

  return {
    rules: [
      {
        // Default rule for all search engine web crawlers
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/dashboard/",
          "/dashboard/*",
          "/cart",
          "/myshop/cart",
          "/forgot-password/",
          "/forget-password/",
          "/reset-password/",
          "/login",
          "/register",
        ],
      },
      {
        // Googlebot optimization
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/dashboard/",
          "/dashboard/*",
          "/cart",
          "/myshop/cart",
          "/forgot-password/",
          "/forget-password/",
          "/reset-password/",
        ],
      },
      {
        // Bingbot optimization
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/dashboard/",
          "/dashboard/*",
          "/cart",
          "/myshop/cart",
          "/forgot-password/",
          "/forget-password/",
          "/reset-password/",
        ],
      },
      {
        // AI / Assistant Web Crawlers
        userAgent: ["Applebot", "DuckDuckBot", "Baiduspider", "YandexBot"],
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/dashboard/",
          "/cart",
          "/myshop/cart",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
