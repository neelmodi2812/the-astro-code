"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Home,
  ShoppingBag,
  ShieldCheck,
  Lock,
  Sparkles,
  Droplets,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  X,
  MessageCircle,
  Phone,
  HelpCircle,
  RotateCcw,
  Truck,
  Check,
  CreditCard,
  Wallet,
  Landmark,
  Gift,
  MapPin,
  Bookmark
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/sonner"
import { useLanguage } from "@/components/language-provider"
import { getAstroData } from "@/lib/data/astro-data"
import {
  getCartData,
  DEFAULT_CART_ITEMS,
  VALID_COUPONS
} from "@/lib/data/cart-data"

const CART_STORAGE_KEY = "astro_cart_items"
const SAVED_STORAGE_KEY = "astro_saved_items"

const POPULAR_GOTRAS = [
  { gu: "કશ્યપ", en: "Kashyap" },
  { gu: "ભારદ્વાજ", en: "Bharadwaj" },
  { gu: "વસિષ્ઠ", en: "Vashishta" },
  { gu: "ગૌતમ", en: "Gautam" },
  { gu: "પરાશર", en: "Parashar" },
  { gu: "વિશ્વામિત્ર", en: "Vishwamitra" }
]

const INDIAN_STATES = [
  { gu: "ગુજરાત", en: "Gujarat" },
  { gu: "મહારાષ્ટ્ર", en: "Maharashtra" },
  { gu: "રાજસ્થાન", en: "Rajasthan" },
  { gu: "મધ્ય પ્રદેશ", en: "Madhya Pradesh" },
  { gu: "દિલ્હી (NCR)", en: "Delhi (NCR)" },
  { gu: "ઉત્તર પ્રદેશ", en: "Uttar Pradesh" },
  { gu: "કર્ણાટક", en: "Karnataka" },
  { gu: "પંજાબ", en: "Punjab" },
  { gu: "હરિયાણા", en: "Haryana" },
  { gu: "તેલંગાણા", en: "Telangana" },
  { gu: "પશ્ચિમ બંગાળ", en: "West Bengal" },
  { gu: "તમિલનાડુ", en: "Tamil Nadu" },
  { gu: "અન્ય રાજ્ય", en: "Other State" }
]

const SANKALP_PURPOSES = [
  { gu: "મનોકામના પૂર્તિ & સંકટ નિવારણ", en: "Fulfillment of Wishes & Relief" },
  { gu: "દીર્ઘાયુષ્ય & સ્વાસ્થ્ય સુખાકારી", en: "Good Health & Longevity" },
  { gu: "વ્યાપાર વૃદ્ધિ & લક્ષ્મી કૃપા", en: "Business Growth & Prosperity" },
  { gu: "નવગ્રહ દોષ & શનિ સાડાસાતી શાંતિ", en: "Planetary Affliction & Shani Shanti" },
  { gu: "સંતાન સુખ & પારિવારિક શાંતિ", en: "Family Harmony & Progeny Blessings" }
]

