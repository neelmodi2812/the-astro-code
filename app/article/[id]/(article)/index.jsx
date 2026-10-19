"use client"

import * as React from "react"
import Link from "next/link"
import { SafeImage } from "@/components/ui/safe-image"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Calendar,
  Clock,
  CheckCircle,
  Sparkles,
  Sun,
  ChevronRight,
  Quote,
  MessageCircle,
  Store,
  TrendingUp,
  Users,
  Copy,
  Check
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { getAstroData, SITE_CONTACT, getWhatsAppUrl } from "@/lib/data/astro-data"
import { getArticleById } from "@/lib/data/article-data"
import { useLanguage } from "@/components/language-provider"
import { formatDigits } from "@/lib/utils"

function ArticleDetailContent({ initialId }) {
  const params = useParams()
  const router = useRouter()
  const articleId = params?.id || initialId || "hero-1"

  const { lang, setLang } = useLanguage()
  const [data, setData] = React.useState(() => getAstroData(lang))
  const [article, setArticle] = React.useState(() => getArticleById(articleId))

  React.useEffect(() => {
    setData(getAstroData(lang))
  }, [lang])

  // Share menu state
  const [shareMenuOpen, setShareMenuOpen] = React.useState(false)
  const shareMenuRef = React.useRef(null)

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = React.useState(false)

  // Link copied state
  const [copiedLink, setCopiedLink] = React.useState(false)

  // Scroll reading progress indicator
  const [readingProgress, setReadingProgress] = React.useState(0)

  // Live Sankalp Puja Inquiry Modal State
  const [sankalpModalOpen, setSankalpModalOpen] = React.useState(false)
  const [sankalpForm, setSankalpForm] = React.useState({
    devoteeName: "",
    gotra: "",
    sankalpPurpose: "મનોકામના પૂર્તિ & સંકટ નિવારણ",
    phone: "",
    city: ""
  })

  const showToast = (msg, type = "success") => {
    if (type === "info") toast.info(msg)
    else if (type === "error") toast.error(msg)
    else toast.success(msg)
  }

  // Safe back navigation handler with fallback to home ('/')
  // Prevents router.back() from navigating outside the site if arrived directly from Google Search or social media
  const handleSafeBack = React.useCallback(() => {
    if (typeof window === "undefined") {
      router.push("/")
      return
    }

    try {
      const referrer = document.referrer
      const isInternalReferrer =
        Boolean(referrer) &&
        (referrer.startsWith(window.location.origin) ||
          referrer.includes(window.location.host))

      // In Next.js client-side navigations, window.history.state?.idx indicates client history depth
      const historyIndex = window.history.state?.idx
      const hasClientHistory = typeof historyIndex === "number" && historyIndex > 0

      // If user came from within the site or navigated internally, go back
      if (isInternalReferrer || hasClientHistory) {
        router.back()
      } else {
        // Fallback to homepage if direct entry (search engine, social media, external link)
        router.push("/")
      }
    } catch {
      router.push("/")
    }
  }, [router])

  const handleSankalpSubmit = (e) => {
    e.preventDefault()
    if (!sankalpForm.devoteeName.trim()) {
      showToast(lang === "gu" ? "કૃપા કરીને યજમાન / ભાવિકનું નામ દાખલ કરો." : "Please enter the Devotee name.", "error")
      return
    }
    if (!sankalpForm.phone.trim()) {
      showToast(lang === "gu" ? "કૃપા કરીને વોટ્સએપ નંબર દાખલ કરો." : "Please enter your WhatsApp contact number.", "error")
      return
    }

    const articleTitle = article?.title?.[lang] || article?.title?.gu || article?.title || "શ્રી બહુચર માં દર્શન"

    const message = lang === "gu"
      ? `*પ્રણામ The Astro Code (ડૉ. વિશાલ મોદી),*\nહું લેખ *${articleTitle}* વાંચીને *લાઈવ સંકલ્પ પૂજા* માટે નોંધણી કરાવવા માંગુ છું:\n\n🙏 *યજમાનનું નામ:* ${sankalpForm.devoteeName}\n📿 *ગોત્ર:* ${sankalpForm.gotra || "કશ્યપ ગોત્ર"}\n🌺 *સંકલ્પ હેતુ:* ${sankalpForm.sankalpPurpose}\n📍 *શહેર:* ${sankalpForm.city || "અમદાવાદ"}\n📞 *સંપર્ક:* ${sankalpForm.phone}\n\nકૃપા કરીને પૂજા મુહૂર્ત અને સંકલ્પ સમયની વિગત જણાવશો. અસ્તુ!`
      : `*Greetings The Astro Code (Dr. Vishal Modi),*\nI would like to register for *Live Sankalp Puja* referenced from the article *${articleTitle}*:\n\n🙏 *Devotee Name:* ${sankalpForm.devoteeName}\n📿 *Gotra:* ${sankalpForm.gotra || "Kashyap"}\n🌺 *Purpose:* ${sankalpForm.sankalpPurpose}\n📍 *City:* ${sankalpForm.city || "Not specified"}\n📞 *Contact:* ${sankalpForm.phone}\n\nPlease share the auspicious Puja Muhurta and registration confirmation. Thank you!`

    showToast(
      lang === "gu"
        ? "આપનો સંકલ્પ સ્વીકારવામાં આવ્યો છે! WhatsApp પર પૂજા વિગતો મોકલાઈ રહી છે..."
        : "Sankalp registration recorded! Redirecting to WhatsApp for confirmation...",
      "success"
    )

    setSankalpModalOpen(false)
    window.open(getWhatsAppUrl(message), "_blank")
  }

  // Handle language switch
  const handleToggleLang = (newLang) => {
    setLang(newLang)
    toast.info(newLang === "en" ? "Language switched to English" : "ભાષા બદલાઈ: ગુજરાતી")
  }

  // Combine article audio summary and sections for complete audio narration
  const fullArticleAudioText = React.useMemo(() => {
    const audioIntro = article?.audioText?.[lang] || ""
    const sectionsText = article?.sections
      ?.map((sec) => `${sec.heading?.[lang] || ""}. ${sec.paragraphs?.map((p) => p[lang] || "").join(" ")}`)
      .join(" ") || ""
    return `${audioIntro} ${sectionsText}`.trim()
  }, [article, lang])



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
    const loaded = getArticleById(articleId)
    setArticle(loaded)
  }, [articleId])

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
      } catch (err) {
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

  // Clean section title helper (removes raw numbers like "1. " or "૧. ")
  const formatHeading = React.useCallback(
    (headingObj) => {
      if (!headingObj) return ""
      const text =
        headingObj[lang] ||
        headingObj.gu ||
        headingObj.en ||
        (typeof headingObj === "string" ? headingObj : "")
      return text.replace(/^([0-9]+|[૦-૯]+)\.\s*/, "").trim()
    },
    [lang]
  )

  // Related stories filtered to exclude current article
  const relatedStories = React.useMemo(() => {
    return data.heroStories.filter((s) => s.id !== articleId).slice(0, 3)
  }, [data.heroStories, articleId])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      {/* Dynamic Scroll Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fdc72d] via-[#d9a100] to-[#008d7f] z-50 transition-[width] duration-150 ease-out pointer-events-none"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* 1. TOP GLOBAL HEADER */}
      <AstroHeader
        config={data.config}
        topBar={data.topBar}
        navLinks={data.navLinks}
        activeCategory="bahuchar-maa-rajwadu"
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* 2. MAIN CONTENT CONTAINER */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {/* Top Breadcrumb */}
        <div className="mb-6">
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
                <BreadcrumbLink asChild>
                  <Link href="/categories" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors font-medium text-muted-foreground">
                    {article.category[lang]}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  {article.title[lang]}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
              <div className="bg-[#f7f6f2] dark:bg-[#1a1b18] border border-border/60 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                {/* Author Avatar & Name */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="size-12 ring-2 ring-[#fdc72d] shadow-xs">
                      <AvatarImage
                        src={article.author?.image || "/images/author-dr-vishal-modi.jpg"}
                        alt={article.author?.name?.[lang] || "Dr. Vishal Modi"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[#fdc72d] text-[#1b1c1a] font-bold">
                        {article.author.name[lang]?.substring(0, 2) || "VM"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm sm:text-base text-foreground leading-tight">
                        {article.author?.name?.[lang] || article.author?.name?.gu || article.author?.name || "ડૉ. વિશાલ મોદી"}
                      </span>
                      <span className="text-[11px] text-[#008d7f] dark:text-[#52c7bb] font-semibold flex items-center gap-0.5">
                        <CheckCircle className="h-3 w-3 inline text-[#008d7f] dark:text-[#52c7bb]" />
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
                      <Calendar className="h-3.5 w-3.5 text-[#008d7f] dark:text-[#52c7bb]" />
                      {article.date?.[lang] || article.date?.gu || article.date || (lang === "gu" ? "૧૨ એપ્રિલ, ૨૦૨૫" : "April 12, 2025")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#008d7f] dark:text-[#52c7bb]" />
                      {article.readTime?.[lang] || article.readTime?.gu || article.readTime || (lang === "gu" ? "૫ મિનિટ વાંચન" : "5 min read")}
                    </span>
                  </div>

                  {/* Share & Bookmark Options with shadcn DropdownMenu */}
                  <div className="relative">
                    <DropdownMenu open={shareMenuOpen} onOpenChange={setShareMenuOpen}>
                      <div className="flex items-center gap-1 bg-white dark:bg-[#121310] border border-border/70 p-1 rounded-xl shadow-xs">
                        {/* Main Share Button Trigger */}
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
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

                      <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl bg-card dark:bg-[#1a1b18] shadow-xl">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="px-2.5 py-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
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
              <SafeImage
                src={article.heroImage}
                fallbackSrc="/images/bahucharaji-temple.jpg"
                alt={article.heroImageAlt || article.title[lang]}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-102"
                priority
              />

              {/* Dark Gradient Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

              {/* Floating Back Navigation Button Overlaid on Top of Image */}
              <div className="absolute top-4 left-4 pointer-events-none">
                {/* Back Button with Safe Fallback */}
                <button
                  type="button"
                  onClick={handleSafeBack}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  title={lang === "gu" ? "પાછા જાઓ (મુખ્ય પૃષ્ઠ / અગાઉનું પેજ)" : "Go Back (Home / Previous Page)"}
                  aria-label={lang === "gu" ? "પાછા જાઓ" : "Go Back"}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>

              {/* Bottom Caption & Suvarna Darshan Badge */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white flex items-end justify-between gap-3">
                <figcaption className="text-xs sm:text-sm text-white/90 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#fdc72d] shrink-0" />
                  <span className="line-clamp-2">{article.heroCaption[lang]}</span>
                </figcaption>
                <span className="bg-[#fdc72d] text-[#1b1c1a] text-xs font-bold px-2.5 py-1 rounded-md shadow shrink-0">
                  {article.heroBadge[lang]}
                </span>
              </div>
            </figure>

            {/* AUDIO LISTENING PLAYER COMPONENT (Dynamic Duration from Article Word Count) */}
            <AudioArticlePlayer
              articleText={fullArticleAudioText || article.audioText?.[lang] || ""}
              lang={lang}
              title={lang === "gu" ? "આ લેખ સાંભળો" : "Listen to this Article"}
            />

            {/* ARTICLE BODY CONTENT */}
            <div className="flex flex-col gap-6 text-foreground font-sans text-base sm:text-lg leading-relaxed">
              {/* Lead Paragraph with vertical accent (decorative accent card in Gujarati, drop-cap in English) */}
              <div className="relative pl-4 sm:pl-5 py-3 pr-4 rounded-r-2xl bg-gradient-to-r from-[#fdc72d]/10 via-[#fdc72d]/5 to-transparent dark:from-[#fdc72d]/15 dark:via-transparent border-l-4 border-[#d9a100] shadow-2xs overflow-hidden">
                {lang === "gu" ? (
                  <p className="font-medium text-foreground text-base sm:text-lg leading-relaxed">
                    {article?.leadParagraph?.gu ||
                      "ગુજરાતની પરમ પવિત્ર શક્તિપીઠો પૈકીનું એક એવું ચુંવાળ પંથકમાં આવેલું શ્રી બહુચરાજી તીર્થધામ એટલે લાખો ભાવિક ભક્તોની આસ્થાનું કેન્દ્ર. ચૈત્રી સુદ પૂનમ એ મા બહુચરનો પ્રાગટ્ય દિવસ ગણાય છે. આ દિવસે કરવામાં આવતી સાધના, ગરબા પાઠ અને માઁ ના દર્શનથી અસંભવ કાર્યો પણ સુલભ બને છે."}
                  </p>
                ) : (
                  <p className="font-medium text-foreground text-base sm:text-lg leading-relaxed">
                    <span className="text-4xl sm:text-5xl font-serif font-extrabold text-[#d9a100] dark:text-[#fdc72d] float-left mr-2.5 leading-none select-none mt-0.5">
                      {(
                        article?.leadParagraph?.en ||
                        "The sacred abode of Sanatana Dharma radiates infinite peace and divine consciousness. According to ancient Vedic traditions, worshipping on auspicious tithis dissolves negative astrological afflictions and fulfills righteous aspirations of the heart."
                      ).charAt(0)}
                    </span>
                    {(
                      article?.leadParagraph?.en ||
                      "The sacred abode of Sanatana Dharma radiates infinite peace and divine consciousness. According to ancient Vedic traditions, worshipping on auspicious tithis dissolves negative astrological afflictions and fulfills righteous aspirations of the heart."
                    ).slice(1)}
                  </p>
                )}
              </div>

              {/* Subsection 1 */}
              {article.sections && article.sections[0] && (
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-[#d9a100] rounded-full shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {formatHeading(article.sections[0].heading)}
                    </h2>
                  </div>
                  {article.sections[0].paragraphs?.map((para, pIdx) => (
                    <p key={pIdx} className="text-muted-foreground leading-relaxed">
                      {para[lang] || para.gu || para}
                    </p>
                  ))}
                </div>
              )}

              {/* HIGHLIGHT CALLOUT QUOTE */}
              {article.quote && article.quote.text && (
                <div className="my-2 p-5 sm:p-6 bg-[#fff9e6] dark:bg-[#252216] border-l-4 border-[#d9a100] rounded-2xl shadow-xs flex items-start gap-4">
                  <Quote className="h-8 w-8 text-[#008d7f] shrink-0 rotate-180" />
                  <div className="flex flex-col gap-1.5">
                    <blockquote className="text-base sm:text-lg font-bold text-[#1b1c1a] dark:text-[#f8f7f4] italic leading-relaxed">
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
                <div className="bg-[#f7f6f2] dark:bg-[#1a1b18] border border-border/70 rounded-2xl p-5 shadow-xs flex flex-col gap-3">
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
                      <div className="p-3 bg-white dark:bg-[#121310] rounded-xl border border-border/50">
                        <span className="text-xs text-muted-foreground block font-medium">
                          {article.muhurtaCard.morning.label?.[lang] || article.muhurtaCard.morning.label?.gu || article.muhurtaCard.morning.label}
                        </span>
                        <span className="text-sm font-bold text-foreground mt-0.5 block">
                          {article.muhurtaCard.morning.time?.[lang] || article.muhurtaCard.morning.time?.gu || article.muhurtaCard.morning.time}
                        </span>
                      </div>
                      <div className="p-3 bg-white dark:bg-[#121310] rounded-xl border border-border/50">
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
                      {formatHeading(article.sections[1].heading)}
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
                <div className="bg-[#f8f7f3] dark:bg-[#1a1b18] border border-border/70 rounded-2xl p-5 sm:p-6 shadow-xs">
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
                          className="flex items-start gap-3 bg-white dark:bg-[#121310] p-3.5 rounded-xl border border-border/40 shadow-2xs"
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
                      {formatHeading(article.sections[2].heading)}
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
                <div className="bg-[#fff9e6] dark:bg-[#201d14] border-2 border-[#fdc72d]/70 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col items-center text-center gap-3 my-2">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {article.sankalpPuja.title[lang] || article.sankalpPuja.title.gu || article.sankalpPuja.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                    {article.sankalpPuja.subtitle[lang] || article.sankalpPuja.subtitle.gu || article.sankalpPuja.subtitle}
                  </p>
                  <Button
                    onClick={() => setSankalpModalOpen(true)}
                    className="bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>
                      {article.sankalpPuja.buttonText?.[lang]?.replace("●", "").trim() ||
                        article.sankalpPuja.buttonText?.gu?.replace("●", "").trim() ||
                        (lang === "gu" ? "સંકલ્પ નોંધાવો" : "Book Sankalp Puja")}
                    </span>
                  </Button>
                </div>
              )}

            </div>

            {/* AUTHOR COMPREHENSIVE BIO CARD */}
            <div className="bg-[#f8f7f3] dark:bg-[#1a1b18] border border-border/70 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 mt-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-[#008d7f]/20 shadow-sm shrink-0">
                <SafeImage
                  src={article.author?.image || "/images/author-dr-vishal-modi.jpg"}
                  fallbackSrc="/images/author-dr-vishal-modi.jpg"
                  alt={article.author?.name?.[lang] || "Dr. Vishal Modi"}
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
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-xs font-bold rounded-lg border-border/80 hover:bg-[#fdc72d]/10 hover:border-[#fdc72d]/60 transition-colors cursor-pointer"
                  >
                    <Link href="/about-us#publications">
                      {lang === "gu" ? "લેખકના અન્ય આર્ટિકલ્સ" : "More by Author"}
                    </Link>
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        getWhatsAppUrl(
                          lang === "gu"
                            ? "જય શ્રી કૃષ્ણ ડૉ. વિશાલ મોદી, મને જ્યોતિષ અને કુંડળી પરામર્શ માટે સમય આપશો."
                            : "Hello Dr. Vishal Modi, I would like to book a Vedic astrology consultation."
                        ),
                        "_blank"
                      )
                    }
                    size="sm"
                    className="bg-[#008d7f] hover:bg-[#007468] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
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
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {lang === "gu" ? "સંબંધિત ધાર્મિક લેખો" : "Related Spiritual Articles"}
                </h2>
                <Link
                  href="/"
                  className="text-xs sm:text-sm font-bold text-[#008d7f] dark:text-[#52c7bb] hover:underline flex items-center gap-1"
                >
                  {lang === "gu" ? "બધા જુઓ" : "View All"}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* 3 Related Cards Grid (Semantic Next.js <Link> Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/article/${story.id}`}
                    className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
                  >
                    <Card
                      className="pt-0 overflow-hidden rounded-2xl border-border/60 group-hover:border-[#fdc72d]/70 group-hover:shadow-lg transition-all flex flex-col justify-between bg-card h-full"
                    >
                      <div className="relative h-40 overflow-hidden bg-muted">
                        <SafeImage
                          src={story.image}
                          fallbackSrc="/images/bahucharaji-temple.jpg"
                          alt={story.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-2 left-2 bg-[#fdc72d] text-[#1b1c1a] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                          {story.tag}
                        </span>
                      </div>
                      <CardContent className="flex flex-col justify-between flex-1 gap-2">
                        <h3 className="font-bold text-sm text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors line-clamp-2 leading-snug">
                          {story.title}
                        </h3>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
                          <span>{story.date}</span>
                          <span className="text-[#008d7f] font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                            {lang === "gu" ? "વાંચો →" : "Read →"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          {/* RIGHT: INFORMATIVE SIDEBAR (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24 self-start">
            {/* WIDGET 1: SOCIAL CONNECT COUNTERS */}
            <div className="bg-[#f8f7f3] dark:bg-[#1a1b18] border border-border/70 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#d9a100]" />
                  {lang === "gu" ? "જોડાયેલા રહો" : "Stay Connected"}
                </span>
                <span className="text-[11px] text-[#008d7f] dark:text-[#52c7bb] font-bold bg-[#008d7f]/10 dark:bg-[#008d7f]/20 px-2 py-0.5 rounded-md">
                  {lang === "gu" ? "૮૫,૦૦૦+ સત્સંગી" : "85,000+ Community"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Link
                  href={SITE_CONTACT.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white dark:bg-[#121310] border border-border/50 hover:border-[#1877F2]/50 hover:shadow-xs transition-all text-center group"
                >
                  <div className="text-[#1877F2] mb-1 flex justify-center">
                    <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xs text-foreground group-hover:text-[#1877F2] transition-colors">{formatDigits("28K", lang)}</span>
                  <span className="text-[10px] text-muted-foreground">{lang === "gu" ? "ફોલોઅર્સ" : "Fans"}</span>
                </Link>
                <Link
                  href={SITE_CONTACT.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white dark:bg-[#121310] border border-border/50 hover:border-[#FF0000]/50 hover:shadow-xs transition-all text-center group"
                >
                  <div className="text-[#FF0000] mb-1 flex justify-center">
                    <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xs text-foreground group-hover:text-[#FF0000] transition-colors">{formatDigits("15K", lang)}</span>
                  <span className="text-[10px] text-muted-foreground">{lang === "gu" ? "સબસ્ક્રાઇબર" : "Subs"}</span>
                </Link>
                <Link
                  href={SITE_CONTACT.social.whatsappChannel}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white dark:bg-[#121310] border border-border/50 hover:border-[#25D366]/50 hover:shadow-xs transition-all text-center group"
                >
                  <div className="text-[#25D366] mb-1 flex justify-center">
                    <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-bold text-xs text-foreground group-hover:text-[#25D366] transition-colors">{formatDigits("42K", lang)}</span>
                  <span className="text-[10px] text-muted-foreground">{lang === "gu" ? "સભ્યો" : "Members"}</span>
                </Link>
              </div>
            </div>

            {/* WIDGET 2: TODAY'S PANCHANG WIDGET */}
            <div className="bg-[#f8f7f3] dark:bg-[#1a1b18] border border-border/70 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-[#d9a100]" />
                  <h4 className="font-bold text-sm text-foreground">
                    {data.panchang.widgetTitle}
                  </h4>
                </div>
                <span className="text-[11px] bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] px-2 py-0.5 rounded-md font-bold">
                  {lang === "gu" ? "આજનું પંચાંગ" : "Today"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-medium -mt-1 block">
                {data.panchang.samvatTitle}
              </span>

              {/* Panchang Rows */}
              <div className="space-y-1.5 text-xs">
                {data.panchang.rows.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-1.5 px-2.5 rounded-lg bg-white dark:bg-[#121310] border border-border/40"
                  >
                    <span className="text-muted-foreground">{row.label}:</span>
                    <span className={`font-semibold ${row.isAlert ? "text-destructive" : row.isAuspicious ? "text-[#008d7f] dark:text-[#52c7bb]" : "text-foreground"}`}>
                      {formatDigits(row.value, lang)}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/dainik-panchang"
                className="w-full text-center py-2 rounded-xl bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] font-bold text-xs hover:bg-[#fdc72d]/25 transition-colors flex items-center justify-center gap-1"
              >
                {data.panchang.buttonText}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* WIDGET 3: MYSHOP SPIRITUAL STORE MINI SHOWCASE */}
            <div className="bg-[#f8f7f3] dark:bg-[#1a1b18] border border-border/70 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Store className="h-4 w-4 text-[#008d7f]" />
                  <h4 className="font-bold text-sm text-foreground">
                    {lang === "gu" ? "MYSHOP આધ્યાત્મિક સ્ટોર" : "MYSHOP Spiritual Store"}
                  </h4>
                </div>
                <span className="text-[11px] text-[#008d7f] font-bold">
                  {lang === "gu" ? "૧૦૦% શુદ્ધ" : "100% Pure"}
                </span>
              </div>

              {/* 3 Products (Semantic Link Items) */}
              <div className="flex flex-col gap-2">
                {data.products.slice(0, 3).map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/myshop/product/${prod.id}`}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-[#121310] border border-border/40 hover:border-[#fdc72d]/60 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      <SafeImage
                        src={prod.image}
                        fallbackSrc="/images/sacred-vedic-hero.jpg"
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
                      <span className="text-[10px] text-muted-foreground truncate">
                        {prod.subtitle}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-bold text-xs text-[#008d7f] dark:text-[#52c7bb]">
                          {prod.price}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 line-through">
                          {prod.originalPrice}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/myshop"
                className="w-full text-center py-2 rounded-xl bg-[#008d7f] hover:bg-[#007468] text-white font-bold text-xs transition-colors shadow-xs"
              >
                {lang === "gu" ? "તમામ પૂજા સામગ્રી જુઓ →" : "View All Spiritual Products →"}
              </Link>
            </div>

            {/* WIDGET 4: MOST POPULAR ARTICLES (વાંચકોની પસંદ 1-3) */}
            <div className="bg-[#f8f7f3] dark:bg-[#1a1b18] border border-border/70 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-[#d9a100]" />
                <h4 className="font-bold text-sm text-foreground">
                  {lang === "gu" ? "વાંચકોની પસંદ" : "Readers' Choice - Most Popular"}
                </h4>
              </div>

              <div className="flex flex-col gap-2">
                {data.popular.map((item, idx) => {
                  const targetSlug = idx === 0 ? "hero-1" : idx === 1 ? "jyotirling-1" : "hero-2"
                  return (
                    <Link
                      key={idx}
                      href={`/article/${targetSlug}`}
                      className="flex items-start gap-2.5 p-2 rounded-xl bg-white dark:bg-[#121310] border border-border/40 hover:border-[#fdc72d]/60 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#fdc72d] text-[#1b1c1a] font-bold text-center leading-5 shrink-0 text-[11px]">
                        {item.rank}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <h5 className="font-bold text-xs text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors line-clamp-2">
                          {item.title}
                        </h5>
                        <span className="text-[10px] text-muted-foreground mt-0.5">
                          {item.reads}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* LIVE SANKALP PUJA INQUIRY MODAL */}
      <Dialog open={sankalpModalOpen} onOpenChange={setSankalpModalOpen}>
        <DialogContent className="max-w-md w-[92vw] p-5 sm:p-6 rounded-2xl bg-card border border-[#fdc72d]/50 shadow-2xl">
          <DialogHeader className="text-left space-y-1.5 pb-2 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d]">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] tracking-wider uppercase">
                {lang === "gu" ? "વૈદિક સંકલ્પ પૂજા નોંધણી" : "Vedic Sankalp Puja Registration"}
              </span>
            </div>
            <DialogTitle className="text-lg sm:text-xl font-bold text-foreground">
              {article.sankalpPuja?.title?.[lang] || article.sankalpPuja?.title?.gu || (lang === "gu" ? "લાઈવ સંકલ્પ પૂજા & આશીર્વાદ" : "Live Sankalp Puja & Blessings")}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              {lang === "gu"
                ? "તમારા ગોત્ર અને નામ અનુસાર પવિત્ર તિથિએ શાસ્ત્રોક્ત વિધિથી વિશેષ સંકલ્પ કરવામાં આવશે."
                : "A sacred Vedic Sankalp will be consecrated in your Gotra and family name on this auspicious Tithi."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSankalpSubmit} className="flex flex-col gap-3.5 py-2">
            {/* Devotee Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-foreground flex items-center justify-between">
                <span>{lang === "gu" ? "યજમાન / ભાવિકનું પૂરું નામ *" : "Devotee Full Name *"}</span>
                <span className="text-[10px] text-muted-foreground font-normal">{lang === "gu" ? "સંકલ્પ માટે" : "For Sankalp"}</span>
              </label>
              <Input
                type="text"
                required
                value={sankalpForm.devoteeName}
                onChange={(e) => setSankalpForm((prev) => ({ ...prev, devoteeName: e.target.value }))}
                placeholder={lang === "gu" ? "દા.ત. રમેશભાઈ પટેલ" : "e.g. Ramesh Patel"}
                className="h-10 text-sm rounded-xl bg-background border-border/70 focus:border-[#fdc72d]"
              />
            </div>

            {/* Gotra */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-foreground">
                  {lang === "gu" ? "ગોત્ર" : "Gotra"}
                </label>
                <Input
                  type="text"
                  value={sankalpForm.gotra}
                  onChange={(e) => setSankalpForm((prev) => ({ ...prev, gotra: e.target.value }))}
                  placeholder={lang === "gu" ? "દા.ત. કશ્યપ, ભારદ્વાજ" : "e.g. Kashyap, Bharadwaj"}
                  className="h-10 text-sm rounded-xl bg-background border-border/70 focus:border-[#fdc72d]"
                />
              </div>

              {/* City / Town */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-foreground">
                  {lang === "gu" ? "શહેર / ગામ" : "City / Native Town"}
                </label>
                <Input
                  type="text"
                  value={sankalpForm.city}
                  onChange={(e) => setSankalpForm((prev) => ({ ...prev, city: e.target.value }))}
                  placeholder={lang === "gu" ? "દા.ત. અમદાવાદ" : "e.g. Ahmedabad"}
                  className="h-10 text-sm rounded-xl bg-background border-border/70 focus:border-[#fdc72d]"
                />
              </div>
            </div>

            {/* Sankalp Purpose */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-foreground">
                {lang === "gu" ? "સંકલ્પ મનોકામના / હેતુ" : "Sankalp Intention / Purpose"}
              </label>
              <select
                value={sankalpForm.sankalpPurpose}
                onChange={(e) => setSankalpForm((prev) => ({ ...prev, sankalpPurpose: e.target.value }))}
                className="h-10 px-3 text-sm rounded-xl bg-background border border-border/70 text-foreground outline-none focus:border-[#fdc72d] transition-colors cursor-pointer"
              >
                {lang === "gu" ? (
                  <>
                    <option value="મનોકામના પૂર્તિ & સંકટ નિવારણ">મનોકામના પૂર્તિ & સંકટ નિવારણ</option>
                    <option value="દીર્ઘાયુષ્ય & સ્વાસ્થ્ય સુખાકારી">દીર્ઘાયુષ્ય & સ્વાસ્થ્ય સુખાકારી</option>
                    <option value="વ્યાપાર વૃદ્ધિ & લક્ષ્મી કૃપા">વ્યાપાર વૃદ્ધિ & લક્ષ્મી કૃપા</option>
                    <option value="નવગ્રહ દોષ & શનિ સાડાસાતી શાંતિ">નવગ્રહ દોષ & શનિ સાડાસાતી શાંતિ</option>
                    <option value="સંતાન સુખ & પારિવારિક શાંતિ">સંતાન સુખ & પારિવારિક શાંતિ</option>
                  </>
                ) : (
                  <>
                    <option value="Fulfillment of Wishes & Relief from Troubles">Fulfillment of Wishes & Relief from Troubles</option>
                    <option value="Good Health & Longevity">Good Health & Longevity</option>
                    <option value="Business Growth & Prosperity">Business Growth & Prosperity</option>
                    <option value="Planetary Affliction & Shani Shanti">Planetary Affliction & Shani Shanti</option>
                    <option value="Family Harmony & Progeny Blessings">Family Harmony & Progeny Blessings</option>
                  </>
                )}
              </select>
            </div>

            {/* WhatsApp Contact Number */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-foreground">
                {lang === "gu" ? "WhatsApp મોબાઇલ નંબર *" : "WhatsApp Mobile Number *"}
              </label>
              <Input
                type="tel"
                required
                value={sankalpForm.phone}
                onChange={(e) => setSankalpForm((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder={lang === "gu" ? "૯૮૨૫૦..." : "98250..."}
                className="h-10 text-sm rounded-xl bg-background border-border/70 focus:border-[#fdc72d]"
              />
              <span className="text-[10px] text-muted-foreground">
                {lang === "gu"
                  ? "પૂજા સમય અને દર્શન વિગતો આ નંબર પર WhatsApp કરવામાં આવશે."
                  : "Puja schedule and live darshan details will be sent to this WhatsApp number."}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-end gap-2 pt-2 border-t border-border/60">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSankalpModalOpen(false)}
                className="rounded-xl text-xs font-semibold cursor-pointer"
              >
                {lang === "gu" ? "રદ કરો" : "Cancel"}
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <MessageCircle className="h-4 w-4 text-[#1b1c1a]" />
                <span>{lang === "gu" ? "સંકલ્પ નોંધાવો" : "Confirm Sankalp"}</span>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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

export default function ArticleDetailClient({ initialId }) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-foreground gap-3">
          <div className="w-10 h-10 border-4 border-[#fdc72d] border-t-transparent rounded-full animate-spin" />
          <span className="font-bold text-sm text-muted-foreground">આર્ટિકલ લોડ થઈ રહ્યો છે...</span>
        </div>
      }
    >
      <ArticleDetailContent initialId={initialId} />
    </React.Suspense>
  )
}
