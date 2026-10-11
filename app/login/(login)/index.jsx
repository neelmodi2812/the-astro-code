"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Lock,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Sun,
  Truck,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  Compass,
  PhoneCall,
  Clock,
  CheckCircle2,
  X,
  KeyRound,
  ArrowLeft,
  PencilLine
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { ASTRO_DATA_GU, ASTRO_DATA_EN } from "@/lib/data/astro-data"
import { LOGIN_DATA } from "@/lib/data/login-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export default function LoginClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const siteData = lang === "gu" ? ASTRO_DATA_GU : ASTRO_DATA_EN
  const data = LOGIN_DATA

  // Tab: "otp" vs "pwd"
  const [activeTab, setActiveTab] = React.useState("otp") // 'otp' | 'pwd'

  // Form states - Mobile OTP flow
  const [phone, setPhone] = React.useState("")
  const [phoneError, setPhoneError] = React.useState("")
  const [otpDigits, setOtpDigits] = React.useState(["", "", "", "", "", ""])
  const [otpSent, setOtpSent] = React.useState(false) // Initially false: OTP section only reveals after mobile validation!
  const [timerSeconds, setTimerSeconds] = React.useState(60)
  const [isTimerRunning, setIsTimerRunning] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Form states - Email & Password
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberSession, setRememberSession] = React.useState(true)

  // Refs for OTP input auto-focus navigation
  const otpInputRefs = React.useRef([])
  const phoneInputRef = React.useRef(null)

  // Resend OTP Countdown timer effect
  React.useEffect(() => {
    let interval = null
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1)
      }, 1000)
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timerSeconds])

  // Mobile number change handler with validation reset
  const handlePhoneChange = (val) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10)
    setPhone(cleaned)
    if (phoneError) setPhoneError("")
  }

  // Step 1: Validate mobile number and send OTP
  const handleRequestOtp = (e) => {
    if (e) e.preventDefault()
    const cleanPhone = phone.trim()

    if (cleanPhone.length !== 10) {
      const err =
        lang === "gu"
          ? "કૃપા કરીને માન્ય ૧૦-અંકનો મોબાઇલ નંબર દાખલ કરો."
          : "Please enter a valid 10-digit mobile number."
      setPhoneError(err)
      toast.error(err)
      phoneInputRef.current?.focus()
      return
    }

    setPhoneError("")
    setIsSubmitting(true)

    // Simulate OTP dispatch
    setTimeout(() => {
      setIsSubmitting(false)
      setOtpSent(true)
      setOtpDigits(["", "", "", "", "", ""])
      setTimerSeconds(60)
      setIsTimerRunning(true)
      toast.success(
        lang === "gu"
          ? `OTP તમારા નંબર +91 ${cleanPhone} પર સફળતાપૂર્વક મોકલાયો છે.`
          : `Verification code sent to +91 ${cleanPhone}.`
      )

      // Auto focus first OTP input
      setTimeout(() => {
        otpInputRefs.current[0]?.focus()
      }, 100)
    }, 400)
  }

  // Change phone number (return to phone step)
  const handleChangeNumber = () => {
    setOtpSent(false)
    setIsTimerRunning(false)
    setOtpDigits(["", "", "", "", "", ""])
    setTimeout(() => {
      phoneInputRef.current?.focus()
    }, 100)
  }

  // OTP box input handler with auto-tabbing
  const handleOtpChange = (index, value) => {
    const char = value.slice(-1)
    if (char && !/^\d+$/.test(char)) return

    const newOtp = [...otpDigits]
    newOtp[index] = char
    setOtpDigits(newOtp)

    // Automatically focus the next input box
    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  // OTP Backspace handling
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus()
        const newOtp = [...otpDigits]
        newOtp[index - 1] = ""
        setOtpDigits(newOtp)
      } else {
        const newOtp = [...otpDigits]
        newOtp[index] = ""
        setOtpDigits(newOtp)
      }
    }
  }

  // OTP Paste handling
  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pastedData) return

    const newOtp = [...otpDigits]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtpDigits(newOtp)
    const nextIndex = Math.min(pastedData.length, 5)
    otpInputRefs.current[nextIndex]?.focus()
    toast.success(lang === "gu" ? "OTP આપમેળે ભરાઈ ગયો!" : "OTP pasted successfully!")
  }

  // Resend OTP action
  const handleResendOtp = () => {
    if (phone.length !== 10) {
      toast.error(
        lang === "gu"
          ? "કૃપા કરીને માન્ય ૧૦-અંકનો મોબાઇલ નંબર દાખલ કરો."
          : "Please enter a valid 10-digit mobile number."
      )
      return
    }
    setOtpDigits(["", "", "", "", "", ""])
    setTimerSeconds(60)
    setIsTimerRunning(true)
    toast.success(
      lang === "gu"
        ? `નવો OTP તમારા નંબર +91 ${phone} પર મોકલાયો છે.`
        : `New verification code sent to +91 ${phone}.`
    )
    otpInputRefs.current[0]?.focus()
  }

  // Quick Demo fill (725941)
  const handleDemoOtpFill = () => {
    setOtpDigits(["7", "2", "5", "9", "4", "1"])
    toast.info(lang === "gu" ? "ટેસ્ટ OTP '725941' લાગુ કર્યો." : "Demo test OTP '725941' applied.")
  }

  // Form submit: Step 2 OTP Verification & Login
  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault()
    const fullOtp = otpDigits.join("")
    if (fullOtp.length < 6) {
      toast.error(
        lang === "gu"
          ? "કૃપા કરીને સંપૂર્ણ ૬-અંકનો OTP કોડ દાખલ કરો."
          : "Please enter the complete 6-digit OTP code."
      )
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(
        lang === "gu"
          ? "સુરક્ષિત લૉગિન સફળ! The Astro Code માં તમારું સ્વાગત છે."
          : "Secure login successful! Welcome to The Astro Code."
      )
      router.push("/myshop")
    }, 700)
  }

  // Form submit: Password Mode
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast.error(
        lang === "gu"
          ? "કૃપા કરીને માન્ય ઈમેલ એડ્રેસ દાખલ કરો."
          : "Please enter a valid email address."
      )
      return
    }
    if (!password || password.length < 6) {
      toast.error(
        lang === "gu"
          ? "પાસવર્ડ ઓછામાં ઓછો ૬ અક્ષરનો હોવો જોઈએ."
          : "Password must be at least 6 characters."
      )
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(
        lang === "gu"
          ? "ઈમેલ ચકાસણી સફળ! તમારું સત્ર શરૂ થઈ ગયું છે."
          : "Authentication successful! Your session is active."
      )
      router.push("/myshop")
    }, 700)
  }

  // Social Auth Action
  const handleSocialAuth = (provider) => {
    toast.info(
      lang === "gu"
        ? `${provider} દ્વારા સુરક્ષિત સાઇન ઇન થઈ રહ્યું છે...`
        : `Signing in securely with ${provider}...`
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* 1. Global Astro Header */}
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

      {/* 2. Main Authentication Content */}
      <main className="flex-1 w-full bg-background pt-4 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Bar: Clean Breadcrumb Navigation (SSL badge removed as requested) */}
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
                  <BreadcrumbPage className="font-bold text-[#8a6800] dark:text-[#fdc72d]">
                    {data.breadcrumb.login[lang]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Main Dual-Column Authentication Canvas */}
          <div className="mt-5 rounded-2xl shadow-lg border border-border/80 bg-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* ======================================================== */}
              {/* LEFT COLUMN: ELEGANT UNCLUTTERED CARD WITH VEDIC BG IMAGE */}
              {/* ======================================================== */}
              <div className="lg:col-span-5 relative p-6 sm:p-10 flex flex-col justify-between overflow-hidden bg-[#151613] text-white min-h-[460px]">
                {/* Background Image: Glowing Sri Yantra Cosmos */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 pointer-events-none transition-transform duration-700"
                  style={{ backgroundImage: "url('/vedic-login-bg.jpg')" }}
                />
                
                {/* Elegant dark gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151613] via-[#151613]/70 to-[#151613]/40 pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-transparent to-[#151613]/80 pointer-events-none" />

                {/* Top Content Block: Clean, small, uncluttered information */}
                <div className="relative z-10 space-y-5">
                  {/* Sacred Pill Tag */}
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

                  {/* 3 Compact, High-Impact Benefits */}
                  <div className="space-y-3 pt-2">
                    {data.leftColumn.benefits.map((benefit) => {
                      const IconComponent =
                        benefit.icon === "BookOpen"
                          ? BookOpen
                          : benefit.icon === "Sun"
                          ? Sun
                          : Truck

                      return (
                        <div
                          key={benefit.id}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xs transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#fdc72d]/20 text-[#fdc72d] flex items-center justify-center shrink-0 shadow-2xs">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-white/95">
                            {benefit.title[lang]}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Trust Badge: Minimal, beautiful, uncluttered */}
                <div className="relative z-10 pt-6 mt-4 border-t border-white/15">
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
              {/* RIGHT COLUMN: INTERACTIVE AUTHENTICATION MODULE (55%)     */}
              {/* ======================================================== */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-card">
                <div className="space-y-6">
                  
                  {/* Sacred Vedic Inscription & Title (100% Secure badge removed as requested) */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest text-[#8a6800] dark:text-[#fdc72d] flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                        {data.rightColumn.divineGreeting[lang]}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2 leading-tight">
                      {data.rightColumn.heading[lang]}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {data.rightColumn.subheading[lang]}
                    </p>
                  </div>

                  {/* Interactive Tab Switcher: Primary Brand Colors */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 p-1 bg-muted/70 rounded-xl w-full h-auto">
                      <TabsTrigger
                        value="otp"
                        className="py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all data-active:bg-[#fdc72d] data-active:text-[#1b1c1a] data-active:shadow-xs cursor-pointer text-muted-foreground hover:text-foreground"
                      >
                        <Smartphone className="h-4 w-4" />
                        <span>{data.rightColumn.tabs.otp[lang]}</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="pwd"
                        className="py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all data-active:bg-[#fdc72d] data-active:text-[#1b1c1a] data-active:shadow-xs cursor-pointer text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{data.rightColumn.tabs.pwd[lang]}</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* ---------------------------------------------------- */}
                  {/* TAB 1: MOBILE OTP FORM (PROGRESSIVE DISCLOSURE)      */}
                  {/* ---------------------------------------------------- */}
                  {activeTab === "otp" && (
                    <div className="space-y-5 animate-in fade-in-50 duration-200">
                      
                      {/* STEP 1: MOBILE NUMBER INPUT */}
                      {!otpSent ? (
                        <form onSubmit={handleRequestOtp} className="space-y-4">
                          <div className="space-y-1.5">
                            <label htmlFor="user-phone" className="flex items-center justify-between text-xs font-bold text-foreground">
                              <span>{data.rightColumn.otpForm.phoneLabel[lang]}</span>
                              <span className="text-[#8a6800] dark:text-[#fdc72d] text-[11px] font-medium">
                                {data.rightColumn.otpForm.phoneHint[lang]}
                              </span>
                            </label>

                            <div className={`flex rounded-xl border shadow-xs overflow-hidden bg-background focus-within:ring-2 focus-within:ring-[#fdc72d] transition-all ${
                              phoneError ? "border-destructive ring-1 ring-destructive" : "border-border"
                            }`}>
                              {/* Prefix Badge with Indian Tricolor */}
                              <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-muted/60 border-r border-border text-foreground font-bold text-sm shrink-0">
                                <span className="w-5 h-3.5 rounded-xs flex flex-col overflow-hidden shadow-2xs">
                                  <span className="h-1/3 bg-[#ff9933] w-full block" />
                                  <span className="h-1/3 bg-white w-full block" />
                                  <span className="h-1/3 bg-[#138808] w-full block" />
                                </span>
                                <span>+91</span>
                              </div>

                              <div className="relative flex-1 flex items-center">
                                <Input
                                  ref={phoneInputRef}
                                  id="user-phone"
                                  type="tel"
                                  inputMode="numeric"
                                  maxLength={10}
                                  value={phone}
                                  onChange={(e) => handlePhoneChange(e.target.value)}
                                  placeholder={data.rightColumn.otpForm.phonePlaceholder[lang]}
                                  className="w-full h-11 border-0 shadow-none text-sm font-bold tracking-wider px-3 bg-transparent rounded-none focus-visible:ring-0"
                                  autoFocus
                                />
                                {phone && (
                                  <button
                                    type="button"
                                    onClick={() => setPhone("")}
                                    className="absolute right-3 text-muted-foreground hover:text-foreground p-1 transition-colors"
                                    title="Clear"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {phoneError ? (
                              <p className="text-[11px] text-destructive font-medium mt-1">
                                {phoneError}
                              </p>
                            ) : (
                              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                                <span>{lang === "gu" ? "OTP તમારા મોબાઈલ પર SMS દ્વારા મોકલાશે" : "Verification code will be sent via SMS"}</span>
                                <span className="font-mono">{phone.length}/10</span>
                              </div>
                            )}
                          </div>

                          {/* Action Button: Send / Get OTP (Primary Saffron Color) */}
                          <Button
                            type="submit"
                            disabled={isSubmitting || phone.length === 0}
                            className="w-full py-3.5 h-11 rounded-xl bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-extrabold text-sm shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                          >
                            <KeyRound className="h-4 w-4 text-[#1b1c1a]" />
                            <span>{data.rightColumn.otpForm.getOtpButton[lang]}</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </form>
                      ) : (
                        
                        /* STEP 2: ONLY AFTER MOBILE VALIDATION DONE -> SHOW OTP VERIFICATION */
                        <form onSubmit={handleVerifyOtpSubmit} className="space-y-4 animate-in fade-in-50 duration-200">
                          
                          {/* Validated Phone Number Display Bar with Change Option */}
                          <div className="p-3 rounded-xl bg-muted/50 border border-border/80 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-green-500/15 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-[11px] text-muted-foreground font-medium">
                                  {data.rightColumn.otpForm.otpSentTo[lang]}
                                </p>
                                <p className="text-xs sm:text-sm font-black text-foreground tracking-wider">
                                  +91 {phone}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={handleChangeNumber}
                              className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                            >
                              <PencilLine className="h-3.5 w-3.5" />
                              <span>{data.rightColumn.otpForm.changeNumber[lang]}</span>
                            </button>
                          </div>

                          {/* 6-Digit OTP Box Segment */}
                          <div className="p-4 rounded-xl bg-muted/30 dark:bg-[#151613] border border-border/70 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                <KeyRound className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                                {data.rightColumn.otpForm.otpSectionTitle[lang]}
                              </span>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={handleDemoOtpFill}
                                  className="text-[10px] font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline cursor-pointer"
                                >
                                  {lang === "gu" ? "ઓટો-ફિલ ટેસ્ટ (725941)" : "Auto-fill Demo (725941)"}
                                </button>
                                <span className="text-[11px] font-bold text-[#8a6800] dark:text-[#fdc72d] flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>
                                    {String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:
                                    {String(timerSeconds % 60).padStart(2, "0")}{" "}
                                    {data.rightColumn.otpForm.timerRemaining[lang]}
                                  </span>
                                </span>
                              </div>
                            </div>

                            {/* 6 Distinct Numeric Digit Boxes */}
                            <div className="flex items-center justify-between gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                              {otpDigits.map((digit, idx) => (
                                <input
                                  key={idx}
                                  ref={(el) => (otpInputRefs.current[idx] = el)}
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={1}
                                  value={digit}
                                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                  className="w-11 h-12 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-black bg-card text-foreground rounded-xl border border-border shadow-2xs outline-none focus:border-[#fdc72d] focus:ring-2 focus:ring-[#fdc72d]/40 transition-all"
                                />
                              ))}
                            </div>

                            {/* Resend Action */}
                            <div className="flex items-center justify-between pt-1 text-xs">
                              <span className="text-muted-foreground">
                                {data.rightColumn.otpForm.smsNotReceived[lang]}
                              </span>
                              <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={isTimerRunning && timerSeconds > 0}
                                className={`font-bold transition-colors cursor-pointer ${
                                  isTimerRunning && timerSeconds > 0
                                    ? "text-muted-foreground/50 cursor-not-allowed"
                                    : "text-[#8a6800] dark:text-[#fdc72d] hover:underline"
                                }`}
                              >
                                {data.rightColumn.otpForm.resendOtp[lang]}
                              </button>
                            </div>
                          </div>

                          {/* Utilities: Checkbox & Help Link */}
                          <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <Checkbox
                                checked={rememberMe}
                                onCheckedChange={setRememberMe}
                                className="data-[state=checked]:bg-[#fdc72d] data-[state=checked]:text-[#1b1c1a] data-[state=checked]:border-[#fdc72d]"
                              />
                              <span className="text-foreground font-medium">
                                {data.rightColumn.otpForm.rememberDevice[lang]}
                              </span>
                            </label>
                            <Link
                              href="/contact-us"
                              className="font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline transition-colors"
                            >
                              {data.rightColumn.otpForm.needHelp[lang]}
                            </Link>
                          </div>

                          {/* Primary CTA: Verify & Login */}
                          <Button
                            type="submit"
                            disabled={isSubmitting || otpDigits.join("").length < 6}
                            className="w-full py-3.5 h-12 rounded-xl bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                          >
                            <ShieldCheck className="h-5 w-5 text-[#1b1c1a]" />
                            <span>{data.rightColumn.otpForm.submitButton[lang]}</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </form>
                      )}
                    </div>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* TAB 2: EMAIL & PASSWORD FORM                         */}
                  {/* ---------------------------------------------------- */}
                  {activeTab === "pwd" && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4 animate-in fade-in-50 duration-200">
                      
                      {/* Email Input */}
                      <div className="space-y-1.5">
                        <label htmlFor="user-email" className="block text-xs font-bold text-foreground">
                          {data.rightColumn.pwdForm.emailLabel[lang]}
                        </label>
                        <div className="relative">
                          <Mail className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="user-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={data.rightColumn.pwdForm.emailPlaceholder[lang]}
                            className="pl-10 h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d]"
                            required
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label htmlFor="user-password" className="text-xs font-bold text-foreground">
                            {data.rightColumn.pwdForm.passwordLabel[lang]}
                          </label>
                          <Link
                            href="/forgot-password"
                            className="text-[11px] font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline cursor-pointer"
                          >
                            {data.rightColumn.pwdForm.forgotPassword[lang]}
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="user-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={data.rightColumn.pwdForm.passwordPlaceholder[lang]}
                            className="pl-10 pr-10 h-11 text-xs sm:text-sm rounded-xl focus-visible:ring-[#fdc72d]"
                            required
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
                      </div>

                      {/* Remember Checkbox */}
                      <div className="flex items-center gap-2 text-xs">
                        <Checkbox
                          id="remember-session"
                          checked={rememberSession}
                          onCheckedChange={setRememberSession}
                          className="data-[state=checked]:bg-[#fdc72d] data-[state=checked]:text-[#1b1c1a] data-[state=checked]:border-[#fdc72d]"
                        />
                        <label htmlFor="remember-session" className="text-foreground font-medium cursor-pointer">
                          {data.rightColumn.pwdForm.rememberSession[lang]}
                        </label>
                      </div>

                      {/* Submit via Email */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 h-12 rounded-xl bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <KeyRound className="h-5 w-5 text-[#1b1c1a]" />
                        <span>{data.rightColumn.pwdForm.submitButton[lang]}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  )}

                  {/* Subtle Divider */}
                  <div className="relative flex items-center justify-center py-1">
                    <div className="w-full h-px bg-border" />
                    <span className="absolute bg-card px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {data.rightColumn.socialDivider[lang]}
                    </span>
                  </div>

                  {/* Social Auth (WhatsApp removed as requested; clean Google button) */}
                  <div>
                    <button
                      type="button"
                      onClick={() => handleSocialAuth("Google")}
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
                </div>

                {/* New Registration Callout Banner at Bottom */}
                <div className="mt-8 pt-5 bg-muted/40 dark:bg-[#151613] -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 lg:-mx-12 lg:-mb-12 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/70">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                      <UserPlus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                        {data.rightColumn.registerCallout.title[lang]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {data.rightColumn.registerCallout.desc[lang]}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/register"
                    className="shrink-0 px-4 py-2 rounded-lg bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{data.rightColumn.registerCallout.cta[lang]}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Trust Pillars / Spiritual Assurance Banner */}
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

          {/* 4. Astrological Note Banner */}
          <div className="mt-6 p-4 rounded-xl bg-muted/50 dark:bg-[#161714] border border-border/70 text-center flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <Sparkles className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
            <span className="text-muted-foreground">
              {data.astrologicalBanner.text[lang]}
            </span>
            <span className="text-border hidden sm:inline">•</span>
            <Link
              href="/dainik-panchang"
              className="font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline"
            >
              {data.astrologicalBanner.linkText[lang]}
            </Link>
          </div>

        </div>
      </main>

      {/* 5. Global Astro Footer */}
      <AstroFooter lang={lang} />
    </div>
  )
}
