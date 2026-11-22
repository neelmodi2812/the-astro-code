"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  User,
  Mail,
  FileText,
  Lock,
  ArrowRight,
  Heart,
  Briefcase,
  Activity,
  Home,
  Gem,
  Scroll,
  HelpCircle,
  MessageCircle,
  Loader2,
  CalendarCheck,
  ChevronDown,
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { useAuth } from "@/lib/api/hooks/use-auth"
import { userStore } from "@/lib/api/token-store"
import { astrologyService } from "@/lib/api/services/astrology"
import { APPOINTMENT_DATA } from "@/lib/data/appointment-data"
import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const SERVICE_ICONS = {
  Scroll,
  Briefcase,
  Heart,
  Activity,
  Home,
  Gem,
}

const MODE_ICONS = {
  Video,
  Phone,
  MapPin,
}

export default function AppointmentClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const isEn = lang === "en"
  const siteData = useHomeData(lang)
  const { user, isLoggedIn } = useAuth()

  const t = APPOINTMENT_DATA[lang] || APPOINTMENT_DATA.gu

  // Step 1: Selected Service Topic
  const [selectedTopic, setSelectedTopic] = React.useState("kundali")

  // Step 2: Selected Mode
  const [selectedMode, setSelectedMode] = React.useState("video")

  // Step 3: Date & Slot Selection
  const todayISO = React.useMemo(() => {
    const d = new Date()
    return d.toISOString().split("T")[0]
  }, [])

  // Generate the next 10 dates for quick pill selection
  const upcomingDays = React.useMemo(() => {
    const days = []
    const base = new Date()
    for (let i = 0; i < 10; i++) {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      const iso = d.toISOString().split("T")[0]
      const dayName = d.toLocaleDateString(isEn ? "en-IN" : "gu-IN", { weekday: "short" })
      const dateNum = d.toLocaleDateString(isEn ? "en-IN" : "gu-IN", { day: "numeric" })
      const monthName = d.toLocaleDateString(isEn ? "en-IN" : "gu-IN", { month: "short" })
      days.push({ iso, dayName, dateNum, monthName, isToday: i === 0 })
    }
    return days
  }, [isEn])

  const [selectedDate, setSelectedDate] = React.useState(upcomingDays[0]?.iso || todayISO)
  const [selectedSlot, setSelectedSlot] = React.useState("10:00 AM - 11:30 AM")

  // Step 4: Form Fields
  const [formData, setFormData] = React.useState(() => {
    const u = typeof window !== "undefined" ? userStore.get() : null
    return {
      name: u?.name || "",
      phone: u?.phone || "",
      email: u?.email || "",
      dob: u?.birth_date || "",
      tob: u?.birth_time || "",
      tobUnknown: false,
      pob: u?.place_of_birth || "",
      currentCity: u?.city || "",
      questions: "",
      whatsappConsent: true,
    }
  })

  // Submission state
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [bookingConfirmed, setBookingConfirmed] = React.useState(null)
  const [openFaq, setOpenFaq] = React.useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      toast.error(t.form.validationErrors.name)
      return
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      toast.error(t.form.validationErrors.phone)
      return
    }
    if (!selectedDate || !selectedSlot) {
      toast.error(t.form.validationErrors.slot)
      return
    }

    setIsSubmitting(true)

    const selectedServiceObj = t.services.find((s) => s.id === selectedTopic)
    const selectedModeObj = t.modes.find((m) => m.id === selectedMode)

    const payload = {
      full_name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      birth_date: formData.dob || undefined,
      birth_place: formData.pob.trim() || undefined,
      problem_category: selectedTopic,
      message: [
        `Service: ${selectedServiceObj?.title || selectedTopic}`,
        `Mode: ${selectedModeObj?.title || selectedMode}`,
        `Scheduled Date: ${selectedDate}`,
        `Time Slot: ${selectedSlot}`,
        formData.tobUnknown ? "Birth Time: Unknown" : formData.tob ? `Birth Time: ${formData.tob}` : null,
        formData.currentCity ? `Current City: ${formData.currentCity}` : null,
        formData.questions.trim() ? `Devotee Notes: ${formData.questions.trim()}` : null,
      ]
        .filter(Boolean)
        .join(" | "),
    }

    try {
      await astrologyService.bookConsultation(payload, lang)

      const refCode = `ASTRO-APT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()}`

      const confirmedData = {
        refCode,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        serviceTitle: selectedServiceObj?.title || selectedTopic,
        modeTitle: selectedModeObj?.title || selectedMode,
        date: selectedDate,
        slot: selectedSlot,
      }

      setBookingConfirmed(confirmedData)
      toast.success(
        isEn
          ? "Your consultation appointment is confirmed! Our coordinator will contact you shortly."
          : "આપની પરામર્શ અપોઇન્ટમેન્ટ કન્ફર્મ થઈ ગઈ છે! અમારી ટીમ ટૂંક સમયમાં સંપર્ક કરશે."
      )

      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      toast.error(error.message || (isEn ? "Failed to schedule appointment" : "અપોઇન્ટમેન્ટ બુકિંગમાં ક્ષતિ આવી"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#0b322d] text-[#0e3934] dark:text-[#f4f3ee] flex flex-col selection:bg-[#fdc72d]/30">
      {/* 1. Global Astro Header */}
      <AstroHeader
        config={siteData.config}
        topBar={siteData.topBar}
        navLinks={siteData.navLinks}
        activeCategory="appointment"
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
      />

      {/* 2. Top Vedic Accent Strip & Breadcrumb */}
      <section className="w-full bg-[#f4f4f0] dark:bg-[#181916] border-b border-[#e6e3da] dark:border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <Breadcrumb>
            <BreadcrumbList className="text-xs font-medium">
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={
                    <Link
                      href="/"
                      className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors flex items-center gap-1"
                    />
                  }
                >
                  <Sparkles className="size-3.5 text-[#d9a100]" />
                  <span>{t.accentStrip.breadcrumbHome}</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#8a6800] dark:text-[#fdc72d] font-bold">
                  {t.accentStrip.breadcrumbCurrent}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* 3. Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#00685d]/10 via-[#faf9f5] dark:via-[#0b322d] to-[#faf9f5] dark:to-[#0b322d] py-6 sm:py-12 px-3.5 sm:px-6 border-b border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#8a6800] dark:text-[#fdc72d] bg-[#fdc72d]/20 px-3 py-1 rounded-full border border-[#fdc72d]/40 shadow-2xs">
            <Sparkles className="size-3 text-[#d9a100]" />
            <span>{t.hero.invocation}</span>
          </span>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight max-w-3xl leading-snug">
            {t.hero.title}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <Badge className="bg-[#fdc72d] text-[#0e3934] font-black text-xs px-3 py-1 rounded-full shadow-2xs">
              <Award className="size-3.5 mr-1" data-icon="inline-start" />
              <span>{t.hero.experienceBadge}</span>
            </Badge>
            <Badge className="bg-muted text-foreground border border-border/70 font-bold text-xs px-3 py-1 rounded-full">
              <CheckCircle2 className="size-3.5 mr-1 text-[#00685d] dark:text-[#38b2a3]" data-icon="inline-start" />
              <span>{t.hero.clientsBadge}</span>
            </Badge>
          </div>
        </div>
      </section>

      {/* 4. Main Body: Booking Flow (Left) + Astrologer & FAQs (Right) */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-10 flex-1 w-full overflow-x-hidden">
        {bookingConfirmed ? (
          /* =========================================================
             CONFIRMATION / SUCCESS VIEW
             ========================================================= */
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <Card className="p-6 sm:p-8 bg-card dark:bg-[#1a1c18] border-2 border-[#fdc72d]/60 rounded-3xl shadow-xl flex flex-col gap-6 text-center">
              <div className="size-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs ring-4 ring-emerald-500/20">
                <CalendarCheck className="size-8" />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {t.success.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  {t.success.subtitle}
                </p>
              </div>

              {/* Reference Code Box */}
              <div className="p-3.5 rounded-2xl bg-muted/60 dark:bg-[#0f3c36] border border-border/60 max-w-md mx-auto">
                <span className="text-[11px] text-muted-foreground block font-medium">
                  {t.success.refLabel}
                </span>
                <span className="font-mono text-base sm:text-lg font-black text-[#8a6800] dark:text-[#fdc72d] tracking-wider">
                  {bookingConfirmed.refCode}
                </span>
              </div>

              {/* Summary Details */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf9f5] dark:bg-[#151713] border border-border/60 text-left flex flex-col gap-2.5 text-xs sm:text-sm">
                <h3 className="font-bold text-foreground text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {t.success.detailsHeading}
                </h3>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.success.devoteeLabel}</span>
                  <span className="font-bold text-foreground">{bookingConfirmed.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.success.serviceLabel}</span>
                  <span className="font-bold text-[#8a6800] dark:text-[#fdc72d]">{bookingConfirmed.serviceTitle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.success.modeLabel}</span>
                  <span className="font-bold text-foreground">{bookingConfirmed.modeTitle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.success.dateLabel}</span>
                  <span className="font-bold text-foreground">{bookingConfirmed.date}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">{t.success.timeLabel}</span>
                  <span className="font-bold text-foreground">{bookingConfirmed.slot}</span>
                </div>
              </div>

              {/* Pre-consultation Checklist */}
              <div className="text-left bg-muted/40 dark:bg-[#1a1c18] p-4 sm:p-5 rounded-2xl border border-border/50 flex flex-col gap-2">
                <h4 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                  <AlertCircle className="size-4 text-[#8a6800] dark:text-[#fdc72d]" />
                  <span>{t.success.checklistHeading}</span>
                </h4>
                <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                  {t.success.checklists.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#fdc72d] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={() => router.push("/dashboard/consultations")}
                  className="h-11 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-black text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer"
                >
                  <CalendarIcon className="size-4 mr-1.5" data-icon="inline-start" />
                  <span>{t.success.actions.dashboard}</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setBookingConfirmed(null)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="h-11 border-border font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
                >
                  <span>{t.success.actions.bookAnother}</span>
                </Button>
              </div>

              <Link
                href="/"
                className="inline-block text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors pt-2"
              >
                ← {t.success.actions.home}
              </Link>
            </Card>
          </div>
        ) : (
          /* =========================================================
             STANDARD INTERACTIVE BOOKING FLOW
             ========================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN (8 cols): Step-by-Step Form */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* STEP 1: CONSULTATION TOPIC */}
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-xs flex items-center justify-center shrink-0">
                      1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {t.form.steps.step1}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label={t.form.steps.step1}>
                    {t.services.map((srv) => {
                      const IconComponent = SERVICE_ICONS[srv.icon] || Scroll
                      const isSelected = selectedTopic === srv.id

                      return (
                        <div
                          key={srv.id}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={() => setSelectedTopic(srv.id)}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault()
                              setSelectedTopic(srv.id)
                            }
                          }}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                            isSelected
                              ? "bg-card dark:bg-[#1a1c18] border-[#fdc72d] ring-2 ring-[#fdc72d]/40 shadow-sm"
                              : "bg-card/70 dark:bg-[#161814] border-border/70 hover:border-border hover:bg-card"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? "bg-[#fdc72d] text-[#0e3934]"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                <IconComponent className="size-4.5" />
                              </div>
                              <span className="font-bold text-xs sm:text-sm text-foreground leading-snug">
                                {srv.title}
                              </span>
                            </div>

                            {isSelected && (
                              <CheckCircle2 className="size-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0 mt-0.5" />
                            )}
                          </div>

                          <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {srv.desc}
                          </p>

                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border/40">
                            <span className="flex items-center gap-1 text-muted-foreground font-medium">
                              <Clock className="size-3" />
                              <span>{srv.duration}</span>
                            </span>
                            <span className="text-[10px] font-bold text-[#8a6800] dark:text-[#fdc72d] bg-[#fdc72d]/15 px-2 py-0.5 rounded-md">
                              {srv.badge}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* STEP 2: CONSULTATION MODE */}
                <div className="flex flex-col gap-3.5 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-xs flex items-center justify-center shrink-0">
                      2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {t.form.steps.step2}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label={t.form.steps.step2}>
                    {t.modes.map((mode) => {
                      const IconComponent = MODE_ICONS[mode.icon] || Video
                      const isSelected = selectedMode === mode.id

                      return (
                        <div
                          key={mode.id}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={() => setSelectedMode(mode.id)}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault()
                              setSelectedMode(mode.id)
                            }
                          }}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                            isSelected
                              ? "bg-card dark:bg-[#1a1c18] border-[#fdc72d] ring-2 ring-[#fdc72d]/40 shadow-sm"
                              : "bg-card/70 dark:bg-[#161814] border-border/70 hover:border-border hover:bg-card"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div
                              className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-[#fdc72d] text-[#0e3934]"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <IconComponent className="size-4.5" />
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="size-4 text-[#8a6800] dark:text-[#fdc72d]" />
                            )}
                          </div>

                          <div>
                            <span className="font-bold text-xs sm:text-sm text-foreground block">
                              {mode.title}
                            </span>
                            <span className="text-[11px] font-semibold text-[#8a6800] dark:text-[#fdc72d] block mt-0.5">
                              {mode.subtitle}
                            </span>
                          </div>

                          <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                            {mode.desc}
                          </p>

                          <div className="pt-1">
                            <span className="text-[10px] font-bold text-muted-foreground bg-muted/70 px-2 py-0.5 rounded-md inline-block">
                              {mode.badge}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* STEP 3: PREFERRED DATE & TIME SLOT */}
                <div className="flex flex-col gap-3.5 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-xs flex items-center justify-center shrink-0">
                      3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {t.form.steps.step3}
                    </h2>
                  </div>

                  {/* Horizontal Scrollable Date Picker */}
                  <div className="flex flex-col gap-2">
                    <Label className="text-xs font-bold text-muted-foreground block">
                      {isEn ? "Select Date:" : "તારીખ પસંદ કરો:"}
                    </Label>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="radiogroup" aria-label="Available dates">
                      {upcomingDays.map((day) => {
                        const isSelected = selectedDate === day.iso
                        return (
                          <button
                            key={day.iso}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setSelectedDate(day.iso)}
                            className={`flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                              isSelected
                                ? "bg-[#fdc72d] text-[#0e3934] border-[#e5b220] font-black shadow-xs ring-2 ring-[#fdc72d]/40 scale-105"
                                : "bg-card dark:bg-[#1a1c18] border-border/70 hover:border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                              {day.isToday ? (isEn ? "Today" : "આજે") : day.dayName}
                            </span>
                            <span className="text-base sm:text-lg font-black leading-tight my-0.5">
                              {day.dateNum}
                            </span>
                            <span className="text-[10px] font-semibold opacity-80">
                              {day.monthName}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Auspicious Time Slots */}
                  <div className="flex flex-col gap-3 pt-2">
                    <Label className="text-xs font-bold text-muted-foreground block">
                      {isEn ? "Select Auspicious Time Slot:" : "શુભ મુહૂર્ત સમય સ્લોટ પસંદ કરો:"}
                    </Label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {t.timeSlots.map((group) => (
                        <div
                          key={group.period}
                          className="p-3 rounded-2xl bg-muted/40 dark:bg-[#151713] border border-border/60 flex flex-col gap-2"
                        >
                          <span className="text-[11px] font-bold text-muted-foreground block text-center">
                            {group.title}
                          </span>
                          <div className="flex flex-col gap-1.5" role="radiogroup" aria-label={group.title}>
                            {group.slots.map((slot) => {
                              const isSelected = selectedSlot === slot
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  role="radio"
                                  aria-checked={isSelected}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`w-full py-2 px-2.5 text-xs rounded-xl font-bold transition-all text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                                    isSelected
                                      ? "bg-[#00685d] text-white shadow-xs"
                                      : "bg-card dark:bg-[#20211d] border border-border/60 text-foreground hover:border-[#fdc72d]/60"
                                  }`}
                                >
                                  {slot}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STEP 4: NATAL BIRTH & CONTACT DETAILS */}
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-xs flex items-center justify-center shrink-0">
                      4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {t.form.steps.step4}
                    </h2>
                  </div>

                  <Card className="p-3.5 sm:p-6 bg-card dark:bg-[#1a1c18] border-border/80 rounded-2xl shadow-xs flex flex-col gap-4 w-full max-w-full overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="apt-name" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <User className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                          <span>{t.form.nameLabel} *</span>
                        </Label>
                        <Input
                          id="apt-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t.form.namePlaceholder}
                          className="h-10 text-xs sm:text-sm rounded-xl"
                        />
                      </div>

                      {/* Mobile / WhatsApp */}
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="apt-phone" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <Phone className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                          <span>{t.form.phoneLabel} *</span>
                        </Label>
                        <Input
                          id="apt-phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.form.phonePlaceholder}
                          className="h-10 text-xs sm:text-sm rounded-xl"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="apt-email" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <Mail className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                          <span>{t.form.emailLabel}</span>
                        </Label>
                        <Input
                          id="apt-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.form.emailPlaceholder}
                          className="h-10 text-xs sm:text-sm rounded-xl"
                        />
                        <span className="text-[10px] text-muted-foreground block">{t.form.emailHint}</span>
                      </div>

                      {/* Date of Birth */}
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="apt-dob" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <CalendarIcon className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                          <span>{t.form.dobLabel}</span>
                        </Label>
                        <Input
                          id="apt-dob"
                          type="date"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="h-10 text-xs sm:text-sm rounded-xl"
                        />
                      </div>

                      {/* Time of Birth */}
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="apt-tob" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <Clock className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                          <span>{t.form.tobLabel}</span>
                        </Label>
                        <Input
                          id="apt-tob"
                          disabled={formData.tobUnknown}
                          value={formData.tob}
                          onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                          placeholder={t.form.tobPlaceholder}
                          className="h-10 text-xs sm:text-sm rounded-xl disabled:opacity-50"
                        />
                        <div className="flex items-center gap-2 pt-1">
                          <Checkbox
                            id="apt-tob-unknown"
                            checked={formData.tobUnknown}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                tobUnknown: !!checked,
                                tob: checked ? "" : formData.tob,
                              })
                            }
                          />
                          <Label htmlFor="apt-tob-unknown" className="text-[11px] font-normal text-muted-foreground cursor-pointer">
                            {t.form.tobUnknownLabel}
                          </Label>
                        </div>
                      </div>

                      {/* Place of Birth */}
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="apt-pob" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                          <span>{t.form.pobLabel}</span>
                        </Label>
                        <Input
                          id="apt-pob"
                          value={formData.pob}
                          onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                          placeholder={t.form.pobPlaceholder}
                          className="h-10 text-xs sm:text-sm rounded-xl"
                        />
                      </div>

                      {/* Current City */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <Label htmlFor="apt-city" className="text-xs font-bold text-foreground">
                          {t.form.currentCityLabel}
                        </Label>
                        <Input
                          id="apt-city"
                          value={formData.currentCity}
                          onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                          placeholder={t.form.currentCityPlaceholder}
                          className="h-10 text-xs sm:text-sm rounded-xl"
                        />
                      </div>

                      {/* Priority Questions */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <Label htmlFor="apt-questions" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <FileText className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                          <span>{t.form.questionsLabel}</span>
                        </Label>
                        <Textarea
                          id="apt-questions"
                          rows={3}
                          value={formData.questions}
                          onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                          placeholder={t.form.questionsPlaceholder}
                          className="text-xs sm:text-sm rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 sm:pt-3 w-full">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-auto min-h-11 sm:min-h-12 py-3 px-3 sm:px-4 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-black text-xs sm:text-sm md:text-base rounded-xl shadow-[0_6px_20px_rgba(253,199,45,0.28)] transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 border border-[#e5b220] whitespace-normal text-center leading-snug active:scale-[0.99]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" data-icon="inline-start" />
                            <span>{t.form.submitting}</span>
                          </>
                        ) : (
                          <>
                            <CalendarCheck data-icon="inline-start" />
                            <span className="text-center font-black">{t.form.submitButton}</span>
                            <ArrowRight data-icon="inline-end" />
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN (4 cols): Astrologer Profile & FAQs */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Astrologer Profile Card */}
              <Card className="p-5 bg-card dark:bg-[#1a1c18] border-border/80 rounded-3xl shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative size-16 rounded-2xl overflow-hidden ring-2 ring-[#fdc72d]/60 shadow-md shrink-0 bg-muted">
                    <Image
                      src={t.doctor.avatar}
                      alt={t.doctor.name}
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black uppercase text-[#8a6800] dark:text-[#fdc72d] tracking-wider block">
                      {t.doctor.title}
                    </span>
                    <h3 className="text-base font-black text-foreground truncate">
                      {t.doctor.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.doctor.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/50 dark:bg-[#151713] border border-border/40 text-xs flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Award className="size-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                    <span>{t.doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4 text-muted-foreground shrink-0" />
                    <span className="line-clamp-1">{t.doctor.location}</span>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="flex flex-col gap-2 pt-1 border-t border-border/50">
                  <h4 className="text-xs font-bold text-foreground">
                    {isEn ? "What You Receive:" : "પરામર્શમાં શું મળશે:"}
                  </h4>
                  <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                    {t.doctor.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-[#00685d] dark:text-[#38b2a3] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Helpline Box */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#00685d]/10 to-[#fdc72d]/10 border border-[#fdc72d]/30 text-xs flex flex-col gap-1">
                  <span className="font-bold text-[#8a6800] dark:text-[#fdc72d] block">
                    {isEn ? "Need Immediate Assistance?" : "ત્વરિત સહાયતાની જરૂર છે?"}
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    {isEn ? "Helpline:" : "હેલ્પલાઇન:"} +91 79 4000 8108 / +91 98250 26388
                  </p>
                </div>
              </Card>

              {/* Consultation FAQs */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="size-4 text-[#8a6800] dark:text-[#fdc72d]" />
                  <h3 className="text-sm font-bold text-foreground">
                    {isEn ? "Frequently Asked Questions" : "વારંવાર પૂછાતા પ્રશ્નો (FAQs)"}
                  </h3>
                </div>

                <div className="w-full flex flex-col gap-2">
                  {t.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx
                    return (
                      <div
                        key={idx}
                        className="border border-border/70 rounded-2xl bg-card dark:bg-[#1a1c18] px-4 py-3 overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-left text-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-foreground" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <p className="text-xs text-muted-foreground leading-relaxed pt-2.5 border-t border-border/50 mt-2.5">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. Global Astro Footer */}
      <AstroFooter config={siteData.config} footer={siteData.footer} />
    </div>
  )
}

