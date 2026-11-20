"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Lock,
  Sparkles,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { LOGIN_DATA } from "@/lib/data/login-data"
import { authService } from "@/lib/api"
import { getLoginSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function LoginClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const siteData = useHomeData(lang)
  const data = LOGIN_DATA

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const [authError, setAuthError] = React.useState("")

  // Form fields
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberSession, setRememberSession] = React.useState(true)

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setAuthError("")

    const schema = getLoginSchema(lang)
    const result = schema.safeParse({ email, password })

    if (!result.success) {
      const fieldErrors = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await authService.login({ email: email.trim(), password })
      toast.success(
        lang === "gu"
          ? "સ્વાગત છે! લૉગિન સફળ થયું."
          : "Welcome back! Login successful."
      )
      router.push("/myshop")
    } catch (error) {
      if (error?.errors) {
        const apiErrors = {}
        Object.entries(error.errors).forEach(([k, msgs]) => {
          apiErrors[k] = Array.isArray(msgs) ? msgs[0] : msgs
        })
        setErrors(apiErrors)
      }
      const message =
        error?.message ||
        (lang === "gu" ? "અમાન્ય ઈમેલ અથવા પાસવર્ડ." : "Invalid email or password.")
      setAuthError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#071d1a] text-foreground">
      {/* 1. Global Astro Header */}
      <AstroHeader
        categories={siteData.categories}
        navLinks={siteData.navLinks}
        config={siteData.config}
        topBar={siteData.topBar}
        activeCategory="home"
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
      <main className="flex-1 w-full flex flex-col items-center justify-center py-6 sm:py-12 px-4 sm:px-6">
        <div className="w-full max-w-4xl">
          {/* Subtle Clean Breadcrumb */}
          <div className="mb-4 px-2">
            <Breadcrumb>
              <BreadcrumbList className="text-xs text-muted-foreground">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="hover:text-foreground transition-colors">
                    {data.breadcrumb.home[lang]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-foreground">
                    {data.breadcrumb.login[lang]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Luxury Compact Authentication Card */}
          <div className="rounded-3xl border border-border/70 shadow-2xl shadow-emerald-950/10 bg-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
              
              {/* LEFT COLUMN: Clean Vedic Visual Anchor (42%) */}
              <div className="lg:col-span-5 relative p-8 sm:p-10 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#062823] via-[#09352f] to-[#041a17] text-white">
                {/* Background sacred mandala glow */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-110 pointer-events-none"
                  style={{ backgroundImage: "url('/vedic-login-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041a17] via-transparent to-transparent pointer-events-none" />

                {/* Top: Sacred Brand & Quote */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-sm">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold tracking-tight text-white leading-none">
                        {data.leftColumn.portalName[lang]}
                      </h2>
                      <p className="text-[11px] text-amber-300/80 font-medium tracking-wide mt-1">
                        {data.leftColumn.portalTagline[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-lg sm:text-xl font-bold text-amber-400 tracking-wide">
                      {data.leftColumn.shloka[lang]}
                    </div>
                    <p className="text-xs text-white/70 font-normal mt-1 leading-relaxed">
                      {data.leftColumn.shlokaMeaning[lang]}
                    </p>
                  </div>

                  {/* 3 Sleek, Minimal Benefits */}
                  <div className="space-y-2.5 pt-4">
                    {data.leftColumn.highlights.map((item) => (
                      <div key={item.id} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-white/90 font-medium">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/25 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-amber-400 stroke-[3]" />
                        </div>
                        <span>{item[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom: Minimal Trust Badge */}
                <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
                  <div className="inline-flex items-center gap-2 text-xs text-white/80 font-medium">
                    <span className="text-amber-400 font-bold">★ ૫.૦</span>
                    <span className="text-white/30">•</span>
                    <span>{data.leftColumn.trustBadge.text[lang]}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Clean, Elegant, Minimal Login Form (58%) */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white dark:bg-[#0c2e2a]">
                <div className="max-w-md w-full mx-auto space-y-6">
                  
                  {/* Title & Sacred Pill */}
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-2.5">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      <span>{data.rightColumn.welcomeBadge[lang]}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {data.rightColumn.heading[lang]}
                    </h1>

                    {authError && (
                      <div
                        role="alert"
                        className="mt-3.5 p-3 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive flex items-center gap-2.5 text-xs sm:text-sm font-semibold"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
                        <span>{authError}</span>
                      </div>
                    )}
                  </div>

                  {/* Sign-in Form */}
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    
                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="user-email" className="block text-xs font-bold text-foreground">
                        {data.rightColumn.emailLabel[lang]}
                      </label>
                      <div className="relative">
                        <Mail className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="user-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (authError) setAuthError("")
                            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
                          }}
                          placeholder={data.rightColumn.emailPlaceholder[lang]}
                          className={`pl-10 h-11 text-xs sm:text-sm rounded-xl bg-muted/20 border-border/80 focus-visible:ring-[#00685d] ${
                            errors.email ? "border-destructive ring-1 ring-destructive" : ""
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="user-password" className="text-xs font-bold text-foreground">
                          {data.rightColumn.passwordLabel[lang]}
                        </label>
                        <Link
                          href="/forgot-password"
                          className="text-xs font-semibold text-[#00685d] dark:text-amber-400 hover:underline cursor-pointer"
                        >
                          {data.rightColumn.forgotPassword[lang]}
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="user-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                            if (authError) setAuthError("")
                            if (errors.password) setErrors((prev) => ({ ...prev, password: "" }))
                          }}
                          placeholder={data.rightColumn.passwordPlaceholder[lang]}
                          className={`pl-10 pr-10 h-11 text-xs sm:text-sm rounded-xl bg-muted/20 border-border/80 focus-visible:ring-[#00685d] ${
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
                        <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.password}</span>
                        </p>
                      )}
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <Checkbox
                        id="remember-session"
                        checked={rememberSession}
                        onCheckedChange={setRememberSession}
                        className="data-[state=checked]:bg-[#00685d] data-[state=checked]:text-white data-[state=checked]:border-[#00685d]"
                      />
                      <label htmlFor="remember-session" className="text-muted-foreground hover:text-foreground font-medium cursor-pointer select-none">
                        {data.rightColumn.rememberSession[lang]}
                      </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-[#00685d] to-[#004e46] hover:from-[#005a50] hover:to-[#00423a] text-white font-bold text-sm shadow-md shadow-[#00685d]/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{lang === "gu" ? "પ્રક્રિયા ચાલુ છે..." : "Signing in..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{data.rightColumn.submitButton[lang]}</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Clean, Subtle Registration Footer Link */}
                  <div className="pt-4 border-t border-border/50 text-center text-xs text-muted-foreground">
                    <span>{data.rightColumn.noAccount[lang]} </span>
                    <Link
                      href="/register"
                      className="font-bold text-[#00685d] dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      {data.rightColumn.createAccount[lang]} →
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* 3. Global Astro Footer */}
      <AstroFooter lang={lang} />
    </div>
  )
}
