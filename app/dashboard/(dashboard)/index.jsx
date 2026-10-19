"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Sparkles,
  Video,
  PlusCircle,
  Plus,
  Package,
  Calendar,
  Check,
  BookOpen,
  Truck,
  ShieldCheck
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { DASHBOARD_DATA } from "@/lib/data/dashboard-data"
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

export default function DashboardClient() {
  const router = useRouter()
  const { lang } = useLanguage()
  const data = DASHBOARD_DATA
  const isEn = lang === "en"

  // Quick Add Kundli Modal State
  const [addKundliOpen, setAddKundliOpen] = React.useState(false)
  const [newKundliName, setNewKundliName] = React.useState("")
  const [newKundliRelation, setNewKundliRelation] = React.useState("માતા (Mother)")
  const [newKundliCity, setNewKundliCity] = React.useState("અમદાવાદ (Ahmedabad)")

  const handleSaveKundli = (e) => {
    e.preventDefault()
    if (!newKundliName.trim()) {
      toast.error(isEn ? "Please enter full name." : "કૃપા કરીને પૂરું નામ લખો.")
      return
    }
    setAddKundliOpen(false)
    setNewKundliName("")
    toast.success(
      isEn
        ? `Kundli for ${newKundliName} added! View in Kundli Vault.`
        : `${newKundliName}ની કુંડળી વોલ્ટમાં ઉમેરાઈ ગઈ છે!`
    )
    router.push("/dashboard/kundli")
  }

  return (
    <DashboardShell breadcrumbKey="dashboard">
      <div className="space-y-5">
        
        {/* Welcome Executive Header */}
        <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                {isEn ? `Welcome, ${data.userProfile.name.en}` : `નમસ્તે, ${data.userProfile.name.gu}`}
              </h1>
              <Badge className="bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] border border-[#fdc72d]/40 text-[10px] font-bold">
                <Sparkles className="h-2.5 w-2.5 mr-1" />
                <span>{data.userProfile.membershipBadge[lang] || data.userProfile.membershipBadge.gu}</span>
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
              <span>{data.userProfile.birthDetails.rashi[lang] || data.userProfile.birthDetails.rashi.gu}</span>
              <span className="text-border">•</span>
              <span>{data.userProfile.birthDetails.nakshatra[lang] || data.userProfile.birthDetails.nakshatra.gu}</span>
              <span className="text-border">•</span>
              <span>{data.userProfile.birthDetails.city[lang] || data.userProfile.birthDetails.city.gu}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Button
              onClick={() => setAddKundliOpen(true)}
              variant="outline"
              size="sm"
              className="h-9 px-3.5 text-xs font-bold gap-1.5 border-border hover:bg-muted cursor-pointer shadow-2xs"
            >
              <PlusCircle className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{data.headerActions.addKundli[lang] || data.headerActions.addKundli.gu}</span>
            </Button>

            <Button
              onClick={() => router.push("/dashboard/consultations")}
              size="sm"
              className="h-9 px-4 text-xs font-bold gap-1.5 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] shadow-xs cursor-pointer"
            >
              <Video className="h-3.5 w-3.5" />
              <span>{data.headerActions.joinRoom[lang] || data.headerActions.joinRoom.gu}</span>
            </Button>
          </div>
        </div>

        {/* 4 Clean Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {data.metrics.map((m, idx) => (
            <div
              key={idx}
              onClick={() => router.push(m.href)}
              className="bg-card dark:bg-[#181914] rounded-xl p-4 border border-border/70 shadow-2xs hover:border-[#fdc72d]/60 hover:shadow-sm transition-all cursor-pointer relative flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                    {m.title[lang] || m.title.gu}
                  </span>
                  <div className="text-lg font-black text-foreground mt-1">
                    {m.value[lang] || m.value.gu}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-muted/60 dark:bg-[#20211d] text-[#8a6800] dark:text-[#fdc72d] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {m.icon === "history_edu" && <BookOpen className="h-4 w-4" />}
                  {m.icon === "local_shipping" && <Truck className="h-4 w-4" />}
                  {m.icon === "calendar_month" && <Calendar className="h-4 w-4" />}
                  {m.icon === "auto_awesome" && <Sparkles className="h-4 w-4" />}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <span className="truncate text-[11px]">{m.subtitle[lang] || m.subtitle.gu}</span>
                <span className="text-[11px] font-bold text-[#8a6800] dark:text-[#fdc72d] group-hover:underline">
                  {m.cta[lang] || m.cta.gu}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Clean Summary Widgets Grid (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* WIDGET 1: Daily Gochar Snapshot */}
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 border border-border/70 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#00685d] text-white text-[10px] font-bold">
                    {data.dailyTransit.badge[lang] || data.dailyTransit.badge.gu}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {data.dailyTransit.date[lang] || data.dailyTransit.date.gu}
                  </span>
                </div>
                <Link
                  href="/dainik-panchang"
                  className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline"
                >
                  {isEn ? "Panchang →" : "પંચાંગ →"}
                </Link>
              </div>

              <h3 className="font-bold text-sm text-foreground mt-3">
                {data.dailyTransit.heading[lang] || data.dailyTransit.heading.gu}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {data.dailyTransit.shortSummary[lang] || data.dailyTransit.shortSummary.gu}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/40">
              {data.dailyTransit.attributes.map((attr, idx) => (
                <div
                  key={idx}
                  className={`text-center ${idx !== 0 ? "border-l border-border/40 pl-2" : ""}`}
                >
                  <span className="text-[10px] text-muted-foreground block font-medium">
                    {attr.label[lang] || attr.label.gu}
                  </span>
                  <span className="text-xs font-bold text-foreground block mt-0.5">
                    {attr.value[lang] || attr.value.gu}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WIDGET 2: Upcoming Consultation Quick Card */}
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 border border-border/70 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                  <span className="font-bold text-xs text-foreground">
                    {isEn ? "Upcoming Live Session" : "આગામી વિડિયો પરામર્શ"}
                  </span>
                </div>
                <Badge className="bg-[#fdc72d]/15 text-[#8a6800] dark:text-[#fdc72d] border border-[#fdc72d]/30 text-[10px] font-bold">
                  {data.upcomingConsultation.countdown[lang] || data.upcomingConsultation.countdown.gu}
                </Badge>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="font-bold text-sm text-foreground">
                  {data.upcomingConsultation.astrologer[lang] || data.upcomingConsultation.astrologer.gu}
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  {data.upcomingConsultation.title[lang] || data.upcomingConsultation.title.gu}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span>
                    {data.upcomingConsultation.dateValue[lang] || data.upcomingConsultation.dateValue.gu} • {data.upcomingConsultation.timeValue[lang] || data.upcomingConsultation.timeValue.gu}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/40">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Google Meet HD</span>
              </span>
              <Button
                onClick={() => window.open(data.upcomingConsultation.meetUrl, "_blank")}
                size="sm"
                className="h-8 px-4 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs rounded-lg shadow-2xs gap-1.5 cursor-pointer"
              >
                <Video className="h-3 w-3" />
                <span>{isEn ? "Join Call" : "કૉલમાં જોડાઓ"}</span>
              </Button>
            </div>
          </div>

          {/* WIDGET 3: Active Order Status */}
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 border border-border/70 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                  <span className="font-bold text-xs text-foreground">
                    {isEn ? "Active Puja Order" : "સક્રિય પૂજા ઓર્ડર"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground font-mono">{data.activeOrder.orderNumber}</span>
                  <Badge className="bg-[#00685d]/10 text-[#00685d] dark:text-[#6ed8c8] border border-[#00685d]/20 text-[10px] font-bold">
                    {data.activeOrder.statusBadge[lang] || data.activeOrder.statusBadge.gu}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3 min-w-0">
                <img
                  src={data.activeOrder.imageUrl}
                  alt="Product"
                  className="w-12 h-12 rounded-lg object-cover shrink-0 border border-border/50"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-foreground truncate">
                    {data.activeOrder.productName[lang] || data.activeOrder.productName.gu}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {data.activeOrder.currentStage[lang] || data.activeOrder.currentStage.gu}
                  </p>
                </div>
              </div>

              {/* Clean 4-step progress bar */}
              <div className="grid grid-cols-4 gap-1.5 mt-3 pt-2">
                {data.activeOrder.steps.map((st, sIdx) => {
                  const isDone = st.status === "completed"
                  const isActive = st.status === "active"
                  return (
                    <div key={sIdx} className="space-y-1 text-center">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          isDone
                            ? "bg-[#00685d] dark:bg-[#6ed8c8]"
                            : isActive
                            ? "bg-[#fdc72d]"
                            : "bg-muted"
                        }`}
                      />
                      <span className={`text-[9px] block truncate font-medium ${
                        isActive ? "text-foreground font-bold" : "text-muted-foreground"
                      }`}>
                        {st.title[lang] || st.title.gu}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/40">
              <span className="text-xs font-bold text-foreground">
                {isEn ? data.activeOrder.priceEn : data.activeOrder.price}
              </span>
              <Link
                href="/dashboard/orders"
                className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline"
              >
                {isEn ? "Track Shipment →" : "ટ્રેક કરો →"}
              </Link>
            </div>
          </div>

          {/* WIDGET 4: Saved Kundlis Quick Summary */}
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 border border-border/70 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
                  <span className="font-bold text-xs text-foreground">
                    {isEn ? "Saved Family Charts" : "પરિવારની સાચવેલી કુંડળીઓ"}
                  </span>
                </div>
                <Link
                  href="/dashboard/kundli"
                  className="text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:underline"
                >
                  {isEn ? "Vault →" : "વોલ્ટ →"}
                </Link>
              </div>

              <div className="space-y-2 mt-3">
                {data.savedKundlis.list.map((k) => {
                  const personName = k.name[lang] || k.name.gu
                  const personInitial = personName ? personName.charAt(0) : "•"
                  return (
                    <Link
                      key={k.id}
                      href="/dashboard/kundli"
                      className="p-2 px-2.5 bg-muted/40 dark:bg-[#20211d] rounded-lg border border-border/40 hover:border-[#fdc72d]/60 transition-all flex items-center justify-between gap-2 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-card dark:bg-[#181914] text-[#8a6800] dark:text-[#fdc72d] font-bold text-[11px] flex items-center justify-center shrink-0 border border-border/50">
                          {personInitial}
                        </div>
                        <span className="font-semibold text-xs text-foreground truncate group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors">
                          {personName}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          ({k.relation[lang] || k.relation.gu})
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground shrink-0">
                        {k.rashiLagna[lang] || k.rashiLagna.gu}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                {data.savedKundlis.list.length} {isEn ? "Charts in Vault" : "કુંડળીઓ સંગ્રહિત"}
              </span>
              <Button
                onClick={() => setAddKundliOpen(true)}
                variant="ghost"
                size="sm"
                className="h-7 text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] hover:bg-[#fdc72d]/10 px-2 cursor-pointer"
              >
                <Plus className="h-3 w-3 mr-1" />
                <span>{isEn ? "Add Chart" : "કુંડળી ઉમેરો"}</span>
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Trust Guarantee */}
        <div className="bg-card dark:bg-[#181914] rounded-2xl p-4 border border-border/70 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-[#00685d] dark:text-[#6ed8c8]" />
            <span className="text-muted-foreground">
              {data.trustSecurity.title[lang] || data.trustSecurity.title.gu} — {data.trustSecurity.desc[lang] || data.trustSecurity.desc.gu}
            </span>
          </div>
          <div className="flex items-center gap-2 font-bold text-[11px] text-[#8a6800] dark:text-[#fdc72d]">
            <span>ISO 9001:2015</span>
            <span>•</span>
            <span>Surya Siddhanta Ephemeris</span>
          </div>
        </div>

      </div>

      {/* Quick Add Kundli Modal */}
      <Dialog open={addKundliOpen} onOpenChange={setAddKundliOpen}>
        <DialogContent className="sm:max-w-md bg-card dark:bg-[#181914] border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{isEn ? "Add New Family Member" : "નવી કુંડળી ઉમેરો"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {isEn ? "Enter birth information to save to your Kundli vault." : "વોલ્ટમાં સાચવવા માટે પરિવારના સભ્યની જન્મ વિગત દાખલ કરો."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveKundli} className="space-y-3 py-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isEn ? "Full Name" : "પૂરું નામ"} <span className="text-destructive">*</span>
              </label>
              <Input
                required
                value={newKundliName}
                onChange={(e) => setNewKundliName(e.target.value)}
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
                  value={newKundliRelation}
                  onChange={(e) => setNewKundliRelation(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium"
                >
                  <option value="માતા (Mother)">માતા (Mother)</option>
                  <option value="પિતા (Father)">પિતા (Father)</option>
                  <option value="ભાઈ (Brother)">ભાઈ (Brother)</option>
                  <option value="બહેન (Sister)">બહેન (Sister)</option>
                  <option value="સંતાન (Child)">સંતાન (Child)</option>
                  <option value="અન્ય (Other)">અન્ય (Other)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  {isEn ? "Birth City" : "જન્મ શહેર"}
                </label>
                <Input
                  value={newKundliCity}
                  onChange={(e) => setNewKundliCity(e.target.value)}
                  placeholder="અમદાવાદ"
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setAddKundliOpen(false)} className="h-8 text-xs">
                {isEn ? "Cancel" : "રદ કરો"}
              </Button>
              <Button type="submit" className="h-8 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs">
                {isEn ? "Save Kundli" : "કુંડળી સેવ કરો"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
