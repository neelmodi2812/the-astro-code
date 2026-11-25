"use client"

import { Suspense } from "react"
import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/components/language-provider"
import { getSiteShell } from "@/lib/config/site"

export default function ArticleLoading() {
  const { lang, setLang } = useLanguage()
  const site = getSiteShell(lang)

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<Skeleton className="h-16 w-full rounded-none" />}>
        <AstroHeader config={site.config} topBar={site.topBar} navLinks={site.navLinks} lang={lang} onToggleLang={setLang} />
      </Suspense>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8" role="status">
        <span className="sr-only">{lang === "gu" ? "લેખ લોડ થઈ રહ્યો છે…" : "Loading article…"}</span>
        <Skeleton className="mb-5 h-4 w-48 max-w-full" />
        <div className="grid items-start gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-10 w-11/12" />
            <Skeleton className="h-5 w-4/5" />
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="aspect-video w-full rounded-2xl sm:aspect-[21/9]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="hidden space-y-4 lg:col-span-4 lg:block">
            <Skeleton className="h-36 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </main>
      <AstroFooter config={site.config} footerLinks={site.footerLinks} social={site.social} lang={lang} />
    </div>
  )
}
