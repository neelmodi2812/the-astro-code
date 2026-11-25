"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Lock,
  Sparkles,
  CheckCircle,
  Crown,
  ShieldCheck,
  Loader2,
  ArrowRight,
  Flame,
} from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/sonner"
import { useAuth } from "@/lib/api/hooks/use-auth"
import { subscriptionService } from "@/lib/api/services/subscription"

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false)
    if (window.Razorpay) return resolve(true)

    const existingScript = document.getElementById("razorpay-checkout-js")
    if (existingScript) {
      existingScript.onload = () => resolve(true)
      existingScript.onerror = () => resolve(false)
      return
    }

    const script = document.createElement("script")
    script.id = "razorpay-checkout-js"
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function ArticlePaywall({ lang = "gu", onUnlocked }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()

  const [plans, setPlans] = React.useState([])
  const [selectedPlanId, setSelectedPlanId] = React.useState(null)
  const [loadingPlans, setLoadingPlans] = React.useState(true)
  const [planLoadFailed, setPlanLoadFailed] = React.useState(false)
  const [planLoadAttempt, setPlanLoadAttempt] = React.useState(0)
  const [submitting, setSubmitting] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  React.useEffect(() => {
    const controller = new AbortController()
    subscriptionService
      .plans({ lang, token: null, signal: controller.signal })
      .then((res) => {
        if (controller.signal.aborted) return
        if (!Array.isArray(res?.data)) throw new Error("Invalid subscription plans response")
        setPlans(res.data)
        const popular = res.data.find((plan) => plan.is_popular) || res.data[0]
        setSelectedPlanId((current) => res.data.some((plan) => plan.id === current) ? current : popular?.id ?? null)
        setPlanLoadFailed(false)
      })
      .catch(() => {
        if (!controller.signal.aborted) setPlanLoadFailed(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingPlans(false)
      })

    return () => controller.abort()
  }, [lang, planLoadAttempt])

  React.useEffect(() => {
    loadRazorpayScript()
  }, [])

  const retryPlans = () => {
    setLoadingPlans(true)
    setPlanLoadFailed(false)
    setPlanLoadAttempt((attempt) => attempt + 1)
  }

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0]

  const handleSubscribe = async () => {
    setErrorMessage("")

    if (!isAuthenticated) {
      toast.info(
        lang === "gu"
          ? "સબસ્ક્રિપ્શન લેવા માટે કૃપા કરીને પહેલાં લૉગિન કરો."
          : "Please log in first to subscribe."
      )
      router.push(`/login?redirect=${encodeURIComponent(pathname || "/")}`)
      return
    }

    const hasLoaded = await loadRazorpayScript()
    if (!hasLoaded || !window.Razorpay) {
      setErrorMessage(
        lang === "gu"
          ? "પેમેન્ટ ગેટવે લોડ કરવામાં સમસ્યા આવી. કૃપા કરીને થોડીવાર પછી પ્રયાસ કરો."
          : "Failed to initialize payment gateway. Please try again."
      )
      return
    }

    setSubmitting(true)

    try {
      const checkoutRes = await subscriptionService.checkout(selectedPlan.id)
      const data = checkoutRes?.data

      if (!data?.razorpay_order_id) {
        throw new Error(checkoutRes?.message || "Order initialization failed.")
      }

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "The Astro Code",
        description: `${selectedPlan.name_en || selectedPlan.name_gu} - Subscription`,
        image: "/images/logo-mark.png",
        order_id: data.razorpay_order_id,
        prefill: {
          name: data.user?.name || user?.name || "",
          email: data.user?.email || user?.email || "",
          contact: data.user?.phone || user?.phone || "",
        },
        theme: {
          color: "#00685d",
        },
        handler: async function (response) {
          try {
            toast.loading(
              lang === "gu"
                ? "ચુકવણી ચકાસવામાં આવી રહી છે..."
                : "Verifying your subscription payment..."
            )

            await subscriptionService.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            toast.dismiss()
            toast.success(
              lang === "gu"
                ? "ધન્યવાદ! તમારી સભ્યપદ સફળતાપૂર્વક સક્રિય થઈ ગઈ છે. લેખ અનલોક થયો!"
                : "Membership activated successfully! Full article unlocked."
            )

            if (onUnlocked) {
              onUnlocked()
            }
          } catch (err) {
            toast.dismiss()
            toast.error(
              err?.message ||
                (lang === "gu"
                  ? "વેરિફિકેશન નિષ્ફળ ગયું. અમારો સંપર્ક કરો."
                  : "Payment verification failed. Please contact support.")
            )
          } finally {
            setSubmitting(false)
          }
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", function (resp) {
        setErrorMessage(
          resp.error?.description ||
            (lang === "gu" ? "ચુકવણી નિષ્ફળ થઈ." : "Payment failed.")
        )
        setSubmitting(false)
      })
      rzp.open()
    } catch (err) {
      setErrorMessage(
        err?.message ||
          (lang === "gu"
            ? "ઓર્ડર શરૂ કરવામાં અસમર્થ. ફરી પ્રયાસ કરો."
            : "Could not initiate payment. Please try again.")
      )
      setSubmitting(false)
    }
  }

  return (
    <div className="relative my-8 overflow-hidden rounded-2xl border border-[#d9c58e]/60 bg-[#fbf8ef] p-5 shadow-sm dark:border-[#fdc72d]/20 dark:bg-[#0b2925] sm:p-7">
      {/* Decorative Top Accent Glow */}
      <div className="absolute top-0 inset-x-0 h-1 bg-[#fdc72d]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Emblem Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#806315] dark:text-[#fdc72d] mb-3">
          <Crown className="h-4 w-4" />
          <span>
            {lang === "gu"
              ? "પ્રીમિયમ વૈદિક વિજ્ઞાન સદસ્યતા"
              : "Premium Vedic Wisdom Pass"}
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#0e3934] dark:text-[#f8f7f4] tracking-tight leading-snug">
          {lang === "gu"
            ? "આગળનો સંપૂર્ણ લેખ વાંચવા માટે સદસ્ય બનો"
            : "Subscribe to Unlock the Complete Sacred Article"}
        </h3>

        {/* Subtitle */}
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {lang === "gu"
            ? "મહાન શક્તિપીઠો, જ્યોતિષ રહસ્યો, સિદ્ધ મુહૂર્ત અને પ્રાચીન મંત્રોનું અમર્યાદિત ગહન વાચન મેળવવા માટે આજે જ સભ્યપદ પસંદ કરો."
            : "Gain unlimited access to deep Vedic wisdom, celestial muhurats, secret rituals, and ad-free spiritual knowledge."}
        </p>

        {/* Error message */}
        {(planLoadFailed || errorMessage) && (
          <div role="alert" className="w-full mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs sm:text-sm font-medium">
            {planLoadFailed ? (lang === "gu" ? "યોજનાઓ લોડ થઈ શકી નથી." : "Unable to load plans.") : errorMessage}
          </div>
        )}

        {/* Plan Cards Grid */}
        <fieldset className="grid min-w-0 grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-5 text-left" disabled={submitting}>
          <legend className="sr-only">{lang === "gu" ? "યોજના પસંદ કરો" : "Choose a subscription plan"}</legend>
          {loadingPlans && plans.length === 0 && [0, 1].map((index) => (
            <div key={index} className="space-y-3 rounded-2xl border border-border bg-card p-5">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
          {plans.map((plan) => {
            const isSelected = plan.id === selectedPlanId
            const isPopular = plan.is_popular
            const planFeatures =
              lang === "gu"
                ? plan.features_gu || plan.features || []
                : plan.features_en || plan.features || []

            return (
              <label
                key={plan.id}
                className={`relative flex min-w-0 flex-col p-4 sm:p-5 rounded-xl cursor-pointer transition-colors duration-200 border focus-within:ring-2 focus-within:ring-[#fdc72d] focus-within:ring-offset-2 focus-within:ring-offset-background ${
                  isSelected
                    ? "border-[#00685d] bg-white ring-1 ring-[#00685d] dark:border-[#79c6b8] dark:bg-[#123c35] dark:ring-[#79c6b8]"
                    : "border-border bg-card hover:border-[#00685d]/50 dark:bg-[#102e29]"
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3 right-4 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#fdc72d] text-[#0e3934] text-[11px] font-black uppercase tracking-wider shadow-sm">
                    <Flame className="h-3 w-3 fill-slate-900" />
                    <span>{lang === "gu" ? "લોકપ્રિય" : "Popular"}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-base sm:text-lg text-[#0e3934] dark:text-white">
                      {lang === "gu" ? plan.name_gu : plan.name_en}
                    </h4>
                    <input
                      type="radio"
                      name="article-subscription-plan"
                      value={plan.id}
                      checked={isSelected}
                      onChange={() => setSelectedPlanId(plan.id)}
                      aria-label={lang === "gu" ? plan.name_gu : plan.name_en}
                      className="size-4 shrink-0 accent-[#00685d] dark:accent-[#fdc72d]"
                    />
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-3xl font-bold tracking-tight text-[#00685d] dark:text-[#52c7bb]">
                      ₹{Math.round(plan.price)}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      / {lang === "gu" ? plan.duration_label_gu : plan.duration_label_en}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="mt-4 space-y-2.5 border-t border-border/70 pt-4 text-sm text-muted-foreground">
                    {planFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00685d] dark:text-[#79c6b8] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
            )
          })}
        </fieldset>

        {/* CTA Button */}
        <div className="w-full mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={planLoadFailed ? retryPlans : handleSubscribe}
            disabled={submitting || loadingPlans || (!selectedPlan && !planLoadFailed)}
            className="w-full sm:w-auto min-h-11 px-7 py-3 rounded-xl bg-[#00685d] hover:bg-[#00564d] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {planLoadFailed ? (
              lang === "gu" ? "ફરી પ્રયાસ કરો" : "Retry loading plans"
            ) : !selectedPlan ? (
              loadingPlans ? (lang === "gu" ? "લોડ થઈ રહ્યું છે…" : "Loading plans…") : (lang === "gu" ? "યોજના ઉપલબ્ધ નથી" : "No plans available")
            ) : submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{lang === "gu" ? "પ્રક્રિયા ચાલુ છે..." : "Processing..."}</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>
                  {lang === "gu"
                    ? `₹${Math.round(selectedPlan.price)} માં અનલોક કરો`
                    : `Unlock for ₹${Math.round(selectedPlan.price)}`}
                </span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>

          {!isAuthenticated && (
            <Link
              href={`/login?redirect=${encodeURIComponent(pathname || "/")}`}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white underline underline-offset-4"
            >
              {lang === "gu" ? "પહેલેથી સભ્ય છો? લૉગિન કરો" : "Already a member? Sign In"}
            </Link>
          )}
        </div>

        {/* Trust Badges */}
        <div className="mt-5 pt-4 w-full border-t border-border/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="h-4 w-4 text-[#00685d] dark:text-[#79c6b8]" />
            <span>{lang === "gu" ? "સુરક્ષિત Razorpay ચુકવણી" : "Secured by Razorpay"}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="h-4 w-4 text-[#94700b] dark:text-[#fdc72d]" />
            <span>{lang === "gu" ? "ત્વરિત ઍક્સેસ" : "Instant Activation"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
