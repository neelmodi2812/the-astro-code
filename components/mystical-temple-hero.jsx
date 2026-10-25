"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Calendar,
  ArrowRight,
  Compass,
  Sparkles,
  Sun,
  ShieldCheck,
  UserCheck,
  Flame,
  Star
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"

// Sacred 5-Petal Golden Lotus SVG Icon (Exact match to reference image)
function SacredLotusIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central Flame / Lotus Petal */}
      <path d="M12 2C10.6 6.2 9.6 11 10.1 15.5C10.9 16.8 13.1 16.8 13.9 15.5C14.4 11 13.4 6.2 12 2Z" />
      {/* Left Upper Outward Petal */}
      <path d="M5.8 5.8C7.5 9.2 8.6 13 9.6 16C8.4 16.3 6.9 15.1 5.8 13C4.6 10.4 4.8 7.6 5.8 5.8Z" />
      {/* Right Upper Outward Petal */}
      <path d="M18.2 5.8C16.5 9.2 15.4 13 14.4 16C15.6 16.3 17.1 15.1 18.2 13C19.4 10.4 19.2 7.6 18.2 5.8Z" />
      {/* Left Base Wing Petal */}
      <path d="M9.2 16.8C6.5 16 3.5 15 2.8 14C3.1 17 6.6 18.8 10.5 19C9.9 18.2 9.5 17.4 9.2 16.8Z" />
      {/* Right Base Wing Petal */}
      <path d="M14.8 16.8C17.5 16 20.5 15 21.2 14C20.9 17 17.4 18.8 13.5 19C14.1 18.2 14.5 17.4 14.8 16.8Z" />
      {/* Bottom Drop Tip */}
      <circle cx="12" cy="21.5" r="1.1" />
    </svg>
  )
}

// Sacred Yantra / Mandala SVG Icon
function SacredYantraIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <polygon points="12 6 18 10 18 14 12 18 6 14 6 10 12 6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

// Vedic Horoscope Rashi Chakra Icon
function HoroscopeWheelIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="5.64" y1="5.64" x2="18.36" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="5.64" y2="18.36" />
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
    </svg>
  )
}

// Sacred Vedic Herb / Leaf Icon
function VedicRemediesIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22C12 22 20 18 20 10C20 4.5 15.5 2 12 2C8.5 2 4 4.5 4 10C4 18 12 22 12 22Z" />
      <path d="M12 2V22" />
      <path d="M12 11C14.5 9 17 9 18 10" />
      <path d="M12 15C9.5 13 7 13 6 14" />
    </svg>
  )
}

// Sacred Vedic Numerology / Navagraha Grid Icon
function NumerologySacredIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="17.5" cy="8" r="1.5" fill="currentColor" />
      <circle cx="19" cy="13.5" r="1.5" fill="currentColor" />
      <circle cx="16" cy="18.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
      <circle cx="8" cy="18.5" r="1.5" fill="currentColor" />
      <circle cx="5" cy="13.5" r="1.5" fill="currentColor" />
      <circle cx="6.5" cy="8" r="1.5" fill="currentColor" />
    </svg>
  )
}

