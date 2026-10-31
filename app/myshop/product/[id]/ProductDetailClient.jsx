"use client"

import * as React from "react"
import { useWishlist } from "@/lib/api/hooks/use-wishlist"
import Link from "next/link"

import { useRouter } from "next/navigation"
import {
  Home,
  ShoppingCart,
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
  MessageCircle,
  Phone,
  HelpCircle,
  Copy,
  CheckCircle2,
  Calendar,
  Compass,
  FileCheck,
  Eye,
  Flame,
  Zap,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { useProduct } from "@/lib/api/hooks/use-product"

const CART_STORAGE_KEY = "astro_cart_items"

export default function ProductDetailClient({ productId, initialBundle }) {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const currentLang = lang || "gu"

  const astroData = useHomeData(currentLang)
  const { product, related: relatedProducts, loading } = useProduct(productId, currentLang, initialBundle)

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
  const { isWishlisted: isInWishlist, toggle: toggleWishlist } = useWishlist(currentLang)
  const isWishlisted = isInWishlist(product.id)
  const [cartCount, setCartCount] = React.useState(0)
  const [copiedMantra, setCopiedMantra] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("details")
  const [isCertModalOpen, setIsCertModalOpen] = React.useState(false)

  // Switch selected variant and automatically update the hero gallery photo
  const handleSelectVariant = React.useCallback(
    (variant) => {
      setSelectedVariant(variant)
      if (variant?.image && imagesList && imagesList.length > 0) {
        const foundIdx = imagesList.findIndex((img) => img === variant.image)
        if (foundIdx >= 0) {
          setSelectedImageIndex(foundIdx)
        } else {
          // If relative path or partial match
          const partialIdx = imagesList.findIndex(
            (img) => img.includes("silver") && String(variant.image).includes("silver")
          )
          if (partialIdx >= 0) {
            setSelectedImageIndex(partialIdx)
          }
        }
      }
    },
    [imagesList]
  )

  // Interactive Hover Zoom & Modal Lightbox States
  const [isHoverZooming, setIsHoverZooming] = React.useState(false)
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 })
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false)
  const handleResetZoom = React.useCallback(() => {}, [])

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

  // Keyboard navigation for image modal (Escape to close, ArrowLeft / ArrowRight to switch images)
  React.useEffect(() => {
    if (!isLightboxOpen) return
    const imagesCount = imagesList.length
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false)
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : imagesCount - 1))
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev < imagesCount - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, imagesList.length])

  // Keyboard navigation for Certificate Modal (Escape to close)
  React.useEffect(() => {
    if (!isCertModalOpen) return
    const handleCertKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsCertModalOpen(false)
      }
    }
    window.addEventListener("keydown", handleCertKeyDown)
    return () => window.removeEventListener("keydown", handleCertKeyDown)
  }, [isCertModalOpen])

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
  const totalOriginalPrice = originalPrice * qty

  // Handlers
  const handleIncreaseQty = () => setQty((prev) => Math.min(10, prev + 1))
  const handleDecreaseQty = () => setQty((prev) => Math.max(1, prev - 1))

  const handleToggleWishlist = async () => {
    try {
      const added = await toggleWishlist(product)
      if (added) {
        toast.success(currentLang === "gu" ? "વિશલિસ્ટમાં ઉમેરાયું!" : "Added to Wishlist!")
      } else {
        toast.info(currentLang === "gu" ? "વિશલિસ્ટમાંથી દૂર કરાયું." : "Removed from Wishlist.")
      }
    } catch (error) {
      toast.error(error.message)
    }
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
          category: product.category
        })
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      setCartCount(items.reduce((acc, i) => acc + (i.qty || 1), 0))
      try { window.dispatchEvent(new Event("astro_cart_updated")) } catch {}

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
    const variantText = selectedVariant?.name ? `%0A${currentLang === "gu" ? "વિકલ્પ:" : "Variant:"} ${selectedVariant.name}` : ""
    const message = currentLang === "gu"
      ? `*નમસ્તે The Astro Code,*%0Aહું આ પવિત્ર સાધના સામગ્રી વિશે વધુ માહિતી મેળવવા અને ઓર્ડર કરવા માંગુ છું:%0A%0A*${product.name}*${variantText}%0Aકિંમત: ₹${currentPrice}%0ASKU: ${product.sku}%0A%0Aકૃપા કરીને આ સામગ્રીની પ્રાણ-પ્રતિષ્ઠા અને ઉપલબ્ધતા વિશે માર્ગદર્શન આપો.`
      : `*Hello The Astro Code,*%0AI would like to inquire and order this sacred item:%0A%0A*${product.name}*${variantText}%0APrice: ₹${currentPrice}%0ASKU: ${product.sku}%0A%0APlease guide me regarding consecration and availability.`
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

      <main className="flex-1 w-full bg-background pb-24 md:pb-0">
        {/* Breadcrumb Bar */}
        <section className="w-full bg-card/90 backdrop-blur-md border-b border-border shadow-2xs py-3 sm:py-4 px-3 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            <Breadcrumb aria-label="Breadcrumb">
              <BreadcrumbList className="text-xs sm:text-sm text-muted-foreground flex-wrap items-center gap-1.5 sm:gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors flex items-center gap-1"
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
                    className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors"
                  >
                    <Link href="/myshop">
                      {currentLang === "gu" ? "MyShop" : "MyShop Store"}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors capitalize font-semibold"
                  >
                    <Link href={`/myshop/${product.category}`}>
                      {product.categoryName || product.category}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:inline-flex" />
                <BreadcrumbItem className="hidden md:inline-flex">
                  <BreadcrumbPage className="font-bold text-[#8a6800] dark:text-[#fdc72d] max-w-[200px] lg:max-w-[280px] truncate">
                    {product.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Link
              href={`/myshop/${product.category}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] font-bold transition-colors self-start sm:self-auto"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{currentLang === "gu" ? "શ્રેણીમાં પાછા જાઓ" : "Back to Category"}</span>
            </Link>
          </div>
        </section>

        {/* Product Details Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: Image Gallery & Badges (6 cols on lg/xl) */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-4 lg:sticky lg:top-[168px] self-start z-20">
              {/* Main Showcase Image with Interactive Mouse Zoom and Modal Trigger */}
              <div
                className="w-full aspect-square rounded-2xl bg-card border-2 border-border/80 overflow-hidden relative shadow-md group cursor-zoom-in select-none"
                onMouseMove={handleImageMouseMove}
                onMouseEnter={handleImageMouseEnter}
                onMouseLeave={handleImageMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => {
                  handleResetZoom()
                  setIsLightboxOpen(true)
                }}
                role="button"
                tabIndex={0}
                aria-label={currentLang === "gu" ? "મોટું ચિત્ર જોવા માટે ક્લિક કરો" : "Click to view full image"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleResetZoom()
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

                {/* Overlaid Badges - only render if badge or origin text exists */}
                {Boolean((product?.badge && String(product.badge).trim() !== "") || (product?.origin && String(product.origin).trim() !== "")) && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
                    {Boolean(product?.badge && String(product.badge).trim() !== "") && (
                      <Badge className="bg-[#fdc72d] text-[#0e3934] font-bold text-xs px-2.5 py-1 shadow-sm">
                        {product.badge}
                      </Badge>
                    )}
                    {Boolean(product?.origin && String(product.origin).trim() !== "") && (
                      <Badge variant="secondary" className="bg-card/90 backdrop-blur-md text-foreground font-semibold text-xs shadow-xs">
                        {product.origin}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Top-Right Action Controls: Fullscreen Expand & Wishlist */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleResetZoom()
                      setIsLightboxOpen(true)
                    }}
                    className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-md text-foreground hover:text-[#00685d] dark:hover:text-[#fdc72d] flex items-center justify-center transition-all shadow-sm hover:scale-105 cursor-pointer border border-border/40"
                    aria-label={currentLang === "gu" ? "મોટું ચિત્ર જુઓ" : "Open full image"}
                    title={currentLang === "gu" ? "મોટું ચિત્ર જુઓ" : "Open full image"}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleWishlist()
                    }}
                    className={`w-10 h-10 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center transition-all shadow-sm cursor-pointer border border-border/40 ${
                      isWishlisted ? "text-red-500 scale-105" : "text-muted-foreground hover:text-red-500 hover:scale-105"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Desktop-only Subtle Hover Zoom Prompt (Never blocks tassel/details at bottom-right) */}
                <div className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#06302b]/75 backdrop-blur-md text-white text-xs font-semibold shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-white/10">
                  <ZoomIn className="h-3.5 w-3.5 text-[#fdc72d]" />
                  <span>{currentLang === "gu" ? "મોટું જોવા ક્લિક કરો" : "Click to view full image"}</span>
                </div>

                {/* Mobile Unobtrusive Image Counter Badge (Clean, does not block mala) */}
                {imagesList.length > 1 && (
                  <div className="md:hidden absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#06302b]/60 backdrop-blur-md text-white text-xs font-bold shadow-xs flex items-center gap-1 z-10 pointer-events-none">
                    <Eye className="h-3 w-3 text-[#fdc72d]" />
                    <span>{toDigits(selectedImageIndex + 1)} / {toDigits(imagesList.length)}</span>
                  </div>
                )}

                {/* Mobile Dots Indicator */}
                {imagesList.length > 1 && (
                  <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#06302b]/40 backdrop-blur-sm pointer-events-none z-10">
                    {imagesList.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          selectedImageIndex === i ? "w-4 bg-[#fdc72d]" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Desktop-only Hover Chevrons (Declutters mobile touch screens) */}
                {imagesList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1))
                      }}
                      className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#06302b]/60 hover:bg-[#06302b]/85 text-white backdrop-blur-md items-center justify-center transition-all z-10 cursor-pointer shadow-md active:scale-95 border border-white/20 opacity-0 group-hover:opacity-100 hover:scale-105"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0))
                      }}
                      className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#06302b]/60 hover:bg-[#06302b]/85 text-white backdrop-blur-md items-center justify-center transition-all z-10 cursor-pointer shadow-md active:scale-95 border border-white/20 opacity-0 group-hover:opacity-100 hover:scale-105"
                      aria-label="Next Image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row with High-Contrast Active State & +N Overflow Support */}
              {imagesList.length > 1 && (
                <div>
                  <div
                    className={`grid gap-2.5 sm:gap-3 ${
                      imagesList.length === 2
                        ? "grid-cols-2"
                        : imagesList.length === 3
                        ? "grid-cols-3"
                        : "grid-cols-4"
                    }`}
                  >
                    {/* If imagesList has 4 or fewer images: render each thumbnail normally */}
                    {imagesList.length <= 4 &&
                      imagesList.map((img, idx) => {
                        const isSelected = selectedImageIndex === idx
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all bg-card cursor-pointer group ${
                              isSelected
                                ? "border-[#008376] dark:border-[#fdc72d] shadow-sm"
                                : "border-border/70 hover:border-foreground/40 opacity-70 hover:opacity-100 hover:scale-[1.01]"
                            }`}
                            aria-label={`View photo ${idx + 1} of ${imagesList.length}`}
                          >
                            <img
                              src={img}
                              alt={`${product.name} view ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            
                          </button>
                        )
                      })}

                    {/* If imagesList has more than 4 images: render first 3 + a 4th slot with +N badge */}
                    {imagesList.length > 4 && (
                      <>
                        {/* Slots 0, 1, 2 */}
                        {imagesList.slice(0, 3).map((img, idx) => {
                          const isSelected = selectedImageIndex === idx
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedImageIndex(idx)}
                              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all bg-card cursor-pointer group ${
                                isSelected
                                  ? "border-[#008376] dark:border-[#fdc72d] shadow-sm"
                                  : "border-border/70 hover:border-foreground/40 opacity-70 hover:opacity-100 hover:scale-[1.01]"
                              }`}
                              aria-label={`View photo ${idx + 1} of ${imagesList.length}`}
                            >
                              <img
                                src={img}
                                alt={`${product.name} view ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />

                            </button>
                          )
                        })}

                        {/* Slot 3: Represents the 4th and subsequent photos (+N) */}
                        {(() => {
                          const remainingCount = imagesList.length - 3
                          const isSlotActive = selectedImageIndex >= 3
                          // If active photo is one of the overflow ones, show it as background
                          const bgImage = isSlotActive
                            ? imagesList[selectedImageIndex]
                            : imagesList[3]

                          return (
                            <button
                              type="button"
                              onClick={() => {
                                if (selectedImageIndex < 3) {
                                  setSelectedImageIndex(3)
                                }
                                handleResetZoom()
                                setIsLightboxOpen(true)
                              }}
                              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all bg-card cursor-pointer group ${
                                isSlotActive
                                  ? "border-[#008376] dark:border-[#fdc72d] shadow-sm"
                                  : "border-border/70 hover:border-foreground/40 opacity-90 hover:opacity-100 hover:scale-[1.01]"
                              }`}
                              aria-label={
                                currentLang === "gu"
                                  ? `બાકીના ${remainingCount} ફોટા જુઓ`
                                  : `View remaining ${remainingCount} photos`
                              }
                            >
                              <img
                                src={bgImage}
                                alt={`${product.name} more photos`}
                                className="w-full h-full object-cover rounded-lg blur-[0.5px]"
                              />

                              {/* Elegant Frosted Dark Glassmorphic +N Overlay */}
                              <div className="absolute inset-0 bg-[#06302b]/60 group-hover:bg-[#06302b]/70 backdrop-blur-[1.5px] transition-all flex flex-col items-center justify-center text-white p-1">
                                <span className="text-sm sm:text-base font-black tracking-tight text-white group-hover:text-[#fdc72d] transition-colors flex items-center gap-0.5">
                                  +{toDigits(remainingCount)}
                                </span>
                                <span className="text-xs sm:text-xs font-bold text-white/90 uppercase tracking-wider text-center leading-tight">
                                  {currentLang === "gu" ? "વધુ ફોટો" : "More"}
                                </span>
                              </div>

                              {/* Active indicator bar */}
                              
                            </button>
                          )
                        })()}
                      </>
                    )}
                  </div>

                  {/* Optional View All Photos button below if imagesList > 4 */}
                  {imagesList.length > 4 && (
                    <div className="mt-2 flex items-center justify-between px-1">
                      <span className="text-xs text-muted-foreground font-medium">
                        {currentLang === "gu"
                          ? `કુલ ${toDigits(imagesList.length)} ચિત્રો ઉપલબ્ધ`
                          : `Total ${toDigits(imagesList.length)} photos available`}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleResetZoom()
                          setIsLightboxOpen(true)
                        }}
                        className="text-xs font-bold text-[#00685d] dark:text-[#fdc72d] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>
                          {currentLang === "gu"
                            ? `બધા ફોટો જુઓ (${toDigits(imagesList.length)})`
                            : `View all photos (${toDigits(imagesList.length)})`}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}


            </div>

            {/* RIGHT COLUMN: Commerce Info, Variants & Actions (6 cols on lg/xl) */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-6">
              {/* Product Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      SKU: {product.sku}
                    </span>
                    <span className="text-border">•</span>
                    <span className="text-xs font-bold text-[#00685d] dark:text-[#fdc72d] uppercase">
                      {product.categoryName || product.category}
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
                    <span className="text-muted-foreground">
                      ({currentLang === "gu" ? `${toDigits(product.reviewsCount)} સમીક્ષાઓ` : `${product.reviewsCount} reviews`})
                    </span>
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
                    <span>
                      {currentLang === "gu" ? "અધિષ્ઠાતા દેવ / ગ્રહ:" : "Ruling Deity / Planet:"}{" "}
                      <strong>{product.deityOrPlanet}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Pricing, Stock Scarcity & Pincode Delivery Card */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-col gap-3.5">
                {/* Price, Discount & Stock Urgency Row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#00685d] dark:text-[#fdc72d]">
                      {formatPrice(totalItemPrice)}
                    </span>
                    {originalPrice > currentPrice && (
                      <span className="text-base sm:text-lg text-muted-foreground line-through">
                        {formatPrice(totalOriginalPrice)}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs px-2 py-0.5">
                        {toDigits(discountPercent)}% {currentLang === "gu" ? "બચત" : "OFF"}
                      </Badge>
                    )}
                  </div>

                  {/* Clean Scarcity Pill without distracting noise */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/25 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>
                      {currentLang === "gu"
                        ? `સીમિત સ્ટોક (માત્ર ${toDigits(product.stockCount)} નંગ બાકી)`
                        : `Limited Stock (Only ${product.stockCount} left)`}
                    </span>
                  </div>
                </div>

                {/* Assurance Note */}
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00685d] dark:text-[#fdc72d] shrink-0" />
                  <span>
                    {currentLang === "gu"
                      ? "તમામ કરવેરા & વૈદિક પ્રાણ-પ્રતિષ્ઠા સામેલ • સમગ્ર ભારતમાં મફત શિપિંગ"
                      : "Inclusive of all taxes & Vedic Consecration • Free Shipping across India"}
                  </span>
                </p>

              </div>

              {/* Available Variants Selector with Full Bead Specifications */}
              {product.variants && product.variants.length > 0 && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#00685d] dark:text-[#fdc72d]" />
                      <span>{currentLang === "gu" ? "ઉપલબ્ધ વિકલ્પો / સાઇઝ પસંદ કરો:" : "Select Available Variant / Size:"}</span>
                    </label>
                    <span className="text-xs text-muted-foreground font-medium">
                      {currentLang === "gu" ? "વિકલ્પ બદલતાં ફોટો આપમેળે બદલાશે" : "Photo changes with selected variant"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => handleSelectVariant(v)}
                          className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all relative cursor-pointer group ${
                            isSelected
                              ? "border-[#00685d] bg-[#00685d]/5 dark:border-[#fdc72d] dark:bg-[#fdc72d]/10 shadow-sm ring-2 ring-[#00685d]/30 dark:ring-[#fdc72d]/30 scale-[1.01]"
                              : "border-border/80 bg-card hover:bg-muted/40 hover:border-foreground/30 shadow-2xs"
                          }`}
                        >
                          {/* Top row: Tag Badge & Active Checkmark */}
                          <div className="flex items-center justify-between gap-1.5 mb-2 min-h-[22px]">
                            {v.tag ? (
                              <Badge className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                                isSelected 
                                  ? "bg-[#00685d] text-white dark:bg-[#fdc72d] dark:text-[#0e3934]" 
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                {v.tag}
                              </Badge>
                            ) : <span />}

                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#00685d] text-white dark:bg-[#fdc72d] dark:text-[#0e3934] flex items-center justify-center text-xs font-bold shadow-xs shrink-0">
                                <Check className="h-3 w-3 stroke-[3]" />
                              </span>
                            )}
                          </div>

                          {/* Variant Title */}
                          <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                            {v.name}
                          </span>

                          {/* Clean Key Spec Summary */}
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1 mb-2.5">
                            <span>{v.beadDiameter || "7-8mm"}</span>
                            <span>•</span>
                            <span>{v.weight || "108+1 Beads"}</span>
                          </div>

                          {/* Price & Stock Row */}
                          <div className="flex items-baseline justify-between pt-2 border-t border-border/40 mt-auto">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm sm:text-base font-extrabold text-[#00685d] dark:text-[#fdc72d]">
                                {formatPrice(v.price)}
                              </span>
                              {v.originalPrice && v.originalPrice > v.price && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {formatPrice(v.originalPrice)}
                                </span>
                              )}
                            </div>

                            {v.stockCount && v.stockCount <= 3 && (
                              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                                {currentLang === "gu" ? `માત્ર ${toDigits(v.stockCount)} બાકી` : `${v.stockCount} left`}
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Main Action Buttons */}
              <div className="flex flex-col gap-3 pt-1">
                {/* Responsive Action Grid: Never crowds on tablets (768px-1024px) or mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
                  {/* Quantity Stepper */}
                  <div className="sm:col-span-4 lg:col-span-3 flex items-center justify-between rounded-xl bg-card border border-border p-1 shadow-xs h-12">
                    <button
                      type="button"
                      onClick={handleDecreaseQty}
                      disabled={qty <= 1}
                      className="w-10 h-full rounded-lg hover:bg-muted text-foreground flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
                      aria-label="Decrease Quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-base font-bold text-foreground tabular-nums px-2">
                      {toDigits(qty)}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncreaseQty}
                      className="w-10 h-full rounded-lg hover:bg-muted text-foreground flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Increase Quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    size="lg"
                    onClick={() => handleAddToCart(false)}
                    className="sm:col-span-8 lg:col-span-5 h-12 rounded-xl bg-[#00685d] hover:bg-[#005048] text-white font-bold text-sm shadow-md gap-2 whitespace-nowrap cursor-pointer transition-all active:scale-[0.99]"
                  >
                    <ShoppingCart className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap">{currentLang === "gu" ? "કાર્ટમાં ઉમેરો" : "Add to Cart"}</span>
                  </Button>

                  {/* Buy Now Instant Checkout Button */}
                  <Button
                    size="lg"
                    onClick={() => handleAddToCart(true)}
                    className="sm:col-span-12 lg:col-span-4 h-12 rounded-xl bg-[#fdc72d] hover:bg-[#d9a100] text-[#0e3934] font-bold text-sm shadow-md gap-2 whitespace-nowrap cursor-pointer transition-all active:scale-[0.99]"
                  >
                    <Zap className="h-4 w-4 fill-current shrink-0" />
                    <span className="whitespace-nowrap">{currentLang === "gu" ? "હમણાં ખરીદો" : "Buy Now"}</span>
                  </Button>
                </div>

                
              </div>

              {/* Checkout Security & Trust Highlights */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                  <span>{currentLang === "gu" ? "૧૦૦% પ્રમાણિત ખાતરી" : "100% Authenticity Guarantee"}</span>
                </span>
                <span className="text-border">•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00685d] dark:text-[#fdc72d]" />
                  <span>{currentLang === "gu" ? "સુરક્ષિત ઓર્ડર" : "100% Secure Order"}</span>
                </span>
                <span className="text-border">•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                  <span>{currentLang === "gu" ? "ટ્રેકિંગ સાથે ડિલિવરી" : "Tracked Delivery"}</span>
                </span>
              </div>
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
                    {
                      id: "details",
                      shortLabel: currentLang === "gu" ? "મહત્વ & લાભ" : "Benefits",
                      fullLabel: currentLang === "gu" ? "પવિત્ર મહત્વ & લાભ" : "Significance & Benefits"
                    },
                    {
                      id: "consecration",
                      shortLabel: currentLang === "gu" ? "પ્રાણ-પ્રતિષ્ઠા" : "Consecration",
                      fullLabel: currentLang === "gu" ? "વૈદિક પ્રાણ-પ્રતિષ્ઠા વિધિ" : "Consecration Ritual"
                    },
                    {
                      id: "labcert",
                      shortLabel: currentLang === "gu" ? "લેબ સર્ટિફિકેટ" : "Certificate",
                      fullLabel: currentLang === "gu" ? "લેબ પ્રમાણપત્ર & X-Ray" : "Lab Certificate & X-Ray"
                    },
                    {
                      id: "specs",
                      shortLabel: currentLang === "gu" ? "સ્પષ્ટીકરણ" : "Specifications",
                      fullLabel: currentLang === "gu" ? "વિશેષ સ્પષ્ટીકરણ" : "Specifications"
                    },
                    {
                      id: "faqs",
                      shortLabel: currentLang === "gu" ? "પ્રશ્નોત્તરી" : "FAQs",
                      fullLabel: currentLang === "gu" ? "પ્રશ્નોત્તરી (FAQs)" : "FAQs"
                    },
                  ]
                    // The certificate and specification tabs describe rudraksha beads; FAQs only exist when entered in the admin.
                    .filter((tab) => {
                      if (tab.id === "labcert" || tab.id === "specs") return ["rudraksha", "malas"].includes(product.category)
                      if (tab.id === "faqs") return product.faqs?.length > 0
                      return true
                    })
                    .map((tab, idx) => {
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={(e) => {
                          setActiveTab(tab.id)
                          e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
                        }}
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-[#00685d] text-white shadow-md scale-[1.01]"
                            : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-xs sm:text-xs flex items-center justify-center font-bold ${
                          isActive ? "bg-white/20 text-white" : "bg-muted-foreground/15 text-muted-foreground"
                        }`}>
                          {toDigits(idx + 1)}
                        </span>
                        <span className="sm:hidden">{tab.shortLabel}</span>
                        <span className="hidden sm:inline">{tab.fullLabel}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Right Arrow Button (Clean affordance without distracting pulse) */}
                <button
                  type="button"
                  onClick={() => scrollTabs("right")}
                  disabled={!canScrollTabsRight}
                  aria-label={currentLang === "gu" ? "જમણી બાજુ સ્ક્રોલ કરો" : "Scroll tabs right"}
                  className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shrink-0 transition-all border ${
                    canScrollTabsRight
                      ? "bg-card hover:bg-[#00685d] hover:text-white text-foreground border-border shadow-xs cursor-pointer active:scale-95"
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

                {/* Sacred Beej Mantra & Wearing Instructions Card */}
                {product.beejMantra && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#8a6800] dark:text-[#fdc72d] flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        <span>{currentLang === "gu" ? "સિદ્ધ બીજ મંત્ર અને જાપ વિધિ" : "Sacred Beej Mantra & Chanting Rules"}</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyMantra}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        {copiedMantra ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>
                          {copiedMantra
                            ? currentLang === "gu"
                              ? "કૉપી થયું!"
                              : "Copied!"
                            : currentLang === "gu"
                              ? "કૉપી કરો"
                              : "Copy Mantra"}
                        </span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-card border border-border/60 text-sm sm:text-base font-bold text-foreground text-center tracking-wide shadow-2xs">
                      {product.beejMantra}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-muted-foreground pt-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                        <span>
                          {currentLang === "gu" ? "શુભ દિવસ / મુહૂર્ત:" : "Auspicious Day:"}{" "}
                          <strong className="text-foreground">{product.wearingDay}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                        <span>
                          {currentLang === "gu" ? "ધારણ સ્થાન:" : "Wearing Placement:"}{" "}
                          <strong className="text-foreground">{product.fingerOrPosition}</strong>
                        </span>
                      </div>
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
                      {toDigits(1)}
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {currentLang === "gu" ? "પ્રાકૃતિક અસલી પસંદગી" : "Authentic Natural Selection"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {currentLang === "gu"
                        ? "ખાણ કે વનમાંથી ૧૦૦% અસલી સામગ્રીની જાતે તપાસ."
                        : "Personally verified genuine sourcing from pristine forests."}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-col gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#fdc72d] font-bold text-xs flex items-center justify-center">
                      {toDigits(2)}
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {currentLang === "gu" ? "ગંગાજળ & પંચામૃત સ્નાન" : "Gangajal & Panchamrit Bath"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {currentLang === "gu"
                        ? "હરિદ્વાર શુદ્ધ ગંગાજળ અને દૂધ-મધથી શુદ્ધિકરણ."
                        : "Purified with Haridwar holy Gangajal, cow milk, and honey."}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-col gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#fdc72d] font-bold text-xs flex items-center justify-center">
                      {toDigits(3)}
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {currentLang === "gu" ? "૧,૧૦૦ મંત્રોચ્ચાર આહુતિ" : "1,100 Vedic Mantra Chants"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {currentLang === "gu"
                        ? "શુભ મુહૂર્તમાં વિદ્વાન બ્રાહ્મણો દ્વારા સિદ્ધિ હોમ."
                        : "Energized through sacred homa by learned Acharyas."}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-col gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#00685d]/10 text-[#00685d] dark:text-[#fdc72d] font-bold text-xs flex items-center justify-center">
                      {toDigits(4)}
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {currentLang === "gu" ? "લેબ સર્ટિફિકેટ & પેકિંગ" : "Lab Certificate & Packing"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {currentLang === "gu"
                        ? "ગંગાજળ બોટલ અને સર્ટિફિકેટ સાથે અખંડ સીલ પેકિંગ."
                        : "Dispatched in sealed tamper-proof box with Gangajal vial & certificate."}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Official Lab Certificate with High-Res X-Ray Visual Scan */}
            {activeTab === "labcert" && (
              <div className="pt-6 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00685d]/10 dark:bg-[#fdc72d]/10 flex items-center justify-center shrink-0">
                    <FileCheck className="h-5 w-5 text-[#00685d] dark:text-[#fdc72d]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {currentLang === "gu" ? "અધિકૃત લેબ પ્રમાણપત્ર & X-Ray રિપોર્ટ" : "Official Govt. Lab Certificate & X-Ray Report"}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {currentLang === "gu"
                        ? "ડિજિટલ એક્સ-રે રેડિયોગ્રાફી અને રાસાયણિક પૃથક્કરણ દ્વારા ૧૦૦% અસલ નેપાળી હોવાની ખાતરી"
                        : "Certified 100% Genuine Nepali origin verified via Digital X-Ray Radiography and chemical analysis"}
                    </p>
                  </div>
                </div>

                {/* 2-Column Grid: Visual Certificate Card on Left, Scientific Report Table on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left (5 cols): High-Resolution Certificate Document Visual */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    <div
                      className="group relative rounded-2xl overflow-hidden border-2 border-[#00685d]/30 dark:border-[#fdc72d]/30 bg-muted/30 shadow-md cursor-zoom-in"
                      onClick={() => setIsCertModalOpen(true)}
                      role="button"
                      tabIndex={0}
                      aria-label={currentLang === "gu" ? "લેબ સર્ટિફિકેટ મોટું જુઓ" : "Inspect full lab certificate"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setIsCertModalOpen(true)
                      }}
                    >
                      <img
                        src="/images/rudraksha-lab-certificate-sample.jpg"
                        alt={currentLang === "gu" ? "નેપાળી ૫-મુખી રુદ્રાક્ષ લેબ સર્ટિફિકેટ X-Ray રિપોર્ટ" : "Nepali 5-Mukhi Rudraksha Lab Certificate X-Ray Report"}
                        className="w-full h-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                      />

                      {/* Click to Zoom Overlay Banner */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#06302b]/80 backdrop-blur-md text-white text-xs font-bold shadow-lg pointer-events-none group-hover:bg-[#00685d] transition-colors border border-white/10 whitespace-nowrap">
                        <ZoomIn className="h-3.5 w-3.5 text-[#fdc72d]" />
                        <span>{currentLang === "gu" ? "ક્લિક કરી મોટું પ્રમાણપત્ર જુઓ" : "Click to Inspect Certificate"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                      <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{currentLang === "gu" ? "QR કોડ સ્કેન વેરિફાઇડ" : "Live QR Scan Verified"}</span>
                      </span>
                      <span>{currentLang === "gu" ? "નમૂના રિપોર્ટ ID: RN-2023-0914" : "Sample Report ID: RN-2023-0914"}</span>
                    </div>
                  </div>

                  {/* Right (7 cols): Scientific Parameters Table & Authenticity Checklist */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xs">
                      <div className="bg-[#00685d]/10 dark:bg-[#fdc72d]/10 px-4 py-3 border-b border-border/70 flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00685d] dark:text-[#fdc72d]">
                          {currentLang === "gu" ? "લેબોરેટરી વૈજ્ઞાનિક પરીક્ષણ પરિણામો" : "Laboratory Scientific Test Results"}
                        </span>
                        <Badge className="bg-emerald-600 text-white text-xs font-bold">
                          {currentLang === "gu" ? "૧૦૦% ઉત્તીર્ણ" : "PASSED (100%)"}
                        </Badge>
                      </div>

                      <table className="w-full text-xs sm:text-sm text-left">
                        <tbody className="divide-y divide-border/50">
                          <tr>
                            <td className="p-3 sm:p-3.5 font-bold text-foreground w-2/5">
                              {currentLang === "gu" ? "માન્યતા પ્રાપ્ત પ્રયોગશાળા" : "Accredited Laboratory"}
                            </td>
                            <td className="p-3 sm:p-3.5 text-foreground font-semibold">
                              Gemological Laboratory of Nepal (GLN) • Kathmandu
                            </td>
                          </tr>
                          <tr className="bg-muted/20">
                            <td className="p-3 sm:p-3.5 font-bold text-foreground">
                              {currentLang === "gu" ? "પરીક્ષણ પદ્ધતિ" : "Testing Methodology"}
                            </td>
                            <td className="p-3 sm:p-3.5 text-muted-foreground">
                              {currentLang === "gu" ? "નોન-ડિસ્ટ્રક્ટિવ ડિજિટલ X-Ray રેડિયોગ્રાફી" : "Digital X-Ray Radiography & Microscopic Analysis"}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 sm:p-3.5 font-bold text-foreground">
                              {currentLang === "gu" ? "આંતરિક બીજ કક્ષો (Chambers)" : "Internal Seed Chambers"}
                            </td>
                            <td className="p-3 sm:p-3.5 text-emerald-700 dark:text-emerald-400 font-bold">
                              {currentLang === "gu" ? "૫ સ્પષ્ટ પ્રાકૃતિક ખાના (X-Ray માં સ્પષ્ટ દ્રશ્યમાન)" : "5 Distinct Natural Seed Compartments (100% Clear in X-Ray)"}
                            </td>
                          </tr>
                          <tr className="bg-muted/20">
                            <td className="p-3 sm:p-3.5 font-bold text-foreground">
                              {currentLang === "gu" ? "વનસ્પતિ પ્રજાતિ શુદ્ધતા" : "Botanical Purity"}
                            </td>
                            <td className="p-3 sm:p-3.5 text-muted-foreground font-mono">
                              Elaeocarpus Ganitrus Roxb. (પ્રાકૃતિક કાષ્ઠ)
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 sm:p-3.5 font-bold text-foreground">
                              {currentLang === "gu" ? "કૃત્રિમ/રેઝિન ભેળસેળ" : "Synthetic / Plastic Adulteration"}
                            </td>
                            <td className="p-3 sm:p-3.5 text-foreground">
                              {currentLang === "gu" ? "શૂન્ય (Nil) — કોઈ પ્લાસ્ટિક, ગ્લુ કે કેમિકલ નથી" : "Nil (Negative) — Zero synthetic resin or adhesives"}
                            </td>
                          </tr>
                          <tr className="bg-muted/20">
                            <td className="p-3 sm:p-3.5 font-bold text-foreground">
                              {currentLang === "gu" ? "સપાટી અને મુખ રેખાઓ" : "Surface Facial Grooves"}
                            </td>
                            <td className="p-3 sm:p-3.5 text-muted-foreground">
                              {currentLang === "gu" ? "ઊંડા પ્રાકૃતિક ખાંચા, કોઈ માનવસર્જિત કોતરણી નથી" : "Deep natural furrow lines, uncarved natural texture"}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 sm:p-3.5 font-bold text-foreground">
                              {currentLang === "gu" ? "અધિકૃત પ્રમાણપત્ર સાથે" : "Dispatched In Box"}
                            </td>
                            <td className="p-3 sm:p-3.5 text-muted-foreground font-medium">
                              {currentLang === "gu" ? "ઓરિજિનલ લેબ સર્ટિફિકેટ કાર્ડ, QR કોડ અને ગંગાજળ શીશી સાથે" : "Physical laminated certificate with QR verification & Gangajal vial"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Security Assurances Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40 border border-border/50 text-xs">
                        <Award className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-foreground block">
                            {currentLang === "gu" ? "હોલોગ્રામ સીલ સુરક્ષા" : "Holographic Anti-Counterfeit Seal"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {currentLang === "gu" ? "દરેક સર્ટિફિકેટ પર 3D હોલોગ્રામ સ્ટીકર સામેલ." : "Every report features a tamper-proof 3D hologram."}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40 border border-border/50 text-xs">
                        <ShieldCheck className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-foreground block">
                            {currentLang === "gu" ? "૧૦૦% મની-બેક ગેરંટી" : "100% Lifetime Authenticity Guarantee"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {currentLang === "gu" ? "ભારતની કોઈપણ લેબમાં નકલી સાબિત થાય તો ૧૦ ગણા નાણાં પરત." : "10x money-back assurance if proven non-genuine by any certified lab."}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Technical & Physical Specifications (Completely non-redundant) */}
            {activeTab === "specs" && (
              <div className="pt-6 flex flex-col gap-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {currentLang === "gu" ? "ભૌતિક અને તકનીકી સ્પષ્ટીકરણ" : "Physical & Technical Specifications"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {currentLang === "gu"
                      ? "માળાની સાઇઝ, વજન, દોરાનું મટિરિયલ અને ઘનતા વિગતો"
                      : "Detailed craftsmanship, bead diameter, knotting, weight, and density metrics"}
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <tbody className="divide-y divide-border/60">
                      <tr className="bg-muted/30">
                        <td className="p-3.5 sm:p-4 font-bold text-foreground w-1/3">
                          {currentLang === "gu" ? "વનસ્પતિ પ્રજાતિ (Botanical Name)" : "Botanical Species"}
                        </td>
                        <td className="p-3.5 sm:p-4 text-foreground font-mono font-medium">
                          Elaeocarpus Ganitrus Roxb. (કુદરતી હિમાલયન કાષ્ઠ)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-foreground">
                          {currentLang === "gu" ? "માળા સંરચના & દાણા સંખ્યા" : "Bead Count & Assembly"}
                        </td>
                        <td className="p-3.5 sm:p-4 text-foreground font-semibold">
                          {currentLang === "gu" ? "૧૦૮ દાણા + ૧ સુમેરુ બિંદુ (કુલ ૧૦૯ મણકા, શાસ્ત્રોક્ત જાપ વિધાન)" : "108 Japa Beads + 1 Sumeru Guru Bead (Total 109 Beads)"}
                        </td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-3.5 sm:p-4 font-bold text-foreground">
                          {currentLang === "gu" ? "દોરાનું મટિરિયલ અને ગાંઠ પદ્ધતિ" : "Thread & Knotting Technique"}
                        </td>
                        <td className="p-3.5 sm:p-4 text-muted-foreground">
                          {currentLang === "gu"
                            ? "પવિત્ર લાલ રેશમી દોરો, દરેક દાણા વચ્ચે સુરક્ષિત બ્રાહ્મણ હસ્ત-ગાંઠ (દાણા ઘસાતા નથી)"
                            : "Traditional Red Silk cord with individual hand-tied security knots between beads"}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-foreground">
                          {currentLang === "gu" ? "મણકાનો વ્યાસ (Bead Diameter)" : "Bead Diameter Range"}
                        </td>
                        <td className="p-3.5 sm:p-4 text-foreground">
                          {currentLang === "gu"
                            ? "૭ mm થી ૧૦ mm (પસંદ કરેલ વેરિઅન્ટ અનુસાર: ૭-૮mm નિયમિત / ૯-૧૦mm કલેક્ટર)"
                            : "7mm to 10mm (As per variant: 7-8mm Regular / 9-10mm Collector Grade)"}
                        </td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-3.5 sm:p-4 font-bold text-foreground">
                          {currentLang === "gu" ? "કુલ વજન (Net Weight)" : "Total Weight"}
                        </td>
                        <td className="p-3.5 sm:p-4 text-muted-foreground">
                          {currentLang === "gu"
                            ? "૩૪ ગ્રામ થી ૬૮ ગ્રામ (ચાંદી કેપિંગ સાથે ~૬૮ ગ્રામ)"
                            : "34 grams to 68 grams (~68g in pure silver-capped variant)"}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-foreground">
                          {currentLang === "gu" ? "વિશિષ્ટ ઘનતા (Density & Float)" : "Density & Float Test"}
                        </td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 dark:text-emerald-400 font-semibold">
                          {currentLang === "gu"
                            ? "૧.૨૮ g/cm³ (પાણીમાં તાત્કાલિક ડૂબતો અસલ નેપાળી દાણો)"
                            : "1.28 g/cm³ (Naturally sinks in water, passing authentic water test)"}
                        </td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-3.5 sm:p-4 font-bold text-foreground">
                          {currentLang === "gu" ? "ચાંદી ગુણવત્તા (કેપિંગ વિકલ્પમાં)" : "Silver Quality (Capping Option)"}
                        </td>
                        <td className="p-3.5 sm:p-4 text-foreground">
                          {currentLang === "gu" ? "શુદ્ધ ૯૨.૫% હોલમાર્ક્ડ સ્ટર્લિંગ સિલ્વર (Fine Filigree Silver Caps)" : "Pure 92.5% Hallmarked Sterling Silver caps"}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold text-foreground">
                          {currentLang === "gu" ? "પેકેજિંગ અને બોક્સ સમાવિષ્ટ" : "Box Inclusions"}
                        </td>
                        <td className="p-3.5 sm:p-4 text-muted-foreground">
                          {currentLang === "gu"
                            ? "ગંગોત્રી ગંગાજળ શીશી, શુદ્ધ ચંદન અને સુરક્ષિત લાકડાની ભેટ બોક્સ"
                            : "Gangotri holy water vial, sacred Chandan & gift box"}
                        </td>
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

          {/* Customer reviews: only real ones from the API are shown (none are invented) */}
          {product.reviews?.length > 0 && (
            <section className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {currentLang === "gu" ? "ગ્રાહકોના પ્રતિભાવ" : "Customer Reviews"}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-[#00685d] dark:text-[#fdc72d] leading-none">
                    {toDigits(product.rating)}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex text-[#fdc72d]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {currentLang === "gu"
                        ? `${toDigits(product.reviewsCount)} સમીક્ષાઓ`
                        : `${product.reviewsCount} reviews`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {product.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex text-[#fdc72d]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < (rev.rating || 5) ? "fill-current" : ""}`} />
                          ))}
                        </div>
                        {rev.date && <span className="text-xs text-muted-foreground">{rev.date}</span>}
                      </div>
                      {rev.title && <h4 className="font-bold text-sm text-foreground leading-snug">{rev.title}</h4>}
                      <p className="text-xs text-muted-foreground leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                    </div>
                    {rev.name && (
                      <div className="pt-2 border-t border-border/50 text-xs font-bold text-foreground">{rev.name}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

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
                        {Boolean(rel.badge && String(rel.badge).trim() !== "") && (
                          <Badge className="absolute top-2.5 left-2.5 bg-[#fdc72d] text-[#0e3934] font-bold text-xs shadow-sm">
                            {rel.badge}
                          </Badge>
                        )}
                      </Link>

                      {/* Content Details */}
                      <div className="flex flex-col gap-1.5 mb-3.5">
                        <div className="flex items-center gap-1.5 text-[#fdc72d] text-xs">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="font-bold text-foreground text-xs">{rel.rating}</span>
                          <span className="text-xs text-muted-foreground">({toDigits(rel.reviewsCount || 48)})</span>
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

      {/* 5. Mobile Sticky Bottom Purchase Bar (Persistent quick checkout on mobile screens) */}
      <aside
        aria-label={currentLang === "gu" ? "મોબાઇલ ઝડપી ખરીદી પટ્ટી" : "Mobile Quick Purchase Bar"}
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-md border-t border-border shadow-[0_-4px_24px_rgba(6,48,43,0.12)] px-3 sm:px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-2.5"
      >
        {/* Left: Thumbnail, Price & Selected Variant */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-11 h-11 rounded-xl overflow-hidden border border-border/80 bg-muted shrink-0 shadow-2xs">
            <img
              src={imagesList[selectedImageIndex] || imagesList[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-[#00685d] dark:text-[#fdc72d] truncate">
                {formatPrice(totalItemPrice)}
              </span>
              {originalPrice > currentPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(totalOriginalPrice)}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground truncate font-medium">
              {selectedVariant?.name || (currentLang === "gu" ? "મફત શિપિંગ સામેલ" : "Free Delivery Included")}
            </span>
          </div>
        </div>

        {/* Right: Add to Cart and Buy Now Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            size="sm"
            onClick={() => handleAddToCart(false)}
            className="h-10 px-3 rounded-xl bg-[#00685d] hover:bg-[#005048] text-white font-bold text-xs shadow-xs gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
            aria-label={currentLang === "gu" ? "કાર્ટમાં ઉમેરો" : "Add to Cart"}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>{currentLang === "gu" ? "કાર્ટ" : "Cart"}</span>
          </Button>

          <Button
            size="sm"
            onClick={() => handleAddToCart(true)}
            className="h-10 px-3.5 rounded-xl bg-[#fdc72d] hover:bg-[#d9a100] text-[#0e3934] font-bold text-xs shadow-xs gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>{currentLang === "gu" ? "હમણાં ખરીદો" : "Buy Now"}</span>
          </Button>
        </div>
      </aside>

      {/* Global Footer */}
      <AstroFooter
        config={astroData.config}
        footer={astroData.footer}
        lang={currentLang}
      />

      {/* Fullscreen Image Lightbox Modal with Smooth Pan & Multi-level Zoom */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setIsLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Top Bar: Back to product (left) & Image Counter (right) */}
          <div
            className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="flex items-center gap-2 text-white/90 hover:text-white text-sm sm:text-base font-semibold transition-colors cursor-pointer group py-1"
              aria-label="Back to product"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-0.5 transition-transform" />
              <span>{currentLang === "gu" ? "પ્રોડક્ટ પર પાછા જાઓ" : "Back to product"}</span>
            </button>

            {imagesList.length > 0 && (
              <span className="text-white/80 font-semibold text-sm sm:text-base tabular-nums tracking-wider">
                {toDigits(selectedImageIndex + 1)}/{toDigits(imagesList.length)}
              </span>
            )}
          </div>

          {/* Modal Center Showcase: Direct image with clean left/right navigation */}
          <div
            className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-auto overflow-hidden py-2 sm:py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow Button (Clean white square button matching reference) */}
            {imagesList.length > 1 && (
              <button
                type="button"
                onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1))}
                className="absolute left-2 sm:left-4 z-20 w-8 h-9 sm:w-9 sm:h-10 rounded bg-white hover:bg-white/90 text-black flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
              </button>
            )}

            {/* Main Image (Clean, No Zoom, Directly on Black Backdrop) */}
            <img
              src={imagesList[selectedImageIndex] || imagesList[0]}
              alt={product.name}
              draggable={false}
              className="max-h-[76vh] sm:max-h-[82vh] max-w-full object-contain rounded-lg select-none shadow-2xl"
            />

            {/* Next Arrow Button (Clean white square button matching reference) */}
            {imagesList.length > 1 && (
              <button
                type="button"
                onClick={() => setSelectedImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:right-4 z-20 w-8 h-9 sm:w-9 sm:h-10 rounded bg-white hover:bg-white/90 text-black flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Modal Bottom: Product Title Centered */}
          <div
            className="w-full max-w-7xl mx-auto flex items-center justify-center z-20 shrink-0 pt-2 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white/90 font-semibold text-sm sm:text-base tracking-tight text-center truncate max-w-2xl">
              {product.name}
            </h3>
          </div>
        </div>
      )}

      {/* Fullscreen Certificate Inspection Modal */}
      {isCertModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#06302b]/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setIsCertModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3 sm:gap-4 z-20 pb-3 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#00685d] text-white flex items-center justify-center shrink-0 shadow-sm">
                <FileCheck className="h-4 w-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-bold text-xs sm:text-sm truncate">
                  {currentLang === "gu"
                    ? "અધિકૃત સરકારી માન્યતા પ્રાપ્ત લેબ પ્રમાણપત્ર & X-Ray રિપોર્ટ"
                    : "Official Govt. Accredited Lab Certificate & Digital X-Ray Report"}
                </span>
                <span className="text-white/60 text-xs truncate">
                  Gemological Laboratory of Nepal (GLN) • Ref: RN-2023-0914 • Kathmandu
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="hidden sm:inline-flex bg-emerald-600 text-white font-bold text-xs px-2.5 py-1">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {currentLang === "gu" ? "પ્રમાણિત અસલ" : "100% Genuine"}
              </Badge>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 active:scale-95"
                aria-label={currentLang === "gu" ? "બંધ કરો" : "Close certificate modal"}
                title="Close (Escape)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Center Scan Visual */}
          <div
            className="relative flex-1 w-full max-w-4xl mx-auto flex items-center justify-center my-3 sm:my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/rudraksha-lab-certificate-sample.jpg"
              alt={currentLang === "gu" ? "નેપાળી ૫-મુખી રુદ્રાક્ષ લેબ સર્ટિફિકેટ X-Ray રિપોર્ટ" : "Nepali 5-Mukhi Rudraksha Lab Certificate X-Ray Report"}
              className="max-h-[74vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Bottom Verification Strip */}
          <div
            className="w-full max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-white/80 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>{currentLang === "gu" ? "QR કોડ સ્કેન દ્વારા ઑનલાઇન વેરિફાઇડ" : "Live QR Verification Passed"}</span>
              </span>
              <span className="hidden md:inline text-white/40">•</span>
              <span className="text-white/70">
                {currentLang === "gu" ? "ડિજિટલ X-Ray: ૫ આંતરિક કક્ષો પ્રમાણિત" : "Digital X-Ray: 5 internal chambers verified"}
              </span>
              <span className="hidden md:inline text-white/40">•</span>
              <span className="text-white/70">
                {currentLang === "gu" ? "શૂન્ય રેઝિન / સિન્થેટીક ભેળસેળ" : "Zero synthetic adulteration"}
              </span>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsCertModalOpen(false)}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs rounded-lg ml-auto cursor-pointer"
            >
              {currentLang === "gu" ? "પાછા જાઓ" : "Close Preview"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
