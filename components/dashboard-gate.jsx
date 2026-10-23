"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground px-4 text-center">
        {status === "error" ? (
          <>
            <p className="text-sm text-muted-foreground">
              {isEn ? "We could not load your account right now." : "અત્યારે તમારું એકાઉન્ટ લોડ થઈ શક્યું નથી."}
              {error ? ` (${error})` : ""}
            </p>
            <Button onClick={refresh}>{isEn ? "Try again" : "ફરી પ્રયાસ કરો"}</Button>
          </>
        ) : (
          <>
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {status === "unauthenticated"
                ? isEn ? "Redirecting to sign in…" : "લૉગિન પર લઈ જવાય છે…"
                : isEn ? "Loading your Vedic dashboard…" : "તમારું વૈદિક ડેશબોર્ડ લોડ થઈ રહ્યું છે…"}
            </p>
          </>
        )}
      </div>
    )
  }

  GatedDashboardPage.displayName = `Gated(${Page.displayName || Page.name || "Page"})`
  return GatedDashboardPage
}
