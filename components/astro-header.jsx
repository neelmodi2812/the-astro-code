"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import {
  Sparkles,
  Sun,
  Search,
  Mic,
  Calendar,
  MessageSquare,
  User,
  ChevronDown,
  ShoppingBag,
  Menu,
  X,
  Globe,
  Video,
  MessageCircle,
  Clock,
  Phone,
  Compass,
  ChevronRight,
  Heart,
  Package,
  Info,
  LogIn,
  UserPlus,
  LayoutDashboard
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/components/language-provider"

// Rich, specific submenus for navigation dropdowns
const SUBMENU_DATA = {
  "bahuchar-maa-rajwadu": [
    { label: { gu: "ચૈત્રી સુદ પૂનમ પ્રાગટ્ય (મુખ્ય લેખ)", en: "Chaitri Sud Poonam Manifestation" }, href: "/article/hero-1" },
    { label: { gu: "ચુંવાળ બહુચરાજી પરચાઓ", en: "Chunval Bahucharaji Miracles" }, href: "/article/hero-2" },
    { label: { gu: "વરખડી વૃક્ષ પ્રાગટ્ય દર્શન", en: "Sacred Varkhadi Tree Darshan" }, href: "/article/hero-3" },
    { label: { gu: "માં બહુચરને લાડુનો ગોખ શા માટે?", en: "Sacred Laddu Offering Legend" }, href: "/article/hero-4" },
    { label: { gu: "આનંદના ગરબાનો મહિમા & પાઠ", en: "Anand No Garbo Glory & Recitation" }, href: "/article/feat-1" },
  ],
  "jyotirling": [
    { label: { gu: "પ્રથમ જ્યોતિર્લિંગ સોમનાથ મહાદેવ", en: "First Jyotirling: Somnath Mahadev" }, href: "/article/jyotirling-1" },
    { label: { gu: "મહાકાલેશ્વર ઉજ્જૈન ભસ્મ આરતી", en: "Mahakaleshwar Ujjain Aarti" }, href: "/article/feat-2" },
    { label: { gu: "બાર જ્યોતિર્લિંગ સંપુર્ણ દર્શન વિષય", en: "All 12 Jyotirlingas Comprehensive Guide" }, href: "/categories" },
  ],
  "dharmik": [
    { label: { gu: "શાસ્ત્રોક્ત પૂજા વિધિ & સંસ્કાર", en: "Vedic Puja Vidhi & Daily Rituals" }, href: "/categories" },
    { label: { gu: "સિદ્ધ સાધના સામગ્રી & યંત્ર", en: "Consecrated Yantras & Spiritual Items" }, href: "/myshop" },
    { label: { gu: "ધાર્મિક વ્રત કથાઓ & ઉપવાસ", en: "Spiritual Stories & Fasting Rules" }, href: "/categories" },
  ],
  "jyotishshastra": [
    { label: { gu: "જન્મકુંડળી & ગ્રહ દોષ વિશ્લેષણ", en: "Kundali & Dosha Analysis" }, href: "/categories" },
    { label: { gu: "શનિ સાડાસાતી & કાલસર્પ ઉપાય", en: "Shani Sade Sati Remedies" }, href: "/categories" },
    { label: { gu: "ડૉ. વિશાલ મોદી સાથે પરામર્શ બુકિંગ", en: "Book Astrologer Consultation" }, href: "/contact-us" },
  ],
  "ankashastra": [
    { label: { gu: "મૂળાંક અને ભાગ્યાંક રહસ્યો", en: "Mulank & Bhagyank Secrets" }, href: "/categories" },
    { label: { gu: "નામ અંકશાસ્ત્ર લકી નંબર", en: "Name Numerology & Lucky Number" }, href: "/categories" },
  ],
  "more": [
    { label: { gu: "તમામ વિષય સંગ્રહ (All Categories)", en: "All Categories & Topics Directory" }, href: "/categories" },
    { label: { gu: "પ્રેરણાત્મક ધાર્મિક કથાઓ", en: "Inspirational Spiritual Stories" }, href: "/article/feat-2" },
    { label: { gu: "અમારા વિશે & સંસ્થા પરિચય", en: "About Us & Institute History" }, href: "/about-us" },
    { label: { gu: "સંપર્ક કરો & મુલાકાત સરનામું", en: "Contact Us & Office Location" }, href: "/contact-us" },
    { label: { gu: "જ્યોતિષ પરામર્શ સીધી વાતચીત", en: "Direct Astrologer Consultation" }, href: "/contact-us" },
  ],
}

