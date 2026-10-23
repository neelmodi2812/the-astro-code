import { api } from "../client"
import { ENDPOINTS } from "../endpoints"

export const contactService = {
  /** Contact Us form. Needs `email` or `phone`. */
  sendMessage: ({ name, email, phone, subject, message }, lang) =>
    api.post(ENDPOINTS.content.contact, { name, email, phone, subject, message }, { lang, token: null }),

  /** Daily rashifal / panchang newsletter. */
  subscribeNewsletter: (phoneOrEmail, { type = "whatsapp", lang } = {}) =>
    api.post(
      ENDPOINTS.content.newsletterSubscribe,
      { phone_or_email: phoneOrEmail, type, platform: "web" },
      { lang, token: null },
    ),
}
