import { api } from "../client"
import { ENDPOINTS } from "../endpoints"
import { tokenStore, userStore } from "../token-store"

export const authService = {
  /** Logs in and persists the Sanctum token & user profile. Resolves with the user. */
  async login({ email, password }) {
    const res = await api.post(ENDPOINTS.auth.login, { email, password }, { token: null })
    tokenStore.set(res.token)
    if (res.user) {
      userStore.set(res.user)
    }
    return res.user
  },

  /** Registers and signs the user in. Resolves with the user. */
  async register(payload) {
    const res = await api.post(ENDPOINTS.auth.register, payload, { token: null })
    tokenStore.set(res.token)
    if (res.user) {
      userStore.set(res.user)
    }
    return res.user
  },

  async logout() {
    try {
      await api.post(ENDPOINTS.auth.logout)
    } finally {
      tokenStore.clear()
      userStore.clear()
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
}
