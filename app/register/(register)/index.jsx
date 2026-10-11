"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Sun,
  Gift,
  ShieldCheck,
  Compass,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LogIn
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { ASTRO_DATA_GU, ASTRO_DATA_EN } from "@/lib/data/astro-data"
import { REGISTER_DATA } from "@/lib/data/register-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export default function RegisterClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const siteData = lang === "gu" ? ASTRO_DATA_GU : ASTRO_DATA_EN
  const data = REGISTER_DATA

  // Form State
  const [formData, setFormData] = React.useState({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
    receiveUpdates: true
  })

  const [errors, setErrors] = React.useState({})
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [maxDate, setMaxDate] = React.useState("")

  React.useEffect(() => {
    setMaxDate(new Date().toISOString().split("T")[0])
  }, [])

  // Field change handler with validation clearance
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // Mobile number specific cleaner (digits only, max 10)
  const handleMobileChange = (val) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10)
    handleChange("mobileNumber", cleaned)
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        lang === "gu"
          ? "કૃપા કરીને તમારું પૂરું નામ દાખલ કરો."
          : "Please enter your full name."
    }

    if (formData.mobileNumber.trim().length !== 10) {
      newErrors.mobileNumber =
        lang === "gu"
          ? "કૃપા કરીને માન્ય ૧૦-અંકનો મોબાઇલ નંબર દાખલ કરો."
          : "Please enter a valid 10-digit mobile number."
    }

    if (
      !formData.emailAddress.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())
    ) {
      newErrors.emailAddress =
        lang === "gu"
          ? "કૃપા કરીને માન્ય ઈમેલ એડ્રેસ દાખલ કરો."
          : "Please enter a valid email address."
    }

    if (!formData.dob) {
      newErrors.dob =
        lang === "gu"
          ? "કુંડળી ગણતરી માટે જન્મ તારીખ જરૂરી છે."
          : "Date of birth is required for Kundali calculations."
    }

    if (!formData.birthPlace.trim()) {
      newErrors.birthPlace =
        lang === "gu"
          ? "કૃપા કરીને જન્મ સ્થળ અથવા શહેર દાખલ કરો."
          : "Please enter your birth place or city."
    }

    if (formData.password.length < 8) {
      newErrors.password =
        lang === "gu"
          ? "પાસવર્ડ ઓછામાં ઓછો ૮ અક્ષરનો હોવો જોઈએ."
          : "Password must be at least 8 characters long."
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        lang === "gu"
          ? "પાસવર્ડ મેળ ખાતો નથી (પાસવર્ડ સરખા નથી)."
          : "Passwords do not match."
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms =
        lang === "gu"
          ? "કૃપા કરીને નિયમો અને શરતો સ્વીકારો."
          : "Please agree to the Terms of Service."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error(
        lang === "gu"
          ? "કૃપા કરીને ફોર્મમાં જરૂરી વિગતો યોગ્ય રીતે ભરો."
          : "Please fill all required fields correctly."
      )
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(
        lang === "gu"
          ? "વૈદિક એકાઉન્ટ સફળતાપૂર્વક બની ગયું છે! The Astro Code માં આપનું સ્વાગત છે."
          : "Your Vedic account has been created successfully! Welcome to The Astro Code."
      )
      router.push("/myshop")
    }, 900)
  }

  // Handle Google Quick Sign Up
  const handleGoogleSignUp = () => {
    toast.info(
      lang === "gu"
        ? "Google એકાઉન્ટ દ્વારા ઝડપી નોંધણી શરૂ થઈ રહી છે..."
        : "Initiating quick sign-up with Google..."
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* 1. Global Header */}
      <AstroHeader
        categories={siteData.categories}
        navLinks={siteData.navLinks}
        config={siteData.config}
        topBar={siteData.topBar}
        activeCategory="home"
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

      {/* 2. Main Content */}
      <main className="flex-1 w-full bg-background pt-4 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Bar: Clean Breadcrumbs */}
          <div className="py-2.5 flex items-center justify-between border-b border-border/50">
            <Breadcrumb>
              <BreadcrumbList className="text-xs">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors">
                    {data.breadcrumb.home[lang]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/login" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors">
                    {data.breadcrumb.login[lang]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-[#8a6800] dark:text-[#fdc72d]">
                    {data.breadcrumb.register[lang]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Main Dual-Column Registration Architecture */}
          <div className="mt-5 rounded-2xl shadow-lg border border-border/80 bg-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* ======================================================== */}
              {/* LEFT COLUMN: VEDIC ATMOSPHERE & SACRED PERKS (approx 42%) */}
              {/* ======================================================== */}
              <div className="lg:col-span-5 relative p-6 sm:p-10 flex flex-col justify-between overflow-hidden bg-[#151613] text-white min-h-[520px]">
                {/* Glowing Sri Yantra Cosmic Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 pointer-events-none"
                  style={{ backgroundImage: "url('/vedic-login-bg.jpg')" }}
                />

                {/* Ambient Dark Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151613] via-[#151613]/75 to-[#151613]/40 pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-transparent to-[#151613]/80 pointer-events-none" />

                {/* Top Content: Uncluttered Perks */}
                <div className="relative z-10 space-y-6">
                  {/* Sacred Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdc72d]/15 backdrop-blur-md text-[#fdc72d] border border-[#fdc72d]/30 text-xs font-bold shadow-xs">
                    <Sparkles className="h-3.5 w-3.5 text-[#fdc72d]" />
                    <span className="tracking-wide">{data.leftColumn.pillTag[lang]}</span>
                  </div>

                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                      {data.leftColumn.title[lang]}
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
                      {data.leftColumn.subtitle[lang]}
                    </p>
                  </div>

                  {/* 4 Core Perks */}
                  <div className="space-y-3 pt-2">
                    {data.leftColumn.perks.map((perk) => {
                      const IconComp =
                        perk.icon === "BookOpen"
                          ? BookOpen
                          : perk.icon === "Sun"
                          ? Sun
                          : perk.icon === "Gift"
                          ? Gift
                          : Sparkles

                      return (
                        <div
                          key={perk.id}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xs transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#fdc72d]/20 text-[#fdc72d] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                            <IconComp className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <h2 className="text-xs sm:text-sm font-bold text-white">
                              {perk.title[lang]}
                            </h2>
                            <p className="text-[11px] sm:text-xs text-white/75 mt-0.5 leading-relaxed">
                              {perk.desc[lang]}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Trust Badge: Compact & Clean */}
                <div className="relative z-10 pt-6 mt-6 border-t border-white/15">
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white/90 backdrop-blur-md">
                    <span className="font-black text-[#fdc72d]">
                      {lang === "gu" ? data.leftColumn.trustBadge.rating : data.leftColumn.trustBadge.ratingEn}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="font-medium text-[11px] sm:text-xs">
                      {data.leftColumn.trustBadge.text[lang]}
                    </span>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* RIGHT COLUMN: REGISTRATION FORM WORKSPACE (approx 58%)   */}
              {/* ======================================================== */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-card">
                <div className="space-y-6">
                  
                  {/* Top Auspicious Header */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-2">
                      <span className="text-xs font-bold tracking-widest text-[#8a6800] dark:text-[#fdc72d] flex items-center gap-1.5 uppercase">
                        <Sparkles className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                        {data.rightColumn.divineGreeting[lang]}
                      </span>
                      <span className="text-[11px] font-bold text-[#8a6800] dark:text-[#fdc72d] bg-[#fdc72d]/15 px-2.5 py-0.5 rounded-full self-start sm:self-auto flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#fdc72d] animate-pulse" />
                        {data.rightColumn.muhuratBadge[lang]}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2 leading-tight">
                      {data.rightColumn.heading[lang]}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {data.rightColumn.subheading[lang]}
                    </p>
                  </div>

                  {/* Full-width Google Sign Up Action */}
                  <div>
                    <button
                      type="button"
                      onClick={handleGoogleSignUp}
                      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/70 transition-colors shadow-2xs text-xs sm:text-sm font-bold text-foreground cursor-pointer"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.18 3.66-9.15z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span>{data.rightColumn.googleAuth[lang]}</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center py-1">
                    <div className="w-full h-px bg-border" />
                    <span className="absolute bg-card px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {data.rightColumn.dividerText[lang]}
                    </span>
                  </div>

                  {/* Main Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* 1. Full Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="reg-fullname" className="block text-xs font-bold text-foreground">
                          {data.rightColumn.fields.fullName.label[lang]}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                          <User className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="reg-fullname"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            placeholder={data.rightColumn.fields.fullName.placeholder[lang]}
                            className={`pl-10 h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d] ${
                              errors.fullName ? "border-destructive ring-1 ring-destructive" : ""
                            }`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-[11px] text-destructive font-medium flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* 2. Mobile Number */}
                      <div className="space-y-1.5">
                        <label htmlFor="reg-mobile" className="block text-xs font-bold text-foreground">
                          {data.rightColumn.fields.mobileNumber.label[lang]}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <div className="flex gap-2">
                          <div className="h-11 px-3 bg-muted/60 border border-border rounded-xl flex items-center gap-1.5 shrink-0 text-xs font-bold text-foreground">
                            <span className="w-4 h-3 rounded-xs flex flex-col overflow-hidden shadow-2xs">
                              <span className="h-1/3 bg-[#ff9933] w-full block" />
                              <span className="h-1/3 bg-white w-full block" />
                              <span className="h-1/3 bg-[#138808] w-full block" />
                            </span>
                            <span>+91</span>
                          </div>
                          <div className="relative flex-1">
                            <Phone className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="reg-mobile"
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              value={formData.mobileNumber}
                              onChange={(e) => handleMobileChange(e.target.value)}
                              placeholder={data.rightColumn.fields.mobileNumber.placeholder[lang]}
                              className={`pl-10 h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d] ${
                                errors.mobileNumber ? "border-destructive ring-1 ring-destructive" : ""
                              }`}
                            />
                          </div>
                        </div>
                        {errors.mobileNumber && (
                          <p className="text-[11px] text-destructive font-medium flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.mobileNumber}
                          </p>
                        )}
                      </div>

                      {/* 3. Email Address (Full Width on md) */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label htmlFor="reg-email" className="block text-xs font-bold text-foreground">
                          {data.rightColumn.fields.emailAddress.label[lang]}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="reg-email"
                            type="email"
                            value={formData.emailAddress}
                            onChange={(e) => handleChange("emailAddress", e.target.value)}
                            placeholder={data.rightColumn.fields.emailAddress.placeholder[lang]}
                            className={`pl-10 h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d] ${
                              errors.emailAddress ? "border-destructive ring-1 ring-destructive" : ""
                            }`}
                          />
                        </div>
                        {errors.emailAddress && (
                          <p className="text-[11px] text-destructive font-medium flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.emailAddress}
                          </p>
                        )}
                      </div>

                      {/* 4. Date of Birth */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label htmlFor="reg-dob" className="block text-xs font-bold text-foreground">
                            {data.rightColumn.fields.dob.label[lang]}{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            {data.rightColumn.fields.dob.hint[lang]}
                          </span>
                        </div>
                        <div className="relative">
                          <Input
                            id="reg-dob"
                            type="date"
                            max={maxDate || undefined}
                            value={formData.dob}
                            onChange={(e) => handleChange("dob", e.target.value)}
                            className={`h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d] ${
                              errors.dob ? "border-destructive ring-1 ring-destructive" : ""
                            }`}
                          />
                        </div>
                        {errors.dob && (
                          <p className="text-[11px] text-destructive font-medium flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.dob}
                          </p>
                        )}
                      </div>

                      {/* 5. Birth Time (Optional) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label htmlFor="reg-birthtime" className="block text-xs font-bold text-foreground">
                            {data.rightColumn.fields.birthTime.label[lang]}
                          </label>
                          <span className="text-[10px] text-[#8a6800] dark:text-[#fdc72d] font-bold">
                            {data.rightColumn.fields.birthTime.hint[lang]}
                          </span>
                        </div>
                        <div className="relative">
                          <Input
                            id="reg-birthtime"
                            type="time"
                            value={formData.birthTime}
                            onChange={(e) => handleChange("birthTime", e.target.value)}
                            className="h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d]"
                          />
                        </div>
                      </div>

                      {/* 6. Birth Place / City (Full Width on md) */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label htmlFor="reg-birthplace" className="block text-xs font-bold text-foreground">
                          {data.rightColumn.fields.birthPlace.label[lang]}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="reg-birthplace"
                            type="text"
                            value={formData.birthPlace}
                            onChange={(e) => handleChange("birthPlace", e.target.value)}
                            placeholder={data.rightColumn.fields.birthPlace.placeholder[lang]}
                            className={`pl-10 h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d] ${
                              errors.birthPlace ? "border-destructive ring-1 ring-destructive" : ""
                            }`}
                          />
                        </div>
                        {errors.birthPlace && (
                          <p className="text-[11px] text-destructive font-medium flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.birthPlace}
                          </p>
                        )}
                      </div>

                      {/* 7. Password */}
                      <div className="space-y-1.5">
                        <label htmlFor="reg-password" className="block text-xs font-bold text-foreground">
                          {data.rightColumn.fields.password.label[lang]}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="reg-password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            placeholder={data.rightColumn.fields.password.placeholder[lang]}
                            className={`pl-10 pr-10 h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d] ${
                              errors.password ? "border-destructive ring-1 ring-destructive" : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            title={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-[11px] text-destructive font-medium flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {/* 8. Confirm Password */}
                      <div className="space-y-1.5">
                        <label htmlFor="reg-confirm-password" className="block text-xs font-bold text-foreground">
                          {data.rightColumn.fields.confirmPassword.label[lang]}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                          <KeyRound className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="reg-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange("confirmPassword", e.target.value)}
                            placeholder={data.rightColumn.fields.confirmPassword.placeholder[lang]}
                            className={`pl-10 pr-10 h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d] ${
                              errors.confirmPassword ? "border-destructive ring-1 ring-destructive" : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            title={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-[11px] text-destructive font-medium flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Consents */}
                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-start gap-2.5">
                        <Checkbox
                          id="reg-agree-terms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => handleChange("agreeTerms", Boolean(checked))}
                          className="mt-0.5 data-[state=checked]:bg-[#fdc72d] data-[state=checked]:text-[#1b1c1a] data-[state=checked]:border-[#fdc72d]"
                        />
                        <label htmlFor="reg-agree-terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none">
                          {data.rightColumn.consents.terms[lang]}
                        </label>
                      </div>
                      {errors.agreeTerms && (
                        <p className="text-[11px] text-destructive font-medium pl-6">
                          {errors.agreeTerms}
                        </p>
                      )}

                      <div className="flex items-start gap-2.5">
                        <Checkbox
                          id="reg-updates"
                          checked={formData.receiveUpdates}
                          onCheckedChange={(checked) => handleChange("receiveUpdates", Boolean(checked))}
                          className="mt-0.5 data-[state=checked]:bg-[#fdc72d] data-[state=checked]:text-[#1b1c1a] data-[state=checked]:border-[#fdc72d]"
                        />
                        <label htmlFor="reg-updates" className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none">
                          {data.rightColumn.consents.updates[lang]}
                        </label>
                      </div>
                    </div>

                    {/* Primary CTA Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 sm:h-13 rounded-xl bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                      >
                        <ShieldCheck className="h-5 w-5 text-[#1b1c1a]" />
                        <span>{data.rightColumn.submitButton[lang]}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </form>

                  {/* Already have an account banner */}
                  <div className="mt-6 pt-5 bg-muted/40 dark:bg-[#151613] -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 lg:-mx-12 lg:-mb-12 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/70">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                        <LogIn className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                          {data.rightColumn.alreadyHaveAccount.title[lang]}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {data.rightColumn.alreadyHaveAccount.desc[lang]}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/login"
                      className="shrink-0 px-4 py-2 rounded-lg bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{data.rightColumn.alreadyHaveAccount.cta[lang]}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* 3. Trust & Security 3-Pillars underneath */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.trustPillars.map((pillar) => {
              const IconComp =
                pillar.icon === "ShieldCheck"
                  ? ShieldCheck
                  : pillar.icon === "Compass"
                  ? Compass
                  : PhoneCall

              return (
                <Card key={pillar.id} className="p-5 border-border/80 shadow-xs bg-card">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-foreground">
                        {pillar.title[lang]}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {pillar.desc[lang]}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* 4. Sacred Bottom Note / Benediction */}
          <div className="mt-8 py-5 text-center bg-muted/40 dark:bg-[#161714] border border-border/70 rounded-xl space-y-1.5">
            <p className="text-sm font-extrabold text-[#8a6800] dark:text-[#fdc72d] tracking-wider">
              {data.sacredNote.mantra}
            </p>
            <p className="text-xs text-muted-foreground">
              {data.sacredNote.text[lang]}
            </p>
          </div>

        </div>
      </main>

      {/* 5. Global Footer */}
      <AstroFooter lang={lang} />
    </div>
  )
}
