"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Library,
  Search,
  Sparkles,
  TrendingUp,
  MapPin,
  Calendar,
  Eye,
  Heart,
  Compass,
  Calculator,
  Flower2,
  CheckCircle2,
  MessageCircle,
  Send,
  Phone,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  ShoppingBag,
  Star,
  Check,
  Award,
  AlertCircle,
  HelpCircle,
  Sun,
  Flame,
  ShieldCheck,
  User
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { getAstroData } from "@/lib/data/astro-data"
import { CATEGORIES_DATA } from "@/lib/data/categories-data"
import { useLanguage } from "@/components/language-provider"

export default function CategoriesClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()

  // Dynamic Astro Data for Header & Footer
  const [siteData, setSiteData] = React.useState(() => getAstroData(lang))

  React.useEffect(() => {
    setSiteData(getAstroData(lang))
  }, [lang])

  // Category page localized content
  const pageData = CATEGORIES_DATA[lang] || CATEGORIES_DATA.gu

  // State management
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedFilter, setSelectedFilter] = React.useState("all")
  const [whatsappPhone, setWhatsappPhone] = React.useState("")
  const [whatsappSuccess, setWhatsappSuccess] = React.useState(false)
  const [consultModalOpen, setConsultModalOpen] = React.useState(false)
  const [consultForm, setConsultForm] = React.useState({
    name: "",
    phone: "",
    topic: "kundali",
    preferredTime: "morning"
  })
  const [consultSuccess, setConsultSuccess] = React.useState(false)

  // Filter pills horizontal scrolling state & accessibility
  const scrollContainerRef = React.useRef(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const checkScroll = React.useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 2)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4)
  }, [])

  React.useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    checkScroll()
    const timer = setTimeout(checkScroll, 150)
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      clearTimeout(timer)
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll, pageData.filterPills, lang])

  const scrollByAmount = (distance) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: distance,
        behavior: "smooth"
      })
    }
  }

  // Filter & Search Logic
  const filteredCategories = React.useMemo(() => {
    return pageData.categories.filter((cat) => {
      // 1. Filter pill match
      const matchesFilter =
        selectedFilter === "all" || cat.filterGroup === selectedFilter

      // 2. Search query match
      if (!matchesFilter) return false
      if (!searchQuery.trim()) return true

      const query = searchQuery.toLowerCase().trim()
      const titleMatch = cat.title.toLowerCase().includes(query)
      const descMatch = cat.description.toLowerCase().includes(query)
      const subMatch = cat.subCategory.toLowerCase().includes(query)
      const badgeMatch = cat.badge.toLowerCase().includes(query)

      return titleMatch || descMatch || subMatch || badgeMatch
    })
  }, [pageData.categories, selectedFilter, searchQuery])

  // Icon mapping helper
  const renderCategoryIcon = (iconType) => {
    switch (iconType) {
      case "eye":
        return <Eye className="h-4 w-4" />
      case "map":
        return <MapPin className="h-4 w-4" />
      case "stars":
        return <Sparkles className="h-4 w-4" />
      case "calculator":
        return <Calculator className="h-4 w-4" />
      case "calendar":
        return <Calendar className="h-4 w-4" />
      case "spa":
        return <Flower2 className="h-4 w-4" />
      case "compass":
        return <Compass className="h-4 w-4" />
      case "heart":
        return <Heart className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  // Handle WhatsApp Submission
  const handleWhatsappSubmit = (e) => {
    e.preventDefault()
    if (!whatsappPhone.trim()) return
    setWhatsappSuccess(true)
    setTimeout(() => {
      setWhatsappPhone("")
      setWhatsappSuccess(false)
    }, 5000)
  }

  // Handle Consultation Submission
  const handleConsultSubmit = (e) => {
    e.preventDefault()
    if (!consultForm.name.trim() || !consultForm.phone.trim()) return
    setConsultSuccess(true)
    setTimeout(() => {
      setConsultSuccess(false)
      setConsultModalOpen(false)
      setConsultForm({
        name: "",
        phone: "",
        topic: "kundali",
        preferredTime: "morning"
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#10110e] text-[#1b1c1a] dark:text-[#f4f3ee] flex flex-col selection:bg-[#fdc72d]/30">
      {/* 1. GLOBAL ASTRO HEADER */}
      <AstroHeader
        config={siteData.config}
        topBar={siteData.topBar}
        navLinks={siteData.navLinks}
        activeCategory="categories"
        onSelectCategory={(id) => {
          if (id === "home") router.push("/")
          else if (id === "about-us" || id === "about") router.push("/about-us")
          else if (id === "dainik-panchang" || id === "panchang") router.push("/dainik-panchang")
          else if (id === "bahuchar-maa-rajwadu") router.push("/article/hero-1")
          else if (id === "jyotirling") router.push("/article/jyotirling-1")
          else if (id === "dharmik") router.push("/article/feat-2")
          else if (id === "jyotishshastra") router.push("/article/feat-1")
        }}
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
      />

      {/* 2. BREADCRUMB & HERO INTRO HEADER */}
      <section className="w-full bg-[#f4f4f0] dark:bg-[#161714] border-b border-[#e6e3da] dark:border-white/10 px-4 sm:px-6 py-8 sm:py-10 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Breadcrumb row */}
          <Breadcrumb>
            <BreadcrumbList className="text-xs font-medium">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/"
                    className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#d9a100]" />
                    <span>{pageData.header.breadcrumbHome}</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#8a6800] dark:text-[#fdc72d] font-bold">
                  {pageData.header.breadcrumbCurrent}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="max-w-3xl">
              <Badge
                variant="outline"
                className="bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] border-[#fdc72d]/40 mb-3 px-3 py-1 text-xs font-bold gap-1.5"
              >
                <BookOpen className="h-3.5 w-3.5" />
                {pageData.header.portalBadge}
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1b1c1a] dark:text-white tracking-tight leading-tight">
                {pageData.header.title}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2.5 leading-relaxed max-w-2xl">
                {pageData.header.subtitle}
              </p>
            </div>

            {/* Stat Pill Box */}
            <div className="shrink-0 inline-flex w-fit items-center gap-3.5 bg-card dark:bg-[#1f201c] p-3.5 sm:p-4 rounded-2xl shadow-xs border border-border/80 self-start sm:self-auto">
              <div className="w-12 h-12 rounded-xl bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                <Library className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#8a6800] dark:text-[#fdc72d] leading-none">
                  {pageData.header.statCount}
                </div>
                <div className="text-xs text-muted-foreground font-semibold mt-1">
                  {pageData.header.statLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEARCH BAR, QUICK FILTER PILLS & STATUS BADGES */}
      <section className="w-full bg-card dark:bg-[#181916] py-5 px-4 sm:px-6 shadow-xs border-b border-border/60 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          {/* Search Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 shrink-0 pointer-events-none" />
              <Input
                type="text"
                id="category-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={pageData.search.placeholder}
                className="w-full pl-10 pr-28 h-11 sm:h-12 bg-[#faf9f5] dark:bg-[#20211d] text-foreground text-sm rounded-xl border-border/80 focus:border-[#fdc72d] focus:ring-[#fdc72d]/30 truncate"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
                    title={pageData.search.clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
                <Button
                  type="button"
                  className="bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] text-xs font-bold px-3 py-1.5 h-8 rounded-lg shadow-2xs cursor-pointer"
                >
                  {pageData.search.buttonText}
                </Button>
              </div>
            </div>

            {/* Metrics Chips - cleanly shown on desktop beside search */}
            <div className="hidden lg:flex items-center gap-2.5 text-xs text-muted-foreground font-semibold shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[#8a6800] dark:text-[#fdc72d] bg-[#fdc72d]/15 px-3 py-1.5 rounded-lg border border-[#fdc72d]/30">
                <BookOpen className="h-3.5 w-3.5" />
                {pageData.search.categoryCountBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-muted dark:bg-[#242521] px-3 py-1.5 rounded-lg border border-border/60">
                <Sparkles className="h-3.5 w-3.5 text-[#3d6660] dark:text-[#78b3a7]" />
                {pageData.search.dailyUpdatesBadge}
              </span>
            </div>
          </div>

          {/* Quick Filter Pills Row with Accessible Scroll Arrows */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full">
            {/* Scroll Left Arrow Button */}
            <button
              type="button"
              onClick={() => scrollByAmount(-220)}
              disabled={!canScrollLeft}
              aria-label={lang === "gu" ? "ડાબી બાજુ સ્ક્રોલ કરો" : "Scroll categories left"}
              className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 border border-border/60 transition-all ${
                canScrollLeft
                  ? "bg-[#efeeea] dark:bg-[#22231f] text-foreground hover:bg-[#fdc72d] hover:text-[#1b1c1a] hover:border-[#e5b220] cursor-pointer shadow-2xs active:scale-95"
                  : "bg-muted/30 text-muted-foreground/30 border-transparent cursor-not-allowed opacity-30 pointer-events-none"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Horizontal Scroll Track */}
            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto scrollbar-none pb-1 scroll-smooth"
              id="filter-pills"
              role="tablist"
              aria-label={lang === "gu" ? "વિષય શ્રેણીઓ" : "Category filters"}
            >
              <div className="flex items-center gap-2 w-max">
                {pageData.filterPills.map((pill) => {
                  const isActive = selectedFilter === pill.id
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedFilter(pill.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap font-bold transition-all shrink-0 cursor-pointer border ${
                        isActive
                          ? "bg-[#fdc72d] text-[#1b1c1a] border-[#e5b220] ring-1 ring-[#e5b220] shadow-xs"
                          : "bg-[#efeeea] dark:bg-[#22231f] text-foreground border-border/40 hover:bg-[#fdc72d]/20 hover:text-[#8a6800] dark:hover:text-[#fdc72d]"
                      }`}
                    >
                      {pill.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scroll Right Arrow Button */}
            <button
              type="button"
              onClick={() => scrollByAmount(220)}
              disabled={!canScrollRight}
              aria-label={lang === "gu" ? "જમણી બાજુ સ્ક્રોલ કરો" : "Scroll categories right"}
              className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 border border-border/60 transition-all ${
                canScrollRight
                  ? "bg-[#efeeea] dark:bg-[#22231f] text-foreground hover:bg-[#fdc72d] hover:text-[#1b1c1a] hover:border-[#e5b220] cursor-pointer shadow-2xs active:scale-95"
                  : "bg-muted/30 text-muted-foreground/30 border-transparent cursor-not-allowed opacity-30 pointer-events-none"
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. MAIN DUAL-COLUMN CONTENT LAYOUT */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT / MAIN COLUMN: SPOTLIGHT & CATEGORIES GRID (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* FEATURED HERO SPOTLIGHT CARD */}
            {selectedFilter === "all" && !searchQuery && (
              <article className="relative overflow-hidden rounded-2xl bg-card dark:bg-[#1a1b17] shadow-sm border border-border/80 group">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Spotlight Visual */}
                  <div className="md:col-span-5 relative min-h-[240px] md:min-h-full overflow-hidden">
                    <Image
                      src={pageData.featuredHero.image}
                      alt={pageData.featuredHero.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent md:hidden" />
                    <div className="absolute top-3 left-3 bg-[#3d6660] text-white font-bold text-[11px] px-3 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                      <Star className="h-3 w-3 fill-current text-[#fdc72d]" />
                      {pageData.featuredHero.badge}
                    </div>
                  </div>

                  {/* Spotlight Editorial Content */}
                  <div className="md:col-span-7 p-5 sm:p-7 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-[#8a6800] dark:text-[#fdc72d] font-bold text-xs mb-1.5">
                        <span>{pageData.featuredHero.invocation}</span>
                        <span>•</span>
                        <span>{pageData.featuredHero.articleCount}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors">
                        {pageData.featuredHero.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                        {pageData.featuredHero.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        {pageData.featuredHero.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="bg-muted dark:bg-[#252622] px-2.5 py-1 rounded-md text-foreground text-[11px] font-medium border border-border/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#fdc72d] text-[#1b1c1a] flex items-center justify-center font-extrabold text-xs shadow-2xs">
                          {pageData.featuredHero.authorInitials}
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-foreground block leading-tight">
                            {pageData.featuredHero.authorName}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {pageData.featuredHero.authorRole}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={pageData.featuredHero.link}
                        className="inline-flex items-center gap-1.5 bg-[#fdc72d] text-[#1b1c1a] px-3.5 py-1.5 rounded-lg text-xs font-extrabold hover:bg-[#eab318] transition-all shadow-2xs"
                      >
                        <span>{pageData.featuredHero.ctaText}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* 8 PRIMARY VEDIC CATEGORIES SECTION */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                    {pageData.sectionHeading.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {pageData.sectionHeading.subtitle}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#8a6800] dark:text-[#fdc72d] bg-[#fdc72d]/15 px-3 py-1 rounded-full font-bold border border-[#fdc72d]/30">
                  <Sparkles className="h-3.5 w-3.5 text-[#d9a100]" />
                  {pageData.sectionHeading.certifiedBadge}
                </div>
              </div>

              {/* No Results Message */}
              {filteredCategories.length === 0 ? (
                <div className="p-8 sm:p-12 text-center rounded-2xl bg-card dark:bg-[#1a1b17] border border-border/80">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-60" />
                  <h3 className="text-base font-bold text-foreground">
                    {pageData.search.noResultsTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    {pageData.search.noResultsSubtitle}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedFilter("all")
                    }}
                    className="mt-4 text-xs font-bold"
                  >
                    {pageData.search.clearSearch}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCategories.map((cat) => (
                    <Card
                      key={cat.id}
                      className="pt-0 overflow-hidden border border-border/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group bg-card dark:bg-[#1a1b17]"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={cat.image}
                          alt={cat.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#fdc72d] text-[#1b1c1a] px-2.5 py-0.5 rounded text-[11px] font-black shadow-xs">
                          {cat.badge}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] text-[#bde8e1] font-bold uppercase tracking-wider block mb-0.5">
                            {cat.subCategory}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-xs">
                            {cat.title}
                          </h3>
                        </div>
                      </div>

                      <CardContent className="flex flex-col justify-between flex-1 gap-3">
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>

                        <div className="pt-2 flex items-center justify-between text-[#8a6800] dark:text-[#fdc72d] text-xs font-bold border-t border-border/50">
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            {renderCategoryIcon(cat.iconType)}
                            <span className="text-[11px] font-medium">{cat.metricLabel}</span>
                          </span>
                          <Link
                            href={cat.link}
                            className="inline-flex items-center gap-1 hover:translate-x-0.5 transition-transform text-[#8a6800] dark:text-[#fdc72d]"
                          >
                            <span>{cat.readMore}</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* RECENT HIGHLIGHTS TICKER ROW */}
            <div className="bg-card dark:bg-[#1a1b17] p-4 sm:p-5 rounded-2xl shadow-xs border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3d6660]/15 text-[#3d6660] dark:text-[#78b3a7] flex items-center justify-center font-bold shrink-0">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#8a6800] dark:text-[#fdc72d] font-bold block">
                    {pageData.trendingTicker.label}
                  </span>
                  <p className="text-xs sm:text-sm text-foreground font-semibold leading-snug mt-0.5">
                    {pageData.trendingTicker.text}
                  </p>
                </div>
              </div>
              <Link
                href={pageData.trendingTicker.link}
                className="shrink-0 text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline flex items-center gap-1"
              >
                <span>{pageData.trendingTicker.linkText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* ALPHABETICAL VEDIC GLOSSARY DIRECTORY */}
            <div className="bg-card dark:bg-[#1a1b17] p-5 sm:p-6 rounded-2xl border border-border/80 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-[#d9a100]" />
                <h3 className="text-base font-bold text-foreground">
                  {pageData.alphabeticalIndex.title}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {pageData.alphabeticalIndex.subtitle}
              </p>

              {/* Letter Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {pageData.alphabeticalIndex.letters.map((letter) => (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => {
                      setSearchQuery(letter)
                      window.scrollTo({ top: 280, behavior: "smooth" })
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      searchQuery === letter
                        ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                        : "bg-muted dark:bg-[#242521] text-foreground hover:bg-[#fdc72d]/20 hover:text-[#8a6800] dark:hover:text-[#fdc72d] border border-border/50"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              {/* Popular Search Shortcuts */}
              <div className="mt-4 pt-3.5 border-t border-border/50 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-muted-foreground">
                  {pageData.alphabeticalIndex.popularSearchesLabel}
                </span>
                {pageData.alphabeticalIndex.popularTerms.map((term, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term)
                      window.scrollTo({ top: 280, behavior: "smooth" })
                    }}
                    className="text-[11px] text-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] underline decoration-dotted font-medium cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT / SIDEBAR COLUMN (4 COLS) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* SIDEBAR WIDGET 1: LIVE PANCHANG & CHOGHADIYA */}
            <div className="bg-card dark:bg-[#1a1b17] rounded-2xl p-5 sm:p-6 shadow-xs border border-border/80">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d]" />
                  <h3 className="text-base font-bold text-foreground">
                    {pageData.sidebar.panchang.title}
                  </h3>
                </div>
                <Badge
                  variant="outline"
                  className="bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] border-[#fdc72d]/30 text-[10px] font-bold px-2 py-0.5"
                >
                  {pageData.sidebar.panchang.location}
                </Badge>
              </div>

              <div className="flex flex-col gap-2.5 pt-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 dark:bg-[#22231f]">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Sun className="h-3.5 w-3.5 text-[#3d6660]" />
                    {pageData.sidebar.panchang.tithiLabel}
                  </span>
                  <span className="font-bold text-foreground text-right">
                    {pageData.sidebar.panchang.tithiVal}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 dark:bg-[#22231f]">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Sparkles className="h-3.5 w-3.5 text-[#d9a100]" />
                    {pageData.sidebar.panchang.nakshatraLabel}
                  </span>
                  <span className="font-bold text-foreground text-right">
                    {pageData.sidebar.panchang.nakshatraVal}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] font-bold border border-[#fdc72d]/30">
                  <span className="flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-[#d9a100]" />
                    {pageData.sidebar.panchang.shubhLabel}
                  </span>
                  <span>{pageData.sidebar.panchang.shubhVal}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 font-semibold border border-red-500/20">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                    {pageData.sidebar.panchang.rahuLabel}
                  </span>
                  <span>{pageData.sidebar.panchang.rahuVal}</span>
                </div>
              </div>

              <Link
                href={pageData.sidebar.panchang.link}
                className="mt-4 w-full text-center block py-2.5 bg-[#efeeea] dark:bg-[#22231f] text-[#8a6800] dark:text-[#fdc72d] hover:bg-[#fdc72d] hover:text-[#1b1c1a] rounded-xl text-xs font-bold transition-all"
              >
                {pageData.sidebar.panchang.ctaText}
              </Link>
            </div>

            {/* SIDEBAR WIDGET 2: EXPERT SCHOLAR CONSULTATION (Dr. Vishal Modi) */}
            <div className="bg-card dark:bg-[#1a1b17] rounded-2xl p-5 sm:p-6 shadow-xs border border-border/80 text-center relative overflow-hidden">
              <div className="relative w-20 h-20 rounded-full mx-auto p-1 bg-[#fdc72d] shadow-sm mb-3 overflow-hidden">
                <Image
                  src={pageData.sidebar.consultation.avatar}
                  alt={pageData.sidebar.consultation.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <Badge
                variant="outline"
                className="bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] border-[#fdc72d]/40 text-[10px] font-black px-2.5 py-0.5 mb-2"
              >
                <Award className="h-3 w-3 mr-1" />
                {pageData.sidebar.consultation.goldMedalBadge}
              </Badge>

              <h3 className="text-base sm:text-lg font-bold text-foreground">
                {pageData.sidebar.consultation.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {pageData.sidebar.consultation.experience}
              </p>

              <div className="grid grid-cols-2 gap-2 my-4 text-left text-xs">
                <div className="bg-muted/70 dark:bg-[#22231f] p-2.5 rounded-xl border border-border/50">
                  <span className="text-[10px] text-muted-foreground block font-medium">
                    {pageData.sidebar.consultation.mediumLabel}
                  </span>
                  <span className="font-bold text-foreground text-[11px]">
                    {pageData.sidebar.consultation.mediumVal}
                  </span>
                </div>
                <div className="bg-muted/70 dark:bg-[#22231f] p-2.5 rounded-xl border border-border/50">
                  <span className="text-[10px] text-muted-foreground block font-medium">
                    {pageData.sidebar.consultation.slotsLabel}
                  </span>
                  <span className="font-bold text-[#8a6800] dark:text-[#fdc72d] text-[11px]">
                    {pageData.sidebar.consultation.slotsVal}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => setConsultModalOpen(true)}
                className="w-full py-2.5 bg-[#3d6660] hover:bg-[#2f504b] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                {pageData.sidebar.consultation.ctaButton}
              </Button>
            </div>

            {/* SIDEBAR WIDGET 3: SPIRITUAL STORE ESSENTIALS */}
            <div className="bg-card dark:bg-[#1a1b17] rounded-2xl p-5 sm:p-6 shadow-xs border border-border/80">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-[#3d6660] dark:text-[#78b3a7]" />
                  <h3 className="text-base font-bold text-foreground">
                    {pageData.sidebar.store.title}
                  </h3>
                </div>
                <Link
                  href="/myshop"
                  className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline"
                >
                  {pageData.sidebar.store.viewStore}
                </Link>
              </div>

              <div className="flex flex-col gap-3 pt-3">
                {pageData.sidebar.store.products.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 dark:bg-[#22231f] hover:bg-muted dark:hover:bg-[#272824] transition-all border border-border/40"
                  >
                    <div className="relative w-12 h-12 rounded-lg bg-card dark:bg-[#181916] p-0.5 shrink-0 overflow-hidden border border-border/60">
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate">
                        {prod.title}
                      </h4>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[#8a6800] dark:text-[#fdc72d] font-black text-xs">
                          {prod.price}
                        </span>
                        <span className="text-[10px] text-muted-foreground bg-card dark:bg-[#181916] px-1.5 py-0.5 rounded border border-border/40">
                          {prod.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDEBAR WIDGET 4: WHATSAPP NEWSLETTER & COMMUNITY */}
            <div className="bg-[#fdc72d] text-[#1b1c1a] rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e5b220] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#1b1c1a] text-[#fdc72d] flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold leading-tight">
                    {pageData.sidebar.newsletter.title}
                  </h3>
                  <span className="text-[11px] font-bold opacity-90 block mt-0.5">
                    {pageData.sidebar.newsletter.schedule}
                  </span>
                </div>
              </div>

              <p className="text-xs font-medium opacity-90 mb-3.5 leading-relaxed">
                {pageData.sidebar.newsletter.description}
              </p>

              {whatsappSuccess ? (
                <div className="p-3 bg-white/95 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{pageData.sidebar.newsletter.successText}</span>
                </div>
              ) : (
                <form onSubmit={handleWhatsappSubmit} className="flex flex-col gap-2">
                  <Input
                    type="tel"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    placeholder={pageData.sidebar.newsletter.placeholder}
                    required
                    className="w-full bg-white text-[#1b1c1a] text-xs h-9 rounded-lg border-none shadow-2xs placeholder:text-gray-500"
                  />
                  <Button
                    type="submit"
                    className="w-full py-2 bg-[#1b1c1a] text-[#fdc72d] hover:bg-black font-extrabold text-xs rounded-lg transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {pageData.sidebar.newsletter.buttonText}
                  </Button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* 5. BOTTOM SCRIPTURAL BANNER / QUOTE */}
      <section className="w-full bg-[#efeeea] dark:bg-[#161714] py-8 px-4 sm:px-6 border-t border-b border-border/60 transition-colors">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center mb-1">
            <Heart className="h-6 w-6" />
          </div>
          <p className="text-base sm:text-lg font-black text-[#8a6800] dark:text-[#fdc72d] tracking-wide">
            {pageData.quoteBanner.shloka}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {pageData.quoteBanner.meaning}
          </p>
        </div>
      </section>

      {/* 6. CONSULTATION BOOKING MODAL */}
      <Dialog open={consultModalOpen} onOpenChange={setConsultModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6 shadow-xl bg-card dark:bg-[#1a1b17] border border-border text-foreground">
          <DialogHeader className="p-0 pb-2 flex-row items-center gap-3 space-y-0 pr-8">
            <div className="w-10 h-10 rounded-xl bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center font-bold shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">
                {lang === "gu" ? "૧-ઓન-૧ જ્યોતિષ પરામર્શ" : "1-on-1 Astrological Consultation"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                {lang === "gu" ? "ડૉ. વિશાલ મોદી સાથે સીધો વાર્તાલાપ" : "Direct Session with Dr. Vishal Modi"}
              </DialogDescription>
            </div>
          </DialogHeader>

          {consultSuccess ? (
            <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>
                {lang === "gu"
                  ? "તમારી પરામર્શ વિનંતી સફળતાપૂર્વક સ્વીકારવામાં આવી છે! અમારી ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે."
                  : "Your consultation request has been received! Our coordinator will contact you shortly."}
              </span>
            </div>
          ) : (
            <form onSubmit={handleConsultSubmit} className="flex flex-col gap-3.5 pt-2">
              <div>
                <Label htmlFor="category-modal-name" className="text-xs font-bold text-foreground block mb-1">
                  {lang === "gu" ? "તમારું પૂરું નામ" : "Full Name"}
                </Label>
                <Input
                  id="category-modal-name"
                  type="text"
                  required
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  placeholder={lang === "gu" ? "દા.ત. રોહિત પટેલ" : "e.g. Rohit Patel"}
                  className="text-xs"
                />
              </div>

              <div>
                <Label htmlFor="category-modal-phone" className="text-xs font-bold text-foreground block mb-1">
                  {lang === "gu" ? "મોબાઈલ નંબર (WhatsApp)" : "Phone Number (WhatsApp)"}
                </Label>
                <Input
                  id="category-modal-phone"
                  type="tel"
                  required
                  value={consultForm.phone}
                  onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                  placeholder="+91 98250 XXXXX"
                  className="text-xs"
                />
              </div>

              <div>
                <Label htmlFor="category-modal-topic" className="text-xs font-bold text-foreground block mb-1">
                  {lang === "gu" ? "માર્ગદર્શનનો મુખ્ય વિષય" : "Consultation Topic"}
                </Label>
                <Select
                  value={consultForm.topic}
                  onValueChange={(val) => setConsultForm({ ...consultForm, topic: val })}
                >
                  <SelectTrigger id="category-modal-topic" className="w-full text-xs">
                    <SelectValue placeholder={lang === "gu" ? "વિષય પસંદ કરો" : "Select Topic"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kundali" className="text-xs">
                      {lang === "gu" ? "કુંડળી વિશ્લેષણ & દોષ નિવારણ" : "Kundali Analysis & Dosha"}
                    </SelectItem>
                    <SelectItem value="career" className="text-xs">
                      {lang === "gu" ? "કરિયર & વ્યવસાય માર્ગદર્શન" : "Career & Business Astrology"}
                    </SelectItem>
                    <SelectItem value="marriage" className="text-xs">
                      {lang === "gu" ? "લગ્ન મેળવણી & દાંપત્ય જીવન" : "Matchmaking & Marriage"}
                    </SelectItem>
                    <SelectItem value="numerology" className="text-xs">
                      {lang === "gu" ? "અંકશાસ્ત્ર & ભાગ્યાંક રહસ્ય" : "Numerology & Destiny Number"}
                    </SelectItem>
                    <SelectItem value="vastu" className="text-xs">
                      {lang === "gu" ? "વાસ્તુશાસ્ત્ર દર્પણ" : "Vastu Shastra Consultation"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category-modal-time" className="text-xs font-bold text-foreground block mb-1">
                  {lang === "gu" ? "અનુકૂળ સમય" : "Preferred Time"}
                </Label>
                <Select
                  value={consultForm.preferredTime}
                  onValueChange={(val) => setConsultForm({ ...consultForm, preferredTime: val })}
                >
                  <SelectTrigger id="category-modal-time" className="w-full text-xs">
                    <SelectValue placeholder={lang === "gu" ? "સમય પસંદ કરો" : "Select Time"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning" className="text-xs">
                      {lang === "gu" ? "સવાર (૧૦:૦૦ થી ૧:૦૦)" : "Morning (10:00 AM - 1:00 PM)"}
                    </SelectItem>
                    <SelectItem value="afternoon" className="text-xs">
                      {lang === "gu" ? "બપોર (૨:૦૦ થી ૫:૦૦)" : "Afternoon (2:00 PM - 5:00 PM)"}
                    </SelectItem>
                    <SelectItem value="evening" className="text-xs">
                      {lang === "gu" ? "સાંજ (૫:૦૦ થી ૮:૦૦)" : "Evening (5:00 PM - 8:00 PM)"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs mt-2"
              >
                {lang === "gu" ? "વિનંતી સબમિટ કરો" : "Confirm Booking Request"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 7. GLOBAL ASTRO FOOTER */}
      <AstroFooter config={siteData.config} footer={siteData.footer} />
    </div>
  )
}
