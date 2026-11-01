"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Home,
  ShoppingCart,
  ShoppingBag,
  ShieldCheck,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
  X,
  MessageCircle,
  Phone,
  Truck,
  CreditCard,
  Wallet,
  Landmark,
  BadgePercent,
  Loader2,
  MapPin,
  User,
  Tag,
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

import { toast } from "@/components/ui/sonner"
import SafeImage from "@/components/ui/safe-image"
import { shopService } from "@/lib/api"
import { userStore } from "@/lib/api/token-store"
import { StripePaymentForm } from "@/components/stripe-payment-form"
import { loadLiveCatalog } from "@/lib/api/hooks/use-shop-data"
import { useLanguage } from "@/components/language-provider"
import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { getCartData } from "@/lib/data/cart-data"

const CART_STORAGE_KEY = "astro_cart_items"
const COUPON_STORAGE_KEY = "astro_applied_coupon"

export default function CheckoutClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const currentLang = lang || "gu"

  const astroData = useHomeData(currentLang)
  const founder = astroData.config?.founder
  const cartData = React.useMemo(() => getCartData(currentLang), [currentLang])
  const supportWhatsappUrl = founder?.whatsappUrl || cartData.trustPillars.supportStrip.whatsappUrl

  const [cartItems, setCartItems] = React.useState(() => {
    if (typeof window === "undefined") return []
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        const parsed = JSON.parse(storedCart)
        if (Array.isArray(parsed)) return parsed
      }
    } catch {}
    return []
  })

  const isClientLoaded = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  // Coupon State
  const [couponInput, setCouponInput] = React.useState("")
  const [appliedCoupon, setAppliedCoupon] = React.useState(() => {
    if (typeof window === "undefined") return null
    try {
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY)
      if (storedCoupon) {
        const parsedCoupon = JSON.parse(storedCoupon)
        if (parsedCoupon?.code) return parsedCoupon
      }
    } catch {}
    return null
  })

  // Order Placement State
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false)
  const [placedOrder, setPlacedOrder] = React.useState(null)
  const [placedTotal, setPlacedTotal] = React.useState(0)
  const [orderId, setOrderId] = React.useState("")
  const [paymentSession, setPaymentSession] = React.useState(null)

  // Devotee & Delivery Details Form
  const [checkoutForm, setCheckoutForm] = React.useState(() => {
    const u = typeof window !== "undefined" ? userStore.get() : null
    return {
      fullName: u?.name || "",
      phone: u?.phone || "",
      address: u?.address || "",
      city: u?.city || "",
      pincode: u?.pincode || "",
      paymentMethod: "cod"
    }
  })

  // Listen to external cart storage changes
  React.useEffect(() => {
    const handleStorageUpdate = () => {
      try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (storedCart) {
          const parsed = JSON.parse(storedCart)
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
    } catch {}
  }, [])

  // Calculations
  const subtotal = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0)
  }, [cartItems])

  const couponDiscount = React.useMemo(() => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.discountAmount !== undefined) return Math.round(appliedCoupon.discountAmount)
    return Math.round(subtotal * (appliedCoupon.discountPercent / 100))
  }, [subtotal, appliedCoupon])

  const finalTotal = Math.max(0, subtotal - couponDiscount)
  const totalItemCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0)

  // Refresh prices from catalog
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
          } catch {}
          return next
        })
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [isClientLoaded, currentLang])

  // Helpers for digits & formatting
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

  // Coupon handlers
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
    toast.info(currentLang === "gu" ? "કૂપન કોડ દૂર કરવામાં આવ્યો." : "Coupon code removed.")
  }

  // Handle Order Submit
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault()
    if (isPlacingOrder || cartItems.length === 0) return

    const noteLines = [
      checkoutForm.paymentMethod === "whatsapp" && "Customer prefers WhatsApp confirmation",
    ].filter(Boolean)

    setIsPlacingOrder(true)
    try {
      const res = await shopService.placeOrder({
        customer_name: checkoutForm.fullName.trim(),
        customer_phone: checkoutForm.phone.trim(),
        shipping_address: checkoutForm.address.trim(),
        city: checkoutForm.city.trim() || undefined,
        pincode: checkoutForm.pincode.trim() || undefined,
        payment_method: checkoutForm.paymentMethod === "online" ? "online" : "cod",
        coupon_code: appliedCoupon?.code,
        notes: noteLines.join("\n") || undefined,
        items: cartItems.map((item) => ({
          product_slug: item.productId,
          product_name: getText(item.name),
          product_image: item.image,
          quantity: item.qty || 1,
        })),
      })

      const placedData = {
        orderNumber: res.data.order_number,
        totalAmount: Number(res.data.total_amount),
        customerName: checkoutForm.fullName.trim(),
        customerPhone: checkoutForm.phone.trim(),
        shippingAddress: checkoutForm.address.trim(),
        city: checkoutForm.city.trim(),
        pincode: checkoutForm.pincode.trim(),
        paymentMethod: checkoutForm.paymentMethod,
        items: [...cartItems],
      }
      setPlacedOrder(placedData)
      setPlacedTotal(Number(res.data.total_amount))
      setOrderId(res.data.order_number)
      updateCartState([])
      try { localStorage.removeItem(COUPON_STORAGE_KEY) } catch {}
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })

      if (res.requires_payment) {
        try {
          const payment = await shopService.startPayment(res.data.order_number, checkoutForm.phone.trim())
          setPaymentSession({
            clientSecret: payment.data.client_secret,
            publishableKey: payment.data.publishable_key,
          })
        } catch (paymentError) {
          toast.error(paymentError.message)
        }
      }

      toast.success(
        currentLang === "gu"
          ? `ઓર્ડર નોંધાઈ ગયો છે! ઓર્ડર નંબર: ${res.data.order_number}`
          : `Order placed successfully! Order ID: ${res.data.order_number}`
      )
    } catch (error) {
      const firstFieldError = error.errors && Object.values(error.errors)[0]?.[0]
      toast.error(firstFieldError || error.message)
    } finally {
      setIsPlacingOrder(false)
    }
  }

  // Dynamic WhatsApp order receipt URL
  const getWhatsAppOrderUrl = React.useCallback((orderNum, total) => {
    const itemsSource = placedOrder?.items?.length ? placedOrder.items : cartItems
    const itemsList = itemsSource
      .map(
        (item, idx) =>
          `${idx + 1}. ${getText(item.name)} (x${item.qty || 1}) - ₹${item.price * (item.qty || 1)}`
      )
      .join("%0A")

    const orderPrefix = orderNum ? `*ઓર્ડર નંબર:* ${orderNum}%0A` : ""
    const couponText = appliedCoupon
      ? `%0Aકૂપન: ${appliedCoupon.code} (-₹${couponDiscount})`
      : ""

    const totalToUse = total !== undefined ? total : finalTotal
    const message = `*નમસ્તે The Astro Code,*%0A${orderPrefix}હું નીચે મુજબની સિદ્ધ સાધના સામગ્રી ઓર્ડર કરવા માંગુ છું:%0A%0A${itemsList}%0A%0A💰 *કુલ રકમ:* ₹${totalToUse}${couponText}%0A🚚 *ડિલિવરી:* મફત (FREE)%0A%0Aકૃપા કરીને મારો ઓર્ડર કન્ફર્મ કરો.`

    return `${supportWhatsappUrl}${supportWhatsappUrl.includes("?") ? "&" : "?"}text=${message}`
  }, [placedOrder, cartItems, getText, appliedCoupon, couponDiscount, finalTotal, supportWhatsappUrl])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#fdc72d]/30 selection:text-[#00685d]">
      {/* Global Header */}
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
        {/* Progress Stepper & Breadcrumb */}
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
                  <BreadcrumbLink
                    asChild
                    className="hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors"
                  >
                    <Link href="/myshop/cart">{cartData.breadcrumb.cart}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-[#00685d] dark:text-[#fdc72d]">
                    {orderId || placedOrder ? cartData.stepper[2]?.title : cartData.stepper[1]?.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* 3-Step Interactive Stepper Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {cartData.stepper.map((stepItem, idx) => {
                const stepNum = idx + 1
                const isStep3 = !!(orderId || placedOrder)
                const isActive = isStep3 ? stepNum === 3 : stepNum === 2
                const isCompleted = isStep3 ? stepNum < 3 : stepNum === 1
                const IconComponent =
                  stepItem.icon === "ShoppingCart"
                    ? ShoppingCart
                    : stepItem.icon === "ShieldCheck"
                    ? ShieldCheck
                    : Lock

                return (
                  <button
                    key={stepItem.step || stepNum}
                    type="button"
                    onClick={() => {
                      if (stepNum === 1) {
                        router.push("/myshop/cart")
                      }
                    }}
                    disabled={stepNum === 3 && !isStep3}
                    className={`flex items-center gap-3 p-3.5 rounded-xl transition-all text-left w-full border ${
                      isActive
                        ? "bg-[#00685d] text-white shadow-md border-[#00685d] dark:bg-[#005048] dark:border-[#005048]"
                        : isCompleted
                        ? "bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border-emerald-200/80 dark:border-emerald-800/40 hover:bg-emerald-100/50 cursor-pointer"
                        : "bg-muted/40 hover:bg-muted text-muted-foreground border-border/60"
                    }`}
                  >
                    <div
                      className={`size-8 rounded-full shrink-0 aspect-square text-sm font-bold flex items-center justify-center leading-none tabular-nums select-none transition-colors ${
                        isActive
                          ? "bg-[#fdc72d] text-[#0e3934] shadow-xs"
                          : isCompleted
                          ? "bg-[#00685d] text-white shadow-xs"
                          : "bg-muted text-foreground border border-border/60"
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : toDigits(stepNum)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-sm leading-tight truncate ${
                          isActive
                            ? "font-bold text-white"
                            : isCompleted
                            ? "font-semibold text-emerald-900 dark:text-emerald-100"
                            : "font-semibold text-foreground"
                        }`}
                      >
                        {stepItem.title}
                      </span>
                      <span
                        className={`text-xs truncate ${
                          isActive
                            ? "text-[#8bf5e4]"
                            : isCompleted
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-muted-foreground"
                        }`}
                      >
                        {stepNum === 1
                          ? (currentLang === "gu"
                              ? `કાર્ટ સમીક્ષા • ${toDigits(totalItemCount || placedOrder?.items?.length || 1)} વસ્તુઓ`
                              : `Cart Review • ${totalItemCount || placedOrder?.items?.length || 1} Items`)
                          : stepItem.subtitle}
                      </span>
                    </div>
                    <IconComponent
                      className={`ml-auto h-5 w-5 shrink-0 ${
                        isActive
                          ? "text-[#fdc72d]"
                          : isCompleted
                          ? "text-[#00685d] dark:text-[#38b2a3]"
                          : "text-muted-foreground/60"
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          {orderId || placedOrder ? (
            /* ================= ORDER SUCCESS CONFIRMATION ================= */
            <div className="w-full max-w-3xl mx-auto">
              {paymentSession ? (
                /* Online Stripe Payment */
                <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-md flex flex-col gap-5">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                      <ShieldCheck className="h-6 w-6 text-[#00685d] dark:text-[#fdc72d]" />
                      <span>{currentLang === "gu" ? "ઓનલાઇન સુરક્ષિત ચુકવણી" : "Secure Online Payment"}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {currentLang === "gu" ? `ઓર્ડર નંબર: ${orderId}` : `Order ID: ${orderId}`}
                    </p>
                  </div>
                  <StripePaymentForm
                    clientSecret={paymentSession.clientSecret}
                    publishableKey={paymentSession.publishableKey}
                    amountLabel={formatPrice(placedTotal)}
                    lang={currentLang}
                    onPaid={() => setPaymentSession(null)}
                  />
                </div>
              ) : (
                /* Order Placed Success View */
                <div className="bg-card p-6 sm:p-10 rounded-2xl border border-border shadow-md flex flex-col items-center text-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                      {cartData.checkoutModal.orderSuccessTitle}
                    </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00685d]/10 text-[#00685d] dark:bg-[#fdc72d]/15 dark:text-[#fdc72d] font-bold text-sm tracking-wide">
                      <span>{currentLang === "gu" ? "ઓર્ડર નંબર:" : "Order ID:"}</span>
                      <span className="font-mono">{orderId || placedOrder?.orderNumber}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto pt-1 leading-relaxed">
                      {cartData.checkoutModal.orderSuccessDesc}
                    </p>
                  </div>

                  {/* Devotee Details Receipt Box */}
                  <div className="w-full max-w-lg p-5 rounded-xl bg-muted/50 border border-border/80 text-xs sm:text-sm text-left flex flex-col gap-2.5">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">{currentLang === "gu" ? "યજમાન / ભક્ત:" : "Devotee Name:"}</span>
                      <span className="font-bold text-foreground">{placedOrder?.customerName || checkoutForm.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">{currentLang === "gu" ? "સંપર્ક નંબર:" : "Phone:"}</span>
                      <span className="font-semibold text-foreground">{placedOrder?.customerPhone || checkoutForm.phone}</span>
                    </div>
                    <div className="flex justify-between items-start py-0.5">
                      <span className="text-muted-foreground shrink-0">{currentLang === "gu" ? "ડિલિવરી સરનામું:" : "Shipping Address:"}</span>
                      <span className="font-medium text-foreground text-right pl-4">
                        {placedOrder?.shippingAddress || checkoutForm.address}, {placedOrder?.city || checkoutForm.city} - {placedOrder?.pincode || checkoutForm.pincode}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">{currentLang === "gu" ? "ચુકવણી પદ્ધતિ:" : "Payment Mode:"}</span>
                      <span className="font-semibold text-foreground uppercase text-xs">
                        {checkoutForm.paymentMethod === "online"
                          ? (currentLang === "gu" ? "ઓનલાઇન પેમેન્ટ" : "Online Payment")
                          : checkoutForm.paymentMethod === "whatsapp"
                          ? (currentLang === "gu" ? "વોટ્સએપ ઓર્ડર" : "WhatsApp Order")
                          : (currentLang === "gu" ? "કેશ ઓન ડિલિવરી (COD)" : "Cash on Delivery (COD)")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-border/80 pt-2 mt-1">
                      <span className="font-bold text-foreground">{currentLang === "gu" ? "કુલ રકમ:" : "Total Amount:"}</span>
                      <span className="font-extrabold text-lg sm:text-xl text-[#00685d] dark:text-[#fdc72d]">
                        {formatPrice(placedTotal || placedOrder?.totalAmount || 0)}
                      </span>
                    </div>
                  </div>

                  {/* Ordered Items Preview */}
                  {placedOrder?.items && placedOrder.items.length > 0 && (
                    <div className="w-full max-w-lg border border-border/60 rounded-xl p-4 bg-card/60 flex flex-col gap-2 text-left">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        {currentLang === "gu" ? "ઓર્ડર કરેલ સામગ્રી" : "Ordered Items"}
                      </h4>
                      <div className="flex flex-col gap-2">
                        {placedOrder.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-border/30 last:border-none">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-border/40 bg-muted">
                                <SafeImage src={it.image || "https://dummyjson.com/image/200x100"} alt="" fill className="object-cover" />
                              </div>
                              <span className="font-medium truncate">{getText(it.name)}</span>
                              <span className="text-muted-foreground shrink-0">x{it.qty || 1}</span>
                            </div>
                            <span className="font-bold shrink-0">{formatPrice((it.price || 0) * (it.qty || 1))}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#00685d] hover:bg-[#005048] text-white font-bold rounded-xl shadow-md gap-2"
                    >
                      <Link href="/myshop">
                        <ArrowLeft className="h-4 w-4" />
                        <span>{cartData.cartActions.continueShopping}</span>
                      </Link>
                    </Button>

                    <a
                      href={getWhatsAppOrderUrl(orderId || placedOrder?.orderNumber, placedTotal || placedOrder?.totalAmount)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{currentLang === "gu" ? "WhatsApp રસીદ મેળવો" : "Get WhatsApp Receipt"}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : cartItems.length === 0 && isClientLoaded ? (
            /* ================= EMPTY CART REDIRECT ================= */
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
          ) : (
            /* ================= CHECKOUT DETAILS FORM & ORDER SUMMARY ================= */
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* LEFT COLUMN: Devotee & Delivery Details Form (65%) */}
              <div className="w-full lg:w-[65%] flex flex-col gap-6">
                <form onSubmit={handleCheckoutSubmit} className="bg-card p-6 sm:p-7 rounded-2xl border border-border shadow-xs flex flex-col gap-6">
                  {/* Form Header */}
                  <div className="border-b border-border/60 pb-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2.5">
                        <span className="p-2 rounded-xl bg-[#00685d]/10 text-[#00685d] dark:bg-[#fdc72d]/10 dark:text-[#fdc72d]">
                          <ShieldCheck className="h-6 w-6" />
                        </span>
                        <span>{cartData.checkoutModal.title}</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {cartData.checkoutModal.subtitle}
                      </p>
                    </div>
                    <Badge className="bg-[#00685d]/10 text-[#00685d] dark:bg-[#fdc72d]/15 dark:text-[#fdc72d] border-[#00685d]/20 text-xs font-semibold px-3 py-1 shrink-0 hidden sm:inline-flex">
                      {currentLang === "gu" ? "પગલું ૨ / ૩" : "Step 2 of 3"}
                    </Badge>
                  </div>

                  {/* Devotee Details Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label htmlFor="checkout-name" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{cartData.checkoutModal.nameLabel}</span>
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="checkout-name"
                        required
                        value={checkoutForm.fullName}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, fullName: e.target.value })}
                        placeholder={cartData.checkoutModal.namePlaceholder}
                        className="h-11 rounded-xl text-sm"
                      />
                    </div>

                    {/* Mobile Phone */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="checkout-phone" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{cartData.checkoutModal.phoneLabel}</span>
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="checkout-phone"
                        required
                        type="tel"
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                        placeholder={cartData.checkoutModal.phonePlaceholder}
                        className="h-11 rounded-xl text-sm"
                      />
                      <span className="text-[11px] text-muted-foreground">
                        {currentLang === "gu" ? "ઓર્ડર અપડેટ્સ અને ટ્રેકિંગ આ નંબર પર WhatsApp કરવામાં આવશે" : "Order tracking and delivery updates will be sent here"}
                      </span>
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="checkout-city" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{cartData.checkoutModal.cityLabel}</span>
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="checkout-city"
                        required
                        value={checkoutForm.city}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                        placeholder={cartData.checkoutModal.cityPlaceholder}
                        className="h-11 rounded-xl text-sm"
                      />
                    </div>

                    {/* Delivery Address */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label htmlFor="checkout-address" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                        <Home className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{cartData.checkoutModal.addressLabel}</span>
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="checkout-address"
                        required
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                        placeholder={cartData.checkoutModal.addressPlaceholder}
                        className="h-11 rounded-xl text-sm"
                      />
                    </div>

                    {/* Pincode */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="checkout-pincode" className="text-xs sm:text-sm font-semibold">
                        <span>{cartData.checkoutModal.pincodeLabel}</span>
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="checkout-pincode"
                        required
                        value={checkoutForm.pincode}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                        placeholder={cartData.checkoutModal.pincodePlaceholder}
                        className="h-11 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="flex flex-col gap-3 pt-2 border-t border-border/60">
                    <Label className="text-sm font-bold text-foreground">
                      {cartData.checkoutModal.paymentMethodLabel}
                    </Label>
                    <RadioGroup
                      value={checkoutForm.paymentMethod}
                      onValueChange={(val) => setCheckoutForm({ ...checkoutForm, paymentMethod: val })}
                      className="grid grid-cols-1 gap-2.5"
                    >
                      {/* COD */}
                      <label
                        htmlFor="pay-cod"
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                          checkoutForm.paymentMethod === "cod"
                            ? "border-[#00685d] bg-[#00685d]/5 dark:border-[#fdc72d] dark:bg-[#fdc72d]/10 shadow-xs"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="cod" id="pay-cod" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">
                              {cartData.checkoutModal.paymentCod}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {currentLang === "gu"
                                ? "પાર્સલ મળે ત્યારે રોકડ ચુકવણી કરો"
                                : "Pay in cash upon doorstep delivery"}
                            </span>
                          </div>
                        </div>
                        <Truck className="h-5 w-5 text-muted-foreground shrink-0" />
                      </label>

                      {/* Online */}
                      <label
                        htmlFor="pay-online"
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                          checkoutForm.paymentMethod === "online"
                            ? "border-[#00685d] bg-[#00685d]/5 dark:border-[#fdc72d] dark:bg-[#fdc72d]/10 shadow-xs"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="online" id="pay-online" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">
                              {cartData.checkoutModal.paymentOnline}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {currentLang === "gu"
                                ? "UPI, Google Pay, PhonePe, Cards અને NetBanking"
                                : "UPI, Google Pay, Cards & NetBanking (Instant & Secure)"}
                            </span>
                          </div>
                        </div>
                        <CreditCard className="h-5 w-5 text-muted-foreground shrink-0" />
                      </label>

                      {/* WhatsApp */}
                      <label
                        htmlFor="pay-wa"
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                          checkoutForm.paymentMethod === "whatsapp"
                            ? "border-[#00685d] bg-[#00685d]/5 dark:border-[#fdc72d] dark:bg-[#fdc72d]/10 shadow-xs"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="whatsapp" id="pay-wa" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">
                              {cartData.checkoutModal.paymentWhatsapp}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {currentLang === "gu"
                                ? "અમારા આચાર્ય સહાયક WhatsApp પર વાત કરી ઓર્ડર કન્ફર્મ કરશે"
                                : "Our team will assist and finalize order on WhatsApp"}
                            </span>
                          </div>
                        </div>
                        <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
                      </label>
                    </RadioGroup>
                  </div>

                  {/* Form Footer Action Buttons */}
                  <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border/60">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-auto rounded-xl font-semibold gap-2"
                    >
                      <Link href="/myshop/cart">
                        <ArrowLeft className="h-4 w-4" />
                        <span>{currentLang === "gu" ? "કાર્ટ પર પાછા જાઓ" : "Back to Cart"}</span>
                      </Link>
                    </Button>

                    <Button
                      type="submit"
                      disabled={isPlacingOrder}
                      className="w-full sm:w-auto h-12 px-8 bg-[#00685d] hover:bg-[#005048] text-white font-bold rounded-xl shadow-md gap-2 text-base"
                    >
                      {isPlacingOrder ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>{currentLang === "gu" ? "ઓર્ડર નોંધાઈ રહ્યો છે..." : "Placing Order..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{cartData.checkoutModal.placeOrderBtn}</span>
                          <Check className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* RIGHT COLUMN: Sticky Order Summary Sidebar (35%) */}
              <aside className="w-full lg:w-[35%] flex flex-col gap-6 lg:sticky lg:top-[180px]">
                <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-md flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-foreground border-b border-border/60 pb-3 flex items-center justify-between">
                    <span>{cartData.orderSummary.title}</span>
                    <Badge variant="secondary" className="rounded-full text-xs font-semibold">
                      {toDigits(totalItemCount)} {cartData.cartHeader.itemsCountSuffix}
                    </Badge>
                  </h3>

                  {/* Mini Cart Items List */}
                  <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 py-1 text-xs">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-border/40 bg-muted">
                          <SafeImage
                            src={item.image || "https://dummyjson.com/image/200x100"}
                            alt={getText(item.name)}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate">{getText(item.name)}</p>
                          <p className="text-muted-foreground">{toDigits(item.qty || 1)} × {formatPrice(item.price)}</p>
                        </div>
                        <span className="font-bold text-[#00685d] dark:text-[#fdc72d] shrink-0">
                          {formatPrice((item.price || 0) * (item.qty || 1))}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="flex flex-col gap-2 pt-3 border-t border-border/60 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>{cartData.orderSummary.subtotalLabel}</span>
                      <span className="text-foreground font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex items-center justify-between text-[#00685d] dark:text-[#fdc72d] font-semibold">
                        <span>{cartData.orderSummary.discountLabel} ({toDigits(appliedCoupon.discountPercent)}%)</span>
                        <span>- {formatPrice(couponDiscount)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>{cartData.orderSummary.shippingLabel}</span>
                      <span className="text-[#00685d] dark:text-[#fdc72d] font-bold">{cartData.orderSummary.freeShipping}</span>
                    </div>
                  </div>

                  {/* Coupon Code Input */}
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

                  {/* Total Amount Box */}
                  <div className="p-4 rounded-xl bg-muted/60 border border-border/60 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-foreground">{cartData.orderSummary.totalPayable}</span>
                    <span className="text-2xl font-extrabold text-[#00685d] dark:text-[#fdc72d]">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>

                  {/* Vedic Consecration Assurance Badge */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{currentLang === "gu" ? "સંપૂર્ણ વૈદિક પ્રાણ-પ્રતિષ્ઠા અને ૧૦૦% શુદ્ધતાની ખાતરી" : "100% Vedic Consecrated with Certificate"}</span>
                  </div>

                  {/* Express WhatsApp Order Link */}
                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#25D366]/30 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{cartData.orderSummary.whatsappButton}</span>
                  </a>

                  {/* Security Icons */}
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

      <AstroFooter />
    </div>
  )
}