export function AstroHeader({
  config = {},
  topBar = {},
  navLinks = [],
  activeCategory,
  onSelectCategory,
  lang: propLang,
  onToggleLang,
  cartCount = 0
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { lang: contextLang, setLang } = useLanguage()
  const lang = propLang || contextLang || "gu"
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [expandedCategory, setExpandedCategory] = React.useState(null)

  const toggleExpand = (catId) => {
    setExpandedCategory((prev) => (prev === catId ? null : catId))
  }

  const handleLangChange = (newLang) => {
    setLang(newLang)
    if (onToggleLang) {
      onToggleLang(newLang)
    }
  }

  const handleNavClick = (itemId) => {
    if (itemId === "home") {
      router.push("/")
    } else if (itemId === "bahuchar-maa-rajwadu") {
      router.push("/article/hero-1")
    } else if (itemId === "jyotirling") {
      router.push("/article/jyotirling-1")
    } else if (itemId === "dharmik" || itemId === "jyotishshastra" || itemId === "ankashastra" || itemId === "categories" || itemId === "more" || itemId === "vishay-sangrah") {
      router.push("/categories")
    } else if (itemId === "preranatmak") {
      router.push("/article/feat-2")
    } else if (itemId === "about" || itemId === "about-us") {
      router.push("/about-us")
    } else if (itemId === "panchang" || itemId === "dainik-panchang") {
      router.push("/dainik-panchang")
    } else if (itemId === "contact" || itemId === "contact-us") {
      router.push("/contact-us")
    } else if (itemId === "cart") {
      router.push("/myshop/cart")
    } else if (itemId === "shop" || itemId === "myshop" || itemId === "vedic-shop") {
      router.push("/myshop")
    }
    if (onSelectCategory) {
      onSelectCategory(itemId)
    }
  }

  const checkIsActive = (item) => {
    if (pathname === "/") {
      return item.id === "home"
    }
    if ((pathname === "/myshop" || pathname?.startsWith("/myshop")) && (item.id === "myshop" || item.id === "shop")) {
      return true
    }
    if (pathname === "/dainik-panchang" && (item.id === "dainik-panchang" || item.id === "panchang")) {
      return true
    }
    if (pathname === "/categories" && (item.id === "categories" || item.id === "more")) {
      return true
    }
    if (pathname === "/about-us" && (item.id === "about-us" || item.id === "more")) {
      return true
    }
    if (pathname === "/contact-us" && (item.id === "contact-us" || item.id === "more")) {
      return true
    }
    if (pathname && pathname.startsWith("/article/hero") && item.id === "bahuchar-maa-rajwadu") {
      return true
    }
    if (pathname && pathname.startsWith("/article/jyotirling") && item.id === "jyotirling") {
      return true
    }
    return activeCategory === item.id
  }



  return (
    <header className="sticky top-0 w-full z-50 shadow-[0_4px_20px_-2px_rgba(37,26,0,0.12)] transition-all">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        {/* 1ST LAYER: TOP AUSPICIOUS STRIP */}
      <div className="bg-[#f0eee8] dark:bg-[#1a1b18] text-[#1b1c1a] dark:text-[#f4f3ef] px-3 sm:px-6 py-1.5 border-b border-[#e6e3da] dark:border-white/10 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Vikram Samvat & Sunrise info */}
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-[#8a6800] dark:text-[#fdc72d] font-bold text-[11px] sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#d9a100] shrink-0" />
              <span className="truncate">{topBar?.samvat || "વિક્રમ સંવત ૨૦૮૧"}</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-muted-foreground text-xs">
              <Sun className="h-3.5 w-3.5 text-[#d9a100] shrink-0" />
              {topBar?.sunTimings || ""}
            </span>
          </div>

          {/* Social icons, Language Switcher & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-2 text-muted-foreground text-xs">
              <span className="text-[11px]">{topBar.followUs || "અનુસરો:"}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button aria-label="Website" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors cursor-pointer p-0.5">
                    <Globe className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{lang === "gu" ? "વેબસાઇટ" : "Website"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button aria-label="Videos" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors cursor-pointer p-0.5">
                    <Video className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{lang === "gu" ? "વિડિઓઝ" : "Videos"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button aria-label="Chat" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors cursor-pointer p-0.5">
                    <MessageCircle className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{lang === "gu" ? "વોટ્સએપ ચેટ" : "WhatsApp Chat"}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-4 hidden lg:block bg-border/60" />

            {/* Bilingual Switcher via Pill Segmented Toggle (matches user requested UI) */}
            <div className="bg-white dark:bg-[#1e1f1b] p-1 rounded-xl border border-border/50 shadow-xs inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleLangChange("gu")}
                aria-label="ગુજરાતી ભાષા"
                className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  lang === "gu"
                    ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                    : "text-[#1b1c1a]/75 dark:text-white/75 hover:text-foreground hover:bg-muted/40"
                }`}
              >
                ગુજ
              </button>
              <button
                type="button"
                onClick={() => handleLangChange("en")}
                aria-label="English Language"
                className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                    : "text-[#1b1c1a]/75 dark:text-white/75 hover:text-foreground hover:bg-muted/40"
                }`}
              >
                EN
              </button>
            </div>

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* 2ND LAYER: BRAND IDENTITY & MAIN SEARCH ROW */}
      <Collapsible open={mobileSearchOpen} onOpenChange={setMobileSearchOpen} className="bg-card dark:bg-[#161714] py-2.5 px-3 sm:px-6 border-b border-[#fdc72d]/30 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Invocation */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(253,199,45,0.30)] ring-2 ring-[#fdc72d] bg-[#121b1a] flex items-center justify-center p-0.5 shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src={config?.logoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Ogqc3Lgxek9Poh6T6awNiHzAhMkqB-5xPT0DGQw2IkT_JcEk1jrF2XWfWhUcqqZUaq2yl1BcF9KyKGZG1FSAiWJCqFng25fFCfO60PSuH_WhIrXmepmxQpoTd8-3rYz6AP2u8k4zfujF7gqSn-OOWkejaV7jSUZYd-Vx2sZp3lWu2lhhmj59HfTP35AWQGI3JD_-LdFej4UXcxM7Nt4HhU6_7DSXUONbF2fKEY14WAQjMJ59pJkcLp2sxGLtwmBKA"}
                  alt={config?.appName || "The Astro Code"}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-lg"
                  priority
                />
              </div>
              <div className="shrink-0 whitespace-nowrap">
                <div className="text-[10px] sm:text-[11px] text-[#bb171f] dark:text-[#ff8080] font-black tracking-wider flex items-center gap-1 whitespace-nowrap leading-none">
                  {config?.spiritualInvocation || "॥ શ્રી ગણેશાય નમઃ ॥"}
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-foreground tracking-tight leading-none group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors mt-0.5 whitespace-nowrap">
                  {config?.appName || "THE ASTRO CODE"}
                </div>
                <div className="text-[9px] sm:text-[10px] font-black tracking-widest text-[#8a6800] dark:text-[#fdc72d] mt-0.5 whitespace-nowrap leading-none">
                  {config?.tagline || "UNLOCK HAPPINESS"}
                </div>
              </div>
            </Link>
          </div>

          {/* Central Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full flex items-center">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={topBar?.searchPlaceholder || "કુંડળી, જ્યોતિષ અથવા મુહૂર્ત શોધો..."}
                className="w-full h-10 bg-muted/60 dark:bg-[#20211d] text-foreground text-xs sm:text-sm rounded-lg pl-3 pr-20 border-border focus-visible:ring-[#fdc72d] focus-visible:border-[#fdc72d]"
              />
              <button
                type="button"
                aria-label="Voice Search"
                className="absolute right-9 text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] p-1 cursor-pointer transition-colors"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Search"
                className="absolute right-1.5 bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] p-1.5 rounded-md flex items-center justify-center cursor-pointer transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Actions: Auspicious time, Consultation CTA, User profile, Mobile Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 dark:bg-[#22231e] dark:border-[#fdc72d]/25 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-muted-foreground font-semibold leading-none">
                  {topBar?.shubhMuhurtaTitle || "શુભ મુહૂર્ત"}
                </div>
                <div className="text-xs font-black text-[#8a6800] dark:text-[#fdc72d] leading-tight mt-0.5 whitespace-nowrap">
                  {topBar?.shubhMuhurta || ""}
                </div>
              </div>
            </div>

            {/* Mobile Search Toggle via CollapsibleTrigger (<md) */}
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted dark:hover:bg-[#252622] transition-colors cursor-pointer shrink-0"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </CollapsibleTrigger>

            {/* Consultation Button (lg+) */}
            <Button
              size="sm"
              className="hidden lg:inline-flex bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] font-extrabold shadow-sm hover:shadow transition-all cursor-pointer h-9 px-3.5 rounded-lg shrink-0 whitespace-nowrap"
              onClick={() => {
                window.open(`https://wa.me/919825000000?text=${encodeURIComponent(lang === 'gu' ? 'જય શ્રી કૃષ્ણ, મને જ્યોતિષ પરામર્શ માટે સમય આપશો.' : 'Hello, I would like to book an astrology consultation.')}`, "_blank")
              }}
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              <span>{topBar.bookConsultation}</span>
            </Button>

            {/* Wishlist Icon (md+) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/myshop?tab=wishlist"
                  className="hidden md:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-muted/60 dark:bg-[#20211d] text-foreground border border-border items-center justify-center shadow-xs cursor-pointer hover:text-[#bb171f] hover:border-[#bb171f]/40 transition-all shrink-0"
                  aria-label={lang === "gu" ? "વિશલિસ્ટ" : "Wishlist"}
                >
                  <Heart className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{lang === "gu" ? "વિશલિસ્ટ" : "Wishlist"}</p>
              </TooltipContent>
            </Tooltip>

            {/* Cart Bag Icon (visible on all screens with dynamic badge) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/myshop/cart"
                  className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-muted/60 dark:bg-[#20211d] text-foreground border border-border flex items-center justify-center shadow-xs cursor-pointer hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-all shrink-0"
                  aria-label={lang === "gu" ? "શોપિંગ કાર્ટ" : "Shopping Cart"}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#fdc72d] text-[#1b1c1a] text-[10px] font-black rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{lang === "gu" ? "શોપિંગ કાર્ટ" : "Shopping Cart"}</p>
              </TooltipContent>
            </Tooltip>

            {/* User Account Dropdown (md+) */}
            <div className="hidden md:block shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label={lang === "gu" ? "મારું એકાઉન્ટ" : "My Account"}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-muted/60 dark:bg-[#20211d] text-foreground border border-border flex items-center justify-center shadow-xs cursor-pointer hover:text-[#00685d] dark:hover:text-[#fdc72d] hover:border-[#fdc72d] transition-all outline-none shrink-0"
                  >
                    <User className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl bg-card dark:bg-[#181916] shadow-xl">
                  <DropdownMenuLabel className="font-bold text-xs px-2 py-1.5 text-foreground flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-[#d9a100]" />
                    <span>{lang === "gu" ? "મારું પ્રોફાઇલ & એકાઉન્ટ" : "My Profile & Account"}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5 font-bold text-[#8a6800] dark:text-[#fdc72d] bg-[#fdc72d]/10 rounded-lg mb-1" onClick={() => router.push("/dashboard")}>
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span>{lang === "gu" ? "ડેશબોર્ડ (User Dashboard)" : "Vedic Dashboard"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5 text-foreground hover:bg-muted rounded-lg mb-1" onClick={() => router.push("/login")}>
                    <LogIn className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{lang === "gu" ? "લૉગિન (Sign In)" : "Sign In"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5 text-foreground hover:bg-muted rounded-lg mb-1" onClick={() => router.push("/register")}>
                    <UserPlus className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{lang === "gu" ? "નવું એકાઉન્ટ (Register)" : "Register"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5" onClick={() => router.push("/myshop?tab=orders")}>
                    <Package className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{lang === "gu" ? "મારા ઓર્ડર્સ (My Orders)" : "My Orders"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5" onClick={() => router.push("/myshop?tab=wishlist")}>
                    <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{lang === "gu" ? "વિશલિસ્ટ (Wishlist)" : "Wishlist"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5" onClick={() => router.push("/contact-us")}>
                    <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{lang === "gu" ? "જ્યોતિષ પરામર્શ સહાય" : "Astrology Consultation"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5 text-muted-foreground flex items-center gap-2.5" onClick={() => router.push("/about-us")}>
                    <Info className="h-3.5 w-3.5" />
                    <span>{lang === "gu" ? "અમારા વિશે" : "About Us"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Hamburger Button via shadcn SheetTrigger (<md) */}
            <SheetTrigger
              className="md:hidden p-2 rounded-lg border border-border text-foreground hover:bg-muted dark:hover:bg-[#252622] transition-colors cursor-pointer inline-flex items-center justify-center shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SheetTrigger>
          </div>
        </div>

        {/* Mobile Search Input Drawer via CollapsibleContent */}
        <CollapsibleContent className="md:hidden pt-2.5 pb-1">
          <div className="relative w-full flex items-center">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={topBar?.searchPlaceholder || "કુંડળી, જ્યોતિષ અથવા મુહૂર્ત શોધો..."}
              className="w-full h-9 bg-muted text-xs rounded-lg pl-3 pr-10"
              autoFocus
            />
            <button
              type="button"
              className="absolute right-2 bg-[#fdc72d] text-[#1b1c1a] p-1.5 rounded-md"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* 3RD LAYER: PRIMARY BRAND NAVIGATION IN SACRED SAFFRON (#fdc72d) - DESKTOP ONLY */}
      <div className="hidden md:block bg-[#fdc72d] text-[#1b1c1a] px-3 sm:px-6 border-t border-b border-[#e5b220] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Navigation Strip */}
          <nav
            aria-label="Main Navigation"
            className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1.5 pr-4 sm:pr-2 scrollbar-none w-full"
          >
            {navLinks.map((item) => {
              const isActive = checkIsActive(item)
              const subItems = SUBMENU_DATA[item.id] || []
              const hasSub = Boolean(item.hasSubmenu && subItems.length > 1)

              if (hasSub) {
                return (
                  <DropdownMenu key={item.id}>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className={`group px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm whitespace-nowrap rounded-lg font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-[#1b1c1a] text-[#fdc72d] shadow-sm ring-1 ring-[#1b1c1a]"
                            : "text-[#1b1c1a] hover:bg-black/10"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="h-3.5 w-3.5 opacity-80 transition-transform duration-200 ease-in-out group-aria-expanded:rotate-180 group-data-[popup-open]:rotate-180 group-data-[state=open]:rotate-180" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={item.id === "more" ? "end" : "start"} className="w-64 p-1.5 rounded-xl bg-card dark:bg-[#181916] shadow-xl border border-border">
                      {item.id !== "more" && (
                        <>
                          <DropdownMenuItem
                            className="cursor-pointer text-xs font-bold py-2 px-2.5 flex items-center justify-between text-[#8a6800] dark:text-[#fdc72d] rounded-lg"
                            onClick={() => handleNavClick(item.id)}
                          >
                            <span>{item.label} ({lang === "gu" ? "મુખ્ય પૃષ્ઠ" : "Main Overview"})</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      {subItems.map((sub, idx) => (
                        <DropdownMenuItem
                          key={idx}
                          className="cursor-pointer text-xs py-2 px-2.5 flex items-center justify-between font-medium text-foreground hover:bg-muted rounded-lg"
                          onClick={() => router.push(sub.href)}
                        >
                          <span className="truncate pr-2">{sub.label[lang] || sub.label.gu}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              // Single route: direct navigation, no arrow
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm whitespace-nowrap rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#1b1c1a] text-[#fdc72d] shadow-sm ring-1 ring-[#1b1c1a]"
                      : "text-[#1b1c1a] hover:bg-black/10"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === "cart" && cartCount > 0 && (
                    <Badge variant="destructive" className="h-4 px-1.5 text-[10px] ml-1 bg-[#bb171f] text-white">
                      {cartCount}
                    </Badge>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

        {/* Mobile Menu Drawer via shadcn SheetContent */}
        <SheetContent
          side="left"
          showCloseButton={true}
          className="w-[84vw] max-w-xs sm:w-80 h-full p-0 flex flex-col justify-between border-r border-border/80 bg-card dark:bg-[#181916] text-foreground shadow-2xl"
        >
          {/* 1. Drawer Header */}
          <SheetHeader className="p-4 border-b border-border/70 bg-muted/30 dark:bg-[#151613]">
            <div className="flex items-center gap-2.5 pr-8">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs ring-2 ring-[#fdc72d] bg-[#121b1a] shrink-0 p-0.5">
                <Image
                  src={config.logoUrl}
                  alt={config.appName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="text-[10px] text-[#bb171f] dark:text-[#ff8080] font-black tracking-wider leading-none">
                  {config.spiritualInvocation}
                </div>
                <SheetTitle className="text-base font-extrabold text-foreground tracking-tight mt-0.5">
                  {config.appName}
                </SheetTitle>
                <SheetDescription className="text-[9px] font-bold text-[#8a6800] dark:text-[#fdc72d]">
                  {config.tagline}
                </SheetDescription>
              </div>
            </div>

            {/* Shubh Muhurta info badge in drawer header */}
            <Separator className="my-2.5 bg-border/50" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium text-[11px]">
                {topBar.shubhMuhurtaTitle}:
              </span>
              <span className="font-bold text-[#8a6800] dark:text-[#fdc72d] text-[11px] flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {topBar.shubhMuhurta}
              </span>
            </div>
          </SheetHeader>

          {/* 2. Drawer Body (Search + Language + Quick Actions + Navigation links) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {/* In-drawer Search bar */}
            <div className="relative w-full">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    router.push(`/categories?q=${encodeURIComponent(searchQuery.trim())}`)
                    setMobileMenuOpen(false)
                  }
                }}
                placeholder={topBar.searchPlaceholder}
                className="w-full h-9 bg-muted/60 dark:bg-[#20211d] text-foreground text-xs rounded-lg pl-3 pr-9 border-border"
              />
              <button
                type="button"
                onClick={() => {
                  if (searchQuery.trim()) {
                    router.push(`/categories?q=${encodeURIComponent(searchQuery.trim())}`)
                    setMobileMenuOpen(false)
                  }
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Search"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Language Switcher Buttons */}
            <div className="flex items-center justify-between bg-muted/40 dark:bg-[#20211d] p-1.5 rounded-xl border border-border/60">
              <span className="text-xs text-muted-foreground font-semibold px-2">
                {lang === "gu" ? "ભાષા પસંદ કરો:" : "Select Language:"}
              </span>
              <div className="bg-white dark:bg-[#1a1b18] p-1 rounded-xl border border-border/50 shadow-xs inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleLangChange("gu")}
                  aria-label="ગુજરાતી ભાષા"
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    lang === "gu"
                      ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                      : "text-[#1b1c1a]/75 dark:text-white/75 hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  ગુજ
                </button>
                <button
                  type="button"
                  onClick={() => handleLangChange("en")}
                  aria-label="English Language"
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    lang === "en"
                      ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                      : "text-[#1b1c1a]/75 dark:text-white/75 hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Quick Action Buttons: Login, Orders, Wishlist, Store */}
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  router.push("/dashboard")
                  setMobileMenuOpen(false)
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-muted/40 dark:bg-[#20211d] border border-border/50 text-[11px] font-bold text-foreground hover:bg-muted transition-colors gap-1 cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                <span>{lang === "gu" ? "ડેશબોર્ડ" : "Dashboard"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/myshop?tab=orders")
                  setMobileMenuOpen(false)
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-muted/40 dark:bg-[#20211d] border border-border/50 text-[11px] font-bold text-foreground hover:bg-muted transition-colors gap-1 cursor-pointer"
              >
                <Package className="h-4 w-4 text-[#d9a100]" />
                <span>{lang === "gu" ? "ઓર્ડર્સ" : "Orders"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/myshop?tab=wishlist")
                  setMobileMenuOpen(false)
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-muted/40 dark:bg-[#20211d] border border-border/50 text-[11px] font-bold text-foreground hover:bg-muted transition-colors gap-1 cursor-pointer"
              >
                <Heart className="h-4 w-4 text-[#bb171f]" />
                <span>{lang === "gu" ? "વિશલિસ્ટ" : "Wishlist"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/myshop")
                  setMobileMenuOpen(false)
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-muted/40 dark:bg-[#20211d] border border-border/50 text-[11px] font-bold text-foreground hover:bg-muted transition-colors gap-1 cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                <span>{lang === "gu" ? "સ્ટોર" : "Store"}</span>
              </button>
            </div>

            <Separator className="my-1 bg-border/50" />

            {/* Navigation Items List with Expandable Submenus */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-black tracking-wider text-muted-foreground px-2 pb-0.5">
                {lang === "gu" ? "મુખ્ય વિભાગો" : "Categories"}
              </div>
              {navLinks.map((item) => {
                const isActive = checkIsActive(item)
                const subItems = SUBMENU_DATA[item.id] || []
                const hasSub = item.hasSubmenu && subItems.length > 1
                const isExpanded = expandedCategory === item.id

                if (hasSub) {
                  return (
                    <div key={item.id} className="rounded-xl overflow-hidden border border-border/50 bg-muted/20 dark:bg-[#1a1b18]/60 transition-all">
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className={`w-full text-left py-2.5 px-3 text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isActive
                            ? "text-[#8a6800] dark:text-[#fdc72d]"
                            : "text-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-[#8a6800] dark:text-[#fdc72d]" : "text-muted-foreground"
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-2 pb-2 pt-1 border-t border-border/40 bg-background/60 dark:bg-[#151613] space-y-1">
                          {item.id !== "more" && (
                            <button
                              type="button"
                              onClick={() => {
                                handleNavClick(item.id)
                                setMobileMenuOpen(false)
                              }}
                              className="w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:bg-muted/60 flex items-center justify-between cursor-pointer"
                            >
                              <span>{item.label} ({lang === "gu" ? "મુખ્ય પૃષ્ઠ" : "Main Overview"})</span>
                            </button>
                          )}
                          {subItems.map((sub, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                router.push(sub.href)
                                setMobileMenuOpen(false)
                              }}
                              className="w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-between cursor-pointer"
                            >
                              <span className="truncate pr-2">{sub.label[lang] || sub.label.gu}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                // Single route item (no submenu, no arrow)
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      handleNavClick(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer min-h-[42px] ${
                      isActive
                        ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                        : "hover:bg-muted dark:hover:bg-[#22231f] text-foreground border border-border/30"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.id === "cart" && cartCount > 0 && (
                        <Badge className="bg-[#bb171f] text-white text-[10px] h-4 px-1.5">
                          {cartCount}
                        </Badge>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. Drawer Footer: Consultation & WhatsApp Action */}
          <SheetFooter className="p-4 border-t border-border/70 bg-muted/20 dark:bg-[#151613] space-y-2.5">
            <button
              type="button"
              className="w-full bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-extrabold h-10 rounded-lg text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              onClick={() => {
                setMobileMenuOpen(false)
                window.open(
                  `https://wa.me/919825000000?text=${encodeURIComponent(
                    lang === "gu"
                      ? "જય શ્રી કૃષ્ણ, મને જ્યોતિષ પરામર્શ માટે સમય આપશો."
                      : "Hello, I would like to book an astrology consultation."
                  )}`,
                  "_blank"
                )
              }}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{topBar.bookConsultation}</span>
            </button>

            <Separator className="my-1.5 bg-border/60" />

            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5 w-full">
              <span>{lang === "gu" ? "ડૉ. વિશાલ મોદી" : "Dr. Vishal Modi"}</span>
              <span className="text-[#8a6800] dark:text-[#fdc72d] font-bold">
                {lang === "gu" ? "વૈદિક જ્યોતિષાચાર્ય" : "Vedic Astrologer"}
              </span>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  )
}
