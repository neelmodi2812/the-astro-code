import { getAstroData } from "@/lib/data/astro-data"

/**
 * Next.js 16 App Router - Landing Data Route Handler
 *
 * GET /api/landing-data?lang=(gu|en)
 * Returns the localized Vedic portal landing dataset.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get("lang") || "gu"
  const data = getAstroData(lang)

  return Response.json(data, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  })
}
