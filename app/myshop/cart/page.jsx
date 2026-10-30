import CartClient from "./CartClient"

/**
 * View Cart Page for Vedic Spiritual Store (/myshop/cart)
 * 
 * Server Component following Next.js 16 App Router architecture.
 * Opts out of instant blocking if necessary and exports complete SEO metadata.
 */
export const instant = false

export const metadata = {
  title: "શોપિંગ કાર્ટ | MyShop | The Astro Code - દિવ્ય રત્ન, રૂદ્રાક્ષ & સિદ્ધ સામગ્રી",
  description: "તમારા વૈદિક આધ્યાત્મિક ઓર્ડરની સમીક્ષા કરો. ૧૦૦% પ્રમાણિત રૂદ્રાક્ષ, શ્રી યંત્ર, સ્ફટિક અને રત્નો મફત શિપિંગ અને સંકલ્પ સેવા સાથે. (100% Authentic Consecrated Vedic Spiritual Artifacts)",
  alternates: {
    canonical: "/myshop/cart"
  },
  openGraph: {
    title: "Shopping Cart - The Astro Code",
    description: "Review and complete your order of authentic Vedic items.",
    url: "/myshop/cart",
    siteName: "The Astro Code",
    locale: "gu_IN",
    type: "website"
  }
}

export default async function CartPage() {
  return <CartClient />
}
