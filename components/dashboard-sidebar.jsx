"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { toast } from "sonner"
import {
  LayoutDashboard,
  BookOpen,
  Package,
  Video,
  Settings,
  Phone,
  MessageCircle,
  Sparkles,
  RotateCcw,
  Check
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { useDashboardContext } from "@/components/dashboard-gate"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { lang } = useLanguage()
  const data = useDashboardContext()
  const isEn = lang === "en"

  // Japa Bead Counter State
  const [japaCount, setJapaCount] = React.useState(data.japaCounter.initialCount)
  const maxJapa = data.japaCounter.totalTarget
  const circumference = 264
  const japaOffset = circumference - (japaCount / maxJapa) * circumference

  const handleJapaIncrement = () => {
    if (japaCount >= maxJapa) {
      setJapaCount(1)
      toast.info(
        isEn
          ? "Started a new 108 Japa Mala cycle! Har Har Mahadev."
          : "નવી ૧૦૮ જાપ માળા શરૂ થઈ! હર હર મહાદેવ."
      )
    } else {
      const next = japaCount + 1
      setJapaCount(next)
      if (next === maxJapa) {
        toast.success(
          isEn
            ? "Congratulations! You completed 108 Gayatri Mantra Japas."
            : "અભિનંદન! તમારો ૧૦૮ ગાયત્રી મંત્ર જાપ સંકલ્પ પૂર્ણ થયો."
        )
      }
    }
  }

  const handleJapaReset = () => {
    setJapaCount(0)
    toast.info(isEn ? "Japa counter reset." : "જાપ કાઉન્ટર રીસેટ કરવામાં આવ્યું.")
  }

  const navItems = [
    {
      id: "overview",
      label: { gu: "ડેશબોર્ડ (Overview)", en: "Dashboard Overview" },
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true
    },
    {
      id: "kundli",
      label: { gu: "કુંડળી વોલ્ટ (My Kundli)", en: "My Kundli Vault" },
      href: "/dashboard/kundli",
      badge: "૩",
      icon: BookOpen
    },
    {
      id: "orders",
      label: { gu: "મારા ઓર્ડર્સ (My Orders)", en: "My Orders & Tracking" },
      href: "/dashboard/orders",
      badge: { gu: "૧ સક્રિય", en: "1 Active" },
      icon: Package
    },
    {
      id: "consultations",
      label: { gu: "જ્યોતિષ પરામર્શ (Consultations)", en: "Consultations Vault" },
      href: "/dashboard/consultations",
      icon: Video,
      alert: true
    },
    {
      id: "settings",
      label: { gu: "પ્રોફાઇલ & સેટિંગ્સ (Settings)", en: "Profile & Settings" },
      href: "/dashboard/settings",
      icon: Settings
    }
  ]

  const checkIsActive = (item) => {
    if (item.exact) {
      return pathname === item.href
    }
    return pathname.startsWith(item.href)
  }

  return (
    <aside className="w-full flex flex-col gap-4">
      
      {/* 1. User Identity Snippet */}
      <div className="bg-card dark:bg-[#181914] rounded-2xl p-4 border border-border/70 shadow-2xs flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#fdc72d] to-[#d9a100] p-0.5 shadow-2xs flex items-center justify-center shrink-0">
          <div className="w-full h-full rounded-full bg-card dark:bg-[#181914] flex items-center justify-center text-[#8a6800] dark:text-[#fdc72d] font-bold text-base">
            {data.userProfile.initials[lang] || data.userProfile.initials.gu}
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00685d] text-white rounded-full flex items-center justify-center text-[8px] shadow">
            <Check className="h-2 w-2 stroke-[3]" />
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-xs sm:text-sm text-foreground truncate">
            {data.userProfile.name[lang] || data.userProfile.name.gu}
          </h3>
          <span className="text-[10px] font-bold text-[#8a6800] dark:text-[#fdc72d] block truncate">
            {data.userProfile.membershipBadge[lang] || data.userProfile.membershipBadge.gu}
          </span>
        </div>
      </div>

      {/* 2. Main Navigation Links (Desktop vertical & responsive on mobile) */}
      <nav className="bg-card dark:bg-[#181914] rounded-2xl p-2 border border-border/70 shadow-2xs flex flex-col gap-1">
        <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
          {isEn ? "Vedic Portal Navigation" : "ડેશબોર્ડ નેવિગેશન"}
        </div>
        {navItems.map((item) => {
          const isActive = checkIsActive(item)
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label[lang] || item.label.gu}</span>
              </span>

              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-[#1b1c1a] text-[#fdc72d]"
                      : "bg-muted dark:bg-[#252622] text-foreground"
                  }`}
                >
                  {typeof item.badge === "object" ? item.badge[lang] || item.badge.gu : item.badge}
                </span>
              )}

              {item.alert && (
                <span className="w-2 h-2 rounded-full bg-destructive animate-ping shrink-0" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* 3. Daily Japa Meditation Progress Widget */}
      <div className="bg-card dark:bg-[#181914] rounded-2xl p-4 border border-border/70 shadow-2xs flex flex-col items-center text-center space-y-2.5">
        <div className="flex items-center justify-between w-full text-xs font-bold">
          <span className="text-muted-foreground uppercase text-[10px]">
            {data.japaCounter.title[lang] || data.japaCounter.title.gu}
          </span>
          <span className="text-[#8a6800] dark:text-[#fdc72d] text-[11px]">
            {data.japaCounter.mantra[lang] || data.japaCounter.mantra.gu}
          </span>
        </div>

        <div className="relative w-20 h-20 flex items-center justify-center my-0.5">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-muted/40 dark:text-[#252622]"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeWidth="7"
            />
            <circle
              className="text-[#fdc72d] transition-all duration-300"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={japaOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            <span className="text-lg font-black text-foreground">
              {isEn ? japaCount : japaCount.toLocaleString("gu-IN")}
            </span>
            <span className="text-[8px] text-muted-foreground font-bold">
              / {isEn ? maxJapa : maxJapa.toLocaleString("gu-IN")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 w-full pt-1">
          <Button
            onClick={handleJapaIncrement}
            className="flex-1 h-7 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-[11px] rounded-lg shadow-2xs gap-1 cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            <span>{data.japaCounter.btnLabel[lang] || data.japaCounter.btnLabel.gu}</span>
          </Button>
          <Button
            onClick={handleJapaReset}
            variant="outline"
            size="icon"
            className="h-7 w-7 border-border text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
            title={data.japaCounter.resetLabel[lang] || data.japaCounter.resetLabel.gu}
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* 4. Astrologer Helpline Support */}
      <div className="bg-card dark:bg-[#181914] rounded-2xl p-4 border border-border/70 shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d]" />
          <span className="font-bold text-xs text-foreground">
            {data.helpline.title[lang] || data.helpline.title.gu}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-snug">
          {isEn ? "Direct WhatsApp support for all astrological questions:" : "કુંડળી સંબંધી સીધું માર્ગદર્શન:"}
        </p>
        <a
          href="https://wa.me/917940008108"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#00685d] hover:bg-[#005048] text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-2xs"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>{data.helpline.whatsappText[lang] || data.helpline.whatsappText.gu}</span>
        </a>
      </div>

    </aside>
  )
}
