"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  Building2,
  Hash,
  Compass,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  BookOpen,
  Play,
  Users,
  ShoppingBag,
  Flame,
  ArrowRight,
  Lock,
  MessageSquare,
  X,
  ChevronRight,
  Plus,
  Copy,
  GraduationCap,
  FileCheck2
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
import { toast } from "@/components/ui/sonner"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { getAstroData } from "@/lib/data/astro-data"
import { ABOUT_DATA } from "@/lib/data/about-data"
import { useLanguage } from "@/components/language-provider"

export default function AboutUsClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const [siteData, setSiteData] = React.useState(() => getAstroData(lang))

  React.useEffect(() => {
    setSiteData(getAstroData(lang))
  }, [lang])

  const about = ABOUT_DATA

  // Interactive UI States
  const [activeChip, setActiveChip] = React.useState("about-us")
  const [cartItems, setCartItems] = React.useState([])
  const [selectedCert, setSelectedCert] = React.useState(null)
  const [bookingModalOpen, setBookingModalOpen] = React.useState(false)

  // Newsletter Form State
  const [newsletterPhone, setNewsletterPhone] = React.useState("")
  const [newsletterSuccess, setNewsletterSuccess] = React.useState(false)

  // Consultation Booking State
  const [bookingForm, setBookingForm] = React.useState({
    name: "",
    phone: "",
    service: "kundali",
    date: ""
  })

  // Toast Notification handler
  const showToast = (msg, type = "success") => {
    if (type === "info") {
      toast.info(msg)
    } else {
      toast.success(msg)
    }
  }

  // Language switch handler
  const handleToggleLang = (newLang) => {
    setLang(newLang)
    toast.info(newLang === "en" ? "Language switched to English" : "ભાષા બદલાઈ: ગુજરાતી")
  }

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product])
    const productName = typeof product.name === "object" ? product.name[lang] : product.name
    toast.success(
      lang === "gu"
        ? `"${productName}" કાર્ટમાં ઉમેરાઈ ગયું!`
        : `"${productName}" added to cart!`
    )
  }

  const handleCopyText = (text, label) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text)
      toast.success(lang === "gu" ? `${label} કૉપિ કર્યું` : `${label} copied`)
    }
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterPhone || newsletterPhone.length < 10) {
      toast.error(lang === "gu" ? "કૃપા કરીને ૧૦ અંકનો સાચો મોબાઈલ નંબર દાખલ કરો." : "Please enter a valid 10-digit phone number.")
      return
    }
    setNewsletterSuccess(true)
    toast.success(about.sidebar.newsletter.successMsg[lang])
    setNewsletterPhone("")
    setTimeout(() => setNewsletterSuccess(false), 5000)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!bookingForm.name || !bookingForm.phone) {
      toast.error(lang === "gu" ? "કૃપા કરીને નામ અને ફોન નંબર દાખલ કરો." : "Please enter your name and phone.")
      return
    }

    const serviceNames = {
      kundali: lang === "gu" ? "જન્મકુંડળી વિશ્લેષણ" : "Kundali Analysis",
      vastu: lang === "gu" ? "વાસ્તુશાસ્ત્ર પરામર્શ" : "Vastu Consultation",
      muhurta: lang === "gu" ? "શુભ મુહૂર્ત વિધાન" : "Muhurta Selection",
      numerology: lang === "gu" ? "અંકશાસ્ત્ર સુમેળ" : "Numerology Alignment"
    }

    const text = encodeURIComponent(
      lang === "gu"
        ? `નમસ્તે ડૉ. વિશાલ મોદી, મારું નામ ${bookingForm.name} છે. હું ${serviceNames[bookingForm.service] || "જ્યોતિષ પરામર્શ"} માટે સમય બુક કરવા માંગુ છું. ફોન: ${bookingForm.phone}. ${bookingForm.date ? `તારીખ: ${bookingForm.date}` : ""}`
        : `Hello Dr. Vishal Modi, my name is ${bookingForm.name}. I would like to book a consultation for ${serviceNames[bookingForm.service] || "Astrology"}. Phone: ${bookingForm.phone}. ${bookingForm.date ? `Date: ${bookingForm.date}` : ""}`
    )

    window.open(`https://wa.me/919825000000?text=${text}`, "_blank")
    setBookingModalOpen(false)
    toast.success(lang === "gu" ? "પરામર્શ વિનંતી મોકલી દેવામાં આવી છે!" : "Consultation request sent via WhatsApp!")
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      {/* 1. Standard Sticky Vedic Header */}
      <AstroHeader
        config={siteData.config}
        topBar={siteData.topBar}
        navLinks={siteData.navLinks}
        activeCategory="about-us"
        onSelectCategory={(id) => {
          if (id === "home") router.push("/")
          else if (id === "about-us") router.push("/about-us")
        }}
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={cartItems.length}
      />

      <main className="flex-1 w-full bg-background pt-4 pb-16">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">

          {/* 2. Top Breadcrumb & Scholarly Category Filter Chips Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <Breadcrumb className="shrink-0">
              <BreadcrumbList className="text-xs sm:text-sm font-medium flex-nowrap whitespace-nowrap">
                <BreadcrumbItem className="shrink-0 whitespace-nowrap">
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-1.5 hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors"
                    >
                      <Compass className="h-4 w-4 shrink-0" />
                      <span>{about.breadcrumb.home[lang]}</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="shrink-0" />
                <BreadcrumbItem className="shrink-0 whitespace-nowrap">
                  <BreadcrumbPage className="text-[#8a6800] dark:text-[#fdc72d] font-bold whitespace-nowrap">
                    {about.breadcrumb.current[lang]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Category Filter Chips using shadcn/ui Tabs */}
            <Tabs
              value={activeChip}
              onValueChange={(val) => {
                setActiveChip(val)
                const chip = about.filterChips.find((c) => c.id === val)
                if (chip) showToast(chip[lang])
              }}
              className="w-full lg:w-auto overflow-x-auto scrollbar-none"
            >
              <TabsList className="bg-transparent p-0 flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none h-auto justify-start">
                {about.filterChips.map((chip) => (
                  <TabsTrigger
                    key={chip.id}
                    value={chip.id}
                    className="font-bold text-[11px] sm:text-xs px-3.5 py-1.5 rounded-lg uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shadow-xs border border-border bg-card dark:bg-[#1f201c] text-foreground hover:bg-[#00685d]/10 hover:text-[#00685d] dark:hover:text-[#6ed8c8] data-active:bg-[#00685d] data-active:text-white data-active:border-[#00685d] data-active:ring-2 data-active:ring-[#00685d]/30 data-active:shadow-sm"
                  >
                    {chip[lang]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* 3. Editorial Header & Sacred Mission Hero Banner (shadcn/ui Card) */}
          <Card className="relative border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-6 sm:p-10 shadow-sm mb-8 overflow-hidden">
            {/* Ambient Gold Glow Accents */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#fdc72d]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-[#00685d]/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="border-[#fdc72d]/60 text-[#8a6800] dark:text-[#fdc72d] text-[10px] sm:text-xs uppercase tracking-widest font-black bg-[#fdc72d]/10"
                >
                  {about.hero.legacyTag[lang]}
                </Badge>
                <span className="h-0.5 w-10 bg-[#fdc72d] rounded-full" />
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-[38px] font-black text-foreground tracking-tight leading-snug sm:leading-tight mb-3">
                {about.hero.title[lang]}
                <span className="text-[#8a6800] dark:text-[#fdc72d] underline decoration-[#fdc72d]/50 decoration-wavy decoration-2">
                  {about.hero.title.highlight[lang]}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
                {about.hero.description[lang]}
              </p>
            </div>
          </Card>

          {/* 4. Main 2-Column Editorial Grid (Scholar, Bio, 4 Pillars on Left + Sidebar on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ======================================================== */}
            {/* LEFT MAIN EDITORIAL COLUMN (8 Cols ~ 68%)                 */}
            {/* ======================================================== */}
            <div className="lg:col-span-8 flex flex-col gap-8">

              {/* A. Grand Scholar Profile Showcase (shadcn/ui Card) */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-6 sm:p-8 pt-6 sm:pt-8 shadow-sm relative overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">

                    {/* Scholar Portrait with Glowing Gold Halo Ring */}
                    <div className="relative shrink-0">
                      <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-[#fdc72d] via-[#f4bf23] to-[#00685d] flex items-center justify-center shadow-lg ring-4 ring-[#fdc72d]/20">
                        <Avatar className="size-full rounded-full bg-muted p-1">
                          <AvatarImage
                            src={about.scholar.image}
                            alt={about.scholar.imageAlt}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <AvatarFallback className="text-xl font-bold bg-[#fdc72d] text-[#1b1c1a]">
                            VM
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      {/* Verified Guru Pill Badge */}
                      <Badge className="absolute -bottom-2 right-3 sm:right-6 bg-[#00685d] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border-2 border-background">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#fdc72d]" />
                        <span>{about.scholar.verifiedBadge[lang]}</span>
                      </Badge>
                    </div>

                    {/* Scholar Bio Info */}
                    <div className="flex-1 flex flex-col text-center md:text-left">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                        <Badge className="bg-[#00685d] text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
                          {about.scholar.roleTag[lang]}
                        </Badge>
                        <Badge variant="outline" className="text-[#8a6800] dark:text-[#fdc72d] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded border-border/70 bg-muted/50">
                          {about.scholar.degreeTag[lang]}
                        </Badge>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
                        {about.scholar.name[lang]}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#00685d] dark:text-[#6ed8c8] font-bold mt-1">
                        {about.scholar.subTitle[lang]}
                      </p>

                      <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                        {about.scholar.bio[lang]}
                      </p>

                      {/* Social & Academic Action Bar */}
                      <div className="flex items-center justify-center md:justify-start gap-2.5 mt-4 pt-2 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => showToast(lang === "gu" ? "ફેસબુક પ્રોફાઇલ ખૂલી રહી છે..." : "Opening Facebook...")}
                          className="bg-muted dark:bg-[#252622] text-[#00685d] dark:text-[#6ed8c8] hover:bg-[#00685d] hover:text-white"
                          title="Facebook Profile"
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => showToast(lang === "gu" ? "સંશોધન પત્રો ડાઉનલોડ ઉપલબ્ધ..." : "Academic Papers archive...")}
                          className="bg-muted dark:bg-[#252622] text-[#00685d] dark:text-[#6ed8c8] hover:bg-[#00685d] hover:text-white"
                          title="Academic Papers"
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => showToast(lang === "gu" ? "વિડિઓ પ્રવચન સંગ્રહ..." : "Video lectures archive...")}
                          className="bg-muted dark:bg-[#252622] text-[#00685d] dark:text-[#6ed8c8] hover:bg-[#00685d] hover:text-white"
                          title="Video Lectures"
                        >
                          <Play className="h-4 w-4" />
                        </Button>

                        <span className="text-muted-foreground/40 mx-1">|</span>

                        <div className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#00685d] dark:text-[#6ed8c8]" />
                          <span>{about.scholar.verifiedProfile[lang]}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scholarly Metrics Grid (4 Stat Cards using shadcn/ui) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-border/70 bg-muted/40 dark:bg-[#161714] rounded-xl p-4">
                    {about.scholar.stats.map((st, idx) => (
                      <div key={idx} className="flex flex-col text-center">
                        <span className="text-xl sm:text-2xl font-black text-[#8a6800] dark:text-[#fdc72d]">
                          {st.value[lang]}
                        </span>
                        <span className="text-[11px] sm:text-xs text-foreground font-bold mt-0.5">
                          {st.label[lang]}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {st.sub[lang]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* B. Detailed Biography & Spiritual Journey (shadcn/ui Card) */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-6 sm:p-8 shadow-sm">
                <CardHeader className="p-0 pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8] flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-black text-foreground">
                      {about.biography.heading[lang]}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-0 pt-4 flex flex-col gap-4">
                  {about.biography.paragraphs.map((p, i) => (
                    <p key={i} className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {p[lang]}
                    </p>
                  ))}

                  {/* Quote Callout Box */}
                  <div className="bg-[#00685d]/5 dark:bg-[#00685d]/15 border-l-4 border-[#fdc72d] rounded-r-xl p-4 sm:p-5 my-2 relative overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl text-[#fdc72d] font-serif leading-none select-none">
                        “
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-bold text-foreground italic leading-relaxed">
                          {about.biography.quote.text[lang]}
                        </p>
                        <p className="text-xs text-[#00685d] dark:text-[#6ed8c8] font-black mt-2">
                          {about.biography.quote.author[lang]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {about.biography.vastuNote[lang]}
                  </p>
                </CardContent>
              </Card>

              {/* C. 4 Pillars of Expertise Grid (shadcn/ui Cards) */}
              <div className="border border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="pb-6">
                  <Badge
                    variant="outline"
                    className="border-none p-0 text-[10px] sm:text-xs font-black text-[#8a6800] dark:text-[#fdc72d] uppercase tracking-wider"
                  >
                    {about.pillarsSection.tag[lang]}
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground mt-1">
                    {about.pillarsSection.title[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {about.pillarsSection.subtitle[lang]}
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {about.pillarsSection.items.map((pillar) => {
                      const isGold = pillar.id === "pillar-panchang" || pillar.id === "pillar-numerology"
                      return (
                        <Card
                          key={pillar.id}
                          className="bg-card dark:bg-[#141512] border-border/80 hover:border-[#fdc72d] rounded-xl flex flex-col justify-between transition-all hover:shadow-sm group ring-0 overflow-hidden"
                        >
                          <CardHeader className="p-5 pb-2">
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 shadow-xs ${isGold
                                ? "bg-[#fdc72d] text-[#1b1c1a]"
                                : "bg-[#00685d] text-white"
                                }`}
                            >
                              {pillar.id === "pillar-kundali" && <Sparkles className="h-5 w-5" />}
                              {pillar.id === "pillar-panchang" && <Calendar className="h-5 w-5" />}
                              {pillar.id === "pillar-vastu" && <Building2 className="h-5 w-5" />}
                              {pillar.id === "pillar-numerology" && <Hash className="h-5 w-5" />}
                            </div>

                            <CardTitle className="text-sm sm:text-base font-black text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors">
                              {pillar.title[lang]}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="px-5 py-2 grow">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {pillar.desc[lang]}
                            </p>
                          </CardContent>

                          <CardFooter className="px-5 py-3.5 border-t border-border/50 bg-muted/40 dark:bg-[#181915] flex items-center justify-between text-xs font-bold text-[#00685d] dark:text-[#6ed8c8]">
                            <span>{pillar.action[lang]}</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </CardFooter>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* RIGHT SIDEBAR COLUMN (4 Cols ~ 32%)                       */}
            {/* ======================================================== */}
            <aside className="lg:col-span-4 flex flex-col gap-6">

              {/* Widget 1: Live Choghadiya Ring & Quick Muhurat (shadcn Card) */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <h4 className="text-sm font-black text-foreground">
                      {about.sidebar.choghadiya.title[lang]}
                    </h4>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fdc72d] animate-pulse shrink-0" title="Live update" />
                </div>

                <CardContent className="p-0">
                  <div className="bg-muted/40 dark:bg-[#141512] rounded-xl p-4 flex items-center gap-4">
                    <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-border"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        />
                        <path
                          className="text-[#00685d]"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="75, 100"
                          strokeLinecap="round"
                          strokeWidth="3.5"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <Sparkles className="h-3.5 w-3.5 text-[#fdc72d]" />
                        <span className="text-[10px] font-black text-[#00685d] dark:text-[#6ed8c8]">
                          અમૃત
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <span className="text-[9px] font-black text-[#00685d] dark:text-[#6ed8c8] uppercase tracking-wider">
                        {about.sidebar.choghadiya.currentTag[lang]}
                      </span>
                      <span className="text-base font-black text-foreground">
                        {about.sidebar.choghadiya.name[lang]}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {about.sidebar.choghadiya.timeRange[lang]}
                      </span>
                      <span className="text-[11px] font-bold text-[#8a6800] dark:text-[#fdc72d] mt-0.5">
                        {about.sidebar.choghadiya.verdict[lang]}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{about.sidebar.choghadiya.nextChoghadiya[lang]}</span>
                    <Link href="/dainik-panchang" className="text-[#00685d] dark:text-[#6ed8c8] font-bold hover:underline flex items-center">
                      {about.sidebar.choghadiya.fullPanchangText[lang]}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Widget 2: Doctor's Quick Clinic & Direct Card (shadcn Card) */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 pb-4">
                  <div className="w-13 h-13 rounded-full overflow-hidden bg-muted shrink-0 ring-2 ring-[#fdc72d]/40">
                    <Image
                      src={about.sidebar.clinic.avatar}
                      alt="Dr. Vishal Modi Clinic"
                      width={52}
                      height={52}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-black text-foreground">
                      {about.sidebar.clinic.title[lang]}
                    </h4>
                    <p className="text-xs text-[#00685d] dark:text-[#6ed8c8] font-bold">
                      {about.sidebar.clinic.subtitle[lang]}
                    </p>
                  </div>
                </div>

                <CardContent className="p-0 flex flex-col gap-2.5 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8] shrink-0 mt-0.5" />
                    <span>{about.sidebar.clinic.address[lang]}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8] shrink-0" />
                      <span className="font-bold text-foreground">{about.sidebar.clinic.phones[0]}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleCopyText(about.sidebar.clinic.phones[0], "Phone")}
                      className="text-muted-foreground hover:text-foreground"
                      title="Copy phone"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8] shrink-0" />
                      <span className="truncate">{about.sidebar.clinic.email}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleCopyText(about.sidebar.clinic.email, "Email")}
                      className="text-muted-foreground hover:text-foreground"
                      title="Copy email"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-border/50 text-[11px]">
                    <Clock className="h-3.5 w-3.5 text-[#00685d] dark:text-[#6ed8c8] shrink-0" />
                    <span>{about.sidebar.clinic.timings[lang]}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Widget 3: Stay Connected Social Stats (shadcn Card) */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 pb-3">
                  <Users className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8]" />
                  <h4 className="text-sm font-black text-foreground">
                    {about.sidebar.social.title[lang]}
                  </h4>
                </div>

                <CardContent className="p-0">
                  <div className="grid grid-cols-3 gap-2">
                    {about.sidebar.social.channels.map((ch, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toast.info(ch.name[lang])}
                        className="bg-muted/40 dark:bg-[#151613] rounded-xl p-2.5 text-center hover:bg-muted transition-colors flex flex-col items-center cursor-pointer border border-border/50"
                      >
                        <span className="text-sm font-black text-[#00685d] dark:text-[#6ed8c8]">
                          {ch.count}
                        </span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">
                          {ch.name[lang]}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Widget 4: MyShop Spiritual Store Highlights (shadcn Card) */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <h4 className="text-sm font-black text-foreground">
                      {about.sidebar.store.title[lang]}
                    </h4>
                  </div>
                  <Link
                    href="/myshop"
                    className="text-[11px] font-bold text-[#00685d] dark:text-[#6ed8c8] hover:underline"
                  >
                    {about.sidebar.store.viewAll[lang]}
                  </Link>
                </div>

                <CardContent className="p-0 flex flex-col gap-3">
                  {about.sidebar.store.products.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 bg-muted/40 dark:bg-[#151613] p-2.5 rounded-xl border border-border/50"
                    >
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-lg object-cover bg-muted shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-foreground truncate">
                          {p.name[lang]}
                        </h5>
                        <div className="text-xs font-black text-[#00685d] dark:text-[#6ed8c8]">
                          {p.price[lang]}
                        </div>
                        <span className="text-[10px] text-muted-foreground block">
                          {p.badge[lang]}
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
                </CardContent>
              </Card>

              {/* Widget 5: Readers' Favorite Articles (shadcn Card) */}
              <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 pb-3">
                  <Flame className="h-4 w-4 text-[#bb171f]" />
                  <h4 className="text-sm font-black text-foreground">
                    {about.sidebar.popular.title[lang]}
                  </h4>
                </div>

                <CardContent className="p-0 flex flex-col gap-2">
                  {about.sidebar.popular.items.map((art, idx) => (
                    <Link
                      key={idx}
                      href={`/article/${art.articleId}`}
                      className="group flex items-start gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-lg font-black text-[#8a6800] dark:text-[#fdc72d] shrink-0 opacity-70">
                        {art.rank}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground group-hover:text-[#00685d] dark:group-hover:text-[#6ed8c8] transition-colors leading-snug">
                          {art.title[lang]}
                        </span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">
                          {art.readTime[lang]}
                        </span>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Widget 6: Daily Rashifal WhatsApp Subscription Card (shadcn Card) */}
              <Card className="bg-[#00685d] text-white rounded-2xl p-5 shadow-md relative overflow-hidden border-[#fdc72d]/20 ring-0">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#fdc72d]/15 blur-xl pointer-events-none" />

                <CardContent className="p-0 relative z-10 flex flex-col gap-2">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mb-0.5">
                    <Sparkles className="h-4 w-4 text-[#fdc72d]" />
                  </div>

                  <CardTitle className="text-sm sm:text-base font-black text-white">
                    {about.sidebar.newsletter.title[lang]}
                  </CardTitle>

                  <p className="text-xs text-gray-200 leading-relaxed">
                    {about.sidebar.newsletter.subtitle[lang]}
                  </p>

                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 mt-2">
                    <Input
                      type="tel"
                      value={newsletterPhone}
                      onChange={(e) => setNewsletterPhone(e.target.value)}
                      placeholder={about.sidebar.newsletter.placeholder[lang]}
                      className="w-full bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-lg h-9 border-none"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full bg-[#fdc72d] text-[#1b1c1a] font-black text-xs py-2 rounded-lg hover:bg-[#eab318] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm h-9"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{about.sidebar.newsletter.button[lang]}</span>
                    </Button>
                  </form>

                  <span className="text-[10px] text-gray-300 text-center mt-1">
                    {about.sidebar.newsletter.freeNote[lang]}
                  </span>
                </CardContent>
              </Card>

            </aside>
          </div>

          {/* ========================================================================= */}
          {/* 5. FULL-WIDTH SACRED & ACCREDITATION SECTIONS (100% WIDTH OF MAX-W-7XL)    */}
          {/* Positioned right after the 2-column Scholar / Pillars & Sidebar layout    */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-8 mt-10 w-full">

            {/* D. Sacred Mission & Vision Banner (Unlock Happiness) - FULL WIDTH */}
            <Card className="bg-[#1b1c1a] text-[#f6fafd] rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden border-[#fdc72d]/30 w-full ring-0">
              {/* Golden Ambient Glow */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#fdc72d]/15 blur-3xl pointer-events-none" />

              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                  {/* Left Info Text */}
                  <div className="md:col-span-8 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#fdc72d]" />
                      <Badge variant="outline" className="text-[10px] sm:text-xs text-[#fdc72d] border-[#fdc72d]/40 uppercase tracking-widest font-black bg-[#fdc72d]/10">
                        {about.mission.tag[lang]}
                      </Badge>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      {about.mission.title[lang]}
                      <span className="text-[#fdc72d]">
                        {about.mission.title.highlight[lang]}
                      </span>
                    </h3>

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed opacity-95">
                      {about.mission.desc[lang]}
                    </p>

                    {/* Mission Key Checkpoints */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {about.mission.checkpoints.map((cp, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-5 w-5 text-[#fdc72d] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-gray-200 font-medium">
                            {cp[lang]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Yantra Image Emblem */}
                  <div className="md:col-span-4 flex items-center justify-center">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2.5 bg-gradient-to-tr from-[#fdc72d]/40 via-white/10 to-[#00685d]/40 flex items-center justify-center shadow-2xl">
                      <Image
                        src={about.mission.yantraImage}
                        alt={about.mission.yantraAlt}
                        width={224}
                        height={224}
                        className="w-full h-full object-contain rounded-full drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* E. CERTIFICATIONS & ACCREDITATIONS SECTION - FULL WIDTH (3-COLUMN GRID) */}
            <div className="border border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-6 sm:p-10 pb-8 sm:pb-12 shadow-sm relative w-full">
              <div className="pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <span className="text-[10px] sm:text-xs font-black text-[#8a6800] dark:text-[#fdc72d] uppercase tracking-wider">
                      {about.certificationsSection.tag[lang]}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
                    {about.certificationsSection.title[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {about.certificationsSection.subtitle[lang]}
                  </p>
                </div>

                <Badge className="bg-[#fdc72d] text-[#1b1c1a] font-extrabold text-xs px-3.5 py-1.5 self-start sm:self-center shrink-0 border-none shadow-xs">
                  {lang === "gu" ? "૬ અધિકૃત પ્રમાણપત્રો" : "6 Verified Accreditations"}
                </Badge>
              </div>

              <div>
                {/* 6 Certification Cards Grid in Spacious 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {about.certificationsSection.items.map((cert) => (
                    <Card
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="bg-card dark:bg-[#151613] border-border/80 hover:border-[#fdc72d] rounded-xl flex flex-col justify-between transition-all hover:shadow-md cursor-pointer group ring-0 overflow-hidden"
                    >
                      <CardHeader className="p-5 pb-2">
                        {/* Header bar of cert card */}
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <Badge className="bg-[#00685d] text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                            {cert.badge[lang]}
                          </Badge>
                          <span className="text-[11px] font-mono text-muted-foreground font-bold">
                            {cert.year[lang]}
                          </span>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-sm sm:text-base font-black text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors leading-snug">
                          {cert.title[lang]}
                        </CardTitle>

                        {/* Institution */}
                        <div className="flex items-center gap-1.5 text-xs text-[#00685d] dark:text-[#6ed8c8] font-bold mt-1.5">
                          <GraduationCap className="h-4 w-4 shrink-0" />
                          <span className="line-clamp-1">{cert.institution[lang]}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="px-5 py-2 grow">
                        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                          {cert.description[lang]}
                        </p>
                      </CardContent>

                      <CardFooter className="px-5 py-3.5 border-t border-border/50 bg-muted/40 dark:bg-[#181915] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                          <FileCheck2 className="h-3.5 w-3.5 text-[#00685d] dark:text-[#6ed8c8]" />
                          <span>{cert.regNo}</span>
                        </div>

                        <span className="font-bold text-[#8a6800] dark:text-[#fdc72d] group-hover:underline flex items-center gap-1 text-xs">
                          <span>{lang === "gu" ? "પ્રમાણપત્ર વિગત જુઓ" : "View Credential"}</span>
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Trust Guarantee Bar */}
                <div className="mt-8 pt-6 pb-2 sm:pb-4 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm font-bold text-foreground">
                    <ShieldCheck className="h-5 w-5 text-[#00685d] dark:text-[#6ed8c8]" />
                    <span>{lang === "gu" ? "૧૦૦% અંધશ્રદ્ધા મુક્ત જ્ઞાન" : "100% Superstition Free"}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm font-bold text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-[#00685d] dark:text-[#6ed8c8]" />
                    <span>{lang === "gu" ? "શાસ્ત્રોક્ત ગણિત આધારિત" : "Classical Calculation Based"}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm font-bold text-foreground">
                    <Lock className="h-5 w-5 text-[#00685d] dark:text-[#6ed8c8]" />
                    <span>{lang === "gu" ? "૧૦૦% ગોપનીય પરામર્શ" : "Strictly Confidential"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* F. Direct Consultation Booking Call to Action - FULL WIDTH (shadcn Card) */}
            <Card className="border-border/80 bg-card dark:bg-[#1a1b17] rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 w-full">
              <CardContent className="p-0 flex-1 text-center md:text-left">
                <Badge className="bg-[#8a6800] text-white dark:bg-[#fdc72d] dark:text-[#1b1c1a] text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {about.consultationCta.tag[lang]}
                </Badge>

                <h3 className="text-xl sm:text-2xl font-black text-foreground mt-2 leading-tight">
                  {about.consultationCta.title[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-2xl">
                  {about.consultationCta.subtitle[lang]}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 mt-4 text-xs text-muted-foreground">
                  {about.consultationCta.badges.map((b, i) => (
                    <span key={i} className="flex items-center gap-1.5 font-bold">
                      <Check className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8]" />
                      <span>{b[lang]}</span>
                    </span>
                  ))}
                </div>
              </CardContent>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
                <Button
                  onClick={() => setBookingModalOpen(true)}
                  className="bg-[#fdc72d] text-[#1b1c1a] font-black text-xs sm:text-sm px-7 py-3 rounded-xl hover:bg-[#eab318] shadow-sm flex items-center justify-center gap-2 cursor-pointer h-12"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{about.consultationCta.buttonBooking[lang]}</span>
                </Button>

                <Button
                  onClick={() => {
                    const msg = encodeURIComponent(
                      lang === "gu"
                        ? "જય શ્રી કૃષ્ણ ડૉ. વિશાલ મોદી, મને જ્યોતિષ પરામર્શ માટે સમય આપશો."
                        : "Hello Dr. Vishal Modi, I would like to schedule an astrological consultation."
                    )
                    window.open(`https://wa.me/919825000000?text=${msg}`, "_blank")
                  }}
                  variant="outline"
                  className="bg-[#00685d] text-white border-none hover:bg-[#005048] font-bold text-xs sm:text-sm px-7 py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer h-12"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{about.consultationCta.buttonWhatsapp[lang]}</span>
                </Button>
              </div>
            </Card>

            {/* G. Bottom Authenticity Pledge Banner - FULL WIDTH (shadcn Card) */}
            <Card className="p-6 sm:p-7 bg-muted/60 dark:bg-[#151613] border-border/80 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left w-full">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8] flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h5 className="text-sm sm:text-base font-bold text-foreground">
                    {about.pledge.title[lang]}
                  </h5>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 max-w-3xl">
                    {about.pledge.description[lang]}
                  </p>
                </div>
              </div>

              <Link
                href="/article/hero-1"
                className="bg-card text-[#00685d] dark:text-[#6ed8c8] text-xs font-black px-5 py-2.5 rounded-lg border border-border hover:bg-[#00685d] hover:text-white transition-colors whitespace-nowrap shadow-xs shrink-0"
              >
                {about.pledge.buttonText[lang]}
              </Link>
            </Card>

          </div>

        </div>
      </main>

      {/* 5. Comprehensive Vedic Footer */}
      <AstroFooter config={siteData.config} footer={siteData.footer} />

      {/* ======================================================== */}
      {/* MODAL 1: CERTIFICATION DETAIL & OFFICIAL CREDENTIAL VIEW */}
      {/* ======================================================== */}
      <Dialog
        open={!!selectedCert}
        onOpenChange={(open) => {
          if (!open) setSelectedCert(null)
        }}
      >
        {selectedCert && (
          <DialogContent className="max-w-lg rounded-2xl p-6 shadow-2xl bg-card dark:bg-[#1a1b17] border-border">
            <DialogHeader className="p-0 pb-4 flex-row items-center gap-3 space-y-0 pr-8">
              <div className="w-12 h-12 rounded-xl bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8] flex items-center justify-center shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <Badge variant="outline" className="text-[10px] font-black uppercase text-[#8a6800] dark:text-[#fdc72d] tracking-wider border-[#fdc72d]/40">
                  {selectedCert.badge[lang]}
                </Badge>
                <DialogTitle className="text-base sm:text-lg font-black text-foreground mt-1">
                  {selectedCert.title[lang]}
                </DialogTitle>
              </div>
            </DialogHeader>

            <DialogDescription className="sr-only">
              {selectedCert.title[lang]} - {selectedCert.institution[lang]}
            </DialogDescription>

            <div className="p-0 space-y-3">
              <div className="space-y-3 bg-muted/40 dark:bg-[#141512] p-4 rounded-xl text-xs">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground font-medium">
                    {lang === "gu" ? "પ્રમાણિત સંસ્થા:" : "Issuing Authority:"}
                  </span>
                  <span className="font-bold text-foreground text-right">
                    {selectedCert.institution[lang]}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground font-medium">
                    {lang === "gu" ? "નોંધણી ક્રમાંક:" : "Credential Registration ID:"}
                  </span>
                  <span className="font-mono font-bold text-[#00685d] dark:text-[#6ed8c8]">
                    {selectedCert.regNo}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground font-medium">
                    {lang === "gu" ? "માન્યતા વર્ષ:" : "Year Conferred:"}
                  </span>
                  <span className="font-bold text-foreground">
                    {selectedCert.year[lang]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">
                    {lang === "gu" ? "સત્યાપન સ્થિતિ:" : "Status:"}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {lang === "gu" ? "૧૦૦% સત્તાવાર માન્ય" : "Verified & Active"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                {selectedCert.description[lang]}
              </p>
            </div>

            <DialogFooter className="pt-4 flex flex-row justify-end gap-2 border-t border-border/40 mt-4 -mx-0 -mb-0 bg-transparent sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setSelectedCert(null)}
                className="text-xs h-9"
              >
                {lang === "gu" ? "બંધ કરો" : "Close"}
              </Button>
              <Button
                onClick={() => {
                  setSelectedCert(null)
                  setBookingModalOpen(true)
                }}
                className="bg-[#fdc72d] text-[#1b1c1a] font-bold text-xs h-9 hover:bg-[#eab318]"
              >
                {lang === "gu" ? "પરામર્શ માટે સંપર્ક કરો" : "Consult Dr. Modi"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* ======================================================== */}
      {/* MODAL 2: DIRECT CONSULTATION BOOKING FORM                */}
      {/* ======================================================== */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6 shadow-2xl bg-card dark:bg-[#1a1b17] border-border">
          <DialogHeader className="p-0 pb-4 flex-row items-center gap-2.5 space-y-0 pr-8">
            <Calendar className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d]" />
            <DialogTitle className="text-lg font-black text-foreground">
              {lang === "gu" ? "ડૉ. વિશાલ મોદી સાથે પરામર્શ બુક કરો" : "Book Consultation with Dr. Vishal Modi"}
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="sr-only">
            {lang === "gu" ? "પરામર્શ બુકિંગ વિગતો ભરો" : "Fill out consultation booking details"}
          </DialogDescription>

          <form onSubmit={handleBookingSubmit} className="space-y-3">
            <div>
              <Label htmlFor="about-booking-name" className="text-xs font-bold text-muted-foreground block mb-1">
                {lang === "gu" ? "તમારું પૂરું નામ:" : "Your Full Name:"}
              </Label>
              <Input
                id="about-booking-name"
                type="text"
                required
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                placeholder={lang === "gu" ? "દા.ત. ભાવેશભાઈ પટેલ" : "e.g. Ramesh Patel"}
                className="h-9 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="about-booking-phone" className="text-xs font-bold text-muted-foreground block mb-1">
                {lang === "gu" ? "મોબાઈલ નંબર (WhatsApp):" : "Mobile Number (WhatsApp):"}
              </Label>
              <Input
                id="about-booking-phone"
                type="tel"
                required
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                placeholder="+૯૧ ૯૮XXXXXXXX"
                className="h-9 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="about-booking-service" className="text-xs font-bold text-muted-foreground block mb-1">
                {lang === "gu" ? "પરામર્શનો વિષય:" : "Service Required:"}
              </Label>
              <Select
                value={bookingForm.service}
                onValueChange={(val) => setBookingForm({ ...bookingForm, service: val })}
              >
                <SelectTrigger id="about-booking-service" className="w-full h-9 text-xs">
                  <SelectValue placeholder={lang === "gu" ? "સેવા પસંદ કરો" : "Select Service"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kundali" className="text-xs">
                    {lang === "gu" ? "જન્મકુંડળી વિશ્લેષણ & ગ્રહદોષ" : "Kundali Analysis & Doshas"}
                  </SelectItem>
                  <SelectItem value="vastu" className="text-xs">
                    {lang === "gu" ? "વાસ્તુશાસ્ત્ર દર્પણ" : "Vastu Consultation"}
                  </SelectItem>
                  <SelectItem value="muhurta" className="text-xs">
                    {lang === "gu" ? "શુભ મુહૂર્ત વિધાન" : "Muhurta Selection"}
                  </SelectItem>
                  <SelectItem value="numerology" className="text-xs">
                    {lang === "gu" ? "અંકશાસ્ત્ર ભાગ્યાંક સુમેળ" : "Numerology Alignment"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="about-booking-date" className="text-xs font-bold text-muted-foreground block mb-1">
                {lang === "gu" ? "અપેક્ષિત તારીખ (ઓપ્શનલ):" : "Preferred Date (Optional):"}
              </Label>
              <Input
                id="about-booking-date"
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                className="h-9 text-xs"
              />
            </div>

            <DialogFooter className="pt-2 flex flex-row justify-end gap-2 -mx-0 -mb-0 bg-transparent sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => setBookingModalOpen(false)}
                className="text-xs h-9"
              >
                {lang === "gu" ? "રદ કરો" : "Cancel"}
              </Button>
              <Button
                type="submit"
                className="bg-[#fdc72d] text-[#1b1c1a] font-bold text-xs h-9 hover:bg-[#eab318]"
              >
                {lang === "gu" ? "WhatsApp પર કન્ફર્મ કરો" : "Confirm via WhatsApp"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