// Personal Consultation Sacred Avatar Icon
function PersonalConsultationIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3.1-6.5 7-6.5s7 3 7 6.5" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function MysticalTempleHero({ panchang = {}, founder = {}, onBookConsultation }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const isEn = lang === "en"

  const handleConsultation = () => {
    if (onBookConsultation) {
      onBookConsultation()
      return
    }
    const message = isEn
      ? "Hello Dr. Vishal Modi, I would like to book a personal astrology consultation."
      : "જય શ્રી કૃષ્ણ ડૉ. વિશાલ મોદી, મને વ્યક્તિગત જ્યોતિષ પરામર્શ માટે અપોઇન્ટમેન્ટ જોઈએ છે."
    window.open(`https://wa.me/919825000000?text=${encodeURIComponent(message)}`, "_blank")
  }

  // Texts matching the user's reference mockup
  const t = {
    eyebrow: isEn
      ? "॥ SHREE GANESHAY NAMAH ॥"
      : "॥ શ્રી ગણેશાય નમઃ ॥",
    titlePrefix: isEn ? "Ancient Vedic Wisdom &" : "પ્રાચીન વૈદિક રહસ્યો અને",
    titleSuffix: isEn ? "Modern Astrological Guidance" : "આધુનિક જ્યોતિષ માર્ગદર્શન",
    description: isEn
      ? "Personalized birth chart Kundali analysis, planetary transit insights, and direct consultation with Gold Medalist Astrologer Dr. Vishal Modi."
      : "તમારા જન્મ કુંડળી વિશ્લેષણ, ગ્રહદોષ નિવારણ અને શુભ મુહૂર્ત માટે ગોલ્ડ મેડાલિસ્ટ જ્યોતિષાચાર્ય ડૉ. વિશાલ મોદીનું સચોટ શાસ્ત્રોક્ત માર્ગદર્શન.",
    bookConsultCta: isEn ? "Book Consultation" : "પરામર્શ બુક કરો",
    kundaliCta: isEn ? "Kundali Analysis" : "કુંડળી વિશ્લેષણ",
  }

  // 5 Quick Services matching the reference mockup
  const quickServices = [
    {
      id: "kundali",
      label: isEn ? "Kundali\nAnalysis" : "કુંડળી\nવિશ્લેષણ",
      icon: SacredYantraIcon,
      href: "/dashboard/kundli"
    },
    {
      id: "horoscope",
      label: isEn ? "Horoscope\n& Predictions" : "રાશિફળ &\nગ્રહ ગોચર",
      icon: HoroscopeWheelIcon,
      href: "/dainik-panchang"
    },
    {
      id: "numerology",
      label: isEn ? "Numerology\nGuidance" : "અંકશાસ્ત્ર\nમાર્ગદર્શન",
      icon: NumerologySacredIcon,
      href: "/categories"
    },
    {
      id: "remedies",
      label: isEn ? "Vedic\nRemedies" : "વૈદિક\nઉપાયો",
      icon: VedicRemediesIcon,
      href: "/myshop"
    },
    {
      id: "consultation",
      label: isEn ? "Personal\nConsultation" : "વ્યક્તિગત\nપરામર્શ",
      icon: PersonalConsultationIcon,
      onClick: handleConsultation
    }
  ]

  return (
    <section className="relative w-full overflow-hidden bg-[#0c121e] text-white min-h-[500px] lg:min-h-[560px] flex items-center shadow-xl transition-colors">

      {/* 1. PANORAMIC BACKGROUND ARTWORK: Mystical Temple Sunset & Zodiac Meditation */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/mystical-temple-sunset-zodiac.png"
          alt="Ancient Vedic Temple Sunset & Cosmic Zodiac Meditation"
          className="w-full h-full object-cover object-right md:object-[center_right] select-none"
        />

        {/* Dynamic Multi-layered Atmospheric Overlay: Warm Sunrise Gold + Radiant Light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(12, 16, 24, 0.72) 0%, rgba(15, 18, 28, 0.50) 38%, rgba(15, 18, 28, 0.20) 70%, rgba(12, 16, 24, 0.15) 100%)"
          }}
        />

        {/* Celestial Warm Golden Sunlight Halo on Left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 35%, rgba(253, 199, 45, 0.16) 0%, rgba(255, 150, 0, 0.08) 35%, transparent 65%)"
          }}
        />
      </div>

      {/* 2. FOREGROUND CONTENT: Luxurious Frosted Glass Sanctum Card */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        <div className="max-w-2xl">

          {/* Frosted Glass Sanctum Container — Ensures 100% Contrast & Legibility */}
          <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 backdrop-blur-xl bg-black/40 sm:bg-black/35 border border-white/20 sm:border-[#fdc72d]/30 shadow-[0_20px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/10 flex flex-col space-y-4 sm:space-y-5 text-left">

            {/* Sacred Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#fdc72d]/15 border border-[#fdc72d]/40 text-xs sm:text-[13px] font-bold tracking-widest uppercase shadow-sm">
              <SacredLotusIcon className="h-4 w-4 text-[#fdc72d] shrink-0 animate-pulse" />
              <span className="text-[#fdc72d] font-black text-xs">॥</span>
              <span className="text-[#ffd976] tracking-[0.14em] font-extrabold text-[11px] sm:text-xs">
                {isEn ? "SHREE GANESHAY NAMAH" : "શ્રી ગણેશાય નમઃ"}
              </span>
              <span className="text-[#fdc72d] font-black text-xs">॥</span>
            </div>

            {/* Majestic Hero Headline (Bilingual & High Contrast) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.2] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              <span className="text-white block">
                {t.titlePrefix}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe082] via-[#fdc72d] to-[#f4b400] drop-shadow-[0_2px_14px_rgba(253,199,45,0.4)]">
                {t.titleSuffix}
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-200 leading-relaxed font-normal">
              {t.description}
            </p>

            {/* The 2 Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* 1. Book Consultation (Solid Saffron Gradient Button) */}
              <button
                type="button"
                onClick={handleConsultation}
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ffd447] via-[#fdc72d] to-[#f4b400] hover:from-[#ffe066] hover:to-[#e6a800] text-[#1b1c1a] font-extrabold text-xs sm:text-sm md:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-[0_4px_20px_rgba(253,199,45,0.45)] hover:shadow-[0_6px_28px_rgba(253,199,45,0.65)] active:scale-95 transition-all cursor-pointer border border-[#f5b81a]"
              >
                <Calendar className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[#1b1c1a]" />
                <span>{t.bookConsultCta}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute top-0 -left-[100%] w-full h-full bg-white/40 skew-x-12 group-hover:left-[100%] transition-all duration-700 pointer-events-none" />
              </button>

              {/* 2. Kundali Analysis (High-Contrast Luminous Glass Button) */}
              <Link
                href="/dashboard/kundli"
                className="group inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#fdc72d]/70 hover:border-[#fdc72d] text-white hover:text-[#ffd976] font-bold text-xs sm:text-sm md:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <SacredYantraIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[#fdc72d]" />
                <span>{t.kundaliCta}</span>
                <ArrowRight className="h-4 w-4 text-[#fdc72d] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* 5 Quick Services Strip — Sleek Glass Capsules */}
            <div className="pt-3 border-t border-white/15">
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#ffd976]/90 mb-2.5">
                {isEn ? "Quick Vedic Consultations & Guidance:" : "ઝડપી જ્યોતિષ સેવાઓ અને પરામર્શ:"}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center gap-2 sm:gap-2.5">
                {quickServices.map((svc) => {
                  const Icon = svc.icon
                  const badgeContent = (
                    <div className="w-full flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-[#fdc72d]/15 border border-white/15 hover:border-[#fdc72d]/60 backdrop-blur-md transition-all group cursor-pointer shadow-xs hover:-translate-y-0.5">
                      <div className="w-7 h-7 rounded-lg bg-[#fdc72d]/20 text-[#fdc72d] flex items-center justify-center shrink-0 border border-[#fdc72d]/30 group-hover:scale-105 transition-transform">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-neutral-100 group-hover:text-[#ffd976] whitespace-nowrap leading-tight transition-colors">
                        {svc.label.replace("\n", " ")}
                      </span>
                    </div>
                  )

                  if (svc.onClick) {
                    return (
                      <button key={svc.id} type="button" onClick={svc.onClick} className="text-left">
                        {badgeContent}
                      </button>
                    )
                  }

                  return (
                    <Link key={svc.id} href={svc.href} className="inline-block">
                      {badgeContent}
                    </Link>
                  )
                })}
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  )
}
