import { getCategoryArticleList } from "@/lib/api/server/articles"

export async function GET(request) {
  const params = new URL(request.url).searchParams
  const slug = params.get("slug") || ""
  const lang = params.get("lang") === "en" ? "en" : "gu"
  const size = Number(params.get("size") || 50)

  if (!/^[\p{L}\p{M}\p{N}_-]{1,150}$/u.test(slug) || ![6, 12, 50].includes(size)) {
    return Response.json({ message: "Invalid article category request." }, { status: 400 })
  }

  try {
    const data = await getCategoryArticleList(slug, lang, size)
    return Response.json({ data })
  } catch {
    return Response.json({ message: "Articles temporarily unavailable." }, { status: 503 })
  }
}
