import { api } from "../client"
import { ENDPOINTS } from "../endpoints"

export const contentService = {
  home: {
    feed: (lang, options) => api.get(ENDPOINTS.home.feed, { lang, ...options }),
    ticker: (lang, options) => api.get(ENDPOINTS.home.ticker, { lang, ...options }),
    config: (lang, options) => api.get(ENDPOINTS.home.config, { lang, ...options }),
  },
  articles: {
    list: (query, lang, options) => api.get(ENDPOINTS.articles.list, { lang, query, ...options }),
    categories: (lang, options) => api.get(ENDPOINTS.articles.categories, { lang, ...options }),
    detail: (slugOrId, lang, options) => api.get(ENDPOINTS.articles.detail(slugOrId), { lang, ...options }),
  },
  panchang: {
    today: (lang, options) => api.get(ENDPOINTS.panchang.today, { lang, ...options }),
    detail: (date, lang, options) => api.get(ENDPOINTS.panchang.detail, { lang, query: { date }, ...options }),
  },
  /** CMS pages such as 'about-us' and 'privacy-policy'. */
  page: (slug, lang, options) => api.get(ENDPOINTS.content.page(slug), { lang, ...options }),
  sitemap: (options) => api.get(ENDPOINTS.content.sitemap, options),
}
