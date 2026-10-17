"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Compass,
  MessageCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"

export function VedicPortalHero({ panchang = {}, founder = {}, onBookConsultation }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const isEn = lang === "en"

  const founderImage =
    founder?.image ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBZFBXexCd0t6yOz7CMbXbM6FnzEAd207Dy7jPa_kJvzRXjiigq5gHQUQdqToeXFlFI1deo_Ab4OVv2fNPBiBiAYTfDte0SilYEqr1arECX02LB3fnkH_gfCsLJ3BK2H9bZBAgugnR5nqVAA9QuPEOzVhbo6lbXYh3iSNON0FMQWcAV3XH-2NpDnao1PPZqsTYeul4tflFK62pT3AksEJEmjqPmOir_HhqtcbLsuXkRwlmuirfcUmgf"

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

  // 3 Distinct Eminent Astrologers in Tri-Oval Sacred Composition
  const astrologers = React.useMemo(() => [
    {
      id: "vidushi-saanvi",
      image: "/images/hero-astrologer-3.jpg",
      name: isEn ? "Vidushi Saanvi Sharma" : "વિદુષી સાન્વી શર્મા",
      title: isEn ? "Vedic Jyotish & Numerology Vidushi" : "વૈદિક જ્યોતિષ & અંકશાસ્ત્ર વિદુષી",
      specialty: isEn ? "Planetary Harmony & Auspicious Muhurat" : "ગ્રહ શાંતિ પૂજન & શુભ મુહૂર્ત માર્ગદર્શન",
      badge: isEn ? "Celestial Guide" : "દિવ્ય ગ્રહ માર્ગદર્શિકા",
      experience: isEn ? "14+ Yrs Experience" : "૧૪+ વર્ષ અનુભવ",
      rating: "4.92★",
      onlineStatus: isEn ? "Live Consultation" : "લાઈવ પરામર્શ",
      icon: Sparkles
    },
    {
      id: "pandit-ram-naresh",
      image: "/images/hero-astrologer-2.jpg",
      name: isEn ? "Pt. Ram Naresh Sharma" : "પં. રામ નરેશ શર્મા",
      title: isEn ? "Kundali & Shani Remedies Specialist" : "કુંડળી & શનિ દોષ વિશેષજ્ઞ",
      specialty: isEn ? "Birth Chart Analysis & Planetary Transit Remedies" : "જન્મકુંડળી વિશ્લેષણ & ગ્રહ ગોચર ઉપાય",
      badge: isEn ? "Top Rated Astrologer" : "સર્વોચ્ચ રેટિંગ જ્યોતિષી",
      experience: isEn ? "18+ Yrs Experience" : "૧૮+ વર્ષ અનુભવ",
      rating: "4.95★",
      onlineStatus: isEn ? "Available Online" : "ઓનલાઇન ઉપલબ્ધ",
      icon: ShieldCheck
    },
    {
      id: "acharya-vidyadhar",
      image: "/images/hero-astrologer-1.jpg",
      name: isEn ? "Acharya Vidyadhar Shastri" : "આચાર્ય વિદ્યાધર શાસ્ત્રી",
      title: isEn ? "Senior Vedic Acharya & Gold Medalist" : "વરિષ્ઠ વૈદિક આચાર્ય & ગોલ્ડ મેડાલિસ્ટ",
      specialty: isEn ? "Handwritten Sanskrit Kundali & Shastric Precision" : "હસ્તલિખિત સંસ્કૃત કુંડળી & શાસ્ત્રોક્ત ગણતરી",
      badge: isEn ? "100% Vedic Certified" : "૧૦૦% શાસ્ત્રોક્ત પ્રમાણિત",
      experience: isEn ? "32+ Yrs Experience" : "૩૨+ વર્ષ અનુભવ",
      rating: "4.98★",
      onlineStatus: isEn ? "Sanctum Darshan" : "શાસ્ત્રોક્ત દર્શન",
      icon: CheckCircle2
    }
  ], [isEn])

  // Center astrologer (index 1: Pt. Ram Naresh Sharma) starts active
  const [activeAstrologer, setActiveAstrologer] = React.useState(1)
  const [isPaused, setIsPaused] = React.useState(false)

  // Automatically cycle through the 3 astrologers one by one smoothly
  React.useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveAstrologer((prev) => (prev + 1) % astrologers.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [isPaused, astrologers.length])

  const currentAstro = astrologers[activeAstrologer]

  // Key Impact & Trust Metrics
  const metrics = React.useMemo(() => [
    {
      value: isEn ? "5Cr+" : "૫ કરોડ+",
      label: isEn ? "Users Guided" : "સાધકોને માર્ગદર્શન"
    },
    {
      value: isEn ? "50,000+" : "૫૦,૦૦૦+",
      label: isEn ? "Verified Astrologers" : "પ્રમાણિત જ્યોતિષાચાર્ય"
    },
    {
      value: isEn ? "13+" : "૧૩+",
      label: isEn ? "Languages Supported" : "ભાષાઓમાં પરામર્શ"
    },
    {
      value: "4.9★",
      label: isEn ? "Devotee Trust Rating" : "વિશ્વાસપાત્ર રેટિંગ"
    }
  ], [isEn])

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
    founderRating: isEn ? "4.9★ Devotee Satisfaction" : "૪.૯★ (૫૦,૦૦૦+ સાધકો)",
    badgePurity: isEn ? "100% Vedic Certified" : "૧૦૦% શાસ્ત્રોક્ત પ્રમાણિત",
    imageCaption: isEn ? "Consecrated Maha Meru Yantra & Sacred Vedic Astrology" : "પ્રાણ-પ્રતિષ્ઠિત મહામેરુ શ્રી યંત્ર & વૈદિક જ્યોતિષ દર્શન",
    quickAccessLabel: isEn ? "QUICK VEDIC ACCESS:" : "ઝડપી સેવાઓ:"
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fbf8ee] via-[#f7f2e2] to-[#f2ecda] dark:from-[#151714] dark:via-[#191b17] dark:to-[#121411] text-[#1b1c1a] dark:text-[#f4f2ec] border-b border-[#e2d5b8] dark:border-[#2f3128] transition-colors duration-200">
      
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
            <div className="inline-flex items-center self-start gap-2 bg-white/90 dark:bg-[#1f211c]/90 border border-[#fdc72d]/70 rounded-full px-3.5 py-1 shadow-2xs backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#996f00] dark:text-[#fdc72d]" />
              <span className="text-[#7c5a00] dark:text-[#ffdf96] text-[11px] sm:text-xs font-black tracking-wider uppercase">
                {t.eyebrow}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fdc72d] animate-ping" />
            </div>

            {/* Majestic Balanced Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#1b1c1a] dark:text-white tracking-tight leading-[1.2]">
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
              <button
                type="button"
                onClick={handleConsultation}
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-black text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-[0_6px_20px_rgba(253,199,45,0.28)] active:scale-95 transition-all cursor-pointer border border-[#e5b220]"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#1b1c1a]" />
                <span>{t.consultCta}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute top-0 -left-[100%] w-full h-full bg-white/35 skew-x-12 group-hover:left-[100%] transition-all duration-700 pointer-events-none" />
              </button>

              {/* Secondary Kundali Analysis Action Button */}
              <Link
                href="/dashboard/kundli"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-[#1f221c] hover:bg-[#fcfaf2] dark:hover:bg-[#252822] border border-[#d2c5ad] dark:border-white/10 hover:border-[#fdc72d] text-[#1b1c1a] dark:text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer"
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
          <div
            className="lg:col-span-5 relative flex flex-col items-center justify-center mt-6 lg:mt-0 w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Ambient subtle decorative golden aura glow */}
            <div className="absolute -top-6 right-0 w-52 h-52 bg-[#fdc72d]/15 dark:bg-[#fdc72d]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 left-0 w-52 h-52 bg-[#008376]/12 dark:bg-[#008376]/8 rounded-full blur-3xl pointer-events-none" />

            {/* Live Astrologers Online Status Pill */}
            <div className="mb-4 self-center sm:self-end inline-flex items-center gap-2 bg-white/95 dark:bg-[#1f211c]/95 border border-[#e2d5b8] dark:border-white/10 rounded-full px-3.5 py-1 shadow-2xs backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-[#1b1c1a] dark:text-neutral-200">
                {isEn ? "1,240+ Verified Astrologers Online" : "૧,૨૪૦+ પ્રમાણિત જ્યોતિષીઓ ઓનલાઇન"}
              </span>
            </div>

            {/* 3 Vertical Oval Shapes Overlapping Composition (Matching reference image) */}
            <div className="relative w-full max-w-[440px] flex items-center justify-center py-2 select-none">
              {/* Left Oval: Vidushi Saanvi (Index 0) */}
              <div
                onClick={() => setActiveAstrologer(0)}
                className={`relative cursor-pointer transition-all duration-700 ease-out -mr-6 sm:-mr-8 ${
                  activeAstrologer === 0
                    ? "z-30 scale-105"
                    : "z-10 scale-95 opacity-85 hover:opacity-100 hover:scale-98"
                }`}
              >
                <div
                  className={`relative w-[125px] sm:w-[155px] aspect-[2/2.85] rounded-full overflow-hidden bg-muted transition-all duration-500 isolate ${
                    activeAstrologer === 0
                      ? "ring-2 sm:ring-[2.5px] ring-[#fdc72d] ring-offset-2 ring-offset-background/50 shadow-2xl"
                      : "border border-black/10 dark:border-white/15 shadow-md"
                  }`}
                >
                  <img
                    src={astrologers[0].image}
                    alt={astrologers[0].name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Center Oval: Pt. Ram Naresh Sharma (Index 1) - Prominent with Golden Ring */}
              <div
                onClick={() => setActiveAstrologer(1)}
                className={`relative cursor-pointer transition-all duration-700 ease-out ${
                  activeAstrologer === 1
                    ? "z-30 scale-105 sm:scale-108 -translate-y-1"
                    : "z-20 scale-100 opacity-95 hover:opacity-100"
                }`}
              >
                <div
                  className={`relative w-[155px] sm:w-[190px] aspect-[2/2.85] rounded-full overflow-hidden bg-muted transition-all duration-500 isolate ring-2 sm:ring-[2.5px] ring-[#fdc72d] ring-offset-2 ring-offset-background/50 shadow-2xl ${
                    activeAstrologer === 1 ? "shadow-[0_16px_36px_rgba(253,199,45,0.32)]" : ""
                  }`}
                >
                  <img
                    src={astrologers[1].image}
                    alt={astrologers[1].name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Oval: Acharya Vidyadhar Shastri (Index 2) */}
              <div
                onClick={() => setActiveAstrologer(2)}
                className={`relative cursor-pointer transition-all duration-700 ease-out -ml-6 sm:-ml-8 ${
                  activeAstrologer === 2
                    ? "z-30 scale-105"
                    : "z-10 scale-95 opacity-85 hover:opacity-100 hover:scale-98"
                }`}
              >
                <div
                  className={`relative w-[125px] sm:w-[155px] aspect-[2/2.85] rounded-full overflow-hidden bg-muted transition-all duration-500 isolate ${
                    activeAstrologer === 2
                      ? "ring-2 sm:ring-[2.5px] ring-[#fdc72d] ring-offset-2 ring-offset-background/50 shadow-2xl"
                      : "border border-black/10 dark:border-white/15 shadow-md"
                  }`}
                >
                  <img
                    src={astrologers[2].image}
                    alt={astrologers[2].name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Interactive Astrologer Spotlight Card */}
            <div className="w-full max-w-[450px] mt-2 rounded-2xl bg-white dark:bg-[#1a1c18] border border-black/5 dark:border-white/10 p-3 sm:p-3.5 shadow-[0_10px_28px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_28px_rgba(0,0,0,0.3)] flex items-center justify-between gap-3 transition-all duration-300">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#fdc72d] bg-muted shadow-2xs">
                    <img
                      src={currentAstro.image}
                      alt={currentAstro.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-1.5 ring-white dark:ring-[#1a1c18]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-[13px] font-black text-foreground truncate">
                      {currentAstro.name}
                    </span>
                    <span className="bg-[#fdc72d] text-[#1b1c1a] text-[9px] font-black px-1.5 py-0.2 rounded shrink-0">
                      {currentAstro.badge}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#00685d] dark:text-[#38b2a3] font-bold truncate">
                    {currentAstro.specialty}
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Consultation Action */}
              <button
                type="button"
                onClick={handleConsultation}
                className="shrink-0 inline-flex items-center gap-1.5 bg-[#1b1c1a] hover:bg-[#2c2e2a] text-[#fdc72d] font-black text-[11px] px-3.5 py-2 rounded-lg shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                <span>{isEn ? "Consult" : "પરામર્શ"}</span>
              </button>
            </div>

            {/* Shape Progress Indicator Dots */}
            <div className="flex items-center gap-1.5 mt-2.5">
              {astrologers.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveAstrologer(idx)}
                  aria-label={`Select astrologer ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    activeAstrologer === idx
                      ? "w-6 bg-[#fdc72d]"
                      : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

        {/* ==============================================================
            3. KEY IMPACT & TRUST METRICS NUMBERS BAR
            (Replacing Quick Vedic Access as explicitly requested)
            ============================================================== */}
        <div className="mt-8 pt-6 border-t border-[#e2d5b8]/70 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-start sm:items-center text-left sm:text-center">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1b1c1a] dark:text-white tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#6e5d3b] dark:text-neutral-300 mt-0.5">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}
