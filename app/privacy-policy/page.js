import PrivacyPolicyClient from "./(privacy-policy)"
import { JsonLd } from "@/components/seo-structured-data"

/**
 * Privacy Policy & Refund Guidelines Page (Server Component)
 */
export default async function PrivacyPolicyPage() {
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
        "name": "ગોપનીયતા અને રિફંડ નીતિ",
        "item": `${siteUrl}/privacy-policy`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PrivacyPolicyClient />
    </>
  )
}
