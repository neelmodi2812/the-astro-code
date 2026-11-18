"use client"

import * as React from "react"
import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { getSiteShell } from "@/lib/config/site"
import { useLanguage } from "@/components/language-provider"

/**
 * Global Page Loading State (app/loading.js)
 * Clean, perfectly centered Next.js App Router circular loading indicator with unified AstroHeader and AstroFooter.
 */
export default function Loading() {
  const { lang, setLang } = useLanguage()
  const siteData = React.useMemo(() => getSiteShell(lang), [lang])

  const handleToggleLang = (newLang) => {
    setLang(newLang)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      <React.Suspense fallback={<div className="h-16 w-full bg-[#fdc72d]" />}>
        <AstroHeader
          config={siteData.config}
          topBar={siteData.topBar}
          navLinks={siteData.navLinks}
          activeCategory=""
          lang={lang}
          onToggleLang={handleToggleLang}
          cartCount={0}
        />
      </React.Suspense>

      <main
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className="flex-1 flex flex-col items-center justify-center py-24 px-4 min-h-[50vh] select-none"
      >
        <div className="flex flex-col items-center justify-center space-y-5">
          {/* Sleek Golden SVG Circle Animator */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <svg
              className="w-full h-full animate-spin"
              viewBox="0 0 50 50"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="goldenCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d9a100" />
                  <stop offset="60%" stopColor="#fdc72d" />
                  <stop offset="100%" stopColor="#ffe58f" />
                </linearGradient>
              </defs>

              {/* Muted Track Circle */}
              <circle
                className="stroke-muted dark:stroke-white/10"
                cx="25"
                cy="25"
                r="20"
                strokeWidth="3.2"
              />

              {/* Smooth Animated Golden Arc */}
              <circle
                cx="25"
                cy="25"
                r="20"
                stroke="url(#goldenCircleGrad)"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeDasharray="92"
                strokeDashoffset="62"
              />
            </svg>

            {/* Subtle Center Golden Dot */}
            <div className="absolute w-2 h-2 rounded-full bg-[#fdc72d] shadow-[0_0_8px_#fdc72d] animate-pulse" />
          </div>

          {/* ONLY "LOADING" Text */}
          <div className="text-xs sm:text-sm font-semibold tracking-[0.32em] text-muted-foreground uppercase flex items-center justify-center">
            <span>LOADING</span>
            <span className="text-[#8a6800] dark:text-[#fdc72d] font-bold animate-pulse ml-0.5">...</span>
          </div>
        </div>

        <span className="sr-only">Loading...</span>
      </main>

      <AstroFooter config={siteData.config} />
    </div>
  )
}
