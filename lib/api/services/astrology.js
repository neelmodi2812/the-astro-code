import { api } from "../client"
import { ENDPOINTS } from "../endpoints"

export const astrologyService = {
  horoscopeSigns: (lang) => api.get(ENDPOINTS.astrology.horoscopeSigns, { lang }),

  /** One sign when `sign` is given, otherwise all 12 for the date. */
  dailyHoroscope: ({ sign, date } = {}, lang) =>
    api.get(ENDPOINTS.astrology.horoscopeDaily, { lang, query: { sign, date } }),

  consultationInfo: (lang) => api.get(ENDPOINTS.astrology.consultationInfo, { lang }),

  /** `problem_category` is one of the ids returned by consultationInfo. */
  bookConsultation: (payload, lang) =>
    api.post(ENDPOINTS.astrology.bookConsultation, payload, { lang, token: null }),

  numerology: ({ moolank, birthDate } = {}, lang) =>
    api.get(ENDPOINTS.astrology.numerology, { lang, query: { moolank, birth_date: birthDate } }),
}
