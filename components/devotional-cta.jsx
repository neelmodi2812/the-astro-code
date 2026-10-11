"use client"

import * as React from "react"
import { MessageSquare, CheckCircle2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export function DevotionalCTA({ newsletter = {} }) {
  const [phone, setPhone] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!phone) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setPhone("")
    }, 4000)
  }

  return (
    <section className="w-full bg-[#1b1c1a] dark:bg-[#121310] border-t-4 border-[#fdc72d] text-white py-10 px-4 sm:px-6 mt-12 shadow-inner transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#fdc72d] text-[#1b1c1a] flex items-center justify-center shrink-0 shadow-md">
            <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#fdc72d] font-black">
              {newsletter.tag || "દૈનિક સુવિચાર & રાશિફળ"}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white mt-0.5">
              {newsletter.title || "મેળવો દૈનિક રાશિફળ અને શુભ મુહૂર્ત તમારા WhatsApp પર"}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              {newsletter.subtitle || "દરરોજ સવારે ૭:૦૦ વાગ્યે પંચાંગ, આજનું ચોઘડિયું અને ભવિષ્યફળ વિનામૂલ્યે મેળવો."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2 shrink-0">
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
              <div className="relative w-full sm:w-72">
                <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-bold select-none">
                  {newsletter.phonePrefix || "+૯૧"}
                </span>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={newsletter.placeholder || "મોબાઇલ નંબર દાખલ કરો..."}
                  className="w-full h-10 pl-12 pr-4 bg-white text-[#1b1c1a] text-sm rounded-lg border-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto h-10 px-6 bg-[#fdc72d] text-[#1b1c1a] font-black hover:bg-[#eab318] transition-colors shadow-sm cursor-pointer"
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
