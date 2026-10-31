"use client"

import * as React from "react"
import { MessageSquare, CheckCircle2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { contactService } from "@/lib/api"
import { useLanguage } from "@/components/language-provider"

export function DevotionalCTA({ newsletter = {} }) {
  const [phone, setPhone] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const { lang } = useLanguage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const number = phone.trim()
    if (!number) return

    try {
      await contactService.subscribeNewsletter(number.startsWith("+") ? number : `+91${number.replace(/\D/g, "")}`, {
        type: "whatsapp",
        lang,
      })
    } catch (error) {
      toast.error(error.message)
      return
    }

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setPhone("")
    }, 4000)
  }

  return (
    <section className="w-full bg-[#1b1c1a] dark:bg-[#121310] border-t-4 border-[#fdc72d] text-white py-12 mt-12 shadow-inner transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#fdc72d] text-[#0e3934] flex items-center justify-center shrink-0 shadow-md">
            <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <div className="min-w-0">
            <div className="text-sm uppercase tracking-wider text-[#fdc72d] font-bold">
              {newsletter.tag || "દૈનિક સુવિચાર & રાશિફળ"}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold leading-snug text-white mt-1 text-balance">
              {newsletter.title || "મેળવો દૈનિક રાશિફળ અને શુભ મુહૂર્ત તમારા WhatsApp પર"}
            </h3>
            <p className="text-sm sm:text-base text-white/85 mt-2 max-w-xl">
              {newsletter.subtitle || "દરરોજ સવારે ૭:૦૦ વાગ્યે પંચાંગ, આજનું ચોઘડિયું અને ભવિષ્યફળ વિનામૂલ્યે મેળવો."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 shrink-0">
          {submitted ? (
            <Alert className="bg-emerald-700/80 text-white border-emerald-500/40 animate-in fade-in py-2.5 px-4 w-auto">
              <CheckCircle2 className="h-4 w-4 text-[#fdc72d]" />
              <AlertTitle className="text-sm font-bold text-white">
                {newsletter.successTitle || "સફળ સબ્સ્ક્રિપ્શન!"}
              </AlertTitle>
              <AlertDescription className="text-xs text-white/90">
                {newsletter.successMessage || "આપનો નંબર સફળતાપૂર્વક નોંધાઈ ગયો છે!"}
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="relative w-full sm:w-80">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0e3934]/70 dark:text-white/60 text-sm font-bold select-none leading-none">
                  {newsletter.phonePrefix || "+૯૧"}
                </span>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={newsletter.placeholder || "મોબાઇલ નંબર દાખલ કરો..."}
                  className="w-full h-11 pl-14 pr-4 bg-white dark:bg-[#20221c] text-[#0e3934] dark:text-white text-base rounded-xl border-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto h-11 px-6 rounded-xl text-base bg-[#fdc72d] text-[#0e3934] font-bold hover:bg-[#eab318] transition-colors shadow-sm cursor-pointer"
              >
                <Send className="h-4 w-4 mr-1.5" />
                <span>{newsletter.button || "જોડાવો (Free)"}</span>
              </Button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
