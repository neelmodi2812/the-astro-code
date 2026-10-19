"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Search,
  Sparkles,
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
  ChevronRight,
  X,
  Star,
  Award,
  AlertCircle,
  Sun,
  Flame,
  ShieldCheck,
  Check
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import {
  Card,
  CardContent
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
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"

import { getAstroData, SITE_CONTACT, getWhatsAppUrl } from "@/lib/data/astro-data"
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
        return <Eye className="h-3.5 w-3.5" />
      case "map":
        return <MapPin className="h-3.5 w-3.5" />
      case "stars":
        return <Sparkles className="h-3.5 w-3.5" />
      case "calculator":
        return <Calculator className="h-3.5 w-3.5" />
      case "calendar":
        return <Calendar className="h-3.5 w-3.5" />
      case "spa":
        return <Flower2 className="h-3.5 w-3.5" />
      case "compass":
        return <Compass className="h-3.5 w-3.5" />
      case "heart":
        return <Heart className="h-3.5 w-3.5" />
      default:
        return <BookOpen className="h-3.5 w-3.5" />
    }
  }

  // Handle WhatsApp Newsletter Submission
  const handleWhatsappSubmit = (e) => {
    e.preventDefault()
    if (!whatsappPhone.trim()) return
    setWhatsappSuccess(true)
    setTimeout(() => {
      setWhatsappPhone("")
      setWhatsappSuccess(false)
    }, 5000)
  }

  // Handle Consultation Modal Submission
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

      {/* 2. STREAMLINED HERO HEADER (Clean, Uncluttered, Elegant) */}
      <section className="w-full bg-[#f4f4f0] dark:bg-[#161714] border-b border-[#e6e3da] dark:border-white/10 px-4 sm:px-6 py-6 sm:py-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Breadcrumb */}
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

          {/* Heading Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] border border-[#fdc72d]/40 mb-2.5 text-xs font-bold">
                <BookOpen className="h-3.5 w-3.5" />
                <span>{pageData.header.portalBadge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1c1a] dark:text-white tracking-tight leading-tight">
                {pageData.header.title}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                {pageData.header.subtitle}
              </p>
            </div>

            {/* Clean summary pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card dark:bg-[#1f201c] border border-border/80 text-xs font-semibold text-foreground/90 shrink-0 self-start sm:self-end">
              <Sparkles className="h-3.5 w-3.5 text-[#008376] dark:text-[#fdc72d]" />
              <span>{pageData.header.statCount} {pageData.header.statLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEARCH & INTUITIVE FILTER TABS (No clumsy arrows or duplicate badges) */}
      <section className="w-full bg-card dark:bg-[#181916] py-4 px-4 sm:px-6 shadow-2xs border-b border-border/60 transition-colors sticky top-0 z-20 backdrop-blur-md bg-card/95 dark:bg-[#181916]/95">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 shrink-0 pointer-events-none" />
            <Input
              type="text"
              id="category-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={pageData.search.placeholder}
              className="w-full pl-9 pr-9 h-10 bg-[#faf9f5] dark:bg-[#20211d] text-foreground text-xs sm:text-sm rounded-xl border-border/80 focus:border-[#008376] focus:ring-[#008376]/20 truncate"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
                title={pageData.search.clearSearch}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          {/* Filter Chips (Clean, Responsive, Horizontal Wrapping / Scroll) */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            {pageData.filterPills.map((pill) => {
              const isActive = selectedFilter === pill.id
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedFilter(pill.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-bold transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? "bg-[#008376] text-white border-[#00685d] shadow-2xs"
                      : "bg-[#efeeea] dark:bg-[#22231f] text-foreground/80 border-border/40 hover:bg-[#008376]/10 hover:text-[#008376] dark:hover:text-[#38b2a3]"
                  }`}
                >
                  {pill.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. MAIN DUAL-COLUMN CONTENT LAYOUT */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT / MAIN COLUMN: 8 CATEGORIES GRID DIRECTLY AT TOP (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  {pageData.sectionHeading.title}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {pageData.sectionHeading.subtitle}
                </p>
              </div>

              <span className="text-xs font-bold text-muted-foreground">
                {filteredCategories.length} {lang === "gu" ? "શ્રેણીઓ" : "Categories"}
              </span>
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 ? (
              <div className="p-8 sm:p-12 text-center rounded-2xl bg-card dark:bg-[#1a1b17] border border-border/80 my-4">
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
              /* High-Contrast, Balanced 2-Column Categories Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {filteredCategories.map((cat) => (
                  <Card
                    key={cat.id}
                    className="overflow-hidden border border-border/80 dark:border-white/10 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group bg-card dark:bg-[#181914] hover:-translate-y-1"
                  >
                    {/* Image Header with Aspect Ratio */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <Image
                        src={cat.image}
                        alt={cat.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      
                      {/* Top Badge */}
                      <div className="absolute top-3 left-3 bg-[#008376] text-white px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow-xs">
                        {cat.badge}
                      </div>

                      {/* Bottom Title Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] text-emerald-200 dark:text-[#fdc72d] font-bold uppercase tracking-wider block mb-0.5">
                          {cat.subCategory}
                        </span>
                        <h3 className="text-base sm:text-lg font-black leading-snug drop-shadow-xs group-hover:text-[#fdc72d] transition-colors">
                          {cat.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content & Action */}
                    <CardContent className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-4">
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>

                      <div className="pt-3 flex items-center justify-between text-xs font-bold border-t border-border/60">
                        <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                          {renderCategoryIcon(cat.iconType)}
                          <span className="text-[11px]">{cat.metricLabel}</span>
                        </span>

                        <Link
                          href={cat.link}
                          className="inline-flex items-center gap-1 text-[#008376] dark:text-[#38b2a3] hover:text-[#00685d] dark:hover:text-[#fdc72d] font-bold group-hover:translate-x-0.5 transition-all"
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

          {/* RIGHT / SIDEBAR COLUMN (4 COLS) - Streamlined to 3 High-Value Cards */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* SIDEBAR CARD 1: LIVE PANCHANG & AUSPICIOUS TIMINGS */}
            <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 shadow-2xs border border-border/80">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#008376] dark:text-[#fdc72d]" />
                  <h3 className="text-base font-bold text-foreground">
                    {pageData.sidebar.panchang.title}
                  </h3>
                </div>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-[#008376] dark:bg-emerald-950/60 dark:text-[#38b2a3] border-emerald-200 dark:border-emerald-800 text-[10px] font-bold px-2 py-0.5"
                >
                  {pageData.sidebar.panchang.location}
                </Badge>
              </div>

              <div className="flex flex-col gap-2.5 pt-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 dark:bg-[#20211d]">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Sun className="h-3.5 w-3.5 text-[#008376] dark:text-[#38b2a3]" />
                    {pageData.sidebar.panchang.tithiLabel}
                  </span>
                  <span className="font-bold text-foreground text-right">
                    {pageData.sidebar.panchang.tithiVal}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 dark:bg-[#20211d]">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Sparkles className="h-3.5 w-3.5 text-[#fdc72d]" />
                    {pageData.sidebar.panchang.nakshatraLabel}
                  </span>
                  <span className="font-bold text-foreground text-right">
                    {pageData.sidebar.panchang.nakshatraVal}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#00685d] dark:text-[#38b2a3] font-bold border border-emerald-200/70 dark:border-emerald-800/60">
                  <span className="flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-emerald-600 dark:text-[#38b2a3]" />
                    {pageData.sidebar.panchang.shubhLabel}
                  </span>
                  <span>{pageData.sidebar.panchang.shubhVal}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-semibold border border-red-200/70 dark:border-red-900/60">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                    {pageData.sidebar.panchang.rahuLabel}
                  </span>
                  <span>{pageData.sidebar.panchang.rahuVal}</span>
                </div>
              </div>

              <Link
                href="/dainik-panchang"
                className="mt-4 w-full text-center block py-2.5 bg-muted hover:bg-[#008376] hover:text-white rounded-xl text-xs font-bold transition-all text-foreground"
              >
                {pageData.sidebar.panchang.ctaText}
              </Link>
            </div>

            {/* SIDEBAR CARD 2: DR. VISHAL MODI - VEDIC ASTROLOGICAL GUIDANCE */}
            <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 shadow-2xs border border-border/80 text-center relative overflow-hidden">
              <div className="relative w-20 h-20 rounded-full mx-auto p-1 bg-gradient-to-tr from-[#008376] to-[#fdc72d] shadow-sm mb-3 overflow-hidden">
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

              <h3 className="text-base font-black text-foreground">
                {pageData.sidebar.consultation.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {pageData.sidebar.consultation.experience}
              </p>

              <div className="flex flex-col gap-2 mt-4">
                <a
                  href={getWhatsAppUrl(
                    lang === "gu"
                      ? "નમસ્તે ડૉ. વિશાલ મોદી, મને જ્યોતિષીય પરામર્શ માટે માર્ગદર્શન જોઈએ છે."
                      : "Hello Dr. Vishal Modi, I would like astrological consultation guidance."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#008376] hover:bg-[#00685d] text-white font-bold text-xs rounded-xl shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{lang === "gu" ? "WhatsApp પર સીધી વાતચીત" : "Chat on WhatsApp"}</span>
                </a>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setConsultModalOpen(true)}
                  className="w-full py-2.5 text-xs font-bold rounded-xl border-border hover:bg-muted cursor-pointer"
                >
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{pageData.sidebar.consultation.ctaButton}</span>
                </Button>
              </div>
            </div>

            {/* SIDEBAR CARD 3: COMMUNITY / WHATSAPP UPDATES (Clean & Subtle) */}
            <div className="bg-gradient-to-br from-[#00685d] to-[#004f46] text-white rounded-2xl p-5 shadow-sm border border-emerald-700/50 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold shrink-0 text-[#fdc72d]">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black leading-tight text-white">
                    {pageData.sidebar.newsletter.title}
                  </h4>
                  <span className="text-[11px] text-emerald-200 font-medium block mt-0.5">
                    {pageData.sidebar.newsletter.schedule}
                  </span>
                </div>
              </div>

              <p className="text-xs text-emerald-100/90 mb-3 leading-relaxed">
                {pageData.sidebar.newsletter.description}
              </p>

              {whatsappSuccess ? (
                <div className="p-2.5 bg-white/95 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2">
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
                    className="w-full bg-white text-[#1b1c1a] text-xs h-9 rounded-lg border-none placeholder:text-gray-500 shadow-2xs"
                  />
                  <Button
                    type="submit"
                    className="w-full py-2 bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] font-black text-xs rounded-lg transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{pageData.sidebar.newsletter.buttonText}</span>
                  </Button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* 5. MINIMALIST SCRIPTURAL BLESSING BANNER */}
      <section className="w-full bg-[#efeeea] dark:bg-[#161714] py-8 px-4 sm:px-6 border-t border-border/60 transition-colors">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#008376]/10 dark:bg-[#008376]/20 text-[#008376] dark:text-[#38b2a3] flex items-center justify-center mb-0.5">
            <Heart className="h-5 w-5" />
          </div>
          <p className="text-base sm:text-lg font-black text-foreground tracking-wide">
            {pageData.quoteBanner.shloka}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
            {pageData.quoteBanner.meaning}
          </p>
        </div>
      </section>

      {/* 6. CONSULTATION BOOKING MODAL */}
      <Dialog open={consultModalOpen} onOpenChange={setConsultModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6 shadow-xl bg-card dark:bg-[#181914] border border-border text-foreground">
          <DialogHeader className="p-0 pb-2 flex-row items-center gap-3 space-y-0 pr-8">
            <div className="w-10 h-10 rounded-xl bg-[#008376]/10 text-[#008376] dark:text-[#38b2a3] flex items-center justify-center font-bold shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-black">
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
                    <SelectGroup>
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
                    </SelectGroup>
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
                    <SelectGroup>
                      <SelectItem value="morning" className="text-xs">
                        {lang === "gu" ? "સવાર (૧૦:૦૦ થી ૧:૦૦)" : "Morning (10:00 AM - 1:00 PM)"}
                      </SelectItem>
                      <SelectItem value="afternoon" className="text-xs">
                        {lang === "gu" ? "બપોર (૨:૦૦ થી ૫:૦૦)" : "Afternoon (2:00 PM - 5:00 PM)"}
                      </SelectItem>
                      <SelectItem value="evening" className="text-xs">
                        {lang === "gu" ? "સાંજ (૫:૦૦ થી ૮:૦૦)" : "Evening (5:00 PM - 8:00 PM)"}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#008376] hover:bg-[#00685d] text-white font-bold text-xs mt-2"
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
