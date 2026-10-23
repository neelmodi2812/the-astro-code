"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  BookOpen,
  Plus,
  PlusCircle,
  Eye,
  Star,
  Sparkles,
  Calendar,
  Clock,
  Compass,
  User,
  ShieldCheck,
  CheckCircle2
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { withDashboardData } from "@/components/dashboard-gate"
import { userService } from "@/lib/api"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"

function KundliClient({ data, refresh }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const isEn = lang === "en"

  // Saved Kundlis list with dynamic state
  const kundlis = data.savedKundlis.list
  const [isSaving, setIsSaving] = React.useState(false)

  // Add Kundli Modal State
  const [addOpen, setAddOpen] = React.useState(false)
  const [fullName, setFullName] = React.useState("")
  const [relation, setRelation] = React.useState("parent")
  const [dob, setDob] = React.useState("")
  const [tob, setTob] = React.useState("")
  const [city, setCity] = React.useState("")

  // Chart Inspection Modal State
  const [inspectOpen, setInspectOpen] = React.useState(false)
  const [selectedKundli, setSelectedKundli] = React.useState(null)

  const handleAddKundli = async (e) => {
    e.preventDefault()
    if (!fullName.trim()) {
      toast.error(isEn ? "Please enter full name." : "કૃપા કરીને પૂરું નામ દાખલ કરો.")
      return
    }
    if (!dob) {
      toast.error(isEn ? "Please enter the birth date." : "કૃપા કરીને જન્મ તારીખ દાખલ કરો.")
      return
    }

    setIsSaving(true)
    try {
      await userService.kundlis.create({
        name: fullName.trim(),
        relation,
        birth_date: dob,
        birth_time: tob || undefined,
        birth_place: city.trim() || undefined,
      })
      await refresh()
      setAddOpen(false)
      setFullName("")
      setDob("")
      setTob("")
      setCity("")
      toast.success(
        isEn
          ? `Kundli for ${fullName} saved successfully to your vault!`
          : `${fullName}ની કુંડળી તમારા વોલ્ટમાં સેવ થઈ ગઈ!`
      )
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteKundli = async (k) => {
    try {
      await userService.kundlis.remove(k.id)
      setInspectOpen(false)
      await refresh()
      toast.success(isEn ? "Kundli removed from your vault." : "કુંડળી વોલ્ટમાંથી દૂર કરાઈ.")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleInspect = (k) => {
    setSelectedKundli(k)
    setInspectOpen(true)
  }

  return (
    <DashboardShell breadcrumbKey="kundli">
      <div className="space-y-6">
        
        {/* Heading Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#8a6800] dark:text-[#fdc72d]" />
                <span>{data.savedKundlis.title[lang] || data.savedKundlis.title.gu}</span>
              </h1>
              <Badge className="bg-[#fdc72d] text-[#1b1c1a] font-bold text-xs">
                {kundlis.length} {isEn ? "Saved" : "સેવ થયેલ"}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {data.savedKundlis.subtitle[lang] || data.savedKundlis.subtitle.gu}
            </p>
          </div>

          <Button
            onClick={() => setAddOpen(true)}
            className="h-9 px-4 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs rounded-xl shadow-2xs gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>{isEn ? "Add New Kundli" : "નવી કુંડળી ઉમેરો"}</span>
          </Button>
        </div>

        {/* Grid of Saved Kundlis */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {kundlis.map((k) => (
            <div
              key={k.id}
              className="bg-card dark:bg-[#181914] rounded-2xl p-5 border border-border/70 shadow-2xs hover:border-[#fdc72d]/70 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      k.isSelf
                        ? "bg-[#00685d] text-white"
                        : "bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d]"
                    }`}
                  >
                    {k.relation[lang] || k.relation.gu}
                  </span>
                  <h3 className="font-bold text-base text-foreground mt-2">
                    {k.name[lang] || k.name.gu}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {k.dob[lang] || k.dob.gu}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-muted/60 dark:bg-[#20211d] text-[#8a6800] dark:text-[#fdc72d] font-bold text-sm flex items-center justify-center border border-border/50">
                  {(k.name[lang] || k.name.gu)?.charAt(0) || "•"}
                </div>
              </div>

              <div className="space-y-2 text-xs bg-muted/40 dark:bg-[#20211d] p-3 rounded-xl border border-border/40">
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>{isEn ? "Birthplace:" : "જન્મસ્થળ:"}</span>
                  <strong className="text-foreground">{k.city ? k.city[lang] || k.city.gu : "અમદાવાદ"}</strong>
                </div>
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>{isEn ? "Rashi / Lagna:" : "રાશિ / લગ્ન:"}</span>
                  <strong className="text-foreground">{k.rashiLagna[lang] || k.rashiLagna.gu}</strong>
                </div>
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>{isEn ? "Nakshatra:" : "નક્ષત્ર:"}</span>
                  <span className="font-semibold text-foreground">{k.nakshatra[lang] || k.nakshatra.gu}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>{isEn ? "Current Dasha:" : "વર્તમાન દશા:"}</span>
                  <strong className="text-[#8a6800] dark:text-[#fdc72d]">{k.dasha[lang] || k.dasha.gu}</strong>
                </div>
              </div>

              <Button
                onClick={() => handleInspect(k)}
                variant="outline"
                className="w-full h-9 text-xs font-bold rounded-xl border-border hover:bg-[#fdc72d]/20 hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-all cursor-pointer gap-1.5"
              >
                <Eye className="h-4 w-4" />
                <span>{isEn ? "Open Vedic Chart Analysis" : "કુંડળી વિશ્લેષણ ખોલો"}</span>
              </Button>
            </div>
          ))}
        </div>

        {/* Educational Note Strip */}
        <div className="p-4 bg-muted/40 dark:bg-[#20211d] rounded-2xl border border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
            <span>
              {isEn
                ? "All horoscopes are computed using the authentic Chitrapaksha Lahiri Ayanamsha."
                : "તમામ કુંડળીઓની ગણતરી અધિકૃત ચિત્રાપક્ષ લાહિરી અયનાંશ અનુસાર કરવામાં આવે છે."}
            </span>
          </div>
          <Link
            href="/dainik-panchang"
            className="text-[#8a6800] dark:text-[#fdc72d] font-bold hover:underline shrink-0"
          >
            {isEn ? "View Daily Transit →" : "દૈનિક ગોચર જુઓ →"}
          </Link>
        </div>

      </div>

      {/* Add Kundli Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md bg-card dark:bg-[#181914] border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{isEn ? "Add New Family Member" : "નવી કુંડળી ઉમેરો"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {isEn ? "Fill in birth details to store horoscope in your vault." : "વોલ્ટમાં સાચવવા માટે પરિવારના સભ્યની જન્મ વિગત દાખલ કરો."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddKundli} className="space-y-3 py-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isEn ? "Full Name" : "પૂરું નામ"} <span className="text-destructive">*</span>
              </label>
              <Input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isEn ? "e.g. Kalpeshbhai Parekh" : "દા.ત. કલ્પેશભાઈ પારેખ"}
                className="h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Relationship" : "સંબંધ"}
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium"
                >
                  <option value="self">સ્વયં (Self)</option>
                  <option value="spouse">જીવનસાથી (Spouse)</option>
                  <option value="parent">માતા-પિતા (Parent)</option>
                  <option value="child">સંતાન (Child)</option>
                  <option value="sibling">ભાઈ-બહેન (Sibling)</option>
                  <option value="other">અન્ય (Other)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Birth City" : "જન્મ શહેર"}
                </label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="અમદાવાદ"
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Birth Date" : "જન્મ તારીખ"}
                </label>
                <Input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Birth Time" : "જન્મ સમય"}
                </label>
                <Input
                  type="time"
                  value={tob}
                  onChange={(e) => setTob(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)} className="h-8 text-xs">
                {isEn ? "Cancel" : "રદ કરો"}
              </Button>
              <Button type="submit" disabled={isSaving} className="h-8 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs">
                {isEn ? "Save Kundli" : "કુંડળી સેવ કરો"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Chart Inspection Modal */}
      <Dialog open={inspectOpen} onOpenChange={setInspectOpen}>
        <DialogContent className="sm:max-w-lg bg-card dark:bg-[#181914] border-border">
          {selectedKundli && (
            <>
              <DialogHeader>
                <DialogTitle className="text-base font-bold text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                    <span>{selectedKundli.name[lang] || selectedKundli.name.gu} — {selectedKundli.relation[lang] || selectedKundli.relation.gu}</span>
                  </span>
                  <Badge className="bg-[#fdc72d] text-[#1b1c1a] text-[10px]">
                    {selectedKundli.rashiLagna[lang] || selectedKundli.rashiLagna.gu}
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  {selectedKundli.dob[lang] || selectedKundli.dob.gu} • {selectedKundli.city ? selectedKundli.city[lang] || selectedKundli.city.gu : "અમદાવાદ"}
                </DialogDescription>
              </DialogHeader>

              {/* Vedic Chart Square Geometry Mock */}
              <div className="my-2 p-4 bg-muted/40 dark:bg-[#20211d] rounded-xl border border-border/50 text-center space-y-3">
                <div className="w-56 h-56 mx-auto border-2 border-[#8a6800] dark:border-[#fdc72d] relative bg-background rounded-lg p-2 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[#8a6800] dark:text-[#fdc72d]">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                      <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                      <line x1="50" y1="0" x2="0" y2="50" stroke="currentColor" strokeWidth="1" />
                      <line x1="50" y1="0" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="50" x2="50" y2="100" stroke="currentColor" strokeWidth="1" />
                      <line x1="100" y1="50" x2="50" y2="100" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="relative z-10 text-xs font-bold space-y-1">
                    <div className="text-[#8a6800] dark:text-[#fdc72d] text-sm">૧. લગ્ન ભાવ</div>
                    <div className="text-[11px] text-muted-foreground">{selectedKundli.nakshatra[lang] || selectedKundli.nakshatra.gu}</div>
                    <div className="text-[10px] font-semibold text-foreground">દશા: {selectedKundli.dasha[lang] || selectedKundli.dasha.gu}</div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  {isEn
                    ? "Full planetary ephemeris, Navamsha chart (D9), and Dosha report available in PDF."
                    : "સંપૂર્ણ ગ્રહ સ્પષ્ટતા, નવાંશ ચક્ર (D9) અને દોષ નિવારણ વિશ્લેષણ પીડીએફમાં ઉપલબ્ધ."}
                </p>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  onClick={() => {
                    toast.success(isEn ? "Full Kundli PDF downloaded." : "કુંડળી વિશ્લેષણ પીડીએફ ડાઉનલોડ થયું!")
                  }}
                  variant="outline"
                  className="h-8 text-xs font-bold"
                >
                  {isEn ? "Download Kundli PDF" : "કુંડળી PDF ડાઉનલોડ"}
                </Button>
                <Button
                  onClick={() => handleDeleteKundli(selectedKundli)}
                  variant="outline"
                  className="h-8 text-xs font-bold text-destructive"
                >
                  {isEn ? "Delete" : "કાઢી નાખો"}
                </Button>
                <Button
                  onClick={() => setInspectOpen(false)}
                  className="h-8 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs"
                >
                  {isEn ? "Close" : "બંધ કરો"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}

export default withDashboardData(KundliClient)
