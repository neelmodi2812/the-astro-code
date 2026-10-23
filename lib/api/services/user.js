import { api } from "../client"
import { ENDPOINTS } from "../endpoints"

/** Authenticated "my account" calls (Kundli vault, addresses, wishlist). */
export const userService = {
  profile: () => api.get(ENDPOINTS.user.profile),
  updateProfile: (payload) => api.post(ENDPOINTS.user.updateProfile, payload),
  changePassword: ({ currentPassword, password, passwordConfirmation }) =>
    api.post(ENDPOINTS.user.changePassword, {
      current_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation,
    }),
  deleteAccount: (password) => api.delete(ENDPOINTS.user.deleteAccount, { password }),

  consultations: () => api.get(ENDPOINTS.user.consultations),

  kundlis: {
    list: () => api.get(ENDPOINTS.user.kundlis),
    create: (payload) => api.post(ENDPOINTS.user.kundlis, payload),
    remove: (id) => api.delete(ENDPOINTS.user.kundliDetail(id)),
  },
  addresses: {
    list: () => api.get(ENDPOINTS.user.addresses),
    create: (payload) => api.post(ENDPOINTS.user.addresses, payload),
    update: (id, payload) => api.put(ENDPOINTS.user.addressDetail(id), payload),
    remove: (id) => api.delete(ENDPOINTS.user.addressDetail(id)),
  },
  wishlist: {
    list: (lang) => api.get(ENDPOINTS.user.wishlist, { lang }),
    add: (productId) => api.post(ENDPOINTS.user.wishlistItem(productId)),
    remove: (productId) => api.delete(ENDPOINTS.user.wishlistItem(productId)),
  },
}
