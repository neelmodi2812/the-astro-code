export const metadata = {
  title: "વ્યક્તિગત આધ્યાત્મિક ડેશબોર્ડ (User Dashboard) | The Astro Code",
  description: "તમારું વ્યક્તિગત વૈદિક કેન્દ્ર: સાચવેલી કુંડળીઓ, દૈનિક ગોચર સ્કોર, MyShop ઓર્ડર ટ્રેકિંગ અને જ્યોતિષ પરામર્શ.",
  keywords: [
    "Astro Code Dashboard",
    "વૈદિક ડેશબોર્ડ",
    "કુંડળી વોલ્ટ",
    "જ્યોતિષ પરામર્શ બુકિંગ",
    "Rudraksha Order Tracking",
    "Kundli Vault Gujarat"
  ],
  alternates: {
    canonical: "/dashboard"
  },
  openGraph: {
    title: "User Vedic Dashboard | The Astro Code",
    description: "Your personalized spiritual sanctuary with saved Kundlis, order tracking, and transit forecasts.",
    url: "/dashboard",
    siteName: "The Astro Code",
    locale: "gu_IN",
    type: "website"
  }
}

export default function DashboardLayout({ children }) {
  return children
}
