/**
 * Next.js App Router - Robots Configuration
 *
 * Automatically generates and serves /robots.txt route.
 * Follows Next.js MetadataRoute.Robots official specification for maximum SEO performance.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"

  return {
    rules: [
      {
        // Default rule for all web search crawlers
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/forgot-password/",
          "/forget-password/",
          "/reset-password/",
        ],
      },
      {
        // Google Search crawler optimization
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Bing Search crawler optimization
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Optional AI crawlers policy (Permit indexing while preventing API scraping)
        userAgent: [
          "Applebot",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot"
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
