const TOKEN_KEY = "astro_auth_token"

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
      window.localStorage.setItem(TOKEN_KEY, token)
    } catch {
      /* storage unavailable: session lasts for this page only */
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(TOKEN_KEY)
    } catch {
      /* ignore */
    }
  },
}
