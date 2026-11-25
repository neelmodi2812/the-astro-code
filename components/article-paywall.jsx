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
  const [submitting, setSubmitting] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  React.useEffect(() => {
    let cancelled = false
    subscriptionService
      .plans()
      .then((res) => {
        if (!cancelled && Array.isArray(res?.data)) {
          setPlans(res.data)
          const popular = res.data.find((p) => p.is_popular) || res.data[0]
          if (popular?.id) {
            setSelectedPlanId(popular.id)
          }
        }
      })
      .catch(() => {
        if (!cancelled) setErrorMessage(lang === "gu" ? "યોજનાઓ લોડ થઈ શકી નથી." : "Unable to load plans.")
      })
      .finally(() => {
        if (!cancelled) setLoadingPlans(false)
      })

    loadRazorpayScript()

    return () => {
      cancelled = true
    }
  }, [lang])

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
    <div className="relative my-8 rounded-3xl border-2 border-[#e6c875]/70 bg-gradient-to-b from-[#fffdfa] via-[#fffbf2] to-[#fbf6e8] dark:from-[#082b27] dark:via-[#0a312d] dark:to-[#051e1b] p-6 sm:p-10 shadow-xl overflow-hidden">
      {/* Decorative Top Accent Glow */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-emerald-600 to-amber-400" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Emblem Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-bold mb-4 shadow-xs">
          <Crown className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-pulse" />
          <span>
            {lang === "gu"
              ? "પ્રીમિયમ વૈદિક વિજ્ઞાન સદસ્યતા"
              : "Premium Vedic Wisdom Pass"}
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0e3934] dark:text-[#f8f7f4] tracking-tight leading-snug">
          {lang === "gu"
            ? "આગળનો સંપૂર્ણ લેખ વાંચવા માટે સદસ્ય બનો"
            : "Subscribe to Unlock the Complete Sacred Article"}
        </h3>

        {/* Subtitle */}
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
          {lang === "gu"
            ? "મહાન શક્તિપીઠો, જ્યોતિષ રહસ્યો, સિદ્ધ મુહૂર્ત અને પ્રાચીન મંત્રોનું અમર્યાદિત ગહન વાચન મેળવવા માટે આજે જ સભ્યપદ પસંદ કરો."
            : "Gain unlimited access to deep Vedic wisdom, celestial muhurats, secret rituals, and ad-free spiritual knowledge."}
        </p>

        {/* Error message */}
        {errorMessage && (
          <div className="w-full mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs sm:text-sm font-medium">
            {errorMessage}
          </div>
        )}

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-6 text-left">
          {plans.map((plan) => {
            const isSelected = plan.id === selectedPlanId
            const isPopular = plan.is_popular
            const planFeatures =
              lang === "gu"
                ? plan.features_gu || plan.features || []
                : plan.features_en || plan.features || []

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative flex flex-col justify-between p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2 ${
                  isSelected
                    ? "border-emerald-600 bg-white dark:bg-[#0b332f] shadow-lg shadow-emerald-900/10 ring-2 ring-emerald-600/20"
                    : "border-border/80 bg-white/70 dark:bg-[#0b332f]/60 hover:border-amber-400 hover:bg-white dark:hover:bg-[#0b332f]"
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3 right-4 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 text-[11px] font-black uppercase tracking-wider shadow-sm">
                    <Flame className="h-3 w-3 fill-slate-900" />
                    <span>{lang === "gu" ? "લોકપ્રિય" : "Best Value"}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-base sm:text-lg text-[#0e3934] dark:text-white">
                      {lang === "gu" ? plan.name_gu : plan.name_en}
                    </h4>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-[#00685d] dark:text-[#52c7bb]">
                      ₹{Math.round(plan.price)}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      / {lang === "gu" ? plan.duration_label_gu : plan.duration_label_en}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-foreground/85">
                    {planFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="w-full mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={handleSubscribe}
            disabled={submitting || !selectedPlan}
            className="w-full sm:w-auto px-8 py-6 rounded-xl bg-gradient-to-r from-[#00685d] to-[#004f46] hover:from-[#005a50] hover:to-[#00423a] text-white font-bold text-base shadow-lg shadow-[#00685d]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {!selectedPlan ? (
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
        <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>{lang === "gu" ? "સુરક્ષિત Razorpay ચુકવણી" : "Secured by Razorpay"}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>{lang === "gu" ? "ત્વરિત ઍક્સેસ" : "Instant Activation"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
