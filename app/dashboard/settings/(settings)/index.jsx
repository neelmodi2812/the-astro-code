"use client"

import * as React from "react"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Settings, User, Compass, Check, Lock, Globe, Trash2, LogOut } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { withDashboardData } from "@/components/dashboard-gate"
import { authService, userService, tokenStore } from "@/lib/api"
import { clearDashboardCache } from "@/lib/api/hooks/use-dashboard-data"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function PasswordCard({ isEn }) {
  const [current, setCurrent] = React.useState("")
  const [next, setNext] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (next !== confirm) {
      toast.error(isEn ? "The new passwords do not match." : "નવા પાસવર્ડ મેળ ખાતા નથી.")
      return
    }

    setIsSaving(true)
    try {
      await userService.changePassword({ currentPassword: current, password: next, passwordConfirmation: confirm })
      setCurrent("")
      setNext("")
      setConfirm("")
      toast.success(isEn ? "Password changed successfully." : "પાસવર્ડ સફળતાપૂર્વક બદલાઈ ગયો.")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm space-y-4">
      <h2 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-2.5">
        <Lock className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
        <span>{isEn ? "Change Password" : "પાસવર્ડ બદલો"}</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">{isEn ? "Current password" : "હાલનો પાસવર્ડ"}</label>
          <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} required autoComplete="current-password" className="h-10 text-sm rounded-xl border-border/70" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">{isEn ? "New password" : "નવો પાસવર્ડ"}</label>
          <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} required minLength={6} autoComplete="new-password" className="h-10 text-sm rounded-xl border-border/70" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">{isEn ? "Confirm new password" : "નવો પાસવર્ડ ફરી લખો"}</label>
          <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={6} autoComplete="new-password" className="h-10 text-sm rounded-xl border-border/70" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} variant="outline" className="h-9 px-4 text-xs font-bold rounded-xl">
          {isEn ? "Update Password" : "પાસવર્ડ અપડેટ કરો"}
        </Button>
      </div>
    </form>
  )
}

