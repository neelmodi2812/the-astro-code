import { api } from "../client"
import { ENDPOINTS } from "../endpoints"

export const astrologyService = {
  horoscopeSigns: (lang) => api.get(ENDPOINTS.astrology.horoscopeSigns, { lang }),

  /** One sign when `sign` is given, otherwise all 12 for the date. */
  dailyHoroscope: ({ sign, date } = {}, lang) =>
    api.get(ENDPOINTS.astrology.horoscopeDaily, { lang, query: { sign, date } }),

  /** 7-Step Consultation Flow Endpoints */
  consultationConfig: (lang) => api.get(ENDPOINTS.astrology.consultationConfig, { lang }),

  availableDates: ({ mode } = {}, lang) =>
    api.get(ENDPOINTS.astrology.availableDates, { lang, query: { mode } }),

  availableSlots: ({ mode, date, duration } = {}, lang) =>
    api.get(ENDPOINTS.astrology.availableSlots, { lang, query: { mode, date, duration } }),

  bookConsultation: (payload, lang) =>
    api.post(ENDPOINTS.astrology.bookConsultation, payload, { lang, token: null }),

  verifyPayment: (payload, lang) =>
    api.post(ENDPOINTS.astrology.verifyPayment, payload, { lang, token: null }),

  consultationInfo: (lang) => api.get(ENDPOINTS.astrology.consultationInfo, { lang }),

  numerology: ({ moolank, birthDate } = {}, lang) =>
    api.get(ENDPOINTS.astrology.numerology, { lang, query: { moolank, birth_date: birthDate } }),
}
