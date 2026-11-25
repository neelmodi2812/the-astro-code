"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Calendar as CalendarIcon,
  Clock,
  Phone,
  Building,
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
  ArrowLeft,
  Heart,
  Briefcase,
  Users,
  Activity,
  Coins,
  Scroll,
  Home,
  MessageCircle,
  Loader2,
  CalendarCheck,
  ChevronDown,
  ExternalLink,
  CreditCard,
  Wallet,
  Landmark,
  Check,
  RotateCcw,
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
import { Card } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const TOPIC_ICONS = {
  Briefcase,
  Heart,
  Users,
  Activity,
  Coins,
  Scroll,
  Home,
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false)
    if (window.Razorpay) return resolve(true)

    const existingScript = document.getElementById("razorpay-checkout-js")
    if (existingScript) {
      existingScript.onload = () => resolve(true)
      existingScript.onerror = () => resolve(false)
      return
    }

    const script = document.createElement("script")
    script.id = "razorpay-checkout-js"
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

function generateGoogleCalendarUrl({ title, description, location, startDate, startTime, durationMinutes }) {
  try {
    const [year, month, day] = startDate.split("-").map(Number)
    let hours = 10
    let minutes = 0
    if (startTime && startTime.includes(":")) {
      const parts = startTime.split(":")
      hours = parseInt(parts[0], 10)
      if (startTime.toLowerCase().includes("pm") && hours < 12) hours += 12
      if (startTime.toLowerCase().includes("am") && hours === 12) hours = 0
      const minPart = parts[1].replace(/[^0-9]/g, "")
      minutes = parseInt(minPart, 10) || 0
    }
    // IST is UTC + 5:30 -> subtract 5h 30m for UTC ISO string
    const start = new Date(Date.UTC(year, month - 1, day, hours - 5, minutes - 30))
    const end = new Date(start.getTime() + (durationMinutes || 30) * 60000)

    const formatGDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "")

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      details: description,
      location: location || "Online Video / Phone Consultation",
      dates: `${formatGDate(start)}/${formatGDate(end)}`,
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  } catch {
    return "https://calendar.google.com/calendar"
  }
}

