import DainikPanchangClient from "./(dainik-panchang)"
import { JsonLd } from "@/components/seo-structured-data"

/**
 * Dainik Panchang Page (Server Component)
 * 
 * Injects Google-compliant BreadcrumbList and Panchang structured data.
 */
export default async function DainikPanchangPage() {
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
        "name": "દૈનિક પંચાંગ & ચોઘડિયા",
        "item": `${siteUrl}/dainik-panchang`,
      },
    ],
  }

  const panchangPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "દૈનિક પંચાંગ & ચોઘડિયા - The Astro Code",
    "description": "વિક્રમ સંવત ૨૦૮૧ સંપૂર્ણ ગુજરાતી પંચાંગ. સૂર્ય સિદ્ધાંત આધારિત સચોટ તિથિ, નક્ષત્ર, યોગ, કરણ, ચોઘડિયા અને શુભ મુહૂર્ત.",
    "url": `${siteUrl}/dainik-panchang`,
    "inLanguage": "gu",
    "isPartOf": {
      "@type": "WebSite",
      "name": "The Astro Code",
      "url": siteUrl,
    },
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={panchangPageSchema} />
      <DainikPanchangClient />
    </>
  )
}
