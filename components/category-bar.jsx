"use client"

import * as React from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

// Sacred Golden Trishul (Trident) SVG Icon matching reference image
function SacredTrishulIcon({ className = "h-7 w-7" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central Sharp Spear */}
      <path d="M12 2L13.5 5.8V13H10.5V5.8L12 2Z" />
      {/* Left Crescent Prongs */}
      <path d="M10.5 12C9 11.2 6.8 9.2 6.2 5.5C5.8 8.8 7.5 13.2 10.5 14V12Z" />
      {/* Right Crescent Prongs */}
      <path d="M13.5 12C15 11.2 17.2 9.2 17.8 5.5C18.2 8.8 16.5 13.2 13.5 14V12Z" />
      {/* Bottom Joining Curved Base */}
      <path d="M5.5 8.5C5 12.5 8 16.2 12 16.5C16 16.2 19 12.5 18.5 8.5C17.6 13.8 14.8 15 12 15C9.2 15 6.4 13.8 5.5 8.5Z" />
      {/* Central Handle & Sacred Ring */}
      <path d="M11 15H13V22H11V15Z" />
      <circle cx="12" cy="18.5" r="1.5" />
    </svg>
  )
}

// Sacred Ornamental Lotus Divider Line matching reference image
function SacredLotusDecoration({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[#d9a100] ${className}`}>
      {/* Left Golden Line with Diamond Terminal */}
      <div className="flex items-center">
        <span className="w-1.5 h-1.5 rotate-45 bg-[#d9a100] shrink-0" />
        <span className="h-[1.5px] w-10 sm:w-16 md:w-24 bg-gradient-to-r from-[#d9a100] via-[#d9a100]/80 to-[#d9a100]/40" />
      </div>

      {/* Center Sacred Outline Lotus Flower */}
      <svg
        className="h-5 w-6 text-[#d9a100] shrink-0"
        viewBox="0 0 24 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Central Pointed Petal */}
        <path d="M12 2C10.5 5.5 10.2 9 12 13.5C13.8 9 13.5 5.5 12 2Z" />
        {/* Left Side Petal */}
        <path d="M12 13.5C9.2 11.5 6.2 8 6.8 4C8.6 6.5 10.5 10 12 13.5Z" />
        {/* Right Side Petal */}
        <path d="M12 13.5C14.5 11.5 17.5 8 16.9 4C15.1 6.5 13.2 10 12 13.5Z" />
        {/* Base Outward Leaves */}
        <path d="M12 14.5C8 14.5 4 12.8 2 10.5C4.2 13.5 8 15.5 12 15.5C16 15.5 19.8 13.5 22 10.5C20 12.8 16 14.5 12 14.5Z" />
      </svg>

      {/* Right Golden Line with Diamond Terminal */}
      <div className="flex items-center">
        <span className="h-[1.5px] w-10 sm:w-16 md:w-24 bg-gradient-to-l from-[#d9a100] via-[#d9a100]/80 to-[#d9a100]/40" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#d9a100] shrink-0" />
      </div>
    </div>
  )
}

export function CategoryBar({
  categories,
  activeFilter,
  onSelectFilter,
  title,
  showBreadcrumb = false
}) {
  const { lang } = useLanguage()
  const isEn = lang === "en"

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-2">
      <div className="flex flex-col gap-3 pb-3">
        {/* 1. Primary Heading with Golden Trishul & Lotus Divider Decoration */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="inline-flex items-center gap-2.5">
            <SacredTrishulIcon className="h-6 w-6 sm:h-7 sm:w-7 text-[#d9a100] shrink-0 drop-shadow-xs" />
            <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-[#0e3934] dark:text-[#f4f3ef] tracking-tight">
              {isEn ? "Featured Articles & Sacred Archives" : "મુખ્ય લેખો અને પવિત્ર દર્શન સંગ્રહ"}
            </h2>
          </div>
          
          {/* Ornamental Golden Divider with Sacred Lotus */}
          <SacredLotusDecoration className="hidden sm:inline-flex" />
        </div>

        {/* 2. Subtitle / Current Section Scope */}
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#0e3934]/90 dark:text-neutral-200 tracking-tight">
          {title}
        </h3>

        {/* 3. Category Filter Pills (Standalone Pill Badges matching user image) */}
        <div className="w-full pt-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* All option */}
            <Link
              href="/#all"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault()
                  onSelectFilter(null)
                }
              }}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                activeFilter === null
                  ? "bg-[#fdc72d] text-[#0e3934] ring-1 ring-[#e5ad12] shadow-xs"
                  : "bg-[#f3f1ea] dark:bg-[#0f3b35] hover:bg-[#eae6db] dark:hover:bg-[#11403a] text-neutral-800 dark:text-neutral-200"
              }`}
            >
              {isEn ? "All" : "બધા"}
            </Link>
            {categories.map((cat) => {
              const isSelected = activeFilter === cat.id
              return (
                <Link
                  key={cat.id}
                  href={`/categories`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault()
                      onSelectFilter(cat.id)
                    }
                  }}
                  className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d] ${
                    isSelected
                      ? "bg-[#fdc72d] text-[#0e3934] ring-1 ring-[#e5ad12] shadow-xs"
                      : "bg-[#f3f1ea] dark:bg-[#0f3b35] hover:bg-[#eae6db] dark:hover:bg-[#11403a] text-neutral-800 dark:text-neutral-200"
                  }`}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
