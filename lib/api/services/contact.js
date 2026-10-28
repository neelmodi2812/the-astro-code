import { api } from "../client"
import { ENDPOINTS } from "../endpoints"

export const contactService = {
  /** Daily rashifal / panchang newsletter. */
  subscribeNewsletter: (phoneOrEmail, { type = "whatsapp", lang } = {}) =>
    api.post(
      ENDPOINTS.content.newsletterSubscribe,
      { phone_or_email: phoneOrEmail, type, platform: "web" },
      { lang, token: null },
    ),
}
