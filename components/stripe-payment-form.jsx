"use client"

import * as React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Loader2, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"

const stripePromises = new Map()

/** One Stripe.js instance per publishable key. */
function getStripe(publishableKey) {
  if (!stripePromises.has(publishableKey)) stripePromises.set(publishableKey, loadStripe(publishableKey))
  return stripePromises.get(publishableKey)
}

function PaymentForm({ amountLabel, lang, onPaid }) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements || submitting) return

    setSubmitting(true)
    setError("")

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      // Cards finish in place; redirect-based methods come back to the cart page.
      redirect: "if_required",
      confirmParams: { return_url: `${window.location.origin}/myshop/cart` },
    })

    if (confirmError) {
      setError(confirmError.message || (lang === "gu" ? "ચુકવણી નિષ્ફળ રહી." : "Payment failed."))
      setSubmitting(false)
      return
    }

    // The order is marked paid by Stripe's signed webhook; `processing` is also a normal outcome.
    onPaid(paymentIntent?.status)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      <PaymentElement />
      {error && <p className="text-xs font-semibold text-red-600 dark:text-red-400">{error}</p>}
      <Button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full bg-[#00685d] hover:bg-[#005048] text-white font-bold text-sm rounded-xl h-11"
      >
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Lock className="h-4 w-4 mr-1.5" />
            {lang === "gu" ? `ચુકવણી કરો ${amountLabel}` : `Pay ${amountLabel}`}
          </>
        )}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        {lang === "gu" ? "Stripe દ્વારા સુરક્ષિત ચુકવણી" : "Secure payment powered by Stripe"}
      </p>
    </form>
  )
}

export function StripePaymentForm({ clientSecret, publishableKey, amountLabel, lang, onPaid }) {
  return (
    <Elements stripe={getStripe(publishableKey)} options={{ clientSecret, appearance: { theme: "stripe" } }}>
      <PaymentForm amountLabel={amountLabel} lang={lang} onPaid={onPaid} />
    </Elements>
  )
}
