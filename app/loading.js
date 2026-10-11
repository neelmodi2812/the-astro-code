import * as React from "react"

/**
 * Global Page Loading State (app/loading.js)
 * Clean, perfectly centered Next.js App Router circular loading indicator.
 * Features an ultra-smooth golden gradient circular arc spinner and exclusively "LOADING..." text.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground select-none"
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
    </div>
  )
}
