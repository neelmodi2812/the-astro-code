import { api } from "../client"
import { ENDPOINTS } from "../endpoints"

export const shopService = {
  categories: (lang, options) => api.get(ENDPOINTS.shop.categories, { lang, ...options }),
  products: (query, lang, options) => api.get(ENDPOINTS.shop.products, { lang, query, ...options }),
  featuredProducts: (lang, options) => api.get(ENDPOINTS.shop.featuredProducts, { lang, ...options }),
  productDetail: (slugOrId, lang, options) => api.get(ENDPOINTS.shop.productDetail(slugOrId), { lang, ...options }),
  searchSuggestions: (q, lang) => api.get(ENDPOINTS.shop.searchSuggestions, { lang, query: { q } }),

  /** Preview a coupon against the cart subtotal; the order endpoint re-validates it. */
  validateCoupon: (code, subtotal, lang) =>
    api.post(ENDPOINTS.shop.validateCoupon, { code, subtotal }, { lang, token: null }),

  placeOrder: (payload) => api.post(ENDPOINTS.shop.placeOrder, payload),
  orderDetail: (orderNumber) => api.get(ENDPOINTS.shop.orderDetail(orderNumber)),
  myOrders: (page) => api.get(ENDPOINTS.shop.myOrders, { query: { page } }),
  /** Stripe PaymentIntent for an online order; guests prove ownership with the checkout phone number. */
  startPayment: (orderNumber, customerPhone) =>
    api.post(ENDPOINTS.shop.orderPayment(orderNumber), { customer_phone: customerPhone }),
  cancelOrder: (orderNumber) => api.post(ENDPOINTS.shop.cancelOrder(orderNumber)),
}
