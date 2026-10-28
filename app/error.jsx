"use client"

import * as React from "react"
import Link from "next/link"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Root Error Boundary (app/error.jsx)
 *
 * Automatically wraps page route segments in a React Error Boundary.
 * Catches unhandled errors within the layout, keeping header and footer intact.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
export default function ErrorBoundary({ error, reset }) {
  React.useEffect(() => {
    // Log unexpected errors
    console.error("The Astro Code - Route Segment Error:", error)
  }, [error])

  return (
    <main
      role="alert"
      className="min-h-[65vh] flex items-center justify-center px-4 py-16"
    >
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl border border-border/60 bg-card/70 backdrop-blur shadow-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            કંઈક ભૂલ થઈ છે (Something went wrong)
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            આ પૃષ્ઠ લોડ કરવામાં સમસ્યા આવી છે. કૃપા કરીને પુનઃ પ્રયાસ કરો અથવા મુખ્ય પૃષ્ઠ પર પાછા જાઓ.
          </p>
          {error?.digest && (
            <p className="text-xs font-mono text-muted-foreground/70 bg-muted/40 py-1 px-2 rounded inline-block">
              ભૂલ સંદર્ભ (Error Code): {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-[#fdc72d] hover:bg-[#e0b024] text-neutral-900 font-medium shadow-sm transition-all"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            પુનઃ પ્રયાસ કરો (Try Again)
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              મુખ્ય પૃષ્ઠ (Home)
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
