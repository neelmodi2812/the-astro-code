/**
 * Global endpoint constants (mirror of `AppConstant` in the Flutter app).
 * Paths are relative to API_BASE_URL.
 */
export const ENDPOINTS = {
  home: {
    feed: "/home/feed",
    ticker: "/home/ticker",
    config: "/home/config",
  },
  shop: {
    categories: "/shop/categories",
    products: "/shop/products",
    featuredProducts: "/shop/featured-products",
    productDetail: (slugOrId) => `/shop/products/${encodeURIComponent(slugOrId)}`,
    searchSuggestions: "/shop/search-suggestions",
    placeOrder: "/shop/orders",
    orderDetail: (orderNumber) => `/shop/orders/${encodeURIComponent(orderNumber)}`,
    cancelOrder: (orderNumber) => `/shop/orders/${encodeURIComponent(orderNumber)}/cancel`,
    myOrders: "/shop/my-orders",
    validateCoupon: "/shop/coupons/validate",
    orderPayment: (orderNumber) => `/shop/orders/${encodeURIComponent(orderNumber)}/payment`,
  },
  panchang: {
    today: "/panchang/today",
    detail: "/panchang/detail",
  },
  articles: {
    list: "/articles",
    categories: "/articles/categories",
    detail: (slugOrId) => `/articles/${encodeURIComponent(slugOrId)}`,
  },
  astrology: {
    horoscopeSigns: "/astrology/horoscope/signs",
    horoscopeDaily: "/astrology/horoscope/daily",
    consultationInfo: "/astrology/consultation-info",
    bookConsultation: "/astrology/book-consultation",
    numerology: "/astrology/numerology",
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  user: {
    profile: "/user/profile",
    updateProfile: "/user/update-profile",
    changePassword: "/user/change-password",
    deleteAccount: "/user/account",
    consultations: "/user/consultations",
    kundlis: "/user/kundlis",
    kundliDetail: (id) => `/user/kundlis/${id}`,
    addresses: "/user/addresses",
    addressDetail: (id) => `/user/addresses/${id}`,
    wishlist: "/user/wishlist",
    wishlistItem: (productId) => `/user/wishlist/${productId}`,
  },
  content: {
    newsletterSubscribe: "/newsletter/subscribe",
    page: (slug) => `/content/pages/${encodeURIComponent(slug)}`,
    sitemap: "/content/sitemap",
  },
}
