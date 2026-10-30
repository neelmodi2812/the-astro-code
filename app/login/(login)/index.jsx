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
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  Compass,
  PhoneCall,
  KeyRound,
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { ASTRO_DATA_GU, ASTRO_DATA_EN } from "@/lib/data/astro-data"
import { LOGIN_DATA } from "@/lib/data/login-data"
import { authService } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

export default function LoginClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const siteData = lang === "gu" ? ASTRO_DATA_GU : ASTRO_DATA_EN
  const data = LOGIN_DATA

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Email & Password
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberSession, setRememberSession] = React.useState(true)

  // Form submit: Password Mode
  const handlePasswordSubmit = async (e) => {
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
    try {
      await authService.login({ email, password })
      toast.success(
        lang === "gu"
          ? "ઈમેલ ચકાસણી સફળ! તમારું સત્ર શરૂ થઈ ગયું છે."
          : "Authentication successful! Your session is active."
      )
      router.push("/myshop")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
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
              <div className="lg:col-span-5 relative p-6 sm:p-10 flex flex-col justify-between overflow-hidden bg-[#0c3530] text-white min-h-[460px]">
                {/* Background Image: Glowing Sri Yantra Cosmos */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 pointer-events-none transition-transform duration-700"
                  style={{ backgroundImage: "url('/vedic-login-bg.jpg')" }}
                />
                
                {/* Elegant dark gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c3530] via-[#0c3530]/70 to-[#0c3530]/40 pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-transparent to-[#0c3530]/80 pointer-events-none" />

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
                    <span className="font-medium text-xs sm:text-xs">
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

                  {/* Email & password sign-in */}
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
                            className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline cursor-pointer"
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
                          className="data-[state=checked]:bg-[#fdc72d] data-[state=checked]:text-[#0e3934] data-[state=checked]:border-[#fdc72d]"
                        />
                        <label htmlFor="remember-session" className="text-foreground font-medium cursor-pointer">
                          {data.rightColumn.pwdForm.rememberSession[lang]}
                        </label>
                      </div>

                      {/* Submit via Email */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 h-12 rounded-xl bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <KeyRound className="h-5 w-5 text-[#0e3934]" />
                        <span>{data.rightColumn.pwdForm.submitButton[lang]}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                </div>

                {/* New Registration Callout Banner at Bottom */}
                <div className="mt-8 pt-5 bg-muted/40 dark:bg-[#0c3530] -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 lg:-mx-12 lg:-mb-12 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/70">
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
                    className="shrink-0 px-4 py-2 rounded-lg bg-[#fdc72d] text-[#0e3934] hover:bg-[#eab318] text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
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
          <div className="mt-6 p-4 rounded-xl bg-muted/50 dark:bg-[#0c3631] border border-border/70 text-center flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
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
