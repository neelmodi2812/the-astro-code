"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Home,
  ShoppingCart,
  ShoppingBag,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  Heart,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
  HelpCircle,
  Copy,
  CheckCircle2,
  Share2,
  Calendar,
  Compass,
  FileCheck,
  Eye,
  Info,
  Droplets,
  Flame,
  Zap,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  X
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion"
import { toast } from "@/components/ui/sonner"
import { useLanguage } from "@/components/language-provider"
import { getAstroData } from "@/lib/data/astro-data"
import {
  getProductById,
  getRelatedProducts
} from "@/lib/data/product-data"

const CART_STORAGE_KEY = "astro_cart_items"
const WISHLIST_STORAGE_KEY = "astro_wishlist_items"

export default function ProductDetailClient({ productId }) {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const currentLang = lang || "gu"

  const astroData = React.useMemo(() => getAstroData(currentLang), [currentLang])
  const product = React.useMemo(() => getProductById(productId, currentLang), [productId, currentLang])
  const relatedProducts = React.useMemo(
    () => (product ? getRelatedProducts(product.id, product.category, currentLang, 4) : []),
    [product, currentLang]
  )

  const imagesList = React.useMemo(() => {
    return product?.images && product.images.length > 0 ? product.images : (product ? [product.image] : [])
  }, [product])

  // Fallback if product not found on client
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AstroHeader
          config={astroData.config}
          topBar={astroData.topBar}
          navLinks={astroData.navLinks}
          activeCategory="myshop"
          lang={currentLang}
          onToggleLang={setLang}
        />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-24 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
            <HelpCircle className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {currentLang === "gu" ? "સામગ્રી મળી નથી" : "Product Not Found"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {currentLang === "gu"
              ? "આપ જે આધ્યાત્મિક સામગ્રી શોધી રહ્યા છો તે ઉપલબ્ધ નથી અથવા લિંક અમાન્ય છે."
              : "The spiritual item you are looking for is unavailable or the link is invalid."}
          </p>
          <Button asChild className="bg-[#00685d] text-white rounded-xl">
            <Link href="/myshop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>{currentLang === "gu" ? "વૈદિક શોપ પર પાછા જાઓ" : "Return to Vedic Store"}</span>
            </Link>
          </Button>
        </main>
        <AstroFooter
          config={astroData.config}
          footer={astroData.footer}
          lang={currentLang}
        />
      </div>
    )
  }

  // Interactive States
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)
  const [selectedVariant, setSelectedVariant] = React.useState(product.variants?.[0] || null)
  const [qty, setQty] = React.useState(1)
  const [sankalpOpted, setSankalpOpted] = React.useState(true)
  const [devoteeName, setDevoteeName] = React.useState("રોહિતભાઈ પારેખ")
  const [gotraName, setGotraName] = React.useState("કશ્યપ ગોત્ર")
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [cartCount, setCartCount] = React.useState(3)
  const [copiedMantra, setCopiedMantra] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("details")

  // Interactive Hover Zoom & Modal Lightbox States
  const [isHoverZooming, setIsHoverZooming] = React.useState(false)
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 })
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false)
  const [lightboxZoom, setLightboxZoom] = React.useState(1)

  // Mouse move handler for smooth lens zoom
  const handleImageMouseMove = React.useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
    setMousePos({ x, y })
  }, [])

  const handleImageMouseEnter = React.useCallback(() => {
    setIsHoverZooming(true)
  }, [])

  const handleImageMouseLeave = React.useCallback(() => {
    setIsHoverZooming(false)
    setMousePos({ x: 50, y: 50 })
  }, [])

  // Touch swipe support for main showcase image on mobile
  const [touchStartX, setTouchStartX] = React.useState(null)
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      setTouchStartX(e.touches[0].clientX)
    }
  }
  const handleTouchEnd = (e) => {
    if (touchStartX === null || !e.changedTouches || e.changedTouches.length === 0) return
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX - touchEndX
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        setSelectedImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0))
      } else {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1))
      }
    }
    setTouchStartX(null)
  }

  // Tabs horizontal scroll state & helpers for small devices
  const tabsContainerRef = React.useRef(null)
  const [canScrollTabsLeft, setCanScrollTabsLeft] = React.useState(false)
  const [canScrollTabsRight, setCanScrollTabsRight] = React.useState(true)

  const checkTabsScroll = React.useCallback(() => {
    const el = tabsContainerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollTabsLeft(scrollLeft > 4)
    setCanScrollTabsRight(scrollLeft + clientWidth < scrollWidth - 4)
  }, [])

  React.useEffect(() => {
    checkTabsScroll()
    const el = tabsContainerRef.current
    if (!el) return
    const handleResize = () => checkTabsScroll()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [checkTabsScroll, currentLang])

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      setTimeout(checkTabsScroll, 320)
    }
  }

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isLightboxOpen])

  // Keyboard navigation for modal (Escape, ArrowLeft, ArrowRight)
  React.useEffect(() => {
    if (!isLightboxOpen) return
    const imagesCount = imagesList.length
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false)
        setLightboxZoom(1)
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : imagesCount - 1))
        setLightboxZoom(1)
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev < imagesCount - 1 ? prev + 1 : 0))
        setLightboxZoom(1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, imagesList.length])

  // Load wishlist & cart count from localStorage
  React.useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        const items = JSON.parse(storedCart)
        if (Array.isArray(items)) {
          setCartCount(items.reduce((acc, i) => acc + (i.qty || 1), 0))
        }
      }
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (storedWishlist) {
        const list = JSON.parse(storedWishlist)
        if (Array.isArray(list) && list.includes(product.id)) {
          setIsWishlisted(true)
        }
      }
    } catch {
      // silent
    }
  }, [product.id])

  // Gujarati digits conversion helper
  const toDigits = React.useCallback(
    (num) => {
      if (currentLang !== "gu") return String(num)
      const guDigits = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"]
      return String(num).replace(/[0-9]/g, (d) => guDigits[d])
    },
    [currentLang]
  )

  const formatPrice = React.useCallback(
    (amount) => {
      const formatted = amount.toLocaleString(currentLang === "gu" ? "gu-IN" : "en-IN")
      return `₹${toDigits(formatted)}`
    },
    [currentLang, toDigits]
  )

  // Price calculations based on selected variant
  const currentPrice = selectedVariant?.price || product.price
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice || currentPrice
  const discountPercent = product.discountPercent || Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  const totalItemPrice = currentPrice * qty

  // Handlers
  const handleIncreaseQty = () => setQty((prev) => Math.min(10, prev + 1))
  const handleDecreaseQty = () => setQty((prev) => Math.max(1, prev - 1))

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => {
      const next = !prev
      try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
        let list = stored ? JSON.parse(stored) : []
        if (!Array.isArray(list)) list = []
        if (next) {
          if (!list.includes(product.id)) list.push(product.id)
          toast.success(currentLang === "gu" ? "વિશલિસ્ટમાં ઉમેરાયું!" : "Added to Wishlist!")
        } else {
          list = list.filter((id) => id !== product.id)
          toast.info(currentLang === "gu" ? "વિશલિસ્ટમાંથી દૂર કરાયું." : "Removed from Wishlist.")
        }
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list))
      } catch {
        // silent
      }
      return next
    })
  }

  const handleAddToCart = (directCheckout = false) => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      let items = stored ? JSON.parse(stored) : []
      if (!Array.isArray(items)) items = []

      const cartItemId = `cart-${product.id}${selectedVariant ? `-${selectedVariant.id}` : ""}`
      const existingIdx = items.findIndex((i) => i.id === cartItemId)

      const variantSuffix = selectedVariant?.name ? ` (${selectedVariant.name})` : ""
      const fullItemName = `${product.name}${variantSuffix}`

      if (existingIdx >= 0) {
        items[existingIdx].qty = (items[existingIdx].qty || 1) + qty
      } else {
        items.push({
          id: cartItemId,
          productId: product.id,
          name: fullItemName,
          subtitle: product.subtitle,
          badge: product.badge,
          image: product.images?.[selectedImageIndex] || product.image,
          price: currentPrice,
          originalPrice: originalPrice,
          qty: qty,
          category: product.category,
          ritualAddon: sankalpOpted
            ? currentLang === "gu"
              ? `સંકલ્પ સેવા: ${devoteeName} (${gotraName})`
              : `Sankalp: ${devoteeName} (${gotraName})`
            : currentLang === "gu"
              ? "વૈદિક પ્રાણ-પ્રતિષ્ઠા સામેલ"
              : "Vedic Consecration Included"
        })
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      setCartCount(items.reduce((acc, i) => acc + (i.qty || 1), 0))

      if (directCheckout) {
        router.push("/myshop/cart")
      } else {
        toast.success(
          currentLang === "gu"
            ? `"${fullItemName}" કાર્ટમાં સફળતાપૂર્વક ઉમેરાયું!`
            : `"${fullItemName}" added to cart successfully!`,
          {
            action: {
              label: currentLang === "gu" ? "કાર્ટ જુઓ →" : "View Cart →",
              onClick: () => router.push("/myshop/cart")
            }
          }
        )
      }
    } catch {
      toast.error(currentLang === "gu" ? "કાર્ટમાં ઉમેરવામાં ભૂલ આવી." : "Failed to add to cart.")
    }
  }

  const handleCopyMantra = () => {
    if (!product.beejMantra) return
    navigator.clipboard.writeText(product.beejMantra)
    setCopiedMantra(true)
    toast.success(currentLang === "gu" ? "બીજ મંત્ર કૉપી થયો!" : "Beej Mantra copied!")
    setTimeout(() => setCopiedMantra(false), 2000)
  }

  // Pre-filled WhatsApp Inquiry message
  const getWhatsAppInquiryUrl = () => {
    const variantText = selectedVariant?.name ? `%0Aવિકલ્પ: ${selectedVariant.name}` : ""
    const message = `*નમસ્તે The Astro Code,*%0Aહું આ પવિત્ર સાધના સામગ્રી વિશે વધુ માહિતી મેળવવા અને ઓર્ડર કરવા માંગુ છું:%0A%0A*${product.name}*${variantText}%0Aકિંમત: ₹${currentPrice}%0ASKU: ${product.sku}%0A%0Aકૃપા કરીને આ સામગ્રીની પ્રાણ-પ્રતિષ્ઠા અને ઉપલબ્ધતા વિશે માર્ગદર્શન આપો.`
    return `https://wa.me/917940008108?text=${message}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#fdc72d]/30 selection:text-[#00685d]">
      {/* 1. Global Astro Header with dynamic cart counter */}
      <AstroHeader
        config={astroData.config}
        topBar={astroData.topBar}
        navLinks={astroData.navLinks}
        activeCategory="myshop"
        lang={currentLang}
        onToggleLang={setLang}
        cartCount={cartCount}
      />

      <main className="flex-1 w-full bg-background">
        {/* Breadcrumb Bar */}
        <section className="w-full bg-card/80 backdrop-blur-md border-b border-border shadow-xs py-4 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <Breadcrumb aria-label="Breadcrumb">
              <BreadcrumbList className="text-xs sm:text-sm text-muted-foreground flex-wrap">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors flex items-center gap-1.5"
                  >
                    <Link href="/">
                      <Home className="h-3.5 w-3.5" />
                      <span>{currentLang === "gu" ? "હોમ" : "Home"}</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors"
                  >
                    <Link href="/myshop">
                      {currentLang === "gu" ? "MyShop સ્ટોર" : "MyShop Store"}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors capitalize"
                  >
                    <Link href={`/myshop/${product.category}`}>
                      {product.category}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-[#00685d] dark:text-[#fdc72d] max-w-[240px] truncate">
                    {product.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Link
              href={`/myshop/${product.category}`}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#00685d] dark:hover:text-[#fdc72d] font-bold transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{currentLang === "gu" ? "શ્રેણીમાં પાછા જાઓ" : "Back to Category"}</span>
            </Link>
          </div>
        </section>

        {/* Product Details Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: Image Gallery & Badges (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-[168px] self-start z-20">
              {/* Main Showcase Image with Interactive Mouse Zoom and Modal Trigger */}
              <div
                className="w-full aspect-square rounded-2xl bg-card border-2 border-border/80 overflow-hidden relative shadow-md group cursor-zoom-in select-none"
                onMouseMove={handleImageMouseMove}
                onMouseEnter={handleImageMouseEnter}
                onMouseLeave={handleImageMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => {
                  setLightboxZoom(1)
                  setIsLightboxOpen(true)
                }}
                role="button"
                tabIndex={0}
                aria-label={currentLang === "gu" ? "મોટું ચિત્ર જોવા માટે ક્લિક કરો" : "Click to view full image"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsLightboxOpen(true)
                  }
                }}
              >
                <img
                  src={imagesList[selectedImageIndex] || imagesList[0]}
                  alt={product.name}
                  style={{
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transform: isHoverZooming ? "scale(2.1)" : "scale(1)",
                    transition: isHoverZooming ? "transform 0.08s ease-out" : "transform 0.3s ease-out, transform-origin 0.3s ease-out"
                  }}
                  className="w-full h-full object-cover pointer-events-none will-change-transform"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
                  <Badge className="bg-[#00685d]/95 hover:bg-[#00685d] text-white font-bold text-xs px-2.5 py-1 shadow-sm">
                    {product.badge}
                  </Badge>
                  <Badge variant="secondary" className="bg-card/90 backdrop-blur-md text-foreground font-semibold text-[11px] shadow-xs">
                    {product.origin}
                  </Badge>
                </div>

                {/* Wishlist Button Overlay */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleWishlist()
                  }}
                  className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center transition-all shadow-sm z-10 ${isWishlisted ? "text-red-500 scale-110" : "text-muted-foreground hover:text-red-500"
                    }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>

                {/* Interactive Zoom Prompt Overlay */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-md pointer-events-none transition-all group-hover:bg-[#00685d]/90">
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>{currentLang === "gu" ? "ક્લિક કરી મોટું જુઓ" : "Click to expand"}</span>
                </div>

                {/* Left/Right Arrow Navigation Over Showcase Image for Small Devices */}
                {imagesList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1))
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all z-10 cursor-pointer shadow-md active:scale-95 border border-white/20"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0))
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all z-10 cursor-pointer shadow-md active:scale-95 border border-white/20"
                      aria-label="Next Image"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {imagesList.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-card ${selectedImageIndex === idx
                          ? "border-[#00685d] dark:border-[#fdc72d] ring-2 ring-[#00685d]/20 shadow-sm"
                          : "border-border/60 hover:border-border opacity-70 hover:opacity-100"
                        }`}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges Strip Under Gallery */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/60">
                  <ShieldCheck className="h-5 w-5 text-[#00685d] dark:text-[#fdc72d] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">૧૦૦% લેબ સર્ટિફાઇડ</span>
                    <span className="text-[10px] text-muted-foreground">Govt. Certified X-Ray</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/60">
                  <Sparkles className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">વૈદિક પ્રાણ-પ્રતિષ્ઠા</span>
                    <span className="text-[10px] text-muted-foreground">બ્રાહ્મણ પૂજિત સંકલ્પ</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/60">
                  <Truck className="h-5 w-5 text-[#00685d] dark:text-[#fdc72d] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">મફત શિપિંગ (Free)</span>
                    <span className="text-[10px] text-muted-foreground">સમગ્ર ભારતમાં ઉપલબ્ધ</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/60">
                  <RotateCcw className="h-5 w-5 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">૭ દિવસ સરળ રિટર્ન</span>
                    <span className="text-[10px] text-muted-foreground">૧૦૦% સંતોષ ખાતરી</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Commerce Info, Variants & Actions (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Product Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      SKU: {product.sku}
                    </span>
                    <span className="text-border">•</span>
                    <span className="text-[11px] font-bold text-[#00685d] dark:text-[#fdc72d] uppercase">
                      {product.category}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <div className="flex items-center text-[#fdc72d]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-foreground">{product.rating}</span>
                    <span className="text-muted-foreground">({toDigits(product.reviewsCount)} સમીક્ષાઓ)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Deity & Planet Pill */}
                {product.deityOrPlanet && (
                  <div className="inline-flex items-center gap-2 p-2 px-3 rounded-xl bg-muted/60 border border-border/60 text-xs text-foreground font-semibold mt-1 self-start">
                    <Flame className="h-3.5 w-3.5 text-[#d9a100]" />
                    <span>અધિષ્ઠાતા દેવ / ગ્રહ: <strong>{product.deityOrPlanet}</strong></span>
                  </div>
                )}
              </div>

              {/* Pricing & Stock Card */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#00685d] dark:text-[#fdc72d]">
                      {formatPrice(totalItemPrice)}
                    </span>
                    {originalPrice > currentPrice && (
                      <span className="text-base sm:text-lg text-muted-foreground line-through">
                        {formatPrice(originalPrice * qty)}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <Badge className="bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 border-red-200 font-bold text-xs">
                        {toDigits(discountPercent)}% {currentLang === "gu" ? "બચત" : "OFF"}
                      </Badge>
                    )}
                  </div>

                  {/* Stock Status Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      {currentLang === "gu"
                        ? `સ્ટોકમાં ઉપલબ્ધ (માત્ર ${toDigits(product.stockCount)} નંગ બાકી)`
                        : `In Stock (Only ${product.stockCount} left)`}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00685d] dark:text-[#fdc72d]" />
                  <span>
                    {currentLang === "gu"
                      ? "તમામ સરકારી કરવેરા અને વૈદિક પ્રાણ-પ્રતિષ્ઠા વિધિ સામેલ • મફત શિપિંગ"
                      : "Inclusive of all taxes and Vedic Consecration • Free Delivery across India"}
                  </span>
                </p>
              </div>

              {/* Available Variants Selector (if applicable) */}
              {product.variants && product.variants.length > 0 && (
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {currentLang === "gu" ? "ઉપલબ્ધ વિકલ્પો / સાઇઝ પસંદ કરો:" : "Select Available Variant / Size:"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${isSelected
                              ? "border-[#00685d] bg-[#00685d]/5 dark:border-[#fdc72d] dark:bg-[#fdc72d]/10 shadow-xs"
                              : "border-border bg-card hover:bg-muted/40"
                            }`}
                        >
                          <span className="text-xs font-bold text-foreground leading-snug">
                            {v.name}
                          </span>
                          <span className="text-xs font-extrabold text-[#00685d] dark:text-[#fdc72d] mt-2">
                            {formatPrice(v.price)}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Vedic Personalized Sankalp Certificate Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-muted/50 border border-border/80 flex flex-col gap-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={sankalpOpted}
                    onCheckedChange={(c) => setSankalpOpted(!!c)}
                    className="mt-0.5 data-[state=checked]:bg-[#00685d] data-[state=checked]:border-[#00685d]"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                      {currentLang === "gu"
                        ? "મારા નામ અને ગોત્ર સાથે પૂજા સંકલ્પ પત્રિકા સામેલ કરો (મફત સુવિધા)"
                        : "Include Consecrated Sankalp Certificate in my name & gotra (Free)"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {currentLang === "gu"
                        ? "ડૉ. વિશાલ મોદી અને આચાર્યો દ્વારા આપના નામ-ગોત્ર સાથે અભિમંત્રિત કરી મોકલાશે."
                        : "Energized in your personal name and gotra by learned Acharyas before dispatch."}
                    </span>
                  </div>
                </label>

                {sankalpOpted && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">યજમાનનું નામ</span>
                      <Input
                        value={devoteeName}
                        onChange={(e) => setDevoteeName(e.target.value)}
                        placeholder="રોહિતભાઈ પારેખ"
                        className="h-9 text-xs rounded-lg bg-card"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">ગોત્ર (Gotra)</span>
                      <Input
                        value={gotraName}
                        onChange={(e) => setGotraName(e.target.value)}
                        placeholder="કશ્યપ ગોત્ર"
                        className="h-9 text-xs rounded-lg bg-card"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Main Action Buttons */}
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center rounded-xl bg-card border border-border p-1 shadow-xs">
                    <button
                      type="button"
                      onClick={handleDecreaseQty}
                      disabled={qty <= 1}
                      className="w-9 h-9 rounded-lg hover:bg-muted text-foreground flex items-center justify-center transition-colors disabled:opacity-40"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center text-base font-bold text-foreground">
                      {toDigits(qty)}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncreaseQty}
                      className="w-9 h-9 rounded-lg hover:bg-muted text-foreground flex items-center justify-center transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    size="lg"
                    onClick={() => handleAddToCart(false)}
                    className="flex-1 h-12 rounded-xl bg-[#00685d] hover:bg-[#005048] text-white font-bold text-sm shadow-md gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>{currentLang === "gu" ? "કાર્ટમાં ઉમેરો (Add to Cart)" : "Add to Cart"}</span>
                  </Button>

                  {/* Buy Now Instant Checkout Button */}
                  <Button
                    size="lg"
                    onClick={() => handleAddToCart(true)}
                    className="h-12 px-6 rounded-xl bg-[#fdc72d] hover:bg-[#d9a100] text-[#1b1c1a] font-bold text-sm shadow-md gap-2"
                  >
                    <Zap className="h-4 w-4 fill-current" />
                    <span>{currentLang === "gu" ? "હમણાં જ ખરીદો" : "Buy Now"}</span>
                  </Button>
                </div>

                {/* Express WhatsApp Inquiry Button */}
                <a
                  href={getWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#25D366]/30 transition-colors mt-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>
                    {currentLang === "gu"
                      ? "WhatsApp દ્વારા ૧-ક્લિક ઓર્ડર અથવા પૂછપરછ"
                      : "1-Click Order or Inquiry via WhatsApp"}
                  </span>
                </a>
              </div>

              {/* Beej Mantra & Wearing Rules Card */}
              {product.beejMantra && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      <span>સિદ્ધ બીજ મંત્ર (Beej Mantra)</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyMantra}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 font-semibold"
                    >
                      {copiedMantra ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedMantra ? "કૉપી થયું" : "કૉપી કરો"}</span>
                    </button>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-border/60 text-xs sm:text-sm font-bold text-foreground text-center tracking-wide">
                    {product.beejMantra}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#00685d] dark:text-[#fdc72d]" />
                      <span>શુભ દિવસ: <strong>{product.wearingDay}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Compass className="h-3.5 w-3.5 text-[#00685d] dark:text-[#fdc72d]" />
                      <span>ધારણ સ્થળ: <strong>{product.fingerOrPosition}</strong></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Deep Tabs Section: Spiritual Benefits, Rituals, Specs, Lab Certificate, FAQs */}
          <div className="mt-12 sm:mt-16 bg-card rounded-2xl border border-border shadow-xs p-4 sm:p-8">
            {/* Interactive Tab Navigators with Arrow Functionality for Small Devices */}
            <div className="relative border-b border-border/70 pb-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={() => scrollTabs("left")}
                  disabled={!canScrollTabsLeft}
                  aria-label={currentLang === "gu" ? "ડાબી બાજુ સ્ક્રોલ કરો" : "Scroll tabs left"}
                  className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shrink-0 transition-all border ${
                    canScrollTabsLeft
                      ? "bg-card hover:bg-[#00685d] hover:text-white text-foreground border-border shadow-xs cursor-pointer active:scale-95"
                      : "opacity-25 cursor-not-allowed border-transparent text-muted-foreground"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Scrollable Tab Container */}
                <div
                  ref={tabsContainerRef}
                  onScroll={checkTabsScroll}
                  className="flex-1 flex items-center gap-2 overflow-x-auto scroll-smooth py-1 px-1"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                  }}
                >
                  {[
                    { id: "details", label: currentLang === "gu" ? "૧. પવિત્ર મહત્વ & લાભ" : "1. Significance & Benefits" },
                    { id: "consecration", label: currentLang === "gu" ? "૨. વૈદિક પ્રાણ-પ્રતિષ્ઠા વિધિ" : "2. Consecration Ritual" },
                    { id: "labcert", label: currentLang === "gu" ? "૩. લેબ પ્રમાણપત્ર & વિગતો" : "3. Lab Certificate & Details" },
                    { id: "specs", label: currentLang === "gu" ? "૪. વિશેષ સ્પષ્ટીકરણ" : "4. Specifications" },
                    { id: "faqs", label: currentLang === "gu" ? "૫. પ્રશ્નોત્તરી (FAQs)" : "5. FAQs" },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={(e) => {
                          setActiveTab(tab.id)
                          e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
                        }}
                        className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-[#00685d] text-white shadow-md scale-[1.01]"
                            : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={() => scrollTabs("right")}
                  disabled={!canScrollTabsRight}
                  aria-label={currentLang === "gu" ? "જમણી બાજુ સ્ક્રોલ કરો" : "Scroll tabs right"}
                  className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shrink-0 transition-all border ${
                    canScrollTabsRight
                      ? "bg-card hover:bg-[#00685d] hover:text-white text-foreground border-border shadow-xs cursor-pointer active:scale-95 animate-pulse sm:animate-none"
                      : "opacity-25 cursor-not-allowed border-transparent text-muted-foreground"
                  }`}
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Tab 1: Spiritual Significance & Benefits */}
            {activeTab === "details" && (
              <div className="pt-6 flex flex-col gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                    {currentLang === "gu" ? "આધ્યાત્મિક મહત્વ અને પુરાણોક્ત સંદર્ભ" : "Vedic Scriptural Glory"}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {product.benefits && product.benefits.length > 0 && (
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground mb-3">
                      {currentLang === "gu" ? "મુખ્ય દિવ્ય ફળશ્રુતિ & લાભો:" : "Key Divine Benefits:"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-muted/40 border border-border/50">
                          <CheckCircle2 className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-foreground">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Consecration Ritual */}
            {activeTab === "consecration" && (
              <div className="pt-6 flex flex-col gap-5">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {currentLang === "gu" ? "અમારી ૪-સોપાન શાસ્ત્રોક્ત પ્રાણ-પ્રતિષ્ઠા વિધિ" : "Our 4-Step Consecration Ritual"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.consecrationProcess}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-col gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#fdc72d] font-bold text-xs flex items-center justify-center">
                      ૧
                    </span>
                    <span className="text-sm font-bold text-foreground">પ્રાકૃતિક અસલી પસંદગી</span>
                    <span className="text-xs text-muted-foreground">ખાણ કે વનમાંથી ૧૦૦% અસલી સામગ્રીની જાતે તપાસ.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-col gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#fdc72d] font-bold text-xs flex items-center justify-center">
                      ૨
                    </span>
                    <span className="text-sm font-bold text-foreground">ગંગાજળ & પંચામૃત સ્નાન</span>
                    <span className="text-xs text-muted-foreground">હરિદ્વાર શુદ્ધ ગંગાજળ અને દૂધ-મધથી શુદ્ધિકરણ.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-col gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#fdc72d] font-bold text-xs flex items-center justify-center">
                      ૩
                    </span>
                    <span className="text-sm font-bold text-foreground">૧,૧૦૦ મંત્રોચ્ચાર આહુતિ</span>
                    <span className="text-xs text-muted-foreground">શુભ મુહૂર્તમાં વિદ્વાન બ્રાહ્મણો દ્વારા સિદ્ધિ હોમ.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-col gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#fdc72d] font-bold text-xs flex items-center justify-center">
                      ૪
                    </span>
                    <span className="text-sm font-bold text-foreground">લેબ સર્ટિફિકેટ & પેકિંગ</span>
                    <span className="text-xs text-muted-foreground">ગંગાજળ બોટલ અને સર્ટિફિકેટ સાથે અખંડ સીલ પેકિંગ.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Lab Certificate & Details */}
            {activeTab === "labcert" && (
              <div className="pt-6 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00685d]/10 dark:bg-[#fdc72d]/10 flex items-center justify-center shrink-0">
                    <FileCheck className="h-5 w-5 text-[#00685d] dark:text-[#fdc72d]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {currentLang === "gu" ? "લેબ પ્રમાણપત્ર & ઓળખ વિગતો" : "Lab Certificate & Identification Details"}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {currentLang === "gu"
                        ? "સરકારી માન્ય લેબ દ્વારા X-Ray અને રાસાયણિક પ્રક્રિયા વડે ચકાસ્યું"
                        : "Verified by Govt. accredited lab via X-Ray & chemical analysis"}
                    </p>
                  </div>
                </div>

                {/* Certificate Card */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#00685d]/5 via-card to-amber-500/5 border-2 border-[#00685d]/20 dark:border-[#fdc72d]/20 overflow-hidden">
                  <div className="absolute top-4 right-4 opacity-5">
                    <Award className="h-24 w-24 text-[#00685d]" />
                  </div>

                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#00685d] text-white flex items-center justify-center shrink-0 shadow-md">
                      <ShieldCheck className="h-7 w-7" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg font-extrabold text-foreground">
                        {currentLang === "gu" ? "The Astro Code — અધિકૃતતા પ્રમાણપત્ર" : "The Astro Code — Authenticity Certificate"}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {currentLang === "gu" ? "Cert. No: TAC-LAB-" : "Cert. No: TAC-LAB-"}{product.sku}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" /> Govt. Accredited Lab
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
                          <Eye className="h-3 w-3" /> X-Ray Tested
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Spec Table */}
                  <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
                    <table className="w-full text-xs sm:text-sm text-left">
                      <tbody className="divide-y divide-border/50">
                        <tr className="bg-[#00685d]/5">
                          <td className="p-3 sm:p-4 font-bold text-foreground w-2/5">ઉત્પાદન / Product</td>
                          <td className="p-3 sm:p-4 text-muted-foreground font-semibold">{product.name}</td>
                        </tr>
                        <tr>
                          <td className="p-3 sm:p-4 font-bold text-foreground">મૂળ સ્થાન / Origin</td>
                          <td className="p-3 sm:p-4 text-muted-foreground">{product.origin}</td>
                        </tr>
                        <tr className="bg-[#00685d]/5">
                          <td className="p-3 sm:p-4 font-bold text-foreground">પ્રમાણન / Certification</td>
                          <td className="p-3 sm:p-4 text-muted-foreground">{product.authenticityDetails || "Govt. Certified Lab — X-Ray & Chemical Analysis"}</td>
                        </tr>
                        <tr>
                          <td className="p-3 sm:p-4 font-bold text-foreground">SKU / Product Code</td>
                          <td className="p-3 sm:p-4 text-muted-foreground font-mono">{product.sku}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Guarantee Features */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    {currentLang === "gu" ? "પ્રમાણપત્ર શું ખાતરી આપે છે?" : "What does the Certificate Guarantee?"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: <ShieldCheck className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />, title: currentLang === "gu" ? "100% અસ્સલ સ્ટોન/ઉત્પાદન" : "100% Genuine Stone/Product", desc: currentLang === "gu" ? "ખોટા, કૃત્રિમ કે ડુપ્લિકેટ સ્ટોનનો ઉપયોગ નહીં." : "No fake, synthetic, or duplicate stones used." },
                      { icon: <Eye className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />, title: currentLang === "gu" ? "X-Ray & Chemical Test" : "X-Ray & Chemical Test", desc: currentLang === "gu" ? "Govt. accredited laboratory ની ભૌતિક ચકાસણી." : "Physical verification by Govt. accredited laboratory." },
                      { icon: <Info className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />, title: currentLang === "gu" ? "ગ્રામ/રત્તી/વ્યાસ ચકાસ્યો" : "Weight & Size Verified", desc: currentLang === "gu" ? "ઉત્પાદનની ભૌતિક માપ-ચકાસણી ખૂણ-ખૂણામાં કરાઈ." : "Physical measurement and size verification done." },
                      { icon: <Droplets className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />, title: currentLang === "gu" ? "ગંગાજળ & પ્રાણ-પ્રતિષ્ઠા" : "Ganga Jal & Energization", desc: currentLang === "gu" ? "ડૉ. વિશાલ મોદી દ્વારા પૂજિત અભિષેક ખાતરી." : "Consecrated with Ganga Jal by Dr. Vishal Modi." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50">
                        <div className="w-8 h-8 rounded-lg bg-[#00685d]/10 dark:bg-[#fdc72d]/10 flex items-center justify-center shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold text-foreground">{item.title}</span>
                          <span className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Technical Specifications */}
            {activeTab === "specs" && (
              <div className="pt-6">
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <tbody className="divide-y divide-border">
                      <tr className="bg-muted/30">
                        <td className="p-3 sm:p-4 font-bold text-foreground w-1/3">ઉત્પાદન નામ / Name</td>
                        <td className="p-3 sm:p-4 text-muted-foreground">{product.name}</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-foreground">મૂળ સ્થાન / Origin</td>
                        <td className="p-3 sm:p-4 text-muted-foreground">{product.origin}</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-3 sm:p-4 font-bold text-foreground">અધિષ્ઠાતા દેવ / Deity</td>
                        <td className="p-3 sm:p-4 text-muted-foreground">{product.deityOrPlanet}</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-foreground">બીજ મંત્ર / Beej Mantra</td>
                        <td className="p-3 sm:p-4 text-muted-foreground font-semibold">{product.beejMantra}</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-3 sm:p-4 font-bold text-foreground">ધારણ મુહૂર્ત / Best Day</td>
                        <td className="p-3 sm:p-4 text-muted-foreground">{product.wearingDay}</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-foreground">ધારણ સ્થાન / Position</td>
                        <td className="p-3 sm:p-4 text-muted-foreground">{product.fingerOrPosition}</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-3 sm:p-4 font-bold text-foreground">પ્રમાણપત્ર / Certification</td>
                        <td className="p-3 sm:p-4 text-muted-foreground">{product.authenticityDetails}</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-foreground">SKU / કોડ</td>
                        <td className="p-3 sm:p-4 text-muted-foreground font-mono">{product.sku}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 5: FAQs */}
            {activeTab === "faqs" && (
              <div className="pt-6">
                {product.faqs && product.faqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {product.faqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`}>
                        <AccordionTrigger className="text-left font-bold text-sm sm:text-base">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {currentLang === "gu" ? "આ સામગ્રી માટે પ્રશ્નોત્તરી ટૂંક સમયમાં ઉમેરાશે." : "FAQs will be added soon."}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* DEDICATED DEVOTEE FEEDBACK & REVIEWS SECTION (Reference: temp-product-details-2.html) */}
          <section className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#00685d] dark:text-[#fdc72d] tracking-wider uppercase">
                  {currentLang === "gu" ? "પ્રમાણિત અનુભવો • ૧૦૦% સાચો પ્રતિસાદ" : "Verified Experiences • 100% Authentic Feedback"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                  {currentLang === "gu" ? "ભક્તોના આશીર્વાદ અને સાચા પ્રતિસાદ" : "Devotee Blessings & Authentic Feedback"}
                </h2>
              </div>
              <Button
                variant="outline"
                className="rounded-xl font-bold text-xs self-start md:self-auto gap-2 border-border"
                onClick={() => toast.success(currentLang === "gu" ? "તમારો અનુભવ શેર કરવા બદલ આભાર! સમીક્ષા ફોર્મ ટૂંક સમયમાં ખુલશે." : "Thank you! Review submission form will open shortly.")}
              >
                <Star className="h-4 w-4 text-[#fdc72d] fill-current" />
                <span>{currentLang === "gu" ? "તમારો પ્રતિસાદ લખો" : "Write a Review"}</span>
              </Button>
            </div>

            {/* Rating Breakdown Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Big Score Card */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-muted/40 border border-border/80 flex flex-col items-center justify-center text-center">
                <div className="text-5xl font-black text-[#00685d] dark:text-[#fdc72d] leading-none mb-2">
                  {toDigits(product.rating || 4.9)}
                </div>
                <div className="flex text-[#fdc72d] mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {currentLang === "gu"
                    ? `${toDigits(product.reviewsCount || 142)} ચકાસાયેલ ગ્રાહકો દ્વારા ૫ માંથી રેટિંગ`
                    : `Rated out of 5 by ${product.reviewsCount || 142} verified devotees`}
                </span>
                <span className="mt-3 text-[11px] font-bold bg-[#00685d]/10 text-[#00685d] dark:bg-[#fdc72d]/10 dark:text-[#fdc72d] px-3 py-1 rounded-full">
                  {currentLang === "gu" ? "૯૮% ભક્તો અન્યોને ભલામણ કરે છે" : "98% Devotees recommend this item"}
                </span>
              </div>

              {/* Progress Bars */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-muted/40 border border-border/80 flex flex-col justify-center gap-2.5">
                {[
                  { star: currentLang === "gu" ? "૫ સ્ટાર" : "5 Star", pct: 92, label: currentLang === "gu" ? "૯૨%" : "92%" },
                  { star: currentLang === "gu" ? "૪ સ્ટાર" : "4 Star", pct: 6, label: currentLang === "gu" ? "૬%" : "6%" },
                  { star: currentLang === "gu" ? "૩ સ્ટાર" : "3 Star", pct: 1.5, label: currentLang === "gu" ? "૧.૫%" : "1.5%" },
                  { star: currentLang === "gu" ? "૨ સ્ટાર" : "2 Star", pct: 0.3, label: currentLang === "gu" ? "૦.૩%" : "0.3%" },
                  { star: currentLang === "gu" ? "૧ સ્ટાર" : "1 Star", pct: 0.2, label: currentLang === "gu" ? "૦.૨%" : "0.2%" },
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <span className="w-14 font-semibold text-foreground">{row.star}</span>
                    <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#00685d] dark:bg-[#fdc72d] h-full rounded-full transition-all"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right font-bold text-muted-foreground">{row.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Devotee Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  name: "રોહિતભાઈ પારેખ",
                  location: "બોડકદેવ, અમદાવાદ",
                  date: "૨ દિવસ પહેલા",
                  title: "અદ્ભુત દૈવીય સ્પંદન અને અસલી ગુણવત્તા!",
                  comment: "મેં મારા પિતાજી માટે મંગાવી હતી. પાર્સલ ખોલતા જ ચંદન અને કપૂરની સુગંધથી મન પ્રફુલ્લિત થઈ ગયું. લેબ સર્ટિફિકેટ પણ સાથે મળ્યું. ડૉ. વિશાલ મોદી અને સમગ્ર ટીમને ખૂબ ખૂબ સાધુવાદ.",
                  initial: "રો"
                },
                {
                  name: "મીનાક્ષીબેન સોની",
                  location: "અડાજણ, સુરત",
                  date: "૧ અઠવાડિયા પહેલા",
                  title: "મારા નામે સંકલ્પ સાથે પૂજા કરી આપી",
                  comment: "મેં ઓર્ડર કરતી વખતે ગોત્ર અને નામ લખ્યું હતું, પૂજાનું વિધિવત સર્ટિફિકેટ સાથે મળ્યું. ધારણ કર્યા પછી માનસિક ચિંતાઓમાં ભારે રાહત અનુભવાય છે. સામગ્રી એકદમ મજબૂત અને નેચરલ છે.",
                  initial: "મી"
                },
                {
                  name: "હર્ષદભાઈ ત્રિવેદી",
                  location: "વડોદરા",
                  date: "૨ અઠવાડિયા પહેલા",
                  title: "પેકિંગ અને ગંગાજળ ભેટ અત્યંત સુંદર",
                  comment: "સુરક્ષિત પેકિંગમાં આવી. સાથે જે ગંગોત્રી ગંગાજળની નાની બોટલ અને અયોધ્યા ચંદન આપ્યું તે ખૂબ જ પવિત્ર છે. બજારમાં મળતી નકલી વસ્તુઓ કરતાં આ ૧૦૦ ગણી શ્રેષ્ઠ અને અધિકૃત છે.",
                  initial: "હ"
                }
              ].map((rev, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#fdc72d]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-muted-foreground">{rev.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-foreground leading-snug">
                      {rev.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                    <div className="w-9 h-9 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#fdc72d] font-bold text-xs flex items-center justify-center shrink-0">
                      {rev.initial}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground leading-none">{rev.name}</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                        <CheckCircle2 className="h-3 w-3" /> પ્રમાણિત ખરીદનાર • {rev.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related / Recommended Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 sm:mt-20 mb-8 flex flex-col gap-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-[#00685d]/10 text-[#00685d] dark:bg-[#fdc72d]/10 dark:text-[#fdc72d]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {currentLang === "gu" ? "આ સામગ્રી સાથે જોડાયેલ અન્ય સિદ્ધ ઉપકરણો" : "Related Sacred Artifacts"}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {currentLang === "gu" ? "સાથે ખરીદવા યોગ્ય વૈદિક સામગ્રીઓ" : "Frequently paired authentic spiritual items"}
                    </p>
                  </div>
                </div>
                <Button asChild variant="ghost" size="sm" className="font-bold text-xs">
                  <Link href={`/myshop/${product.category}`}>
                    <span>{currentLang === "gu" ? "બધા જુઓ →" : "View All →"}</span>
                  </Link>
                </Button>
              </div>

              {/* Related Products Grid with Balanced Inside Spacing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((rel) => (
                  <Card
                    key={rel.id}
                    className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Inset Image with neat padding around it */}
                      <Link
                        href={`/myshop/product/${rel.id}`}
                        className="block relative aspect-square w-full rounded-xl overflow-hidden bg-muted/50 mb-3.5 group-hover:opacity-95 transition-opacity"
                      >
                        <img
                          src={rel.images?.[0] || rel.image}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-2.5 left-2.5 bg-[#00685d]/95 hover:bg-[#00685d] text-white font-bold text-[10px] shadow-sm">
                          {rel.badge}
                        </Badge>
                      </Link>

                      {/* Content Details */}
                      <div className="flex flex-col gap-1.5 mb-3.5">
                        <div className="flex items-center gap-1.5 text-[#fdc72d] text-xs">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="font-bold text-foreground text-xs">{rel.rating}</span>
                          <span className="text-[11px] text-muted-foreground">({toDigits(rel.reviewsCount || 48)})</span>
                        </div>
                        <Link href={`/myshop/product/${rel.id}`}>
                          <h4 className="font-bold text-sm sm:text-base text-foreground line-clamp-1 group-hover:text-[#00685d] dark:group-hover:text-[#fdc72d] transition-colors">
                            {rel.name}
                          </h4>
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {rel.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer with Balanced Top and Bottom Spacing */}
                    <div className="pt-3.5 border-t border-border/60 flex items-center justify-between gap-3 mt-auto">
                      <span className="font-extrabold text-base sm:text-lg text-[#00685d] dark:text-[#fdc72d]">
                        {formatPrice(rel.price)}
                      </span>
                      <Button
                        size="sm"
                        asChild
                        className="h-9 px-4 rounded-xl bg-[#00685d] hover:bg-[#005048] text-white text-xs font-bold shadow-xs transition-all"
                      >
                        <Link href={`/myshop/product/${rel.id}`}>
                          <span>{currentLang === "gu" ? "વિગત જુઓ" : "View"}</span>
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Astrological Assistance Consultation Strip */}
          <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-[#00685d]/10 via-[#fdc72d]/15 to-[#00685d]/10 border border-[#00685d]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#00685d] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-foreground">
                  {currentLang === "gu"
                    ? "શું આ સામગ્રી તમારી કુંડળી અનુસાર યોગ્ય છે?"
                    : "Unsure if this item suits your birth chart?"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {currentLang === "gu"
                    ? "અમારા પ્રખર જ્યોતિષી ડૉ. વિશાલ મોદી સાથે નિઃશુલ્ક પરામર્શ કરો: +91 79 4000 8108"
                    : "Consult our Vedic astrologer Dr. Vishal Modi free of charge: +91 79 4000 8108"}
                </span>
              </div>
            </div>

            <Button asChild className="bg-[#00685d] hover:bg-[#005048] text-white rounded-xl font-bold text-xs gap-2">
              <a href="tel:+917940008108">
                <Phone className="h-3.5 w-3.5" />
                <span>{currentLang === "gu" ? "હવે વાત કરો" : "Call Now"}</span>
              </a>
            </Button>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <AstroFooter
        config={astroData.config}
        footer={astroData.footer}
        lang={currentLang}
      />

      {/* Fullscreen Image Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => {
            setIsLightboxOpen(false)
            setLightboxZoom(1)
          }}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Top Bar */}
          <div
            className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <Badge className="bg-[#00685d] text-white font-bold text-xs px-2.5 py-1">
                {product.badge}
              </Badge>
              <span className="text-white/90 font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
                {product.name}
              </span>
              <span className="text-white/50 text-xs hidden sm:inline">
                • {selectedImageIndex + 1} / {imagesList.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom In/Out Toggle */}
              <button
                type="button"
                onClick={() => setLightboxZoom((prev) => (prev === 1 ? 1.8 : 1))}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title={lightboxZoom === 1 ? "Zoom in" : "Reset zoom"}
              >
                {lightboxZoom === 1 ? (
                  <>
                    <ZoomIn className="h-4 w-4" />
                    <span className="hidden sm:inline">{currentLang === "gu" ? "ઝૂમ કરો" : "Zoom"}</span>
                  </>
                ) : (
                  <>
                    <ZoomOut className="h-4 w-4" />
                    <span className="hidden sm:inline">{currentLang === "gu" ? "રીસેટ" : "Reset"}</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false)
                  setLightboxZoom(1)
                }}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close image modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal Center Showcase */}
          <div
            className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow Button */}
            {imagesList.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1))
                  setLightboxZoom(1)
                }}
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 border border-white/10 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Main Image with Zoom Support */}
            <div
              className={`max-h-[72vh] max-w-full flex items-center justify-center overflow-auto ${lightboxZoom > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
              onClick={() => setLightboxZoom((prev) => (prev === 1 ? 1.8 : 1))}
            >
              <img
                src={imagesList[selectedImageIndex] || imagesList[0]}
                alt={product.name}
                style={{
                  transform: `scale(${lightboxZoom})`,
                  transition: "transform 0.25s ease-out"
                }}
                className="max-h-[72vh] max-w-full object-contain rounded-xl select-none shadow-2xl"
              />
            </div>

            {/* Next Arrow Button */}
            {imagesList.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  setSelectedImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0))
                  setLightboxZoom(1)
                }}
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 border border-white/10 cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Modal Bottom Thumbnails */}
          <div
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2.5 z-10 py-1 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {imagesList.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedImageIndex(idx)
                  setLightboxZoom(1)
                }}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all p-0.5 shrink-0 cursor-pointer ${selectedImageIndex === idx
                    ? "border-[#00685d] ring-2 ring-[#00685d]/60 scale-105"
                    : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
