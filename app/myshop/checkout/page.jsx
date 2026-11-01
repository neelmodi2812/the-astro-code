import CheckoutClient from "./CheckoutClient"

export const instant = false

export const metadata = {
  title: "ચેકઆઉટ | MyShop | The Astro Code - સુરક્ષિત વૈદિક ઓર્ડર",
  description: "તમારો વૈદિક ઓર્ડર પૂર્ણ કરવા ડિલિવરી સરનામું અને વિગત દાખલ કરો. ૧૦૦% પ્રમાણિત રૂદ્રાક્ષ, શ્રી યંત્ર અને રત્નો. (Secure Checkout)",
  alternates: {
    canonical: "/myshop/checkout"
  },
  openGraph: {
    title: "Secure Checkout - The Astro Code",
    description: "Enter your delivery details to complete your Vedic order.",
    url: "/myshop/checkout",
    siteName: "The Astro Code",
    locale: "gu_IN",
    type: "website"
  }
}

export default async function CheckoutPage() {
  return <CheckoutClient />
}

