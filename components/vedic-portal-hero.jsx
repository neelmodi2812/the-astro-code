"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { SITE_CONTACT } from "@/lib/config/contact"

export function VedicPortalHero({ panchang = {}, founder = {}, onBookConsultation }) {
  const { lang } = useLanguage()
  const isEn = lang === "en"

  const founderImage =
    (founder?.image && !founder.image.includes("unsplash.com") && !founder.image.includes("googleusercontent.com"))
      ? founder.image
      : "/images/dr-vishal-modi-hero-oval.jpg"

  const founderName = founder?.name || (isEn ? "Dr. Vishal Modi (Ph.D.)" : "ડૉ. વિશાલ મોદી (Ph.D.)")

  const handleConsultation = () => {
    if (onBookConsultation) {
      onBookConsultation()
      return
    }
    const message = isEn
      ? "Hello Dr. Vishal Modi, I would like to book a personal astrology consultation."
      : "જય શ્રી કૃષ્ણ ડૉ. વિશાલ મોદી, મને વ્યક્તિગત જ્યોતિષ પરામર્શ માટે અપોઇન્ટમેન્ટ જોઈએ છે."
    const base = (founder?.whatsappUrl && !founder.whatsappUrl.includes("000000")) ? founder.whatsappUrl : SITE_CONTACT.whatsappUrl
    window.open(`${base}${base.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`, "_blank")
  }

  // Concise, refined texts avoiding cognitive overload
  const t = {
    eyebrow: isEn
      ? "॥ SHREE GANESHAY NAMAH ॥ • VEDIC ASTROLOGY PORTAL"
      : "॥ શ્રી ગણેશાય નમઃ ॥ • શાસ્ત્રોક્ત વૈદિક જ્યોતિષ",
    titlePrefix: isEn ? "Ancient " : "પ્રાચીન ",
    titleHighlight1: isEn ? "Vedic Wisdom" : "વૈદિક રહસ્યો",
    titleAnd: isEn ? " & Modern " : " અને ",
    titleHighlight2: isEn ? "Astrological Guidance" : "આધુનિક જ્યોતિષ",
    titleSuffix: isEn ? "" : " માર્ગદર્શન",
    description: isEn
      ? "Personalized birth chart Kundali analysis, planetary transit insights, and direct consultation with Gold Medalist Astrologer Dr. Vishal Modi."
      : "તમારા જન્મ કુંડળી વિશ્લેષણ, ગ્રહદોષ નિવારણ અને શુભ મુહૂર્ત માટે ગોલ્ડ મેડાલિસ્ટ જ્યોતિષાચાર્ય ડૉ. વિશાલ મોદીનું સચોટ શાસ્ત્રોક્ત માર્ગદર્શન.",
    consultCta: isEn ? "Book Consultation" : "પરામર્શ બુક કરો",
    freeKundaliCta: isEn ? "Kundali Analysis" : "કુંડળી વિશ્લેષણ",
    founderBadge: isEn ? "GOLD MEDALIST" : "ગોલ્ડ મેડાલિસ્ટ",
    founderName: isEn ? "Dr. Vishal Modi (Ph.D.)" : "ડૉ. વિશાલ મોદી (Ph.D.)",
    badgePurity: isEn ? "100% Vedic Certified" : "૧૦૦% શાસ્ત્રોક્ત પ્રમાણિત",
    imageCaption: isEn ? "Consecrated Maha Meru Yantra & Sacred Vedic Astrology" : "પ્રાણ-પ્રતિષ્ઠિત મહામેરુ શ્રી યંત્ર & વૈદિક જ્યોતિષ દર્શન",
    quickAccessLabel: isEn ? "QUICK VEDIC ACCESS:" : "ઝડપી સેવાઓ:"
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fbf8ee] via-[#f7f2e2] to-[#f2ecda] dark:from-[#0c3531] dark:via-[#0d3833] dark:to-[#0b332f] text-[#0e3934] dark:text-[#f4f2ec] border-b border-[#e2d5b8] dark:border-[#13443e] transition-colors duration-200">
      
      {/* 1. SUBTLE SACRED AMBIENT GLOW */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#fdc72d]/15 dark:bg-[#fdc72d]/8 rounded-full blur-[130px]" />
        <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-[#008376]/10 dark:bg-[#008376]/6 rounded-full blur-[120px]" />
        
        {/* Delicate Sacred Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(#996f00 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      {/* 2. MAIN BALANCED HERO CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-11 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ==============================================================
              LEFT COLUMN: CLEAN, ELEGANT HEADLINE & MAIN ACTIONS (7 COLS)
              ============================================================== */}
          <div className="lg:col-span-7 flex flex-col space-y-5 text-left">
            
            {/* Sacred Invocation Eyebrow Pill */}
            <div className="inline-flex items-center self-start gap-1.5 sm:gap-2 max-w-full bg-white/90 dark:bg-[#0f3b36]/90 border border-[#fdc72d]/70 rounded-full px-2.5 sm:px-3.5 py-1 shadow-2xs backdrop-blur-sm">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#996f00] dark:text-[#fdc72d] shrink-0" />
              <span className="text-[#7c5a00] dark:text-[#ffdf96] text-[10px] sm:text-xs font-black tracking-wider uppercase truncate">
                {t.eyebrow}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fdc72d] animate-ping shrink-0" />
            </div>

            {/* Majestic Balanced Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#0e3934] dark:text-white tracking-tight leading-[1.2] break-words">
              {t.titlePrefix}
              <span className="text-[#8c6200] dark:text-[#fdc72d] underline decoration-[#fdc72d]/50 decoration-wavy decoration-2 underline-offset-4">
                {t.titleHighlight1}
              </span>
              {t.titleAnd}
              <span className="text-[#00685d] dark:text-[#38b2a3]">
                {t.titleHighlight2}
              </span>
              {t.titleSuffix}
            </h1>

            {/* Concise, Readable Description */}
            <p className="text-sm sm:text-base md:text-lg text-[#4f4633] dark:text-neutral-300 max-w-xl leading-relaxed">
              {t.description}
            </p>

            {/* The 2 Primary Clean Action Buttons (No Duplicate Tags Underneath) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {/* Primary Consultation Action Button */}
              <Link
                href="/appointment"
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-black text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-[0_6px_20px_rgba(253,199,45,0.28)] active:scale-95 transition-all cursor-pointer border border-[#e5b220]"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#0e3934]" />
                <span>{t.consultCta}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute top-0 -left-[100%] w-full h-full bg-white/35 skew-x-12 group-hover:left-[100%] transition-all duration-700 pointer-events-none" />
              </Link>

              {/* Secondary Kundali Analysis Action Button */}
              <Link
                href="/dashboard/kundli"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-[#0f3b36] hover:bg-[#fcfaf2] dark:hover:bg-[#113f39] border border-[#d2c5ad] dark:border-white/10 hover:border-[#fdc72d] text-[#0e3934] dark:text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-[#8c6200] dark:text-[#fdc72d]" />
                <span>{t.freeKundaliCta}</span>
              </Link>
            </div>

          </div>

          {/* ==============================================================
              RIGHT COLUMN: TRI-OVAL HARMONIOUS ASTROLOGER COMPOSITION
              (Matching reference 3-oval overlapping layout with golden ring)
              ============================================================== */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center mt-6 lg:mt-0 w-full">
            {/* Ambient subtle decorative golden aura glow */}
            <div className="absolute -top-6 right-0 w-52 h-52 bg-[#fdc72d]/15 dark:bg-[#fdc72d]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 left-0 w-52 h-52 bg-[#008376]/12 dark:bg-[#008376]/8 rounded-full blur-3xl pointer-events-none" />

            {/* Founder portrait in the golden-ringed oval - perfectly centered */}
            <div className="relative w-full flex items-center justify-center py-2 select-none">
              <div className="relative w-[190px] sm:w-[230px] aspect-[2/2.85] rounded-full overflow-hidden bg-muted isolate ring-2 sm:ring-[2.5px] ring-[#fdc72d] ring-offset-2 ring-offset-background/50 shadow-[0_16px_36px_rgba(253,199,45,0.32)]">
                <img
                  src={founderImage}
                  alt={founderName}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Founder spotlight card - centered directly under the oval */}
            <div className="w-full max-w-[340px] sm:max-w-[360px] mx-auto mt-2 rounded-2xl bg-white dark:bg-[#0e3833] border border-[#06302b]/10 dark:border-white/10 p-3 sm:p-3.5 shadow-[0_10px_28px_rgba(6,48,43,0.08)] dark:shadow-[0_10px_28px_rgba(6,48,43,0.3)] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-[13px] font-black text-foreground truncate">
                    {founderName}
                  </span>
                  <span className="bg-[#fdc72d] text-[#0e3934] text-[10px] font-black px-1.5 py-0.5 rounded shrink-0">
                    {t.founderBadge}
                  </span>
                </div>
                {founder?.title && (
                  <p className="text-[11px] sm:text-xs text-[#00685d] dark:text-[#38b2a3] font-bold truncate mt-0.5">
                    {founder.title}
                  </p>
                )}
              </div>

              {/* Direct Consultation Action */}
              <Link
                href="/appointment"
                className="shrink-0 inline-flex items-center gap-1.5 bg-[#00685d] hover:bg-[#005048] text-white font-black text-xs px-3.5 py-2 rounded-lg shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                <span>{isEn ? "Consult" : "પરામર્શ"}</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
