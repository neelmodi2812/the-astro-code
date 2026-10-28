"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Sun,
  MessageSquare,
  User,
  ChevronDown,
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Sparkles,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/components/language-provider"
import { getWhatsAppUrl } from "@/lib/config/contact"
import { toast } from "sonner"
import { useAuth } from "@/lib/api/hooks/use-auth"
import { useNavMenu } from "@/lib/api/hooks/use-nav-menu"

// Valid application routes for the "More" navigation dropdown
const MORE_SUBMENU = [
  { label: { gu: "તમામ વિષય સંગ્રહ", en: "All Categories Directory" }, href: "/categories" },
  { label: { gu: "દૈનિક પંચાંગ અને ચોઘડિયા", en: "Daily Panchang & Choghadiya" }, href: "/dainik-panchang" },
  { label: { gu: "MyShop વૈદિક સ્ટોર", en: "MyShop Spiritual Store" }, href: "/myshop" },
  { label: { gu: "અમારા વિશે અને પરિચય", en: "About Us & History" }, href: "/about-us" },
  { label: { gu: "સંપર્ક કરો અને મુલાકાત સરનામું", en: "Contact Us & Office Location" }, href: "/contact-us" },
]

export function AstroHeader({
  config = {},
  topBar = {},
  navLinks: staticNavLinks = [],
  activeCategory,
  onSelectCategory,
  lang: propLang,
  onToggleLang,
  cartCount = 0
}) {
  const pathname = usePathname()
  const { lang: contextLang, setLang } = useLanguage()
  const lang = propLang || contextLang || "gu"
  const { navLinks, submenus } = useNavMenu(lang, staticNavLinks)
  const getSubItems = (item) => (item.id === "more" ? MORE_SUBMENU : submenus[item.id] || [])
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [expandedCategory, setExpandedCategory] = React.useState(null)

  const router = useRouter()
  const { isAuthenticated, user, mounted, logout } = useAuth()
  const displayName = user?.name ? user.name.split(" ")[0] : (lang === "gu" ? "ભક્ત" : "Devotee")
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U"

  const handleLogout = async () => {
    try {
      await logout()
      toast.success(lang === "gu" ? "સફળતાપૂર્વક લૉગ આઉટ થયા." : "Logged out successfully.")
      router.push("/login")
    } catch (error) {
      toast.error(error?.message || "Failed to logout")
    }
  }

  // Lock background body scroll when mobile drawer is open
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      if (mobileMenuOpen) {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
          document.body.style.overflow = originalOverflow
        }
      } else {
        document.body.style.overflow = ""
      }
    }
  }, [mobileMenuOpen])

  // Automatically close mobile menu on route navigation
  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navScrollRef = React.useRef(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const checkNavScroll = React.useCallback(() => {
    if (!navScrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current
    setCanScrollLeft(scrollLeft > 6)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6)
  }, [])

  React.useEffect(() => {
    checkNavScroll()
    const el = navScrollRef.current
    if (el) {
      el.addEventListener("scroll", checkNavScroll, { passive: true })
    }
    window.addEventListener("resize", checkNavScroll)
    return () => {
      if (el) el.removeEventListener("scroll", checkNavScroll)
      window.removeEventListener("resize", checkNavScroll)
    }
  }, [checkNavScroll, navLinks])

  const scrollNav = (direction) => {
    if (!navScrollRef.current) return
    const offset = direction === "left" ? -240 : 240
    navScrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
  }

  const toggleExpand = (catId) => {
    setExpandedCategory((prev) => (prev === catId ? null : catId))
  }

  const handleLangChange = (newLang) => {
    setLang(newLang)
    if (onToggleLang) {
      onToggleLang(newLang)
    }
  }

  const getItemHref = (itemId) => {
    const dynamicItem = navLinks.find((item) => item.id === itemId)
    if (dynamicItem?.href) return dynamicItem.href
    if (itemId === "home") return "/"
    if (itemId === "panchang" || itemId === "dainik-panchang") return "/dainik-panchang"
    if (itemId === "shop" || itemId === "myshop" || itemId === "vedic-shop") return "/myshop"
    if (itemId === "cart") return "/myshop/cart"
    if (itemId === "about" || itemId === "about-us") return "/about-us"
    if (itemId === "contact" || itemId === "contact-us") return "/contact-us"
    return "/categories"
  }

  const activeNavId = React.useMemo(() => {
    if (pathname === "/") {
      return activeCategory || "home"
    }
    if (pathname === "/myshop" || pathname?.startsWith("/myshop")) {
      return "myshop"
    }
    if (pathname === "/dainik-panchang" || pathname?.startsWith("/dainik-panchang")) {
      return "dainik-panchang"
    }
    if (pathname === "/about-us" || pathname?.startsWith("/about-us")) {
      return "more"
    }
    if (pathname === "/contact-us" || pathname?.startsWith("/contact-us")) {
      return "more"
    }
    if (pathname === "/categories" || pathname?.startsWith("/categories")) {
      return "more"
    }

    // Article detail pages: determine active navigation category from API
    if (pathname?.startsWith("/article/")) {
      const owner = navLinks.find((item) => (submenus[item.id] || []).some((sub) => sub.href === pathname))
      if (owner) return owner.id
      if (
        pathname.includes("somnath") ||
        pathname.includes("mahakaleshwar") ||
        pathname.includes("dwarkadhish") ||
        pathname.includes("jyotirling")
      ) {
        return "jyotirling"
      }
      if (activeCategory && activeCategory !== "home") {
        return activeCategory
      }
      return "dharmik"
    }

    if (activeCategory) return activeCategory
    return ""
  }, [pathname, activeCategory, navLinks, submenus])

  const checkIsActive = (item) => activeNavId === item.id

  return (
    <header className="sticky top-0 w-full z-50 shadow-[0_4px_20px_-2px_rgba(37,26,0,0.12)] transition-all">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        {/* 1ST LAYER: UNIFIED BRAND, CELESTIAL TIMINGS & UTILITIES ROW */}
        <div className="bg-card dark:bg-[#161714] py-2.5 sm:py-3 px-3 sm:px-6 border-b border-[#fdc72d]/25 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
            {/* Left: Brand Identity & Sacred Celestial Status */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(253,199,45,0.30)] ring-2 ring-[#fdc72d] bg-[#121b1a] flex items-center justify-center p-0.5 shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src={config?.logoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Ogqc3Lgxek9Poh6T6awNiHzAhMkqB-5xPT0DGQw2IkT_JcEk1jrF2XWfWhUcqqZUaq2yl1BcF9KyKGZG1FSAiWJCqFng25fFCfO60PSuH_WhIrXmepmxQpoTd8-3rYz6AP2u8k4zfujF7gqSn-OOWkejaV7jSUZYd-Vx2sZp3lWu2lhhmj59HfTP35AWQGI3JD_-LdFej4UXcxM7Nt4HhU6_7DSXUONbF2fKEY14WAQjMJ59pJkcLp2sxGLtwmBKA"}
                    alt={config?.appName || "The Astro Code"}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover rounded-lg"
                    priority
                  />
                </div>
                <div className="shrink-0 whitespace-nowrap">
                  <div className="text-lg sm:text-xl md:text-[22px] font-extrabold text-foreground tracking-tight leading-none group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors whitespace-nowrap">
                    {config?.appName || "The Astro Code"}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-black tracking-widest text-[#8a6800] dark:text-[#fdc72d] mt-1 whitespace-nowrap leading-none">
                    {config?.tagline || "UNLOCK HAPPINESS"}
                  </div>
                </div>
              </Link>

              {/* Panchang / Samvat & Solar Status Capsule (visible on xl+) */}
              <div className="hidden xl:flex items-center gap-2.5 pl-3 border-l border-border/60">
                <div className="flex flex-col text-left justify-center">
                  <span className="flex items-center gap-1.5 text-[#8a6800] dark:text-[#fdc72d] font-bold text-xs whitespace-nowrap leading-tight">
                    {/* <Sparkles className="h-3.5 w-3.5 text-[#d9a100] shrink-0" /> */}
                    <span>{topBar?.samvat || "વિક્રમ સંવત ૨૦૮૧ • કાર્તક સુદ પૂનમ"}</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground text-[11px] mt-0.5 whitespace-nowrap leading-tight">
                    <Sun className="h-3 w-3 text-[#d9a100] shrink-0" />
                    <span>{topBar?.sunTimings || "અમદાવાદ સૂર્યોદય: ૦૬:૫૨ • સૂર્યાસ્ત: ૧૭:૫૪"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Book Consultation, Cart, Profile, Language & Theme */}
            <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
              {/* Book Consultation Button (Desktop Only: md+) */}
              <Button
                size="sm"
                className="hidden md:inline-flex bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] font-extrabold shadow-sm hover:shadow transition-all cursor-pointer h-10 px-4 sm:px-5 rounded-xl shrink-0 whitespace-nowrap items-center justify-center border border-[#e5b220]"
                onClick={() => {
                  window.open(
                    getWhatsAppUrl(
                      lang === 'gu'
                        ? 'જય શ્રી કૃષ્ણ, મને જ્યોતિષ પરામર્શ માટે સમય આપશો.'
                        : 'Hello, I would like to book an astrology consultation.'
                    ),
                    "_blank"
                  )
                }}
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                <span>{topBar.bookConsultation || (lang === "gu" ? "પરામર્શ બુક કરો" : "Book Consultation")}</span>
              </Button>

              {/* Shopping Cart Bag (Desktop Only: md+) */}
              <div className="hidden md:flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/myshop/cart"
                      className="relative h-10 w-10 rounded-full bg-muted/60 dark:bg-[#20211d] text-foreground border border-border flex items-center justify-center shadow-2xs cursor-pointer hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-all shrink-0"
                      aria-label={lang === "gu" ? "શોપિંગ કાર્ટ" : "Shopping Cart"}
                    >
                      <ShoppingBag className="h-4.5 w-4.5" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 size-4 bg-[#fdc72d] text-[#1b1c1a] text-[10px] font-black rounded-full flex items-center justify-center shrink-0 aspect-square leading-none">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{lang === "gu" ? "શોપિંગ કાર્ટ" : "Shopping Cart"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* User Profile Action: Direct link to /login when guest; Dropdown with greeting when authenticated */}
              <div className="flex items-center shrink-0">
                {!mounted || !isAuthenticated ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/login"
                        aria-label={lang === "gu" ? "લૉગિન કરો" : "Sign In"}
                        className="h-10 w-10 rounded-full bg-muted/60 dark:bg-[#20211d] text-foreground border border-border flex items-center justify-center shadow-2xs cursor-pointer hover:text-[#00685d] dark:hover:text-[#fdc72d] hover:border-[#fdc72d] transition-all outline-none shrink-0"
                      >
                        <User className="h-5 w-5 text-foreground" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{lang === "gu" ? "લૉગિન કરો" : "Sign In"}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        aria-label={lang === "gu" ? "મારું એકાઉન્ટ" : "My Account"}
                        className="h-10 px-2.5 sm:px-3 rounded-full bg-muted/60 dark:bg-[#20211d] text-foreground border border-border flex items-center gap-2 shadow-2xs cursor-pointer hover:border-[#fdc72d] hover:bg-muted dark:hover:bg-[#282924] transition-all outline-none shrink-0 group"
                      >
                        <div className="h-7 w-7 rounded-full bg-[#fdc72d] text-[#1b1c1a] font-bold text-xs flex items-center justify-center shrink-0 aspect-square leading-none shadow-xs">
                          {userInitial}
                        </div>
                        <span className="text-xs font-bold text-foreground max-w-[120px] truncate leading-tight">
                          Hi! {displayName}
                        </span>
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-transform duration-200" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-60 p-1.5 rounded-xl bg-card dark:bg-[#181916] shadow-xl border border-border">
                      <DropdownMenuGroup>
                        <div className="px-3 py-2.5 bg-muted/40 dark:bg-[#20211d] rounded-lg mb-1 border border-border/40">
                          <p className="text-xs font-extrabold text-foreground truncate">
                            Hi! {user?.name || (lang === "gu" ? "ભક્ત" : "Devotee")}
                          </p>
                          {user?.email && (
                            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                              {user.email}
                            </p>
                          )}
                        </div>

                        <DropdownMenuItem asChild className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5 font-bold text-[#8a6800] dark:text-[#fdc72d] bg-[#fdc72d]/10 rounded-lg mb-1">
                          <Link href="/dashboard" className="flex items-center gap-2.5 w-full">
                            <LayoutDashboard className="h-3.5 w-3.5 shrink-0" />
                            <span>{lang === "gu" ? "ડેશબોર્ડ" : "Dashboard"}</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5 text-foreground hover:bg-muted rounded-lg mb-1">
                          <Link href="/dashboard/orders" className="flex items-center gap-2.5 w-full">
                            <ShoppingBag className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <span>{lang === "gu" ? "મારા ઓર્ડર્સ" : "My Orders"}</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5 text-foreground hover:bg-muted rounded-lg mb-1">
                          <Link href="/dashboard/kundli" className="flex items-center gap-2.5 w-full">
                            <Sparkles className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <span>{lang === "gu" ? "કુંડળી સંગ્રહ" : "Kundli Vault"}</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5 text-foreground hover:bg-muted rounded-lg mb-1">
                          <Link href="/dashboard/addresses" className="flex items-center gap-2.5 w-full">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <span>{lang === "gu" ? "સાચવેલા સરનામાં" : "Saved Addresses"}</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="cursor-pointer text-xs py-2 px-2.5 flex items-center gap-2.5 text-foreground hover:bg-muted rounded-lg">
                          <Link href="/dashboard/settings" className="flex items-center gap-2.5 w-full">
                            <Settings className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <span>{lang === "gu" ? "સેટિંગ્સ & પ્રોફાઇલ" : "Settings & Profile"}</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator className="my-1 bg-border/60" />

                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer text-xs py-2 px-2.5 text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2.5 font-bold"
                        >
                          <LogOut className="h-3.5 w-3.5 shrink-0" />
                          <span>{lang === "gu" ? "લૉગ આઉટ કરો" : "Sign Out"}</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <Separator orientation="vertical" className="h-5 hidden md:block bg-border/60 mx-0.5" />

              {/* Bilingual Switcher (Desktop Only: md+) */}
              <div className="hidden md:inline-flex bg-muted/70 dark:bg-[#1e1f1b] p-0.5 sm:p-1 rounded-xl border border-border/60 shadow-2xs items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => handleLangChange("gu")}
                  aria-label="ગુજરાતી ભાષા"
                  className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${lang === "gu"
                    ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                    : "text-[#1b1c1a]/75 dark:text-white/75 hover:text-foreground"
                    }`}
                >
                  ગુજ
                </button>
                <button
                  type="button"
                  onClick={() => handleLangChange("en")}
                  aria-label="English Language"
                  className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${lang === "en"
                    ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                    : "text-[#1b1c1a]/75 dark:text-white/75 hover:text-foreground"
                    }`}
                >
                  EN
                </button>
              </div>

              {/* Dark / Light Mode Toggle (Desktop Only: md+) */}
              <div className="hidden md:inline-flex">
                <ThemeToggle />
              </div>

              {/* Mobile Menu Hamburger Button (<md Only) */}
              <SheetTrigger
                className="md:hidden h-10 w-10 flex items-center justify-center rounded-xl border-2 border-[#fdc72d]/70 text-foreground hover:bg-[#fdc72d]/10 dark:hover:bg-[#fdc72d]/15 transition-colors cursor-pointer shrink-0 ml-0.5"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </SheetTrigger>
            </div>
          </div>
        </div>

        {/* 2ND LAYER: PRIMARY BRAND NAVIGATION IN SACRED SAFFRON (#fdc72d) - DESKTOP ONLY */}
        <div className="hidden md:block bg-[#fdc72d] text-[#1b1c1a] px-2 sm:px-4 lg:px-6 border-t border-b border-[#e5b220] shadow-sm relative">
          <div className="max-w-7xl mx-auto relative flex items-center">
            {/* Left Smooth Scroll Arrow Button */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollNav("left")}
                aria-label="Scroll navigation left"
                className="absolute left-0 z-20 h-full px-1.5 bg-gradient-to-r from-[#fdc72d] via-[#fdc72d]/95 to-transparent flex items-center justify-center text-[#1b1c1a] hover:opacity-80 cursor-pointer transition-opacity"
              >
                <div className="p-1 rounded-full bg-[#1b1c1a]/10 hover:bg-[#1b1c1a]/20">
                  <ChevronLeft className="h-4 w-4" />
                </div>
              </button>
            )}

            {/* Navigation Strip with Smooth Horizontal Scroll and Generous Right Breathing Room */}
            <nav
              ref={navScrollRef}
              aria-label="Main Navigation"
              className="flex items-center gap-1 lg:gap-1.5 xl:gap-2 overflow-x-auto py-2 xl:py-2.5 pr-8 sm:pr-10 lg:pr-4 scrollbar-none w-full scroll-smooth"
            >
              {navLinks.map((item) => {
                const isActive = checkIsActive(item)
                const subItems = getSubItems(item)
                const hasSub = Boolean(item.hasSubmenu && subItems.length > 0)

                if (hasSub) {
                  return (
                    <DropdownMenu key={item.id}>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className={`group px-2.5 lg:px-3 xl:px-3.5 py-1.5 xl:py-2 text-xs lg:text-[13px] xl:text-sm whitespace-nowrap rounded-lg font-bold transition-all flex items-center gap-1 lg:gap-1.5 shrink-0 cursor-pointer ${isActive
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
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                asChild
                                className="cursor-pointer text-xs font-bold py-2 px-2.5 flex items-center justify-between text-[#8a6800] dark:text-[#fdc72d] rounded-lg"
                              >
                                <Link
                                  href={getItemHref(item.id)}
                                  onClick={() => onSelectCategory && onSelectCategory(item.id)}
                                  className="flex items-center justify-between w-full"
                                >
                                  <span>{item.label} ({lang === "gu" ? "મુખ્ય પૃષ્ઠ" : "Main Overview"})</span>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuGroup>
                          {subItems.map((sub, idx) => (
                            <DropdownMenuItem
                              key={idx}
                              asChild
                              className="cursor-pointer text-xs py-2 px-2.5 flex items-center justify-between font-medium text-foreground hover:bg-muted rounded-lg"
                            >
                              <Link href={sub.href} className="flex items-center justify-between w-full">
                                <span className="truncate pr-2">{sub.label[lang] || sub.label.gu}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                }

                // Single route: direct navigation with Next.js Link tag
                return (
                  <Link
                    key={item.id}
                    href={getItemHref(item.id)}
                    onClick={() => onSelectCategory && onSelectCategory(item.id)}
                    className={`px-2.5 lg:px-3 xl:px-3.5 py-1.5 xl:py-2 text-xs lg:text-[13px] xl:text-sm whitespace-nowrap rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer ${isActive
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
                  </Link>
                )
              })}
            </nav>

            {/* Right Smooth Scroll Arrow Button / Visual Cue */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollNav("right")}
                aria-label="Scroll navigation right"
                className="absolute right-0 z-20 h-full px-1.5 bg-gradient-to-l from-[#fdc72d] via-[#fdc72d]/95 to-transparent flex items-center justify-center text-[#1b1c1a] hover:opacity-80 cursor-pointer transition-opacity"
              >
                <div className="p-1 rounded-full bg-[#1b1c1a]/10 hover:bg-[#1b1c1a]/20">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Drawer via shadcn SheetContent */}
        <SheetContent
          side="left"
          showCloseButton={true}
          className="w-[84vw] max-w-xs sm:w-80 h-[100dvh] max-h-[100dvh] p-0 flex flex-col justify-between border-r border-border/80 bg-card dark:bg-[#181916] text-foreground shadow-2xl"
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
                <SheetTitle className="text-base font-extrabold text-foreground tracking-tight">
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

          {/* 2. Drawer Body (Language + Theme + Quick Actions + Navigation links) */}
          <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-3.5 overscroll-contain scrollbar-thin">
            {/* Language Switcher & Theme Toggle in Drawer */}
            <div className="flex items-center justify-between bg-muted/40 dark:bg-[#20211d] p-1.5 rounded-xl border border-border/60">
              <div className="bg-white dark:bg-[#1a1b18] p-1 rounded-xl border border-border/50 shadow-xs inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleLangChange("gu")}
                  aria-label="ગુજરાતી ભાષા"
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${lang === "gu"
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
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${lang === "en"
                    ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                    : "text-[#1b1c1a]/75 dark:text-white/75 hover:text-foreground hover:bg-muted/40"
                    }`}
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle in drawer */}
              <div className="flex items-center gap-2 pr-1">
                <span className="text-[11px] text-muted-foreground font-semibold">
                  {lang === "gu" ? "થીમ:" : "Theme:"}
                </span>
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Quick Action Buttons: Dashboard & Store / Sign In */}
            {mounted && isAuthenticated ? (
              <div className="flex flex-col gap-2 p-3 rounded-xl bg-muted/40 dark:bg-[#20211d] border border-border/50">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-[#fdc72d] text-[#1b1c1a] font-bold text-xs flex items-center justify-center shrink-0 aspect-square leading-none">
                    {userInitial}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-foreground truncate">Hi! {displayName}</span>
                    {user?.email && <span className="text-[10px] text-muted-foreground truncate">{user.email}</span>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/40">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center p-2 rounded-lg bg-card dark:bg-[#1a1b18] text-xs font-bold text-foreground hover:bg-muted transition-colors gap-1.5"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
                    <span>{lang === "gu" ? "ડેશબોર્ડ" : "Dashboard"}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                    className="flex items-center justify-center p-2 rounded-lg bg-card dark:bg-[#1a1b18] text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors gap-1.5"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>{lang === "gu" ? "લૉગ આઉટ" : "Sign Out"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center p-2.5 rounded-xl bg-[#00685d] text-white text-xs font-bold hover:bg-[#005048] transition-colors gap-2 cursor-pointer shadow-xs"
                >
                  <LogIn className="h-4 w-4" />
                  <span>{lang === "gu" ? "લૉગિન કરો" : "Sign In"}</span>
                </Link>
                <Link
                  href="/myshop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center p-2.5 rounded-xl bg-muted/40 dark:bg-[#20211d] border border-border/50 text-xs font-bold text-foreground hover:bg-muted transition-colors gap-2 cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                  <span>{lang === "gu" ? "સ્ટોર" : "Store"}</span>
                </Link>
              </div>
            )}

            <Separator className="my-1 bg-border/50" />

            {/* Navigation Items List with Expandable Submenus */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-black tracking-wider text-muted-foreground px-2 pb-0.5">
                {lang === "gu" ? "મુખ્ય વિભાગો" : "Categories"}
              </div>
              {navLinks.map((item) => {
                const isActive = checkIsActive(item)
                const subItems = getSubItems(item)
                const hasSub = item.hasSubmenu && subItems.length > 0
                const isExpanded = expandedCategory === item.id

                if (hasSub) {
                  return (
                    <div key={item.id} className="rounded-xl overflow-hidden border border-border/50 bg-muted/20 dark:bg-[#1a1b18]/60 transition-all">
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className={`w-full text-left py-2.5 px-3 text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${isActive
                          ? "text-[#8a6800] dark:text-[#fdc72d]"
                          : "text-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d]"
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#8a6800] dark:text-[#fdc72d]" : "text-muted-foreground"
                            }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-2 pb-2 pt-1 border-t border-border/40 bg-background/60 dark:bg-[#151613] space-y-1">
                          {item.id !== "more" && (
                            <Link
                              href={getItemHref(item.id)}
                              onClick={() => {
                                if (onSelectCategory) onSelectCategory(item.id)
                                setMobileMenuOpen(false)
                              }}
                              className="w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:bg-muted/60 flex items-center justify-between cursor-pointer"
                            >
                              <span>{item.label} ({lang === "gu" ? "મુખ્ય પૃષ્ઠ" : "Main Overview"})</span>
                            </Link>
                          )}
                          {subItems.map((sub, idx) => (
                            <Link
                              key={idx}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-between cursor-pointer"
                            >
                              <span className="truncate pr-2">{sub.label[lang] || sub.label.gu}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                // Single route item (no submenu, no arrow) with Next.js Link tag
                return (
                  <Link
                    key={item.id}
                    href={getItemHref(item.id)}
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer min-h-[42px] ${isActive
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
                  </Link>
                )
              })}
            </div>
          </div>

          {/* 3. Drawer Footer: Consultation & WhatsApp Action */}
          <SheetFooter className="p-4 pb-8 sm:pb-6 pb-safe-generous border-t border-border/70 bg-muted/20 dark:bg-[#151613] space-y-2.5 shrink-0">
            <button
              type="button"
              className="w-full bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-extrabold h-10 rounded-lg text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              onClick={() => {
                setMobileMenuOpen(false)
                window.open(
                  getWhatsAppUrl(
                    lang === "gu"
                      ? "જય શ્રી કૃષ્ણ, મને જ્યોતિષ પરામર્શ માટે સમય આપશો."
                      : "Hello, I would like to book an astrology consultation."
                  ),
                  "_blank"
                )
              }}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{topBar?.bookConsultation || (lang === "gu" ? "પરામર્શ બુક કરો" : "Book Consultation")}</span>
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