export default function AppointmentClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const isEn = lang === "en"
  const siteData = useHomeData(lang)
  const { user, isLoggedIn } = useAuth()

  const t = APPOINTMENT_DATA[lang] || APPOINTMENT_DATA.gu

  // State: 7 Steps
  // Step 1: Topic
  const [selectedTopic, setSelectedTopic] = React.useState("kundli")

  // Step 2: Duration (30 or 60 min)
  const [selectedDuration, setSelectedDuration] = React.useState(60)

  // Step 3: Mode (call or office)
  const [selectedMode, setSelectedMode] = React.useState("call")

  // Step 4: Available Dates (Split by Mode)
  const [availableDatesList, setAvailableDatesList] = React.useState([])
  const [selectedDate, setSelectedDate] = React.useState("")
  const [loadingDates, setLoadingDates] = React.useState(false)

  // Step 5: Time Slot
  const [availableSlotsList, setAvailableSlotsList] = React.useState([])
  const [selectedSlot, setSelectedSlot] = React.useState("")
  const [loadingSlots, setLoadingSlots] = React.useState(false)

  // Step 6: Personal Details Form
  const [formData, setFormData] = React.useState(() => {
    const u = typeof window !== "undefined" ? userStore.get() : null
    return {
      fullName: u?.name || "",
      phone: u?.phone || "",
      email: u?.email || "",
      gender: "male",
      dob: u?.birth_date || "",
      tob: u?.birth_time || "",
      tobUnknown: false,
      pob: u?.place_of_birth || "",
      notes: "",
      whatsappConsent: true,
    }
  })

  // Dynamic Config & Razorpay key
  const [configData, setConfigData] = React.useState(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [bookingConfirmed, setBookingConfirmed] = React.useState(null)
  const [openFaq, setOpenFaq] = React.useState(null)

  // Fetch initial config from backend
  React.useEffect(() => {
    let isMounted = true
    astrologyService
      .consultationConfig(lang)
      .then((res) => {
        if (!isMounted) return
        const data = res?.data || res
        if (data && typeof data === "object") {
          setConfigData(data)
        }
      })
      .catch(() => {
        // Fallback gracefully to appointment-data.js
      })
    return () => {
      isMounted = false
    }
  }, [lang])

  // Step 4: Fetch Available Dates whenever selectedMode changes
  React.useEffect(() => {
    let isMounted = true
    setLoadingDates(true)

    astrologyService
      .availableDates({ mode: selectedMode }, lang)
      .then((res) => {
        if (!isMounted) return
        const dates = res?.data?.dates || res?.dates || []
        if (Array.isArray(dates) && dates.length > 0) {
          setAvailableDatesList(dates)
          setSelectedDate(dates[0].date)
        } else {
          setAvailableDatesList([])
          setSelectedDate("")
        }
      })
      .catch(() => {
        if (!isMounted) return
        setAvailableDatesList([])
        setSelectedDate("")
      })
      .finally(() => {
        if (isMounted) setLoadingDates(false)
      })

    return () => {
      isMounted = false
    }
  }, [selectedMode, isEn])

  // Step 5: Fetch Available Slots whenever date, duration or mode changes
  React.useEffect(() => {
    if (!selectedDate) return
    let isMounted = true
    setLoadingSlots(true)

    astrologyService
      .availableSlots({ mode: selectedMode, date: selectedDate, duration: selectedDuration }, lang)
      .then((res) => {
        if (!isMounted) return
        const slots = res?.data?.slots || res?.slots || []
        if (Array.isArray(slots) && slots.length > 0) {
          setAvailableSlotsList(slots)
          const firstAvail = slots.find((s) => s.available !== false)
          setSelectedSlot(firstAvail ? firstAvail.time_slot || firstAvail.label : "")
        } else {
          setAvailableSlotsList([])
          setSelectedSlot("")
        }
      })
      .catch(() => {
        if (!isMounted) return
        setAvailableSlotsList([])
        setSelectedSlot("")
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false)
      })

    return () => {
      isMounted = false
    }
  }, [selectedDate, selectedDuration, selectedMode, lang])

  // Helper to compute prices
  const activeDurationObj = React.useMemo(() => {
    return t.durations.find((d) => d.minutes === selectedDuration) || t.durations[1]
  }, [selectedDuration, t.durations])

  const activeTopicObj = React.useMemo(() => {
    return t.topics.find((tp) => tp.id === selectedTopic) || t.topics[0]
  }, [selectedTopic, t.topics])

  const activeModeObj = React.useMemo(() => {
    return t.modes.find((m) => m.id === selectedMode) || t.modes[0]
  }, [selectedMode, t.modes])

  // Form Submission & Payment Processing (Step 7)
  const handleProceedToPayment = async (e) => {
    if (e && e.preventDefault) e.preventDefault()

    // Validation
    if (!formData.fullName.trim()) {
      toast.error(t.form.validationErrors.name)
      return
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      toast.error(t.form.validationErrors.phone)
      return
    }
    if (!selectedDate) {
      toast.error(t.form.validationErrors.date)
      return
    }
    if (!selectedSlot) {
      toast.error(t.form.validationErrors.slot)
      return
    }

    setIsSubmitting(true)

    const payload = {
      full_name: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      gender: formData.gender,
      birth_date: formData.dob || undefined,
      birth_time: formData.tobUnknown ? "Unknown" : formData.tob || undefined,
      birth_place: formData.pob.trim() || undefined,
      topic: selectedTopic,
      duration_minutes: selectedDuration,
      mode: selectedMode,
      booking_date: selectedDate,
      time_slot: selectedSlot,
      message: [
        `Topic: ${activeTopicObj.nameEn || activeTopicObj.name}`,
        `Duration: ${selectedDuration} Mins`,
        `Mode: ${selectedMode === "call" ? "Phone / Video Call" : "In-Person Office Visit"}`,
        `Gender: ${formData.gender}`,
        formData.notes.trim() ? `Devotee Notes: ${formData.notes.trim()}` : null,
      ]
        .filter(Boolean)
        .join(" | "),
    }

    try {
      const response = await astrologyService.bookConsultation(payload, lang)
      const resData = response?.data || response

      const bookingNumber =
        resData?.booking_number ||
        `TAC-APT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random()
          .toString(36)
          .substring(2, 6)
          .toUpperCase()}`

      const confirmedState = {
        bookingNumber,
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        topic: activeTopicObj.name,
        topicEn: activeTopicObj.nameEn,
        duration: activeDurationObj.title,
        durationMinutes: selectedDuration,
        mode: activeModeObj.title,
        modeId: selectedMode,
        date: selectedDate,
        slot: selectedSlot,
        amount: activeDurationObj.price,
        address: activeModeObj.address,
      }

      // Check if Razorpay order is returned and configured
      const rpData = resData?.razorpay
      if (rpData && rpData.order_id && rpData.key_id) {
        const scriptLoaded = await loadRazorpayScript()
        if (scriptLoaded && window.Razorpay) {
          const options = {
            key: rpData.key_id,
            amount: rpData.amount,
            currency: rpData.currency || "INR",
            name: "The Astro Code",
            description: `${activeDurationObj.title} with Dr. Vishal Modi`,
            order_id: rpData.order_id,
            handler: async function (rpResponse) {
              try {
                await astrologyService.verifyPayment(
                  {
                    booking_number: bookingNumber,
                    razorpay_order_id: rpResponse.razorpay_order_id,
                    razorpay_payment_id: rpResponse.razorpay_payment_id,
                    razorpay_signature: rpResponse.razorpay_signature,
                  },
                  lang
                )
                setBookingConfirmed(confirmedState)
                toast.success(
                  isEn ? "Payment received! Booking confirmed." : "ચુકવણી સફળ રહી! અપોઇન્ટમેન્ટ કન્ફર્મ થઈ ગઈ છે."
                )
                window.scrollTo({ top: 0, behavior: "smooth" })
              } catch (verifyErr) {
                // Confirm anyway with pending status
                setBookingConfirmed(confirmedState)
                toast.success(
                  isEn ? "Appointment booked! Our coordinator will contact you." : "અપોઇન્ટમેન્ટ બુક થઈ ગઈ છે."
                )
              }
            },
            prefill: {
              name: formData.fullName.trim(),
              contact: formData.phone.trim(),
              email: formData.email.trim(),
            },
            theme: {
              color: "#00685d",
            },
            modal: {
              ondismiss: function () {
                // If user dismissed modal, retain confirmed booking with pending payment
                setBookingConfirmed(confirmedState)
                toast.info(
                  isEn
                    ? "Appointment recorded. You may complete payment via UPI/WhatsApp."
                    : "અપોઇન્ટમેન્ટ નોંધાઈ ગઈ છે. આપ WhatsApp દ્વારા ચુકવણી પૂર્ણ કરી શકો છો."
                )
              },
            },
          }
          const rzp = new window.Razorpay(options)
          rzp.open()
          setIsSubmitting(false)
          return
        }
      }

      // Direct booking confirmation
      setBookingConfirmed(confirmedState)
      toast.success(
        isEn
          ? "Your consultation appointment is booked! Our team will contact you shortly."
          : "આપની પરામર્શ અપોઇન્ટમેન્ટ બુક થઈ ગઈ છે! અમારી ટીમ ટૂંક સમયમાં સંપર્ક કરશે."
      )
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      toast.error(err.message || (isEn ? "Failed to schedule appointment" : "અપોઇન્ટમેન્ટ બુકિંગમાં ક્ષતિ આવી"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // WhatsApp click handler
  const handleWhatsAppContact = () => {
    if (!bookingConfirmed || !configData?.whatsapp_number) return
    const whatsappNum = configData.whatsapp_number
    const cleanNum = whatsappNum.replace(/[^0-9]/g, "")
    const msg = isEn
      ? `Jai Shree Krishna Dr. Vishal Modi. I have booked consultation ${bookingConfirmed.bookingNumber} for ${bookingConfirmed.topicEn || bookingConfirmed.topic} on ${bookingConfirmed.date} at ${bookingConfirmed.slot}. Devotee: ${bookingConfirmed.name}.`
      : `જય શ્રી કૃષ્ણ ડૉ. વિશાલ મોદી. મેં પરામર્શ અપોઇન્ટમેન્ટ બુક કરી છે (રેફરન્સ: ${bookingConfirmed.bookingNumber}), વિષય: ${bookingConfirmed.topic}, તારીખ: ${bookingConfirmed.date}, સમય: ${bookingConfirmed.slot}. યજમાન: ${bookingConfirmed.name}.`
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#0c1322] text-[#0e3934] dark:text-[#e8edfc] flex flex-col selection:bg-[#fdc72d]/30 transition-colors">
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
      <section className="w-full bg-[#f4f4f0] dark:bg-[#080d17] border-b border-[#e6e3da] dark:border-white/10 px-4 sm:px-6 py-2.5 transition-colors">
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

      {/* 3. Hero Header Section matching Flowchart style */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#00685d]/12 via-[#faf9f5] dark:via-[#0c1322] to-[#faf9f5] dark:to-[#0c1322] py-8 sm:py-12 px-3.5 sm:px-6 border-b border-border/40">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdc72d]/15 border border-[#fdc72d]/40 text-[#8a6800] dark:text-[#fdc72d] text-xs font-black tracking-widest uppercase shadow-2xs">
            <Sparkles className="size-3 text-[#d9a100]" />
            <span>{t.flowHeader.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            {isEn ? t.flowHeader.title : t.flowHeader.titleGu}
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground max-w-xl leading-relaxed">
            {isEn ? t.flowHeader.subtitle : t.flowHeader.subtitleGu}
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

      {/* 4. Main Body: 7-Step Interactive Flow */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 py-6 sm:py-12 flex-1 w-full">
        {bookingConfirmed ? (
          /* =========================================================
             FINAL NODE: BOOKING CONFIRMED (Yellow Badge Screen)
             ========================================================= */
          <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
            <Card className="p-6 sm:p-8 bg-card dark:bg-[#121b2f] border-2 border-[#fdc72d] rounded-3xl shadow-2xl flex flex-col gap-6 text-center">
              {/* Yellow Confirmed Badge matching flowchart node */}
              <div className="inline-flex items-center gap-2 self-center px-4 py-2 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-sm sm:text-base shadow-md">
                <Check className="size-5 stroke-[3]" />
                <span>{t.success.confirmedBadge}</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="text-xl sm:text-2xl font-black text-foreground">{t.success.title}</h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {t.success.subtitle}
                </p>
              </div>

              {/* Reference Code Box */}
              <div className="p-3.5 rounded-2xl bg-muted/60 dark:bg-[#17233d] border border-border/60 max-w-sm mx-auto w-full">
                <span className="text-[11px] text-muted-foreground block font-medium">{t.success.refLabel}</span>
                <span className="font-mono text-base sm:text-xl font-black text-[#8a6800] dark:text-[#fdc72d] tracking-wider">
                  {bookingConfirmed.bookingNumber}
                </span>
              </div>

              {/* Confirmed Details Grid */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf9f5] dark:bg-[#0d1424] border border-border/60 text-left flex flex-col gap-2.5 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.form.fullNameLabel}:</span>
                  <span className="font-bold text-foreground">{bookingConfirmed.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.payment.topicLabel}</span>
                  <span className="font-bold text-[#8a6800] dark:text-[#fdc72d]">{bookingConfirmed.topic}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.payment.durationLabel}</span>
                  <span className="font-bold text-foreground">{bookingConfirmed.duration}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.payment.modeLabel}</span>
                  <span className="font-bold text-foreground">{bookingConfirmed.mode}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.payment.dateLabel}</span>
                  <span className="font-bold text-foreground">{bookingConfirmed.date}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">{t.payment.slotLabel}</span>
                  <span className="font-bold text-foreground">{bookingConfirmed.slot}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">{t.payment.totalLabel}</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                    ₹{bookingConfirmed.amount}
                  </span>
                </div>

                {bookingConfirmed.modeId === "office" && bookingConfirmed.address && (
                  <div className="mt-1 pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                    <strong className="text-foreground block mb-0.5">Office Address:</strong>
                    {bookingConfirmed.address}
                  </div>
                )}
              </div>

              {/* Action Buttons: Add to Google Calendar & WhatsApp Chat */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={generateGoogleCalendarUrl({
                    title: `Astrology Consultation with Dr. Vishal Modi (${bookingConfirmed.topic})`,
                    description: `Vedic Consultation Booking #${bookingConfirmed.bookingNumber}.\nTopic: ${bookingConfirmed.topic}\nDuration: ${bookingConfirmed.duration}\nMode: ${bookingConfirmed.mode}`,
                    location:
                      bookingConfirmed.modeId === "office"
                        ? bookingConfirmed.address
                        : "Phone / Video Call (Google Meet)",
                    startDate: bookingConfirmed.date,
                    startTime: bookingConfirmed.slot,
                    durationMinutes: bookingConfirmed.durationMinutes,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <CalendarIcon className="size-4" />
                  <span>{t.success.addToCalendar}</span>
                  <ExternalLink className="size-3.5 opacity-70" />
                </a>

                <Button
                  disabled={!configData?.whatsapp_number}
                  onClick={handleWhatsAppContact}
                  className="flex-1 h-11 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="size-4" />
                  <span>{t.success.whatsappChat}</span>
                </Button>
              </div>

              {/* Return to Home / Book Another */}
              <div className="flex items-center justify-center gap-4 text-xs font-bold pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setBookingConfirmed(null)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="size-3.5" />
                  <span>{t.success.bookAnother}</span>
                </button>
                <span className="text-border">•</span>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.success.returnHome}
                </Link>
              </div>
            </Card>
          </div>
        ) : (
          /* =========================================================
             7-STEP INTERACTIVE BOOKING FLOWCHART
             ========================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Flowchart Tree (8 cols on lg) */}
            <div className="lg:col-span-8 flex flex-col gap-6 relative">
              {/* Vertical connecting line backdrop for desktop */}
              <div className="absolute left-4 sm:left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#fdc72d] via-[#00685d]/40 to-[#fdc72d] hidden sm:block -z-10" />

              {/* -----------------------------------------------------------------
                  STEP 1: SELECT CONSULTATION TOPIC
                  ----------------------------------------------------------------- */}
              <Card className="p-5 sm:p-6 bg-card dark:bg-[#121b2f] border border-border/80 rounded-3xl shadow-sm transition-all hover:border-[#fdc72d]/50">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="size-8 sm:size-9 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#fdc72d]/20">
                    1
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8a6800] dark:text-[#fdc72d] block">
                      STEP 1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {isEn ? t.steps.step1.titleEn : t.steps.step1.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {isEn ? t.steps.step1.descEn : t.steps.step1.desc}
                    </p>
                  </div>
                </div>

                {/* 7 Topic Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
                  {t.topics.map((tp) => {
                    const isSelected = selectedTopic === tp.id
                    const IconComponent = TOPIC_ICONS[tp.icon] || Scroll
                    return (
                      <button
                        key={tp.id}
                        type="button"
                        onClick={() => setSelectedTopic(tp.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                          isSelected
                            ? "bg-[#fdc72d]/15 border-[#fdc72d] ring-2 ring-[#fdc72d]/30 text-foreground shadow-xs"
                            : "bg-muted/40 dark:bg-[#17233d]/60 border-border/70 hover:border-border text-foreground hover:bg-muted/70"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? "bg-[#fdc72d] text-[#0e3934]" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <IconComponent className="size-4" />
                          </div>
                          {isSelected && <CheckCircle2 className="size-4 text-[#8a6800] dark:text-[#fdc72d]" />}
                        </div>
                        <div>
                          <span className="font-bold text-xs block leading-snug">
                            {isEn ? tp.nameEn || tp.name : tp.name}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </Card>

              {/* -----------------------------------------------------------------
                  STEP 2: SELECT SESSION DURATION
                  ----------------------------------------------------------------- */}
              <Card className="p-5 sm:p-6 bg-card dark:bg-[#121b2f] border border-border/80 rounded-3xl shadow-sm transition-all hover:border-[#fdc72d]/50">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="size-8 sm:size-9 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#fdc72d]/20">
                    2
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8a6800] dark:text-[#fdc72d] block">
                      STEP 2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {isEn ? t.steps.step2.titleEn : t.steps.step2.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {isEn ? t.steps.step2.descEn : t.steps.step2.desc}
                    </p>
                  </div>
                </div>

                {/* 2 Duration Option Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {t.durations.map((dur) => {
                    const isSelected = selectedDuration === dur.minutes
                    return (
                      <div
                        key={dur.minutes}
                        onClick={() => setSelectedDuration(dur.minutes)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                          isSelected
                            ? "bg-[#fdc72d]/10 dark:bg-[#17233d] border-[#fdc72d] ring-2 ring-[#fdc72d]/40 shadow-sm"
                            : "bg-muted/40 dark:bg-[#17233d]/40 border-border/70 hover:border-border hover:bg-muted/60"
                        }`}
                      >
                        {dur.popular && (
                          <span className="absolute -top-2.5 right-4 bg-[#fdc72d] text-[#0e3934] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                            {isEn ? "Most Popular" : "સૌથી વધુ પસંદગી"}
                          </span>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`size-9 rounded-xl flex items-center justify-center ${
                                isSelected ? "bg-[#fdc72d] text-[#0e3934]" : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <Clock className="size-4.5" />
                            </div>
                            <div>
                              <span className="font-bold text-sm text-foreground block">
                                {isEn ? dur.titleEn : dur.title}
                              </span>
                              <span className="text-xs text-muted-foreground block">
                                {isEn ? dur.subtitleEn : dur.subtitle}
                              </span>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="size-4.5 text-[#8a6800] dark:text-[#fdc72d]" />}
                        </div>

                        <div className="flex items-baseline justify-between pt-2 border-t border-border/40">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black text-foreground">₹{dur.price}</span>
                            <span className="text-xs text-muted-foreground line-through">₹{dur.originalPrice}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#8a6800] dark:text-[#fdc72d]">
                            {dur.minutes} Mins
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* -----------------------------------------------------------------
                  STEP 3: SELECT CONSULTATION MODE
                  ----------------------------------------------------------------- */}
              <Card className="p-5 sm:p-6 bg-card dark:bg-[#121b2f] border border-border/80 rounded-3xl shadow-sm transition-all hover:border-[#fdc72d]/50">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="size-8 sm:size-9 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#fdc72d]/20">
                    3
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8a6800] dark:text-[#fdc72d] block">
                      STEP 3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {isEn ? t.steps.step3.titleEn : t.steps.step3.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {isEn ? t.steps.step3.descEn : t.steps.step3.desc}
                    </p>
                  </div>
                </div>

                {/* 2 Mode Cards: Call vs Office Visit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {t.modes.map((mode) => {
                    const isSelected = selectedMode === mode.id
                    return (
                      <div
                        key={mode.id}
                        onClick={() => setSelectedMode(mode.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                          isSelected
                            ? "bg-[#fdc72d]/10 dark:bg-[#17233d] border-[#fdc72d] ring-2 ring-[#fdc72d]/40 shadow-sm"
                            : "bg-muted/40 dark:bg-[#17233d]/40 border-border/70 hover:border-border hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`size-9 rounded-xl flex items-center justify-center ${
                                isSelected ? "bg-[#fdc72d] text-[#0e3934]" : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {mode.id === "call" ? <Phone className="size-4.5" /> : <Building className="size-4.5" />}
                            </div>
                            <div>
                              <span className="font-bold text-sm text-foreground block">
                                {isEn ? mode.titleEn : mode.title}
                              </span>
                              <span className="text-xs text-muted-foreground block">
                                {isEn ? mode.subtitleEn : mode.subtitle}
                              </span>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="size-4.5 text-[#8a6800] dark:text-[#fdc72d]" />}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border/40">
                          <span className="text-[11px] font-bold text-[#8a6800] dark:text-[#fdc72d] bg-[#fdc72d]/15 px-2 py-0.5 rounded-md">
                            {mode.badge}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {mode.id === "call" ? "Mon - Sat" : "Tue, Thu, Sat"}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* -----------------------------------------------------------------
                  STEP 4: AVAILABLE DATES (Split by Mode)
                  ----------------------------------------------------------------- */}
              <Card className="p-5 sm:p-6 bg-card dark:bg-[#121b2f] border border-border/80 rounded-3xl shadow-sm transition-all hover:border-[#fdc72d]/50">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="size-8 sm:size-9 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#fdc72d]/20">
                    4
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8a6800] dark:text-[#fdc72d] block">
                      STEP 4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {selectedMode === "call"
                        ? isEn
                          ? t.steps.step4.titleCallEn
                          : t.steps.step4.titleCall
                        : isEn
                          ? t.steps.step4.titleOfficeEn
                          : t.steps.step4.titleOffice}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {selectedMode === "call"
                        ? isEn
                          ? t.steps.step4.descCallEn
                          : t.steps.step4.descCall
                        : isEn
                          ? t.steps.step4.descOfficeEn
                          : t.steps.step4.descOffice}
                    </p>
                  </div>
                </div>

                {/* Horizontal Date Picker */}
                {loadingDates ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="size-6 animate-spin text-[#fdc72d]" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
                    {availableDatesList.map((d) => {
                      const isSelected = selectedDate === d.date
                      return (
                        <button
                          key={d.date}
                          type="button"
                          onClick={() => setSelectedDate(d.date)}
                          className={`flex flex-col items-center justify-center min-w-[72px] sm:min-w-[80px] py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                            isSelected
                              ? "bg-[#fdc72d] text-[#0e3934] border-[#e5b220] font-black shadow-sm ring-2 ring-[#fdc72d]/40 scale-105"
                              : "bg-muted/40 dark:bg-[#17233d]/60 border-border/70 hover:border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                            {d.day_name ? d.day_name.slice(0, 3) : "Day"}
                          </span>
                          <span className="text-base sm:text-lg font-black leading-tight my-0.5">
                            {d.day_number || d.date.split("-")[2]}
                          </span>
                          <span className="text-[10px] font-semibold opacity-80">
                            {d.month_short || "Month"}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </Card>

              {/* -----------------------------------------------------------------
                  STEP 5: SELECT TIME SLOT
                  ----------------------------------------------------------------- */}
              <Card className="p-5 sm:p-6 bg-card dark:bg-[#121b2f] border border-border/80 rounded-3xl shadow-sm transition-all hover:border-[#fdc72d]/50">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="size-8 sm:size-9 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#fdc72d]/20">
                    5
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8a6800] dark:text-[#fdc72d] block">
                      STEP 5
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {isEn ? t.steps.step5.titleEn : t.steps.step5.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {isEn ? t.steps.step5.descEn : t.steps.step5.desc}
                    </p>
                  </div>
                </div>

                {loadingSlots ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="size-6 animate-spin text-[#fdc72d]" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
                    {availableSlotsList.map((slot) => {
                      const slotVal = slot.time_slot || slot.label
                      const isSelected = selectedSlot === slotVal
                      const isAvail = slot.available !== false

                      return (
                        <button
                          key={slotVal}
                          type="button"
                          disabled={!isAvail}
                          onClick={() => setSelectedSlot(slotVal)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] disabled:opacity-40 disabled:cursor-not-allowed ${
                            isSelected
                              ? "bg-[#00685d] text-white shadow-xs ring-2 ring-[#00685d]/40"
                              : "bg-muted/40 dark:bg-[#17233d]/60 border border-border/70 text-foreground hover:border-[#fdc72d]/60"
                          }`}
                        >
                          <span>{slot.label || slotVal}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </Card>

              {/* -----------------------------------------------------------------
                  STEP 6: PERSONAL DETAILS FORM
                  ----------------------------------------------------------------- */}
              <Card className="p-5 sm:p-6 bg-card dark:bg-[#121b2f] border border-border/80 rounded-3xl shadow-sm transition-all hover:border-[#fdc72d]/50">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="size-8 sm:size-9 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#fdc72d]/20">
                    6
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8a6800] dark:text-[#fdc72d] block">
                      STEP 6
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {isEn ? t.steps.step6.titleEn : t.steps.step6.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {isEn ? t.steps.step6.descEn : t.steps.step6.desc}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="step-name" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <User className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{t.form.fullNameLabel} *</span>
                    </Label>
                    <Input
                      id="step-name"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t.form.fullNamePlaceholder}
                      className="h-10 text-xs sm:text-sm rounded-xl"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="step-phone" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Phone className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{t.form.phoneLabel} *</span>
                    </Label>
                    <Input
                      id="step-phone"
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
                    <Label htmlFor="step-email" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Mail className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{t.form.emailLabel}</span>
                    </Label>
                    <Input
                      id="step-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.form.emailPlaceholder}
                      className="h-10 text-xs sm:text-sm rounded-xl"
                    />
                  </div>

                  {/* Gender (Male, Female, Other) */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-bold text-foreground">{t.form.genderLabel}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {t.form.genderOptions.map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, gender: g.id })}
                          className={`h-10 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            formData.gender === g.id
                              ? "bg-[#fdc72d] text-[#0e3934] border-[#e5b220] shadow-xs"
                              : "bg-muted/40 border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          {g.label.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="step-dob" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <CalendarIcon className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{t.form.dobLabel}</span>
                    </Label>
                    <Input
                      id="step-dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="h-10 text-xs sm:text-sm rounded-xl"
                    />
                  </div>

                  {/* Time of Birth */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="step-tob" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Clock className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{t.form.tobLabel}</span>
                    </Label>
                    <Input
                      id="step-tob"
                      disabled={formData.tobUnknown}
                      value={formData.tob}
                      onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                      placeholder={t.form.tobPlaceholder}
                      className="h-10 text-xs sm:text-sm rounded-xl disabled:opacity-50"
                    />
                    <div className="flex items-center gap-2 pt-0.5">
                      <Checkbox
                        id="step-tob-unknown"
                        checked={formData.tobUnknown}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            tobUnknown: !!checked,
                            tob: checked ? "" : formData.tob,
                          })
                        }
                      />
                      <Label
                        htmlFor="step-tob-unknown"
                        className="text-[11px] font-normal text-muted-foreground cursor-pointer"
                      >
                        {t.form.tobUnknownLabel}
                      </Label>
                    </div>
                  </div>

                  {/* Place of Birth */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label htmlFor="step-pob" className="text-xs font-bold text-foreground">
                      {t.form.pobLabel}
                    </Label>
                    <Input
                      id="step-pob"
                      value={formData.pob}
                      onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                      placeholder={t.form.pobPlaceholder}
                      className="h-10 text-xs sm:text-sm rounded-xl"
                    />
                  </div>

                  {/* Questions / Notes */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label htmlFor="step-notes" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <FileText className="size-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{t.form.notesLabel}</span>
                    </Label>
                    <Textarea
                      id="step-notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={t.form.notesPlaceholder}
                      className="text-xs sm:text-sm rounded-xl"
                    />
                  </div>
                </div>
              </Card>

              {/* -----------------------------------------------------------------
                  STEP 7: PAYMENT & SUMMARY
                  ----------------------------------------------------------------- */}
              <Card className="p-5 sm:p-6 bg-card dark:bg-[#121b2f] border-2 border-[#fdc72d]/70 rounded-3xl shadow-lg transition-all">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="size-8 sm:size-9 rounded-full bg-[#fdc72d] text-[#0e3934] font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#fdc72d]/20">
                    7
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8a6800] dark:text-[#fdc72d] block">
                      STEP 7
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-foreground">
                      {isEn ? t.steps.step7.titleEn : t.steps.step7.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {isEn ? t.steps.step7.descEn : t.steps.step7.desc}
                    </p>
                  </div>
                </div>

                {/* Summary Review Grid */}
                <div className="p-4 rounded-2xl bg-muted/40 dark:bg-[#17233d]/60 border border-border/60 flex flex-col gap-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">{t.payment.topicLabel}</span>
                    <span className="font-bold text-[#8a6800] dark:text-[#fdc72d]">
                      {isEn ? activeTopicObj.nameEn : activeTopicObj.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">{t.payment.durationLabel}</span>
                    <span className="font-bold text-foreground">
                      {isEn ? activeDurationObj.titleEn : activeDurationObj.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">{t.payment.modeLabel}</span>
                    <span className="font-bold text-foreground">
                      {selectedMode === "call" ? "Call (Phone / Video)" : "Office Visit (Ahmedabad)"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">{t.payment.dateLabel}</span>
                    <span className="font-bold text-foreground">{selectedDate || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40">
                    <span className="text-muted-foreground">{t.payment.slotLabel}</span>
                    <span className="font-bold text-foreground">{selectedSlot || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-bold text-foreground">{t.payment.totalLabel}</span>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      ₹{activeDurationObj.price}
                    </span>
                  </div>
                </div>

                {/* Supported Payment Badges: UPI, Card, Net Banking, Wallet */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
                  <Badge variant="outline" className="text-[11px] font-semibold py-1 px-2.5">
                    <Wallet className="size-3 mr-1" /> UPI (GPay/PhonePe/Paytm)
                  </Badge>
                  <Badge variant="outline" className="text-[11px] font-semibold py-1 px-2.5">
                    <CreditCard className="size-3 mr-1" /> Credit / Debit Card
                  </Badge>
                  <Badge variant="outline" className="text-[11px] font-semibold py-1 px-2.5">
                    <Landmark className="size-3 mr-1" /> Net Banking
                  </Badge>
                </div>

                {/* Pay Button */}
                <div className="pt-4">
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleProceedToPayment}
                    className="w-full h-12 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-black text-sm sm:text-base rounded-2xl shadow-[0_6px_20px_rgba(253,199,45,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        <span>{t.form.submitting}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="size-4" />
                        <span>{t.payment.payNowBtn} • ₹{activeDurationObj.price}</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                  <span className="text-[11px] text-muted-foreground text-center block mt-2">
                    {t.payment.securedBy}
                  </span>
                </div>
              </Card>
            </div>

            {/* RIGHT COLUMN (4 cols): Astrologer Card & Live Summary */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
              {/* Doctor Profile Card */}
              <Card className="p-5 bg-card dark:bg-[#121b2f] border border-border/80 rounded-3xl shadow-sm flex flex-col gap-4">
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
                    <h3 className="text-base font-black text-foreground truncate">{t.doctor.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.doctor.subtitle}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/50 dark:bg-[#17233d] border border-border/40 text-xs flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Award className="size-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                    <span>{t.doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="size-4 text-muted-foreground shrink-0" />
                    <span className="line-clamp-1">{t.doctor.location}</span>
                  </div>
                </div>

                {/* Features */}
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
              </Card>

              {/* Consultation FAQs */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-[#8a6800] dark:text-[#fdc72d]" />
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
                        className="border border-border/70 rounded-2xl bg-card dark:bg-[#121b2f] px-4 py-3 overflow-hidden transition-all"
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
