"use client"

import { Suspense } from "react"
import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { Skeleton } from "@/components/ui/skeleton"
import { getSiteShell } from "@/lib/config/site"
import { useLanguage } from "@/components/language-provider"

export default function Loading() {
  const { lang, setLang } = useLanguage()
  const site = getSiteShell(lang)

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<Skeleton className="h-16 w-full rounded-none" />}>
        <AstroHeader config={site.config} topBar={site.topBar} navLinks={site.navLinks} lang={lang} onToggleLang={setLang} />
      </Suspense>
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-5 px-4 py-6 sm:px-6 lg:px-8" role="status">
        <span className="sr-only">{lang === "gu" ? "પૃષ્ઠ લોડ થઈ રહ્યું છે…" : "Loading page…"}</span>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-2/3 max-w-96" />
        <Skeleton className="h-4 w-4/5 max-w-xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3 rounded-2xl border border-border bg-card p-4">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </main>
      <AstroFooter config={site.config} footerLinks={site.footerLinks} social={site.social} lang={lang} />
    </div>
  )
}
