"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Hash, Loader2, Sparkles } from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { astrologyService } from "@/lib/api"

export default function NumerologyClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const isEn = lang === "en"
  const siteData = useHomeData(lang)

  const [birthDate, setBirthDate] = React.useState("")
  const [result, setResult] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await astrologyService.numerology({ birthDate }, lang)
      setResult(res)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const rows = result
    ? [
        { label: isEn ? "Ruling planet" : "શાસક ગ્રહ", value: result.ruling_planet },
        { label: isEn ? "Lucky colour" : "શુભ રંગ", value: result.lucky_color },
        { label: isEn ? "Lucky day" : "શુભ દિવસ", value: result.lucky_day },
      ]
    : []

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#0b322d] text-[#0e3934] dark:text-[#f4f3ee] flex flex-col">
      <AstroHeader
        config={siteData.config}
        topBar={siteData.topBar}
        navLinks={siteData.navLinks}
        activeCategory="categories"
        onSelectCategory={(id) => {
          if (id === "home") router.push("/")
          else if (id === "about-us" || id === "about") router.push("/about-us")
          else if (id === "dainik-panchang" || id === "panchang") router.push("/dainik-panchang")
          else router.push("/categories")
        }}
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
      />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="text-center space-y-2">
          <Hash className="h-8 w-8 mx-auto text-[#8a6800] dark:text-[#fdc72d]" />
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {isEn ? "Numerology Calculator" : "અંકશાસ્ત્ર કેલ્ક્યુલેટર"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEn
              ? "Enter your date of birth to find your Moolank (birth number)."
              : "તમારી જન્મ તારીખ દાખલ કરી તમારો મૂલાંક જાણો."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card dark:bg-[#0d3631] rounded-2xl p-5 border border-border/70 shadow-sm flex flex-col sm:flex-row gap-3">
          <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required max={new Date().toISOString().slice(0, 10)} className="h-10 text-sm" />
          <Button type="submit" disabled={isLoading} className="h-10 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-xs gap-1.5">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            <span>{isEn ? "Find my number" : "મારો મૂલાંક જાણો"}</span>
          </Button>
        </form>

        {result && (
          <div className="bg-card dark:bg-[#0d3631] rounded-2xl p-6 border border-border/70 shadow-sm space-y-5">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{isEn ? "Your Moolank" : "તમારો મૂલાંક"}</p>
              <p className="text-6xl font-black text-[#8a6800] dark:text-[#fdc72d]">{result.moolank}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {rows.map((row) => (
                <div key={row.label} className="p-3 bg-muted/40 dark:bg-[#0f3c36] rounded-xl border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground block">{row.label}</span>
                  <strong className="text-sm text-foreground">{row.value}</strong>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{result.guidance}</p>
          </div>
        )}
      </main>

      <AstroFooter config={siteData.config} footer={siteData.footer} />
    </div>
  )
}
