import { Suspense } from "react"
import ArticleDetailClient from "./(article)"
import { ARTICLES_DATA } from "@/lib/data/article-data"

export async function generateStaticParams() {
  const ids = Object.keys(ARTICLES_DATA)
  // Ensure common test routes are prerendered
  const uniqueIds = Array.from(new Set([...ids, "1", "hero-1", "hero-2", "hero-3", "jyotirling-1"]))
  return uniqueIds.map((id) => ({ id }))
}

/**
 * Async content component wrapped within Suspense
 * Allows Next.js 16 to render an instant navigation shell while streaming URL params.
 */
async function ArticleDetailContentWrapper({ params }) {
  const resolvedParams = await params
  return <ArticleDetailClient initialId={resolvedParams?.id} />
}

/**
 * Article Detail Page (Server Component)
 * 
 * In Next.js 16 with instant navigation / partial prefetching enabled,
 * `params` is accessed inside <Suspense> to allow instant shell prerendering.
 */
export default function ArticleDetailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-foreground gap-3">
          <div className="w-10 h-10 border-4 border-[#fdc72d] border-t-transparent rounded-full animate-spin" />
          <span className="font-bold text-sm text-muted-foreground">આર્ટિકલ લોડ થઈ રહ્યો છે...</span>
        </div>
      }
    >
      <ArticleDetailContentWrapper params={params} />
    </Suspense>
  )
}
