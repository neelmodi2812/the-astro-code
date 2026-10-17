import ShopClient from "./(myshop)"
import { JsonLd } from "@/components/seo-structured-data"

/**
 * Vedic Spiritual Store / MyShop Page (Server Component)
 */
export default async function MyShopPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "હોમ",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "MyShop વૈદિક આધ્યાત્મિક સ્ટોર",
        "item": `${siteUrl}/myshop`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ShopClient />
    </>
  )
}
