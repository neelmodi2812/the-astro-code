"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Compass,
  Search,
  ArrowLeft,
  Calendar,
  Headphones,
  Sparkles,
  Phone,
  MessageCircle,
  Sun,
  Flame,
  ShoppingBag,
  ChevronRight,
  ArrowRight
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { getSiteShell } from "@/lib/config/site"
import { useLanguage } from "@/components/language-provider"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const NOT_FOUND_DATA = {
  gu: {
    breadcrumb: {
      home: "મુખ્ય પૃષ્ઠ",
      current: "૪૦૪ પેજ મળ્યું નથી (Page Not Found)"
    },
    sloka: "॥ માર્ગ ભટક્યા છો, પણ માર્ગદર્શન અહીં જ છે ॥",
    number: "૪૦૪",
    subNumber: "PAGE NOT FOUND",
    title: "ક્ષમા કરશો! પેજ મળ્યું નથી",
    description: "આ પેજ કદાચ ખસેડાયું છે અથવા ઉપલબ્ધ નથી. આગળ વધવા માટે નીચેના વિકલ્પો જુઓ અથવા મુખ્ય પૃષ્ઠ પર જાઓ.",
    actions: {
      home: "મુખ્ય પૃષ્ઠ પર પાછા જાઓ",
      panchang: "આજનું પંચાંગ જુઓ",
      consultation: "જ્યોતિષીય સહાયતા સંપર્ક"
    },
    search: {
      label: "શું તમે કંઈક ચોક્કસ શોધી રહ્યા છો?",
      placeholder: "કુંડળી, જ્યોતિષ લેખો, રાશિ ભવિષ્ય, સ્તોત્ર કે રત્ન શોધો...",
      button: "શોધો"
    },
    recommendations: {
      tag: "યોગ્ય માર્ગદર્શન",
      title: "લોકપ્રિય અને ઉપયોગી વિભાગો",
      guide: "સંપૂર્ણ માર્ગદર્શિકા",
      cards: [
        {
          id: "panchang",
          tag: "દૈનિક અપડેટ",
          title: "દૈનિક પંચાંગ અને ચોઘડિયા",
          desc: "આજની તિથિ, નક્ષત્ર, શુભ મુહૂર્ત અને ચોઘડિયા સમયની પળેપળની ચોક્કસ ગણતરી જાણો.",
          linkText: "પંચાંગ જુઓ",
          href: "/dainik-panchang",
          icon: Sun,
          accentColor: "border-primary text-primary"
        },
        {
          id: "jyotish",
          tag: "ગ્રહ વિચાર",
          title: "જ્યોતિષશાસ્ત્ર અને કુંડળી વિશ્લેષણ",
          desc: "કુંડળી દોષ નિવારણ, કાલસર્પ યોગ, શનિ સાડાસાતી અને નવગ્રહ શાંતિ વિશે વિસ્તૃત લેખો.",
          linkText: "વિશ્લેષણ વાંચો",
          href: "/categories",
          icon: Compass,
          accentColor: "border-[#d9a100] text-[#8a6800] dark:text-[#fdc72d]"
        },
        {
          id: "darshan",
          tag: "યાત્રાધામ માહાત્મ્ય",
          title: "શ્રી બહુચર માં નું રજવાડું & બાર જ્યોતિર્લિંગ",
          desc: "પવિત્ર ધામો, શક્તિપીઠો અને દેવી ઉપાસનાના રહસ્યમય અને અધિકૃત લેખોનો રસથાળ.",
          linkText: "દર્શન માર્ગદર્શિકા",
          href: "/article/hero-1",
          icon: Flame,
          accentColor: "border-[#bb171f] text-[#bb171f]"
        },
        {
          id: "shop",
          tag: "પ્રમાણિત વસ્તુઓ",
          title: "MyShop વૈદિક સ્ટોર",
          desc: "સિદ્ધ રુદ્રાક્ષ, શ્રી યંત્ર, સાચા રત્નો, સ્ફટિક માળા અને શુદ્ધ પૂજા સામગ્રી સંગ્રહ.",
          linkText: "સ્ટોરની મુલાકાત લો",
          href: "/myshop",
          icon: ShoppingBag,
          accentColor: "border-primary text-primary"
        }
      ]
    },
    callout: {
      tag: "હજુ પણ યોગ્ય પેજ નથી મળતું?",
      title: "ડૉ. વિશાલ મોદી સાથે સીધી વાત કરો અથવા કુંડળી બુકિંગ માટે સંપર્ક કરો",
      desc: "અમારા વરિષ્ઠ જ્યોતિષીઓ અને સહાયક ટીમ આપને યોગ્ય પેજ કે સેવાનો માર્ગ બતાવવા તત્પર છે.",
      callBtn: "+૯૧ ૭૯ ૪૦૦૦ ૮૧૦૮",
      whatsappBtn: "WhatsApp પર જોડાઓ"
    }
  },
  en: {
    breadcrumb: {
      home: "Home",
      current: "404 Page Not Found"
    },
    sloka: "॥ You've wandered off the path, but divine guidance is right here ॥",
    number: "404",
    subNumber: "PAGE NOT FOUND",
    title: "Page Not Found",
    description: "This page may have been moved or is currently unavailable. Explore our key sections below or return home.",
    actions: {
      home: "Return to Home Page",
      panchang: "View Today's Panchang",
      consultation: "Direct Astrology Consultation"
    },
    search: {
      label: "Looking for something specific?",
      placeholder: "Search Kundali, Astrology Articles, Horoscope, Stotra or Gems...",
      button: "Search"
    },
    recommendations: {
      tag: "GUIDED WISDOM",
      title: "Popular & Helpful Sections",
      guide: "Complete Guide",
      cards: [
        {
          id: "panchang",
          tag: "DAILY UPDATE",
          title: "Daily Panchang & Choghadiya",
          desc: "Accurate real-time calculations of Tithi, Nakshatra, Shubh Muhurta, and auspicious Choghadiya periods.",
          linkText: "View Panchang",
          href: "/dainik-panchang",
          icon: Sun,
          accentColor: "border-primary text-primary"
        },
        {
          id: "jyotish",
          tag: "PLANETARY INSIGHTS",
          title: "Vedic Astrology & Kundali Analysis",
          desc: "Comprehensive insights on Dosha remedies, Kaal Sarp Yog, Shani Sade Sati, and Navgraha Shanti.",
          linkText: "Read Analysis",
          href: "/categories",
          icon: Compass,
          accentColor: "border-[#d9a100] text-[#8a6800] dark:text-[#fdc72d]"
        },
        {
          id: "darshan",
          tag: "PILGRIMAGE GLORY",
          title: "Shri Bahuchar Maa & 12 Jyotirlingas",
          desc: "Authentic spiritual chronicles, divine Shaktipeeth history, and complete 12 Jyotirlinga darshan guides.",
          linkText: "Explore Darshan",
          href: "/article/hero-1",
          icon: Flame,
          accentColor: "border-[#bb171f] text-[#bb171f]"
        },
        {
          id: "shop",
          tag: "CERTIFIED ITEMS",
          title: "MyShop Vedic Store",
          desc: "Consecrated Rudraksha, sacred Shree Yantra, certified natural gemstones, and pure puja materials.",
          linkText: "Visit Store",
          href: "/myshop",
          icon: ShoppingBag,
          accentColor: "border-primary text-primary"
        }
      ]
    },
    callout: {
      tag: "STILL CAN'T FIND WHAT YOU SEEK?",
      title: "Speak Directly with Dr. Vishal Modi or Book a Personalized Consultation",
      desc: "Our senior Vedic astrologers and guidance team are available to help you find the right path and remedies.",
      callBtn: "+91 79 4000 8108",
      whatsappBtn: "Chat on WhatsApp"
    }
  }
}

