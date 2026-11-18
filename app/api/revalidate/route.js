import { revalidateTag, revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

/**
 * On-Demand Cache Revalidation API Route Handler
 * 
 * Enables Laravel Admin webhooks or external triggers to immediately purge and
 * regenerate static pages when backend content (articles, products, feed) changes.
 * 
 * Supported methods: POST, GET
 * Authorization: ?secret=<token> or Header: x-revalidate-secret: <token>
 */
const DEFAULT_SECRET = "the-astro-code-revalidate-secret"

function isAuthorized(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("secret") || request.headers.get("x-revalidate-secret")
  const expectedSecret = process.env.REVALIDATE_SECRET || DEFAULT_SECRET
  return token === expectedSecret
}

async function handleRevalidation(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Invalid or missing revalidation secret token." },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  let body = {}
  if (request.method === "POST") {
    try {
      body = await request.json()
    } catch {
      // Empty or non-JSON body is acceptable if query params were provided
    }
  }

  const tag = body.tag || searchParams.get("tag")
  const rawTags = body.tags || (tag ? [tag] : [])
  const path = body.path || searchParams.get("path")
  const rawPaths = body.paths || (path ? [path] : [])
  const model = body.model || searchParams.get("model")
  const slug = body.slug || searchParams.get("slug")
  const revalidateAll = body.all === true || searchParams.get("all") === "true"

  const tagsToRevalidate = new Set(rawTags)
  const pathsToRevalidate = new Set(rawPaths)

  // Automatic model mapping for common CMS/admin webhooks
  if (model === "article") {
    tagsToRevalidate.add("articles")
    tagsToRevalidate.add("articles-sitemap")
    pathsToRevalidate.add("/")
    pathsToRevalidate.add("/categories")
    if (slug) {
      tagsToRevalidate.add(`article-${slug}`)
      pathsToRevalidate.add(`/article/${slug}`)
    }
  } else if (model === "product") {
    tagsToRevalidate.add("products")
    tagsToRevalidate.add("catalog")
    tagsToRevalidate.add("catalog-sitemap")
    pathsToRevalidate.add("/")
    pathsToRevalidate.add("/myshop")
    if (slug) {
      tagsToRevalidate.add(`product-${slug}`)
      pathsToRevalidate.add(`/myshop/product/${slug}`)
    }
  } else if (model === "category") {
    tagsToRevalidate.add("catalog")
    tagsToRevalidate.add("catalog-sitemap")
    pathsToRevalidate.add("/myshop")
    pathsToRevalidate.add("/categories")
    if (slug) {
      pathsToRevalidate.add(`/myshop/${slug}`)
    }
  } else if (model === "home") {
    tagsToRevalidate.add("home")
    tagsToRevalidate.add("home-feed")
    pathsToRevalidate.add("/")
  }

  // If "all" is requested or no specific target is provided, revalidate core collections
  if (revalidateAll || (tagsToRevalidate.size === 0 && pathsToRevalidate.size === 0)) {
    tagsToRevalidate.add("articles")
    tagsToRevalidate.add("articles-sitemap")
    tagsToRevalidate.add("products")
    tagsToRevalidate.add("catalog")
    tagsToRevalidate.add("catalog-sitemap")
    tagsToRevalidate.add("home")
    tagsToRevalidate.add("home-feed")
    pathsToRevalidate.add("/")
    pathsToRevalidate.add("/myshop")
    pathsToRevalidate.add("/categories")
  }

  const processedTags = []
  const processedPaths = []

  // Execute tag-based revalidation using recommended Next.js 16 "max" profile
  for (const t of tagsToRevalidate) {
    try {
      revalidateTag(t, "max")
      processedTags.push(t)
    } catch (e) {
      console.warn(`[Revalidate API] Tag revalidation skipped for '${t}':`, e?.message)
    }
  }

  // Execute path-based revalidation
  for (const p of pathsToRevalidate) {
    try {
      revalidatePath(p)
      processedPaths.push(p)
    } catch (e) {
      console.warn(`[Revalidate API] Path revalidation skipped for '${p}':`, e?.message)
    }
  }

  return NextResponse.json({
    success: true,
    revalidated: true,
    tags: processedTags,
    paths: processedPaths,
    timestamp: new Date().toISOString(),
    message: `Successfully triggered on-demand revalidation for ${processedTags.length} tag(s) and ${processedPaths.length} path(s).`
  })
}

export async function GET(request) {
  return handleRevalidation(request)
}

export async function POST(request) {
  return handleRevalidation(request)
}

