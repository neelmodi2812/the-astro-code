"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { DASHBOARD_DATA } from "@/lib/data/dashboard-data"
import { useDashboardData } from "@/lib/api/hooks/use-dashboard-data"

const DashboardDataContext = React.createContext(null)

/** Live dashboard data when inside a gated page, otherwise the static sample data. */
export function useDashboardContext() {
  return React.useContext(DashboardDataContext) ?? DASHBOARD_DATA
}

/**
 * Wraps a dashboard page so it only renders for a signed-in user:
 * redirects guests to /login, shows a loader/error while fetching, then passes `data` to the page.
 */
export function withDashboardData(Page) {
  function GatedDashboardPage() {
    const router = useRouter()
    const { lang } = useLanguage()
    const { status, data, error, refresh } = useDashboardData()
    const isEn = lang === "en"

    React.useEffect(() => {
      if (status === "unauthenticated") router.replace("/login")
    }, [status, router])

    if (status === "ready") {
      return (
        <DashboardDataContext.Provider value={data}>
          <Page data={data} refresh={refresh} />
        </DashboardDataContext.Provider>
      )
    }

    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 py-10 text-center">
        {status === "error" ? (
          <>
            <p className="text-sm text-muted-foreground">
              {isEn ? "We could not load your account right now." : "અત્યારે તમારું એકાઉન્ટ લોડ થઈ શક્યું નથી."}
              {error ? ` (${error})` : ""}
            </p>
            <Button onClick={refresh}>{isEn ? "Try again" : "ફરી પ્રયાસ કરો"}</Button>
          </>
        ) : (
          <div className="w-full space-y-4" role="status">
            <Skeleton className="h-20 w-full rounded-xl" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-36 w-full rounded-xl" />
              <Skeleton className="h-36 w-full rounded-xl" />
            </div>
            <p className="sr-only">
              {status === "unauthenticated"
                ? isEn ? "Redirecting to sign in…" : "લૉગિન પર લઈ જવાય છે…"
                : isEn ? "Loading your Vedic dashboard…" : "તમારું વૈદિક ડેશબોર્ડ લોડ થઈ રહ્યું છે…"}
            </p>
          </div>
        )}
      </div>
    )
  }

  GatedDashboardPage.displayName = `Gated(${Page.displayName || Page.name || "Page"})`
  return GatedDashboardPage
}
