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
export function useAuth() {
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [mounted, setMounted] = React.useState(false)

  const sync = React.useCallback(() => {
    const currentToken = tokenStore.get()
    const currentUser = userStore.get()

    setToken(currentToken)
    setUser(currentUser)

    if (currentToken && !currentUser) {
      userService.profile()
        .then((res) => {
          if (res?.data) {
            userStore.set(res.data)
            setUser(res.data)
          }
        })
        .catch((err) => {
          if (err?.status === 401) {
            tokenStore.clear()
            userStore.clear()
            setToken(null)
            setUser(null)
          }
        })
    }
  }, [])

  React.useEffect(() => {
    setMounted(true)
    sync()

    const handleAuthChange = () => sync()

    window.addEventListener("astro_auth_changed", handleAuthChange)
    window.addEventListener("storage", handleAuthChange)
    return () => {
      window.removeEventListener("astro_auth_changed", handleAuthChange)
      window.removeEventListener("storage", handleAuthChange)
    }
  }, [sync])

  const logout = React.useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      sync()
    }
  }, [sync])

  return {
    isAuthenticated: Boolean(token),
    user,
    mounted,
    logout,
  }
}

