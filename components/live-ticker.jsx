"use client"

import Link from "next/link"
import { Sparkles, Sunset, ArrowRight } from "lucide-react"

export function LiveTicker({ ticker }) {
  return (
    <section className="w-full bg-[#fcf9ee] dark:bg-[#1a1915] border-b border-[#fdc72d]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs">
        {/* Live Ticker Headline */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-hidden">
          <span className="inline-flex items-center gap-1.5 bg-[#fdc72d] text-[#1b1c1a] px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider shrink-0 shadow-xs border border-[#eab318]">
            <span className="w-2 h-2 rounded-full bg-[#bb171f] animate-ping" />
            {ticker.badge}
          </span>
          <div className="truncate text-foreground text-xs sm:text-sm font-semibold">
            {ticker.headline}
          </div>
        </div>

        {/* Live Ribbon Data */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-muted-foreground text-xs flex-wrap">
          <span className="hidden lg:inline-flex items-center gap-1 text-foreground font-bold">
            <Sparkles className="h-3.5 w-3.5 text-[#d9a100]" />
            <span>{ticker.currentChoghadiyaLabel || "હાલનું ચોઘડિયું:"}</span>{" "}
            <span className="bg-[#fdc72d] text-[#1b1c1a] px-1.5 py-0.5 rounded font-black ml-1 border border-[#eab318]">
              {ticker.currentChoghadiya}
            </span>
          </span>

          <span className="hidden sm:inline-block text-border">•</span>

          <span className="inline-flex items-center gap-1 text-foreground font-medium">
            <Sunset className="h-3.5 w-3.5 text-[#d9a100]" />
            <span>{ticker.sunsetLabel || "સૂર્યાસ્ત:"}</span> {ticker.sunset}
          </span>

          <Link
            href="/dainik-panchang"
            className="inline-flex items-center gap-1 text-[#8a6800] dark:text-[#fdc72d] font-bold hover:underline ml-1"
          >
            <span>{ticker.seePanchang || "આજનું પંચાંગ જુઓ"}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}
