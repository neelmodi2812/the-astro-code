"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Calendar,
  MessageCircle,
  TrendingUp,
  ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function AstroSidebar({
  panchang,
  founder,
  consultation = {},
  store = {},
  products,
  popularSection = {},
  popular,
  social,
  onAddToCart,
  lang = "gu"
}) {
  const router = useRouter()
  return (
    <aside className="flex flex-col gap-6">
      {/* 1. STAY CONNECTED WIDGET */}
      <Card className="p-4 shadow-sm border-border/70 bg-card dark:bg-[#181916]">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xs font-black tracking-wider uppercase text-foreground shrink-0">
            {lang === "gu" ? "જોડાયેલા રહો • STAY CONNECTED" : "STAY CONNECTED"}
          </h3>
          <Separator className="flex-1 h-0.5 bg-[#fdc72d] rounded-full" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Facebook */}
          <div className="p-2.5 rounded-lg bg-muted/50 dark:bg-[#20211d] hover:bg-muted dark:hover:bg-[#262723] transition-colors cursor-pointer border border-border/40">
            <div className="text-[#1877F2] mb-1 flex justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <div className="text-sm font-bold text-foreground">3,233</div>
            <div className="text-[11px] text-muted-foreground">Fans</div>
          </div>

          {/* X / Twitter */}
          <div className="p-2.5 rounded-lg bg-muted/50 dark:bg-[#20211d] hover:bg-muted dark:hover:bg-[#262723] transition-colors cursor-pointer border border-border/40">
            <div className="text-foreground mb-1 flex justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="text-sm font-bold text-foreground">309</div>
            <div className="text-[11px] text-muted-foreground">Followers</div>
          </div>

          {/* YouTube */}
          <div className="p-2.5 rounded-lg bg-muted/50 dark:bg-[#20211d] hover:bg-muted dark:hover:bg-[#262723] transition-colors cursor-pointer border border-border/40">
            <div className="text-[#FF0000] mb-1 flex justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <div className="text-sm font-bold text-foreground">1.15K</div>
            <div className="text-[11px] text-muted-foreground">Subscribers</div>
          </div>
        </div>
      </Card>

      {/* 2. DAILY PANCHANG & CHOGHADIYA BOX */}
      <div id="panchang-section" className="bg-card dark:bg-[#181916] rounded-xl p-4 sm:p-5 shadow-sm border-t-4 border-[#fdc72d] border-r border-b border-l border-border/70">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] text-[#8a6800] dark:text-[#fdc72d] font-black uppercase tracking-wider">
            {panchang.widgetTitle || "દૈનિક પંચાંગ"}
          </span>
          <span className="text-[11px] bg-[#fdc72d] text-[#1b1c1a] px-2 py-0.5 rounded font-black shadow-xs">
            {panchang.muhurtaTag || "આજનું મુહૂર્ત"}
          </span>
        </div>

        <h4 className="text-sm font-bold text-foreground mb-3">
          {panchang.samvatTitle}
        </h4>

        {/* Decorative Celestial Astronomical Visual Wheel */}
        <div className="flex items-center justify-center py-2">
          <svg className="w-28 h-28" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="4" />
            <circle cx="60" cy="60" r="44" fill="none" stroke="#fdc72d" strokeWidth="3" strokeDasharray="14 4" />
            <circle cx="60" cy="60" r="32" className="fill-[#fcf9ee] dark:fill-[#242521]" />
            <text x="60" y="55" textAnchor="middle" className="fill-[#8a6800] dark:fill-[#fdc72d]" fontSize="10" fontWeight="bold">
              {panchang.choghadiyaStatus}
            </text>
            <text x="60" y="70" textAnchor="middle" className="fill-[#bb171f] dark:fill-[#ff7b7b]" fontSize="13" fontWeight="900">
              {panchang.activeMuhurta}
            </text>
            <circle cx="60" cy="6" r="4" fill="#fdc72d" />
            <circle cx="114" cy="60" r="4" fill="#008d7f" />
            <circle cx="60" cy="114" r="4" fill="#bb171f" />
            <circle cx="6" cy="60" r="4" fill="#8a6800" />
          </svg>
        </div>

        {/* Panchang Timings Table */}
        <div className="space-y-1.5 text-xs my-3 bg-muted/40 dark:bg-[#20211d] p-2.5 rounded-lg border border-border/40">
          {panchang.rows.map((row, idx) => (
            <div key={idx} className="flex justify-between items-center text-foreground">
              <span className="text-muted-foreground">{row.label}:</span>
              <span className={`font-bold ${row.isAlert ? "text-[#bb171f] dark:text-[#ff7b7b] font-extrabold" : row.isAuspicious ? "text-[#8a6800] dark:text-[#fdc72d]" : ""}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-[#fdc72d] text-[#1b1c1a] font-extrabold hover:bg-[#eab318] shadow-xs cursor-pointer h-9 text-xs"
          onClick={() => {
            router.push("/dainik-panchang")
          }}
        >
          <span>{panchang.buttonText || "સંપૂર્ણ કેલેન્ડર & ચોઘડિયા ખોલો"}</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>

      {/* 3. DR. VISHAL MODI CONSULTATION WIDGET */}
      <div className="bg-gradient-to-br from-[#1b1c1a] to-[#262824] text-white rounded-xl p-4 sm:p-5 shadow-md border border-[#fdc72d]/40">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="size-14 border-2 border-[#fdc72d] shadow-sm shrink-0">
            <AvatarImage
              src={founder.image}
              alt={founder.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-[#fdc72d] text-[#1b1c1a] font-bold text-sm">
              VM
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm sm:text-base font-bold text-white leading-tight">
              {founder.name}
            </div>
            <div className="text-[11px] text-[#fdc72d] font-semibold">
              {founder.title}
            </div>
          </div>
        </div>

        <p className="text-xs text-white/90 mb-4 leading-relaxed">
          {founder.description}
        </p>

        <div className="flex flex-col gap-2">
          <Button
            className="w-full bg-[#fdc72d] text-[#1b1c1a] font-black hover:bg-[#eab318] transition-colors shadow-xs cursor-pointer h-9 text-xs"
            onClick={() => {
              window.open(`https://wa.me/919825000000?text=${encodeURIComponent(lang === 'gu' ? 'જય શ્રી કૃષ્ણ, મને કુંડળી વિશ્લેષણ માટે અપોઇન્ટમેન્ટ જોઈએ છે.' : 'Hello Dr. Vishal Modi, I would like to book a horoscope analysis.')}`, "_blank")
            }}
          >
            <Calendar className="h-4 w-4 mr-1.5" />
            <span>{consultation.bookButton || "કુંડળી વિશ્લેષણ બુક કરો"}</span>
          </Button>

          <Button
            variant="outline"
            className="w-full bg-white/10 hover:bg-white/20 text-[#fdc72d] border-white/20 font-bold transition-colors cursor-pointer h-8 text-xs"
            onClick={() => {
              window.open(founder.whatsappUrl, "_blank")
            }}
          >
            <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
            <span>{consultation.whatsappButton || "WhatsApp પર વાતચીત કરો"}</span>
          </Button>
        </div>
      </div>

      {/* 4. READERS' CHOICE / MOST POPULAR WIDGET */}
      <Card className="p-4 shadow-sm border-border/70 bg-card dark:bg-[#181916]">
        <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-[#bb171f]" />
          {popularSection.title || "વાંચકોની પસંદ - MOST POPULAR"}
        </h4>

        <ol className="space-y-3 text-xs">
          {popular.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 group cursor-pointer">
              <span className="text-lg font-bold text-[#fdc72d] leading-none shrink-0 w-4">
                {item.rank}
              </span>
              <div className="leading-tight">
                <Link href="/article/feat-1" className="font-semibold text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors">
                  {item.title}
                </Link>
                <div className="text-muted-foreground text-[10px] mt-0.5">
                  {item.reads}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </aside>
  )
}
