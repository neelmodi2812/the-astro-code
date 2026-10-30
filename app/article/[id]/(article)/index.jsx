"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Calendar,
  Clock,
  Eye,
  CheckCircle,
  Sparkles,
  Sun,
  ShieldCheck,
  ChevronRight,
  Quote,
  MessageCircle,
  Store,
  TrendingUp,
  Award,
  Users,
  Copy,
  Check,
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { AudioArticlePlayer } from "@/components/audio-article-player"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { toast } from "@/components/ui/sonner"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { useArticle } from "@/lib/api/hooks/use-article"
import { useLanguage } from "@/components/language-provider"

function ArticleDetailContent({ initialId, initialArticle }) {
  const params = useParams()
  const router = useRouter()
  const articleId = params?.id || initialId || "hero-1"

  const { lang, setLang } = useLanguage()
  const data = useHomeData(lang)
  const article = useArticle(articleId, initialArticle)

  // Share menu state
  const [shareMenuOpen, setShareMenuOpen] = React.useState(false)

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = React.useState(false)

  // Link copied state
  const [copiedLink, setCopiedLink] = React.useState(false)

  // Reaction counts & selected reaction
  const [reactions, setReactions] = React.useState({
    divine: article.reactions.divine,
    insightful: article.reactions.insightful,
    wonderful: article.reactions.wonderful
  })
  const [userReaction, setUserReaction] = React.useState(null)

  // Scroll reading progress indicator
  const [readingProgress, setReadingProgress] = React.useState(0)

  const showToast = (msg, type = "success") => {
    if (type === "info") toast.info(msg)
    else if (type === "error") toast.error(msg)
    else toast.success(msg)
  }

  // Handle language switch
  const handleToggleLang = (newLang) => {
    setLang(newLang)
    toast.info(newLang === "en" ? "Language switched to English" : "ભાષા બદલાઈ: ગુજરાતી")
  }

  // Scroll listener for reading progress
  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)))
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update article if ID changes
  React.useEffect(() => {
    setReactions({
      divine: article.reactions.divine,
      insightful: article.reactions.insightful,
      wonderful: article.reactions.wonderful
    })
    setUserReaction(null)
  }, [article])

  // Bookmark toggle
  const toggleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev
      showToast(
        next
          ? lang === "gu"
            ? "લેખ બુકમાર્ક થયો!"
            : "Article bookmarked!"
          : lang === "gu"
          ? "બુકમાર્ક રદ થયો"
          : "Bookmark removed"
      )
      return next
    })
  }

  // Universal Share Trigger (Native mobile share sheet or Toggle dropdown)
  const handleShareTrigger = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: article.title[lang],
          text: article.subtitle[lang],
          url: window.location.href
        })
        return
      } catch {
        // User cancelled or share dismissed, fall back to dropdown toggle
      }
    }
    setShareMenuOpen((prev) => !prev)
  }

  // Share handlers
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      showToast(lang === "gu" ? "લિંક કૉપિ થઈ ગઈ!" : "Link copied to clipboard!")
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(article.title[lang])
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank")
    }
  }

  const handleShareFacebook = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
    }
  }

  const handleShareX = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(article.title[lang])
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
    }
  }

  const handleShareTelegram = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(article.title[lang])
      window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank")
    }
  }

  // Reaction click
  const handleReactionClick = (key) => {
    if (userReaction === key) return // already reacted
    setReactions((prev) => ({
      ...prev,
      [key]: prev[key] + 1
    }))
    setUserReaction(key)
    showToast(lang === "gu" ? "પ્રતિભાવ આપવા બદલ આભાર! 🙏" : "Thank you for your reaction! 🙏")
  }

  // Gujarati numerals formatter helper
  const formatNumber = (num) => {
    if (lang !== "gu") return typeof num === "number" ? num.toLocaleString() : num
    const guDigits = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"]
    return String(num).replace(/[0-9]/g, (d) => guDigits[d])
  }

  // The article's own related articles when the API provides them, else home hero stories (minus this one)
  const relatedStories = React.useMemo(() => {
    if (article.related?.length) {
      return article.related.slice(0, 3).map((r) => ({
        id: r.id,
        image: r.image,
        title: r.title?.[lang] ?? r.title?.gu ?? "",
        tag: r.tag?.[lang] ?? r.tag?.gu ?? "",
        date: r.date?.[lang] ?? r.date?.gu ?? "",
      }))
    }
    return data.heroStories.filter((s) => s.id !== articleId).slice(0, 3)
  }, [article.related, data.heroStories, articleId, lang])

  // Determine current active navigation category based on article data
  const currentCategoryNavId = React.useMemo(() => {
    // The live article carries its category slug, which is also the nav item id.
    if (article?.categorySlug) return article.categorySlug

    const rawId = String(articleId || "").toLowerCase()
    const rawSlug = String(article?.slug || "").toLowerCase()
    const catGu = String(article?.category?.gu || "").toLowerCase()
    const catEn = String(article?.category?.en || "").toLowerCase()

    if (
      rawId.startsWith("jyotirling") ||
      rawSlug.includes("jyotirling") ||
      rawSlug.includes("somnath") ||
      rawSlug.includes("mahakal") ||
      rawSlug.includes("dwarka") ||
      catGu.includes("જ્યોતિર્લિંગ") ||
      catEn.includes("jyotirling")
    ) {
      return "jyotirling"
    }

    if (
      rawId.startsWith("feat") ||
      rawSlug.includes("anand-no-garbo") ||
      rawSlug.includes("bhakto") ||
      catGu.includes("ધાર્મિક") ||
      catEn.includes("dharmik")
    ) {
      return "dharmik"
    }

    if (
      rawSlug.includes("kaal-sarp") ||
      rawSlug.includes("kundli") ||
      catGu.includes("જ્યોતિષ") ||
      catEn.includes("astrology")
    ) {
      return "jyotishshastra"
    }

    if (
      rawSlug.includes("moolank") ||
      rawSlug.includes("numerology") ||
      catGu.includes("અંક") ||
      catEn.includes("numerology")
    ) {
      return "ankashastra"
    }

    return "bahuchar-maa-rajwadu"
  }, [articleId, article])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      {/* 1. TOP GLOBAL HEADER */}
      <AstroHeader
        config={data.config}
        topBar={data.topBar}
        navLinks={data.navLinks}
        activeCategory={currentCategoryNavId}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* 2. STICKY READING PROGRESS BAR (Positioned just under sticky header) */}
      <div className="sticky top-[108px] sm:top-[124px] z-40 w-full overflow-hidden">
        <Progress
          value={readingProgress}
          className="h-1 rounded-none gap-0 bg-border/40 [&_[data-slot=progress-track]]:h-1 [&_[data-slot=progress-track]]:rounded-none [&_[data-slot=progress-track]]:bg-border/40 [&_[data-slot=progress-indicator]]:bg-[#d9a100]"
          aria-label="Article reading progress"
        />
      </div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        {/* Top Breadcrumb & Badges Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <Breadcrumb>
            <BreadcrumbList className="text-xs sm:text-sm font-medium">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors flex items-center gap-1">
                    {lang === "gu" ? "હોમ" : "Home"}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors font-medium text-muted-foreground">
                  {article.category[lang]}
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  {article.title[lang]}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#fdc72d] text-[#0e3934] text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
              {article.category[lang]}
            </span>
            {article.subBadges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-[#008d7f]/15 text-[#008d7f] dark:text-[#52c7bb] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#008d7f]/30"
              >
                {badge[lang]}
              </span>
            ))}
          </div>
        </div>

        {/* 2-Column Grid Layout: 70% Article + 30% Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT: MAIN ARTICLE COLUMN (8 cols) */}
          <article className="lg:col-span-8 flex flex-col gap-6">
            {/* Header: Title, Subtitle, Author & Actions */}
            <header className="flex flex-col gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                {article.title[lang]}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {article.subtitle[lang]}
              </p>

              {/* Author & Action Strip */}
              <div className="bg-[#f7f6f2] dark:bg-[#0d3833] border border-border/60 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                {/* Author Avatar & Name */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="size-12 ring-2 ring-[#fdc72d] shadow-xs">
                      <AvatarImage
                        src={article.author.image}
                        alt={article.author.name[lang]}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[#fdc72d] text-[#0e3934] font-bold">
                        {article.author.name[lang]?.substring(0, 2) || "VM"}
                      </AvatarFallback>
                    </Avatar>
                    {article.author.verified && (
                      <span
                        className="absolute -bottom-1 -right-1 bg-[#008d7f] text-white rounded-full p-0.5 shadow-xs"
                        title={lang === "gu" ? "પ્રમાણિત જ્યોતિષાચાર્ય" : "Verified Astrologer"}
                      >
                        <ShieldCheck className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm sm:text-base text-foreground leading-tight">
                        {article.author?.name?.[lang] || article.author?.name?.gu || article.author?.name || "ડૉ. વિશાલ મોદી"}
                      </span>
                      <span className="text-xs text-[#008d7f] font-semibold flex items-center gap-0.5">
                        <CheckCircle className="h-3 w-3 inline text-[#008d7f]" />
                        {lang === "gu" ? "પ્રમાણિત" : "Verified"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {article.author?.title?.[lang] || article.author?.title?.gu || article.author?.title || (lang === "gu" ? "Ph.D. જ્યોતિષશાસ્ત્ર & પુરાણ તજજ્ઞ" : "Ph.D. Vedic Astrology & Puranic Scholar")}
                    </span>
                  </div>
                </div>

                {/* Metadata & Functional Share & Bookmark Bar */}
                <div className="flex items-center flex-wrap gap-3 sm:gap-4 justify-between sm:justify-end">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#008d7f]" />
                      {article.date?.[lang] || article.date?.gu || article.date || (lang === "gu" ? "૧૨ એપ્રિલ, ૨૦૨૫" : "April 12, 2025")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#008d7f]" />
                      {article.readTime?.[lang] || article.readTime?.gu || article.readTime || (lang === "gu" ? "૫ મિનિટ વાંચન" : "5 min read")}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5 text-[#008d7f]" />
                      {article.views?.[lang] || article.views?.gu || article.views || (lang === "gu" ? "૧૪,૫૨૦ દર્શકો" : "14,520 views")}
                    </span>
                  </div>

                  {/* Share & Bookmark Options with shadcn DropdownMenu */}
                  <div className="relative">
                    <DropdownMenu open={shareMenuOpen} onOpenChange={setShareMenuOpen}>
                      <div className="flex items-center gap-1 bg-white dark:bg-[#0b332f] border border-border/70 p-1 rounded-xl shadow-xs">
                        {/* Main Share Button Trigger */}
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#fdc72d] text-[#0e3934] hover:bg-[#eab318] text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                            aria-label={lang === "gu" ? "લેખ શેર કરો" : "Share Article"}
                          >
                            <Share2 className="h-3.5 w-3.5" />
                            <span>{lang === "gu" ? "શેર કરો" : "Share"}</span>
                          </button>
                        </DropdownMenuTrigger>

                        {/* Quick WhatsApp Share Button */}
                        <button
                          onClick={handleShareWhatsApp}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-[#25D366] hover:bg-muted/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="WhatsApp"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </button>

                        {/* Quick Copy Link Button */}
                        <button
                          onClick={handleCopyLink}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title={lang === "gu" ? "લિંક કૉપિ કરો" : "Copy Link"}
                        >
                          {copiedLink ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </button>

                        <span className="w-[1px] h-4 bg-border/80 mx-0.5" />

                        {/* Bookmark Toggle */}
                        <button
                          onClick={toggleBookmark}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isBookmarked
                              ? "text-[#fdc72d] bg-[#fdc72d]/15"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-white/10"
                          }`}
                          title={lang === "gu" ? "બુકમાર્ક કરો" : "Bookmark Article"}
                        >
                          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-[#fdc72d]" : ""}`} />
                        </button>
                      </div>

                      <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl bg-card dark:bg-[#0d3833] shadow-xl">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="px-2.5 py-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            {lang === "gu" ? "સોશિયલ મીડિયા પર શેર કરો" : "Share on Social Media"}
                          </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => {
                              handleShareWhatsApp()
                              setShareMenuOpen(false)
                            }}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer"
                          >
                            <span className="w-6 h-6 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
                              <MessageCircle className="h-3.5 w-3.5" />
                            </span>
                            <span>WhatsApp</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleShareFacebook()
                              setShareMenuOpen(false)
                            }}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer"
                          >
                            <span className="w-6 h-6 rounded-lg bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center">
                              <Share2 className="h-3.5 w-3.5" />
                            </span>
                            <span>Facebook</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleShareX()
                              setShareMenuOpen(false)
                            }}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer"
                          >
                            <span className="w-6 h-6 rounded-lg bg-foreground/10 text-foreground flex items-center justify-center font-bold text-xs">
                              𝕏
                            </span>
                            <span>X (Twitter)</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => {
                              handleCopyLink()
                              setShareMenuOpen(false)
                            }}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer"
                          >
                            <span className="w-6 h-6 rounded-lg bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center">
                              {copiedLink ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                            </span>
                            <span>{copiedLink ? (lang === "gu" ? "લિંક કૉપિ થઈ ગઈ!" : "Link Copied!") : (lang === "gu" ? "લિંક કૉપિ કરો" : "Copy Link")}</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </header>

            {/* HERO VISUAL WITH OVERLAY BUTTONS (As seen in Reference Image 2) */}
            <figure className="relative rounded-2xl overflow-hidden shadow-lg border border-border/40 group h-[280px] sm:h-[380px] md:h-[440px]">
              <Image
                src={article.heroImage}
                alt={article.heroImageAlt || article.title[lang]}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-102"
                priority
              />

              {/* Dark Gradient Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06302b]/85 via-[#06302b]/20 to-[#06302b]/30" />

              {/* Floating Action Buttons Overlaid on Top of Image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                {/* Back Button */}
                <button
                  onClick={() => router.back()}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-[#06302b]/45 hover:bg-[#06302b]/75 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md active:scale-95"
                  title={lang === "gu" ? "પાછા જાઓ" : "Go Back"}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Right Bookmark & Share Buttons */}
                <div className="pointer-events-auto flex items-center gap-2">
                  <button
                    onClick={toggleBookmark}
                    className="w-10 h-10 rounded-full bg-[#06302b]/45 hover:bg-[#06302b]/75 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md active:scale-95"
                    title={lang === "gu" ? "બુકમાર્ક કરો" : "Bookmark"}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-white" : ""}`} />
                  </button>
                  <button
                    onClick={handleShareTrigger}
                    className="w-10 h-10 rounded-full bg-[#06302b]/45 hover:bg-[#06302b]/75 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                    title={lang === "gu" ? "શેર કરો" : "Share"}
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Caption & Suvarna Darshan Badge */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white flex items-end justify-between gap-3">
                <figcaption className="text-xs sm:text-sm text-white/90 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#fdc72d] shrink-0" />
                  <span className="line-clamp-2">{article.heroCaption[lang]}</span>
                </figcaption>
                <span className="bg-[#fdc72d] text-[#0e3934] text-xs font-bold px-2.5 py-1 rounded-md shadow shrink-0">
                  {article.heroBadge[lang]}
                </span>
              </div>
            </figure>

            {/* AUDIO LISTENING PLAYER COMPONENT (As seen in Reference Image 1) */}
            <AudioArticlePlayer
              articleText={article.audioText[lang]}
              lang={lang}
              title={lang === "gu" ? "આ લેખ સાંભળો" : "Listen to this Article"}
              durationSeconds={432}
            />

            {/* SOCIAL SHARE BAR (Above Content) */}
            <div className="flex items-center justify-between gap-3 py-2.5 px-4 bg-[#f7f6f2] dark:bg-[#0d3833] border border-border/60 rounded-xl shadow-xs">
              <span className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                <Share2 className="h-4 w-4 text-[#d9a100]" />
                {lang === "gu" ? "મિત્રો સાથે શેર કરો:" : "Share with friends:"}
              </span>
              <div className="flex items-center gap-2">
                {/* WhatsApp */}
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold shadow hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </button>
                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0b332f] border border-border/60 text-xs font-semibold text-foreground shadow-xs hover:bg-[#eae8e1] dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLink ? (lang === "gu" ? "કૉપિ થઈ!" : "Copied!") : (lang === "gu" ? "લિંક કૉપિ" : "Copy Link")}</span>
                </button>
              </div>
            </div>

            {/* ARTICLE BODY CONTENT */}
            <div className="flex flex-col gap-6 text-foreground font-sans text-base sm:text-lg leading-relaxed">
              {/* Lead Paragraph with vertical accent and drop cap */}
              {article.lead && article.lead[lang] ? (
                <div className="relative pl-4 border-l-4 border-[#d9a100]">
                  <p className="font-medium text-foreground leading-relaxed">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#d9a100] float-left mr-3 leading-none select-none">
                      {Array.from(article.lead[lang])[0]}
                    </span>
                    {Array.from(article.lead[lang]).slice(1).join("")}
                  </p>
                </div>
              ) : !article.lead ? (
              <div className="relative pl-4 border-l-4 border-[#d9a100]">
                <p className="font-medium text-foreground leading-relaxed">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#d9a100] float-left mr-3 leading-none select-none">
                    {lang === "gu" ? "ગુ" : "T"}
                  </span>
                  {lang === "gu"
                    ? "જરાતની પરમ પવિત્ર શક્તિપીઠો પૈકીનું એક એવું ચુંવાળ પંથકમાં આવેલું શ્રી બહુચરાજી તીર્થધામ એટલે લાખો ભાવિક ભક્તોની આસ્થાનું કેન્દ્ર. ચૈત્રી સુદ પૂનમ એ મા બહુચરનો પ્રાગટ્ય દિવસ ગણાય છે. આ દિવસે કરવામાં આવતી સાધના, ગરબા પાઠ અને માઁ ના દર્શનથી અસંભવ કાર્યો પણ સુલભ બને છે."
                    : "he sacred abode of Sanatana Dharma radiates infinite peace and divine consciousness. According to ancient Vedic traditions, worshipping on auspicious tithis dissolves negative astrological afflictions and fulfills righteous aspirations of the heart."}
                </p>
              </div>
              ) : null}

              {/* Subsection 1 */}
              {article.sections[0] && (
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-[#d9a100] rounded-full shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {article.sections[0].heading[lang]}
                    </h2>
                  </div>
                  {article.sections[0].paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-muted-foreground leading-relaxed">
                      {para[lang]}
                    </p>
                  ))}
                </div>
              )}

              {/* HIGHLIGHT CALLOUT QUOTE */}
              {article.quote && article.quote.text && (
                <div className="my-2 p-5 sm:p-6 bg-[#fff9e6] dark:bg-[#0f3b36] border-l-4 border-[#d9a100] rounded-2xl shadow-xs flex items-start gap-4">
                  <Quote className="h-8 w-8 text-[#008d7f] shrink-0 rotate-180" />
                  <div className="flex flex-col gap-1.5">
                    <blockquote className="text-base sm:text-lg font-bold text-[#0e3934] dark:text-[#f8f7f4] italic leading-relaxed">
                      {article.quote.text[lang] || article.quote.text.gu || article.quote.text}
                    </blockquote>
                    {article.quote.cite && (
                      <cite className="text-xs sm:text-sm text-[#008d7f] dark:text-[#52c7bb] font-bold not-italic">
                        {article.quote.cite[lang] || article.quote.cite.gu || article.quote.cite}
                      </cite>
                    )}
                  </div>
                </div>
              )}

              {/* SPECIAL MUHURTA CARD (As seen in Reference Image 3) */}
              {article.muhurtaCard && article.muhurtaCard.title && (
                <div className="bg-[#f7f6f2] dark:bg-[#0d3833] border border-border/70 rounded-2xl p-5 shadow-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-[#d9a100]" />
                      <h3 className="font-bold text-base sm:text-lg text-foreground">
                        {article.muhurtaCard.title[lang] || article.muhurtaCard.title.gu || article.muhurtaCard.title}
                      </h3>
                    </div>
                    {article.muhurtaCard.badge && (
                      <Badge variant="outline" className="bg-[#008d7f]/10 text-[#008d7f] dark:text-[#52c7bb] border-[#008d7f]/30 font-bold text-xs">
                        {article.muhurtaCard.badge[lang] || article.muhurtaCard.badge.gu || article.muhurtaCard.badge}
                      </Badge>
                    )}
                  </div>

                  {article.muhurtaCard.morning && article.muhurtaCard.evening && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                      <div className="p-3 bg-white dark:bg-[#0b332f] rounded-xl border border-border/50">
                        <span className="text-xs text-muted-foreground block font-medium">
                          {article.muhurtaCard.morning.label?.[lang] || article.muhurtaCard.morning.label?.gu || article.muhurtaCard.morning.label}
                        </span>
                        <span className="text-sm font-bold text-foreground mt-0.5 block">
                          {article.muhurtaCard.morning.time?.[lang] || article.muhurtaCard.morning.time?.gu || article.muhurtaCard.morning.time}
                        </span>
                      </div>
                      <div className="p-3 bg-white dark:bg-[#0b332f] rounded-xl border border-border/50">
                        <span className="text-xs text-muted-foreground block font-medium">
                          {article.muhurtaCard.evening.label?.[lang] || article.muhurtaCard.evening.label?.gu || article.muhurtaCard.evening.label}
                        </span>
                        <span className="text-sm font-bold text-[#008d7f] dark:text-[#52c7bb] mt-0.5 block">
                          {article.muhurtaCard.evening.time?.[lang] || article.muhurtaCard.evening.time?.gu || article.muhurtaCard.evening.time}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Subsection 2 */}
              {article.sections && article.sections[1] && (
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-[#d9a100] rounded-full shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {article.sections[1].heading[lang] || article.sections[1].heading.gu || article.sections[1].heading}
                    </h2>
                  </div>
                  {article.sections[1].paragraphs?.map((para, pIdx) => (
                    <p key={pIdx} className="text-muted-foreground leading-relaxed">
                      {para[lang] || para.gu || para}
                    </p>
                  ))}
                </div>
              )}

              {/* 5 SACRED RULES / RITUALS CHECKLIST CARD */}
              {article.rituals && article.rituals.title && (
                <div className="bg-[#f8f7f3] dark:bg-[#0d3833] border border-border/70 rounded-2xl p-5 sm:p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#d9a100]" />
                      <h3 className="font-bold text-base sm:text-lg text-foreground">
                        {article.rituals.title[lang] || article.rituals.title.gu || article.rituals.title}
                      </h3>
                    </div>
                    {article.rituals.badge && (
                      <span className="bg-[#008d7f]/15 text-[#008d7f] dark:text-[#52c7bb] text-xs font-bold px-2 py-0.5 rounded">
                        {article.rituals.badge[lang] || article.rituals.badge.gu || article.rituals.badge}
                      </span>
                    )}
                  </div>

                  {article.rituals.items && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {article.rituals.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-white dark:bg-[#0b332f] p-3.5 rounded-xl border border-border/40 shadow-2xs"
                        >
                          <CheckCircle className="h-4 w-4 text-[#008d7f] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-foreground/90 font-medium">
                            {item[lang] || item.gu || item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Subsection 3 (if exists) */}
              {article.sections && article.sections[2] && (
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-[#d9a100] rounded-full shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {article.sections[2].heading[lang] || article.sections[2].heading.gu || article.sections[2].heading}
                    </h2>
                  </div>
                  {article.sections[2].paragraphs?.map((para, pIdx) => (
                    <p key={pIdx} className="text-muted-foreground leading-relaxed">
                      {para[lang] || para.gu || para}
                    </p>
                  ))}
                </div>
              )}

              {/* LIVE SANKALP PUJA CTA CARD (As seen in Reference Image 3) */}
              {article.sankalpPuja && article.sankalpPuja.title && (
                <div className="bg-[#fff9e6] dark:bg-[#0e3934] border-2 border-[#fdc72d]/70 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col items-center text-center gap-3 my-2">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {article.sankalpPuja.title[lang] || article.sankalpPuja.title.gu || article.sankalpPuja.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                    {article.sankalpPuja.subtitle[lang] || article.sankalpPuja.subtitle.gu || article.sankalpPuja.subtitle}
                  </p>
                  <Button
                    onClick={() => showToast(lang === "gu" ? "પૂજા નોંધણી ફોર્મ ખોલવામાં આવી રહ્યું છે..." : "Opening Puja registration form...")}
                    className="bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-98"
                  >
                    {article.sankalpPuja.buttonText?.[lang] || article.sankalpPuja.buttonText?.gu || (lang === "gu" ? "સંકલ્પ નોંધાવો ●" : "Book Sankalp Puja ●")}
                  </Button>
                </div>
              )}

              {/* INTERACTIVE REACTIONS BAR */}
              <div className="mt-4 p-4 sm:p-5 bg-[#f7f6f2] dark:bg-[#0d3833] border border-border/60 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#d9a100]" />
                  {lang === "gu" ? "આ લેખ તમને કેવો લાગ્યો?" : "How did you find this article?"}
                </span>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleReactionClick("divine")}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                      userReaction === "divine"
                        ? "bg-[#fdc72d] text-[#0e3934] border-[#fdc72d] font-bold"
                        : "bg-white dark:bg-[#0b332f] border-border/60 hover:bg-[#eae8e1] dark:hover:bg-white/10 text-foreground"
                    }`}
                  >
                    <span>🙏 {lang === "gu" ? "દિવ્ય લાગ્યો" : "Divine"}</span>
                    <span className="font-bold">({formatNumber(reactions.divine)})</span>
                  </button>

                  <button
                    onClick={() => handleReactionClick("insightful")}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                      userReaction === "insightful"
                        ? "bg-[#fdc72d] text-[#0e3934] border-[#fdc72d] font-bold"
                        : "bg-white dark:bg-[#0b332f] border-border/60 hover:bg-[#eae8e1] dark:hover:bg-white/10 text-foreground"
                    }`}
                  >
                    <span>📖 {lang === "gu" ? "જ્ઞાનવર્ધક" : "Insightful"}</span>
                    <span className="font-bold">({formatNumber(reactions.insightful)})</span>
                  </button>

                  <button
                    onClick={() => handleReactionClick("wonderful")}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                      userReaction === "wonderful"
                        ? "bg-[#fdc72d] text-[#0e3934] border-[#fdc72d] font-bold"
                        : "bg-white dark:bg-[#0b332f] border-border/60 hover:bg-[#eae8e1] dark:hover:bg-white/10 text-foreground"
                    }`}
                  >
                    <span>❤️ {lang === "gu" ? "અદ્ભુત" : "Wonderful"}</span>
                    <span className="font-bold">({formatNumber(reactions.wonderful)})</span>
                  </button>
                </div>
              </div>

              {/* Bottom Family Share Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f8f7f3] dark:bg-[#0d3833] border border-border/60 p-3 sm:p-3.5 rounded-xl gap-2.5">
                <span className="text-xs sm:text-sm text-muted-foreground font-medium text-center sm:text-left">
                  {lang === "gu" ? "લેખ ગમ્યો હોય તો પરિવાર અને મિત્રો સાથે શેર કરો:" : "Enjoyed the article? Share with family & friends:"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareWhatsApp}
                    className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={handleShareTelegram}
                    className="px-3 py-1.5 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Telegram</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 bg-white dark:bg-[#0b332f] border border-border/70 hover:bg-muted text-foreground rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedLink ? (lang === "gu" ? "કૉપિ થઈ!" : "Copied!") : (lang === "gu" ? "લિંક કૉપિ" : "Copy Link")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AUTHOR COMPREHENSIVE BIO CARD */}
            <div className="bg-[#f8f7f3] dark:bg-[#0d3833] border border-border/70 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 mt-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-[#008d7f]/20 shadow-sm shrink-0">
                <Image
                  src={article.author.image}
                  alt={article.author.name[lang]}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 text-center sm:text-left flex-1">
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-foreground">
                    {article.author?.name?.[lang] || article.author?.name?.gu || article.author?.name || "ડૉ. વિશાલ મોદી"}
                  </h3>
                  <span className="text-xs sm:text-sm text-[#008d7f] dark:text-[#52c7bb] font-bold">
                    {lang === "gu" ? "મુખ્ય સંપાદક અને જ્યોતિષાચાર્ય • The Astro Code" : "Chief Editor & Vedic Astrologer • The Astro Code"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {article.author?.bio?.[lang] || article.author?.bio?.gu || article.author?.bio || (lang === "gu" ? "વૈદિક જ્યોતિષ, અંકશાસ્ત્ર, વાસ્તુ અને પૌરાણિક સંશોધનમાં ૨૨+ વર્ષનો અનુભવ. પ્રાચીન આધ્યાત્મિક જ્ઞાનને સરળ અને વૈજ્ઞાનિક રીતે લોકભોગ્ય બનાવવાનો અવિરત પ્રયાસ." : "Over 22+ years of expertise in Vedic astrology, numerology, Vastu and sacred Puranic research.")}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 flex-wrap">
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    size="sm"
                    className="text-xs font-bold rounded-lg border-border/80"
                  >
                    {lang === "gu" ? "લેખકના અન્ય આર્ટિકલ્સ" : "More by Author"}
                  </Button>
                  <Button
                    onClick={() => window.open(data.config.founder.whatsappUrl, "_blank")}
                    size="sm"
                    className="bg-[#008d7f] hover:bg-[#007468] text-white text-xs font-bold rounded-lg"
                  >
                    <MessageCircle className="h-3.5 w-3.5 mr-1" />
                    {lang === "gu" ? "પરામર્શ માટે સંપર્ક કરો" : "Contact for Consultation"}
                  </Button>
                </div>
              </div>
            </div>

            {/* RELATED ARTICLES SECTION */}
            <section className="flex flex-col gap-4 pt-6 border-t border-border/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#d9a100]" />
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {lang === "gu" ? "સંબંધિત ધાર્મિક લેખો" : "Related Spiritual Articles"}
                  </h2>
                </div>
                <Link
                  href="/"
                  className="text-xs sm:text-sm font-bold text-[#008d7f] dark:text-[#52c7bb] hover:underline flex items-center gap-1"
                >
                  {lang === "gu" ? "બધા જુઓ" : "View All"}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* 3 Related Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedStories.map((story) => (
                  <Card
                    key={story.id}
                    onClick={() => router.push(`/article/${story.id}`)}
                    className="pt-0 group overflow-hidden rounded-2xl border-border/60 hover:border-[#fdc72d]/70 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between bg-card"
                  >
                    <div className="relative h-40 overflow-hidden bg-muted">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 bg-[#fdc72d] text-[#0e3934] text-xs font-bold px-2 py-0.5 rounded shadow-xs">
                        {story.tag}
                      </span>
                    </div>
                    <CardContent className="flex flex-col justify-between flex-1 gap-2">
                      <h3 className="font-bold text-sm text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors line-clamp-2 leading-snug">
                        {story.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                        <span>{story.date}</span>
                        <span className="text-[#008d7f] font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                          {lang === "gu" ? "વાંચો →" : "Read →"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </article>

          {/* RIGHT: 30% STICKY INFORMATIVE SIDEBAR (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-[128px]">
            {/* WIDGET 1: SOCIAL CONNECT COUNTERS */}
            <div className="bg-[#f8f7f3] dark:bg-[#0d3833] border border-border/70 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#d9a100]" />
                  {lang === "gu" ? "જોડાયેલા રહો" : "Stay Connected"}
                </span>
                <span className="text-xs text-[#008d7f] dark:text-[#52c7bb] font-bold">
                  {lang === "gu" ? "૫૦,૦૦૦+ સભ્યો" : "50,000+ Members"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Link
                  href="#"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white dark:bg-[#0b332f] border border-border/50 hover:border-[#1877F2]/50 transition-colors text-center"
                >
                  <span className="font-bold text-xs text-[#1877F2]">Facebook</span>
                  <span className="text-xs font-bold text-foreground mt-0.5">૨૮K</span>
                  <span className="text-xs text-muted-foreground">{lang === "gu" ? "ફોલોઅર્સ" : "Fans"}</span>
                </Link>
                <Link
                  href="#"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white dark:bg-[#0b332f] border border-border/50 hover:border-[#FF0000]/50 transition-colors text-center"
                >
                  <span className="font-bold text-xs text-[#FF0000]">YouTube</span>
                  <span className="text-xs font-bold text-foreground mt-0.5">૧૫K</span>
                  <span className="text-xs text-muted-foreground">{lang === "gu" ? "સબસ્ક્રાઇબર" : "Subs"}</span>
                </Link>
                <Link
                  href="https://wa.me/919825000000"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white dark:bg-[#0b332f] border border-border/50 hover:border-[#25D366]/50 transition-colors text-center"
                >
                  <span className="font-bold text-xs text-[#25D366]">WhatsApp</span>
                  <span className="text-xs font-bold text-foreground mt-0.5">૪૨K</span>
                  <span className="text-xs text-muted-foreground">{lang === "gu" ? "સભ્યો" : "Members"}</span>
                </Link>
              </div>
            </div>

            {/* WIDGET 2: TODAY'S PANCHANG WIDGET */}
            <div className="bg-[#f8f7f3] dark:bg-[#0d3833] border border-border/70 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-foreground">
                    {data.panchang.widgetTitle}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {data.panchang.samvatTitle}
                  </span>
                </div>
                {/* Circular Sun Indicator Icon */}
                <div className="w-10 h-10 rounded-full bg-[#fdc72d]/20 border border-[#fdc72d] flex items-center justify-center text-[#d9a100]">
                  <Sun className="h-5 w-5" />
                </div>
              </div>

              {/* Panchang Rows */}
              <div className="space-y-1.5 text-xs">
                {data.panchang.rows.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-1.5 px-2.5 rounded-lg bg-white dark:bg-[#0b332f] border border-border/40"
                  >
                    <span className="text-muted-foreground">{row.label}:</span>
                    <span className={`font-semibold ${row.isAlert ? "text-destructive" : row.isAuspicious ? "text-[#008d7f] dark:text-[#52c7bb]" : "text-foreground"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/"
                className="w-full text-center py-2 rounded-xl bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] font-bold text-xs hover:bg-[#fdc72d]/25 transition-colors flex items-center justify-center gap-1"
              >
                {data.panchang.buttonText}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* WIDGET 3: 1-ON-1 ASTROLOGICAL CONSULTATION CTA CARD */}
            <div className="relative bg-gradient-to-br from-[#00685d] via-[#005a50] to-[#004d44] text-white rounded-3xl p-5 sm:p-6 shadow-xl ring-1 ring-[#fdc72d]/20 overflow-hidden flex flex-col gap-4">
              {/* Decorative golden glow + yantra ring */}
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-[#fdc72d]/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-[#008d7f]/20 blur-3xl" />
              <Sparkles aria-hidden className="pointer-events-none absolute top-4 right-4 h-16 w-16 text-[#fdc72d]/10" />

              <div className="relative flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#fdc72d] text-[#0e3934] text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                  <Sparkles className="h-3 w-3" />
                  {lang === "gu" ? "વન-ટુ-વન માર્ગદર્શન" : "1-on-1 Guidance"}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {lang === "gu" ? "ઉપલબ્ધ" : "Available"}
                </span>
              </div>

              <div className="relative flex flex-col gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-[#fdc72d] leading-snug">
                  {lang === "gu" ? "જીવનની સમસ્યાઓનું જ્યોતિષીય સમાધાન મેળવો" : "Get Vedic Astrological Solutions for Life Challenges"}
                </h3>
                <p className="text-xs sm:text-[13px] text-white/75 leading-relaxed">
                  {lang === "gu"
                    ? "ડૉ. વિશાલ મોદી સાથે જન્મકુંડળી વિશ્લેષણ, કારકિર્દી, લગ્ન અને વ્યવસાય માટે વ્યક્તિગત પરામર્શ મેળવો."
                    : "Book personalized Kundali reading for career, marriage, health and business with Dr. Vishal Modi."}
                </p>
              </div>

              <ul className="relative flex flex-col gap-1.5 rounded-2xl bg-white/5 border border-white/10 p-3">
                {(lang === "gu"
                  ? ["જન્મકુંડળી અને ગ્રહ દોષ વિશ્લેષણ", "કારકિર્દી, લગ્ન અને આરોગ્ય માર્ગદર્શન", "સરળ ઉપાય અને રત્ન સલાહ"]
                  : ["Kundali & planetary dosha analysis", "Career, marriage & health guidance", "Practical remedies & gemstone advice"]
                ).map((point) => (
                  <li key={point} className="flex items-start gap-2 text-xs text-white/85">
                    <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#fdc72d]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="relative flex flex-col gap-2.5">
                <Button
                  onClick={() => router.push("/contact-us")}
                  className="group w-full h-11 bg-gradient-to-r from-[#fdc72d] to-[#f0b400] hover:from-[#ffd24d] hover:to-[#fdc72d] text-[#0e3934] font-extrabold text-sm rounded-xl shadow-[0_6px_20px_-6px_rgba(253,199,45,0.6)] transition-all"
                >
                  <Award className="h-4 w-4 mr-1.5" />
                  {data.consultation.bookButton}
                  <ChevronRight className="h-4 w-4 ml-auto transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  onClick={() => window.open(data.config.founder.whatsappUrl, "_blank")}
                  className="w-full h-11 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-xl shadow-[0_6px_20px_-8px_rgba(37,211,102,0.7)] transition-all"
                >
                  <MessageCircle className="h-4 w-4 mr-1.5" />
                  {data.consultation.whatsappButton}
                </Button>
              </div>

              <div className="relative flex items-center justify-center gap-1.5 text-xs text-white/55">
                <ShieldCheck className="h-3.5 w-3.5 text-[#fdc72d]/80" />
                {lang === "gu" ? "૧૦૦% ગોપનીય • પ્રમાણિત જ્યોતિષાચાર્ય" : "100% confidential • Verified astrologer"}
              </div>
            </div>

            {/* WIDGET 4: MYSHOP SPIRITUAL STORE MINI SHOWCASE */}
            <div className="bg-[#f8f7f3] dark:bg-[#0d3833] border border-border/70 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Store className="h-4 w-4 text-[#008d7f]" />
                  <h4 className="font-bold text-sm text-foreground">
                    {lang === "gu" ? "MYSHOP આધ્યાત્મિક સ્ટોર" : "MYSHOP Spiritual Store"}
                  </h4>
                </div>
                <span className="text-xs text-[#008d7f] font-bold">
                  {lang === "gu" ? "૧૦૦% શુદ્ધ" : "100% Pure"}
                </span>
              </div>

              {/* 3 Products */}
              <div className="flex flex-col gap-2">
                {data.products.slice(0, 3).map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-[#0b332f] border border-border/40 hover:border-[#fdc72d]/60 transition-colors group cursor-pointer"
                    onClick={() => router.push(`/myshop/product/${prod.id}`)}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-bold text-xs text-foreground truncate group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors">
                        {prod.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {prod.subtitle}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-bold text-xs text-[#008d7f] dark:text-[#52c7bb]">
                          {prod.price}
                        </span>
                        <span className="text-xs text-muted-foreground/60 line-through">
                          {prod.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/myshop"
                className="w-full text-center py-2 rounded-xl bg-[#008d7f] hover:bg-[#007468] text-white font-bold text-xs transition-colors shadow-xs"
              >
                {lang === "gu" ? "તમામ પૂજા સામગ્રી જુઓ →" : "View All Spiritual Products →"}
              </Link>
            </div>

            {/* WIDGET 5: MOST POPULAR ARTICLES (વાંચકોની પસંદ 1-3) */}
            <div className="bg-[#f8f7f3] dark:bg-[#0d3833] border border-border/70 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-[#d9a100]" />
                <h4 className="font-bold text-sm text-foreground">
                  {lang === "gu" ? "વાંચકોની પસંદ (Most Popular)" : "Readers' Choice (Most Popular)"}
                </h4>
              </div>

              <div className="flex flex-col gap-2">
                {data.popular.map((item, idx) => {
                  const targetSlug = idx === 0 ? "hero-1" : idx === 1 ? "jyotirling-1" : "hero-2"
                  return (
                    <div
                      key={idx}
                      onClick={() => router.push(`/article/${targetSlug}`)}
                      className="flex items-start gap-2.5 p-2 rounded-xl bg-white dark:bg-[#0b332f] border border-border/40 hover:border-[#fdc72d]/60 transition-colors group cursor-pointer"
                    >
                    <span className="w-5 h-5 rounded-full bg-[#fdc72d] text-[#0e3934] font-bold text-center leading-5 shrink-0 text-xs">
                      {item.rank}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <h5 className="font-bold text-xs text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors line-clamp-2">
                        {item.title}
                      </h5>
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {item.reads}
                      </span>
                    </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* 4. FOOTER */}
      <AstroFooter
        config={data.config}
        navLinks={data.navLinks}
        categories={data.categories}
        footer={data.footer}
        lang={lang}
      />
    </div>
  )
}

export default function ArticleDetailClient({ initialId, initialArticle }) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-foreground gap-3">
          <div className="w-10 h-10 border-4 border-[#fdc72d] border-t-transparent rounded-full animate-spin" />
          <span className="font-bold text-sm text-muted-foreground">આર્ટિકલ લોડ થઈ રહ્યો છે...</span>
        </div>
      }
    >
      <ArticleDetailContent initialId={initialId} initialArticle={initialArticle} />
    </React.Suspense>
  )
}
