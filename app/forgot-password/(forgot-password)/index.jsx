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
  HelpCircle,
  Check
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { ASTRO_DATA_GU, ASTRO_DATA_EN } from "@/lib/data/astro-data"
import { FORGOT_PASSWORD_DATA } from "@/lib/data/forgot-password-data"
import { authService } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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
  const siteData = lang === "gu" ? ASTRO_DATA_GU : ASTRO_DATA_EN
  const data = FORGOT_PASSWORD_DATA
  const isEn = lang === "en"

  // Email recovery (a reset link is emailed; the new password is set on /reset-password)
  const [emailAddress, setEmailAddress] = React.useState("")
  const [emailSent, setEmailSent] = React.useState(false)
  const [isSendingEmail, setIsSendingEmail] = React.useState(false)

  // Send Email Reset Link
  const handleSendEmailLink = async (e) => {
    e.preventDefault()
    if (!emailAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      toast.error(
        isEn
          ? "Please enter a valid email address."
          : "કૃપા કરીને માન્ય ઈમેલ એડ્રેસ દાખલ કરો."
      )
      return
    }

    setIsSendingEmail(true)
    try {
      await authService.forgotPassword(emailAddress, lang)
      setEmailSent(true)
      toast.success(
        isEn
          ? `Password reset link sent to ${emailAddress}`
          : `રીસેટ લિંક ${emailAddress} પર મોકલી દેવાઈ છે!`
      )
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSendingEmail(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#12130f] text-foreground font-sans selection:bg-[#fdc72d]/30">
      
      {/* 1. Global Astro Header */}
      <AstroHeader
        navLinks={siteData.navLinks}
        config={siteData.config}
        topBar={siteData.topBar}
        activeCategory="login"
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

      {/* 2. Main Recovery Content */}
      <main className="flex-1 w-full bg-background pt-4 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Breadcrumbs & SSL Security Badge */}
          <div className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50">
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

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card dark:bg-[#1e1f1b] border border-border shadow-2xs text-xs font-semibold self-start sm:self-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fdc72d] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8a6800] dark:bg-[#fdc72d]"></span>
              </span>
              <ShieldCheck className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
              <span className="text-foreground text-[11px] sm:text-xs">
                {data.complianceBadge.text[lang] || data.complianceBadge.text.gu}
              </span>
            </div>
          </div>

          {/* Central 2-Column Authentication Card */}
          <div className="w-full max-w-6xl mx-auto bg-card dark:bg-[#181914] rounded-2xl border border-border/70 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
            
            {/* LEFT COLUMN (5 Cols on lg ~ 42%) - Spiritual Brand & Recovery Guidance */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1b1c1a] via-[#242520] to-[#161713] text-[#f4f3ef] relative p-8 md:p-10 flex flex-col justify-between overflow-hidden">
              
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
                      <div className="w-7 h-7 rounded-full bg-[#fdc72d] text-[#1b1c1a] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                        {st.num}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-white">
                          {st.title[lang] || st.title.gu}
                        </h4>
                        <p className="text-[11px] text-white/75 leading-snug">
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
                  <p className="text-white/80 text-[11px] leading-relaxed">
                    {data.leftColumn.privacyNote[lang] || data.leftColumn.privacyNote.gu}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-white/80 text-[11px]">
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
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-card dark:bg-[#181914]">
              
              <div className="space-y-6">
                
                {/* Header Shloka & Step Counter */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#8a6800] dark:text-[#fdc72d] text-xs font-bold tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{data.rightColumn.sacredShloka[lang] || data.rightColumn.sacredShloka.gu}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold border-border text-muted-foreground">
                    {data.rightColumn.stepIndicator.step1[lang] || data.rightColumn.stepIndicator.step1.gu}
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
                    {/* EMAIL LINK */}
                    {(
                      <div className="space-y-4">
                        <form onSubmit={handleSendEmailLink} className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-foreground">
                              {data.rightColumn.emailForm.label[lang] || data.rightColumn.emailForm.label.gu}{" "}
                              <span className="text-destructive">*</span>
                            </label>

                            <div className="flex items-center bg-card dark:bg-[#20211d] rounded-lg border border-border focus-within:ring-2 focus-within:ring-[#fdc72d]/60 focus-within:border-[#fdc72d] transition-all">
                              <Mail className="h-4 w-4 text-muted-foreground ml-3 shrink-0" />
                              <Input
                                type="email"
                                required
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                placeholder={data.rightColumn.emailForm.placeholder}
                                className="h-10 border-0 shadow-none focus-visible:ring-0 text-sm"
                              />
                            </div>

                            <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                              <HelpCircle className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                              <span>{data.rightColumn.emailForm.note[lang] || data.rightColumn.emailForm.note.gu}</span>
                            </p>
                          </div>

                          <Button
                            type="submit"
                            disabled={isSendingEmail || !emailAddress}
                            className="w-full h-11 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs sm:text-sm rounded-lg shadow-sm gap-2 cursor-pointer transition-all active:scale-[0.99]"
                          >
                            <span>
                              {isSendingEmail
                                ? (data.rightColumn.emailForm.sendingBtn[lang] || data.rightColumn.emailForm.sendingBtn.gu)
                                : (data.rightColumn.emailForm.submitBtn[lang] || data.rightColumn.emailForm.submitBtn.gu)}
                            </span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </form>

                        {/* Email Dispatched Feedback Card */}
                        {emailSent && (
                          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-2 animate-in fade-in-50 duration-200">
                            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <span>{data.rightColumn.emailFeedback.title[lang] || data.rightColumn.emailFeedback.title.gu}</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {data.rightColumn.emailFeedback.desc[lang] || data.rightColumn.emailFeedback.desc.gu}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step Preview & Trust Micro-Note */}
                    <div className="p-3 bg-muted/40 dark:bg-[#20211d] rounded-xl flex items-center justify-between gap-3 border border-border/50">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center font-bold text-[10px]">
                          <Lock className="h-3 w-3" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {data.rightColumn.processNote[lang] || data.rightColumn.processNote.gu}
                        </span>
                      </div>
                      <span className="text-[#8a6800] dark:text-[#fdc72d] font-bold text-[11px] shrink-0 flex items-center gap-0.5">
                        <span>{isEn ? "Easy Flow" : "સરળ પ્રક્રિયા"}</span>
                        <Check className="h-3 w-3" />
                      </span>
                    </div>
                </>

              </div>

              {/* Back to Sign In Link Footer */}
              <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Key className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                  <span>{data.rightColumn.backToLogin.rememberPrompt[lang] || data.rightColumn.backToLogin.rememberPrompt.gu}</span>
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/60 dark:bg-[#20211d] hover:bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] text-xs font-bold transition-all shadow-2xs border border-border/50"
                >
                  <span>{data.rightColumn.backToLogin.btnText[lang] || data.rightColumn.backToLogin.btnText.gu}</span>
                  <LogIn className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>

          </div>

          {/* 3. Bottom Trust & Canonical Guarantee Bar */}
          <div className="w-full max-w-6xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.trustCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-card dark:bg-[#181914] p-5 rounded-xl border border-border/70 shadow-2xs flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-full bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                    {card.icon === "ShieldCheck" && <ShieldCheck className="h-5 w-5" />}
                    {card.icon === "MessageCircle" && <MessageCircle className="h-5 w-5" />}
                    {card.icon === "UserCheck" && <UserCheck className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground">
                      {card.title[lang] || card.title.gu}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {card.desc[lang] || card.desc.gu}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sacred Shloka Reassurance Banner */}
            <div className="w-full bg-card dark:bg-[#181914] border border-border/70 rounded-xl px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-2xs">
              <div className="flex items-center gap-2 text-[#8a6800] dark:text-[#fdc72d] text-xs font-bold">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>{data.bottomBanner.mantra}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <span>{data.bottomBanner.emailLabel[lang] || data.bottomBanner.emailLabel.gu}{" "}</span>
                <a
                  href={`mailto:${data.bottomBanner.supportEmail}`}
                  className="text-foreground font-bold hover:underline"
                >
                  {data.bottomBanner.supportEmail}
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 4. Global Astro Footer */}
      <AstroFooter />

    </div>
  )
}
