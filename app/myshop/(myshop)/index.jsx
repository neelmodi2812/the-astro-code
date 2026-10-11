"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Gem,
  CircleDot,
  Pyramid,
  Diamond,
  Shield,
  Droplets,
  Flame,
  FileCheck,
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Check,
  Search,
  Filter,
  ArrowRight,
  Phone,
  MessageSquare,
  MessageCircle,
  ExternalLink,
  X,
  ChevronRight,
  Eye,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  ArrowUpDown,
  Home,
  CheckCircle,
  Clock,
  HelpCircle
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { toast } from "@/components/ui/sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAstroData } from "@/lib/data/astro-data"
import { getShopData } from "@/lib/data/shop-data"
import { useLanguage } from "@/components/language-provider"

// Helper map to dynamically render Lucide icons by name
const ICON_MAP = {
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Gem,
  CircleDot,
  Sparkles,
  Pyramid,
  Diamond,
  Shield,
  Droplets,
  Flame,
  FileCheck,
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Phone,
  MessageSquare,
  MessageCircle
}

export default function ShopClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()

  // Dynamic localization states
  const [siteData, setSiteData] = React.useState(() => getAstroData(lang))
  const [shopData, setShopData] = React.useState(() => getShopData(lang))

  React.useEffect(() => {
    setSiteData(getAstroData(lang))
    setShopData(getShopData(lang))
  }, [lang])

  // Filter, Search and Sorting States
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [selectedPurpose, setSelectedPurpose] = React.useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("popular")
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 6

  // Cart & Wishlist States
  const [cart, setCart] = React.useState([])
  const [wishlist, setWishlist] = React.useState({})
  const [addedAnimationId, setAddedAnimationId] = React.useState(null)

  // Quick View & Order Modal State
  const [activeModalProduct, setActiveModalProduct] = React.useState(null)
  const [modalQty, setModalQty] = React.useState(1)
  const [orderName, setOrderName] = React.useState("")
  const [orderPhone, setOrderPhone] = React.useState("")
  const [orderAddress, setOrderAddress] = React.useState("")
  const [orderSuccess, setOrderSuccess] = React.useState(false)

  // Category Icon helper
  const renderCategoryIcon = (iconName, className = "h-5 w-5") => {
    const IconComponent = ICON_MAP[iconName] || Gem
    return <IconComponent className={className} />
  }

  // Toast Notification handler
  const showToast = (message) => {
    toast.success(message)
  }

  // Add to Cart handler
  const handleAddToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        )
      }
      return [...prev, { product, qty }]
    })

    try {
      const stored = localStorage.getItem("astro_cart_items")
      let items = stored ? JSON.parse(stored) : []
      if (!Array.isArray(items)) items = []
      const existingIdx = items.findIndex((i) => i.productId === product.id || i.id === product.id)
      if (existingIdx >= 0) {
        items[existingIdx].qty = (items[existingIdx].qty || 1) + qty
      } else {
        items.push({
          id: `cart-${product.id}`,
          productId: product.id,
          name: product.name,
          subtitle: product.subtitle || "",
          badge: product.badge || "",
          image: product.image,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          qty: qty,
          ritualAddon: lang === "gu" ? "વૈદિક પ્રાણ-પ્રતિષ્ઠા સામેલ" : "Vedic Consecration Included",
          category: product.category || "all"
        })
      }
      localStorage.setItem("astro_cart_items", JSON.stringify(items))
    } catch {
      // ignore
    }

    setAddedAnimationId(product.id)
    setTimeout(() => {
      setAddedAnimationId(null)
    }, 1800)

    toast.success(
      lang === "gu"
        ? `"${product.name}" કાર્ટમાં સફળતાપૂર્વક ઉમેરાયું!`
        : `"${product.name}" added to cart successfully!`,
      {
        action: {
          label: lang === "gu" ? "કાર્ટ જુઓ →" : "View Cart →",
          onClick: () => router.push("/myshop/cart")
        }
      }
    )
  }

  // Toggle Wishlist handler
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = { ...prev, [productId]: !prev[productId] }
      if (next[productId]) {
        toast.success(lang === "gu" ? "વિશલિસ્ટમાં ઉમેરાયું!" : "Added to Wishlist!")
      } else {
        toast.info(lang === "gu" ? "વિશલિસ્ટમાંથી દૂર કરાયું." : "Removed from Wishlist.")
      }
      return next
    })
  }

  // Quick Category selection with smooth scroll to catalog
  const handleCategoryPillClick = (catId) => {
    setSelectedCategory(catId)
    setCurrentPage(1)
    const catalogEl = document.getElementById("shop-catalog-section")
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("all")
    setSelectedPurpose("all")
    setSelectedPriceRange("all")
    setSearchQuery("")
    setSortBy("popular")
    setCurrentPage(1)
  }

  // Filtered and Sorted Products computation
  const filteredProducts = React.useMemo(() => {
    let list = [...shopData.products]

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          (p.details && p.details.toLowerCase().includes(q))
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory)
    }

    // Purpose filter
    if (selectedPurpose !== "all") {
      list = list.filter((p) => p.purpose === selectedPurpose)
    }

    // Price range filter
    if (selectedPriceRange !== "all") {
      const range = shopData.sidebar.priceRanges.find(
        (r) => r.id === selectedPriceRange
      )
      if (range) {
        list = list.filter((p) => p.price >= range.min && p.price <= range.max)
      }
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "newest") {
      list.reverse()
    }

    return list
  }, [
    shopData.products,
    shopData.sidebar.priceRanges,
    searchQuery,
    selectedCategory,
    selectedPurpose,
    selectedPriceRange,
    sortBy
  ])

  // Pagination calculation
  const totalItems = filteredProducts.length
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1
  const paginatedProducts = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  // Direct WhatsApp Checkout for Modal
  const handleModalWhatsAppOrder = () => {
    if (!activeModalProduct) return
    const text = encodeURIComponent(
      lang === "gu"
        ? `જય શ્રી કૃષ્ણ ડૉ. વિશાલ મોદી,\nહું MyShop પરથી "${activeModalProduct.name}" (જથ્થો: ${modalQty}) મંગાવવા માંગુ છું.\nકિંમત: ₹${activeModalProduct.price * modalQty}\nનામ: ${orderName || "ગ્રાહક"}\nફોન: ${orderPhone || "N/A"}\nસરનામું: ${orderAddress || "N/A"}`
        : `Namaste Dr. Vishal Modi,\nI would like to order "${activeModalProduct.name}" (Quantity: ${modalQty}) from MyShop.\nPrice: ₹${activeModalProduct.price * modalQty}\nName: ${orderName || "Customer"}\nPhone: ${orderPhone || "N/A"}\nAddress: ${orderAddress || "N/A"}`
    )
    window.open(`https://wa.me/919825000000?text=${text}`, "_blank")
    setOrderSuccess(true)
    setTimeout(() => {
      setOrderSuccess(false)
      setActiveModalProduct(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      {/* 1. Global Astro Header with Live Cart Count */}
      <AstroHeader
        config={siteData.config}
        topBar={siteData.topBar}
        navLinks={siteData.navLinks}
        activeCategory="myshop"
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
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
      />

      <main className="flex-1 w-full bg-background">
        {/* 2. BREADCRUMBS & TOP TRUST HIGHLIGHTS BAR */}
        <section className="w-full bg-[#f0f4f7] dark:bg-[#181a17] py-2.5 border-b border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <Breadcrumb className="self-start sm:self-auto">
              <BreadcrumbList className="text-xs font-medium">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors flex items-center gap-1"
                    >
                      <Home className="h-3.5 w-3.5 text-[#00685d] dark:text-[#fdc72d]" />
                      <span>{shopData.breadcrumb.home}</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#00685d] dark:text-[#fdc72d] font-bold">
                    {shopData.breadcrumb.shop}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-3 sm:gap-4 font-semibold text-[11px] sm:text-xs text-[#00685d] dark:text-[#6ed8c8] self-start sm:self-auto">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#fdc72d]" />
                <span>{shopData.topTrustBar.consecrated}</span>
              </span>
              <span className="hidden sm:inline text-muted-foreground/40">•</span>
              <span className="hidden sm:inline text-muted-foreground">
                {shopData.topTrustBar.shipping}
              </span>
            </div>
          </div>
        </section>

        {/* 3. STORE SACRED HERO BANNER */}
        <section className="w-full relative overflow-hidden bg-gradient-to-r from-[#00685d] via-[#007b6e] to-[#008376] text-white py-10 sm:py-14 shadow-md">
          {/* Ambient luminous decorative glow blurs */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-[#fdc72d]/15 blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 -top-20 w-80 h-80 rounded-full bg-[#6ed8c8]/15 blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="max-w-2xl space-y-4 text-left">
              {/* Sacred Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#fdc72d] text-xs font-bold border border-white/20 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#fdc72d]" />
                <span>{shopData.hero.badge}</span>
              </div>

              {/* Dominant Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                {shopData.hero.title}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
                {shopData.hero.subtitle}
              </p>

              {/* Interactive Purpose Search Ribbon */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-xl">
                <div className="relative w-full flex items-center">
                  <Search className="h-4 w-4 absolute left-3.5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    placeholder={shopData.hero.searchPlaceholder}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white text-[#1b1c1a] placeholder:text-muted-foreground text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-[#fdc72d] border-none shadow-md"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 text-muted-foreground hover:text-[#1b1c1a]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("shop-catalog-section")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full sm:w-auto px-5 h-11 rounded-xl bg-[#fdc72d] text-[#1b1c1a] font-bold text-xs sm:text-sm hover:bg-[#e6b11d] shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>{shopData.hero.searchButton}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sacred Sri Siddhi Kavacham Emblem Motif */}
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white/10 backdrop-blur-md p-3.5 flex items-center justify-center shadow-2xl border border-white/20 ring-4 ring-[#fdc72d]/30">
                <div className="w-full h-full rounded-full bg-[#00685d]/60 border border-[#fdc72d]/40 p-5 flex flex-col items-center justify-center text-center space-y-2">
                  <svg
                    className="w-20 h-20 text-[#fdc72d]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 100 100"
                  >
                    <polygon fill="none" opacity="0.9" points="50,5 95,78 5,78" />
                    <polygon fill="none" opacity="0.9" points="50,95 95,22 5,22" />
                    <circle cx="50" cy="50" fill="currentColor" fillOpacity="0.18" r="16" />
                    <circle cx="50" cy="50" fill="currentColor" r="4" />
                  </svg>
                  <span className="text-sm font-extrabold text-[#fdc72d] tracking-wide">
                    {shopData.hero.sealTitle}
                  </span>
                  <span className="text-[10px] text-white/80 uppercase font-bold tracking-widest">
                    {shopData.hero.sealSubtitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRUST BADGES ROW (4 Authentic Guarantees) */}
        <section className="w-full bg-card dark:bg-[#1a1b18] shadow-xs border-b border-border/60 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {shopData.trustBadges.map((badge) => {
              const IconComp = ICON_MAP[badge.icon] || ShieldCheck
              return (
                <div
                  key={badge.id}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f0f4f7] dark:bg-[#222420] border border-border/40 hover:border-[#00685d]/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#00685d]/10 dark:bg-[#00685d]/25 text-[#00685d] dark:text-[#6ed8c8] flex items-center justify-center shrink-0">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-xs font-bold text-foreground truncate">{badge.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{badge.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 5. QUICK ACCESS CATEGORY ICONS ROW */}
        <section className="w-full bg-background py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                <span>{shopData.quickCategoriesTitle}</span>
              </h2>
              <button
                type="button"
                onClick={() => handleCategoryPillClick("all")}
                className="text-xs font-bold text-[#00685d] dark:text-[#fdc72d] hover:underline cursor-pointer"
              >
                {shopData.viewAllCategories}
              </button>
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {shopData.quickCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id
                return (
                  <Link
                    key={cat.id}
                    href={`/myshop/${cat.id}`}
                    className={`group flex flex-col items-center p-3.5 sm:p-4 rounded-xl border transition-all text-center cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.02] ${
                      isSelected
                        ? "bg-[#00685d] text-white border-[#00685d] shadow-md scale-[1.02]"
                        : "bg-card dark:bg-[#1a1b18] hover:bg-[#f0f4f7] dark:hover:bg-[#222420] border-border/80 text-foreground"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors mb-2.5 ${
                        isSelected
                          ? "bg-white/20 text-[#fdc72d]"
                          : "bg-[#00685d]/10 text-[#00685d] dark:bg-[#00685d]/25 dark:text-[#6ed8c8] group-hover:bg-[#00685d] group-hover:text-white"
                      }`}
                    >
                      {renderCategoryIcon(cat.icon, "h-5 w-5")}
                    </div>
                    <span className="text-xs sm:text-sm font-bold block truncate w-full">
                      {cat.name}
                    </span>
                    <span
                      className={`text-[10px] block mt-0.5 ${
                        isSelected ? "text-white/80" : "text-muted-foreground"
                      }`}
                    >
                      {cat.subtitle}
                    </span>
                    <span className={`text-[9px] mt-1.5 font-bold flex items-center gap-0.5 ${
                      isSelected ? "text-[#fdc72d]" : "text-[#00685d] dark:text-[#fdc72d] opacity-0 group-hover:opacity-100 transition-opacity"
                    }`}>
                      {lang === "gu" ? "જુઓ" : "View"} <ArrowRight className="h-2.5 w-2.5" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>


        {/* 6. TWO-COLUMN ECOMMERCE CATALOG (25% Sidebar + 75% Main Content) */}
        <section id="shop-catalog-section" className="w-full bg-background pb-14 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            {/* LEFT SIDEBAR: FILTERS, ACCREDITATION & ASTROLOGY (25%) */}
            <aside className="w-full lg:w-1/4 flex flex-col gap-5 shrink-0">
              {/* Category Filter Card */}
              <Card className="rounded-xl border border-border/80 shadow-xs bg-card dark:bg-[#1a1b18] overflow-hidden py-0 gap-0">
                <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b border-border/50">
                  <CardTitle className="text-sm font-bold flex items-center gap-1.5 text-foreground">
                    <Filter className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                    <span>{shopData.sidebar.categoryFilterTitle}</span>
                  </CardTitle>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[11px] font-bold text-[#00685d] dark:text-[#fdc72d] hover:underline cursor-pointer"
                  >
                    {shopData.sidebar.reset}
                  </button>
                </CardHeader>
                <CardContent className="p-2 space-y-0.5">
                  {shopData.sidebar.categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id)
                          setCurrentPage(1)
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#00685d] text-white shadow-2xs font-bold"
                            : "hover:bg-muted text-foreground/80 hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          {isSelected ? (
                            <CircleDot className="h-3.5 w-3.5 text-[#fdc72d] shrink-0" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-muted-foreground/40 shrink-0" />
                          )}
                          <span className="truncate">{cat.label}</span>
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-bold ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Purpose / Benefit Filter Card */}
              <Card className="rounded-xl border border-border/80 shadow-xs bg-card dark:bg-[#1a1b18] overflow-hidden py-0 gap-0">
                <CardHeader className="py-3 px-4 border-b border-border/50">
                  <CardTitle className="text-sm font-bold flex items-center gap-1.5 text-foreground">
                    <Sparkles className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <span>{shopData.sidebar.purposeFilterTitle}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <Tabs
                    value={selectedPurpose}
                    onValueChange={(val) => {
                      setSelectedPurpose(val)
                      setCurrentPage(1)
                    }}
                    className="w-full"
                  >
                    <TabsList className="flex flex-wrap group-data-horizontal/tabs:h-auto h-auto gap-1.5 bg-transparent p-0 justify-start w-full">
                      {shopData.sidebar.purposes.map((purpose) => (
                        <TabsTrigger
                          key={purpose.id}
                          value={purpose.id}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold data-active:bg-[#00685d] data-active:text-white data-active:shadow-2xs text-foreground/80 bg-muted hover:bg-muted/80 cursor-pointer"
                        >
                          {purpose.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Price Range Filter Card */}
              <Card className="rounded-xl border border-border/80 shadow-xs bg-card dark:bg-[#1a1b18] overflow-hidden py-0 gap-0">
                <CardHeader className="py-3 px-4 border-b border-border/50">
                  <CardTitle className="text-sm font-bold flex items-center gap-1.5 text-foreground">
                    <Award className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                    <span>{shopData.sidebar.priceFilterTitle}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <RadioGroup
                    value={selectedPriceRange}
                    onValueChange={(val) => {
                      setSelectedPriceRange(val)
                      setCurrentPage(1)
                    }}
                    className="gap-1.5"
                  >
                    <label
                      htmlFor="price-all"
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted cursor-pointer text-xs transition-colors"
                    >
                      <RadioGroupItem value="all" id="price-all" />
                      <span className={selectedPriceRange === "all" ? "font-bold text-[#00685d] dark:text-[#fdc72d]" : ""}>
                        {lang === "gu" ? "બધી કિંમતો (All)" : "All Prices"}
                      </span>
                    </label>
                    {shopData.sidebar.priceRanges.map((r) => (
                      <label
                        key={r.id}
                        htmlFor={`price-${r.id}`}
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted cursor-pointer text-xs transition-colors"
                      >
                        <RadioGroupItem value={r.id} id={`price-${r.id}`} />
                        <span className={selectedPriceRange === r.id ? "font-bold text-[#00685d] dark:text-[#fdc72d]" : ""}>
                          {r.label}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Authenticity Certificate Box */}
              <div className="bg-gradient-to-br from-[#f0f4f7] to-[#e4e9ed] dark:from-[#20221e] dark:to-[#171815] rounded-xl p-4 border border-border/70 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2 text-[#00685d] dark:text-[#6ed8c8]">
                  <ShieldCheck className="h-5 w-5" />
                  <h4 className="text-xs sm:text-sm font-extrabold text-foreground">
                    {shopData.sidebar.authenticityCard.title}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {shopData.sidebar.authenticityCard.desc}
                </p>
                <div className="bg-card dark:bg-[#272924] p-2.5 rounded-lg flex items-center justify-between border border-border/50">
                  <div>
                    <p className="text-[10px] text-[#8a6800] dark:text-[#fdc72d] font-bold">
                      {shopData.sidebar.authenticityCard.approvedBy}
                    </p>
                    <p className="text-xs font-bold text-foreground">
                      {shopData.sidebar.authenticityCard.astrologer}
                    </p>
                  </div>
                  <Award className="h-5 w-5 text-[#fdc72d]" />
                </div>
              </div>

              {/* Astrological Assistance Card */}
              <div className="bg-gradient-to-br from-[#00685d] to-[#004e46] text-white rounded-xl p-4 shadow-md text-center space-y-2.5">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#fdc72d] text-[#1b1c1a] flex items-center justify-center font-bold">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {shopData.sidebar.helpCard.title}
                </h4>
                <p className="text-[11px] text-white/80 leading-relaxed">
                  {shopData.sidebar.helpCard.desc}
                </p>
                <Button
                  type="button"
                  onClick={() => router.push("/contact-us")}
                  className="w-full py-2 bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318] text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {shopData.sidebar.helpCard.cta}
                </Button>
              </div>
            </aside>

            {/* RIGHT MAIN CONTENT: SHOWCASE & CATALOG GRID (75%) */}
            <main className="w-full lg:w-3/4 flex flex-col gap-6">
              {/* Filter Bar & Sort Controls */}
              <div className="bg-card dark:bg-[#1a1b18] rounded-xl p-3.5 sm:p-4 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    {shopData.catalogSection.totalProductsPrefix} {filteredProducts.length}{" "}
                    {shopData.catalogSection.totalProductsSuffix}
                  </span>
                  <Badge variant="outline" className="text-[10px] bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8] border-[#00685d]/30 font-bold">
                    {shopData.catalogSection.liveStockBadge}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {shopData.catalogSection.sortByLabel}
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-9 min-w-[150px] bg-muted text-foreground text-xs font-medium border-border/80">
                      <SelectValue placeholder={shopData.catalogSection.sortByLabel} />
                    </SelectTrigger>
                    <SelectContent align="end">
                      {shopData.catalogSection.sortOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs font-medium">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* DOMINANT FEATURED PRODUCT SHOWCASE CARD (Nepali 5-Mukhi Rudraksha Mala) */}
              {selectedCategory === "all" && !searchQuery && (
                <Card className="p-0 py-0 gap-0 rounded-2xl border border-border/80 shadow-md overflow-hidden bg-card dark:bg-[#1a1b18]">
                  <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                    {/* Featured Image Pane */}
                    <Link
                      href={`/myshop/product/${shopData.featuredProduct.id}`}
                      className="md:col-span-5 relative min-h-[260px] md:min-h-[320px] bg-muted overflow-hidden block group"
                    >
                      <Image
                        src={shopData.featuredProduct.image}
                        alt={shopData.featuredProduct.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 42vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <Badge className="bg-[#fdc72d] text-[#1b1c1a] font-bold text-[11px] shadow-xs hover:bg-[#fdc72d]">
                          {shopData.featuredProduct.badge}
                        </Badge>
                        <Badge className="bg-[#bb171f] text-white font-bold text-[11px] shadow-xs hover:bg-[#bb171f]">
                          {shopData.featuredProduct.discount}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-[#1b1c1a]/95 backdrop-blur-md px-3 py-1 rounded-full text-[#00685d] dark:text-[#6ed8c8] text-[11px] font-bold flex items-center gap-1 shadow-sm">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#00685d] dark:text-[#fdc72d]" />
                        <span>{shopData.featuredProduct.originBadge}</span>
                      </div>
                    </Link>

                    {/* Featured Details Pane */}
                    <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Rating row */}
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="flex items-center text-[#fdc72d]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-foreground">
                            {shopData.featuredProduct.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({shopData.featuredProduct.reviewsCount})
                          </span>
                        </div>

                        <Link href={`/myshop/product/${shopData.featuredProduct.id}`}>
                          <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors">
                            {shopData.featuredProduct.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-[#8a6800] dark:text-[#fdc72d] font-semibold mt-0.5">
                          {shopData.featuredProduct.subtitle}
                        </p>

                        {/* Sacred USPs */}
                        <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-muted-foreground">
                          {shopData.featuredProduct.usps.map((usp, idx) => {
                            const IconC = ICON_MAP[usp.icon] || Droplets
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 bg-[#f0f4f7] dark:bg-[#222420] p-2 rounded-lg"
                              >
                                <IconC className="h-3.5 w-3.5 text-[#00685d] dark:text-[#6ed8c8] shrink-0" />
                                <span className="truncate">{usp.text}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Price & Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#f0f4f7] dark:bg-[#222420] p-3 sm:p-4 rounded-xl border border-border/50">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-[#00685d] dark:text-[#6ed8c8]">
                              ₹{shopData.featuredProduct.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{shopData.featuredProduct.originalPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#8a6800] dark:text-[#fdc72d] font-bold">
                            {shopData.featuredProduct.savingsText}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Button
                            type="button"
                            onClick={() => handleAddToCart(shopData.featuredProduct)}
                            className="flex-1 sm:flex-none px-4 h-10 rounded-lg bg-[#fdc72d] text-[#1b1c1a] font-bold text-xs hover:bg-[#eab318] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {addedAnimationId === shopData.featuredProduct.id ? (
                              <>
                                <Check className="h-4 w-4" />
                                <span>{lang === "gu" ? "ઉમેરાયું!" : "Added!"}</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4" />
                                <span>{shopData.featuredProduct.addToCart}</span>
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            onClick={() => router.push(`/myshop/product/${shopData.featuredProduct.id}`)}
                            className="flex-1 sm:flex-none px-4 h-10 rounded-lg bg-[#00685d] text-white font-bold text-xs hover:bg-[#005048] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                            <span>{lang === "gu" ? "વિગતવાર પૃષ્ઠ →" : "View Details →"}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* CATALOG GRID HEADER */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-[#fdc72d] rounded-xs" />
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {shopData.catalogSection.title}
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {shopData.catalogSection.subtitle}
                </span>
              </div>

              {/* PRODUCTS CATALOG GRID */}
              {paginatedProducts.length === 0 ? (
                <div className="bg-card dark:bg-[#1a1b18] rounded-xl p-10 text-center border border-border/80 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <Search className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">
                    {lang === "gu"
                      ? "આ ફિલ્ટરમાં કોઈ ઉત્પાદન મળ્યું નથી"
                      : "No products match this filter"}
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    {lang === "gu"
                      ? "કૃપા કરીને અન્ય કેટેગરી અથવા કિંમત શ્રેણી પસંદ કરો, અથવા ફિલ્ટર રીસેટ કરો."
                      : "Please try another category or price range, or reset your filters."}
                  </p>
                  <Button
                    type="button"
                    onClick={handleResetFilters}
                    className="bg-[#00685d] text-white text-xs font-bold"
                  >
                    {shopData.sidebar.reset}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedProducts.map((product) => {
                    const isWishlisted = !!wishlist[product.id]
                    const isJustAdded = addedAnimationId === product.id

                    return (
                      <Card
                        key={product.id}
                        onClick={() => router.push(`/myshop/product/${product.id}`)}
                        className="p-0 py-0 gap-0 rounded-xl overflow-hidden border border-border/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group bg-card dark:bg-[#1a1b18] cursor-pointer"
                      >
                        {/* Image Pane */}
                        <div className="relative h-52 bg-muted overflow-hidden">
                          <Link href={`/myshop/product/${product.id}`} className="block w-full h-full">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                          <Badge className="absolute top-2.5 left-2.5 bg-[#00685d] text-white text-[10px] font-bold shadow-xs pointer-events-none">
                            {product.badge}
                          </Badge>
                          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    router.push(`/myshop/product/${product.id}`)
                                  }}
                                  className="w-8 h-8 rounded-full bg-white/85 dark:bg-[#1b1c1a]/85 text-foreground hover:text-[#00685d] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                                  aria-label={lang === "gu" ? "વિગત જુઓ" : "View Details"}
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>{lang === "gu" ? "વિગતવાર પૃષ્ઠ જુઓ" : "View Details"}</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleWishlist(product.id)
                                  }}
                                  className={`w-8 h-8 rounded-full bg-white/85 dark:bg-[#1b1c1a]/85 flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                                    isWishlisted
                                      ? "text-[#bb171f]"
                                      : "text-muted-foreground hover:text-[#bb171f]"
                                  }`}
                                  aria-label={lang === "gu" ? "વિશલિસ્ટ" : "Wishlist"}
                                >
                                  <Heart
                                    className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
                                  />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>{isWishlisted ? (lang === "gu" ? "વિશલિસ્ટમાંથી દૂર કરો" : "Remove Wishlist") : (lang === "gu" ? "વિશલિસ્ટમાં ઉમેરો" : "Add to Wishlist")}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>

                        {/* Specs & Info */}
                        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between space-y-3">
                          <div>
                            {/* Rating Stars */}
                            <div className="flex items-center gap-1 text-[#fdc72d] mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-current" />
                              ))}
                              <span className="text-xs font-bold text-foreground ml-1">
                                {product.rating}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                ({product.reviewsCount})
                              </span>
                            </div>

                            {/* Title & Subtitle */}
                            <Link href={`/myshop/product/${product.id}`}>
                              <h4 className="text-sm font-bold text-foreground line-clamp-1 hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors">
                                {product.name}
                              </h4>
                            </Link>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {product.subtitle}
                            </p>
                          </div>

                          {/* Pricing & Add to Cart button */}
                          <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                            <div>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-base font-bold text-[#00685d] dark:text-[#6ed8c8]">
                                  ₹{product.price.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs text-muted-foreground line-through">
                                  ₹{product.originalPrice.toLocaleString("en-IN")}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#8a6800] dark:text-[#fdc72d] font-bold">
                                {product.savings}
                              </span>
                            </div>

                            <Button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleAddToCart(product)
                              }}
                              className={`px-3 h-8.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-2xs cursor-pointer ${
                                isJustAdded
                                  ? "bg-[#00685d] text-white"
                                  : "bg-[#fdc72d] text-[#1b1c1a] hover:bg-[#eab318]"
                              }`}
                            >
                              {isJustAdded ? (
                                <>
                                  <Check className="h-3.5 w-3.5" />
                                  <span>{lang === "gu" ? "ઉમેરાયું!" : "Added!"}</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="h-3.5 w-3.5" />
                                  <span>{lang === "gu" ? "કાર્ટ" : "Cart"}</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}

              {/* PAGINATION BANNER */}
              {filteredProducts.length > 0 && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-card dark:bg-[#1a1b18] p-3.5 sm:p-4 rounded-xl border border-border/80 shadow-xs">
                  <p className="text-xs text-muted-foreground">
                    {lang === "gu"
                      ? `દર્શાવવામાં આવેલ: ${(currentPage - 1) * itemsPerPage + 1} થી ${Math.min(
                          currentPage * itemsPerPage,
                          totalItems
                        )} (કુલ ${totalItems} માંથી)`
                      : `Showing: ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(
                          currentPage * itemsPerPage,
                          totalItems
                        )} of ${totalItems}`}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => {
                          setCurrentPage(page)
                          const el = document.getElementById("shop-catalog-section")
                          if (el) el.scrollIntoView({ behavior: "smooth" })
                        }}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentPage === page
                            ? "bg-[#00685d] text-white shadow-2xs"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </section>

        {/* 7. 4-STEP VEDIC AUTHENTICITY / PRAN PRATISHTHA PROCESS */}
        <section className="w-full bg-[#f0f4f7] dark:bg-[#181a17] py-12 border-t border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8] text-xs font-bold uppercase tracking-wider">
                {shopData.pranPratishthaSteps.tag}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                {shopData.pranPratishthaSteps.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {shopData.pranPratishthaSteps.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {shopData.pranPratishthaSteps.steps.map((st, idx) => {
                const stepColors = [
                  "bg-[#fdc72d] text-[#1b1c1a]",
                  "bg-[#00685d] text-white",
                  "bg-[#8a6800] text-white",
                  "bg-[#bb171f] text-white"
                ]
                return (
                  <div
                    key={idx}
                    className="bg-card dark:bg-[#20221e] p-5 rounded-xl border border-border/70 shadow-xs flex flex-col items-start space-y-2.5 relative hover:border-[#00685d]/40 transition-colors"
                  >
                    <span
                      className={`w-9 h-9 rounded-full ${stepColors[idx % 4]} text-base font-extrabold flex items-center justify-center shadow-xs`}
                    >
                      {st.num}
                    </span>
                    <h3 className="text-sm font-bold text-foreground">{st.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 8. DIRECT ASTROLOGER WHATSAPP SUPPORT BANNER */}
        <section className="w-full bg-background py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="bg-gradient-to-r from-[#00685d] via-[#007b6e] to-[#008376] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[#fdc72d] text-xs font-bold">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{shopData.astrologerCta.tag}</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-white">
                  {shopData.astrologerCta.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  {shopData.astrologerCta.desc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                <Link
                  href={shopData.astrologerCta.phoneHref}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#fdc72d] text-[#1b1c1a] font-bold text-xs sm:text-sm shadow hover:bg-[#eab318] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>{shopData.astrologerCta.phoneText}</span>
                </Link>
                <Link
                  href={shopData.astrologerCta.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-[#00685d] font-bold text-xs sm:text-sm shadow hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>{shopData.astrologerCta.whatsappText}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. PRODUCT DETAILS & DIRECT ORDER MODAL */}
      <Dialog
        open={!!activeModalProduct}
        onOpenChange={(open) => {
          if (!open) {
            setActiveModalProduct(null)
            setOrderSuccess(false)
          }
        }}
      >
        {activeModalProduct && (
          <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden rounded-2xl bg-card dark:bg-[#1a1b18] border-border/80 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <DialogHeader className="p-4 border-b border-border/60 bg-muted/30 flex-row items-center justify-between space-y-0 pr-12">
              <div className="flex items-center gap-2">
                <Badge className="bg-[#00685d] text-white text-[10px]">
                  {activeModalProduct.badge || "શુદ્ધ સાધના સામગ્રી"}
                </Badge>
                <DialogTitle className="text-xs font-bold text-foreground truncate max-w-[240px]">
                  {activeModalProduct.name}
                </DialogTitle>
              </div>
            </DialogHeader>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <DialogDescription className="sr-only">
                {activeModalProduct.subtitle || activeModalProduct.name}
              </DialogDescription>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-44 h-44 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/60 relative">
                  <Image
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-foreground">
                    {activeModalProduct.name}
                  </h3>
                  <p className="text-xs text-[#8a6800] dark:text-[#fdc72d] font-semibold">
                    {activeModalProduct.subtitle}
                  </p>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-xl font-bold text-[#00685d] dark:text-[#6ed8c8]">
                      ₹{activeModalProduct.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{activeModalProduct.originalPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {activeModalProduct.details ||
                      (lang === "gu"
                        ? "૧૦૦% શુદ્ધ, પ્રમાણિત તથા પ્રકાંડ આચાર્યો દ્વારા શાસ્ત્રોક્ત મંત્રોચ્ચારથી અભિમંત્રિત. સરકારી માન્યતા પ્રાપ્ત લેબ ટેસ્ટ સર્ટિફિકેટ સાથે ગંગાજળ સહિત સુરક્ષિત ડિલિવરી."
                        : "100% authentic, certified and energized by learned acharyas with Vedic chants. Delivered safely with government-recognized lab report and holy Gangajal.")}
                  </p>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="p-3 bg-muted/40 rounded-xl flex items-center justify-between border border-border/40">
                <span className="text-xs font-bold text-foreground">
                  {lang === "gu" ? "જથ્થો (Quantity):" : "Quantity:"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-md bg-card border text-foreground font-bold flex items-center justify-center hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{modalQty}</span>
                  <button
                    type="button"
                    onClick={() => setModalQty((q) => q + 1)}
                    className="w-7 h-7 rounded-md bg-card border text-foreground font-bold flex items-center justify-center hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick WhatsApp / Delivery Info */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-foreground">
                  {lang === "gu" ? "ઝડપી ઓર્ડર માહિતી:" : "Quick Order Info:"}
                </p>
                <Input
                  type="text"
                  placeholder={lang === "gu" ? "તમારું પૂરું નામ" : "Your Full Name"}
                  value={orderName}
                  onChange={(e) => setOrderName(e.target.value)}
                  className="h-9 text-xs"
                />
                <Input
                  type="tel"
                  placeholder={lang === "gu" ? "મોબાઈલ નંબર" : "Mobile Phone Number"}
                  value={orderPhone}
                  onChange={(e) => setOrderPhone(e.target.value)}
                  className="h-9 text-xs"
                />
                <Input
                  type="text"
                  placeholder={lang === "gu" ? "ડિલિવરી સરનામું (શહેર સહિત)" : "Delivery Address & City"}
                  value={orderAddress}
                  onChange={(e) => setOrderAddress(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              {orderSuccess && (
                <div className="p-3 bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8] text-xs font-bold rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {lang === "gu"
                      ? "ઓર્ડર વિગતો તૈયાર થઈ ગઈ છે, WhatsApp ખુલશે..."
                      : "Order details ready, opening WhatsApp..."}
                  </span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <DialogFooter className="p-4 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-2.5 -mx-0 -mb-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setActiveModalProduct(null)
                  router.push(`/myshop/product/${activeModalProduct.id}`)
                }}
                className="w-full sm:w-auto text-xs font-bold h-10 cursor-pointer"
              >
                <Eye className="h-4 w-4 mr-1.5" />
                <span>{lang === "gu" ? "વિગતવાર પૃષ્ઠ →" : "View Full Page →"}</span>
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    handleAddToCart(activeModalProduct, modalQty)
                    setActiveModalProduct(null)
                  }}
                  className="flex-1 sm:flex-none text-xs font-bold h-10 cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4 mr-1.5" />
                  <span>{lang === "gu" ? "કાર્ટમાં ઉમેરો" : "Add to Cart"}</span>
                </Button>

                <Button
                  type="button"
                  onClick={handleModalWhatsAppOrder}
                  className="flex-1 sm:flex-none text-xs font-bold h-10 bg-[#25D366] hover:bg-[#20ba59] text-white cursor-pointer shadow-xs"
                >
                  <MessageCircle className="h-4 w-4 mr-1.5" />
                  <span>{lang === "gu" ? "WhatsApp ઓર્ડર" : "WhatsApp Order"}</span>
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* 11. Standard Vedic Astro Footer */}
      <AstroFooter
        config={siteData.config}
        footer={siteData.footer}
        lang={lang}
      />
    </div>
  )
}
