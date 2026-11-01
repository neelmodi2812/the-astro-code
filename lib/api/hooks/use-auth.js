"use client"

import * as React from "react"
import { tokenStore, userStore } from "../token-store"
import { userService } from "../services/user"
import { authService } from "../services/auth"

/**
 * Global reactive authentication hook.
 *
 * - Automatically reads token & user profile from storage.
 * - Reactive to logins, registrations, profile updates, and logouts via window events.
 * - If token exists but user info is not cached, fetches userService.profile().
 * - Avoids SSR hydration mismatches with `mounted` state.
 */
function subscribeAuth(callback) {
  if (typeof window === "undefined") return () => {}
  window.addEventListener("astro_auth_changed", callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener("astro_auth_changed", callback)
    window.removeEventListener("storage", callback)
  }
}

let cachedUserRaw = null
let cachedUserParsed = null

function getUserSnapshot() {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem("astro_auth_user")
    if (raw === cachedUserRaw) return cachedUserParsed
    cachedUserRaw = raw
    cachedUserParsed = raw ? JSON.parse(raw) : null
    return cachedUserParsed
  } catch {
    return null
  }
}

function getTokenSnapshot() {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem("astro_auth_token")
  } catch {
    return null
  }
}

export function useAuth() {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  const token = React.useSyncExternalStore(
    subscribeAuth,
    getTokenSnapshot,
    () => null
  )

  const user = React.useSyncExternalStore(
    subscribeAuth,
    getUserSnapshot,
    () => null
  )

  React.useEffect(() => {
    if (token && !user) {
      userService.profile()
        .then((res) => {
          if (res?.data) {
            userStore.set(res.data)
          }
        })
        .catch((err) => {
          if (err?.status === 401) {
            tokenStore.clear()
            userStore.clear()
          }
        })
    }
  }, [token, user])

  const logout = React.useCallback(async () => {
    try {
      await authService.logout().catch(() => {})
    } finally {
      tokenStore.clear()
      userStore.clear()
    }
  }, [])

  return {
    isAuthenticated: Boolean(token),
    user,
    mounted,
    logout,
  }
}

