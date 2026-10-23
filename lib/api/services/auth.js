import { api } from "../client"
import { ENDPOINTS } from "../endpoints"
import { tokenStore } from "../token-store"

export const authService = {
  /** Logs in and persists the Sanctum token. Resolves with the user. */
  async login({ email, password }) {
    const res = await api.post(ENDPOINTS.auth.login, { email, password }, { token: null })
    tokenStore.set(res.token)
    return res.user
  },

  /** Registers and signs the user in. Resolves with the user. */
  async register({ name, email, password, phone }) {
    const res = await api.post(ENDPOINTS.auth.register, { name, email, password, phone }, { token: null })
    tokenStore.set(res.token)
    return res.user
  },

  async logout() {
    try {
      await api.post(ENDPOINTS.auth.logout)
    } finally {
      tokenStore.clear()
    }
  },

  /** Emails a reset link pointing to /reset-password on this site. */
  forgotPassword: (email, lang) => api.post(ENDPOINTS.auth.forgotPassword, { email }, { lang, token: null }),

  resetPassword: ({ token, email, password, passwordConfirmation }, lang) =>
    api.post(
      ENDPOINTS.auth.resetPassword,
      { token, email, password, password_confirmation: passwordConfirmation },
      { lang, token: null },
    ),

  isAuthenticated: () => Boolean(tokenStore.get()),
}
