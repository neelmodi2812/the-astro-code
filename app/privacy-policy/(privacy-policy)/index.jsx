"use client"

import * as React from "react"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Shield,
  Lock,
  Calendar,
  ShoppingBag,
  CreditCard,
  Scale,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Printer,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Info,
  Download,
  ChevronRight,
  Send,
  Trash2,
  UserCheck,
  ShieldCheck,
  FileText,
  BadgeAlert,
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { ASTRO_DATA_GU, ASTRO_DATA_EN } from "@/lib/data/astro-data"
import { PRIVACY_POLICY_DATA } from "@/lib/data/privacy-policy-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

// Helper icon resolver
function renderPillIcon(iconName, className = "w-4 h-4") {
  switch (iconName) {
    case "Shield":
      return <Shield className={className} />
    case "Lock":
      return <Lock className={className} />
    case "Calendar":
      return <Calendar className={className} />
    case "ShoppingBag":
      return <ShoppingBag className={className} />
    case "CreditCard":
      return <CreditCard className={className} />
    case "Scale":
      return <Scale className={className} />
    default:
      return <Shield className={className} />
  }
}

export default function PrivacyPolicyClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const siteData = lang === "gu" ? ASTRO_DATA_GU : ASTRO_DATA_EN
  const data = PRIVACY_POLICY_DATA

  // Navigation & Active Section Tracking
  const [activeSection, setActiveSection] = React.useState("privacy-policy")

  // Interactive Modals
  const [isGrievanceOpen, setIsGrievanceOpen] = React.useState(false)
  const [isErasureOpen, setIsErasureOpen] = React.useState(false)
  const [isSubmittingGrievance, setIsSubmittingGrievance] = React.useState(false)

  // Grievance Form State
  const [grievanceForm, setGrievanceForm] = React.useState({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    orderOrBookingId: "",
    category: "consultation",
    description: ""
  })

  // Watch scroll position for sticky anchor highlighting
  React.useEffect(() => {
    const sectionIds = [
      "privacy-policy",
      "kundali-security",
      "consultation-cancel",
      "shop-refunds",
      "payment-dispute",
      "grievance"
    ]

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll handler
  const handleScrollTo = (id) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 140
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  // Native Print Handler
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  // Grievance Form Submit Handler
  const handleGrievanceSubmit = (e) => {
    e.preventDefault()
    if (!grievanceForm.fullName || !grievanceForm.mobileNumber || !grievanceForm.description) {
      toast.error(
        lang === "gu"
          ? "કૃપા કરીને નામ, મોબાઇલ નંબર અને ફરિયાદની વિગત દાખલ કરો."
          : "Please provide full name, mobile number, and complaint description."
      )
      return
    }

    setIsSubmittingGrievance(true)
    setTimeout(() => {
      setIsSubmittingGrievance(false)
      setIsGrievanceOpen(false)
      const ticketId = "TAC-GRV-" + Math.floor(1000 + Math.random() * 9000)
      toast.success(
        lang === "gu"
          ? `આપની ફરિયાદ સફળતાપૂર્વક નોંધાઈ છે! ટિકિટ ક્રમાંક: #${ticketId}. લીગલ ટીમ ૨૪ કલાકમાં સંપર્ક કરશે.`
          : `Grievance ticket #${ticketId} lodged successfully! Our legal officer will respond within 24 hours.`
      )
      setGrievanceForm({
        fullName: "",
        mobileNumber: "",
        emailAddress: "",
        orderOrBookingId: "",
        category: "consultation",
        description: ""
      })
    }, 900)
  }

  // Data Erasure Request Submit Handler
  const handleConfirmErasure = () => {
    setIsErasureOpen(false)
    toast.success(
      lang === "gu"
        ? "કુંડળી ડેટા ડિલીશન વિનંતી નોંધાઈ છે. ૪૮ કલાકમાં આપના તમામ કુંડળી રેકોર્ડ્સ કાયમ માટે રદ થઈ જશે."
        : "Right to Erasure request logged. All birth & astrological data will be permanently purged within 48 hours."
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#0b332e] text-foreground font-sans selection:bg-[#fdc72d]/30">
      
      {/* Print-only CSS helpers */}
      <style jsx global>{`
        @media print {
          header,
          footer,
          .print-hide,
          .sticky-anchor-bar {
            display: none !important;
          }
          main {
            padding-top: 0 !important;
          }
          .print-full {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* 1. Global Astro Header */}
      <div className="print-hide">
        <AstroHeader
          navLinks={siteData.navLinks}
          config={siteData.config}
          topBar={siteData.topBar}
          activeCategory="privacy-policy"
          cartCount={2}
          onSelectCategory={(id) => {
            if (id === "home") router.push("/")
            else if (id === "about-us") router.push("/about-us")
            else if (id === "dainik-panchang") router.push("/dainik-panchang")
            else if (id === "categories") router.push("/categories")
            else if (id === "contact-us") router.push("/contact-us")
            else if (id === "shop" || id === "cart" || id === "myshop") router.push("/myshop")
          }}
          lang={lang}
          onToggleLang={(newLang) => setLang(newLang)}
        />
      </div>

      {/* 2. Main Content */}
      <main className="flex-1 w-full pt-2 pb-16">
        
        {/* Top Compliance Bar & Breadcrumbs */}
        <section className="w-full bg-[#f3f0e8] dark:bg-[#0d3631] border-b border-border/60 py-3 print-hide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <Breadcrumb>
              <BreadcrumbList className="text-xs">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors">
                    {data.breadcrumb.home[lang] || data.breadcrumb.home.gu}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-muted-foreground">
                    {data.breadcrumb.legal[lang] || data.breadcrumb.legal.gu}
                  </span>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-[#8a6800] dark:text-[#fdc72d]">
                    {data.breadcrumb.title[lang] || data.breadcrumb.title.gu}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="inline-flex items-center gap-2 bg-card dark:bg-[#0f3c36] px-3.5 py-1 rounded-full border border-border shadow-2xs text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fdc72d] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8a6800] dark:bg-[#fdc72d]"></span>
              </span>
              <ShieldCheck className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d]" />
              <span className="text-foreground">
                {data.complianceBadge.text[lang] || data.complianceBadge.text.gu}
              </span>
              <span className="text-muted-foreground/60">|</span>
              <span className="text-muted-foreground text-xs">
                {data.complianceBadge.lastUpdated[lang] || data.complianceBadge.lastUpdated.gu}
              </span>
            </div>
          </div>
        </section>

        {/* Editorial Hero Header Section */}
        <section className="w-full bg-card dark:bg-[#0d3631] border-b border-border/60 py-8 md:py-10 relative overflow-hidden">
          {/* Subtle Divine Yantra Backdrop Geometry */}
          <div className="absolute -right-16 -top-20 w-80 h-80 rounded-full bg-[#fdc72d]/10 pointer-events-none blur-3xl"></div>
          <div className="absolute right-12 top-6 opacity-10 pointer-events-none hidden lg:block text-[#8a6800] dark:text-[#fdc72d]">
            <svg width="220" height="220" viewBox="0 0 200 200" fill="none" stroke="currentColor">
              <circle cx="100" cy="100" r="90" strokeWidth="1.2"></circle>
              <polygon points="100,20 178,155 22,155" strokeWidth="1.2"></polygon>
              <polygon points="100,180 178,45 22,45" strokeWidth="1.2"></polygon>
              <circle cx="100" cy="100" r="45" strokeWidth="1"></circle>
              <circle cx="100" cy="100" r="8" fill="currentColor"></circle>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-5">
            {/* Sacred Benedictory Badge */}
            <div className="inline-flex items-center gap-2 bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] px-3.5 py-1 rounded-full w-fit border border-[#fdc72d]/30 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{data.hero.sacredMantra}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl flex flex-col gap-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                  {data.hero.title[lang] || data.hero.title.gu}
                </h1>
                <div className="text-sm sm:text-base font-bold text-[#8a6800] dark:text-[#fdc72d] tracking-wide">
                  {data.hero.subtitle[lang] || data.hero.subtitle.gu}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                  {data.hero.description[lang] || data.hero.description.gu}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0 print-hide">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="gap-2 bg-card dark:bg-[#0f3c36] border-border text-foreground hover:bg-[#fdc72d]/15 hover:text-[#8a6800] cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d]" />
                  <span>{data.hero.printButton[lang] || data.hero.printButton.gu}</span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => setIsGrievanceOpen(true)}
                  className="gap-2 bg-[#fdc72d] text-[#0e3934] hover:bg-[#eab318] font-bold shadow-sm cursor-pointer"
                >
                  <Headphones className="w-4 h-4" />
                  <span>{data.hero.grievanceButton[lang] || data.hero.grievanceButton.gu}</span>
                </Button>
              </div>
            </div>

            {/* Sticky Anchor Navigation Pills */}
            <div className="sticky-anchor-bar pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {data.navPills.map((pill) => {
                  const isActive = activeSection === pill.id
                  return (
                    <button
                      key={pill.id}
                      onClick={() => handleScrollTo(pill.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#fdc72d] text-[#0e3934] shadow-sm ring-1 ring-[#8a6800]/20"
                          : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {renderPillIcon(pill.icon, `w-3.5 h-3.5 ${isActive ? "text-[#0e3934]" : "text-[#8a6800] dark:text-[#fdc72d]"}`)}
                      <span>{pill.label[lang] || pill.label.gu}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Main Legal Architecture: Two-Column Desktop Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* LEFT COLUMN: Sticky Table of Contents & Trust Sidebar (~28%) */}
            <aside className="w-full lg:w-[320px] xl:w-[350px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-24 print-hide">
              
              {/* Card 1: Table of Contents Navigation */}
              <Card className="border-border shadow-2xs bg-card dark:bg-[#0d3631]">
                <CardHeader className="p-4 pb-3 border-b border-border/60">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                      <FileText className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d]" />
                      <span>{data.sidebar.indexTitle[lang] || data.sidebar.indexTitle.gu}</span>
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs font-bold bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d]">
                      {data.sidebar.indexBadge[lang] || data.sidebar.indexBadge.gu}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-2.5 flex flex-col gap-1">
                  {[
                    { id: "privacy-policy", label: { gu: "૧. માહિતી સંગ્રહ & ઉપયોગ", en: "1. Info Collection & Use" } },
                    { id: "kundali-security", label: { gu: "૨. જન્મ વિગતો & કુંડળી ગોપનીયતા", en: "2. Kundali Data Security" } },
                    { id: "consultation-cancel", label: { gu: "૩. જ્યોતિષ પરામર્શ રદ્દીકરણ શરતો", en: "3. Consultation Cancellation" } },
                    { id: "shop-refunds", label: { gu: "૪. MyShop પૂજા સામાન રિટર્ન", en: "4. MyShop Puja & Gem Returns" } },
                    { id: "payment-dispute", label: { gu: "૫. પેમેન્ટ રિફંડ ટાઈમલાઈન", en: "5. Payment Refund Timeline" } },
                    { id: "grievance", label: { gu: "૬. લીગલ ઓફિસર & ફરિયાદ નિવારણ", en: "6. Grievance Redressal Officer" } },
                  ].map((item) => {
                    const isActive = activeSection === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleScrollTo(item.id)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                          isActive
                            ? "bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] font-bold"
                            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                        }`}
                      >
                        <span className="truncate">{item.label[lang] || item.label.gu}</span>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? "text-[#8a6800] dark:text-[#fdc72d] translate-x-0.5" : "text-muted-foreground/50"}`} />
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Card 2: 4 Core Legal Commitments */}
              <Card className="border-border shadow-2xs bg-card dark:bg-[#0d3631]">
                <CardHeader className="p-4 pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <CardTitle className="text-sm font-bold text-foreground">
                      {data.sidebar.trustTitle[lang] || data.sidebar.trustTitle.gu}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-3.5 flex flex-col gap-2.5">
                  {data.sidebar.commitments.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-muted/40 dark:bg-[#0f3c36] p-2.5 rounded-lg border border-border/50">
                      <div className="w-7 h-7 rounded-md bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0 mt-0.5">
                        {renderPillIcon(c.icon, "w-4 h-4")}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground">
                          {c.title[lang] || c.title.gu}
                        </span>
                        <span className="text-xs text-muted-foreground leading-tight mt-0.5">
                          {c.desc[lang] || c.desc.gu}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Card 3: Compliance & Legal Contact Card */}
              <Card className="border-[#fdc72d]/30 bg-[#fdc72d]/5 dark:bg-[#0f3c36] shadow-2xs">
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <span className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d]">
                      {data.sidebar.legalTeamTitle[lang] || data.sidebar.legalTeamTitle.gu}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {data.sidebar.legalTeamDesc[lang] || data.sidebar.legalTeamDesc.gu}
                  </p>
                  <Separator className="bg-border/60" />
                  <div className="flex flex-col gap-2 text-xs">
                    <a
                      href={`mailto:${data.sidebar.email}`}
                      className="flex items-center gap-2 text-[#8a6800] dark:text-[#fdc72d] hover:underline font-bold"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{data.sidebar.email}</span>
                    </a>
                    <a
                      href={`tel:${data.sidebar.phoneRaw}`}
                      className="flex items-center gap-2 text-foreground font-semibold hover:text-[#8a6800] dark:hover:text-[#fdc72d]"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                      <span>{data.sidebar.phone}</span>
                    </a>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{data.sidebar.timing[lang] || data.sidebar.timing.gu}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </aside>

            {/* RIGHT COLUMN: Comprehensive Policy Content (~72%) */}
            <div className="flex-1 w-full flex flex-col gap-8 print-full">
              
              {/* SECTION 1: Privacy Policy & Data Collection */}
              <article
                id="privacy-policy"
                className="scroll-mt-36 bg-card dark:bg-[#0d3631] rounded-xl p-6 md:p-8 border border-border/70 shadow-2xs flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#fdc72d] text-[#0e3934] font-bold text-xs uppercase">
                      {data.sections.sec1.tag[lang] || data.sections.sec1.tag.gu}
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {data.sections.sec1.tagEn}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {data.sections.sec1.title[lang] || data.sections.sec1.title.gu}
                  </h2>
                  <div className="h-0.5 w-16 bg-[#fdc72d] rounded-full"></div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {data.sections.sec1.intro[lang] || data.sections.sec1.intro.gu}
                </p>

                {/* Data Collection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Card 1: What We Collect */}
                  <div className="bg-muted/40 dark:bg-[#0f3c36] p-4 rounded-xl border border-border/50 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-[#8a6800] dark:text-[#fdc72d] font-bold text-xs sm:text-sm">
                      <FileText className="w-4 h-4" />
                      <span>{data.sections.sec1.collectCard.title[lang] || data.sections.sec1.collectCard.title.gu}</span>
                    </div>
                    <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground list-disc pl-5">
                      {data.sections.sec1.collectCard.items.map((it, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {it[lang] || it.gu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card 2: How Data is Used */}
                  <div className="bg-muted/40 dark:bg-[#0f3c36] p-4 rounded-xl border border-border/50 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-[#8a6800] dark:text-[#fdc72d] font-bold text-xs sm:text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>{data.sections.sec1.usageCard.title[lang] || data.sections.sec1.usageCard.title.gu}</span>
                    </div>
                    <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground list-disc pl-5">
                      {data.sections.sec1.usageCard.items.map((it, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {it[lang] || it.gu}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Cookies Callout */}
                <div className="bg-[#fdc72d]/10 dark:bg-[#0f3c36] p-4 rounded-xl border border-[#fdc72d]/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      {data.sections.sec1.cookieCallout.title[lang] || data.sections.sec1.cookieCallout.title.gu}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {data.sections.sec1.cookieCallout.desc[lang] || data.sections.sec1.cookieCallout.desc.gu}
                    </p>
                  </div>
                </div>
              </article>

              {/* SECTION 2: Astrology & Horoscope Data Protection */}
              <article
                id="kundali-security"
                className="scroll-mt-36 bg-card dark:bg-[#0d3631] rounded-xl p-6 md:p-8 border border-border/70 shadow-2xs flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#fdc72d] text-[#0e3934] font-bold text-xs uppercase">
                      {data.sections.sec2.tag[lang] || data.sections.sec2.tag.gu}
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {data.sections.sec2.tagEn}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {data.sections.sec2.title[lang] || data.sections.sec2.title.gu}
                  </h2>
                  <div className="h-0.5 w-16 bg-[#fdc72d] rounded-full"></div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {data.sections.sec2.intro[lang] || data.sections.sec2.intro.gu}
                </p>

                {/* 3 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  {data.sections.sec2.pillars.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/40 dark:bg-[#0f3c36] p-4 rounded-xl border border-border/50 flex flex-col gap-2 text-center items-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center">
                        {renderPillIcon(p.icon, "w-5 h-5")}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {p.title[lang] || p.title.gu}
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {p.desc[lang] || p.desc.gu}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right to Erasure Action Banner */}
                <div className="bg-[#fdc72d]/10 dark:bg-[#0f3c36] p-4 rounded-xl border border-[#fdc72d]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0 mt-0.5">
                      <Trash2 className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {lang === "gu" ? "ડેટા ડિલીટ કરવાનો તમારો અધિકાર (Right to Erasure)" : "Your Right to Data Erasure"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {lang === "gu"
                          ? "તમે ગમે ત્યારે તમારી કુંડળી પ્રોફાઇલ કાયમ માટે રદ કરવાની વિનંતી મોકલી શકો છો."
                          : "You may request permanent deletion of your birth chart records and profile at any time."}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsErasureOpen(true)}
                    className="shrink-0 bg-card dark:bg-[#0d3631] text-[#8a6800] dark:text-[#fdc72d] border-[#fdc72d]/40 hover:bg-[#fdc72d] hover:text-[#0e3934] font-bold text-xs cursor-pointer"
                  >
                    {lang === "gu" ? "રિક્વેસ્ટ ડેટા ડિલીશન" : "Request Data Deletion"}
                  </Button>
                </div>
              </article>

              {/* SECTION 3: Consultation Cancellation Policy */}
              <article
                id="consultation-cancel"
                className="scroll-mt-36 bg-card dark:bg-[#0d3631] rounded-xl p-6 md:p-8 border border-border/70 shadow-2xs flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#fdc72d] text-[#0e3934] font-bold text-xs uppercase">
                      {data.sections.sec3.tag[lang] || data.sections.sec3.tag.gu}
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {data.sections.sec3.tagEn}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {data.sections.sec3.title[lang] || data.sections.sec3.title.gu}
                  </h2>
                  <div className="h-0.5 w-16 bg-[#fdc72d] rounded-full"></div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {data.sections.sec3.intro[lang] || data.sections.sec3.intro.gu}
                </p>

                {/* Cancellation Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.sections.sec3.tiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/40 dark:bg-[#0f3c36] p-4 sm:p-5 rounded-xl border border-border/50 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${tier.badgeColor}`}>
                          {tier.timeline[lang] || tier.timeline.gu}
                        </span>
                        {tier.icon === "CheckCircle2" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {tier.icon === "Clock" && <Clock className="w-4 h-4 text-amber-600" />}
                        {tier.icon === "XCircle" && <XCircle className="w-4 h-4 text-destructive" />}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground">
                        {tier.refund[lang] || tier.refund.gu}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {tier.desc[lang] || tier.desc.gu}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Astrologer Absence Guarantee Callout */}
                <div className="bg-muted/60 dark:bg-[#0f3c36] p-4 rounded-xl border border-border flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground leading-relaxed">
                    <strong className="text-[#8a6800] dark:text-[#fdc72d]">
                      {data.sections.sec3.doctorAbsenceNote.title[lang] || data.sections.sec3.doctorAbsenceNote.title.gu}{" "}
                    </strong>
                    {data.sections.sec3.doctorAbsenceNote.desc[lang] || data.sections.sec3.doctorAbsenceNote.desc.gu}
                  </p>
                </div>
              </article>

              {/* SECTION 4: MyShop Puja Items, Gemstones & Rudraksha */}
              <article
                id="shop-refunds"
                className="scroll-mt-36 bg-card dark:bg-[#0d3631] rounded-xl p-6 md:p-8 border border-border/70 shadow-2xs flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#fdc72d] text-[#0e3934] font-bold text-xs uppercase">
                      {data.sections.sec4.tag[lang] || data.sections.sec4.tag.gu}
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {data.sections.sec4.tagEn}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {data.sections.sec4.title[lang] || data.sections.sec4.title.gu}
                  </h2>
                  <div className="h-0.5 w-16 bg-[#fdc72d] rounded-full"></div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {data.sections.sec4.intro[lang] || data.sections.sec4.intro.gu}
                </p>

                {/* 4 Rules Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.sections.sec4.rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/40 dark:bg-[#0f3c36] p-4 rounded-xl border border-border/50 flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2 text-[#8a6800] dark:text-[#fdc72d] font-bold text-xs sm:text-sm">
                        {renderPillIcon(rule.icon, "w-4 h-4")}
                        <span>{rule.title[lang] || rule.title.gu}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {rule.desc[lang] || rule.desc.gu}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {/* SECTION 5: Payment Dispute & Refund Process */}
              <article
                id="payment-dispute"
                className="scroll-mt-36 bg-card dark:bg-[#0d3631] rounded-xl p-6 md:p-8 border border-border/70 shadow-2xs flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#fdc72d] text-[#0e3934] font-bold text-xs uppercase">
                      {data.sections.sec5.tag[lang] || data.sections.sec5.tag.gu}
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {data.sections.sec5.tagEn}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {data.sections.sec5.title[lang] || data.sections.sec5.title.gu}
                  </h2>
                  <div className="h-0.5 w-16 bg-[#fdc72d] rounded-full"></div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {data.sections.sec5.intro[lang] || data.sections.sec5.intro.gu}
                </p>

                {/* 3-Step Refund Workflow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  {data.sections.sec5.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/40 dark:bg-[#0f3c36] p-5 rounded-xl border border-border/50 flex flex-col gap-2.5 relative"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#fdc72d] text-[#0e3934] flex items-center justify-center font-bold text-sm shadow-2xs">
                        {st.step}
                      </div>
                      <h3 className="text-sm font-bold text-foreground">
                        {st.title[lang] || st.title.gu}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {st.desc[lang] || st.desc.gu}
                      </p>
                      <span className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] mt-auto">
                        {st.time[lang] || st.time.gu}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Razorpay Failed Transaction Notice */}
                <div className="bg-[#fdc72d]/10 dark:bg-[#0f3c36] p-4 rounded-xl border border-[#fdc72d]/30 flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-[#8a6800] dark:text-[#fdc72d] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      {data.sections.sec5.failedTxnNotice.title[lang] || data.sections.sec5.failedTxnNotice.title.gu}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {data.sections.sec5.failedTxnNotice.desc[lang] || data.sections.sec5.failedTxnNotice.desc.gu}
                    </p>
                  </div>
                </div>
              </article>

              {/* SECTION 6: Statutory Grievance Redressal Officer */}
              <article
                id="grievance"
                className="scroll-mt-36 bg-card dark:bg-[#0d3631] rounded-xl p-6 md:p-8 border border-border/70 shadow-2xs flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#fdc72d] text-[#0e3934] font-bold text-xs uppercase">
                      {data.sections.sec6.tag[lang] || data.sections.sec6.tag.gu}
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {data.sections.sec6.tagEn}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {data.sections.sec6.title[lang] || data.sections.sec6.title.gu}
                  </h2>
                  <div className="h-0.5 w-16 bg-[#fdc72d] rounded-full"></div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {data.sections.sec6.intro[lang] || data.sections.sec6.intro.gu}
                </p>

                {/* Officer Profile Card */}
                <div className="bg-muted/40 dark:bg-[#0f3c36] rounded-xl p-5 sm:p-6 border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                      <UserCheck className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg font-bold text-foreground">
                        {data.sections.sec6.officer.name[lang] || data.sections.sec6.officer.name.gu}
                      </span>
                      <span className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d]">
                        {data.sections.sec6.officer.designation[lang] || data.sections.sec6.officer.designation.gu}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {data.sections.sec6.officer.company[lang] || data.sections.sec6.officer.company.gu}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                      <span className="text-foreground">
                        {data.sections.sec6.officer.location[lang] || data.sections.sec6.officer.location.gu}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                      <a
                        href={`mailto:${data.sections.sec6.officer.email}`}
                        className="text-[#8a6800] dark:text-[#fdc72d] font-bold hover:underline"
                      >
                        {data.sections.sec6.officer.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                      <span>
                        {data.sections.sec6.officer.resolutionTime[lang] || data.sections.sec6.officer.resolutionTime.gu}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Complaint Action Trigger */}
                <div className="bg-[#fdc72d]/10 dark:bg-[#0f3c36] p-5 rounded-xl border border-[#fdc72d]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <BadgeAlert className="w-5 h-5 text-[#8a6800] dark:text-[#fdc72d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-foreground block">
                        {data.sections.sec6.directComplaint.title[lang] || data.sections.sec6.directComplaint.title.gu}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {data.sections.sec6.directComplaint.desc[lang] || data.sections.sec6.directComplaint.desc.gu}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsGrievanceOpen(true)}
                    className="bg-[#fdc72d] text-[#0e3934] hover:bg-[#eab318] font-bold text-xs shrink-0 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    {data.sections.sec6.directComplaint.cta[lang] || data.sections.sec6.directComplaint.cta.gu}
                  </Button>
                </div>
              </article>

            </div>
          </div>
        </div>

        {/* Bottom Reassurance Strip & Downloads Banner */}
        <section className="w-full bg-card dark:bg-[#0d3631] border-t border-border/70 py-8 shadow-2xs mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-center lg:text-left flex-wrap justify-center lg:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-[#8a6800] dark:text-[#fdc72d]">
                  {data.bottomBanner.sacredMantra}
                </span>
                <span className="text-xs text-muted-foreground">
                  {data.bottomBanner.desc[lang] || data.bottomBanner.desc.gu}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center print-hide">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-2 bg-card dark:bg-[#0f3c36] border-border text-foreground hover:bg-[#fdc72d]/15 hover:text-[#8a6800] cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d]" />
                <span>{data.bottomBanner.downloadPdf[lang] || data.bottomBanner.downloadPdf.gu}</span>
              </Button>

              <a
                href="mailto:support@theastrocode.com"
                className="inline-flex items-center justify-center gap-2 h-7 px-2.5 rounded-lg text-xs bg-[#fdc72d] text-[#0e3934] hover:bg-[#eab318] font-bold shadow-sm cursor-pointer transition-colors"
              >
                <Headphones className="w-4 h-4" />
                <span>{data.bottomBanner.supportHelp[lang] || data.bottomBanner.supportHelp.gu}</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* 3. Global Astro Footer */}
      <div className="print-hide">
        <AstroFooter config={siteData.config} footer={siteData.footer} />
      </div>

      {/* 4. Interactive Dialog: Lodge Grievance Ticket */}
      <Dialog open={isGrievanceOpen} onOpenChange={setIsGrievanceOpen}>
        <DialogContent className="sm:max-w-md p-6 bg-card dark:bg-[#0d3631] border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <Scale className="w-4 h-4 text-[#8a6800] dark:text-[#fdc72d]" />
              {lang === "gu" ? "સહાયતા & ફરિયાદ નિવારણ અરજી" : "Lodge Legal Grievance Ticket"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {lang === "gu"
                ? "ગ્રીવન્સ ઓફિસર શ્રી શૈલેષભાઈ જોશીની કાનૂની ડેસ્કને સીધો મેમો. ૨૪ કલાકમાં જવાબ મળશે."
                : "Direct memo to Grievance Officer Shaileshbhai Joshi. Response guaranteed within 24 hours."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleGrievanceSubmit} className="flex flex-col gap-3 py-2 text-xs">
            <div>
              <label className="font-semibold text-foreground block mb-1">
                {lang === "gu" ? "તમારું પૂરું નામ *" : "Full Name *"}
              </label>
              <Input
                required
                value={grievanceForm.fullName}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, fullName: e.target.value })}
                placeholder={lang === "gu" ? "દા.ત. રાહુલ શાહ" : "e.g. Rahul Shah"}
                className="h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-foreground block mb-1">
                  {lang === "gu" ? "મોબાઇલ નંબર *" : "Mobile Number *"}
                </label>
                <Input
                  required
                  type="tel"
                  maxLength={10}
                  value={grievanceForm.mobileNumber}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, mobileNumber: e.target.value.replace(/\D/g, "") })}
                  placeholder="9825000000"
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">
                  {lang === "gu" ? "ઓર્ડર / સ્લોટ આઈડી" : "Order / Slot ID"}
                </label>
                <Input
                  value={grievanceForm.orderOrBookingId}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, orderOrBookingId: e.target.value })}
                  placeholder={lang === "gu" ? "દા.ત. #TAC-892" : "e.g. #TAC-892"}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-foreground block mb-1">
                {lang === "gu" ? "ફરિયાદનો વિષય / શ્રેણી" : "Issue Category"}
              </label>
              <select
                value={grievanceForm.category}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, category: e.target.value })}
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="consultation">
                  {lang === "gu" ? "જ્યોતિષ પરામર્શ & સ્લોટ વિવાદ" : "Astrology Consultation Dispute"}
                </option>
                <option value="shop">
                  {lang === "gu" ? "MyShop પૂજા સામગ્રી / રત્ન રિટર્ન" : "MyShop Item / Gemstone Return"}
                </option>
                <option value="refund">
                  {lang === "gu" ? "ઓનલાઇન પેમેન્ટ & બેંક રિફંડ વિલંબ" : "Online Payment & Refund Delay"}
                </option>
                <option value="privacy">
                  {lang === "gu" ? "જન્મ વિગતો & કુંડળી ગોપનીયતા" : "Kundali Privacy & Birth Data"}
                </option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-foreground block mb-1">
                {lang === "gu" ? "સમસ્યાની વિગત *" : "Detailed Issue Description *"}
              </label>
              <Textarea
                required
                rows={3}
                value={grievanceForm.description}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
                placeholder={lang === "gu" ? "આપની સમસ્યા કે ફરિયાદ સ્પષ્ટ શબ્દોમાં જણાવો..." : "Describe your grievance in detail..."}
                className="text-xs resize-none"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsGrievanceOpen(false)}
                className="text-xs cursor-pointer"
              >
                {lang === "gu" ? "રદ કરો" : "Cancel"}
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmittingGrievance}
                className="bg-[#fdc72d] text-[#0e3934] hover:bg-[#eab318] font-bold text-xs cursor-pointer"
              >
                {isSubmittingGrievance ? (
                  lang === "gu" ? "નોંધાઈ રહ્યું છે..." : "Submitting..."
                ) : (
                  lang === "gu" ? "ફરિયાદ સબમિટ કરો" : "Submit Grievance"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 5. Interactive Dialog: Right to Erasure */}
      <Dialog open={isErasureOpen} onOpenChange={setIsErasureOpen}>
        <DialogContent className="sm:max-w-md p-6 bg-card dark:bg-[#0d3631] border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <Trash2 className="w-4 h-4 text-destructive" />
              {lang === "gu" ? "કુંડળી ડેટા ડિલીટ કરવાની વિનંતી" : "Permanent Kundali Data Erasure"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              {lang === "gu"
                ? "ડિજિટલ પર્સનલ ડેટા પ્રોટેક્શન (DPDP) અને IT Act હેઠળ, આપની જન્મ તારીખ, સમય, જન્મ સ્થાન અને કુંડળી વિશ્લેષણ હિસ્ટ્રી અમારા સુરક્ષિત સર્વરમાંથી કાયમ માટે રદ થઈ જશે."
                : "Under Digital Personal Data Protection guidelines, your date of birth, time, coordinates, and horoscope records will be irrevocably purged from our servers."}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-destructive/10 text-destructive border border-destructive/20 p-3 rounded-lg text-xs leading-relaxed my-2">
            <strong>{lang === "gu" ? "ધ્યાન રાખો:" : "Note:"}</strong>{" "}
            {lang === "gu"
              ? "એકવાર ડેટા રદ થયા પછી અગાઉ બનેલી કુંડળી પુનઃપ્રાપ્ત થઈ શકશે નહીં."
              : "Once purged, previous Kundali computations cannot be restored and must be re-entered."}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsErasureOpen(false)}
              className="text-xs cursor-pointer"
            >
              {lang === "gu" ? "પાછા જાઓ" : "Cancel"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleConfirmErasure}
              className="font-bold text-xs cursor-pointer"
            >
              {lang === "gu" ? "હા, ડેટા ડિલીટ કરો" : "Confirm Data Deletion"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}
