"use client"

import * as React from "react"
import { userService } from "../services/user"
import { shopService } from "../services/shop"
import { tokenStore } from "../token-store"
import { buildDashboardData } from "../adapters/dashboard"

// Raw account data survives client-side navigation between dashboard pages.
let cache = null

export function clearDashboardCache() {
  cache = null
}

async function fetchAccount() {
  const [profile, orders, kundlis, consultations] = await Promise.all([
    userService.profile(),
    shopService.myOrders(),
    userService.kundlis.list(),
    userService.consultations(),
  ])

  return {
    user: profile.data,
    orders: orders.data?.data ?? [],
    kundlis: kundlis.data,
    consultations: consultations.data,
  }
}

/**
 * Logged-in user's profile, orders, kundlis and consultations in the dashboard's data shape.
 *
 * status: 'loading' | 'ready' | 'unauthenticated' | 'error'
 */
export function useDashboardData() {
  const [raw, setRaw] = React.useState(() => (cache && cache.token === tokenStore.get() ? cache.raw : null))
  const [failure, setFailure] = React.useState(null)
  const [attempt, setAttempt] = React.useState(0)

  React.useEffect(() => {
    const token = tokenStore.get()
    let cancelled = false

    if (!token) {
      // Deferred so the guest state is set from a callback, not synchronously inside the effect.
      Promise.resolve().then(() => {
        if (!cancelled) setFailure({ unauthenticated: true })
      })
      return () => {
        cancelled = true
      }
    }

    fetchAccount()
      .then((account) => {
        if (cancelled) return
        cache = { token, raw: account }
        setFailure(null)
        setRaw(account)
      })
      .catch((error) => {
        if (cancelled) return
        setFailure({ unauthenticated: error.status === 401, message: error.message })
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  const data = React.useMemo(() => (raw ? buildDashboardData(raw) : null), [raw])
  const refresh = React.useCallback(() => {
    clearDashboardCache()
    setAttempt((n) => n + 1)
  }, [])

  if (data) return { status: "ready", data, refresh }
  if (failure?.unauthenticated) return { status: "unauthenticated", data: null, refresh }
  if (failure) return { status: "error", data: null, error: failure.message, refresh }
  return { status: "loading", data: null, refresh }
}
