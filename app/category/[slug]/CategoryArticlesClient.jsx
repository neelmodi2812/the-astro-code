"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { SafeImage } from "@/components/ui/safe-image"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/components/language-provider"
import { getSiteShell } from "@/lib/config/site"
import { contentService } from "@/lib/api/services/content"
import { formatDate } from "@/lib/api/adapters/home"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Sparkles,
  ChevronRight,
  Calendar,
  BookOpen,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react"

export default function CategoryArticlesClient({ slug }) {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const siteData = React.useMemo(() => getSiteShell(lang), [lang])

  const [articles, setArticles] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [currentCategory, setCurrentCategory] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // Fetch Category info & Articles list
  React.useEffect(() => {
    let cancelled = false
    setIsLoading(true)

    Promise.all([
      contentService.articles.categories(lang, { token: null }).catch(() => ({ data: [] })),
      contentService.articles.list({ category: slug, per_page: 50 }, lang, { token: null }).catch(() => ({ data: [] })),
    ])
      .then(([catRes, artRes]) => {
        if (cancelled) return
        const catList = Array.isArray(catRes?.data) ? catRes.data : []
        const artList = Array.isArray(artRes?.data) ? artRes.data : []

        setCategories(catList)
        const match = catList.find((c) => c.slug === slug)
        setCurrentCategory(match || null)
        setArticles(artList)
        setIsLoading(false)
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug, lang])

  const categoryTitle = React.useMemo(() => {
    if (currentCategory) {
      return lang === "en"
        ? currentCategory.name_en || currentCategory.name
        : currentCategory.name_gu || currentCategory.name
    }
    const FALLBACK_TITLES = {
      jyotirling: lang === "en" ? "Twelve Jyotirlingas" : "બાર જ્યોતિર્લિંગ",
      dharmik: lang === "en" ? "Religious" : "ધાર્મિક",
      jyotishshastra: lang === "en" ? "Astrology" : "જ્યોતિષશાસ્ત્ર",
      "bahuchar-maa-nu-rajwadu": lang === "en" ? "Shri Bahuchar Maa Rajwadu" : "શ્રી બહુચર માં નું રજવાડું",
      preranatmak: lang === "en" ? "Motivational" : "પ્રેરણાત્મક",
      ankashastra: lang === "en" ? "Numerology" : "અંકશાસ્ત્ર",
      navdurga: lang === "en" ? "Nine Forms of Navdurga" : "નવદુર્ગાના નવ સ્વરૂપો",
    }
    return FALLBACK_TITLES[slug] || slug
  }, [currentCategory, slug, lang])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200 w-full max-w-full overflow-x-hidden">
      {/* 1. Global Astro Header */}
      <AstroHeader
        config={siteData.config}
        topBar={siteData.topBar}
        navLinks={siteData.navLinks}
        activeCategory={slug}
        onSelectCategory={(id) => {
          if (id === "home") router.push("/")
          else if (id === "dainik-panchang" || id === "panchang") router.push("/dainik-panchang")
          else if (id === "myshop") router.push("/myshop")
          else if (id === "categories") router.push("/categories")
          else router.push(`/category/${id}`)
        }}
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* 2. Breadcrumb Navigation */}
        <div className="mb-5">
          <Breadcrumb>
            <BreadcrumbList className="text-xs font-medium">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/"
                    className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#d9a100]" />
                    <span>{lang === "gu" ? "હોમ" : "Home"}</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/categories"
                    className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors"
                  >
                    {lang === "gu" ? "વિષય સંગ્રહ" : "Categories"}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-foreground">
                  {categoryTitle}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 3. Category Header & Sacred Ornament */}
        <div className="pb-6 mb-6 border-b border-border/70">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2.5 h-6 bg-[#fdc72d] rounded-full inline-block" />
                <span className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] uppercase tracking-wider">
                  {lang === "gu" ? "અધિકૃત આધ્યાત્મિક સંગ્રહ" : "Authentic Sacred Archive"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                {categoryTitle}
              </h1>
              {currentCategory?.description && (
                <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                  {currentCategory.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-[#fdc72d] text-[#0e3934] shadow-xs border border-[#eab318]">
                {articles.length} {lang === "gu" ? "લેખો" : "Articles"}
              </span>
            </div>
          </div>

          {/* 4. Horizontal Category Switcher Pills (Matching Old Site Filter Strip) */}
          <div className="w-full pt-5">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <Link
                href="/categories"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap bg-muted hover:bg-muted/80 text-foreground/80 shrink-0"
              >
                {lang === "gu" ? "બધા વિષયો" : "All Topics"}
              </Link>
              {categories.map((cat) => {
                const isActive = cat.slug === slug
                const label = lang === "en" ? (cat.name_en || cat.name) : (cat.name_gu || cat.name)
                return (
                  <Link
                    key={cat.id || cat.slug}
                    href={`/category/${cat.slug}`}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                      isActive
                        ? "bg-[#0e3934] text-white dark:bg-[#fdc72d] dark:text-[#0e3934] border-[#0e3934] dark:border-[#eab318] shadow-sm ring-1 ring-[#fdc72d]"
                        : "bg-card text-foreground/80 border-border/70 hover:bg-muted"
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* 5. Article Cards Grid */}
        {isLoading ? (
          /* Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-border/60 bg-card p-0 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-muted/40">
                  <Skeleton className="w-full h-full rounded-none" />
                </div>
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-3/4 rounded" />
                    <Skeleton className="h-3.5 w-full rounded mt-2" />
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between">
                    <Skeleton className="h-3.5 w-24 rounded" />
                    <Skeleton className="h-3.5 w-20 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center rounded-2xl bg-card border border-border/80 my-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-foreground">
              {lang === "gu" ? "આ કેટેગરીમાં હાલ કોઈ લેખ ઉપલબ્ધ નથી" : "No articles found in this category"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              {lang === "gu" ? "કૃપા કરીને અન્ય કેટેગરી તપાસો." : "Please explore other sacred categories."}
            </p>
            <Link
              href="/categories"
              className="inline-block mt-4 text-xs font-bold px-4 py-2 bg-[#fdc72d] text-[#0e3934] rounded-lg"
            >
              {lang === "gu" ? "બધી કેટેગરીઝ જુઓ" : "View All Categories"}
            </Link>
          </div>
        ) : (
          /* Real Articles Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => {
              const articleTitle = lang === "en" ? (article.title_en || article.title) : (article.title_gu || article.title)
              const articleSubtitle = lang === "en" ? (article.subtitle_en || article.subtitle) : (article.subtitle_gu || article.subtitle)
              const articleTag = lang === "en" ? (article.tag_en || article.tag || categoryTitle) : (article.tag_gu || article.tag || categoryTitle)
              const articleAuthor = article.author_name || (lang === "gu" ? "ડૉ. વિશાલ મોદી" : "Dr. Vishal Modi")
              const targetSlug = article.slug || article.id

              return (
                <Link
                  key={article.id || article.slug}
                  href={`/article/${targetSlug}`}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-card dark:bg-[#0c2f2b] border border-border/80 dark:border-emerald-800/40 hover:border-[#fdc72d] dark:hover:border-[#fdc72d] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
                >
                  {/* Image Frame with natural 4:3 aspect ratio */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-900/10 dark:bg-black/40">
                    <SafeImage
                      src={article.image}
                      fallbackSrc="/images/somnath-mahadev-temple.jpg"
                      alt={article.image_alt || articleTitle}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 320px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                    {/* Category Tag Badge */}
                    <span className="absolute top-3 left-3 text-[11px] bg-[#fdc72d] text-[#0e3934] px-2.5 py-0.5 rounded-md font-black shadow-md border border-[#eab318] tracking-wide">
                      {articleTag}
                    </span>

                    {/* Quick hover link badge */}
                    <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-xs text-white p-1 rounded-full">
                      <ArrowUpRight className="size-3.5 text-[#fdc72d]" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-card dark:bg-[#08201d]">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-[#00685d] dark:group-hover:text-[#fdc72d] transition-colors leading-snug line-clamp-2 mb-2">
                        {articleTitle}
                      </h3>
                      {articleSubtitle && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                          {articleSubtitle}
                        </p>
                      )}
                    </div>

                    {/* Meta: Author & Date */}
                    <div className="pt-3 border-t border-border/60 dark:border-white/10 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground/80 dark:text-white/80 truncate max-w-[140px] flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-[#fdc72d] shrink-0" />
                        <span className="truncate">{articleAuthor}</span>
                      </span>
                      <span className="text-[11px] text-muted-foreground shrink-0 flex items-center gap-1">
                        <Calendar className="size-3 text-muted-foreground/70" />
                        {formatDate(article.published_at, lang)}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>

      {/* 6. Footer */}
      <AstroFooter
        config={siteData.config}
        footerLinks={siteData.footerLinks}
        social={siteData.social}
        lang={lang}
      />
    </div>
  )
}