export default function NotFound() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const siteData = React.useMemo(() => getSiteShell(lang), [lang])
  const content = NOT_FOUND_DATA[lang] || NOT_FOUND_DATA.gu
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleToggleLang = (newLang) => {
    setLang(newLang)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/categories?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      {/* 1. Standard Astro Header */}
      <AstroHeader
        config={siteData.config}
        topBar={siteData.topBar}
        navLinks={siteData.navLinks}
        activeCategory=""
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={0}
      />

      <main className="flex-1 w-full bg-background pt-3 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 2. Top Breadcrumb Strip */}
          <div className="mb-6">
            <Breadcrumb className="shrink-0">
              <BreadcrumbList className="text-xs sm:text-sm font-medium flex-nowrap whitespace-nowrap">
                <BreadcrumbItem className="shrink-0 whitespace-nowrap">
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-1.5 hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors"
                    >
                      <Compass className="h-4 w-4 shrink-0 text-[#00685d] dark:text-[#6ed8c8]" />
                      <span>{content.breadcrumb.home}</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="shrink-0" />
                <BreadcrumbItem className="shrink-0 whitespace-nowrap">
                  <BreadcrumbPage className="text-[#8a6800] dark:text-[#fdc72d] font-bold whitespace-nowrap">
                    {content.breadcrumb.current}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* 3. Main Hero Card Area */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative bg-card dark:bg-[#1a1b17] border border-border/80 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10 md:p-14">

              {/* Sacred Geometry Aura Accents */}
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#fdc72d]/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#00685d]/10 dark:bg-[#008376]/15 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center">

                {/* Auspicious Sloka Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 dark:bg-[#113f39] text-[#8a6800] dark:text-[#fdc72d] text-xs sm:text-sm font-bold shadow-xs mb-6">
                  <Sparkles className="h-4 w-4 text-[#d9a100] shrink-0" />
                  <span className="tracking-wide">{content.sloka}</span>
                  <Sparkles className="h-4 w-4 text-[#d9a100] shrink-0" />
                </div>

                {/* Stylized Spinning Yantra & 404 Central Composition */}
                <div className="relative my-4 flex items-center justify-center">
                  <svg
                    className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 text-[#fdc72d] dark:text-[#fdc72d]/60 opacity-60 animate-spin"
                    fill="none"
                    style={{ animationDuration: "90s" }}
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="100" cy="100" r="92" stroke="currentColor" strokeDasharray="4 3" strokeWidth="1.2" />
                    <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1" />
                    <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.8" />

                    {/* Lotus Petals Representation */}
                    <path d="M100 18 C115 45 125 60 100 70 C75 60 85 45 100 18 Z" fill="currentColor" fillOpacity="0.12" />
                    <path d="M182 100 C155 115 140 125 130 100 C140 75 155 85 182 100 Z" fill="currentColor" fillOpacity="0.12" />
                    <path d="M100 182 C85 155 75 140 100 130 C125 140 115 155 100 182 Z" fill="currentColor" fillOpacity="0.12" />
                    <path d="M18 100 C45 85 60 75 70 100 C60 125 45 115 18 100 Z" fill="currentColor" fillOpacity="0.12" />

                    {/* Interlocking Sacred Triangles (Shatkona) */}
                    <polygon points="100,38 152,130 48,130" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="100,162 152,70 48,70" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="100" cy="100" fill="currentColor" fillOpacity="0.15" r="16" stroke="currentColor" strokeWidth="1" />
                    <circle cx="100" cy="100" fill="currentColor" r="4" />
                  </svg>

                  {/* Numerals Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
                    <span className="text-6xl sm:text-7xl md:text-8xl font-black text-[#00685d] dark:text-[#6ed8c8] tracking-tight drop-shadow-sm leading-none">
                      {content.number}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#8a6800] dark:text-[#fdc72d] tracking-widest uppercase mt-2">
                      {content.subNumber}
                    </span>
                  </div>
                </div>

                {/* Main Headline & Contextual Explanation */}
                <div className="max-w-3xl mt-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                    {content.title}
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed max-w-2xl mx-auto">
                    {content.description}
                  </p>
                </div>

                {/* Action CTA Button Trio */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
                  {/* Primary CTA */}
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#00685d] hover:bg-[#005048] text-white font-bold h-12 px-6 rounded-xl shadow-md transition-all gap-2 cursor-pointer"
                  >
                    <Link href="/">
                      <ArrowLeft className="h-4 w-4" />
                      <span>{content.actions.home}</span>
                    </Link>
                  </Button>

                  {/* Sacred Accent CTA */}
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-extrabold h-12 px-6 rounded-xl shadow-md transition-all gap-2 cursor-pointer"
                  >
                    <Link href="/dainik-panchang">
                      <Calendar className="h-4 w-4" />
                      <span>{content.actions.panchang}</span>
                    </Link>
                  </Button>

                  {/* Direct Support CTA */}
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border text-foreground hover:bg-muted font-bold h-12 px-6 rounded-xl transition-all gap-2 cursor-pointer"
                  >
                    <Link href="/contact-us">
                      <Headphones className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                      <span>{content.actions.consultation}</span>
                    </Link>
                  </Button>
                </div>

                {/* Search Widget Embedded inside Hero */}
                <div className="w-full max-w-2xl mt-10 pt-6 border-t border-border/60">
                  <label
                    htmlFor="not-found-search-input"
                    className="block text-sm sm:text-base font-bold text-foreground mb-3"
                  >
                    {content.search.label}
                  </label>
                  <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative w-full flex-1">
                      <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="not-found-search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={content.search.placeholder}
                        className="w-full h-11 pl-10 pr-4 bg-muted/50 dark:bg-[#0f3c36] text-foreground text-xs sm:text-sm rounded-xl border-border focus-visible:ring-[#fdc72d]"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto h-11 px-6 bg-[#00685d] hover:bg-[#005048] text-white font-bold rounded-xl shadow-sm transition-all gap-1.5 shrink-0 cursor-pointer"
                    >
                      <span>{content.search.button}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </div>

              </div>
            </div>
          </div>

          {/* 4. 4-Pillar Recommended Destinations Grid */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-black tracking-widest text-[#8a6800] dark:text-[#fdc72d] uppercase">
                  {content.recommendations.tag}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mt-0.5">
                  {content.recommendations.title}
                </h2>
              </div>
              <Link
                href="/categories"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00685d] dark:text-[#fdc72d] hover:underline"
              >
                <span>{content.recommendations.guide}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {content.recommendations.cards.map((card) => {
                const IconComponent = card.icon
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className="group bg-card dark:bg-[#1a1b17] border border-border/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fdc72d] to-[#00685d]" />
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-muted/60 dark:bg-[#113f39] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 text-[#00685d] dark:text-[#fdc72d]" />
                      </div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">
                        {card.tag}
                      </span>
                      <h3 className="text-base font-bold text-foreground group-hover:text-[#00685d] dark:group-hover:text-[#fdc72d] transition-colors leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-border/40 flex items-center text-xs font-bold text-[#00685d] dark:text-[#fdc72d] group-hover:translate-x-1 transition-transform">
                      <span>{card.linkText}</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* 5. Direct Astrologer Callout Strip */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-[#00685d] to-[#008376] dark:from-[#004f46] dark:to-[#003832] text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Headphones className="h-7 w-7 text-[#fdc72d]" />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#fdc72d] text-[#0e3934] text-xs font-black uppercase tracking-wider mb-1">
                    {content.callout.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    {content.callout.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">
                    {content.callout.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
                <a
                  href="tel:+919825000000"
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-white text-[#00685d] font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs hover:bg-white/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{content.callout.callBtn}</span>
                </a>
                <a
                  href={`https://wa.me/919825000000?text=${encodeURIComponent(
                    lang === "gu"
                      ? "જય શ્રી કૃષ્ણ, મને જ્યોતિષ પરામર્શ માટે સમય આપશો."
                      : "Hello, I would like to book an astrology consultation."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-[#fdc72d] text-[#0e3934] font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs hover:bg-[#eab318] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{content.callout.whatsappBtn}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 6. Standard Astro Footer */}
      <AstroFooter config={siteData.config} />
    </div>
  )
}
