export const metadata = {
  title: "દૈનિક પંચાંગ | The Astro Code - સંપૂર્ણ ગુજરાતી વૈદિક પંચાંગ, ચોઘડિયા અને શુભ મુહૂર્ત",
  description:
    "વિક્રમ સંવત ૨૦૮૧ સંપૂર્ણ ગુજરાતી પંચાંગ. પ્રત્યક્ષ અક્ષાંશ-રેખાંશ આધારિત સચોટ તિથિ, નક્ષત્ર, યોગ, કરણ, ચોઘડિયા, રાહુકાળ, વિશેષ શુભ મુહૂર્ત અને આજનું રાશિફળ. ડૉ. વિશાલ મોદી.",
  keywords: [
    "The Astro Code",
    "દૈનિક પંચાંગ",
    "ગુજરાતી પંચાંગ",
    "Daily Panchang",
    "Gujarati Panchang 2081",
    "આજનું ચોઘડિયું",
    "Choghadiya Today",
    "રાહુ કાળ",
    "શુભ મુહૂર્ત",
    "હનુમાન જયંતી પંચાંગ",
    "ડૉ. વિશાલ મોદી",
    "Dr. Vishal Modi"
  ],
  alternates: {
    canonical: "/dainik-panchang"
  },
  openGraph: {
    title: "The Astro Code - સંપૂર્ણ ગુજરાતી વૈદિક પંચાંગ અને જ્યોતિષ કેલેન્ડર",
    description:
      "સૂર્ય સિદ્ધાંત મુજબ સચોટ તિથિ, નક્ષત્ર, યોગ, કરણ, ચોઘડિયા અને શુભ મુહૂર્ત. વિક્રમ સંવત ૨૦૮૧.",
    url: "/dainik-panchang",
    siteName: "The Astro Code",
    locale: "gu_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "The Astro Code - દૈનિક પંચાંગ & ચોઘડિયા",
    description:
      "સૂર્ય સિદ્ધાંત મુજબ પ્રત્યક્ષ અક્ષાંશ-રેખાંશ આધારિત સચોટ તિથિ, ચોઘડિયા અને શુભ મુહૂર્ત."
  }
}

export default function DainikPanchangLayout({ children }) {
  return children
}
