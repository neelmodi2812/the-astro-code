import { Suspense } from "react"
import ArticleDetailClient from "./(article)"
import { getArticleById, getAllArticleIds } from "@/lib/data/article-data"
import { JsonLd } from "@/components/seo-structured-data"
import { getArticleBundle, getArticleSlugs } from "@/lib/api/server/articles"

/** Live article first (so admin-created articles work), bundled static article as fallback. */
async function resolveArticle(id) {
  const live = await getArticleBundle(id)
  return { live, article: live ?? getArticleById(id) }
}

export async function generateStaticParams() {
  const ids = getAllArticleIds()
  const liveSlugs = await getArticleSlugs()
  const uniqueIds = Array.from(
    new Set([...ids, ...liveSlugs, "1", "hero-1", "hero-2", "hero-3", "hero-4", "feat-1", "feat-2", "jyotirling-1", "jyotirling-2", "jyotirling-3", "insight-1", "insight-2"])
  )
  return uniqueIds.map((id) => ({ id }))
}

/**
 * Dynamic SEO Metadata Generation for Next.js 16 App Router
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const articleId = resolvedParams?.id || "hero-1"
  const { article } = await resolveArticle(articleId)

  if (!article) {
    return {
      title: "આર્ટિકલ મળ્યો નથી (Article Not Found)",
      description: "વિનંતી કરેલ વૈદિક આર્ટિકલ ઉપલબ્ધ નથી.",
    }
  }

  const rawTitle = article.title?.gu || article.title?.en || "આર્ટિકલ વિગત"
  const description =
    article.subtitle?.gu ||
    article.subtitle?.en ||
    "The Astro Code - વૈદિક જ્યોતિષ, સાત્વિક અધ્યાત્મ અને પૌરાણિક સંશોધન લેખ."
  const title = rawTitle
  const canonicalUrl = `/article/${articleId}`
  const imageUrl = article.heroImage || "/the_astro_code_golden_yantra_logo.png"
  const imageAlt = article.heroImageAlt || rawTitle

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "The Astro Code",
      type: "article",
      locale: "gu_IN",
      publishedTime: article.publishedAt || "2025-04-12T06:00:00.000Z",
      authors: [article.author?.name?.gu || "ડૉ. વિશાલ મોદી"],
      section: article.category?.gu || "વૈદિક આધ્યાત્મ",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@theastrocode",
    },
  }
}

/**
 * Async content component wrapped within Suspense
 * Renders instant navigation shell while streaming URL params and Article JSON-LD schema.
 */
async function ArticleDetailContentWrapper({ params }) {
  const resolvedParams = await params
  const articleId = resolvedParams?.id || "hero-1"
  const { live, article } = await resolveArticle(articleId)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/article/${articleId}`,
    },
    "headline": article.title?.gu || article.title?.en,
    "description": article.subtitle?.gu || article.subtitle?.en,
    "image": [article.heroImage || `${siteUrl}/the_astro_code_golden_yantra_logo.png`],
    "datePublished": article.publishedAt || "2025-04-12T06:00:00+05:30",
    "dateModified": article.publishedAt || "2025-04-12T06:00:00+05:30",
    "inLanguage": "gu",
    "author": {
      "@type": "Person",
      "name": article.author?.name?.gu || "Dr. Vishal Modi",
      "jobTitle": "Vedic Astrologer (Ph.D. Jyotish Shastra)",
      "url": `${siteUrl}/about-us`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Astro Code",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/the_astro_code_golden_yantra_logo.png`,
      },
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "મુખ્ય પૃષ્ઠ",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": article.category?.gu || "વિષય સંગ્રહ",
        "item": `${siteUrl}/categories`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title?.gu || "આર્ટિકલ",
        "item": `${siteUrl}/article/${articleId}`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ArticleDetailClient initialId={articleId} initialArticle={live} />
    </>
  )
}

/**
 * Article Detail Page (Server Component)
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
