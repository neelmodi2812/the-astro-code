"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Clock,
  Sun,
  Moon,
  Sunset,
  Sunrise,
  Sparkles,
  Compass,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Volume2,
  VolumeX,
  Copy,
  ShoppingBag,
  Share2,
  Heart,
  Phone,
  MessageCircle,
  Search,
  Award,
  Flame,
  ArrowRight,
  ExternalLink,
  Star,
  UserCheck,
  BellRing,
  Plus,
  Play,
  Pause,
  MapPin,
  X
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
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { toast } from "@/components/ui/sonner"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { getAstroData } from "@/lib/data/astro-data"
import { PANCHANG_DATA } from "@/lib/data/panchang-data"
import { useLanguage } from "@/components/language-provider"

export default function DainikPanchangClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const [siteData, setSiteData] = useState(() => getAstroData(lang))

  useEffect(() => {
    setSiteData(getAstroData(lang))
  }, [lang])

  const panchang = PANCHANG_DATA

  // Interactive States
  const [selectedCityId, setSelectedCityId] = useState("ahmedabad")
  const [choghadiyaTab, setChoghadiyaTab] = useState("day") // "day" or "night"
  const [selectedCellDate, setSelectedCellDate] = useState("૧૨") // default to 12 April (today)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [selectedRashi, setSelectedRashi] = useState(null)
  const [whatsappPhone, setWhatsappPhone] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [activeTopic, setActiveTopic] = useState("all")

  // Selected city object
  const currentCity = panchang.cities.find((c) => c.id === selectedCityId) || panchang.cities[0]

  // Language switcher
  const handleToggleLang = (newLang) => {
    setLang(newLang)
    toast.info(newLang === "en" ? "Language switched to English" : "ભાષા બદલાઈ: ગુજરાતી")
  }

  // Toast notification helper
  const showToast = (msg, type = "success") => {
    if (type === "info") toast.info(msg)
    else if (type === "error") toast.error(msg)
    else toast.success(msg)
  }

  // Copy text to clipboard helper
  const handleCopy = (text, label) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text)
      showToast(lang === "gu" ? `${label} સફળતાપૂર્વક કોપી થયું!` : `${label} copied to clipboard!`)
    } else {
      showToast(text)
    }
  }

  // Handle newsletter subscription
  const handleWhatsappSubscribe = (e) => {
    e.preventDefault()
    if (!whatsappPhone || whatsappPhone.trim().length < 8) {
      showToast(lang === "gu" ? "કૃપા કરીને માન્ય વોટ્સએપ નંબર દાખલ કરો." : "Please enter a valid WhatsApp number.")
      return
    }
    showToast(lang === "gu" ? "ધન્યવાદ! દૈનિક પંચાંગ સબ્સ્ક્રિપ્શન સક્રિય થયું." : "Success! Daily Panchang WhatsApp alerts activated.")
    setWhatsappPhone("")
  }

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product])
    showToast(lang === "gu" ? `${product.name[lang]} કાર્ટમાં ઉમેરાયું!` : `${product.name[lang]} added to Cart!`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-[#fdc72d]/30 selection:text-[#1b1c1a]">
      {/* 1. Standard Sticky Vedic Header */}
      <AstroHeader
        config={siteData.config}
        topBar={siteData.topBar}
        navLinks={siteData.navLinks}
        activeCategory="dainik-panchang"
        onSelectCategory={(id) => {
          if (id === "home") router.push("/")
          else if (id === "about-us") router.push("/about-us")
          else if (id === "dainik-panchang") router.push("/dainik-panchang")
        }}
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={cartItems.length}
      />

      <main className="flex-1 w-full bg-background pt-3 pb-16">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          
          {/* 2. Top Breadcrumb & Quick Filter Ribbon */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 bg-muted/40 dark:bg-[#1a1b17] p-3 rounded-xl border border-border/60">
            <Breadcrumb>
              <BreadcrumbList className="text-xs sm:text-sm font-medium">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-1 hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors"
                    >
                      <Compass className="h-3.5 w-3.5" />
                      <span>{panchang.breadcrumb.home[lang]}</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#8a6800] dark:text-[#fdc72d] font-bold">
                    {panchang.breadcrumb.current[lang]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Quick Topic Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {panchang.filterChips.map((chip) => {
                if (chip.isTag) {
                  return (
                    <Badge
                      key={chip.id}
                      className="bg-[#00685d] text-white font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs border-none shrink-0"
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-[#fdc72d]" />
                      {chip[lang]}
                    </Badge>
                  )
                }
                return (
                  <Link
                    key={chip.id}
                    href={chip.target}
                    className="font-bold text-[11px] sm:text-xs px-3 py-1 rounded-full bg-card dark:bg-[#1f201c] text-foreground hover:bg-[#00685d] hover:text-white dark:hover:bg-[#00685d] border border-border transition-all whitespace-nowrap shadow-2xs shrink-0 cursor-pointer"
                  >
                    {chip[lang]}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* 3. Sacred Header Banner & Calendar Controls */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#00685d] via-[#008376] to-[#005048] text-white p-6 sm:p-10 shadow-lg mb-8 overflow-hidden">
            {/* Sacred Sri Yantra Sacred Watermark */}
            <div className="absolute -right-10 -bottom-16 w-80 h-80 opacity-10 pointer-events-none">
              <svg className="w-full h-full text-[#fdc72d] fill-current" viewBox="0 0 100 100">
                <polygon fill="none" points="50,5 90,85 10,85" stroke="currentColor" strokeWidth="2" />
                <polygon fill="none" points="50,95 90,15 10,15" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="50" cy="50" fill="none" r="28" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="50" cy="50" fill="none" r="14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Info */}
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-[#fdc72d] text-[#1b1c1a] font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 rounded uppercase tracking-wider border-none shadow-xs">
                    {panchang.banner.guideTag[lang]}
                  </Badge>
                  <span className="text-xs sm:text-sm text-[#ffdf96] font-bold">
                    {panchang.banner.samvatInfo[lang]}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {panchang.banner.title[lang]}
                </h1>

                <p className="text-xs sm:text-sm text-gray-100 leading-relaxed max-w-2xl opacity-95">
                  {panchang.banner.subtitle[lang]}
                </p>
              </div>

              {/* Right Controls: Month Navigation & City Selector */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 flex flex-wrap items-center gap-3 shadow-inner border border-white/15 self-start lg:self-center shrink-0">
                {/* Month Navigator */}
                <div className="flex items-center gap-1.5 text-white">
                  <button
                    type="button"
                    onClick={() => showToast(lang === "gu" ? "અગાઉનો માસ: ફાગણ ૨૦૮૧" : "Previous Month: Phalguna 2081")}
                    className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
                    title="Previous Month"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="text-center px-2">
                    <span className="block text-xs font-bold text-[#fdc72d]">
                      {panchang.banner.currentMonthLabel[lang]}
                    </span>
                    <span className="block text-[11px] opacity-90 font-medium">
                      {panchang.banner.currentYearLabel[lang]}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast(lang === "gu" ? "આગામી માસ: વૈશાખ ૨૦૮૧" : "Next Month: Vaishakha 2081")}
                    className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
                    title="Next Month"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <Separator orientation="vertical" className="h-8 bg-white/20 hidden sm:block" />

                {/* City Selector */}
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedCityId}
                    onValueChange={(val) => {
                      setSelectedCityId(val)
                      const c = panchang.cities.find((item) => item.id === val)
                      if (c) {
                        showToast(lang === "gu" ? `સ્થળ બદલાયું: ${c.gu}` : `Location updated: ${c.en}`)
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white text-gray-900 font-bold text-xs rounded-lg shadow-sm cursor-pointer h-9 min-w-[130px] border-none px-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gray-600 shrink-0" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {panchang.cities.map((city) => (
                        <SelectItem key={city.id} value={city.id} className="text-xs font-semibold">
                          {city[lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() => {
                      setSelectedCellDate("૧૨")
                      showToast(lang === "gu" ? "આજના પંચાંગ પર પહોંચ્યા!" : "Jumped to Today's Panchang!")
                    }}
                    className="bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] text-xs font-black h-9 px-3.5 shadow-sm cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>{panchang.banner.todayButtonText[lang]}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Main 2-Column Grid (68% Main Column / 32% Sticky Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ======================================================== */}
            {/* LEFT MAIN EDITORIAL COLUMN (8 Cols ~ 68%)                 */}
            {/* ======================================================== */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* ====================================================== */}
              {/* A. Monthly Calendar Grid (મહિનાવાર કેલેન્ડર ગ્રીડ)    */}
              {/* ====================================================== */}
              <div className="border border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 sm:p-7 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#00685d]" />
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {panchang.monthlyCalendar.heading[lang]}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#fdc72d]" />
                      <span>{panchang.monthlyCalendar.legend.festival[lang]}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00685d]" />
                      <span>{panchang.monthlyCalendar.legend.ekadashi[lang]}</span>
                    </span>
                  </div>
                </div>

                {/* Calendar Table Grid */}
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[620px]">
                    {/* Day Headers (Sun - Sat) */}
                    <div className="grid grid-cols-7 gap-1.5 bg-muted/50 dark:bg-[#141512] p-1.5 rounded-xl text-center text-xs font-black text-muted-foreground mb-2">
                      {panchang.monthlyCalendar.daysOfWeek.map((d) => (
                        <div
                          key={d.id}
                          className={`py-1.5 ${
                            d.isHoliday
                              ? "text-[#bb171f] dark:text-[#f87171]"
                              : d.isSat
                              ? "text-[#00685d] dark:text-[#6ed8c8]"
                              : ""
                          }`}
                        >
                          {d[lang]}
                        </div>
                      ))}
                    </div>

                    {/* Date Cells Grid */}
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {panchang.monthlyCalendar.cells.map((cell, idx) => {
                        const isSelected = selectedCellDate === cell.dayNumber
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedCellDate(cell.dayNumber)
                              showToast(
                                lang === "gu"
                                  ? `${cell.dayNumber} એપ્રિલ (${cell.tithi[lang]}) પસંદ કરેલ`
                                  : `${cell.dayNumber} April (${cell.tithi[lang]}) selected`
                              )
                            }}
                            className={`p-2 rounded-xl flex flex-col justify-between h-20 transition-all cursor-pointer border text-left ${
                              cell.isPreviousMonth || cell.isNextMonth
                                ? "bg-muted/20 text-muted-foreground/40 border-transparent opacity-40"
                                : isSelected
                                ? "bg-gradient-to-b from-[#fdc72d]/25 to-[#00685d]/15 border-[#fdc72d] shadow-sm ring-2 ring-[#fdc72d]/40 scale-[1.02]"
                                : cell.isToday
                                ? "bg-gradient-to-b from-[#fdc72d]/20 to-[#00685d]/10 border-[#fdc72d]/60 shadow-xs"
                                : cell.type === "fest"
                                ? "bg-muted/40 hover:bg-muted/70 border-border/60 hover:border-[#fdc72d]/40"
                                : cell.type === "ekadashi"
                                ? "bg-[#00685d]/5 hover:bg-[#00685d]/10 border-[#00685d]/30"
                                : "bg-muted/30 hover:bg-muted/60 border-border/40 hover:border-border"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-black ${
                                  cell.isToday
                                    ? "text-[#8a6800] dark:text-[#fdc72d]"
                                    : "text-foreground"
                                }`}
                              >
                                {cell.dayNumber}
                              </span>

                              {cell.isToday && (
                                <span className="bg-[#00685d] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                  {lang === "gu" ? "આજે" : "Today"}
                                </span>
                              )}
                            </div>

                            <span className="text-[10px] text-muted-foreground font-medium line-clamp-1">
                              {cell.tithi[lang]}
                            </span>

                            {cell.fest ? (
                              <span
                                className={`text-[9px] font-black px-1 py-0.5 rounded line-clamp-1 block ${
                                  cell.highlightGold || cell.isToday
                                    ? "bg-[#fdc72d] text-[#1b1c1a]"
                                    : cell.type === "ekadashi"
                                    ? "bg-[#00685d] text-white"
                                    : "bg-muted text-foreground"
                                }`}
                              >
                                {cell.fest[lang]}
                              </span>
                            ) : (
                              <span className="text-[9px] text-muted-foreground/30">-</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* B. Core 5-Anga Vedic Panchang Details Card            */}
              {/* ====================================================== */}
              <div
                id="panchang-details"
                className="border border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-[#00685d] to-[#008376] p-5 sm:p-6 text-white flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#fdc72d] text-[#1b1c1a] flex items-center justify-center font-bold shadow-sm shrink-0">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        {panchang.coreAngas.heading[lang]}
                      </h3>
                      <p className="text-xs text-gray-200 mt-0.5">
                        {panchang.coreAngas.dateLine[lang]}
                      </p>
                    </div>
                  </div>

                  <Badge className="bg-[#fdc72d] text-[#1b1c1a] font-black text-xs px-3 py-1 rounded-full border-none shadow-xs">
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    {panchang.coreAngas.festivalBadge[lang]}
                  </Badge>
                </div>

                {/* Content Grid */}
                <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: 5 Angas */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-black text-[#00685d] dark:text-[#6ed8c8] flex items-center gap-1.5 pb-1">
                      <Sun className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{panchang.coreAngas.limbsHeading[lang]}</span>
                    </h4>

                    <div className="space-y-2.5">
                      {panchang.coreAngas.limbs.map((limb, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-muted/40 dark:bg-[#151613] border border-border/60 flex items-center justify-between gap-3"
                        >
                          <div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                              {limb.label[lang]}
                            </span>
                            <span className="text-xs sm:text-sm font-black text-foreground">
                              {limb.name[lang]}
                            </span>
                          </div>

                          <span className="text-[11px] font-bold text-[#00685d] dark:text-[#6ed8c8] bg-[#00685d]/10 px-2.5 py-1 rounded-lg text-right shrink-0">
                            {limb.timing[lang]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Planetary Transits & Astrological Advice */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-black text-[#00685d] dark:text-[#6ed8c8] flex items-center gap-1.5 pb-1">
                      <Compass className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{panchang.coreAngas.planetaryHeading[lang]}</span>
                    </h4>

                    {/* 4 Planets Grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {panchang.coreAngas.planets.map((pl, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-muted/40 dark:bg-[#151613] border border-border/60 flex flex-col justify-between"
                        >
                          <span className="text-[10px] text-muted-foreground font-bold">
                            {pl.title[lang]}
                          </span>
                          <span className="text-xs sm:text-sm font-black text-foreground mt-0.5">
                            {pl.sign[lang]}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium mt-1">
                            {pl.nakshatra[lang]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Auspicious Tip Box */}
                    <Alert className="rounded-xl bg-[#00685d]/5 dark:bg-[#00685d]/15 border-border/80 border-l-4 border-l-[#fdc72d] p-4 mt-3">
                      <Sparkles className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d]" />
                      <AlertTitle className="text-xs font-black text-foreground">
                        {panchang.coreAngas.astrologicalTip.title[lang]}
                      </AlertTitle>
                      <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                        {panchang.coreAngas.astrologicalTip.text[lang]}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* C. Celestial Timings (ખગોળીય ગતિવિધિ અને સમય)       */}
              {/* ====================================================== */}
              <div className="border border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 sm:p-7 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 mb-5 gap-2">
                  <h3 className="text-base sm:text-lg font-black text-foreground flex items-center gap-2">
                    <Sun className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d]" />
                    <span>{panchang.celestialTimings.heading[lang]}</span>
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    {currentCity.lat} | {currentCity.lon} ({currentCity[lang]})
                  </span>
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Sunrise */}
                  <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-[#151613] border border-border/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#fdc72d] text-[#1b1c1a] flex items-center justify-center shrink-0 shadow-2xs">
                      <Sunrise className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground font-bold block">
                        {panchang.celestialTimings.items[0].label[lang]}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-foreground">
                        {currentCity.sunrise}
                      </span>
                    </div>
                  </div>

                  {/* Sunset */}
                  <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-[#151613] border border-border/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00685d] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Sunset className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground font-bold block">
                        {panchang.celestialTimings.items[1].label[lang]}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-foreground">
                        {currentCity.sunset}
                      </span>
                    </div>
                  </div>

                  {/* Moonrise */}
                  <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-[#151613] border border-border/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center shrink-0 border border-border/60 shadow-2xs">
                      <Moon className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d]" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground font-bold block">
                        {panchang.celestialTimings.items[2].label[lang]}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-foreground">
                        {currentCity.moonrise}
                      </span>
                    </div>
                  </div>

                  {/* Moonset */}
                  <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-[#151613] border border-border/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center shrink-0 border border-border/60 shadow-2xs">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground font-bold block">
                        {panchang.celestialTimings.items[3].label[lang]}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-foreground">
                        {currentCity.moonset}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Day / Night Duration Tracker Bar */}
                <div className="mt-4 p-3 rounded-xl bg-muted/30 dark:bg-[#151613] border border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-bold text-foreground">
                    <Clock className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8]" />
                    <span>{panchang.celestialTimings.dayDuration[lang]}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-foreground">
                    <Moon className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <span>{panchang.celestialTimings.nightDuration[lang]}</span>
                  </span>
                  <span className="text-[#00685d] dark:text-[#6ed8c8] font-bold">
                    {panchang.celestialTimings.midday[lang]}
                  </span>
                </div>
              </div>

              {/* ====================================================== */}
              {/* D. Comprehensive Choghadiya Table (ચોઘડિયા કોષ્ટક)     */}
              {/* ====================================================== */}
              <div
                id="choghadiya"
                className="border border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 sm:p-7 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 mb-5 gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-foreground flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{panchang.choghadiyaSection.heading[lang]}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {panchang.choghadiyaSection.subtitle[lang]}
                    </p>
                  </div>

                  {/* Day / Night Toggle */}
                  <Tabs
                    value={choghadiyaTab}
                    onValueChange={setChoghadiyaTab}
                    className="shrink-0"
                  >
                    <TabsList className="bg-muted dark:bg-[#141512] rounded-xl p-1 border border-border/60 h-auto">
                      <TabsTrigger
                        value="day"
                        className="px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer data-active:bg-[#00685d] data-active:text-white data-active:shadow-xs text-muted-foreground hover:text-foreground"
                      >
                        <Sun className="h-3.5 w-3.5" />
                        <span>{panchang.choghadiyaSection.tabDay[lang]}</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="night"
                        className="px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer data-active:bg-[#00685d] data-active:text-white data-active:shadow-xs text-muted-foreground hover:text-foreground"
                      >
                        <Moon className="h-3.5 w-3.5" />
                        <span>{panchang.choghadiyaSection.tabNight[lang]}</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Active Live Choghadiya Banner */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#fdc72d]/25 via-[#fdc72d]/15 to-[#00685d]/10 border border-[#fdc72d]/50 flex flex-wrap items-center justify-between gap-3 mb-5 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00685d] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00685d]" />
                    </span>
                    <span className="text-xs sm:text-sm font-black text-foreground">
                      {lang === "gu" ? "હાલનું ચોઘડિયું:" : "Current Choghadiya:"}{" "}
                      <span className="text-[#8a6800] dark:text-[#fdc72d]">
                        {panchang.choghadiyaSection.liveBanner.activeName[lang]}
                      </span>{" "}
                      ({panchang.choghadiyaSection.liveBanner.timeRange[lang]})
                    </span>
                  </div>

                  <span className="text-[11px] font-bold bg-[#00685d] text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                    {panchang.choghadiyaSection.liveBanner.verdict[lang]}
                  </span>
                </div>

                {/* 8-Interval Choghadiya Table */}
                <Table className="text-xs">
                  <TableHeader>
                    <TableRow className="bg-muted/50 dark:bg-[#141512] text-muted-foreground font-black text-[11px] border-b border-border/60 hover:bg-muted/50">
                      <TableHead className="py-3 px-3.5 rounded-l-lg text-muted-foreground font-black">{lang === "gu" ? "ચોઘડિયું નામ" : "Name"}</TableHead>
                      <TableHead className="py-3 px-3.5 text-muted-foreground font-black">{lang === "gu" ? "સમયગાળો (કલાક)" : "Time Interval"}</TableHead>
                      <TableHead className="py-3 px-3.5 text-muted-foreground font-black">{lang === "gu" ? "પ્રકૃતિ / ફળ" : "Nature / Result"}</TableHead>
                      <TableHead className="py-3 px-3.5 rounded-r-lg text-right text-muted-foreground font-black">{lang === "gu" ? "યોગ્ય કાર્ય" : "Recommended Activities"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-border/50">
                    {(choghadiyaTab === "day"
                      ? panchang.choghadiyaSection.dayList
                      : panchang.choghadiyaSection.nightList
                    ).map((row, idx) => {
                      const isCurrent = choghadiyaTab === "day" && row.isActive
                      return (
                        <TableRow
                          key={idx}
                          className={`transition-colors ${
                            isCurrent
                              ? "bg-[#fdc72d]/15 font-bold hover:bg-[#fdc72d]/20"
                              : "hover:bg-muted/40"
                          }`}
                        >
                          <TableCell className="py-3 px-3.5 font-black text-foreground flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                row.badgeVariant === "emerald"
                                  ? "bg-[#00685d]"
                                  : row.badgeVariant === "destructive"
                                  ? "bg-[#bb171f]"
                                  : row.badgeVariant === "gold"
                                  ? "bg-[#fdc72d]"
                                  : "bg-muted-foreground"
                              }`}
                            />
                            <span>{row.name[lang]}</span>
                            {isCurrent && (
                              <span className="bg-[#fdc72d] text-[#1b1c1a] text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                                {lang === "gu" ? "હાલમાં" : "Live"}
                              </span>
                            )}
                          </TableCell>

                          <TableCell className="py-3 px-3.5 font-mono text-muted-foreground font-medium">
                            {row.time}
                          </TableCell>

                          <TableCell className="py-3 px-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                row.badgeVariant === "emerald"
                                  ? "bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8]"
                                  : row.badgeVariant === "destructive"
                                  ? "bg-[#bb171f]/10 text-[#bb171f] dark:text-[#f87171]"
                                  : row.badgeVariant === "gold"
                                  ? "bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d]"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {row.nature[lang]}
                            </span>
                          </TableCell>

                          <TableCell className="py-3 px-3.5 text-right text-muted-foreground">
                            {row.work[lang]}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* ====================================================== */}
              {/* E. Auspicious & Inauspicious Muhurats (શુભ & વર્જ્ય કાળ)*/}
              {/* ====================================================== */}
              <div
                id="muhurat"
                className="border border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 sm:p-7 shadow-sm"
              >
                <div className="pb-4 border-b border-border/60 mb-5">
                  <h3 className="text-base sm:text-lg font-black text-foreground flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d]" />
                    <span>{panchang.muhuratSection.heading[lang]}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {panchang.muhuratSection.subtitle[lang]}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shubh Muhurats */}
                  <div className="space-y-3">
                    <span className="text-xs sm:text-sm font-black text-[#00685d] dark:text-[#6ed8c8] flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{panchang.muhuratSection.shubhHeading[lang]}</span>
                    </span>

                    <div className="space-y-2.5">
                      {panchang.muhuratSection.shubhList.map((m, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-muted/40 dark:bg-[#151613] border border-border/60 flex items-center justify-between gap-3"
                        >
                          <div>
                            <span className="text-xs font-black text-foreground block">
                              {m.name[lang]}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {m.desc[lang]}
                            </span>
                          </div>

                          <span className="text-[11px] font-bold text-[#00685d] dark:text-[#6ed8c8] bg-[#00685d]/10 px-2.5 py-1 rounded-lg shrink-0">
                            {m.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inauspicious / Prohibited Times */}
                  <div className="space-y-3">
                    <span className="text-xs sm:text-sm font-black text-[#bb171f] dark:text-[#f87171] flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{panchang.muhuratSection.inauspiciousHeading[lang]}</span>
                    </span>

                    <div className="space-y-2.5">
                      {panchang.muhuratSection.inauspiciousList.map((m, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                            m.isAlert
                              ? "bg-[#bb171f]/5 border-[#bb171f]/30"
                              : "bg-muted/40 dark:bg-[#151613] border-border/60"
                          }`}
                        >
                          <div>
                            <span
                              className={`text-xs font-black block ${
                                m.isAlert ? "text-[#bb171f] dark:text-[#f87171]" : "text-foreground"
                              }`}
                            >
                              {m.name[lang]}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {m.desc[lang]}
                            </span>
                          </div>

                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                              m.isAlert
                                ? "bg-[#bb171f] text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {m.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* F. Featured Festival Spotlight Article (હનુમાન જયંતી) */}
              {/* ====================================================== */}
              <div className="border border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl shadow-sm overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={panchang.spotlight.image}
                    alt={panchang.spotlight.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1a] via-[#1b1c1a]/60 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <Badge className="bg-[#fdc72d] text-[#1b1c1a] font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider border-none">
                      {panchang.spotlight.tag[lang]}
                    </Badge>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {panchang.spotlight.title[lang]}
                    </h3>
                    <p className="text-xs text-gray-200">
                      {panchang.spotlight.subtitle[lang]}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-7 space-y-5">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {panchang.spotlight.paragraph[lang]}
                  </p>

                  {/* Devotional Sacred Mantra Callout Box with Audio Simulation */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#00685d]/10 via-[#fdc72d]/15 to-[#00685d]/10 border border-[#fdc72d]/40 text-center space-y-3 relative overflow-hidden">
                    <span className="text-xs font-black text-[#8a6800] dark:text-[#fdc72d] block tracking-wide">
                      {panchang.spotlight.mantraBox.heading[lang]}
                    </span>

                    <p className="text-lg sm:text-2xl font-black text-foreground font-serif tracking-wide select-all py-1">
                      {panchang.spotlight.mantraBox.mantra}
                    </p>

                    <span className="text-xs text-muted-foreground block">
                      {panchang.spotlight.mantraBox.timing[lang]}
                    </span>

                    {/* Audio & Copy Action Controls */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setIsPlayingAudio(!isPlayingAudio)
                          showToast(
                            isPlayingAudio
                              ? (lang === "gu" ? "મંત્ર જાપ ઓડિયો બંધ કર્યો." : "Chant audio paused.")
                              : (lang === "gu" ? "દિવ્ય મંત્ર જાપ ધ્વનિ શરૂ થયો..." : "Sacred mantra audio playing...")
                          )
                        }}
                        className={`text-xs font-bold gap-1.5 h-8 px-4 rounded-lg cursor-pointer ${
                          isPlayingAudio
                            ? "bg-[#bb171f] text-white hover:bg-[#991319]"
                            : "bg-[#00685d] text-white hover:bg-[#005048]"
                        }`}
                      >
                        {isPlayingAudio ? (
                          <>
                            <Pause className="h-3.5 w-3.5" />
                            <span>{lang === "gu" ? "જાપ અટકાવો" : "Pause Chant"}</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-3.5 w-3.5" />
                            <span>{lang === "gu" ? "મંત્ર જાપ સાંભળો" : "Listen Chant"}</span>
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(panchang.spotlight.mantraBox.mantra, "હનુમાન મંત્ર")}
                        className="text-xs font-bold gap-1.5 h-8 px-3 rounded-lg border-border hover:bg-muted cursor-pointer"
                        title="Copy Mantra"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>{lang === "gu" ? "મંત્ર કોપી" : "Copy"}</span>
                      </Button>
                    </div>

                    {/* Simulated Wave Animation when playing */}
                    {isPlayingAudio && (
                      <div className="flex items-center justify-center gap-1 pt-1 animate-pulse">
                        <span className="w-1 h-3 bg-[#00685d] rounded-full animate-bounce" />
                        <span className="w-1 h-5 bg-[#fdc72d] rounded-full animate-bounce delay-75" />
                        <span className="w-1 h-4 bg-[#00685d] rounded-full animate-bounce delay-150" />
                        <span className="w-1 h-6 bg-[#fdc72d] rounded-full animate-bounce delay-200" />
                        <span className="w-1 h-3 bg-[#00685d] rounded-full animate-bounce delay-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8]" />
                        <span>{panchang.spotlight.readTime[lang]}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Heart className="h-4 w-4 text-[#bb171f]" />
                        <span>{panchang.spotlight.viewCount[lang]}</span>
                      </span>
                    </div>

                    <Button
                      onClick={() => router.push("/article/1")}
                      className="bg-[#00685d] text-white hover:bg-[#005048] font-bold text-xs h-9 px-4 rounded-xl cursor-pointer"
                    >
                      <span>{panchang.spotlight.ctaButton[lang]}</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* G. Daily Horoscope 12 Rashis Quick Grid (આજનું રાશિફળ) */}
              {/* ====================================================== */}
              <div
                id="rashifal"
                className="border border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 sm:p-7 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 mb-5 gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-foreground flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{panchang.rashifalSection.heading[lang]}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {panchang.rashifalSection.subtitle[lang]}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast(lang === "gu" ? "સંપૂર્ણ વાર્ષિક રાશિફળ ટૂંક સમયમાં!" : "Full annual horoscope coming soon!")}
                    className="text-xs font-bold text-[#00685d] dark:text-[#6ed8c8] hover:underline flex items-center gap-1 self-start sm:self-center cursor-pointer"
                  >
                    <span>{panchang.rashifalSection.viewAllLink[lang]}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* 12 Rashis Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {panchang.rashifalSection.signs.map((rashi) => (
                    <div
                      key={rashi.id}
                      onClick={() => setSelectedRashi(rashi)}
                      className="p-3.5 rounded-xl bg-muted/40 dark:bg-[#151613] hover:bg-muted/80 dark:hover:bg-[#20211d] border border-border/60 hover:border-[#fdc72d]/60 transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors leading-tight">
                            {rashi.name[lang]}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-bold">
                            {rashi.color[lang]}
                          </span>
                        </div>

                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {rashi.forecast[lang]}
                        </p>
                      </div>

                      {/* Luck Meter Indicator */}
                      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-bold">
                          {lang === "gu" ? "ભાગ્ય:" : "Luck:"}
                        </span>
                        <span className="text-[11px] font-black text-[#00685d] dark:text-[#6ed8c8]">
                          {rashi.luck}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* RIGHT SIDEBAR COLUMN (4 Cols ~ 32%)                       */}
            {/* ======================================================== */}
            <aside className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Widget 1: Real-time Choghadiya Circular Dial Clock */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 shadow-sm text-center">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <h4 className="text-sm font-black text-foreground">
                      {panchang.sidebar.dialWidget.title[lang]}
                    </h4>
                  </div>
                  <span className="bg-[#00685d] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {panchang.sidebar.dialWidget.activeTag[lang]}
                  </span>
                </div>

                {/* Circular Gauge Graphic */}
                <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-border/40"
                      cx="50"
                      cy="50"
                      fill="none"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className="text-[#fdc72d]"
                      cx="50"
                      cy="50"
                      fill="none"
                      r="40"
                      stroke="currentColor"
                      strokeDasharray="251.2"
                      strokeDashoffset="65"
                      strokeLinecap="round"
                      strokeWidth="8"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-black">
                      {lang === "gu" ? "હાલનો સમય" : "Active"}
                    </span>
                    <span className="text-2xl font-black text-[#00685d] dark:text-[#6ed8c8]">
                      {panchang.sidebar.dialWidget.currentName[lang]}
                    </span>
                    <span className="text-[11px] text-[#8a6800] dark:text-[#fdc72d] font-bold">
                      {panchang.sidebar.dialWidget.timeRange[lang]}
                    </span>
                  </div>
                </div>

                <div className="bg-muted/40 dark:bg-[#151613] rounded-xl p-3 text-left border border-border/50">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground font-medium">
                      {panchang.sidebar.dialWidget.nextLabel[lang]}
                    </span>
                    <span className="font-black text-[#00685d] dark:text-[#6ed8c8]">
                      {panchang.sidebar.dialWidget.nextValue[lang]}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {panchang.sidebar.dialWidget.note[lang]}
                  </p>
                </div>
              </Card>

              {/* Widget 2: Scholar Astrological Consultation (Dr. Vishal Modi) */}
              <div className="bg-gradient-to-br from-[#00685d] to-[#005048] text-white rounded-2xl shadow-lg p-5 sm:p-6 relative overflow-hidden border border-[#fdc72d]/30">
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="relative">
                    <Image
                      src={panchang.sidebar.scholarConsultation.avatar}
                      alt={panchang.sidebar.scholarConsultation.name[lang]}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#fdc72d] shadow-sm shrink-0"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#fdc72d] border-2 border-[#00685d]" />
                  </div>
                  <div>
                    <Badge className="bg-[#fdc72d] text-[#1b1c1a] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider border-none">
                      {panchang.sidebar.scholarConsultation.tag[lang]}
                    </Badge>
                    <h4 className="text-base font-black text-white mt-1">
                      {panchang.sidebar.scholarConsultation.name[lang]}
                    </h4>
                    <p className="text-[11px] text-gray-200">
                      {panchang.sidebar.scholarConsultation.credentials[lang]}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-100 leading-relaxed mb-4">
                  {panchang.sidebar.scholarConsultation.description[lang]}
                </p>

                <div className="flex flex-col gap-2.5">
                  <Button
                    onClick={() => {
                      const msg = encodeURIComponent(
                        lang === "gu"
                          ? "જય શ્રી કૃષ્ણ ડૉ. વિશાલ મોદી, મને ચોઘડિયા અને શુભ મુહૂર્ત બાબતે માર્ગદર્શન જોઈએ છે."
                          : "Hello Dr. Vishal Modi, I would like to consult regarding Shubh Muhurat and Panchang."
                      )
                      window.open(`https://wa.me/919825000000?text=${msg}`, "_blank")
                    }}
                    className="w-full bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] font-black text-xs h-10 rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{panchang.sidebar.scholarConsultation.btnWhatsapp[lang]}</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      window.location.href = `tel:${panchang.sidebar.scholarConsultation.phone}`
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold text-xs h-9 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{panchang.sidebar.scholarConsultation.btnCall[lang]}</span>
                  </Button>
                </div>
              </div>

              {/* Widget 3: Upcoming Hindu Festivals & Vrat List */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <h4 className="text-sm font-black text-foreground">
                      {panchang.sidebar.upcomingFestivals.heading[lang]}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast(lang === "gu" ? "સંપૂર્ણ તહેવાર સૂચિ ટૂંક સમયમાં!" : "Full festival list coming soon!")}
                    className="text-[11px] font-bold text-[#00685d] dark:text-[#6ed8c8] hover:underline cursor-pointer"
                  >
                    {panchang.sidebar.upcomingFestivals.viewAllText[lang]}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {panchang.sidebar.upcomingFestivals.items.map((fest, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors border border-border/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-center bg-muted dark:bg-[#151613] p-1.5 rounded-lg min-w-[40px] border border-border/60">
                          <span className="block text-[10px] text-muted-foreground uppercase font-bold">
                            {fest.month[lang]}
                          </span>
                          <span className="block text-sm font-black text-foreground">
                            {fest.day}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`text-xs font-black block leading-snug ${
                              fest.isGold ? "text-[#8a6800] dark:text-[#fdc72d]" : "text-foreground"
                            }`}
                          >
                            {fest.title[lang]}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {fest.desc[lang]}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Widget 4: "MYSHOP" Vedic Spiritual Store Widget */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <h4 className="text-sm font-black text-foreground">
                      {panchang.sidebar.storeWidget.heading[lang]}
                    </h4>
                  </div>
                  <span className="bg-[#00685d] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                    {panchang.sidebar.storeWidget.badge[lang]}
                  </span>
                </div>

                <div className="space-y-3">
                  {panchang.sidebar.storeWidget.products.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40 dark:bg-[#151613] border border-border/50 hover:bg-muted/70 transition-colors"
                    >
                      <Image
                        src={p.image}
                        alt={p.name[lang]}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-lg object-cover bg-muted shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-foreground truncate">
                          {p.name[lang]}
                        </h5>
                        <div className="text-xs font-black text-[#00685d] dark:text-[#6ed8c8] mt-0.5">
                          {p.price}{" "}
                          <span className="line-through text-[10px] text-muted-foreground font-normal">
                            {p.originalPrice}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground block">
                          {p.tag[lang]}
                        </span>
                      </div>

                      <Button
                        size="icon-sm"
                        onClick={() => handleAddToCart(p)}
                        className="bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] shrink-0"
                        title="Add to Cart"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Widget 5: WhatsApp Daily Panchang Subscription Box */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 shadow-sm text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#fdc72d] text-[#1b1c1a] flex items-center justify-center mx-auto shadow-xs">
                  <BellRing className="h-6 w-6" />
                </div>

                <div>
                  <h4 className="text-sm font-black text-foreground">
                    {panchang.sidebar.whatsappSubscription.title[lang]}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {panchang.sidebar.whatsappSubscription.subtitle[lang]}
                  </p>
                </div>

                <form onSubmit={handleWhatsappSubscribe} className="flex flex-col gap-2 pt-1">
                  <Input
                    type="tel"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    placeholder={panchang.sidebar.whatsappSubscription.placeholder[lang]}
                    className="w-full text-xs h-9 bg-muted rounded-lg"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#00685d] text-white hover:bg-[#005048] font-black text-xs h-9 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>{panchang.sidebar.whatsappSubscription.buttonText[lang]}</span>
                  </Button>
                </form>

                <span className="text-[10px] text-muted-foreground block">
                  {panchang.sidebar.whatsappSubscription.freeNote[lang]}
                </span>
              </Card>

            </aside>
          </div>
        </div>
      </main>

      {/* Rashi Detail Interactive Modal */}
      {selectedRashi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-card dark:bg-[#1a1b17] border border-border/80 rounded-2xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedRashi(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#00685d] text-white flex items-center justify-center font-black text-lg">
                <Sparkles className="h-6 w-6 text-[#fdc72d]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground">
                  {selectedRashi.name[lang]}
                </h3>
                <span className="text-xs text-[#8a6800] dark:text-[#fdc72d] font-bold">
                  {selectedRashi.color[lang]} • {lang === "gu" ? "ભાગ્યફળ:" : "Luck:"} {selectedRashi.luck}
                </span>
              </div>
            </div>

            <div className="space-y-3 bg-muted/40 dark:bg-[#141512] p-4 rounded-xl text-xs mb-4">
              <p className="text-foreground leading-relaxed">
                {selectedRashi.forecast[lang]}
              </p>
              <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                <span className="font-bold text-foreground">
                  {lang === "gu" ? "શાસ્ત્રોક્ત ઉપાય:" : "Astrological Remedy:"}
                </span>{" "}
                {lang === "gu"
                  ? "શ્રી હનુમાન ચાલીસા પાઠ કરવો અને ગાય માતાને ગોળ અર્પણ કરવો."
                  : "Chant Hanuman Chalisa and offer jaggery to holy cows."}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRashi(null)}
                className="text-xs h-9"
              >
                {lang === "gu" ? "બંધ કરો" : "Close"}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedRashi(null)
                  showToast(lang === "gu" ? "વિશેષ કુંડળી પરામર્શ બુક થઈ રહ્યો છે..." : "Booking special horoscope session...")
                }}
                className="bg-[#fdc72d] text-[#1b1c1a] font-bold text-xs h-9 hover:bg-[#eab318]"
              >
                {lang === "gu" ? "વિશેષ પરામર્શ" : "Detailed Reading"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Standard Vedic Footer */}
      <AstroFooter config={siteData.config} footer={siteData.footer} />
    </div>
  )
}
