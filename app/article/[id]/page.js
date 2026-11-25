import { Suspense } from "react"
import ArticleLoading from "./loading"
import ArticleDetailClient from "./(article)"
import { JsonLd } from "@/components/seo-structured-data"
import { getArticleBundle, getArticleSlugs } from "@/lib/api/server/articles"

const decodeSlug = (val) => {
  if (!val) return ""
  try {
    return decodeURIComponent(String(val))
  } catch {
    return String(val)
  }
}

/** Live article from API/server cache. Never return mock fallback data. */
async function resolveArticle(id) {
  if (!id) return { live: null, article: null }
  const live = await getArticleBundle(id)
  return { live, article: live ?? null }
}

export async function generateStaticParams() {
  const liveSlugs = await getArticleSlugs()
  return liveSlugs.map((id) => ({ id }))
}

/**
 * Dynamic SEO Metadata Generation for Next.js 16 App Router
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const articleId = decodeSlug(resolvedParams?.id)
  const { article } = await resolveArticle(articleId)

  if (!article) {
    return {
      title: "આર્ટિકલ મળ્યો નથી (Article Not Found) | The Astro Code",
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
  const imageUrl = article.heroImage || "/logo.png"
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
      publishedTime: article.publishedAt,
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
  const articleId = decodeSlug(resolvedParams?.id)
  const { live, article } = await resolveArticle(articleId)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${siteUrl}/article/${articleId}`,
        },
        "headline": article.title?.gu || article.title?.en || "",
        "description": article.subtitle?.gu || article.subtitle?.en || "",
        "image": [article.heroImage || `${siteUrl}/logo.png`],
        "datePublished": article.publishedAt,
        "dateModified": article.publishedAt,
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
            "url": `${siteUrl}/logo.png`,
          },
        },
      }
    : null

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
        "name": article?.category?.gu || "વિષય સંગ્રહ",
        "item": `${siteUrl}/categories`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article?.title?.gu || "આર્ટિકલ",
        "item": `${siteUrl}/article/${articleId}`,
      },
    ],
  }

  return (
    <>
      {articleSchema && <JsonLd data={articleSchema} />}
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
    <Suspense fallback={<ArticleLoading />}>
      <ArticleDetailContentWrapper params={params} />
    </Suspense>
  )
}