export default function CartClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const currentLang = lang || "gu"
  const isEn = currentLang === "en"

  const astroData = React.useMemo(() => getAstroData(currentLang), [currentLang])
  const cartData = React.useMemo(() => getCartData(currentLang), [currentLang])

  // Cart & Saved items state
  const [cartItems, setCartItems] = React.useState(DEFAULT_CART_ITEMS)
  const [savedItems, setSavedItems] = React.useState([])
  const [isClientLoaded, setIsClientLoaded] = React.useState(false)

  // Active step / tab state (1: Cart Review, 2: Shipping & Sankalp, 3: Secure Payment, 4: Order Confirmed)
  const [activeStep, setActiveStep] = React.useState(1)

  // Clear Cart confirmation dialog
  const [showClearConfirm, setShowClearConfirm] = React.useState(false)

  // Vedic Sankalp Customization State
  const [sankalpIncluded, setSankalpIncluded] = React.useState(true)
  const [sankalpForm, setSankalpForm] = React.useState({
    yajmanName: isEn ? "Ramesh Patel" : "રમેશભાઈ પટેલ",
    gotra: isEn ? "Kashyap" : "કશ્યપ",
    purpose: isEn ? "Fulfillment of Wishes & Relief" : "મનોકામના પૂર્તિ & સંકટ નિવારણ"
  })

  // Shipping Address Form State
  const [sameAsDevotee, setSameAsDevotee] = React.useState(true)
  const [shippingForm, setShippingForm] = React.useState({
    fullName: isEn ? "Ramesh Patel" : "રમેશભાઈ પટેલ",
    phone: "9825012345",
    address: isEn ? "B-402, Shivam Enclave, Opp. Iscon Temple, S.G. Highway" : "બી-૪૦૨, શિવમ એન્ક્લેવ, ઇસ્કોન મંદિર સામે, એસ.જી. હાઇવે",
    city: isEn ? "Ahmedabad" : "અમદાવાદ",
    state: isEn ? "Gujarat" : "ગુજરાત",
    pincode: "380054",
    paymentMethod: "cod"
  })

  // Synchronize state and purpose when language is toggled
  const currentStateValue = React.useMemo(() => {
    const match = INDIAN_STATES.find((s) => s.en === shippingForm.state || s.gu === shippingForm.state)
    return match ? (isEn ? match.en : match.gu) : shippingForm.state
  }, [shippingForm.state, isEn])

  const currentPurposeValue = React.useMemo(() => {
    const match = SANKALP_PURPOSES.find((p) => p.en === sankalpForm.purpose || p.gu === sankalpForm.purpose)
    return match ? (isEn ? match.en : match.gu) : sankalpForm.purpose
  }, [sankalpForm.purpose, isEn])

  const currentGotraValue = React.useMemo(() => {
    const match = POPULAR_GOTRAS.find(
      (g) => g.en.toLowerCase() === sankalpForm.gotra?.trim().toLowerCase() || g.gu === sankalpForm.gotra?.trim()
    )
    return match ? (isEn ? match.en : match.gu) : sankalpForm.gotra
  }, [sankalpForm.gotra, isEn])

  // Synchronize Devotee name with Recipient Name
  const handleYajmanNameChange = React.useCallback(
    (name) => {
      setSankalpForm((prev) => ({ ...prev, yajmanName: name }))
      if (sameAsDevotee) {
        setShippingForm((prev) => ({ ...prev, fullName: name }))
      }
    },
    [sameAsDevotee]
  )

  const handleToggleSameAsDevotee = React.useCallback(
    (checked) => {
      setSameAsDevotee(checked)
      if (checked && sankalpForm.yajmanName) {
        setShippingForm((prev) => ({ ...prev, fullName: sankalpForm.yajmanName }))
      }
    },
    [sankalpForm.yajmanName]
  )

  // Smart Indian Pincode Auto-Detection for City & State
  const handlePincodeChange = React.useCallback(
    (val) => {
      const cleanPin = val.replace(/\D/g, "").slice(0, 6)
      setShippingForm((prev) => {
        const updated = { ...prev, pincode: cleanPin }
        if (cleanPin.length === 6) {
          const prefix = cleanPin.slice(0, 2)
          if (["38", "39", "36", "37"].includes(prefix)) {
            updated.state = isEn ? "Gujarat" : "ગુજરાત"
            if (cleanPin.startsWith("380") && (!updated.city || updated.city === "Ahmedabad" || updated.city === "અમદાવાદ")) {
              updated.city = isEn ? "Ahmedabad" : "અમદાવાદ"
            } else if (cleanPin.startsWith("390")) {
              updated.city = isEn ? "Vadodara" : "વડોદરા"
            } else if (cleanPin.startsWith("395")) {
              updated.city = isEn ? "Surat" : "સુરત"
            } else if (cleanPin.startsWith("360")) {
              updated.city = isEn ? "Rajkot" : "રાજકોટ"
            }
          } else if (["40", "41", "42", "43", "44"].includes(prefix)) {
            updated.state = isEn ? "Maharashtra" : "મહારાષ્ટ્ર"
            if (cleanPin.startsWith("400")) updated.city = isEn ? "Mumbai" : "મુંબઈ"
          } else if (["30", "31", "32", "33", "34"].includes(prefix)) {
            updated.state = isEn ? "Rajasthan" : "રાજસ્થાન"
            if (cleanPin.startsWith("302")) updated.city = isEn ? "Jaipur" : "જયપુર"
          } else if (["11"].includes(prefix)) {
            updated.state = isEn ? "Delhi (NCR)" : "દિલ્હી (NCR)"
            updated.city = isEn ? "New Delhi" : "નવી દિલ્હી"
          } else if (["45", "46", "47", "48"].includes(prefix)) {
            updated.state = isEn ? "Madhya Pradesh" : "મધ્ય પ્રદેશ"
            if (cleanPin.startsWith("452")) updated.city = isEn ? "Indore" : "ઇન્દોર"
          } else if (["20", "21", "22", "23", "24", "25", "26", "27", "28"].includes(prefix)) {
            updated.state = isEn ? "Uttar Pradesh" : "ઉત્તર પ્રદેશ"
          }
        }
        return updated
      })
    },
    [isEn]
  )

  // Coupon Voucher State
  const [couponInput, setCouponInput] = React.useState("VEDIC10")
  const [appliedCoupon, setAppliedCoupon] = React.useState(VALID_COUPONS.VEDIC10)
  const [couponError, setCouponError] = React.useState("")

  // Order Placement State
  const [orderId, setOrderId] = React.useState("")
  const [isOrderSubmitting, setIsOrderSubmitting] = React.useState(false)

  // Helper for Gujarati digits
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

  const getText = React.useCallback(
    (field) => {
      if (!field) return ""
      if (typeof field === "string") return field
      if (typeof field === "object") return field[currentLang] || field.gu || field.en || ""
      return String(field)
    },
    [currentLang]
  )

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        const parsed = JSON.parse(storedCart)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed)
        }
      }
      const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY)
      if (storedSaved) {
        const parsedSaved = JSON.parse(storedSaved)
        if (Array.isArray(parsedSaved)) {
          setSavedItems(parsedSaved)
        }
      }
    } catch {
      // ignore storage error
    }
    setIsClientLoaded(true)
  }, [])

  // Sync to localStorage
  const updateCartState = React.useCallback((newItems) => {
    setCartItems(newItems)
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
    } catch {
      // ignore
    }
  }, [])

  const updateSavedState = React.useCallback((newSaved) => {
    setSavedItems(newSaved)
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(newSaved))
    } catch {
      // ignore
    }
  }, [])

  // Price calculations
  const subtotal = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0)
  }, [cartItems])

  const originalTotal = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.originalPrice || item.price) * (item.qty || 1), 0)
  }, [cartItems])

  const itemSavings = originalTotal - subtotal

  const couponDiscount = React.useMemo(() => {
    if (!appliedCoupon) return 0
    return Math.round(subtotal * (appliedCoupon.discountPercent / 100))
  }, [subtotal, appliedCoupon])

  const finalTotal = Math.max(0, subtotal - couponDiscount)
  const totalSavings = itemSavings + couponDiscount
  const totalItemCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0)

  // Ganga Jal milestone (Threshold: ₹4,000)
  const GANGAJAL_THRESHOLD = 4000
  const gangajalProgress = Math.min(100, Math.round((subtotal / GANGAJAL_THRESHOLD) * 100))
  const gangajalDiff = Math.max(0, GANGAJAL_THRESHOLD - subtotal)

  // Step 2 Validation helper for linear checkout progression
  const isShippingValid = React.useMemo(() => {
    const hasName = Boolean(shippingForm.fullName && shippingForm.fullName.trim().length > 0)
    const hasPhone = Boolean(shippingForm.phone && shippingForm.phone.trim().replace(/\D/g, "").length >= 10)
    const hasAddress = Boolean(shippingForm.address && shippingForm.address.trim().length > 0)
    const hasCity = Boolean(shippingForm.city && shippingForm.city.trim().length > 0)
    const hasState = Boolean(shippingForm.state && shippingForm.state.trim().length > 0)
    const hasPincode = Boolean(shippingForm.pincode && shippingForm.pincode.trim().length === 6)
    const hasYajmanIfSankalp = !sankalpIncluded || Boolean(sankalpForm.yajmanName && sankalpForm.yajmanName.trim().length > 0)
    return Boolean(hasName && hasPhone && hasAddress && hasCity && hasState && hasPincode && hasYajmanIfSankalp)
  }, [shippingForm, sankalpIncluded, sankalpForm])

  // Tab change handler with linear checkout validation and smooth scroll to top
  const handleTabChange = (step) => {
    if (step === 3 && !isShippingValid) {
      toast.info(
        isEn
          ? "Please complete your delivery address before proceeding to payment."
          : "કૃપા કરીને ચુકવણી તરફ આગળ વધતા પહેલાં ડિલિવરી સરનામું પૂર્ણ કરો."
      )
      return
    }
    setActiveStep(step)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Cart actions
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
      isEn
        ? `"${getText(itemToRemove?.name) || 'Item'}" removed from cart.`
        : `"${getText(itemToRemove?.name) || 'સામગ્રી'}" કાર્ટમાંથી દૂર કરવામાં આવી.`
    )
  }

  const handleSaveForLater = (item) => {
    const updatedCart = cartItems.filter((i) => i.id !== item.id)
    const updatedSaved = [...savedItems.filter((i) => i.id !== item.id), item]
    updateCartState(updatedCart)
    updateSavedState(updatedSaved)
    toast.success(cartData.itemCard.savedForLaterSuccess)
  }

  const handleMoveToCart = (item) => {
    const updatedSaved = savedItems.filter((i) => i.id !== item.id)
    const updatedCart = [...cartItems.filter((i) => i.id !== item.id), { ...item, qty: 1 }]
    updateSavedState(updatedSaved)
    updateCartState(updatedCart)
    toast.success(
      isEn
        ? `"${getText(item.name) || 'Item'}" moved back to cart.`
        : `"${getText(item.name) || 'સામગ્રી'}" કાર્ટમાં પાછી ઉમેરાઈ.`
    )
  }

  const handleClearCart = () => {
    updateCartState([])
    setShowClearConfirm(false)
    toast.info(
      isEn
        ? "Your cart has been cleared."
        : "આપનો કાર્ટ ખાલી કરવામાં આવ્યો છે."
    )
  }

  const handleApplyCoupon = (e) => {
    e?.preventDefault()
    setCouponError("")
    const cleanCode = couponInput.trim().toUpperCase()
    if (!cleanCode) return

    const foundCoupon = VALID_COUPONS[cleanCode]
    if (foundCoupon) {
      setAppliedCoupon(foundCoupon)
      toast.success(
        isEn
          ? `Coupon '${foundCoupon.code}' applied! (${foundCoupon.discountPercent}% OFF)`
          : `કૂપન '${foundCoupon.code}' લાગુ થઈ! (${toDigits(foundCoupon.discountPercent)}% છૂટ)`
      )
    } else {
      setCouponError(cartData.orderSummary.invalidCoupon)
      toast.error(cartData.orderSummary.invalidCoupon)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponInput("")
    setCouponError("")
  }

  // Step 2 Validation and Navigation to Step 3
  const handleProceedToPayment = (e) => {
    e?.preventDefault?.()
    if (!shippingForm.fullName?.trim()) {
      toast.error(isEn ? "Please enter recipient name." : "કૃપા કરીને પ્રાપ્તકર્તાનું નામ દાખલ કરો.")
      return
    }
    const cleanPhone = shippingForm.phone ? shippingForm.phone.trim().replace(/\D/g, "") : ""
    if (cleanPhone.length < 10) {
      toast.error(isEn ? "Please enter a valid 10-digit mobile number." : "કૃપા કરીને માન્ય ૧૦ અંકનો મોબાઈલ નંબર દાખલ કરો.")
      return
    }
    if (!shippingForm.address?.trim()) {
      toast.error(isEn ? "Please enter delivery address." : "કૃપા કરીને ડિલિવરી સરનામું દાખલ કરો.")
      return
    }
    if (!shippingForm.city?.trim()) {
      toast.error(isEn ? "Please enter city." : "કૃપા કરીને શહેર દાખલ કરો.")
      return
    }
    if (!shippingForm.state?.trim()) {
      toast.error(isEn ? "Please select your state." : "કૃપા કરીને રાજ્ય પસંદ કરો.")
      return
    }
    if (!shippingForm.pincode?.trim() || shippingForm.pincode.trim().length !== 6) {
      toast.error(isEn ? "Please enter valid 6-digit pincode." : "કૃપા કરીને માન્ય ૬ અંકનો પીનકોડ દાખલ કરો.")
      return
    }
    if (sankalpIncluded && !sankalpForm.yajmanName?.trim()) {
      toast.error(isEn ? "Please enter Devotee / Yajman Name for Sankalp." : "કૃપા કરીને સંકલ્પ માટે યજમાનનું નામ દાખલ કરો.")
      return
    }

    handleTabChange(3)
  }

  // Complete Order Handler (Step 3 Submit)
  const handleCompleteOrder = () => {
    setIsOrderSubmitting(true)
    setTimeout(() => {
      const generatedOrderId = `TAC-${Math.floor(100000 + Math.random() * 900000)}`
      setOrderId(generatedOrderId)
      setIsOrderSubmitting(false)
      setActiveStep(4)
      updateCartState([])
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 80, behavior: "smooth" })
      }
      toast.success(
        isEn
          ? `Order placed successfully! Order ID: ${generatedOrderId}`
          : `ઓર્ડર સફળતાપૂર્વક નોંધાઈ ગયો છે! ઓર્ડર નંબર: ${generatedOrderId}`
      )
    }, 800)
  }

  // Dynamic WhatsApp Order URL
  const getWhatsAppOrderUrl = () => {
    const itemsList = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${getText(item.name)} (x${item.qty || 1}) - ₹${item.price * (item.qty || 1)}`
      )
      .join("%0A")

    const devoteeInfo = sankalpIncluded && sankalpForm.yajmanName
      ? `%0A%0A🪔 *વૈદિક પૂજા સંકલ્પ:*%0Aયજમાન: ${sankalpForm.yajmanName}%0Aગોત્ર: ${currentGotraValue || sankalpForm.gotra}`
      : ""

    const hasEnteredAddress = activeStep >= 2 && Boolean(shippingForm.address)
    const addressInfo = hasEnteredAddress
      ? `%0A%0A📦 *ડિલિવરી સરનામું:*%0A${shippingForm.fullName}, ${shippingForm.phone}%0A${shippingForm.address}, ${shippingForm.city}, ${currentStateValue} - ${shippingForm.pincode}`
      : `%0A%0A📦 *ડિલિવરી:* (સરનામું WhatsApp ચેટમાં કન્ફર્મ કરવામાં આવશે)`

    const message = `*નમસ્તે The Astro Code,*%0Aહું નીચે મુજબની સિદ્ધ સાધના સામગ્રી ઓર્ડર કરવા માંગુ છું:%0A%0A${itemsList}${devoteeInfo}${addressInfo}%0A%0A💰 *કુલ રકમ:* ₹${finalTotal}%0A🚚 *ડિલિવરી:* મફત (FREE)%0A%0Aકૃપા કરીને આ ઓર્ડર કન્ફર્મ કરશો.`

    return `https://wa.me/917940008108?text=${message}`
  }

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

      <main className="flex-1 w-full bg-background pb-16">
        {/* Breadcrumb & Working Functional Tab Stepper */}
        <section className="sticky top-0 z-30 w-full bg-card/95 backdrop-blur-md border-b border-border shadow-2xs py-3 sm:py-4 px-4 sm:px-6 lg:px-8 transition-all">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-3">
            {/* Breadcrumb Navigation */}
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

            {/* Connected Multi-Step Journey Stepper */}
            <nav aria-label="Checkout Progress" className="w-full">
              <div className="flex items-center justify-between gap-1.5 sm:gap-3 w-full">
                {/* Step 1: Cart Review */}
                <button
                  type="button"
                  onClick={() => handleTabChange(1)}
                  className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer text-left border flex-1 min-w-0 ${
                    activeStep === 1
                      ? "bg-card text-foreground shadow-xs border-[#00685d] dark:border-[#fdc72d] ring-1 ring-[#00685d]/20 dark:ring-[#fdc72d]/25"
                      : activeStep > 1
                      ? "bg-muted/40 hover:bg-muted text-foreground border-emerald-600/30"
                      : "bg-muted/20 text-muted-foreground border-border/60"
                  }`}
                  aria-current={activeStep === 1 ? "step" : undefined}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all ${
                      activeStep === 1
                        ? "bg-[#fdc72d] text-[#1b1c1a] ring-2 ring-[#fdc72d]/30 shadow-xs"
                        : activeStep > 1
                        ? "bg-emerald-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {activeStep > 1 ? <Check className="h-4 w-4" /> : toDigits(1)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold leading-tight truncate">
                      {cartData.stepper[0].title}
                    </span>
                    <span className="text-[10px] sm:text-[11px] truncate text-muted-foreground">
                      {isEn ? `${totalItemCount} Items` : `${toDigits(totalItemCount)} સામગ્રી`}
                    </span>
                  </div>
                </button>

                {/* Connector Line 1 -> 2 */}
                <div className="hidden sm:flex items-center justify-center shrink-0">
                  <div className={`w-3 md:w-6 h-0.5 rounded-full transition-colors ${activeStep >= 2 ? "bg-emerald-600" : "bg-border"}`} />
                  <ArrowRight className={`h-3.5 w-3.5 -ml-1 transition-colors ${activeStep >= 2 ? "text-emerald-600" : "text-muted-foreground/40"}`} />
                </div>

                {/* Step 2: Shipping & Sankalp */}
                <button
                  type="button"
                  onClick={() => {
                    if (cartItems.length > 0) handleTabChange(2)
                  }}
                  disabled={cartItems.length === 0}
                  className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all text-left border flex-1 min-w-0 ${
                    activeStep === 2
                      ? "bg-card text-foreground shadow-xs border-[#00685d] dark:border-[#fdc72d] ring-1 ring-[#00685d]/20 dark:ring-[#fdc72d]/25 cursor-pointer"
                      : activeStep > 2
                      ? "bg-muted/40 hover:bg-muted text-foreground border-emerald-600/30 cursor-pointer"
                      : cartItems.length > 0
                      ? "bg-muted/30 hover:bg-muted/60 text-foreground border-border/60 cursor-pointer"
                      : "bg-muted/20 text-muted-foreground/50 border-border/40 opacity-50 cursor-not-allowed"
                  }`}
                  aria-current={activeStep === 2 ? "step" : undefined}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all ${
                      activeStep === 2
                        ? "bg-[#fdc72d] text-[#1b1c1a] ring-2 ring-[#fdc72d]/30 shadow-xs"
                        : activeStep > 2
                        ? "bg-emerald-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {activeStep > 2 ? <Check className="h-4 w-4" /> : toDigits(2)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold leading-tight truncate">
                      {cartData.stepper[1].title}
                    </span>
                    <span className="text-[10px] sm:text-[11px] truncate text-muted-foreground">
                      {cartData.stepper[1].subtitle}
                    </span>
                  </div>
                </button>

                {/* Connector Line 2 -> 3 */}
                <div className="hidden sm:flex items-center justify-center shrink-0">
                  <div className={`w-3 md:w-6 h-0.5 rounded-full transition-colors ${activeStep >= 3 ? "bg-emerald-600" : "bg-border"}`} />
                  <ArrowRight className={`h-3.5 w-3.5 -ml-1 transition-colors ${activeStep >= 3 ? "text-emerald-600" : "text-muted-foreground/40"}`} />
                </div>

                {/* Step 3: Secure Payment */}
                <button
                  type="button"
                  onClick={() => {
                    if (cartItems.length > 0 && isShippingValid) {
                      handleTabChange(3)
                    } else if (cartItems.length > 0) {
                      toast.info(
                        isEn
                          ? "Please complete your delivery address before proceeding to payment."
                          : "કૃપા કરીને ચુકવણી પહેલાં આપનું ડિલિવરી સરનામું પૂર્ણ કરો."
                      )
                    }
                  }}
                  disabled={cartItems.length === 0}
                  className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all text-left border flex-1 min-w-0 ${
                    activeStep === 3
                      ? "bg-card text-foreground shadow-xs border-[#00685d] dark:border-[#fdc72d] ring-1 ring-[#00685d]/20 dark:ring-[#fdc72d]/25 cursor-pointer"
                      : activeStep === 4
                      ? "bg-muted/40 hover:bg-muted text-foreground border-emerald-600/30 cursor-pointer"
                      : isShippingValid
                      ? "bg-muted/30 hover:bg-muted/60 text-foreground border-border/60 cursor-pointer"
                      : "bg-muted/20 text-muted-foreground/60 border-dashed border-border/50 opacity-70 cursor-not-allowed"
                  }`}
                  aria-current={activeStep === 3 ? "step" : undefined}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all ${
                      activeStep === 3
                        ? "bg-[#fdc72d] text-[#1b1c1a] ring-2 ring-[#fdc72d]/30 shadow-xs"
                        : activeStep === 4
                        ? "bg-emerald-600 text-white"
                        : !isShippingValid
                        ? "bg-muted/80 text-muted-foreground/70"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {activeStep === 4 ? (
                      <Check className="h-4 w-4" />
                    ) : !isShippingValid ? (
                      <Lock className="h-3.5 w-3.5" />
                    ) : (
                      toDigits(3)
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs sm:text-sm font-bold leading-tight truncate">
                        {cartData.stepper[2].title}
                      </span>
                      {!isShippingValid && (
                        <span className="hidden lg:inline text-[9px] px-1 py-0.2 rounded bg-muted text-muted-foreground font-medium">
                          {isEn ? "Locked" : "લૉક"}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-[11px] truncate text-muted-foreground">
                      {!isShippingValid
                        ? (isEn ? "Requires Address" : "સરનામું જરૂરી")
                        : cartData.stepper[2].subtitle}
                    </span>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {/* EMPTY CART STATE */}
          {cartItems.length === 0 && activeStep !== 4 ? (
            <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-card rounded-2xl border border-border shadow-2xs">
              <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mb-4 text-muted-foreground">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {cartData.cartActions.emptyCartTitle}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
                {cartData.cartActions.emptyCartSubtitle}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  className="bg-[#00685d] hover:bg-[#005048] text-white font-bold rounded-xl shadow-xs gap-1.5 cursor-pointer h-10 px-5 text-xs"
                >
                  <Link href="/myshop">
                    <ShoppingBag className="h-4 w-4" />
                    <span>{cartData.cartActions.exploreStore}</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-border hover:bg-muted/60 cursor-pointer text-xs h-10 px-5 font-semibold gap-1.5"
                >
                  <Link href="/myshop">
                    <Sparkles className="h-3.5 w-3.5 text-[#d9a100]" />
                    <span>{cartData.cartActions.browseBestSellers}</span>
                  </Link>
                </Button>
              </div>
            </div>
          ) : activeStep === 4 ? (
            /* ======================================================== */
            /* ORDER SUCCESS VIEW (CONFIRMED)                           */
            /* ======================================================== */
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {cartData.checkoutModal.orderSuccessTitle}
                </h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00685d]/10 text-[#00685d] dark:bg-[#fdc72d]/15 dark:text-[#fdc72d] font-bold text-xs mt-2.5">
                  <span>{cartData.checkoutModal.orderIdPrefix}{orderId}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
                {cartData.checkoutModal.orderSuccessDesc}
              </p>

              {/* Order Recap Snapshot */}
              <div className="w-full p-4 rounded-2xl bg-muted/40 border border-border/70 text-xs text-left flex flex-col gap-2">
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-muted-foreground">{isEn ? "Devotee Name:" : "યજમાન / નામ:"}</span>
                  <span className="font-bold text-foreground">{shippingForm.fullName}</span>
                </div>
                {sankalpIncluded && (
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">{isEn ? "Gotra:" : "ગોત્ર:"}</span>
                    <span className="font-bold text-foreground">{currentGotraValue}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-muted-foreground">{isEn ? "Delivery Location:" : "ડિલિવરી સ્થળ:"}</span>
                  <span className="font-bold text-foreground">{shippingForm.city}, {currentStateValue} ({shippingForm.pincode})</span>
                </div>
                <div className="flex justify-between items-center py-1 text-sm font-bold pt-2">
                  <span>{isEn ? "Total Paid / Payable:" : "કુલ ચુકવવાપાત્ર રકમ:"}</span>
                  <span className="text-[#00685d] dark:text-[#fdc72d]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
                <Button
                  asChild
                  className="bg-[#00685d] hover:bg-[#005048] text-white font-bold rounded-xl text-xs flex-1 h-10 shadow-xs cursor-pointer"
                >
                  <Link href="/myshop">
                    {cartData.cartActions.continueShopping}
                  </Link>
                </Button>
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{isEn ? "WhatsApp Receipt" : "WhatsApp રસીદ"}</span>
                </a>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* ACTIVE MULTI-STEP CART & CHECKOUT WORKFLOW               */
            /* ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: Main Tab Content (7 Cols ~ 60%) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* ---------------------------------------------------- */}
                {/* TAB 1: CART REVIEW CONTENT                           */}
                {/* ---------------------------------------------------- */}
                {activeStep === 1 && (
                  <>
                    {/* Header Bar & Free Delivery / Gift Progress */}
                    <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-2xs flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <h1 className="text-lg sm:text-xl font-extrabold text-foreground">
                            {cartData.cartHeader.title}
                          </h1>
                          <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-xs font-semibold">
                            {toDigits(totalItemCount)} {cartData.cartHeader.itemsCountSuffix}
                          </Badge>
                        </div>

                        {/* Unconditional Free Delivery Guarantee */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
                          <Truck className="h-3.5 w-3.5" />
                          <span>{isEn ? "Free Delivery Active" : "મફત ડિલિવરી સક્રિય"}</span>
                        </div>
                      </div>

                      {/* Sacred Gangajal & Prasad Gift Milestone Progress Bar */}
                      <div className="p-3.5 sm:p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-col gap-2.5">
                        <div className="flex flex-wrap items-center justify-between text-xs font-medium gap-2">
                          <span className="flex items-center gap-1.5 font-bold text-foreground">
                            <Gift className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                            <span>{isEn ? "Free Gangajal Gift Goal (₹4,000)" : "મફત ગંગાજળ ભેટ લક્ષ્યાંક (₹૪,૦૦૦)"}</span>
                          </span>
                          <span className="text-[11px]">
                            {gangajalDiff > 0 ? (
                              <span className="text-muted-foreground">
                                {isEn ? (
                                  <>Add <strong className="text-foreground">₹{gangajalDiff.toLocaleString("en-IN")}</strong> more to unlock</>
                                ) : (
                                  <>ગંગાજળ ભેટ માટે વધુ <strong className="text-foreground">₹{toDigits(gangajalDiff.toLocaleString("gu-IN"))}</strong> ઉમેરો</>
                                )}
                              </span>
                            ) : (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                {cartData.cartHeader.gangaJalUnlocked}
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="w-full bg-muted-foreground/15 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#00685d] to-[#008d7f] dark:from-[#fdc72d] dark:to-[#d9a100] h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${gangajalProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex flex-col gap-3.5">
                      {cartItems.map((item) => {
                        const itemName = getText(item.name)
                        const itemSubtitle = getText(item.subtitle)
                        const itemPrice = item.price || 0
                        const itemOrigPrice = item.originalPrice || itemPrice
                        const itemQty = item.qty || 1

                        return (
                          <article
                            key={item.id}
                            className="bg-card p-4 sm:p-5 rounded-2xl border border-border/80 shadow-2xs flex flex-col sm:flex-row gap-4 relative group transition-all hover:border-border"
                          >
                            {/* Product Image Thumbnail - Clean without obstructing overlay badges */}
                            <Link
                              href={`/myshop/product/${item.productId || item.id}`}
                              className="w-full sm:w-28 sm:h-28 h-44 rounded-xl bg-muted overflow-hidden shrink-0 relative border border-border/50 block group/thumb cursor-pointer"
                            >
                              <img
                                src={item.image}
                                alt={itemName}
                                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                              />
                            </Link>

                            {/* Details & Controls */}
                            <div className="flex flex-col justify-between flex-1 min-w-0 gap-3">
                              {/* Top: Title & Clean Price */}
                              <div>
                                <div className="flex items-start justify-between gap-3">
                                  <Link
                                    href={`/myshop/product/${item.productId || item.id}`}
                                    className="font-bold text-sm sm:text-base text-foreground hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors leading-snug"
                                  >
                                    {itemName}
                                  </Link>

                                  {/* Price Display: Clear, prominent, without redundant shouting badges */}
                                  <div className="flex flex-col items-end shrink-0 text-right">
                                    <span className="font-extrabold text-base sm:text-lg text-foreground">
                                      {formatPrice(itemPrice * itemQty)}
                                    </span>
                                    {itemOrigPrice > itemPrice && (
                                      <span className="text-xs text-muted-foreground line-through">
                                        {formatPrice(itemOrigPrice * itemQty)}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {itemSubtitle && (
                                  <p className="text-xs text-muted-foreground/80 line-clamp-1 mt-1">
                                    {itemSubtitle}
                                  </p>
                                )}
                              </div>

                              {/* Bottom Actions Row: Quantity Stepper on Left, Balanced Save for Later & Remove on Right */}
                              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/50">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
                                    {isEn ? "Qty:" : "જથ્થો:"}
                                  </span>
                                  <div className="flex items-center border border-border rounded-lg bg-muted/30">
                                    <button
                                      type="button"
                                      onClick={() => handleDecreaseQty(item.id)}
                                      className="p-1 px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-l-lg transition-colors cursor-pointer"
                                      aria-label={cartData.itemCard.qtyAriaMinus}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="px-2 text-xs font-bold min-w-[24px] text-center">
                                      {toDigits(itemQty)}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleIncreaseQty(item.id)}
                                      className="p-1 px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-r-lg transition-colors cursor-pointer"
                                      aria-label={cartData.itemCard.qtyAriaPlus}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>

                                {/* Balanced Secondary Actions: Save for Later & Remove */}
                                <div className="flex items-center gap-1 sm:gap-2 text-xs">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveForLater(item)}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:text-[#00685d] dark:hover:text-[#fdc72d] hover:bg-muted/60 font-medium transition-colors cursor-pointer"
                                  >
                                    <Bookmark className="h-3.5 w-3.5" />
                                    <span>{cartData.itemCard.saveForLater}</span>
                                  </button>

                                  <span className="h-3.5 w-px bg-border/70" />

                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 font-medium transition-colors cursor-pointer"
                                    title={cartData.itemCard.deleteTitle}
                                    aria-label={cartData.itemCard.deleteTitle}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>{isEn ? "Remove" : "હટાવો"}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </article>
                        )
                      })}
                    </div>

                    {/* Complimentary Free Gifts Banner */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-2xs flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                          <Gift className="h-4 w-4 text-[#d9a100]" />
                          {cartData.freeGiftsSection.title}
                        </span>
                        <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                          {cartData.freeGiftsSection.freeBadge}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cartData.freeGiftsSection.gifts.map((gift) => (
                          <div
                            key={gift.id}
                            className="p-3 rounded-xl bg-muted/40 border border-border/50 flex items-center gap-3 text-xs"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                              {gift.id === "gangajal" ? (
                                <Droplets className="h-4 w-4" />
                              ) : (
                                <Sparkles className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-foreground truncate">{gift.name}</span>
                              <span className="text-[11px] text-muted-foreground truncate">{gift.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions: Continue Shopping & Clear Cart */}
                    <div className="flex items-center justify-between pt-1">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        <Link href="/myshop">
                          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                          <span>{cartData.cartActions.continueShopping}</span>
                        </Link>
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowClearConfirm(true)}
                        className="text-xs text-muted-foreground hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        <span>{cartData.cartActions.clearCart}</span>
                      </Button>
                    </div>

                    {/* Saved for Later Section */}
                    {savedItems.length > 0 && (
                      <div className="mt-4 p-5 rounded-2xl bg-card border border-border shadow-2xs flex flex-col gap-3">
                        <h3 className="font-bold text-sm text-foreground">
                          {cartData.savedForLaterSection.title} ({toDigits(savedItems.length)})
                        </h3>
                        <div className="flex flex-col gap-2.5">
                          {savedItems.map((sItem) => (
                            <div
                              key={sItem.id}
                              className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50 gap-3 text-xs"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={sItem.image}
                                  alt={getText(sItem.name)}
                                  className="w-12 h-12 object-cover rounded-lg border border-border/50 shrink-0"
                                />
                                <div className="flex flex-col min-w-0">
                                  <span className="font-bold text-foreground truncate">{getText(sItem.name)}</span>
                                  <span className="text-muted-foreground font-semibold">{formatPrice(sItem.price)}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => handleMoveToCart(sItem)}
                                  className="text-xs rounded-lg h-8 cursor-pointer"
                                >
                                  {cartData.savedForLaterSection.moveToCart}
                                </Button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = savedItems.filter((i) => i.id !== sItem.id)
                                    updateSavedState(updated)
                                  }}
                                  className="text-muted-foreground hover:text-red-500 p-1"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* ---------------------------------------------------- */}
                {/* TAB 2: SHIPPING & VEDIC SANKALP CONTENT              */}
                {/* ---------------------------------------------------- */}
                {activeStep === 2 && (
                  <form onSubmit={handleProceedToPayment} className="flex flex-col gap-6">
                    {/* 1. Vedic Puja Sankalp Card */}
                    <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-2xs flex flex-col gap-4">
                      <div className="flex items-center justify-between pb-3 border-b border-border/60">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[#d9a100]" />
                          <h2 className="font-bold text-base text-foreground">
                            {cartData.sankalpBox.title}
                          </h2>
                        </div>
                        <Badge className="bg-[#00685d] text-white text-[10px]">
                          {cartData.itemCard.freeTag}
                        </Badge>
                      </div>

                      {/* Enable Sankalp Checkbox */}
                      <label className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sankalpIncluded}
                          onChange={(e) => setSankalpIncluded(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded accent-[#00685d] cursor-pointer"
                        />
                        <div className="flex flex-col text-xs">
                          <span className="font-bold text-foreground">
                            {cartData.sankalpBox.checkboxLabel}
                          </span>
                          <span className="text-muted-foreground mt-0.5 leading-relaxed">
                            {cartData.sankalpBox.checkboxDesc}
                          </span>
                        </div>
                      </label>

                      {sankalpIncluded && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                          {/* Devotee / Yajman Name */}
                          <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <Label className="text-xs font-bold text-foreground">
                              {cartData.sankalpBox.yajmanLabel} *
                            </Label>
                            <Input
                              required
                              value={sankalpForm.yajmanName}
                              onChange={(e) => handleYajmanNameChange(e.target.value)}
                              placeholder={isEn ? "e.g. Ramesh Patel" : "દા.ત. રમેશભાઈ પટેલ"}
                              className="h-10 text-xs rounded-xl bg-background"
                            />
                          </div>

                          {/* Gotra */}
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold text-foreground">
                              {cartData.sankalpBox.gotraLabel}
                            </Label>
                            <Input
                              value={sankalpForm.gotra}
                              onChange={(e) => setSankalpForm({ ...sankalpForm, gotra: e.target.value })}
                              placeholder={isEn ? "e.g. Kashyap, Bharadwaj, Vashishta" : "દા.ત. કશ્યપ, ભારદ્વાજ, વસિષ્ઠ"}
                              className="h-10 text-xs rounded-xl bg-background"
                            />
                            {/* Quick Select Gotra Pills with Active Selected Feedback */}
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {POPULAR_GOTRAS.map((g) => {
                                const label = isEn ? g.en : g.gu
                                const isSelected =
                                  sankalpForm.gotra?.trim().toLowerCase() === g.en.toLowerCase() ||
                                  sankalpForm.gotra?.trim() === g.gu
                                return (
                                  <button
                                    key={g.en}
                                    type="button"
                                    onClick={() => setSankalpForm({ ...sankalpForm, gotra: label })}
                                    className={`text-[10px] px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 border ${
                                      isSelected
                                        ? "bg-[#00685d] text-white border-[#00685d] font-bold dark:bg-[#fdc72d] dark:text-[#1b1c1a] dark:border-[#fdc72d] shadow-2xs"
                                        : "bg-muted/70 hover:bg-[#00685d]/10 text-muted-foreground hover:text-[#00685d] dark:hover:text-[#fdc72d] border-border/40"
                                    }`}
                                  >
                                    {isSelected && <Check className="h-3 w-3 stroke-[2.5]" />}
                                    <span>{label}</span>
                                  </button>
                                )
                              })}
                            </div>
                          </div>

                          {/* Sankalp Purpose / Intention */}
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold text-foreground">
                              {isEn ? "Sankalp Intention / Purpose" : "સંકલ્પ મનોકામના / હેતુ"}
                            </Label>
                            <select
                              value={currentPurposeValue}
                              onChange={(e) => setSankalpForm({ ...sankalpForm, purpose: e.target.value })}
                              className="h-10 px-3 text-xs rounded-xl bg-background border border-border text-foreground outline-none focus:border-[#00685d] cursor-pointer"
                            >
                              {SANKALP_PURPOSES.map((p) => {
                                const pValue = isEn ? p.en : p.gu
                                return (
                                  <option key={p.en} value={pValue}>
                                    {pValue}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 2. Shipping & Delivery Address Card */}
                    <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-2xs flex flex-col gap-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-border/60">
                        <MapPin className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                        <h2 className="font-bold text-base text-foreground">
                          {cartData.checkoutModal.title}
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                        {/* Recipient Name with 'Same as Devotee' auto-fill toggle */}
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-bold text-foreground">
                              {cartData.checkoutModal.nameLabel} *
                            </Label>
                            {sankalpIncluded && (
                              <label className="flex items-center gap-1.5 text-[11px] text-[#00685d] dark:text-[#fdc72d] cursor-pointer font-medium hover:underline select-none">
                                <input
                                  type="checkbox"
                                  checked={sameAsDevotee}
                                  onChange={(e) => handleToggleSameAsDevotee(e.target.checked)}
                                  className="h-3.5 w-3.5 rounded accent-[#00685d] cursor-pointer"
                                />
                                <span>{isEn ? "Same as Devotee Name" : "યજમાન નામ જ રાખો"}</span>
                              </label>
                            )}
                          </div>
                          <Input
                            required
                            value={shippingForm.fullName}
                            onChange={(e) => {
                              setSameAsDevotee(false)
                              setShippingForm({ ...shippingForm, fullName: e.target.value })
                            }}
                            placeholder={cartData.checkoutModal.namePlaceholder}
                            className="h-10 text-xs rounded-xl bg-background"
                          />
                          {sameAsDevotee && sankalpIncluded && (
                            <span className="text-[10px] text-muted-foreground">
                              {isEn
                                ? "✓ Synced with Vedic Devotee name"
                                : "✓ વૈદિક સંકલ્પ યજમાન નામ સાથે આપમેળે જોડાયેલ છે"}
                            </span>
                          )}
                        </div>

                        {/* WhatsApp Mobile Number */}
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-bold text-foreground">
                              {cartData.checkoutModal.phoneLabel} *
                            </Label>
                            <span className="text-[10px] text-muted-foreground">
                              {isEn ? "Live Darshan photos & tracking will be sent here" : "લાઇવ પૂજા દર્શન & ટ્રેકિંગ અહીં મોકલવામાં આવશે"}
                            </span>
                          </div>
                          <Input
                            required
                            type="tel"
                            value={shippingForm.phone}
                            onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                            placeholder={cartData.checkoutModal.phonePlaceholder}
                            className="h-10 text-xs rounded-xl bg-background"
                          />
                        </div>

                        {/* Street Address */}
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <Label className="text-xs font-bold text-foreground">
                            {cartData.checkoutModal.addressLabel} *
                          </Label>
                          <Input
                            required
                            value={shippingForm.address}
                            onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                            placeholder={cartData.checkoutModal.addressPlaceholder}
                            className="h-10 text-xs rounded-xl bg-background"
                          />
                        </div>

                        {/* 3-Column: City, State, and Pincode */}
                        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* City / Town */}
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold text-foreground">
                              {cartData.checkoutModal.cityLabel} *
                            </Label>
                            <Input
                              required
                              value={shippingForm.city}
                              onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                              placeholder={cartData.checkoutModal.cityPlaceholder}
                              className="h-10 text-xs rounded-xl bg-background"
                            />
                          </div>

                          {/* State Selection */}
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold text-foreground">
                              {cartData.checkoutModal.stateLabel || (isEn ? "State" : "રાજ્ય")} *
                            </Label>
                            <select
                              value={currentStateValue}
                              onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                              className="h-10 px-3 text-xs rounded-xl bg-background border border-border text-foreground outline-none focus:border-[#00685d] cursor-pointer"
                            >
                              <option value="">
                                {cartData.checkoutModal.statePlaceholder || (isEn ? "Select State" : "રાજ્ય પસંદ કરો")}
                              </option>
                              {INDIAN_STATES.map((st) => {
                                const sName = isEn ? st.en : st.gu
                                return (
                                  <option key={st.en} value={sName}>
                                    {sName}
                                  </option>
                                )
                              })}
                            </select>
                          </div>

                          {/* Pincode with Instant Lookup & Verification */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs font-bold text-foreground">
                                {cartData.checkoutModal.pincodeLabel} *
                              </Label>
                              {shippingForm.pincode && shippingForm.pincode.length === 6 && (
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                                  <Check className="h-3 w-3 stroke-[2.5]" />
                                  <span>{isEn ? "Verified" : "માન્ય"}</span>
                                </span>
                              )}
                            </div>
                            <Input
                              required
                              maxLength={6}
                              value={shippingForm.pincode}
                              onChange={(e) => handlePincodeChange(e.target.value)}
                              placeholder={cartData.checkoutModal.pincodePlaceholder}
                              className="h-10 text-xs rounded-xl bg-background tracking-wider"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons for Step 2 */}
                    <div className="flex items-center justify-between pt-1">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleTabChange(1)}
                        className="rounded-xl text-xs font-semibold cursor-pointer h-10 px-4"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                        <span>{isEn ? "Back to Cart Review" : "કાર્ટ સમીક્ષા પર પાછા જાઓ"}</span>
                      </Button>

                      <Button
                        type="submit"
                        className="bg-[#00685d] hover:bg-[#005048] text-white font-bold rounded-xl text-xs h-10 px-6 shadow-sm cursor-pointer"
                      >
                        <span>{isEn ? "Continue to Payment" : "ચુકવણી તરફ આગળ વધો"}</span>
                        <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </div>
                  </form>
                )}

                {/* ---------------------------------------------------- */}
                {/* TAB 3: SECURE PAYMENT CONTENT                        */}
                {/* ---------------------------------------------------- */}
                {activeStep === 3 && (
                  <div className="flex flex-col gap-6">
                    {/* Payment Method Selection Card */}
                    <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-2xs flex flex-col gap-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-border/60">
                        <CreditCard className="h-4 w-4 text-[#00685d] dark:text-[#fdc72d]" />
                        <h2 className="font-bold text-base text-foreground">
                          {cartData.checkoutModal.paymentMethodLabel}
                        </h2>
                      </div>

                      <RadioGroup
                        value={shippingForm.paymentMethod}
                        onValueChange={(val) => setShippingForm({ ...shippingForm, paymentMethod: val })}
                        className="flex flex-col gap-3"
                      >
                        {/* 1. Cash on Delivery (COD) */}
                        <label
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            shippingForm.paymentMethod === "cod"
                              ? "bg-[#00685d]/5 border-[#00685d] dark:border-[#fdc72d]"
                              : "bg-muted/30 border-border hover:bg-muted/50"
                          }`}
                        >
                          <RadioGroupItem value="cod" id="pay-cod" className="mt-0.5" />
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-foreground">
                              {cartData.checkoutModal.paymentCod}
                            </span>
                            <span className="text-muted-foreground mt-0.5">
                              {isEn
                                ? "Pay upon delivery with cash. Verified contactless delivery."
                                : "ઘરે બેઠા સામગ્રી મળ્યા પછી રોકડા ચૂકવો."}
                            </span>
                          </div>
                        </label>

                        {/* 2. Online Payment (UPI / Cards via Razorpay) */}
                        <label
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            shippingForm.paymentMethod === "online"
                              ? "bg-[#00685d]/5 border-[#00685d] dark:border-[#fdc72d]"
                              : "bg-muted/30 border-border hover:bg-muted/50"
                          }`}
                        >
                          <RadioGroupItem value="online" id="pay-online" className="mt-0.5" />
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-foreground flex items-center gap-1.5">
                              <span>{cartData.checkoutModal.paymentOnline}</span>
                              <Badge className="bg-emerald-600 text-white text-[9px] font-bold py-0 px-1.5">
                                {isEn ? "Fast & Secure" : "ઝડપી & સુરક્ષિત"}
                              </Badge>
                            </span>
                            <span className="text-muted-foreground mt-0.5">
                              {isEn
                                ? "Google Pay, PhonePe, Paytm, UPI, NetBanking & All Cards."
                                : "ગૂગલ પે, ફોનપે, પેટીએમ, તમામ કાર્ડ્સ દ્વારા સુરક્ષિત ચુકવણી."}
                            </span>
                          </div>
                        </label>

                        {/* 3. WhatsApp Assisted Order */}
                        <label
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            shippingForm.paymentMethod === "whatsapp"
                              ? "bg-[#00685d]/5 border-[#00685d] dark:border-[#fdc72d]"
                              : "bg-muted/30 border-border hover:bg-muted/50"
                          }`}
                        >
                          <RadioGroupItem value="whatsapp" id="pay-wa" className="mt-0.5" />
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-foreground">
                              {cartData.checkoutModal.paymentWhatsapp}
                            </span>
                            <span className="text-muted-foreground mt-0.5">
                              {isEn
                                ? "Confirm with our representative directly on WhatsApp."
                                : "અમારા પ્રતિનિધિ સાથે સીધા WhatsApp પર વાતચીત કરીને ઓર્ડર પૂર્ણ કરો."}
                            </span>
                          </div>
                        </label>
                      </RadioGroup>
                    </div>

                    {/* Order Verification Summary Card */}
                    <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-2xs flex flex-col gap-3">
                      <span className="font-bold text-sm text-foreground">
                        {isEn ? "Order Verification Details" : "ઓર્ડર વિગતોની ચકાસણી"}
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-muted/40 p-3.5 rounded-xl border border-border/50">
                        <div>
                          <span className="text-muted-foreground block text-[11px]">{isEn ? "Recipient:" : "પ્રાપ્તકર્તા:"}</span>
                          <span className="font-bold text-foreground">{shippingForm.fullName} ({shippingForm.phone})</span>
                          <span className="text-muted-foreground block text-[11px] mt-1">{shippingForm.address}, {shippingForm.city}, {currentStateValue} - {shippingForm.pincode}</span>
                        </div>

                        {sankalpIncluded && (
                          <div className="border-t sm:border-t-0 sm:border-l border-border/60 pt-2 sm:pt-0 sm:pl-3">
                            <span className="text-muted-foreground block text-[11px]">{isEn ? "Consecration Details:" : "સંકલ્પ વિગત:"}</span>
                            <span className="font-bold text-foreground">{sankalpForm.yajmanName}</span>
                            <span className="text-muted-foreground block text-[11px]">{isEn ? "Gotra:" : "ગોત્ર:"} {currentGotraValue}</span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">
                              {currentPurposeValue}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Navigation Buttons for Step 3 */}
                    <div className="flex items-center justify-between pt-1">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleTabChange(2)}
                        className="rounded-xl text-xs font-semibold cursor-pointer h-10 px-4"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                        <span>{isEn ? "Back to Shipping" : "સરનામું સુધારો"}</span>
                      </Button>

                      <Button
                        type="button"
                        onClick={handleCompleteOrder}
                        disabled={isOrderSubmitting}
                        className="bg-[#00685d] hover:bg-[#005048] text-white font-bold rounded-xl text-xs h-10 px-6 shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        {isOrderSubmitting ? (
                          <span>{isEn ? "Placing Order..." : "ઓર્ડર નોંધાઈ રહ્યો છે..."}</span>
                        ) : (
                          <>
                            <Lock className="h-3.5 w-3.5" />
                            <span>{cartData.checkoutModal.placeOrderBtn}</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Sticky Order Summary (5 Cols ~ 40%) */}
              <aside className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-24">
                {/* Order Summary Card */}
                <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-xs flex flex-col gap-4">
                  <h2 className="font-extrabold text-base text-foreground pb-3 border-b border-border/60">
                    {cartData.orderSummary.title}
                  </h2>

                  <div className="space-y-2.5 text-xs text-foreground">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{cartData.orderSummary.subtotalLabel}:</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>

                    {/* Consecration Fee */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{cartData.orderSummary.consecrationLabel}:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {cartData.orderSummary.freeTag}{" "}
                        <span className="text-[10px] text-muted-foreground line-through font-normal">
                          {cartData.orderSummary.consecrationOriginalCost}
                        </span>
                      </span>
                    </div>

                    {/* Shipping Fee */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{cartData.orderSummary.shippingLabel}:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {cartData.orderSummary.freeShipping}
                      </span>
                    </div>

                    {/* Coupon Discount */}
                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span>{cartData.orderSummary.couponAppliedPrefix} ({appliedCoupon.code}):</span>
                        <span>-{formatPrice(couponDiscount)}</span>
                      </div>
                    )}
                  </div>

                  {/* Coupon Code: Input Form or Applied Badge */}
                  <div className="pt-2 border-t border-border/60">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 transition-all">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <Sparkles className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-extrabold text-xs tracking-wider text-emerald-800 dark:text-emerald-300">
                                {appliedCoupon.code}
                              </span>
                              <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-[9px] font-bold py-0 px-1.5 leading-tight">
                                {toDigits(appliedCoupon.discountPercent)}% {isEn ? "OFF" : "છૂટ"}
                              </Badge>
                            </div>
                            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium truncate">
                              {isEn
                                ? `Saved ${formatPrice(couponDiscount)} with this coupon`
                                : `આ કૂપનથી ${formatPrice(couponDiscount)} ની બચત થઈ`}
                            </span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveCoupon}
                          className="text-xs text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg h-7 px-2 font-medium cursor-pointer shrink-0"
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          <span>{cartData.orderSummary.couponRemove || (isEn ? "Remove" : "દૂર કરો")}</span>
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <Input
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder={cartData.orderSummary.couponPlaceholder}
                          className="h-9 text-xs rounded-xl bg-background"
                        />
                        <Button
                          type="submit"
                          variant="secondary"
                          size="sm"
                          className="h-9 px-3 rounded-xl font-bold text-xs cursor-pointer shrink-0"
                        >
                          {cartData.orderSummary.applyCoupon}
                        </Button>
                      </form>
                    )}
                  </div>

                  {/* Total Payable Box */}
                  <div className="p-3.5 rounded-xl bg-muted/60 border border-border/60 flex flex-col gap-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {cartData.orderSummary.totalPayable}:
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#00685d] dark:text-[#fdc72d]">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                    {totalSavings > 0 && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {cartData.orderSummary.savingsCallout(totalSavings)}
                      </span>
                    )}
                  </div>

                  {/* Primary Contextual CTA Button */}
                  {activeStep === 1 ? (
                    <Button
                      size="lg"
                      onClick={() => handleTabChange(2)}
                      className="w-full h-11 sm:h-12 rounded-xl bg-[#00685d] hover:bg-[#005048] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{cartData.orderSummary.checkoutButton}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : activeStep === 2 ? (
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 flex items-center gap-3 text-xs">
                      <div className="w-8 h-8 rounded-lg bg-[#00685d]/10 text-[#00685d] dark:bg-[#fdc72d]/15 dark:text-[#fdc72d] flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-foreground">
                          {isEn ? "Step 2 of 3: Shipping & Sankalp" : "પગલું ૨ / ૩: શિપિંગ & સંકલ્પ"}
                        </span>
                        <span className="text-[11px] text-muted-foreground leading-snug">
                          {isEn
                            ? "Complete delivery address on the left to proceed"
                            : "ચુકવણી તરફ આગળ વધવા ડાબી બાજુ સરનામું પૂર્ણ કરો"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-xs">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">
                          {isEn ? "Final Step: Payment Selection" : "અંતિમ પગલું: ચુકવણી પદ્ધતિ"}
                        </span>
                        <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 leading-snug">
                          {isEn
                            ? "Select payment mode on the left and click 'Confirm Sacred Order'"
                            : "ડાબી બાજુ ચુકવણી પદ્ધતિ પસંદ કરી 'ઓર્ડર કન્ફર્મ કરો' પર ક્લિક કરો"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 1-Click WhatsApp Express Order with Clear Scope */}
                  <div className="flex flex-col gap-1.5">
                    <a
                      href={getWhatsAppOrderUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] font-bold text-xs flex items-center justify-center gap-2 border border-[#25D366]/30 transition-all cursor-pointer shadow-2xs group"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                      <span>{cartData.orderSummary.whatsappButton}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] font-semibold ml-0.5">
                        {isEn ? "No Form Filling" : "ફોર્મ ભર્યા વિના"}
                      </span>
                    </a>
                    <p className="text-[10px] text-muted-foreground text-center px-1 leading-relaxed">
                      {cartData.orderSummary.whatsappSubtext}
                    </p>
                  </div>

                  {/* Recognizable Payment Partner Logos & Security Guarantee */}
                  <div className="flex flex-col items-center gap-2 pt-2 border-t border-border/50 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      {/* UPI */}
                      <span className="h-6 px-2 rounded-md bg-muted/60 border border-border/80 flex items-center justify-center shadow-2xs" title="UPI">
                        <svg viewBox="0 0 46 16" className="h-3.5 w-auto" fill="none">
                          <path d="M4 13L7.5 3h3L7 13H4z" fill="#097939" />
                          <path d="M9.5 13l3.5-10h3L12.5 13H9.5z" fill="#ED752E" />
                          <text x="18" y="12" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="900" fontStyle="italic" fill="currentColor">UPI</text>
                        </svg>
                      </span>

                      {/* Google Pay */}
                      <span className="h-6 px-2 rounded-md bg-muted/60 border border-border/80 flex items-center gap-1 shadow-2xs" title="Google Pay">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                        <span className="text-[10px] font-bold text-foreground">Pay</span>
                      </span>

                      {/* PhonePe */}
                      <span className="h-6 px-1.5 rounded-md bg-[#5f259f] text-white flex items-center gap-1 shadow-2xs" title="PhonePe">
                        <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                          <span className="text-[#5f259f] font-black text-[9px] leading-none">પે</span>
                        </div>
                        <span className="text-[10px] font-black tracking-tight">PhonePe</span>
                      </span>

                      {/* Paytm */}
                      <span className="h-6 px-1.5 rounded-md bg-[#002e6e] text-white flex items-center gap-0.5 shadow-2xs font-black text-[10px]" title="Paytm">
                        <span className="text-white">Pay</span>
                        <span className="text-[#00baf2]">tm</span>
                      </span>

                      {/* Visa */}
                      <span className="h-6 px-2 rounded-md bg-[#1434cb] text-white flex items-center justify-center shadow-2xs" title="Visa">
                        <span className="font-black italic text-[11px] tracking-wider leading-none">VISA</span>
                      </span>

                      {/* RuPay */}
                      <span className="h-6 px-2 rounded-md bg-muted/60 border border-border/80 flex items-center gap-0.5 shadow-2xs" title="RuPay">
                        <span className="font-black text-[10px] text-foreground">RuPay</span>
                        <span className="flex">
                          <span className="w-1.5 h-2.5 bg-[#f47920] transform -skew-x-12 inline-block"></span>
                          <span className="w-1.5 h-2.5 bg-[#00843d] transform -skew-x-12 inline-block -ml-0.5"></span>
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
                      <Lock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span>{cartData.orderSummary.securityGuarantee}</span>
                    </div>
                  </div>
                </div>

                {/* Astrological Assistance Box */}
                <div className="p-4 rounded-xl bg-[#fdc72d]/10 border border-[#fdc72d]/30 flex items-start gap-2.5 text-xs">
                  <HelpCircle className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-foreground">
                      {cartData.astrologyHelp.title}
                    </span>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {cartData.astrologyHelp.desc}
                    </p>
                    <a
                      href={`tel:${cartData.astrologyHelp.phone}`}
                      className="text-[#00685d] dark:text-[#fdc72d] font-bold text-[11px] pt-1 hover:underline inline-flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" />
                      <span>{cartData.astrologyHelp.cta}</span>
                    </a>
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
        <DialogContent className="sm:max-w-md rounded-2xl p-5">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground">
              {cartData.cartActions.clearCartConfirm}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {isEn
                ? "All items will be removed from your cart."
                : "તમારા કાર્ટમાંથી તમામ સામગ્રી હટી જશે."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowClearConfirm(false)}
              className="rounded-xl text-xs cursor-pointer"
            >
              {isEn ? "Cancel" : "રદ કરો"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearCart}
              className="rounded-xl font-bold text-xs cursor-pointer"
            >
              {cartData.cartActions.clearCart}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
