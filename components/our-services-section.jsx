"use client"

import * as React from "react"
import Link from "next/link"
import {
  FileText,
  HeartHandshake,
  Video,
  Flame,
  Compass,
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  Star,
  CheckCircle2,
  MessageCircle,
  Calendar,
  ChevronRight,
  Info,
  Check,
  Zap,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { getWhatsAppUrl } from "@/lib/config/contact"

// Icon mapping helper
const ICON_MAP = {
  FileText: FileText,
  HeartHandshake: HeartHandshake,
  Video: Video,
  Flame: Flame,
  Compass: Compass,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Award: Award,
  Clock: Clock,
  Star: Star
}

export function OurServicesSection({ servicesSection = {}, lang = "gu" }) {
  const [activeTab, setActiveTab] = React.useState("all")
  const [selectedService, setSelectedService] = React.useState(null)

  const items = servicesSection.items || []
  const trustBadges = servicesSection.trustBadges || []
  const filterTabs = servicesSection.filterTabs || [
    { id: "all", label: lang === "gu" ? "બધી સેવાઓ" : "All Services" },
    { id: "kundali", label: lang === "gu" ? "કુંડળી & ભવિષ્ય" : "Kundali & Destiny" },
    { id: "consultation", label: lang === "gu" ? "વિડિયો પરામર્શ" : "Video Consultation" },
    { id: "vastu", label: lang === "gu" ? "વાસ્તુ & અંકશાસ્ત્ર" : "Vastu & Numerology" }
  ]

  const filteredItems = React.useMemo(() => {
    if (activeTab === "all") return items
    return items.filter((item) => item.category === activeTab)
  }, [items, activeTab])

  return (
    <section id="our-services" className="w-full py-12 sm:py-16">
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Sacred Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-[#008376]/30 dark:border-[#008376]/50 shadow-2xs mb-3">
          <Sparkles className="h-4 w-4 text-[#008376] dark:text-[#38b2a3]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#00685d] dark:text-[#38b2a3]">
            {servicesSection.badge || (lang === "gu" ? "શાસ્ત્રોક્ત વૈદિક જ્યોતિષ સેવાઓ" : "AUTHENTIC VEDIC ASTROLOGY SERVICES")}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-foreground tracking-tight leading-tight text-balance">
          {servicesSection.heading || (lang === "gu" ? "અમારી વિશિષ્ટ જ્યોતિષ અને આધ્યાત્મિક સેવાઓ" : "Our Premier Astrological & Spiritual Services")}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          {servicesSection.subheading || (lang === "gu"
            ? "ડૉ. વિશાલ મોદી (Ph.D. ગોલ્ડ મેડાલિસ્ટ) અને વરિષ્ઠ વિદ્વાનો દ્વારા ૧૦૦% શાસ્ત્રોક્ત, ગોપનીય અને સચોટ વ્યક્તિગત માર્ગદર્શન."
            : "100% scriptural, highly accurate, and confidential personalized guidance by Dr. Vishal Modi (Ph.D. Gold Medalist) and senior Vedic scholars.")}
        </p>

        {/* Trust Highlights Strip */}
        {trustBadges.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-7">
            {trustBadges.map((badge) => {
              const BadgeIcon = ICON_MAP[badge.icon] || Award
              return (
                <div
                  key={badge.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card dark:bg-[#0d3833] border border-border/80 shadow-2xs text-xs font-semibold text-foreground/90"
                >
                  <BadgeIcon className="h-3.5 w-3.5 text-[#008376] dark:text-[#fdc72d]" />
                  <span>{badge.label}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 2. FILTER TABS */}
      <div className="flex items-center justify-center mt-8 sm:mt-10 px-4">
        <div className="inline-flex p-1 rounded-xl bg-muted/70 dark:bg-muted/40 border border-border/60 max-w-full overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#008376] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. 6-CARD SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch">
        {filteredItems.map((service) => {
          const ServiceIcon = ICON_MAP[service.icon] || FileText
          const isEmerald = service.badgeColor === "emerald"
          const waUrl = getWhatsAppUrl(service.whatsappText)

          return (
            <article
              key={service.id}
              className="group relative rounded-2xl border border-border/80 dark:border-white/10 bg-card dark:bg-[#0d3631] p-6 sm:p-7 hover:border-[#008376]/60 dark:hover:border-[#fdc72d]/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
            >
              {/* Subtle top decorative gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00685d] via-[#008376] to-[#fdc72d] opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Card Top Section */}
              <div className="flex-1 mb-6">
                {/* Header Row: Icon + Badge */}
                <div className="flex flex-col items-start gap-3 mb-4">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xs ${
                      isEmerald
                        ? "bg-[#008376]/10 text-[#008376] dark:bg-[#008376]/20 dark:text-[#38b2a3]"
                        : "bg-[#fdc72d]/15 text-[#b28200] dark:bg-[#fdc72d]/25 dark:text-[#fdc72d]"
                    }`}
                  >
                    <ServiceIcon className="h-6 w-6" />
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border shadow-2xs leading-snug ${
                      isEmerald
                        ? "bg-emerald-50 text-[#00685d] border-emerald-200 dark:bg-emerald-950/60 dark:text-[#38b2a3] dark:border-emerald-800"
                        : "bg-amber-50 text-[#966600] border-amber-200 dark:bg-amber-950/60 dark:text-[#fdc72d] dark:border-amber-800"
                    }`}
                  >
                    {service.tagline}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-[#008376] dark:group-hover:text-[#fdc72d] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Highlights Checklist */}
                <div className="mt-5 space-y-2.5 border-t border-border/60 pt-4">
                  {service.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#008376] dark:text-[#38b2a3] shrink-0 mt-0.5" />
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom Section */}
              <div className="mt-auto pt-4 border-t border-border/60 flex flex-col gap-3">
                {/* Action Buttons: WhatsApp Booking + View Details */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#008376] hover:bg-[#00685d] text-white text-sm font-bold transition-colors shadow-2xs text-center cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{lang === "gu" ? "પરામર્શ બુક કરો" : "Book Service"}</span>
                  </a>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg bg-background hover:bg-muted border border-border text-foreground text-sm font-bold transition-colors text-center cursor-pointer"
                  >
                    <Info className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span>{lang === "gu" ? "વિગતો જુઓ" : "Details"}</span>
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* 4. BOTTOM CONSULTATION ASSISTANCE CTA BANNER */}
      {servicesSection.bottomCta && (
        <div className="mt-10 sm:mt-12 rounded-2xl bg-gradient-to-r from-[#00685d] via-[#00544b] to-[#00423a] text-white p-6 sm:p-8 shadow-lg border border-[#fdc72d]/30 relative overflow-hidden">
          {/* Subtle decorative background aura */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#fdc72d]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fdc72d]/20 text-[#fdc72d] text-xs font-bold uppercase tracking-wider mb-2 border border-[#fdc72d]/40">
                <Zap className="h-3.5 w-3.5" />
                {servicesSection.bottomCta.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {servicesSection.bottomCta.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {servicesSection.bottomCta.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={getWhatsAppUrl(
                  lang === "gu"
                    ? "નમસ્તે ડૉ. વિશાલ મોદી, મને મારી કુંડળી મુજબ યોગ્ય જ્યોતિષીય સેવા પસંદ કરવા માટે નિઃશુલ્ક માર્ગદર્શન જોઈએ છે."
                    : "Hello Dr. Vishal Modi, I would like guidance on selecting the right astrological service for my situation."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#fdc72d] hover:bg-[#e5b225] text-[#0e3934] font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer font-sans"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{servicesSection.bottomCta.buttonText}</span>
              </a>

              <Link
                href="/dashboard/consultations"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/25 transition-all text-center"
              >
                <Calendar className="h-4 w-4" />
                <span>{servicesSection.bottomCta.portalButtonText}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 5. SERVICE DETAILS DIALOG MODAL */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="max-w-lg bg-card dark:bg-[#0d3631] border-2 border-[#008376]/30 dark:border-[#008376]/50">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#008376]/10 text-[#008376] dark:text-[#38b2a3]">
                    {selectedService.tagline}
                  </span>
                </div>
                <DialogTitle className="text-xl font-black text-foreground">
                  {selectedService.title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground pt-1 leading-relaxed">
                  {selectedService.shortDesc}
                </DialogDescription>
              </DialogHeader>

              {/* What is Included */}
              <div className="space-y-3 py-3 border-y border-border/70 my-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  {lang === "gu" ? "આ સેવામાં શું સમાવિષ્ટ છે:" : "What is Included:"}
                </h4>
                <div className="space-y-2">
                  {selectedService.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-foreground/90">
                      <Check className="h-3.5 w-3.5 text-[#008376] dark:text-[#38b2a3] shrink-0 mt-0.5 font-bold" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg p-3 bg-muted/60 text-xs flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">
                    {lang === "gu" ? "મુખ્ય વિદ્વાન / જ્યોતિષાચાર્ય:" : "Chief Scholar / Guide:"}
                  </span>
                  <span className="font-bold text-foreground">
                    {lang === "gu" ? "ડૉ. વિશાલ મોદી (Ph.D. ગોલ્ડ મેડાલિસ્ટ)" : "Dr. Vishal Modi (Ph.D. Gold Medalist)"}
                  </span>
                </div>
              </div>

              {/* Footer with Action */}
              <DialogFooter className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-[#008376] dark:text-[#38b2a3] shrink-0" />
                  <span className="font-medium">
                    {lang === "gu" ? "૧૦૦% શાસ્ત્રોક્ત અને ગોપનીય પરામર્શ" : "100% Scriptural & Confidential"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={getWhatsAppUrl(selectedService.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#008376] hover:bg-[#00685d] text-white text-xs font-bold transition-colors shadow-2xs"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{lang === "gu" ? "WhatsApp પર બુક કરો" : "Book on WhatsApp"}</span>
                  </a>

                  {selectedService.href && (
                    <Link
                      href={selectedService.href}
                      onClick={() => setSelectedService(null)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-xs font-bold transition-colors"
                    >
                      <span>{lang === "gu" ? "પોર્ટલ જુઓ" : "Open Portal"}</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
