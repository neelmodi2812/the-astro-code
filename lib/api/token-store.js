const TOKEN_KEY = "astro_auth_token"
const USER_KEY = "astro_auth_user"

function notifyAuthChange() {
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new Event("astro_auth_changed"))
    } catch {
      /* ignore */
    }
  }
}

/**
 * Browser-only Sanctum token storage. Every access is guarded because
 * localStorage is unavailable during SSR and in some private modes.
 */
export const tokenStore = {
  get() {
    try {
      return typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },
  set(token) {
    try {
      if (typeof window !== "undefined") {
        if (token) {
          window.localStorage.setItem(TOKEN_KEY, token)
        } else {
          window.localStorage.removeItem(TOKEN_KEY)
        }
        notifyAuthChange()
      }
    } catch {
      /* storage unavailable: session lasts for this page only */
    }
  },
  clear() {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(TOKEN_KEY)
        notifyAuthChange()
      }
    } catch {
      /* ignore */
    }
  },
}

export const userStore = {
  get() {
    try {
      if (typeof window === "undefined") return null
      const raw = window.localStorage.getItem(USER_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },
  set(user) {
    try {
      if (typeof window !== "undefined") {
        if (user) {
          window.localStorage.setItem(USER_KEY, JSON.stringify(user))
        } else {
          window.localStorage.removeItem(USER_KEY)
        }
        notifyAuthChange()
      }
    } catch {
      /* ignore */
    }
  },
  clear() {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(USER_KEY)
        notifyAuthChange()
      }
    } catch {
      /* ignore */
    }
  },
}
