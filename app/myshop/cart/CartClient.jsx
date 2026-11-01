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
  Lock,
  Trash2,
  Plus,
  Minus,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  Tag,
  CheckCircle2,
  Check,
  X,
  MessageCircle,
  Award,
  Truck,
  CreditCard,
  Wallet,
  Landmark,
  BadgePercent,
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"

import { toast } from "@/components/ui/sonner"
import { shopService } from "@/lib/api"
import { loadLiveCatalog } from "@/lib/api/hooks/use-shop-data"
import { useLanguage } from "@/components/language-provider"
import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { getCartData } from "@/lib/data/cart-data"

const CART_STORAGE_KEY = "astro_cart_items"
const SAVED_STORAGE_KEY = "astro_saved_items"
const COUPON_STORAGE_KEY = "astro_applied_coupon"

export default function CartClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const currentLang = lang || "gu"

  const astroData = useHomeData(currentLang)
  const founder = astroData.config?.founder
  const cartData = React.useMemo(() => getCartData(currentLang), [currentLang])
  const supportWhatsappUrl = founder?.whatsappUrl || cartData.trustPillars.supportStrip.whatsappUrl

  // Cart Items State - Initialized lazily from localStorage
  const [cartItems, setCartItems] = React.useState(() => {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) || [] : []
    } catch {
      return []
    }
  })
  const [savedItems, setSavedItems] = React.useState(() => {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY)
      return stored ? JSON.parse(stored) || [] : []
    } catch {
      return []
    }
  })
  const isClientLoaded = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  // Coupon Voucher State
  const [couponInput, setCouponInput] = React.useState("")
  const [appliedCoupon, setAppliedCoupon] = React.useState(() => {
    if (typeof window === "undefined") return null
    try {
      const stored = localStorage.getItem(COUPON_STORAGE_KEY)
      return stored ? JSON.parse(stored) || null : null
    } catch {
      return null
    }
  })

  // Clear Cart confirmation dialog
  const [showClearConfirm, setShowClearConfirm] = React.useState(false)

  // Sync with storage events on mount
  React.useEffect(() => {
    const handleStorageUpdate = () => {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) setCartItems(parsed)
        }
      } catch {}
    }

    window.addEventListener("astro_cart_updated", handleStorageUpdate)
    window.addEventListener("storage", handleStorageUpdate)

    return () => {
      window.removeEventListener("astro_cart_updated", handleStorageUpdate)
      window.removeEventListener("storage", handleStorageUpdate)
    }
  }, [])

  // Sync cart items to localStorage
  const updateCartState = React.useCallback((newItems) => {
    setCartItems(newItems)
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
      try { window.dispatchEvent(new Event("astro_cart_updated")) } catch {}
    } catch {
      // ignore storage error
    }
  }, [])

  // Sync saved items to localStorage
  const updateSavedState = React.useCallback((newSaved) => {
    setSavedItems(newSaved)
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(newSaved))
    } catch {
      // ignore storage error
    }
  }, [])

  // Numeric calculations
  const subtotal = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0)
  }, [cartItems])

  const originalTotal = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.originalPrice || item.price) * (item.qty || 1), 0)
  }, [cartItems])

  const itemSavings = originalTotal - subtotal

  const couponDiscount = React.useMemo(() => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.discountAmount !== undefined) return Math.round(appliedCoupon.discountAmount)
    return Math.round(subtotal * (appliedCoupon.discountPercent / 100))
  }, [subtotal, appliedCoupon])

  const finalTotal = Math.max(0, subtotal - couponDiscount)
  const totalSavings = itemSavings + couponDiscount
  const totalItemCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0)

  // Refresh stored prices from the live catalog
  React.useEffect(() => {
    if (!isClientLoaded) return
    let cancelled = false

    loadLiveCatalog(currentLang)
      .then(({ products }) => {
        if (cancelled) return
        const bySlug = new Map(products.map((p) => [p.slug, p]))
        setCartItems((prev) => {
          let changed = false
          const next = prev.map((item) => {
            const live = bySlug.get(item.productId)
            if (!live || live.price === item.price) return item
            changed = true
            return { ...item, price: live.price, originalPrice: live.originalPrice }
          })
          if (!changed) return prev
          try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next))
          } catch {
            // ignore storage error
          }
          return next
        })
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [isClientLoaded, currentLang])

  // Re-validate applied coupon when subtotal changes
  const appliedCouponCode = appliedCoupon?.code
  React.useEffect(() => {
    if (!isClientLoaded || !appliedCouponCode || subtotal <= 0) return
    let cancelled = false

    shopService
      .validateCoupon(appliedCouponCode, subtotal, currentLang)
      .then((res) => {
        if (cancelled) return
        setAppliedCoupon((prev) =>
          prev && prev.code === res.data.code
            ? {
                ...prev,
                discountPercent: res.data.discount_percent,
                discountAmount: res.data.discount_amount,
              }
            : prev
        )
      })
      .catch((error) => {
        if (!cancelled && error.status === 422) {
          setAppliedCoupon(null)
          try { localStorage.removeItem(COUPON_STORAGE_KEY) } catch {}
        }
      })

    return () => {
      cancelled = true
    }
  }, [isClientLoaded, appliedCouponCode, subtotal, currentLang])

  // Helpers for digits and currency
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
      const formatted = Number(amount || 0).toLocaleString(currentLang === "gu" ? "gu-IN" : "en-IN")
      return `₹${toDigits(formatted)}`
    },
    [currentLang, toDigits]
  )

  const getText = React.useCallback(
    (field) => {
      if (!field) return ""
      if (typeof field === "string") return field
      if (typeof field === "object") return field[currentLang] || field.gu || field.en || ""
      return String(field)
    },
    [currentLang]
  )

  // Navigate to new page of details: /myshop/checkout
  const handleProceedToCheckout = React.useCallback(() => {
    if (cartItems.length === 0) {
      toast.info(currentLang === "gu" ? "આપનો કાર્ટ ખાલી છે." : "Your cart is empty.")
      return
    }
    router.push("/myshop/checkout")
  }, [cartItems.length, currentLang, router])

  // Handlers for cart actions
  const handleIncreaseQty = (itemId) => {
    const updated = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, qty: (item.qty || 1) + 1 }
      }
      return item
    })
    updateCartState(updated)
  }

  const handleDecreaseQty = (itemId) => {
    const target = cartItems.find((item) => item.id === itemId)
    if (!target) return
    if ((target.qty || 1) <= 1) {
      handleRemoveItem(itemId)
      return
    }
    const updated = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, qty: item.qty - 1 }
      }
      return item
    })
    updateCartState(updated)
  }

  const handleRemoveItem = (itemId) => {
    const itemToRemove = cartItems.find((i) => i.id === itemId)
    const updated = cartItems.filter((i) => i.id !== itemId)
    updateCartState(updated)
    toast.info(
      currentLang === "gu"
        ? `"${getText(itemToRemove?.name) || 'સામગ્રી'}" કાર્ટમાંથી દૂર કરવામાં આવી.`
        : `Item removed from cart.`
    )
  }

  const handleSaveForLater = (item) => {
    const updatedCart = cartItems.filter((i) => i.id !== item.id)
    const updatedSaved = [...savedItems.filter((i) => i.id !== item.id), item]
    updateCartState(updatedCart)
    updateSavedState(updatedSaved)
    toast.success(cartData.itemCard.savedForLaterSuccess)
  }

  const handleClearCart = () => {
    updateCartState([])
    setShowClearConfirm(false)
    try { localStorage.removeItem(COUPON_STORAGE_KEY) } catch {}
    toast.info(
      currentLang === "gu"
        ? "આપનો કાર્ટ ખાલી કરવામાં આવ્યો છે."
        : "Your cart has been cleared."
    )
  }

  const handleApplyCoupon = async (e) => {
    e?.preventDefault()
    const cleanCode = couponInput.trim().toUpperCase()
    if (!cleanCode) return

    try {
      const res = await shopService.validateCoupon(cleanCode, subtotal, currentLang)
      const found = {
        code: res.data.code,
        discountPercent: res.data.discount_percent,
        discountAmount: res.data.discount_amount,
      }
      setAppliedCoupon(found)
      try { localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(found)) } catch {}
      toast.success(
        currentLang === "gu"
          ? `કૂપન કોડ '${found.code}' સફળતાપૂર્વક લાગુ થયો! (${toDigits(found.discountPercent)}% છૂટ)`
          : `Coupon code '${found.code}' applied successfully! (${found.discountPercent}% OFF)`
      )
    } catch (error) {
      const message = error.status === 422 ? error.message : cartData.orderSummary.invalidCoupon
      toast.error(message)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponInput("")
    try { localStorage.removeItem(COUPON_STORAGE_KEY) } catch {}
    toast.info(
      currentLang === "gu"
        ? "કૂપન કોડ દૂર કરવામાં આવ્યો."
        : "Coupon code removed."
    )
  }

  // Dynamic WhatsApp order link generator
  const getWhatsAppOrderUrl = () => {
    const itemsList = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${getText(item.name)} (x${item.qty || 1}) - ₹${item.price * (item.qty || 1)}`
      )
      .join("%0A")

    const couponText = appliedCoupon
      ? `%0Aકૂપન: ${appliedCoupon.code} (-₹${couponDiscount})`
      : ""

    const message = `*નમસ્તે The Astro Code,*%0Aહું નીચે મુજબની સિદ્ધ સાધના સામગ્રી ઓર્ડર કરવા માંગુ છું:%0A%0A${itemsList}%0A%0A💰 *કુલ રકમ:* ₹${finalTotal}${couponText}%0A🚚 *ડિલિવરી:* મફત (FREE)%0A%0Aકૃપા કરીને મારો ઓર્ડર કન્ફર્મ કરો.`

    return `${supportWhatsappUrl}${supportWhatsappUrl.includes("?") ? "&" : "?"}text=${message}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#fdc72d]/30 selection:text-[#00685d]">
      {/* Main Global Header with dynamic cart bag count */}
      <AstroHeader
        config={astroData.config}
        topBar={astroData.topBar}
        navLinks={astroData.navLinks}
        activeCategory="myshop"
        lang={currentLang}
        onToggleLang={setLang}
        cartCount={totalItemCount}
      />

      <main className="flex-1 w-full bg-background">
        {/* Progress Stepper & Breadcrumb Bar */}
        <section className="w-full bg-card/80 backdrop-blur-md border-b border-border shadow-xs py-5 px-4 sm:px-6 lg:px-8 transition-colors">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
            {/* Breadcrumb Bar */}
            <Breadcrumb aria-label="Breadcrumb">
              <BreadcrumbList className="text-xs sm:text-sm text-muted-foreground flex-wrap">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors flex items-center gap-1.5"
                  >
                    <Link href="/">
                      <Home className="h-3.5 w-3.5" />
                      <span>{cartData.breadcrumb.home}</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors"
                  >
                    <Link href="/myshop">{cartData.breadcrumb.shop}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-[#00685d] dark:text-[#fdc72d]">
                    {cartData.breadcrumb.cart}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* 3-Step Interactive Indicator Stepper */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {cartData.stepper.map((stepItem, idx) => {
                const stepNum = idx + 1
                const isActive = stepNum === 1
                const isCompleted = false
                const IconComponent =
                  stepItem.icon === "ShoppingCart"
                    ? ShoppingCart
                    : stepItem.icon === "ShieldCheck"
                    ? ShieldCheck
                    : Lock

                const isDisabled = stepNum !== 1 && (stepNum === 3 || cartItems.length === 0)

                return (
                  <button
                    key={stepItem.step || stepNum}
                    type="button"
                    onClick={() => {
                      if (stepNum === 2 && cartItems.length > 0) {
                        router.push("/myshop/checkout")
                      }
                    }}
                    disabled={isDisabled}
                    className={`flex items-center gap-3 p-3.5 rounded-xl transition-all text-left w-full border ${
                      isActive
                        ? "bg-[#00685d] text-white shadow-md border-[#00685d] dark:bg-[#005048] dark:border-[#005048]"
                        : "bg-muted/40 hover:bg-muted text-muted-foreground border-border/60 cursor-pointer"
                    } ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    <div
                      className={`size-8 rounded-full shrink-0 aspect-square text-sm font-bold flex items-center justify-center leading-none tabular-nums select-none transition-colors ${
                        isActive
                          ? "bg-[#fdc72d] text-[#0e3934] shadow-xs"
                          : "bg-muted text-foreground border border-border/60"
                      }`}
                    >
                      {toDigits(stepNum)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-sm leading-tight truncate ${
                          isActive ? "font-bold text-white" : "font-semibold text-foreground"
                        }`}
                      >
                        {stepItem.title}
                      </span>
                      <span
                        className={`text-xs truncate ${
                          isActive ? "text-[#8bf5e4]" : "text-muted-foreground"
                        }`}
                      >
                        {stepNum === 1
                          ? (currentLang === "gu"
                              ? `કાર્ટ સમીક્ષા • ${toDigits(totalItemCount)} વસ્તુઓ`
                              : `Cart Review • ${totalItemCount} Items`)
                          : stepItem.subtitle}
                      </span>
                    </div>
                    <IconComponent
                      className={`ml-auto h-5 w-5 shrink-0 ${
                        isActive ? "text-[#fdc72d]" : "text-muted-foreground/60"
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Cart Content */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          {cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-card rounded-2xl border border-border shadow-xs">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-5 text-muted-foreground/60">
                <ShoppingBag className="h-12 w-12" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {cartData.cartActions.emptyCartTitle}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-8">
                {cartData.cartActions.emptyCartSubtitle}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00685d] hover:bg-[#005048] text-white font-bold rounded-xl shadow-md gap-2"
                >
                  <Link href="/myshop">
                    <ArrowLeft className="h-4 w-4" />
                    <span>{cartData.cartActions.exploreStore}</span>
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            /* Full Cart Grid */
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* LEFT COLUMN: Cart Items (65% width) */}
              <div className="w-full lg:w-[65%] flex flex-col gap-6">
                {/* Cart Table Header & Free Shipping Progress Milestone */}
                <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-xs flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 rounded-xl bg-[#00685d]/10 text-[#00685d] dark:bg-[#fdc72d]/10 dark:text-[#fdc72d]">
                        <ShoppingBag className="h-5 w-5" />
                      </span>
                      <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                        {cartData.cartHeader.title}
                      </h1>
                      <Badge
                        variant="secondary"
                        className="rounded-full px-3 py-1 font-semibold text-xs bg-muted text-muted-foreground"
                      >
                        {toDigits(totalItemCount)} {cartData.cartHeader.itemsCountSuffix}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#00685d] dark:text-[#fdc72d] text-xs font-bold bg-[#00685d]/5 dark:bg-[#fdc72d]/10 px-3 py-1.5 rounded-full">
                      <ShieldCheck className="h-4 w-4" />
                      <span>{cartData.cartHeader.consecratedBadge}</span>
                    </div>
                  </div>

                  {/* Free shipping notice */}
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/60 flex items-center gap-2 text-xs sm:text-sm text-[#00685d] dark:text-[#fdc72d] font-bold">
                    <Truck className="h-4 w-4 text-[#fdc72d]" />
                    <span>{cartData.cartHeader.freeShippingActive}</span>
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="flex flex-col gap-4" id="cart-item-list">
                  {cartItems.map((item) => {
                    const itemName = getText(item.name)
                    const itemSubtitle = getText(item.subtitle)
                    const itemBadge = getText(item.badge)
                    const itemAddon = getText(item.ritualAddon)
                    const itemPrice = item.price || 0
                    const itemOrigPrice = item.originalPrice || itemPrice
                    const itemQty = item.qty || 1
                    const discount = item.discountPercent || Math.round(((itemOrigPrice - itemPrice) / itemOrigPrice) * 100)

                    return (
                      <article
                        key={item.id}
                        className="bg-card p-4 sm:p-5 rounded-2xl border border-border shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 sm:gap-5 relative group"
                      >
                        {/* Thumbnail Image */}
                        <Link
                          href={`/myshop/product/${item.productId || item.id}`}
                          className="w-full sm:w-36 h-36 rounded-xl bg-muted overflow-hidden shrink-0 relative border border-border/40 block group/thumb cursor-pointer"
                        >
                          <Image
                            src={item.image || "https://dummyjson.com/image/200x100"}
                            alt={itemName}
                            fill
                            sizes="(max-width: 640px) 100vw, 144px"
                            className="object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                          />
                          {itemBadge && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#00685d]/95 text-white text-xs font-bold tracking-wide shadow-xs">
                              {itemBadge}
                            </span>
                          )}
                        </Link>

                        {/* Product Details */}
                        <div className="flex flex-col justify-between flex-1 min-w-0 gap-3">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-start justify-between gap-3">
                              <Link
                                href={`/myshop/product/${item.productId || item.id}`}
                                className="group/title"
                              >
                                <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover/title:text-[#00685d] dark:group-hover/title:text-[#fdc72d] transition-colors cursor-pointer">
                                  {itemName}
                                </h2>
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors shrink-0"
                                title={cartData.itemCard.deleteTitle}
                                aria-label={cartData.itemCard.deleteTitle}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            {itemSubtitle && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1.5 leading-relaxed">
                                <Award className="h-3.5 w-3.5 text-[#00685d] dark:text-[#fdc72d] shrink-0" />
                                <span>{itemSubtitle}</span>
                              </p>
                            )}
                          </div>

                          {/* Vedic Ritual Add-on Tag */}
                          {itemAddon && (
                            <div className="p-2.5 px-3 rounded-xl bg-muted/60 border border-border/50 flex items-center gap-2 text-xs text-foreground">
                              <ShieldCheck className="h-4 w-4 text-[#d9a100] shrink-0" />
                              <span className="flex-1 min-w-0 line-clamp-2">
                                {itemAddon}
                              </span>
                              <Badge className="ml-auto bg-[#00685d] text-white hover:bg-[#00685d] text-xs font-bold shrink-0">
                                {cartData.itemCard.freeTag}
                              </Badge>
                            </div>
                          )}

                          {/* Price & Quantity Stepper */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                            <div className="flex items-baseline gap-2">
                              <span className="text-lg sm:text-xl font-bold text-[#00685d] dark:text-[#fdc72d]">
                                {formatPrice(itemPrice * itemQty)}
                              </span>
                              {itemOrigPrice > itemPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {formatPrice(itemOrigPrice * itemQty)}
                                </span>
                              )}
                              {discount > 0 && (
                                <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded-md">
                                  {toDigits(discount)}% {cartData.itemCard.discountSuffix}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Save for later button */}
                              <button
                                type="button"
                                onClick={() => handleSaveForLater(item)}
                                className="text-xs text-muted-foreground hover:text-[#00685d] dark:hover:text-[#fdc72d] font-semibold flex items-center gap-1 transition-colors"
                              >
                                <Bookmark className="h-3.5 w-3.5" />
                                <span>{cartData.itemCard.saveForLater}</span>
                              </button>

                              {/* Quantity Stepper */}
                              <div className="flex items-center rounded-xl bg-muted border border-border p-0.5">
                                <button
                                  type="button"
                                  onClick={() => handleDecreaseQty(item.id)}
                                  aria-label={cartData.itemCard.qtyAriaMinus}
                                  className="w-7 h-7 rounded-lg bg-card text-foreground hover:bg-muted-foreground/15 flex items-center justify-center transition-colors shadow-xs"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-foreground">
                                  {toDigits(itemQty)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleIncreaseQty(item.id)}
                                  aria-label={cartData.itemCard.qtyAriaPlus}
                                  className="w-7 h-7 rounded-lg bg-card text-foreground hover:bg-muted-foreground/15 flex items-center justify-center transition-colors shadow-xs"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>

                {/* Table Bottom Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Button
                    variant="ghost"
                    onClick={() => setShowClearConfirm(true)}
                    className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl text-xs sm:text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    <span>{cartData.cartActions.clearCart}</span>
                  </Button>

                  {/* Proceed to Secure Checkout Button */}
                  <Button
                    size="lg"
                    onClick={handleProceedToCheckout}
                    className="bg-[#00685d] hover:bg-[#005048] text-white font-bold rounded-xl shadow-md gap-2"
                  >
                    <span>{cartData.orderSummary.checkoutButton}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* RIGHT COLUMN: Sticky Order Summary (35% width) */}
              <aside className="w-full lg:w-[35%] flex flex-col gap-6 lg:sticky lg:top-[180px]">
                {/* Order Summary Card */}
                <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-md flex flex-col gap-4">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground border-b border-border/60 pb-3">
                    {cartData.orderSummary.title}
                  </h2>

                  {/* Price Ledger Breakdown */}
                  <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>
                        {cartData.orderSummary.subtotalLabel} ({toDigits(totalItemCount)}{" "}
                        {cartData.cartHeader.itemsCountSuffix})
                      </span>
                      <span className="text-foreground font-semibold">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex items-center justify-between text-[#00685d] dark:text-[#fdc72d] font-semibold">
                        <span className="flex items-center gap-1">
                          <BadgePercent className="h-4 w-4" />
                          <span>
                            {cartData.orderSummary.discountLabel} ({toDigits(appliedCoupon.discountPercent)}%)
                          </span>
                        </span>
                        <span>- {formatPrice(couponDiscount)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>{cartData.orderSummary.shippingLabel}</span>
                      <span className="text-[#00685d] dark:text-[#fdc72d] font-bold">
                        {cartData.orderSummary.freeShipping}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="pt-1 flex flex-col gap-2 border-t border-border/50">
                    <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder={cartData.orderSummary.couponPlaceholder}
                          className="h-10 pl-9 uppercase tracking-wider text-xs sm:text-sm font-bold rounded-xl"
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="secondary"
                        className="h-10 px-4 rounded-xl font-bold text-xs"
                      >
                        {cartData.orderSummary.applyCoupon}
                      </Button>
                    </form>

                    {/* Applied Voucher Chip */}
                    {appliedCoupon && (
                      <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#00685d]/10 text-[#00685d] dark:bg-[#fdc72d]/15 dark:text-[#fdc72d] text-xs font-semibold">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>
                            {cartData.orderSummary.couponAppliedPrefix} &apos;{appliedCoupon.code}&apos;{" "}
                            {cartData.orderSummary.couponAppliedSuffix} ({toDigits(appliedCoupon.discountPercent)}%{" "}
                            {cartData.itemCard.discountSuffix})
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-muted-foreground hover:text-red-500 p-0.5"
                          title="Remove Coupon"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Total Calculation Ledger */}
                  <div className="p-4 rounded-xl bg-muted/60 border border-border/60 flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm sm:text-base font-bold text-foreground">
                        {cartData.orderSummary.totalPayable}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#00685d] dark:text-[#fdc72d]">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                    {totalSavings > 0 && (
                      <p className="text-xs text-[#00685d] dark:text-[#38b2a3] font-semibold flex items-center gap-1.5">
                        <BadgePercent className="h-4 w-4 shrink-0 text-[#00685d] dark:text-[#38b2a3]" />
                        <span>{cartData.orderSummary.savingsCallout(totalSavings)}</span>
                      </p>
                    )}
                  </div>

                  {/* Primary CTA Proceed to Secure Checkout Button */}
                  <Button
                    size="lg"
                    onClick={handleProceedToCheckout}
                    className="w-full h-12 sm:h-14 rounded-xl bg-[#00685d] hover:bg-[#005048] text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>{cartData.orderSummary.checkoutButton}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Express WhatsApp Checkout Button */}
                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#25D366]/30 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{cartData.orderSummary.whatsappButton}</span>
                  </a>

                  {/* Payment Security Trust Logos */}
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <div className="flex items-center gap-4 text-muted-foreground/70">
                      <Wallet className="h-5 w-5" title="UPI Supported" />
                      <CreditCard className="h-5 w-5" title="Credit / Debit Card" />
                      <Landmark className="h-5 w-5" title="NetBanking" />
                      <Lock className="h-5 w-5" title="256-Bit SSL Encrypted" />
                    </div>
                    <span className="text-xs text-muted-foreground/80 text-center leading-tight">
                      {cartData.orderSummary.securityGuarantee}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>

      {/* Global Footer */}
      <AstroFooter />

      {/* Clear Cart Confirmation Dialog */}
      <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              {cartData.cartActions.clearCartConfirm}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {currentLang === "gu"
                ? "તમારા કાર્ટમાંથી તમામ સામગ્રી હટી જશે."
                : "All items will be removed from your cart."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowClearConfirm(false)}
              className="rounded-xl"
            >
              {currentLang === "gu" ? "રદ કરો" : "Cancel"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearCart}
              className="rounded-xl font-bold"
            >
              {cartData.cartActions.clearCart}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
