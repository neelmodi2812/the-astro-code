"use client"

import * as React from "react"

/**
 * Root Global Error Boundary (app/global-error.jsx)
 *
 * Catches unhandled errors that occur directly in the root layout or template.
 * Must define its own <html> and <body> tags per Next.js App Router specification.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error
 */
export default function GlobalError({ error, reset }) {
  React.useEffect(() => {
    console.error("The Astro Code - Critical Global Error:", error)
  }, [error])

  return (
    <html lang="gu">
      <body className="min-h-screen flex items-center justify-center bg-[#0d0f12] text-[#f5f6f8] font-sans antialiased p-4">
        <main
          role="alert"
          className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl border border-neutral-800 bg-[#16181d] shadow-2xl"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-[#fdc72d] border border-amber-500/20">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              ગંભીર સિસ્ટમ ભૂલ (System Error)
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              સિસ્ટમ લોડ કરવામાં અણધારી સમસ્યા આવી છે. કૃપા કરીને રીફ્રેશ કરો અથવા હોમ પેજ પર પાછા જાઓ.
            </p>
            {error?.digest && (
              <p className="text-xs font-mono text-neutral-500 bg-neutral-900/60 py-1 px-2 rounded inline-block">
                કોડ: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#fdc72d] hover:bg-[#e0b024] text-neutral-900 font-semibold transition-colors cursor-pointer"
            >
              પુનઃ પ્રયાસ કરો (Try Again)
            </button>
            <a
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium transition-colors inline-block"
            >
              મુખ્ય પૃષ્ઠ (Home)
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
