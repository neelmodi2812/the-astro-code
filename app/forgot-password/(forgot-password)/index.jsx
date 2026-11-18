"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  ShieldCheck,
  Key,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Headphones,
  MessageCircle,
  UserCheck,
  Sparkles,
  LogIn,
  Check,
  Loader2,
  RefreshCw
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { FORGOT_PASSWORD_DATA } from "@/lib/data/forgot-password-data"
import { authService } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export default function ForgotPasswordClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const siteData = useHomeData(lang)
  const data = FORGOT_PASSWORD_DATA
  const isEn = lang === "en"

  // Email recovery (a reset link is emailed; the new password is set on /reset-password)
  const [emailAddress, setEmailAddress] = React.useState("")
  const [emailSent, setEmailSent] = React.useState(false)
  const [isSendingEmail, setIsSendingEmail] = React.useState(false)
  const [lastSentEmail, setLastSentEmail] = React.useState("")

  // Send Email Reset Link
  const handleSendEmailLink = async (e) => {
    if (e?.preventDefault) e.preventDefault()
    const targetEmail = (emailAddress || lastSentEmail).trim()
    if (!targetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      toast.error(
        isEn
          ? "Please enter a valid email address."
          : "કૃપા કરીને માન્ય ઈમેલ એડ્રેસ દાખલ કરો."
      )
      return
    }

    setIsSendingEmail(true)
    try {
      const res = await authService.forgotPassword(targetEmail, lang)
      setEmailSent(true)
      setLastSentEmail(targetEmail)
      const successMessage =
        res?.message ||
        (isEn
          ? `Password reset link sent to ${targetEmail}`
          : `રીસેટ લિંક ${targetEmail} પર મોકલી દેવાઈ છે!`)
      toast.success(successMessage)
    } catch (error) {
      const errorMsg =
        error?.errors?.email?.[0] ||
        error?.message ||
        (isEn
          ? "Failed to send reset link. Please check your email and try again."
          : "રીસેટ લિંક મોકલવામાં ક્ષતિ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.")
      toast.error(errorMsg)
    } finally {
      setIsSendingEmail(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#0b332e] text-foreground font-sans selection:bg-[#fdc72d]/30">
      
      {/* 1. Global Astro Header */}
      <AstroHeader
        navLinks={siteData.navLinks}
        config={siteData.config}
        topBar={siteData.topBar}
        activeCategory="login"
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

      {/* 2. Main Recovery Content */}
      <main className="flex-1 w-full bg-background pt-4 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Breadcrumbs */}
          <div className="py-2 flex items-center justify-between gap-4 border-b border-border/50">
            <Breadcrumb>
              <BreadcrumbList className="text-xs">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors">
                    {data.breadcrumb.home[lang] || data.breadcrumb.home.gu}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/login" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors">
                    {data.breadcrumb.login[lang] || data.breadcrumb.login.gu}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-[#8a6800] dark:text-[#fdc72d]">
                    {data.breadcrumb.title[lang] || data.breadcrumb.title.gu}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Central 2-Column Authentication Card */}
          <div className="w-full max-w-6xl mx-auto bg-card dark:bg-[#0d3631] rounded-2xl border border-border/70 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
            
            {/* LEFT COLUMN (5 Cols on lg ~ 42%) - Spiritual Brand & Recovery Guidance */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#00685d] via-[#005a50] to-[#004d44] text-[#f4f3ef] relative p-8 md:p-10 flex flex-col justify-between overflow-hidden">
              
              {/* Sacred Sri Yantra Geometry Backdrop */}
              <div className="absolute -top-16 -right-16 w-80 h-80 opacity-10 pointer-events-none text-[#fdc72d]">
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="100" cy="100" r="92" strokeDasharray="3,3"></circle>
                  <polygon points="100,15 180,150 20,150"></polygon>
                  <polygon points="100,185 20,50 180,50"></polygon>
                  <polygon points="100,32 165,142 35,142"></polygon>
                  <polygon points="100,168 35,58 165,58"></polygon>
                  <circle cx="100" cy="100" r="28"></circle>
                  <circle cx="100" cy="100" r="10" fill="currentColor"></circle>
                </svg>
              </div>

              <div className="space-y-6 relative z-10">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdc72d]/15 text-[#fdc72d] border border-[#fdc72d]/30 text-xs font-bold tracking-wide">
                  <Key className="h-3.5 w-3.5 text-[#fdc72d]" />
                  <span>{data.leftColumn.badge[lang] || data.leftColumn.badge.gu}</span>
                </div>

                {/* Heading & Intro */}
                <div className="space-y-2.5">
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight text-white">
                    {data.leftColumn.heading[lang] || data.leftColumn.heading.gu}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {data.leftColumn.description[lang] || data.leftColumn.description.gu}
                  </p>
                </div>

                {/* 3 Step Visual Guide */}
                <div className="space-y-3 pt-2">
                  {data.leftColumn.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-xs"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#fdc72d] text-[#0e3934] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                        {st.num}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-white">
                          {st.title[lang] || st.title.gu}
                        </h4>
                        <p className="text-xs text-white/75 leading-snug">
                          {st.desc[lang] || st.desc.gu}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Trust & Helpline */}
              <div className="pt-8 space-y-4 relative z-10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs">
                  <ShieldCheck className="h-4 w-4 text-[#fdc72d] shrink-0 mt-0.5" />
                  <p className="text-white/80 text-xs leading-relaxed">
                    {data.leftColumn.privacyNote[lang] || data.leftColumn.privacyNote.gu}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-white/80 text-xs">
                    <Headphones className="h-3.5 w-3.5 text-[#fdc72d]" />
                    <span>{data.leftColumn.helplineLabel[lang] || data.leftColumn.helplineLabel.gu}</span>
                  </span>
                  <a
                    href={`tel:+917940008108`}
                    className="font-bold text-[#fdc72d] hover:underline tracking-wide text-xs"
                  >
                    {isEn ? data.leftColumn.helplinePhoneEn : data.leftColumn.helplinePhone}
                  </a>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (7 Cols on lg ~ 58%) - Interactive Recovery Workflow */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-card dark:bg-[#0d3631]">
              
              <div className="space-y-6">
                
                {/* Header Shloka & Step Counter */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#8a6800] dark:text-[#fdc72d] text-xs font-bold tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{data.rightColumn.sacredShloka[lang] || data.rightColumn.sacredShloka.gu}</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold border-border text-muted-foreground">
                    {emailSent
                      ? (data.rightColumn.stepIndicator.step2[lang] || data.rightColumn.stepIndicator.step2.gu)
                      : (data.rightColumn.stepIndicator.step1[lang] || data.rightColumn.stepIndicator.step1.gu)}
                  </Badge>
                </div>

                {/* Main Heading & Subtitle */}
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {data.rightColumn.title[lang] || data.rightColumn.title.gu}
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {data.rightColumn.subtitle[lang] || data.rightColumn.subtitle.gu}
                  </p>
                </div>

                {/* Identification: registered email */}
                <>
                  {emailSent ? (
                    <div className="flex flex-col gap-4 animate-in fade-in-50 duration-200">
                      <div className="p-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 flex flex-col gap-3">
                        <div className="flex items-center gap-2.5 font-bold text-sm text-emerald-800 dark:text-emerald-300">
                          <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{data.rightColumn.emailFeedback.title[lang] || data.rightColumn.emailFeedback.title.gu}</span>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {data.rightColumn.emailFeedback.desc[lang] || data.rightColumn.emailFeedback.desc.gu}
                        </p>

                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card dark:bg-[#0f3c36] border border-border/70 text-xs">
                          <Mail className="size-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                          <span className="text-muted-foreground">{isEn ? "Sent to:" : "મોકલેલ સરનામું:"}</span>
                          <strong className="text-foreground font-mono">{lastSentEmail}</strong>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isSendingEmail}
                          onClick={handleSendEmailLink}
                          className="flex-1 h-10 border-border text-xs font-bold gap-1.5 cursor-pointer rounded-xl"
                        >
                          {isSendingEmail ? (
                            <Loader2 className="size-3.5 animate-spin" data-icon="inline-start" />
                          ) : (
                            <RefreshCw className="size-3.5" data-icon="inline-start" />
                          )}
                          <span>{isEn ? "Resend Link" : "ફરીથી લિંક મોકલો"}</span>
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            setEmailSent(false)
                            setEmailAddress("")
                          }}
                          className="h-10 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer rounded-xl"
                        >
                          <span>{isEn ? "Use different email" : "બીજો ઈમેલ દાખલ કરો"}</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <form onSubmit={handleSendEmailLink} className="space-y-4">
                        <div className="space-y-1.5">
                          <label htmlFor="recovery-email" className="block text-xs font-bold text-foreground">
                            {data.rightColumn.emailForm.label[lang] || data.rightColumn.emailForm.label.gu}{" "}
                            <span className="text-destructive">*</span>
                          </label>

                          <div className="flex items-center bg-card dark:bg-[#0f3c36] rounded-xl border border-border focus-within:ring-2 focus-within:ring-[#fdc72d]/60 focus-within:border-[#fdc72d] transition-all">
                            <Mail className="size-4 text-muted-foreground ml-3 shrink-0" />
                            <Input
                              id="recovery-email"
                              type="email"
                              required
                              disabled={isSendingEmail}
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              placeholder={data.rightColumn.emailForm.placeholder}
                              className="h-10 border-0 shadow-none focus-visible:ring-0 text-sm"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSendingEmail || !emailAddress.trim()}
                          className="w-full h-11 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-xs sm:text-sm rounded-xl shadow-sm gap-2 cursor-pointer transition-all active:scale-[0.99]"
                        >
                          {isSendingEmail ? (
                            <>
                              <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                              <span>
                                {data.rightColumn.emailForm.sendingBtn[lang] || data.rightColumn.emailForm.sendingBtn.gu}
                              </span>
                            </>
                          ) : (
                            <>
                              <span>
                                {data.rightColumn.emailForm.submitBtn[lang] || data.rightColumn.emailForm.submitBtn.gu}
                              </span>
                              <ArrowRight className="size-4" data-icon="inline-end" />
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  )}
                </>

              </div>

              {/* Back to Sign In Link Footer */}
              <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Key className="size-4 text-[#8a6800] dark:text-[#fdc72d]" />
                  <span>{data.rightColumn.backToLogin.rememberPrompt[lang] || data.rightColumn.backToLogin.rememberPrompt.gu}</span>
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/60 dark:bg-[#0f3c36] hover:bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] text-xs font-bold transition-all shadow-2xs border border-border/50"
                >
                  <span>{data.rightColumn.backToLogin.btnText[lang] || data.rightColumn.backToLogin.btnText.gu}</span>
                  <LogIn className="size-3.5" />
                </Link>
              </div>

            </div>

          </div>



        </div>
      </main>

      {/* 4. Global Astro Footer */}
      <AstroFooter config={siteData.config} footer={siteData.footer} lang={lang} />

    </div>
  )
}
