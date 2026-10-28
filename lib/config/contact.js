/**
 * The Astro Code - Centralized Contact & Social Configuration
 */

export const SITE_CONTACT = {
  phoneDisplay: {
    gu: "+૯૧ ૯૮૨૫૦ ૨૬૩૮૮",
    en: "+91 98250 26388"
  },
  whatsappRaw: "919825026388",
  whatsappNumber: "+91 98250 26388",
  whatsappUrl: "https://wa.me/919825026388",
  email: "contact@theastrocode.com",
  social: {
    facebook: "https://facebook.com/theastrocode",
    youtube: "https://youtube.com/@theastrocode",
    whatsappChannel: "https://whatsapp.com/channel/0029VaAstroCode",
    instagram: "https://instagram.com/theastrocode"
  }
}

/**
 * Returns a pre-filled WhatsApp direct link to the official centralized number
 */
export function getWhatsAppUrl(customMessage = "") {
  if (!customMessage) return SITE_CONTACT.whatsappUrl
  return `https://wa.me/${SITE_CONTACT.whatsappRaw}?text=${encodeURIComponent(customMessage)}`
}

