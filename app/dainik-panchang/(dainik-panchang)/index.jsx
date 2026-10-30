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
  CheckCircle2,
  AlertTriangle,
  Copy,
  Phone,
  MessageCircle,
  Play,
  Pause,
  MapPin,
  X,
  Compass,
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { toast } from "@/components/ui/sonner"
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
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { getAstroData } from "@/lib/data/astro-data"
import { usePanchangData } from "@/lib/api/hooks/use-panchang-data"
import { useLanguage } from "@/components/language-provider"
import { formatDigits } from "@/lib/utils"

/**
 * The bundled calendar, festival spotlight, rashifal, planetary strip and upcoming-festival
 * widgets are April 2025 sample content, not computed for today. Flip to true only once they are
 * backed by real panchang data.
 */
const SHOW_BUNDLED_SAMPLE_SECTIONS = false

export default function DainikPanchangClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const [siteData, setSiteData] = useState(() => getAstroData(lang))

  useEffect(() => {
    setSiteData(getAstroData(lang))
  }, [lang])

  const panchang = usePanchangData(lang)

  // Interactive States
  const [selectedCityId, setSelectedCityId] = useState("ahmedabad")
  const [choghadiyaTab, setChoghadiyaTab] = useState("day") // "day" or "night"
  const [selectedCellDate, setSelectedCellDate] = useState("૧૨") // default to 12 April (today)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [selectedRashi, setSelectedRashi] = useState(null)

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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-[#fdc72d]/30 selection:text-[#0e3934]">
      {/* 1. Header */}
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
        cartCount={0}
      />

      <main className="flex-1 w-full bg-background pt-3 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 2. Top Breadcrumb */}
          <div className="flex items-center justify-between py-2 mb-4">
            <Breadcrumb>
              <BreadcrumbList className="text-xs sm:text-sm font-medium">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-1 hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors"
                    >
                      <Compass className="h-3.5 w-3.5" />
                      <span>{panchang.breadcrumb.home[lang]}</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#00685d] dark:text-[#fdc72d] font-bold">
                    {panchang.breadcrumb.current[lang]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* 3. Streamlined Sacred Header Banner */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#00685d] via-[#00766a] to-[#004f46] text-white p-6 sm:p-8 shadow-md mb-8 overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Info: Samvat & Title */}
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06302b]/20 text-[#ffdf96] text-xs font-bold border border-white/10">
                  <Sparkles className="h-3.5 w-3.5 text-[#fdc72d]" />
                  <span>{formatDigits(panchang.banner.samvatInfo[lang], lang)}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                  {panchang.banner.title[lang]}
                </h1>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                  {panchang.banner.subtitle[lang]}
                </p>
              </div>

              {/* Right Controls: Location Dropdown & Jump to Today */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-wrap items-center gap-3 border border-white/15 self-start lg:self-center shrink-0">
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedCityId}
                    onValueChange={(val) => {
                      setSelectedCityId(val)
                      const c = panchang.cities.find((item) => item.id === val)
                      if (c) {
                        showToast(lang === "gu" ? `સ્થળ બદલાયું: ${c.name?.[lang] || c.gu}` : `Location: ${c.name?.[lang] || c.en}`)
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white text-gray-900 font-bold text-xs rounded-lg shadow-sm cursor-pointer h-9 min-w-[130px] border-none px-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#00685d] shrink-0" />
                        <SelectValue>
                          {currentCity ? (currentCity.name?.[lang] || currentCity[lang]?.replace(" (IST)", "")) : (lang === "gu" ? "અમદાવાદ" : "Ahmedabad")}
                        </SelectValue>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {panchang.cities.map((city) => (
                          <SelectItem key={city.id} value={city.id} className="text-xs font-semibold cursor-pointer">
                            {city.name?.[lang] || city[lang]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() => {
                      setSelectedCellDate("૧૨")
                      showToast(lang === "gu" ? "આજના પંચાંગ પર પહોંચ્યા!" : "Jumped to Today's Panchang!")
                    }}
                    className="bg-[#fdc72d] text-[#0e3934] hover:bg-[#eab318] text-xs font-bold h-9 px-3.5 shadow-sm cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>{panchang.banner.todayButtonText[lang]}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Main 2-Column Grid (Main Content + Refined Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ======================================================== */}
            {/* LEFT MAIN COLUMN (8 Cols ~ 67%)                          */}
            {/* ======================================================== */}
            <div className="lg:col-span-8 flex flex-col gap-8">

              {/* ====================================================== */}
              {/* SECTION 1: PRIMARY 5 ANGAS OF PANCHANG (FIRST FOCUS!)   */}
              {/* ====================================================== */}
              <div
                id="panchang-details"
                className="border border-border/80 bg-card dark:bg-[#0d3833] rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Header Strip */}
                <div className="bg-gradient-to-r from-[#00685d] to-[#008376] p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#fdc72d] text-[#0e3934] flex items-center justify-center font-bold shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                        {panchang.coreAngas.heading[lang]}
                      </h2>
                      <p className="text-xs text-gray-200">
                        {panchang.coreAngas.dateLine[lang]}
                      </p>
                    </div>
                  </div>

                  {SHOW_BUNDLED_SAMPLE_SECTIONS && (
                  <Badge className="bg-[#fdc72d] text-[#0e3934] font-bold text-xs px-2.5 py-1 rounded-full border-none shadow-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {panchang.coreAngas.festivalBadge[lang]}
                  </Badge>
                  )}
                </div>

                {/* 5 Angas 5-Card Row: Tithi, Vaar, Nakshatra, Yoga, Karana */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {panchang.coreAngas.limbs.map((limb, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-muted/40 dark:bg-[#0c3530] border border-border/60 hover:border-[#00685d]/40 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
                              {limb.label[lang]}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00685d] dark:bg-[#fdc72d]" />
                          </div>
                          <h3 className="text-sm font-bold text-foreground leading-snug">
                            {limb.name[lang]}
                          </h3>
                        </div>

                        <div className="mt-3 pt-2 border-t border-border/40">
                          <span className="text-xs font-medium text-muted-foreground block line-clamp-2">
                            {formatDigits(limb.timing[lang], lang)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Planetary Positions Strip */}
                  {SHOW_BUNDLED_SAMPLE_SECTIONS && (
                  <div className="mt-5 pt-4 border-t border-border/60">
                    <span className="text-xs font-bold text-muted-foreground block mb-2.5 uppercase tracking-wider">
                      {panchang.coreAngas.planetaryHeading[lang]}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {panchang.coreAngas.planets.map((pl, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-muted/30 dark:bg-[#0c3430] border border-border/40 flex flex-col"
                        >
                          <span className="text-xs text-muted-foreground font-semibold">
                            {pl.title[lang]}
                          </span>
                          <span className="text-xs font-bold text-foreground mt-0.5">
                            {pl.sign[lang]}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">
                            {pl.nakshatra[lang]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  )}
                </div>
              </div>

              {/* ====================================================== */}
              {/* SECTION 2: CELESTIAL SUN & MOON TIMINGS                */}
              {/* ====================================================== */}
              <div className="border border-border/80 bg-card dark:bg-[#0d3833] rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-4">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Sun className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                    <span>{panchang.celestialTimings.heading[lang]}</span>
                  </h3>
                  <span className="text-xs text-muted-foreground font-semibold">
                    {currentCity.name?.[lang] || currentCity[lang]}
                  </span>
                </div>

                {/* 4 Cards Grid: Sunrise, Sunset, Moonrise, Moonset */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Sunrise */}
                  <div className="p-3 rounded-xl bg-muted/40 dark:bg-[#0c3530] border border-border/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-[#b28200] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                      <Sunrise className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-bold block">
                        {panchang.celestialTimings.items[0].label[lang]}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {formatDigits(currentCity.sunrise, lang)}
                      </span>
                    </div>
                  </div>

                  {/* Sunset */}
                  <div className="p-3 rounded-xl bg-muted/40 dark:bg-[#0c3530] border border-border/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                      <Sunset className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-bold block">
                        {panchang.celestialTimings.items[1].label[lang]}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {formatDigits(currentCity.sunset, lang)}
                      </span>
                    </div>
                  </div>

                  {/* Moonrise */}
                  <div className="p-3 rounded-xl bg-muted/40 dark:bg-[#0c3530] border border-border/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Moon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-bold block">
                        {panchang.celestialTimings.items[2].label[lang]}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {formatDigits(currentCity.moonrise, lang)}
                      </span>
                    </div>
                  </div>

                  {/* Moonset */}
                  <div className="p-3 rounded-xl bg-muted/40 dark:bg-[#0c3530] border border-border/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-muted text-foreground flex items-center justify-center shrink-0 border border-border/60">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-bold block">
                        {panchang.celestialTimings.items[3].label[lang]}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {formatDigits(currentCity.moonset, lang)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Day / Night Duration Bar */}
                <div className="mt-3.5 p-2.5 rounded-lg bg-muted/30 dark:bg-[#0c3530] border border-border/40 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {formatDigits(panchang.celestialTimings.dayDuration[lang], lang)}
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatDigits(panchang.celestialTimings.nightDuration[lang], lang)}
                  </span>
                  <span className="text-[#00685d] dark:text-[#6ed8c8] font-bold">
                    {formatDigits(panchang.celestialTimings.midday[lang], lang)}
                  </span>
                </div>
              </div>

              {/* ====================================================== */}
              {/* SECTION 3: AUSPICIOUS & INAUSPICIOUS MUHURAT (SIDE BY SIDE) */}
              {/* ====================================================== */}
              <div
                id="muhurat"
                className="border border-border/80 bg-card dark:bg-[#0d3833] rounded-2xl p-5 sm:p-6 shadow-sm"
              >
                <div className="pb-3 border-b border-border/60 mb-5">
                  <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#00685d] dark:text-[#fdc72d]" />
                    <span>{panchang.muhuratSection.heading[lang]}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {panchang.muhuratSection.subtitle[lang]}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Left Column: Shubh Muhurats (Auspicious) */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-1 border-b border-emerald-500/20">
                      <CheckCircle2 className="h-4 w-4 text-[#00685d] dark:text-[#38b2a3]" />
                      <span className="text-xs sm:text-sm font-bold text-[#00685d] dark:text-[#38b2a3]">
                        {panchang.muhuratSection.shubhHeading[lang]}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {panchang.muhuratSection.shubhList.slice(0, 1).map((m, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-between gap-3"
                        >
                          <div>
                            <span className="text-xs font-bold text-foreground block">
                              {m.name[lang]}
                            </span>
                            <span className="text-xs text-muted-foreground font-medium">
                              {m.desc[lang]}
                            </span>
                          </div>

                          <span className="text-xs font-bold text-[#00685d] dark:text-[#38b2a3] bg-emerald-100/60 dark:bg-emerald-900/40 px-2.5 py-1 rounded-md shrink-0">
                            {formatDigits(m.time, lang)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Inauspicious / Rahu Kaal (Strictly Avoid) */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-1 border-b border-red-500/20">
                      <AlertTriangle className="h-4 w-4 text-[#bb171f] dark:text-[#f87171]" />
                      <span className="text-xs sm:text-sm font-bold text-[#bb171f] dark:text-[#f87171]">
                        {panchang.muhuratSection.inauspiciousHeading[lang]}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {panchang.muhuratSection.inauspiciousList.slice(0, 1).map((m, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                            m.isAlert
                              ? "bg-red-50/60 dark:bg-red-950/25 border-red-200 dark:border-red-900/40"
                              : "bg-muted/40 dark:bg-[#0c3530] border-border/60"
                          }`}
                        >
                          <div>
                            <span
                              className={`text-xs font-bold block ${
                                m.isAlert ? "text-[#bb171f] dark:text-[#f87171]" : "text-foreground"
                              }`}
                            >
                              {m.name[lang]}
                            </span>
                            <span className="text-xs text-muted-foreground font-medium">
                              {m.desc[lang]}
                            </span>
                          </div>

                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-md shrink-0 ${
                              m.isAlert
                                ? "bg-[#bb171f] text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {formatDigits(m.time, lang)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* SECTION 4: CHOGHADIYA TIMINGS TABLE                    */}
              {/* ====================================================== */}
              <div
                id="choghadiya"
                className="border border-border/80 bg-card dark:bg-[#0d3833] rounded-2xl p-5 sm:p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 mb-4 gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#00685d] dark:text-[#fdc72d]" />
                      <span>{panchang.choghadiyaSection.heading[lang]}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {panchang.choghadiyaSection.subtitle[lang]}
                    </p>
                  </div>

                  {/* Day / Night Tabs */}
                  <Tabs
                    value={choghadiyaTab}
                    onValueChange={setChoghadiyaTab}
                    className="shrink-0"
                  >
                    <TabsList className="bg-muted dark:bg-[#0c3430] rounded-lg p-1 border border-border/60 h-auto">
                      <TabsTrigger
                        value="day"
                        className="px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer data-active:bg-[#00685d] data-active:text-white"
                      >
                        <Sun className="h-3.5 w-3.5" />
                        <span>{panchang.choghadiyaSection.tabDay[lang]}</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="night"
                        className="px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer data-active:bg-[#00685d] data-active:text-white"
                      >
                        <Moon className="h-3.5 w-3.5" />
                        <span>{panchang.choghadiyaSection.tabNight[lang]}</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Clean Active Choghadiya Info Pill */}
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00685d] dark:bg-[#38b2a3]" />
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      {lang === "gu" ? "હાલનું ચોઘડિયું:" : "Current Choghadiya:"}{" "}
                      <span className="text-[#00685d] dark:text-[#38b2a3] font-bold">
                        {panchang.choghadiyaSection.liveBanner.activeName[lang]}
                      </span>
                      {panchang.choghadiyaSection.liveBanner.timeRange[lang] && (
                        <> ({formatDigits(panchang.choghadiyaSection.liveBanner.timeRange[lang], lang)})</>
                      )}
                    </span>
                  </div>

                  {panchang.choghadiyaSection.liveBanner.verdict[lang] && (
                    <span className="text-xs font-bold text-[#00685d] dark:text-[#38b2a3]">
                      {panchang.choghadiyaSection.liveBanner.verdict[lang]}
                    </span>
                  )}
                </div>

                {/* 8 Choghadiya Intervals Table */}
                <div className="overflow-x-auto">
                  <Table className="text-xs min-w-[500px]">
                    <TableHeader>
                      <TableRow className="bg-muted/50 dark:bg-[#0c3430] text-muted-foreground font-bold text-xs border-b border-border/60">
                        <TableHead className="py-2.5 px-3 font-bold">{lang === "gu" ? "ચોઘડિયું" : "Choghadiya"}</TableHead>
                        <TableHead className="py-2.5 px-3 font-bold">{lang === "gu" ? "સમયગાળો" : "Time Interval"}</TableHead>
                        <TableHead className="py-2.5 px-3 font-bold">{lang === "gu" ? "સ્થિતિ" : "Nature"}</TableHead>
                        <TableHead className="py-2.5 px-3 text-right font-bold">{lang === "gu" ? "યોગ્ય કાર્ય" : "Recommended Activities"}</TableHead>
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
                                ? "bg-emerald-50/70 dark:bg-emerald-950/20 font-bold"
                                : "hover:bg-muted/40"
                            }`}
                          >
                            <TableCell className="py-2.5 px-3 font-bold text-foreground flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  row.badgeVariant === "emerald"
                                    ? "bg-[#00685d]"
                                    : row.badgeVariant === "destructive"
                                    ? "bg-[#bb171f]"
                                    : "bg-[#fdc72d]"
                                }`}
                              />
                              <span>{row.name[lang]}</span>
                              {isCurrent && (
                                <Badge className="bg-[#00685d] text-white text-xs px-1 py-0">
                                  {lang === "gu" ? "હાલમાં" : "Active"}
                                </Badge>
                              )}
                            </TableCell>

                            <TableCell className="py-2.5 px-3 tabular-nums text-muted-foreground font-medium">
                              {formatDigits(row.time, lang)}
                            </TableCell>

                            <TableCell className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-bold ${
                                  row.badgeVariant === "emerald"
                                    ? "bg-emerald-100 text-[#00685d] dark:bg-emerald-950 dark:text-[#38b2a3]"
                                    : row.badgeVariant === "destructive"
                                    ? "bg-red-100 text-[#bb171f] dark:bg-red-950 dark:text-[#f87171]"
                                    : "bg-amber-100 text-[#8a6800] dark:bg-amber-950 dark:text-[#fdc72d]"
                                }`}
                              >
                                {row.nature[lang]}
                              </span>
                            </TableCell>

                            <TableCell className="py-2.5 px-3 text-right text-muted-foreground">
                              {row.work[lang]}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {SHOW_BUNDLED_SAMPLE_SECTIONS && (
              <>
              {/* ====================================================== */}
              {/* SECTION 5: MONTHLY CALENDAR GRID (MAASIK DARSAN)        */}
              {/* ====================================================== */}
              <div className="border border-border/80 bg-card dark:bg-[#0d3833] rounded-2xl p-5 sm:p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 mb-4 gap-2">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                    <span>{formatDigits(panchang.monthlyCalendar.heading[lang], lang)}</span>
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#fdc72d]" />
                      <span>{panchang.monthlyCalendar.legend.festival[lang]}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#00685d]" />
                      <span>{panchang.monthlyCalendar.legend.ekadashi[lang]}</span>
                    </span>
                  </div>
                </div>

                {/* Calendar Table Grid */}
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[580px]">
                    {/* Day Headers (Sun - Sat) */}
                    <div className="grid grid-cols-7 gap-1 bg-muted/40 dark:bg-[#0c3430] p-1.5 rounded-lg text-center text-xs font-bold text-muted-foreground mb-1.5">
                      {panchang.monthlyCalendar.daysOfWeek.map((d) => (
                        <div
                          key={d.id}
                          className={`py-1 ${
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

                    {/* Date Cells */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {panchang.monthlyCalendar.cells.map((cell, idx) => {
                        const isSelected = formatDigits(selectedCellDate, "en") === formatDigits(cell.dayNumber, "en")
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedCellDate(cell.dayNumber)
                              showToast(
                                lang === "gu"
                                  ? `${formatDigits(cell.dayNumber, "gu")} એપ્રિલ (${cell.tithi[lang]}) પસંદ કરેલ`
                                  : `${formatDigits(cell.dayNumber, "en")} April (${cell.tithi[lang]}) selected`
                              )
                            }}
                            className={`p-1.5 rounded-lg flex flex-col justify-between h-16 transition-all cursor-pointer border text-left ${
                              cell.isPreviousMonth || cell.isNextMonth
                                ? "bg-muted/10 text-muted-foreground/30 border-transparent opacity-40"
                                : isSelected
                                ? "bg-emerald-50 dark:bg-emerald-950/40 border-[#00685d] dark:border-[#fdc72d] ring-1 ring-[#00685d] dark:ring-[#fdc72d]"
                                : cell.isToday
                                ? "bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700"
                                : "bg-muted/20 hover:bg-muted/50 border-border/40"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-bold ${
                                  cell.isToday
                                    ? "text-[#00685d] dark:text-[#fdc72d]"
                                    : "text-foreground"
                                }`}
                              >
                                {formatDigits(cell.dayNumber, lang)}
                              </span>
                              {cell.isToday && (
                                <span className="bg-[#00685d] text-white text-[8px] font-bold px-1 rounded">
                                  {lang === "gu" ? "આજે" : "Today"}
                                </span>
                              )}
                            </div>

                            <span className="text-xs text-muted-foreground truncate">
                              {cell.tithi[lang]}
                            </span>

                            {cell.fest ? (
                              <span
                                className={`text-[8px] font-bold px-1 py-0.5 rounded truncate block ${
                                  cell.highlightGold || cell.isToday
                                    ? "bg-[#fdc72d] text-[#0e3934]"
                                    : cell.type === "ekadashi"
                                    ? "bg-[#00685d] text-white"
                                    : "bg-muted text-foreground"
                                }`}
                              >
                                {cell.fest[lang]}
                              </span>
                            ) : (
                              <span className="text-[8px] text-transparent">-</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* SECTION 6: TODAY'S SACRED FESTIVAL SPOTLIGHT           */}
              {/* ====================================================== */}
              <div className="border border-border/80 bg-card dark:bg-[#0d3833] rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <Badge className="bg-[#00685d] text-white text-xs font-bold px-2.5 py-0.5 rounded">
                      {panchang.spotlight.tag[lang]}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">
                      {panchang.spotlight.readTime[lang]}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                    {panchang.spotlight.title[lang]}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {panchang.spotlight.paragraph[lang]}
                  </p>

                  {/* Clean Sacred Mantra Box */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50/60 via-amber-50/40 to-emerald-50/60 dark:from-emerald-950/20 dark:via-amber-950/20 dark:to-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-center space-y-2">
                    <span className="text-xs font-bold text-[#00685d] dark:text-[#fdc72d] block">
                      {panchang.spotlight.mantraBox.heading[lang]}
                    </span>

                    <p className="text-base sm:text-xl font-bold text-foreground font-serif tracking-wide py-1">
                      {panchang.spotlight.mantraBox.mantra}
                    </p>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      <Button
                        size="sm"
                        onClick={() => {
                          setIsPlayingAudio(!isPlayingAudio)
                          showToast(
                            isPlayingAudio
                              ? (lang === "gu" ? "મંત્ર જાપ બંધ કર્યો." : "Chant paused.")
                              : (lang === "gu" ? "મંત્ર જાપ શરૂ થયો..." : "Mantra playing...")
                          )
                        }}
                        className="text-xs font-bold gap-1.5 h-8 px-3 rounded-lg bg-[#00685d] text-white hover:bg-[#005048] cursor-pointer"
                      >
                        {isPlayingAudio ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                        <span>{isPlayingAudio ? (lang === "gu" ? "અટકાવો" : "Pause") : (lang === "gu" ? "સાંભળો" : "Listen")}</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(panchang.spotlight.mantraBox.mantra, "હનુમાન મંત્ર")}
                        className="text-xs font-bold gap-1.5 h-8 px-3 rounded-lg border-border hover:bg-muted cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>{lang === "gu" ? "કોપી" : "Copy"}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* SECTION 7: DAILY RASHIFAL (12 RASHIS)                  */}
              {/* ====================================================== */}
              <div
                id="rashifal"
                className="border border-border/80 bg-card dark:bg-[#0d3833] rounded-2xl p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#00685d] dark:text-[#fdc72d]" />
                      <span>{panchang.rashifalSection.heading[lang]}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {panchang.rashifalSection.subtitle[lang]}
                    </p>
                  </div>
                </div>

                {/* 12 Rashis Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {panchang.rashifalSection.signs.map((rashi) => (
                    <div
                      key={rashi.id}
                      onClick={() => setSelectedRashi(rashi)}
                      className="p-3 rounded-xl bg-muted/40 dark:bg-[#0c3530] hover:bg-muted/70 border border-border/60 hover:border-[#00685d]/40 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-foreground">
                            {rashi.name[lang]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {rashi.forecast[lang]}
                        </p>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-border/40 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{rashi.color[lang]}</span>
                        <span className="font-bold text-[#00685d] dark:text-[#38b2a3]">
                          {formatDigits(rashi.luck, lang)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              </>
              )}
            </div>

            {/* ======================================================== */}
            {/* RIGHT SIDEBAR (3 STREAMLINED WIDGETS - ZERO OVERCROWDING) */}
            {/* ======================================================== */}
            <aside className="lg:col-span-4 flex flex-col gap-6">

              {/* Sidebar Widget 1: Quick Panchang Highlights Card */}
              {SHOW_BUNDLED_SAMPLE_SECTIONS && (
              <Card className="border-border/80 bg-card dark:bg-[#0d3833] rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                    <span>{lang === "gu" ? "આજના મુખ્ય મુહૂર્ત સારાંશ" : "Today's Muhurat Summary"}</span>
                  </h4>
                  <Badge className="bg-[#00685d] text-white text-xs px-1.5 py-0.5">
                    {lang === "gu" ? "સૂર્ય સિદ્ધાંત" : "Vedic"}
                  </Badge>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-foreground block">
                        {lang === "gu" ? "શ્રેષ્ઠ મુહૂર્ત (અભિજીત)" : "Best Muhurat (Abhijit)"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {lang === "gu" ? "સર્વ મંગલ કાર્યો માટે" : "All auspicious beginnings"}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#00685d] dark:text-[#38b2a3]">
                      ૧૨:૦૧ - ૧૨:૫૨
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#bb171f] dark:text-[#f87171] block">
                        {lang === "gu" ? "રાહુ કાળ (વર્જ્ય સમય)" : "Rahu Kaal (Avoid)"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {lang === "gu" ? "નવા કાર્ય કે યાત્રા ટાળવી" : "Avoid travel & new deals"}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#bb171f] dark:text-[#f87171]">
                      ૦૯:૨૪ - ૧૧:૦૦
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-muted/40 dark:bg-[#0c3530] border border-border/50 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-foreground block">
                        {lang === "gu" ? "અમૃત ચોઘડિયું" : "Amrit Choghadiya"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {lang === "gu" ? "સાંજની પૂજા & ઉપાસના" : "Evening prayers & puja"}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#00685d] dark:text-[#38b2a3]">
                      ૧૭:૨૦ - ૧૮:૫૬
                    </span>
                  </div>
                </div>
              </Card>
              )}

              {/* Sidebar Widget 2: Scholar Astrological Consultation (Dr. Vishal Modi) */}
              <div className="bg-gradient-to-br from-[#00685d] to-[#004d44] text-white rounded-2xl shadow-md p-5 sm:p-6 border border-[#fdc72d]/20 space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={panchang.sidebar.scholarConsultation.avatar}
                    alt={panchang.sidebar.scholarConsultation.name[lang]}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#fdc72d] shrink-0"
                  />
                  <div>
                    <Badge className="bg-[#fdc72d] text-[#0e3934] text-xs font-bold px-1.5 py-0 rounded border-none">
                      {panchang.sidebar.scholarConsultation.tag[lang]}
                    </Badge>
                    <h4 className="text-sm font-bold text-white mt-1">
                      {panchang.sidebar.scholarConsultation.name[lang]}
                    </h4>
                    <p className="text-xs text-emerald-100">
                      {panchang.sidebar.scholarConsultation.credentials[lang]}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {panchang.sidebar.scholarConsultation.description[lang]}
                </p>

                <div className="flex flex-col gap-2 pt-1">
                  <Button
                    onClick={() => {
                      const msg = encodeURIComponent(
                        lang === "gu"
                          ? "જય શ્રી કૃષ્ણ ડૉ. વિશાલ મોદી, મને ચોઘડિયા અને શુભ મુહૂર્ત બાબતે માર્ગદર્શન જોઈએ છે."
                          : "Hello Dr. Vishal Modi, I would like to consult regarding Shubh Muhurat and Panchang."
                      )
                      window.open(`https://wa.me/917940008108?text=${msg}`, "_blank")
                    }}
                    className="w-full bg-[#fdc72d] text-[#0e3934] hover:bg-[#eab318] font-bold text-xs h-9 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{panchang.sidebar.scholarConsultation.btnWhatsapp[lang]}</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      window.location.href = `tel:${panchang.sidebar.scholarConsultation.phone}`
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold text-xs h-9 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{panchang.sidebar.scholarConsultation.btnCall[lang]}</span>
                  </Button>
                </div>
              </div>

              {/* Sidebar Widget 3: Upcoming Hindu Festivals & Vrat List */}
              {SHOW_BUNDLED_SAMPLE_SECTIONS && (
              <Card className="border-border/80 bg-card dark:bg-[#0d3833] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                    <span>{panchang.sidebar.upcomingFestivals.heading[lang]}</span>
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {panchang.sidebar.upcomingFestivals.items.map((fest, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors border border-border/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="text-center bg-muted dark:bg-[#0c3530] p-1 rounded-md min-w-[36px] border border-border/50">
                          <span className="block text-xs text-muted-foreground uppercase font-bold">
                            {fest.month[lang]}
                          </span>
                          <span className="block text-xs font-bold text-foreground">
                            {formatDigits(fest.day, lang)}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`text-xs font-bold block leading-snug ${
                              fest.isGold ? "text-[#00685d] dark:text-[#fdc72d]" : "text-foreground"
                            }`}
                          >
                            {fest.title[lang]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDigits(fest.desc[lang], lang)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              )}
            </aside>
          </div>
        </div>
      </main>

      {/* Rashi Detail Interactive Modal */}
      {selectedRashi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06302b]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-card dark:bg-[#0d3833] border border-border/80 rounded-2xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedRashi(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00685d] text-white flex items-center justify-center font-bold text-lg">
                <Sparkles className="h-5 w-5 text-[#fdc72d]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  {selectedRashi.name[lang]}
                </h3>
                <span className="text-xs text-[#00685d] dark:text-[#fdc72d] font-bold">
                  {selectedRashi.color[lang]} • {lang === "gu" ? "ભાગ્યફળ:" : "Luck:"} {formatDigits(selectedRashi.luck, lang)}
                </span>
              </div>
            </div>

            <div className="space-y-3 bg-muted/40 dark:bg-[#0c3430] p-4 rounded-xl text-xs mb-4">
              <p className="text-foreground leading-relaxed">
                {selectedRashi.forecast[lang]}
              </p>
              <div className="pt-2 border-t border-border/50 text-xs text-muted-foreground">
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
                className="text-xs h-8"
              >
                {lang === "gu" ? "બંધ કરો" : "Close"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Footer */}
      <AstroFooter config={siteData.config} footer={siteData.footer} />
    </div>
  )
}
