"use client"

import * as React from "react"
import { Loader2, Lock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { shopService } from "@/lib/api/services/shop"

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

export function RazorpayPaymentForm({
  razorpayOrderId,
  keyId,
  amount,
  currency = "INR",
  orderNumber,
  customerName = "",
  customerPhone = "",
  customerEmail = "",
  amountLabel,
  lang,
  onPaid,
}) {
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState("")
  const [scriptLoaded, setScriptLoaded] = React.useState(false)

  React.useEffect(() => {
    loadRazorpayScript().then((loaded) => setScriptLoaded(loaded))
  }, [])

  const handlePay = async () => {
    if (submitting) return
    setError("")

    const isLoaded = scriptLoaded || (await loadRazorpayScript())
    if (!isLoaded || !window.Razorpay) {
      setError(
        lang === "gu"
          ? "Razorpay લોડ થઈ શક્યું નથી. કૃપા કરીને થોડીવાર પછી પ્રયાસ કરો."
          : "Failed to load Razorpay SDK. Please check your connection."
      )
      return
    }

    setSubmitting(true)

    try {
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "The Astro Code",
        description: `Order ${orderNumber}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            await shopService.verifyPayment(orderNumber, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              customer_phone: customerPhone,
            })
            onPaid()
          } catch (err) {
            setError(
              err.message ||
                (lang === "gu" ? "ચુકવણી ચકાસણી નિષ્ફળ રહી." : "Payment verification failed.")
            )
            setSubmitting(false)
          }
        },
        prefill: {
          name: customerName,
          contact: customerPhone,
          email: customerEmail,
        },
        theme: {
          color: "#00685d",
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", function (response) {
        setError(
          response.error?.description ||
            (lang === "gu" ? "ચુકવણી નિષ્ફળ રહી." : "Payment failed.")
        )
        setSubmitting(false)
      })
      rzp.open()
    } catch (e) {
      setError(
        lang === "gu" ? "ચુકવણી વિન્ડો ખોલી શકાઈ નથી." : "Could not open payment window."
      )
      setSubmitting(false)
    }
  }

  // Auto trigger Razorpay popup once script is ready
  React.useEffect(() => {
    if (scriptLoaded && razorpayOrderId && keyId) {
      handlePay()
    }
  }, [scriptLoaded, razorpayOrderId, keyId])

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
        <p className="text-xs text-muted-foreground">
          {lang === "gu" ? "કુલ ચૂકવવાપાત્ર રકમ" : "Total Payable Amount"}
        </p>
        <p className="text-2xl font-bold text-[#00685d] dark:text-[#fdc72d] mt-1">
          {amountLabel}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>{lang === "gu" ? "UPI, કાર્ડ, નેટબેન્કિંગ સપોર્ટેડ" : "UPI, Cards, NetBanking Supported"}</span>
        </div>
      </div>

      {error && <p className="text-xs font-semibold text-red-600 dark:text-red-400 text-center">{error}</p>}

      <Button
        type="button"
        onClick={handlePay}
        disabled={submitting}
        className="w-full bg-[#00685d] hover:bg-[#005048] text-white font-bold text-sm rounded-xl h-11"
      >
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Lock className="h-4 w-4 mr-1.5" />
            {lang === "gu" ? `હમણાં ચૂકવો ${amountLabel}` : `Pay Now ${amountLabel}`}
          </>
        )}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        {lang === "gu" ? "Razorpay દ્વારા સુરક્ષિત ચુકવણી" : "Secure payment powered by Razorpay"}
      </p>
    </div>
  )
}