function DeleteAccountCard({ isEn }) {
  const router = useRouter()
  const [password, setPassword] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async (e) => {
    e.preventDefault()

    const confirmed = window.confirm(
      isEn
        ? "Delete your account permanently? This cannot be undone."
        : "શું તમે ખાતું કાયમ માટે કાઢી નાખવા માંગો છો? આ પાછું ફેરવી શકાશે નહીં."
    )
    if (!confirmed) return

    setIsDeleting(true)
    try {
      await userService.deleteAccount(password)
      tokenStore.clear()
      clearDashboardCache()
      toast.success(isEn ? "Your account has been deleted." : "તમારું ખાતું કાઢી નાખવામાં આવ્યું છે.")
      router.replace("/")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <form onSubmit={handleDelete} className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-red-200 dark:border-red-900/50 shadow-sm space-y-4">
      <h2 className="text-sm sm:text-base font-bold text-red-600 flex items-center gap-2 border-b border-border/40 pb-2.5">
        <Trash2 className="h-4 w-4" />
        <span>{isEn ? "Delete Account" : "ખાતું કાઢી નાખો"}</span>
      </h2>

      <p className="text-xs text-muted-foreground">
        {isEn
          ? "This permanently removes your profile, saved Kundlis and addresses. Enter your password to confirm."
          : "આથી તમારી પ્રોફાઇલ, સાચવેલી કુંડળીઓ અને સરનામાં કાયમ માટે દૂર થશે. ખાતરી માટે પાસવર્ડ લખો."}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder={isEn ? "Your password" : "તમારો પાસવર્ડ"} className="h-10 text-sm sm:max-w-xs" />
        <Button type="submit" disabled={isDeleting} variant="destructive" className="h-10 text-xs font-bold">
          {isEn ? "Delete my account" : "મારું ખાતું કાઢી નાખો"}
        </Button>
      </div>
    </form>
  )
}

function SettingsClient({ data, refresh }) {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const isEn = lang === "en"

  // Editable Profile State
  const [name, setName] = React.useState(data.userProfile.name[lang] || data.userProfile.name.gu)
  const [email] = React.useState(data.userProfile.email)
  const [phone, setPhone] = React.useState(data.userProfile.phone.en === "—" ? "" : data.userProfile.phone.en)
  const [city, setCity] = React.useState(data.userProfile.city || "")
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await userService.updateProfile({ name: name.trim(), phone: phone.trim() || undefined, city: city.trim() || undefined })
      refresh()
      toast.success(
        isEn
          ? "Profile & settings saved successfully!"
          : "તમારી પ્રોફાઇલ અને સેટિંગ્સ સફળતાપૂર્વક સાચવાઈ ગઈ!"
      )
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
    } finally {
      clearDashboardCache()
      router.replace("/login")
    }
  }

  return (
    <DashboardShell breadcrumbKey="settings">
      <div className="space-y-6">
        
        {/* Page Heading & Sign Out Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
              <Settings className="h-6 w-6 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{data.breadcrumb.settings[lang] || data.breadcrumb.settings.gu}</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {isEn
                ? "Manage your personal profile, registered astrological details, and preferences."
                : "તમારી વ્યક્તિગત જન્મ વિગતો, ભાષા પસંદગી અને સુરક્ષા સેટિંગ્સનું સંચાલન."}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="h-9 px-4 text-xs font-bold gap-1.5 border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 rounded-xl cursor-pointer self-start sm:self-auto shrink-0 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{isEn ? "Sign Out" : "લૉગ આઉટ"}</span>
          </Button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Personal Profile Section */}
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-2.5">
              <User className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{isEn ? "Personal Account Details" : "વ્યક્તિગત ખાતાની વિગતો"}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Full Name" : "પૂરું નામ"}
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 text-sm rounded-xl border-border/70"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Email Address" : "ઈમેલ એડ્રેસ"}
                </label>
                <Input
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className="h-10 text-sm rounded-xl border-border/70"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Mobile Number" : "મોબાઇલ નંબર"}
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 text-sm rounded-xl border-border/70"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Birthplace / City" : "જન્મસ્થળ / શહેર"}
                </label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-10 text-sm rounded-xl border-border/70"
                />
              </div>
            </div>
          </div>

          {/* Astrological Chart Profile (Readonly Verified) */}
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-2.5">
              <Compass className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{isEn ? "Registered Vedic Astrological Chart" : "નોંધાયેલી વૈદિક જન્મકુંડળી વિગતો"}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-muted/40 dark:bg-[#20211d] rounded-xl border border-border/40">
                <span className="text-[10px] text-muted-foreground block">{isEn ? "Birth Date & Time" : "જન્મ તારીખ & સમય"}</span>
                <strong className="text-foreground">{data.userProfile.birthDetails.dateTime[lang] || data.userProfile.birthDetails.dateTime.gu}</strong>
              </div>

              <div className="p-3 bg-muted/40 dark:bg-[#20211d] rounded-xl border border-border/40">
                <span className="text-[10px] text-muted-foreground block">{isEn ? "Rashi (Moon Sign)" : "ચંદ્ર રાશિ"}</span>
                <strong className="text-foreground">{data.userProfile.birthDetails.rashi[lang] || data.userProfile.birthDetails.rashi.gu}</strong>
              </div>

              <div className="p-3 bg-muted/40 dark:bg-[#20211d] rounded-xl border border-border/40">
                <span className="text-[10px] text-muted-foreground block">{isEn ? "Lagna (Ascendant)" : "લગ્ન ભાવ"}</span>
                <strong className="text-foreground">{data.userProfile.birthDetails.lagna[lang] || data.userProfile.birthDetails.lagna.gu}</strong>
              </div>
            </div>
          </div>

          {/* Language & Security */}
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-2.5">
              <Globe className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{isEn ? "Preferences & Security" : "પસંદગી & સુરક્ષા"}</span>
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  {isEn ? "Preferred Language" : "પસંદગીની ભાષા"}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isEn ? "Switch between Gujarati and English." : "ગુજરાતી અને અંગ્રેજી વચ્ચે ફેરબદલ કરો."}
                </p>
              </div>

              <div className="inline-flex p-1 bg-muted/60 dark:bg-[#20211d] rounded-xl border border-border/50">
                <button
                  type="button"
                  onClick={() => setLang("gu")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${
                    lang === "gu" ? "bg-[#fdc72d] text-[#1b1c1a]" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ગુજરાતી
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${
                    lang === "en" ? "bg-[#fdc72d] text-[#1b1c1a]" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  English
                </button>
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="h-10 text-xs font-bold"
            >
              {isEn ? "Cancel" : "રદ કરો"}
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="h-10 px-6 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs rounded-xl shadow-2xs gap-1.5"
            >
              <Check className="h-4 w-4" />
              <span>{isEn ? "Save Changes" : "ફેરફારો સાચવો"}</span>
            </Button>
          </div>

        </form>

        <PasswordCard isEn={isEn} />
        <DeleteAccountCard isEn={isEn} />

      </div>
    </DashboardShell>
  )
}

export default withDashboardData(SettingsClient)
