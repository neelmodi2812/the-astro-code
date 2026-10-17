import CategoriesClient from "./(categories)"
import { JsonLd } from "@/components/seo-structured-data"

/**
 * Categories Page (Server Component)
 */
export default async function CategoriesPage() {
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
        "name": "વિષય સંગ્રહ & કેટેગરીઝ",
        "item": `${siteUrl}/categories`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CategoriesClient />
    </>
  )
}
