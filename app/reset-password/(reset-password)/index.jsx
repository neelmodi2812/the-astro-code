"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Lock } from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { authService } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const COPY = {
  gu: {
    title: "નવો પાસવર્ડ સેટ કરો",
    subtitle: "તમારા એકાઉન્ટ માટે નવો સુરક્ષિત પાસવર્ડ દાખલ કરો.",
    password: "નવો પાસવર્ડ",
    confirm: "પાસવર્ડ ફરી દાખલ કરો",
    submit: "પાસવર્ડ રીસેટ કરો",
    invalidLink: "આ રીસેટ લિંક અમાન્ય છે. કૃપા કરીને ફરીથી વિનંતી કરો.",
    requestNew: "નવી રીસેટ લિંક મંગાવો",
    tooShort: "પાસવર્ડ ઓછામાં ઓછો ૬ અક્ષરનો હોવો જોઈએ.",
    mismatch: "પાસવર્ડ મેળ ખાતો નથી.",
    success: "પાસવર્ડ સફળતાપૂર્વક બદલાઈ ગયો છે. કૃપા કરીને લૉગિન કરો.",
  },
  en: {
    title: "Set a new password",
    subtitle: "Enter a new secure password for your account.",
    password: "New password",
    confirm: "Confirm password",
    submit: "Reset password",
    invalidLink: "This reset link is invalid. Please request a new one.",
    requestNew: "Request a new reset link",
    tooShort: "Password must be at least 6 characters.",
    mismatch: "Passwords do not match.",
    success: "Password changed successfully. Please sign in.",
  },
}

export default function ResetPasswordClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang, setLang } = useLanguage()
  const copy = COPY[lang] || COPY.gu
  const siteData = useHomeData(lang)

  const token = searchParams.get("token") || ""
  const email = searchParams.get("email") || ""
  const hasValidLink = Boolean(token && email)

  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      toast.error(copy.tooShort)
      return
    }
    if (password !== confirmPassword) {
      toast.error(copy.mismatch)
      return
    }

    setIsSubmitting(true)
    try {
      await authService.resetPassword(
        { token, email, password, passwordConfirmation: confirmPassword },
        lang
      )
      toast.success(copy.success)
      router.push("/login")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AstroHeader
        navLinks={siteData.navLinks}
        config={siteData.config}
        topBar={siteData.topBar}
        activeCategory="login"
        cartCount={0}
        onSelectCategory={(id) => {
          if (id === "home") router.push("/")
          else if (id === "about-us") router.push("/about-us")
          else if (id === "dainik-panchang") router.push("/dainik-panchang")
          else if (id === "categories") router.push("/categories")
          else if (id === "contact-us") router.push("/contact-us")
          else if (id === "shop" || id === "cart" || id === "myshop") router.push("/myshop")
        }}
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
      />

      <main className="flex-1 w-full bg-background pt-8 pb-16">
        <div className="w-full max-w-md mx-auto px-4">
          <Card className="p-6 space-y-5">
            <div className="space-y-1">
              <h1 className="text-xl font-extrabold">{copy.title}</h1>
              <p className="text-sm text-muted-foreground">{copy.subtitle}</p>
            </div>

            {hasValidLink ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs font-semibold text-muted-foreground break-all">{email}</p>

                <div className="space-y-1.5">
                  <label htmlFor="reset-password" className="block text-xs font-bold">{copy.password}</label>
                  <div className="flex items-center rounded-lg border border-border focus-within:ring-2 focus-within:ring-[#fdc72d]/60">
                    <Lock className="h-4 w-4 text-muted-foreground ml-3 shrink-0" />
                    <Input
                      id="reset-password"
                      type="password"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 border-0 shadow-none focus-visible:ring-0 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reset-confirm" className="block text-xs font-bold">{copy.confirm}</label>
                  <div className="flex items-center rounded-lg border border-border focus-within:ring-2 focus-within:ring-[#fdc72d]/60">
                    <Lock className="h-4 w-4 text-muted-foreground ml-3 shrink-0" />
                    <Input
                      id="reset-confirm"
                      type="password"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-10 border-0 shadow-none focus-visible:ring-0 text-sm"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {copy.submit}
                </Button>
              </form>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-destructive">{copy.invalidLink}</p>
                <Link href="/forgot-password" className="text-sm font-semibold underline">
                  {copy.requestNew}
                </Link>
              </div>
            )}
          </Card>
        </div>
      </main>

      <AstroFooter />
    </div>
  )
}
